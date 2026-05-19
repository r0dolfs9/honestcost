# HonestCost TCO Calculator — Research Findings R6, R7, R8
**Compiled:** 2026-05-15  
**Purpose:** Replace placeholder defaults with real Latvia-market data  
**Sources:** Moller Auto VW Latvia, BMW Inchcape Latvia, WESS/Amserv Toyota Latvia, autopase.lv, uzladets.lv, eleport.com, ignitison.lv

---

## R6 — Latvia Authorized Dealer Service Costs

### Methodology
Primary sources: official dealer websites for each brand in Latvia, cross-referenced with autopase.lv market analysis. All prices are in EUR and reflect 2024–2026 Latvian market pricing.

---

### VW — Moller Auto Latvia (Official VW Importer)
**Source:** mollerauto.volkswagen.lv/akcijas/katrs-vw-ir-pelnijis-autorizeto-servisu

| Item | Price (EUR) |
|------|-------------|
| Oil service + full inspection (regular price, 4-cyl) | **€265 – €323** |
| Oil service + full inspection (promotional, cars 4+ years) | €175 |
| Commercial vehicle full service | €430 (promo) / €668–742 (regular) |

**Service interval:** every **30,000 km** or **24 months**, whichever comes first  
**Applies to:** Golf, Tiguan, Passat, Polo (4-cylinder petrol/diesel)  
**Excludes:** 6-cylinder engines, VW R models, Crafter, Transporter, Multivan, Caravelle

**Full service includes:**
- Engine oil + oil filter change
- Air filter, cabin filter, fuel filter (diesel), spark plugs (petrol)
- Complete 360° technical inspection (lights, brakes, steering, suspension, exhaust, battery, cooling)
- Electronic diagnostic scan + written report
- Service interval reset + Volkswagen stamp in service book

**→ Best single value to use in code:** `€290` per visit (midpoint of regular range; promo is temporary)

---

### Skoda — Verte Auto / Skandi Motors Latvia (Official Skoda Dealers)
**Source:** verteauto.lv, greenmotors.lv, skoda.skandimotors.lv

Skoda shares the VW Group (VAG) platform and service schedule. No public price list on authorized dealer websites (prices given on appointment). Based on VW pricing and VAG platform parity:

| Model | Estimated Service Cost | Interval |
|-------|------------------------|----------|
| Fabia (1.0 TSI) | €200 – €250 | 30,000 km / 24 months |
| Octavia (1.5 TSI / 2.0 TDI) | €220 – €270 | 30,000 km / 24 months |
| Kodiaq (2.0 TSI / 2.0 TDI) | €250 – €300 | 30,000 km / 24 months |

**→ Best single value to use in code:** `€240` per visit

---

### BMW — Inchcape Latvia (Sole Official BMW Importer)
**Source:** bmw-inchcape.lv/bmw-servisa-cenradis/ (price list page, partially rendered)

| Service Item | Price (EUR) |
|--------------|-------------|
| Labor rate (repair work) | **from €112/hour** |
| Mechanical diagnostics (rolling chassis, brakes) | from €66.50 |
| Electronics diagnostics | from €112 |
| Pre-purchase inspection | €123.50 |
| Wheel/tire swap (per axle) | from €62 |

**Estimated oil service visit cost (3 Series, 5 Series):**  
1.5–2 hours labor (€168–224) + BMW original oil + filters (€100–150) = **~€280–380 per visit**  
BMW annual maintenance total (autopase.lv Latvia data): ~€800–€1,500/year (includes all planned maintenance, excludes unplanned repairs)

**Service interval:**  
- Older models (pre-2010): 15,000 km / 12 months  
- Modern models with CBS (Condition-Based Service): typically 20,000–30,000 km; system notifies driver when due

**→ Best single value to use in code:** `€350` per visit, `20,000 km` interval

---

### Toyota — WESS Motors / Amserv Latvia (Official Toyota Dealers)
**Source:** toyota.wess.lv/maintenance-and-services, amservmotors.lv

| Item | Details |
|------|---------|
| Service interval | **15,000 km or 1× per year**, whichever first |
| Authorized dealer oil service (Yaris, Yaris Cross) | ~€120–€180 estimated |
| Authorized dealer oil service (RAV4, Corolla) | ~€150–€220 estimated |

