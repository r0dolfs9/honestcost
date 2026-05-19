# R11 — Dealer Add-Ons / Options System: Brainstorm
**Date:** 2026-05-15  
**Constraint:** Single HTML file, no backend, no build step.

---

## The Problem This Solves

A BMW 1-Series 118i base is €32,500. A fully-loaded 118i M Sport with panoramic roof, HiFi, M-Sport Plus, and larger wheels is €41,000. These are treated identically in HonestCost v1.0 — the user manually enters the higher price, but none of the downstream TCO effects are modeled:

- Larger wheels → larger tyres → higher tyre category
- Higher price → higher KASKO (on residual)
- Metallic paint, leather → slightly different residual curve
- Sport packages often include larger brakes, bigger engine variants → slightly higher fuel consumption

The feature asks: **can the user add/remove options and see the TCO impact in real time?**

---

## Option 1 — Simple Price Adjuster (MVP+, lowest effort)

**What it does:** A collapsible "Options" section under each car column with a running "add-ons total" field. User clicks checkboxes for common add-ons; price field updates automatically. No downstream effects beyond price change.

**What changes in TCO automatically (via price increase):**
- Leasing payment ↑ (higher principal)
- KASKO ↑ (higher residual basis)
- Depreciation total ↑ (same rates × higher price)

**What is NOT modeled:** Tyre category change from larger wheels, fuel consumption delta.

**Effort:** ~2 hours. Just UI + a running sum that feeds into `car.price`.

**Verdict:** Good first step. Covers 80% of value with 10% of the complexity.

---

## Option 2 — Structured Add-On System (Full feature, ~1 day)

### Add-on categories to model

**A. Wheel / Tyre Upgrades**
- "Sport 18\" wheel package" → tyre category: small→mid or mid→large
- "Sport 19–20\" wheel package" → tyre category: mid→large or large→suv
- Effect on model: tyre annual cost changes (e.g. mid €390 → suv €555 = +€165/yr)
- Effect on fuel: slightly higher rolling resistance → add 0.2–0.3 L/100km (optional, low confidence)

**B. Appearance Packages**
- Metallic paint (+€600–1,200): price ↑, minor residual improvement (negligible, skip)
- Panoramic roof (+€1,200–2,000): price ↑ only
- Leather interior (+€1,500–2,500): price ↑, minor residual effect (skip)
- M/AMG/R-Line cosmetic (+€1,500–3,000): price ↑ only

**C. Technology Packages**
- Navigation/HiFi/Driving Assist (+€800–1,500): price ↑ only
- Advanced driver assist (lane keep, radar cruise) (+€1,000–2,000): price ↑ only

**D. Extended Warranty (already in model)**
Already modeled in v1.0. No change needed here.

**E. Engine Upgrades (model-specific)**
- 118i → 120i: price +€3,000, fuel consumption +0.5 L/100km, CO2 +8 g/km
- TDI → TDI 4MOTION: price +€2,000, fuel +0.3 L/100km
These are better handled by the Car Database feature (R12) than by add-ons.

### Data structure

```javascript
const ADDONS = {
  wheels_18: {
    label: '18" sport wheels',
    priceEUR: 800,
    tyreCatChange: +1,   // 0=no change, +1=one step up, -1=down
    fuelDelta: 0.2,      // L/100km or kWh/100km addition
  },
  wheels_20: {
    label: '20" sport wheels',
    priceEUR: 1500,
    tyreCatChange: +2,
    fuelDelta: 0.3,
  },
  pano_roof: {
    label: 'Panoramic roof',
    priceEUR: 1500,
    tyreCatChange: 0,
    fuelDelta: 0,
  },
  metallic_paint: {
    label: 'Metallic paint',
    priceEUR: 700,
    tyreCatChange: 0,
    fuelDelta: 0,
  },
  leather: {
    label: 'Leather interior',
    priceEUR: 2000,
    tyreCatChange: 0,
    fuelDelta: 0,
  },
  m_sport: {
    label: 'M Sport / R-Line package',
    priceEUR: 2500,
    tyreCatChange: +1,
    fuelDelta: 0.1,
  },
  tech_pack: {
    label: 'Technology package',
    priceEUR: 1200,
    tyreCatChange: 0,
    fuelDelta: 0,
  },
};
```

### UI approach

- Collapsible section: **"Ekstra opcijas / papildaprīkojums"** under price field
- Checkbox list, each shows `label + price (€X)`
- Running subtotal: "Opciju kopsumma: €4,200" → auto-added to base price
- Visual effect: tyre category buttons auto-advance when wheel upgrade selected
- No separate "options result" — all effects flow through existing `calcAll()` inputs

### Key technical consideration

All add-on effects ultimately map to existing input fields:
- `car.price` ← base + sum of option prices
- `car.tyre` ← base tyre + wheel upgrade delta (capped at 'suv')
- `car.cons` ← base consumption + sum of fuel deltas

So the implementation is: compute adjusted inputs, pass to existing `calcAll()`. No changes to the calculation engine.

---

## Option 3 — Dealer White-Label Mode (Phase 4+, not now)

When a specific dealership uses HonestCost:
- Their specific model configurations are pre-populated
- Options are drawn from their actual price list
- "Add to cart" flows to a lead form

**Skip for MVP.** This belongs in the business model phase after 5+ dealerships are paying.

---

## Recommendation

**Build Option 1 first (2 hours):** Simple price adjuster with checkboxes. Ships fast, covers the main use case (user knows what options they want, just needs to add the price). Already handles the biggest downstream effects (leasing + KASKO + depreciation).

**Build Option 2 in Sprint 2 (1 day):** Add the tyre category auto-advance and fuel delta. This is where HonestCost genuinely differentiates — showing that "sport 20\" wheels" doesn't just cost €1,500 to buy, it costs €165/year extra in tyres forever. That's an insight most buyers never get.

---

## Add-On TCO Surprise (for marketing)

The most powerful demonstration of Option 2:

> BMW 1-Series 118i base (17" wheels): €717/month  
> Same car with 20" M-Sport wheels (+€1,500 buy, +€165/yr tyres): €726/month  
> "Your 20\" wheels cost you €3,825 over 5 years, not €1,500."

This is the kind of concrete, specific insight that makes people share the tool.

---

*Brainstorm complete. No implementation yet. Ready to build when R12 is also scoped.*
