# HonestCost Browser QA - 2026-06-10

Interactive in-browser pass on the deployed site (Chrome, desktop, window ~1280x900 and ~1030px wide; OS would not shrink the window below ~820px, so true phone-width testing is still pending on a real device).

Deployed commit verified: `54dc440` on `origin/main` (confirmed live via cache-busted load: `parseFlags`/`octaEstimate` present, viewport meta `width=device-width`, "Raksti" nav link present).

## Passed

- App loads on GitHub Pages subpath; dark theme renders correctly.
- Filling both cars and running analysis produces the full result screen: verdict, per-category breakdown table, depreciation timeline, monthly + total figures (BMW 118i vs X1 example: 880 vs 1132 EUR/mo).
- Car picker lazy-load works exactly as designed: `window.CAR_DB` is absent until the picker is first opened, then loads all 376 rows and the dropdown renders with current prices (Octavia 2.0 TDI shows the audited 32 620 EUR).
- Saved scenarios: "Saglabāt" stores to `localStorage` (`honestcost-saved-scenarios-v1`), title format correct.
- "Rediģēt" returns to the input screen with state intact.
- `faq.html`, `status.html`, and the new `content/` hub all load on the live site; status page links work from the subpath.
- Save/PDF buttons present on the result header.

## Issues found

1. **Stale-cache trap (informational).** A normally-cached browser session served the PRE-54dc440 `index.html` (old `width=1100` viewport) while the new `content/` pages loaded fresh. GitHub Pages CDN + browser cache can serve a mixed site for a while after deploy. Mitigation idea for later: version query on asset links, or just be aware when QA-ing after a deploy.
2. **Tablet-width overflow (minor).** At ~806px client width the page still scrolls horizontally by ~70px (`scrollWidth` 878). The 980px media query collapses the columns, but at least one block (hero h1 / global bar internals, measured 868-880px wide) does not shrink below ~870px. Real phones are likely fine (the 460px rules reduce the h1), but tablet/split-screen widths show a scrollbar. Candidate fix: allow the hero h1 to wrap (`max-width: 100%`) and let `.leasing-fields` wrap at <900px.
3. **Example buttons are gone (regression vs roadmap).** The current build has no "load example" chips (P1/P2/P3 from the Stage 1 plan). Cold-start to first result now requires picking two cars manually. The old build's example button also only filled fields without auto-running analysis. Recommendation: reintroduce 2-3 one-tap example chips that fill fields AND show results — this was the roadmap's "<15 seconds to first result" feature.
4. **Phone-width testing still open.** Window resize to 390px was rejected by the OS (min window width ~820px). The viewport meta is now correct, so real-device testing (iPhone SE / mid Android) is the remaining gap. DevTools device emulation would also do.

## Repo incident (same day, recorded for honesty)

During the session the synced-folder mount truncated a large set of working-tree files and corrupted `.git/HEAD` and `.git/index` (NUL padding / partial writes). Commit `54dc440` itself was intact; recovery was: rewrite `.git/HEAD`, delete and rebuild the index (`git reset`), `git checkout -- .`, and re-apply the user's 7 uncommitted morning-dashboard/font edits from backup. Full test suite (6 files) passes after recovery. Lesson: after any sync hiccup, verify working-tree file sizes against `git show HEAD:` before trusting local state.

## Next QA actions

- Real-device or DevTools-emulated 390px pass.
- Decide on example chips restoration.
- Tablet overflow CSS fix.
