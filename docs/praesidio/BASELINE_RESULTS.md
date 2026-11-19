# Original baseline — completed
Last updated: 2026-11-19

Original application source was preserved in commit c8c615c before cosmetic edits.

| Check | Result | Evidence |
|---|---|---|
| frontend npm ci; npm run build | PASS | Next 15.5.18; all 11 pages generated, types checked |
| frontend login screenshot | PASS | output/playwright/baseline-login.png; original form labels lack associations |
| TypeScript npm ci; npm run build; npm test | PASS | core 45 + OpenAI 21 = 66 tests |
| Python editable install + pytest | 421 PASS / 1 FAIL originally | Windows-only test assertion fixed; final 422 PASS |
| Go test ./... | PASS | original 1.25.8: 7 test-bearing packages; final patched 1.26.11 also PASS |
| Docker | PASS after starting daemon | Config, backend/dashboard/setup image builds, frontend container smoke |
| Real model | NOT VERIFIED | no model supplied; 4 GB VRAM; no model download performed |
| frontend npm audit | Original FAIL; final PASS | 8 original advisories including critical Next; final 0 |
| TypeScript npm audit | Original FAIL; final PASS | 8 original advisories; final 0 |

Source findings: engine errors are persisted/pushed as ERROR with empty MAD code, not synthetic M0 (ARCHITECTURE.md is stale). TypeScript gateToolCallIds permits execution when policy handshake fails or verdict is null. Python has newer fail-closed paths; no universal guarantee. Retain production integration code, mark these as inherited security issues.

Final Python dev-dependency and pip scans: 0 findings. Original Go 1.25.8 binary: 24 standard-library findings; rebuilt 1.26.11 binary: 0 reachable findings, with imported/module-only findings still reported. See RELEASE_REPORT.md for final evidence and limits. No live-AI or production-ready claim.
