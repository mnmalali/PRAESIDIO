<!-- Modified for PRAESIDIO AI, 2026-11-19: compatibility and provenance context. -->
# @mnmalali/praesidio

Used by PRAESIDIO AI as an Praesidio-derived compatibility package. This public identifier is unchanged; this source checkout contains the derivative's reviewed dependency updates. See the [repository setup](../../../../README.md) and [attribution](../../../../UPSTREAM_ATTRIBUTION.md).

Core SDK for [Praesidio](https://github.com/mnmalali/PRAESIDIO) multi-agent security monitoring in Node.js.

This package provides the shared runtime: event capture and pairing, agent/invocation context, PII redaction, handlers, and the WebSocket transport to the Praesidio backend. Provider-specific instrumentation ships as separate packages (for example [`@mnmalali/praesidio-openai`](https://www.npmjs.com/package/@mnmalali/praesidio-openai)).

## Install

```bash
npm install @mnmalali/praesidio
```

## Usage

```ts
import { praesidio } from "@mnmalali/praesidio";

await praesidio.init({
  apiKey: "prs_...",
  sessionId: "my-session",
  // wsUrl: "ws://localhost:8080/ws", // self-hosted backend
});
```

To instrument the OpenAI SDK, install [`@mnmalali/praesidio-openai`](https://www.npmjs.com/package/@mnmalali/praesidio-openai) and wrap your client with `praesidio.openai(...)`.

Full documentation: [Praesidio TypeScript SDK](https://github.com/mnmalali/PRAESIDIO/tree/main/sdk/typescript#readme)

## License

Apache-2.0
