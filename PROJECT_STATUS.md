# HonestCost — Project Status
**Last updated:** 2026-05-15

---

## Identity

- **Confirmed name:** HonestCost
- **GitHub:** https://github.com/r0dolfs9/honestcost (private)
- **Local folder:** `C:\Users\User\Desktop\NEW_CAR_TCO_CALCULATOR\`
- **Type:** Standalone product — completely separate from KAS-PA-AUTO
- **Purpose:** Side-by-side new car TCO comparison for Latvian consumers. Monthly cost as hero metric.

---

## Current Status: MVP v1.0 BUILT (2026-05-07)

`index.html` is complete and lives in this folder. Code has NOT been pushed to GitHub yet.

### What's in v1.0

**Two-screen flow:**
- Screen 1 — input form (Car A vs Car B)
- Screen 2 — results. Analyse button transitions, back button returns with preserved state.

**Calculation engine (all functions implemented):**
| Function | What it does |
|---|---|
| `calcTEN` | CO2 tax lookup table |
| `calcLeasing` | PMT formula with correct residual discounting |
| `calcFuelICE/EV/PHEV` | Fuel costs with charging loss factors |
| `calcResidualValue` | Compound depreciation per category |
| `calcKaskoAnnual` | KASKO on current residual each year (decreasing) |
| `calcServiceAnnual` | Interval-based km service visits |
| `calcTyresAnnual` | Flat annual cost from R3 research |
| `calcRepairBuffer` | €0 during warranty, buffer + 10%/yr escalation after |
| `calcAll` | Master function with year loop |

**Bugs fixed at build time:**
- BUG-1: parking/washing outside loop (× 12 × N, not × 12 per year)
- BUG-2: TYRE_ANNUAL_COST flat lookup `{small:325, mid:390, large:503, suv:675}`
- MISSING-1: CSDD TA €40 at year 3 and year 5
- C1: suv_mid depreciation adjusted from RAV4 outlier

---

## Architecture

- Single HTML file, no build step, no backend
- Desktop-first, min-width 1100px
- All CSS + JS inline
- **Design:** Indigo `#3B4FE4` primary, Amber `#F59E0B` accent, Car A = Blue `#3B82F6`, Car B = Violet `#7C3AED`
- **Fonts:** Barlow Condensed (hero), Barlow (headings), Inter (body), DM Mono (cost values)

---

## Key Constants (in code)

```js
// Values currently in index.html — some are WRONG, see CONTRADICTIONS.md
DEP_RATES: { economy, mid, premium, suv_mid, premium_suv, ev, phev }
TYRE: { small:325, mid:390, large:503❌, suv:675❌ }  // large should be 450, suv should be 555
REPAIR_BUFFER_BASE: { ... }  // ❌ Using PROJECT_PLAN placeholders, NOT R2 research values
FUEL: { petrol:1.75, diesel:1.70, homeElec:0.13❌, pubElec:0.38 }  // homeElec should be 0.18
OCTA_EST: { ev:90❌, s:110❌, m:145❌, l:200❌, xl:300❌ }  // All wrong — see R8 + CONTRADICTIONS.md
// EV home charging default: 70%❌ — should be 66% (Latvia 2024 actual data)
```

---

## Status Update (REVISED 2026-05-15 — Session 2)

### ✅ PRE-LAUNCH CHECKLIST — ALL COMPLETE

1. ~~Push to GitHub~~ ✅ DONE
2. ~~R6/R7/R8 research~~ ✅ DONE — see RESEARCH_FINDINGS.md + RESEARCH_FINDINGS_R6R8.md
3. ~~Cross-reference audit~~ ✅ DONE — CONTRADICTIONS.md (10 issues found and documented)
4. ~~Apply code fixes to `index.html`~~ ✅ DONE — 6 fixes applied:
   - TYRE: large 503→450, suv 675→555 + button labels updated
   - REPAIR_BUFFER_BASE: R2 research values applied
   - DEP_RATES ev: [0.25,0.16,0.14,0.12,0.12] → [0.30,0.13,0.08,0.08,0.07]
   - OCTA_EST: {ev:130, s:75, m:110, l:150, xl:240}
   - homeElec: 0.13 → 0.18 + EV home slider 70% → 66%
   - **ten() function: replaced invented 9-bracket table with correct 14-bracket WLTP law (01.01.2025)**
5. ~~Browser testing~~ ✅ DONE — all 7 scenarios pass (test_scenarios.js saved to folder)
6. ~~R9 — TEN transport tax validation~~ ✅ DONE — **major fix applied** (see CONTRADICTIONS.md #10)

### 🟡 NEXT SPRINT

7. **R10 — New car buyer psychology** — what costs do buyers most underestimate? Informs UI tooltips
8. **R11 — Dealer add-ons feature** — needs brainstorm before implementation
9. **R12 — Car data pre-fill/search** — needs brainstorm before implementation

---

## Planned Features (not yet designed or built)

### Dealer Add-Ons / Options System
User can add/remove individual options (panoramic roof, heated seats, sport package) affecting:
- Purchase price → affects leasing payment, depreciation, KASKO
- Fuel consumption (bigger wheels → higher L/100km)
- Tyre category (larger tyre option package)

