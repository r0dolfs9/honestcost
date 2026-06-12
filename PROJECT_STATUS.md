# HonestCost Project Status

Last updated: 2026-06-12

## Product

- Main app file: `index.html`
- Car database: `car-db.js`, lazy-loaded when the picker is first opened.
- Static pages: `faq.html` and `status.html`.
- Content section: `content/` with a hub page and 6 Latvian articles (engine-computed numbers), in sitemap and navs as of 2026-06-10.
- Calc engine 2026-06-10: OCTA estimate is kW-based when power is known, service has a 24-month time floor, DEP tables extend to 8 years, `?flags=` feature flags exist.
- Social preview asset: `og-image.png`.
- Current local app status: main branch is clean after push.
- Current GitHub status: commit `a122c6a feat: add saved scenarios and static pages` was pushed to `origin/main`.
- Current deployment status: GitHub Pages subpath `https://r0dolfs9.github.io/honestcost/` returns `200 OK`; `honestcost.lv` and `www.honestcost.lv` do not resolve as of 2026-05-28.

## FABLE5 redesign status

- Current branch: `codex/fable5-honestcost-redesign`.
- Current choice: **Decision Ledger default + Assumption Inspector next**. The app should keep the fast two-car decision flow, then expose an assumption/proof layer for users who want to inspect or edit the numbers.
- What was found: the product's calculation depth is already valuable, but source confidence and assumption provenance were not visible enough in the result. Mobile/tablet overflow also existed because hidden tooltip panels and hero decoration still affected page width.
- What was done: added production source-confidence badges, corrected stale OCTA/TEN trust copy, fixed mobile/tablet overflow, created FABLE5 audit/design/decision/QA docs, and locked the BMW 740d xDrive vs Porsche 911 Carrera regression.
- 2026-06-12: the Assumption Inspector shipped as a result-screen drill-down. Every cost line expands to show the formula in plain language, a provenance chip (user/DB value, default assumption, model estimate, statutory rule), and where to edit it. Verified at 7 viewports (incl. 360x800, 430x932, 1024x768) with the BMW/Porsche regression unchanged; all 7 test suites pass. Evidence: `qa/fable5/browser-smoke-after2.json`.
- Next move: inline assumption editing inside the inspector (currently editing routes back to the input screen), and expanding source metadata coverage so fewer rows display as estimates.

## Verification

- `test-calc.js` exists and tests the production calc engine extracted from `index.html`.
- `test_scenarios.js` exists and covers seven scenario comparisons.
- `test-ui-helpers.js` exists and covers UI helper behavior for images, debug mode, and saved scenarios.
- `test-static-pages.js` exists and checks FAQ/status/sitemap/OG metadata smoke cases plus the content section.
- `test-car-sources.js` and `test-audited-car-db-values.js` enforce source metadata; 25 rows tracked, 9 resolved with guarded DB updates (audit docs dated 2026-06-02 and 2026-06-10).
- `test-fable5-regression.js` locks the required BMW 740d xDrive vs Porsche 911 Carrera values after the source-confidence and trust-copy pass.
- `fable5-browser-smoke.js` covers browser smoke checks for responsive overflow and the BMW/Porsche visible-result scenario.
- GitHub Actions workflow exists at `.github/workflows/ci.yml`.

## Legal / company

- SIA registration status: unknown.
- Business bank account status: unknown.
- Privacy Policy status: not confirmed.
- Terms of Service status: not confirmed.
- Cookie notice status: not confirmed.
- Trademark status: not confirmed.

## Operations

- Sentry status: not confirmed.
- UptimeRobot status: not confirmed.
- MailerLite/Zapier backup status: not confirmed.
- EmailJS status: placeholder keys; demo behavior only.
- Staging environment status: not confirmed.
- CSP/security header status: not confirmed.

## Business

- Financial model status: not confirmed.
- Bookkeeper/accounting setup: not confirmed.
- Customer interviews: not confirmed.
- Advisor outreach: not confirmed.
- Affiliate partnerships: not confirmed.
- Dealer contracts: not confirmed.

## Next source of truth

- Open `00_HONESTCOST_ROADMAP.md` first for the command-center roadmap.
- Use `NEXT_TASKS.md` for the ordered staged task queue.
- Use `EXECUTION_PLAN.md` for the full 90-day sequencing.
