# PRAESIDIO contributor and agent instructions

## Project context

PRAESIDIO contains a Go security backend, private Next.js dashboard, separate public website, Python and TypeScript SDKs, a Claude Code hook plugin, and an advisory MCP bridge. Treat the fixture website demo and synthetic classifier QA as tests, not real model inference.

## Project wiki

Before substantial work, read `C:\Users\mnmal\OneDrive\Projects\cyber summit 2026\cyber summit BRAIN\00_INDEX.md`, `CURRENT_STATE.md`, `DECISIONS.md`, `TASKS.md`, and `RISKS.md`. The local helper is `powershell -ExecutionPolicy Bypass -File .\scripts\wiki-read.ps1`. After substantial verified work, update those pages and append commands/results to `SESSION_LOG.md`. Record new decisions and risks without secrets. In your final answer, name the pages updated and any unverified behavior.

## Source and security

Preserve the Apache-2.0 LICENSE, existing copyright headers, contributor history, and factual [source attribution](UPSTREAM_ATTRIBUTION.md). Mark modified upstream files. Do not claim original authorship of inherited code. Keep API keys, customer data, raw private prompts, and untrusted scanner output out of Git and the wiki.

The Claude hook intercepts supported tool calls. The MCP bridge's review call is advisory and requires explicit client use. Alert mode does not block. Do not claim model health, universal enforcement, or fail-closed behavior from a successful status check. Test active security capabilities only on owned or expressly authorized targets.

## Working practices

Inspect code and test the changed path. Preserve other contributors' uncommitted work. Keep Docker backend/dashboard/setup, Vercel website, and local synthetic QA separate. Use the five bundled PRAESIDIO skills for relevant security work; review third-party instructions before installation or execution.
