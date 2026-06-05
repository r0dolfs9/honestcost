# Morning Dashboard Long-Term System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current morning-dashboard MVP into a durable everyday personal command center that can stay useful for years with minimal redesign.

**Architecture:** Start with research, interviews, and a stable information model before changing the UI. Build the system in phases: research pack, user review, design spec, prototype directions, implementation plan, generator/app build, validation, and maintenance loop. AI/Claude/Codex work happens first wherever possible; user work is grouped into short review checkpoints.

**Tech Stack:** Markdown planning docs, local project files, Codex/Claude research and synthesis, static HTML prototype first, then optional local generator or small frontend app after design approval.

---

## Operating Rules

- AI-first sequencing: Codex or Claude should complete every task that can be done from files, pinned chats, research, existing dashboards, and project context before asking the user to act.
- User checkpoints should happen only after a meaningful batch is complete.
- Do not start implementation until research, interview synthesis, information architecture, and visual direction are reviewed.
- Every important dashboard claim must preserve its evidence source: pinned chat, `C:\Users\User\progress.md`, project file, test result, git state, automation memory, or explicit user answer.
- The long-term dashboard must separate facts, AI recommendations, assumptions, and stale/failed automation signals.
- The system should be useful in low-energy mornings: obvious next action, low reading load, and no fake certainty.
- Avoid hardcoding project-specific content into the design. HonestCost, IronLog, Munalife, KPA, automations, and future projects should all fit the same data model.
- Use visual polish to improve trust and scanning, not to hide weak source quality.

## Best-Fit Operation Rules By Stage

| Stage | Best operation | Why |
|---|---|---|
| Research | Codex or Claude file/web research | Best for collecting patterns, source summaries, and dashboard references. |
| User interview | Claude or Codex conversational interview | Best for extracting preferences, daily workflow, energy states, and decision style. |
| Information architecture | Codex synthesis | Best for turning messy tasks into stable data contracts and section rules. |
| Visual design | Codex with image/design tools | Best for dashboard concepts, layouts, hierarchy, and interaction states. |
| Coding | Codex | Best for implementing local HTML/app/generator files and tests. |
| Copy/editing | Claude or Codex | Claude can be strong for tone; Codex should verify consistency and source evidence. |
| Verification | Codex | Best for running tests, opening local files, checking layout, and validating generated output. |
| Daily maintenance | Automation | Best for recurring source gathering, stale-source detection, and dashboard generation. |

## Phase 1: AI Research Pack

**Owner:** Codex or Claude  
**User action:** None until Phase 1 is complete  
**Output:** `docs/morning-dashboard/research-pack.md`

- [ ] Create folder `docs/morning-dashboard`.
- [ ] Review the current MVP dashboard at `C:\Users\User\Desktop\morning-dashboard.html`.
- [ ] Review the automation memory at `C:\Users\User\.codex\automations\morning-visual-task-dashboard\memory.md` if available.
- [ ] Review `C:\Users\User\progress.md` and summarize recurring project/task patterns.
- [ ] Review HonestCost project planning files:
  - `00_HONESTCOST_ROADMAP.md`
  - `NEXT_TASKS.md`
  - `PROJECT_STATUS.md`
  - `BROWSER_QA_2026-06-02.md`
  - `CAR_DB_UPDATE_PLAN_2026-06-02.md`
- [ ] Search for dashboard design, personal productivity dashboard, decision-dashboard, and UX research references.
- [ ] Summarize reusable design principles:
  - first 30-second clarity
  - actionability
  - source confidence
  - stale-data warnings
  - filter controls
  - project health
  - daily planning
  - long-term maintenance
- [ ] List dashboard examples worth copying in principle, not visually:
  - project health cockpit
  - task command center
  - executive status dashboard
  - personal daily planner
  - automation health monitor
- [ ] Write research findings in short, practical language.

## Phase 2: AI Builds Interview Script

