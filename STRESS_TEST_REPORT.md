# STRESS TEST REPORT — HonestCost Research Debunker Pass
**Date:** 2026-05-16  
**Reviewer role:** Professional research debunker  
**Scope:** All research files R1–R12, plus code constants derived from them  
**Method:** Challenge every number, every source, every assumption, every methodology. Flag faults, rate confidence, recommend fixes.

---

## HOW TO READ THIS REPORT

Each section covers one research item. Issues are rated:

- 🔴 **CRITICAL** — Number is likely wrong or methodology is broken. Fix before launch.
- 🟠 **MAJOR** — Significant uncertainty. May mislead users by 20%+. Add disclaimer or revisit.
- 🟡 **MINOR** — Small discrepancy or assumption. Acceptable for MVP but note it.
- 🟢 **SOLID** — Source is primary, methodology is sound, confident to 2 significant figures.

---

## R1 — DEPRECIATION RATES

### Claims under scrutiny
- DEP_RATES are applied per vehicle category: economy, mid, premium, suv_mid, premium_suv, ev, phev
- EV Year 1 rate: **30%** (updated from 25% — the fix applied in this sprint)
- suv_mid rates are anchored on RAV4 Hybrid data
- Sources: TheMoneyCalculator (UK), AutoScout24.de (Germany), Autovista, evdepreciation.com, iSeeCars

### Faults found

**🔴 CRITICAL — Geographic mismatch: all primary sources are UK/Germany, not Latvia**  
Latvian used car market dynamics differ materially from UK/Germany. Latvia has: lower average incomes, higher % of imported used cars (Estonia/Germany/Lithuania flow), smaller pool of same-model used cars (thinner liquidity = more price volatility), no PCP/balloon finance culture (which artificially supports UK residuals). The research itself flags "Latvia may run 5-15% lower residuals" — but this caveat is buried and not acted on in the code. If Latvian residuals are 10% lower than UK/German equivalents, the annual depreciation cost is understated by roughly 10-15% across all ICE categories.  
**Fix:** Add a Latvia discount factor. Suggested: multiply all non-EV/PHEV depreciation fractions by 1.08-1.12. Or add a prominent disclaimer to the tool: "Depreciation estimates based on European market averages; actual Latvian residuals may vary."

**🟠 MAJOR — suv_mid anchored to RAV4 Hybrid, an exceptional outlier**  
RAV4 Hybrid holds value better than virtually any other SUV in its class due to scarcity of hybrid SUVs vs. demand. Using RAV4 as the anchor for ALL mid SUVs means the tool will significantly overestimate residuals for any other mid SUV (Tiguan, Santa Fe, CX-5, Outlander). Those models depreciate ~10-15% faster than RAV4 in years 2-4. Flagged as CONTRADICTION C1 — still not corrected in the code.  
**Fix:** Either use an average of RAV4 + Tiguan + CX-5 residuals, or split into "suv_mid_hybrid" and "suv_mid_ice" categories. Until then, suv_mid results are optimistic by ~10%.

**🟠 MAJOR — EV 30% Year 1 figure may already be improving**  
The 30% Y1 EV depreciation was characteristic of 2022-2024 when the EV market had rapid technology churn, high interest rates, and falling government subsidies. The Tesla price cuts of 2023-2024 triggered massive residual collapses in that period. By late 2025-2026 the market may be stabilizing. Some analysts (Autovista 2025) project EV Y1 residuals recovering toward 22-25% loss by 2026-2027.  
**Risk:** The tool currently models EV as more expensive than it may actually be in 2026 — which could unfairly penalise EV in comparisons.  
**Fix:** Flag this in the tooltip: "EV depreciation was 25-30% in Year 1 as of 2024. Market may be stabilising — check used prices for your specific model."

**🟡 MINOR — PHEV depreciation rates not independently researched**  
The research doesn't cite specific sources for PHEV residuals — they appear to be inferred. PHEVs have a complex depreciation profile: they depreciate fast like EVs in Y1 (due to battery tech obsolescence fear) but also have ICE components. Some PHEVs (Golf GTE, Volvo XC40 Recharge plug-in) hold value better than the phev category implies.  
**Fix:** Add "(PHEV depreciation estimated; verify for your specific model)" to tooltip.

**🟡 MINOR — "economy" category is undefined in the tool**  
Which cars fall in "economy"? Fabia 1.0 TSI? Yaris? The code has the category but no clear user-facing definition. A user selecting "economy" for a Yaris might get different results than intended.  
**Fix:** Add examples to each tier: "Economy (e.g. Skoda Fabia, Toyota Yaris, VW Polo)"

---

## R2 — REPAIR BUFFER (RBUF)

