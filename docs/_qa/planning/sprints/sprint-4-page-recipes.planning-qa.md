---
schema: qa/v1
qaType: sprint-planning
targetId: sprint-4-page-recipes
targetPath: docs/_specs/educational-design-system/sprints/sprint-4-page-recipes.md
status: approved
reviewer: github-copilot
createdAt: 2026-04-04T00:00:00Z
outcome: approved
supersedes: null
---

# Sprint 4 Page Recipes Planning QA

## Scope

Review the Sprint 4 brief to confirm the recipe-proof and exemplar-page work is bounded, testable, and ready to implement on top of the approved token, layout, and pedagogical baselines.

## Method

Reviewed the sprint brief against:

- the phase-1 foundation spec
- the phase-1 sprint plan
- the operating runbook
- the planning QA artifact spec
- the page recipe contracts in `page-recipes.md`
- the phase-1 content model in `content-schema.md`
- the current repository status and Sprint 3 implementation baseline in `README.md`

Checked for:

- alignment between the Sprint 4 exemplar-page goals and the documented recipe contracts
- explicit avoidance of hidden dependency on the not-yet-implemented release-manifest and file-based `UnitVersion` workflow
- route-level exemplar proof rather than guide-page or component-gallery proof
- testability of recipe conformance, including missing-section and wrong-order failures
- preservation of exported-site and base-path validation expectations

## Findings

No blocking findings.

## Assumptions

- Sprint 4 may use checked-in approved unit-config fixtures or typed unit specs as stand-ins for approved unit selections until the file-based workflow and release-manifest system land in later work.
- The exemplar pages should exist as dedicated public routes rather than additional sections inside the `/layouts/` or `/primitives/` guide routes.
- Recipe conformance can be proven with validator coverage or equivalent tests without requiring the full publishing CLI and manifest pipeline.

## Decision

Approved for implementation.

## Required Follow-ups

- Create `sprint-4-page-recipes.implementation-qa.md` when the exemplar routes, recipe-conformance checks, and exported-site validation evidence exist.
- Record explicit evidence for both passing recipe-conformance cases and at least one failing case for missing required blocks or wrong block order.
