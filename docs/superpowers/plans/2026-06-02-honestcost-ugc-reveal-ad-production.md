# HonestCost UGC Reveal Ad Production Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready 25-30 second Latvian UGC reveal ad package for HonestCost, including script, captions, shot list, and an editable vertical HTML preview.

**Architecture:** Keep marketing production files isolated under `marketing/ugc-reveal-ad/`. Use Markdown for the practical filming package and a standalone HTML/CSS/JS file for the vertical preview so it can be opened locally without adding dependencies.

**Tech Stack:** Markdown, standalone HTML, CSS animation, vanilla JavaScript.

---

## Implementation Note

The final production files should use proper Latvian diacritics for captions and voiceover. HTML validation is handled through structural smoke checks because `node --check` validates JavaScript, not standalone HTML.

## File Structure

- Create `marketing/ugc-reveal-ad/production-script.md`: final voiceover, captions, timing, shot direction, and filming notes.
- Create `marketing/ugc-reveal-ad/shot-list.md`: checklist grouped by filming/screen-recording/editing needs.
- Create `marketing/ugc-reveal-ad/ugc-reveal-preview.html`: editable 9:16 animated preview with timed scenes and HonestCost-inspired UI mockups.
- Modify `C:\Users\User\progress.md`: append completed work and next-session notes after implementation.

## Task 1: Production Script

**Files:**
- Create: `marketing/ugc-reveal-ad/production-script.md`

- [ ] **Step 1: Create the production directory**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'C:\Users\User\Desktop\HonestCost Design System\marketing\ugc-reveal-ad'
```

Expected: Directory exists.

- [ ] **Step 2: Add the final script**

Create `marketing/ugc-reveal-ad/production-script.md` with:

```markdown
# HonestCost UGC Reveal Ad Production Script

Format: vertical 9:16 TikTok/Reels/Shorts
Length: 25-30 seconds
Language: Latvian
Concept: skeptical friend discovers that the cheaper-looking car can cost more per month

## Timing Script

| Time | Visual | Voiceover | On-screen text |
| --- | --- | --- | --- |
| 0:00-0:03 | Selfie or handheld shot pointed at laptop/phone. Creator looks skeptical. | "Pag... ka masina ar zemaku cenu beigas sanak dargaka menesi?" | "Pag. Ka sis ir dargaks menesi?" |
| 0:03-0:07 | Screen recording: HonestCost opens with two-car comparison visible. Tap/select two cars from picker. | "Es domaju, ka pirmais variants ir drosi letaks." | "Divi auto. Viena realitate." |
| 0:07-0:10 | Car picker/prefill moment. Values populate quickly. | "Bet tad ieliku abus HonestCost." | "Cena salona nav reala menesa cena" |
| 0:10-0:17 | Zoom on monthly result. Result changes or is highlighted. | "Te nav tikai pirkuma cena. Te ir degviela, KASKO, nodoklis, serviss, vertibas kritums... viss kopa." | "Degviela / KASKO / Nodoklis / Serviss / Vertibas kritums" |
| 0:17-0:22 | Fast feature flashes: saved scenario, ownership period, methodology/FAQ. | "Un tu vari saglabat salidzinajumu un parbaudit, no kurienes nak pienemumi." | "Salidzini. Saglaba. Parbaudi." |
| 0:22-0:30 | Trailer-style dark reveal. HonestCost wordmark fills frame. | "Pirms perc auto, uzzini ta patieso cenu." | "HONESTCOST / DRIZUMA" |

## Performance Direction

The creator should sound like a skeptical friend, not a presenter. Keep the first line slightly surprised. The middle should be quick and practical. The ending should slow down for a cinematic reveal.

## Editing Notes

- Use native captions for every spoken line.
- Keep the product UI visible before second 10.
- Add a punch-in zoom on the monthly result at second 10.
- Use a short bass hit or trailer pulse when "HONESTCOST" appears.
- Avoid claims about live dealer partnerships, legal compliance, or verified data freshness.
```

- [ ] **Step 3: Verify the script file exists**

Run:

```powershell
Test-Path -LiteralPath 'C:\Users\User\Desktop\HonestCost Design System\marketing\ugc-reveal-ad\production-script.md'
```

Expected: `True`

## Task 2: Shot List

**Files:**
- Create: `marketing/ugc-reveal-ad/shot-list.md`

- [ ] **Step 1: Add the shot list**

Create `marketing/ugc-reveal-ad/shot-list.md` with:

```markdown
# HonestCost UGC Reveal Ad Shot List

## Filming Shots

- Selfie hook: creator reacts to the comparison idea with phone in hand.
- Over-shoulder screen shot: laptop or phone showing HonestCost.
- Reaction insert: quick eyebrow-raise or "wait" moment after monthly result appears.
- Final still: clean HonestCost wordmark or screen with dark background.

## Screen Recordings

