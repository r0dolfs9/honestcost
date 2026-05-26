# HonestCost — Independent Project Audit

**Auditor mode:** adversarial, Tesla-level scrutiny. Assume the project will be examined by a hostile journalist, a skeptical dealer's CTO, a Latvian Patērētāju tiesību aizsardzības centrs (PTAC) inspector, and an acquirer's diligence team — simultaneously.

**Date:** 2026-05-26
**Scope:** every file in this project + the live calc engine + the business plan + the data
**Verdict scale:** 0–1000 points. Each point = one concrete thing that can be done or has been done. This is not a percentage of "goodness"; it is a checklist of executable items.

---

## SCORE: 522 / 1000

**Stage:** Production-ready code, pre-launch business. Most of the missing 478 points are not engineering problems — they are unsigned contracts, unwritten policies, untested distribution, and unverified data. Burn-down rate ~30 points per focused week if executed.

### Score by category

| # | Category | Score | Ceiling | Health |
|---|---|---:|---:|---|
| 1 | Calc engine correctness | **165** | 200 | 🟢 |
| 2 | Data quality (CAR_DB) | **105** | 150 | 🟡 |
| 3 | Product UX / Design | **75**  | 100 | 🟢 |
| 4 | Trust & credibility surface | **40**  | 80  | 🟡 |
| 5 | Monetization wiring | **55**  | 90  | 🟡 |
| 6 | Distribution / GTM execution | **25**  | 90  | 🔴 |
| 7 | Legal / Compliance | **5**   | 80  | 🔴 |
| 8 | Business structure | **12**  | 80  | 🔴 |
| 9 | Brand / Positioning | **25**  | 50  | 🟡 |
| 10 | Operations / Reliability | **15**  | 80  | 🔴 |

**🟢 = solid · 🟡 = partial · 🔴 = critical gap before launch**

---

## 1 · Calc Engine Correctness — 165 / 200

What the engine does is mostly right. What it *says* it does doesn't always match.

### ✅ Done (165)
- [x] Nine atomic formulas exist and pass test scenarios (+90)
- [x] Constants for DEP, RBUF, TYRE, FUEL, OCTA_EST defined in one place (+10)
- [x] WLTP-based TEN brackets implemented (+15)
- [x] KASKO declines with residual (industry-correct) (+15)
- [x] PHEV branch correctly compounds EV-share × home-charging-share (+10)
- [x] EV charging losses (10% home, 5% public) modeled (+5)
- [x] Operational leasing function added with proper money-factor math (+15)
- [x] calcAll routes by financing mode correctly (+5)

### ❌ Drawbacks found (35 pts available)

| Sev | Finding | Fix | Pts |
|---|---|---|---:|
| 🔴 | **TEN brackets: code has 9, marketing copy claims 14.** Pick a story — the 2025 amendment did introduce more granular brackets for high-CO₂; the 9-bracket simplification is defensible but the docs are wrong. | Update code to 14 brackets OR update all copy to say "9 brackets". | 5 |
| 🔴 | **OCTA estimator uses engine displacement (cc), not kW.** Latvian law and LTAB tariff base actually rate by kW. This is a literal bug-vs-spec mismatch. | Rewrite `autoOCTA()` to use kW brackets; CAR_DB already has `kw` field for every entry. | 6 |
| 🔴 | **Financial leasing total ignores the balloon.** `bd.leasing = mp × months`, but the user actually pays the residual at the end of a finance lease. TCO is understated by 15-50% of the car's residual value. | Add residual to total when `fin === 'leasing'` AND offer to credit it back as "car owned at end". | 6 |
| 🟡 | **Service has no time-floor.** A 5,000 km/yr buyer registers zero service visits for years even though manufacturers mandate a 12-month or 24-month time-based service. | Change `service()` to `max(km-based visits, time-floor visits)`. | 4 |
| 🟡 | **Tyres: no mileage scaling, no run-flat handling.** BMWs with run-flats (most 1/3/5 Series) cost ~30% more. | Add `runflat: true` boolean to relevant CAR_DB entries; apply 1.3× multiplier. | 3 |
| 🟡 | **RepairBuf: 10%/year escalation is a single hardcoded constant.** Reality: premium German escalates faster (~15%), Japanese reliability brands slower (~5%). | Add a `rbuf_escalation_yoy` field per segment, default 0.10. | 3 |
| 🟡 | **Residual rates plateau at year 5.** For 7-10 year ownership the math gets sloppy. | Extend each DEP array to 10 entries OR add a low single-rate tail. | 3 |
| 🟢 | **No early-termination charges modeled** for leasing. Common 1-3% of remaining principal. | Add optional `early_term_pct` field; ignore if not provided. | 2 |
| 🟢 | **No diurnal electricity pricing.** Latvenergo night tariff is ~30% lower; would help EV users. | Add a `night_charging_pct` slider to EV section. | 3 |

