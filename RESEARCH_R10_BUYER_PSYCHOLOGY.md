# R10 — New Car Buyer Psychology: What Costs Do Buyers Most Underestimate?
**Date:** 2026-05-15  
**Purpose:** Inform HonestCost UI tooltip copy. Ranked by severity of underestimation.

---

## Why This Matters for HonestCost

HonestCost's core value proposition is making hidden costs visible. To write effective tooltips, we need to understand the specific psychological mechanisms that cause buyers to miss each cost — then address them directly.

The tool's monthly cost hero metric already fights the biggest bias (#1 below). Tooltips should reinforce this by naming the blind spots.

---

## The 5 Costs Buyers Most Systematically Underestimate

### #1 — DEPRECIATION (most underestimated, by far)
**How underestimated:** AAA data (2025): depreciation averages €4,000–5,000/year on a €35,000 car, yet most buyers don't think about it at all when comparing models.

**Why:**
- **Salience bias:** Fuel costs are visible every week at the pump. Depreciation is invisible — the car doesn't break, nothing arrives in the mail.
- **Ownership illusion:** Buyers think of a purchase as "getting something", not as a depreciating asset. Spending €35,000 on a car doesn't feel like losing €7,000 in year one.
- **New car premium blindspot:** Buyers compare against used car prices, not against what their car will be worth in 3 years. The "new car smell premium" (5–10% of price lost the moment you drive off the lot) is not on their radar.
- **EV-specific amplifier:** EV buyers often have no mental model for how fast EV residuals fall in years 1–2 (30% in year 1). They see EV as "future-proof" which biases them toward optimism on resale.

**HonestCost tooltip copy for "Depreciation category" field:**
> "The single biggest cost of car ownership — bigger than fuel, tyres, or service combined. A €40,000 car can lose €12,000 in value in its first year alone. This field determines how fast HonestCost models that decline."

---

### #2 — INSURANCE (KASKO) — anchoring on low-end quotes
**How underestimated:** Buyers typically anchor on the cheapest KASKO quote they've seen, or assume it's "roughly the same as my current car." In practice, KASKO on a premium new car is 1.8–3.5% of residual value per year — dropping significantly as the car ages.

**Why:**
- **Anchoring bias:** The dealer quotes a single monthly payment (leasing). Buyers anchor to that number and don't separately calculate insurance.
- **Optimism bias:** "I'm a good driver, I won't make a claim" → buyers underweight the insurance cost relative to its actual magnitude.
- **Bundling blindspot:** When insurance is rolled into a dealer finance package, buyers don't see it as a separate cost at all.
- **Year-1 shock:** KASKO on a new €45,000 car at 2.5% = €1,125 in year 1. Most buyers expect €400–600. The difference is a genuine surprise.

**HonestCost tooltip copy for "KASKO level" field:**
> "KASKO covers your car if you cause an accident or it's stolen. On a new car worth €40,000, even 'Basic' KASKO costs ~€720/year. It decreases each year as your car loses value — HonestCost calculates this decline automatically."

---

### #3 — TYRES — the cost buyers forget exists
**How underestimated:** In surveys (EY, 2023; Edmunds), tyres are the single most-forgotten cost. A large portion of buyers literally do not think about tyre replacement when comparing car ownership costs.

**Why:**
- **Infrequency bias:** Tyres last 3–5 years. The cost is infrequent enough that it doesn't form a mental budget line.
- **Category confusion:** Buyers think of tyres as "maintenance" — but their mental model of maintenance is oil changes (€80), not a €450–555/year set replacement.
- **Size unawareness:** Buyers choosing 19–21" rims for aesthetics don't know they're signing up for €555/year in tyre costs vs €390 for 17" — a €165/year difference, or €825 over 5 years.

**HonestCost tooltip copy for "Tyre category" field:**
> "Tyres are the most-forgotten car cost. A full set of 19\" tyres + seasonal swaps costs ~€555/year. Most buyers focus on fuel and forget that bigger rims = bigger annual tyre bill. Choose the size matching your car's standard wheel spec."

---

### #4 — POST-WARRANTY REPAIRS — the "cliff" buyers don't see
**How underestimated:** Buyers planning a 5-year ownership horizon expect warranty to cover all unexpected costs. They don't model the step-change that happens at year 3 or 5 when warranty expires.

