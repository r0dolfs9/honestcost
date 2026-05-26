# Car Imagery — Sourcing Options

The redesign uses car silhouettes as placeholders. For production, you need **clean side-profile shots** that match the make + model the user picks. Here are the realistic options, ranked by effort vs. quality.

---

## TL;DR — recommended approach

**Phase 1 (ship fast):** Use `car.imagin.studio` (CGI car renders, free tier for low traffic) keyed by make+model from the existing `CAR_DB`. Falls back to the existing optional `photoUrl` field if a model isn't available.

**Phase 2 (when traffic justifies it):** License a real photo library (CarSpyder, EVOX, IMS, or direct from manufacturer press portals). Replace the CGI source per-model as you go.

**Always:** Let advanced users paste their own URL — the existing `photoUrlA` / `photoUrlB` fields already support this.

---

## Option 1 — car.imagin.studio (CGI renders) ★ recommended start

**What:** Photo-realistic CGI renders of basically every modern car. Generic angle, white background, clean. Used by Auto Trader, Carfax, ALD, etc.

**How:**
```
https://cdn.imagin.studio/getImage?customer=img&make=bmw&modelFamily=x1&angle=23&width=800
```
Parameters: `make`, `modelFamily`, `modelYear`, `angle` (01–29), `trim`, `paintId`. Free tier has the `img` watermark customer; paid removes the watermark and adds the `paintDescription` for fine-grain color matching.

**Pros:**
- One URL pattern covers ~every model
- Consistent angle / lighting across all cars (critical for side-by-side comparison)
- Transparent or white-bg PNGs — composites cleanly into your tinted card
- Cheap (~€50–200/mo for low-mid traffic)

**Cons:**
- It's CGI, not photography — purists may notice
- Paid tier needed before you can really ship without their watermark
- ToS: must show their branding on free tier

**Implementation:** Drop the URL builder into your `CAR_DB` entries, e.g.:
```js
{ b:'BMW', m:'X1 xDrive20i', imagin: { make: 'bmw', model: 'x1' }, ... }
```
Build the URL in `card()` render function.

---

## Option 2 — Manufacturer press / media portals

**What:** Each manufacturer runs a press/media site with downloadable hi-res product photography for journalists and bloggers.

**Examples:**
- BMW: `press.bmwgroup.com`
- VW: `volkswagen-newsroom.com`
- Toyota: `pressroom.toyota.com`
- Tesla: usually need to scrape from `tesla.com/<model>` page (no press portal)
- Stellantis brands (Peugeot, Fiat, Opel): `media.stellantis.com`

**Pros:**
- Real photography, hi-res, beautifully shot
- Often free for editorial use

**Cons:**
- "Editorial use" ≠ "commercial product use" — most manufacturers require permission for use on commercial tools, even free ones
- Each brand has its own terms — case-by-case clearance
- No standardized angle across brands (BMW shoots ¾, Tesla shoots side, etc. — hard to align side-by-side)
- Manual work per model

**Recommendation:** Don't ship this without a written email from each manufacturer's PR team. Not worth the legal exposure.

---

## Option 3 — Latvian dealer photos (your question)

**What:** Scrape the dealer site (Inchcape, Moller Auto, Wess Motors etc.) and use their product gallery photos.

**Pros:**
- Real, local, current-spec photography
- Already on the Latvian internet

**Cons:**
- **You don't own these.** The dealer paid a photographer or licensed them from the manufacturer. Using them on a comparison tool that links *away* to a competitor's listings = copyright + competition risk.
- Dealers will notice if you scrape their CDN. They will send a takedown.
- Inconsistent angles, colors, backgrounds
- They go stale when the dealer updates their stock

**Recommendation:** Don't do this. The legal/relationship cost isn't worth it. The only safe version is: **link to the dealer's listing page** (already in your "Configure with dealer" CTA) without hot-linking their photos.

A safer cousin: **become a dealer affiliate** (you already are with octa24/balta — extend the pattern). Negotiate a clause that lets you embed their hero photo for cars you link to. Inchcape would probably say yes for Toyota; same for Moller for VW/Audi.

---

## Option 4 — Third-party photo libraries (paid)

**EVOX Images** (evoximages.com), **IMS** (imsimages.com), **CarSpyder** — same idea as imagin.studio but real photos (and real prices: $500–2,000/mo for what you'd need).

**Pros:** Indistinguishable from manufacturer photography. Standardized angles. Cleared for commercial use.

**Cons:** Cost. Overkill for honestcost.lv's current scale.

**Recommendation:** Defer until you have >10k monthly users.

---

## Option 5 — User-uploaded photos (already wired)

The existing form has `photoUrlA` / `photoUrlB` fields. These work fine for power users (auto enthusiasts pasting from auto24.lv listings). Keep this as the universal fallback.

**Polish suggestion:** Add a small ImageBB/Cloudinary upload widget so users can drag-and-drop instead of needing to host the image first.

---

## Option 6 — No photos at all (current placeholder strategy)

**What:** Stylized silhouette (current v2 mock) or initials/typography only.

**Pros:** Zero rights issues, fast, consistent, technical-product feel (very Polestar / Lucid / Linear).

**Cons:** Feels less "I can see my actual car."

**Recommendation:** Keep this as the default empty state. The silhouette is brand-friendly and ships today. Add imagin.studio later as an enhancement.

---

## Decision matrix

| Phase | Sourcing | Cost | Time to ship | Legal risk |
|---|---|---|---|---|
| Now (MVP) | Silhouettes + optional URL | €0 | 0 | None |
| +1 mo | car.imagin.studio (free) | €0 | 1 day | None (with their watermark) |
| +3 mo | car.imagin.studio (paid) | €100/mo | 1 day | None |
| +12 mo | EVOX Images | €1k+/mo | 1 wk | None |
| Never | Scraped dealer photos | €0 | 1 day | High |
| Never | Manufacturer press w/o license | €0 | weeks | High |

---

## Visual treatment — regardless of source

When real photos are wired in, keep these rules so the layout doesn't break:

1. **Aspect 16:9** — fit photo into the `.car-illust` block (currently 96px tall). Crop center, `object-fit: cover`.
2. **Tinted background** — keep the car-color tinted gradient behind/around the photo. Use `mix-blend-mode: multiply` on a darker tint to harmonize varied photo backgrounds into the page warmth.
3. **Match angle** — always pick the same angle per car (e.g. front ¾ from imagin's `angle=23`). Inconsistent angles ruin the comparison.
4. **Grayscale fallback** — if a photo is missing or fails to load, drop to grayscale silhouette (existing logic), don't show broken-image icon.
5. **Lazy load** — `loading="lazy"` since these only appear on the results screen below the verdict.

---

## What to ask the user before implementing

1. What's the monthly budget for imagery?
2. Are any dealership affiliate deals in motion that include photo rights?
3. Is the watermark on imagin.studio free tier acceptable for MVP?