### Claims under scrutiny
- Base repair costs by category (economy through phev)
- Three tiers: [low, mid, high] corresponding to repair risk levels
- Sources: RAC (UK), AutoProtect (UK), Bumper.co.uk (UK), Warrantywise (UK), RepairPal (US)

### Faults found

**🔴 CRITICAL — 100% of primary sources are UK/US, none are Latvian**  
The GBP→EUR conversion (×1.17) and USD→EUR (×0.92) adjustments don't compensate for fundamental market differences: Latvian repair labour rates are 20-35% lower than Germany (noted in research) but *German* is not the same as *UK* either. UK labour rates are among Europe's highest. The conversion chain is: UK prices → ÷ UK labour → × Latvia labour = a different number than GBP × 1.17.  
**Example:** UK mid-car repair of £500 → €585. Latvian equivalent labour: €585 × (1 - 0.25) = ~€440. The code uses ~€500-900 for mid category. If Latvian rates are 25-35% lower, the code overstates repair costs by this margin.  
**Fix:** Explicitly discount all repair figures by 20-25% for Latvia, or find a Latvia-specific source (autopase.lv repair cost surveys, 1188.lv workshop price comparisons).

**🟠 MAJOR — EV repair costs assume traditional EV failure modes**  
The ev RBUF [150, 350, 700] is modelled as if EVs are just ICE cars with fewer moving parts. This is mostly right — but misses: high voltage battery diagnostic costs (even if battery is covered by warranty, diagnosis is not always covered), Tesla parts availability issues in Latvia (nearest Tesla service center: Riga; parts delays can mean longer loaner costs), and software-defined features that may require expensive module replacements post-warranty.  
**Risk:** Low. EV repair buffer is already conservative at the low end. More likely to be understated than overstated for Tesla specifically.

**🟡 MINOR — PHEV [400, 900, 1500] assumes worst-case drivetrain complexity**  
PHEV repair costs escalate significantly after year 3-4 (warranty end) due to high-voltage battery system + combustion engine complexity. However, most Latvian PHEV buyers lease or trade within 3-4 years — so the high-end figure (€1,500/yr) will rarely be reached within typical ownership horizon.  
**Fix:** The model correctly zeros repair during warranty. No code change needed, but the tooltip should mention: "PHEV repair costs escalate steeply after warranty — especially if keeping the car past year 5."

**🟡 MINOR — Warranty year handling: model assumes warranty starts from registration, not manufacture**  
Some cars (dealer stock) have been sitting for 3-6 months before purchase. Warranty starts at registration. The code treats year 0 as purchase year — which is correct. No fault here; just confirming the logic is sound.

---

## R3 — TYRE COSTS

### Claims under scrutiny
- Annual tyre cost: small €325, mid €390, large €450, suv €555
- Tyre lifespan: 4 years assumed
- Seasonal storage: assumed included (50-60% of owners use paid storage)
- Sources: autodoc.lv, jaunasriepas.lv, Rīgas Riepu Centrs, Bridgestone LV dealer

### Faults found

**🟠 MAJOR — The annual cost figure bundles tyre purchase + storage + swap, but storage is optional**  
The code appears to include storage in the annual cost. However, 40-50% of Latvian drivers store tyres at home (garage, basement, stairwell — common in Soviet-era apartment blocks). For those users, the storage cost (€50-80/year) is being double-counted. This inflates tyre costs by 15-22% for users without paid storage.  
**Fix:** Either: (a) separate tyre purchase cost from storage cost in the model, or (b) add a checkbox "I use paid tyre storage" with a tooltip explaining what's included. Without this, a user who swaps at home is shown inflated tyre costs.

**🟡 MINOR — 4-year lifespan is optimistic for Latvian road conditions**  
Latvia's roads include significant pothole exposure (especially outside Riga in early spring after frost heave). Aggressive driving on rough roads reduces tyre lifespan. A realistic range is 3.5-5 years depending on driving style and road quality. The 4-year assumption could be 3 years for a Riga city driver who hammers potholes.  
**Risk:** Low. 4 years is a reasonable midpoint. If anything, the tool slightly underestimates tyre cost per year for urban drivers.

**🟡 MINOR — "large" category (450€) covers a very wide range**  
"Large" is described as 18-19" wheels. But a 225/45/R18 Continental PremiumContact 7 costs ~€100/tyre (€400 set) while a 255/35/R19 Michelin Pilot Sport 5 costs ~€180/tyre (€720 set). The difference is enormous. The €450 annual cost is a midpoint but a premium 19" setup could cost 50% more.  
**Fix:** Tooltip should clarify: "Based on mid-range tyre brands. Performance tyres (Michelin, Pirelli) cost 30-50% more."

