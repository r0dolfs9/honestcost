# FABLE5 Product Audit

Date: 2026-06-11  
Branch: `codex/fable5-honestcost-redesign`  
Baseline commit: `9f88ca0 fix: restore truncated index.html tail - deployed page rendered blank`

## Verified Current State

- The live GitHub Pages product at `https://r0dolfs9.github.io/honestcost/` returns `200 OK`; `Last-Modified: Thu, 11 Jun 2026 06:33:27 GMT`.
- The app remains a static, framework-free product centered on `index.html`, with `car-db.js` lazy-loaded only after opening the car picker.
- Existing tests passed before implementation: `test-calc.js`, `test_scenarios.js`, `test-ui-helpers.js`, `test-static-pages.js`, `test-car-sources.js`, and `test-audited-car-db-values.js`.
- The required BMW 740d xDrive vs Porsche 911 Carrera scenario currently produces: BMW `€1,984/month`, `€119,035/5y`; Porsche `€2,273/month`, `€136,370/5y`; BMW cheaper by `€289/month`. This includes the picker-style auto-OCTA estimate of `€300/year` for both cars.
- Current core flows work in local browser automation after the layout fix: database search, both-car selection, analysis, share hash creation, saved scenario storage, edit return, theme toggle, and checked responsive viewports.
- Browser evidence found no framework/build overlay because the product is static HTML; console warnings are limited to EmailJS deprecation and Plausible localhost ignores.

## Highest-Impact Problems

1. Result trust was still mostly textual. `car-sources.js` contains useful row-level source metadata, but the result cards did not surface whether values are source-backed, stale, mapped, or estimated.
2. Hidden tooltip panels and decorative hero orbs created real horizontal overflow at `768x1024` and `390x844`, despite `overflow-x: clip`. This made mobile/tablet QA fail on document width.
3. The trust section had stale copy: OCTA was described as displacement-based even though the current engine uses kW when known, and TEN copy still said “9 brackets.”
4. First impression is polished but still dense. New visitors see the value proposition and example chips, but manual input remains intimidating because advanced fields are exposed inside each car card.
5. Result comprehension is strong numerically, but the story could be clearer: what changed the answer, which assumptions are editable, and which rows are estimates need more visible hierarchy.
6. Email capture is explicitly demo-mode because EmailJS keys remain placeholders. This is acceptable if labelled honestly, but it should not be treated as a production lead loop.
7. `test_scenarios.js` still duplicates older constants rather than extracting the production engine, so it is useful as a broad scenario harness but not a perfect production-regression source.

## What Should Be Preserved

- Static deployment and no build system.
- Local, immediate calculation without login or backend.
- Existing calculation functions and constants unless a separately tested formula correction is made.
- Lazy car database loading.
- Shareable hash restore, saved local scenarios, edit return, and print workflow.
- Result-screen recalculation sliders.
- Parametric car silhouette fallback from `car-visuals.js`.
- Honest language: indicative estimates, no fake partners, no fabricated usage counts, no unsupported audit or legal claims.

## Contradictions Found In Older Documents

- `BROWSER_QA_2026-06-10.md` and `RESEARCH_UX_VISUALS_2026-06-10.md` list share URLs and examples as missing; current HEAD has `encodeShareState`, `decodeShareState`, `copyShareLink`, and example chips wired.
- `AUDIT.md` flags OCTA as displacement-based and TEN copy as inconsistent; current code has kW-first OCTA and the TEN tests cover a granular table, but some explanatory copy had not caught up until this pass.
- The design handoff says self-hosted fonts should replace Google Fonts; current production still uses Google Fonts in `index.html`, while `fonts.css` exists. This remains a performance/privacy improvement opportunity.
- Older docs refer to 376 cars; current `car-db.js` reports 416 rows in browser automation.
- Handoff copy assumes the selected Studio direction is final. For this FABLE5 pass, three directions were re-evaluated against the current product, and the winning recommendation is a tighter decision-product evolution rather than a wholesale new theme.

## Audit Conclusion

The strongest realistic version of HonestCost is not a flashier calculator. It is a calm decision product with faster examples, visible source confidence, a clearer result narrative, and mobile-safe layout. The product already has strong calculation depth; the main lift is converting that depth into trust and comprehension without making the UI heavier.

## Product Choice After Review

The chosen direction is **Decision Ledger default + Assumption Inspector next**.

Decision Ledger should remain the first experience: two cars, fast comparison, clear winner, monthly and five-year cost, visible source confidence. Assumption Sheet should become the proof layer behind that result: formulas, editable assumptions, source/default/estimate status, and cost-line impact.

This was not built fully in the production pass because it is a real interaction and calculation-surface change, not only styling. The next implementation should add the inspector as a result-screen drill-down while preserving the current default summary and tested BMW/Porsche regression.
