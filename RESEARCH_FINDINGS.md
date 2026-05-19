# Research Findings — New Car TCO Calculator
**Status:** In progress  
**Last updated:** 2026-05-01

---

## R1 — New Car Depreciation Rates (Latvia market)

**Status:** ✅ DONE — 2026-05-01

**Method:** European market data (Germany + UK primary), cross-referenced across 15+ sources. MSRP = German new-car list prices 2024. Depreciation % = drop from MSRP. DEP_RATES = annual declining-balance fractions (applied to current value, not MSRP).

**Note on Latvia:** Data is from Germany/UK markets. Latvian used car prices may run 5–15% lower due to smaller market depth, but German residual values act as a ceiling (most used imports come from Germany). Figures here are appropriate for a European-average TCO model. A Latvia-specific model could apply a 0.90–0.95 multiplier to retained values.

---

**Per-model depreciation (% drop from MSRP):**

| Model | MSRP new (€) | 1yr drop % | 2yr drop % | 3yr drop % | Primary source |
|---|---|---|---|---|---|
| VW Golf 1.5 TSI | ~€29,000–33,000 | ~18% | ~28% | ~38% | AutoScout24 market scan + Autovista European petrol avg (50% retained at 36mo) |
| BMW 1-Series 118i | ~€34,000–40,000 | ~21% | ~32% | ~41% | TheMoneyCalculator: "BMW 1 Series depreciates 41% in first 3 years" |
| VW ID.4 Pro (EV) | ~€46,335 | ~30% | ~38% | ~44% | evdepreciation.com 2025; autohit.co.uk: 57% retained at 3yr UK |
| Toyota RAV4 Hybrid | ~€43,000–45,000 | ~12% | ~20% | ~26% | TopSpeed: Y1 = 14.3%, 3yr = 22.1%; iSeeCars: 25% over 5 years |
| BMW X3 20d | ~€55,000–60,000 | ~22% | ~34% | ~44% | TheMoneyCalculator: "BMW X3 depreciates 44% in first 3 years" |

**Per-model notes:**
- **Golf 1.5 TSI:** TheMoneyCalculator showed a "12% in 3 years" figure — likely a data error. Rejected. AutoScout24 market listings and Autovista European petrol benchmark (~50% retention at 36 months) support the 38% figure. Golf is mid-range for depreciation in its class.
- **BMW 1 Series:** Entry-level within BMW limits secondhand premium appeal. 41% is consistent with Jerry.ai BMW aggregator data.
- **VW ID.4:** Upper half of EV market for depreciation. US evdepreciation.com: 31.8% Y1 / 43.3% Y3. European market likely slightly worse (EU BEV avg = 35–40% retained at 36 months per Autovista). Best estimate: 44% drop at 3yr.
- **Toyota RAV4 Hybrid:** Exceptional retainer — top 10% for depreciation globally. HEV powertrains outperform all others in European residual value studies. US data (22% over 3 years) may be optimistic vs. Europe; 26% is a conservative EU estimate.
- **BMW X3 20d:** Diesel penalty applies (UK/German city-ban overhang). Petrol X3 would be ~40% at 3yr; diesel adds ~4%. 44% supported by TheMoneyCalculator and consistent with Autovista diesel European avg.

---

**EV depreciation special note (2024–2025 situation):**

The 2022–2023 EV depreciation crisis (Tesla price cuts, subsidy withdrawal, new model flood) is partially over. Key current facts:
- European BEV 36-month retained value: **35–40%** (Autovista July 2025) vs. 50% for petrol — still the worst powertrain class by a wide margin
- UK specifically: BEV 35.3%, PHEV 47.8%, HEV 52.9%, diesel 52%, petrol 50.2%
- Used EV demand grew 66% YoY in UK 2024 — providing a price floor. Rate of decline is slowing, not recovering.

**Best EV retainers (3yr UK/EU data):** Polestar 3 (65.6%), VW ID.Buzz (62.1%), Tesla Model X (61.5%), VW ID.4 (57%)

**Worst EV retainers:** Vauxhall Corsa Electric (29.4%), Citroen e-C4 (29.9%), Nissan Leaf (31.8%), Renault ZOE (34%)

**PHEV note:** PHEVs underperform despite dual-powertrain appeal. Mainstream PHEV (Peugeot 3008 PHEV, SEAT Leon eHybrid) retain only 33–35% at 3 years — near BEV territory. Premium SUV PHEVs (Defender P400e: 68.6%) are exceptions driven by brand scarcity. The `phev` category rate reflects a cautious mainstream PHEV, not the outliers.

---

**DEP_RATES — final constants:**

