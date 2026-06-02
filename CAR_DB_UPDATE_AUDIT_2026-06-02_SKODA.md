# HonestCost Car DB Update Audit - Skoda Slice - 2026-06-02

Scope: second guarded live `car-db.js` update from expanded source metadata. Only two direct-match Skoda Octavia rows were changed.

## Updated Rows

| Row | Field | Old value | New value | Source |
|---|---|---|---|---|
| `skoda_octavia_20tdi` | `name` | `Skoda Octavia 2.0 TDI Style` | `Skoda Octavia 2.0 TDI DSG` | Skoda Octavia LV price list |
| `skoda_octavia_20tdi` | `price` | `32900` | `32620` | Skoda Octavia LV price list |
| `skoda_octavia_rs` | `name` | `Skoda Octavia RS 2.0 TSI 245` | `Skoda Octavia RS 2.0 TSI 265` | Skoda Octavia LV price list |
| `skoda_octavia_rs` | `price` | `41800` | `39010` | Skoda Octavia LV price list |
| `skoda_octavia_rs` | `co2` | `162` | `161` | Skoda Octavia LV price list |
| `skoda_octavia_rs` | `kw` | `180` | `195` | Skoda Octavia LV price list |

Source URL:

- `https://www.skoda.lv/_doc/9436f79d-4c35-47b5-91bb-c7a9814f6bd8`

## TDD / Verification

Red:

- `node test-audited-car-db-values.js` failed as expected before DB edits:
  - `skoda_octavia_20tdi price matches audited source`
  - actual `32900`, expected `32620`

Green:

- `node test-audited-car-db-values.js` passed.
- `node test-calc.js` passed.
- `node test_scenarios.js` passed; all 7 scenarios passed.
- `node test-car-sources.js` passed.

## Notes

- `skoda_octavia_20tdi` consumption and CO2 were already inside the current source range, so only name and price were changed.
- `skoda_octavia_rs` consumption was already at the source range maximum, so it was kept; price, CO2, and kW were updated.
- No Skoda warranty fields were changed because this source slice did not independently verify warranty terms.
