# HonestCost — Combined Execution Plan

**Scope:** the 42 tasks across `LEGAL_TASKS.md` · `BUSINESS_TASKS.md` · `OPERATIONS_TASKS.md`, sequenced into a single 90-day flow with dependencies respected.

**Audit impact:** Legal 5→80 · Business 12→80 · Operations 15→80. Project score moves from 522 → ~730.

**Total investment:**
- Your time: ~108 hours over 90 days (≈9 hrs/week)
- One-time spend: ~€635
- Recurring spend: ~€940–1,660/year (mostly accountant + insurance)

---

## THE FLOW · 90 days at a glance

```
WEEK 1  ┌─ Quick wins (no SIA needed) ───────────────┐  Cost: €27
        │ • Calc tests   • Sentry       • Uptime     │  Time: ~12h
        │ • Financial model • Hourly rate • Privacy  │
        │   policy draft • EmailJS swap • LICENSE    │
        └─ SIA registration FILED on day 1 ──────────┘

WEEK 2  ┌─ Waiting on SIA registry (5-7 days) ──────┐  Cost: €0
        │ • Tos draft  • Cookie notice  • CI         │  Time: ~10h
        │ • Status page  • Customer interview        │
        │   recruiting  • Bookkeeper outreach        │
        └────────────────────────────────────────────┘

WEEK 3  ┌─ SIA ACTIVE → unlock entity-dependent items┐  Cost: €165 + €40/mo
        │ • Business bank   • Hire bookkeeper        │  Time: ~10h
        │ • VAT registration • Lawyer touch (bundle: │
        │   contract review + DPA + IP assignment +  │
        │   partnership template)                    │
        └────────────────────────────────────────────┘

WEEK 4  ┌─ Operational maturity ────────────────────┐  Cost: €0
        │ • Staging env   • Feature flags  • CSP     │  Time: ~10h
        │ • Accessibility audit + statement          │
        │ • Bus-factor handover doc                  │
        └────────────────────────────────────────────┘

WEEKS   ┌─ Distribution + customer research ────────┐  Cost: ~€350
5-8     │ • 10 customer interviews (1-3 per week)   │  Time: ~28h
        │ • Advisor coffees (3 done by W8)          │
        │ • FAQ writing  • Competitive analysis     │
        │ • Insurance quotes + signed               │
        └────────────────────────────────────────────┘

WEEKS   ┌─ Compounding investments ─────────────────┐  Cost: €120
9-12    │ • Trademark filing • CAC tracking        │  Time: ~38h
        │ • Lazy-load car-db • Cloudflare front     │
        │ • Microsoft Clarity • Lighthouse CI       │
        │ • i18n EN/RU • LESSONS.md kickoff         │
        │ • Exit horizon + succession plan          │
        │ • First DR drill                          │
        └────────────────────────────────────────────┘
```

---

## DAY 1 · execute today (4 focused hours)

These don't wait on anything. Start the SIA clock, then do the wins that need no entity.

