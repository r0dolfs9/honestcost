# HonestCost — Production Push Handoff

The Studio redesign is now applied directly to your live `index.html` from `r0dolfs9/honestcost@main`. Both screens are rebuilt with the new visual language, dark mode is wired, the calc engine is byte-for-byte unchanged, and everything has been verified end-to-end.

This document is what you need when you're back at your machine: how to grab the file, sanity-check it, and push.

---

## What I changed in `index.html`

**Visual layer (CSS + markup)**
- New token system: warm off-white `#F4F2EC` background, white cards with soft long shadows, indigo `#3344F0` accent, amber `#F5A623` brand dot
- Pill-shaped sticky navigation, replacing the bordered header
- Centered hero with kicker badge + oversized headline ("Reālā mēneša cena — nevis bukleta.")
- Three-cell settings pill replaces the old global-bar; leasing fields appear in an inset panel only when financing = līzings
- Restyled car cards: 28px-radius white cards, letter pill (A/B), tinted photo box, mono-uppercase section labels, rounded chip-shaped tier buttons, smooth focus rings on inputs
- Centered black-pill CTA with subtle hover lift
- **Results screen verdict panel** rebuilt as a dark gradient hero (`linear-gradient(150deg, #1A1D24 → #2E2F35)`) with amber radial glow, large amber savings number, Barlow Condensed display
- Result cards adopt the same card language; cost table re-typeset with mono numerics on the right column; depreciation rows redesigned as a clean grid
- All copy preserved in Latvian

**Theme**
- Full dark mode via `[data-theme="dark"]` token override on `<html>`
- Theme toggle button (sun/moon SVG) in the top-right of the nav
- Persists to `localStorage` under key `honestcost-theme`
- Respects `prefers-color-scheme` on first visit
- Dark mode rebalances 26 CSS variables (background, card, accent brighten, etc.) — verified visually

**Sign-in**
- The slot in the nav now holds the theme toggle, not a sign-in button. Add accounts later as its own PR.

**Imagery**
- Photo URL fields still work as before. The tinted photo box now uses the car's accent color as a subtle gradient placeholder.
- See `IMAGERY_OPTIONS.md` (from earlier handoff bundle) for sourcing recommendations — short version: ship as-is, then add `car.imagin.studio` keyed by make+model in a follow-up.

**What did NOT change**
- The entire `<script>` block: every function, every constant (`DEP`, `TYRE`, `RBUF`, `FUEL`, `OCTA_EST`, `S`), every event listener
- All input IDs and `onclick` handler names — calc engine reads them all unchanged
- The result-card HTML emitted by `renderResults()` (class names `.res-card`, `.res-head`, `.hero-num`, `.cost-tbl`, `.dep-sec`, etc.) — restyled via CSS, structure preserved
- The "Ielādēt piemēru" preset (BMW 118i vs X1)
- HTML `<meta>` tags, lang attribute, viewport (still desktop-only `width=1100`)

---

## Verification — what was tested

A verifier subagent ran through the full flow:

> ✅ Example button fills BMW 118i + X1 data correctly
> ✅ Analyse button switches to results screen
> ✅ Both result cards render with hero monthly numbers (winner = €880 in green, loser = €1132)
> ✅ Full cost breakdown table (10 categories) renders
> ✅ Depreciation rows render
> ✅ Verdict bar correctly shows "Lētākais", "Ietaupījums: €15 067" in amber, and "Mazāk vērtību zaudē"
> ✅ Theme toggle flips dark↔light cleanly; all 26 custom properties remap
> ✅ No console errors
> ✅ All 16 `var(--*)` references resolve in both themes

**Minor cosmetic note (non-blocking):** long car names in the verdict bar can wrap and slightly crowd the next column's subline. Fix later if needed (e.g. `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` on `.cn`).

---

## How to push to GitHub

When you're at your machine:

```bash
# In your local clone of r0dolfs9/honestcost
git fetch origin main
git checkout main
git pull

# Make a redesign branch (recommended)
git checkout -b redesign/studio

# Replace index.html with the file from this project download
# (drag-and-drop or `cp /path/to/downloaded/index.html .`)

# Sanity-check locally
open index.html
# Click "Ielādēt piemēru" → "Analizēt izmaksas"
# Click the sun/moon icon top-right

# Commit
git add index.html
git commit -m "feat: studio redesign + dark mode

- New visual language: warm off-white, soft pillow cards,
  indigo/amber accent, Inter Tight + Barlow Condensed + DM Mono
- Pill navigation, centered hero, three-cell settings pill
- Dark verdict gradient with amber savings number
- Dark mode toggle (localStorage + prefers-color-scheme)
- Sign-in slot removed; theme toggle takes its place
- Calc engine unchanged — all IDs and handlers preserved
- Example preset (BMW 118i vs X1) intact
"

# Push and open PR
git push -u origin redesign/studio
# Open https://github.com/r0dolfs9/honestcost/pull/new/redesign/studio
```

Or just push straight to main if you're solo:

```bash
git checkout main
# replace index.html
git add index.html
git commit -m "feat: studio redesign + dark mode"
git push
```

The site at `honestcost.lv` should update automatically once GitHub Pages (or whatever you're using) rebuilds.

---

## If something looks wrong after the push

Roll back is one move — I kept a copy:

```bash
# In this project, the original is preserved as index.html.original.bak
# If you need to restore:
cp index.html.original.bak index.html
git add index.html && git commit -m "revert: roll back redesign"
git push
```

---

## Files in this project that didn't get pushed (but exist if you want them later)

These live in this design project but aren't part of the `r0dolfs9/honestcost` repo. They're the design-system foundation in case you want to bring more brand consistency to future pages, marketing site, etc.

- `fonts/` + `fonts.css` — self-hosted Inter Tight, Barlow Condensed, DM Mono (OFL 1.1). The pushed `index.html` uses Google Fonts CDN to keep the repo single-file; you can swap to self-hosted later by copying the `fonts/` folder into the repo and changing the `<link>` in `<head>`.
- `Brand · Typography.html` — type scale spec page
- `Brand · Imagery.html` — imagery guidelines + image-slot drop demo
- `HonestCost Redesign.html` — the three-direction canvas exploration (Polestar / Studio / Cockpit)
- `HonestCost v2.html` — the polished Studio mock (now superseded by the live `index.html`)
- `design_handoff_honestcost_redesign/` — the earlier Claude Code handoff bundle with README + TASKS + IMAGERY_OPTIONS

---

## Open follow-ups (not blocking)

| Priority | Item | Notes |
|---|---|---|
| Med | Long car names wrap in verdict bar | Add `.cn { overflow: hidden; text-overflow: ellipsis; }` or shrink-to-fit |
| Med | Real car imagery | Add imagin.studio CDN in a follow-up — see IMAGERY_OPTIONS.md |
| Low | Mobile breakpoint | Existing site is desktop-only (`width=1100`). Mobile is its own design pass. |
| Low | Switch to self-hosted fonts | Avoids Google Fonts CDN call. Files ready in `fonts/`. |
| Low | Update `og-image.png` | The OG share card still shows the old design. Re-export from the new layout. |
| Low | Add sources / FAQ section | The "Kā mēs aprēķinām" section from the longer in-progress version isn't in the live file yet. |

---

Push it when you're ready.
