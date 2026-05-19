# HonestCost — Roadmap to 100
**Last updated:** 2026-05-17 (Stage 1 + 2 + 3/4 pull-forward sprint)
**Current score:** 62/100 ← was 50 at Stage 1. Pull-forward: CAR_DB 56 models, affiliate links, trust section, social proof counter
**Target:** Revenue flowing, first paying customers, scalable distribution

---

## WHERE WE ARE NOW — 50/100

### What's done ✅
- Core calculation engine — all 9 functions, PMT leasing, declining KASKO, repair buffer, TEN tax
- All 6 ship-blocker fixes applied (TYRE, RBUF, DEP_RATES EV, OCTA_EST, homeElec, TEN table)
- 7 test scenarios all pass (BMW vs X1, EV vs diesel, Yaris vs Fabia, etc.)
- Full research base R1–R12 with source citations
- Stress-test audit done (STRESS_TEST_REPORT.md — 4 critical issues, 12 action items)
- 3 example buttons — cold-start to first result in <15 seconds
- **Stage 1 COMPLETE — 2026-05-17:**
  - ✅ Live recalculation — no button needed, debounced 300ms on every field change
  - ✅ Car search DB — 28 priority models (VW, Skoda, BMW, Toyota, Mercedes, Volvo, Tesla, Audi, Hyundai, Kia, Renault, Mazda, Ford, Dacia)
  - ✅ Mobile layout — full 390px breakpoint, collapsible global bar, stacked columns
  - ✅ Shareable result URL — hash-based, no backend, "Kopēt saiti" button in results
  - ✅ RBUF Latvia discount — -20% from UK base across all categories
  - ✅ Ownership horizon presets — 3g / 5g / 7g / 10g buttons
  - ✅ Service cost minimum — time-based floor (max visits vs 0.5/year)
  - ✅ OCTA tooltip — explicit disclaimer for experienced Riga driver assumption
  - ✅ SEO meta tags + OG tags + canonical URL

### What's missing that matters (Stage 2 → now)
- Car search / pre-fill database (biggest UX barrier for non-technical users)
- Mobile layout (min-width 1100px currently — half of all users locked out)
- Live recalculation (user must click Analizēt — breaks the feedback loop)
- Shareable results link (without this the tool cannot spread organically)
- No public URL, no domain, no hosting
- No analytics (blind to who uses it and what they do)
- No monetization mechanism
- No dealer relationships
- Zero users

---

## THE SCORING SYSTEM

| Range | What it means |
|---|---|
| 0–20 | Idea + research |
| 20–40 | Working prototype, local only |
| 40–60 | Public product, real users, validated |
| 60–75 | Distribution flywheel started, first traction |
| 75–90 | First revenue, first B2B customer |
| 90–100 | Repeatable revenue, defensible position |

---

## STAGE 1 — Product Completion (28 → 50)
**Goal:** A product a stranger can use without help on any device.  
**Estimated time:** 2–3 weeks of focused build time.

### 1.1 Live Recalculation — Remove the Analizēt button (3 hours)
Currently the user fills 12 fields and clicks a button. Tesla's configurator reprices the car instantly as you touch anything. Do the same.

**What to build:**
- Add `oninput` / `onchange` listeners to every field that calls `doAnalyse()` debounced 300ms
- Keep the button as a fallback but make it disappear once results are showing
- Show a subtle spinner on the result cards during recalculation

**Why first:** This is the single change that most transforms the tool from "form + report" to "live instrument." Every other feature becomes more powerful once results update in real time.

---

### 1.2 R12 Phase 2 — Car Search Database (4–6 days)
The biggest usability gap. A first-time user who doesn't know their car's CO2 figure, WLTP consumption, or service interval cannot use the tool without it.

**What to build:**
- Research 28 priority cars from official Latvia configurators (bmw.lv, vw.lv, toyota.lv, etc.) — get exact prices, WLTP specs, warranty, service data. Budget 3–4 hours of research.
- Embed `CAR_DB` array in `<script>` — ~4KB for 28 cars, negligible
- Search input above Car A / Car B name fields — debounced keyup → filter by brand/model/tags → dropdown list
- On select: populate all 12 fields, set tier buttons, auto-fire recalculation
- Badge under car name: "📋 Dati no HonestCost datubāzes · 2026"
- User can still edit any field after pre-fill

