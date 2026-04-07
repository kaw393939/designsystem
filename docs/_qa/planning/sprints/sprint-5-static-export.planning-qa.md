---
schema: qa/v1
qaType: sprint-planning
targetId: sprint-5-static-export
targetPath: docs/_specs/educational-design-system/sprints/sprint-5-static-export.md
status: approved
reviewer: github-copilot
createdAt: 2026-04-04T00:00:00Z
outcome: approved
supersedes: null
---

# Sprint 5 Static Export and GitHub Pages Hardening Planning QA

## Scope

Review the Sprint 5 brief to confirm the static-export, Pages-hardening, and initial release-selected build work is bounded, testable, and ready to implement on top of the approved Sprint 4 baseline.

## Method

Reviewed the sprint brief against:

- the phase-1 sprint plan
- the deployment and static export spec
- the CLI command surface spec
- the content schema, especially `ExperienceConfig` and `ReleaseManifest`
- the workflow state machine
- the planning QA artifact spec
- the current repository status and approved Sprint 4 implementation baseline in `README.md`

Checked for:

- alignment between the Sprint 5 brief and the sprint-plan promise of export safety, release-manifest wiring, and initial CLI integration
- explicit avoidance of hidden dependency on a fully implemented authoring CLI or full multi-experience publishing library
- testability of a first checked-in experience-and-release selection path or equivalent selected-build fixture
- preservation of deterministic exported-site QA in both root-path and repository base-path modes
- explicit negative validation for missing, unapproved, or unresolved release references

## Findings

No blocking findings.

## Assumptions

- Sprint 5 may prove the first release-selected export path with one checked-in `ExperienceConfig` and one checked-in `ReleaseManifest`, or an equivalent checked-in selected-build fixture, rather than requiring the full future publishing library to exist on day one.
- Sprint 5 should implement only the narrow build-selection and validation surface needed for static export hardening, not the full authoring CLI described in the long-term command-surface spec.
- Release QA remains a separate gate after Sprint 5 implementation if the resulting build is intended for publication.

## Decision

Approved for implementation.

## Required Follow-ups

- Create `sprint-5-static-export.implementation-qa.md` once the selected export path, CI/build integration, and exported-site validation evidence exist.
- Record explicit evidence for fresh `out/` validation in both root-path and repository base-path modes.
- Record explicit failure evidence for missing, unapproved, or unresolved release references.
