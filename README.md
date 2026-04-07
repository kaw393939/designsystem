# Educational Design System

## Purpose

This repository defines a documentation-first educational design system and publishing workflow.

The intended product is a static-first educational site system built from reusable research-driven content units, approved visuals, experience configs, release manifests, explicit planning artifacts for agentic content development, and a future public observability layer. The repo now has a published phase-1 baseline release, an active phase-2 orchestration bootstrap, and locked phase-3 observability planning with detailed sprint briefs, but the broader multi-experience publishing system is still early in its implementation stage.

If you are an LLM entering this repository for the first time, treat this file as the entrypoint and process contract.

## Current repository state

As of 2026-04-05, this repository contains:

- active architecture and workflow specs
- active sprint briefs
- active QA structure with approved planning, implementation, and release artifacts
- a committed package manifest and installable dependency graph
- a Next.js static-export app with overview, process, status, token, layout-guide, primitives-guide, and example routes
- a Sprint 1 token implementation with a dedicated `/tokens` documentation route
- a Sprint 2 shared shell and layout primitive implementation with a dedicated `/layouts` guide and proof pages under `/examples/`
- a Sprint 3 pedagogical primitive implementation with a dedicated `/primitives` guide and unit-driven concept, assignment, and reading-map examples
- a Sprint 4 typed page-recipe validator with a dedicated `/recipes` guide and dedicated concept and lesson exemplar routes
- a Sprint 5 checked-in experience and release selection path that drives metadata, primary navigation, sitemap scope, export builds, and QA route coverage
- a Sprint 6 accessibility and baseline-proof layer with automated route audits, keyboard-focus fixes, and a documented maintainer verification routine
- a published `phase-1-baseline-release` manifest backed by approved release QA
- a repo-wide default selected experience of `identity-portfolio-system` on `identity-portfolio-system-proof-release`, so plain local dev and build commands open the identity course site unless explicit env overrides are provided
- an active phase-2 plan, orchestration spec, and tested SQLite-backed local orchestration bootstrap
- an approved Sprint 8 source-to-unit workflow brief and planning QA for the first file-backed authoring lifecycle slice
- an approved Sprint 8 implementation QA artifact covering the completed source-to-unit lifecycle slice and the file-backed release compatibility path
- an approved Sprint 9 experience-assembly and visual-studio brief plus planning QA for the next phase-2 implementation target
- a checked-in Sprint 8 planning chain under `content/` with a registered source, experience north star, module brief, unit brief, working draft, immutable unit version, and append-only review record example
- a completed Sprint 8 CLI slice for `site source register`, `site source list`, `site unit start`, `site unit show`, `site unit freeze`, `site unit request-review`, `site unit review`, `site unit revise`, and `site unit approve`
- selected-release validation and route-level unit resolution that now accept explicit file-backed `unitId@version` references alongside the current fixture-backed baseline
- an active phase-3 plan and observable-state spec for a future public observatory layer
- approved phase-3 sprint briefs and planning QA for the observability exporter, public observatory routes, and maintainer governance sequence
- an implemented Sprint 11 observable-state exporter foundation with typed bundle generation, observatory validation/export commands, and generated local bundles under `.site/observable-state/<visibility>/`
- a committed Lighthouse CI configuration and runnable QA scripts
- GitHub Actions workflows for automated quality checks and Pages deployment
- root-path and GitHub Pages-style base-path QA coverage
- research notes that inform the educational system

As of 2026-04-05, this repository does not yet contain:

- a fully file-backed multi-experience release library beyond the published phase-1 selected-build proof and the new Sprint 8 compatibility path for explicit file-backed unit references
- multi-experience production content assembled from the new phase-2 planning artifacts
- the phase-2 visual draft/version workflow and experience-assembly layer planned for Sprint 9
- the public observatory routes or maintainer observability UI planned for the later phase-3 sprints

Do not pretend those implementation pieces already exist. If they do not exist in the filesystem, they are not done.

## What this site is supposed to become

The system should produce calm, legible, static educational sites that help learners move through orientation, explanation, evidence, reflection, and next steps.

The architecture is configuration-driven:

1. source research and long-form source documents
2. structured page-level units with ordered `blocks[]`
3. reviewable visual artifacts
4. experience configs that assemble approved units
5. release manifests that select exact approved versions
6. static export and GitHub Pages deployment

## Project map

The top-level workspace is organized by function.

