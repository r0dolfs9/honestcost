# Morning Dashboard Research Pack

Last updated: 2026-06-05

## Purpose

This pack starts the long-term redesign of `C:\Users\User\Desktop\morning-dashboard.html`. The goal is not to make a prettier static report. The goal is to design a durable personal command center that can stay useful for years across HonestCost, IronLog, Munalife, KPA, automations, and future projects.

## Local Context Reviewed

- Current MVP dashboard: `C:\Users\User\Desktop\morning-dashboard.html`
- Automation memory: `C:\Users\User\.codex\automations\morning-visual-task-dashboard\memory.md`
- Cross-agent progress log: `C:\Users\User\progress.md`
- Project plan: `docs/superpowers/plans/2026-06-05-morning-dashboard-long-term-system.md`
- HonestCost queue: `NEXT_TASKS.md`
- HonestCost project status: `PROJECT_STATUS.md`
- HonestCost roadmap: `00_HONESTCOST_ROADMAP.md`
- Browser QA note: `BROWSER_QA_2026-06-02.md`
- Car-data plan: `CAR_DB_UPDATE_PLAN_2026-06-02.md`

## Current MVP Strengths

- Strong first impression: the dashboard feels like a real command center, not a plain task list.
- It already separates major areas: priorities, progress, fixes, blockers, completed work, confidence, and follow-up questions.
- It makes failed automation visible instead of hiding it.
- It has enough visual hierarchy to help scanning.
- It is self-contained HTML, so it is easy to generate and open.

## Current MVP Weaknesses

- Content is mostly hardcoded for one run.
- There is no stable data model behind the sections.
- It mixes daily task context, project status, and user decisions without clear source metadata per item.
- It has no interaction: no filters, no expanding evidence, no low-energy/deep-work modes.
- It still references the untracked Karpathy HTML as a decision because Git saw it as stray project work.
- It does not yet distinguish enough between facts, AI recommendations, assumptions, stale data, and failed source checks.
- It does not have a weekly/monthly view, so it may become too daily and lose long-term memory.

## Research Sources

- Microsoft Power BI dashboard design guidance: https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboards-design-tips
- Microsoft Power BI alerts guidance: https://learn.microsoft.com/ka-ge/Power-Bi/consumer/end-user-alerts
- Atlassian dashboard filters guidance: https://support.atlassian.com/platform-experiences/docs/add-and-manage-dashboard-filters/
- Atlassian task dashboard guide: https://www.atlassian.com/agile/project-management/task-management-dashboard
- NN/g UX research career report, useful for research-method context: https://media.nngroup.com/media/reports/free/UserExperienceCareers_2nd_Edition.pdf

## Research Takeaways

### 1. The Dashboard Must Start With Decisions, Not Data

The current dashboard should not ask "what can we show?" It should ask:

- What should I do now?
- What is blocked?
- What requires my decision?
- What is unsafe to trust?
- What changed since last time?

Long-term rule: every major section must have an action purpose. If a section only looks informative but does not change behavior, it should be moved to a drilldown or weekly review.

### 2. First-Screen Hierarchy Matters

Microsoft's dashboard guidance emphasizes audience, top-level monitoring, uncluttered layout, and placing the most important information where readers look first. For this personal dashboard, the first screen should be:

1. Today's recommended action
2. User decisions waiting
3. Failed/stale sources
4. Project health summary
5. Time/energy fit

Details should sit below or behind expanders.

### 3. Filters Should Be Persistent And Obvious

Atlassian dashboard filters show the value of global filters applied at dashboard level. This dashboard should support:

- Project filter
- Time horizon: today / this week / this month
- Energy mode: low / normal / deep work
- Status: ready / blocked / waiting on user / failed source
- Task size: 15 minutes / 45 minutes / 90 minutes / multi-session

Filter state should reset easily and should not hide critical blockers.

### 4. Alerts Should Be Threshold-Based, Not Decorative

Power BI alerts are useful because they trigger on thresholds. For this dashboard, alerts should appear when:

- A recurring automation failed.
- A source has not been checked recently.
- A project has gone stale.
- A user decision blocks several tasks.
- Tests or deployment status fail.
- A task is repeatedly carried over.

Alerts should explain what happened, why it matters, and what to do next.

### 5. Long-Term Dashboards Need Governance

The dashboard should not become a dumping ground. It needs rules:

- Every card has an owner/source.
- Every claim has confidence.
- Every section has a reason to exist.
- Stale items expire or move to archive.
- Weekly review prunes repeated noise.
- Visual template changes rarely; data changes daily.

### 6. Personal Dashboard Must Support Different Energy States

A normal work dashboard assumes the user is ready to work. This one should handle:

- Tired morning: one simple next action.
- Good focus day: deep-work sequence.
- Review day: project health and stale blockers.
- Admin day: decisions, accounts, legal, automation failures.

Energy mode is likely more useful than generic priority alone.

## Recommended Long-Term Product Shape

### Main Views

1. **Daily Command**
   - One main recommendation
   - Top blockers
   - Decisions waiting on user
   - Automation health
   - Energy-based task options

2. **Project Health**
   - HonestCost, IronLog, Munalife, KPA, automation systems, future projects
   - Last activity
   - Current milestone
   - Health status
   - Next verified action

3. **Decision Inbox**
   - All user decisions grouped in one place
   - Recommended option from AI
   - Consequences of not deciding
   - "Can continue without this?" flag

4. **Trust And Sources**
   - Failed connectors
   - Stale files
   - Unverified claims
   - Last successful check
   - Evidence links

5. **Weekly Review**
   - What moved
   - What repeated
   - What got stuck
   - What should be killed, delegated, or promoted

## Stable Data Objects

These objects should power the long-term version:

- `project`: durable project or domain
- `task`: actionable unit of work
- `blocker`: condition preventing work
- `decision`: user choice needed
- `source`: file, chat, test, git, automation, or user answer
- `automation_status`: health of recurring checks
- `completion`: recently finished work
- `risk`: possible issue that is not yet blocking
- `assumption`: unverified working belief
- `review_checkpoint`: point where user review is useful

## Design Principles For The Next Prototype

- One primary recommendation, not ten equal tasks.
- A visible "why this task" explanation.
- Confidence markers on every major claim.
- Failed automations treated as first-class information.
- Expandable evidence, not walls of text.
- Persistent filters for project, energy, and time horizon.
- Separate "today" from "someday."
- Separate facts from AI advice.
- Keep visual density high enough to feel serious, but not so high it becomes tiring.
- Design mobile as a different layout, not just a squeezed desktop.

## What Not To Build Yet

- Do not build a complex app before the interview and section design are reviewed.
- Do not add accounts, sync, cloud storage, or databases yet.
- Do not make Telegram required for the dashboard to be useful.
- Do not let email/Gmail failures block project dashboard generation.
- Do not create many design themes before agreeing on the information model.
- Do not hardcode HonestCost-specific assumptions into the long-term data model.

## Immediate Next Step

Use `docs/morning-dashboard/interview-script.md` to collect the first user answers. After that, create:

- `docs/morning-dashboard/user-interview-notes.md`
- `docs/morning-dashboard/information-architecture.md`
- `docs/morning-dashboard/section-design-spec.md`

