# Handoff: HonestCost Redesign

A complete visual + interaction redesign of the HonestCost auto-cost comparison calculator (honestcost.lv). This package contains the design references, brand foundations, and an ordered task list so Claude Code can land the redesign in the existing single-file HTML codebase incrementally.

---

## ⚠️ About the files in this package

The `designs/` folder contains **design references created in HTML** — prototypes that show the intended look, layout, and behavior. They are **not** production code to copy-paste into the existing app verbatim.

The existing HonestCost codebase is a single `index.html` (~2000 lines) with inline CSS + JS calculation engine, hosted at `honestcost.lv`. Your job is to **port the new visual language onto that existing file** while preserving every piece of working logic (`calcAll`, `CAR_DB`, `DEP`, `TYRE`, `RBUF`, `fuelAnnual`, `leasing`, `residual`, `kasko`, etc.).

Implementation target = the same single-file HTML (no framework change). The JSX components in `designs/redesign/` are just for the multi-direction canvas exploration and should be translated to vanilla DOM + CSS.

---

## Fidelity

**High-fidelity.** Final colors, typography, spacing, shadow values, and component shapes are decided. Use the exact tokens listed below. The depreciation chart, breakdown rows, verdict panel, and settings pill are all rendered at production-grade detail in `HonestCost v2.html`.

The interactive behavior is **not** wired up in the mocks — that's your job (reuse the existing calc engine).

---

## Repo / hosting

- Production domain: `honestcost.lv`
- Codebase: single-file HTML, plausible analytics + EmailJS already wired
- Hosting: assumed static (Netlify/Vercel/equivalent — no build step required)
- Language: **Latvian** (lang="lv"). Keep all existing Latvian copy; do not translate.

---

## Design direction

The chosen direction is **Studio** (warm minimal × tech-product). Two other explorations live in `HonestCost Redesign.html` (Polestar — sharp minimal; Cockpit — dark technical) for reference if specific elements need to be borrowed.

**Vibe in one line:** Apple Card meets Rivian configurator. Warm off-white background, white cards with soft long shadows, pillowy rounded corners (18–36px radius scale), oversized friendly numerics, indigo primary + amber dot accent.

---

## Screens

### 1. Input screen (replaces existing Screen 1)

**Purpose:** User picks two new cars + global parameters (horizon, annual km, financing).

**Layout, top to bottom (max-width 1280px, centered):**

1. **Pill nav bar** — white, 20px radius, soft shadow. Logo left, 4 nav pills center (Salīdzināt, Modeļi, Kā tas darbojas, Blogs), language + sign-in right.
2. **Centered hero** — small "1 240 salīdzinājumi šomēnes" badge with green dot, then `<h1>` "Reālā mēneša cena — nevis bukleta." (last 2 words greyed). Lede paragraph below.
3. **Settings pill** — single rounded white container, three cells (Periods / Nobraukums / Finansēšana). Active cell has cream inset background.
4. **Two car cards** side-by-side — each contains: search input (auto-fill from `CAR_DB`), big model name, sub-trim, gradient silhouette block, two stat tiles (price + warranty), then a flex-wrap of spec chips (degviela, patēriņš, CO₂, KASKO level, riepas, klase, + "+ Vairāk").
5. **CTA** — centered black pill "Salīdzināt izmaksas →", oversized shadow.

**Key dimensions:**
- Card padding: 28px
- Card border-radius: 28px (outer), 22px (inner gradient block), 20px (stat tile), 999px (chip)
- Hero h1: 72px, weight 600, letter-spacing -0.035em, line-height 1.02

### 2. Results screen (replaces existing Screen 2)

**Purpose:** Show which car is cheaper monthly + full breakdown of both.

**Layout, top to bottom:**

1. **Same pill nav** (sticky optional)
2. **Verdict panel** — dark gradient (`linear-gradient(150deg, #1A1D24, #25272D, #2E2F35)`), 36px radius, deep amber-tinted radial glow top-right. Two-column grid: left = "Spriedums" label, large title "BMW 118i ir [amber]€8 640 lētāks[/amber]", lede paragraph, two action buttons (amber-primary + white-outline). Right = stacked horizontal bar chart of monthly costs, cheaper car colored amber, other ghosted in white-10%.
3. **Two result cards** — 28px radius white cards. Each contains:
   - Model name + trim (header row)
   - Win/lose badge (green pill "Lētākais" with check, or red pill "+€X/mēn")
   - Soft tinted hero block — 64px monthly number, sub-label, total below
   - Stacked rainbow bar (segments colored from accent → accent+22) showing share of monthly
   - Row list of 10 cost lines: amortizācija, līzings, degviela, KASKO, apkope, riepas, OCTA, transp. nodoklis, papildu garantija, stāvvieta+mazgāšana — DM Mono numerics