- `app/`: Next.js routes and route-local composition
- `components/`: reusable UI and editorial primitives
- `content/`: file-backed source, draft, unit, review, experience, and release artifacts
- `docs/`: specs, QA, research, synthesis, and UX reference material
- `lib/`: workflow, content, and publishing logic
- `public/`: static assets for the published site
- `scripts/`: CLI entrypoints and maintenance scripts
- `tests/`: unit and browser test coverage

For folder-level navigation, use:

1. `docs/README.md`
2. `content/README.md`
3. `docs/_specs/README.md`
4. `docs/_qa/README.md`

## Read these files in order

1. `docs/_specs/README.md`
2. `docs/_specs/educational-design-system/spec.md`
3. `docs/_specs/educational-design-system/operating-runbook.md`
4. `docs/_specs/educational-design-system/phase-2-sprint-plan.md`
5. `docs/_specs/educational-design-system/phase-3-sprint-plan.md`
6. `docs/_specs/educational-design-system/planning-qa-spec.md`
7. the relevant domain spec or sprint brief under `docs/_specs/educational-design-system/`
8. the latest relevant QA artifact under `docs/_qa/`

If you skip this order, you are likely to act on stale or partial context.

## Required operating loop

Every meaningful work item follows this loop:

1. update the active spec or sprint doc
2. create or update the planning QA artifact
3. resolve planning findings until approved
4. implement the work
5. create or update the implementation QA artifact
6. resolve implementation findings until approved
7. if the work is releasable, create or update release QA
8. publish only after release validation passes

Do not use chat history as the system of record. The files are the system of record.

## Documents that must be kept current

When scope or architecture changes, update:

- `docs/_specs/README.md`
- the relevant active spec under `docs/_specs/educational-design-system/`

When sprint planning changes, update:

- the relevant sprint brief under `docs/_specs/educational-design-system/sprints/`
- the relevant planning QA artifact under `docs/_qa/planning/`

When implementation work changes, update:

- the relevant implementation QA artifact under `docs/_qa/implementation/`
- any active spec that is now inaccurate

When release readiness changes, update:

- the relevant release QA artifact under `docs/_qa/releases/`
- any release-facing build or deployment documentation

When the project status changes materially, update this README so an external LLM can still tell what is done and not done.

## QA system

QA artifacts live under `docs/_qa/`.

Use these paths:

- `docs/_qa/planning/specs/`
- `docs/_qa/planning/sprints/`
- `docs/_qa/implementation/sprints/`
- `docs/_qa/releases/`
- `docs/_qa/templates/`

If a work item has no QA artifact, assume it is not approved.

The current phase-1 foundation spec planning artifact is:

- `docs/_qa/planning/specs/phase-1-foundation-spec.qa.md`

That artifact is approved and records the planning review for the active foundation spec set.

The current phase-2 plan spec artifact is:

- `docs/_qa/planning/specs/phase-2-sprint-plan.qa.md`

That artifact is approved and records the planning review for the active phase-2 plan.

The current phase-3 plan spec artifact is:

- `docs/_qa/planning/specs/phase-3-sprint-plan.qa.md`

That artifact is approved and records the planning review for the active phase-3 plan.

The current agentic orchestration spec artifact is:

- `docs/_qa/planning/specs/agentic-orchestration.qa.md`

That artifact is approved and records the planning review for the phase-2 planning-artifact and SQLite-orchestration model.

The current observable-state spec artifact is:

- `docs/_qa/planning/specs/observable-state.qa.md`

That artifact is approved and records the planning review for the public observatory, visibility-tier, and exported observable-state model.

The current Sprint 1 planning artifact is:

- `docs/_qa/planning/sprints/sprint-1-theme-tokens.planning-qa.md`

That artifact is approved and records the planning review for the token and visual-baseline layer.

The current implementation artifact for this scaffold is:

- `docs/_qa/implementation/sprints/foundation-app-scaffold.implementation-qa.md`

That artifact is the current evidence-backed implementation QA record for the executable baseline.

The current Sprint 1 implementation artifact is:

- `docs/_qa/implementation/sprints/sprint-1-theme-tokens.implementation-qa.md`

That artifact is now approved and records the evidence-backed Sprint 1 token implementation pass.

The current Sprint 2 planning artifact is:

- `docs/_qa/planning/sprints/sprint-2-layout-primitives.planning-qa.md`

That artifact is approved and records the planning review for the shared shell and layout primitive layer.

The current Sprint 3 planning artifact is:

- `docs/_qa/planning/sprints/sprint-3-educational-primitives.planning-qa.md`

That artifact is approved and records the planning review for the pedagogical primitive layer and unit-driven render contracts.

The current Sprint 4 planning artifact is:

- `docs/_qa/planning/sprints/sprint-4-page-recipes.planning-qa.md`