**Note:** Toyota authorized dealer Latvia does not publish a public price list online. Cross-referenced with independent service prices (oil change from €49, full service from €89 at non-authorized centers) and applying a typical 40–60% authorized dealer premium. Toyota service is generally cheaper than VW/BMW at authorized level.

Toyota-specific service notes:
- Hybrid models (Yaris Hybrid, RAV4 Hybrid, Corolla Hybrid): same 15,000 km / 12-month interval; brake pads last longer due to regenerative braking; no separate HV battery maintenance required in typical service cycle
- Toyota hybrids do NOT require CVT/gearbox fluid changes at standard intervals

**→ Best single value to use in code:** `€160` per visit, `15,000 km` interval

---

### R6 Summary Table

| Brand | Model Example | Cost/Visit (€) | Interval (km) | Notes |
|-------|--------------|----------------|----------------|-------|
| VW | Golf, Tiguan | **€290** | 30,000 | Moller Auto regular rate |
| Skoda | Octavia, Fabia | **€240** | 30,000 | VAG platform, estimate |
| BMW | 3 Series, 5 Series | **€350** | 20,000 | Inchcape LV, €112/h labor |
| Toyota | Yaris, RAV4 | **€160** | 15,000 | WESS/Amserv estimate |

---

## R7 — EV Home vs. Public Charging Split in Latvia

### Key Finding: The 80/20 default is outdated — real Latvia data shows ~66/34

**Primary source:** uzladets.lv analysis of 2024 Latvia EV charging data (published 2025)

| Metric | Value |
|--------|-------|
| Home/work charging share (2024) | **~66%** |
| Public network share (2024) | **~34%** |
| Prior year (2023) public share | ~30% |
| Year-over-year shift toward public | +4 percentage points |

**Explanation (from uzladets.lv):** Public charging networks delivered approximately 7.9 GWh of electricity in 2024, which equals ~34% of total estimated EV electricity demand (calculated from ~7,801 average EVs on Latvian roads × 15,000 km/year × 20 kWh/100 km = 23.4 GWh total). The trend is toward *more* public charging as EV adoption broadens beyond early adopters who own homes with private charging.

**Supporting data (Ignitis ON Latvia survey):**
- 15% of Latvian EV/PHEV owners *never* charge at home
- Among apartment building residents: 42% primarily rely on public charging alternatives

**Trend note:** As Latvia's EV market grows from early adopters (who own homes/garages) to broader population (many of whom live in Soviet-era apartment blocks), the public share will continue rising. A 65/35 or even 60/40 split is likely by 2027–2028.

---

### Public Charging Prices in Latvia (2026 data)

**Source:** eleport.com/price-report-latvia/ (published March 2026), autopase.lv/en/celvedis/elektroauto-uzlade

| Network | Pricing | Notes |
|---------|---------|-------|
| **Home (night tariff)** | €0.15–0.20/kWh | Cheapest option |
| **Home (day tariff)** | €0.20–0.25/kWh | Standard residential rate |
| **Eleport** | €0.39/kWh (most), €0.44/kWh (some) | Just below Latvia median |
| **Virši** | €0.28–€0.42/kWh | 6 power tiers (40 kW→320 kW); most granular in Europe |
| **CSDD / e-mobi** | €0.23/minute | Legacy per-minute pricing; 100+ stations across Latvia |
| **Elektrum (Latvenergo)** | ~€0.35–0.40/kWh | Subscription plans available |
| **IONITY** | €0.71/kWh standard, €0.42/kWh with €11.99/mo subscription | Highest price; highway locations |
| **Tesla Supercharger** | €0.38/kWh | Latvia (Tesla vehicles only, as of Feb 2026) |

**Latvia average fast charging:** ~€0.40/kWh — 3rd cheapest in Europe (source: Eleport European price report 2026)

**Full charge cost comparison (60 kWh battery):**
- At home: ~€9–€15
- Public Level 2 (AC): ~€18–€24
- DC fast charge: ~€24–€43

---

## R8 — Real OCTA Insurance Rates Latvia

### ⚠️ CRITICAL ARCHITECTURAL NOTE FOR THE CODE

**Latvia's OCTA is calculated on engine POWER (kW), NOT engine displacement (cc/cm³).**

