# HonestCost — Revenue Playbook

**Status:** Phase 0 not yet executed · file in this project ready to push  
**Last updated:** 2026-05-25  
**Goal:** From a finished `index.html` to **€500 MRR in 12 weeks.**

This is the Markdown source-of-truth. The pretty version lives at **[revenue/Playbook.html](revenue/Playbook.html)** and is the one you'll actually read. Keep both in sync when you edit.

---

## Where we are, exactly

### Done ✅
- **Product**: single-file `index.html` (~1,530 lines), calc engine v1.0, 9 functions, 14-bracket 2025 TEN tax, 6 ship-blocker bugs fixed, 7 test scenarios passing.
- **Design**: Studio redesign applied to live file — warm off-white, pillow cards, indigo/amber accent, dark mode + theme toggle. Pixel-checked end to end.
- **UX features**: live recalc (300ms debounce), 28-model CAR_DB with prefill, mobile breakpoint @ 768px, shareable URL hash, ownership horizon presets, OCTA tooltip.
- **SEO assets**: meta, OG image, sitemap, robots, schema.org — sitting in `uploads/` ready to merge.
- **Brand**: typography + imagery spec, fonts self-hosted (OFL), favicon, OG share card.

### Not done ❌
- **The push.** Redesigned file is local, not on `r0dolfs9/honestcost@main`.
- **The domain.** `honestcost.lv` referenced in copy; verify registration + CNAME or buy.
- **Analytics.** Plausible referenced in `uploads/index.html` but not in production.
- **Distribution.** No posts, no media list, no Latvian forum threads, no dealer pitches sent.
- **Monetization surface.** No affiliate links, no email capture, no "request a quote" CTA, no pricing page.

> **One-liner:** You've built a Bugatti and parked it in the garage with no plates. Phase 0 is plates, fuel, and a road. Everything after is driving it.

---

## The revenue thesis

Three stacked layers, smallest-effort first. Each must be live before the next is built.

| Layer | Mechanism | RPU/mo | Effort | When |
|---|---|---|---|---|
| **1 · Affiliate** | OCTA / KASKO / configurator referral links in the result screen | €0.30–€1.50 | 2h | Week 1 |
| **2 · Dealer embed** | Dealer pays a flat monthly fee to embed comparator with their models as defaults | €150–€400 | 2 weeks | Week 4–6 |
| **3 · Qualified leads** | "Saņemt piedāvājumu" → dealer CRM, billed per lead | €15–€40/lead | Needs 1+ dealer + 500 users/mo | Week 8+ |

**The pricing math:** A dealer who closes 1-in-10 leads on a €35k car nets ~€350 attributable value per lead. **€200/month for embed + 10 leads included, then €15/lead above** is ROI-positive for them and predictable for us. We sell ROI, not a tool.

**The wedge:** HonestCost is the rare "pro-consumer" tool a dealer wants. A customer who's already done a TCO comparison and chose your model is a hot lead — they've talked themselves into the car.

---

## Phase 0 — Ship the redesign

**Time-box: ≤ 2 hours. Today.**

No distribution, analytics, or monetization until `honestcost.lv` is live with HTTPS and a working share link.

1. **Confirm domain.** Log in to registrar (`domains.lv` / `zone.eu`). If `honestcost.lv` is yours: good. If not: register today, €12/year. [10 min]
2. **Push to GitHub.** Replace `index.html` on `r0dolfs9/honestcost@main` with the file from this project. Commit message in `PUSH_HANDOFF.md`. [15 min]
3. **Enable GitHub Pages.** Settings → Pages → Source = `main` branch / root. Wait 60s. [5 min]
4. **Wire custom domain.** Registrar: `CNAME honestcost.lv → r0dolfs9.github.io`. Repo: add `CNAME` file containing `honestcost.lv`. Force HTTPS. [15 min]
5. **Merge SEO assets from `uploads/`.** Copy `og-image.png`, `favicon.svg`, `robots.txt`, `sitemap.xml` to repo root. Lift `<meta>` block from `uploads/index.html` head into production `index.html`. [20 min]
6. **Add Plausible.** `<script defer data-domain="honestcost.lv" src="https://plausible.io/js/script.js"></script>`. Create the site at plausible.io. [10 min]
7. **Smoke test.** Private window: text renders LV, "Ielādēt piemēru" loads BMW 118i vs X1, results show €15,067 savings, theme toggle, share link round-trips. [10 min]
8. **Submit to Search Console.** Verify ownership (TXT record), submit `sitemap.xml`. [10 min]

### Gate 0
> `https://honestcost.lv` loads in < 2s · HTTPS green · share URL roundtrips · Plausible records your own pageview.

---

## Phase 1 — Launch & instrument

**Weeks 1–2 · target: 100 unique users/week · revenue stays at €0 on purpose.**

### Distribution — 10 days, 6 surfaces

