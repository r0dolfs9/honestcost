# Weekend Review - 2026-05-28

## What Changed This Week

- Added saved scenarios with save, load, and delete controls.
- Added result print/PDF output.
- Lazy-loaded `car-db.js` on first car-picker open.
- Added `faq.html`, `status.html`, sitemap updates, Open Graph image metadata, and `og-image.png`.
- Added/expanded automated checks: `test-calc.js`, `test_scenarios.js`, `test-ui-helpers.js`, and `test-static-pages.js`.
- Added `00_HONESTCOST_ROADMAP.md` as the command-center roadmap.
- Converted `NEXT_TASKS.md` into ordered stages.
- Recorded official source checks for AdSense, Latvian SIA registration, and VID VAT guidance.

## What Was Tested

- Local syntax checks passed:
  - `node --check test-calc.js`
  - `node --check test_scenarios.js`
  - `node --check test-ui-helpers.js`
  - `node --check test-static-pages.js`
- Local automated tests passed:
  - `node test-calc.js`
  - `node test_scenarios.js`
  - `node test-ui-helpers.js`
  - `node test-static-pages.js`
- Deployment HTTP checks:
  - `https://r0dolfs9.github.io/honestcost/` returns `200 OK`.
  - `https://r0dolfs9.github.io/honestcost/faq.html` returns `200 OK`.
  - `https://r0dolfs9.github.io/honestcost/status.html` returns `200 OK`.
  - `https://r0dolfs9.github.io/honestcost/og-image.png` returns `200 OK`.
  - `https://r0dolfs9.github.io/honestcost/car-db.js` returns `200 OK`.
- Public GitHub signals:
  - Repo `r0dolfs9/honestcost` is public.
  - Repo default branch is `main`.
  - Repo reports `has_pages: true`.
  - Latest `HonestCost CI` run for commit `0995096` succeeded.
  - Latest Pages build/deployment run for commit `0995096` succeeded.

## What Broke Or Is Blocked

- `https://honestcost.lv` does not resolve.
- `https://www.honestcost.lv` does not resolve.
- Browser/visual QA is still open. The in-app browser failed to start in this environment, and local Playwright is not installed.
- GitHub Pages API endpoint `/repos/r0dolfs9/honestcost/pages` returned `404` without auth, so exact Pages source settings are not proven from API metadata.
- Fixed after review: `faq.html` and `status.html` used root-relative nav links that would break on the GitHub Pages subpath. They now use relative links.

## What Earned Or Moved Toward Money

- No revenue earned yet.
- Trust foundation improved: FAQ/methodology page, status page, social preview asset, automated tests, and deployment proof are now in place.
- The real next monetization blocker is not product code; it is DNS/custom domain setup plus legal/contact/privacy basics before ads or dealer lead capture.

## Next

- Configure DNS/custom-domain records for `honestcost.lv` and `www.honestcost.lv`.
- Use `https://r0dolfs9.github.io/honestcost/` for QA until the custom domain resolves.
- Complete browser QA when a browser automation path is available:
  - car picker lazy-load,
  - example comparison,
  - saved scenario save/load/delete,
  - print/PDF,
  - FAQ/status pages,
  - mobile width,
  - OG image.
- Start the larger mobile/responsive pass only after browser QA.
