# HonestCost Car DB Update Audit - VW EV Slice - 2026-06-02

Scope: third guarded live `car-db.js` update from expanded source metadata. Only two VW EV rows were changed, using the locked standard/list-price policy.

## Pricing Policy Applied

`car-db.js.price` uses standard/list price by default.

Campaign prices remain in `car-sources.js` as metadata:

- `currentListPrice`
- `currentCampaignPrice`
- `currentPriceBasis`

## Updated Rows

| Row | Field | Old value | New value | Source |
|---|---|---|---|---|
| `vw_id3_pro` | `name` | `VW ID.3 Pro` | `VW ID.3 Pro 58kWh` | VW ID.3 LV price list |
| `vw_id3_pro` | `price` | `39900` | `46050` | VW ID.3 LV price list, list price |
| `vw_id3_pro` | `cons` | `16.5` | `15.8` | VW ID.3 LV source/audit metadata |
| `vw_idbuzz` | `name` | `VW ID. Buzz Pro 77kWh` | `VW ID. Buzz Pro NWB MY26` | VW ID. Buzz LV price list |
| `vw_idbuzz` | `price` | `64900` | `53666` | VW ID. Buzz LV price list, list price |
| `vw_idbuzz` | `cons` | `20.5` | `20.8` | VW ID. Buzz LV price list |
| `vw_idbuzz` | `kw` | `150` | `210` | VW ID. Buzz LV price list |

Source URLs:

- `https://www.volkswagen.lv/idhub/content/dam/onehub_pkw/importers/lv/price-lists/lv/id-3/ID.3_08_07_cenas_LV.pdf`
- `https://www.volkswagen.lv/idhub/content/dam/onehub_pkw/importers/lv/price-lists/lv/id-buzz/IDBuzz_cenas_MY26_17.02.2026_LV.pdf`

## TDD / Verification

Red:

- `node test-audited-car-db-values.js` failed as expected before DB edits:
  - `vw_id3_pro price matches audited source`
  - actual `39900`, expected `46050`

Green:

- `node test-audited-car-db-values.js` passed.
- `node test-car-sources.js` passed.
- `node test-calc.js` passed.
- `node test_scenarios.js` passed; all 7 scenarios passed.

## Notes

- `vw_id3_pro_s` was not changed in this slice. It has separate metadata and should be updated only in a later guarded batch.
- `vw_idbuzz` had stale battery/name, kW, consumption, and price assumptions, so the update was not price-only.
- VW campaign prices were not used for live calculator values.