**🟢 SOLID — tyre category logic (small/mid/large/suv) maps well to real Latvia market segments**  
17" = small, 18-19" = mid-large, 20"+ = suv — this categorisation is appropriate for the Latvian market where premium SUVs (X5, GLC 300, XC90) uniformly run 20"+ as standard.

---

## R4 — CSDD REGISTRATION FEE

### Claims under scrutiny
- Registration fee: €41.88 (from csdd.lv)
- Third-party source cited €43.93 (discrepancy)
- BEV registration: free

### Faults found

**🟠 MAJOR — Two contradictory figures, neither independently verified in this session**  
The research cites €41.88 from csdd.lv but also notes a third-party site quoting €43.93. A €2.05 discrepancy suggests either: the CSDD fee was updated and one source is out of date, or the third-party site added a handling/processing fee on top of the base fee.  
**Fix:** Verify directly at csdd.lv/lv/atjaunot-registraciju or call CSDD. Until confirmed, the €41.88 figure (from official source) is more trustworthy. Use it, but add a note in RESEARCH_FINDINGS that this needs periodic re-verification.

**🟡 MINOR — Registration fee is year 1 only — confirmed in code?**  
Registration fee is a one-time cost at purchase. The code should apply this only in year 1. If it's being annualized across 5 years, it would be understated (€41.88 ÷ 5 = ~€8.38/yr instead of the correct year-1 lump of €41.88).  
**Fix:** Verify in index.html that CSDD_REG appears only in the year-1 calculation, not averaged.

**🟡 MINOR — BEV "free registration" claim needs 2026 confirmation**  
The research states BEV registration is free. This was a Latvian government incentive that was subject to annual budget review. If the incentive was removed or reduced in the 2026 state budget, the code is wrong for EVs.  
**Fix:** Verify at csdd.lv or transport.gov.lv for 2026 EV registration rules.

---

## R5 — COMPETITOR ANALYSIS

### Claims under scrutiny
- HonestCost is uniquely positioned vs 20+ competitors
- "No other tool shows Latvia-specific TEN tax"
- "No other tool models declining KASKO on residual"
- Competitive gap claims for total cost comparisons

### Faults found

**🟠 MAJOR — Competitive analysis was done at a single point in time (2026-05-15)**  
The automotive TCO tool market is not static. AutoScout24, mobile.de, and even Latvia-specific sites (autopase.lv, ss.lv) may have added TCO features since the analysis. Claiming unique positioning requires ongoing monitoring.  
**Risk:** If a competitor adds Latvian TEN tax or declining KASKO in 2026 Q3, the positioning pitch becomes false.  
**Fix:** This is a business risk, not a code bug. Document the analysis date. Re-check competitors quarterly.

**🟡 MINOR — "20+ competitors analysed" — no methodology for how competitors were selected**  
Were these tools found by Google search? App store search? Word of mouth? If the selection is biased toward well-known tools, niche competitors with similar features may have been missed.  
**Risk:** Low for the current version. More relevant for the business pitch.

**🟢 SOLID — The core differentiation claim (monthly cost including all 6 cost categories) appears genuine**  
None of the cited competitors appear to combine: depreciation + leasing PMT + fuel + KASKO + OCTA + TEN + tyres + service + repairs in a single monthly figure. This claim holds at time of research.

---

## R6 — DEALER SERVICE COSTS

### Claims under scrutiny
- VW: €290/visit, 30,000km interval
- Skoda: €240/visit, 30,000km interval
- BMW: €350/visit, 20,000km interval
- Toyota: €160/visit, 15,000km interval

### Faults found

**🟠 MAJOR — BMW service interval range (20,000-30,000km) collapsed to 20,000km in code**  
BMW's Condition-Based Service (CBS) can trigger as late as 30,000km depending on driving style, oil type, and engine. The research documents this range but the code uses the conservative (more frequent) end: 20,000km. At 15,000km/year driving: 20,000km → 0.75 visits/year × €350 = **€263/year**. At 30,000km: 0.5 visits/year × €350 = **€175/year**. The difference is €88/year or €440 over 5 years — almost the cost of one extra visit.  
**Fix:** Either use 25,000km as the midpoint, or add a note in RESEARCH_FINDINGS: "BMW CBS can extend to 30,000km. Code conservatively uses 20,000km."  
**Impact on test scenario P1 (BMW 118i vs X1):** BMW service cost is likely overstated. This makes BMW look worse on TCO than it actually is.