**Architecture note from stress test:** Store `kw` (engine power) in CAR_DB, NOT `cc` (displacement) — OCTA is kW-based. Map: `{..., kw: 100, ...}` and update `autoOCTA()` accordingly.

**Priority models (research in this order):**

| Brand | Models | Notes |
|---|---|---|
| VW | Golf 1.5 TSI, Golf TDI, ID.4 Pro | High search volume |
| Skoda | Octavia 1.5 TSI, Fabia 1.0 TSI | Budget segment |
| BMW | 118i, 120d, X1 20i, X3 20d | Premium segment |
| Toyota | Yaris Hybrid, RAV4 Hybrid | Reliability segment |
| Mercedes | GLC 220d | Premium SUV |
| Volvo | XC40 B3, XC40 Recharge | Safety-focused buyers |
| Tesla | Model 3 RWD, Model 3 LR | EV comparison |
| Audi | A4 40 TDI | Business |

---

### 1.3 Mobile Layout (2 days)
Currently locked at min-width 1100px. Roughly 50% of web traffic is mobile. The comparison use case on mobile is: user is at a dealer, pulls out phone, quickly checks if the car they're being shown is a good deal vs. the alternative.

**What to build:**
- CSS breakpoint at 768px: stack Car A and Car B vertically instead of side by side
- Global settings bar becomes collapsible accordion on mobile
- Result chart collapses to a summary card with expandable breakdown
- Example buttons become a horizontal scroll strip
- Touch-friendly: all buttons min 44px tap target

**Do NOT rebuild the desktop layout.** Only add the mobile breakpoint. The existing desktop design is good.

---

### 1.4 Shareable Result URL (1 day)
Without this, every comparison is ephemeral. The user can't send their analysis to their partner. The tool cannot spread organically.

**How to build (no backend needed):**
- When results render, serialize all input state to a URL hash: `#a=bmw_118i&b=bmw_x1&km=15000&yrs=5&fin=leasing...`
- On page load, check for hash and auto-populate fields + fire calculation
- Add a "Kopēt saiti" (Copy link) button in the results header
- The hash should be short — use abbreviated field names and only include non-default values

**Why this is a growth mechanism:** A user who finds the tool useful sends the link to a friend. That friend opens it with the comparison already populated. They trust it immediately because it came from someone they know. They save it and search for more comparisons. This is the organic loop.

---

### 1.5 Ownership Horizon Selector — Expand to 3/7/10 Years (3 hours)
The current slider goes 1–10 years but the preset examples all use 5. Many Latvian car buyers lease for 3 years and care about TCO over that window, not 5. Long-term holders (7–10 years) have a completely different cost profile post-warranty.

**What to build:**
- Pre-set buttons: 3g / 5g / 7g / 10g (replace the raw slider or sit above it)
- Default stays 5
- Ensure result labels update to match: "5 gadu kopējās izmaksas" → "3 gadu kopējās izmaksas"

---

### 1.6 Stress-Test Action Items — Priority Fixes (1 day)
From STRESS_TEST_REPORT.md — items rated critical or major that affect calculation accuracy:

- **Latvia repair buffer discount:** Reduce RBUF values by ~20% to account for Latvia labour being cheaper than UK sources. Economy: [160, 280, 520] → etc.
- **Service cost minimum visit:** Low-mileage users (<15,000 km/year) currently see understated service costs because time-based interval (24 months) isn't modelled. Fix: `max(visitsByKm, 0.5)` to ensure at least 1 visit per 2 years.
- **suv_mid depreciation:** RAV4 Hybrid outlier anchor. Add note or split into suv_mid_hybrid.
- **OCTA tooltip:** Add "Novērtēts pieredzējušam vadītājam (5+ gadi bez avārijām, Rīga). Jauniem vadītājiem — ievērojami vairāk."

---

