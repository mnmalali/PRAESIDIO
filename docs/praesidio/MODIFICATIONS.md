# Modification ledger
Last updated: 2026-11-19

## Repository README — 2026-11-20

Reorganized the GitHub README around setup, integrations, architecture, and security boundaries. Added the user-supplied banner unchanged under `assets/`; no application behavior changed.

## Independent repository identity — 2026-11-19

The current migration supersedes earlier notes below that say SDK/protocol identities were retained. Renamed the Go module and imports, Python distribution/import, TypeScript workspace/packages/exports, environment variables, cookie and local state, Docker names and database filename, and Claude Code marketplace/plugin/command names. Regenerated Go and Python protobuf bindings from the renamed canonical package and updated the TypeScript mirror. Newly issued local keys use `prs_local_`. Added a stdio MCP bridge, five original security skills, three Claude reviewer agents, and a 35-source external research catalog. Historical QA evidence and the untouched source backup were moved to the sibling local archive. No external security project code was copied into the active repository.

Go, Python, TypeScript, website, dashboard, Docker image, synthetic backend, and MCP checks are recorded in [RELEASE_REPORT.md](RELEASE_REPORT.md). Existing installations need an explicit migration; see [COMPATIBILITY.md](COMPATIBILITY.md).

Modified upstream source/doc files carry dated PRAESIDIO notices. LICENSE and original copyright notices remain unchanged.

- frontend/package-lock.json: compatible dependency security updates after original baseline.
- sdk/typescript/package-lock.json: compatible dependency security updates after original baseline.
- Any package.json/lockfile metadata changes are recorded here because JSON does not accept comments.
- Added website/, original SVG mark, docs/praesidio and project instructions. Website-development skills were subsequently removed; only PRAESIDIO security skills remain under `.agents/skills/`.

- Dashboard routes/components/styles: original identity, responsive navigation, labelled controls, semantic dark/light palette and explicit loading/error states. Middleware allows reauthentication with revoked/expired cookies and serves the public brand icon. Backend authorization remains authoritative.
- frontend/package-lock.json resolves Next 15.5.29 and compatible security patches. sdk/typescript/package.json adds esbuild override ^0.28.1; runtime SDK code and public identities remain unchanged.
- sdk/python/pyproject.toml and uv.lock update development LangGraph to 1.2.22 and prebuilt to 1.1.2, resolving vulnerable langgraph-sdk to 0.4.14. Production dependency ranges unchanged. test_session_persistence.py corrects only a POSIX-specific assertion for Windows.
- backend/go.mod selects patched Go 1.26.11; no backend application code changed. Docker backend builder follows 1.26.11; dashboard build/runtime follows Node 24.
- .dockerignore/.gitignore exclude secrets, temporary QA auth state and duplicate source. Bootstrap .env.example remains included.
- Upstream Python/npm publish jobs disabled; existing tests retained. New PR/manual validation workflow has no deployment or package-publication actions.
- README/setup/contribution/SDK/plugin docs explain independent product context and accurate security limits. CLA original text is preserved with a historical-context banner; contributor history remains.
- New QA scripts and evidence distinguish synthetic providers from real backend/API/auth tests. No production data, model download, remote push, deployment or paid service.

See Git diffs against c8c615c for the complete change set.

## Website refinement — 2026-11-19

At the user's request, replaced the public site's mark with their supplied PNG shield and rebuilt its visual composition using the Notch reference and supplied seven-page PDF as design evidence. Added locally served Geist fonts, a native scroll-timeline shield with pointer/keyboard interaction and motion controls, an accessible four-state workflow explorer, new product illustrations, and responsive page styles. Website package/lock add Geist 1.9.2 with OFL notice. Updated metadata, documentation, dependency inventory, browser QA and screenshots. Backend, SDKs, private dashboard and their contracts are unchanged by this refinement. See WEBSITE_REDESIGN.md for verification scope.

## Guided website update — 2026-11-19
Added an original, static binary texture to the dark hero, locally served technology logos, and a section-aware shield guide using IntersectionObserver. Cues identify action inspection, workflow, evidence and self-hosting; the guide hides between stops. Replaces the previous percentage-based side-to-side timeline. Pause, reduced motion and mobile fallback retained. Hermes Agent and OpenClaw appear separately as ecosystem projects with compatibility explicitly unverified.

Lint and production build passed. Five-width Chromium/axe checks found zero violations/overflow; keyboard/demo/menu checks passed. Four guide stops and all eight loaded logo images verified. Evidence: website-guidance-qa.txt, website-guide-stops.txt and website-guidance-build.txt. Other browser engines remain unverified. Backend/SDK/dashboard untouched.

Logo sources are recorded in logo-sources.json: Lobe Icons (MIT notice retained), Simple Icons (CC0 collection; marks remain their owners’ trademarks), and official NousResearch/hermes-agent desktop artwork (repository MIT notice retained). No endorsement or new integration claimed. User binary screenshot used only as a reference, not copied.

## PDF-directed logo route — 2026-11-19
Reviewed all four pages of user logomovment.pdf. Replaced the margin-only guide with a native ScrollTimeline path measured from 26 content anchors: header, hero, scenario choices, integrations, workflow tabs, feature cards/evidence, self-hosting, FAQ and closing mark. Smooth horizontal interpolation, scroll-linked forward/reverse travel, no scroll polling. Closing movement fades into existing mark. Decorative guide ignores pointer events and is excluded from tab/screen-reader navigation; pause remains in header. Mobile/reduced-motion/unsupported browsers retain static fallback. Build/lint pass; Chromium path QA observes 302 frames and expected target positions; reduced-motion/mobile animations zero. Evidence: website-pdf-path-build.txt and website-pdf-path-qa.txt. Earlier gutter-only route docs are superseded. Wider browser coverage remains unverified.

## Refined motion choreography — 2026-11-19
User clarified the PDF is a rough sequence, not a literal path. Reduced to 13 curated destinations; measured left/right/top/center docking with 20px target clearance, upright logo, brief scroll dwell and eased cubic sweeps. Removed unnecessary side loops and per-tab zigzags. Production build/lint pass. Chromium checks verify exact center alignment and 20px gap at six controls/cards/headings; reduced motion passes. Screenshots visually reviewed for demo/card landings. Evidence: website-refined-path-build.txt, website-refined-path-qa.txt, refined-landing-2.png and refined-landing-8.png. Cross-browser coverage remains unverified. This supersedes the previous 26-anchor PDF tracing.
