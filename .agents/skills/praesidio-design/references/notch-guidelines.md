# Notch-inspired design reference — interpreted from user-supplied guidance

The user supplied a structured Notch style foundation and a `SKILL.md` specification. This is a concise adaptation for PRAESIDIO, not an assertion that it accurately reflects every live detail of trynotch.net.

## Intent
A calm, precise, implementation-ready premium marketing system with readable typography and deliberate motion. Primary type Geist with Noto Sans Arabic fallback. Clear typography hierarchy, warm dark surfaces and high readability.

## Original supplied tokens worth preserving in spirit
- Geist family, Noto Sans Arabic fallback.
- Calm black/ivory contrast and neutral supporting colors.
- Restrained soft radii 4–16px and subtle shadows.
- Transitions in approximate 200–600ms family, reduced where appropriate for responsive UI.
- WCAG 2.2 AA, keyboard-first interaction, explicit focus-visible rules, contrast, responsive behavior, error and loading states.

## Source-token conflicts
The user's supplied dump says `font.size.base=16px` and a headline-like scale topping at 15px, with xs down to 8px. This is internally inconsistent and too small for legible page typography. PRAESIDIO must use a coherent 16px body, readable 14px secondary, and fluid 48–108px hero headings with appropriate line height.

The Notch reference represents a teleprompter product; do not carry its teleprompter copy, product mockup, iconography, wordmark, licensing or proprietary layout into PRAESIDIO. Rebuild original compositions that represent security decisions.

## Components
Default / hover / focus-visible / active / disabled / loading / error states required where meaningful. Each interactive component needs keyboard, pointer and touch behavior documented. Use a space scale and tokens; no one-off unreviewed values. Handle long content, overflow, empty data and no-backend state.

## Visual hook
PRAESIDIO's hero moment should be **agent tool action → risk context → DENY/HOLD/ALLOW verdict → evidence reference**. This creates a branded visual that relates to the product instead of a generic monitoring illustration.

## QA
Test contrast, screen-reader text, keyboard controls, 320px mobile, zoom, reduced motion, broken pages, and claims. Record screenshots before claiming success.