That artifact is approved and records the planning review for route-level exemplar pages, recipe-proof assembly, and recipe-conformance validation.

The current Sprint 5 planning artifact is:

- `docs/_qa/planning/sprints/sprint-5-static-export.planning-qa.md`

That artifact is approved and records the planning review for static export hardening, base-path validation, and the first explicit release-selected export path.

The current Sprint 6 planning artifact is:

- `docs/_qa/planning/sprints/sprint-6-quality-gates.planning-qa.md`

That artifact is approved and records the planning review for baseline proof, accessibility follow-up, dual-mode exported-site verification, and final quality-gate documentation.

The current Sprint 7 planning artifact is:

- `docs/_qa/planning/sprints/sprint-7-agentic-orchestration.planning-qa.md`

That artifact is approved and records the planning review for the phase-2 orchestration bootstrap.

The current Sprint 8 planning artifact is:

- `docs/_qa/planning/sprints/sprint-8-source-to-unit-workflow.planning-qa.md`

That artifact is approved and records the planning review for the first file-backed source, draft, version, and review-record workflow slice.

The current Sprint 9 planning artifact is:

- `docs/_qa/planning/sprints/sprint-9-experience-assembly-and-visual-studio.planning-qa.md`

That artifact is approved and records the planning review for the first multi-experience assembly and visual-workflow slice.

The current Sprint 8 implementation artifact is:

- `docs/_qa/implementation/sprints/sprint-8-source-to-unit-workflow.implementation-qa.md`

That artifact is approved and records the evidence-backed implementation pass for the full Sprint 8 unit lifecycle slice and the file-backed selected-release compatibility path.

The current Sprint 11 planning artifact is:

- `docs/_qa/planning/sprints/sprint-11-observable-state-exporter-foundation.planning-qa.md`

That artifact is approved and records the planning review for the observable-state exporter boundary.

The current Sprint 12 planning artifact is:

- `docs/_qa/planning/sprints/sprint-12-public-observatory-routes.planning-qa.md`

That artifact is approved and records the planning review for the public observatory route family.

The current Sprint 13 planning artifact is:

- `docs/_qa/planning/sprints/sprint-13-maintainer-stewardship-and-governance.planning-qa.md`

That artifact is approved and records the planning review for the maintainer observability and governance layer.

The current Sprint 7 implementation artifact is:

- `docs/_qa/implementation/sprints/sprint-7-agentic-orchestration.implementation-qa.md`

That artifact is approved and records the evidence-backed phase-2 bootstrap for planning artifacts, SQLite orchestration, and tracked CLI operations.

The current Sprint 11 implementation artifact is:

- `docs/_qa/implementation/sprints/sprint-11-observable-state-exporter-foundation.implementation-qa.md`

That artifact is approved and records the evidence-backed observable-state exporter foundation, observatory validation/export commands, and generated bundle proof.

The current Sprint 4 implementation artifact is:

- `docs/_qa/implementation/sprints/sprint-4-page-recipes.implementation-qa.md`

That artifact is approved and records the evidence-backed Sprint 4 recipe-validator and exemplar-route implementation pass.

The current Sprint 5 implementation artifact is:

- `docs/_qa/implementation/sprints/sprint-5-static-export.implementation-qa.md`

That artifact is approved and records the evidence-backed Sprint 5 selected-release static-export and Pages-hardening implementation pass.

The current Sprint 6 implementation artifact is:

- `docs/_qa/implementation/sprints/sprint-6-quality-gates.implementation-qa.md`

That artifact is approved and records the evidence-backed Sprint 6 accessibility, baseline-proof, and maintainer-verification implementation pass.

The current release QA artifact is:

- `docs/_qa/releases/phase-1-baseline--phase-1-baseline-release.release-qa.md`

That artifact is approved and records the release-validation pass used to publish the current baseline release in both root-path and repository base-path modes.

The current Sprint 2 implementation artifact is:

- `docs/_qa/implementation/sprints/sprint-2-layout-primitives.implementation-qa.md`

That artifact is approved and records the evidence-backed Sprint 2 layout implementation pass.

The current Sprint 3 implementation artifact is:

- `docs/_qa/implementation/sprints/sprint-3-educational-primitives.implementation-qa.md`

That artifact is approved and records the evidence-backed Sprint 3 pedagogical primitive and unit-renderer implementation pass.

Local secrets must live in `.env.local` or another ignored env file. Do not commit `.env` files containing real credentials.

## Deterministic Lighthouse rule

Lighthouse is part of the required QA system, but it must be used in a deterministic way.