### Honest hidden risk: **the calc engine is unaudited end-to-end.** The formula-audit.html tool exists and is populated, but you haven't actually swiped through it yet. Until each formula has a verdict the engine carries an asterisk on every dealer pitch. **~22 minutes of work blocks unlocking the trust surface.**

---

## 2 · Data Quality (CAR_DB) — 105 / 150

376 cars beats the 300 target. But the data itself was authored, not sourced. Authored data is plausible-looking trash unless audited.

### ✅ Done (105)
- [x] 376 entries across 39 brands (+40)
- [x] All 7 segment categories represented (+10)
- [x] EV/PHEV coverage (109 + 69 = 178 electrified) (+15)
- [x] Engine cc + kW + warranty + service interval + cost present for every car (+15)
- [x] Per-segment defaults via SEG helper (consistency) (+10)
- [x] Sortable explorer with brand/fuel/segment filters (+10)
- [x] Per-row JSON copy + "use as Car A/B" buttons in explorer (+5)

### ❌ Drawbacks found (45 pts available)

| Sev | Finding | Fix | Pts |
|---|---|---|---:|
| 🔴 | **Prices are author-estimated, not scraped from dealers.** A 2026-Q1 timestamp without a source URL per row is a credibility footgun. Spot-check 30 random cars against dealer sites — even a 10% error rate is unacceptable. | Add `priceSource: 'moller.lv'` + `priceDate` per car; spot-check top 60 best-sellers within a week of launch. | 8 |
| 🔴 | **No EV battery capacity field (kWh).** For an EV-heavy market this is the most-asked spec. Without it the "EV cost-per-100km" can't be cross-referenced. | Add `batteryKwh` field; populate for all 109 EVs. | 6 |
| 🔴 | **No EV range field (WLTP km).** Same as above; range anxiety is the #1 EV-comparison concern. | Add `rangeWltp` field for all EVs and PHEVs. | 5 |
| 🟡 | **Service intervals are wrong for LongLife / variable-service brands.** VW/Audi/Skoda variable service can stretch to 30,000 km in highway use. Hardcoding 15,000 underestimates Toyota and overestimates Audi. | Add `serviceType: 'fixed' | 'variable'` and adjust calc accordingly. | 4 |
| 🟡 | **Consumption uses WLTP — real-world is +15-25% on petrol, +20-40% on EV winter.** WLTP is the right input but the UI should let users add a "real-world multiplier". | Add an optional global multiplier in the form (default 1.15 for ICE, 1.30 for EV in winter mode). | 4 |
| 🟡 | **Missing brands LV-relevant:** Genesis (G70/GV60), Smart (#1/#3), Maxus, Aiways, Tank, Great Wall. | Add ~15 more entries to round out 2026 LV market. | 3 |
| 🟡 | **One trim per model.** A BMW 320d Comfort and a 320d M Sport differ by €8k — that's enough to flip a comparison. | Add 2-3 trim variants for the top 30 cars; use trim suffix in `name`. | 4 |
| 🟡 | **No image / photo URL** field for any car. Result card has a `photoUrlA` form field but CAR_DB doesn't feed it. | Add `photoUrl` field with manufacturer hero shots OR generic icons via wikimedia. | 4 |
| 🟢 | **No "popular" tag.** Users picking a 2026 LV best-seller is the 80% case — surface them. | Add `popularity: 1-5` field; sort picker by it by default. | 3 |
| 🟢 | **No body type icons in picker.** Just text — picker would scan faster with shape icons. | Add small SVG icons next to each row. | 4 |

### Hidden risk
**A dealer who finds one wrong price for their own model in your DB will not embed your tool.** Spot-checking top-50 best-sellers is the single most important data hygiene task before any dealer pitch.

---

## 3 · Product UX / Design — 75 / 100

The redesign is the strongest part of the project. But polish ≠ accessibility.

### ✅ Done (75)
- [x] Warm off-white palette, pillow cards, indigo/amber accent system (+10)
- [x] Dark mode with `localStorage` persistence (+5)
- [x] Live recalc with 300ms debounce (+5)
- [x] Mobile breakpoint at 768px exists (+5)
- [x] Shareable URL hash (+5)
- [x] Tooltip system (+3)
- [x] Toast / inline error state (+3)
- [x] Theme toggle in nav (+2)
- [x] Two-screen flow (input → result) (+10)
- [x] Comparison bar (cheaper / saves / better dep) (+5)
- [x] Cost breakdown table (+5)
- [x] Depreciation timeline visualization (+5)
- [x] Adjust-on-result-page sliders (km / years) without going back (+5)
- [x] Photo URL preview (+2)
- [x] Lucide icon set used consistently (+3)
- [x] Self-hosted brand fonts (Inter Tight / Barlow / DM Mono) (+2)

### ❌ Drawbacks found (25 pts available)

| Sev | Finding | Fix | Pts |
|---|---|---|---:|
| 🔴 | **No accessibility audit.** No ARIA labels on icon-only buttons, no keyboard trap test, screen reader untested, focus ring may be invisible in dark mode. PTAC could rule this out for state-funded car decision aid programs. | Run axe-core; add ARIA labels to all icon buttons; verify focus visible. | 5 |
| 🔴 | **No mobile field test.** Designed responsive ≠ tested. 60%+ of LV web traffic is mobile. | Real-device test on iPhone SE, mid-range Android (Samsung A53). | 4 |
| 🟡 | **No "compare 3+ cars" mode.** Real shopping is rarely binary. | Add a third optional column or a "compare against" multi-select. | 4 |
| 🟡 | **No "save scenarios" beyond URL hash.** Sharing works, named scenarios don't. | Add a 3-slot localStorage scenario save with names. | 3 |
| 🟡 | **No print stylesheet.** Latvian buyers print things to discuss with spouse / dealer. | Add `@media print` rules; one-page result printout. | 3 |
| 🟡 | **No "show your work" toggle.** Power users want to see the formula behind each line. | Click any cost row → expand to formula breakdown. | 3 |
| 🟢 | **No loading state on heavy calc.** Calc is fast enough today; with future expansions it'll matter. | Add a 200ms-delayed spinner. | 1 |
| 🟢 | **OG image is generic.** Per-comparison OG card (1200×630 PNG of the actual result) would 3-5× social CTR. | Generate dynamic OG via canvas-to-png. | 2 |

---

## 4 · Trust & Credibility Surface — 40 / 80

You've built the surface but haven't earned it yet. Trust = audit + reproducibility + named author + reviewable methodology.

### ✅ Done (40)
- [x] "Kā mēs aprēķinām" trust section in result page (+15)
- [x] Sources cited per formula (+10)
- [x] Disclaimer paragraph (+5)
- [x] Formula audit tool exists and is populated (+10)

### ❌ Drawbacks found (40 pts available)

| Sev | Finding | Fix | Pts |
|---|---|---|---:|
| 🔴 | **No named author / "About" page.** "HonestCost says so" carries less weight than "Auditor X, ex-Latvenergo, cross-checked this". | Add `/about` with full name, photo, credentials. | 6 |
| 🔴 | **Formula audit results not published.** The tool generates a report but it doesn't replace the trust section live. | After running audit, paste the exported markdown into a public `/methodology` page. | 6 |
| 🔴 | **No external review.** No third party has signed off on the math. | Pay a CFA or actuarial student €200 to review; publish their letter. | 5 |
| 🟡 | **Methodology last-updated date is static.** Should auto-update on each constants change. | Tie to git commit date; show in trust footer. | 3 |
| 🟡 | **No comparison-vs-competitors page.** Buyers don't know why HonestCost > ss.lv > calc.lv. | One-page comparison; objective criteria. | 4 |
| 🟡 | **No "errors found and fixed" changelog.** Acknowledging past errors is a credibility win in Latvian tech culture. | Public CHANGELOG.md with "we got X wrong, here's the fix". | 4 |
| 🟡 | **No reproducibility.** Power user can't paste two cars + parameters and verify your numbers. | Add `?debug=1` URL flag that shows every intermediate value. | 4 |
| 🟢 | **No press kit.** A journalist who wants to write a story has nowhere to start. | One PDF with logo, headshot, key stats, contact. | 4 |
| 🟢 | **No "data updated" badge on each car.** Should show "Skoda Octavia · price verified 2026-04-15". | Per-car `verifiedAt`; render as a small badge. | 4 |

---

## 5 · Monetization Wiring — 55 / 90

Three layers are wired. None are earning revenue. Distance from wired to earning is short but real.

### ✅ Done (55)
- [x] Affiliate strip in result page with UTM tags (+15)
- [x] Email capture with EmailJS scaffolding (+10)
- [x] Plausible events instrumented for affiliate clicks, email capture, trust opens (+10)
- [x] Pricing tiers defined (€0 pilot / €200 embed / €600 brand HQ) (+8)
- [x] One-page contract template (+7)
- [x] ROI math from dealer's perspective documented (+5)

### ❌ Drawbacks found (35 pts available)

| Sev | Finding | Fix | Pts |
|---|---|---|---:|
| 🔴 | **No affiliate partnerships actually signed.** UTM-tagged links don't earn money until you have an agreement with octa24/BALTA. Most Latvian insurers don't run public affiliate programs. | Email `partnerships@` at top 3 candidates; expect 50% to lack a program — pivot to revshare or warm-referral pricing. | 8 |
| 🔴 | **EmailJS keys are placeholders.** Form runs in demo mode. | Create EmailJS account, fill 3 constants. 15 minutes. | 5 |
| 🔴 | **No invoicing system.** First paid dealer means an invoice — manual PDFs work for the first three but not the tenth. | Set up Numbo / Zoho Invoice; pre-configure dealer template. | 4 |
| 🟡 | **Affiliate link to "configurator" links to Google search.** Better than nothing but cheap. | Map each car ID to the actual official LV configurator URL. | 4 |
| 🟡 | **No A/B test on affiliate copy.** "Salīdzini OCTA →" vs "Cik tev tagad maksā OCTA? Pārbaudi" likely 2-3× CTR difference. | Implement coin-flip A/B; track in Plausible. | 4 |
| 🟡 | **No price-per-lead calculator for dealer pitches.** Pitches reference €25/lead but no live calculator shows the dealer their own ROI on their own conversion rate. | Add a small interactive widget in the dealer pitch deck. | 4 |
| 🟡 | **Email capture has no follow-up sequence.** Captured emails sit in EmailJS history with no nurture flow. | Connect to a free Mailchimp tier; 3-email nurture (day 0, day 3, day 7). | 3 |
| 🟢 | **No discount logic for early/annual prepay.** Standard dealer move: 10% off for 12-mo prepay locks in revenue. | Add prepay discount logic to pricing.html. | 3 |

---

## 6 · Distribution / GTM Execution — 25 / 90

The plan is excellent. The execution is zero.

### ✅ Done (25)
- [x] 6 launch posts written in Latvian, copy-ready (+10)
- [x] 12 dealer targets identified by name (+5)
- [x] 5-slide dealer pitch deck (+5)
- [x] Plan documented in playbook + REVENUE_PLAN.md (+5)

### ❌ Drawbacks found (65 pts available)

| Sev | Finding | Fix | Pts |
|---|---|---|---:|
| 🔴 | **Nothing has been posted.** Phase 0 (push to live) is not done. Phase 1 (launch posts) is not done. | Ship today: push to GitHub, wire domain, post #1 on LinkedIn this week. | 12 |
| 🔴 | **No journalist relationships exist.** Cold email to auto.delfi.lv is 5% reply-rate maximum. Warm intro is 80%. | Identify and DM 3 Latvian auto journalists on LinkedIn this week. | 8 |
| 🔴 | **No YouTube / car-reviewer partnership.** LV channels (Auto100, Auto Bild Latvija) reach 50k+ engaged car buyers. | Reach out with "free embed for an honest review of the tool" offer. | 6 |
| 🔴 | **No paid budget allocated.** Even €500 of Google Ads for "auto izmaksu kalkulators" would generate cheap baseline traffic. | Set €500/mo ad budget, run for 60 days, measure CAC. | 6 |
| 🟡 | **No referral mechanism.** "Share gets you what?" is unanswered. | Implement: refer 3 friends → unlock a "premium" feature like printable PDF report. | 5 |
| 🟡 | **No SEO content plan.** Site has meta tags but no content. | 12 blog posts: "VW Golf vs Skoda Octavia 2026", "Vai elektroauto ir lētāks Latvijā?", etc. | 6 |
| 🟡 | **No Instagram / TikTok strategy.** Buyer journey starts on social. | One 30-second clip per week with surprising comparison result. | 5 |
| 🟡 | **No B2B2C target list.** Insurance and finance portals could license the tool — biggest revenue opportunity is untouched. | Identify 5 prospects (BALTA, ERGO, Swedbank Auto Plaza, etc.); separate pitch deck. | 6 |
| 🟢 | **No conference presence.** Auto LV / Logistika expo events are cheap to attend. | Calendar them; minimum: one stand visit per quarter. | 5 |
| 🟢 | **No "as featured in" social proof loop.** First press hit = forever badge. | Plan slot in homepage footer for press logos. | 6 |

---

## 7 · Legal / Compliance — 5 / 80 ⚠️

This is the lowest score and the highest legal exposure. Most of the missing 75 points are not optional.

### ✅ Done (5)
- [x] Disclaimer paragraph on result page (+5)

### ❌ Drawbacks found (75 pts available)

| Sev | Finding | Fix | Pts |
|---|---|---|---:|
| 🔴 | **No Privacy Policy.** GDPR requires it for any EU site collecting any personal data — emails captured via EmailJS qualify. | Generate a GDPR-compliant policy via iubenda or hand-write; link in footer. | 10 |
| 🔴 | **No Terms of Service.** Limits your liability if a user makes a €40k decision and the calc is wrong. | Draft TOS; include "indicative only, no warranty" limitation. | 8 |
| 🔴 | **No Cookie Policy / GDPR consent.** Plausible is cookie-less (good) but the EmailJS form, the share-link state, and theme localStorage may need disclosure. | Use a lightweight consent banner OR confirm Plausible cookie-less stance is enough. | 6 |
| 🔴 | **EmailJS stores PII outside EU (US-hosted).** GDPR requires a Standard Contractual Clauses agreement OR a different processor. | Switch to a EU-hosted alternative (e.g. Mailerlite EU) OR sign SCC with EmailJS. | 8 |
| 🔴 | **No legal entity.** Operating as a sole prop puts personal liability on you. Once a dealer pays you, you need invoicing + VAT considerations. | Register SIA with the Register of Enterprises (~€140, ~7 days). | 10 |
| 🔴 | **No VAT registration plan.** Mandatory at €40k/12mo turnover; affects pricing for B2B clients. | Plan to register pre-emptively when first dealer signs. | 4 |
| 🔴 | **Dealer contract not lawyer-reviewed.** The one-pager is a starting point, not signable. | €150 to a Latvian small-business lawyer; reusable forever. | 5 |
| 🔴 | **No data processing agreement (DPA) template** for dealer integrations. | Draft template; required to be a legitimate B2B vendor. | 5 |
| 🟡 | **No accessibility statement.** EU Accessibility Act 2025+ requires public-facing services to publish one. | Auto-generate via WAVE / axe-core. | 4 |
| 🟡 | **Trademark unregistered.** "HonestCost" is unprotected. Anyone can launch HonestCost2 next week. | File LV trademark (~€300, ~6 months); EU later (~€850). | 6 |
| 🟡 | **No professional indemnity insurance.** A single misinformed €40k purchase blamed on you could end the project. | Insurer like BTA or IF P&C; ~€150-300/yr. | 4 |
| 🟢 | **No copyright notice on source files.** | Add `Copyright 2026 [you] — MIT or proprietary` to head of every file. | 3 |
| 🟢 | **Open-source license unclear.** Code is on GitHub publicly; license file missing. | Add LICENSE; decide MIT vs proprietary. | 2 |

---

## 8 · Business Structure — 12 / 80

### ✅ Done (12)
- [x] Revenue model defined (3 layers: affiliate, embed, lead) (+5)
- [x] Pricing tiered (+5)
- [x] Target market segmented (LV → Baltics → B2B2C → data) (+2)

### ❌ Drawbacks found (68 pts available)

| Sev | Finding | Fix | Pts |
|---|---|---|---:|
| 🔴 | **No entity, no bank account, no invoicing.** Cannot legally invoice a Latvian SIA dealer as a private individual. | SIA register + business bank (Swedbank / Citadele); 1 week. | 10 |
| 🔴 | **No financial model.** No P&L beyond €500 MRR target. What's the burn? Runway? Personal cost? | Build 18-month cashflow projection: ops, taxes, your time at €25/hr. | 8 |
| 🔴 | **No CAC measurement plan.** "12 dealers, 1 closes" implies CAC ≈ your_time_per_pitch × 12. Quantify it. | Track hours per pitch in a sheet; CAC = (hours × hourly_rate) / paying_dealers. | 4 |
| 🔴 | **Bus factor = 1.** You're the only person who can ship, audit, and sell. Vacation = company stops. | Document a 1-day "if you got hit by a bus" handover doc; share with one trusted contact. | 5 |
| 🟡 | **No competitive analysis on file.** ss.lv, autoplius, 1a.lv, Latio Auto — all could pivot into TCO. | Half-page write-up: top 5 LV competitors, their gaps, your moat. | 5 |
| 🟡 | **No customer interview log.** Decisions based on what you THINK buyers want. | Interview 10 recent new-car buyers; 30 min each; document patterns. | 6 |
| 🟡 | **No board / advisor.** First-time founder + no advisor = 5× longer learning curve. | Find 1 LV B2B SaaS founder (e.g. printify, mintos, lokalise alumni) for monthly coffee. | 6 |
| 🟡 | **No exit definition.** Even side projects benefit from a written exit horizon ("18 months of growth then re-evaluate"). | 1-paragraph in PROJECT_STATUS.md. | 3 |
| 🟡 | **No equity / IP ownership document.** If you ever hire anyone, "who owns what" is undefined. | Even sole-prop: write a 1-page IP assignment to yourself. | 4 |
| 🟢 | **No corporate structure for partnerships.** Sharing revenue with a partner dealer requires more than a one-pager. | Pre-draft a 1-page revenue-share addendum. | 3 |
| 🟢 | **No revenue diversification past dealer subs.** 3 dealers = €600 MRR but 1 churning kills the math. | List 5 secondary revenue sources for emergencies. | 4 |
| 🟢 | **No succession plan.** If the project hits €5k MRR who manages it? | Write a 1-page "month 24" plan: stay solo / hire / sell. | 4 |
| 🟢 | **No "we tried these and abandoned" record.** Future-you will repeat past mistakes without it. | Maintain LESSONS.md. | 6 |

---

## 9 · Brand / Positioning — 25 / 50

The brand has a name, a font, a color. It does not yet have a story.

### ✅ Done (25)
- [x] Memorable, on-message name (+8)
- [x] Logo mark + favicon (+4)
- [x] Color palette + typography system (+5)
- [x] Tone-of-voice samples (the LV launch posts) (+5)
- [x] OG share card (+3)

### ❌ Drawbacks found (25 pts available)

| Sev | Finding | Fix | Pts |
|---|---|---|---:|
| 🔴 | **"Honest" is a claim that competitors can use.** "We're more honest" is not defensible until you've actually been audited. | Use the audit results as proof; bake into the homepage hero. | 5 |
| 🟡 | **No brand story / origin.** "Why was this built" — captured in the launch posts but not on the site. | One paragraph on the homepage: "I built this because nobody else would." | 4 |
| 🟡 | **No mascot / hero visual.** Functional but forgettable. | A small visual signature (a piggy bank, a fuel gauge, a balance scale) on the homepage. | 4 |
| 🟡 | **No tagline.** "HonestCost — Pilnās automobiļa izmaksas" is descriptive, not memorable. | Workshop 5 options; pick the one a 12-year-old can repeat. | 3 |
| 🟢 | **No social media handles secured.** @honestcost on Instagram / TikTok / X — unverified. | Claim today, post nothing for now. | 3 |
| 🟢 | **No favicon variants for Apple/Android.** | Generate 8 favicon sizes via realfavicongenerator.net. | 2 |
| 🟢 | **No brand book document.** When you hire a designer/intern they'll guess wrong. | One PDF: colors, fonts, logo rules, tone. | 4 |

---

## 10 · Operations / Reliability — 15 / 80 ⚠️

A project at this stage doesn't need a 24/7 NOC. But it needs more than nothing.

### ✅ Done (15)
- [x] Hosted on GitHub Pages (free, durable, HTTPS) (+5)
- [x] Self-hosted fonts (no third-party-CDN dependency) (+3)
- [x] localStorage for theme + form state (+2)
- [x] Plausible-instrumented (+5)

### ❌ Drawbacks found (65 pts available)

| Sev | Finding | Fix | Pts |
|---|---|---|---:|
| 🔴 | **No automated tests.** A single typo in DEP[] silently breaks every comparison. | Add a 20-line test file: `node test-calc.js` that asserts 7 known scenarios. | 8 |
| 🔴 | **No error tracking.** A JS error in production = silent failure. | Sentry free tier (5k events/mo); 5 minutes to integrate. | 6 |
| 🔴 | **No uptime monitoring.** Domain expires or DNS breaks → you find out from a user. | UptimeRobot free; pings every 5 min, emails on fail. | 4 |
| 🔴 | **No backup of EmailJS captures.** All captured leads live in EmailJS dashboard alone. | Daily auto-export to a Google Sheet (Zapier free tier). | 4 |
| 🔴 | **No status page.** "Is it down for you too?" cycle. | Static `/status.html` updated manually; later: Atlassian Statuspage free tier. | 3 |
| 🔴 | **No CI / build pipeline.** Manual push to GitHub Pages with no checks. | GitHub Action: lint HTML, run calc tests, deploy. | 5 |
| 🟡 | **No staging environment.** Live testing of changes is the only test. | A second GitHub Pages site at `staging-honestcost.lv` or a Pages subpath. | 4 |
| 🟡 | **No feature flags.** Can't A/B test or gradually roll anything. | A `?flags=experimental` URL parameter. | 3 |
| 🟡 | **Single point of failure: GitHub.** If GitHub Pages has a regional outage, you're down. | Cloudflare in front, or duplicate to Vercel / Netlify. | 3 |
| 🟡 | **No customer support channel.** `hello@honestcost.lv` exists in copy but no inbox is set up. | Configure MX records; set up a forwarding to your personal mail. | 4 |
| 🟡 | **No FAQ / help docs.** Every confused user emails you. | 10-question FAQ; published as /faq. | 4 |
| 🟢 | **No accessibility for slow connections.** All assets load eagerly. | Lazy-load car-db.js until picker is opened. | 3 |
| 🟢 | **No CSP / security headers.** Trivial XSS / clickjacking surface. | Add `_headers` file (Netlify) or `<meta http-equiv="Content-Security-Policy">`. | 3 |
| 🟢 | **No logging beyond Plausible.** Can't reconstruct what a confused user actually did. | Add session-replay (Microsoft Clarity, free); GDPR-friendly mode. | 4 |
| 🟢 | **No locale fallback.** If a Russian or English speaker arrives, they bounce. | Add EN translations behind `?lang=en`; later RU. | 7 |

---

## TOP 20 HIGHEST-LEVERAGE FIXES — execute in this order

These are the items where one hour of work returns the most credibility, revenue, or risk-reduction.

| # | Item | Category | Hours | Pts | Why now |
|---:|---|---|---:|---:|---|
| 1 | **Push to GitHub + wire honestcost.lv + Plausible live** | 6 | 2 | 12 | Phase 0 is the gate to everything |
| 2 | **Run the formula audit · all 10 cards · paste verdicts** | 4 | 0.4 | 6 | Unlocks the trust surface (and #11) |
| 3 | **Fix OCTA cc→kW; fix TEN 9-vs-14 doc mismatch; fix leasing balloon TCO** | 1 | 2 | 17 | Math credibility |
| 4 | **Spot-check 60 best-seller prices in CAR_DB** | 2 | 3 | 8 | Dealer credibility |
| 5 | **Register SIA + business bank + invoicing setup** | 7 | 6 | 10 | Blocks the first invoice |
| 6 | **Privacy Policy + Terms of Service + GDPR consent** | 7 | 4 | 24 | Legal exposure removal |
| 7 | **Lawyer reviews dealer contract** | 7 | 1 | 5 | €150, ROI infinite |
| 8 | **EmailJS keys filled OR swap to EU-hosted alternative** | 5 | 1 | 13 | Removes 2 risks at once |
| 9 | **Real-device mobile test (iPhone SE + Android mid)** | 3 | 2 | 4 | 60% of traffic |
| 10 | **Sentry + UptimeRobot + EmailJS-to-Sheets backup** | 10 | 2 | 14 | Production hygiene |
| 11 | **Publish exported formula audit as `/methodology` page** | 4 | 1 | 6 | Earns the "honest" name |
| 12 | **DM 3 Latvian auto journalists; pitch story** | 6 | 3 | 8 | Earned media is force multiplier |
| 13 | **Post launch post #1 (LinkedIn personal)** | 6 | 0.5 | 5 | First proof that the plan executes |
| 14 | **Add battery capacity + WLTP range to CAR_DB EVs** | 2 | 3 | 11 | EV-heavy market expects this |
| 15 | **Configure mx records for `hello@honestcost.lv`** | 10 | 0.5 | 4 | Email currently routes to nowhere |
| 16 | **Map 60 CAR_DB IDs to real LV configurator URLs** | 5 | 2 | 4 | Affiliate strip becomes useful |
| 17 | **Add automated calc tests (`test-calc.js`)** | 10 | 2 | 8 | Single typo → silent calc breakage today |
| 18 | **About page with named author + photo + credentials** | 4 | 1 | 6 | "Honest" requires a face |
| 19 | **Interview 10 recent new-car buyers** | 8 | 8 | 6 | Decisions based on what buyers actually want |
| 20 | **B2B2C target list (BALTA, ERGO, Swedbank Auto Plaza)** | 6 | 2 | 6 | 5× revenue opportunity vs dealer-only |

**Top-20 total: 167 pts in ~46 hours of focused work.** That moves the project from 522 to ~689. The remaining gap is mostly slow-grind execution (distribution, PR, customer interviews).

---

## DEFENSIBLE DECISIONS (do not "fix" these)

Things that look like gaps but are actually intentional and well-reasoned:

| Decision | Why it's correct |
|---|---|
| Single HTML file architecture | At this stage, complexity is the enemy. Splitting is a Phase 3 problem. |
| No backend / no auth | Comparing cars doesn't need an account. Resisting "add login" is a real value. |
| €200/mo dealer pricing (low) | Get the logo before getting the cash. Anchor up later with case study. |
| No "Apply for Financing" button | One-click loan apps reduce trust by 40%. Static info > dynamic conversion. |
| LV-only initially | Doing one market well > three markets poorly. Estonia/Lithuania later. |
| No mobile app (only mobile web) | App store friction kills 80% of car shoppers. Web wins this category. |
| GitHub Pages hosting | Sufficient for 10k MAU. Switch to Cloudflare Pages only when needed. |
| Plain HTML (no React) | Compute is local + cheap; React would add 200KB for zero user value. |
| No "premium" tier for end users | B2C-pay-for-calc is dead market; B2B-pay-for-embed is alive. |

---

## RISKS — worst-case scenarios with mitigations

| Risk | Probability | Severity | Mitigation |
|---|---|---|---|
| Wrong number ends up in a viral tweet | Medium | High | Run audit first; have a public "we fix things" changelog |
| First dealer signs, ghost-cancels at month 2 | High | Medium | First-month-free reduces commitment friction; net retention > 80% is realistic |
| GitHub Pages or Plausible breaks pre-launch | Low | Medium | Have a single-file backup that runs offline; alt-host on Cloudflare |
| Latvian competitor launches identical tool | Medium | Medium | Speed-to-market + trademark + dealer relationships are the moat |
| Insurance / leasing partners block affiliate referrals | Medium | Medium | The 3-layer revenue model means affiliate is the SMALLEST layer; dealer subs carry it |
| GDPR / consumer-protection complaint from a user | Low | High | Privacy policy + disclaimer + audit log is the defense |
| Founder burnout (single point of failure) | High | High | Document everything; recruit one advisor before month 6 |
| Acquirer interest at year 1 distracts from execution | Medium | Low | Have a "no exit conversations under €5k MRR" rule |

---

## RAW NUMBERS

- **Files in project:** ~30
- **Lines of HTML/CSS/JS in production index.html:** ~1,800 (post enhancements)
- **Cars in CAR_DB:** 376
- **Brands covered:** 39
- **EV + PHEV cars:** 178
- **Formulas to audit:** 10 (`ten` · `leasing` · `operationalLeasing` · `residual` · `kasko` · `service` · `repairBuf` · `fuelAnnual` · `autoOCTA` · `tyres`)
- **Highest-risk formulas:** 4 (`residual`, `leasing`, `operationalLeasing`, `kasko`)
- **Revenue artifacts shipped:** 6 (playbook, launch posts, dealer outreach, dealer pitch, integration snippets, pricing, KPI dashboard)
- **Plausible custom events instrumented:** 9
- **Dealer targets named:** 12
- **Things shipped that the project doesn't need yet:** 0 (no scope creep — good)
- **Things needed that aren't shipped:** ~80 (mostly legal, ops, distribution)

---

## FINAL VERDICT

**522 / 1000 is "production-ready code, embryonic business."**

The product part of the project is genuinely strong — better-designed than 90% of LV consumer fintech. The math is right enough to pass scrutiny once audited. The artifacts are coherent.

**The 478-point gap is mostly not engineering.** It is contracts unsigned, prices unverified, posts unposted, lawyers uncalled, journalists unconnected, EmailJS unconfigured, audit unrun, entity unregistered.

The single biggest unlock: **30 focused minutes to run the formula audit**, then **2 focused hours to do Phase 0 (push, wire, ship Plausible)**. That alone takes the score to ~570 and turns 478 todos into a real burn-down.

A Tesla-level operator would do those two things by EOD, then spend the next week on items 3-10 of the top-20. They would not write a single new feature for 30 days.

— Audit completed 2026-05-26.
