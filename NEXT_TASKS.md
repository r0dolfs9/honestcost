# HonestCost Next Tasks

Updated 2026-05-28. Use `00_HONESTCOST_ROADMAP.md` as the first file to open; this file is the ordered task queue.

## Stage 0 - Command Center And Reality Check

- [x] Create one master roadmap command center.
- [x] Move mixed task buckets into ordered stages.
- [x] Add a "Do Not Claim Until Proven" rule set.
- [x] Record official source checks for AdSense, SIA registration, and VID VAT guidance.
- [x] Open/check `https://honestcost.lv` and record actual status: DNS does not resolve on 2026-05-28.
- [x] Check public GitHub Pages/deployment signals: repo has Pages enabled, latest CI and Pages deployment succeeded, and `https://r0dolfs9.github.io/honestcost/` serves the app.
- [x] Run the current local test suite and record output in `WEEKEND_REVIEW_2026-05-28.md`.
- [x] Create first short Weekend Review note from automated/deployment checks.
- [ ] Add user weekend smoke-test notes after a real phone/browser pass.

## Stage 1 - Production Trust Base

- [ ] Do browser QA on deployed or staged site: car picker lazy-load, example comparison, saved scenarios, print/PDF, FAQ/status pages, OG image.
- [ ] Start the larger mobile/responsive pass after browser QA.
- [ ] Add a static `sikdatnes.html` cookie/tracking page after wording is approved.
- [ ] Add a static `accessibility.html` statement after an actual audit result exists.
- [ ] Add URL-param feature flags for local/staging testing.
- [x] Map current inline/external script, style, image, and connect surface for CSP in `CSP_SURFACE_2026-05-28.md`.
- [ ] Add CSP meta policy after browser QA confirms the candidate policy does not break the app.
- [ ] Add a proprietary `LICENSE` file once the copyright holder name is confirmed.
- [ ] Add copyright headers once the holder/entity name is confirmed.
- [ ] Start car data audit for top 30-50 Latvian-relevant models with source URLs and source dates.

## Stage 2 - Content And Display Ads Foundation

- [ ] Add a simple content/static comparison page structure.
- [ ] Draft first 6-10 useful Latvian content pages with original calculations.
- [ ] Keep display ad placements out of the calculator input/result flow.
- [ ] Apply for AdSense only after enough original content, contact/about, privacy/cookie basics, and policy review are ready.
- [ ] Log AdSense approval or rejection reasons.
- [ ] Confirm Search Console setup or add it to the user/account checklist.

## Stage 3 - Audience Proof Before Dealer Sales

- [ ] Add analytics dashboard summary only after the analytics provider is actually configured.
- [ ] Add share-friendly result output.
- [ ] Add "Report an error" or feedback form after provider/privacy path is known.
- [ ] Recruit and interview 5-10 car buyers.
- [ ] Research 12-20 dealer targets with names, roles, contact links, and active model/value angle.
- [ ] Build one-page dealer pitch using real or clearly marked demo proof.
- [ ] Prepare LinkedIn DM, email with screenshot, and follow-up templates.

## Stage 4 - First Dealer Money

- [ ] Add simplest static dealer config only when there is a real demo target.
- [ ] Support URL params such as `?dealer=...`, `?default_a=...`, and `?default_b=...`.
- [ ] Track dealer CTA clicks only after analytics is configured.
- [ ] Verify each dealer's public model/pricing pages before screenshots.
- [ ] Prepare privacy/DPA/legal basis before any live dealer lead capture.
- [ ] Send first dealer pilot offer and track status.

## Stage 5 - Repeatable MRR

- [ ] Create dealer CRM/pipeline: dealer, contact, first touch, status, next follow-up, objection, expected monthly value.
- [ ] Create monthly report template: comparisons, CTA clicks, leads, competitor models, estimated ROI.
- [ ] Create case study after first pilot if allowed.
- [ ] Add simple lead export/backup after lead capture exists.
- [ ] Add monitoring only after real live traffic exists.
- [ ] Target 3 paying dealers or EUR 500+ MRR.

## Stage 6 - Passive Income Mode

