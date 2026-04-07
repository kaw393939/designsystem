---
schema: qa/v1
qaType: spec
targetId: observable-state
targetPath: docs/_specs/educational-design-system/observable-state.md
status: approved
reviewer: github-copilot
createdAt: 2026-04-04T00:00:00Z
outcome: approved
supersedes: null
---

# Observable State Spec QA

## Scope

Review the observable-state spec for artifact clarity, visibility safety, route completeness, and export-model alignment with the current architecture.

## Method

Reviewed the observability spec against:

- `docs/_specs/educational-design-system/phase-2-sprint-plan.md`
- `docs/_specs/educational-design-system/agentic-orchestration.md`
- `docs/_specs/educational-design-system/workflow-state-machine.md`
- `docs/_specs/educational-design-system/deployment.md`
- `docs/_specs/educational-design-system/cli-command-surface.md`
- the current repository status in `README.md`

Checked for:

- explicit preservation of file-first truth and local-only SQLite runtime boundaries
- a complete public route map for documents, artifacts, releases, runs, queue, failures, and lineage
- clear redaction and visibility-tier rules
- a derived export model that can support both public and maintainer observability without live database access

## Findings

No blocking findings.

## Assumptions

- The first implementation pass may generate observability bundles locally under `.site/` before any release-level archival flow is added.
- Not every current artifact type will need a dedicated page family on day one as long as the route model and snapshot types stay stable.

## Decision

Approved.

## Required Follow-ups

- Keep the Sprint 11 through Sprint 13 briefs aligned with this spec if the route model, snapshot set, or visibility tiers change.
- Update the CLI surface and deployment docs when the observable-state exporter and route generation commands are implemented.
- Revisit the snapshot set if the phase-2 source-to-unit workflow introduces additional canonical artifact types that need first-class public state views.
