---
schema: qa/v1
qaType: sprint-planning
targetId: sprint-8-source-to-unit-workflow
targetPath: docs/_specs/educational-design-system/sprints/sprint-8-source-to-unit-workflow.md
status: approved
reviewer: github-copilot
createdAt: 2026-04-04T00:00:00Z
outcome: approved
supersedes: null
---

# Sprint 8 Source-to-Unit Workflow Planning QA

## Scope

Review the Sprint 8 brief to confirm that the first file-backed source-to-unit workflow slice is bounded, testable, and ready to implement on top of the approved Sprint 7 orchestration bootstrap.

## Method

Reviewed the sprint brief against:

- `docs/_specs/educational-design-system/phase-2-sprint-plan.md`
- `docs/_specs/educational-design-system/agentic-orchestration.md`
- `docs/_specs/educational-design-system/content-schema.md`
- `docs/_specs/educational-design-system/workflow-state-machine.md`
- `docs/_specs/educational-design-system/cli-command-surface.md`
- `docs/_qa/implementation/sprints/sprint-7-agentic-orchestration.implementation-qa.md`
- the current repository status in `README.md`

Checked for:

- explicit preservation of file and Git truth over local SQLite state
- a bounded first implementation slice around sources, units, and review records instead of the full future publishing system
- enforcement of the documented planning prerequisite that a `UnitBrief` exists before a `UnitDraft`
- testability of immutable freeze behavior, append-only review records, and release rejection of working drafts
- preservation of the current selected-release validation and build baseline during migration away from fixture-only proof

## Findings

No blocking findings.

## Assumptions

- Sprint 8 introduces the first real file-backed unit workflow slice without requiring the entire existing content library to migrate off fixture-backed proof in one pass.
- The first implementation pass may focus on sources, unit drafts, immutable unit versions, and review records while leaving visual lifecycle work to Sprint 9.
- Lifecycle transitions after freeze should preserve immutable unit content payloads even when explicit workflow state and review evidence continue to be recorded through commands and companion artifacts.

## Decision

Approved for implementation.

## Required Follow-ups

- Create `sprint-8-source-to-unit-workflow.implementation-qa.md` once source registration, unit lifecycle commands, file-backed example artifacts, and migration proof exist.
- Record explicit evidence that selected-release validation and build still pass while working drafts remain excluded from publishable inputs.
- Keep the content schema, workflow state machine, and CLI command surface aligned if implementation needs to clarify how immutable version snapshots and explicit lifecycle state coexist.