```javascript
const DEP_RATES = {
  // Annual depreciation as a fraction of CURRENT value (declining-balance method)
  // [year1, year2, year3, year4, year5]
  // Conversion: d_n = 1 - (retained_%_year_n / retained_%_year_(n-1))
  // Sources: Autovista European MMU July 2025, evdepreciation.com, TheMoneyCalculator,
  //          TopSpeed, iSeeCars, DrivingElectric, autohit.co.uk, Carmoola, Motorway UK

  economy:     [0.18, 0.12, 0.13, 0.09, 0.08],
  // Basis: VW Golf 1.5 TSI — 3yr retention ~62%
  // d1=0.18; d2=1-(0.72/0.82)=0.12; d3=1-(0.62/0.72)=0.14; Y4-5 flatten to 8-9%

  mid:         [0.20, 0.14, 0.13, 0.10, 0.09],
  // Basis: BMW 1 Series 118i — 3yr retention ~59%
  // Premium brand but entry-level BMW; Y1 new-car premium loss is steeper

  premium:     [0.22, 0.15, 0.13, 0.10, 0.09],
  // Basis: BMW 3 Series / Audi A4 class — ~34% drop over 3 years
  // Motorway UK: BMW 3 Series 27.9% over 2 years; extrapolated 3yr = ~34%

  suv_mid:     [0.15, 0.12, 0.10, 0.08, 0.07],
  // Basis: Toyota RAV4 Hybrid — 3yr retention ~74% (exceptional retainer)
  // Note: ICE-only mid SUV (Tiguan, Sportage) would be [0.18, 0.13, 0.12, 0.09, 0.08]
  // RAV4 Hybrid pulls this category upward — adjust if car entered is ICE-only

  premium_suv: [0.22, 0.16, 0.14, 0.11, 0.09],
  // Basis: BMW X3 20d — 44% drop over 3 years; Y1 carries ~50% of 3yr total loss
  // Diesel penalty baked in; petrol X3 equivalent: [0.20, 0.14, 0.12, 0.10, 0.09]

  ev:          [0.30, 0.13, 0.08, 0.08, 0.07],
  // Basis: VW ID.4 Pro (upper half of EV market for depreciation)
  // Y1 severely front-loaded (new model releases kill resale instantly)
  // Y3-5 flatten sharply — EV-specific penalty already priced in
  // Weaker EVs (Leaf, ZOE): [0.35, 0.12, 0.08, 0.07, 0.06]
  // Best retainers (Kia EV6, Tesla Model 3): [0.25, 0.12, 0.08, 0.07, 0.06]

  phev:        [0.22, 0.14, 0.12, 0.10, 0.08],
  // Basis: Autovista PHEV European avg — 45.8% retained at 36mo (Austria)
  // vs 52.5% HEV and 50.4% petrol; mainstream PHEV mid-estimate
  // Premium PHEV SUVs (Defender P400e) retain much better — use suv_mid rates for those
};
```

**Conversion math example (Golf 1.5 TSI → economy category):**
- Y0: €29,000 (MSRP = 100%)
- End Y1: 82% retained → d1 = 1 − 0.82 = **0.18**
- End Y2: 72% retained → d2 = 1 − (0.72/0.82) = **0.122** → rounded to 0.12
- End Y3: 62% retained → d3 = 1 − (0.62/0.72) = **0.139** → rounded to 0.13
- Y4–5: depreciation flattens to 8–9%/year on current value

---

**Sources:**

| Source | URL | Contribution |
|---|---|---|
| Autovista Group MMU July 2025 | autovista24.autovistagroup.com | European 36-month %RV by powertrain: BEV 35–40%, petrol 50%, HEV 52.9%, PHEV 47.8% |
| evdepreciation.com (2025 ID.4) | evdepreciation.com | ID.4 year-by-year: Y1=31.8%, Y2=38.9%, Y3=43.3% |
| autohit.co.uk EV guide 2025 | autohit.co.uk | VW ID.4 57% retained UK; Tesla Model 3 61%; ranked best/worst EV retainers |
| DrivingElectric (best EV) | drivingelectric.com | Polestar 3 (65.6%), ID.Buzz (62.1%), Tesla Model X (61.5%) |
| DrivingElectric (worst EV) | drivingelectric.com | Corsa Electric (29.4%), e-C4 (29.9%), Leaf (31.8%) |
| TopSpeed RAV4 Hybrid Y1 | topspeed.com | RAV4 Hybrid Y1: 14.3% drop |
| TopSpeed RAV4 Hybrid Y3 | topspeed.com | RAV4 Hybrid 3yr: $6,848 from $30,910 = 22.1% total drop |
| iSeeCars holds-value study | iseecars.com | RAV4 Hybrid 25% over 5 years; ID.4 62.1% over 5 years |
| TheMoneyCalculator | themoneycalculator.com | BMW 1 Series: 41% / 3yr; BMW X3: 44% / 3yr |
| MoneyMotoring UK | moneysavingmotoring.co.uk | Golf TDI 3yr retention: 46%; Audi A3: 49% |
| Carmoola Depreciation Index | carmoola.co.uk | EV 3yr loss: 54%; HEV: 27%; ZOE 31.4% retained |
| Motorway UK guide | motorway.co.uk | UK avg 3yr: 38.72%; BMW 3 Series 27.9% over 2yr |
| AutoScout24 Golf 8 listings | autoscout24.com | 2022–2024 Golf 8 listings at €21,650–26,890 vs new ~€29,000 |
| Recharged.com ID.4 resale 2025 | recharged.com | ID.4: 40–50% retained at 3–4yr; "heavy-depreciation EV" |