| Day | Surface | Angle |
|---|---|---|
| Mon · D1 | LinkedIn personal (LV/EN) | "I built this. Here's what surprised me." |
| Tue · D2 | FB "Auto Latvijā" | "Skoda Octavia vs VW Golf — patiesā cena" |
| Thu · D4 | FB "Elektroauto Latvijā" | "Tesla M3 vs BMW 320d — KASKO surprise" |
| Fri · D5 | ss.lv auto forum | "Why no Latvian TCO tool? Built one, want critique." |
| Mon · D8 | Journalist pitch | "Latvian buyers underestimate KASKO by 47%" |
| Wed · D10 | Reddit r/latvia + r/cars | EN: "Built a TCO calc for Latvia, roast it" |

Full copy: **[revenue/launch-posts.html](revenue/launch-posts.html)** — 6 posts, copy-paste-ready.

### Instrumentation

Drop Plausible custom events into existing handlers — full code in **[revenue/integration-snippets.html](revenue/integration-snippets.html)**:

```js
plausible('analysis_run', { props: { car_a, car_b, horizon, km, winner, savings } })
plausible('example_loaded', { props: { preset: 'bmw_118i_x1' } })
plausible('share_link_copied')
plausible('car_db_search', { props: { query } })
plausible('horizon_changed', { props: { years } })
plausible('affiliate_click', { props: { dest: 'octa24' } })
plausible('email_captured')
plausible('trust_opened')
plausible('scrolled_full_result')
plausible('dealer_lead')
```

### Monetization layer 1 — affiliate links

Three slots in the result screen (OCTA, KASKO, configurator), each UTM-tagged.

> **Non-negotiable:** affiliate links live **only inside the result screen**, never on the input form, never above the fold. The moment the tool nudges before showing numbers, trust dies.

### Trust section — "Kā mēs aprēķinām"

Below results, expandable, lists every formula + source. **This is the single biggest determinant of whether a dealer will embed.** Code in **[revenue/integration-snippets.html](revenue/integration-snippets.html)**.

### Email capture

One block at the bottom of result screen: "Saglabā šo salīdzinājumu". EmailJS free tier (200/mo). Code in **[revenue/integration-snippets.html](revenue/integration-snippets.html)**.

### Gate 1
> ≥ 100 unique users in 7 rolling days · ≥ 30 analyses · ≥ 5 share-link copies · ≥ 1 unsolicited email or forum reply · 1+ piece of negative feedback you've actually read and answered.

---

## Phase 2 — First revenue

**Weeks 3–6 · target: 1 paying dealer · €150–300 MRR · signed agreement.**

### Targets — skip BMW Inchcape and Möller VW first

Big imports have procurement, legal review, brand guidelines — you'll burn a month. Tier 1.5 first: hungry, growing, marketing-savvy dealerships where one person can decide. Full target list (12 named dealers) + LV templates in **[revenue/dealer-outreach.html](revenue/dealer-outreach.html)**.

Top 5 (priority order):
1. **Greenmotors Skoda** — Skoda is LV #1 best-seller, growth mindset
2. **Tesla Riga** — different sales model, EV TCO is their pitch
3. **Hyundai Latvia** — Ioniq push, smaller org
4. **Kia Latvia** — EV6/Niro, aggressive marketing
5. **Volvo Baltic** — "safety/honesty" brand fit

### Pitch — 5 slides, ends on price

Deck: **[revenue/dealer-pitch.html](revenue/dealer-pitch.html)**.

1. The problem — €40k decisions based on monthly payment + fuel
2. The mirror — screenshot of *their* car winning vs a competitor
3. The hook — their models become homepage examples, logo on result, CTA → CRM
4. The proof — 30-day Plausible numbers (replace bracketed values with real)
5. The price — €200/mo, 3-mo min, first month free, cancel anytime

### Three-touch sequence

- **Day 0** — LinkedIn DM, personalised, 70 words, no link
- **Day +2** — Email with deck attached, screenshot of their car winning
- **Day +7** — Single follow-up, 50 words, reply-or-die. Never a third.

Templates in **[revenue/dealer-outreach.html](revenue/dealer-outreach.html)**.

### What you're really selling

> **Not a tool.** A calmer customer in their showroom. A buyer who modeled the car on HonestCost knows what KASKO costs in year 2. They've made peace with it. They're not going to back out at financing. That's worth €200/month to a dealer who loses 2-out-of-10 closes at the last hurdle.

### Pricing

3 tiers in **[revenue/pricing.html](revenue/pricing.html)**:

| Tier | Price | For |
|---|---|---|
| **0 · Pilot** | €0 / 30 days | "vajag saskaņot ar HQ" |
| **1 · Embed** | €200/mo + €25/overage | Tier 1.5 dealers |
| **2 · Brand HQ** | €600/mo | Importers (BMW Baltic, Möller HQ) |

ROI math (Tier 1 mid-segment): 180 leads/year × 10% close × €2,800 margin = **€50k gross from €3.4k spend = 14.9× ROI**. Walk the dealer through this in the demo. One-page contract template included.

### Gate 2
> ≥ 1 dealer paying with a signed agreement · 2+ more in active conversation · 400+ users/mo · email list ≥ 50.

