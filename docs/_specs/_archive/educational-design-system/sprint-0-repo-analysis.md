# Sprint 0: Repo Analysis and Abstraction Map

## Goal

Read the museum repo as a working instructional system and convert that reading into explicit abstraction decisions.

## Why this sprint exists

Phase 1 should not start by inventing a new component library in the abstract. The reference repo already contains proven patterns for instructional sequencing, editorial pacing, testing, and export discipline. Sprint 0 exists to preserve those strengths while stripping away topic lock-in.

## Inputs

- Active source-of-truth spec in `docs/_specs/educational-design-system/spec.md`
- Research notes in `docs/_research/identity.md` and `docs/_research/renesaince.md`
- Reference repo at `/Users/kwilliams/Desktop/nextjs_ai_orchestration_spec_sprint_process`

## Scope

1. Audit component families.
2. Audit layout and shell patterns.
3. Audit token and global-style assumptions.
4. Audit tests, CI, and export behavior.
5. Classify each major family as keep, generalize, defer, or remove.
6. Define the configuration-driven content model and workflow doctrine.
7. Produce the initial spec set.

## Deliverables

- `spec.md`
- `component-inventory.md`
- `page-recipes.md`
- `deployment.md`
- `phase-1-sprint-plan.md`
- `content-schema.md`
- `workflow-state-machine.md`
- `visual-asset-pipeline.md`
- `cli-command-surface.md`

## Work checklist

1. List all relevant content component families.
2. List all relevant shell and UI component families.
3. Record the static export settings and GitHub Pages workflow assumptions.
4. Record the existing test coverage shape.
5. Translate topic-bound names into educational-system names.
6. Define append-only versioning and review artifacts.
7. Capture explicit non-goals.

## Positive tests

- Every major component family has a classification decision.
- Every major technical subsystem has a note in the spec set.
- The new naming system reflects pedagogical function rather than museum history.
- The publishing model is explicit enough to support multiple experiences from shared sources.

## Negative tests

- No foundational document depends on AI-history content to make sense.
- No component family is silently omitted because it did not fit the preferred architecture.
- The sprint does not jump ahead into implementation details that belong in later sprints.
- The workflow model does not assume mutable page editing as its primary authoring path.

## Edge-case checks

- Home-page-specific patterns are correctly treated as recipe fragments rather than universal primitives.
- Optional components such as math and profile grids are explicitly deferred rather than ambiguously included.
- Charts and graphs are correctly separated from generative illustration workflows.

## Accessibility checks

- Audit whether the new component names preserve semantic intent, especially for headings, sections, asides, and source blocks.

## Export and deploy checks

- Confirm static export settings, base-path handling, and CI gates in the reference repo.

## Out of scope

- Component implementation
- visual redesign
- content writing for live pages

## Exit criteria

Sprint 0 is done when the spec set is complete enough that Sprint 1 can begin without re-debating the architecture or the publishing model.
