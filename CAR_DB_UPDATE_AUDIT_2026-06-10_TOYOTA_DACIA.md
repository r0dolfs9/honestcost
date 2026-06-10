# HonestCost Car DB Update Audit - Toyota + Dacia Slice - 2026-06-10

Scope: second guarded live `car-db.js` update batch. Evidence captured live from official Latvian dealer pages (WESS Toyota price tables, Dacia Latvia model pages) on 2026-06-10 via in-browser page reads. Only three direct-match Toyota rows were changed; Dacia rows were recorded as `needs_mapping` source metadata only, with NO DB changes.

## Updated Rows

| Row | Field | Old value | New value | Source |
|---|---|---|---|---|
| `toyota_yaris_hyb` | `name` | `Toyota Yaris Hybrid 1.5 116 Style` | `Toyota Yaris 1.5 Hybrid 130 Style` | WESS Yaris price table |
| `toyota_yaris_hyb` | `price` | `23900` | `26700` | WESS Yaris price table |
| `toyota_yaris_hyb` | `co2` | `86` | `95` | WESS Yaris price table |
| `toyota_yaris_cross_hyb` | `name` | `Toyota Yaris Cross Hybrid AWD-i` | `Toyota Yaris Cross 1.5 Hybrid 130 AWD-i Style` | WESS Yaris Cross price table |
| `toyota_yaris_cross_hyb` | `price` | `30500` | `30000` | WESS Yaris Cross price table |
| `toyota_yaris_cross_hyb` | `kw` | `85` | `96` | WESS Yaris Cross price table (engine column states 96 kW) |
| `toyota_corolla_hyb` | `name` | `Toyota Corolla Hybrid 1.8 Style` | `Toyota Corolla 1.8 Hybrid Active Sedan` | WESS Corolla price table |
| `toyota_corolla_hyb` | `body` | `hatch` | `sedan` | WESS Corolla price table (sedans) |
| `toyota_corolla_hyb` | `price` | `28500` | `28400` | WESS Corolla price table (list price; campaign 24,300 not used per pricing policy) |
| `toyota_corolla_hyb` | `cons` | `4.1` | `4.4` | WESS Corolla price table |
| `toyota_corolla_hyb` | `co2` | `95` | `100` | WESS Corolla price table |
| `toyota_corolla_hyb` | `kw` | `90` | `72` | WESS Corolla price table |

Source URLs (all read live 2026-06-10):

- `https://toyota.wess.lv/vehicles/yaris/prices`
- `https://toyota.wess.lv/vehicles/yaris-cross/prices`
- `https://toyota.wess.lv/vehicles/corolla/prices`
- `https://www.dacia.lv/` (+ Sandero / Duster / Spring model pages)

## Deliberately NOT changed

- `toyota_yaris_hyb` `kw` stays `85`: the Yaris page prints `(68 kW)` for the Hybrid 130, which conflicts with `(96 kW)` printed for the same powertrain on the Yaris Cross page. Until clarified, the old value stays and the discrepancy is logged in `car-sources.js`.
- `toyota_yaris_cross_hyb` `cons`/`co2` stay as-is: the Yaris Cross price table does not show CO2/consumption columns.
- All Dacia rows: only entry "cena no" prices were visible (Sandero 14,490 / Stepway 15,690 / Duster 17,690 / Spring 17,390). These are recorded as `needs_mapping` in `car-sources.js`; DB rows are specific trims and were not touched.
- Corolla Cross and Bigster: present at dealers, absent from CAR_DB; left for a separate additive batch.

## TDD / Verification

- `node test-audited-car-db-values.js` extended with the three new rows (kW/cons assertions are now optional per row so unverified fields are not asserted as audited).
- Full suite after edits: `test-calc.js`, `test_scenarios.js` (7/7), `test-ui-helpers.js`, `test-static-pages.js`, `test-car-sources.js`, `test-audited-car-db-values.js` — all pass (see progress log).

## Notes

- This batch was captured from live rendered pages, not PDFs; WESS price-table pages include trim, body, engine (kW), gearbox, CO2 (Yaris/Corolla) and consumption (Corolla) columns.
- `car-sources.js` now has 25 row entries (was 20). Target per NEXT_TASKS Stage 1 remains 30-50.
