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

- Energy-mode preferences are not collected yet.
- Always-visible projects are not confirmed yet.
- Visual style preference is not confirmed yet.
- Notification behavior is not confirmed yet.
