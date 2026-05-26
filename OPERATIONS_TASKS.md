# HonestCost — Operations & Reliability Tasks

**Goal:** Take Operations score from 15/80 → 80/80.
**Total time:** ~36 hours of your time + ~€0–60/mo recurring (most tooling is free-tier).
**Risk if skipped:** silent calc breakage, hours of downtime before you notice, lost email leads, no path to fix bugs in production, embarrassing missing FAQ when a customer asks the same question for the 6th time.

> **Cross-references:** Email setup (`hello@honestcost.lv` MX records) is covered in `LEGAL_TASKS.md` Tier 3 #3.4. It earns ops points indirectly — don't duplicate.

---

## TIER 1 · MUST do before launch (production hygiene)

If any of these are missing on launch day, you're flying blind. They are the difference between "production website" and "code on a server".

### 1.1 · Automated calc tests
- **Why:** One typo in a `DEP[]` array breaks every comparison silently. Today the only check is your own eyeballs running the example button. A 50-line test file catches regressions before deploy.
- **How:**
  1. Create `test-calc.js` at project root.
  2. Extract the calc functions into testable form OR open them via `<script type="module">`.
  3. Write 8–10 assertions covering known-good scenarios:
     ```js
     // Test: BMW 118i vs X1, 5 years, 15k km/yr
     assert(Math.abs(rA.monthly - 880) < 5, '118i monthly ≈ €880');
     assert(Math.abs(rB.monthly - 1132) < 5, 'X1 monthly ≈ €1132');
     // Test: TEN edge cases
     assert(ten(0) === 0, 'EV has zero TEN');
     assert(ten(280) === 520, 'High-CO₂ tops out at €520');
     // Test: leasing zero-APR fallback
     assert(leasing(30000, 0, 0, 48, 0).mp === 625, '0% APR linear amortization');
     ```
  4. Run with: `node test-calc.js` — exits 1 on failure, 0 on pass.
- **Time:** 2 hours initial + 10 min per new test.
- **Cost:** €0.
- **Points:** +8

