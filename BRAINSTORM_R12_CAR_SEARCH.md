# R12 — Car Data Pre-Fill / Search System: Brainstorm
**Date:** 2026-05-15  
**Constraint:** Single HTML file, no backend, no build step.

---

## The Problem

Currently HonestCost requires filling ~12 fields per car manually. For a first-time visitor who doesn't know their car's CO2 figure, WLTP consumption, or warranty length, this is a barrier. The tool needs a "search for your car, get pre-filled specs" flow.

---

## Option 1 — Embedded JSON Database (Best fit for single-file constraint)

### How it works

A JavaScript object at the top of `<script>` contains specs for 50–100 common Latvian market models. The user types a model name → live-filtered dropdown → selects trim → all fields populate. User can still edit any pre-filled value.

### Search UX

```
[🔍 Meklēt auto...]  →  BMW 1-Series
                          ↓
                    BMW 1-Series 118i (1.5T Petrol, 136hp)
                    BMW 1-Series 120i (2.0T Petrol, 170hp)
                    BMW 1-Series 120d (2.0 Diesel, 150hp)
```

On selection → all fields populate:
- Price: €32,500 (dealer list, Latvia 2026, indicative)
- Fuel type: Petrol
- Consumption: 5.8 L/100km (WLTP)
- CO2: 128 g/km (WLTP)
- Warranty: 3 years
- Recommended service interval: 20,000 km
- Indicative service cost: €350/visit
- Dep category: mid
- Tyre category: mid (17")

### JSON structure per car

```javascript
const CAR_DB = [
  {
    id: 'bmw_118i',
    brand: 'BMW', model: '1-Series', trim: '118i xLine',
    priceEUR: 32500,    // indicative dealer price Latvia 2026
    ft: 'petrol',
    cons: 5.8,          // WLTP L/100km
    co2: 128,           // WLTP g/km
    warranty: 3,
    svcInt: 20000,
    svcCost: 350,       // BMW authorized dealer Latvia (R6 data)
    dep: 'mid',
    tyre: 'mid',        // 17" standard
    octa: null,         // let OCTA_EST auto-fill from engine cc
    cc: 1499,
    tags: ['bmw','1 series','118','compact','petrol'],
  },
  // ... 50–100 models
];
```

### Key models to include first (Priority 1 — per PROJECT_PLAN Section 14)

| Brand | Models |
|---|---|
| VW | Golf 1.5 TSI, Golf GTE, Golf TDI, Tiguan 1.5 TSI, Tiguan TDI, ID.4 Pro |
| Skoda | Octavia 1.5 TSI, Octavia TDI, Fabia 1.0 TSI |
| BMW | 1-Series 118i/120i/120d, X1 xDrive20i/20d, X3 20d |
| Toyota | Yaris Hybrid, RAV4 Hybrid |
| Mercedes | GLC 220d |
| Volvo | XC40 B3, XC40 Recharge |
| Tesla | Model 3 RWD, Model 3 LR |
| Audi | A4 40 TDI |

**That's ~28 configurations.** A good v1 database. Can grow to 100+ over time.

### Estimated file size impact

~28 cars × 15 fields × avg 8 chars/field ≈ 3,360 bytes unminified. Negligible. Even 200 cars would add ~25KB — fine for a local HTML file.

---

## Option 2 — External API (Rules out for single-file constraint)

Motordata API, AutoScout24 scrape, etc. All require a backend, CORS handling, or API keys. **Not viable for single HTML file.** Skip.

---

## Option 3 — "Load Example" Buttons (Already in FIXES_BEFORE_BUILD Q5)

Pre-populate with 2–3 hardcoded example pairs:
- "BMW 1-Series vs X1" (base case)
- "EV vs Petrol" (VW ID.4 vs Tiguan)
- "Economy" (Yaris vs Fabia)

**Effort:** 30 minutes. This is the minimal version — a "try it now" shortcut rather than a real search.

---

## Search Implementation Plan

### Phase 1 — Load Example buttons (30 min, do now)
Three buttons above the form: "Ielādēt piemēru → BMW 118i vs X1 / ID.4 vs Tiguan / Yaris vs Fabia"
Each button pre-fills all fields for both cars and immediately shows results.

**This eliminates the "blank form" cold-start problem for first-time visitors.**

### Phase 2 — Full search dropdown (1–2 days)
- JSON database embedded in `<script>` block
- Search input replaces the "Auto nosaukums" text field (or sits above it)
- Debounced keyup → filter `CAR_DB` by tags/model/brand → show dropdown
- On select: populate all form fields, set State tiers (tyreA, kaskoA, repairA)
- "Rediģēt" badge appears next to populated fields to indicate they came from DB

### Phase 3 — User editable price (not locked to DB)
DB price is always indicative. Add tooltip: "Latvijas dīlera orientējošā cena 2026. gadā. Ievadiet faktisko piedāvājumu."

---

## Data Sourcing (How to build the database accurately)

**For each model, we need:**
- Price: check manufacturer Latvian website (bmw.lv, vw.lv, toyota.lv, etc.) — listed prices vary by trim. Use base trim of the most popular configuration.
- WLTP cons + CO2: manufacturer spec sheets. These are on every Latvian dealer site.
- Warranty: standard warranty per brand (BMW/Mercedes/VW/Skoda = 3yr, Toyota = 5yr, Tesla = 4yr, Volvo = 5yr)
- Service interval: from R6 research (BMW 20,000km, VW/Skoda 30,000km, Toyota 15,000km)
- Service cost: from R6 research

**Time to build 28-car database:** ~3–4 hours of manual research. Can partially be done with web searches for each model.

---

## "Smart Pre-Fill" Behaviour

When a car is pre-filled from DB:
- All fields populate
- Tyre tier button auto-selects matching tier
- Repair risk defaults to 'med' (user can change)
- KASKO tier defaults to '2.5%' (user can change)
- OCTA auto-fills from cc via OCTA_EST (existing logic)
- A small badge: `📋 Dati no HonestCost datubāzes` appears under car name
- User sees: "Mainiet jebkuru vērtību — rēķins atjaunināsies automātiski"

---

## UX Flow After Pre-Fill

1. User types "VW Golf" → selects "Golf 1.5 TSI" → all fields populate
2. User types "VW ID.4" → selects "ID.4 Pro 77kWh" → all fields populate
3. User clicks "Analizēt" → results appear immediately
4. User can then adjust individual fields (price, km/year, etc.) and re-run

**Cold start to first result: ~15 seconds.** This is the target.

---

## Priority Decision

| Feature | Effort | Impact | When |
|---|---|---|---|
| Load Example buttons (3 pairs) | 30 min | High — eliminates cold start | **Sprint 2, first item** |
| Full search dropdown (28 cars) | 1.5 days | Very high — makes tool usable by non-experts | **Sprint 2, main feature** |
| Expand DB to 100+ models | 4–6 hrs research | Medium — covers more buyer scenarios | Sprint 3 |
| User-contributed corrections | Requires backend | Low (single file) | Phase 3 (web app) |

---

## Open Questions (for decision before build)

1. **Price freshness:** DB prices will go stale within 6–12 months as dealers update lists. Add a tooltip: "Orientējoša cena — pārbaudiet pie dīlera." This manages expectations without requiring live data.

2. **Trim complexity:** BMW 1-Series has 10+ trim levels. Show only the 2 most popular (118i and 120d)? Or show all? **Recommendation:** 2 per model for MVP, expand later.

3. **Used cars:** Out of scope for v1. HonestCost is explicitly for new car comparison. Add "Tikai jauniem auto / New cars only" label near the search.

4. **Photo URLs:** DB could include official press photo URLs for each model. These auto-populate the photo field. Adds polish but depends on URL stability (manufacturer sites sometimes change photo URLs).

---

*Brainstorm complete. Ready to build Phase 1 (Load Examples) immediately after R11 Option 1 is built. Phase 2 (full search) is the Sprint 2 headline feature.*