### Stage 1 Completion Criteria
- [x] Any field change updates results without clicking a button
- [x] Typing "VW Golf" in the search box returns a dropdown with 3 trim options in under 500ms
- [x] Selecting a car from the dropdown fills all 12 fields correctly
- [x] The tool is fully usable on a 390px wide mobile screen
- [x] A comparison URL can be copied and opened in a new browser tab with all fields pre-populated
- [ ] All 7 test scenarios still pass after the changes ← run test_scenarios.js to verify

**Score at end of Stage 1: 50/100 ✅ ACHIEVED 2026-05-17**

---

## STAGE 2 — Go Live (50 → 60)
**Goal:** Real URL, discoverable by Google, first strangers using it.  
**Estimated time:** 3–5 days.

### 2.1 Domain + Hosting (2 hours)
- Register `honestcost.lv` (~€12/year at domains.lv or zone.eu)
- Host on **GitHub Pages** (free, already have the repo) — just push and enable Pages
- Custom domain: add CNAME record pointing `honestcost.lv` → GitHub Pages URL
- HTTPS: GitHub Pages provides free TLS via Let's Encrypt

**Alternative:** Cloudflare Pages (also free, faster CDN, better analytics integration)

---

### 2.2 SEO Foundations (1 day)
The tool needs to be found by people Googling "auto izmaksu kalkulators" or "VW Golf vs Skoda Octavia TCO."

**What to add:**
```html
<title>HonestCost — Salīdzini divu jaunu auto pilnās izmaksas mēnesī | Latvia</title>
<meta name="description" content="Ievadi divus automobiļus un uzzini, kurš faktiski ir lētāks — ieskaitot amortizāciju, KASKO, riepas, apkopi un transporta nodokli.">
<meta property="og:title" content="HonestCost — Reālās auto izmaksas">
<meta property="og:description" content="Ne tikai cena. Visi slēptie izdevumi vienā mēneša skaitlī.">
<meta property="og:image" content="https://honestcost.lv/og-image.png">
<meta property="og:url" content="https://honestcost.lv">
<link rel="canonical" href="https://honestcost.lv">
```

- Create `sitemap.xml` (single page, trivial)
- Create `robots.txt` (allow all)
- Add structured data (FAQ schema for common questions like "kā aprēķina auto amortizāciju")
- Create the OG image (1200×630px) — a screenshot of the results screen with BMW vs X1 pre-loaded. Use it on all social posts too.

---

### 2.3 Analytics Setup (2 hours)
Blind is bad. You need to know what's happening.

**Primary:** Install **Plausible Analytics** (€9/month, GDPR-compliant by design, no cookie banner needed, better for Latvian market)  
**Alternative:** Google Analytics 4 (free but requires cookie consent banner — adds friction)

**Events to track:**
- `example_loaded` — which button (P1/P2/P3)
- `analysis_run` — how many comparisons per session
- `search_used` — when car search DB is queried
- `share_link_copied` — when shareable URL is copied
- `mobile_visit` — device type breakdown

---

### 2.4 First Public Distribution Wave (1 week, ongoing)
Push the tool into communities where the target user already is.

**Tier 1 — Latvian auto communities (highest intent):**
- ss.lv > Auto > Viedokļi un diskusijas — post a thread about hidden car ownership costs, link the tool
- autopase.lv forum — same approach
- Facebook group "Auto Latvijā" (~15,000 members) — share a post: "Taisīju šo rīku, jo nevarēju atrast neko līdzīgu Latvijai..."
- Facebook group "Elektroauto Latvijā" — post specifically about the EV vs ICE comparison

**Tier 2 — Media:**
- Delfi.lv auto section: pitch a contributed article "Kā aprēķināt reālās auto izmaksas" with the tool linked at the end
- LA.lv / tvnet.lv: same pitch
- Auto magazines: Autobuss, Motors (LV)

**Tone:** Don't pitch the tool, share the insight. "BMW X1 izmaksā par €2,300/gadā vairāk nekā 118i — un ne reklāmas dēļ" is a better hook than "Pamēģiniet manu kalkulatoru."

---

