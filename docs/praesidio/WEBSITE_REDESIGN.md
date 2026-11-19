# Website refinement — 2026-11-19

Implemented the user's request for a more professional Notch-influenced website using their PRAESIDIO shield and an interactive animated presence. Reviewed https://trynotch.net/ and all seven pages of the supplied screenshot PDF. References informed proportion, navigation, typography and product storytelling; no Notch assets, font files or branded copy were reused.

## Delivered

- Original navy-to-ivory composition, floating navigation, locally served Geist typography, wide action inspector, four-state workflow explorer, asymmetric product illustrations, self-hosting section and FAQ.
- Supplied shield in navigation, footer, favicon, feature illustrations and the hero companion. Source and both repository PNG copies have identical SHA-256: `1fa44a75981cab750e3869afdb6e6c3449a30c5c66e182dba6ac24f560b5c5af`.
- Desktop scroll motion uses a native CSS scroll timeline on one small layer. Pointer tilt and click/Enter use finite Web Animations. No scroll polling, permanent JavaScript animation loop or animation framework.
- Header pause, system reduced-motion support, static mobile positioning and a static fallback for browsers without scroll timelines. The travelling shield cannot intercept content controls after leaving the hero.
- Original client-only demo scenarios and explicit simulation labels retained. Backend, SDKs and private dashboard are unchanged in this refinement.

## Verification

| Check | Observed result | Evidence |
|---|---|---|
| ESLint, TypeScript, Next production build | PASS; 14 generated routes/assets | [build log](website-redesign-checks.txt) |
| Chromium/axe | Zero violations and no horizontal overflow at 320, 375, 768, 1280 and 1440px; six secondary routes also pass | [browser QA](website-redesign-browser-qa.txt) |
| Keyboard and responsive behavior | Three scenario controls, menu Enter/Escape/focus, FAQ, 640px equivalent 200% reflow PASS | [browser QA](website-redesign-browser-qa.txt) |
| Shield and workflow | Pointer tilt, Enter animation, scroll travel, pause, system reduced motion, mobile position, four workflow states and ArrowRight PASS | [motion QA](website-motion-qa.txt) |
| Links, assets, isolation | Internal links and assets 200, unknown route 404, anchors present; demo interaction makes zero network requests | [links QA](website-redesign-links-qa.txt) |
| npm audit | Zero reported vulnerabilities; 359 dependency entries inventoried | [audit](website-redesign-audit.json) |
| Local mobile Lighthouse | 95 performance, 100 accessibility, 100 best practices, 66 SEO; LCP 0.9s, TBT 250ms, CLS 0.001 | [Lighthouse](website-redesign-lighthouse.json) |

Screenshots: [desktop preview](../../output/playwright/website-preview.png), [full desktop](../../output/playwright/website-1440-final.png), [mobile](../../output/playwright/website-320-final.png), [shield during scroll](../../output/playwright/redesign-logo-midjourney.png). Final render review corrected contrast, code-region keyboard access, a transient loading screenshot in the QA harness, and Unicode encoding. The harness now waits for actual page headings and fonts before auditing.

## Scope and limits

These results supersede earlier website design screenshots and Lighthouse values. They are local Chromium checks, not cross-browser or screen-reader certification. Scroll-timeline travel depends on browser support; the fallback stays usable. Preview remains intentionally unindexed; production domain and publication are unconfigured. Existing real-model and deployment release gates remain unchanged in RELEASE_REPORT.md. No deployment, source download, paid service or remote push occurred.

Geist 1.9.2 is served locally with its SIL Open Font License notice in `website/public/licenses/geist-OFL.txt`. The supplied logo is used as directed by the user, not claimed as newly authored. Original Apache LICENSE hash remains `cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30`.