4. **Depreciation card** — single wide white card with chart + two horizontal residual bars per car. Tinted "warn" red used to emphasize "Amortizācija ir lielākā izmaksa abiem."
5. **How-we-calculate strip** — single condensed link block; expands to full sources list (keep existing `<details>` from original)
6. **Footer** — 4 columns (Produkts / Saturs / Brand / Disclaimer)

---

## Design tokens

All hex values, weights, and dimensions live in `designs/HonestCost v2.html` at the top of `<style>`. Copy these CSS custom properties verbatim into the existing `:root` in `index.html`.

### Color

| Token | Value | Use |
|---|---|---|
| `--ink` | `#16181D` | Primary text, dark buttons |
| `--ink-2` | `#4A4E58` | Secondary text |
| `--ink-3` | `#878B95` | Tertiary text, labels |
| `--line` | `#ECEAE3` | Hairlines on light surfaces |
| `--line-2` | `#E1DED4` | Slightly deeper hairlines |
| `--bg` | `#F4F2EC` | Page background (warm off-white) |
| `--surface` | `#FFFFFF` | Card surface |
| `--accent` | `#3344F0` | Primary indigo (focus, links) |
| `--accent-soft` | `#EBEDFF` | Indigo tint background |
| `--car-a` | `#3344F0` | Car A series + bars |
| `--car-b` | `#9A6CFF` | Car B series + bars |
| `--amber` | `#F5A623` | Brand dot, verdict highlight, hot CTA |
| `--win` | `#11A05F` | Cheaper / saved |
| `--win-soft` | `#E5F6EE` | Win pill bg |
| `--warn` | `#D24545` | Loss / red highlight |
| `--warn-soft` | `#FBEAEA` | Loss pill bg |

### Typography

| Family | Variable | Use | Weights |
|---|---|---|---|
| Barlow Condensed | `--ff-display` | Logo, hero numerics, big numbers | 400/500/600/700 |
| Inter Tight | `--ff-ui` | UI body, headings, labels | 400/500/600/700 |
| DM Mono | `--ff-mono` | Money values, technical readouts | 400/500 |

**All three are self-hosted** under `fonts/` (SIL OFL 1.1, see `fonts/*-OFL.txt`). Wire via `<link rel="stylesheet" href="fonts.css">` instead of the existing Google Fonts CDN link. The variable Inter Tight TTF covers weights 100–900 from one file.

### Spacing / radii / shadow

| Token | Value |
|---|---|
| Card radius (outer) | `28px` |
| Card radius (inner block) | `22px` |
| Stat tile radius | `20px` |
| Verdict panel radius | `36px` |
| Pill radius | `999px` |
| Chip padding | `8px 12px` |
| Card padding | `28px` |
| Shadow 1 | `0 1px 2px rgba(20,22,28,.04), 0 8px 28px -8px rgba(20,22,28,.10)` |
| Shadow 2 | `0 2px 4px rgba(20,22,28,.05), 0 24px 56px -16px rgba(20,22,28,.16)` |

### Type scale (rough)

| Role | Family | Size | Weight | Tracking |
|---|---|---|---|---|
| Hero h1 | Inter Tight | 76px | 600 | -0.035em |
| Section h2 | Inter Tight | 48px | 600 | -0.035em |
| Card title | Inter Tight | 22-28px | 600 | -0.025em |
| Hero monthly | Inter Tight | 64px | 600 | -0.04em |
| Verdict number | Inter Tight | 48px (with amber span) | 600 | -0.035em |
| Logo wordmark | Barlow Condensed | 24px | 600 | -0.02em |
| Body | Inter Tight | 15-17px | 400 | -0.005em |
| Label / kicker | Inter Tight | 11-12px | 400 | 0.04em uppercase |
| Money value | DM Mono | 12-14px | 500 | normal |