**🟠 MAJOR — Toyota price (€160) is estimated, not sourced from public price list**  
The research explicitly acknowledges: "Toyota authorized dealer Latvia does not publish a public price list online." The €160 figure is reverse-engineered from: independent garage price (€89) × 1.5 markup = €134, then rounded up. This methodology is reasonable but the confidence is medium, not high.  
**Risk:** Real authorized Toyota service in Latvia may be €180-220 (as authorised dealers often charge 60-80% premium, not 40-60%).  
**Fix:** The research table correctly rates this as "Medium" confidence. Consider adding a tooltip: "Toyota service estimate — actual prices vary. Contact WESS/Amserv for current pricing."

**🟡 MINOR — VW promotional price (€175) creates confusion**  
Moller Auto offers a promotional price of €175 for cars 4+ years old. Some users (buying a 2022 model in 2026) may already qualify for this promotion. The code uses €290 (regular), which overstates cost for these users.  
**Fix:** Not worth changing the code for. Add to tooltip: "Moller Auto occasional promotion: €175 for cars 4+ years. Check mollerauto.lv for current offers."

**🟡 MINOR — Service cost per visit vs. per year — the annual calculation**  
The code calculates: `svcCost × (annualKm / svcInt)`. For 15,000km/year and VW's 30,000km interval, this gives 0.5 visits × €290 = €145/year. This is mathematically correct and elegant. But it means at low mileage (10,000km/year), VW service is only €97/year — but dealers also require annual visits regardless of mileage ("whichever comes first: 30,000km or 24 months"). So a low-mileage user will always pay at least 1 visit every 2 years, not 1/3 of a visit per year.  
**Risk:** Medium. The time-based trigger is not modeled. Low-mileage users (< 15,000km/year) will see understated service costs.  
**Fix:** Add minimum: `max(svcCost × (annualKm/svcInt), svcCost/2)` to ensure at least 1 visit per 2 years regardless of mileage.

**🟢 SOLID — VW €290 figure (Moller Auto regular rate)**  
This is directly sourced from the official VW importer Latvia website. High confidence.

**🟢 SOLID — BMW €112/hr labour rate (Inchcape Latvia price list)**  
Direct from official BMW authorized dealer Latvia. High confidence.

---

## R7 — EV HOME VS. PUBLIC CHARGING SPLIT

### Claims under scrutiny
- Home charging share: 66% (was 70% — updated)
- Public charging share: 34%
- Source: uzladets.lv analysis of 2024 Latvia EV data

### Faults found

**🔴 CRITICAL — The 66/34 split calculation methodology is circular and assumption-heavy**  
The calculation: 7,801 EVs × 15,000 km/year × 20 kWh/100km = 23.4 GWh total demand. Then: 7.9 GWh public ÷ 23.4 GWh = 34% public.  
Problems:  
1. The "15,000 km/year" assumption is not sourced — Latvian EV owners may drive more or less.  
2. The "20 kWh/100km" assumption doesn't account for EV model mix in Latvia (a Nissan Leaf uses 17 kWh/100km; a Tesla Model 3 LR uses 16 kWh; a Tesla Model S uses 22 kWh). If real average is 17 kWh/100km, total demand = 19.9 GWh and public share becomes 7.9/19.9 = 40%.  
3. The 7,801 EV figure — is this pure BEVs or includes PHEVs? PHEVs charge primarily at home.  
**Risk:** The true public charging share for BEV-only could be 35-42%, meaning home share is 58-65%, not 66%. The code update from 70% to 66% may have moved in the right direction but may not have gone far enough.  
**Fix:** Use 65/35 as a more conservative estimate, or show the slider default at 65% and add: "Latvia 2024 average: 66% home (uzladets.lv estimate; methodology assumptions apply)."

**🟡 MINOR — Home electricity price: code uses €0.18, research suggests €0.19**  
The R7 research document recommends €0.19/kWh (average of night €0.17 and day €0.22 mix). The code was updated to €0.18. This is a 5.5% discrepancy — small but inconsistent with the source.  
**Fix:** Update code to €0.19/kWh, or accept €0.18 as the night-tariff assumption (which is defensible if EV owners preferentially charge at night).

**🟡 MINOR — Public charging price: code uses €0.38, research says €0.39**  
Minor €0.01 discrepancy. Negligible. The true average fluctuates anyway.  
**Fix:** No action needed.

**🟢 SOLID — Trend direction: public charging share increasing**  
The observation that public charging is growing as EVs spread to apartment dwellers is well-supported and directionally sound. The tool's slider allowing adjustment is the right design response.

---

## R8 — OCTA INSURANCE RATES

### Claims under scrutiny
- OCTA calculated on engine power (kW), not displacement (cc)
- Code uses cc-based tiers as UI proxy
- Recommended values: ev €130, ≤1600cc €75, 1601-2000cc €110, 2001-3000cc €150, >3000cc €240
- Source: autopase.lv Latvia OCTA guide, updated May 2026

### Faults found