- HonestCost landing/app loaded.
- Two-car comparison visible.
- Car picker/prefill selection.
- Monthly result highlighted.
- Saved scenario action.
- FAQ/methodology flash.

## Edit Checklist

- Keep first hook under 3 seconds.
- Product appears before second 10.
- Monthly result is the clearest visual beat.
- At least three feature flashes appear between seconds 17 and 22.
- Final frame says "HONESTCOST" and "DRIZUMA".
- Export vertical 1080x1920.

## Caption Checklist

- "Pag. Ka sis ir dargaks menesi?"
- "Cena salona nav reala menesa cena"
- "Degviela"
- "KASKO"
- "Nodoklis"
- "Serviss"
- "Vertibas kritums"
- "Salidzini. Saglaba. Parbaudi."
- "Pirms perc auto, uzzini ta patieso cenu."
- "HONESTCOST"
- "DRIZUMA"
```

- [ ] **Step 2: Verify the shot list file exists**

Run:

```powershell
Test-Path -LiteralPath 'C:\Users\User\Desktop\HonestCost Design System\marketing\ugc-reveal-ad\shot-list.md'
```

Expected: `True`

## Task 3: Vertical Animated Preview

**Files:**
- Create: `marketing/ugc-reveal-ad/ugc-reveal-preview.html`

- [ ] **Step 1: Create the standalone preview**

Create `marketing/ugc-reveal-ad/ugc-reveal-preview.html` as a standalone 9:16 preview. It must include:

```html
<!doctype html>
<html lang="lv">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HonestCost UGC Reveal Preview</title>
  <style>
    :root {
      --ink: #111111;
      --paper: #f5f2eb;
      --lime: #c6ff4a;
      --red: #ff4d3d;
      --blue: #2d6cdf;
      --muted: #706b61;
      --line: rgba(17, 17, 17, .16);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #181818;
      color: var(--ink);
      font-family: Inter, Arial, sans-serif;
    }
    .phone {
      width: min(420px, 100vw);
      aspect-ratio: 9 / 16;
      position: relative;
      overflow: hidden;
      background: var(--paper);
      border: 1px solid rgba(255,255,255,.16);
    }
    .scene {
      position: absolute;
      inset: 0;
      padding: 28px;
      display: grid;
      align-content: space-between;
      opacity: 0;
      transform: scale(1.02);
      animation: scene 30s linear infinite;
    }
    .s1 { animation-delay: 0s; }
    .s2 { animation-delay: 3s; }
    .s3 { animation-delay: 10s; }
    .s4 { animation-delay: 17s; }
    .s5 { animation-delay: 22s; background: #080808; color: #f7f1e7; }
    @keyframes scene {
      0%, 100% { opacity: 0; transform: scale(1.02); }
      2%, 22% { opacity: 1; transform: scale(1); }
      24% { opacity: 0; transform: scale(.995); }
    }
    .badge {
      justify-self: start;
      padding: 8px 10px;
      border: 1px solid currentColor;
      border-radius: 999px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: .08em;
    }
    h1 {
      margin: 0;
      font-size: 48px;
      line-height: .96;
      letter-spacing: 0;
    }
    .caption {
      font-size: 22px;
      line-height: 1.08;
      font-weight: 800;
      background: rgba(255,255,255,.82);
      padding: 12px 14px;
      border-radius: 8px;
      box-shadow: 0 10px 24px rgba(0,0,0,.12);
    }
    .selfie {
      min-height: 380px;
      border-radius: 8px;
      background:
        linear-gradient(135deg, rgba(255,255,255,.7), rgba(255,255,255,.1)),
        radial-gradient(circle at 50% 20%, #ffd3b8 0 18%, transparent 19%),
        linear-gradient(160deg, #dcd3c2, #9fb8bd);
      display: grid;
      align-items: end;
      padding: 18px;
    }
    .ui {
      background: #fffaf2;
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 14px;
      box-shadow: 0 18px 50px rgba(0,0,0,.14);
    }
    .cars {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .car {
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 10px;
      background: #fff;
    }
    .car strong { display: block; font-size: 14px; }
    .car span { color: var(--muted); font-size: 12px; }
    .total {
      margin-top: 14px;
      padding: 16px;
      border-radius: 8px;
      background: var(--ink);
      color: #fff;
      font-size: 34px;
      font-weight: 900;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .chip {
      padding: 9px 10px;
      border-radius: 999px;
      background: #fff;
      border: 1px solid var(--line);
      font-weight: 800;
      font-size: 14px;
    }
    .chip.hot { background: var(--lime); }
    .trailer {
      display: grid;
      place-items: center;
      text-align: center;
      min-height: 100%;
    }
    .logo {
      font-size: 52px;
      line-height: .9;
      font-weight: 950;
    }
    .soon {
      margin-top: 18px;
      color: var(--lime);
      font-size: 28px;
      font-weight: 900;
      letter-spacing: .12em;
    }
    .hint {
      color: rgba(247,241,231,.72);
      margin-top: 16px;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <main class="phone" aria-label="HonestCost UGC reveal ad preview">
    <section class="scene s1">
      <div class="badge">0:00 Hook</div>
      <div class="selfie">
        <div class="caption">Pag. Ka sis ir dargaks menesi?</div>
      </div>
    </section>

    <section class="scene s2">
      <div class="badge">0:03 Comparison</div>
      <div class="ui">
        <div class="cars">
          <div class="car"><strong>Auto A</strong><span>Zemaka cena</span></div>
          <div class="car"><strong>Auto B</strong><span>Cita realitate</span></div>
        </div>
        <div class="total">Cena salona nav reala menesa cena</div>
      </div>
      <div class="caption">Es ieliku abus HonestCost.</div>
    </section>

    <section class="scene s3">
      <div class="badge">0:10 Reveal</div>
      <h1>Viss kopa maina atbildi.</h1>
      <div class="chips">
        <div class="chip hot">Degviela</div>
        <div class="chip">KASKO</div>
        <div class="chip">Nodoklis</div>
        <div class="chip">Serviss</div>
        <div class="chip">Vertibas kritums</div>
      </div>
    </section>

    <section class="scene s4">
      <div class="badge">0:17 Features</div>
      <div class="ui">
        <div class="cars">
          <div class="car"><strong>Salidzini</strong><span>2 auto blakus</span></div>
          <div class="car"><strong>Saglaba</strong><span>Scenariju</span></div>
          <div class="car"><strong>Parbaudi</strong><span>Pienemumus</span></div>
          <div class="car"><strong>Dalies</strong><span>Ar rezultatu</span></div>
        </div>
      </div>
      <div class="caption">Salidzini. Saglaba. Parbaudi.</div>
    </section>

    <section class="scene s5">
      <div class="trailer">
        <div>
          <div class="logo">HONEST<br>COST</div>
          <div class="soon">DRIZUMA</div>
          <div class="hint">Pirms perc auto, uzzini ta patieso cenu.</div>
        </div>
      </div>
    </section>
  </main>
</body>
</html>
```

- [ ] **Step 2: Smoke check the preview structure**

Run:

```powershell
rg -n "aspect-ratio: 9 / 16|scene s1|scene s5|DRĪZUMĀ|Cena salonā" marketing\ugc-reveal-ad\ugc-reveal-preview.html
```

Expected: Output includes the 9:16 container, first scene, final scene, final "DRĪZUMĀ" text, and comparison caption.

- [ ] **Step 3: Smoke check the preview file**

Run:

```powershell
Test-Path -LiteralPath 'C:\Users\User\Desktop\HonestCost Design System\marketing\ugc-reveal-ad\ugc-reveal-preview.html'
```

Expected: `True`

## Task 4: Documentation, Commit, Progress

**Files:**
- Modify: `C:\Users\User\progress.md`

- [ ] **Step 1: Review git diff**

Run:

```powershell
git diff -- marketing/ugc-reveal-ad docs/superpowers/plans/2026-06-02-honestcost-ugc-reveal-ad-production.md
```

Expected: Diff includes only the UGC reveal ad package and this plan.

- [ ] **Step 2: Stage and commit only ad files**

Run:

```powershell
git add docs/superpowers/plans/2026-06-02-honestcost-ugc-reveal-ad-production.md marketing/ugc-reveal-ad/production-script.md marketing/ugc-reveal-ad/shot-list.md marketing/ugc-reveal-ad/ugc-reveal-preview.html
git commit -m "feat: add HonestCost UGC reveal ad package"
```

Expected: Commit succeeds.

- [ ] **Step 3: Append progress**

Append to `C:\Users\User\progress.md`:

```markdown

## 2026-06-02 - HonestCost UGC reveal ad production package
DONE:
- Created the Latvian UGC reveal ad production script.
- Created the filming, screen recording, edit, and caption shot list.
- Created a standalone vertical animated HTML preview for the reveal ad.

TODO (next session):
- Review the preview and decide whether to film real UGC footage or build a rendered motion version.
- Replace ASCII Latvian captions with proper Latvian diacritics if the final editing environment supports them cleanly.
```

## Self-Review

Spec coverage:

- 25-30 second vertical format is covered in the script and preview.
- Latvian-first voiceover and captions are covered in the script.
- Skeptical friend hook is covered in the first scene.
- Two-car comparison, car picker, saved scenarios, and methodology flashes are covered.
- Trailer-style "HONESTCOST / DRIZUMA" ending is covered.
- Unproven claim guardrails are covered in script editing notes and the original design spec.

Placeholder scan:

- No TBD/TODO placeholders are present.
- The only future work is explicitly framed as next-session progress notes.

Type consistency:

- File paths are consistent across tasks.
- The preview is standalone and does not require package dependencies.
