# HonestCost Car DB Update Audit - BYD / Kia / Ora Batch - 2026-06-10

Scope: release-coverage expansion batch. 40 rows added (376 -> 416), 1 guarded update, 20 new car-sources.js entries (25 -> 45). Evidence read live in-browser on 2026-06-10.

## Source-backed additions

**Kia (8 rows, kia.lv model price tables — list prices per pricing policy; campaign prices recorded in car-sources.js):**
kia_ev2_42 (32 490), kia_ev3_58 (39 990), kia_ev3_81 (43 990), kia_ev4_58 (42 190), kia_ev4_81 (46 190), kia_ev5_81 (52 990), kia_k4_10 (26 990), kia_k4_16 (32 490). Battery/kW/consumption/CO2 read from the same tables.

**BYD (7 rows, byd.lv entry prices):**
byd_atto2 (36 990), byd_atto2_dmi (28 990), byd_seal_u_ev (42 930), byd_seal_u_dmi (38 050), byd_seal6_dmi (36 990), byd_seal6_dmi_tour (37 990), byd_dolphin_surf (24 990). Prices verified; consumption/kW/PHEV CO2 authored pending spec capture (flagged in notes).

**Ora (2 rows, gwmcars.lv — new brand in DB):**
ora_03 (29 995, 48 kWh, 310 km), ora_03_plus (37 995, 63 kWh, 420 km). kW/consumption authored.

## Guarded update

| Row | Field | Old | New | Source |
|---|---|---|---|---|
| byd_atto3 | name | BYD Atto 3 Design | BYD Atto 3 EVO | byd.lv (facelift rename) |
| byd_atto3 | price | 38500 | 40990 | byd.lv entry price 2026-06-10 |

## Flagged, NOT changed

- byd_seal: live entry 47 830 vs DB Design AWD 47 500 — trim mismatch, needs_mapping.
- byd_sealu (legacy id; car is Sealion 7 Comfort): live entry 47 810 vs DB 47 900 — needs_mapping.
- GWM WEY: importer page lists no models; nothing added.
- kia.lv lineup no longer includes Rio/Ceed (K4 replaces); legacy rows kept deliberately.

## Authored additions (NO source yet — see RELEASE_DB_STATUS_2026-06-10.md)

BMW (10): 218i Active Tourer, X2 sDrive20i, iX2 eDrive20, 420i GC, 520d Touring, M2, M3 Competition, X6 40i, 740d, i7 eDrive50.
Mercedes (5): B 200, GLB 200, CLE 200, S 450 d, EQE SUV 350+.
Audi (5): A5 TFSI (new gen), A5 Avant TDI, A6 e-tron, Q5 TFSI (new gen), A8 60 TFSI e.
Porsche (3): Panamera, Macan Turbo Electric, 911 Carrera S.
Prices are 2026 estimates consistent with the existing authored DB standard; maintenance fields copied from same-brand sibling rows. These rows have NO car-sources entries on purpose — absence = unverified.

## TDD / Verification

- test-car-sources.js: 20 new required ids; byd_atto3 added to resolvedRows.
- test-audited-car-db-values.js: byd_atto3 / kia_ev3_58 / ora_03 pinned; status assertion widened to accept 'verified' (rows created from source) alongside 'mismatch' (resolved stale rows).
- Full suite passes: test-calc, test_scenarios (7/7), test-ui-helpers, test-static-pages, test-car-sources, test-audited-car-db-values.
- 416 rows, 0 duplicate ids, car-db.js header updated.
