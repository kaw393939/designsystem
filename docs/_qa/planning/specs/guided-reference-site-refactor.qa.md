---
schema: qa/v1
qaType: spec
targetId: guided-reference-site-refactor
targetPath: docs/_specs/guided-reference-site-refactor/spec.md
status: approved
reviewer: github-copilot
createdAt: 2026-04-07T00:00:00Z
outcome: approved
supersedes: null
---

# Guided Reference Site Refactor QA

## Scope

Review the guided-reference-site-refactor package for IA clarity, process fit, and readiness to guide an aggressive site refactor after integrating curator, exhibit-design, Steven Krug, and instructional-design findings.

## Method

Reviewed the new spec package against:

- `docs/_specs/README.md`
- `docs/_specs/educational-design-system/spec.md`
- `docs/_specs/educational-design-system/operating-runbook.md`
- `docs/_specs/identity-portfolio-redesign/spec.md`
- `docs/_research/identity-system-core.md`
- `docs/_research/books/transcripts/the-hero-and-the-outlaw/source-brief.md`
- `docs/_projects/identity-first-site/project-brief.md`
- `docs/_projects/bseaid-degree/qa-reviews/03-curatorial-editorial-experience-review.md`
- `docs/_projects/bseaid-degree/qa-reviews/04-brand-identity-systems-review.md`
- `docs/_projects/bseaid-degree/qa-reviews/06-accessibility-inclusive-design-review.md`
- `docs/_projects/bseaid-degree/qa-reviews/09-ux-student-journey-review.md`
- `docs/_projects/bseaid-degree/qa-reviews/13-synthesis-action-plan.md`

Checked for:

- a clear split between guided-tour and browse-reference responsibilities
- explicit room-template and cognitive-load rules
- actionable decision-output contracts rather than only conceptual guidance
- a single canonical home for examples and finish-line content
- a visible learner record across the guided tour
- first-click and obviousness validation requirements
- prerequisite, misconception, and formative-check coverage for guided steps
- compatibility with the repo's existing spec and QA process

## Findings

No blocking findings.

## Assumptions

- Initial implementation may preserve some current flat routes as aliases while the new route families are established.
- The new package governs the root-site refactor and does not replace the core platform specs under `educational-design-system/`.
- The first implementation pass should build the route-family shell, the visible tour record, and the lightweight validation checks together rather than deferring those to a later cleanup pass.

## Decision

Approved as the active planning foundation for the guided-tour plus browse-reference refactor.

## Required Follow-ups

- Create sprint- or workstream-level planning QA artifacts once implementation scope is broken into concrete phases.
- Update this QA artifact if the route-family model, alias policy, route-status model, or room-template doctrine changes materially.
- Require implementation QA to include first-click, five-second, resume-path, and return-path results for the new IA.