# Security agent and skill source catalog

The [machine-readable catalog](../../integrations/security_sources/catalog.json) records all 35 names in the supplied research list. Thirty-four repository identities were resolved; the OpenText Fortify Skills repository could not be verified. The ten priority sources have pinned commit IDs from GitHub on 2026-11-19. Repository-level GitHub license metadata is recorded for triage, but individual assets, subdirectories, and service terms may differ.

PRAESIDIO now bundles five **original** security skills and three Claude Code reviewer agents. These use ideas from the research areas without copying third-party instructions or code. The MCP `praesidio_security_sources` tool lets connected harnesses search the catalog. A catalog entry does not install, execute, or imply compatibility with an external project.

## Integration decisions

| Area | PRAESIDIO component | External candidates |
| --- | --- | --- |
| Source review | `praesidio-audit` skill and Claude auditor agent | Cloudflare, Codex Security, Trail of Bits, security skill collections, Semgrep |
| Authorized application testing | `praesidio-appsec` skill and Claude AppSec agent | Strix, Shannon, PentAGI, PentestGPT, HexStrike, Nuclei and peers |
| Agent supply chain | `praesidio-agent-security` skill and Claude agent reviewer | SkillSpector, AI-Infra-Guard, Agent Scan, AgentShield |
| AI application evaluation | `praesidio-ai-redteam` skill | Promptfoo, Garak, PyRIT, Invariant |
| Runtime monitoring | Claude hook plugin and cross-harness MCP bridge | PRAESIDIO backend and SDKs |

External binaries and skill packs are **not bundled**. Some are autonomous offensive systems, some have AGPL or share-alike terms, and some invoke hosted analysis or need tokens. Installation requires a source-level review of the exact revision, its complete license terms, executable behavior, data destinations, and an authorized target. In particular, do not treat the community-maintained 817-skill collection as an Anthropic release. The archived CAI repository and unverified OpenText entry remain research references.

The current cross-harness MCP tool offers explicit advisory review. Its output does not itself stop a Codex, Hermes Agent, or OpenClaw tool call. The Claude Code hook is the only bundled automatic interception path. Local test suites and MCP SDK negotiation passed; real classifier inference and installed Hermes/OpenClaw interoperability remain unverified.