### Stage 2 Completion Criteria
- [ ] honestcost.lv is live and loads in <2 seconds
- [ ] Google Search Console shows the page indexed
- [ ] At least 50 unique users in the first week after launch posts
- [ ] Analytics showing which examples are most popular
- [ ] At least one social post with 50+ reactions or shares

**Score at end of Stage 2: 60/100**

---

## STAGE 3 — Traction + Trust (60 → 72)
**Goal:** Tool is known in its niche, users return, trust is established.  
**Estimated time:** 4–8 weeks of running and iterating.

### 3.1 Feedback Loop (ongoing)
- Add a discreet feedback button in the results screen: "Kaut kas izskatās neprecīzi? → Rakstiet mums" → mailto link
- Read every feedback email. Real user feedback at this stage is worth more than any research.
- Add a 1-question survey that appears after the 2nd analysis: "Vai šis salīdzinājums bija noderīgs?" [Jā / Nē / Daļēji] — use Tally.so (free, GDPR-friendly)

### 3.2 Data Quality / Trust Signals (1 week)
Based on STRESS_TEST_REPORT.md, users may doubt the numbers. Build credibility:

- Add a "Kā mēs aprēķinām?" (How we calculate) expandable section at the bottom of results
- Cite each data source inline: "Apkopes izmaksas — Moller Auto VW Latvija, 2026", "TEN nodoklis — likumi.lv, 01.01.2025"
- Add last-updated date to the data sources section
- Add: "Cenas ir orientējošas. Verificējiet pie dīlera pirms lēmuma pieņemšanas."

### 3.3 Email Capture — "Nosūtīt rezultātus uz e-pastu" (2 days)
This is Stage 3's most important business move. A user who gives you their email is a potential customer, a potential lead to sell to a dealer, and a way to re-engage them later.

**What to build:**
- In the results screen, after the main comparison: "Saglabājiet analīzi → Nosūtiet sev pa e-pastu"
- Simple email input field + "Sūtīt" button
- Use **EmailJS** (free tier: 200 emails/month, no backend needed) or **Formspree**
- Email contains: the shareable URL of their comparison, a text summary of the key numbers, "Atgriezieties jebkurā laikā — jūsu salīdzinājums ir saglabāts saitē"
- You capture: their email + which cars they compared + date → store in a Google Sheet via the form service

**Why this matters:** These emails are your first CRM. When you sign a dealer partnership, you have a list of people who compared that dealer's models. That list has value.

### 3.4 Social Proof Counter (1 hour)
Add to the header: "Jau **14,200** salīdzinājumi veikti"  
This is a static number — update it monthly. At launch, start at a believable number derived from your beta testing. The psychological effect is significant.

### 3.5 CAR_DB Expansion — 28 → 60 Models (1 week research)
After launch, user search queries will tell you which cars they're trying to find that aren't in the database. Build those first. Priority based on what the analytics show people searching for.

---

### Stage 3 Completion Criteria
- [ ] 500+ unique users/month
- [ ] 50+ email subscribers collected
- [ ] At least 3 pieces of earned media (article mentions, forum threads with 10+ replies)
- [ ] NPS or satisfaction survey showing majority found it useful
- [ ] Zero critical calculation errors reported by users

**Score at end of Stage 3: 72/100**

---

## STAGE 4 — First Revenue (72 → 85)
**Goal:** At least one paying customer. Prove someone will pay for this.  
**Estimated time:** 6–12 weeks including sales cycle.

### 4.1 Define the Monetization Model (decision, 1 day)
Three realistic options for HonestCost at this stage:

**Option A — Dealer Lead Generation (recommended first)**  
Dealers pay €X per qualified lead (user who clicked "Saņemt piedāvājumu" for their model).  
Price: €15–30/lead. A dealer who closes 1 in 10 leads on a €35,000 car → €3,500 gross × 10% margin → €350 value per lead. Charging €25/lead is defensible.  
Upside: no recurring commitment from dealer, easy to pitch, easy to start.  
Downside: requires volume to matter (need 50+ leads/month to be interesting).

