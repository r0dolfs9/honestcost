# HonestCost Weekly Stretch Tasks

Week of 2026-06-01

This is intentionally ambitious. The goal is to create a week that drives real progress across product quality, trust, and growth, even if not every item gets finished.

## Track 1 - Product Hardening

- Run a full browser QA pass on the deployed GitHub Pages version: car picker lazy-load, example comparison, saved scenarios, print/PDF flow, FAQ page, status page, OG image, and obvious console/runtime issues.
- Do a proper mobile/responsive pass on phone-width and small-tablet layouts, then fix the most visible breakpoints and awkward states.
- Add URL-param feature flags for safe local/staging testing so unfinished or risky behavior can be isolated without changing the main flow.
- Add and verify a CSP meta policy only after confirming it does not break the shipped calculator, saved scenarios, or static pages.
- Write down a short browser QA findings note with pass/fail items, bugs found, and follow-up fixes.

## Track 2 - Trust And Credibility

- Expand `car-sources.js` from the first 11 audited rows toward at least 30 source-backed Latvian-relevant models.
- For audited rows, verify price source, trim mapping, and source date before changing any live values in `car-db.js`.
- Fix the highest-confidence stale or misleading rows only where current evidence is strong enough to defend publicly.
- Draft and add a static `sikdatnes.html` cookie/tracking page with factual wording that matches the current real site behavior.
- Draft an `accessibility.html` statement structure, but only publish it if it clearly avoids claiming compliance that has not been audited yet.

## Track 3 - Growth And Commercial Readiness

- Draft the first 3-5 useful Latvian static/content comparison pages based on real calculator scenarios and original reasoning.
- Outline the next 6-10 content page topics so there is a visible content pipeline instead of a one-off batch.
- Prepare a first dealer-outreach starter pack: target list skeleton, outreach angle, screenshot/demo idea, and follow-up template.
- Research and record at least 5 concrete Latvian dealer targets with names, roles, public links, and likely value angles.
- Add a lightweight “report an error” or feedback path plan so trust-building and future user learning are not blocked.

## Finish-If-Possible Outcomes

- One clean browser QA pass completed and documented.
- One mobile pass completed with top-priority fixes shipped.
- Car-source audit expanded well beyond the initial batch.
- At least one compliance/trust page added with non-fabricated wording.
- First content and dealer-readiness assets drafted enough to reuse next week.

## Rule For This Week

Do not optimize for checking boxes. Prioritize tasks that make HonestCost more defensible, more testable, and easier to trust in public.