### 1.2 · Sentry error tracking
- **Why:** A JS error in production = silent failure. The user sees a frozen screen and leaves. You never know it happened. With Sentry, every error is captured with stack trace + browser + user actions before the crash.
- **How:**
  1. Sign up at [sentry.io](https://sentry.io) — free tier = 5,000 events/month (plenty for early-stage).
  2. Add to `index.html` `<head>`:
     ```html
     <script src="https://js.sentry-cdn.com/<your-key>.min.js" crossorigin="anonymous"></script>
     ```
  3. Initialize with: `Sentry.init({ dsn: '<your-dsn>', tracesSampleRate: 0.1 });`
  4. Configure alerts: email you when new error type appears (not every occurrence).
- **Time:** 30 minutes.
- **Cost:** €0.
- **Points:** +6

### 1.3 · UptimeRobot pinging
- **Why:** Domain expires, DNS breaks, GitHub Pages outage — you find out from a tweet 8 hours later. With UptimeRobot, you get an email/SMS within 5 minutes.
- **How:**
  1. Sign up at [uptimerobot.com](https://uptimerobot.com) — free tier = 50 monitors, 5-min interval.
  2. Add HTTPS monitor for `https://honestcost.lv`.
  3. Add a "keyword" check: page must contain "HonestCost" (catches white-screen failures GitHub Pages doesn't 500 on).
  4. Set alert contacts: email + (optional) SMS via Twilio.
  5. Add a second monitor for the `og-image.png` — broken OG images destroy social CTR silently.
- **Time:** 20 minutes.
- **Cost:** €0.
- **Points:** +4

### 1.4 · MailerLite → Google Sheets daily backup
- **Why:** Captured leads live in one place — MailerLite. Account suspension, password loss, or accidental deletion = all leads gone. Daily backup is one Zap.
- **How:**
  1. Sign up at [zapier.com](https://zapier.com) (free tier: 100 tasks/month).
  2. Trigger: MailerLite → "New subscriber".
  3. Action: Google Sheets → "Create row".
  4. Map: email, name (if collected), comparison_summary, timestamp.
  5. Test once with a fake email.
  6. Same Zap can also push to your CRM later when you have one.
- **Time:** 30 minutes.
- **Cost:** €0 (Zapier free tier).
- **Points:** +4

### 1.5 · GitHub Actions CI (lint + test + deploy)
- **Why:** Manual `git push` with no checks = pushing broken HTML on a Friday afternoon. CI = every push runs your tests, blocks broken deploys.
- **How:**
  1. Create `.github/workflows/ci.yml`:
     ```yaml
     name: CI
     on: [push, pull_request]
     jobs:
       test:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v4
           - run: node test-calc.js
           - run: npx html-validate index.html
     ```
  2. Push it. Now every commit shows a green-check or red-X in GitHub.
  3. Branch protection: require CI to pass before merging to `main`.
- **Time:** 1 hour.
- **Cost:** €0.
- **Points:** +5

**Tier 1 subtotal: +27 points. Running: 42/80.**

---

## TIER 2 · SHOULD do within first 30 days

Once you have users and dealers, these turn "things that might break" into "things we'll notice in time."

### 2.1 · Status page
- **Why:** Users / dealers asking "is it down for you too?" 6 times a week = wasted hours. A status page (even a manual one) is the answer.
- **How (free):** Create a static `status.html` page. Update by hand when issues happen.
- **How (better):** Use [Atlassian Statuspage](https://www.atlassian.com/software/statuspage/free) free tier (up to 100 subscribers) or [BetterUptime](https://betterstack.com/better-uptime) (free public status page).
- **Time:** 2 hours setup.
- **Cost:** €0.
- **Points:** +3

### 2.2 · Staging environment
- **Why:** Right now any code change ships to production. You can't safely test a redesign or a calc change without risking the live site.
- **How:**
  1. Create a second GitHub Pages site:
     - Branch: `staging`
     - URL: `staging.honestcost.lv` (CNAME) OR a subpath
  2. Workflow: feature branches → push to `staging` first → smoke-test → merge to `main`.
  3. Use a different Plausible site (or `data-domain="staging.honestcost.lv"`) so test events don't pollute analytics.
- **Time:** 1 hour setup.
- **Cost:** €0.
- **Points:** +4

### 2.3 · Feature flags via URL parameters
- **Why:** You'll want to A/B test things — affiliate copy, button colors, the operational-leasing toggle. Without a feature flag system, every test = a deploy.
- **How:**
  1. Add a tiny `flags.js`:
     ```js
     const FLAGS = Object.fromEntries(new URLSearchParams(location.search));
     window.flag = name => FLAGS[name] === '1' || FLAGS[name] === 'true';
     ```
  2. Wrap experimental UI: `if (window.flag('newAffiliate')) { ... }`
  3. Share test URLs: `honestcost.lv?newAffiliate=1`
  4. Once a flag wins, hardcode the winning variant and remove the flag.
- **Time:** 1 hour.
- **Cost:** €0.
- **Points:** +3

### 2.4 · CSP + security headers
- **Why:** Without a Content Security Policy, the site is vulnerable to XSS (e.g. a dealer pastes a malicious URL into the photoUrl field). With CSP, the browser refuses to execute unauthorized scripts.
- **How:**
  1. Add to `<head>`:
     ```html
     <meta http-equiv="Content-Security-Policy" content="
       default-src 'self';
       script-src 'self' 'unsafe-inline' https://unpkg.com https://plausible.io https://cdn.emailjs.com https://js.sentry-cdn.com;
       style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
       font-src 'self' https://fonts.gstatic.com;
       img-src 'self' data: https:;
       connect-src 'self' https://plausible.io https://*.emailjs.com https://*.sentry.io;
     ">
     ```
  2. Test with [securityheaders.com](https://securityheaders.com) — aim for grade A.
  3. Adjust as you add third-party services.
- **Time:** 1 hour (debug iterations).
- **Cost:** €0.
- **Points:** +3

### 2.5 · FAQ / help docs
- **Why:** Every confused user emails you the same 10 questions. A 10-question FAQ removes 80% of support load.
- **How:**
  1. Top 10 questions to anticipate:
     1. Kā tiek aprēķināta KASKO?
     2. Kāpēc EV uzvar par tik daudz?
     3. Vai dati ir aktuāli?
     4. Kā atjaunot CO₂ datu, ja auto specifikācijā nav?
     5. Kāpēc operatīvais līzings rāda mazāku skaitli?
     6. Es atradu kļūdu, kā ziņot?
     7. Vai šis ir bezmaksas?
     8. Kāpēc nav lietota auto?
     9. Vai varu salīdzināt 3 auto?
     10. Kā mans dīleris var integrēties?
  2. One-paragraph answer each. Save as `/faq.html`.
  3. Link in nav + footer.
- **Time:** 3 hours.
- **Cost:** €0.
- **Points:** +4

### 2.6 · Lazy-load CAR_DB
- **Why:** `car-db.js` is 130KB. Loaded eagerly on every page view. Users who never open the picker pay the bandwidth cost. Lazy-loading shaves ~300ms off TTI on slow LV mobile connections.
- **How:**
  1. Remove `<script src="car-db.js">` from `<head>`.
  2. In `initCarPicker()`, before first paint:
     ```js
     btn.addEventListener('click', async () => {
       if (!window.CAR_DB) {
         await import('./car-db.js');
       }
       // ... existing open logic
     });
     ```
  3. Convert `car-db.js` to ES module export.
- **Time:** 1 hour.
- **Cost:** €0.
- **Points:** +3

**Tier 2 subtotal: +20 points. Running: 62/80.**

---

## TIER 3 · WITHIN 90 DAYS (depth + resilience)

Once you have real users and real revenue, these prevent single-point-of-failure outages.

### 3.1 · Multi-host failover (Cloudflare in front)
- **Why:** GitHub Pages had 5 regional outages in 2024–2025. Each averaged 47 minutes. Cloudflare Pages or a Cloudflare-cached CNAME gives you a fallback.
- **How (simplest):** Put Cloudflare in front of `honestcost.lv`. It caches the site at edge; when GitHub Pages goes down, cached version stays live for 2–4 hours.
- **How (best):** Mirror the site to Cloudflare Pages. Two deploys per `git push` via GitHub Action. Switch DNS in 60 seconds if primary fails.
- **Time:** 2 hours for Cloudflare CDN; 4 hours for full mirror.
- **Cost:** €0 (free tier).
- **Points:** +3

### 3.2 · Session replay (Microsoft Clarity)
- **Why:** "User dropped off at the leasing toggle" — without replay, you can't reconstruct WHY. Clarity captures click heatmaps + session videos, GDPR-friendly mode masks PII.
- **How:**
  1. Sign up at [clarity.microsoft.com](https://clarity.microsoft.com) — free unlimited.
  2. Add their snippet to `<head>`.
  3. Enable "mask all text" for GDPR — you see clicks and scroll behavior, not content.
  4. Disclose in Privacy Policy.
- **Time:** 30 minutes.
- **Cost:** €0.
- **Points:** +4

### 3.3 · EN / RU locale support
- **Why:** ~25% of Latvian residents are Russian-speaking primary; English is needed for expat buyers + future Baltics expansion. Currently they bounce.
- **How:**
  1. Extract all strings into a `i18n.js`:
     ```js
     const STRINGS = {
       lv: { analyse: 'Salīdzināt', winner: 'Lētākais', ... },
       en: { analyse: 'Compare', winner: 'Cheaper', ... },
       ru: { analyse: 'Сравнить', winner: 'Дешевле', ... },
     };
     const LANG = new URLSearchParams(location.search).get('lang') || 'lv';
     ```
  2. Replace hardcoded text with `STRINGS[LANG].key`.
  3. Add language toggle (LV / EN / RU) in nav.
  4. URL-based persistence: `?lang=en` saves to localStorage.
- **Time:** 8 hours initial extraction + 4 hours per translation pass.
- **Cost:** €0 (DeepL free tier for translations).
- **Points:** +7

### 3.4 · Branch / PR review workflow (when team grows)
- **Why:** When you bring on even one contributor, "we both push to main" = chaos. Branch protection + pull-request workflow is industry standard.
- **How:**
  1. GitHub settings → Branch protection on `main`: require PR + 1 review + passing CI.
  2. Document the flow in `CONTRIBUTING.md`.
- **Time:** 1 hour.
- **Cost:** €0.
- **Points:** +2

### 3.5 · Performance budget + monitoring
- **Why:** As features grow, page weight creeps up. Set a budget early; track via [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) or [PageSpeed Insights](https://pagespeed.web.dev/) manually monthly.
- **How:**
  1. Set targets:
     - Time to Interactive: < 2s on Fast 3G
     - Total page weight: < 250KB (lazy-loaded car-db excluded)
     - Lighthouse Performance: > 90
  2. Lighthouse CI runs on every PR.
- **Time:** 2 hours setup.
- **Cost:** €0.
- **Points:** +3

### 3.6 · Disaster recovery drill
- **Why:** What if your GitHub account gets locked? Domain expires? Bank account frozen? Test your handover doc by actually doing a "lose access to GitHub for 24h" simulation.
- **How:**
  1. Once per quarter, pick one critical path and pretend it's broken.
  2. Document what you'd actually do, in real time.
  3. Update `HANDOVER.md` (from `BUSINESS_TASKS.md` #2.4) based on the gaps you find.
- **Time:** 2 hours per drill, 4 drills/year.
- **Cost:** €0.
- **Points:** +2

**Tier 3 subtotal: +21 points. Running: 83/80. Margin over target.**

---

## EXECUTION CALENDAR · 90-DAY PLAN

| Week | Tasks | Theme |
|---|---|---|
| **W1** | 1.1 Calc tests · 1.2 Sentry · 1.3 UptimeRobot | Visibility |
| **W2** | 1.5 GitHub Actions CI · 1.4 MailerLite→Sheets | Pipeline |
| **W3** | 2.1 Status page · 2.4 CSP headers | Hardening |
| **W4** | 2.2 Staging env · 2.3 Feature flags | Velocity |
| **W5** | 2.5 FAQ writing | Content |
| **W6** | 2.6 Lazy-load CAR_DB | Performance |
| **W7–8** | 3.3 i18n extraction (EN translations) | Reach |
| **W9** | 3.3 RU translations + QA | |
| **W10** | 3.1 Cloudflare in front | Resilience |
| **W11** | 3.2 Microsoft Clarity · 3.5 Lighthouse CI | Insight |
| **W12** | 3.4 Branch protection · 3.6 DR drill #1 | Process |

---

## WHEN TO USE TOOLS vs HAND-ROLL

| Task | Hand-roll | Tool | Reason |
|---|:--:|:--:|---|
| Calc tests | ✅ | | Plain Node assertions, no framework needed |
| Error tracking | | ✅ (Sentry) | 6 hours of build vs 10 min of integration |
| Uptime | | ✅ (UptimeRobot) | Same |
| Status page | both | | Manual HTML page until traffic justifies Statuspage |
| Backup automation | | ✅ (Zapier) | Stable + free + auditable |
| i18n | ✅ | | Tools like react-intl are overkill for static HTML |
| Session replay | | ✅ (Clarity) | Browser API recording is non-trivial |
| Security headers | ✅ | | One line of HTML |
| Performance audit | | ✅ (Lighthouse) | Industry-standard, free |

---

## TOTAL COST SUMMARY

| Item | One-time | Recurring |
|---|---:|---:|
| Sentry | — | €0 (free tier — 5k events/mo) |
| UptimeRobot | — | €0 (free tier — 50 monitors) |
| Zapier (MailerLite backup) | — | €0 (free tier — 100 tasks/mo) |
| Microsoft Clarity | — | €0 (unlimited free) |
| Statuspage (Atlassian) | — | €0 (free tier — 100 subs) |
| Cloudflare | — | €0 (free tier — sufficient) |
| GitHub Actions | — | €0 (2000 min/mo public repos) |
| **TOTAL** | **€0** | **€0** |

Operations is the cheapest category. Every tool listed has a free tier that's sufficient through 10k MAU. You pay nothing — but it takes ~36 hours of your time over 90 days.

---

## ESCALATION TRIGGERS (when to upgrade)

| Tool | Free tier limit | Upgrade trigger | Paid tier cost |
|---|---|---|---|
| Sentry | 5k events/mo | Production errors > 200/day | $26/mo |
| UptimeRobot | 50 monitors, 5-min | Need 1-min checks or SMS alerts | $7/mo |
| Zapier | 100 tasks/mo | > 3 leads/day | $20/mo |
| Plausible (analytics) | none — paid from day 1 | already paid | $9/mo |
| Cloudflare | unlimited | Need DDoS protection | €0 still |
| GitHub Pages | unlimited public | Need private repo | €4/mo |

No upgrade triggers until you have meaningful traction (3+ paying dealers).

---

## QUICK-REFERENCE CHECKLIST (for Claude Code)

```markdown
## Tier 1 · Before launch
- [ ] test-calc.js with 8+ assertions
- [ ] Sentry integration (free tier)
- [ ] UptimeRobot HTTPS + keyword monitors
- [ ] Zapier: MailerLite → Google Sheets daily backup
- [ ] GitHub Actions CI workflow (lint + test on push)

## Tier 2 · Within 30 days
- [ ] Status page (static or Atlassian free)
- [ ] Staging environment (staging.honestcost.lv)
- [ ] Feature flag helper (URL param-based)
- [ ] CSP + security headers (aim for SecurityHeaders.com grade A)
- [ ] FAQ page with top 10 questions
- [ ] Lazy-load car-db.js on picker first-open

## Tier 3 · Within 90 days
- [ ] Cloudflare in front of GitHub Pages
- [ ] Microsoft Clarity session replay (with PII masking)
- [ ] EN translations via i18n.js
- [ ] RU translations
- [ ] Branch protection + PR-required workflow
- [ ] Lighthouse CI on every push
- [ ] First disaster recovery drill (lose-GitHub-access simulation)
```

— Generated 2026-05-26.
