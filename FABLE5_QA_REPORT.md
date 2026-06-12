# FABLE5 QA Report

## 2026-06-12 follow-up pass — Assumption Inspector

Scope: implemented the "next move" from `FABLE5_DESIGN_DECISION.md` (Assumption Inspector) and closed the viewport gaps from the 2026-06-11 pass.

### Changes

- `index.html`: pure helpers `assumptionKindLabel`, `assumptionInfo`, `assumptionDetailMarkup`; each result cost row is now a keyboard-operable toggle (`aria-expanded`) that expands an inline detail row with a provenance chip (Lietotāja / DB vērtība, Noklusējuma pieņēmums, Modeļa aplēse, Likumā noteikts), a plain-language formula description, and where to edit it. No calculation code, constants, or car values were changed. Summary totals are unchanged until a row is opened.
- `test-ui-helpers.js`: coverage for all 10 cost keys, provenance kinds (TEN statutory, repair estimate, KASKO default, fuel default→user flip), markup escaping, and a shipped-HTML wiring check.

### Commands executed (sandboxed Linux, Node v22.22.3, Chromium via playwright-core)

- All 7 suites pass: `test-calc.js`, `test_scenarios.js` (ALL 7 SCENARIOS PASS), `test-ui-helpers.js`, `test-static-pages.js`, `test-car-sources.js`, `test-audited-car-db-values.js`, `test-fable5-regression.js` (BMW 740d vs Porsche 911 baseline passed).
- Browser smoke `smoke2` (evidence: `qa/fable5/browser-smoke-after2.json`): ALL PASS.

### Browser journey verified (after change)

- Lazy DB (CAR_DB absent on load, 416 rows after picker), search + both-car selection, analysis, share hash in URL.
- Baseline regression identical: BMW `€1984/mēn`, `€119 035/5g`; Porsche `€2273/mēn`, `€136 370/5g`; winner BMW, `€289/mēn`, `€17 335/5g`.
- Inspector: 20 toggles (10 per car); click opens detail (`aria-expanded=true`); Enter key closes it; result-screen km slider recalculation still works with inspector present; no horizontal overflow at 390px with a detail row open.
- Reduced-motion context loads cleanly. No console errors recorded.

### Viewports verified (home, no horizontal overflow)

1440x900, 1280x800, **1024x768**, 768x1024, **430x932**, 390x844, **360x800** — the three bolded widths were the gaps from the previous pass. Screenshots: `qa/fable5/after2-*.png`, incl. `after2-inspector-open-desktop.png` and `after2-inspector-open-mobile-390.png`.

### Remaining limitations

- Inspector detail describes assumptions; it does not yet edit values inline (editing remains on the input screen, one tap away via Rediģēt).
- OCTA provenance cannot distinguish auto-estimate from a manually typed value; the detail text states this honestly.
- EmailJS demo mode, partial source metadata, and `test_scenarios.js` constant duplication remain as noted below.

---

## 2026-06-11 initial pass

Date: 2026-06-11  
Local URL tested: `http://localhost:8123/`  
Browser path: Browser plugin attempted twice, but its Node runtime failed with `windows sandbox failed: spawn setup refresh`; QA used bundled Playwright Chromium as fallback.

## Commands Executed

Syntax checks:

- `node --check test-calc.js` - pass
- `node --check test_scenarios.js` - pass
- `node --check test-ui-helpers.js` - pass
- `node --check test-static-pages.js` - pass
- `node --check test-car-sources.js` - pass
- `node --check test-audited-car-db-values.js` - pass
- `node --check test-fable5-regression.js` - pass
- `node --check fable5-browser-smoke.js` - pass

Automated tests:

