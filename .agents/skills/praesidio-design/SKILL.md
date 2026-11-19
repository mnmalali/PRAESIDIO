---
name: praesidio-design
description: Build, review, and refine PRAESIDIO AI marketing pages and security dashboard with the project’s original Notch-influenced design system, semantic tokens, accessibility and verified product claims. Use when creating or editing website layouts, UI components, motion, styling, copy, screenshots, dashboard flows, or design-system documentation for PRAESIDIO.
---

# PRAESIDIO design discipline

Before any work, read the project `AGENTS.md`, external persistent wiki, `specs/DESIGN_SYSTEM.md`, `specs/WEBSITE_BRIEF.md` and this skill's `references/notch-guidelines.md`. If the files are unavailable, report it rather than inventing their contents. This skill applies to both public `website/` and authenticated `frontend/`; never confuse them.

## Workflow

1. Map the current route, features, data contract and screenshot. Establish what real functionality must be preserved.
2. Write a 5-line art direction: **product**, **character**, **world**, **moment**, **signature**. Default: AI-agent security / quiet, exact, reassuring / dark operations room and instrument-grade interfaces / one real authorization-event visual / tiny 'decision receipt' signature. Adapt only when justified by the product.
3. Define/refine semantic tokens before coding. Use the project tokens rather than raw component-level arbitrary colors. Prioritize WCAG 2.2 AA.
4. Build semantic UI, accessibility states, responsive layouts and useful interactions. All navigation keyboard-accessible; modal/dialog focus managed; reduced-motion honored.
5. Use the user-provided Notch notes as inspiration for calm typographic hierarchy, generous space, restrained chrome, strong product visuals. **Do not** copy third-party assets, source, text or distinctive visual arrangements.
6. Run relevant `ui-skills` skills, then `unslop` to challenge excessive gradients/glows/typography slop. REA is an analysis skill/tool, not an automatic substitute for design judgment.
7. Run build/lint/tests; view screenshots at 320/375/768/1280/1440px where tools allow. Correct clipping, spacing, reduced-motion and contrast failures.
8. Report changes, test evidence and limitations; update canonical wiki after substantive verified changes.

## Minimum components

Marketing: nav, hero, product demo, card, status pill, section header, CTA, code panel, mobile menu, footer, FAQ.
Dashboard: side navigation, events table, verdict badge, agent profile, integration key form, approval interaction, empty/error/loading states.

All controls must define default, hover, focus-visible, active, disabled, loading and error where applicable. Buttons must be buttons, links must be links. Treat demo inputs as synthetic and prominently label them.

## Creative restrictions

No fake customer logos, metrics, testimonials or security coverage. No logo copied from the upstream project or Notch. No stock hooded-hacker art, plasma effects, generic purple SaaS gradients or font size below legible accessibility thresholds. Maintain explicit source attribution in the product docs.