The rule is:

1. run Lighthouse against the exported static site, not the dev server
2. use a committed Lighthouse CI config once the app scaffold exists
3. use the same categories and thresholds in local and CI runs
4. gate release readiness on stable categories first
5. record the result in the implementation or release QA artifact

For phase 1, the gating categories should be:

- accessibility
- best-practices
- seo

Performance may be recorded as a baseline, but it should not be the first hard gate unless the build environment and budgets are stabilized enough to avoid noisy failures.

## Current completion snapshot

Completed:

- foundation architecture spec set
- sprint plan and sprint briefs
- workflow and publishing-model specs
- QA directory structure
- operating runbook and QA artifact rules
- first planning QA artifacts
- executable Next.js scaffold
- committed Lighthouse CI configuration and browser-test baseline
- validated typecheck, lint, unit test, browser test, and Lighthouse pass for the scaffold
- Sprint 1 semantic token system with color, type, spacing, radius, shadow, and motion roles
- token documentation and multi-page preview examples in the application itself
- GitHub Actions quality and Pages deployment workflows
- validated typecheck, lint, unit test, browser test, and Lighthouse pass after the Sprint 1 token and workflow changes
- validated the same browser and Lighthouse checks in GitHub Pages-style base-path mode
- Sprint 2 shared page shells and layout primitives
- `/layouts`, `/examples/module`, `/examples/lesson`, and `/examples/reading-map` proof routes assembled from the shared layout layer
- validated typecheck, lint, unit test, browser test, and Lighthouse pass after the Sprint 2 layout changes in both root-path and GitHub Pages-style base-path modes
- Sprint 3 educational primitives and normalized render-contract types
- `/primitives` guide route with concept, assignment, and reading-map units rendered from structured block payloads
- validated typecheck, lint, unit test, browser test, and Lighthouse pass after the Sprint 3 primitive and renderer changes in both root-path and GitHub Pages-style base-path modes
- Sprint 4 typed page-recipe validator and checked-in approved unit fixtures
- `/recipes` guide route plus dedicated concept and lesson exemplar pages assembled from checked-in approved unit inputs
- validated typecheck, lint, unit test, browser test, and Lighthouse pass after the Sprint 4 recipe changes in both root-path and GitHub Pages-style base-path modes
- Sprint 5 checked-in experience and release fixtures plus typed selected-release validation
- selected-release metadata, primary navigation, sitemap output, build selection, Lighthouse route scope, and CI validation wiring
- validated `site:validate`, typecheck, lint, unit test, browser test, and Lighthouse pass after the Sprint 5 export changes in both root-path and GitHub Pages-style base-path modes
- Sprint 6 accessibility smoke audits, keyboard-focus fixes, stronger shared contrast tokens, and documented maintainer verification routine
- validated `site:validate`, typecheck, lint, unit test, browser test, and Lighthouse pass after the Sprint 6 baseline-proof changes in both root-path and GitHub Pages-style base-path modes
- repository-wide Prettier normalization to satisfy the release format gate
- published `phase-1-baseline-release` after approved release QA
- phase-2 sprint plan and agentic orchestration spec
- formal planning artifacts for experience north stars, module briefs, unit briefs, visual briefs, and SQLite orchestration records
- Sprint 7 SQLite orchestration bootstrap with tracked validate/build operations and local lock enforcement
- Sprint 8 file-backed unit lifecycle commands for request-review, review, revise, and explicit approval gating
- Sprint 8 selected-release compatibility for explicit file-backed `unitId@version` references plus route-level selected-unit resolution on the existing primitives and recipe proof pages

Not completed:

- a fully file-backed multi-experience release library beyond the current selected-build proof and Sprint 8 compatibility path
- multi-experience content and releases assembled through the new phase-2 planning artifacts
- the phase-2 visual workflow and experience-assembly layer planned for Sprint 9
- a reusable publish pipeline for future release candidates beyond the current published baseline

## Behavioral rules for any LLM working here

1. Do not mark work done because a plan exists. Mark it done only when the required artifact exists and says it is approved.
2. Do not create new source-of-truth docs if an existing active doc can be updated instead.
3. Do not leave superseded planning docs in active paths.
4. Do not treat implementation QA as interchangeable with planning QA.
5. Do not publish or describe a release as ready without release QA and deterministic Lighthouse evidence against exported output.
6. When in doubt about status, prefer explicit file evidence over inference.

## Immediate next implementation direction

The next practical implementation step is Sprint 9: assemble the first new experiences from the phase-2 planning artifacts and add the visual draft/version workflow that those experiences need.
