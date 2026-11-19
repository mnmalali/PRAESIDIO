<!-- Modified for PRAESIDIO AI, 2026-11-19: independent product context and corrected failure-policy comparison. -->
# PRAESIDIO AI TypeScript SDK

Derived from Praesidio. Existing package names, imports and environment variables are preserved. Build this checked-out source for the derivative; published upstream packages do not automatically include these changes. See [setup and security limits](../../README.md) and [attribution](../../UPSTREAM_ATTRIBUTION.md).

Monorepo for the Praesidio TypeScript SDK. The core package owns the event pipeline: event pairing, PII redaction, JSONL logging, WebSocket streaming, policy verdicts, and shared capture helpers.

## Requirements

Node.js 18 or later.

## Packages

| Package | npm name | Install | Import |
|---|---|---|---|
| Core | `@mnmalali/praesidio` | `npm install @mnmalali/praesidio` | `import { praesidio } from "@mnmalali/praesidio"` |
| [OpenAI](packages/openai/README.md) | `@mnmalali/praesidio-openai` | `npm install @mnmalali/praesidio-openai openai` | `import { praesidio } from "@mnmalali/praesidio-openai"` |

## Environment

Explicit `init()` options take precedence over environment variables.

| Variable | Description |
|---|---|
| `PRAESIDIO_API_KEY` | API key used for WebSocket authentication |
| `PRAESIDIO_LOG_FILE` | Local JSONL log path (default: `events.jsonl`) |
| `PRAESIDIO_WS_URL` | WebSocket endpoint (default: `ws://localhost:8080/ws`) |
| `PRAESIDIO_SESSION_ID` | Session identifier for grouping events |
| `PRAESIDIO_BLOCK_TIMEOUT` | Seconds to wait for a BLOCK-mode verdict before fail-open (default: `30`) |
| `PRAESIDIO_REPLAY_BUFFER_FRAMES` | WebSocket replay buffer size (default: `1000`) |

## Policy and BLOCK mode

When connected over WebSocket and the dashboard policy is in **BLOCK** or **HITL** mode, the SDK waits for backend verdicts on tool calls proposed by an LLM turn. In **BLOCK** mode, if no verdict arrives within `blockTimeout` seconds, the TypeScript SDK **fails open** and allows execution. Missing policy readiness also permits execution. Python behavior differs by integration and context; several Python timeout paths fail closed. No universal failure-policy guarantee is made. Dashboard-configurable failure policy is not implemented.

## Manual callback wiring

For custom integrations, pair an LLM start and end with the same `runId`:

```ts
import { randomUUID } from "node:crypto";
import { praesidio } from "@mnmalali/praesidio";

await praesidio.init({ wsUrl: null });

const handler = praesidio.getHandler();
const runId = randomUUID();

await handler?.handleChatModelStart(
  { name: "custom-model" },
  [[{ role: "user", content: "Hello" }]],
  runId,
);

await handler?.handleLLMEnd(
  {
    output: "Hi there",
    toolCalls: [],
    usage: { promptTokens: 1, completionTokens: 2, totalTokens: 3 },
  },
  runId,
);

await praesidio.shutdown();
```

Manual tool events work the same way:

```ts
const toolRunId = randomUUID();

await handler?.handleToolStart(
  { name: "lookup_user" },
  JSON.stringify({ userId: "user_123" }),
  toolRunId,
  undefined,
  { tool_call_id: "call_123", metadata: { source: "custom-integration" } },
);

await handler?.handleToolEnd(JSON.stringify({ ok: true }), toolRunId);
```

## Subpath export

`@mnmalali/praesidio/capture` exposes shared LLM capture helpers used internally by provider packages.

## Development

From this directory:

```sh
npm install
npm run build
npm test
```

Build or test the core package only:

```sh
npm run build -w @mnmalali/praesidio
npm test -w @mnmalali/praesidio
```
