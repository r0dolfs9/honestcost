# HonestCost Car Data Audit - 2026-05-29

## Executive Summary

Current verdict: **not yet credible enough for public claims like "current Latvian new-car prices" or "verified database."**

The database is useful as a prototype comparison set, but it needs a source-backed audit layer before being used for SEO content, dealer demos, AdSense trust, or public methodology claims.

## Database Shape

Source file: `car-db.js`
Source metadata file: `car-sources.js`

- Rows: 376 cars.
- Brands: 39.
- Required fields are present for every row:
  - `id`, `name`, `brand`, `body`, `segment`, `price`, `fuel`, `cons`, `co2`, `cc`, `kw`, `warranty`, `svcInt`, `svcCost`, `tyre`, `repair`.
- Duplicate IDs: none found.
- Duplicate names: none found.
- Fuel mix:
  - Petrol: 103
  - Diesel: 36
  - PHEV: 69
  - EV: 109
  - Mild hybrid: 59

## Main Credibility Problems

### 1. No per-row source evidence

The file header says:

> Source data: dealer cenrāži + manufacturer spec sheets (2026-Q1).

But individual car rows do not include:

- source URL,
- source date,
- price-list publication date,
- trim/source-name mapping,
- whether price includes VAT,
- whether delivery/registration/CO2 tax is included,
- whether the row is base price, promotion price, or typical configured price.

This makes the database impossible to defend row-by-row.

Initial mitigation added on 2026-05-29:

- Created `car-sources.js` as the row-level audit metadata layer.
- Added `test-car-sources.js` and wired it into CI.
- First enforced source batch covers 11 high-priority IDs:
  - `tesla_m3_rwd`
  - `tesla_m3_lr`
  - `tesla_my_rwd`
  - `tesla_my_lr`
  - `toyota_yaris_hyb`
  - `toyota_yaris_cross_hyb`
  - `skoda_fabia_10tsi_se`
  - `skoda_octavia_15`
  - `skoda_octavia_etsi`
  - `vw_golf_15`
  - `vw_golf_20tdi`

Important: this does not yet mean `car-db.js` values were updated. It means the audit now has an enforceable evidence file and can track `verified`, `mismatch`, and `needs_mapping` rows.

### 2. Current prices are already stale or inconsistent

Spot checks against current official/dealer sources show mismatches.

| DB row | DB price | Current source check | Finding |
|---|---:|---|---|
| `tesla_m3_rwd` - Tesla Model 3 RWD | EUR 42,000 | Tesla Latvia configurator shows Model 3 Rear-Wheel Drive at EUR 30,990, with order summary showing EUR 31,870 before savings. Source: https://www.tesla.com/en_LV/model3/design | **Critical stale price.** DB is roughly EUR 10k+ too high for current base RWD. |
| `tesla_m3_lr` - Tesla Model 3 Long Range AWD | EUR 49,000 | Tesla Latvia shows Model 3 Long Range AWD at EUR 41,990. Source: https://www.tesla.com/en_LV/model3/design | **High discrepancy.** DB is roughly EUR 7k too high. |
| `toyota_yaris_hyb` - Toyota Yaris Hybrid 1.5 116 Style | EUR 23,900 | Toyota WESS current Yaris page lists Style 1.5 Hybrid 130 e-CVT at EUR 26,700, Active Plus at EUR 24,100, Active at EUR 22,200, Life at EUR 21,500. Source: https://toyota.wess.lv/vehicles/yaris/prices | **Trim mismatch / stale naming.** DB name says 116 Style but current Style is Hybrid 130 and higher price. |
| `skoda_fabia_10tsi_se` - Skoda Fabia 1.0 TSI 95 Selection | EUR 21,400 | Skoda Latvia promotion page says Fabia Selection 1.0 TSI MAN standard price EUR 22,640. Source: https://www.skoda.lv/promotions/promotion-detail/fabia-selection-monte-carlo | **Moderate stale price.** DB is EUR 1,240 lower. |
| `skoda_octavia_etsi` - Skoda Octavia 1.5 e-TSI DSG Style | EUR 33,400 | Skoda Latvia Octavia 30 page says Octavia Selection 30 Anniversary 1.5 TSI 110 kW DSG standard price EUR 32,810; current trims include Essence, Selection, Sportline, RS. Source: https://www.skoda.lv/promotions/promotion-detail/octavia-30-jubileja | **Trim naming risk.** DB uses older `Style`; price is close but not source-mapped. |
| `vw_golf_15` - VW Golf 1.5 TSI Style | EUR 30,500 | Volkswagen Latvia Golf page shows jubilee price from EUR 26,310; current price-list PDF dated 24.03.2026 is available. Sources: https://www.volkswagen.lv/lv/chose-your-volkswagen/models/the-new-golf.html and https://www.volkswagen.lv/idhub/content/dam/onehub_pkw/importers/lv/price-lists/lv/golf/Golf_PA_26_03_24_cenas_LV.pdf | **Needs row-level mapping.** DB may be a configured trim, but not proven. |
| `bmw_320d` - BMW 320d Sedan M Sport | EUR 51,500 | BMW Latvia technical page confirms 320d engine family specs, including 1,995 cm3 and 120-140 kW range, but price was not visible in the checked official snippets. Source: https://www.bmw.lv/lv/all-models/3seriesoverview/bmw-3-series-sedan/bmw-3-serijas-sedan-tehniskie-dati.html | **Specs partly supported; price not verified.** |

