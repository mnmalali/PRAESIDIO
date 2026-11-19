<!-- Modified for PRAESIDIO AI, 2026-11-19: product context, compatibility and validation limits. -->
# PRAESIDIO AI — Claude Code integration

PRAESIDIO's Claude Code hook plugin. Local suite: 136 passed, 54 skipped. Live Claude Code/model behavior requires a configured backend. Follow the [PRAESIDIO setup](../../README.md) and [security limits](../../docs/praesidio/RELEASE_REPORT.md).

Runtime security plugin for Claude Code. It monitors every tool call, classifies
it with the Praesidio backend (LLM-based MAD code classification), and blocks
malicious actions in real time.

## Architecture

```
Claude Code ──► Plugin Hook ──► Praesidio Backend (WebSocket, protobuf)
                   │                    │
                   │                    ├─ Classify (M0/M2/M3/M4)
                   │                    ├─ Store event + verdict
                   │                    └─ Return verdict
                   │
                   ├─ allow  (benign / policy off)
                   ├─ ask    (HITL: prompt you to approve)
                   └─ deny   (block before the tool runs)
```


## Requirements
- **Claude Code**
- **Python 3.12+** on your PATH (`python3`, `python`, or the `py` launcher on Windows)
- **Windows only:** Git for Windows (Git Bash). Claude Code runs plugin hooks
  under Git Bash by default; a `.cmd` launcher is bundled as a cmd.exe fallback.
- A self-hosted PRAESIDIO backend and API key.
  `/praesidio-init` walks you through this.

## Install

From inside Claude Code:

```
/plugin marketplace add mnmalali/PRAESIDIO
/plugin install praesidio-cc@praesidio
/praesidio-init
```

1. **Add the marketplace** - registers the `praesidio` marketplace from the
   Praesidio repo.
2. **Install the plugin** - `praesidio-cc` from the `praesidio` marketplace.
3. **Configure** - `/praesidio-init` guides you through a self-hosted backend URL,
   writes `~/.praesidio/.env`, asks you to drop
   your API key into that file (never pasted into the chat), and verifies the
   connection.

Monitoring is active for new Claude Code sessions once `/praesidio-init` reports OK.

### Updating

Bump happens through the marketplace. To pull the latest:

```
/plugin marketplace update praesidio
```


## Commands

| Command | Description |
|---------|-------------|
| `/praesidio-init` | Guided setup: choose backend, write `~/.praesidio/.env`, verify the connection |
| `/praesidio-status` | Show the configured backend URL, key presence, and connection health |


## Enforcement Modes

Enforcement is server-driven: the backend's policy decides the mode on login, and
the plugin acts accordingly. No behavior is hard-wired in the client.

| Mode | Behavior |
|------|----------|
| **ALERT** | Log only. Never blocks. |
| **BLOCK** | Deny in-scope high-risk tool calls before they execute. |
| **HITL** | Prompt you in Claude Code to approve or deny the tool call inline. |


## Features

- **Real-time blocking** - high-risk actions are denied before execution
- **Inline HITL** - approve or deny flagged tool calls right in Claude Code
- **Sub-agent tracking** - tracks Agent tool spawns with parent/child hierarchy
- **Tool output capture** - PostToolUse logs complete tool responses
- **Invocation tracking** - groups events by user prompt for context
- **Transcript parsing** - extracts Claude's reasoning and user instructions
- **PII redaction** - events are scrubbed before they leave your machine
- **Dashboard** - view events and verdicts at your Praesidio dashboard
- **Fail-open** - if the backend is unavailable, tools are allowed by default

## PII redaction

Every event is redacted before it is serialised and sent, at a single egress
point (`_ws_send_event`).  Redaction is always on and has no opt-out, matching
the SDK, where `praesidio.init()` wraps every handler in `RedactingHandler`.

Scrubbed fields: agent and parent `system_prompt` / `user_instruction`, tool
`input` and `output`, LLM messages / output / tool-call args, and the
`reasoning_latest` entry of `metadata_json`.  Structural metadata (ids, paths,
counts, modes) is left intact so the backend and dashboard can still parse it.

Detected types: email, phone, SSN, credit card (Luhn-checked), private IP,
date of birth, IBAN, passport, street address, postal code, driver licence and
AWS access key.  Matches are replaced with a tag such as `[EMAIL_REDACTED]`,
so the classifier still sees the shape of the text without the values.

The detection engine is vendored from `sdk/python/praesidio/pii` (stdlib-only, so
the plugin keeps its no-pip-install property).  `tests/test_pii.py` fails if
the copy drifts from the SDK while the monorepo source is present.

## Configuration

`/praesidio-init` writes `~/.praesidio/.env`.  Values
already set in the environment win; otherwise a project-local `.env` (in the
directory you launch Claude Code from) takes precedence over `~/.praesidio/.env`.

| Variable | Default | Description |
|----------|---------|-------------|
| `PRAESIDIO_API_KEY` | *(required)* | API key for backend auth |
| `PRAESIDIO_WS_URL` | `ws://localhost:8080/ws` | Self-hosted backend WebSocket URL (`wss://` when TLS is configured) |
| `PRAESIDIO_CC_VERDICT_TIMEOUT` | `15` | Seconds to wait for a verdict |
| `PRAESIDIO_CC_FAIL_OPEN` | `true` | Allow (`true`) or block (`false`) on timeout/error |

## Local / development install

To run from a checkout without the marketplace (deps are still vendored, so no
pip step):

```bash
claude --plugin-dir /path/to/Praesidio/integrations/claude-code
```

Then run `/praesidio-init`, or export `PRAESIDIO_API_KEY` and `PRAESIDIO_WS_URL` yourself.


## License

Apache-2.0 - See [Praesidio](https://github.com/mnmalali/PRAESIDIO)