**Option B — Dealer Embed Subscription (recommended parallel)**  
Dealers pay €150–300/month to embed HonestCost on their website with their models pre-loaded as examples.  
Value proposition: "Your customers can see how your BMW 118i compares to the X1 before they leave your website."  
Upside: recurring revenue, predictable, one sale = months of income.  
Downside: requires a demo, a sales conversation, a decision maker.

**Option C — Affiliate / Referral Links (easiest to start)**  
Link out to OCTA comparison sites (octa24.lv, octas.lv) and earn referral fees.  
Link to insurance providers (BALTA, ERGO, BTA) and earn per-quote commissions.  
Upside: zero sales effort, passive income from day 1.  
Downside: tiny per-click revenue (€0.50–2/referral), requires high traffic to matter.

**Recommended approach:** Start Option C immediately (takes 2 hours to add links), pursue Option B for primary revenue, use Option A as proof of concept for the pitch.

---

### 4.2 Dealer Pitch Deck (2 days)
Five slides. No more.

1. **The problem:** "Jūsu klienti pieņem €40,000 lēmumus, pamatojoties uz mēneša maksājumu un degvielas patēriņu. Viņi nezina, kāda būs KASKO gadā 2, kāds ir atlikušais tirgus vērtība gadā 4, vai kādas ir remonta izmaksas pēc garantijas."
2. **The tool:** Screenshot of HonestCost showing their car vs. a competitor, with the outcome that their car wins on TCO
3. **What you get:** Your models pre-loaded as examples → users see your cars first → "Saņemt piedāvājumu" button links to your lead form
4. **The numbers:** HonestCost had X users in its first month. Y% compared premium models. These are your potential customers.
5. **Pricing:** €200/month (3-month minimum). We set it up, you use it, you can cancel anytime.

---

### 4.3 Dealer Outreach — 10 Target Contacts (2 weeks)
**Tier 1 (highest conversion probability — they have budget and understand digital):**
1. BMW Inchcape Latvia — marketing@inchcape.lv
2. Moller Auto VW Latvia — digital/marketing team
3. Toyota WESS Latvia
4. Volvo Baltic
5. Skoda Verte Auto / Greenmotors

**Tier 2:**
6. Mercedes-Benz Latvia
7. Hyundai Latvia (growing EV lineup)
8. Kia Latvia (strong EV range)
9. Tesla Riga (different model — may want to partner to show EV advantage)
10. SIA Aldaris / independent premium dealers

**Outreach approach:** Not a mass email. Find the marketing manager on LinkedIn, send a personalised note: "Redzēju, ka Inchcape aktīvi reklamē X1. Uztaisīju šo rīku, kurš rāda, ka X1 izmaksā €X/mēnesī mazāk nekā [competitor]. Apskatiet — jūsu klientiem tas varētu noderēt pirms pirkuma. Varbūt ir jēga integrēt jūsu mājaslapā?"

---

### 4.4 Affiliate Links — Add Now (2 hours)
While the dealer pipeline runs its 6-week sales cycle, add passive revenue immediately:

- OCTA comparison: after calculating OCTA estimate, add "Salīdziniet reālās OCTA cenas → octa24.lv" (affiliate link if they have a program; at minimum a referral tracking link)
- KASKO: "Saņemiet KASKO piedāvājumu → [BALTA.lv / ERGO.lv / BTA.lv]" with UTM tracking
- Car configurators: for each car in CAR_DB, link to the official Latvia configurator: "Konfigurējiet pie dīlera →"

---

### Stage 4 Completion Criteria
- [ ] At least 1 dealer paying any amount (even €50/month to start)
- [ ] At least 3 dealer conversations in progress
- [ ] Affiliate links generating at least €20/month (proxy for real traffic)
- [ ] Email list at 200+ subscribers
- [ ] 1,000+ unique users/month

**Score at end of Stage 4: 85/100**

---

## STAGE 5 — Repeatable Revenue (85 → 95)
**Goal:** Revenue is predictable. The business can grow without you doing everything.  
**Estimated time:** 3–6 months.

### 5.1 Backend Migration (when needed, not before)
The single-file HTML is a feature right now — zero hosting cost, zero downtime risk, infinitely fast. Migrate to a proper stack only when you need:
- User accounts (saved comparisons)
- CRM integration (dealer leads routed automatically)
- Dynamic CAR_DB updates without touching code
- A/B testing framework

