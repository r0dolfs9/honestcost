# HonestCost — Business Structure Tasks

**Goal:** Take Business Structure score from 12/80 → 80/80.
**Total time:** ~40 hours of your time spread over 60 days + ~€200 in tooling.
**Risk if skipped:** Single-point-of-failure (you), no financial visibility, no second opinion, repeating learnable mistakes, no leverage when an acquirer or partner shows up.

> **Cross-references:** The "register SIA" item lives in `LEGAL_TASKS.md` (Tier 1 #1.1). It earns points in BOTH categories but only needs to be done once.

---

## TIER 1 · MUST do before first dealer payment (financial visibility)

You cannot run a business you can't measure. These three items give you the operating dashboard.

### 1.1 · Build an 18-month financial model
- **Why:** You don't know your break-even, your runway, or what you can pay yourself. "Hope for €500 MRR" is not a plan. A simple spreadsheet answers: at what dealer count am I profitable? What's my hourly rate hidden in this project? When do I bring on help?
- **How:**
  1. Create a Google Sheet with 18 monthly columns.
  2. Rows:
     - **Revenue:** dealer count × €200 + overage leads + affiliate
     - **Variable costs:** payment processor fees (Stripe 1.4% + €0.25), VAT pass-through (note: VAT is collected for the state, not income)
     - **Fixed costs:** domain (€12/yr), iubenda (€27/yr), insurance (€250/yr), accounting (€480/yr), bank fees (€60/yr), email (€72/yr), Plausible (free → €9/mo at scale)
     - **Your time:** hours per week × €25–50/hr opportunity cost
     - **Investment:** trademark (€120), lawyer (€200), one-off setup costs
  3. Three scenarios in separate tabs: **pessimistic** (1 dealer signs), **realistic** (3 dealers by month 6), **optimistic** (10 dealers + 1 B2B2C license)
  4. Plot a chart: cumulative profit/loss line + dealer count bars.
- **Time:** 4 hours one-time + 30 min/month update.
- **Cost:** €0 (Google Sheets).
- **Result:** You stop guessing. Decisions become "the model says yes/no".
- **Points:** +8

### 1.2 · Set up accounting + monthly bookkeeping rhythm
- **Why:** A SIA must file annual financial statements (annotācija) with the Register of Enterprises. Late = fines start at €100. Monthly VAT reports are mandatory once registered. You cannot DIY this without burning 4 hours/month on a spreadsheet you'll hate.
- **How:**
  1. Pick: **Jumis** (LV-native, ~€20/month), **Zoho Books** (~€10/month, less LV-localized), or **iZettle/SumUp accounting** (free, basic).
  2. Connect your bank account for auto-import.
  3. Hire a part-time bookkeeper or accountant for monthly close. LV market rate: **€40–€80/month** for a SaaS with <50 transactions/month. Find via [grāmatvedis.lv](https://www.gramatvedis.lv/).
  4. They handle: monthly VAT report, annual financial statements, payroll if/when you hire.
- **Time:** 2 hours setup + 1 hour/month sending receipts.
- **Cost:** €40–€80/month for the accountant + €0–€20/month software.
- **Tip:** Most freelance LV accountants will quote €40 flat for a "calm month" — set expectations early.
- **Points:** +5

### 1.3 · Define your hourly rate + opportunity cost
- **Why:** Founders systematically work for free without realizing it. If your day-job pays €30/hr and HonestCost takes 15 hrs/week to break even at €200/month MRR — you're losing €1,500/month vs working those hours elsewhere. You need to know this so the decision is conscious, not invisible.
- **How:**
  1. Pick a defensible rate: minimum = current job's hourly. Mid = LV freelance dev rate (€40/hr). High = your dream rate (€80/hr).
  2. Add a row to the financial model that subtracts (hours_worked × rate) from profit.
  3. Re-run scenarios. Many show "negative for 12 months". That's OK if you're investing — but you need to SEE it.
- **Time:** 30 minutes.
- **Cost:** €0.
- **Points:** +4

**Tier 1 subtotal: +17 points. Running: 29/80.**

---

## TIER 2 · SHOULD do before month 6 (leverage + learning)

These items 10× your decision quality. None are blockers — but skipping them is how solo founders burn out.

### 2.1 · Find one advisor / sounding board
- **Why:** First-time founders make every mistake. A monthly coffee with someone who has shipped a B2B SaaS in Latvia compresses 18 months of trial-and-error into a 1-hour conversation.
- **How:**
  1. Make a list of 10 Latvian founders / operators you respect. Sources: [Latvian Startup Association](https://startin.lv/), [LinkedIn](https://www.linkedin.com/search/results/people/?keywords=%22founder%22%20%22latvia%22), past success stories at [Labs of Latvia](https://labsoflatvia.com/).
  2. Cold message 5: *"I'm building a Latvian car-TCO tool. I'd love to buy you a coffee and ask 30 minutes of B2B SaaS questions. Not asking for money or commitment."*
  3. Expected response rate: 30–40%. Pick the best one.
  4. Cadence: 1 hour every 4–6 weeks. Bring 3 specific questions each time.
- **Time:** 2 hours outreach + 1 hour/month.
- **Cost:** €0 (coffee).
- **Result:** Hard problems get answered in 5 minutes instead of 5 days.
- **Points:** +6

### 2.2 · Customer interview log
- **Why:** You're building based on what you THINK Latvian car buyers want. 10 interviews in week 1 would have changed the priority list. Do them now to course-correct before scaling.
- **How:**
  1. Recruit 10 people who bought a new or near-new car in the last 12 months. Sources: your network, Facebook groups, dealer referrals.
  2. 30-minute call each. Ask:
     - Walk me through your last car decision, day by day.
     - What did you compare? Where did you look?
     - What surprised you 6 months in?
     - Would you have paid for a better tool? How much?
  3. Take notes verbatim — record with permission, transcribe via [Whisper](https://openai.com/research/whisper) or [Otter.ai](https://otter.ai/).
  4. Synthesize: 5 themes that came up >3 times.
- **Time:** 10 hours total (recruit + interview + synthesize).
- **Cost:** €0 (you can offer a €10 coffee voucher per interview = €100).
- **Result:** Your roadmap becomes evidence-based.
- **Points:** +6

### 2.3 · Half-page competitive analysis
- **Why:** When a dealer asks "how are you different from autoplius.lv or 1a.lv?", you need an answer. When ss.lv pivots into TCO, you need to know what your moat is.
- **How:**
  1. List 5 LV competitors: ss.lv, autoplius.lv, 1a.lv, [latio.lv](https://www.latio.lv/), dealer-specific calculators.
  2. Half a page per competitor:
     - What they do well
     - Gap that lets you win
     - Plausible counter-move if they copy you
  3. Single summary slide: "Your moat = data depth + dealer relationships + LV-specific tax math. They'd need 12 months to catch up."
- **Time:** 4 hours.
- **Cost:** €0.
- **Points:** +5

### 2.4 · Single-page "if you got hit by a bus" handover doc
- **Why:** Bus factor of 1 = if you're sick, hospitalized, or burnt out, the project stops. Even at this stage, write a doc that lets someone else operate the project for a week without you.
- **How:**
  1. Sections:
     - Domain: registered at X, login Y, expires Z
     - GitHub: account, repo URL, admin access
     - Plausible / EmailJS / MailerLite: accounts + recovery
     - Bank: account number, online banking access (in sealed envelope at home)
     - Tax: VAT login, accountant contact, next filing date
     - Dealer customers: contact list, contract dates, payment schedule
  2. Save as `HANDOVER.md` (encrypted with a passphrase OR locked in a physical safe).
  3. Share knowledge of its location with ONE trusted contact (spouse, sibling).
- **Time:** 2 hours.
- **Cost:** €0.
- **Result:** Project survives one sick week without you. Cheap insurance.
- **Points:** +5

### 2.5 · IP assignment to yourself
- **Why:** Right now your SIA owns the brand but YOU (private person) wrote the code. If the SIA is ever sold or sued, ambiguity about who owns what is expensive. Even sole-prop founders should formalize.
- **How:**
  1. After SIA registration, sign a 1-page **IP Assignment Agreement**: "I, [your name], assign all IP rights in HonestCost source code created before [SIA founding date] to SIA HonestCost in exchange for [your share class]."
  2. Standard template available at [legaldraft.lv](https://www.legaldraft.lv/) or via your lawyer (covered by same fee in `LEGAL_TASKS.md` #2.1).
  3. Store with company documents.
- **Time:** 1 hour.
- **Cost:** €0 (covered in legal lawyer fee).
- **Points:** +4

**Tier 2 subtotal: +26 points. Running: 55/80.**

---

## TIER 3 · WITHIN 6 MONTHS (depth + diversification)

By this point you have data, customers, and patterns. Tier 3 turns them into compounding assets.

### 3.1 · CAC tracking sheet
- **Why:** "12 pitches → 1 close" gives you a literal Customer Acquisition Cost in hours. Track it. Optimize it. CAC > LTV = death; CAC < LTV/3 = ready to scale.
- **How:**
  1. Spreadsheet with columns: dealer name, first-touch date, hours invested, outcome (won / lost / pending), payback period.
  2. Calculate: average hours per won deal × your hourly rate = CAC.
  3. Compare to: average revenue per dealer × 18-month retention = LTV.
- **Time:** 1 hour setup + 5 min per dealer touch.
- **Cost:** €0.
- **Points:** +4

### 3.2 · LESSONS.md
- **Why:** Future-you will repeat past mistakes without a record. A 20-line LESSONS.md after each big decision compounds into the best founder document you own.
- **How:**
  1. Format per entry:
     ```
     ## 2026-06-12 — Tried Reddit launch, got 8 upvotes, 2k views.
     **What I expected:** 100+ upvotes based on r/latvia size.
     **What happened:** Timing (Sun afternoon) was wrong; title was too clinical.
     **Lesson:** Latvian Reddit prefers conversational, evening posts.
     **Next time:** A/B test post times.
     ```
  2. Write entries within 48h of the experience — by week 4 you forget the nuance.
- **Time:** 15 min per entry, ~2 entries/week.
- **Cost:** €0.
- **Result:** Years from now, this is the most-valuable file in the project.
- **Points:** +6

### 3.3 · Define exit horizon
- **Why:** Even side projects benefit from a written sunset clause. "If I'm not at €5k MRR by month 24, I'll pivot or sell." Otherwise the project drifts forever and you never reclaim the time.
- **How:**
  1. One paragraph in `PROJECT_STATUS.md`:
     *"If MRR < €X by month 24, I will evaluate: (a) sell to a dealer-group competitor for 2.5–4× revenue, (b) wind down with 30-day customer notice, (c) re-strategize for 6 months and re-evaluate."*
  2. Set a calendar reminder for month 22 to re-read.
- **Time:** 30 minutes.
- **Cost:** €0.
- **Points:** +3

### 3.4 · Revenue diversification map
- **Why:** 3 dealers paying €200 each = €600 MRR. If one churns, that's a 33% revenue hit. Single product, single channel, single customer-type. Map secondary sources to derisk.
- **How:**
  1. Brainstorm 5–10 alternative revenue paths:
     - Sponsored "data drop" reports (auto industry analytics)
     - White-label license to one bank (BTA, BALTA, ERGO portal)
     - Sponsored "best EV for your situation" widget on dealer site
     - Paid newsletter for car buyers
     - Affiliate commission with leasing brokers
     - One-off premium services (custom comparisons for fleet buyers)
  2. Rank by effort (1-5) and revenue potential (1-5). Pick top 2 to pre-validate.
- **Time:** 2 hours.
- **Cost:** €0.
- **Points:** +4

### 3.5 · Partnership / revenue-share legal template
- **Why:** When (not if) a dealer-group, leasing broker, or finance portal asks "can we revshare on referred leads?", you need a 1-page template ready, not a 2-week lawyer cycle.
- **How:**
  1. Generic structure: party A refers users to party B, party B pays X% of revenue for Y months.
  2. Required clauses: tracking method, payment schedule, termination, IP, GDPR.
  3. Lawyer review covered by `LEGAL_TASKS.md` #2.1 — give them this template at the same time.
- **Time:** 1 hour drafting.
- **Cost:** €0 (covered in legal lawyer fee).
- **Points:** +3

### 3.6 · Month-24 succession plan
- **Why:** If HonestCost hits €5k MRR at month 24, you have 4 paths: (1) stay solo, (2) hire your first employee, (3) sell, (4) raise. Each has 6 months of prep work. Pick early so you can prepare.
- **How:**
  1. One page in `PROJECT_STATUS.md`:
     - At €5k MRR, my preference is [path X] because [why].
     - Six-month prep checklist for [path X].
  2. Update annually.
- **Time:** 1 hour.
- **Cost:** €0.
- **Points:** +4

**Tier 3 subtotal: +24 points. Running: 79/80. Plus margin from compounding = effective 80+.**

---

## EXECUTION CALENDAR · 60-DAY PLAN

| Week | Tasks | Notes |
|---|---|---|
| **W1** | 1.1 Financial model · 1.3 Hourly rate | Pre-SIA — does not require entity |
| **W2** | Wait on SIA → 1.2 Accountant hire | Start interviewing bookkeepers |
| **W3** | 2.1 Advisor outreach (5 cold DMs) | Long-tail; replies trickle in |
| **W3** | 2.3 Competitive analysis | Half-day focused work |
| **W4** | 2.4 Bus-factor handover doc | Saturday afternoon |
| **W5** | 2.5 IP assignment (with lawyer) | Bundled with `LEGAL_TASKS.md` #2.1 |
| **W6** | 2.2 Customer interviews 1–3 | Start the outreach now |
| **W7** | 2.2 Customer interviews 4–7 | |
| **W8** | 2.2 Customer interviews 8–10 + synthesis | |
| **W9** | 3.1 CAC sheet · 3.4 Revenue diversification | Quick wins |
| **W10** | 3.5 Partnership template + lawyer | Bundle with prior lawyer touch |
| **W11** | 3.2 LESSONS.md kickoff (backfill 3 entries) | Routine starts here |
| **W12** | 3.3 Exit horizon · 3.6 Succession plan | Reflection week |

---

## WHEN TO USE PROFESSIONALS

| Task | DIY | Hire | Reason |
|---|:--:|:--:|---|
| Financial model | ✅ | | Spreadsheets are simple; you need to UNDERSTAND it |
| Bookkeeping | | ✅ | €40/mo accountant pays back 4× in your time |
| VAT filing | | ✅ | Same — bundled with accountant |
| Annual financial statement | | ✅ | Mandatory, error-prone, accountant handles |
| Advisor sourcing | ✅ | | Cold outreach is the whole point |
| Customer interviews | ✅ | | You learn nothing if you outsource |
| Competitive analysis | ✅ | | Insider knowledge required |
| LESSONS.md | ✅ | | Has to be your voice |
| IP assignment | | ✅ | Lawyer-reviewed once = forever-safe |
| Partnership template | partial | ✅ | Draft yourself, lawyer reviews |

**Total professional hours needed: ~6 hours over project lifetime.**

---

## TOTAL COST SUMMARY

| Item | One-time | Recurring |
|---|---:|---:|
| Accounting software (Jumis / Zoho) | — | €0–240/yr |
| Bookkeeper / accountant | — | €480–960/yr |
| Customer interview vouchers (10 × €10) | €100 | — |
| Advisor coffees (~6/yr × €5) | — | €30/yr |
| **TOTAL** | **~€100** | **~€510–1,230/yr** |

The biggest investment is **your time, not money**. ~40 hours over 60 days gets you from 12 → 80.

---

## QUICK-REFERENCE CHECKLIST (for Claude Code)

```markdown
## Tier 1 · Before first dealer payment
- [ ] Build 18-month financial model (Google Sheets, 3 scenarios)
- [ ] Hire bookkeeper / set up accounting software (Jumis / Zoho)
- [ ] Define hourly rate + add to financial model

## Tier 2 · Before month 6
- [ ] Cold-DM 5 LV B2B SaaS founders for advisor coffees
- [ ] Recruit + interview 10 recent new-car buyers
- [ ] Half-page competitive analysis (ss.lv, autoplius, 1a.lv, latio, dealer calcs)
- [ ] Single-page "hit by a bus" handover doc → HANDOVER.md
- [ ] IP assignment from private person → SIA (bundled with legal lawyer touch)

## Tier 3 · Within 6 months
- [ ] CAC tracking spreadsheet (per-dealer hours invested)
- [ ] LESSONS.md routine (2 entries / week, within 48h)
- [ ] Exit horizon paragraph in PROJECT_STATUS.md
- [ ] Revenue diversification map (rank top 10 alternatives)
- [ ] Partnership / revshare 1-page template (with lawyer)
- [ ] Month-24 succession plan
```

— Generated 2026-05-26.