**Owner:** Codex or Claude  
**User action:** None until the script is ready  
**Output:** `docs/morning-dashboard/interview-script.md`

- [ ] Draft a structured interview that covers daily dashboard use.
- [ ] Include questions for these user modes:
  - Morning fast scan
  - Deep work planning
  - Low-energy day
  - Project owner review
  - Decision-making
  - Trust/data confidence
  - Visual taste
  - Notification preferences
  - Weekly/monthly review
- [ ] Keep questions answerable and concrete.
- [ ] Group questions into short batches so the user is not forced to answer everything at once.
- [ ] Add examples for each answer type.

### Example Interview Questions

- What should the dashboard tell you in the first 10 seconds?
- When you have only 30 minutes, what kind of task should it surface?
- When you have 3 hours, what should it prioritize differently?
- Which projects should always appear, and which should appear only when active?
- What makes you distrust an AI-generated task summary?
- Do you prefer one main recommended task or several options?
- Should the dashboard feel intense and motivating, calm and clean, or analytical and serious?
- What information should never be hidden behind a click?

## Phase 3: User Review Checkpoint 1

**Owner:** User  
**AI action before checkpoint:** Complete Phases 1-2  
**User action:** Review research pack and answer the interview batches  
**Output:** User answers captured in `docs/morning-dashboard/user-interview-notes.md`

- [ ] Tell the user: "The research and interview script are ready. Please review the summary and answer the first interview batch."
- [ ] Do not continue to visual design until the user has answered at least the core daily-use questions.
- [ ] If the user gives partial answers, continue with reasonable assumptions and mark assumptions clearly.
- [ ] Ask follow-up questions only where a wrong assumption would make the dashboard annoying long-term.

## Phase 4: Information Architecture And Data Model

**Owner:** Codex or Claude  
**User action:** None until IA draft is ready  
**Output:** `docs/morning-dashboard/information-architecture.md`

- [ ] Convert research and interview notes into a stable dashboard data model.
- [ ] Define durable object types:
  - Project
  - Task
  - Blocker
  - Decision
  - Recent completion
  - Risk
  - Automation status
  - Source/evidence
  - User checkpoint
  - Assumption
- [ ] Define status vocabulary:
  - Ready
  - Blocked
  - Needs decision
  - Waiting on user
  - Waiting on external system
  - Verified
  - Stale
  - Failed
  - Low confidence
- [ ] Define priority rules:
  - P1: blocks progress or trust
  - P2: moves a main project forward
  - P3: useful but not urgent
  - Parking lot: should not distract today
- [ ] Define estimate buckets:
  - 5-15 minutes
  - 30-45 minutes
  - 60-90 minutes
  - 2-4 hours
  - multi-session
- [ ] Define source-confidence rules:
  - High: file/test/git/user-confirmed
  - Medium: recent progress summary or automation output
  - Low: inferred, stale, failed connector, or unclear source
- [ ] Define what must be visible on the first screen:
  - today's main recommendation
  - blockers
  - decisions waiting on user
  - failed automations
  - project health summary

## Phase 5: Section Design Spec With Layout Examples

**Owner:** Codex or Claude  
**User action:** None until section spec is ready  
**Output:** `docs/morning-dashboard/section-design-spec.md`

- [ ] Define every dashboard section, its purpose, and when it appears.
- [ ] Include multiple layout orientations for each major section.

### Required Sections

#### 1. Daily Command Header

Purpose: Give a fast answer to "what matters today?"

Layout examples:
- Wide top strip with one main task, one risk, one decision.
- Split header with task recommendation on left and automation health on right.
- Minimal header with date, confidence, and "start here" action.

#### 2. Today's Priority Tasks

Purpose: Let the user choose useful work fast.

Layout examples:
- Vertical list sorted by P1/P2/P3.
- Kanban columns: Start now, Later, Waiting, Done.
- Mission card: one main task, three supporting actions.
- Energy-aware tabs: Low energy, Normal, Deep work.

