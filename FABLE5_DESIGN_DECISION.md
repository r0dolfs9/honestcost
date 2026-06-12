# FABLE5 Design Decision

Date: 2026-06-11

## Directions Evaluated

1. **Decision Ledger**  
   A calm decision-product evolution of the current app. It starts with examples or search, keeps the two-car comparison visible, progressively exposes advanced fields, and makes source confidence visible in the result.

2. **Advisor Briefing**  
   A darker guided purchase memo. It feels premium and strongly curated, but it slows first result because users must move through a wizard-like sequence.

3. **Assumption Sheet**  
   A transparent power-user sheet. It exposes assumptions and formulas exceptionally well, but risks intimidating ordinary buyers and would push the product toward a specialist tool.

## Weighted Comparison

Scores are 1-5. Weight reflects product importance for a Latvian financial decision-support product.

| Criterion | Weight | Decision Ledger | Advisor Briefing | Assumption Sheet |
|---|---:|---:|---:|---:|
| Decision clarity | 14 | 5 | 4 | 3 |
| Time to first result | 12 | 5 | 3 | 3 |
| Ease for inexperienced users | 11 | 5 | 4 | 2 |
| Depth for advanced users | 8 | 4 | 4 | 5 |
| Trustworthiness | 12 | 5 | 4 | 5 |
| Mobile quality | 10 | 5 | 4 | 3 |
| Accessibility | 8 | 4 | 4 | 3 |
| Visual distinction | 7 | 4 | 5 | 4 |
| Performance | 6 | 5 | 4 | 4 |
| Maintainability | 6 | 5 | 3 | 3 |
| Existing-function compatibility | 4 | 5 | 3 | 3 |
| Realistic implementation cost | 2 | 5 | 3 | 3 |
| **Weighted total** | **100** | **482** | **383** | **342** |

## Winning Direction

**Decision Ledger wins as the default experience.**

It creates the strongest complete product because it improves the existing strengths instead of replacing them: fast examples, visible two-car comparison, result recalculation, share/save/print, and methodology access. Its main improvement is not spectacle; it turns hidden product evidence into visible decision confidence.

## Refined Product Choice

After review, the best next version is a hybrid: **Decision Ledger default + Assumption Inspector**.

The product should not become a pure spreadsheet, because most buyers need a fast answer before they care about every formula. It also should not hide the working, because HonestCost earns trust by showing where numbers came from and which assumptions moved the decision. The right model is:

- The main flow stays Decision Ledger: choose two cars, see the winner, see monthly and five-year impact, and keep source confidence visible.
- Assumption Sheet becomes an inspect/edit layer: expandable rows or a drawer that shows formula, source, confidence, editable assumption, and impact on the final decision.
- The result screen should tell a plain-language decision story first, then let power users drill into assumptions without forcing everyone into that mode.

## Borrowed Elements

- From **Advisor Briefing**: concise result language that explains why the cheaper vehicle wins, not only who wins.
- From **Assumption Sheet**: provenance and confidence labels on individual cars and assumptions.

## Rejected Approaches

- A full wizard was rejected because it would slow down the “two cars in, one decision out” promise.
- A dense spreadsheet interface was rejected for the default experience because ordinary buyers should not need to understand formulas before seeing value.
- More dramatic dark/product-theater styling was rejected because financial credibility and readability matter more than visual novelty.

## Implementation Trade-Off

The production pass intentionally avoided a wholesale rewrite. It added source-confidence badges, corrected stale trust copy, fixed mobile/tablet overflow, and added a locked regression test for the required BMW/Porsche scenario. This is a smaller implementation than the full long-term design direction, but it is the safest high-impact step because it preserves all verified calculation and static deployment behavior.

## Why The Full Hybrid Was Not Built In This Pass

The full Decision Ledger + Assumption Inspector needs new result-screen interaction, assumption editing, impact recalculation, mobile bottom-sheet behavior, and new regression coverage around every editable row. That is larger than a cosmetic redesign and risky inside the current single-file static app unless it is built as its own tested pass.

The safe pass was therefore: preserve the calculation engine, expose source confidence in production, fix trust copy, fix responsive overflow, and document the chosen next move.

## Next Move — DONE 2026-06-12

The Assumption Inspector shipped on 2026-06-12: each result cost line expands to show the formula in plain language, a provenance chip (user/DB value, default assumption, model estimate, statutory rule), and where to edit it. Summary results are unchanged until opened; behavior is keyboard-operable and verified at desktop, tablet, and phone widths with the BMW/Porsche regression intact (see `FABLE5_QA_REPORT.md`, 2026-06-12 pass). Inline editing inside the inspector remains a future step. Original plan:

Build the Assumption Inspector as the next production feature:

- Add an expandable "assumptions" area to each result card or a shared comparison drawer.
- For each major cost line, show value, formula note, source/default/estimate status, and whether the user can edit it.
- Keep the summary result unchanged until a user opens the inspector.
- On mobile, present the inspector as a compact bottom sheet or stacked detail panels.
- Protect the work with BMW/Porsche regression coverage plus browser smoke checks at desktop, tablet, and phone widths.
