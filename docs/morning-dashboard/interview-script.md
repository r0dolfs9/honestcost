# Morning Dashboard Interview Script

Last updated: 2026-06-05

## How To Use This

Ask these in batches. Do not force the user to answer everything in one sitting. Codex or Claude should record answers in `docs/morning-dashboard/user-interview-notes.md`.

The goal is to learn what makes the dashboard useful every day, especially when the user is tired, busy, or switching between projects.

## Batch 1: First 30 Seconds

Ask these first. These answers are required before designing the main screen.

1. When you open the dashboard in the morning, what should it tell you in the first 10 seconds?
   - Example answers: "what to do first," "what broke," "what I need to decide," "which project matters today."

2. Do you want the dashboard to recommend one main task, or give you 3-5 good options?
   - Option A: one main task
   - Option B: three ranked options
   - Option C: grouped by energy level

3. What makes you trust or distrust an AI-generated dashboard?
   - Example answers: "source links," "test results," "last checked time," "clear failed-source warnings," "not sounding too confident."

4. What information should never be hidden behind a click?
   - Example answers: blockers, failed automations, money/legal tasks, today's main action, user decisions.

## Batch 2: Energy And Work Modes

Ask after Batch 1 is answered.

1. When you have low energy, what kind of task should the dashboard surface?
   - Examples: 10-minute cleanup, review-only, one obvious decision, no-code admin task.

2. When you have 2-4 focused hours, what should it prioritize?
   - Examples: coding implementation, project QA, research, writing, revenue tasks.

3. Should the dashboard have explicit modes?
   - Low energy
   - Normal day
   - Deep work
   - Review/admin
   - Weekend catch-up

4. What task types should the dashboard avoid recommending when you are tired?

## Batch 3: Project Handling

Ask after the first design direction is roughly understood.

1. Which projects should always appear?
   - Candidate list: HonestCost, IronLog, Munalife, KPA, automations, personal content, inbox.

2. Which projects should appear only when active or blocked?

3. What does a "healthy project" mean to you?
   - Recent progress
   - Clear next task
   - Tests pass
   - Revenue/action path exists
   - No unresolved legal/account blockers

4. What project status labels feel natural?
   - Ready
   - Blocked
   - Needs review
   - Waiting on me
   - On track
   - Stale
   - Ignore for now

## Batch 4: Decisions And User Checkpoints

Ask before building the decision inbox.

1. How many decisions can the dashboard show before it feels annoying?
   - 1-2
   - 3-5
   - As many as needed, grouped

2. Should AI recommend a default option for every decision?

3. What decision format is easiest?
   - A/B cards
   - recommended option + alternatives
   - short question list
   - impact/effort table

4. Which decisions should interrupt daily work?
   - Money
   - legal
   - publishing
   - deleting files
   - project direction
   - design approval

## Batch 5: Visual Style

Ask before generating visual concepts.

1. Which style should be closest?
   - Command center: dark, intense, operational
   - Calm briefing: clean, spacious, lower stress
   - Project cockpit: structured, analytical, serious
   - Hybrid

2. What should it feel like after six months of daily use?
   - motivating
   - calm
   - serious
   - fast
   - beautiful
   - low-friction

3. Do you prefer:
   - cards
   - tables
   - timelines
   - progress rings
   - kanban lanes
   - compact rows
   - large hero recommendation

4. What visual elements get annoying over time?

## Batch 6: Notifications And Automation Health

Ask before final technical planning.

1. Should Telegram notifications be required, optional, or only used for failures?

2. What should happen if Gmail fails?
   - still generate dashboard
   - show warning only
   - retry automatically
   - notify user

3. What should happen if project files are stale?

4. Should the dashboard archive daily snapshots?

## Batch 7: Weekly And Monthly Review

Ask after the daily dashboard direction is approved.

1. What should the weekly version tell you?
   - what moved
   - what got stuck
   - what to stop doing
   - what project deserves more attention

2. Should the dashboard track repeated carry-over tasks?

3. Should it show "projects ignored too long"?

4. What would make the dashboard useful for planning the next week?

## Minimum Answers Needed Before Next Phase

Before information architecture and section design, collect at least:

- First 10-second answer
- One main task vs multiple options
- Trust/distrust signals
- Low-energy task preference
- Deep-work task preference
- Always-visible projects
- Preferred visual direction

## Recording Format

Use this format in `docs/morning-dashboard/user-interview-notes.md`:

```md
# Morning Dashboard User Interview Notes

Last updated: YYYY-MM-DD

## Batch 1: First 30 Seconds

- First 10-second answer:
- Recommendation style:
- Trust signals:
- Never hidden:

## Batch 2: Energy And Work Modes

- Low-energy preference:
- Deep-work preference:
- Modes:
- Avoid when tired:

## Assumptions

- Assumption:
- Confidence:
- Needs user confirmation:
```