**What should be verified before production:**
1. Pull actual AutoScout24.de listings for 1/2/3-year-old examples of all 5 models — most reliable direct method
2. Check Eurotax/Schwacke (German equivalent of CAP HPI, subscription required) — what dealers and leasing companies actually use
3. Check ss.lv / autoplius.lt for Latvian local pricing on these models to calibrate the local market adjustment

---

## R2 — Post-Warranty Repair Buffer (annual cost by category)

**Status:** ✅ DONE — 2026-05-01

**Definition:** Unexpected/unplanned repairs only. NOT scheduled servicing. Turbos, gearbox sensors, suspension components, electronics, DPF, EGR, timing chains, battery modules. The bill that arrives without warning.

**Sources used:**

| Source | What it contributed |
|---|---|
| RAC Unexpected Repair Report 2024 (rac.co.uk) | £617/year all-car average across all ages/types; repair type breakdown |
| AutoProtect / Motor Trader 2025 (motortrader.com) | £502.07 average claim per event (2024, up 9% YoY) |
| Nationwide Vehicle Contracts brand cost guide (nationwidevehiclecontracts.co.uk) | Annual ranges by brand: economy £300–550, premium £450–800, EV brands £300–600 |
| Bumper.co.uk repair costs by model (bumper.co) | Per-model ranges: Yaris/Fabia/Polo £180–350, VW Golf £220–400, BMW 3-series £350–700 |
| RepairPal segment data (repairpal.com) | Annual repair cost by US segment: subcompact $456, compact $526, luxury compact $801, compact SUV $521, luxury compact SUV $859. BMW $968/yr, Audi $987/yr total |
| Warrantywise Reliability Index 2026 (warrantywise.co.uk) | Labour rate £112/hour (2025); per-model claim amounts |
| What Car? Reliability Survey 2024 (whatcar.com) | 29,697 respondents: EV 89% repairs free (3% >£1,500), diesel 67% free (6% >£1,500), petrol 79% free |
| ADAC Pannenstatistik 2024 (presse.adac.de) | EVs 56% fewer breakdowns than ICE: 2.8 vs 6.4 per 1,000 vehicles |
| Consumer Reports via Green Car Reports | PHEVs 146% more reported problems than gas-only; BEV/PHEV 3c/mile vs ICE 6c/mile maintenance |
| Recharged EV repair guide 2025 (recharged.com) | EV annual ~$400 total; heat pump €600–1,500, charging port €700–2,000; 1.5% battery failure rate |

**Currency conversions used:** GBP → EUR ×1.17 | USD → EUR ×0.92

---

**Annual repair cost by category (unplanned only):**

| Category | Examples | Low (good year) | Mid (average year) | High (one real repair) | Key sources |
|---|---|---|---|---|---|
| Economy | Yaris, Fabia, Polo, Fiesta | €200 | €350 | €650 | Bumper £180–350; RepairPal subcompact $456 total; Nationwide £300–550 combined |
| Mid-range | Golf, Octavia, Focus, Megane | €300 | €500 | €900 | Bumper Golf £220–400; RepairPal compact $526 total; RAC all-car £617 |
| Premium | BMW 1, Audi A3, Mercedes A | €450 | €700 | €1,200 | RepairPal BMW $968/Audi $987 total; Bumper BMW 3 £350–700, Merc C £400–800 |
| SUV mid | Tiguan, RAV4, Sportage, Tucson | €250 | €500 | €950 | RepairPal Tiguan $730, RAV4 $429 (unusually reliable); Bumper Qashqai £200–400 |
| Premium SUV | BMW X3, Volvo XC60, GLC | €500 | €800 | €1,500 | RepairPal luxury compact SUV $859 total; Bumper Land Rover £500–1,000 |
| Full EV | ID.4, Model 3, Leaf, ZOE | €150 | €350 | €700 | ADAC: 56% fewer breakdowns; Recharged $400/yr total; What Car? 89% repairs free |
| PHEV | 330e, Outlander PHEV, GTE | €400 | €900 | €1,500 | CR: 146% more problems vs gas-only; two full powertrains of failure modes; premium repair costs |

**Notes:**
- Scheduled service costs (~€150–250/yr) have been stripped out from all combined-cost sources
- UK rates converted ×1.17; Latvian labour is ~20–35% below Germany — figures appropriate for Western EU average, slightly conservative for Latvia
- **EV note:** Battery replacement (€3,000–€15,000) is a black-swan event, modelled separately. These figures cover all other EV repairs.
- **PHEV note:** PHEV battery replacement (€5,000–€15,000) also excluded. The High figure covers ICE + electric system faults short of battery replacement.
- **SUV mid note:** RAV4 ($429/yr) is an outlier — unusually reliable for its class. Tiguan ($730/yr) is more representative of European SUVs. Mid figure reflects the realistic European average.

**Sanity check against brief's ranges:**

| Category | Brief range | This model Mid | Pass? |
|---|---|---|---|
| Economy | €200–600/yr | €350 | ✅ |
| Mid-range | €400–900/yr | €500 | ✅ |
| Premium | €700–1,500/yr | €700 | ✅ (at lower bound — defensible) |
| EV | slightly below ICE | €350 vs €500 mid-ICE | ✅ (30% below) |
| PHEV | highest of all | €900 | ✅ (highest segment) |