### 3. Fuel taxonomy is too coarse / misleading

Example:

- `toyota_yaris_hyb` is stored as `fuel: "mild_hybrid"`, but Toyota markets this as a full hybrid/e-CVT.

If the calculator treats all non-plug-in hybrids the same, this may be acceptable internally, but public labels should not call Toyota full hybrids "mild hybrid."

Recommended change:

- Add `fuel: "hybrid"` as a separate category, or add `powertrainLabel` separate from calculation category.

### 4. Trim names include older market names

Rows using names like `Active`, `Ambition`, and `Style` may not match current 2026 Latvia trim names for several brands.

Detected examples include:

- Skoda Fabia 1.0 TSI Active
- Skoda Octavia 1.5 TSI Ambition
- Skoda Octavia 1.5 e-TSI DSG Style
- VW Golf 1.5 TSI Style
- VW Golf 2.0 TDI Style
- Toyota Yaris Hybrid 1.5 116 Style

This does not automatically make the numerical values wrong, but it makes the rows hard to verify and confusing for users.

### 5. EV consumption high-value scan has false positives, but still needs review

Simple range checks flagged 13 EVs with consumption above 20 kWh/100km. These are mostly large/performance EVs and may be plausible:

- VW ID. Buzz Pro
- BMW iX M60
- Mercedes EQS SUV
- Audi Q8 e-tron
- Hyundai Ioniq 5 N
- Kia EV6 GT
- Kia EV9 GT-Line
- Volvo EX90
- Tesla Model X Plaid
- Porsche Taycan 4S Sport Turismo
- Jaguar I-Pace
- Polestar 3
- BYD Tang

They should not be changed automatically. They need source URLs and WLTP version/date.

## What Is Good

- Coverage is broad enough for a prototype: 376 rows / 39 brands.
- Schema is consistent and complete.
- IDs and names are unique.
- EV rows correctly use `co2: 0` and `cc: 0`.
- ICE/PHEV rows do not have impossible zero engine displacement/CO2 in the quick scan.

## Risk Rating

- Prototype/internal testing: **acceptable**.
- Public calculator beta with clear disclaimer: **usable only if described as indicative and partially unaudited**.
- SEO pages with model-specific "current price" claims: **not acceptable yet**.
- Dealer demos/screenshots: **not acceptable unless the specific rows used in the demo are verified first**.
- Sale/licensing readiness: **not acceptable until row-level source evidence exists**.

## Recommended Data Model Upgrade

Add optional audit metadata per row:

```js
source: {
  priceUrl: "https://...",
  specUrl: "https://...",
  checkedAt: "2026-05-29",
  priceListDate: "2026-03-24",
  market: "LV",
  priceType: "official_list" | "dealer_offer" | "configurator_base" | "estimated_typical_trim",
  includesVat: true,
  excludesRegistrationTax: true,
  notes: "Trim mapped from current Selection; old DB row used Style."
}
```

Current approach: keep `car-db.js` compact and use `car-sources.js` keyed by `id`:

```js
window.CAR_SOURCES = {
  toyota_yaris_hyb: {
    priceUrl: "https://toyota.wess.lv/vehicles/yaris/prices",
    checkedAt: "2026-05-29",
    priceListDate: "current page crawl",
    status: "mismatch",
    notes: "DB row says Hybrid 116 Style EUR 23,900; current WESS Style Hybrid 130 is EUR 26,700."
  }
};
```

## Next Audit Batch

Do not try to fix all 376 rows manually in one pass. Start with 30-50 Latvian-relevant rows:

1. Skoda Fabia, Kamiq, Octavia, Karoq, Kodiaq, Superb, Enyaq.
2. VW Polo, Golf, T-Cross, T-Roc, Tiguan, Passat, ID.3, ID.4, ID. Buzz.
3. Toyota Yaris, Yaris Cross, Corolla, C-HR, RAV4, Corolla Cross, Prius/PHEV if present.
4. BMW 1 Series, 3 Series, X1, X3, i4, iX1, iX3 if present.
5. Tesla Model 3, Model Y.
6. Kia Ceed, Sportage, Niro, EV3/EV6/EV9 if present.
7. Hyundai i20/i30/Kona/Tucson/Ioniq 5 if present.
8. Dacia Sandero, Duster, Jogger.

For each row, record:

- current price,
- current trim name,
- powertrain,
- WLTP consumption,
- WLTP CO2,
- kW,
- warranty,
- source URL,
- source date.

## Immediate Fix Candidates

Before using current data in public examples, update or source-map at least:

- Tesla Model 3 rows.
- Toyota Yaris / Yaris Cross rows.
- Skoda Fabia / Octavia rows.
- VW Golf rows.

These are likely to appear in examples, SEO pages, or dealer conversations.
