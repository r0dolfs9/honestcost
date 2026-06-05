# Morning Dashboard User Interview Notes

Last updated: 2026-06-05

## Batch 1: First 30 Seconds

- First 10-second answer: The dashboard should show the status of everything, the last thing completed, and what is next up.
- Recommendation style: One main recommended task is best because multiple options can become distracting.
- Trust signals: No strong explicit trust/distrust requirements yet. Treat this as neutral, but still keep source/confidence markers because the long-term system needs them.
- Never hidden: The most urgent task, meeting, deadline, or time-sensitive thing must always be visible without clicking.

## Batch 1 Design Implications

- The first screen should not be a broad task buffet. It should have one dominant "Do this next" recommendation.
- Project status should still be visible, but secondary to the single recommended action.
- Every project row/card should include:
  - current status
  - last completed item
  - next up
  - blocker/deadline if present
- Meetings, hard deadlines, and urgent tasks must override normal project-priority ordering.
- The dashboard can keep confidence/source metadata, but it should be calm and compact because the user does not want heavy trust mechanics unless they matter.

## Open Follow-Up Areas

- Always-visible projects are not confirmed yet.
- Visual style preference is not confirmed yet.
- Notification behavior is not confirmed yet.

## Batch 2: Energy And Work Modes

- Low-energy preference: Surface cleanup tasks or one obvious decision. The task should be simple and not require heavy creative or legal thinking.
- Deep-work preference: Surface the task that creates the most efficient progress. Prefer work that moves the biggest project bottleneck or unlocks the most follow-up work.
- Modes: Explicit modes are acceptable. Use at least low energy, normal day, deep work, review/admin, and weekend catch-up if the UI can keep them simple.
- Avoid when tired: Website building, copywriting, and legal work should not be recommended when the user is tired.

## Batch 2 Design Implications

- The single recommended task should change based on energy mode.
- Low-energy mode should prefer cleanup, sorting, obvious decisions, review, or small mechanical fixes.
- Deep-work mode should choose the highest-leverage progress task, not necessarily the easiest task.
- Website building, copywriting, and legal/admin-heavy drafting need an energy guardrail.
- The dashboard should never make the user choose between many tasks just because modes exist; modes should influence the one recommended task.