The current code placeholders use cc-based tiers (≤1600cc, 1601-2000cc, etc.). This is the wrong variable. The Latvian OCTA system uses kilowatt output as the primary technical factor. The cc buckets can still be used as a proxy in the UI (since users know their engine size), but internally the mapping to realistic prices must account for the kW→cc relationship.

**Source:** autopase.lv/en/celvedis/auto-apdrosinasana (updated March 2026), Latvia OCTA market data 2026

---

### OCTA Pricing Factors (Latvia)

| Factor | Impact |
|--------|--------|
| Engine power (kW) | Up to 55 kW = minimum coefficient; 220+ kW = maximum coefficient |
| Bonus-malus class | Class 1 (best, 5+ claim-free years) = **−50%**; Class 4 (no history, starting) = base; Class 15 (worst) = **+300%** |
| Driver age | ≤25 years = surcharge up to 100%; over 25 = standard rate |
| Registration location | Riga = **+10–20%** vs. rural |
| Car age | Older cars = slight decrease |
| Insurer choice | **Prices differ 30–50%** between BALTA, ERGO, BTA, If, Balcia, Compensa |

**Bonus-malus progression:** Starting class (no claims history) = Class 4. Each claim-free year = +1 class (better). One OCTA claim = −3 classes (worse). After 3 claim-free years from Class 4 → reach Class 1 (−50%).

---

### Concrete OCTA Price Examples (2026, from autopase.lv)

| Driver Profile | Vehicle | B-M Class | Approx. OCTA/Year |
|----------------|---------|-----------|-------------------|
| Experienced (45 yrs.), **rural** | VW Golf 1.6 TDI (85 kW) | Class 1 | **~€45–€65** |
| Experienced (45 yrs.), **Riga** | VW Golf 1.6 TDI (85 kW) | Class 1 | ~€55–€80 |
| Average (35 yrs.), **Riga** | Toyota Camry (135 kW) | Class 4 | **~€90–€140** |
| Senior (60+ yrs.) | Škoda Fabia (55 kW) | Class 2 | **~€45–€70** |
| Young (22 yrs.), **Riga** | VW Passat (110 kW) | Class 4 | ~€200–€320 |
| Young (20 yrs.), **Riga** | BMW 530i (190 kW) | Class 15 | ~€600–€800+ |

**Latvia population average:** €90–€180/year OCTA

---

### EV-Specific OCTA Notes

- EVs are calculated by motor output (kW), same as ICE vehicles — no EV discount/surcharge by fuel type
- Compact EVs (Leaf, ID.3, MG4): typically 100–150 kW → OCTA ~€90–€150 for experienced Riga driver
- Mid EVs (Tesla Model 3 Standard, ID.4): 150–210 kW → ~€120–€200
- Performance EVs (Tesla Model 3 Performance, BMW i5 M60): 300–500+ kW → significantly higher coefficient; ~€200–€400+

---

### OCTA Rates Mapped to cc-Based Code Tiers (Experienced Driver, Riga, Class 2 ≈ 4 years no claims)

| Code Tier | Typical kW Range | Real OCTA Range | Midpoint to Use |
|-----------|-----------------|-----------------|-----------------|
| EV | 100–300+ kW (very wide) | €90–€300 | **€130** (compact EV assumption) |
| ≤1600cc | ~55–75 kW | €55–€95 | **€75** |
| 1601–2000cc | ~75–115 kW | €85–€130 | **€110** |
| 2001–3000cc | ~115–180 kW | €115–€190 | **€150** |
| >3000cc | ~180–250+ kW | €180–€350 | **€240** |

**Current code placeholders vs. recommended:**

| Tier | Current Placeholder | Recommended | Change |
|------|--------------------|-----------:|--------|
| EV | €90 | **€130** | +€40 (EVs often high kW) |
| ≤1600cc | €110 | **€75** | −€35 (overestimated) |
| 1601–2000cc | €145 | **€110** | −€35 (overestimated) |
| 2001–3000cc | €200 | **€150** | −€50 (overestimated) |
| >3000cc | €300 | **€240** | −€60 (overestimated) |

**Why the current placeholders are too high:** The €145–€300 range seems to have been calibrated for a mid-range bonus-malus class (Class 4–8) or a younger driver. For an experienced driver with 5+ years of no claims (Class 1–2), prices are materially lower. If the app targets average Latvian buyers (who typically have 5–10 years of driving history), the lower values are more accurate.

