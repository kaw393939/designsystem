---
schema: qa/v1
qaType: sprint-planning
targetId: sprint-9-experience-assembly-and-visual-studio
targetPath: docs/_specs/educational-design-system/sprints/sprint-9-experience-assembly-and-visual-studio.md
status: approved
reviewer: github-copilot
createdAt: 2026-04-05T00:00:00Z
outcome: approved
supersedes: null
---

# Sprint 9 Experience Assembly and Visual Studio Planning QA

## Scope

Review the Sprint 9 brief to confirm that the first multi-experience assembly and visual-workflow slice is bounded, testable, and ready to implement on top of the approved Sprint 8 source-to-unit workflow.

## Method

Reviewed the sprint brief against:

- `docs/_specs/educational-design-system/phase-2-sprint-plan.md`
- `docs/_specs/educational-design-system/agentic-orchestration.md`
- `docs/_specs/educational-design-system/content-schema.md`
- `docs/_specs/educational-design-system/workflow-state-machine.md`
- `docs/_specs/educational-design-system/visual-asset-pipeline.md`
- `docs/_specs/educational-design-system/cli-command-surface.md`
- `docs/_qa/implementation/sprints/sprint-8-source-to-unit-workflow.implementation-qa.md`
- the current repository status in `README.md`

Checked for:

- explicit transition from the completed file-backed unit lifecycle into multi-experience assembly instead of a disconnected second content path
- a bounded first visual lifecycle around drafts, immutable versions, generation, and review rather than an unbounded design-tool or studio-ui effort
- preservation of file and Git truth over local SQLite state for experiences, visuals, and releases
- explicit enforcement of deterministic rules for charts and graphs while still allowing illustration-class generation where appropriate
- preservation of the current selected-release validation and published baseline during migration to file-backed experience and visual artifacts

## Findings

No blocking findings.

Current sequencing note:

- The Sprint 9 brief now breaks implementation into an explicit order: experience artifact foundation first, selected-release resolution second, visual lifecycle third, CLI and orchestration extension fourth, and migration-proof validation last. That sequence keeps the sprint aligned with the current Sprint 8 compatibility path instead of encouraging parallel ad hoc implementations.
- The brief now also includes a file-by-file implementation checklist naming the expected new workflow modules, resolver layers, focused test files, and checked-in content artifact paths. That keeps the first coding pass concrete enough to stage without guessing where Sprint 9 should land in the repo.
- The brief now also includes a phase-by-phase execution plan with recommended commit boundaries, so implementation can be staged into reviewable intermediate slices rather than one large cross-layer migration patch.
- The brief now also includes task-by-task build order inside each phase plus exact validation commands tied to the current npm and CLI surface. That makes the expected verification path explicit before coding starts.

## Assumptions

- Sprint 9 may introduce file-backed experience assembly and visual lifecycle proof for new experiences without migrating the published phase-1 baseline fully off fixture-backed experience and visual artifacts in one pass.
- The first implementation pass may focus on illustration, diagram, and one deterministic chart or graph workflow without requiring every future provider or design surface to land in the same sprint.
- New experience assembly proof may remain checked-in and CLI-driven in this sprint even if broader release automation and public observability stay deferred to later sprints.

## Decision

Approved for implementation.

## Required Follow-ups

- Create `sprint-9-experience-assembly-and-visual-studio.implementation-qa.md` once experience assembly, visual lifecycle commands, checked-in examples, and migration proof exist.
- Record explicit evidence that the published baseline still passes validation, exported-site QA, and Lighthouse after the new experience and visual compatibility paths land.
- Keep the content schema, workflow state machine, visual-asset pipeline, and CLI command surface aligned if implementation needs to clarify visual version asset ownership, experience selection rules, or release reference behavior.
