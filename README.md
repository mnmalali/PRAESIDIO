<!-- Modified for PRAESIDIO AI, 2026-11-19: independent identity, local setup and accurate security claims. -->
# PRAESIDIO AI

**Secure every agent action.** AI-assisted runtime analysis, policy decisions, human review, and evidence for autonomous agents.

PRAESIDIO is Apache-2.0 licensed. See [source provenance and notices](UPSTREAM_ATTRIBUTION.md). No universal prevention or model-accuracy guarantee is made.

## Two separate applications

- `frontend/`: the private security dashboard. Existing Go backend, SQLite, SDKs and model integration remain intact.
- `website/`: the independent public Next.js website. Its interactive demo is simulated fixture data and performs no inference.

## Public website

```sh
cd website
npm ci
npm run dev
```

Open http://localhost:3001. Production: `npm run lint`, `npm run typecheck`, `npm run build`, `npm start`. See [deployment guide](docs/praesidio/VERCEL_DEPLOY.md).

## Self-host the security runtime

Requires Docker + Compose v2. The bundled classifier profile needs NVIDIA container GPU support and a suitable GGUF model under `models/`. Model licenses and memory capacity must be checked separately.

```sh
docker compose --profile setup run --rm setup bootstrap --gguf your-model.gguf
docker compose --profile llm up -d
```

Use the actual model filename. Bootstrap creates the database and local configuration and prints a private initial password. Open http://localhost:3000, sign in as `admin@localhost`, change the password, then configure an agent profile and API key in Settings.

```sh
python -m venv .venv
# Activate .venv using your shell
python -m pip install -e ./sdk/python
```

Use the Python `praesidio` import or TypeScript packages `@mnmalali/praesidio` and `@mnmalali/praesidio-openai` from this repository. Supply `PRAESIDIO_API_KEY` through your environment; the SDK endpoint defaults to `ws://localhost:8080/ws`. Never embed keys in source. These package names are local source identities; they have not been published to PyPI or npm.

## Agent harness integrations

- **Claude Code:** install the [hook plugin](integrations/claude-code/README.md) for tool interception, verdicts, and event capture.
- **Codex, Hermes Agent, OpenClaw, other MCP clients:** connect the [stdio MCP bridge](integrations/mcp/README.md) for backend status and explicit advisory action review.
- **Security workflows:** five original [PRAESIDIO skills](skills/) cover runtime use, source audit, application security, agent configuration review, and AI evaluation. Claude reviewer agents are bundled with the plugin.

The MCP bridge is advisory; it cannot intercept every tool call made by a client. A backend API key and working classifier are needed for live review. See the [security project research catalog](docs/praesidio/SECURITY_ECOSYSTEM.md) for external tools and licensing decisions.

## Security limits and development status

Supported integrations gate tool execution; uninstrumented tools are outside the boundary. Alert mode does not block. TypeScript includes fail-open policy-readiness and timeout paths; Python behavior differs. Review [baseline results](docs/praesidio/BASELINE_RESULTS.md) and [release report](docs/praesidio/RELEASE_REPORT.md). Real local model validation is distinct from mocked contract tests.

## Development and provenance

[Source inventory](docs/praesidio/SOURCE_INVENTORY.md), [compatibility](docs/praesidio/COMPATIBILITY.md), [contribution policy](CONTRIBUTING.md), [security policy](SECURITY.md), and [LICENSE](LICENSE). Original copyright notices and contributor history remain.
