# Public website deployment
Verified locally: 2026-11-19. Account linking, remote build and public deployment: **not performed**.

## Configuration

Import the intended repository into a Vercel project only after the owner chooses an account, deployment scope and eligible plan. Configure Root Directory `website`, Next.js framework, Node 22 or 24, `npm ci`, `npm run build`, default framework output. Commit `website/package-lock.json` and `website/vercel.json`. No outside-root files are needed. Vercel documents per-project root directories in its [monorepo guide](https://vercel.com/docs/monorepos).

Set `NEXT_PUBLIC_SITE_URL` only for production, to the verified HTTPS origin. Rebuild after changing it. It controls canonical links, social image URLs, robots and sitemap. With no value, local/preview builds deliberately request no indexing. Confirm the final domain, title, `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, `/icon.svg` and an unknown-route 404 after deployment. No public URL is claimed in this repository.

The current [Hobby documentation](https://vercel.com/docs/plans/hobby) and [fair-use guidelines](https://vercel.com/docs/limits/fair-use-guidelines), retrieved 2026-11-19, describe usage limits but did not contain the noncommercial-only wording asserted by the supplied installer specification. Treat that assertion as unverified, review the applicable account terms before commercial launch, and do not promise free commercial hosting. No plan was purchased.

## Runtime separation

Only `website/` belongs in this project. Its fixture demo has zero backend requests and cannot authorize real tools. It has no private environment values, authentication forms, analytics integrations, customer input or model calls.

Keep the Go backend, SQLite volume, private `frontend/` dashboard and GGUF inference service in the existing self-hosted topology. The Compose configuration is preserved. Website deployment does not provision that topology; the supplied specification's broad 2026 WebSocket claim is not used as evidence that Compose/GPU hosting works on Vercel.

For an optional separately hosted runtime, configure **dashboard server** `PRAESIDIO_API_URL` before its production build (or when starting development) with the backend HTTPS base URL or private container hostname. Production rewrites are fixed at build time; changing only the start environment does not update them. The Next rewrite keeps browser API calls same-origin. SDKs connect directly using `PRAESIDIO_WS_URL` and `PRAESIDIO_API_KEY`. Never set these credentials on the public site or expose them as `NEXT_PUBLIC_*` values. Use a TLS reverse proxy, authenticated sessions, exact origin policy, reviewed CSRF protection and private durable storage before exposing the console. Cross-origin browser auth is not implemented by this change. An unavailable API produces explicit console error/retry states; it is never replaced by simulated successful telemetry.

## Reproduce and rollback

From `website/`: `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm start`. These completed locally without a running model or build-time backend access. Browser QA and source evidence are in [RELEASE_REPORT.md](RELEASE_REPORT.md).

Rollback a future website deployment through its deployment history or by redeploying a known local commit. Do not roll back or delete production SQLite data as part of a marketing-site rollback. The local preservation baseline is `c8c615c2548008e07a53e7968d08739fcb840a46`, not an upstream commit.
