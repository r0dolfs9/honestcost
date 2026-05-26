# Implementation Plan — HonestCost Redesign

Ordered task list for Claude Code. Each task is sized to be self-contained, testable, and pushable as its own commit. Run in order; don't skip ahead.

The target file is the existing single-file production HTML at `index.html` (in the user's NEW_CAR_TCO_CALCULATOR codebase). The handoff bundle's `designs/HonestCost v2.html` is the **reference**; use it as a visual source-of-truth but extract patterns into the existing file rather than replacing it wholesale.

**Golden rule:** Do not touch any function body in the existing JS. Markup, CSS, and DOM IDs only — preserve all `id="…"` attributes that the calc engine reads from.

---

## Phase 0 — Setup (5 min)

### Task 0.1 — Branch + safety copy
- [ ] `git checkout -b redesign/studio-direction`
- [ ] Snapshot the current `index.html` → `index.html.bak` so a rollback is one move
- [ ] Verify the site still loads from `index.html` after copy

### Task 0.2 — Vendor fonts
- [ ] Copy `fonts/` folder + `fonts.css` from this handoff into the project root
- [ ] In `index.html` `<head>`, replace the existing Google Fonts `<link>` block with: `<link rel="stylesheet" href="fonts.css" />`
- [ ] Hard-reload, open DevTools → Network: confirm 7 TTFs load with HTTP 200, no FOUT visible
- [ ] Commit: `chore(fonts): self-host Inter Tight, Barlow Condensed, DM Mono (OFL 1.1)`

---

## Phase 1 — Foundations (30–45 min)

### Task 1.1 — Update CSS custom properties
- [ ] In the existing `:root { … }` block at the top of `<style>`, replace **only the color, font-family, and shadow values** with the tokens from `README.md → Design tokens`
- [ ] Keep existing variables that don't conflict (e.g. car-a-bg, indigo-light) — add the new ones, then progressively delete unused ones in later tasks
- [ ] Update `body` font-family to `var(--ff-ui)`, font-size to 15px, letter-spacing to -0.005em
- [ ] Visual smoke test: page should already feel warmer and softer; layout intact
- [ ] Commit: `refactor(tokens): adopt Studio direction color + type tokens`

### Task 1.2 — Global type scale
- [ ] Replace existing `.logo-mark` with the new logo style (Barlow Condensed 24px, 600, -0.02em, amber 7px dot inline-flex)
- [ ] Define utility classes: `.h1`, `.h2`, `.label-kicker` (11-12px uppercase 0.04em ink-3), `.numeric` (DM Mono 500), `.display-num` (Barlow Condensed 600, -0.035em)
- [ ] Apply `.label-kicker` to all small uppercase labels in screen 1 + 2 (g-section-label, sec-title, hero-label, dep-title, cl)
- [ ] Commit: `style(type): introduce Inter Tight × Barlow Condensed × DM Mono scale`

### Task 1.3 — Page chrome (nav + footer)
- [ ] Replace `.site-header` with the new pill nav bar (see v2 mock § "Pill nav bar")
- [ ] **Do NOT add a sign-in button.** Where it would have lived, put the theme toggle (`#themeToggle`) instead
- [ ] Move the example preset buttons (`exBtnP1/P2/P3`) into a dropdown or chip row beneath the hero, NOT in the nav
- [ ] Add a `<footer>` at end of `.page-wrapper` matching v2 mock § "Footer" — four columns, link out to brand pages later (or just stub for now)
- [ ] Commit: `feat(nav): pill navigation + footer + theme toggle`

### Task 1.4 — Dark mode
- [ ] Copy the `[data-theme="dark"] { … }` block from `designs/HonestCost v2.html` into the existing `<style>` (full token override + a few component-specific overrides for `.verdict`, `.car-illust`, `.price-hero`)
- [ ] Copy the inline theme-toggle script from `designs/HonestCost v2.html` (bottom of file) verbatim — it handles `localStorage` persistence + initial `prefers-color-scheme` detection
- [ ] Test both themes for every screen and state; double-check the verdict panel doesn't lose its glow in dark mode (it shouldn't — the gradient already darkens)
- [ ] Commit: `feat(theme): dark mode with localStorage persistence`

---

## Phase 2 — Input screen (1–2 h)

### Task 2.1 — Hero
- [ ] Add a `.hero` block above `.proof-bar` (or replace the proof-bar with the new badge style)
- [ ] H1 copy: "Reālā mēneša cena — <span class='muted'>nevis bukleta</span>."
- [ ] Lede copy: keep existing "Ievadi divus auto…" tagline
- [ ] Commit: `feat(input): hero with social-proof badge`

