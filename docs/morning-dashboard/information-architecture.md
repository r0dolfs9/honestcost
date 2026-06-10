# Morning Dashboard Information Architecture

Last updated: 2026-06-05

## Core Product Decision

The dashboard is a status-and-next-action system, not a task buffet.

The first screen must answer:

1. What is the status of everything?
2. What was last completed?
3. What is next up?
4. What is the one task to do now?
5. Is there an urgent meeting, deadline, or task that overrides the normal plan?

## Primary Screen Hierarchy

### 1. Urgent Override Strip

This appears only when something time-sensitive exists.

Examples:

- Meeting today
- Deadline today or tomorrow
- Automation failure that blocks the morning check
- User decision blocking active work
- Production/site/test failure

Rules:

- If present, this strip sits above the main recommendation.
- It should be short and impossible to miss.
- It should not show non-urgent warnings.

### 2. One Main Recommended Task

This is the dominant card on the dashboard.

Required fields:

- Task title
- Project
- Energy fit
- Why this task now
- Estimated time
- First concrete step
- Blocking status
- Source/confidence marker

Selection rules:

1. Hard deadline or meeting prep wins.
2. Blocker-clearing task wins over new feature work.
3. User-waiting decision wins if it blocks multiple tasks.
4. Project QA/trust work wins before polish or expansion.
5. If several tasks are equal, choose the smallest task that unlocks the most follow-up work.
6. If the selected energy mode is low energy, prefer cleanup, obvious decisions, review, or small mechanical fixes.
7. If the selected energy mode is deep work, prefer the task with the highest progress-per-hour.
8. Do not recommend website building, copywriting, or legal work in low-energy mode unless a hard deadline forces it.

### 3. Everything Status Overview

This section summarizes the persistent projects plus any urgent conditional projects without forcing the user to choose between many tasks.

Each project gets one compact row or card:

- Project name
- Health: Ready / Needs review / On track / Stale / Ignore for now
- Last done
- Next up
- Risk or blocker
- Last checked

The section should support scanning, not deep reading.

Persistent projects:

- Munalife
- KPA
- Inbox

Conditional projects:

- HonestCost
- IronLog
- Automations
- Personal content
- Other future projects

Conditional projects appear when they are the most urgent, recently active, blocked, stale enough to matter, or tied to a meeting/deadline.

### 4. Last Done / Next Up Timeline

This supports continuity across days.

Each item should show:

- Date
- Project
- Last completed item
- Next planned step
- Whether the next step is AI-doable or user-required

### 5. Quiet Secondary Queues

These are useful but should not compete with the one main task.

- Other useful tasks
- Waiting on user
- Waiting on external
- Research backlog
- Someday / parking lot

These can sit below the fold or behind filters.

## Durable Data Objects

### Project

Fields:

- `id`
- `name`
- `status`
- `visibility`: persistent / conditional / hidden
- `last_done`
- `next_up`
- `last_checked_at`
- `last_meaningful_progress_at`
- `health_reason`
- `source_refs`

### Task

Fields:

- `id`
- `project_id`
- `title`
- `priority`
- `estimate`
- `first_step`
- `why_now`
- `status`
- `ai_doable`
- `user_required`
- `deadline_at`
- `energy_fit`: low / normal / deep / admin / weekend
- `avoid_when_tired`
- `source_refs`
- `confidence`

### Decision

Fields:

- `id`
- `project_id`
- `title`
- `recommended_option`
- `alternative_options`
- `recommendation_reason`
- `impact_if_ignored`
- `interrupts_daily_flow`
- `decision_type`: money / legal / design_approval / project_direction / file_action / other
- `source_refs`
- `confidence`

### Urgent Item

Fields:

- `id`
- `type`: meeting / deadline / failure / decision / blocker
- `title`
- `due_at`
- `impact`
- `required_action`
- `source_refs`

Decision urgency rules:

- Money decisions can become urgent override items.
- Legal decisions can become urgent override items.
- Design approval decisions can become urgent override items.
- Other decisions should not interrupt daily flow unless they block the main recommended task or have a real deadline.

### Completion

Fields:

- `id`
- `project_id`
- `completed_at`
- `summary`
- `unlocked_next_step`
- `source_refs`