#### 3. Progress By Project

Purpose: Show whether each project is healthy or drifting.

Layout examples:
- Progress rings per project.
- Horizontal health bars with last activity date.
- Timeline lanes by project.
- Compact table for serious review mode.

#### 4. Fixes Needed

Purpose: Surface practical issues before new work.

Layout examples:
- Alert cards grouped by severity.
- "Fix first" queue.
- Risk matrix: impact vs effort.
- Dependency list: what it blocks.

#### 5. Blockers And Risks

Purpose: Prevent fake progress.

Layout examples:
- Red/amber risk rail.
- Blocker cards with owner: User, AI, External.
- Source-confidence table.
- Timeline of stale blockers.

#### 6. Recently Completed

Purpose: Give momentum and historical memory.

Layout examples:
- Changelog list.
- Timeline by day.
- "Completed -> unlocked" cards.
- Project-grouped done log.

#### 7. Decisions Waiting On User

Purpose: Batch user decisions efficiently.

Layout examples:
- Decision inbox with recommended option.
- A/B/C comparison cards.
- "Small decisions" and "big decisions" groups.
- Review checkpoint panel.

#### 8. Automation Health

Purpose: Make failed background systems visible.

Layout examples:
- Status lights for Gmail, Telegram, project monitor, dashboard generator.
- Last successful run timeline.
- Failed connector warning cards.
- "No notification sent because..." explanation panel.

#### 9. Confidence And Assumptions

Purpose: Build long-term trust.

Layout examples:
- Confidence badges per section.
- Evidence drawer under each claim.
- Assumptions list with expiry dates.
- Stale-data banner.

#### 10. Weekly / Monthly Review

Purpose: Keep the system useful for years, not just mornings.

Layout examples:
- Weekly scorecard.
- Project trend board.
- Repeated blockers report.
- "What changed since last week?" summary.

## Phase 6: User Review Checkpoint 2

**Owner:** User  
**AI action before checkpoint:** Complete Phases 4-5  
**User action:** Review section spec and choose preferred layouts  
**Output:** Approved section direction

- [ ] Tell the user: "The information architecture and section design spec are ready. Please review which layouts fit how you think."
- [ ] Ask the user to pick preferred styles for:
  - priority tasks
  - project progress
  - blockers
  - decisions
  - automation health
- [ ] Capture final preferences in `docs/morning-dashboard/user-design-decisions.md`.

## Phase 7: Visual Direction Concepts

**Owner:** Codex  
**User action:** None until concepts are ready  
**Output:** 2-3 visual concept options saved or documented

- [ ] Create 2-3 distinct dashboard visual directions.
- [ ] Keep all concepts based on the approved information architecture.
- [ ] Do not invent unrelated metrics or sections.
- [ ] Include desktop primary screen and mobile/compact view for the strongest concept.

### Visual Direction Options

#### Option A: Command Center

- Dark, high-contrast, dense, operational.
- Best for: trust, urgency, serious project tracking.
- Risk: can feel intense if used every morning.

#### Option B: Calm Morning Briefing

- Lighter, quieter, more spacious.
- Best for: low-energy mornings and lower cognitive load.
- Risk: may feel less impressive and less "dashboard-like."

#### Option C: Project Cockpit

- Balanced, project-manager style with strong tables, timelines, and health signals.
- Best for: long-term usefulness across many projects.
- Risk: less emotionally motivating unless the hero area is designed well.

## Phase 8: User Review Checkpoint 3

**Owner:** User  
**AI action before checkpoint:** Complete Phase 7  
**User action:** Choose visual direction or request a hybrid  
**Output:** Approved visual direction

- [ ] Tell the user: "The visual directions are ready. Pick one direction or ask for a hybrid."
- [ ] Ask the user to judge:
  - Which one makes you want to use it every morning?
  - Which one feels most trustworthy?
  - Which one would still feel good after 6 months?
  - Which one is easiest to read when tired?