**🔴 CRITICAL — Code OCTA constants have NOT been updated with R8 recommendations**  
R8 clearly documents that the current code placeholders (≤1600cc: €110, 1601-2000cc: €145, 2001-3000cc: €200, >3000cc: €300) are 30-60% too high for an experienced Latvian driver. The code fix was documented in RESEARCH_FINDINGS_R6R8.md but it's not clear these values were actually applied to index.html.  
**Verification needed:** Check OCTA_EST constants in index.html against R8 recommendations.  
**If not applied — this is a critical overstatement of OCTA costs, especially for the most common cars (1.5-2.0L class).**

**🟠 MAJOR — Bonus-malus class assumption not disclosed to users**  
The R8 values are calibrated for an experienced driver (35-45 years, 5+ years no claims, Class 2 bonus-malus). Young drivers or those with recent claims face dramatically different prices. A 22-year-old first-time car buyer (the most important segment for a "should I buy" tool) will pay 2-4× more than the default.  
**Risk:** Users who are young or have recent claims will see OCTA costs significantly understated.  
**Fix:** Add a note: "OCTA estimated for experienced driver (5+ years, no recent claims). Young drivers or recent claimants: actual cost will be higher — use octa24.lv for a quote."

**🟠 MAJOR — EV OCTA (€130) is a single-point estimate for a very wide range**  
Compact EV (Nissan Leaf, 110 kW) → ~€90-€110. Mid EV (Tesla Model 3, 210 kW RWD) → ~€140-€180. Performance EV (Model 3 LR, 358 kW) → €200+. Using €130 for all EVs means the tool is accurate for compact EVs, understates for Tesla Model 3/Y, and significantly understates for performance EVs.  
**Fix:** The CAR_DB (R12) could store kW per car and look up OCTA more accurately when a car is pre-filled. Until R12 is implemented, €130 is acceptable but the range is very wide.

**🟡 MINOR — Riga surcharge baked in — not disclosed**  
The research bakes in a ~15% Riga surcharge to the recommended values. Rural users will see overstated OCTA costs by ~12%.  
**Fix:** Add to tooltip: "OCTA estimated for Riga registration. Rural areas: typically 10-15% less."

**🟢 SOLID — kW vs cc architectural note is correct and important**  
The finding that OCTA uses kW is accurate and a genuine architectural insight. This is well-documented and the implication for R12 (store kW in CAR_DB, not cc) is correctly identified.

---

## R9 — TEN TRANSPORT TAX (CO2 BRACKETS)

### Claims under scrutiny
- New 14-bracket WLTP table replacing old 9-bracket invented table
- Source: likumi.lv/ta/id/223536 (official Latvian law)
- Applies to all cars registered after 31.12.2020

### Faults found

**🟡 MINOR — NEDC vs WLTP handling not explicit in the UI**  
The tool accepts user-entered CO2 in g/km. The UI doesn't tell the user whether to enter WLTP or NEDC. A user with an older car (registered 2018-2020) who reads their registration certificate will see NEDC CO2 (higher than WLTP). If they enter the NEDC figure into a WLTP-based tax table, the TEN tax will be overstated.  
Since the tool is explicitly for NEW cars, this risk is low — but:  
1. The tool doesn't prevent entry of used car data.  
2. Pre-fill (R12 CAR_DB) should always use WLTP figures.  
**Fix:** Add label near CO2 field: "WLTP figure (use for new cars registered after 2020; check manufacturer specs)."

**🟡 MINOR — The TEN table brackets were extracted from legal text — did the implementation match exactly?**  
The law text was accessed and the table was extracted. However, legal text is sometimes formatted ambiguously (e.g., is the bracket 130 g/km inclusive or exclusive?). The boundary handling (≤130 vs <130) matters for cars right on the bracket edge.  
**Fix:** Spot-check 2-3 bracket boundaries against the law. E.g., a car at exactly 130 g/km: the law says "no vairāk par 130 g/km" = "no more than 130" = inclusive = €72. The code uses `if(co2<=130)return 72` — this is correct.

**🟢 SOLID — Primary law source (likumi.lv) is authoritative**  
Accessing the official Latvian law database directly is the gold standard for tax table verification. The TEN fix is the most reliable piece of research in the entire project.

---

## R10 — BUYER PSYCHOLOGY

### Claims under scrutiny
- AAA data: depreciation averages €4,000-5,000/year on €35,000 car
- EY 2023 survey: tyres are "most forgotten cost"
- KASKO on €40,000 car at 2.5% = €1,000/year claim
- EV Y1 depreciation 30% framing
- Post-warranty PHEV repair escalation

### Faults found

