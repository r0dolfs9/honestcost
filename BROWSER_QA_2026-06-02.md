# HonestCost Browser QA - 2026-06-02

Target: `https://r0dolfs9.github.io/honestcost/`

Scope: deployed availability checks plus local automated verification. Interactive browser and mobile viewport testing were attempted but blocked by the Windows browser/sandbox startup failure, so this note does not claim a full manual browser/mobile pass.

## Summary

- Main GitHub Pages app responds with HTTP 200.
- `faq.html` responds with HTTP 200.
- `status.html` responds with HTTP 200.
- `og-image.png` responds with HTTP 200 and `Content-Type: image/png`.
- Local automated checks all passed.
- Full interactive checks for car picker lazy-load, example comparison, saved scenarios, print/PDF, console runtime errors, and mobile layout still need a real browser pass.

## Deployed Endpoint Checks

| Item | Result | Evidence |
|---|---|---|
| Main app | PASS | `curl.exe -I https://r0dolfs9.github.io/honestcost/` returned `HTTP/1.1 200 OK`, `Content-Type: text/html; charset=utf-8`. |
| FAQ page | PASS | `curl.exe -I https://r0dolfs9.github.io/honestcost/faq.html` returned `HTTP/1.1 200 OK`. |
| Status page | PASS | `curl.exe -I https://r0dolfs9.github.io/honestcost/status.html` returned `HTTP/1.1 200 OK`. |
| OG image | PASS | `curl.exe -I https://r0dolfs9.github.io/honestcost/og-image.png` returned `HTTP/1.1 200 OK`, `Content-Type: image/png`. |

## Automated Local Checks

| Command | Result |
|---|---|
| `node test-calc.js` | PASS |
| `node test_scenarios.js` | PASS, all 7 scenarios passed |
| `node test-ui-helpers.js` | PASS |
| `node test-static-pages.js` | PASS |
| `node test-car-sources.js` | PASS |

## Not Fully Verified Yet

These require a working browser session or physical/manual device pass:

- Car picker lazy-load behavior in the deployed app.
- Example comparison click-through in the deployed app.
- Saved scenarios save/load/delete behavior in deployed browser storage.
- Print/PDF flow from the deployed result screen.
- Deployed console/runtime errors.
- Mobile/responsive layout at phone and small-tablet widths.
- Visual confirmation of OG/social preview rendering.

## Current Risk Assessment

- Blocker: none found from endpoint/static/local automated checks.
- Major: deployed interactive browser QA is still incomplete due to tool/browser startup failure.
- Minor: content-marker check for OG tags in deployed HTML was not completed after a sandbox retry failure, but the OG image endpoint itself is live.

## Next Actions

1. Re-run this QA in a working browser session and capture desktop/mobile screenshots.
2. Test car picker lazy-load and example comparison first.
3. Test saved scenarios and print/PDF second.
4. Only after browser/mobile QA passes, continue with CSP meta policy or publishing trust pages.