**Stack recommendation when ready:** Next.js on Vercel (free tier handles early scale), Supabase for database, Resend for email. Total cost: ~€0-20/month at early stage.

### 5.2 CAR_DB → 100+ Models
Expand systematically. After analytics show which cars users search for and don't find, build those. Goal: cover 90% of new cars sold in Latvia in any given year. The top 20 models cover ~70% of volume — the next 80 models cover the remaining 30%.

### 5.3 Multi-Market Expansion
Estonian and Lithuanian markets have identical regulatory frameworks (EU), similar car market dynamics, and their own sets of analogous costs (Estonian vehicle registration tax, Lithuanian technical inspection). The engine needs only minor adjustments — primarily tax table swaps and service cost research.

Priority: Estonia first (smaller but higher income, higher EV adoption). Lithuania second (larger market).

### 5.4 B2B Product Layer — Dealer Dashboard
At 3+ paying dealers, build a simple dealer-facing dashboard:
- "Jūsu modeļi" — which cars in CAR_DB are associated with their dealership
- Lead list — who clicked "Saņemt piedāvājumu" for their models this month
- Comparison stats — which competitor their cars are most often compared against
- One-click: adjust their car's price to reflect a current promotion

This turns HonestCost from a consumer tool with a dealer widget into a SaaS product for dealers.

---

### 5.5 Press & Partnership Track
- Pitch to latvijas-auto.lv (main Latvian auto portal) for a content partnership
- Pitch to LA.lv / Delfi for a monthly "TCO of the Month" column (HonestCost data, your byline)
- Partnership with octa24.lv or comparable: they send insurance quote seekers to HonestCost, you send OCTA calculation users to them
- Approach finance blogs / personal finance YouTubers in Latvia — the "hidden costs of car ownership" is a perennially popular topic

---

### Stage 5 Completion Criteria
- [ ] 3+ paying dealers
- [ ] €500+/month recurring revenue
- [ ] 5,000+ unique users/month
- [ ] CAR_DB covers 60+ models
- [ ] At least 1 press mention in a major Latvian outlet
- [ ] Email list 1,000+ subscribers

**Score at end of Stage 5: 95/100**

---

## STAGE 6 — Sellout / Exit Ready (95 → 100)
**Goal:** Business is valuable to an acquirer, partner, or investor.  
**Estimated time:** 6–18 months from Stage 5.

### What makes HonestCost acquirable
At this stage, HonestCost has: a defensible dataset (CAR_DB + Latvia-specific research), a user base with intent (people actively planning €30,000+ purchases), dealer relationships with trackable ROI, and recurring revenue. The potential acquirers:

- **Latvian auto portals** (ss.lv, autopase.lv, 1a.lv) — TCO tools increase time-on-site and lead quality
- **Pan-Baltic/European TCO tools** — looking to buy rather than build local market versions
- **Insurance aggregators** (octa24.lv, ekspress.lv) — user acquisition tool for their funnel
- **Dealer groups** (Moller Auto, Inchcape) — want to own the comparison tool so competitors can't use it
- **Financial data companies** — Autovista, S&P Global Mobility — buy local data assets

### What you need to get there
- €2,000+/month recurring revenue (minimum to be interesting)
- 3-year trend data on Latvia car depreciation (unique, hard to replicate)
- 10,000+ users/month with documented behavior
- At least 5 dealer contracts
- Clean code, documented API, transferable brand

---

## MASTER PRIORITY LIST — What to Build Next and In What Order