### Task 2.2 — Settings pill
- [ ] Replace `.global-bar` chrome with a centered 760px max-width `.settings-pill` (white, 24px radius, 6px inner padding)
- [ ] Three child `.setting` cells: Periods · Nobraukums · Finansēšana
- [ ] Each cell has a 36px square icon tile, label kicker, and value (Inter Tight 14px 500)
- [ ] Clicking a cell expands a popover / dropdown with the existing range + toggle controls (keep `id="slOwn"`, `id="slKm"`, `id="gApr"`, etc. — calc reads them)
- [ ] The leasing sub-fields (`gDownPct`, `gApr`, `slTerm`, `gResidual`) live inside the Finansēšana popover, not always visible
- [ ] Commit: `feat(input): settings pill (single rounded bar replaces global-bar)`

### Task 2.3 — Car card structure
- [ ] Restyle `.car-col` → 28px radius, white surface, soft shadow-1, no top color stripe (the stripe felt corporate; use the silhouette gradient block instead)
- [ ] Header row: small letter-circle (A/B) + "Automobilis A" kicker + lucid-autofill mini-tag
- [ ] Replace the photo-box dashed placeholder with the gradient silhouette block from v2 mock (`linear-gradient(135deg, ${accent}11, ${accent}22)` + inline car-shape SVG)
- [ ] Two stat tiles (Cena + Garantija) — 18px radius, cream bg, 30px Inter Tight numerics
- [ ] Convert all `.sec` field-rows into chip groups (8px gap, 999px radius pills) — see v2 mock § "Spec chips"
- [ ] Hidden `<input>`s remain in the DOM (for the calc engine), revealed in a modal/sheet from "+ Vairāk" chip
- [ ] Commit: `feat(input): car card visual restructure (chips + silhouette + stat tiles)`

### Task 2.4 — Smart search
- [ ] Restyle `.db-search-inp` + `.search-dropdown` to match v2 mock (cream bg input on cream card, sharper dropdown)
- [ ] Keep `searchA/searchB` IDs and existing autocomplete logic untouched
- [ ] Commit: `style(input): search input + dropdown refresh`

### Task 2.5 — CTA + analyse button
- [ ] Replace `.btn-primary` with the new black pill style — 20px y / 44px x padding, 999px radius, shadow-2
- [ ] Center it; remove `.analyse-wrap` border wrapper
- [ ] Commit: `style(input): centered pill CTA`

---

## Phase 3 — Results screen (1.5–2 h)

### Task 3.1 — Verdict panel
- [ ] Insert a new `.verdict-panel` at the top of `#screen2` (above the current `.res-header`)
- [ ] Dark gradient bg, 36px radius, 40px padding, soft amber-tinted radial glow top-right
- [ ] Two-column grid: left = title + lede + action buttons, right = `<StudioVerdictBars />` equivalent (two horizontal bars, cheaper = amber)
- [ ] Title format: `${cheaperName} ir <span class="amber">€X lētāks</span>`
- [ ] Pull data from existing `lastA`, `lastB`, `lastG` globals — verdict re-renders in `renderResults()`
- [ ] Commit: `feat(results): dark verdict panel with horizontal scale`

### Task 3.2 — Result card refresh
- [ ] Restyle `.res-card` to 28px radius, white surface, 28px padding, shadow-1
- [ ] Header row: model name + trim + win/lose pill (green-soft "Lētākais" with check, OR red-soft "+€X/mēn")
- [ ] Hero block: tinted gradient bg using car accent (`${accent}10 → ${accent}05`), 22px radius, 64px Inter Tight monthly number, total below
- [ ] Add the stacked rainbow bar above the breakdown rows (segments share-weighted, accent → accent+22 alpha)
- [ ] Convert `.cost-tbl` to flat row list (no table) — label left in ink-2, DM Mono 500 value right
- [ ] Remove the `.aff-block` indigo-tinted boxes — replace with a single subtle "Salīdziniet KASKO" CTA at card bottom (small text link, no big box)
- [ ] Keep all `id="resGrid"`, `card()` function call sites and data plumbing
- [ ] Commit: `feat(results): result card visual + structural refresh`

### Task 3.3 — Depreciation card
- [ ] Insert a `.dep-card` after `#resGrid` (replacing the existing `.dep-sec` inside each card — pull it out into a shared card)
- [ ] Two horizontal residual bars (one per car) with `.track` + `.fill` styled to v2 mock
- [ ] SVG dual-line chart below — 800×220 viewBox, both curves colored via car-a / car-b tokens
- [ ] Title: "Cik vērts pēc 5 gadiem" kicker + "Amortizācija ir <span class='warn'>lielākā izmaksa</span> abiem."
- [ ] Year labels: "Sākums · 1g · 2g · 3g · 4g · 5g" in DM Mono
- [ ] Commit: `feat(results): depreciation card with dual-line chart`

### Task 3.4 — How-we-calculate strip
- [ ] Restyle `.how-wrap` to a compact horizontal strip — small info-circle icon + h4 + lede + "Skatīt avotus →" link
- [ ] On expand, show the existing source rows in a wide single card (keep all existing `<a>` source links intact)
- [ ] Commit: `style(results): condensed how-we-calculate strip`

