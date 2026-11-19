# PRAESIDIO local verification

2026-11-19. Independent repository identity and multi-harness integration work. This is a development snapshot, not a production security guarantee.

| Check | Result |
| --- | --- |
| Go `test ./...` and backend build | PASS; seven packages with tests |
| Python SDK tests | 422 passed, 18 warnings |
| Claude Code plugin tests | 136 passed, 54 skipped |
| TypeScript SDK tests and build | 66 passed; both packages built |
| Dashboard production build | PASS, 12 routes/pages |
| Website lint, typecheck, production build | PASS, seven public routes |
| Docker Compose config and backend/setup/dashboard image builds | PASS |
| Real backend/auth/SQLite with synthetic classifier | 20 checks passed |
| MCP SDK protocol, four-tool discovery and catalog | PASS |
| MCP status and proposed-action review through real backend/auth with synthetic classifier | PASS; ALERT mode, `enforced: false` |
| Five custom skill validators | PASS |

The security ecosystem catalog records 35 research sources and pins the ten priority repositories. External project code, agents, and skill packs have not been installed into PRAESIDIO. The bundled skills and Claude reviewer agents are original PRAESIDIO instructions. The Claude hook can intercept supported tool calls; the MCP bridge is advisory and relies on the calling harness to invoke it.

## Open release gates

- No licensed real model weights or suitable GPU were available, so live classifier inference and full model-backed Compose operation remain untested.
- The inherited failure paths and policy behavior do not establish universal fail-closed protection. Some tools or harnesses may be uninstrumented; ALERT mode never blocks.
- Hermes Agent and OpenClaw clients are not installed here. Their MCP registration syntax was checked against their repositories, but client-side interoperation is unverified.
- Fifty-four Claude plugin tests are skipped. Wider browser, assistive technology, load, backup/recovery, TLS/origin/CSRF, and final distribution checks remain.
- New package identities intentionally break existing import and environment names. See [compatibility](COMPATIBILITY.md) before migrating a live deployment.
