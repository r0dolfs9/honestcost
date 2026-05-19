# New Car TCO Comparison Calculator — Full Project Plan
**Project name:** CarCost (working title — to be confirmed)  
**Created:** 2026-04-28  
**Author:** Kaspar  
**Status:** Pre-build — research + planning phase  
**Format:** Single HTML file MVP → hosted web app  

---

## Table of Contents

1. [Product Vision](#1-product-vision)
2. [Target User](#2-target-user)
3. [Competitor Analysis](#3-competitor-analysis)
4. [Market Gap & Opportunity](#4-market-gap--opportunity)
5. [Business Model Options](#5-business-model-options)
6. [Product Scope — MVP](#6-product-scope--mvp)
7. [Two-Screen UX Flow](#7-two-screen-ux-flow)
8. [Input Fields — Full Specification](#8-input-fields--full-specification)
9. [Calculation Engine — Full Documentation](#9-calculation-engine--full-documentation)
10. [Design System](#10-design-system)
11. [Build Task List](#11-build-task-list)
12. [Research TODOs — Must Complete Before Build](#12-research-todos--must-complete-before-build)
13. [Testing & Validation Plan](#13-testing--validation-plan)
14. [Future Phases](#14-future-phases)
15. [File Structure](#15-file-structure)

---

## 1. Product Vision

**One sentence:** A tool that lets any new car buyer enter two cars they're considering and instantly see which one actually costs less per month — including everything, not just the sticker price.

**Problem it solves:**  
People buy new cars based on purchase price or monthly leasing payment. They ignore: depreciation (the biggest cost), insurance differences, fuel efficiency gaps, service costs, tyre costs, annual taxes. A €35,000 car can easily cost €300/month more than a €38,000 car once all running costs are factored in. Nobody shows buyers this clearly.

**What makes it different from a spreadsheet:**  
It's instant, visual, requires no finance knowledge, and shows the comparison side by side so the decision is obvious. The monthly cost number is the anchor — it matches how buyers already think about leasing payments.

**What makes it different from existing tools:**  
- Side-by-side comparison from the first screen (most tools do one car at a time)
- Warranty logic (repairs = €0 during warranty window — most tools ignore this)
- Extended warranty break-even calculation
- New-car specific depreciation (steeper Year 1 — most tools use generic rates)
- Built for European markets (Latvian tax/insurance logic, but editable for any country)

---

## 2. Target User

### Primary User: The Rational New Car Buyer
- Age 28–50
- Buying a car in the €20,000–€60,000 range
- Has narrowed it down to 2–3 models, wants to make the smartest financial choice
- Thinks in monthly terms (leasing is common in Latvia and Europe)
- Not a finance expert but not afraid of numbers
- Will spend 10–20 minutes on this if the output is clear and trustworthy

### Secondary Users
- **Fleet managers** — comparing 2 models for company fleet procurement
- **Car dealership salespeople** — showing clients why their recommended car is the smarter financial choice
- **Automotive journalists/reviewers** — adding TCO data to car comparisons
- **Financial advisors** — helping clients understand the true cost of a car purchase

### What the user is trying to answer
1. "I'm choosing between the BMW 1-Series and the X1 — which one costs less per month over 5 years?"
2. "Is the EV actually cheaper to own than the petrol version?"
3. "Does the extended warranty pay for itself?"
4. "How much does driving 25,000 km/year vs 15,000 km/year change the monthly cost?"

### What the user is NOT trying to do
- Deep financial modelling (keep it simple)
- Track actual expenses (this is a planning tool, not an expense tracker)
- Get the most technically accurate numbers ever (indicative + trustworthy is enough)

---

## 3. Competitor Analysis

*[This section will be completed with research agent findings — see RESEARCH_FINDINGS.md once agent completes]*

### Known global competitors to investigate:
- **Edmunds True Cost to Own (TCO)** — USA, industry standard, 5-year TCO, no side-by-side
- **AAA Your Driving Costs** — USA, annual report, not interactive
- **ADAC Autokostenrechner** — Germany, very detailed, single car at a time
- **RAC Cost of Motoring** — UK
- **What Car? Running Costs** — UK
- **AutoTrader UK running costs tool**
- **TotalCarCost.eu** — check if exists
- **Manufacturer tools** — VW, BMW, Toyota sometimes offer cost calculators

### Known Latvian/Baltic competitors to investigate:
- **auto24.lv** — check if they have any cost calculator
- **ss.lv** — marketplace only, no calculator
- **CSDD tools** — official Latvian vehicle authority, check
- Any Latvian leasing company calculators (SEB, Swedbank, Citadele)

### Competitive summary framework (to fill in):

| Tool | Market | Comparison? | New car focus? | Warranty logic? | Free? | Business model |
|---|---|---|---|---|---|---|
| Edmunds TCO | USA | No | Yes | No | Free | Ads + dealer leads |
| ADAC | Germany | No | Yes | No | Free | Membership org |
| *others TBD* | | | | | | |

---

## 4. Market Gap & Opportunity

*[To be completed after competitor research]*

**Hypothesis (to validate):**
- No tool currently does clean side-by-side new car TCO comparison with warranty logic
- European market (especially smaller countries like Latvia, Estonia, Lithuania) is underserved
- Existing tools are either USA-only, too complex, or don't show the comparison view

**Potential monetization gaps competitors leave open:**
- White-label licensing to dealerships (show clients why Car A from this dealership is smarter than Car B from a competitor)
- Latvian-specific tax/insurance logic (ADAC doesn't do this, Edmunds is USA only)
- EV vs petrol comparison (growing demand as EV adoption rises)

---

## 5. Business Model Options

### Option A: Free Tool with Lead Generation
- Tool is free to use
- Integrated referral links to leasing companies, insurance providers, dealerships
- Revenue: commission on referred leads (typical €50–€500 per qualified lead for leasing)
- Risk: requires significant traffic to make meaningful revenue

### Option B: White-Label SaaS for Dealerships
- Dealerships embed the tool on their website, pre-configured for their car inventory
- Monthly subscription: €50–€300/month per dealership
- Value prop: "Show your customers the true monthly cost of your cars vs competitors — close more deals"
- This is the most realistic early revenue model
- Reference: used by automotive CRM tools (DealerSocket, Cox Automotive)

### Option C: B2B Fleet Tool
- Companies comparing car models for company car policies
- Subscription: €200–€1,000/month depending on features
- Requires more complexity (fleet discounts, VAT recovery, benefit-in-kind tax)

### Option D: Consumer Freemium
- Basic comparison free
- "Premium" features behind paywall: PDF export, save comparisons, 3+ cars, detailed year-by-year table
- Low willingness to pay for consumer finance tools in Latvia market

### Recommended path:
**Start with Option A** (free, prove the concept, build traffic). **Pitch Option B** to 3–5 local dealerships at €99/month. If 10 dealerships sign up = €1,000/month recurring. Validate B2B demand before building fleet features.

---

## 6. Product Scope — MVP

### In scope (MVP):
- Two cars, manually entered, any new car the user wants to compare
- Full cost breakdown: leasing, fuel, service, tyres, insurance, tax, warranty, repair buffer
- Depreciation shown as residual value timeline (not as a cost in TCO — shown separately as "value loss")
- Side-by-side monthly cost hero number
- Sliders: annual mileage, ownership period (affect both cars simultaneously)
- Extended warranty: toggle, price input, break-even calculation
- Repair buffer: Low/Medium/High slider, €0 during warranty
- Latvia-first defaults (all editable)
- Single HTML file, desktop-focused (min 1100px wide)
- Latvian language labels (with English comments in code for i18n later)

### Out of scope (MVP):
- Car database / model lookup
- Mobile responsive layout
- PDF export
- Save/share functionality
- Third car comparison
- Fleet/VAT calculations
- Financing other than standard leasing/cash (no PCP, no balloon etc.)
- Real-time fuel price lookup
- Any backend, database, or user accounts

### Non-negotiable quality bars:
- Every number must be mathematically correct — validate against manual spreadsheet
- Every cost field must have a tooltip explaining what it is and why it matters
- Repair buffer numbers must be grounded in real research — no guessing
- Depreciation rates must reflect real Latvian market data

---

## 7. Two-Screen UX Flow

### Screen 1 — Input

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  HEADER: Tool name + tagline                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  GLOBAL SETTINGS ROW                                                        │
│  [Ownership period slider]  [Annual mileage slider]  [Cash / Leasing]       │
│  If leasing: [Down payment %] [Interest rate %] [Term months]               │
├──────────────────────────────────┬──────────────────────────────────────────┤
│  CAR A                           │  CAR B                                   │
│  ─────────────────────────────   │  ─────────────────────────────           │
│  [Photo placeholder / upload]    │  [Photo placeholder / upload]            │
│                                  │                                          │
│  Car name: [____________]        │  Car name: [____________]                │
│  Purchase price: [€_____]        │  Purchase price: [€_____]               │
│                                  │                                          │
│  POWERTRAIN                      │  POWERTRAIN                              │
│  Fuel type: [dropdown]           │  Fuel type: [dropdown]                   │
│  Consumption: [__ L/100km]       │  Consumption: [__ L/100km]              │
│  CO2: [__ g/km]                  │  CO2: [__ g/km]                         │
│  Engine cc: [____]               │  Engine cc: [____]                       │
│                                  │                                          │
│  WARRANTY                        │  WARRANTY                                │
│  Standard warranty: [_ years]    │  Standard warranty: [_ years]           │
│  Extended warranty: [toggle]     │  Extended warranty: [toggle]            │
│  → Price: [€___] + [_ years]     │  → Price: [€___] + [_ years]           │
│                                  │                                          │
│  SERVICE                         │  SERVICE                                 │
│  Service interval: [_____ km]    │  Service interval: [_____ km]           │
│  Service cost: [€___/visit]      │  Service cost: [€___/visit]             │
│                                  │                                          │
│  INSURANCE & TAX                 │  INSURANCE & TAX                         │
│  OCTA: [€___/year] [?]           │  OCTA: [€___/year] [?]                  │
│  KASKO: [1.8%] [2.5%] [3.5%]    │  KASKO: [1.8%] [2.5%] [3.5%]           │
│                                  │                                          │
│  TYRES                           │  TYRES                                   │
│  Tyre size: [S][M][L][SUV]       │  Tyre size: [S][M][L][SUV]             │
│                                  │                                          │
│  RISK                            │  RISK                                    │
│  Repair buffer: [Low][Med][High] │  Repair buffer: [Low][Med][High]        │
│                                  │                                          │
│  ▼ More options                  │  ▼ More options                          │
│  Parking: [€__/month]            │  Parking: [€__/month]                   │
│  Washing: [€__/month]            │  Washing: [€__/month]                   │
│  Depreciation cat: [dropdown]    │  Depreciation cat: [dropdown]           │
│  Fuel price: [€___/L]            │  Fuel price: [€___/L]                   │
├──────────────────────────────────┴──────────────────────────────────────────┤
│  [Required fields missing: Car A needs CO2 ●  Car B needs service cost ●]  │
│                        [ ANALYSE →  ]                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Validation behaviour:**
- Each required field highlights in red if empty when user tries to click Analyse
- Error summary bar above button lists which fields are missing
- Once all fields are valid, button activates (full opacity, clickable)

---

### Screen 2 — Analysis

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Edit cars                                    [Tool name]                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  ADJUSTMENT SLIDERS (both cars update live)                                 │
│  Annual mileage: [────●────────] 15,000 km   Period: [──●──────] 5 years   │
├──────────────────────────────────┬──────────────────────────────────────────┤
│  CAR A                           │  CAR B                                   │
│  [Photo]  BMW 1-Series 118i      │  [Photo]  BMW X1 xDrive20i              │
│  €32,500 · Petrol · 5yr warranty │  €41,200 · Petrol · 5yr warranty        │
│                                  │                                          │
│  ┌──────────────────────────┐    │  ┌──────────────────────────┐           │
│  │  MONTHLY COST            │    │  │  MONTHLY COST            │           │
│  │  €  6 4 2 / month        │    │  │  €  8 1 7 / month        │           │
│  └──────────────────────────┘    │  └──────────────────────────┘           │
│                                  │                                          │
│  COST BREAKDOWN          Mo.  5G │  COST BREAKDOWN          Mo.  5G        │
│  ─────────────────────────────   │  ─────────────────────────────          │
│  Leasing                €380 22k │  Leasing                €490 29k        │
│  Fuel                   €102  6k │  Fuel                   €124  7k        │
│  Service                 €35  2k │  Service                 €40  2k        │
│  Tyres                   €28 1.7k│  Tyres                   €35 2.1k       │
│  OCTA                    €13  0.8k│  OCTA                   €15  0.9k      │
│  KASKO                   €68  4k │  KASKO                   €86  5k        │
│  Transport Tax            €7  0.4k│  Transport Tax           €10  0.6k     │
│  Warranty (extended)      €0   0 │  Warranty (extended)      €0   0        │
│  Repair Buffer            €9  0.5k│  Repair Buffer           €17  1k       │
│  ─────────────────────────────   │  ─────────────────────────────          │
│  TOTAL                  €642  38k│  TOTAL                  €817  49k       │
│                                  │                                          │
│  VALUE LOSS (depreciation)       │  VALUE LOSS (depreciation)              │
│  After 1yr: ~€25,800 (-€6,700)   │  After 1yr: ~€30,900 (-€10,300)        │
│  After 3yr: ~€18,200 (-€14,300)  │  After 3yr: ~€21,800 (-€19,400)        │
│  After 5yr: ~€12,400 (-€20,100)  │  After 5yr: ~€14,900 (-€26,300)        │
│                                  │                                          │
│  [Extended warranty note:        │  [Extended warranty note:               │
│   Not purchased]                 │   Not purchased]                        │
├──────────────────────────────────┴──────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Car A costs €175/month LESS than Car B                             │   │
│  │  Over 5 years that is €10,500 in savings                            │   │
│  │  Car A loses €6,200 LESS in value over 5 years                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  Disclaimer: Indicative calculation. Actual costs may vary.                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Input Fields — Full Specification

### Global Fields

| Field | Type | Required | Default | Validation | Notes |
|---|---|---|---|---|---|
| Ownership period | Slider | Yes | 5 years | 1–10 | Step: 1 year |
| Annual mileage | Slider | Yes | 15,000 km | 5,000–75,000 | Step: 1,000 km |
| Financing | Toggle | Yes | Leasing | Cash / Leasing | |
| Down payment % | Number | If leasing | 20% | 0–50% | Shows € amount live |
| Interest rate (APR) | Number | If leasing | 4.5% | 1–20% | |
| Leasing term | Slider | If leasing | 48 months | 12–84 | Step: 6 months |
| Residual / balloon | Number | If leasing | 0% | 0–40% | Show € amount |

### Per-Car Fields

**IDENTITY**

| Field | Type | Required | Default | Validation | Tooltip text |
|---|---|---|---|---|---|
| Car name | Text | Yes | — | Non-empty | "Enter the full model name, e.g. BMW X1 xDrive20i M Sport" |
| Car photo | URL/file | No | Placeholder SVG | Valid URL or image | "Optional — paste an image URL or upload a photo" |

**PURCHASE**

| Field | Type | Required | Default | Validation | Tooltip text |
|---|---|---|---|---|---|
| Purchase price (€) | Number | Yes | — | 5,000–500,000 | "The on-the-road price including all options but excluding any financing costs" |
| Depreciation category | Select | Yes | Mid | Economy / Mid / Premium / SUV mid / Premium SUV / EV / PHEV | "Determines how fast the car loses value. Premium brands depreciate faster in % terms." |

**POWERTRAIN**

| Field | Type | Required | Default | Validation | Tooltip text |
|---|---|---|---|---|---|
| Fuel type | Select | Yes | Petrol | Petrol / Diesel / Mild Hybrid / PHEV / Full Electric | "Determines how fuel/energy costs are calculated" |
| Fuel consumption | Number | Yes | — | 1–30 L or kWh | Label auto-switches to kWh/100km for EV. For PHEV shows two fields: electric + petrol. |
| PHEV electric share % | Slider | PHEV only | 60% | 0–100% | "What % of your daily driving you expect to cover on electric only. Depends on your route length vs electric range." |
| CO2 emissions | Number | Yes | — | 0–400 g/km | "Found in the car's registration documents or manufacturer spec sheet. Used to calculate the annual transport tax." |
| Engine displacement (cc) | Number | Yes | — | 0–8000 | "Used to estimate your OCTA insurance. Enter 0 for fully electric cars." |

**WARRANTY**

| Field | Type | Required | Default | Validation | Tooltip text |
|---|---|---|---|---|---|
| Manufacturer warranty | Number | Yes | 3 years | 1–7 | "During this period, most repair costs are covered by the manufacturer. Enter the standard warranty that comes with the car." |
| Extended warranty | Toggle | No | Off | — | "An optional extra warranty you can purchase, usually from the manufacturer or a third party, that extends coverage beyond the standard period." |
| Extended warranty price (€) | Number | If extended on | — | 0–10,000 | "The total one-time price you pay for the extended warranty package." |
| Extended warranty adds (years) | Number | If extended on | 2 | 1–5 | "How many additional years the extended warranty adds beyond the standard warranty." |

**SERVICE**

| Field | Type | Required | Default | Validation | Tooltip text |
|---|---|---|---|---|---|
| Service interval | Number | Yes | 15,000 km | 5,000–60,000 | "How often the car needs a full service, in km. Found in the owner's manual or manufacturer website." |
| Cost per service visit (€) | Number | Yes | — | 50–3,000 | "Typical cost for a full annual service at an authorised dealer. Include oil change, filters, and standard inspection." |

**INSURANCE**

| Field | Type | Required | Default | Validation | Tooltip text |
|---|---|---|---|---|---|
| OCTA insurance (€/year) | Number | Yes | Auto-estimated | 50–2,000 | "Mandatory third-party insurance in Latvia. Cost depends on engine size, driver age, and claims history. We pre-fill an estimate — adjust to your actual quote." |
| KASKO tier | Button group | Yes | Standard 2.5% | Basic 1.8% / Standard 2.5% / Full 3.5% | "Optional comprehensive insurance. Required if leasing. Calculated as % of current car value — decreases each year as the car depreciates." |

*OCTA auto-estimate by engine cc:*
- 0 cc (EV): €90/year
- ≤1600 cc: €110/year
- 1601–2000 cc: €145/year
- 2001–3000 cc: €200/year
- >3000 cc: €300/year

**TYRES**

| Field | Type | Required | Default | Validation | Tooltip text |
|---|---|---|---|---|---|
| Tyre category | Button group | Yes | Mid | Small (≤16") / Mid (17") / Large (18–19") / SUV (19–21") | "Determines tyre replacement cost. Check the car's tyre size on the door sticker or manufacturer specs." |

**REPAIR BUFFER**

| Field | Type | Required | Default | Validation | Tooltip text |
|---|---|---|---|---|---|
| Risk level | Slider | Yes | Medium | Low / Medium / High | "How much to budget monthly for unexpected repairs AFTER the warranty expires. Low = reliable brand with good track record. High = complex car (PHEV, turbocharged, air suspension) or high mileage use." |

**MORE OPTIONS (collapsible)**

| Field | Type | Required | Default | Validation | Tooltip text |
|---|---|---|---|---|---|
| Monthly parking (€) | Number | No | 0 | 0–500 | "Add if you pay for a parking spot or permit" |
| Monthly washing (€) | Number | No | 20 | 0–200 | "Car washing and cleaning budget" |
| Fuel price override (€/L or €/kWh) | Number | No | Latvian default | 0.05–5.00 | "Pre-filled with current Latvian average. Change if you're in a different country or have a different contract." |

---

## 9. Calculation Engine — Full Documentation

### 9.1 Master Function

```javascript
function calcAll(car, globals) {
  // Returns: { perYear: [...], monthly: {...}, total5Y: {...} }
  // car = all per-car fields
  // globals = ownership period, mileage, leasing settings, fuel prices
}
```

All costs are calculated per year (Year 1 through Year N), then summed and divided by months for the monthly average.

---

### 9.2 Leasing / Financing

**If Cash:**
```
Annual financing cost = 0
Purchase cost shown separately as one-time
```

**If Leasing — PMT formula:**
```javascript
function calcLeasing(price, downPct, annualRate, termMonths, residualPct) {
  const principal = price * (1 - downPct / 100);
  const residual = price * (residualPct / 100);
  const P = principal - residual / Math.pow(1 + annualRate/1200, termMonths);
  const r = annualRate / 1200;
  const n = termMonths;
  const monthlyPayment = P * (r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1);
  return {
    monthlyPayment,
    totalPaid: monthlyPayment * n + residual,
    totalInterest: monthlyPayment * n + residual - principal
  };
}
```

Note: leasing cost is constant per month for the lease term. After term ends, cost = 0 (car is owned) or a new lease begins.

---

### 9.3 Fuel / Energy Costs

**Petrol / Diesel:**
```javascript
function calcFuelICE(annualKm, consumptionL100, pricePerLitre) {
  return (annualKm / 100) * consumptionL100 * pricePerLitre;
}
```

**Full Electric:**
```javascript
function calcFuelEV(annualKm, consumptionKWh100, homePct, homeRate, publicRate) {
  const homeKm = annualKm * (homePct / 100);
  const publicKm = annualKm * ((100 - homePct) / 100);
  const homeCost = (homeKm / 100) * consumptionKWh100 * homeRate * 1.10; // 10% charging loss AC
  const publicCost = (publicKm / 100) * consumptionKWh100 * publicRate * 1.05; // 5% DC loss
  return homeCost + publicCost;
}
```

**PHEV:**
```javascript
function calcFuelPHEV(annualKm, elecShare, consumptionKWh100, consumptionPetrolL100, 
                       homePct, homeRate, publicRate, petrolPrice) {
  const elecKm = annualKm * (elecShare / 100);
  const petrolKm = annualKm * ((100 - elecShare) / 100);
  const elecCost = calcFuelEV(elecKm, consumptionKWh100, homePct, homeRate, publicRate);
  const petrolCost = calcFuelICE(petrolKm, consumptionPetrolL100, petrolPrice);
  return elecCost + petrolCost;
}
```

**Latvian fuel price defaults (update quarterly):**
```javascript
const FUEL_DEFAULTS = {
  petrol95: 1.75,    // €/L — April 2026
  diesel:   1.70,    // €/L — April 2026
  homeElec: 0.13,    // €/kWh — Latvenergo E-tariff
  publicElec: 0.38,  // €/kWh — Latvian average public fast charger
};
```

---

### 9.4 Annual Transport Tax (TEN) — Latvia

```javascript
function calcTEN(co2gkm) {
  if (co2gkm <= 50)  return 0;
  if (co2gkm <= 95)  return 30;
  if (co2gkm <= 115) return 50;
  if (co2gkm <= 130) return 80;
  if (co2gkm <= 155) return 120;
  if (co2gkm <= 175) return 180;
  if (co2gkm <= 200) return 260;
  if (co2gkm <= 250) return 380;
  return 520;
}
```

For non-Latvia use: user enters annual tax amount directly. The TEN field becomes a plain number input with a toggle "I'm not in Latvia".

---

### 9.5 Insurance — KASKO

KASKO is calculated on the car's **current residual value** each year (decreases as car depreciates).

```javascript
function calcKaskoAnnual(purchasePrice, kaskoRatePct, depCat, year) {
  const residual = calcResidualValue(purchasePrice, depCat, year - 1);
  return residual * (kaskoRatePct / 100);
}
```

KASKO tier buttons → rate:
- Basic: 1.8%
- Standard: 2.5% (default)
- Full: 3.5%

---

### 9.6 Depreciation (Residual Value)

New cars have steeper Year 1 depreciation than used cars because of the "new-to-used" transition the moment the car is registered.

```javascript
const DEP_RATES = {
  economy:     [0.20, 0.12, 0.10, 0.09, 0.08],
  mid:         [0.22, 0.13, 0.11, 0.10, 0.09],
  premium:     [0.25, 0.15, 0.13, 0.11, 0.10],
  suv_mid:     [0.20, 0.12, 0.10, 0.09, 0.08],
  premium_suv: [0.23, 0.14, 0.12, 0.11, 0.10],
  ev:          [0.25, 0.16, 0.14, 0.12, 0.12],
  phev:        [0.22, 0.14, 0.12, 0.11, 0.10],
};
// Year 6+ uses the last rate in the array

function calcResidualValue(purchasePrice, depCat, yearsElapsed) {
  let value = purchasePrice;
  const rates = DEP_RATES[depCat];
  for (let y = 0; y < yearsElapsed; y++) {
    const rate = rates[Math.min(y, rates.length - 1)];
    value = value * (1 - rate);
  }
  return value;
}
```

**⚠️ TODO: Validate these rates against real Latvian new car market data.**  
Check: ss.lv and auto24.lv listings for 1, 2, 3-year-old cars vs their new MSRP. Do this for at least 3 models per category. Document results in RESEARCH_FINDINGS.md.

---

### 9.7 Service & Maintenance

```javascript
function calcServiceAnnual(annualKm, startKm, year, intervalKm, costPerVisit) {
  // startKm = 0 for new cars
  const kmAtStartOfYear = annualKm * (year - 1);
  const kmAtEndOfYear = annualKm * year;
  const visitsThisYear = Math.floor(kmAtEndOfYear / intervalKm) 
                       - Math.floor(kmAtStartOfYear / intervalKm);
  return visitsThisYear * costPerVisit;
}
```

For new cars: no high-mileage surcharge in the first 5 years (unlike the used car calculator which adds factors for 100k+ km cars).

---

### 9.8 Tyres

```javascript
const TYRE_COSTS = {
  small: { summer: 300, winter: 320, lifeKm: 50000 },
  mid:   { summer: 420, winter: 440, lifeKm: 45000 },
  large: { summer: 560, winter: 580, lifeKm: 40000 },
  suv:   { summer: 700, winter: 720, lifeKm: 38000 },
};

const TYRE_MOUNTING_PER_YEAR = 160; // 2 seasonal changes × €80 each

function calcTyresAnnual(annualKm, tyreCat, year) {
  const { summer, winter, lifeKm } = TYRE_COSTS[tyreCat];
  const kmAtStartOfYear = annualKm * (year - 1);
  const kmAtEndOfYear = annualKm * year;
  
  // Summer set replacements
  const summerReplacements = Math.floor(kmAtEndOfYear / lifeKm) 
                           - Math.floor(kmAtStartOfYear / lifeKm);
  // Winter set replacements (same interval, separate set)
  const winterReplacements = summerReplacements; // conservative: replace both at same rate
  
  return (summerReplacements * summer) + (winterReplacements * winter) + TYRE_MOUNTING_PER_YEAR;
}
```

**⚠️ TODO: Validate tyre costs against riepas.lv and rietumi.lv current prices.**

---

### 9.9 Repair Buffer (MOST IMPORTANT — requires research)

**Core logic:**
- During warranty (manufacturer + extended): repair buffer = €0
- After warranty expires: buffer kicks in immediately

```javascript
function calcRepairBuffer(level, warrantyYearsTotal, carCategory, year) {
  const inWarranty = year <= warrantyYearsTotal;
  if (inWarranty) return 0;
  
  const yearsOutOfWarranty = year - warrantyYearsTotal;
  const base = REPAIR_BUFFER_BASE[carCategory][level];
  
  // Buffer increases slightly each year out of warranty
  const multiplier = 1 + (yearsOutOfWarranty - 1) * 0.10; // +10% per year out of warranty
  return base * multiplier;
}
```

**⚠️ REPAIR_BUFFER_BASE values — MUST BE RESEARCHED before build:**

These annual amounts (€/year) need to be based on real data, NOT guessed. Research sources:
- ADAC reliability reports (Germany — large sample)
- What Car? reliability surveys (UK)
- J.D. Power European Vehicle Dependability Study
- Warranty Direct / Warrantywise claim data (UK)
- Ask local Latvian service centers for average annual repair bills by brand/category

Placeholder values (to be replaced with researched data):

```javascript
const REPAIR_BUFFER_BASE = {
  //                Low    Med    High
  economy:        [ 200,   400,   700],
  mid:            [ 300,   600,  1000],
  premium:        [ 500,   900,  1500],
  suv_mid:        [ 350,   650,  1100],
  premium_suv:    [ 600,  1100,  1800],
  ev:             [ 200,   400,   700], // fewer moving parts, but battery risk after warranty
  phev:           [ 500,  1000,  1600], // two powertrains = more complexity
};
// Unit: €/year, post-warranty
```

---

### 9.10 Warranty Break-Even Calculation

```javascript
function calcWarrantyBreakEven(extendedWarrantyPrice, repairBufferAnnual) {
  // At what year does the extended warranty pay for itself vs paying repair buffer out of pocket?
  // i.e. how many years of repair buffer = extended warranty price?
  return extendedWarrantyPrice / repairBufferAnnual;
}
// Display: "Extended warranty pays off if you have 1+ repair event in the first X years after standard warranty"
```

---

### 9.11 Total Monthly Cost Calculation

```javascript
function calcMonthlyTotal(car, globals) {
  const N = globals.ownershipYears;
  let totalCost = 0;
  
  for (let y = 1; y <= N; y++) {
    totalCost += calcFuel(car, globals, y);
    totalCost += calcServiceAnnual(globals.annualKm, 0, y, car.serviceIntervalKm, car.serviceCostPerVisit);
    totalCost += calcTyresAnnual(globals.annualKm, car.tyreCat, y);
    totalCost += car.octaAnnual;
    totalCost += calcKaskoAnnual(car.purchasePrice, car.kaskoRatePct, car.depCat, y);
    totalCost += calcTEN(car.co2);
    totalCost += calcRepairBuffer(car.repairLevel, car.warrantyTotal, car.depCat, y);
    totalCost += calcWarrantyAmortized(car, y); // extended warranty cost spread over ownership period
    totalCost += (car.parkingMonthly + car.washingMonthly) * 12;
  }
  
  if (globals.financing === 'leasing') {
    const l = calcLeasing(car.purchasePrice, globals.downPct, globals.apr, globals.termMonths, globals.residualPct);
    totalCost += l.monthlyPayment * Math.min(N * 12, globals.termMonths);
  }
  
  return totalCost / (N * 12); // monthly average
}
```

---

## 10. Design System

### 10.1 Brand Identity

This is a standalone product — not KAS-PA-AUTO branded. Clean, trustworthy, modern, data-forward. Think: a financial tool that happens to be about cars.

**Personality:** Clear. Honest. Precise. Slightly premium. Not flashy.

---

### 10.2 Color Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary / CTA | Indigo | `#3B4FE4` | Buttons, active states, links |
| Primary dark | Indigo dark | `#2B3CB0` | Button hover, headings |
| Accent / highlight | Amber | `#F59E0B` | Hero numbers, "cheaper" highlights |
| Background | Off-white | `#F8F9FC` | Page background |
| Surface | White | `#FFFFFF` | Cards, form panels |
| Surface alt | Light grey | `#F1F3F8` | Input backgrounds, dividers |
| Border | Grey | `#DDE1EC` | Input borders, table lines |
| Text primary | Near-black | `#111827` | Headings, important values |
| Text secondary | Grey | `#6B7280` | Labels, tooltips, subtitles |
| Text disabled | Light grey | `#9CA3AF` | Placeholder text |
| Success / Cheaper | Green | `#059669` | Car A or B when it's the winner |
| Neutral | Slate | `#64748B` | When neither car wins on a metric |
| Error / Warning | Red | `#DC2626` | Missing field validation, higher cost |
| Car A accent | Blue | `#3B82F6` | Car A column header, table labels |
| Car B accent | Violet | `#7C3AED` | Car B column header, table labels |

**Why Car A = blue, Car B = violet:** Distinct enough to differentiate at a glance without being primary/secondary (which would imply one is better).

---

### 10.3 Typography

| Role | Font | Weight | Size | Notes |
|---|---|---|---|---|
| Display (hero numbers) | `Barlow Condensed` | 700 | 48–64px | Monthly cost hero |
| Headings H1 | `Barlow` | 700 | 28px | Screen titles |
| Headings H2 | `Barlow` | 600 | 20px | Section headers |
| Headings H3 | `Barlow` | 600 | 16px | Card/column headers |
| Body | `Inter` | 400 | 14px | Form labels, table content |
| Body medium | `Inter` | 500 | 14px | Field labels, button text |
| Mono / numbers | `DM Mono` | 400 | 13px | Cost values in tables |
| Caption | `Inter` | 400 | 12px | Tooltips, disclaimers |

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500;600&family=DM+Mono&display=swap');
```

---

### 10.4 Spacing System

Base unit: 4px

| Token | Value | Usage |
|---|---|---|
| xs | 4px | Icon padding, tight gaps |
| sm | 8px | Input padding, small gaps |
| md | 16px | Section padding, standard gaps |
| lg | 24px | Card padding |
| xl | 32px | Section spacing |
| 2xl | 48px | Page sections |
| 3xl | 64px | Hero areas |

---

### 10.5 Component Styles

**Input fields:**
```css
input, select {
  height: 40px;
  padding: 0 12px;
  border: 1.5px solid #DDE1EC;
  border-radius: 8px;
  background: #F1F3F8;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #111827;
  transition: border-color 0.15s;
}
input:focus {
  border-color: #3B4FE4;
  background: #ffffff;
  outline: none;
}
input.error {
  border-color: #DC2626;
  background: #FEF2F2;
}
```

**Primary button (Analyse):**
```css
.btn-primary {
  height: 52px;
  padding: 0 32px;
  background: #3B4FE4;
  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}
.btn-primary:hover { background: #2B3CB0; }
.btn-primary:active { transform: scale(0.98); }
.btn-primary:disabled { background: #9CA3AF; cursor: not-allowed; }
```

**Monthly cost hero:**
```css
.hero-cost {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 56px;
  letter-spacing: -1px;
  color: #111827;
}
.hero-cost.cheaper { color: #059669; }
.hero-cost.pricier  { color: #DC2626; }
```

**Cost table rows:**
```css
.cost-table tr:hover { background: #F8F9FC; }
.cost-table td { 
  padding: 8px 12px; 
  border-bottom: 1px solid #F1F3F8;
  font-family: 'DM Mono', monospace;
  font-size: 13px;
}
.cost-table td.label {
  font-family: 'Inter', sans-serif;
  color: #6B7280;
}
.cost-table tr.total td {
  font-weight: 600;
  border-top: 2px solid #DDE1EC;
  color: #111827;
}
```

**Tooltip:**
```css
.tooltip {
  position: relative;
  display: inline-block;
  cursor: help;
}
.tooltip-icon {
  width: 16px; height: 16px;
  background: #DDE1EC;
  border-radius: 50%;
  font-size: 10px;
  color: #6B7280;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.tooltip-text {
  visibility: hidden;
  width: 240px;
  background: #111827;
  color: white;
  font-size: 12px;
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
  padding: 10px 12px;
  border-radius: 8px;
  position: absolute;
  bottom: calc(100% + 8px);
  left: -8px;
  z-index: 100;
}
.tooltip:hover .tooltip-text { visibility: visible; }
```

**Slider:**
```css
input[type="range"] {
  -webkit-appearance: none;
  height: 4px;
  background: #DDE1EC;
  border-radius: 2px;
  outline: none;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px; height: 20px;
  background: #3B4FE4;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(59,79,228,0.3);
}
```

**Tier / risk button group:**
```css
.tier-btn {
  padding: 6px 14px;
  border: 1.5px solid #DDE1EC;
  border-radius: 6px;
  background: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.12s;
}
.tier-btn.active {
  background: #3B4FE4;
  color: white;
  border-color: #3B4FE4;
}
```

**Car column headers:**
```css
.car-a-header { 
  background: #EFF6FF; 
  border-top: 3px solid #3B82F6; 
  border-radius: 12px 12px 0 0;
}
.car-b-header { 
  background: #F5F3FF; 
  border-top: 3px solid #7C3AED; 
  border-radius: 12px 12px 0 0;
}
```

**Comparison bar at bottom of Screen 2:**
```css
.comparison-bar {
  background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
  color: white;
  padding: 24px 40px;
  border-radius: 16px;
  margin-top: 32px;
}
.comparison-bar .saving {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 40px;
  font-weight: 700;
  color: #F59E0B;
}
```

---

### 10.6 Layout

```css
:root {
  --max-width: 1320px;
  --col-gap: 24px;
  --section-gap: 32px;
}

body {
  min-width: 1100px;
  background: #F8F9FC;
  font-family: 'Inter', sans-serif;
}

.page-wrapper {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 32px 24px;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--col-gap);
}
```

---

### 10.7 Icons

Use **Lucide Icons** via CDN — consistent, clean, open source:
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
```

Icons to use:
- `?` info / tooltip → `info` icon
- Car photo placeholder → `car` icon
- Leasing → `credit-card` icon  
- Fuel → `fuel` icon
- Service → `wrench` icon
- Tyres → `circle` icon
- Insurance → `shield` icon
- Tax → `landmark` icon
- Warranty → `badge-check` icon
- Repair → `tool` icon
- Depreciation → `trending-down` icon
- Warning / missing field → `alert-circle` icon
- Analyse button → `arrow-right` icon
- Back → `arrow-left` icon

---

## 11. Build Task List

### Phase 0 — Research (complete BEFORE writing code)

- [ ] **R1** — Validate new car depreciation rates: check ss.lv + auto24.lv for 1/2/3-year-old cars across 5+ models. Calculate actual % drop vs MSRP. Document in `RESEARCH_FINDINGS.md`
- [ ] **R2** — Repair buffer research: find post-warranty annual repair cost data by car category. Sources: ADAC reliability report, What Car? survey, J.D. Power Europe, Warrantywise UK data, local Latvian service center queries. Document in `RESEARCH_FINDINGS.md`
- [ ] **R3** — Tyre cost validation: check riepas.lv and rietumi.lv current prices for 4 tyre size categories. Update `TYRE_COSTS` constants. Document sources.
- [ ] **R4** — New car first registration fee in Latvia (CSDD): is it the same €80 as used car transfer, or different? Check csdd.lv. Document exact amount.
- [ ] **R5** — Competitive analysis: use `RESEARCH_FINDINGS.md` to document all competitor tools found (see Section 3 template). Answer: is there a gap for a European side-by-side new car TCO tool?
- [ ] **R6** — Typical service costs for new cars in Latvia: call or check authorised dealer prices for VW, BMW, Toyota, Skoda annual service. What does a standard 1-year/15,000 km service cost at each? Document.
- [ ] **R7** — EV charging infrastructure Latvia: what % of EV owners have home charger? What is realistic home vs public split for Latvia? Source: CSP data or EV association.
- [ ] **R8** — OCTA pricing validation: check octas.lv for accurate OCTA estimates by engine displacement for 2025/2026. Update auto-estimate defaults.

---

### Phase 1 — Project Setup

- [ ] **S1** — Create file: `Desktop/NEW_CAR_TCO_CALCULATOR/new_car_tco.html`
- [ ] **S2** — HTML boilerplate: DOCTYPE, charset, viewport, Google Fonts import, Lucide icons import
- [ ] **S3** — CSS variables block: all color tokens, font stack, spacing scale
- [ ] **S4** — Page layout skeleton: header, screen-1 div, screen-2 div (screen-2 hidden on load)
- [ ] **S5** — Two-column grid layout for both screens
- [ ] **S6** — Basic JS state object: `carA = {}`, `carB = {}`, `globals = {}`

---

### Phase 2 — Screen 1: Input Form

- [ ] **I1** — Global settings row: ownership period slider + mileage slider + financing toggle
- [ ] **I2** — Leasing sub-fields: down payment, APR, term slider — show/hide on toggle
- [ ] **I3** — Car identity fields: name input + photo URL input + placeholder SVG
- [ ] **I4** — Purchase price + depreciation category select
- [ ] **I5** — Powertrain section: fuel type select + consumption input (label switches by fuel type) + CO2 + engine cc
- [ ] **I6** — PHEV extra fields: electric share % slider — show/hide when PHEV selected
- [ ] **I7** — EV extra fields: home charging % slider — show/hide when EV selected
- [ ] **I8** — Warranty section: standard years input + extended warranty toggle + conditional price/years
- [ ] **I9** — Service section: interval km + cost per visit
- [ ] **I10** — Insurance section: OCTA input (auto-estimated from engine cc on blur) + KASKO tier buttons
- [ ] **I11** — Tyres section: size category button group
- [ ] **I12** — Repair buffer risk slider (Low / Medium / High)
- [ ] **I13** — "More options" collapsible section: parking, washing, fuel price override, depreciation category
- [ ] **I14** — Tooltip `?` icons on all fields — text from spec table in Section 8
- [ ] **I15** — Form validation: required field check + red highlight + error bar above Analyse button
- [ ] **I16** — Analyse button: disabled state when invalid, enabled when all required fields filled
- [ ] **I17** — Duplicate entire form for Car B (second column)

---

### Phase 3 — Calculation Engine

- [ ] **C1** — `calcTEN(co2)` — Latvia CO2 tax lookup
- [ ] **C2** — `calcLeasing(price, downPct, apr, termMonths, residualPct)` — PMT formula
- [ ] **C3** — `calcFuelICE(annualKm, consumption, price)` — petrol/diesel annual cost
- [ ] **C4** — `calcFuelEV(annualKm, consumption, homePct, homeRate, publicRate)` — EV annual cost with charging losses
- [ ] **C5** — `calcFuelPHEV(...)` — PHEV split cost
- [ ] **C6** — `calcResidualValue(price, depCat, yearsElapsed)` — compound depreciation
- [ ] **C7** — `calcKaskoAnnual(price, ratePct, depCat, year)` — KASKO on residual value
- [ ] **C8** — `calcServiceAnnual(annualKm, year, intervalKm, costPerVisit)` — interval-based service
- [ ] **C9** — `calcTyresAnnual(annualKm, tyreCat, year)` — cycle-based tyre replacement
- [ ] **C10** — `calcRepairBuffer(level, warrantyTotal, depCat, year)` — €0 in warranty, buffer after
- [ ] **C11** — `calcWarrantyAmortized(car, year)` — spread extended warranty cost over ownership period
- [ ] **C12** — `calcWarrantyBreakEven(extPrice, repairBufferAnnual)` — break-even years
- [ ] **C13** — `calcAll(car, globals)` — master function: returns per-year array + monthly avg + period total
- [ ] **C14** — `calcComparison(carA, carB)` — delta values for comparison bar

---

### Phase 4 — Screen 2: Results Display

- [ ] **D1** — Read form values from Screen 1 into state objects on "Analyse" click
- [ ] **D2** — Run `calcAll()` for both cars, store results
- [ ] **D3** — Screen transition: hide Screen 1, show Screen 2, scroll to top
- [ ] **D4** — "← Edit cars" link: show Screen 1 with preserved values, hide Screen 2
- [ ] **D5** — Adjustment sliders (top of Screen 2): mileage + period — on change, re-run `calcAll()` for both cars, update all displayed values
- [ ] **D6** — Car photo display: show uploaded/URL image or placeholder SVG
- [ ] **D7** — Car specs summary row: price, fuel type, warranty period, CO2
- [ ] **D8** — Monthly cost hero: large number, color-coded (green = cheaper, red = pricier)
- [ ] **D9** — Cost breakdown table: all rows with monthly avg + period total, formatted with DM Mono
- [ ] **D10** — Depreciation section: year-by-year residual value table (Year 0 through end of period)
- [ ] **D11** — Extended warranty note: show break-even text if extended warranty purchased
- [ ] **D12** — Comparison bar at bottom: delta monthly + delta total + delta value loss
- [ ] **D13** — Disclaimer text at very bottom

---

### Phase 5 — Polish & Testing

- [ ] **P1** — Test scenario 1: BMW 1-Series 118i vs BMW X1 xDrive20i (both petrol, both new, standard warranty)
- [ ] **P2** — Test scenario 2: VW ID.4 (EV) vs VW Tiguan (petrol) — verify EV math is correct
- [ ] **P3** — Test scenario 3: BMW 330e PHEV vs BMW 320d diesel — verify PHEV split
- [ ] **P4** — Test scenario 4: Car with extended warranty vs without — verify break-even calc
- [ ] **P5** — Test scenario 5: Cash purchase vs leasing — verify leasing adds correctly to monthly
- [ ] **P6** — Slider test: change mileage slider on Screen 2, verify all values update correctly
- [ ] **P7** — Slider test: change ownership period from 3 to 7 years, verify KASKO decreases each year on residual
- [ ] **P8** — Validate: monthly total × 12 × N years = period total (for all non-leasing costs)
- [ ] **P9** — Validate: depreciation values match manual compound calculation
- [ ] **P10** — Cross-browser test: Chrome, Firefox, Edge (Safari on Mac if available)
- [ ] **P11** — Tooltip review: every `?` icon has a populated tooltip
- [ ] **P12** — Validation test: try to click Analyse with each required field empty one at a time

---

## 12. Research TODOs — Must Complete Before Build

See Phase 0 in Section 11. Findings must be documented in `RESEARCH_FINDINGS.md` (file to be created).

**Priority order:**
1. R2 — Repair buffer (most complex, most impact on accuracy)
2. R1 — Depreciation rates (second biggest impact)
3. R5 — Competitive analysis (informs product positioning)
4. R6 — Service costs Latvia (needed for defaults)
5. R3, R4, R7, R8 — Supporting details

---

## 13. Testing & Validation Plan

### Manual spreadsheet validation (before launch)

For each test scenario, build a parallel Excel/Google Sheets calculation using the formulas documented in Section 9. The HTML tool output must match the spreadsheet within €1/month rounding.

**Test scenarios to validate:**

| # | Car A | Car B | Special test |
|---|---|---|---|
| 1 | BMW 1-Series 118i petrol | BMW X1 xDrive20i petrol | Base case, same brand |
| 2 | VW ID.4 Pro EV | VW Tiguan 2.0 TDI | EV vs diesel |
| 3 | Toyota Yaris 1.5 Hybrid | Skoda Fabia 1.0 TSI | Economy cars, hybrid vs petrol |
| 4 | BMW X3 20d | Mercedes GLC 220d | Premium SUV, two brands |
| 5 | VW Golf GTE PHEV | VW Golf 2.0 TDI | PHEV vs diesel, same model |
| 6 | BMW 320d with extended warranty | BMW 320d without | Warranty break-even test |
| 7 | Any car, Cash purchase | Same car, Leasing | Financing comparison |

### Calculation checks per scenario:
- [ ] Monthly total = sum of all monthly component averages
- [ ] Period total = monthly × 12 × N years
- [ ] KASKO decreases each year (verify with DEP_RATES)
- [ ] Repair buffer = €0 for years within warranty, positive after
- [ ] Fuel cost for EV = home portion + public portion (not double-counted)
- [ ] Tyre mounting (€160/year) included separately from tyre replacement
- [ ] Transport tax = correct bracket from CO2 table
- [ ] Leasing payment uses PMT formula correctly (verify with Excel PMT function)

---

## 14. Future Phases

### Phase 2 — Car Database (Priority 1)
A searchable database of popular new car models with specs pre-filled. User selects a model, all fields populate automatically — still fully editable.

**Priority models to include first:**
- VW Golf 1.5 TSI, Golf GTE, Golf TDI
- VW Tiguan 1.5 TSI, Tiguan TDI
- Skoda Octavia 1.5 TSI, Octavia TDI
- BMW 1-Series 118i, 120d
- BMW X1 xDrive20i, xDrive20d
- BMW X3 20i, 20d
- Toyota Yaris 1.5 Hybrid
- Toyota RAV4 2.5 Hybrid
- Volvo XC40 B3, XC40 Recharge (EV)
- Tesla Model 3 RWD, Long Range
- VW ID.4 Pro
- Mercedes GLC 220d
- Audi A4 40 TDI

**Data sources:** Manufacturer websites, Latvian dealer price lists, auto24.lv new car section.

### Phase 3 — Web App & Hosting
- Host on Vercel/Netlify (free tier)
- Custom domain: e.g. `autocost.lv` or `carcost.eu`
- URL-based state: encode car data in URL params so comparisons are shareable

### Phase 4 — PDF Export
- Download comparison as a clean branded PDF
- Useful for dealerships to print and hand to customers
- Use browser print API or jsPDF library

### Phase 5 — Multi-Country Presets
- Button to switch between country defaults: Latvia, Estonia, Lithuania, Germany, Netherlands, UK
- Each preset changes: fuel prices, tax table, insurance defaults, currency if non-EUR

### Phase 6 — White-Label / Dealership Version
- Configurable brand colours and logo
- Pre-filled with dealer's car inventory
- Embedded as iframe on dealer website
- Lead capture form at end: "Get a quote for this car" → email/CRM

### Phase 7 — Third Car & Scenario Mode
- Add third comparison column
- Optimistic / Realistic / Pessimistic fuel price scenarios
- "What if I drive 30k km/year?" instant scenario switching

---

## 15. File Structure

```
Desktop/NEW_CAR_TCO_CALCULATOR/
├── PROJECT_PLAN.md          ← This file
├── RESEARCH_FINDINGS.md     ← To be created: all research findings documented here
├── new_car_tco.html         ← The MVP product (to be created in Phase 1)
├── CHANGELOG.md             ← Track what changes between versions
└── reference/
    └── (copies or links to relevant existing TCO calculator files for reference)
```

---

*Last updated: 2026-04-28*
