# HonestCost Research Summary - 2026-06-01

Scope: overnight-style research consolidation from parallel agents. This is evidence-gathering only; do not treat any row as production-verified until source links and trim mapping are reviewed manually.

## Car Data Audit

### Strongest immediate mismatch candidates

- `tesla_m3_rwd`: official LV configurator showed Model 3 RWD around EUR 30,990 / EUR 31,870 before savings/order summary. Existing DB price around EUR 42,000 is stale.
- `tesla_m3_lr`: LV configurator showed Long Range AWD around EUR 41,990. Existing DB price around EUR 49,000 is stale. Keep LR RWD and LR AWD separate.
- `toyota_chr_hyb`: Toyota LV C-HR price list supports 2.0 Hybrid AWD-i Style around EUR 39,500. Existing DB price around EUR 36,500 is stale.
- `toyota_rav4_hyb`: Toyota LV RAV4 price list supports Hybrid AWD-i Style around EUR 46,900. Existing DB price around EUR 42,900 is stale.
- Skoda Fabia, Kamiq, Octavia, Karoq, Superb: current official Skoda LV sources show newer trim names and prices; many DB rows use stale trim names.
- VW ID.3 and ID. Buzz: current official VW LV price lists show stale DB price/battery/power assumptions.
- Kia Niro HEV, EV6, EV9 and Hyundai i20, i30, Kona, Tucson, Ioniq 5: current official LV price pages show many DB rows are stale or renamed.

### Rows requiring manual capture or mapping before DB updates

- Tesla Model Y RWD / Long Range: official LV configurator is the right source, but current prices were not captured reliably in crawlable text. Needs manual configurator capture or screenshot.
- Toyota Yaris and Yaris Cross: current Toyota trim/power naming does not map cleanly to existing DB rows. Choose whether to preserve same trim or same powertrain before changing DB values.
- Toyota Corolla, Corolla TS, C-HR PHEV, RAV4 PHEV: current source rows exist, but exact trim mapping must be chosen first.
- BMW rows: official LV sources are mostly broad offers/model spec pages, not row-grade price lists. Use `needs_mapping` or `mismatch`, not `verified`.
- Dacia rows: official pages support starting prices/powertrain names but often not exact row-level trim/specs.
- VW Golf, T-Roc, Tiguan, Passat, ID.4: useful current source evidence exists, but exact technical rows or downloadable price-list mapping still need review.

### Safe next data step

1. Add or update `car-sources.js` metadata for high-confidence source-backed mismatches.
2. Keep status explicit: `mismatch`, `needs_mapping`, `not_found`, or `verified`.
3. Do not update `car-db.js` values until the exact source row, trim, price, date, and WLTP fields are reviewed.
4. For DB edits, start with 5-8 high-confidence rows only: Model 3 RWD, Model 3 LR AWD, Toyota C-HR Hybrid Style, Toyota RAV4 Hybrid AWD-i Style, Skoda Fabia, Skoda Octavia, VW ID.3, VW ID. Buzz.

## Dealer Outreach Research

18 public Latvian targets were identified. Best first outreach shortlist:

1. Inchcape Motors Latvia / BYD / bravoauto
2. Moller Auto VW + Audi
3. WESS Toyota
4. Veho Mercedes-Benz
5. Skandi Motors
6. Norde
7. Autobrava Motors
8. Forum Auto Kia

Best positioning: HonestCost as a neutral total-cost comparison tool for high-consideration purchases, EV/hybrid education, used-car confidence, and fleet/premium monthly-cost explanation.

Do not invent private contacts. Use only public contact pages or publicly listed role contacts.

## Content And Trust Research

Content topics ready for brief drafting:

- EV vs petrol 3-year cost comparison in Latvia.
- Imported car vs already registered Latvia car.
- Diesel vs hybrid for city driving.
- Older premium car vs newer economy car.
- SUV vs estate/wagon family budget comparison.
- Leasing vs buying without financing.
- Cheap car with repair risk vs higher-priced car with clearer history.
- Petrol, diesel, hybrid, and EV monthly-cost scenarios.
- First car in Latvia: overlooked costs.
- Winter tyres, service, OCTA, and seasonal budget impact.

Trust/compliance notes:

- `sikdatnes.html` should not be published until actual cookies, localStorage/sessionStorage, service worker, analytics, embeds, pixels, and consent behavior are technically checked.
- `accessibility.html` should be structure-only until an audit exists. Do not claim WCAG compliance, full accessibility, or AA conformance before evidence.
- Avoid unsupported content claims like cheapest, best, most accurate, verified, or current unless each claim is source-backed and dated.

## This Week's HonestCost Next Actions

1. Review source audit findings and pick the first 5-8 high-confidence `car-sources.js` entries.
2. Manually capture Tesla Model Y LV configurator prices if those rows remain priority.
3. Run deployed browser/mobile QA before CSP or static trust pages.
4. Draft first outreach email only after choosing 3-5 first dealer targets.
5. Draft first content page only after selecting calculator scenario inputs and source requirements.