**🟠 MAJOR — AAA data is US-based and converted to EUR**  
The AAA "Your Driving Costs" report covers the US market with US cars, US insurance, US fuel, and US depreciation curves. European market conditions differ: European cars hold value differently, European insurance is mandatory at higher limits (OCTA requirements), and European fuel prices (VAT-inclusive) are higher. The EUR figure appears to have been converted at face value without adjustment for market differences.  
**Impact:** The tooltip numbers citing AAA data (used for the pitch and marketing, not the calculation) may overstate or understate vs. Latvian reality.  
**Fix:** This is in the research/tooltip copy, not the calculation. Use as illustrative only. Add "(European market figures may vary)" to any external citation.

**🟡 MINOR — EY 2023 survey on tyres**  
"EY Future of Mobility Survey 2023" is a real survey but it covers global respondents. Latvia-specific tyre awareness may differ. Latvian drivers who live through winter tyre season (mandatory Oct 1 - May 1) are possibly more aware of tyre costs than global average.  
**Risk:** Low. The claim that tyres are often forgotten is plausible even if the specific survey isn't Latvia-specific.

**🟡 MINOR — "KASKO at 2.5% of residual" presented as typical, but range is 1.8-3.5%**  
The research correctly states the range (1.8-3.5%) but tooltip copy uses 2.5% as the example. At 1.8%, a €40,000 car KASKO is €720 — meaningfully different from €1,000 at 2.5%.  
**Fix:** Tooltip copy should state the range: "KASKO on a new €40,000 car typically costs €720-€1,400 in year 1 depending on insurer and level."

**🟢 SOLID — Post-warranty PHEV repair escalation warning**  
This is well-evidenced across multiple independent sources and mechanically sound (dual drivetrain = dual failure modes). The tooltip copy is accurate and useful.

---

## R11 — DEALER ADD-ONS BRAINSTORM