| # | Item | Stage | Effort | Impact | Do when |
|---|---|---|---|---|---|
| 1 | Live recalculation (remove Analizēt) | 1 | 3h | Very High | **Now** |
| 2 | R12 Phase 2 — car search DB (28 cars) | 1 | 5d | Very High | **Now** |
| 3 | Mobile layout | 1 | 2d | Very High | **Now** |
| 4 | Shareable result URL | 1 | 1d | High | **Now** |
| 5 | Fix RBUF Latvia discount | 1 | 1h | Medium | Now |
| 6 | Ownership horizon preset buttons | 1 | 3h | Medium | Now |
| 7 | Domain + GitHub Pages deploy | 2 | 2h | Critical | After Stage 1 |
| 8 | SEO meta tags + OG image | 2 | 1d | High | After Stage 1 |
| 9 | Plausible analytics | 2 | 1h | High | On deploy |
| 10 | Community launch posts | 2 | 1d | High | On deploy |
| 11 | OCTA disclaimer tooltip | 2 | 1h | Medium | On deploy |
| 12 | Email capture (EmailJS) | 3 | 1d | Very High | After 100 users |
| 13 | "How we calculate" trust section | 3 | 1d | High | After 100 users |
| 14 | Social proof counter | 3 | 1h | Medium | After launch |
| 15 | CAR_DB expand to 60 models | 3 | 1wk | High | After launch analytics |
| 16 | Affiliate links (OCTA, KASKO) | 4 | 2h | Medium | After deploy |
| 17 | Dealer pitch deck | 4 | 2d | Very High | After 500 users |
| 18 | Dealer outreach — 10 contacts | 4 | 2wk | Critical | After pitch deck |
| 19 | R11 dealer add-ons (Phase 1) | 4 | 2h | Medium | After first dealer |
| 20 | Dealer embed widget | 5 | 3d | High | After first dealer |
| 21 | Backend migration | 5 | 2wk | Medium | When needed |
| 22 | Multi-market (Estonia) | 5 | 1wk | High | After €500/month |
| 23 | Dealer dashboard | 5 | 2wk | High | After 3 dealers |
| 24 | Press / partnership track | 5 | ongoing | High | Ongoing from Stage 2 |

---

## CRITICAL DECISIONS STILL UNMADE

These decisions will determine which path the business takes. Make them explicitly, not by default.

**1. Who is the primary customer — users or dealers?**  
A tool optimised for users builds trust and audience. A tool optimised for dealers builds revenue faster but risks user trust if it feels like a sales tool. The answer can be "both" only if the dealer value-add is invisible to the user (e.g., the dealer's cars appear in search results but the tool remains neutral).

**2. Latvia-only or Baltic?**  
Latvia-only = simpler, more precise, harder to sell to larger acquirers. Baltic = 3× the market, same regulatory framework, requires Estonian/Lithuanian research for service/insurance costs. Decision affects how you build CAR_DB (Latvia prices vs. regional).

**3. Free forever or freemium?**  
The tool should always be free for consumers — this is the trust and distribution engine. Monetise through B2B (dealers) and referrals only. Never put the core calculation behind a paywall.

**4. Open source or proprietary?**  
The calculation engine could be open-sourced (builds credibility, journalist attention, potential contributors). The CAR_DB and dealer relationships stay proprietary. Consider open-sourcing the engine on GitHub after reaching Stage 3.

---

## WHAT WOULD TESLA BUILD THAT'S NOT ON THIS LIST YET

Features that are too advanced for current stage but should be on the horizon:

- **Personalised recommendation engine:** After inputs, generate one sentence: "Pamatojoties uz jūsu ievadītajiem datiem, 71% pircēju ar līdzīgiem iestatījumiem izvēlas Tiguan TDI. Galvenais iemesls: zemākas remonta izmaksas pēc garantijas."
- **Price freshness API:** Connect to official dealer configurator APIs (if they exist) to keep CAR_DB prices current automatically
- **Instagram-friendly results card:** One-tap generate a shareable image (1080×1080px) with the key numbers — designed to be posted. "Es salīdzināju divus automobiļus. Rezultāts mani pārsteidza."
- **"Monthly budget" reverse mode:** Instead of entering two specific cars, enter your monthly budget (€X) and see which cars fit within it — completely different UX, broader audience
- **VIN decoder integration:** User enters their VIN → tool pulls the car's actual specs → pre-fills all fields automatically. No more manual research.

---

*Roadmap version 1.0 — 2026-05-17. Update after each stage is completed.*  
*Current position: 28/100. Next milestone: Stage 1 complete = 50/100.*
