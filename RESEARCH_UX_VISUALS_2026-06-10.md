# HonestCost — UX Walkthrough + Car Visual Identity System
## Specialist research & plan · 2026-06-10

Method: full user-journey pass on the live deployed site (commit on origin/main), in-browser interaction via real Chrome, plus code-level verification against `index.html`. The visual system below was designed, rendered, critiqued and iterated twice in-browser before being shipped to `car-visuals.js`.

---

## PART 1 · Using the tool as a first-time user — what's good, what's bad

### What works well (keep, don't touch)

1. **The core promise lands.** Two cars in, one honest monthly number out, with a full per-category breakdown and a depreciation curve. No login, no paywall, instant. This is the product's whole moat and it works.
2. **Result screen is the strongest screen.** Verdict, breakdown table, residual-value timeline, on-result sliders (km/years) that recalculate without going back — that last detail is genuinely better than most configurators.
3. **Car picker with 376→416-car DB and lazy loading.** Search responds instantly, shows price per row, fills all 12 fields on pick. Lazy-load keeps first paint light (verified: CAR_DB absent until picker opens).
4. **Trust surface exists where competitors have none.** "Kā mēs aprēķinām", per-formula sources, methodology/FAQ page, disclaimer. 18 tooltips explain every input in plain Latvian.
5. **Saved scenarios + print/PDF** work (verified live). localStorage-only is the right privacy call pre-GDPR-pages.
6. **Dark/light theming and the overall art direction** are above the bar for LV consumer tools.

### What's broken or missing (ranked by user impact)