---

## Phase 3 — Repeatable revenue

**Weeks 7–12 · target: 3 dealers · €500+ MRR · 1k users/mo.**

Three things in parallel:

### A · Sales — turn one close into three
- Make the case study (1-pager: dealer logo, 3 stats, pull quote, "want the same?")
- Re-pitch the original 12 with case study attached (30% reply rate, up from 10%)
- Pitch the brand HQ (importer), not just dealers — bigger ticket, slower cycle

### B · Product — embed gets real
- URL params: `?dealer=greenmotors&default_a=skoda_octavia&default_b=vw_golf`
- Dealer logo on result card (small, tasteful)
- CTA URL routed to their CRM with UTM + full comparison-state payload
- Still single-file, still no backend, just a thin `DEALER_CONFIGS` object

### C · Distribution — the second loop
- **Shareable result card** — 1080×1080 PNG export, Instagram/WhatsApp-friendly. Every share is a free ad.
- **SEO long-tail** — auto-generated comparison pages: `/vw-golf-vs-skoda-octavia`. 60×60 grid = long tail.
- **Press loop 2** — sell "Top 10 cars Latvians compare" story to LA.lv or Delfi using your 3-month data

### Gate 3
> 3 dealers paying · €500+ MRR · 1,000+ users/mo · 1 piece of earned media in major LV outlet · case study sheet exists and has been used to close a deal.

---

## After €500 MRR — three multipliers

Pick the one matching your remaining energy.

- **A · Baltics** — Estonia + Lithuania, same regulatory frame, ~30% extra build for 3× TAM.
- **B · Insurance/Finance B2B2C** — license to BTA / BALTA / ERGO portals as white-label. €1.5–3k/mo per portal. Real money.
- **C · Data product** — quarterly "Latvia Car Decision Report" (which models get compared against which). €500/seat × 30 buyers = €15k/quarter.

**Exit picture (for honesty):** profitable HonestCost at €3–5k MRR is interesting to ss.lv, 1a.lv, Inchcape Digital, or a pan-European TCO operator. Realistic multiple: 2.5–4× annual revenue. **Don't chase the exit. The strongest exit is the one you don't need.**

---

## Five metrics worth watching

| Metric | What it tells you | Wk 2 | Wk 6 | Wk 12 |
|---|---|---|---|---|
| Analyses per session | Does the tool earn a 2nd click? <1.5 = product problem. | ≥1.8 | ≥2.5 | ≥3.0 |
| Share-link rate | Organic growth potential. Copies / unique users. | ≥3% | ≥5% | ≥8% |
| Affiliate CTR | Result screen's commercial muscle. | ≥4% | ≥6% | ≥8% |
| Email capture rate | Trust + intent + future leverage on dealers. | ≥2% | ≥4% | ≥6% |
| Dealer demos booked | Reply rate × meaningful conversation rate. | 0 | ≥4 | ≥8 |

Dashboard: **[revenue/kpi-dashboard.html](revenue/kpi-dashboard.html)**.

If any drifts sideways for two weeks: stop building, ask why.

---

## Unknowns to resolve before €500 MRR

1. Will Latvian dealers pay for a 3rd-party tool, or only ads? Test with a €99/mo pilot if needed.
2. Are people sharing results or saving and forgetting? Share-link metric answers in Phase 1.
3. Is OCTA / KASKO affiliate revenue real? Some Latvian insurers don't run programs — confirm payouts before counting.
4. Does EV-vs-ICE drive higher engagement? If yes, double down — EV wave 2025–2027.
5. Right per-lead price? A/B test €15 / €25 / €40 across three dealers.
6. Will a brand HQ sign before a dealer? Worth one parallel pitch — slower but bigger.

---

## Queued for after revenue is live

- **Formula audit deck** — swipe-through review of every calc engine formula (TEN, KASKO, leasing, depreciation, RBUF, fuel, OCTA, tyres, service). One formula per screen, plain-language explanation + accept/deny so the engine is auditable end-to-end.

---

## Companion artifacts

All in `revenue/`:

| File | What's in it |
|---|---|
| `Playbook.html` | The pretty version of this document — read this one. |
| `launch-posts.html` | 6 Latvian launch posts with audience + cadence + coach notes |
| `dealer-outreach.html` | 12 target dealers, LinkedIn DM, LV cold email, follow-up, objection handling |
| `dealer-pitch.html` | 5-slide pitch deck (deck-stage.js, fullscreen, exportable to PDF) |
| `integration-snippets.html` | Drop-in code: affiliate links, email capture, trust section, Plausible events |
| `pricing.html` | 3 tiers, ROI math, 1-page service agreement (print-ready) |
| `kpi-dashboard.html` | Weekly review surface — north star, funnel, pipeline, events crib |

---

*This plan is built to be wrong in places. Of the 14 artifacts shipped here, expect three to need a rewrite by week 4 once real users show up. That's good. The plan's job is to remove every excuse for not starting — not to predict the shape of the answer.*

— v1.0 · 2026-05-25
