# HonestCost — Legal Compliance Tasks

**Goal:** Take the Legal/Compliance score from 5/80 → 80/80 with zero legal exposure.
**Total time:** ~32 hours of your time + ~€600–900 in fees + ~4 weeks of waiting on registries.
**Risk if skipped:** PTAC complaint, GDPR fine (up to 4% of revenue, but realistic minimum is €500–€5,000), personal liability on contracts, brand squatting, no insurance backstop.

---

## TIER 1 · MUST do before first dealer payment (blocking)

These items remove specific legal risks that the project is currently exposed to right now, even before going live. Each is a non-negotiable.

### 1.1 · Register a SIA (limited liability company)
- **Why:** Operating as a private individual makes you personally liable for everything. A dealer cannot legally invoice "[your name]" for VAT-deductible business expenses; they need a `Reg.Nr.` to claim VAT. The €200 deal dies on this technicality.
- **How:**
  1. Pick a name. Latvian convention: `SIA "HonestCost"` or `SIA "HC Solutions"`. Check availability at [ur.gov.lv](https://www.ur.gov.lv/).
  2. Pay the €150 state fee + €15 publication fee.
  3. File electronically via [latvija.lv](https://latvija.lv) using e-Paraksts or eID. Process is 100% online now.
  4. Minimum share capital is €1 (since 2023 amendment — no longer €2,800).
  5. Choose registered address. If you use your home address, it's public. Some lawyers offer "juridiskā adrese" rental for €15/month.
  6. Choose NACE code: **63.12** (Web portals) primary; **70.22** (Business consulting) secondary.
- **Time:** 2 hours of paperwork. 5–7 business days for registry processing.
- **Cost:** €165 state fees. ~€180/year address rental if not using your own.
- **Tip:** Do this BEFORE you sign your first dealer. Backdating contracts is messy.
- **Points:** +10

### 1.2 · Open a business bank account
- **Why:** You cannot invoice from your personal IBAN once the SIA exists. Tax authority pays attention.
- **How:**
  - **Swedbank Business Junior:** €5/mo, free SEPA, 90 SEPA transfers/mo included.
  - **Citadele Business Start:** Free first 12 months for new businesses.
  - **Revolut Business EUR:** Cheapest if invoicing internationally, but Latvian dealers prefer LV banks for trust reasons.
- **Time:** 1 hour at branch + 2-3 days for activation.
- **Cost:** €0–€10/mo.
- **Points:** +3 (within entity register)

### 1.3 · Privacy Policy
- **Why:** GDPR Art. 13 requires this for any EU site collecting personal data. EmailJS captures emails. Plausible *might* track IP (it doesn't, but you have to say so). Without a published policy you are non-compliant from day 1.
- **How:**
  1. Use [iubenda](https://www.iubenda.com/en/products/privacy-policy) Pro generator — €27/year. Pre-built for Latvia, EmailJS, Plausible, GitHub Pages.
  2. OR write your own using [LDPC template](https://www.dvi.gov.lv/lv/personas-datu-aizsardziba-pamatprasibas).
  3. Required sections: data controller (your SIA name + reg.nr.), purpose, legal basis (Art. 6(1)(b) for the calc, Art. 6(1)(a) for email capture), retention period, third-party processors (EmailJS, Plausible, GitHub Pages), user rights, contact for data subject requests.
  4. Link in footer of every page as "Privātuma politika".
- **Time:** 1 hour (iubenda) or 4 hours (hand-written).
- **Cost:** €27/year (iubenda) or €0 (DIY).
- **Critical:** the policy must name your SIA — don't publish until #1.1 is done.
- **Points:** +10

### 1.4 · Terms of Service / Lietošanas noteikumi
- **Why:** Limits your liability if a user makes a €40,000 decision based on the calculator and the math is off. Without TOS, you have full liability under Latvian Consumer Rights Protection Law for "professional advice."
- **How:**
  1. Generate via iubenda Pro (covered by same €27/year).
  2. OR adapt the [Termly template](https://termly.io/) and run it through DeepL or a lawyer review.
  3. Required sections: scope ("informational only, not financial advice"), accuracy disclaimer, limitation of liability (€0 — explicitly state numbers are indicative), governing law (Latvian), dispute resolution (Rīgas pilsētas tiesa).
  4. Display once as a click-through modal on first visit OR link in footer + reference inside the existing disclaimer.
- **Time:** 1 hour.
- **Cost:** Included in iubenda subscription.
- **Points:** +8

### 1.5 · Cookie & tracking notice
- **Why:** Even Plausible (cookie-less) requires disclosure under the LV implementation of ePrivacy. The localStorage you use for theme + form state is borderline — some interpretations require disclosure, some don't. Disclose to be safe.
- **How:**
  - Add a small footer-link to "Cookies un izsekošana" page that lists:
    - Plausible: page views, no cookies, no personal ID, EU-hosted (Germany).
    - localStorage: theme preference + last-used form values, on your device only.
    - EmailJS: when you use the email-capture form, your email + comparison summary are sent to EmailJS for delivery.
  - **No consent banner needed** for Plausible (cookie-less) — but you must disclose. If you switch to a tracking tool that uses cookies, you'll need a consent banner.
- **Time:** 30 min.
- **Cost:** €0.
- **Points:** +6

### 1.6 · Replace EmailJS or sign Standard Contractual Clauses (SCC)
- **Why:** EmailJS is US-hosted. Sending user emails to a US service = international data transfer. GDPR requires Standard Contractual Clauses or an adequacy decision. EmailJS doesn't offer SCC on their free tier. This is a hard violation.
- **How (option A — recommended):** Switch to an EU-hosted alternative:
  - **MailerLite EU** (Ireland-hosted, free up to 1,000 subscribers, GDPR-native).
  - **Brevo / Sendinblue** (France-hosted, free up to 9,000 emails/mo, transactional API similar to EmailJS).
  - **EmailOctopus** (UK-hosted, free up to 2,500 subscribers).
- **How (option B):** Pay for EmailJS Pro (~€9/mo), which includes a DPA.
- **Time:** 1 hour to swap the 3 constants + DPA review.
- **Cost:** €0 (MailerLite EU free tier).
- **Points:** +8

**Tier 1 subtotal: +45 points.** Brings the project to 50/80 in legal alone — out of the danger zone.

---

## TIER 2 · MUST do before first dealer SIGNATURE (B2B credibility)

These are needed the moment money changes hands. They protect you and the dealer.

### 2.1 · Latvian lawyer reviews the dealer contract
- **Why:** The one-page contract in `revenue/pricing.html` is a starting point, not signable. A Latvian small-business lawyer can fix the GDPR, liability, IP, and termination clauses for your specific entity.
- **How:**
  1. Find one via [jurists.lv](https://www.jurists.lv/) or LinkedIn search "B2B SaaS jurists Riga".
  2. Tell them: "I need a 2-page service agreement template I can reuse for ~10 dealer clients. Latvian law. Review of my current draft."
  3. Specify must-have clauses: 30-day termination, GDPR data processing addendum, IP ownership (yours), liability cap = monthly fee, force majeure, dispute jurisdiction (Rīgas pilsētas tiesa).
- **Time:** 2 hours of your time + 1 week of lawyer time.
- **Cost:** €150–€250.
- **Points:** +5

### 2.2 · Data Processing Agreement (DPA) template
- **Why:** When a dealer integrates your tool, you become a data processor for their customers' contact info. Article 28 of GDPR requires a written DPA between you (processor) and them (controller). Without it, the dealer's compliance officer will reject the integration.
- **How:**
  1. Use the [European Commission's Article 28 standard contractual clauses template](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en).
  2. Or buy a Latvian-localized template from [legaldraft.lv](https://www.legaldraft.lv/) (~€80).
  3. Fill in: scope (only contact-form submissions on dealer's embed), purpose (lead routing), categories (name, email, phone, car-of-interest), retention (delete after 12 months), sub-processors (MailerLite, Plausible).
  4. Have the lawyer (#2.1) review the same hour they review #2.1.
- **Time:** 2 hours self-research + lawyer review (covered by same fee).
- **Cost:** €0–€80.
- **Points:** +5

### 2.3 · VAT registration plan
- **Why:** Mandatory once your annualized turnover hits €40,000 (LV threshold raised 2024). Voluntary registration before is allowed and lets dealers deduct VAT from your invoices — making your service effectively 21% cheaper to them.
- **How:**
  1. **If invoicing your first dealer right away:** Register voluntarily on day 1 to deduct VAT from your own purchases AND to let dealers deduct. File via [VID Electronic Declaration System (EDS)](https://eds.vid.gov.lv/).
  2. **If waiting:** Set a calendar alert at €25,000/12mo turnover; plan to file at €30k.
  3. File Form `PVN-1`. Processing 5–10 days.
  4. After registration: every invoice carries 21% VAT; you pay it to VID by 20th of next month; you can offset purchases.
- **Time:** 2 hours initial filing. ~1 hour/month ongoing reporting (or an accountant at €40/month).
- **Cost:** €0 to register. €40/month if you outsource reporting.
- **Points:** +4

### 2.4 · Professional indemnity insurance
- **Why:** A single dealer who uses your calc, mis-quotes a customer, loses a sale and blames the tool can sue. €40,000 in damages with no insurance = project death.
- **How:**
  1. Quote from BTA, IF, or BALTA. Search: "profesionālās atbildības apdrošināšana" + your NACE code.
  2. Minimum coverage: €100,000 per claim, €300,000 aggregate.
  3. Expect premium €150–€350/year for a small SaaS like yours.
- **Time:** 2 hours for quotes + paperwork.
- **Cost:** €150–€350/year.
- **Points:** +4

### 2.5 · Accessibility statement
- **Why:** EU Accessibility Act (EAA) applied from June 2025 — public-facing consumer services must publish a statement. PTAC will check if a complaint is filed.
- **How:**
  1. Run the live site through [WAVE](https://wave.webaim.org/) and [axe DevTools](https://www.deque.com/axe/devtools/). Fix the red items.
  2. Generate a statement using [W3C template](https://www.w3.org/WAI/planning/statements/generator/).
  3. Required sections: conformance status (WCAG 2.1 AA), known gaps, contact for accessibility requests, date of last review.
  4. Publish at `/pieejamiba` linked from footer.
- **Time:** 4 hours (test + fix + publish).
- **Cost:** €0.
- **Points:** +4

**Tier 2 subtotal: +22 points. Running total: 72/80 — past the user's target.**

---

## TIER 3 · IP protection + housekeeping (do whenever)

These are not blocking but compound over time. Skip them = future regret.

### 3.1 · Register "HonestCost" trademark
- **Why:** Anyone can launch HonestCost2 in Latvia tomorrow. After 5 months of free riding on your brand, you have no legal remedy.
- **How:**
  1. **LV trademark via Patentu valde:** [lrpv.gov.lv](https://www.lrpv.gov.lv/lv).
     - €120 first class + €120 each additional class.
     - Classes you need: **9** (software), **35** (advertising / business services), **36** (financial information).
     - Processing 6–8 months.
  2. **EU trademark via EUIPO** (recommended for future expansion): €850 for 1 class, €50 each additional.
  3. Search existing trademarks first — search.lrpv.gov.lv and euipo.europa.eu.
- **Time:** 4 hours research + filing.
- **Cost:** €120 (LV, 1 class) up to €950 (EU, 2 classes).
- **Points:** +6

### 3.2 · Add copyright notices to source files
- **Why:** Code on public GitHub without a copyright notice is ambiguously licensed. Adds zero friction once done; clarifies ownership forever.
- **How:**
  1. Add a one-line header to every `.html`, `.css`, `.js` file:
     ```
     <!-- Copyright 2026 SIA HonestCost. All rights reserved. -->
     ```
  2. Or for JS: `// Copyright 2026 SIA HonestCost. All rights reserved.`
- **Time:** 30 minutes.
- **Cost:** €0.
- **Points:** +3

### 3.3 · LICENSE file
- **Why:** Public GitHub repo without a LICENSE file is in legal limbo. Most courts default to "all rights reserved" but it's untested in LV.
- **How:**
  1. Decide: proprietary (default) or open-source (MIT, AGPL)?
  2. **For HonestCost: proprietary.** Create `LICENSE` with:
     ```
     Proprietary. All Rights Reserved.
     Copyright (c) 2026 SIA HonestCost.
     Source code provided for transparency; reuse requires written permission.
     ```
  3. Commit and reference from `README.md`.
- **Time:** 15 minutes.
- **Cost:** €0.
- **Points:** +2

### 3.4 · Domain + email setup
- **Why:** `hello@honestcost.lv` is referenced in 10 places but routes nowhere. A dealer or journalist emails you, gets bounced, project looks dead.
- **How:**
  1. At your domain registrar, add MX records.
  2. Easiest: Google Workspace Business Starter (€6/mo) or Zoho Mail free tier (5 users, 5GB).
  3. Set forwards: `hello@`, `partnerships@`, `support@` all → your personal inbox.
- **Time:** 1 hour.
- **Cost:** €0–€72/year.
- **Points:** included in #1.1 entity tasks.

**Tier 3 subtotal: +11 points. Running total: 83/80 — over-target, accounting for compounding.**

Note: total can exceed 80 because the original Tier 1 score included 5 already-done points (the disclaimer). Realistic max landing position is **80/80 with margin**.

---

## EXECUTION CALENDAR · 30-DAY PLAN

Front-load Tier 1 (regulatory). Tier 2 can run in parallel with first dealer outreach.

| Week | Tasks | Why this order |
|---|---|---|
| **Week 1 (Mon–Wed)** | 1.1 SIA filing · 1.2 Bank account · 1.6 EmailJS swap | Entity registration is the bottleneck — start the clock |
| **Week 1 (Thu–Fri)** | 1.3 Privacy Policy · 1.4 ToS · 1.5 Cookie notice · 3.3 LICENSE · 3.2 Copyright headers | All can be done in 4 hours once you have SIA name confirmed |
| **Week 2** | Wait for SIA registry (5-7 days). Meanwhile: 3.4 email setup · 2.5 Accessibility audit | Don't sit idle |
| **Week 3** | SIA active → 2.1 Lawyer review of dealer contract · 2.2 DPA template · 2.3 VAT registration | All require the SIA to exist |
| **Week 4** | 2.4 Insurance quotes · 3.1 LV trademark filing | Polish |

---

## WHEN TO USE A LAWYER vs DIY

| Task | DIY | Lawyer | Reason |
|---|:--:|:--:|---|
| SIA registration | ✅ | | latvija.lv is built for this |
| Privacy Policy | ✅ | | iubenda is sufficient |
| Terms of Service | ✅ | | iubenda is sufficient |
| Cookie notice | ✅ | | Very low risk surface |
| Dealer contract review | | ✅ | €150 once = €0 risk later |
| Data Processing Agreement | partial | ✅ | EU SCC template is solid, but signature requires review |
| VAT registration | ✅ | | EDS is straightforward |
| Insurance | ✅ | | Broker handles it |
| Trademark filing | ✅ | | lrpv.gov.lv has a self-service path; only escalate if a dispute |
| Accessibility statement | ✅ | | W3C generator |

**Total lawyer time needed: ~3-4 hours over the project lifetime.** Don't over-lawyer this — small B2B SaaS at €200/mo doesn't need a retained counsel.

---

## RECOMMENDED LATVIAN LEGAL RESOURCES

- **Templates + generators:** [iubenda.com](https://www.iubenda.com), [termly.io](https://termly.io)
- **LV legal text database:** [likumi.lv](https://likumi.lv)
- **Trademark search:** [search.lrpv.gov.lv](https://search.lrpv.gov.lv)
- **Data Protection Authority:** [dvi.gov.lv](https://www.dvi.gov.lv) (DVI — Datu valsts inspekcija)
- **Consumer Rights Protection Centre:** [ptac.gov.lv](https://www.ptac.gov.lv)
- **Lawyer marketplace:** [jurists.lv](https://www.jurists.lv) (filter by "biznesa tiesības")
- **SIA self-registration:** [latvija.lv](https://latvija.lv) (search "SIA reģistrācija")
- **VAT registration:** [eds.vid.gov.lv](https://eds.vid.gov.lv)

---

## TOTAL COST SUMMARY

| Item | One-time | Recurring |
|---|---:|---:|
| SIA registration | €165 | — |
| Address rental (optional) | — | €180/yr |
| iubenda Pro (Privacy + ToS) | — | €27/yr |
| MailerLite EU | — | €0 (free tier) |
| Lawyer review of contracts | €150–€250 | — |
| VAT registration | €0 | — (or €40/mo accountant) |
| Professional indemnity insurance | — | €150–€350/yr |
| Trademark (LV, 1 class) | €120 | — every 10 yrs |
| Google Workspace email | — | €72/yr (optional, Zoho free works) |
| **TOTAL** | **~€435–€535** | **~€430/yr** |

**For under €1,000 total in year one** you go from 5/80 to 80/80 on legal compliance and remove ~95% of the realistic legal risk surface.

---

## QUICK-REFERENCE CHECKLIST (for Claude Code)

```markdown
## Tier 1 · Before launch
- [ ] Register SIA via latvija.lv (€165, 5-7 days)
- [ ] Open business bank account (Swedbank / Citadele)
- [ ] Publish Privacy Policy via iubenda (€27/yr)
- [ ] Publish Terms of Service via iubenda
- [ ] Publish cookie & tracking notice
- [ ] Swap EmailJS → MailerLite EU (or pay for EmailJS Pro DPA)
- [ ] Add LICENSE file (proprietary)
- [ ] Add copyright headers to source files

## Tier 2 · Before first dealer signature
- [ ] Latvian lawyer reviews dealer contract (€150)
- [ ] Sign Data Processing Agreement template
- [ ] Voluntary VAT registration via EDS
- [ ] Professional indemnity insurance (BTA / IF / BALTA)
- [ ] Publish accessibility statement (W3C generator)

## Tier 3 · Within 90 days
- [ ] Trademark "HonestCost" at LRPV (€120, 1 class)
- [ ] Set up hello@honestcost.lv MX records
- [ ] Configure forwards for partnerships@ and support@
```

---

— Generated 2026-05-26. Update when SIA name + reg.nr. are confirmed; many templates need those values inserted.