1. **🔴 Shareable comparison URL is GONE.** The redesign dropped hash serialization entirely (verified: zero hash read/write code). Worse: the email-capture flow still sends `location.hash` — always empty — so the "jūsu salīdzinājums ir saglabāts saitē" email delivers a link to a blank homepage. This is the product's only organic-growth mechanism and a silent promise-break. *Fix first.*
2. **🔴 Cold start is too slow.** No example chips (the old build's "Ielādēt piemēru" was dropped too). A first-time visitor faces ~12 empty fields before seeing any value. Old roadmap target was "first result in <15 s"; currently it's minutes. *Reintroduce 3 one-tap examples that fill AND analyse.*
3. **🟡 Tablet-width overflow.** ~70 px horizontal scroll between ~780–1100 px viewports (hero h1 and leasing-fields don't compress). Phones are fine post-viewport-fix; tablets/split-screens see a scrollbar.
4. **🟡 No feedback channel on the result screen.** A "kaut kas neprecīzi?" mailto link was planned (Stage 3) and is absent; with stale prices guaranteed over time, users need a one-click error-report.
5. **🟡 OCTA/KASKO are estimates presented next to verified prices.** The row-level trust difference (audited price vs authored estimate) is invisible to users. A small "pārbaudīts 06.2026" badge for source-backed rows (data exists in car-sources.js) would convert the audit work into visible credibility.
6. **🟢 Screen transition jank.** During heavy DOM swaps the renderer intermittently blocks (observed repeatedly via CDP timeouts during testing — reveal animations + Lucide re-scan are suspects). Worth a profiling pass.
7. **🟢 No EN/RU fallback** — Riga has a large Russian-speaking buyer segment; bounce risk.

---

## PART 2 · Car visual identity system (designed + shipped this session)

### The honest design position

"Look at the picture and instantly tell which car it is, without the badge" is achievable for cars with iconic geometry (911, ID. Buzz, Ioniq 6, EV9, Duster, Ora 03) and is NOT achievable for lookalike mainstream cars (Golf vs Octavia vs i30 read nearly identically even as photos-in-silhouette). Pretending otherwise produces 416 slightly-wrong drawings and infinite maintenance. The professional solution is a **parametric silhouette system**:

- **24 body archetypes** (city hatch, hatch, sedan, long sedan, liftback, wagon, coupé, 4-door coupé, front/rear-engine sports, low GT, CUV, SUV, full-size SUV, SUV-coupé, boxy offroader, one-box, van, MPV, pickup, EV wedge, EV streamliner, retro...) — each a tuned set of proportions: length, roof height, beltline, windshield rake, tail construction, wheel size, ground clearance.
- **Family override map**: distinctive models route to their archetype by name (911→rear-engine arc, Taycan/Panamera→low GT, Ioniq 5→wedge, Ioniq 6/EQS→streamliner, ID. Buzz/Staria→one-box, Duster/Tank→boxy offroader, EV9/X7/GLS/XC90→full-size box, X6/EV6→SUV-coupé, Ora 03/Mini→retro, CLA/Arteon→4-door coupé, Octavia/Superb→liftback...). Everything else falls through to body+price+tyre heuristics, so **all 416 cars get a correctly-proportioned profile automatically — including future rows, with zero per-car work**.
- **Semantic cues**: EVs get closed noses and aero-disc wheels; ICE gets a grille slot; sport trims (RS/GTI/M/AMG/vRS or ≥300 kW) sit lower and grow a spoiler; SUVs/wagons/MPVs get roof rails; every car gets sill shading, a B-pillar door line, head/tail lights.
- **Perfect fit by construction**: every SVG is the same 260×110 viewBox with the car scaled inside it — it can never overflow its card, at any container size, in either theme (fill uses the existing `--visual-color` per side).

### Verification done

Rendered a 24-car grid in-browser (iconic + mainstream mix), critiqued, and iterated: v1 read as "blobs with windows" (glass band too thin, wheels too bright, 911 generic); v2 fixed proportions, calmed wheels, added structure lines, gave the 911 a continuous roof arc. v2 verified on screen: one-boxes, SUVs, wagons, sedans, hatches, streamliners and GTs are each instantly distinguishable as classes, and the override models read as themselves at card size.

### Shipped

`car-visuals.js` (eagerly loaded, ~10 KB), integrated into `carVisualMarkup` with graceful fallback to the old CSS blob if the script is absent; CSS overrides added; all 6 test suites pass (markup contract preserved). Photo URLs still take priority when present — the silhouette is the no-photo fallback, which today is every car.

### Known limits + next quality steps

1. 911 reads "wedge sports car", not unmistakably 911 — needs a rounder cabin dome (single-arc roof from windshield base).
2. Duster vs EV9 vs XC90 differ only in size/rails — acceptable at class level; per-family DRG tweaks (window kinks, clamshell bonnet hints) are cheap follow-ups in the override map.
3. The real path to literal per-model recognition is the existing `photoUrl` field: license or generate per-family hero images for the top-30 searched models and let the silhouette remain the long-tail fallback. Plan item, not blocker.

---

## PART 3 · Prioritized plan

| # | Item | Why | Effort |
|--:|---|---|---|
| 1 | Rebuild shareable URL (hash serialize on analyse + parse on load + "Kopēt saiti" button); fix email-capture link | Growth loop + promise-break bug | 0.5 d |
| 2 | Reintroduce 3 example chips that fill + auto-analyse | Cold-start <15 s | 2 h |
| 3 | Tablet overflow CSS (hero h1 wrap, leasing-fields wrap <900 px) | Layout integrity | 1 h |
| 4 | "Pārbaudīts" badge on source-backed rows from car-sources.js | Converts audits into visible trust | 2 h |
| 5 | Result-screen feedback mailto | Error-report channel before traffic | 0.5 h |
| 6 | 911 roof arc + 2-3 family tweak passes on silhouettes | Visual polish | 1 h |
| 7 | photoUrl pipeline for top-30 models | True per-model recognition | research |
| 8 | Profile screen-transition jank | Perceived quality | 0.5 d |
| 9 | EN locale behind ?lang=en | Riga market reach | 1-2 d |

Everything in Part 3 is unblocked engineering except #7 (image licensing decision) and #9 (translation review).

— Compiled 2026-06-10, against live deploy + working tree at commit `0d8ff30` + this session's visual-system commit.