---

**REPAIR_BUFFER_BASE — final constants:**

```javascript
const REPAIR_BUFFER_BASE = {
  //             Low    Mid    High
  economy:     [ 200,   350,   650],  // Yaris, Fabia, Polo, Fiesta
  mid:         [ 300,   500,   900],  // Golf, Octavia, Focus, Megane
  premium:     [ 450,   700,  1200],  // BMW 1, Audi A3, Mercedes A-class
  suv_mid:     [ 250,   500,   950],  // Tiguan, RAV4, Sportage, Tucson
  premium_suv: [ 500,   800,  1500],  // BMW X3, Volvo XC60, Mercedes GLC
  ev:          [ 150,   350,   700],  // ID.4, Model 3, Leaf, ZOE
  phev:        [ 400,   900,  1500],  // 330e, Outlander PHEV, GTE, XC40 PHEV
};
// Low = good year (no major failures), Mid = realistic average, High = one real repair event
// All figures EUR/year. Excludes battery replacement (separate black-swan model).
// Sources: RAC 2024, AutoProtect/MotorTrader 2025, RepairPal, Bumper.co.uk, ADAC Pannenstatistik 2024,
//          What Car? Reliability Survey 2024, Warrantywise 2026, Consumer Reports, Recharged.com 2025
```

---

## R3 — Tyre Costs Latvia (current market)

**Status:** ✅ DONE — 2026-05-01

**Sources:** autodoc.lv, jaunasriepas.lv (tyre prices); rigasriepucentrs.lv, riepas.com, mmkriepas.lv, r1riepas.lv, riepugaraza.lv, fredariepas.lv, rvt-riepas.lv, adem.lv (changeover + storage)

**Anchor brand:** Continental (mid-range — PremiumContact 7 summer, WinterContact TS870 winter). Michelin is 10–15% more expensive. Hankook/Bridgestone 10–20% cheaper. Continental = realistic mainstream new-car-buyer choice.

**Latvia context:** Winter tyres are mandatory in practice (law + conditions). Every owner runs two full sets. Annual cost = tyre amortisation + 2× seasonal changeover + storage.

---

**Tyre purchase prices (set of 4, mid-range brand, Latvia 2025–2026):**

