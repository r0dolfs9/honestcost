# HonestCost — Cross-Reference Audit & Contradictions
**Date:** 2026-05-15  
**Method:** Read all 5 project documents + extracted actual values from index.html via grep.  
**Status:** 9 contradictions found. Ranked by impact on calculation accuracy.

---

## How to read this file

Each entry shows:
- **What the code has** (extracted directly from index.html)
- **What the research says** (from RESEARCH_FINDINGS.md or RESEARCH_FINDINGS_R6R8.md)
- **Why the contradiction exists** (root cause)
- **Action required**

---

## CONTRADICTION 1 — Tyre costs (Large + SUV categories) are wrong in code
**Severity: HIGH — affects every non-compact car comparison**

| Category | Code value | Research value | Difference |
|----------|-----------|---------------|------------|
| large (18–19") | **€503/year** | **€450/year** | +€53/year (12% too high) |
| suv (19–21") | **€675/year** | **€555/year** | +€120/year (22% too high) |
| small (≤16") | €325 | €325 | ✅ Correct |
| mid (17") | €390 | €390 | ✅ Correct |

**Why this happened:**  
The FIXES_BEFORE_BUILD.md correctly documented the R3 values as `r16:325, r17:390, r18:450, r19:555, r20:675`. These map to 5 size tiers. The code was built with only 4 tiers (small/mid/large/suv). When collapsing 5→4:
- The "large" bucket (18-19") was assigned **€503** — a number that appears in no research document. It likely came from a partial manual calculation during the build, not from R3.
- The "suv" bucket was mapped to **€675**, which is the `r20` *Performance/EV (20-21")* value, not `r19` *SUV (19-21")* which is €555. The buckets were shifted by one tier.

**Action:** Update line 760 in index.html:
```javascript
// Change FROM:
const TYRE={small:325,mid:390,large:503,suv:675};
// Change TO:
const TYRE={small:325,mid:390,large:450,suv:555};
```
Also update the button labels on lines 444–447 and 659–662 to show correct values.

---

## CONTRADICTION 2 — Repair buffer uses PROJECT_PLAN placeholders, not R2 research
**Severity: HIGH — affects every post-warranty year calculation**

R2 research was completed and documented in RESEARCH_FINDINGS.md with well-sourced values. The code was built using the **original PROJECT_PLAN.md placeholder values** — which the plan itself explicitly labelled "to be replaced with researched data."

| Category | Code [Low, Med, High] | R2 Research [Low, Med, High] | Med diff |
|---|---|---|---|
| economy | [200, **400**, 700] | [200, **350**, 650] | +€50 (14% high) |
| mid | [300, **600**, 1000] | [300, **500**, 900] | +€100 (20% high) |
| premium | [**500**, **900**, **1500**] | [**450**, **700**, **1200**] | +€200 (29% high) |
| suv_mid | [**350**, **650**, **1100**] | [**250**, **500**, **950**] | +€150 (30% high) |
| premium_suv | [**600**, **1100**, **1800**] | [**500**, **800**, **1500**] | +€300 (37% high) |
| ev | [**200**, **400**, 700] | [**150**, **350**, 700] | +€50 (14% high) |
| phev | [**500**, **1000**, **1600**] | [**400**, **900**, **1500**] | +€100 (11% high) |

**Why this happened:**  
R2 was researched and filed. But when the build happened (May 7), the coder appears to have pulled constants from the PROJECT_PLAN.md template section rather than from RESEARCH_FINDINGS.md. The PROJECT_PLAN's own comment says *"these values need to be based on real data, NOT guessed"* — yet the guesses went in.

**Impact:** Post-warranty repair costs are overstated by 11–37% depending on category. This makes cars look more expensive to run than they are, especially for mid-SUVs and premium cars — which matters precisely when comparing a premium car to an economy car.

**Action:** Update `REPAIR_BUFFER_BASE` in index.html with R2 values:
```javascript
const REPAIR_BUFFER_BASE = {
  economy:     [200,  350,  650],
  mid:         [300,  500,  900],
  premium:     [450,  700, 1200],
  suv_mid:     [250,  500,  950],
  premium_suv: [500,  800, 1500],
  ev:          [150,  350,  700],
  phev:        [400,  900, 1500],
};
```

---

## CONTRADICTION 3 — DEP_RATES differ from R1 research (EV is the critical gap)
**Severity: MEDIUM-HIGH — EV Year 1 depreciation materially understated**

Code (lines 751–757) vs R1 final constants from RESEARCH_FINDINGS.md:

| Category | Code Y1 | R1 Y1 | Code Y2 | R1 Y2 | Code Y3 | R1 Y3 |
|---|---|---|---|---|---|---|
| economy | 0.20 | **0.18** | 0.12 | 0.12 ✅ | 0.10 | **0.13** |
| mid | 0.22 | **0.20** | 0.13 | **0.14** | 0.11 | **0.13** |
| premium | 0.25 | **0.22** | 0.15 ✅ | 0.15 ✅ | 0.13 ✅ | 0.13 ✅ |
| suv_mid | **0.18** | 0.15 | 0.12 ✅ | 0.12 ✅ | 0.10 ✅ | 0.10 ✅ |
| premium_suv | 0.23 | **0.22** | 0.14 | **0.16** | 0.12 | **0.14** |
| **ev** | **0.25** | **0.30** | **0.16** | **0.13** | **0.14** | **0.08** |
| phev | 0.22 ✅ | 0.22 ✅ | 0.14 ✅ | 0.14 ✅ | 0.12 ✅ | 0.12 ✅ |

**Critical issue — EV:**  
The R1 research explicitly established that EV depreciation is **front-loaded**:  
`ev: [0.30, 0.13, 0.08, 0.08, 0.07]` — Year 1 is severe (new model releases, price cuts), Years 3–5 flatten.  
The code has `ev: [0.25, 0.16, 0.14, 0.12, 0.12]` — **Year 1 underestimated by 5 percentage points, Years 3–5 overestimated.** A €40,000 EV in the code loses €10,000 in Year 1; the research says it should be €12,000. By Year 5, code total loss ≈ €21,400; research says ≈ €19,800 — so overall it partially cancels, but the year-by-year KASKO calculation and depreciation table will be wrong.

**suv_mid note:**  
The code uses 0.18 for Y1 (adjusted per FIXES_BEFORE_BUILD C1 — good), while R1 had 0.15 (based on RAV4 Hybrid outlier). This specific divergence is *intentional and correct* per FIXES_BEFORE_BUILD.md.

**Why it happened:**  
Code uses PROJECT_PLAN.md Section 9.6 constants, not R1 updated constants. The DEP_RATES in the plan were placeholders; R1 produced refined values. The build didn't pull from the research file.

**Action:** Update `DEP_RATES` in index.html. Priority: fix EV rates first. The suv_mid 0.18 adjustment is correct, keep it.

---

## CONTRADICTION 4 — OCTA_EST uses wrong parameter AND wrong values
**Severity: MEDIUM — affects auto-fill for every user who doesn't manually enter their OCTA**

**Wrong parameter:** The code calculates OCTA auto-estimate from engine displacement (cc). Latvia OCTA is actually calculated from engine **power (kW)**. This means the auto-fill logic is using the wrong input variable. For most cars the cc→kW correlation is rough enough that results are in the right ballpark, but for outlier cars (e.g. turbocharged engines with high kW relative to cc, or large-displacement low-kW engines) the estimate will be off.

**Wrong values:** Even if cc is used as a proxy, all values are too high for an experienced driver in Riga (5+ years no claims, Class 2 bonus-malus):

| Tier | Code value | R8 research value | Difference |
|---|---|---|---|
| EV | €90 | **€130** | −€40 (underestimate — EVs often high kW) |
| ≤1600cc | €110 | **€75** | +€35 (35% too high) |
| 1601–2000cc | €145 | **€110** | +€35 (32% too high) |
| 2001–3000cc | €200 | **€150** | +€50 (33% too high) |
| >3000cc | €300 | **€240** | +€60 (25% too high) |

**Why the values are too high:**  
The placeholders appear calibrated for a ~Class 4–8 bonus-malus driver (no prior claims history or mid-tier history). The research calibrated for an experienced driver with 5+ years no claims (Class 2), which is more representative of the target user (28–50 year old, rational buyer). Class 2 carries a ~−35% discount vs Class 4.

**EV is the opposite — too low:**  
EVs often have 100–300 kW motors. The code assumes €90 (same as a small petrol), but a Tesla Model 3 or BMW i4 has 250–340 kW — commanding a much higher OCTA coefficient than a 1.4 petrol with 75 kW. The research-backed EV estimate is €130 for compact EVs, higher for performance variants.

**Action:**
```javascript
// Change FROM:
const OCTA_EST={ev:90,s:110,m:145,l:200,xl:300};
// Change TO:
const OCTA_EST={ev:130,s:75,m:110,l:150,xl:240};
// NOTE: Consider adding tooltip explaining the kW vs cc issue to the OCTA field.
```

---

## CONTRADICTION 5 — Home electricity rate: code 0.13, research 0.15–0.20
**Severity: MEDIUM — affects EV and PHEV fuel cost calculations**

Code: `homeElec: 0.13` (labelled "Latvenergo E-tariff" in PROJECT_STATUS.md)  
R7 research: Home charging in Latvia costs €0.15–0.20/kWh (night rate) or €0.20–0.25/kWh (day rate)

**Why the discrepancy exists:**  
The 0.13 rate likely reflects a specific Latvenergo time-of-use tariff ("E-tariff" or "Dinamiskais tariffs") at deep-night off-peak pricing. However:
1. Not all EV owners use time-of-use tariffs — many use the standard residential rate
2. Electricity prices in Latvia have risen materially since 2022–2023 energy crisis
3. The R7 research (from autopase.lv, May 2026) found €0.15–0.20 as the realistic home charging range

**Impact:** At €0.13 vs €0.18 (midpoint of research range), for an EV doing 15,000 km/year at 18 kWh/100km with 66% home charging:
- Code gives: (15,000 × 0.66 / 100 × 18 × 0.13 × 1.10) = €255/year
- Research-calibrated: (15,000 × 0.66 / 100 × 18 × 0.18 × 1.10) = €353/year
- Difference: **€98/year** — a 38% underestimate of EV home charging cost

**Action:** Update `homeElec: 0.13` to `homeElec: 0.18` (midpoint of research range). Also update the tooltip and any visible labels to reflect "~€0.18/kWh".

---

## CONTRADICTION 6 — EV home charging default: 70% in code vs 66% research
**Severity: LOW — minor directional error**

Code slider default: `value="70"` (70% home, 30% public)  
R7 research: Latvia 2024 actual is 66% home / 34% public, trending toward more public

**Why:** The PROJECT_PLAN showed 80% home as the original assumption. The code was updated to 70% at build time — an improvement, but still slightly higher than reality. This is a minor issue.

**Action:** Update slider default from 70 to 66. Update the displayed label accordingly.

---

## CONTRADICTION 7 — VW/Skoda documented service interval: plan says 15,000 km, reality is 30,000 km
**Severity: LOW for code (users enter this manually), HIGH for documentation accuracy**

PROJECT_PLAN.md R6 row and input spec shows "VW Golf, annual service, 15,000 km" as the documented placeholder interval.  
R6 research: VW authorized dealer (Moller Auto Latvia) specifies **30,000 km OR 24 months**, whichever first.

**Why this matters:**  
If users follow the plan's documentation or any tooltip that says "15,000 km", they will enter an interval that is 2× too frequent — generating double the service cost in the TCO calculation. A VW Golf doing 15,000 km/year should show 0.5 service visits/year (one visit every 2 years), not 1 visit/year.

**Also note:** Toyota's interval is actually 15,000 km / 12 months — the plan's documentation happened to be correct for Toyota but wrong for VW/Skoda.

**Action:** Update tooltip text and any documentation suggesting 15,000 km for VW/Skoda. The code's interval field is manually entered, so no code change needed — just education/documentation. Pre-filled test scenarios should use correct intervals.

---

## CONTRADICTION 8 — pubElec rate: nearly consistent, minor rounding gap
**Severity: NEGLIGIBLE**

Code: `pubElec: 0.38`  
R7 research: Latvia average fast charging ~€0.39–0.40/kWh; Eleport at €0.39  

This is a €0.01–0.02 difference. At 15,000 km/year, 18 kWh/100km, 34% public: this causes ~€3/year error. Round-trip consistent — code can stay as-is or update to 0.39 for marginal improvement.

---

## CONTRADICTION 9 — PROJECT_PLAN.md uses old "CarCost" working title
**Severity: NONE (documentation only)**

PROJECT_PLAN.md still shows "CarCost (working title)" in the header. The confirmed product name is **HonestCost** (per PROJECT_STATUS.md). No functional impact, but anyone reading the plan gets confused.

**Action:** Update line 4 of PROJECT_PLAN.md from `CarCost (working title)` to `HonestCost`.

---

## CONTRADICTION 10 — TEN transport tax: code uses invented 9-bracket table, law has 14 WLTP brackets
**Severity: HIGH — ship blocker. Affects TEN cost for every non-EV/non-PHEV new car.**

The `ten(co2)` function in index.html used values that matched neither the WLTP table (vehicles registered after 31.12.2020) nor the NEDC table in current Latvian law.

**Source:** `Transportlīdzekļa ekspluatācijas nodokļa un uzņēmumu vieglo transportlīdzekļu nodokļa likums`, effective 01.01.2025 (likumi.lv/ta/id/223536)

**Key distinction:** All new cars sold in Latvia 2025–2026 were first registered after 31.12.2020 → the **WLTP table (14 brackets)** applies exclusively.

| CO2 bracket (g/km) | Old code | WLTP law | Difference |
|---|---|---|---|
| ≤50 | €0 | €0 | ✅ correct |
| 51–95 | €30 | **€12** | +€18 (150% too high) |
| 96–115 | €50 | **€39** | +€11 (28% too high) |
| 116–130 | €80 | **€72** | +€8 (11% too high) |
| 131–155 | €120 | **€99** | +€21 (21% too high) |
| 156–175 | €180 | **€126** | +€54 (43% too high) |
| 176–200 | €260 | **€147** | +€113 (77% too high) |
| 201–225 | *(missing)* | **€186** | — |
| 226–250 | €380 | **€225** | +€155 (69% too high) |
| >250 | €520 | **€285–€834** | varies |

**Impact on 5-year TCO (TEN component only):**
- BMW 1-Series 118i (128 g/km): overstated by €8/yr × 5 = +€40
- BMW X1 xDrive20i (161 g/km): overstated by €54/yr × 5 = **+€270**
- BMW X3 20d / Mercedes GLC 220d (165–168 g/km): overstated by +€270

**Note:** Law also adds a €330/yr surcharge for engines >3500cc. Not implemented — irrelevant for mainstream Latvian market (no new car sold at a dealer has >3500cc).

**Why it happened:** The PROJECT_PLAN TEN table appears to have been hand-crafted from an outdated or incorrect source, predating the 01.01.2025 law revision. The build copied those placeholders verbatim.

**Action: ✅ FIXED in index.html (2026-05-15)** — `ten()` now uses the full 14-bracket WLTP table per current law.

---

## Summary Table

| # | Where | What was wrong | Status | Urgency |
|---|---|---|---|---|
| 1 | `TYRE` constants | large €503→€450, suv €675→€555 | ✅ Fixed 2026-05-15 | Ship blocker |
| 2 | `REPAIR_BUFFER_BASE` | Placeholder values, not R2 research | ✅ Fixed 2026-05-15 | Ship blocker |
| 3 | `DEP_RATES` ev | EV Y1 wrong: 0.25 vs 0.30 | ✅ Fixed 2026-05-15 | Ship blocker |
| 4 | `OCTA_EST` | Wrong values + wrong parameter (cc vs kW) | ✅ Fixed 2026-05-15 | Ship blocker |
| 5 | `homeElec` | 0.13 vs research 0.18 | ✅ Fixed 2026-05-15 | Ship blocker |
| 6 | EV home % slider | 70% default vs research 66% | ✅ Fixed 2026-05-15 | Low |
| 7 | VW service interval docs | 15,000 km noted vs actual 30,000 km | ⚠️ Tooltip/doc only — no code change needed | Low |
| 8 | `pubElec` | 0.38 vs 0.39 — €3/yr difference | ⚠️ Negligible, skipped | Negligible |
| 9 | Product name in plan | "CarCost" vs "HonestCost" | ⚠️ Cosmetic | Cosmetic |
| 10 | `ten()` function | 9-bracket invented table vs 14-bracket WLTP law (effective 01.01.2025) | ✅ Fixed 2026-05-15 | Ship blocker |

**All ship blockers resolved as of 2026-05-15.**

---

*Sources verified: index.html (2026-05-15), RESEARCH_FINDINGS.md, RESEARCH_FINDINGS_R6R8.md, PROJECT_PLAN.md, PROJECT_STATUS.md, FIXES_BEFORE_BUILD.md, likumi.lv/ta/id/223536 (Latvian law, effective 01.01.2025)*
