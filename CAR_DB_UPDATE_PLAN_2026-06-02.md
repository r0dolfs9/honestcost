# HonestCost Guarded Car DB Update Plan - 2026-06-02

Scope: review expanded `car-sources.js` metadata and define the first safe path for `car-db.js` updates. This plan does not change live calculator values.

## Decision

Do not bulk-update `car-db.js`.

The first live DB update should be a small, reviewed batch where each row has:

- an existing `car-db.js` row id,
- a matching source row or a deliberately chosen remap,
- source URL and checked date in `car-sources.js`,
- price, trim, fuel, WLTP consumption/range, CO2, kW, and warranty reviewed together,
- calculator scenario smoke tests run after the change.

## Source Metadata Semantics

`car-sources.js` is audit metadata, not calculator input.

- `status: 'mismatch'` means the audited source disagreed with the DB row at the time of audit.
- `resolved: true` means that stale mismatch has since been corrected in `car-db.js`.
- Resolved rows must also include `dbUpdatedAt` and `dbUpdateAudit`.
- Leave unresolved stale rows without `resolved: true`.
- Do not change historical `dbPrice` on resolved rows; it records the stale value that triggered the DB update.

## Ready First Batch

These rows are the best first candidates because the source metadata shows direct or near-direct mismatch evidence and the update impact is easy to review.

| Row | Current DB state | Source-backed target | Status | Recommendation |
|---|---|---|---|---|
| `tesla_m3_rwd` | DB price EUR 42,000 | Model 3 RWD around EUR 31,870 before savings/order summary | mismatch | Ready for reviewed price update if Tesla LV configurator is manually re-opened once before edit. Leave kW unchanged unless Tesla source exposes it directly. |
| `tesla_m3_lr` | DB price EUR 49,000 | Model 3 Long Range AWD around EUR 41,990 | mismatch | Ready for reviewed price update if mapping stays AWD. Do not mix with LR RWD. |
| `toyota_chr_hyb` | DB price EUR 36,500 | C-HR 2.0 Hybrid AWD-i Style around EUR 39,500 | mismatch | Good candidate if DB row is confirmed as AWD-i Style. Review WLTP, CO2 and kW together before edit. |
| `toyota_rav4_hyb` | DB price EUR 42,900 | RAV4 Hybrid AWD-i Style around EUR 46,900 | mismatch | Good candidate if DB row is confirmed as AWD-i Style. Review WLTP, CO2 and kW together before edit. |
| `skoda_octavia_20tdi` | DB uses old Style naming, price EUR 32,900, warranty 3 | Current 2.0 TDI DSG around EUR 32,620 | mismatch | Good candidate for trim/warranty cleanup, but treat as mapping update, not just price update. |
| `skoda_octavia_rs` | DB price EUR 41,800, kW 180 | Current RS around EUR 39,010 and 195 kW | mismatch | Good candidate because both price and power are stale. Review whether body/segment still fit. |
| `vw_id3_pro` | DB price EUR 45,900 | ID.3 Pro regular EUR 46,050 / campaign EUR 39,520 | mismatch | Candidate only after deciding whether DB should use list price or campaign price. Prefer list price unless the app explicitly models campaign offers. |
| `vw_idbuzz` | DB price EUR 62,900 | ID. Buzz Pro NWB MY26 regular EUR 53,666 / campaign EUR 47,116 | mismatch | Candidate, but update battery/kW/range together; do not do price-only change. |

## Hold For Mapping

These should not be changed yet even though source evidence exists.

- `toyota_yaris_hyb`: source row changed from Hybrid 116 Style to Hybrid 130 Style. Decide whether to preserve trim or preserve powertrain first.
- `toyota_yaris_cross_hyb`: current source capture did not confirm the existing AWD-i row directly.
- `toyota_chr_phev`: multiple trims exist; row lacks exact trim mapping.
- `toyota_rav4_phev`: current price is close to DB, but trim/WLTP/range mapping is not explicit.
- `skoda_fabia_10tsi_se`: updated metadata indicates source mismatch, but the exact price in the metadata changed from the older audit. Re-open the current price list before DB edits.
- `skoda_octavia_15`: source maps to current Essence, while DB uses old Ambition. Decide whether to rename row or map to equivalent current entry.
- `skoda_octavia_etsi`: current source says 1.5 m-Hybrid DSG; DB uses older e-TSI DSG Style. Needs naming policy.
- `vw_golf_15` and `vw_golf_20tdi`: current PDF source exists, but exact WLTP/trim rows still need capture.
- `vw_id3_pro_s`: source supports a mismatch, but list/campaign price policy should be decided with `vw_id3_pro`.
- Tesla Model Y rows: need manual LV configurator capture.

## Price Policy Needed Before DB Edits

Decision for VW and dealer offer rows:

- **Locked policy:** `car-db.js.price` should use standard/list price, not campaign price, unless the model name or row explicitly says it is an offer.
- Campaign prices can be stored in `car-sources.js` notes, not calculator input.
- If campaign pricing is used, the UI/data docs must say so clearly because monthly cost comparisons will move materially.
- For source metadata with both values, use:
  - `currentPrice`: the selected DB update basis.
  - `currentPriceBasis`: `list` or `campaign`.
  - `currentListPrice`: standard/list price.
  - `currentCampaignPrice`: campaign/discounted price.

## First Implementation Slice

When ready to edit live data, do only one small batch:

1. Re-open official source URLs for the selected rows on the same day.
2. Update `car-sources.js` status/notes if any source has moved.
3. Update no more than 4 `car-db.js` rows in one commit.
4. Prefer rows with direct trim match:
   - `tesla_m3_rwd`
   - `tesla_m3_lr`
   - `toyota_chr_hyb`
   - `toyota_rav4_hyb`
5. Run:
   - `node test-calc.js`
   - `node test_scenarios.js`
   - `node test-car-sources.js`
6. Add a short audit note listing old values, new values, source URLs, and checked date.

## 2026-06-02 Attempted First Slice

The first implementation slice was narrowed to Toyota only because the official Toyota PDFs were re-opened and directly confirmed:

- `toyota_chr_hyb`: C-HR 2.0 Hybrid AWD-i Style, 5.0 l/100km, EUR 39,500.
- `toyota_rav4_hyb`: RAV4 2.5 Hybrid Dynamic Force AWD-i Style, 5.6 l/100km, EUR 46,900.

Tesla rows were skipped because the Tesla LV configurator is dynamic and did not expose extractable price lines in the available browser/source view.

TDD status:

- Added `test-audited-car-db-values.js` to assert the audited Toyota rows against `car-sources.js`.
- The required red test run could not be observed because `node test-audited-car-db-values.js` failed to start twice due to the Windows sandbox startup failure.
- Because the red test could not be observed, `car-db.js` was intentionally left unchanged.

Next time, start by running:

```powershell
node test-audited-car-db-values.js
```

Expected first failure before DB edits: `toyota_chr_hyb price matches audited source`, because the current DB still has EUR 36,500 while the audited source has EUR 39,500.

## Acceptance Criteria

- No row is updated from a vague model-level source.
- No row mixes campaign and list pricing silently.
- No PHEV/EV row is price-only if battery, kW, WLTP range, or consumption also changed.
- Scenario tests still pass after data updates, with changed outputs accepted only if explained by the data audit note.