| Size category | Example size | Example cars | Summer set € | Winter set € | Combined € | Source |
|---|---|---|---|---|---|---|
| Small (≤16") | 205/55 R16 | Golf, Octavia, Polo | €385 | €420 | €805 | autodoc.lv + jaunasriepas.lv |
| Mid (17") | 225/45 R17 | BMW 1, Audi A3, Focus | €430 | €560 | €990 | autodoc.lv + jaunasriepas.lv |
| Large (18–19") | 245/40 R18 | BMW 3, Audi A4, Passat | €555 | €680 | €1,235 | autodoc.lv + jaunasriepas.lv |
| SUV (19–21") | 255/50 R19 | RAV4, Tiguan, X3 | €715 | €910 | €1,625 | autodoc.lv + jaunasriepas.lv |
| Performance/EV (20–21") | 235/45 R20 | ID.4, EV6, Model 3 | €845 | €1,185 | €2,030 | autodoc.lv + jaunasriepas.lv |

**Specific prices found (Continental anchor):**
- 205/55 R16: EcoContact 6 = €91/tyre (autodoc.lv); WinterContact TS870 = €98/tyre (autodoc.lv), €108–115/tyre (jaunasriepas.lv)
- 225/45 R17: PremiumContact 7 = €97/tyre (autodoc.lv); WinterContact TS870 = €141/tyre (autodoc.lv)
- 245/40 R18: SportContact 7 = €135/tyre (autodoc.lv); WinterContact TS870 P = €163–175/tyre (autodoc.lv)
- 255/50 R19: EcoContact 6Q = €173/tyre (autodoc.lv); WinterContact TS870 P = €230–236/tyre (autodoc.lv)
- 235/45 R20: EcoContact 6 = €206/tyre (autodoc.lv); WinterContact TS870 P = €290–304/tyre (autodoc.lv)

---

**Seasonal changeover cost (Riga, 2025–2026) — alloy rims, incl. balancing, per visit:**

| Rim size | Per visit range | Mid-point per visit | Annual (2 visits) |
|---|---|---|---|
| ≤16" | €40–48 | **€44** | **€88** |
| 17" | €50–55 | **€52** | **€104** |
| 18" | €50–55 | **€53** | **€106** |
| 19" | €55–60 | **€58** | **€116** |
| 20" | €60–70 | **€65** | **€130** |

Sources: Rīgas Riepu Centrs (€40–60), Riepas.com (€45–78), MMK Riepas (€48–70), R1 Riepu Serviss (€45–68), Riepu Garāža (€45–65), FredaRiepas (€30–60)

---

**Tyre storage (Riga shops, per season):**

Market range: €25–45/season. Realistic average: **€35/season.**
Annual storage cost: **€35/year** (one slot, charged once per season, typically billed annually or per 6–7 month block).

~50–60% of Latvian car owners store at a shop. Rest store at home (free). Recommend: **toggle in calculator, default ON.**

Sources: ADEM (€25–30/season), MMK Riepas (€35–45/7mo), Riepu Garāža (€35–40/7mo), FredaRiepas (€40/season), Riepas.com (€39–45/season)

---

**Tyre lifespan:** 4 years (conservative for Latvia — long winters, road salt, gravel). Some sources use 5 years; 4 is more defensible. Lifespan is the same for both sets since each set is used ~6 months/year.

---

**Full annual tyre cost by size (amortisation + changeover + storage):**

| Size category | Amort (÷4yr) | Changeover (×2) | Storage | **Total/year** |
|---|---|---|---|---|
| Small (≤16") | €201 | €88 | €35 | **€324** |
| Mid (17") | €248 | €104 | €35 | **€387** |
| Large (18–19") | €309 | €106 | €35 | **€450** |
| SUV (19–21") | €406 | €116 | €35 | **€557** |
| Performance/EV (20–21") | €508 | €130 | €35 | **€673** |

---

**Calculator defaults (single number per size):**

```javascript
const TYRE_ANNUAL_COST = {
  // Annual tyre cost in EUR: amortisation (4yr life) + 2x changeover + storage
  // Based on Continental mid-range tyres, Riga tyre shop rates, 2025-2026
  r16:  325,   // Small ≤16" — Golf, Octavia, Polo
  r17:  390,   // Mid 17" — BMW 1, Audi A3, Focus
  r18:  450,   // Large 18–19" — BMW 3, Audi A4, Passat
  r19:  555,   // SUV 19–21" — RAV4, Tiguan, X3
  r20:  675,   // Performance/EV 20–21" — ID.4, EV6, Model 3
};
```

**Note:** The 20" (EV/Performance) category costs ~2× the 16" category annually — a meaningful TCO differentiator, especially relevant when comparing an EV against a petrol hatchback.

---

**Sources:**

| Source | URL | Data |
|---|---|---|
| autodoc.lv | autodoc.lv/riepas/continental/[size] | Tyre prices for all 5 size categories, Continental + Michelin |
| jaunasriepas.lv | jaunasriepas.lv/lv/[brand]/[size] | Cross-check prices, Hankook/Goodyear/Bridgestone comparisons |
| Rīgas Riepu Centrs | rigasriepucentrs.lv/price-list | Changeover €40–60 by size; storage €35/season |
| Riepas.com | riepas.com/pakalpojumu-cenas | Changeover €45–78 by size; storage €39–45/season |
| MMK Riepas | mmkriepas.lv/pakalpojumi | Changeover €48–70; storage €35–45/7mo |
| R1 Riepu Serviss | r1riepas.lv/pakalpojumi | Changeover €45–68 by size |
| Riepu Garāža | riepugaraza.lv/price-list | Changeover €45–65; storage €35–40/7mo |
| FredaRiepas | fredariepas.lv/pakalpojumi | Changeover €25–60; storage €40/season |
| RVT Riepas | rvt-riepas.lv/lv/serviss/cenradis | Per-unit pricing (mounting €2–3, balancing €4.50–6); valid from Oct 2025 |
| ADEM Riepas | adem.lv/riepu-glabāšana | Storage €25 (without rims), €30 (with rims) per season |

---

## R4 — First Registration Fee for New Cars (Latvia CSDD)

**Status:** ✅ DONE — 2026-05-01

**Sources:** csdd.lv (official), elitecars.lv (cross-check)

---

**Total one-time CSDD cost at first registration (new car, Latvian dealer):**

| Item | Cost |
|---|---|
| Registration fee (incl. certificate + 2 number plates) | **€41.88** |
| Technical inspection (tehniskā apskate) | **€0** — not required until 36 months post-registration |
| VIN comparison check | **€0** — only applies to parallel imports, not dealer purchases |
| **TOTAL** | **€41.88** |

**For parallel imports** (bought from EU dealer abroad, not through Latvian authorized dealer): add VIN check fee €19.25 → **€61.13 total.**

---

**Key findings:**

- **Fee is flat** — does not vary by engine size, fuel type, or car category
- **BEVs (pure electric):** Registration fee is **waived entirely** (free) when receiving EV-designated plates
- **PHEVs:** Pay the standard €41.88 — no discount
- **Number plates are included** in the €41.88 — no separate plate fee (custom/vanity numbers are extra, but optional)
- **Technical inspection:** New cars get a 36-month grace period before first TA is required. Zero cost at registration.
- **After 36 months:** TA becomes a recurring cost (~€30–50/visit, every 2 years after that for passenger cars)

---

**Calculator implementation:**

```javascript
// Year 1 only — one-time cost
const REGISTRATION_FEE = {
  bev:     0,      // Pure EV — free registration with EV plates
  default: 41.88,  // All other fuel types (petrol, diesel, PHEV, mild hybrid)
};
// Note: TA (technical inspection) is NOT a Year 1 cost for new cars.
// First TA due at ~36 months = Year 3 of ownership.
// TA cost (~€35–45) can be added as a Year 3+ recurring cost if desired.
```

---

**Sources:**

| Source | URL | Data |
|---|---|---|
| CSDD official (EN) | csdd.lv/en/initial-registration-of-a-vehicle-in-latvia/payments | €41.88 fee, what's included |
| CSDD official (LV) | csdd.lv/pirmreizeja-transportlidzekla-registracija-latvija | LV-language confirmation |
| CSDD TA periodicity | csdd.lv/tehniskas-apskates-veiksana/tehniskas-apskates-veiksana-un-periodiskums | 36-month grace period for new cars |
| Elite Cars (cross-check) | elitecars.lv/raksti/auto-registracijas-izmaksas/ | Cited €43.93 — slightly higher, may reflect a recent fee increase; verify at csdd.lv at build time |

**Caveat:** One third-party source cited €43.93 — the fee may have been adjusted recently. Confirm the exact figure at csdd.lv before publishing the calculator.

---

## R5 — Competitor Analysis

**Status:** ✅ DONE — 2026-05-06

---

### Global Competitors

| Tool | URL | Market | Side-by-side | New car focus | Depreciation | Insurance | Tyres | Maintenance | Business model | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Edmunds True Cost to Own | edmunds.com/tco | US only | Yes (multi-select) | Yes | Yes | Yes | No (bundled) | Yes | Free, lead-gen | Gold standard. 5-year, 7 cost categories. Monthly shown as secondary. Structurally US-only — database, tax, insurance all US-specific. |
| Kelley Blue Book TCO | kbb.com/new-cars/total-cost-of-ownership | US only | Yes | Yes | Yes | Yes | No | Yes | Free, lead-gen | Similar to Edmunds. Tied to US inventory database. Not usable in Europe. |
| Financial Mentor Car Calculator | financialmentor.com/calculator/car-cost-calculator | US | Yes (2 cars) | Yes + used | Yes | Yes | No | Yes | Free, lead-gen | One of few free true side-by-side tools. No monthly cost hero. US assumptions throughout. |
| VehicleCostCalculator.com | vehiclecostcalculator.com | Generic | Yes (2 cars) | Yes + used | Yes | Yes | No | Yes | Free | Side-by-side, supports diesel/EV/petrol. Shows monthly, annual, total, per-km. Industry-average data — not market-specific. |
| CarMetrics AI | carmetrics.ai/tco-calculator | US | Yes | Yes + used | Yes | Yes | No | Yes | Freemium | Monthly cost as primary metric. 3/5/7/10yr windows. AI marketing, US assumptions. |
| Carvetka | carvetka.com | US | Paywall | Yes + used | Yes | Yes | No | Yes | Freemium | Free single-car; paid multi-car. |
| AutoPremo TCO | autopremo.com/total-cost-of-ownership | US | No (single car) | Yes + used | Yes | Yes | No | Yes | Free | Clean monthly/annual/5yr output but single car only. |
| US DOE AFDC Calculator | afdc.energy.gov/calc | US | Yes (up to 8) | Yes (MY2013–2025) | Partial | Partial | No | No | Free (govt) | Fuel + emissions focus. Thin on maintenance/insurance. |
| ICCT TCO Calculator | theicct.org/tco-calculator | Global (policy) | EV vs diesel only | Yes | Yes | No | No | Yes | Free (research) | Fleet/policy audience. High input complexity. Not consumer-facing. |

---

### European / Baltic Competitors

| Tool | URL | Market | Side-by-side | New car focus | Depreciation | Insurance | Tyres | Maintenance | Business model | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| ADAC Autokostenrechner | adac.de | Germany | No (ranked lists by class) | Yes (9,000+ models) | Yes | Yes | Yes | Yes | Free consumer | Best European tool by depth. German-language only. Cannot compare arbitrary Car A vs Car B — ranks within class only. |
| ADAC PROFI-Autokostenrechner | adac-autokosten.de | Germany (B2B) | Yes (up to 12 models) | Yes (15,000 models) | Yes | Yes | Yes | Yes | €199/yr subscription | Extremely comprehensive, 6-year window, EV-aware. German-only. B2B paywall — requires business registration. |
| EU EAFO Calculator | alternative-fuels-observatory.ec.europa.eu | EU-wide | EV vs ICE only | Yes | Yes | Yes | No | Yes | Free (EU-funded) | Fixed EV vs fixed ICE — not arbitrary car vs car. No CEE/Baltic country presets. Non-consumer UX. |
| DriveSmart Running Costs | drivesmart.co.uk | UK | Yes (up to 10 cars) | Yes + used | Yes | No | No | Yes | Free, broker lead-gen | Multi-car but missing insurance and tyres. UK-centric (pence per mile, VED). |
| HPI TCO Check | hpi.co.uk | UK | No true A vs B | Yes + used | Yes | No | Yes | Yes | Free | 3-year window, 6 categories. Table format but not head-to-head. UK data only. |
| Fleet News TCO Calculator | fleetnews.co.uk | UK | Yes | New cars | Yes | Yes | Yes | Yes | Registration required | B2B fleet tool. Monthly cost + pence per mile. Not consumer-facing. |
| Ayvens Car Cost Index | ayvens.com | 30 EU countries incl. Latvia | Comparative report only | New (4yr lease) | Yes | Yes | Yes | Yes | Free PDF report | Covers Latvia, Estonia, Lithuania. Full cost breakdown. Static annual PDF — not an interactive tool. |
| Auto-ABC.eu | auto-abc.eu/car-costs | Latvia + 190 countries | No (single car only) | Yes + used | Yes | Yes | Yes | Yes | Free, ad/referral | Closest to Baltic market. Latvian-language interface. No side-by-side. No monthly cost hero metric. |
| Zernar.com | zernar.com | Estonia | No (single car only) | Yes + used | Yes | Yes | Yes | Yes | Free, privacy-first | Estonia-focused. Fully manual entry, client-side calculation (no tracking). Monthly cost shown. No comparison. |
| TCM.lv Elektroauto Kalkulators | tcm.lv/elektroauto-kalkulators | Latvia | Partial (Subaru only) | New Subaru only | No | No | No | Partial | Free, dealer marketing | Latvian-language. Subaru dealer tool only. Not general-purpose. |
| Renault TCO | tco.renault.co.uk | UK | Renault vs ICE only | New Renault only | Yes | Yes | Yes | Yes | Free, manufacturer marketing | Manufacturer-locked. UK pricing only. |
| Mbrella TCO | mbrella.eu | Belgium (B2B) | No | Company cars only | Yes | Yes | Yes | Yes | B2B SaaS | HR/fleet for Belgian mobility budgets. Not consumer-facing. |

---

### Key Gaps

1. **No European consumer tool does true arbitrary two-car side-by-side with full TCO.** ADAC PROFI does it but costs €199/yr, is German-only, and requires business registration. DriveSmart allows multi-car but excludes insurance and tyres. Every other European tool is single-car, editorial content, or B2B fleet software.

2. **The Baltic/CEE market is completely unserved.** Auto-ABC.eu has Latvian language but is single-car only. Zernar covers Estonia, single-car only. No tool accounts for Latvia-specific costs: TEN vehicle operation tax, CSDD registration fees, Latvian OCTA rates, local fuel prices. The entire CEE region — Poland, Czech, Hungary, Baltics — has no dedicated consumer TCO tool.

3. **Monthly cost is not the hero metric in any European tool.** Every European tool presents results as annual cost, total cost, or cost per km. Monthly cost is how consumers think about car finance — it is the mental model leasing companies exploit. No European consumer tool leads with it.

4. **No tool treats warranty as a quantifiable cost driver.** A car with a 3-year warranty has zero unplanned repair exposure for 36 months; a 7-year warranty extends that window dramatically. No existing tool models this — they apply repair cost estimates uniformly across all years regardless of coverage. A new-car calculator where warranty years → €0 repair cost → extended warranty break-even is genuinely differentiated.

5. **Manual-entry for any two cars does not exist in polished consumer form in Europe.** Edmunds and KBB work because of massive US car databases. European tools with multi-car support either require a subscription (ADAC PROFI) or are locked to one manufacturer. A clean, free, manual-entry "type in any two cars" tool is unoccupied territory in Europe.

---

### Competitive Position

The global TCO landscape is dominated by two US tools (Edmunds, KBB) that are excellent but structurally inaccessible to European consumers — their data, tax assumptions, insurance estimates, and fuel pricing are all US-specific. Europe's most capable tool, ADAC PROFI, sits behind a €199/yr paywall, is German-only, and explicitly targets fleet professionals. Every other European tool is either single-car, fuel-cost-only, an EV-vs-ICE comparator for fixed segments, or a static PDF report. The Baltic region specifically has no credible consumer-grade TCO tool for new car purchases. A free, English-language, fully manual-entry, two-car side-by-side calculator covering all eight cost components with monthly cost as the headline metric occupies a position that no existing tool holds in the European market. The only realistic competitive threat would be Edmunds building a European edition (no indication this is planned) or ADAC making PROFI free and consumer-facing (structurally unlikely as it is a membership revenue product).

---

**Sources:** edmunds.com, kbb.com, adac.de, adac-autokosten.de, hpi.co.uk, drivesmart.co.uk, alternative-fuels-observatory.ec.europa.eu, fleetnews.co.uk, ayvens.com, auto-abc.eu, zernar.com, tcm.lv, tco.renault.co.uk, mbrella.eu, carmetrics.ai, financialmentor.com, vehiclecostcalculator.com, afdc.energy.gov, theicct.org, autopremo.com, carvetka.com, fuelly.com, spritmonitor.de

---

## R6 — Service Costs for New Cars in Latvia

**Status:** ✅ DONE — 2026-05-15  
**Sources:** mollerauto.volkswagen.lv (confirmed), bmw-inchcape.lv/bmw-servisa-cenradis/ (confirmed), toyota.wess.lv (confirmed interval), autopase.lv (BMW annual cost range). Full detail in RESEARCH_FINDINGS_R6R8.md.

| Brand | Model examples | Service cost/visit | Interval | Source confidence |
|---|---|---|---|---|
| VW | Golf, Tiguan | **€290** | **30,000 km / 24 months** | High — Moller Auto Latvia direct |
| Skoda | Octavia, Fabia | **€240** | **30,000 km / 24 months** | Medium — VAG platform estimate |
| BMW | 3 Series, 5 Series | **€350** | **20,000 km** (CBS-dependent) | High — Inchcape LV labor rate €112/h confirmed |
| Toyota | Yaris, RAV4 | **€160** | **15,000 km / 12 months** | Medium — interval confirmed, price estimated |

**⚠️ Critical correction from plan:** VW/Skoda service interval is **30,000 km**, NOT 15,000 km as assumed in PROJECT_PLAN.md. This halves the annual service visit frequency. Toyota remains 15,000 km. See CONTRADICTIONS.md #7.

```javascript
const DEALER_SERVICE = {
  vw:     { costPerVisitEUR: 290, intervalKm: 30000 },
  skoda:  { costPerVisitEUR: 240, intervalKm: 30000 },
  bmw:    { costPerVisitEUR: 350, intervalKm: 20000 },
  toyota: { costPerVisitEUR: 160, intervalKm: 15000 },
};
```

---

## R7 — EV Charging in Latvia

**Status:** ✅ DONE — 2026-05-15  
**Sources:** uzladets.lv (primary — 2024 kWh analysis), eleport.com/price-report-latvia/ (March 2026), ignitison.lv, autopase.lv. Full detail in RESEARCH_FINDINGS_R6R8.md.

**Home vs. public split (Latvia 2024 actual data):**
- Home/work charging: **~66%** of total electricity consumed
- Public networks: **~34%** (up from 30% in 2023 — trend continues toward more public)
- Current code default: 70% home — update to **66%**

**Context:** 15% of Latvian EV owners never charge at home. Among apartment residents, 42% primarily use public charging. The 80% home default from early plan was significantly wrong.

**Public charging prices (Latvia 2026):**

| Network | Price |
|---|---|
| Home (night) | €0.15–0.20/kWh |
| Home (day) | €0.20–0.25/kWh |
| Eleport | €0.39/kWh |
| Virši | €0.28–0.42/kWh (6 power tiers) |
| CSDD/e-mobi | €0.23/min (legacy per-minute) |
| IONITY | €0.71/kWh (standard), €0.42 with subscription |
| Tesla | €0.38/kWh (Tesla only) |
| **Latvia avg fast charging** | **~€0.40/kWh** (3rd cheapest in Europe) |

```javascript
const EV_CHARGING = {
  homeShare: 0.66,      // was 0.80 in plan — updated from Latvia 2024 data
  publicShare: 0.34,
  homeKwhEUR: 0.18,     // was 0.13 in code — research shows €0.15-0.20 realistic avg
  publicAvgEUR: 0.39,   // consistent with existing code (0.38), minor update
};
```

---

## R8 — OCTA Insurance Rates by Engine Size (Latvia 2025/2026)

**Status:** ✅ DONE — 2026-05-15  
**Sources:** autopase.lv Latvia car insurance guide (updated May 2026), Latvia OCTA market data. Full detail in RESEARCH_FINDINGS_R6R8.md.

**⚠️ STRUCTURAL FINDING:** Latvia OCTA is calculated on **engine power (kW)**, NOT engine displacement (cc). The code uses cc as a proxy — directionally reasonable but technically wrong. See CONTRADICTIONS.md #4.

**Scenario: Experienced driver, 5+ years no claims (Class 2 bonus-malus), Riga registration**

| Code tier | Typical kW | Research OCTA | Current placeholder | Change |
|---|---|---|---|---|
| EV | 100–300+ kW | **€130** | €90 | +€40 |
| ≤1600cc | ~55–75 kW | **€75** | €110 | −€35 |
| 1601–2000cc | ~75–115 kW | **€110** | €145 | −€35 |
| 2001–3000cc | ~115–180 kW | **€150** | €200 | −€50 |
| >3000cc | ~180+ kW | **€240** | €300 | −€60 |

**Key facts:**  
- Bonus-malus Class 1 = −50% vs base; Class 4 = base (new driver); Class 15 = +300%  
- Riga surcharge vs rural: +10–20%  
- Insurer variation: up to 30–50% between BALTA, ERGO, BTA, If  
- Average Latvian driver: €90–€180/year  

```javascript
const OCTA_EST = {ev:130, s:75, m:110, l:150, xl:240};
// NOTE: True parameter is engine kW, not cc. cc is used as proxy.
// These values calibrated for experienced Riga driver (5+ years no claims).
```

---

## R9 — What New Car Buyers Underestimate (buyer psychology research)

*(To be filled in when research agent completes)*

**Status:** ⏳ Agent running

**Key findings:**

*[Fill in after research]*

**Implications for calculator design:**

*[Fill in after research]*

---

## R10 — Business Model Research for Automotive Tools

*(To be filled in when research agent completes)*

**Status:** ⏳ Agent running

**Findings:**

*[Fill in after research]*

**Recommended monetization path:**

*[Fill in after research]*
