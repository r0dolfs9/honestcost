# HonestCost Handover

Last updated: 2026-05-26

## Repo shape

- `index.html` is the main single-file app.
- `car-db.js` provides the car database used by the picker.
- `test-calc.js` extracts the production calc engine from `index.html` and runs smoke tests.
- `test_scenarios.js` is the older scenario harness with seven comparison scenarios.
- `.github/workflows/ci.yml` runs the Node checks on push and pull request.
- `AUDIT.md`, `EXECUTION_PLAN.md`, `LEGAL_TASKS.md`, `BUSINESS_TASKS.md`, `OPERATIONS_TASKS.md`, and `NEXT_TASKS.md` are planning and task-tracking documents.

## Local verification commands

Run from the project root:

```bash
node --check test-calc.js
node --check test_scenarios.js
node test-calc.js
node test_scenarios.js
```

## Current known state

- `index.html` is modified relative to the tracked git state.
- The extracted design-system files are currently untracked.
- The project has no `package.json`; the current checks use only built-in Node modules.
- No real Sentry, UptimeRobot, MailerLite, Zapier, bank, SIA, or legal-policy setup is confirmed in this repo.

## Deployment notes

- `PUSH_HANDOFF.md` contains the previous push guidance for moving the redesigned `index.html` to GitHub.
- Before pushing, review `git status --short` and decide which untracked design/handoff files should be committed.
- Do not claim monitoring, legal compliance, data-source verification, or affiliate revenue until the external setup is actually complete.
