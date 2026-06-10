# CAR_DB Release Status - 2026-06-10

Goal set by owner: priority brands (BMW, Mercedes, Audi, BYD, Ora, Porsche, Kia, GWM) should have full model coverage for release; other brands may stay partial. This file is the honest state of that goal.

## Coverage after the 2026-06-10 batch (416 rows, 40 brands)

| Brand | Rows | Model-line coverage | Price credibility |
|---|---:|---|---|
| BMW | 41 | All current lines: 1/2/2AT/3/4/5 (sedan+Touring)/7, X1/X2/X3/X5/X6/X7, M2/M3/M135/M340, i4/i5/i7, iX1/iX2/iX3/iX | 10 new rows AUTHORED (unverified); older 31 rows authored 2026-Q1 |
| Mercedes | 29 | A/B/CLA/CLE/C/E/S, GLA/GLB/GLC/GLE/GLS, EQA/EQB/EQE/EQE SUV/EQS/EQS SUV, 3 AMG | 5 new rows AUTHORED; rest authored 2026-Q1 |
| Audi | 29 | A1/A3/A4/A5 (new gen)/A6/A6 e-tron/A7/A8, Q2/Q3/Q5 (old+new)/Q6/Q7/Q8, e-tron GT, S/RS | 5 new rows AUTHORED; rest authored 2026-Q1 |
| Kia | 23 | Full kia.lv 2026 lineup incl. EV2/EV3/EV4/EV5/EV6/EV9, K4, Sportage, Sorento, Niro, Picanto, Stonic, XCeed | 8 new rows SOURCE-VERIFIED (kia.lv price tables, list prices); legacy rows authored. NOTE: kia.lv no longer lists Rio/Ceed (replaced by K4) — legacy rows kept for used-vs-new comparisons |
| BYD | 12 | Full byd.lv 2026 lineup: Atto 2 (EV+DM-i), Atto 3 EVO, Dolphin Surf, Seal, Seal 6 DM-i (+Touring), Seal U (EV+DM-i), Sealion 7, Tang; legacy Dolphin kept | 7 new rows price-VERIFIED (byd.lv); cons/kW on new rows authored. Atto 3 updated (guarded). Seal/Sealion 7 flagged needs_mapping |
| Ora | 2 | ORA 03 + ORA 03+ (entire LV lineup) | Price/battery/range VERIFIED (gwmcars.lv); kW/cons authored |
| GWM (WEY) | 0 | gwmcars.lv WEY page currently lists NO models — appears withdrawn/not yet relaunched in LV | Nothing to add until the importer lists models |
| Porsche | 11 | Macan (ICE+Electric+Turbo El.), Cayenne, Panamera, Taycan, 911 | 3 new rows AUTHORED; rest authored 2026-Q1 |

## What "credible" still requires before release

1. **German brands have no source-backed prices.** BMW/Mercedes/Audi/Porsche pages are configurator-heavy; their LV price-list PDFs need a manual browser session. Until then all 110 German-brand rows are authored estimates. This is the single biggest credibility gap.
2. **BYD/Ora spec fields** (consumption, kW, PHEV CO2) are authored on the new rows; only prices/battery/range are verified. Spec sheets exist on byd.lv model subpages and gwmcars.lv — next capture session.
3. **Recommended release wording** (already the site's pattern): "Cenas ir orientējošas, balstītas publiskos cenrāžos vai aplēsēs; pārbaudiet pie dīlera." Rows with source URLs can show a "pārbaudīts" badge later; rows without should not claim verification.
4. **car-sources.js now covers 45 of 416 rows.** Verified-row share by traffic-weight is much higher (Kia/BYD/Toyota/Skoda/VW volume models are covered), but the absolute number should keep growing batch by batch.

## Sources used in the 2026-06-10 batch (all read live)

- https://www.kia.lv/models/qv · /sv · /sz1 · /ov · /cl4 (price tables with kWh/kW/consumption/range/list+campaign prices)
- https://www.byd.lv/ (entry prices for the full 10-model lineup)
- https://gwmcars.lv/ora (ORA 03/03+ prices, battery, range)
- Market context: Inchcape is the official BYD distributor in Latvia; AD REM Auto / Īle Auto represent GWM ORA.
