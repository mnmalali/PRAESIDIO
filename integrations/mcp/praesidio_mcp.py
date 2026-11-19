"""PRAESIDIO stdio MCP bridge for coding-agent harnesses.

The bridge offers explicit, advisory checks. Only the Claude Code hook plugin
intercepts tool execution automatically; an MCP client must call these tools.
"""

from __future__ import annotations

import asyncio
import json
import os
import sys
from datetime import UTC, datetime
from pathlib import Path
from uuid import uuid4

PLUGIN = Path(__file__).resolve().parents[1] / "claude-code"
os.environ.setdefault("PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION", "python")
sys.path.insert(0, str(PLUGIN))
sys.path.append(str(PLUGIN / "vendor"))

from praesidio_cc import agent  # noqa: E402
from praesidio_cc.proto import event_pb2 as pb  # noqa: E402


TOOLS = [
    {
        "name": "praesidio_status",
        "description": "Check whether the configured PRAESIDIO backend accepts this client key. Returns reachability and policy mode, not model health.",
        "inputSchema": {"type": "object", "properties": {}, "additionalProperties": False},
    },
    {
        "name": "praesidio_review_tool_action",
        "description": "Send a proposed tool action for PRAESIDIO classification before execution. Advisory only: the calling agent must honor the recommendation.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "harness": {"type": "string", "enum": ["codex", "hermes-agent", "openclaw", "other"]},
                "tool_name": {"type": "string", "minLength": 1},
                "tool_input": {"type": "object"},
                "session_id": {"type": "string"},
            },
            "required": ["harness", "tool_name", "tool_input"],
            "additionalProperties": False,
        },
    },
    {
        "name": "praesidio_workflows",
        "description": "List PRAESIDIO's bundled security review workflows and where to read their instructions.",
        "inputSchema": {"type": "object", "properties": {}, "additionalProperties": False},
    },
    {
        "name": "praesidio_security_sources",
        "description": "Search the 35-source external security project catalog. Entries are references, not installed tools.",
        "inputSchema": {"type": "object", "properties": {"query": {"type": "string"}}, "additionalProperties": False},
    },
]


def result(value: object, *, error: bool = False) -> dict[str, object]:
    return {"content": [{"type": "text", "text": json.dumps(value, ensure_ascii=False)}], "isError": error}


def call_tool(name: str, args: dict[str, object]) -> dict[str, object]:
    if name == "praesidio_status":
        if not agent.PRAESIDIO_API_KEY:
            return result({"connected": False, "reason": "PRAESIDIO_API_KEY is not configured"})
        check = asyncio.run(agent._verify_connection())
        return result({"connected": bool(check.get("ok")), "mode": check.get("mode_name")})

    if name == "praesidio_workflows":
        root = Path(__file__).resolve().parents[2] / "skills"
        return result({"skills": sorted(path.parent.name for path in root.glob("*/SKILL.md"))})

    if name == "praesidio_security_sources":
        catalog_path = Path(__file__).resolve().parents[1] / "security_sources" / "catalog.json"
        catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
        query = str(args.get("query", "")).casefold()
        matches = [source for source in catalog["sources"] if query in source["name"].casefold() or query in (source["repo"] or "").casefold()]
        return result({"count": len(matches), "sources": matches, "installed": False})

    if name == "praesidio_review_tool_action":
        harness, tool_name, tool_input = args.get("harness"), args.get("tool_name"), args.get("tool_input")
        if harness not in {"codex", "hermes-agent", "openclaw", "other"} or not isinstance(tool_name, str) or not tool_name or not isinstance(tool_input, dict):
            return result({"error": "Invalid harness, tool_name, or tool_input"}, error=True)
        session_id = str(args.get("session_id") or uuid4())
        event = pb.PairedEvent(
            event_id=str(uuid4()),
            invocation_id=str(uuid4()),
            session_id=session_id,
            run_id=str(uuid4()),
            timestamp=datetime.now(UTC).isoformat(),
            pair_type=pb.PAIR_TYPE_TOOL,
            source=str(harness),
        )
        event.agent.agent_id = str(harness)
        event.tool.tool_name = tool_name
        event.tool.input = json.dumps(tool_input, ensure_ascii=False, default=str)
        if not agent.PRAESIDIO_API_KEY:
            return result({"reviewed": False, "reason": "PRAESIDIO_API_KEY is not configured", "enforced": False})
        verdict = agent._send_event_sync(event, session_id, source=str(harness))
        if verdict.get("error"):
            return result({"reviewed": False, "reason": "Backend classification unavailable", "enforced": False})
        return result({
            "reviewed": True,
            "mode": verdict.get("policy", {}).get("mode_name") if verdict.get("policy") else None,
            "mad_code": (verdict.get("verdict") or {}).get("mad_code"),
            "recommended_action": agent._verdict_action(verdict),
            "enforced": False,
        })

    return result({"error": f"Unknown tool: {name}"}, error=True)


def dispatch(request: dict[str, object]) -> dict[str, object] | None:
    method = request.get("method")
    if "id" not in request:
        return None
    if method == "initialize":
        params = request.get("params") or {}
        version = params.get("protocolVersion", "2025-06-18") if isinstance(params, dict) else "2025-06-18"
        payload: object = {"protocolVersion": version, "capabilities": {"tools": {"listChanged": False}}, "serverInfo": {"name": "praesidio", "version": "0.1.0"}}
    elif method == "ping":
        payload = {}
    elif method == "tools/list":
        payload = {"tools": TOOLS}
    elif method == "tools/call":
        params = request.get("params") or {}
        if not isinstance(params, dict):
            params = {}
        arguments = params.get("arguments") or {}
        payload = call_tool(str(params.get("name", "")), arguments if isinstance(arguments, dict) else {})
    else:
        return {"jsonrpc": "2.0", "id": request["id"], "error": {"code": -32601, "message": "Method not found"}}
    return {"jsonrpc": "2.0", "id": request["id"], "result": payload}


def main() -> None:
    for line in sys.stdin:
        try:
            request = json.loads(line)
            if not isinstance(request, dict):
                continue
            response = dispatch(request)
            if response is not None:
                sys.stdout.write(json.dumps(response, ensure_ascii=False) + "\n")
                sys.stdout.flush()
        except Exception as exc:
            print(f"PRAESIDIO MCP error: {type(exc).__name__}", file=sys.stderr)


if __name__ == "__main__":
    main()
