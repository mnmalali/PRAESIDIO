# PRAESIDIO MCP bridge

The stdio server at `praesidio_mcp.py` exposes backend status, bundled workflow and external-source discovery, and an explicit tool-action review call. It uses the existing classifier transport and redacts event content before sending it. Python 3.12 or newer is required. The Claude Code hook plugin provides automatic interception; this bridge gives other harnesses an **advisory** review tool that they must call and honor.

Set `PRAESIDIO_WS_URL` (default `ws://localhost:8080/ws`) and `PRAESIDIO_API_KEY` in the environment or in `~/.praesidio/.env`. The key is created in the self-hosted dashboard. Keep the file outside Git and do not put the key in an MCP config file.

Use an **absolute path** to this script when registering it:

```sh
codex mcp add praesidio -- python /absolute/path/to/PRAESIDIO/integrations/mcp/praesidio_mcp.py
claude mcp add praesidio -- python /absolute/path/to/PRAESIDIO/integrations/mcp/praesidio_mcp.py
```

Hermes Agent: add this entry under `mcp_servers` in `~/.hermes/config.yaml`, then restart Hermes:

```yaml
mcp_servers:
  praesidio:
    command: python
    args: ["/absolute/path/to/PRAESIDIO/integrations/mcp/praesidio_mcp.py"]
```

OpenClaw: register and probe its native MCP client:

```sh
openclaw mcp add praesidio --command python --arg /absolute/path/to/PRAESIDIO/integrations/mcp/praesidio_mcp.py
openclaw mcp doctor praesidio --probe
```

The five skills in `../../skills/` are bundled in the Claude plugin and mirrored in `.agents/skills/` for Codex. Install those skill folders into the target harness's skill directory for Hermes Agent or OpenClaw when you want automatic discovery. The MCP `praesidio_workflows` tool lists their names even without skill installation.

The review call records the proposed action and returns `recommended_action`, `mad_code`, `mode`, and `enforced: false`. Do not execute a proposed action when your own policy requires a deny or when the backend review is unavailable. Alert mode returns no blocking verdict. A successful status check proves connection and authentication; model health and true end-to-end prevention need separate validation.

Client syntax was checked against installed Codex and Claude CLIs and the official Hermes Agent and OpenClaw repositories on 2026-11-19. Local MCP SDK initialization, discovery, and tool-call tests passed. Hermes Agent and OpenClaw are not installed here, so their client-side connection remains unverified.
