# HonestCost CSP Surface - 2026-05-28

Purpose: map the current external script/style/image/connect surface before adding a Content Security Policy. Do not add a CSP until browser QA is available, because an over-tight policy can silently break analytics, icons, email capture, fonts, user images, or the lazy car database.

## Pages Reviewed

- `index.html`
- `faq.html`
- `status.html`
- `fonts.css`

## Current Script Sources

- `self`
  - Inline main app script in `index.html`.
  - Lazy `car-db.js` insertion via `script.src = 'car-db.js'`.
- `https://unpkg.com`
  - `https://unpkg.com/lucide@latest/dist/umd/lucide.js`
- `https://plausible.io`
  - `https://plausible.io/js/script.js`
- `https://cdn.emailjs.com`
  - `https://cdn.emailjs.com/dist/email.min.js`

## Current Style And Font Sources

- `self`
  - Local `fonts.css` and local font files under `fonts/`.
- `unsafe-inline`
  - Required if the current large inline `<style>` blocks remain in HTML.
- `https://fonts.googleapis.com`
  - Google Fonts stylesheet links.
- `https://fonts.gstatic.com`
  - Google-hosted font files loaded by Google Fonts CSS.

## Current Image Sources

- `self`
  - `og-image.png`, `favicon.svg`, local/generated visuals.
- `data:`
  - Should be allowed if generated or embedded image data is introduced.
- `https:`
  - User-entered car photo URLs are allowed through `photoUrlA` and `photoUrlB`.
  - Open Graph image points to `https://honestcost.lv/og-image.png`, but the custom domain currently does not resolve.

## Current Connect Targets

- `self`
  - Local app/runtime.
- `https://plausible.io`
  - Plausible analytics events.
- `https://*.emailjs.com`
  - EmailJS send call when real keys are configured.

## Current Navigation / Outbound Links

- `mailto:hello@honestcost.lv`
- `https://octa24.lv/`
- `https://www.balta.lv/`
- `https://www.google.com/search`
- `https://www.swedbank.lv/business/finance/leasing`
- `https://likumi.lv/ta/id/281333`

## Notes Before CSP Enforcement

- EmailJS constants are still placeholder values, so email sending is demo-mode unless real keys are configured.
- Plausible is loaded for `honestcost.lv`, but the custom domain does not currently resolve. Analytics may not record the GitHub Pages subpath as intended.
- Static pages use root-relative links (`/`, `/faq.html`, `/status.html`). On `r0dolfs9.github.io/honestcost/`, those links can point outside the project subpath. Verify in browser before treating GitHub Pages subpath as fully navigable.
- A first CSP should be report-only in a server/header environment if possible. GitHub Pages static HTML can only use a meta CSP, so test carefully before enforcing.

## Candidate CSP Draft

Do not paste this into production without browser QA:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://unpkg.com https://plausible.io https://cdn.emailjs.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://plausible.io https://*.emailjs.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
">
```

