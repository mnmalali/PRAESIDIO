# Design direction
Last updated: 2026-11-19

Product: runtime security for developers and operators of autonomous agents. Character: calm, precise, approachable. The public site follows the user's updated request for a more polished, expressive composition using their shield logo and Notch as a craft reference.

## Public website

- Midnight navy opening, cool ivory content, slate secondary text and restrained blue accents. White floating navigation; large centered typography gives way to a wide interactive action inspector.
- Locally served Geist Sans and Mono, 16px body and 12px minimum metadata. Fluid headings, readable line lengths, asymmetric feature cards and consistent rounded surfaces.
- The user's transparent shield PNG replaces the earlier website mark. Use CSS inversion on light surfaces, original white pixels on dark ones. The source bytes remain intact.
- Signature interaction: the shield travels between gutters as desktop readers scroll; hover tilts it and click/Enter gives a brief lift. Header pause and system reduced-motion settings stop movement. Mobile and unsupported scroll-timeline browsers retain a stable hero mark.
- Four keyboard-accessible workflow choices and three labelled simulated decisions make the product inspectable. Illustrations remain clearly illustrative; no customer logos, live monitoring claims or invented metrics.
- Original layout, copy and illustrations. Notch's live page and all seven pages of the supplied PDF informed spacing, typography, floating navigation and product-led storytelling. No proprietary assets or fonts copied.

## Authenticated console

The earlier console design remains unchanged: warm neutral surfaces, semantic dark/light states, readable operational tables, restrained status colors and existing data contracts. Original QA addressed associated labels, hardcoded system-health claims, error/loading states, navigation focus and revoked-cookie recovery. This website refinement does not change private console behavior.

Applied skills: PRAESIDIO design, Unslop, UI Skills routing, motion-performance guidance and Playwright. Render review corrected hero density, contrast, focusable code regions and Unicode encoding. See [website refinement evidence](WEBSITE_REDESIGN.md).

## Guided website update — 2026-11-19
Added an original, static binary texture to the dark hero, locally served technology logos, and a section-aware shield guide using IntersectionObserver. Cues identify action inspection, workflow, evidence and self-hosting; the guide hides between stops. Replaces the previous percentage-based side-to-side timeline. Pause, reduced motion and mobile fallback retained. Hermes Agent and OpenClaw appear separately as ecosystem projects with compatibility explicitly unverified.

Lint and production build passed. Five-width Chromium/axe checks found zero violations/overflow; keyboard/demo/menu checks passed. Four guide stops and all eight loaded logo images verified. Evidence: website-guidance-qa.txt, website-guide-stops.txt and website-guidance-build.txt. Other browser engines remain unverified. Backend/SDK/dashboard untouched.

Logo sources are recorded in logo-sources.json: Lobe Icons (MIT notice retained), Simple Icons (CC0 collection; marks remain their owners’ trademarks), and official NousResearch/hermes-agent desktop artwork (repository MIT notice retained). No endorsement or new integration claimed. User binary screenshot used only as a reference, not copied.

## Smooth shield glide — 2026-11-19
Replaced snapping and hiding with persistent right-gutter travel, 1.2-second eased transform transitions and section-specific vertical destinations. Keeps the prior cue while crossing gaps; inward arrow points toward content. Desktop guide requires 1360px to keep clear of text; smaller screens retain static placement. Pause/reduced-motion remain supported. Lint and production build PASS; Chromium verified five forward/reverse transitions with intermediate motion and gutter bounds, plus reduced-motion 0s/static fallback. Evidence: website-glide-build.txt, website-glide-qa.txt, output/playwright/website-glide.png. Other browser engines unverified.

## PDF-directed logo route — 2026-11-19
Reviewed all four pages of user logomovment.pdf. Replaced the margin-only guide with a native ScrollTimeline path measured from 26 content anchors: header, hero, scenario choices, integrations, workflow tabs, feature cards/evidence, self-hosting, FAQ and closing mark. Smooth horizontal interpolation, scroll-linked forward/reverse travel, no scroll polling. Closing movement fades into existing mark. Decorative guide ignores pointer events and is excluded from tab/screen-reader navigation; pause remains in header. Mobile/reduced-motion/unsupported browsers retain static fallback. Build/lint pass; Chromium path QA observes 302 frames and expected target positions; reduced-motion/mobile animations zero. Evidence: website-pdf-path-build.txt and website-pdf-path-qa.txt. Earlier gutter-only route docs are superseded. Wider browser coverage remains unverified.

## Refined motion choreography — 2026-11-19
User clarified the PDF is a rough sequence, not a literal path. Reduced to 13 curated destinations; measured left/right/top/center docking with 20px target clearance, upright logo, brief scroll dwell and eased cubic sweeps. Removed unnecessary side loops and per-tab zigzags. Production build/lint pass. Chromium checks verify exact center alignment and 20px gap at six controls/cards/headings; reduced motion passes. Screenshots visually reviewed for demo/card landings. Evidence: website-refined-path-build.txt, website-refined-path-qa.txt, refined-landing-2.png and refined-landing-8.png. Cross-browser coverage remains unverified. This supersedes the previous 26-anchor PDF tracing.
