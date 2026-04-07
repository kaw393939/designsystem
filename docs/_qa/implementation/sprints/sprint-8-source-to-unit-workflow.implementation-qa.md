---
schema: qa/v1
qaType: sprint-implementation
targetId: sprint-8-source-to-unit-workflow
targetPath: docs/_specs/educational-design-system/sprints/sprint-8-source-to-unit-workflow.md
status: approved
reviewer: github-copilot
createdAt: 2026-04-05T00:00:00Z
outcome: approved
supersedes: null
---

# Sprint 8 Source-to-Unit Workflow Implementation QA

## Scope

Review the Sprint 8 implementation for the full file-backed unit lifecycle slice: source registration, draft start/show/freeze, request-review, review-record creation, revision, approval gating, and the compatibility path that lets selected-release validation and route-level unit resolution accept explicit file-backed `unitId@version` references without breaking the published fixture-backed baseline.

## Method

Reviewed:

- the Sprint 8 brief in `docs/_specs/educational-design-system/sprints/sprint-8-source-to-unit-workflow.md`
- the workflow and schema contracts in `docs/_specs/educational-design-system/workflow-state-machine.md`, `docs/_specs/educational-design-system/content-schema.md`, and `docs/_specs/educational-design-system/cli-command-surface.md`
- the workflow library in `lib/source-unit-workflow.ts`
- the selected-release compatibility changes in `lib/site-release.ts` and `lib/site-unit-resolver.ts`
- the route-level selected-unit consumption in `app/primitives/page.tsx`, `app/recipes/feedback-loops/page.tsx`, and `app/recipes/public-space-observation/page.tsx`
- the CLI surface in `scripts/site.ts`
- the checked-in example planning and workflow artifacts under `content/`
- the new unit coverage in `tests/unit/source-unit-workflow.test.ts`, `tests/unit/site-release.test.ts`, and `tests/unit/site-unit-resolver.test.ts`
- the repo status/index updates in `README.md`, `docs/_specs/README.md`, and `docs/_qa/README.md`

Validation completed with these command results:

- `npm run test -- tests/unit/source-unit-workflow.test.ts tests/unit/site-release.test.ts tests/unit/site-unit-resolver.test.ts`: passed with `18` tests covering request-review, review-record creation, revision seeding, approval gating, explicit file-backed release references, duplicate-selection rejection, and resolver behavior
- `npm run typecheck`: passed
- `npm run lint`: passed
- `npm run test`: passed with `47` tests
- `npm run test:browser`: passed with `25` browser tests and `1` intentional skip
- `npm run lighthouse`: passed for the current selected-release route set against the exported artifact
- `npm run site -- validate schema && npm run site -- validate workflow && npm run site -- validate release && npm run site -- source list && npm run site -- unit show choose-primary-archetype --version v2026-04-05T120000Z`: passed

## Findings

No blocking findings.

Current revalidation note:

- After subsequent edits to the Sprint 8 resolver and focused test files, the current Sprint 8 boundary still passes `npm run test -- tests/unit/source-unit-workflow.test.ts tests/unit/site-release.test.ts tests/unit/site-unit-resolver.test.ts` with `18` tests, `npm run typecheck`, `npm run lint`, and `npm run site:validate`.

Non-blocking observations:

- The current published `phase-1-baseline-release` remains fixture-backed, but the compatibility path for explicit file-backed `unitId@version` references is now validated and route-consumable.
- Sprint 8 now covers the bounded source-to-unit lifecycle slice, while multi-experience assembly, visual workflow, and broader release automation still belong to later phase-2 sprints.

## Assumptions

- During migration, fixture-backed selected releases remain valid until later work replaces them with broader file-backed experience and release libraries.
- The current unit review flow records explicit review artifacts and mutates workflow metadata only on the version record; the unit content payload itself remains frozen after `freeze`.
- The route-level selected-unit resolver is intentionally narrow and currently powers the existing primitives and recipe proof pages rather than a new multi-experience site catalog.

## Decision

Approved.

## Required Follow-ups

- Start Sprint 9 by introducing multi-experience assembly and first-class visual workflow on top of the completed Sprint 8 unit lifecycle.
- Keep release validation strict about duplicate unit selection and non-approved file-backed unit references as additional releases adopt the `unitId@version` form.
- Extend the same file-backed resolver pattern to future experience-specific routes instead of adding another parallel content-loading path.
