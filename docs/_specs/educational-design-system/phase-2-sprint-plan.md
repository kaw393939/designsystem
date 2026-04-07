# Educational Design System Phase 2 Sprint Plan

## Purpose

This document defines phase 2 of the educational design system after the published phase-1 baseline.

Phase 2 turns the current static publishing baseline into an agentic educational-site studio that can transform research documents into curated, instructional, visual-rich learning experiences through durable local workflows.

## Status

- Status: active phase-2 planning source of truth
- Depends on: published `phase-1-baseline-release`
- Relationship to phase 1: phase 1 remains the foundation; phase 2 extends it with planning artifacts, orchestration, and multi-experience production workflow

## Phase-2 goal

Build a durable local authoring and release system that can:

1. interpret source documents through instructional-design and museum-curation lenses
2. materialize those interpretations into explicit planning artifacts
3. generate and review page-level units plus first-class visuals
4. assemble multiple experiences from shared research inputs
5. publish reproducible releases without bypassing the existing QA and static-export rules

## Primary outcomes

- formal experience-planning artifacts such as north stars, module briefs, unit briefs, and visual briefs
- a local SQLite orchestration ledger for tracked operations, local locks, and failure recovery
- a broader CLI surface that can support source intake, planning, unit lifecycle work, visual lifecycle work, and release management
- structured lineage and run-event records that can later feed public-safe observable-state exports without turning SQLite into publishing truth
- multi-experience support for projects such as the identity portfolio system and the AI-and-Renaissance interpretation site
- release automation that remains file-first, static-export-safe, and reviewable through Git

## Phase-2 sprint sequence

| Sprint | Title                                 | Primary outcome                                                                | Depends on |
| ------ | ------------------------------------- | ------------------------------------------------------------------------------ | ---------- |
| 7      | Agentic orchestration bootstrap       | Phase-2 plan, planning artifacts, SQLite control plane, tracked CLI ops        | Phase 1    |
| 8      | Source-to-unit workflow               | File-based drafts, versions, review records, and source extraction flow        | 7          |
| 9      | Experience assembly and visual studio | Multi-experience assembly plus illustration, diagram, and chart flow           | 8          |
| 10     | Agentic review and release automation | Review-role orchestration, release diffing, promotion, and structured evidence | 9          |

## Cross-phase rules

1. Publishable source of truth remains in files and Git; SQLite is a local orchestration ledger, not the canonical publishing database.
2. Every experience begins with an `ExperienceNorthStar` artifact before unit drafting begins.
3. Every module or gallery sequence begins with a `ModuleBrief`.
4. Every page-level unit requires a `UnitBrief` before a `UnitDraft` exists.
5. Every non-trivial image, diagram, chart, or graph requires a `VisualBrief` before a visual draft exists.
6. Every experience must be reviewed through both an instructional-design lens and a museum-curation lens.
7. Factual graphics must remain deterministic; generative raster output is allowed only for illustration-class visuals.
8. Static export, selected-release validation, and deterministic Lighthouse remain mandatory release gates.
9. Agent handoffs must materialize as explicit artifacts, not only in chat or logs.
10. Local orchestration failures must leave behind enough durable state to inspect, retry, or supersede a run.
11. Workflow artifacts and run events should preserve stable IDs and redactable structured details so future observable-state pages never need to scrape terminal prose.

## Sprint 7: Agentic orchestration bootstrap

- Objective: formalize phase 2, introduce planning artifact types for experience design, and bootstrap a local SQLite orchestration ledger that records tracked CLI runs and local locks.
- Deliverables: `phase-2-sprint-plan.md`, `agentic-orchestration.md`, `sprint-7-agentic-orchestration.md`, a SQLite-backed orchestration module, tracked `site validate` and `site build` operations, local orchestration commands, tests, and updated indexes.
- Validation: the local orchestration database initializes cleanly, validate/build operations are recorded durably, local lock contention is enforced, and the published phase-1 baseline still validates.
- Exit criteria: the repo has an approved phase-2 plan, approved planning QA for sprint 7, and a working local orchestration bootstrap that does not change the published site’s runtime model.

## Sprint 8: Source-to-unit workflow

- Objective: move from checked-in fixture proof to a real file-based authoring workflow for sources, drafts, versions, and review records.
- Deliverables: source registration flow, unit draft/version lifecycle commands, review-record generation, and migration path from the current fixture model.
- Validation: source-to-unit lineage is explicit, immutable snapshots remain immutable, and release assembly rejects working drafts.
- Exit criteria: a new site can move from source document to approved unit versions through the CLI without hidden manual steps.

## Sprint 9: Experience assembly and visual studio

- Objective: support multiple experience builds from shared research while making visuals first-class planning and release artifacts.
- Deliverables: experience north stars and briefs for at least two distinct site directions, experience-specific navigation and unit selection, and illustration/diagram/chart workflows aligned to the visual pipeline.
- Validation: two different experiences can be assembled from shared inputs without forking the whole content library, and factual graphics remain deterministic.
- Exit criteria: the identity portfolio site and the AI-and-Renaissance site can both be expressed through the shared system with different experience-level planning artifacts.

## Sprint 10: Agentic review and release automation

- Objective: formalize review-role orchestration, release diffing, and release promotion without weakening the deterministic QA model or pulling phase-3 observability work forward.
- Deliverables: release command workflows with explicit release ids, append-only release review evidence, checked-in release QA gating, richer run history, explicit release diff artifacts, and promotion helpers that still honor explicit QA approval.
- Validation: failed release operations are inspectable and retryable, release diffs are visible, release approval depends on an approved release QA artifact plus explicit review evidence, and the resulting run and diff records stay structured enough for phase-3 observable-state export later.
- Exit criteria: the system can run a durable, multi-step local publish workflow, compare one release to another, promote a reviewed release explicitly, and explain exactly what happened after success or failure without requiring live observability infrastructure.

## Definition of done for phase 2

Phase 2 is done when:

1. any serious site project begins with explicit experience-planning artifacts
2. local workflow operations are durable, inspectable, and retryable through SQLite-backed orchestration
3. source documents can move through draft, freeze, review, approve, and release without hidden manual state
4. illustrations, diagrams, charts, and graphs are first-class artifacts in planning and release assembly
5. multiple experiences can be assembled from shared content and visual libraries
6. publishable releases remain static, deterministic, and QA-gated
7. workflow records and artifact lineage are structured enough to support future observable-state export without retrofitting the phase-2 model