| # | Task | Source | Time | Output |
|---:|---|---|---:|---|
| 1 | File SIA registration on [latvija.lv](https://latvija.lv) | LEGAL 1.1 | 90 min | Filing receipt; ~5-day wait begins |
| 2 | Build 18-month financial model in Google Sheets (3 scenarios) | BUSINESS 1.1 | 90 min | First view of break-even + your hidden hourly rate |
| 3 | Decide your hourly rate; add to model | BUSINESS 1.3 | 15 min | Conscious cost-of-time |
| 4 | Add LICENSE file + copyright headers to source | LEGAL 3.2 + 3.3 | 30 min | IP ambiguity removed |

**End of day:** SIA clock ticking; you can see if HonestCost is actually a viable business; code legally clarified.

---

## WEEK 1 · DAYS 2-7 (8 focused hours over the week)

Parallel quick-wins while the SIA registry processes. None of these need the SIA to exist.

### Monday-Tuesday — Production hygiene (4 hrs)

**Task: Write `test-calc.js` with 8+ assertions**
- Source: `OPERATIONS_TASKS.md` 1.1
- Steps:
  1. Create `test-calc.js` at project root
  2. Extract calc functions or load via Node
  3. Assert: BMW 118i vs X1 5-yr scenario · TEN edge cases · 0% APR fallback · op-leasing PMT < financial-leasing PMT
  4. Verify: `node test-calc.js` exits 0
- Time: 2 hours

**Task: Sentry + UptimeRobot (free tiers)**
- Source: `OPERATIONS_TASKS.md` 1.2, 1.3
- Steps:
  1. Sign up at [sentry.io](https://sentry.io); copy the snippet into `<head>`
  2. Sign up at [uptimerobot.com](https://uptimerobot.com); add HTTPS + keyword monitor for `honestcost.lv`
  3. Verify both fire test alerts to your email
- Time: 1 hour

**Task: GitHub Actions CI workflow**
- Source: `OPERATIONS_TASKS.md` 1.5
- Steps:
  1. Add `.github/workflows/ci.yml` with `node test-calc.js` + html-validate
  2. Enable branch protection: require CI green before merge
- Time: 1 hour

### Wednesday — GDPR breach removal (2 hrs)

**Task: Swap EmailJS → MailerLite EU**
- Source: `LEGAL_TASKS.md` 1.6
- Steps:
  1. Create MailerLite EU account (free tier, Ireland-hosted)
  2. Get the transactional API key
  3. Replace the 3 `EMAILJS_*` constants in `index.html` with MailerLite equivalents
  4. Update the `sendCap()` function to use the new endpoint
  5. Test by submitting your own email
- Time: 1 hour

**Task: Draft Privacy Policy via iubenda**
- Source: `LEGAL_TASKS.md` 1.3
- Steps:
  1. Subscribe to iubenda Pro (€27/yr)
  2. Select: data controller + LV + EmailJS replaced by MailerLite + Plausible + GitHub Pages
  3. Save the URL but DO NOT publish yet — entity name still pending
  4. Set calendar reminder to update with SIA reg.nr. once active
- Time: 1 hour
- Cost: €27/yr

### Thursday-Friday — Documents that don't need SIA (2 hrs)

**Task: Draft Terms of Service via iubenda**
- Source: `LEGAL_TASKS.md` 1.4
- Time: 30 min (covered by same subscription)

**Task: Cookie & tracking notice page**
- Source: `LEGAL_TASKS.md` 1.5
- Steps: Write a short `/sikdatnes.html` listing what's stored and where; link from footer
- Time: 30 min

**Task: Run WAVE accessibility audit on live site (even pre-deploy)**
- Source: `LEGAL_TASKS.md` 2.5
- Steps:
  1. Open [WAVE](https://wave.webaim.org/) → paste your local file or staging URL
  2. Fix red items; document yellow items in `accessibility.md`
- Time: 1 hour

**End of week 1:** SIA pending · 8 task-file items complete · production hygiene live · GDPR violation removed.

---

## WEEK 2 · still waiting on SIA (8 focused hours)

Use the gap productively. These tasks don't need the entity but DO front-load the work for when it arrives.

### Outreach kickoff (3 hrs Mon-Tue)

**Task: Customer interview recruitment**
- Source: `BUSINESS_TASKS.md` 2.2
- Steps:
  1. Make a list of 30 candidates (your network + LV car FB groups + LinkedIn 2nd-degree)
  2. Send a personalised message to 10: *"30-min call about your last car decision; €10 coffee voucher; no sales"*
  3. Expect 30-40% reply rate; book 4-5 calls
- Time: 2 hours

**Task: Advisor outreach (5 cold DMs)**
- Source: `BUSINESS_TASKS.md` 2.1
- Steps:
  1. Identify 10 LV B2B SaaS founders/operators (Labs of Latvia, LinkedIn, Startin.lv)
  2. Personalised DM to 5: *"Building LV car-TCO tool; would love 30 min coffee for SaaS questions; not asking money"*
- Time: 1 hour

### Bookkeeper hunt (2 hrs Wed)

**Task: Interview 3 LV bookkeepers for monthly retainer**
- Source: `BUSINESS_TASKS.md` 1.2
- Steps:
  1. Search [grāmatvedis.lv](https://www.gramatvedis.lv/) for SaaS-experienced bookkeepers
  2. Brief them: "1-person SIA, ~5 transactions/mo, need monthly VAT + annual statement"
  3. Get 3 quotes; pick the best fit; defer signing until SIA reg.nr. is in hand
- Time: 2 hours

### Operations polish (3 hrs Thu-Fri)

**Task: Status page (static)**
- Source: `OPERATIONS_TASKS.md` 2.1
- Steps: Create `status.html` with "All systems operational" by default
- Time: 30 min

**Task: CSP + security headers**
- Source: `OPERATIONS_TASKS.md` 2.4
- Steps:
  1. Add `<meta http-equiv="Content-Security-Policy">` listing your allowed origins
  2. Verify with [securityheaders.com](https://securityheaders.com)
- Time: 1 hour

**Task: Staging environment**
- Source: `OPERATIONS_TASKS.md` 2.2
- Steps:
  1. Create `staging` branch in GitHub repo
  2. Enable Pages on `staging` branch → assigns `<owner>.github.io/<repo>` subpath
  3. Use this for all changes from now on
- Time: 1.5 hours

**End of week 2:** SIA still pending (5-7 days from W1 Mon = should be active by start of W3) · customer interviews scheduling · advisor pipeline started · staging live.

---

## WEEK 3 · SIA active → unlock entity-dependent items (10 focused hours)

This is the unlock week. Many items have been waiting for the reg.nr.

### Monday — financial backbone (3 hrs)

**Task: Open business bank account**
- Source: `LEGAL_TASKS.md` 1.2
- Steps:
  1. Walk into Swedbank (or your preferred LV bank) branch with SIA registration certificate
  2. Open Business Junior account (€5/mo) OR Citadele Business Start (free Y1)
  3. Get IBAN, online banking access, debit card
- Time: 1.5 hours + 2-3 days for activation

**Task: Sign bookkeeper contract**
- Source: `BUSINESS_TASKS.md` 1.2
- Steps: Pick from W2 interviews; sign monthly retainer at ~€40-80
- Time: 30 min

**Task: VAT registration via EDS**
- Source: `LEGAL_TASKS.md` 2.3
- Steps:
  1. Log in to [eds.vid.gov.lv](https://eds.vid.gov.lv) with e-Paraksts
  2. File form PVN-1 (voluntary registration)
  3. Receive VAT number in 5-10 days
- Time: 1 hour

### Tuesday — lawyer touch (bundle 4 items in one €200 session)

**Task: Single 2-hour lawyer session covering everything**
- Sources: `LEGAL_TASKS.md` 2.1 + 2.2, `BUSINESS_TASKS.md` 2.5 + 3.5
- Steps:
  1. Email the lawyer (W2 chosen via jurists.lv): "I have an SIA + 4 documents to review in one sitting"
  2. Bring:
     - Dealer service agreement template (from `revenue/pricing.html`)
     - Data Processing Agreement based on EU SCC template
     - IP Assignment from you (private) → SIA HonestCost
     - 1-page Partnership / Revenue-Share template
  3. Lawyer reviews, suggests changes, you finalize same week
- Time: 2 hours of yours + 1 week for lawyer to send back redlines
- Cost: €150-250 (negotiate flat rate up front)

### Wednesday-Thursday — publish what's been drafting (3 hrs)

**Task: Publish Privacy Policy + ToS + cookie notice**
- Sources: `LEGAL_TASKS.md` 1.3, 1.4, 1.5
- Steps:
  1. Update the iubenda templates with SIA name + reg.nr.
  2. Link from footer of every page: "Privātuma politika · Lietošanas noteikumi · Sīkdatnes"
  3. Push to staging → smoke test → push to main
- Time: 2 hours

**Task: Update CAR_DB / data sources after audit findings**
- Source: from `AUDIT.md` Category 1 + 2 fixes
- Steps:
  1. Fix OCTA cc→kW (per audit Category 1)
  2. Fix TEN doc mismatch (9 vs 14 brackets — pick a story)
  3. Fix leasing balloon TCO (add residual to total when fin=leasing AND owns)
- Time: 1 hour

### Friday — first dealer pitch enabled (2 hrs)

**Task: Customer interview #1 (use first scheduled slot)**
- Source: `BUSINESS_TASKS.md` 2.2
- Time: 1 hour interview + 30 min synthesis notes

**Task: Send first dealer pitch (Greenmotors Skoda)**
- Source: `revenue/dealer-outreach.html` Touch 01 (LinkedIn DM)
- Steps:
  1. Open `revenue/dealer-outreach.html`
  2. Customise Touch 01 template with Greenmotors' Octavia
  3. Find marketing lead on LinkedIn; send DM
- Time: 30 min

**End of week 3:** SIA fully operational · all critical legal items live · first customer interview done · first dealer pitched · accountant onboarded.

---

## WEEK 4 · operational maturity (8 focused hours)

### Monday — accessibility (2 hrs)

**Task: Publish accessibility statement at /pieejamiba**
- Source: `LEGAL_TASKS.md` 2.5
- Steps:
  1. Generate via [W3C generator](https://www.w3.org/WAI/planning/statements/generator/)
  2. Fix any red WAVE items from W1 audit
  3. Publish + link from footer
- Time: 2 hours

### Tuesday — handover insurance (2 hrs)

**Task: Single-page "hit by a bus" handover doc**
- Source: `BUSINESS_TASKS.md` 2.4
- Steps:
  1. Write `HANDOVER.md` listing: domain, GitHub, Plausible, MailerLite, bank, accountant, dealer contracts, key dates
  2. Encrypt with passphrase OR seal physically; tell one trusted contact where it is
- Time: 2 hours

### Wednesday-Thursday — velocity tooling (3 hrs)

**Task: Feature flag helper**
- Source: `OPERATIONS_TASKS.md` 2.3
- Time: 1 hour

**Task: Zapier MailerLite → Google Sheets daily backup**
- Source: `OPERATIONS_TASKS.md` 1.4
- Time: 30 min

**Task: Customer interview #2-3**
- Source: `BUSINESS_TASKS.md` 2.2
- Time: 1.5 hours (3 × 30 min)

### Friday — insurance + 2nd dealer pitch (3 hrs)

**Task: Professional indemnity insurance quotes**
- Source: `LEGAL_TASKS.md` 2.4
- Steps:
  1. Quote from BTA, IF, BALTA: "Professional liability for IT consulting / SaaS, €100k per claim, €300k aggregate"
  2. Pick cheapest; pay
- Time: 2 hours
- Cost: €150-350/yr

**Task: Send second dealer pitch (Tesla Riga)**
- Time: 30 min

**End of week 4:** Major regulatory exposure removed · single-point-of-failure handover documented · operational tooling at parity with mid-stage startups.

---

## WEEKS 5-8 · distribution + customer research (7 hrs/week)

This phase is interview-driven. Customer interviews change what you build and ship — execute them BEFORE writing more features.

### Weekly cadence

| Day | Activity | Time |
|---|---|---:|
| Mon | 1 customer interview + 1 synthesis | 1.5h |
| Tue | Send 2 new dealer pitches | 1h |
| Wed | 1 advisor coffee OR 1 customer interview | 1h |
| Thu | Operations/feature work | 2h |
| Fri | Review weekly metrics + lessons.md entry | 1.5h |

### Specific milestones

**By end W8:**
- 10 customer interviews complete + synthesized into 5 themes (BUSINESS 2.2)
- 3 advisor coffees done (BUSINESS 2.1)
- Half-page competitive analysis written (BUSINESS 2.3)
- FAQ page live with top 10 questions (OPS 2.5)
- 12 dealers pitched · 4 demos booked · 1 paying

---

## WEEKS 9-12 · compounding investments (8 hrs/week)

Once the customer + dealer learning is in, invest in things that pay back over years.

### Week 9 — trademark + CAC

- **Trademark "HonestCost" at LRPV** (LEGAL 3.1) — €120, 1 LV class
- **CAC tracking sheet** (BUSINESS 3.1) — log every dealer touch in hours

### Week 10 — performance + resilience

- **Lazy-load `car-db.js`** (OPS 2.6) — ~300ms TTI win
- **Cloudflare in front of GitHub Pages** (OPS 3.1) — 4-hour outage protection

### Week 11 — insight tools

- **Microsoft Clarity session replay** (OPS 3.2) — with PII masking
- **Lighthouse CI** (OPS 3.5) — performance regression detection

### Week 12 — long-game

- **i18n EN translations** (OPS 3.3) — extract strings, add `?lang=en` toggle
- **Exit horizon + succession plan** (BUSINESS 3.3, 3.6) — written, dated
- **First disaster recovery drill** (OPS 3.6) — simulate losing GitHub access
- **LESSONS.md** has 8+ entries by now (BUSINESS 3.2)
- **Revenue diversification map** (BUSINESS 3.4) — top 10 alternatives ranked

---

## DEPENDENCY MAP — what unblocks what

```
SIA registration ──┬──→ Business bank account
                   ├──→ Bookkeeper contract sign
                   ├──→ VAT registration
                   ├──→ Privacy Policy (needs reg.nr.)
                   ├──→ Terms of Service (needs entity name)
                   ├──→ Lawyer touch bundle
                   └──→ Insurance (insurer needs entity)

Lawyer touch ──────┬──→ Dealer contract signable
                   ├──→ DPA template ready for dealers
                   ├──→ IP assignment to SIA
                   └──→ Partnership template

Customer interviews ───→ FAQ content
                    └──→ Competitive analysis depth

Financial model ───→ Hourly rate visibility
                ───→ Break-even date known
                ───→ Pricing tier validation

Calc tests + CI ───→ Safe to push changes
                ───→ Refactor confidence
```

---

## COST FLOW · running total

| Week | One-time spend | Cumulative |
|---:|---:|---:|
| 1 | €27 (iubenda) | €27 |
| 3 | €165 SIA + €40 first month bookkeeper + €200 lawyer | €432 |
| 4 | €350 insurance Y1 | €782 |
| 6 | €100 customer interview vouchers | €882 |
| 9 | €120 trademark | €1,002 |
| Total Y1 | | **~€1,002** |

Recurring after: €40/mo bookkeeper + €27/yr iubenda + €350/yr insurance + €5/mo bank ≈ **€990/yr**.

---

## WEEKLY HOUR BUDGET · realistic

| Phase | Hours/week | Activity mix |
|---|---:|---|
| Weeks 1-4 | 8-12 | Heavy setup; legal + ops + first interviews |
| Weeks 5-8 | 7 | Interview-heavy; outreach pace |
| Weeks 9-12 | 8 | Compounding investments |
| **90-day total** | **~108 hours** | **≈9 hrs/week** |

If 9 hrs/week is unrealistic for you, **double the timeline to 180 days** — every task still works, just slower. What does NOT work: skipping the SIA + GDPR items in weeks 1-3. Those are blocking.

---

## EXIT CRITERIA · how you know you're "done"

By end of week 12 you should be able to truthfully say:
- ✅ SIA registered, VAT-registered, bank active, accountant on retainer
- ✅ All public-facing legal docs published (Privacy / ToS / Cookies / Accessibility)
- ✅ Dealer contract is lawyer-reviewed and signable
- ✅ Trademark application filed
- ✅ Professional indemnity insurance active
- ✅ 10 customer interviews done, themes synthesized
- ✅ 3 advisor relationships active
- ✅ Calc engine has automated tests
- ✅ Sentry / UptimeRobot / Clarity running
- ✅ Cloudflare in front; staging env in use
- ✅ CAC tracked per dealer
- ✅ LESSONS.md has 8+ entries
- ✅ Project score on the original 1000-point audit: **~730 (was 522)**

---

## QUICK-REFERENCE · the 42 tasks by sequence

```markdown
## Days 1-7
- [ ] File SIA on latvija.lv (LEGAL 1.1)
- [ ] Build 18-month financial model (BUSINESS 1.1)
- [ ] Decide hourly rate + add to model (BUSINESS 1.3)
- [ ] LICENSE file + copyright headers (LEGAL 3.2, 3.3)
- [ ] Write test-calc.js (OPS 1.1)
- [ ] Sentry integration (OPS 1.2)
- [ ] UptimeRobot monitors (OPS 1.3)
- [ ] GitHub Actions CI (OPS 1.5)
- [ ] Swap EmailJS → MailerLite EU (LEGAL 1.6)
- [ ] Draft Privacy Policy via iubenda (LEGAL 1.3)
- [ ] Draft ToS via iubenda (LEGAL 1.4)
- [ ] Cookie + tracking notice page (LEGAL 1.5)
- [ ] Run WAVE accessibility audit (LEGAL 2.5 prep)

## Days 8-14
- [ ] Customer interview recruitment (10 candidates) (BUSINESS 2.2)
- [ ] Advisor cold DMs (5 candidates) (BUSINESS 2.1)
- [ ] Interview 3 bookkeepers (BUSINESS 1.2)
- [ ] Static status page (OPS 2.1)
- [ ] CSP + security headers (OPS 2.4)
- [ ] Staging environment (OPS 2.2)

## Days 15-21 (SIA active)
- [ ] Open business bank account (LEGAL 1.2)
- [ ] Sign bookkeeper retainer (BUSINESS 1.2)
- [ ] VAT registration via EDS (LEGAL 2.3)
- [ ] Lawyer touch bundle (LEGAL 2.1+2.2, BUSINESS 2.5+3.5)
- [ ] Publish Privacy + ToS + Cookies (LEGAL 1.3, 1.4, 1.5)
- [ ] Fix calc bugs from audit (CALC 1.1-1.3)
- [ ] First customer interview (BUSINESS 2.2)
- [ ] First dealer pitch (Greenmotors)

## Days 22-28
- [ ] Publish accessibility statement (LEGAL 2.5)
- [ ] HANDOVER.md (BUSINESS 2.4)
- [ ] Feature flag helper (OPS 2.3)
- [ ] Zapier MailerLite → Sheets (OPS 1.4)
- [ ] Insurance quotes + signed (LEGAL 2.4)
- [ ] Customer interviews #2-3
- [ ] Second dealer pitch (Tesla Riga)

## Weeks 5-8
- [ ] Customer interviews 4-10 (BUSINESS 2.2)
- [ ] 3 advisor coffees (BUSINESS 2.1)
- [ ] Competitive analysis (BUSINESS 2.3)
- [ ] FAQ page live (OPS 2.5)
- [ ] 12 dealers pitched · 4 demos · 1 close

## Weeks 9-12
- [ ] Trademark filing at LRPV (LEGAL 3.1)
- [ ] CAC tracking sheet (BUSINESS 3.1)
- [ ] Lazy-load car-db.js (OPS 2.6)
- [ ] Cloudflare in front (OPS 3.1)
- [ ] Microsoft Clarity (OPS 3.2)
- [ ] Lighthouse CI (OPS 3.5)
- [ ] i18n EN translations (OPS 3.3)
- [ ] Exit horizon + succession (BUSINESS 3.3, 3.6)
- [ ] First DR drill (OPS 3.6)
- [ ] LESSONS.md routine (BUSINESS 3.2)
- [ ] Revenue diversification map (BUSINESS 3.4)
```

— Generated 2026-05-26.
