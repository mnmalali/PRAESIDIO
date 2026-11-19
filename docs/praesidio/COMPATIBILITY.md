# Identity migration and compatibility

Updated 2026-11-19. PRAESIDIO uses its own source identities: `github.com/mnmalali/PRAESIDIO/backend`, Python `praesidio-sdk` / `import praesidio`, TypeScript `@mnmalali/praesidio` and `@mnmalali/praesidio-openai`, `PRAESIDIO_*` environment variables, `praesidio_token` cookie, `~/.praesidio` local state, and PRAESIDIO Docker image/service names.

The canonical protobuf package is `praesidio.core_api.v1`. Generated Go and Python bindings and the TypeScript mirror were regenerated from it. Field numbers and message layout are unchanged, so ordinary binary frames remain compatible at the protobuf field level. Consumers using fully qualified descriptor names or protobuf `Any` type URLs need an explicit migration. Existing database files, API keys, cookies, environment files, and old package imports are not automatically migrated. Create a backup and test a fresh deployment before changing an existing installation.

The backend still serves `/api/*` and `/ws`. Newly generated local API keys use the `prs_local_` prefix. No package has been published to PyPI or npm; install SDKs from this repository until owned distribution channels are prepared.
