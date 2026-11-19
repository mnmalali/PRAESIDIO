<!-- Modified for PRAESIDIO AI, 2026-11-19: compatibility and provenance context. -->
# @mnmalali/praesidio-openai

Used by PRAESIDIO AI as an Praesidio-derived compatibility package. This public identifier is unchanged; use the [repository setup](../../../../README.md) and [attribution](../../../../UPSTREAM_ATTRIBUTION.md). No PRAESIDIO package publication has occurred.

OpenAI SDK instrumentation for [Praesidio](https://github.com/mnmalali/PRAESIDIO) security monitoring. Wraps your OpenAI client so every call is captured by the [core SDK](https://www.npmjs.com/package/@mnmalali/praesidio) and streamed to your backend.

## Install

```bash
npm install @mnmalali/praesidio-openai openai
```

## Usage

Wrap your OpenAI client. `init`, `praesidio.openai(client)`, and `shutdown` bracket your normal OpenAI code; call sites stay unchanged:

```ts
import OpenAI from "openai";
import { praesidio } from "@mnmalali/praesidio-openai";

async function main() {
  await praesidio.init({ apiKey: "prs_local_..." });

  // Wrap your existing OpenAI client; every call is captured.
  const client = praesidio.openai(new OpenAI());

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "user", content: "Find the most underpriced recent IPOs and build an investment strategy" },
    ],
  });
  console.log(response.choices[0]?.message?.content);

  await praesidio.shutdown();
}

main();
```

<sup>Requires the `openai` package (peer dependency `>=4.0.0`). The SDK defaults to `ws://localhost:8080/ws`; set `wsUrl=` if your self-hosted backend runs elsewhere.</sup>

Events appear in the dashboard within seconds, classified by severity.

## Local development

To develop against a local build instead of the published package, point your consumer's `package.json` at the package directories with `file:` paths (relative to that file), then `npm install`:

```jsonc
"dependencies": {
  "@mnmalali/praesidio":        "file:../Praesidio/sdk/typescript/packages/core",
  "@mnmalali/praesidio-openai": "file:../Praesidio/sdk/typescript/packages/openai",
  "openai": ">=4.0.0"
}
```

Both packages are linked because `praesidio-openai` depends on `praesidio`. The paths above assume your project is a sibling of the `Praesidio` repo; adjust the `../` depth to match. Build first so `dist/` exists, and rebuild after editing the SDK:

```sh
cd sdk/typescript && npm run build
```

Full documentation: [Praesidio TypeScript SDK](https://github.com/mnmalali/PRAESIDIO/tree/main/sdk/typescript#readme)

## License

Apache-2.0
