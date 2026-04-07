# QA Index

## Purpose

This folder contains the active QA artifacts for planning, implementation, and releases.

These files are the durable review record for the development process. They are separate from `_specs/` so the active source-of-truth specs stay compact while QA history remains explicit and auditable.

## Structure

- `planning/specs/`: QA for core architecture and planning specs
- `planning/sprints/`: QA for sprint briefs before implementation begins
- `implementation/sprints/`: QA for sprint implementations after code or content changes are made
- `releases/`: QA for publishable release candidates
- `_archive/`: explicit holding area for superseded QA that no longer belongs in the active review path
- `templates/`: starter files for each QA artifact type

## Reading rule

Before starting work on a sprint or release, read:

1. the relevant active spec in `docs/_specs/`
2. the latest relevant QA artifact in `docs/_qa/`

The current phase-1 foundation spec planning artifact is:

- `planning/specs/phase-1-foundation-spec.qa.md`

This artifact is currently approved and records the planning review for the active foundation spec set.

The current phase-2 plan spec artifact is:

- `planning/specs/phase-2-sprint-plan.qa.md`

This artifact is currently approved and records the planning review for the active phase-2 plan.

The current phase-3 plan spec artifact is:

- `planning/specs/phase-3-sprint-plan.qa.md`

This artifact is currently approved and records the planning review for the active phase-3 plan.

The current agentic orchestration spec artifact is:

- `planning/specs/agentic-orchestration.qa.md`

This artifact is currently approved and records the planning review for the phase-2 planning-artifact and SQLite-orchestration model.

The current observable-state spec artifact is:

- `planning/specs/observable-state.qa.md`

This artifact is currently approved and records the planning review for the public observatory, visibility-tier, and exported observable-state model.

The current Sprint 1 planning artifact is:

- `planning/sprints/sprint-1-theme-tokens.planning-qa.md`

This artifact is currently approved and records the planning review for the token and visual-baseline layer.

The current implementation baseline artifact is:

- `implementation/sprints/foundation-app-scaffold.implementation-qa.md`

This artifact is currently approved and records the first evidence-backed implementation validation pass for the repo.

The current Sprint 1 implementation artifact is:

- `implementation/sprints/sprint-1-theme-tokens.implementation-qa.md`

This artifact is currently approved and records the evidence-backed Sprint 1 token implementation pass.

The current Sprint 2 planning artifact is:

- `planning/sprints/sprint-2-layout-primitives.planning-qa.md`

This artifact is currently approved and records the planning review for the shared shell and layout primitive layer.

The current Sprint 3 planning artifact is:

- `planning/sprints/sprint-3-educational-primitives.planning-qa.md`

This artifact is currently approved and records the planning review for the pedagogical primitive layer and unit-to-component render contracts.

The current Sprint 4 planning artifact is:

- `planning/sprints/sprint-4-page-recipes.planning-qa.md`

This artifact is currently approved and records the planning review for recipe-proof exemplar pages and route-level recipe conformance checks.

The current Sprint 5 planning artifact is:

- `planning/sprints/sprint-5-static-export.planning-qa.md`

This artifact is currently approved and records the planning review for static export hardening, base-path validation, and the first explicit release-selected export path.

The current Sprint 6 planning artifact is:

- `planning/sprints/sprint-6-quality-gates.planning-qa.md`

This artifact is currently approved and records the planning review for baseline proof, accessibility follow-up, dual-mode exported-site verification, and final quality-gate documentation.

The current Sprint 7 planning artifact is:

- `planning/sprints/sprint-7-agentic-orchestration.planning-qa.md`

This artifact is currently approved and records the planning review for the phase-2 orchestration bootstrap.

The current Sprint 8 planning artifact is:

- `planning/sprints/sprint-8-source-to-unit-workflow.planning-qa.md`

This artifact is currently approved and records the planning review for the first file-backed source, draft, version, and review-record workflow slice.

The current Sprint 9 planning artifact is:

- `planning/sprints/sprint-9-experience-assembly-and-visual-studio.planning-qa.md`

This artifact is currently approved and records the planning review for the first multi-experience assembly and visual-workflow slice.

The current Sprint 8 implementation artifact is:

- `implementation/sprints/sprint-8-source-to-unit-workflow.implementation-qa.md`

This artifact is currently approved and records the evidence-backed Sprint 8 implementation pass for the full source/unit lifecycle slice and the file-backed selected-release compatibility path.

The current Sprint 11 planning artifact is:

- `planning/sprints/sprint-11-observable-state-exporter-foundation.planning-qa.md`

This artifact is currently approved and records the planning review for the observable-state exporter boundary.

The current Sprint 12 planning artifact is:

- `planning/sprints/sprint-12-public-observatory-routes.planning-qa.md`

This artifact is currently approved and records the planning review for the public observatory route family.

The current Sprint 13 planning artifact is:

- `planning/sprints/sprint-13-maintainer-stewardship-and-governance.planning-qa.md`

This artifact is currently approved and records the planning review for the maintainer observability and governance layer.

The current Sprint 7 implementation artifact is:

- `implementation/sprints/sprint-7-agentic-orchestration.implementation-qa.md`

This artifact is currently approved and records the evidence-backed phase-2 bootstrap for planning artifacts, SQLite orchestration, and tracked CLI operations.

The current Sprint 11 implementation artifact is:

- `implementation/sprints/sprint-11-observable-state-exporter-foundation.implementation-qa.md`

This artifact is currently approved and records the evidence-backed observable-state exporter foundation, observatory validation/export commands, and generated bundle proof.

The current Sprint 4 implementation artifact is:

- `implementation/sprints/sprint-4-page-recipes.implementation-qa.md`

This artifact is currently approved and records the evidence-backed Sprint 4 recipe-validator and exemplar-route implementation pass.

The current Sprint 5 implementation artifact is:

- `implementation/sprints/sprint-5-static-export.implementation-qa.md`

This artifact is currently approved and records the evidence-backed Sprint 5 selected-release static-export and Pages-hardening implementation pass.

The current Sprint 6 implementation artifact is:

- `implementation/sprints/sprint-6-quality-gates.implementation-qa.md`

This artifact is currently approved and records the evidence-backed Sprint 6 accessibility, baseline-proof, and maintainer-verification implementation pass.

The current release QA artifact is:

- `releases/phase-1-baseline--phase-1-baseline-release.release-qa.md`

This artifact is currently approved and records the release-validation pass used to publish the current phase-1 baseline release in both root-path and repository base-path modes.

The current Sprint 2 implementation artifact is:

- `implementation/sprints/sprint-2-layout-primitives.implementation-qa.md`

This artifact is currently approved and records the evidence-backed Sprint 2 layout implementation pass.

The current Sprint 3 implementation artifact is:

- `implementation/sprints/sprint-3-educational-primitives.implementation-qa.md`

This artifact is currently approved and records the evidence-backed Sprint 3 pedagogical primitive and unit-renderer implementation pass.

All current implementation artifacts now include evidence for root-path validation and GitHub Pages-style base-path validation.

## Naming rule

Use the naming conventions defined in:

- `docs/_specs/educational-design-system/planning-qa-spec.md`

Start from the matching file under `templates/` when creating a new QA artifact.

## Maintenance rule

Do not store superseded planning or implementation QA in random project folders.

If a QA artifact is replaced, either:

- update its status to `superseded`, or
- create a newer file that clearly supersedes it

Move only clearly superseded artifacts into `_archive/`.

Do not archive approved baseline artifacts just because they are old. Keep them in the active path if they still serve as the current provenance chain for the published baseline, the executable scaffold, or the latest approved plan in a category.

The QA trail should stay understandable to another maintainer or LLM without reconstructing history from chat logs.

## Lighthouse rule

When Lighthouse is used as evidence, run it against the exported site artifact and record the result in the relevant implementation or release QA file.
