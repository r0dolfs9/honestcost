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

### 3. Everything Status Overview

This section summarizes all active projects without forcing the user to choose between many tasks.

Each project gets one compact row or card:

- Project name
- Health: Ready / Blocked / Waiting / Stale / Active
- Last done
- Next up
- Risk or blocker
- Last checked

The section should support scanning, not deep reading.

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
- `last_done`
- `next_up`
- `last_checked_at`
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

- `Active`: work is moving and has a clear next step.
- `Ready`: no blocker; can be worked on.
- `Blocked`: cannot proceed without a user/external action.
- `Waiting on user`: needs a decision, review, credential, account action, or approval.
- `Waiting on external`: depends on service, connector, deployment, legal/accounting, or third party.
- `Stale`: not checked or progressed recently.
- `Failed source`: an automation or data source failed.
- `Ignore for now`: intentionally hidden from daily focus unless urgent.

## Recommendation Model

The dashboard should choose one task using this scoring order:

1. Urgency: deadline/meeting/failure.
2. Blocker removal: unblocks other tasks.
3. Project importance: active/revenue/trust project.
4. Momentum: follows directly from last done item.
5. Time fit: can be started today.
6. User distraction risk: avoid presenting many equal choices.

## First Prototype Layout

Recommended layout:

1. Top: urgent override strip, only if needed.
2. Hero: one main recommended task.
3. Row: compact status of everything.
4. Row: last done / next up timeline.
5. Below fold: quiet queues, source confidence, automations, archive.

This layout matches the user's Batch 1 answers: broad status is visible, but only one task is promoted.

## Items Still Requiring User Input

- Energy-mode behavior.
- Always-visible project list.
- Visual style direction.
- Notification rules.
- Weekly/monthly review priorities.
