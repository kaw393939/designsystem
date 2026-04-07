# Educational Design System Phase 1 Sprint Plan

## Purpose

This document breaks phase 1 into bounded implementation sprints with clear outputs and QA expectations.

The guiding rule is simple: each sprint should leave behind a durable artifact, verifiable behavior, and no ambiguity about what was actually completed.

Status note: all phase-1 sprint objectives are complete and the baseline release `phase-1-baseline-release` is now published. Keep this document as the authoritative record of phase-1 scope until a new phase plan supersedes it.

This sprint plan assumes the current active specs in `docs/_specs/educational-design-system/` are the governing artifacts.

## Phase-1 sprint sequence

| Sprint | Title                                 | Primary outcome                                         | Depends on |
| ------ | ------------------------------------- | ------------------------------------------------------- | ---------- |
| 0      | Repo analysis and abstraction map     | Spec set, content model, and abstraction decisions      | None       |
| 1      | Theme tokens and visual baseline      | Semantic design token system                            | 0          |
| 2      | Layout primitives and shell hardening | Reusable layout system                                  | 1          |
| 3      | Educational content primitives        | First-class pedagogical components and render contracts | 2          |
| 4      | Page recipes and exemplar pages       | Working recipe proof from unit configs                  | 3          |
| 5      | Static export and Pages hardening     | Deployment-safe application and release baseline        | 4          |
| 6      | QA, accessibility, and proof          | Documented quality gate and workflow baseline           | 5          |

## Cross-sprint rules

1. No sprint may introduce topic-specific wording into foundational primitives.
2. No sprint may weaken export safety in exchange for convenience.
3. No sprint is complete without explicit positive and negative verification.
4. Accessibility checks happen during the sprint, not as a separate clean-up phase.
5. Placeholder content should prove generalization beyond AI history.
6. Published content and visuals are immutable; changes create superseding versions.
7. Review and resolution steps must produce artifacts rather than overwrite history.
8. Charts and graphs should use deterministic specs when accuracy matters.
9. Phase-1 publishable units are page-level artifacts with ordered `blocks[]` arrays.
10. Append-only guarantees begin at the frozen-candidate boundary, not at every authoring keystroke.
11. Every sprint requires one planning QA artifact before implementation and one implementation QA artifact before closure.

## Sprint 0: Repo analysis and abstraction map

- Objective: classify the museum repo into keep, generalize, defer, and remove decisions while defining the page-level block schema and authoring workflow boundary for the new system.
- Deliverables: `spec.md`, `component-inventory.md`, `page-recipes.md`, `deployment.md`, `phase-1-sprint-plan.md`, `content-schema.md`, `workflow-state-machine.md`, `visual-asset-pipeline.md`, `cli-command-surface.md`.
- Validation: every major component family and technical subsystem is explicitly classified.
- Exit criteria: the design system has a named target architecture, a file-based publishing model, a page-level block schema, a clear working-draft boundary, and explicit phase-1 non-goals.

## Sprint 1: Theme tokens and visual baseline

- Objective: replace ad hoc visual decisions with semantic instructional tokens.
- Deliverables: token map, theme rules, documented state roles, contrast baseline, motion rules.
- Validation: lesson, overview, and reading pages can all be styled using the same token set.
- Exit criteria: typography, spacing, surfaces, and state styling are semantic and reusable.

## Sprint 2: Layout primitives and shell hardening

- Objective: create the shared shell and layout system for educational pages.
- Deliverables: page shell, lesson shell, prose container, editorial band, split layout, content grid, local nav, media block.
- Validation: at least three page shapes can be composed without custom rescue wrappers.
- Exit criteria: mobile and desktop layouts are stable, readable, and topic-neutral.

## Sprint 3: Educational content primitives

- Objective: implement the core pedagogical components and the contracts that let unit configs render through them.
- Deliverables: `LessonHero`, `SectionBlock`, `WhyItMatters`, `ConceptGrid`, `SummaryGrid`, `ComparisonGrid`, `SequenceTimeline`, `WorkedExample`, `EditorialAside`, `PullInsight`, `VisualBreak`, `ReflectionPrompt`, `NextStepBlock`, `SourceAnchorGrid`, optional `GlossaryBlock`, plus loader and mapping contracts for unit-driven rendering.
- Validation: each component has a pedagogical purpose, a clean contract, and at least one unit test.
- Exit criteria: components render properly with non-AI-history placeholder content and can be populated from structured unit inputs.

## Sprint 4: Page recipes and exemplar pages

- Objective: prove the design system as a page grammar rather than a loose component set.
- Deliverables: at least two exemplar pages assembled from unit configs plus recipe documentation updates.
- Validation: lesson and overview or concept pages scan clearly and feel like a coherent learning flow.
- Exit criteria: recipes are demonstrably reusable, config-driven, and not merely theoretical.

## Sprint 5: Static export and GitHub Pages hardening

- Objective: make the system safe for static deployment and release-based publishing.
- Deliverables: export-safe routing, asset-path handling, base-path support, deployment workflow notes, CI updates, release-manifest wiring, and initial CLI command integration plan.
- Validation: build output works under a repository base path and all core routes resolve from `out/`.
- Exit criteria: the site is deployable to GitHub Pages without a Node server and release builds can be reproduced from approved manifests.

## Sprint 6: QA, accessibility, and baseline proof

- Objective: lock the baseline with measurable quality gates.
- Deliverables: unit coverage, browser smoke coverage, accessibility checks, Lighthouse results, CI documentation, and workflow-validation checks for release artifacts.
- Validation: required components and exemplar pages are covered by automated checks.
- Exit criteria: maintainers can trust the baseline as a reusable starter and publishing workflow foundation, not a prototype demo.

## Test matrix expectations by sprint

| Sprint | Positive tests                                 | Negative tests                                  | Edge cases                                     | Accessibility                         | Export checks                   |
| ------ | ---------------------------------------------- | ----------------------------------------------- | ---------------------------------------------- | ------------------------------------- | ------------------------------- |
| 0      | Classification completeness                    | Missing family detection                        | Ambiguous component mapping and schema overlap | N/A                                   | N/A                             |
| 1      | Token application across page types            | Missing token fallback                          | High-contrast and reduced-motion behavior      | Contrast audit                        | Build after token refactor      |
| 2      | Responsive shells and grids                    | Broken stack behavior                           | Long headings, dense cards, empty side content | Landmark and heading checks           | Exported layout sanity          |
| 3      | Component rendering from unit contracts        | Missing prop and empty-state behavior           | Very short and very long content               | Semantic structure and keyboard focus | Static rendering sanity         |
| 4      | Recipe composition from approved units         | Wrong section order or missing required section | Sparse and dense content variants              | Page-level heading flow               | Route and navigation validation |
| 5      | Base-path builds and release-manifest assembly | Broken asset and link paths                     | Nested routes and remote media                 | Metadata checks                       | Full export verification        |
| 6      | End-to-end baseline confidence                 | Regression detection and workflow drift         | CI-environment differences                     | Audit follow-up                       | Deploy artifact validation      |

## Definition of done for phase 1

Phase 1 is done when:

1. The spec set is complete and internally consistent.
2. The design token and layout system are reusable.
3. The educational primitives support the documented recipes.
4. Two exemplar pages prove the recipe grammar.
5. Approved units and visuals can be assembled into a reproducible release.
6. The project builds and deploys statically.
7. QA gates are documented and runnable.

Current status: satisfied by the published `phase-1-baseline-release` baseline. The next round of work should start by creating a new phase plan rather than extending this completed sprint set in place.