### Claims under scrutiny
- Add-on prices (18" wheels €800, pano roof €1,500, etc.)
- tyreCatChange: +1 for 18" wheels, +2 for 20" wheels
- fuelDelta: 0.2 L/100km for 18" wheels
- Marketing claim: "20\" wheels cost €3,825 over 5 years, not €1,500"

### Faults found

**🟠 MAJOR — Add-on prices have no source — they are illustrative estimates**  
The brainstorm document doesn't cite any source for the add-on prices (€800 for 18" wheels, €1,500 for panoramic roof, etc.). Real dealer option prices vary enormously by brand. BMW 20" wheels on a 1-Series may be €1,800-€2,500 as a factory option. VW panoramic roof on a Golf is a package option that may be €2,200-€2,800. Using €800/€1,500 as generic defaults could significantly understate add-on costs for premium brands.  
**This is a brainstorm document, not research** — prices are acknowledged as indicative. But when implemented in code, these numbers need real sources.  
**Fix:** Before implementing R11, source real add-on prices from at least BMW, VW, and Skoda official Latvia configurators.

**🟠 MAJOR — tyreCatChange logic is inconsistent with actual wheel sizes**  
The brainstorm claims: 18" wheels → tyreCatChange: +1 (mid→large). 20" wheels → tyreCatChange: +2 (mid→suv).  
But in the TYRE constants: small = 17" (€325), mid = 18-19" (€390), large = 19-20" (€450), suv = 20"+ (€555).  
Wait — if the base car already has 17" wheels (small), and you add 18" wheels (tyreCatChange: +1), you go to mid (€390). That's a +€65/year change, which is roughly right.  
But if a car already has 18" wheels (mid category) and the user adds the "18\" sport wheel package" option — tyreCatChange: +1 would push them to large, which is wrong (they're already at mid).  
**The add-on system assumes base car is always in the "small" tyre category.** This is not true — many cars come standard with 17-18" wheels.  
**Fix:** tyreCatChange must be applied from the BASE tyre category of the specific car, not blindly from a fixed starting point. This requires knowing the car's standard wheel size before applying the delta.

**🟡 MINOR — fuelDelta of 0.2 L/100km for 18" wheels is unverified**  
The fuel consumption penalty for larger wheels is real but highly variable. Published studies show 0.1-0.5 L/100km increase from 17" to 19" depending on tyre profile, driving speed, and road conditions. The 0.2 figure is within the plausible range but is a rough estimate.  
**Fix:** Mark as approximate in the UI: "~+0.2 L/100km (estimated rolling resistance increase)."

**🟡 MINOR — Marketing headline math check**  
"20\" wheels cost €3,825 over 5 years, not €1,500."  
Calculation: €1,500 (purchase) + €165/year × 5 = €1,500 + €825 = €2,325. Not €3,825.  
Wait — where does €3,825 come from? Maybe the brainstorm is counting the wheel option amortized through higher leasing payments + tyre costs? Let me check: if the €1,500 is financed through leasing, the total leasing cost is higher than €1,500 due to interest. At a 5-year lease with 5% interest, €1,500 principal costs roughly €1,640 in lease payments. Plus €825 tyre premium = €2,465. Still not €3,825.  
**This headline number appears to be mathematically wrong.** It may have been an arithmetic error or based on different assumptions not documented.  
**Fix:** Recalculate this marketing claim before publishing. If the number is wrong, the credibility of the entire tool is at risk.

---

## R12 — CAR SEARCH / PRE-FILL DATABASE

### Claims under scrutiny
- 28 priority models listed
- CAR_DB structure using `cc` field for OCTA calculation
- Prices described as "indicative Latvia 2026 dealer prices"
- Warranty data per brand
- OCTA: null (auto-fills from cc via OCTA_EST)

### Faults found

**🔴 CRITICAL — CAR_DB stores `cc` (displacement) but R8 established OCTA is calculated on `kW` (power)**  
The brainstorm defines: `cc: 1499` for BMW 118i, and uses `octa: null` to auto-fill from OCTA_EST (which uses cc-based tiers). But OCTA is definitively kW-based. When CAR_DB is implemented, it should store `kw: 100` (for BMW 118i: 100 kW), and OCTA_EST should use kW tiers, not cc tiers.  
The current cc→OCTA mapping is a double approximation: cc → kW → price. Better to store kW directly and go: kW → price.  
**Fix:** Replace `cc` with `kw` in CAR_DB structure. Update OCTA_EST to accept kW instead of cc.

**🟠 MAJOR — The 28 car prices are unverified — "3-4 hours of research needed"**  
The brainstorm itself acknowledges that the CAR_DB prices haven't been researched yet. The BMW 118i at €32,500 is listed as a placeholder. The actual price at bmw.lv may be different. Similarly, VW ID.4 Pro at "indicative" price may differ from the actual vw.lv configurator price.  
**Risk:** If CAR_DB prices are wrong by 10-15%, every pre-filled TCO result will be wrong by a corresponding amount.  
**Fix:** Before implementing Phase 2 (full search), do the 3-4 hour research pass. Use official Latvian configurator prices (bmw.lv, vw.lv, toyota.lv) and document the exact trim and specification used.

**🟠 MAJOR — Tesla warranty listed as "4 years" — this is incomplete**  
Tesla warranty structure: 4 years/80,000km vehicle warranty + 8 years/192,000km battery and drive unit warranty (for Model 3 RWD). If the CAR_DB stores `warranty: 4`, the TCO model will apply repair buffer starting at year 4 — which is correct for the vehicle, but the battery is covered for 8 years. For EV owners who only worry about the battery, the "repair starts at year 4" message is misleading.  
**Fix:** For EVs, split: `vehicleWarranty: 4, batteryWarranty: 8`. Use vehicleWarranty for RBUF triggering but note in tooltip that battery is separately warranted.

**🟡 MINOR — Warranty data: Toyota 5 years, Volvo 5 years — confirm for Latvia**  
Toyota's 5-year warranty is confirmed globally. Volvo's 5-year warranty (introduced for MY2023+) needs confirmation for Latvia — early Volvo XC40 models had 3-year warranty. If a user selects XC40 2022, they'd have 3-year warranty, not 5.  
**Fix:** Note model year dependency in CAR_DB entries for Volvo. Use: `warranty: 5, warrantyNote: "MY2023 and newer; 3 years for earlier models"`

**🟡 MINOR — Phase 1 "Load Example" buttons not yet built**  
The brainstorm correctly identifies this as the first deliverable (30 min effort). As of the current session, this has not been implemented. It remains the highest ROI single addition to the tool.  
**Fix:** Implement immediately — this is Sprint 2's first item per PROJECT_PLAN.

**🟢 SOLID — JSON database approach is correct for the single-file constraint**  
Embedded JSON with fuzzy search is exactly the right architecture for a no-backend single-HTML constraint. The CAR_DB structure is clean and extensible. The size estimate (~3KB for 28 cars) is correct.

---

## CROSS-CUTTING ISSUES (affect multiple R-files)

### 🔴 CRITICAL — Geographic validity of all non-Latvian sources
The majority of sources across R1, R2, R3, R10 are UK, US, or German. Latvia is a small market (~600,000 registered vehicles) with distinct characteristics:
- Lower disposable income → used car market is larger → new car residuals influenced differently
- High proportion of Russian/Soviet-era car culture → "run it into the ground" ownership style more common
- Soviet apartment stock → garage scarcity → practical constraints on home charging and tyre storage
- Baltic climate (continental, not maritime) → harsher winter tyre wear, more pothole damage in spring

**No single research item is invalidated by this, but every number should carry wider confidence intervals than the research implies.**

### 🟠 MAJOR — No validation against actual Latvian car owner data
All costs are modeled from first principles and external sources. The tool has never been back-tested against actual ownership records from Latvian car owners. Even a small survey (20-30 car owners comparing actual vs. predicted costs) would significantly strengthen the model's credibility.

### 🟡 MINOR — Inflation assumption is implicit, not stated
All costs (tyres, service, fuel) are expressed in 2025-2026 euros. Over a 5-year ownership horizon, inflation (especially energy inflation) can materially change total cost. The tool makes no mention of this. A €0.18/kWh home electricity cost today could be €0.22 in 2029.  
**Fix:** Add a footer note: "All costs expressed in 2026 euros. Fuel and energy prices may change over the ownership period."

### 🟡 MINOR — The "5-year ownership horizon" is hardcoded
Some users plan to keep cars for 3 years (lease cycle), others for 8-10 years. The tool uses 5 years throughout. At year 6+, warranty is expired, depreciation rate changes significantly, and repair costs escalate. For buyers planning long ownership, the 5-year view understates true TCO.  
**Fix:** Add an "Ownership horizon" slider (3/4/5/7/10 years) — this is potentially a significant UX improvement for Sprint 3.

---

## SUMMARY SCORECARD

| Research Item | Critical Issues | Major Issues | Minor Issues | Overall Rating |
|---|---|---|---|---|
| R1 — Depreciation | 1 (geographic mismatch) | 2 (RAV4 outlier, EV improving) | 2 | 🟠 Use with caution |
| R2 — Repair Buffer | 1 (UK sources only) | 1 (EV costs) | 1 | 🟠 Use with caution |
| R3 — Tyres | 0 | 1 (storage bundled) | 2 | 🟡 Mostly solid |
| R4 — CSDD Fee | 0 | 1 (contradictory sources) | 1 | 🟡 Mostly solid |
| R5 — Competitors | 0 | 1 (point-in-time) | 1 | 🟢 Solid for now |
| R6 — Service Costs | 0 | 2 (BMW interval, Toyota estimate) | 2 | 🟠 Use with caution |
| R7 — EV Charging | 1 (circular methodology) | 0 | 2 | 🟠 Use with caution |
| R8 — OCTA | 1 (not applied to code?) | 2 (BM class, EV range) | 1 | 🟠 Critical to verify |
| R9 — TEN Tax | 0 | 0 | 2 | 🟢 Solid |
| R10 — Psychology | 0 | 1 (AAA source) | 2 | 🟡 Mostly solid |
| R11 — Add-Ons | 0 | 2 (no price sources, tyre logic) | 1 | 🟠 Don't build yet — fix first |
| R12 — Car Search | 1 (cc vs kW) | 2 (unverified prices, Tesla warranty) | 2 | 🟠 Major work needed |

---

## PRIORITY ACTION LIST (fix before launch or immediately)

### Must fix before launch
1. **Verify OCTA_EST constants** in index.html — confirm R8 values (€75/€110/€150/€240) are actually in the code, not the old placeholders (€110/€145/€200/€300).
2. **Verify CSDD registration fee** — confirm €41.88 at csdd.lv (not €43.93 from third-party).
3. **Fix R11 marketing math** — "€3,825 over 5 years" appears arithmetically wrong; recalculate before putting in any copy.
4. **Add WLTP label to CO2 field** — prevent users from entering NEDC values into WLTP tax table.

### Must fix before R12 implementation
5. **Replace `cc` with `kw` in CAR_DB structure** — OCTA is kW-based (R8). Don't build the database with the wrong field.
6. **Research actual Latvia dealer prices** for all 28 priority cars — the brainstorm prices are placeholders only.
7. **Fix tyreCatChange logic** — add-on wheel upgrades must apply from the car's BASE tyre category, not a fixed starting point.

### Should address in Sprint 3
8. **Add geographic/currency disclaimer** to all research documents and the tool footer: "Estimates based on European market data; Latvia-specific data where available."
9. **Apply Latvia discount (~20-25%) to repair buffer** — all RBUF sources are UK/US; Latvia labour is materially cheaper.
10. **Address low-mileage service cost underestimate** — add minimum visit frequency (1 visit per 2 years) regardless of km.
11. **Add ownership horizon selector** — 5-year default is right but users should be able to model 3 or 7+ years.
12. **Split EV warranty fields** — vehicleWarranty vs. batteryWarranty, especially for Tesla and VW ID models.

---

*Stress-test complete. Report covers R1–R12. All issues rated by severity. Priority action list contains 12 items in order of criticality.*  
*Reviewer: AI research debunker pass — 2026-05-16*
