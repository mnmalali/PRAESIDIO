# PRAESIDIO architecture

```text
Coding agents ── Claude Code hook ──────────────┐
              └─ Codex/Hermes/OpenClaw MCP ────┤
Python and TypeScript SDKs ─────────────────────┤
                                               ▼
                                  Go backend: authenticated WebSocket
                                               │
                              classifier + policy + human review
                                               │
                                  SQLite events and verdicts
                                               │
                                  Private dashboard REST API

Separate public website: static information and simulated browser demo
```

The Claude hook inspects supported pre-tool actions and can enforce backend policy. MCP calls are explicit and advisory. SDKs instrument supported application paths. The backend accepts paired events, calls the configured OpenAI-compatible classifier endpoint, stores results, and sends policy decisions. The private dashboard uses authenticated `/api/*`; the public website does not connect to this backend.

The local Compose stack has backend, dashboard, optional `llm` classifier, and one-shot setup services. The model is not bundled. SQLite lives under `data/`; weights live under `models/`. Check [release limits](praesidio/RELEASE_REPORT.md) before interpreting a healthy API as a functioning model or guaranteed deny boundary.