---

## Recommended Constants — JS Values to Plug In

```javascript
// ─────────────────────────────────────────────────────────
// R6 — Authorized Dealer Service Costs (Latvia, 2025–2026)
// Sources: Moller Auto VW LV, BMW Inchcape LV, WESS Toyota LV
// ─────────────────────────────────────────────────────────
const DEALER_SERVICE_COSTS = {
  vw:     { costPerVisitEUR: 290, intervalKm: 30000 },
  skoda:  { costPerVisitEUR: 240, intervalKm: 30000 },
  bmw:    { costPerVisitEUR: 350, intervalKm: 20000 },
  toyota: { costPerVisitEUR: 160, intervalKm: 15000 },
};
// Annual dealer service cost ≈ costPerVisitEUR × (annualKm / intervalKm)
// Example: VW Golf, 15,000 km/year → 290 × (15000/30000) = €145/year
// Example: BMW 3 Series, 15,000 km/year → 350 × (15000/20000) = €263/year


// ─────────────────────────────────────────────────────────
// R7 — EV Charging Split Latvia (2024 data, uzladets.lv)
// Home includes: private garage wallbox, home socket, workplace charging
// ─────────────────────────────────────────────────────────
const EV_CHARGING_SPLIT = {
  homeShare:   0.66,  // was 0.80 — update recommended
  publicShare: 0.34,  // was 0.20 — update recommended
};

const EV_CHARGING_PRICES_LV = {
  homeKwhEUR:         0.19,  // avg of night (0.17) and day (0.22) tariff mix
  publicLevelTwoEUR:  0.37,  // Eleport/Virši AC average
  publicDcFastEUR:    0.40,  // Latvia avg fast charging (Eleport 2026 report)
  publicAvgWeighted:  0.39,  // blended public avg (AC + DC mix)
};
// Suggested weighted public price to use in TCO: €0.39/kWh
// For simple model: home €0.19, public €0.39


// ─────────────────────────────────────────────────────────
// R8 — OCTA Annual Cost Latvia (experienced Riga driver,
//       5+ years no claims, Class 2 bonus-malus)
// Source: autopase.lv, Latvia OCTA market 2026
//
// ⚠️  NOTE: Latvia OCTA is calculated on engine POWER (kW),
//     not displacement (cc). The cc tiers below are UI proxies
//     mapped to typical kW ranges. Consider a kW-based
//     internal model for greater accuracy.
// ─────────────────────────────────────────────────────────
const OCTA_ANNUAL_EUR = {
  ev:        130,   // compact EV (100–150 kW); performance EVs → up to €300+
  lte1600cc:  75,   // typically 55–75 kW
  lte2000cc: 110,   // typically 75–115 kW
  lte3000cc: 150,   // typically 115–180 kW
  gt3000cc:  240,   // typically 180+ kW
};
// Range note: prices vary 30–50% between insurers.
// Riga surcharge is already baked in (+15% vs. rural avg).
// For users outside Riga, reduce by ~12%.
```

---

## Data Quality Notes

| Research Item | Confidence | Source Type |
|---------------|-----------|-------------|
| VW service price | **High** | Direct from official Moller Auto Latvia website |
| Skoda service price | **Medium** | Estimate (VAG platform parity, no public price list) |
| BMW labor rate | **High** | Direct from BMW Inchcape Latvia price list |
| BMW per-visit estimate | **Medium** | Calculated from hourly rate + parts estimate |
| Toyota service price | **Medium** | Official interval confirmed; price estimated from market data |
| EV home/public split | **High** | Primary research analysis by uzladets.lv (Latvia EV community) |
| EV charging prices | **High** | Eleport Latvia market report, March 2026 |
| OCTA price examples | **High** | autopase.lv Latvia car insurance guide, updated May 2026 |
| OCTA kW vs cc note | **High** | Confirmed from official Latvia OCTA factor documentation |

---

*End of report. For live OCTA quotes, use octas.lv or octa24.lv calculators. For current dealer pricing, contact Moller Auto (VW), Verte Auto (Skoda), Inchcape Motors (BMW), or WESS/Amserv (Toyota) directly.*
