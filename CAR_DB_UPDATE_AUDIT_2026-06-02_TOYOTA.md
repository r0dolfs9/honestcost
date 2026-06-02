# HonestCost Car DB Update Audit - Toyota Slice - 2026-06-02

Scope: first guarded live `car-db.js` update from the expanded source metadata. Only two direct-match Toyota rows were changed.

## Updated Rows

| Row | Field | Old value | New value | Source |
|---|---|---|---|---|
| `toyota_chr_hyb` | `name` | `Toyota C-HR Hybrid 2.0 Style` | `Toyota C-HR 2.0 Hybrid AWD-i Style` | Toyota C-HR LV price list |
| `toyota_chr_hyb` | `price` | `36500` | `39500` | Toyota C-HR LV price list |
| `toyota_chr_hyb` | `cons` | `4.7` | `5` | Toyota C-HR LV price list |
| `toyota_chr_hyb` | `kw` | `144` | `131` | Toyota C-HR LV source/audit metadata |
| `toyota_rav4_hyb` | `name` | `Toyota RAV4 Hybrid AWD-i Style` | `Toyota RAV4 2.5 Hybrid AWD-i Style` | Toyota RAV4 LV price list |
| `toyota_rav4_hyb` | `price` | `42900` | `46900` | Toyota RAV4 LV price list |
| `toyota_rav4_hyb` | `cons` | `5.4` | `5.6` | Toyota RAV4 LV price list |
| `toyota_rav4_hyb` | `kw` | `160` | `143` | Toyota RAV4 LV source/audit metadata |

Source URLs:

- `https://mediacontent.toyota.ee/pricelists/Toyota_C-HR_Pricelist_LV.pdf`
- `https://www.toyota.lv/new-cars/c-hr`
- `https://mediacontent.toyota.ee/pricelists/RAV4_Pricelist_LV.pdf`
- `https://www.toyota.lv/new-cars/rav4`

## TDD / Verification

Red:

- `node test-audited-car-db-values.js` failed as expected before DB edits:
  - `toyota_chr_hyb price matches audited source`
  - actual `36500`, expected `39500`

Green:

- `node test-audited-car-db-values.js` passed.
- `node test-calc.js` passed.
- `node test_scenarios.js` passed; all 7 scenarios passed.
- `node test-car-sources.js` passed.

## Notes

- `car-sources.js` still records these rows as `mismatch` because it documents the stale DB mismatch that triggered the update. A later cleanup can add a separate `updatedAt` or `dbUpdatedAt` field if the metadata layer starts tracking resolved mismatches.
- No Tesla, VW, Skoda, PHEV, or campaign-price rows were changed in this slice.
