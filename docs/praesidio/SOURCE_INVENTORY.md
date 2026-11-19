# Source inventory

Updated 2026-11-19. The active root is PRAESIDIO. It contains the Go backend, Next.js private dashboard and public website, Python and TypeScript SDKs, Claude Code hook plugin, stdio MCP bridge, and five PRAESIDIO security skills. The original source backup and detailed baseline evidence were moved to a sibling local archive outside this repository. They are not part of a public checkout. The upstream revision was not supplied; the local preservation commit was `c8c615c2548008e07a53e7968d08739fcb840a46`, which is **not** an upstream commit.

The unchanged Apache-2.0 LICENSE has SHA-256 `CFC7749B96F63BD31C3C42B5C471BF756814053E847C10F3EB003417BC523D30`. Original copyright lines and contributor history are preserved. See [source attribution](../../UPSTREAM_ATTRIBUTION.md), [modification record](MODIFICATIONS.md), and [third-party inventory](THIRD_PARTY.md).

| Component | Active identity | Validation |
| --- | --- | --- |
| Backend | `github.com/mnmalali/PRAESIDIO/backend`, Go 1.26.11 | Go tests/build and synthetic runtime QA |
| Dashboard | Next.js 15, React 19 | Production build and existing browser QA |
| Python SDK | `praesidio-sdk`, Python >=3.12 | 422 tests |
| TypeScript SDK | `@mnmalali/praesidio` and OpenAI adapter | 66 tests and build |
| Claude Code plugin | `praesidio-cc` hooks and vendored dependencies | 136 tests; 54 skipped |
| MCP bridge | `integrations/mcp/praesidio_mcp.py` | SDK negotiation and real backend/synthetic classifier check |
| Public website | separate Next.js app | lint, typecheck, build |

No model weights are distributed. The user must select a licensed model and validate it on suitable hardware before claiming live classifier operation.
