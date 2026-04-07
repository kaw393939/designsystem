# Sprint 7: Agentic Orchestration Bootstrap

## Goal

Bootstrap phase 2 by formalizing the new planning artifacts and adding a local SQLite orchestration ledger to the site CLI.

## Scope

1. Formalize phase 2 with a dedicated phase plan.
2. Define the planning artifacts that turn research documents into site experiences.
3. Add a local SQLite orchestration ledger for tracked CLI runs and local locks.
4. Extend the existing `site` CLI with orchestration commands and tracked validate/build behavior.
5. Keep the published phase-1 baseline release valid and static-export-safe.

## Deliverables

- `phase-2-sprint-plan.md`
- `agentic-orchestration.md`
- planning artifact definitions for `ExperienceNorthStar`, `ModuleBrief`, `UnitBrief`, `VisualBrief`, `OrchestrationRun`, and `OrchestrationLock`
- a SQLite-backed local orchestration module
- `site orchestrate init`, `site orchestrate status`, and `site orchestrate history`
- tracked validate/build operations plus local lock enforcement
- tests for orchestration initialization, run recording, and lock behavior

## Work checklist

1. Keep file artifacts and Git as canonical publishing truth.
2. Ensure SQLite is local-only and ignored from version control.
3. Record validate/build runs durably.
4. Prevent overlapping local build operations for the same selected experience and release.
5. Update the active doc indexes and QA indexes so phase 2 becomes discoverable.
6. Keep the published phase-1 baseline selection valid after the bootstrap lands.

## Positive tests

- The orchestration database initializes in a clean workspace.
- Validate and build operations create durable run records.
- Local lock contention prevents overlapping builds for the same experience and release.
- The published phase-1 baseline still passes `site:validate`.

## Negative tests

- No SQLite file is committed to the repository.
- No runtime route depends on SQLite for published content.
- No build operation bypasses the selected-release validation path.
- No orchestration helper silently mutates approved or published content artifacts.

## Edge-case checks

- Missing orchestration database should self-heal through initialization.
- Re-running an operation after a failure should still produce inspectable local history.
- Expired or released locks should not block future runs indefinitely.

## Accessibility checks

- Status and history outputs should remain plain-text readable for local terminal use.
- The bootstrap must not weaken existing page-level accessibility checks because it is local tooling only.

## Export and deploy checks

- Static export behavior must remain unchanged.
- The selected release must remain explicit in build and validation flows.

## Out of scope

- the full file-based `UnitDraft` and `UnitVersion` workflow implementation
- source ingestion automation
- multi-agent execution engine
- remote orchestration service or shared database
- automated release promotion beyond the existing published baseline process

## Exit criteria

Sprint 7 is done when the repo has an approved phase-2 plan, approved planning QA, a working local SQLite orchestration ledger, explicit planning artifact definitions, and tracked CLI validate/build operations that leave the published phase-1 baseline intact.
