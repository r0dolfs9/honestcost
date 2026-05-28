# HonestCost Handover

Last updated: 2026-05-28

## Repo shape

- `index.html` is the main single-file app.
- `car-db.js` provides the car database used by the picker and is lazy-loaded when the picker first opens.
- `faq.html` is the factual methodology / FAQ page.
- `status.html` is the factual status page and avoids unverified uptime claims.
- `og-image.png` is the current Open Graph / Twitter share image.
- `test-calc.js` extracts the production calc engine from `index.html` and runs smoke tests.
- `test_scenarios.js` is the older scenario harness with seven comparison scenarios.
- `test-ui-helpers.js` covers pure UI helpers for car visuals, debug mode, and saved scenarios.
- `test-static-pages.js` covers static page, sitemap, and OG metadata smoke checks.
- `.github/workflows/ci.yml` runs the Node checks on push and pull request.
- `AUDIT.md`, `EXECUTION_PLAN.md`, `LEGAL_TASKS.md`, `BUSINESS_TASKS.md`, `OPERATIONS_TASKS.md`, and `NEXT_TASKS.md` are planning and task-tracking documents.

## Local verification commands

Run from the project root:

```bash
node --check test-calc.js
node --check test_scenarios.js
node --check test-ui-helpers.js
node --check test-static-pages.js
node test-calc.js
node test_scenarios.js
node test-ui-helpers.js
node test-static-pages.js
```

## Current known state

- Commit `a122c6a feat: add saved scenarios and static pages` was pushed to `origin/main`.
- Local `main` was clean immediately after the push.
- The project has no `package.json`; the current checks use only built-in Node modules.
- No real Sentry, UptimeRobot, MailerLite, Zapier, bank, SIA, or legal-policy setup is confirmed in this repo.
- EmailJS constants are still placeholder values, so the email capture remains demo-mode unless configured.

## Deployment notes

- GitHub push has completed; check GitHub Actions and the live deployment before claiming production is verified.
- Do not claim monitoring, legal compliance, data-source verification, or affiliate revenue until the external setup is actually complete.
