# HonestCost Roadmap

Last updated: 2026-05-28

Open this file first. It is the command center for turning HonestCost into a low-maintenance revenue asset that stays clean enough to sell or license later.

## Current Status

- Local product files exist: `index.html`, `car-db.js`, `faq.html`, `status.html`, `sitemap.xml`, `robots.txt`, and `og-image.png`.
- Automated local checks exist: `test-calc.js`, `test_scenarios.js`, `test-ui-helpers.js`, and `test-static-pages.js`.
- CI exists at `.github/workflows/ci.yml`.
- Current git remote: `https://github.com/r0dolfs9/honestcost.git`.
- Latest local commits seen on 2026-05-28: `0995096 docs: update honestcost project status`, `a122c6a feat: add saved scenarios and static pages`.
- GitHub repo is public and reports `has_pages: true`.
- GitHub Pages subpath is live at `https://r0dolfs9.github.io/honestcost/`.
- Custom domain `honestcost.lv` and `www.honestcost.lv` do not resolve from the direct HTTP/DNS check run on 2026-05-28.
- Main external/legal/business states remain unknown unless explicitly proven in this roadmap or linked docs.

## Deployment Reality Check

Checked on 2026-05-28:

- `https://honestcost.lv`: fails DNS resolution (`curl: Could not resolve host: honestcost.lv`).
- `https://www.honestcost.lv`: fails DNS resolution (`curl: Could not resolve host: www.honestcost.lv`).
- `https://r0dolfs9.github.io/honestcost/`: returns `200 OK` from GitHub Pages.
- `https://r0dolfs9.github.io/honestcost/faq.html`: returns `200 OK`.
- `https://r0dolfs9.github.io/honestcost/status.html`: returns `200 OK`.
- `https://r0dolfs9.github.io/honestcost/og-image.png`: returns `200 OK`.
- `https://r0dolfs9.github.io/honestcost/car-db.js`: returns `200 OK`.
- GitHub repo API: `r0dolfs9/honestcost` is public, default branch is `main`, `has_pages` is `true`, latest pushed commit is `0995096d2a7f56f89bd7911cf490541a77a04185`.
- GitHub Actions API: latest `HonestCost CI` run for `0995096` completed successfully; latest `pages build and deployment` run for `0995096` completed successfully.
- GitHub Pages REST endpoint `/repos/r0dolfs9/honestcost/pages` returned `404` without auth, so exact Pages source settings are not proven from the API.

## This Week

Primary goal: Phase 0 cleanup, then one focused trust/product QA pass.

- Use `https://r0dolfs9.github.io/honestcost/` for browser QA until `honestcost.lv` DNS is configured.
- Record `honestcost.lv` DNS/custom-domain setup as a user/account task before treating the custom domain as live.
- Run the local test suite before changing product behavior:
  - `node --check test-calc.js`
  - `node --check test_scenarios.js`
  - `node --check test-ui-helpers.js`
  - `node --check test-static-pages.js`
  - `node test-calc.js`
  - `node test_scenarios.js`
  - `node test-ui-helpers.js`
  - `node test-static-pages.js`
- Do one mobile/responsive pass before adding ads or dealer-specific features.
- Keep legal pages blocked until the real controller/entity details are known.
- Keep the calculator flow clean: no display ads inside the input/result decision path.

## Weekend Test Checklist

Spend 30-45 minutes. Test one prepared batch only.

- Desktop app loads.
- Phone-width app loads without broken layout.
- Car picker lazy-loads `car-db.js` on first open.
- Example comparison runs.
- Saved scenario can be saved, loaded, and deleted.
- Print/PDF action is usable.
- FAQ page loads.
- Status page loads.
- Content/static links do not 404.
- If deployed, `https://honestcost.lv/og-image.png` loads.
- Record blockers in the Done Log below or in the weekly Weekend Review note.

## Revenue Pipeline

Default monetization order:

1. Build trust base: credible calculator, FAQ/methodology, status, contact/about, cookie/tracking explanation.
2. Add 6-10 useful content/comparison pages.
3. Put display ads only on content pages after AdSense readiness is credible.
4. Use ads as passive validation, not the main business.
5. Build dealer proof from analytics, buyer feedback, and shareable outputs.
6. Sell recurring dealer pilots.

Dealer MRR is the main income target. Initial dealer offer:

- Pilot: free or up to EUR 100 for 30 days if needed.
- Target paid price: EUR 200/month.
- Deliverables: dealer-specific URL, default comparisons, CTA to dealer email/CRM, and monthly report.
- Do not collect dealer leads until privacy/DPA/legal basis is reviewed.

## Legal / Company Blockers

Official sources checked on 2026-05-28:

