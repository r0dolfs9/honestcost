# Fixes & Changes Before / During Build
Generated from audit: 2026-05-07

---

## CRITICAL — Fix in PROJECT_PLAN.md BEFORE writing any code

### BUG 1 — Parking/washing multiplied N times (wrong at any ownership period > 1 year)
**Where:** PROJECT_PLAN.md, Section 9.11, `calcMonthlyTotal` function
**Problem:** The line `totalCost += (car.parkingMonthly + car.washingMonthly) * 12;`
is inside the `for (let y = 1; y <= N; y++)` loop — so at 5 years it adds 5 years
of parking/washing per year instead of 1. Result is 5x too high.
**Fix:** Move that line OUTSIDE the loop, like this:
```
totalCost += (car.parkingMonthly + car.washingMonthly) * 12 * N;
```

### BUG 2 — TYRE_COSTS structure conflicts with TYRE_ANNUAL_COST from research
**Where:** PROJECT_PLAN.md, Section 9.8 (`TYRE_COSTS` object + `calcTyresAnnual` function)
**Problem:** R3 research produced a flat annual cost table (`TYRE_ANNUAL_COST` by rim size)
that replaces the old km-based calculation. The two are incompatible. Building with
the old structure will cause a type error or wrong numbers.
**Fix:** Delete `TYRE_COSTS`, `TYRE_MOUNTING_PER_YEAR`, and `calcTyresAnnual` from the plan.
Replace with one line using the R3 data:
```
const annualTyreCost = TYRE_ANNUAL_COST[car.tyreCat];
```
TYRE_ANNUAL_COST values (from R3, autodoc.lv + 8 Riga shops):
```
r16: 325, r17: 390, r18: 450, r19: 555, r20: 675
```

### BUG 3 — Leasing PMT formula needs verification
**Where:** PROJECT_PLAN.md, Section 9.2, `calcLeasing` function
**Problem:** The formula may slightly understate monthly payments when residualPct > 0.
For zero-residual leases it is fine.
**Fix:** Open Excel, run `=PMT(monthlyRate, termMonths, -principal, residualValue)`
and confirm the JS formula produces the same number. Adjust if they differ.
Only relevant when building the leasing calculation path.

---

## MISSING — Add to calculation engine (PROJECT_PLAN.md, Section 9.11)

### MISSING 1 — CSDD Technical Inspection (TA) cost not included
**Problem:** R4 documented the TA cost (~€40, first due at ~36 months, then every 2 years)
but it was never added to `calcAll()`. A 5-year ownership calculation is missing ~€80.
**Fix:** Add conditional cost in the year loop:
```
if (y === 3 || y === 5) totalCost += 40; // CSDD TA
```
Adjust the €40 value once R4 is finalized.

---

## RESEARCH — Complete before launch (affects default values)

### R6 — Latvia authorized dealer service costs (BLOCKING for accurate defaults)
Affects the pre-filled "annual service cost" on the input form.
Call or check websites for: VW Golf, BMW 1-Series, Toyota Yaris, Skoda Octavia.
Riga authorized dealers. Annual service (oil + filter + inspection). Fill into plan constants.

### R7 — EV charging Latvia (home vs public split)
Affects the EV fuel cost calculation defaults.
Check CSDD, Eleport, or Circle K EV pricing pages.

### R8 — OCTA rates by engine size (QUICK WIN — 30 min)
Current values in plan are placeholder guesses.
Go to octas.lv, run calculator for: experienced driver, no claims, Riga, each engine bracket.
Fill in the actual values. Affects every user who doesn't manually enter their OCTA quote.

---

## CODE QUALITY — Fix during build (not blocking, but do it right the first time)

### Q1 — Use textContent not innerHTML for all user input
Any place a user-entered value (car name, etc.) is rendered into the DOM:
use `element.textContent = value` NOT `element.innerHTML = value`.
Prevents XSS. One word change, do it consistently everywhere.

### Q2 — Car photo img onerror fallback
When rendering the user-supplied car photo URL:
```
img.onerror = () => { img.src = 'placeholder.svg'; }
```
Prevents broken image icon when URL fails or is blocked by CORS/hotlink protection.

### Q3 — Tooltip keyboard accessibility
Every tooltip `?` icon needs:
```html
<span class="tooltip-icon" tabindex="0" aria-label="Information">?</span>
```
And in CSS, add `focus` trigger alongside hover:
```css
.tooltip:focus .tooltip-text,
.tooltip-icon:focus + .tooltip-text { visibility: visible; }
```

### Q4 — Responsive minimum width
Add to `.page-wrapper` CSS:
```css
overflow-x: auto;
```
Prevents layout breaking below 1100px — content scrolls horizontally instead.

### Q5 — Pre-fill one test scenario on page load
Pre-populate the form with BMW 1-Series vs BMW X1 (test case P1 from the plan).
Lets first-time visitors see output immediately without filling 20 fields.
Can be a "Load example" button or auto-filled on load.

---

## CALIBRATION — Review before finalizing constants

### C1 — suv_mid depreciation rates based on RAV4 Hybrid outlier
Current rates `[0.15, 0.12, 0.10, 0.08, 0.07]` reflect Toyota RAV4 Hybrid's
strong residuals. A Tiguan, Sportage, or Qashqai buyer using `suv_mid` will
see over-optimistic depreciation.
Options:
  A) Add separate `suv_hybrid` category, rename current to `suv_ice` with adjusted rates
  B) Use ICE average `[0.18, 0.13, 0.12, 0.09, 0.08]` and note hybrids retain better

---

## NICE TO HAVE — Post-MVP

- Self-test block: 30 lines of `console.assert()` at bottom of HTML to catch regressions
  when constants are updated (especially DEP_RATES and REPAIR_BUFFER_BASE)
- URL state sharing: encode car inputs in query params so users can share a comparison link
- Car database: searchable dropdown that auto-fills specs for the 13 common models in Section 14
- Dealership white-label: pitch to 2-3 Riga dealers with MVP running BEFORE building the feature
