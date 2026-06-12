# HonestCost Lessons

Use this as a factual decision and learning log. Do not backfill imagined customer, advisor, legal, or revenue learnings.

## Template

```markdown
## YYYY-MM-DD - Short title

Context:
- What happened?

Decision / lesson:
- What did we learn or decide?

Evidence:
- Link to file, test, customer note, email, or metric.

Follow-up:
- What changes because of this?
```

## 2026-05-26 - Avoid unverifiable launch claims

Context:
- The project has task files for monitoring, legal policies, partnerships, and operational setup.
- The repo does not contain evidence that those external services or agreements are configured.

Decision / lesson:
- Keep local repo work factual.
- Track blocked work separately instead of publishing placeholders as completed setup.

Evidence:
- `NEXT_TASKS.md`
- `HANDOVER.md`

Follow-up:
- When an external account, legal document, monitor, or partnership exists, add the exact evidence here.

## 2026-06-11 - Use Decision Ledger with an Assumption Inspector

Context:
- FABLE5 compared three directions: Decision Ledger, Advisor Briefing, and Assumption Sheet.
- The user identified that the strongest product is not a pure pick between Decision Ledger and Assumption Sheet, but a mix of both.

Decision / lesson:
- Keep Decision Ledger as the default experience because buyers need a fast, calm two-car answer.
- Turn Assumption Sheet into an inspector layer for formulas, source confidence, editable assumptions, and impact on the decision.
- Do not force ordinary users into a spreadsheet before showing value, but do not hide proof from advanced users.

Evidence:
- `FABLE5_DESIGN_DIRECTIONS.html`
- `FABLE5_DESIGN_DECISION.md`
- `FABLE5_PRODUCT_AUDIT.md`
- `FABLE5_QA_REPORT.md`
- `test-fable5-regression.js`
- `fable5-browser-smoke.js`

Follow-up:
- Build the Assumption Inspector as the next production pass, protected by regression tests and responsive browser smoke checks.

## 2026-06-12 - Assumption Inspector shipped as pure helpers plus inline detail rows

Context:
- The inspector was built as the planned follow-up pass: each result cost line expands into a provenance chip, plain-language formula, and edit pointer.

Decision / lesson:
- Implementing the inspector as pure, DOM-free helpers (`assumptionInfo`, `assumptionDetailMarkup`) kept it testable in Node through the existing `test-ui-helpers.js` extraction harness and out of the calculation engine entirely.
- Honest provenance labels matter: TEN is "statutory", repair reserve is a "model estimate", KASKO tier is a "default assumption" - the UI should not flatten these into one vague "estimate" label.
- OCTA auto-estimates cannot be distinguished from typed values after form read; the detail text states this rather than guessing.

Evidence:
- `index.html` (assumption helper block before renderResults), `test-ui-helpers.js` inspector assertions.
- `qa/fable5/browser-smoke-after2.json`: baseline BMW/Porsche values unchanged, 20 toggles, keyboard open/close, no overflow at 7 viewports incl. 360x800/430x932/1024x768.

Follow-up:
- Next pass: inline editing inside the inspector with its own regression coverage.
