# Morning Dashboard Section Design Spec

Last updated: 2026-06-05

## Design Direction So Far

The dashboard should be a single-task command center with broad project status in support.

Core principles:

- Show status of everything.
- Show last done and next up.
- Promote one main recommended task.
- Always show urgent tasks, meetings, and deadlines.
- Use energy mode to change the one recommended task, not to create a distracting task menu.
- Avoid website building, copywriting, and legal work when the user is tired.
- Always show Munalife, KPA, and inbox.
- Show other projects only when urgent, recently active, stale enough to matter, blocked, or tied to a deadline.

## First Screen Layout

Recommended order:

1. Urgent override strip, only when needed.
2. One main recommended task.
3. Status of everything.
4. Last done / next up.
5. Quiet secondary queues below the fold.

## Section 1: Urgent Override Strip

Purpose: Prevent missed urgent tasks, meetings, and deadlines.

When it appears:

- Meeting today.
- Deadline today or tomorrow.
- Production failure.
- Failed automation that blocks the daily context.
- User decision blocking active work.

Layout options:

### Option A: Full-Width Alert Bar

- One line across the top.
- Best for real urgency.
- Should be red/amber, short, and impossible to miss.

Example:

`Deadline today: review Wix /fss publish checklist before continuing dashboard work.`

### Option B: Compact Alert Cluster

- 1-3 small alerts beside the main task.
- Best when several minor urgent items exist.
- Risk: can distract from the main recommendation.

### Recommendation

Use Option A for V1. It protects the most important information without creating a second task list.

## Section 2: One Main Recommended Task

Purpose: Tell the user what to do next without creating distraction.

Required fields:

- Task title
- Project
- Why this task
- Energy fit
- Estimate
- First concrete step
- Source/confidence
- Blocker status

Layout options:

### Option A: Hero Task Card

- Large central card.
- Task title is the biggest text after the page title.
- Includes one primary action line: "Start with..."
- Best for focus.

### Option B: Split Hero

- Left: recommended task.
- Right: why it was chosen, source, energy fit.
- Best for trust and explanation.

### Option C: Minimal Command

- One strong line and a smaller metadata row.
- Best for low visual noise.

### Recommendation

Use Option B. The user wants one task, but the system still needs to explain why that task is the correct one.

## Section 3: Energy Mode Control

Purpose: Change task recommendation based on real available energy.

Modes:

- Low energy
- Normal day
- Deep work
- Review/admin
- Weekend catch-up

Layout options:

### Option A: Segmented Control

- Horizontal tabs near the main task.
- Best for desktop.

### Option B: Dropdown

- Compact and less visually dominant.
- Best for mobile.

### Option C: Automatic Mode

- Dashboard infers mode from day/time and user pattern.
- Risk: too much hidden logic too early.

### Recommendation

Use Option A on desktop and Option B on mobile. Do not implement automatic mode until the manual modes prove useful.

## Section 4: Status Of Everything

Purpose: Show every important project at a glance.

Visibility rules:

- Always visible: Munalife, KPA, inbox.
- Conditional: HonestCost, IronLog, automations, personal content, and future projects.
- Conditional projects appear when they are the most urgent from the rest, have a blocker/deadline, are recently active, or have become meaningfully stale.

Each item should show:

- Project name
- Health status
- Last done
- Next up
- Blocker/deadline marker
- Last checked

Layout options:

### Option A: Compact Project Rows

- Dense row per project.
- Best for scanning many projects.

### Option B: Project Cards

- More visual, one card per project.
- Best for fewer projects.
- Risk: can become too large.

### Option C: Timeline Lanes

- Shows movement over time.
- Best for weekly/monthly review, not daily first screen.

### Recommendation

Use compact project rows for V1. The dashboard needs to show "status of everything" without turning the page into a card buffet.

Preferred status labels:

- Ready
- Needs review
- On track
- Stale
- Ignore for now

## Section 5: Last Done / Next Up

Purpose: Preserve continuity between sessions.

Layout options:

### Option A: Two-Column List

- Left: last done.
- Right: next up.
- Best for clarity.

### Option B: Timeline

- Shows sequence over days.
- Best for history.

### Option C: Per-Project Mini Changelog

- Each project row expands to show history.
- Best once interaction exists.

### Recommendation

Use Option A on the main screen. Add expandable per-project history later.

## Section 6: Quiet Secondary Queues

Purpose: Keep useful tasks available without distracting from the main recommendation.

Queues:

- Other useful tasks
- Waiting on user
- Waiting on external
- Research backlog
- Parking lot

Layout options:

### Option A: Collapsed Drawers

- Keeps first screen clean.
- Best for focus.

### Option B: Below-Fold Tables

- Easier to scan when scrolling.
- Best for review mode.

### Option C: Filtered Task Pool

- Stronger once the data model exists.
- Risk: overbuilt for early prototype.

### Recommendation

Use collapsed drawers or below-fold tables. Never let these queues compete visually with the main task.

## Section 7: Automation Health

Purpose: Show whether the sources feeding the dashboard are working.

Items:

- Morning dashboard generator
- Gmail check
- Telegram notification
- Project file scan
- Git status scan

Layout options:

### Option A: Status Lights

- Green/amber/red indicators.
- Best for fast trust.

### Option B: Failure Log

- Shows recent failed checks.
- Best for debugging.

### Option C: Source Confidence Table

- Strongest for auditability.
- May be too heavy for daily view.

### Recommendation

Use status lights on the main screen and a failure log below.

## Section 8: Confidence And Sources

Purpose: Keep the dashboard trustworthy without overwhelming the user.

Layout options:

### Option A: Small Confidence Badges

- Example: High, Medium, Low.
- Best for daily use.

### Option B: Evidence Drawer

- Click/expand to see source files.
- Best for trust when something feels wrong.

### Option C: Full Source Table

- Best for debugging automation output.
- Not needed on first screen.

### Recommendation

Use small badges plus optional evidence drawers.

## Section 9: Weekly Review

Purpose: Make the dashboard useful long-term.

Should show:

- What moved this week.
- What repeated.
- What stayed blocked.
- What should be removed or ignored.
- Which project deserves focus next week.

Layout options:

### Option A: Weekly Scorecard

- Project-by-project summary.
- Best for Sunday/Monday review.

### Option B: Repeated Blockers Report

- Shows tasks that keep coming back.
- Best for pruning.

### Option C: Project Momentum Timeline

- Shows long-term movement.
- Best after enough history exists.

### Recommendation

Do not put weekly review on the daily first screen. Add it as a separate view later.

## V1 Layout Recommendation

Desktop:

1. Top alert strip.
2. Main task hero with explanation.
3. Energy mode segmented control.
4. Compact status rows.
5. Last done / next up two-column list.
6. Automation health status lights.
7. Quiet queues below.

Mobile:

1. Alert strip.
2. Main task card.
3. Energy dropdown.
4. Status rows as stacked compact cards.
5. Last done / next up.
6. Collapsed queues.

## Open Design Decisions

- Should the visual style be command-center, calm briefing, project cockpit, or hybrid?
- Should Telegram be optional, required, or failure-only?
- Should weekly review be generated automatically every Monday?