### Source Reference

Fields:

- `type`: progress / pinned-chat / file / git / test / automation / user-answer
- `path_or_thread`
- `checked_at`
- `confidence`
- `note`

## Status Vocabulary

- `Ready`: has a clear next step and can be worked on.
- `Needs review`: needs user or AI review before progress continues confidently.
- `On track`: progress is happening and the project is not too inactive.
- `Stale`: too inactive, unclear, or repeatedly not moving.
- `Ignore for now`: intentionally not part of today's focus unless an urgent item appears.

System/internal labels can still exist, but should not dominate the UI:

- `Failed source`: an automation or data source failed.
- `Waiting on external`: depends on service, connector, deployment, legal/accounting, or third party.
- `Blocked`: cannot proceed without a user/external action.

## Project Health Model

A healthy project is making progress and is not too inactive.

Health should consider:

- last meaningful progress date
- whether the next step is clear
- whether the project has become stale
- whether a blocker is preventing movement
- whether the project is persistent or only conditionally shown

Inactivity rules should be project-specific later. For V1, use simple defaults:

- Persistent projects should show a stale warning sooner.
- Conditional projects should only surface if they become urgent, blocked, recently active, or stale enough to matter.
- `Ignore for now` suppresses non-urgent project noise.

## Recommendation Model

The dashboard should choose one task using this scoring order:

1. Urgency: deadline/meeting/failure.
2. Blocker removal: unblocks other tasks.
3. Project importance: active/revenue/trust project.
4. Momentum: follows directly from last done item.
5. Time fit: can be started today.
6. Energy fit:
   - Low energy: cleanup, obvious decision, review, small mechanical fix.
   - Normal day: next best balanced task.
   - Deep work: highest progress-per-hour task.
   - Review/admin: decisions, planning, inbox, project status.
   - Weekend catch-up: stale tasks, weekly review, light cleanup.
7. Avoidance rules:
   - Avoid website building when tired.
   - Avoid copywriting when tired.
   - Avoid legal work when tired.
8. User distraction risk: avoid presenting many equal choices.

Persistent project weighting:

- Munalife, KPA, and inbox are always visible in status overview.
- Conditional projects should not override the main recommendation unless they are urgent, blocked, or clearly the highest-progress task.

## Decision Inbox Model

The decision inbox exists to batch user decisions without overwhelming the daily view.

Rules:

- Show 3-5 decisions maximum in the main decision area.
- Every decision should include one AI-recommended default option.
- Every decision should include alternatives.
- The default format is recommendation plus alternatives, not A/B cards or a large impact table.
- Decisions beyond the 3-5 visible limit should move to a lower-priority backlog.
- Money, legal, and design approval decisions can interrupt the main daily flow.
- Project direction, file deletion, publishing, and other decisions should stay quiet unless they become urgent, deadline-bound, or block the main task.

## Energy Modes

### Low Energy

Use when the user is tired or wants a low-friction start.

Recommend:

- Cleanup
- Sorting
- One obvious decision
- Review-only work
- Small mechanical fixes

Avoid:

- Website building
- Copywriting
- Legal work
- Broad ambiguous planning

### Normal Day

Use when there is no strong energy signal.

Recommend:

- The strongest practical next step
- QA
- Implementation
- Research
- Clear project progress

### Deep Work

Use when the user has 2-4 focused hours.

Recommend:

- Highest progress-per-hour task
- Work that unlocks multiple next steps
- Implementation or QA that changes project state materially
- Research only if it removes a real decision blocker

### Review/Admin

Use when the user wants control and clarity more than production.

Recommend:

- Decision inbox
- Project status cleanup
- Automation health review
- File/status cleanup

### Weekend Catch-Up

Use for lighter review and cleanup.

Recommend:

- Stale task review
- Weekly summary
- Small cleanup
- Low-risk planning

## First Prototype Layout

Recommended layout:

1. Top: urgent override strip, only if needed.
2. Hero: one main recommended task.
3. Row: compact status of everything.
4. Row: last done / next up timeline.
5. Below fold: quiet queues, source confidence, automations, archive.

This layout matches the user's Batch 1 answers: broad status is visible, but only one task is promoted.

## Items Still Requiring User Input

- Visual style direction.
- Notifica