- Google AdSense eligibility: requires eligible own content, policy compliance, and applicant age of at least 18. Source: https://support.google.com/adsense/answer/9724
- Latvian SIA registration submission/fees: UR page lists online submission and current state-fee table for SIA registration. Source: https://www.ur.gov.lv/lv/registre/uznemumu-vai-komersantu/sia/dibinasana/registracija-uznemumu-registra/iesniedz-dokumentus/
- Latvian VAT guidance: VID VAT page updated 2026-03-13; VAT standard rate 21%, and registration guidance must be checked before deciding voluntary/mandatory VAT timing. Source: https://www.vid.gov.lv/lv/pievienotas-vertibas-nodoklis
- VID FAQ notes a EUR 50,000 registration threshold context. Source: https://www.vid.gov.lv/lv/biezak-uzdotie-jautajumi-katalogs/pievienotas-vertibas-nodokla-jautajumi-par-registraciju-un-ipasajiem-rezimiem-esmu-pvn-maksatajs

Blocked until user/accountant/lawyer confirms:

- SIA registration filed or active.
- Business bank account.
- Privacy Policy controller/entity details.
- Terms of Service entity details.
- Cookie/tracking wording.
- VAT registration timing.
- Dealer service agreement and DPA.
- Copyright holder for `LICENSE` and copyright notices.

## Research Backlog

Must research before decisions:

- Live domain and GitHub Pages deployment status for `honestcost.lv`.
- Current SIA process/fees immediately before filing.
- Current VID VAT registration threshold and voluntary VAT tradeoffs.
- Privacy, Terms, and Cookie requirements for analytics, ads, email capture, and dealer lead routing.
- AdSense readiness for auto/finance content.
- Latvian car/finance SEO keywords and content opportunities.
- Top 30-50 Latvian-relevant car models with source URLs, source dates, prices, WLTP, warranty, and assumptions.
- At least 12 dealer targets with real contacts and decision-maker roles.
- Professional indemnity insurance only when dealer revenue is close.
- Trademark filing only after brand commitment is confirmed.
- Acquisition/licensing buyer list after MRR or strong usage proof exists.

## Do Not Claim Until Proven

- Monitoring: do not claim Sentry, UptimeRobot, Better Stack, or alerting is live until accounts, IDs, and test alerts exist.
- Legal compliance: do not claim GDPR/legal compliance until policies reflect the real controller/entity and tracking stack.
- Affiliate revenue: do not claim affiliate partnerships or income until signed/confirmed.
- Dealer deals: do not claim pilots, leads, partnerships, or MRR until documented.
- Data verification: do not claim car data is current unless each data point has a source URL and source date.
- Accessibility: do not claim accessibility compliance until an actual audit has been run and issues are tracked.
- Uptime: do not claim production uptime until a monitor exists and has history.
- AdSense: do not claim eligibility, approval, or earnings until Google has reviewed/approved the site or rejection reasons are logged.

## Done Log

2026-05-28:

- Created this roadmap as the first-open HonestCost command center.
- Converted `NEXT_TASKS.md` into ordered stages with blocker discipline.
- Re-checked key official source URLs for AdSense, SIA registration, and VID VAT guidance.
- Verified the GitHub Pages subpath is live and the custom domain does not resolve.
- Created `WEEKEND_REVIEW_2026-05-28.md` from automated/local/deployment checks.
- Mapped current CSP surface in `CSP_SURFACE_2026-05-28.md`; policy enforcement remains open until browser QA is available.
- Fixed `faq.html` and `status.html` nav links to work from the GitHub Pages subpath.

2026-05-29:

- Started car database credibility audit in `CAR_DATA_AUDIT_2026-05-29.md`.
- Found that `car-db.js` has broad/complete prototype coverage, but lacks row-level source URLs/dates and has current-price mismatches in spot checks.
- Added `car-sources.js` plus `test-car-sources.js` so the first 11 audited rows have enforceable source metadata.

2026-06-10:

- Fixed calc-engine gaps from AUDIT.md: OCTA estimate now rates by kW when known (cc fallback for manual entry), service costs gained a 24-month time floor for low-mileage drivers, and DEP depreciation tables were extended to an 8-year tapering tail.
- Added URL-param feature flags (`?flags=a,b` via `parseFlags`/`hasFlag`) and ARIA labels on all 18 tooltip buttons.
- Second guarded car-db.js batch: `toyota_yaris_hyb`, `toyota_yaris_cross_hyb`, `toyota_corolla_hyb` updated from live WESS price tables; audit trail in `CAR_DB_UPDATE_AUDIT_2026-06-10_TOYOTA_DACIA.md`.
- Expanded `car-sources.js` from 20 to 25 rows (3 Toyota refreshed/resolved, 4 Dacia entry-price rows added as needs_mapping).
- Built the Stage 2 content section: `content/index.html` hub plus 6 Latvian articles with numbers computed from the production calc engine; added to `sitemap.xml`, linked from app/FAQ/status navs, covered by `test-static-pages.js`.
- CI now also runs `test-audited-car-db-values.js`. Full local suite (6 files) passes.