---

## Interactions & behavior

The redesign is **purely visual + structural**. Every piece of computation logic in the existing `index.html` must be preserved unchanged:

- `calcAll(car, g)` — full TCO calc
- `residual()`, `kasko()`, `service()`, `repairBuf()`, `fuelAnnual()`, `leasing()`, `ten()`
- `readCar()`, `readG()`, `liveUpdate()`, `canAnalyse()`
- `CAR_DB`, `DEP`, `TYRE`, `RBUF`, `FUEL`, `OCTA_EST`, `CONF_URLS` constants
- Search autocomplete on `CAR_DB`
- Example preset buttons (P1/P2/P3)
- Hash URL persistence (`updateHash`)
- EmailJS email capture
- Plausible analytics events
- "How we calculate" `<details>` accordion + all source links

Only **markup, CSS, and DOM structure** change. Function bodies stay.

### New micro-interactions to add

| Behavior | Notes |
|---|---|
| Card hover lift | `transform: translateY(-2px)` + shadow-2 on hover, 150ms ease |
| CTA press | `transform: scale(0.97)`, 100ms |
| Settings pill cell switch | Background `bg → cream` transitions 150ms |
| Chip select | Toggle accent border + accent-soft fill |
| Verdict number animate | Optional: count-up animation when results render, 600ms ease-out |
| Bar chart enter | Width transition 0 → final, 600ms cubic-bezier(.2,.8,.2,1) |
| Auto-recalc | Existing 300ms debounce already in place — keep |

### Responsive

| Breakpoint | Behavior |
|---|---|
| ≥1024px | Two columns side-by-side (cars, results) |
| 768–1023px | Two columns, reduced padding (24→16px) |
| <768px | Stack: cars one over the other, hero h1 → 48px, verdict panel → single col, depreciation chart scrolls horizontally |

Keep the existing 768px breakpoint logic — adjust values to match new spacing.

---

## Assets

- **Fonts:** `fonts/` directory + `fonts.css`. Self-hosted, no CDN needed.
- **Logo:** wordmark "Honest•Cost" in Barlow Condensed Bold + 7px amber dot. No SVG logo file required — it's pure type. (See `designs/Brand · Imagery.html` for variants.)
- **Car silhouette:** placeholder SVG embedded inline in v2. **Recommended next step:** drop in real product photos via `<image-slot>` slots, or use a third-party image API (e.g. car.imagin.studio) keyed by make+model — see `designs/Brand · Imagery.html` for the slot pattern.
- **Icons:** all icons are inline SVG (24×24, 1.5px stroke, `currentColor`, rounded caps/joins). Living set is in `designs/redesign/shared.jsx` (`Icon` component) — port to inline `<svg>` snippets in `index.html`.
- **Favicon:** existing `favicon.svg` already matches the brand (indigo H + amber dot). Keep.

---

## Files included

```
design_handoff_honestcost_redesign/
├── README.md                ← this file
├── TASKS.md                 ← ordered task list for Claude Code
├── fonts.css                ← @font-face declarations
├── fonts/                   ← TTF files + OFL licenses
│   ├── InterTight-VF.ttf    (variable, 100-900)
│   ├── BarlowCondensed-{Regular,Medium,SemiBold,Bold}.ttf
│   ├── DMMono-{Regular,Medium}.ttf
│   └── *-OFL.txt
└── designs/
    ├── HonestCost v2.html               ← THE primary reference (Studio direction)
    ├── HonestCost Redesign.html         ← 3-direction canvas (Polestar / Studio / Cockpit)
    ├── Brand · Typography.html          ← Type system spec
    ├── Brand · Imagery.html             ← Imagery rules + image-slot drop zones
    ├── redesign/                        ← JSX for the canvas exploration
    │   ├── shared.jsx                   (Logo, Icon, SAMPLE data, format helpers)
    │   ├── Polestar.jsx
    │   ├── Studio.jsx                   ← reference for the chosen direction
    │   ├── Cockpit.jsx
    │   └── design-canvas.jsx
    └── brand/
        └── image-slot.js                ← drop-zone web component
```

**Not included** (developer already has access to it on disk): the existing production `index.html` at the original `NEW_CAR_TCO_CALCULATOR/index.html` path.

---

## Next steps

See **TASKS.md** for the ordered implementation plan.
