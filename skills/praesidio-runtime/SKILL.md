---
name: praesidio-runtime
description: Configure and verify PRAESIDIO security monitoring for a coding agent or application, and interpret its real enforcement limits.
---

# PRAESIDIO runtime

Find the self-hosted backend URL and a locally configured `PRAESIDIO_API_KEY`. Do not ask for or print the key. Use `praesidio_status` from the PRAESIDIO MCP bridge when available, or the Claude plugin's `verify` command. A healthy connection confirms authentication and policy mode, not classifier health.

For Claude Code, use the bundled hook plugin and `/praesidio-init`; it intercepts supported tool calls. For Codex, Hermes Agent, OpenClaw, and other MCP clients, use `praesidio_review_tool_action` before a proposed action and honor its recommendation. MCP review is advisory because an agent can bypass the call. Never describe it as automatic blocking.

Check the actual policy mode, scope flags, timeout behavior, and model availability before claiming prevention. Alert mode only logs. If the backend or classifier fails, report the observed fail-open/fail-closed behavior. Use synthetic actions for checks and keep customer prompts and keys out of reports.