### Task 3.5 — Email capture refresh
- [ ] Restyle `.email-capture` block — soft cream surface, no purple gradient, single-line form
- [ ] Keep `captureEmail`, `captureBtn`, `emailStatus` IDs (EmailJS reads them)
- [ ] Commit: `style(results): email capture restyled`

---

## Phase 4 — Responsive + polish (45 min)

### Task 4.1 — Mobile breakpoint
- [ ] Update `@media (max-width: 768px)` rules to match new spacing: stack cards, reduce card padding to 18px, hero h1 → 44px
- [ ] Verdict panel: collapse to single column, bars stack
- [ ] Depreciation chart: horizontal scroll inside a `.dep-chart-scroll` wrapper
- [ ] Test on iPhone SE width (375px) and a tablet (768px)
- [ ] Commit: `style(mobile): adjust 768px breakpoint to new spacing`

### Task 4.2 — Micro-interactions
- [ ] Add card hover lift transitions (`transform: translateY(-2px)` + shadow-2, 150ms)
- [ ] Add CTA active press (`transform: scale(0.97)`, 100ms)
- [ ] Bar chart enter — width transition 0 → final, 600ms `cubic-bezier(.2,.8,.2,1)` (toggle a `.is-mounted` class after `renderResults`)
- [ ] Commit: `style(motion): hover lifts + CTA press + bar enter animation`

### Task 4.3 — Accessibility pass
- [ ] Verify all form labels have proper `<label for="…">` association
- [ ] Tooltip buttons (`.tip-icon`) have `aria-label`
- [ ] Verdict panel has appropriate heading level + landmark
- [ ] Color contrast: ink-3 on bg passes AA for body text (re-check the small label kickers)
- [ ] Commit: `a11y: labels, aria, contrast pass`

---

## Phase 5 — Cleanup + ship (30 min)

### Task 5.1 — Remove dead CSS
- [ ] Delete unused CSS rules from the old design: `.col-header.ca/cb` color stripes, `.btn-ghost` if replaced everywhere, `.indigo-light` references, old `.proof-bar`, `.comp-bar` gradient if dropped, etc.
- [ ] Search for orphan tokens in `:root` and remove
- [ ] Commit: `chore(css): remove dead old-design rules`

### Task 5.2 — Update OG image
- [ ] Regenerate `og-image.png` to reflect new visual style (warm bg, big monthly numerics, two-car silhouette). Out of scope for code — file a separate task or use a static export from `HonestCost v2.html` cropped to 1200×630.
- [ ] Commit: `chore(og): refreshed open-graph card`

### Task 5.3 — Final QA
- [ ] Run all three example presets (BMW 118i × X1, ID.4 × Tiguan, Yaris × Fabia) — verify monthly numbers match pre-redesign
- [ ] Toggle leasing ↔ cash — leasing sub-fields appear in popover, calc updates
- [ ] Toggle EV/PHEV — conditional fields show in the "+ Vairāk" sheet
- [ ] Submit email capture in dev mode — EmailJS payload still works
- [ ] Run Lighthouse — aim for 95+ on Performance, A11y, Best Practices
- [ ] Commit: `chore: final QA pass`

### Task 5.4 — Deploy
- [ ] Merge `redesign/studio-direction` → `main`
- [ ] Push, verify on production domain
- [ ] Announce in changelog: "Redesigned interface — same numbers, warmer feel."

---

## Out of scope (do not do)

- Do **not** change the calculation engine (`calcAll`, `residual`, `kasko`, etc.)
- Do **not** change the `CAR_DB`, `DEP`, `TYRE`, `RBUF`, `FUEL`, `OCTA_EST` constants
- Do **not** translate copy — keep Latvian
- Do **not** introduce React, Vite, Tailwind, or any build step — this stays single-file HTML
- Do **not** add new analytics events without checking Plausible config first
- Do **not** add new car models to `CAR_DB` without verifying 2026 Latvian market prices

---

## Open questions / decisions for the human

Resolved decisions (per the design owner, 19 May 2026):

1. **Car imagery** — use real photos eventually; sourcing TBD. Ship MVP with silhouette placeholders. Recommended path: `car.imagin.studio` CGI renders in Phase 2. **See `IMAGERY_OPTIONS.md` in this folder for the full breakdown** — includes why scraping dealer photos is a bad idea.
2. **Dark mode** — ship it. Theme toggle is already wired into `designs/HonestCost v2.html` (lives in the nav, persists to `localStorage` under key `honestcost-theme`, respects `prefers-color-scheme` as initial value).
3. **Sign-in button** — hidden. The slot in the nav is now occupied by the theme toggle instead.

Still open:

4. **EmailJS template** — does the existing template need an HTML refresh to match new brand?
5. **`Pieslēgties` / accounts** — not planned in this redesign; if added later, will need its own design pass.