- `node test-calc.js` - `test-calc.js: all assertions passed`
- `node test_scenarios.js` - `Overall: ALL 7 SCENARIOS PASS`
- `node test-ui-helpers.js` - `test-ui-helpers.js: all assertions passed`
- `node test-static-pages.js` - `test-static-pages.js: all assertions passed`
- `node test-car-sources.js` - `test-car-sources.js: all assertions passed`
- `node test-audited-car-db-values.js` - `test-audited-car-db-values.js: all assertions passed`
- `node test-fable5-regression.js` - `test-fable5-regression.js: BMW 740d vs Porsche 911 baseline passed`

Browser smoke:

- `$env:NODE_PATH='C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules;C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\node_modules'; node fable5-browser-smoke.js http://localhost:8123/ qa\fable5 after` - pass

## Browser Journey Tested

- Initial load: page title `HonestCost — Pilnās automobiļa izmaksas`.
- Lazy database loading: `window.CAR_DB` was false on load and became `416` rows after opening the picker.
- Car search and selection: `BMW 740d xDrive` and `Porsche 911 Carrera`.
- Financing assumptions: 5 years, 15,000 km/year, financial leasing, 20% down, 4.5% APR, 48 months, 20% residual.
- Analysis: result screen rendered two result cards and verdict.
- Share URL: result URL contained `#s=`.
- Saved scenario: localStorage scenario count became `1`.
- Theme persistence path: theme toggle changed document theme to `dark`.
- Edit return: `Rediģēt` returned to the input screen.

## Viewports Tested

From `qa/fable5/browser-smoke-after.json`:

| Viewport | Scroll width | Overflow |
|---|---:|---|
| 1440x900 | 1440 | No |
| 1280x800 | 1280 | No |
| 768x1024 | 768 | No |
| 390x844 | 390 | No |

Screenshots saved:

- `qa/fable5/after-home-desktop-1440x900.png`
- `qa/fable5/after-results-desktop-1440x900.png`
- `qa/fable5/after-home-tablet-768x1024.png`
- `qa/fable5/after-home-mobile-390x844.png`
- `qa/fable5/design-directions-1440x900.png`

## Calculation Regression

Required baseline, protected by `test-fable5-regression.js`:

- BMW 740d xDrive: `€1,984/month`, `€119,035/5y`
- Porsche 911 Carrera: `€2,273/month`, `€136,370/5y`
- Winner: BMW 740d xDrive
- Difference: `€289/month`, `€17,335/5y`
- Auto-OCTA baseline: `€300/year` for both cars

Browser text evidence matched the settled regression numbers after waiting for the count-up animation to finish.

## Accessibility Findings

- Existing icon-only theme toggle has an accessible label.
- Existing tooltip buttons have `aria-label="Paskaidrojums"`.
- The source-confidence badge is text, not color-only.
- Horizontal overflow caused by hidden tooltip boxes and decorative hero orbs was reproduced and fixed.
- Full screen-reader and axe-core audits were not completed in this pass.

## Changes Verified

- Source-confidence badge helpers added and tested in `test-ui-helpers.js`.
- Result cards now show `Avots pārbaudīts`, `Avots atšķiras`, `Vajag kartēšanu`, or `Aplēses dati` based on existing `car-sources.js` metadata.
- `car-sources.js` loads statically before the app script; no calculation code or car values were changed.
- Saved/share state now preserves selected car IDs when available.
- Trust copy now matches current OCTA and TEN behavior.
- Hidden tooltip boxes and decorative hero orbs no longer create tablet/mobile document overflow.

## Console Notes

Browser automation recorded warnings from EmailJS deprecation and Plausible ignoring localhost events. No app-breaking console errors were recorded.

## Remaining Limitations

- Browser plugin could not be used because the runtime setup failed; Playwright fallback was used.
- The full requested viewport matrix also includes `360x800`, `430x932`, and `1024x768`; this pass verified `390x844`, `768x1024`, `1280x800`, and `1440x900`.
- EmailJS remains demo/placeholder-key mode.
- `test_scenarios.js` still duplicates older constants rather than extracting production code.
- Source metadata is partial; many premium German rows still display as estimates until audit evidence is added.
