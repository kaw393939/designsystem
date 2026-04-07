---
schema: qa/v1
qaType: sprint-planning
targetId: sprint-6-quality-gates
targetPath: docs/_specs/educational-design-system/sprints/sprint-6-quality-gates.md
status: approved
reviewer: github-copilot
createdAt: 2026-04-04T00:00:00Z
outcome: approved
supersedes: null
---

# Sprint 6 QA, Accessibility, and Baseline Proof Planning QA

## Scope

Review the Sprint 6 brief to confirm the baseline-proof, accessibility, and quality-gate work is bounded, testable, and ready to implement on top of the approved Sprint 5 selected-release export baseline.

## Method

Reviewed the sprint brief against:

- the phase-1 sprint plan
- the planning QA artifact spec
- the workflow state machine
- the deterministic Lighthouse rule and current repository status in `README.md`
- the approved Sprint 5 implementation baseline in `docs/_qa/implementation/sprints/sprint-5-static-export.implementation-qa.md`

Checked for:

- alignment between the Sprint 6 brief and the sprint-plan promise of measurable baseline confidence rather than new feature work
- preservation of deterministic exported-site QA in both root-path and repository base-path modes
- explicit distinction between baseline-proof validation and separate release QA for a publishable candidate
- bounded coverage expectations for the current phase-1 baseline instead of an unbounded demand to test every helper equally
- explicit treatment of workflow and selected-release validation against the current checked-in approved fixtures

## Findings

No blocking findings after tightening the brief around dual-mode export verification, critical baseline surfaces, and the current selected-build proof boundary.

## Assumptions

- Sprint 6 validates the current checked-in approved Sprint 5 fixtures and invariants, not a publishable release candidate.
- The sprint should prioritize the critical phase-1 shell, primitive, recipe, and selected-release paths that define the current baseline rather than every internal helper at the same depth.
- Release QA remains a separate gate if the team wants to describe any candidate as publishable.

## Decision

Approved for implementation.

## Required Follow-ups

- Create `sprint-6-quality-gates.implementation-qa.md` once the expanded verification evidence, accessibility follow-up list, and maintainer command routine exist.
- Record explicit evidence for both root-path and repository base-path verification in the implementation QA artifact.
- Record any unresolved accessibility issues explicitly rather than folding them into generic future work.