- [ ] Automate monthly dealer reports.
- [ ] Freeze non-essential features.
- [ ] Maintain weekly errors/uptime/revenue check.
- [ ] Maintain monthly top car prices and dealer reports.
- [ ] Maintain quarterly data-source and SEO audit.
- [ ] Complete handover for domain, GitHub, hosting, analytics, ad account, contracts, invoicing, deployment, and recovery.

## Stage 7 - Sale-Ready / Licensing

- [ ] Clean product overview, architecture, revenue, traffic, dealer contracts, data sources, legal status, and risks.
- [ ] Create buyer/licensee one-pager.
- [ ] Prepare data room: read-only repo, analytics exports, revenue proof, contract summaries, maintenance SOP, IP/license position.
- [ ] Research dealer groups, importers, insurance/finance portals, classified marketplaces, Baltic auto media, and TCO/finance operators.

## Already Handled Locally

- Added `test-calc.js`, a production calc smoke test that extracts the calc engine from `index.html`.
- Added `.github/workflows/ci.yml` to run `test-calc.js` and the existing `test_scenarios.js` on push / pull request.
- Added `HANDOVER.md` with factual repo structure, verification commands, and deployment cautions.
- Added `LESSONS.md` with one factual entry and a reusable lesson template.
- Added `PROJECT_STATUS.md` with unknown external/business/legal states explicitly marked as unknown.
- Fixed long car-name wrapping in the verdict bar.
- Added designed fallback car visuals and better real-image sizing.
- Added debug output behind `?debug=1` for intermediate calc values.
- Added localStorage saved scenarios with save/load/delete controls.
- Added print/PDF stylesheet and result-screen print action.
- Changed `car-db.js` to lazy-load when the car picker first opens.
- Added factual `faq.html` methodology page and `status.html` page.
- Regenerated `og-image.png` and added Open Graph / Twitter metadata.
- Added `test-ui-helpers.js` and `test-static-pages.js`; CI runs both.
- Pushed commit `a122c6a feat: add saved scenarios and static pages` to `origin/main`.

## User / Account / Legal Tasks

- [ ] File SIA registration via latvija.lv or official UR flow.
- [ ] Open a business bank account after SIA registration.
- [ ] Choose whether to use iubenda/Termly or another provider for Privacy Policy and Terms.
- [ ] Publish Privacy Policy after the legal entity details are known.
- [ ] Publish Terms of Service after the legal entity details are known.
- [ ] Decide cookie/tracking wording and publish the cookie notice.
- [ ] Decide EmailJS vs MailerLite EU vs another email provider.
- [ ] Create/configure the selected email provider account and API credentials.
- [ ] Hire or choose a bookkeeper/accounting setup.
- [ ] Decide your hourly rate and opportunity cost.
- [ ] Build the 18-month financial model assumptions.
- [ ] Contact Latvian lawyer for dealer contract review.
- [ ] Approve or revise DPA / dealer contract templates before signature.
- [ ] Decide VAT registration timing with accountant or VID.
- [ ] Get professional indemnity insurance quotes.
- [ ] Decide whether and when to file the HonestCost trademark.
- [ ] Set up DNS/MX records for `hello@honestcost.lv`, `support@`, and `partnerships@`.
- [ ] Configure DNS/custom-domain records so `honestcost.lv` and `www.honestcost.lv` resolve.
- [ ] Recruit real customer/advisor interview participants.

## Blocked To Avoid Fabrication

- Do not claim Sentry is installed until a real Sentry DSN exists.
- Do not claim UptimeRobot monitoring exists until a real monitor is created.
- Do not claim MailerLite backup exists until a real MailerLite/Zapier setup exists.
- Do not publish legal policies with fake company, registration, address, or controller details.
- Do not publish data-source claims unless the specific source URLs/dates are verified.
- Do not publish formula audit results until the audit tool has actually been run and reviewed.
- Do not add customer interview findings before interviews happen.
- Do not add advisor feedback before advisors respond.
- Do not claim affiliate partnerships until signed/confirmed.
- Do not claim accessibility compliance before an actual audit.