- [ ] Record the approved direction in `docs/morning-dashboard/approved-visual-direction.md`.

## Phase 9: Technical Build Plan

**Owner:** Codex  
**User action:** None until build plan is ready  
**Output:** `docs/morning-dashboard/technical-build-plan.md`

- [ ] Decide whether V1 should remain a static generated HTML file or become a small local app.
- [ ] Recommended first build: static HTML generator with structured JSON input.
- [ ] Define source inputs:
  - automation memory
  - pinned chat summaries
  - `C:\Users\User\progress.md`
  - project progress files
  - git status/log
  - optional email summary
  - optional Telegram status
- [ ] Define generated outputs:
  - `C:\Users\User\Desktop\morning-dashboard.html`
  - optional `docs/morning-dashboard/latest-data.json`
  - optional weekly archive snapshots
- [ ] Define tests:
  - generated HTML contains required sections
  - stale-source warning appears when source is old
  - failed automation warning appears when Gmail/Telegram fails
  - user-decision cards appear when tasks need user input
  - no unsupported claims appear without evidence
- [ ] Define maintenance rules:
  - template should change rarely
  - data model can evolve slowly
  - daily content should come from structured inputs
  - failed sources must be visible, not hidden

## Phase 10: Build, Validate, And Iterate

**Owner:** Codex  
**User action:** Review after first working build  
**Output:** Production-ready everyday dashboard workflow

- [ ] Implement the approved V1 architecture.
- [ ] Generate a fresh dashboard from structured data.
- [ ] Run static checks and browser visual checks.
- [ ] Verify desktop and mobile layouts.
- [ ] Verify each claim has a source or confidence marker.
- [ ] Verify failed automations are surfaced.
- [ ] Ask the user to use it for 3-5 mornings.
- [ ] Collect feedback:
  - what was read
  - what was ignored
  - what caused action
  - what felt untrusted
  - what felt visually motivating
- [ ] Cut low-value sections.
- [ ] Add missing interaction only if it solves repeated friction.
- [ ] Freeze the first durable design system after the trial.

## Suggested Execution Order

1. Codex/Claude completes Phases 1-2.
2. User reviews and answers interview batch 1.
3. Codex/Claude completes Phases 4-5.
4. User chooses section/layout preferences.
5. Codex creates visual concepts.
6. User chooses visual direction.
7. Codex writes technical build plan.
8. User approves build approach.
9. Codex implements V1.
10. User uses it for several mornings, then Codex refines.

## Definition Of Ready For Coding

Coding should not start until these exist:

- `docs/morning-dashboard/research-pack.md`
- `docs/morning-dashboard/interview-script.md`
- `docs/morning-dashboard/user-interview-notes.md`
- `docs/morning-dashboard/information-architecture.md`
- `docs/morning-dashboard/section-design-spec.md`
- `docs/morning-dashboard/user-design-decisions.md`
- `docs/morning-dashboard/approved-visual-direction.md`
- `docs/morning-dashboard/technical-build-plan.md`

## Definition Of Done

The long-term dashboard system is ready for everyday use when:

- It generates the dashboard from structured sources instead of hardcoded daily text.
- It clearly shows today's main action, blockers, user decisions, automation health, and project progress.
- It works on desktop and mobile.
- It marks confidence and source quality.
- It remains useful when Gmail, Telegram, or a project source fails.
- It has a stable visual system that does not require frequent redesign.
- The user has tested it for several mornings and confirmed it helps choose what to do next.

## Self-Review

- Spec coverage: This plan covers research, user interviews, information architecture, section design, visual concepts, technical planning, build, verification, and long-term maintenance.
- Placeholder scan: No task depends on undefined "TBD" work; each phase has concrete outputs and checkpoint rules.
- Scope check: This is a planning and execution roadmap, not a coding task. Actual implementation should receive a separate technical implementation plan after Phase 9.
