# Provenance and dependency inventory
Recorded 2026-11-19. Technical inventory, not comprehensive redistribution clearance.

| Material | Evidence and treatment |
|---|---|
| Adrian | Apache-2.0 LICENSE unchanged; SHA-256 `cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30`. No root NOTICE supplied. All original SecureAgentics copyright lines retained in modified files. SDK LICENSE files and CONTRIBUTORS retained. |
| Website | User-supplied PRAESIDIO PNG shield (unchanged bytes); original decision receipt, illustrations, social card and copy. Geist 1.9.2 Sans/Mono served locally under SIL Open Font License; notice in website/public/licenses/geist-OFL.txt. No reference-site assets copied. |
| Existing logos/assets | Inherited product logos were removed from the active tree; an untouched local source archive retains the historical files. Discord/ClickUp/Telegram icon source retains notices. No endorsement implied. |
| Website design guidance | Unslop CC BY 4.0 with attribution; UI Skills MIT. These development skills are no longer bundled. REA MCP was not available or used. |
| npm | A historical local inventory covered 137 dashboard, 359 website, and 173 TypeScript lock entries, including optional/platform/dev dependencies. Recheck the current lockfiles before binary distribution. |
| Native npm packages | Sharp/libvips platform packages declare LGPL-3.0-or-later or combined Apache/LGPL/MIT expressions. LightningCSS and axe-core declare MPL-2.0. Preserve their own notices and applicable source obligations in binary distributions. Final distributable notice/source packaging remains a release review item. |
| Python | 106 installed distribution metadata records, including QA/development tools; none missing a license label. This is the tested environment, not every optional integration. |
| Go | [GO_LICENSES.json](GO_LICENSES.json): 35 resolved modules and hashes of their LICENSE/LICENCE/NOTICE files. Every module has a root notice. Compiler/stdlib retain their own distribution notices. |
| Vendored plugin libraries | Original protobuf, websockets and certifi license files retained in integrations/claude-code/vendor. Vendor versions unchanged. |
| Models | No weights supplied, downloaded or redistributed. Model/quantization provenance and license must be reviewed before use. |
| Contribution agreement | Historical agreement moved to the local source archive. CONTRIBUTING.md governs this derivative; no affiliation or transfer to Secure Agentics is claimed. |

Original source ZIP hash and upstream commit are unavailable. The historical 442-file manifest is kept in the local archive, not this repository. See [SOURCE_INVENTORY.md](SOURCE_INVENTORY.md) and [attribution](../../UPSTREAM_ATTRIBUTION.md).

## Guided website update — 2026-11-19
Added an original, static binary texture to the dark hero, locally served technology logos, and a section-aware shield guide using IntersectionObserver. Cues identify action inspection, workflow, evidence and self-hosting; the guide hides between stops. Replaces the previous percentage-based side-to-side timeline. Pause, reduced motion and mobile fallback retained. Hermes Agent and OpenClaw appear separately as ecosystem projects with compatibility explicitly unverified.

Lint and production build passed. Five-width Chromium/axe checks found zero violations/overflow; keyboard/demo/menu checks passed. Four guide stops and all eight loaded logo images verified. Evidence: website-guidance-qa.txt, website-guide-stops.txt and website-guidance-build.txt. Other browser engines remain unverified. Backend/SDK/dashboard untouched.

Logo sources are recorded in logo-sources.json: Lobe Icons (MIT notice retained), Simple Icons (CC0 collection; marks remain their owners’ trademarks), and official NousResearch/hermes-agent desktop artwork (repository MIT notice retained). No endorsement or new integration claimed. User binary screenshot used only as a reference, not copied.