**Why:**
- **Warranty halo:** "It's a new car with a warranty, so it won't break." This is mostly true during warranty — but the mental model persists past the expiry date.
- **PHEV/turbo blindspot:** Buyers choosing a PHEV or turbocharged engine for fuel efficiency don't factor in that post-warranty repairs on these drivetrains are materially more expensive than a simple petrol engine.
- **Horizon mismatch:** Dealers frame warranties as "3 years coverage" — buyers remember that number but forget to think about year 4.

**HonestCost tooltip copy for "Repair risk level" field:**
> "Repair costs are €0 while your car is under warranty — then they start. A turbocharged or PHEV drivetrain costs significantly more to fix than a simple petrol engine. 'High risk' captures this: complex cars, aging drivetrains, or if you're planning to keep the car past 5 years."

---

### #5 — TRANSPORT TAX (TEN) — unknown to most buyers
**How underestimated:** Most Latvian car buyers are either unaware the TEN tax exists, or assume it's a small fixed fee (~€30/year). In reality, for a CO2 of 156–175 g/km it's €126/year, and it's paid every year.

**Why:**
- **Low salience:** TEN is paid annually (not monthly), so it doesn't appear in monthly budget planning.
- **CO2 unawareness:** Most buyers don't know their car's CO2 figure or what bracket it falls into. "161 g/km" is a spec-sheet number that doesn't feel like money.
- **EV free-ride assumption:** EV buyers know they pay €0 — but ICE buyers don't make the reverse inference that they pay more.

**HonestCost tooltip copy for "CO₂ (g/km)" field:**
> "Used to calculate Latvia's annual transport tax (TEN). A BMW X1 at 161 g/km pays €126/year — every year you own it. Found on your car's registration document or the manufacturer's spec sheet (WLTP figure)."

---

## Ranking by "surprise factor" (gap between buyer expectation and reality)

| # | Cost | Buyer expectation | Reality | Surprise gap |
|---|---|---|---|---|
| 1 | Depreciation | "It keeps most of its value" | Year 1: 18–30% of price gone | ★★★★★ |
| 2 | Tyres (large/SUV) | "Maybe €200/year?" | €450–555/year | ★★★★☆ |
| 3 | Post-warranty repairs | "Shouldn't be much on a new car" | €350–900/yr after warranty | ★★★★☆ |
| 4 | KASKO on new premium car | "€400–600/year?" | €900–1,300/yr (Y1 on €45k car) | ★★★☆☆ |
| 5 | TEN transport tax | "~€30/year?" | €72–147/year for typical cars | ★★★☆☆ |

---

## UI / Tooltip Principles

Based on the psychological mechanisms above, HonestCost tooltips should:

1. **Lead with the number, not the concept.** "A €40,000 car loses €7,000 in year one" hits harder than "depreciation is the largest ownership cost."

2. **Use the comparison frame.** "The difference between 17\" and 20\" wheels is €165/year — €825 over 5 years" is more motivating than just listing the annual cost.

3. **Name the bias directly.** "Most buyers forget this cost entirely" validates the user's potential ignorance without shaming them.

4. **The PHEV repair warning is important.** Every PHEV buyer thinks they're saving money on fuel. Very few price in the post-warranty drivetrain complexity premium. This is where HonestCost can genuinely surprise people.

5. **EV depreciation Y1 needs explicit mention** somewhere in the UI — the EV depreciation profile (front-loaded year 1) is the single most counter-intuitive finding in the whole model.

---

## Key Behavioral Insight for the Product Pitch

When pitching to dealerships:

> "Your customers are making €40,000 decisions based on a monthly payment and fuel economy. They have no idea what the KASKO will be in year 2, what the residual looks like in year 4, or what post-warranty repairs will cost on their PHEV. HonestCost puts all of that in a single number — before they sign."

This framing positions HonestCost as reducing buyer's remorse, which is in the dealer's long-term interest (referrals, repeat business, trust).

---

*Sources: AAA Your Driving Costs 2025; EY Future of Mobility Survey 2023; Edmunds TCO methodology; Behavioral Economics and Auto Insurance (SciELO Brazil, 2023); carclaimhelp.com behavioral finance research. HonestCost test scenarios (2026-05-15).*
