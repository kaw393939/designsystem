# Agentic Orchestration Spec

## Purpose

Define the planning artifacts, agent roles, handoff model, and local SQLite orchestration layer for phase 2.

This spec makes the educational design system capable of producing many serious sites from shared research while preserving file-based publishing truth, static-export safety, and durable local workflow state.

## Core doctrine

1. Files and Git remain the canonical publishing truth.
2. SQLite is a local orchestration ledger and control plane, not the published content store.
3. Every experience starts with an explicit north-star artifact.
4. Every page is reviewed through both instructional-design and museum-curation lenses.
5. Visuals are first-class planning and release artifacts.
6. Agent handoffs must materialize as explicit artifacts or operational records.
7. Failure handling must be inspectable and resumable.

## Agent roles

The system should support specialized agents with narrow jobs.

Recommended phase-2 roles:

- `ResearchIngestor`: parses source documents and extracts claims, themes, evidence, and likely module clusters
- `InstructionalDesigner`: defines learning outcomes, misconceptions, scaffolds, assessments, and transfer goals
- `MuseumCurator`: defines thesis, gallery sequence, evidence hierarchy, pacing, and interpretive flow
- `ExperienceArchitect`: merges the instructional and curatorial views into one experience structure
- `ModulePlanner`: turns the experience structure into module or gallery sequences
- `UnitPlanner`: creates page-level briefs for lesson, concept, assignment, timeline, and reading-map units
- `VisualDirector`: chooses where a page needs illustration, diagram, chart, graph, photo, or timeline support
- `IllustrationAgent`: creates editorial image concepts and prompts for illustration-class visuals
- `DiagramAgent`: creates Mermaid, SVG, or structured relationship diagrams
- `DataVizAgent`: creates deterministic chart and graph specs plus textual summaries
- `MediaCurator`: selects or specifies provenance-safe photos and reference media
- `UnitAuthor`: writes unit drafts from approved briefs
- `EvidenceCritic`: checks factual support and source traceability
- `AccessibilityCritic`: checks headings, alt text, long descriptions, tables, and mobile legibility
- `EditorialCritic`: checks pacing, density, tone, and repetition
- `ReleaseManager`: assembles releases, validates readiness, and coordinates publish operations

## Planning artifact types

Phase 2 adds planning artifacts that exist before unit drafts and release manifests. These are not direct production inputs for the static site; they are authoring and orchestration inputs.

## Common observability-forward metadata

Phase 2 should preserve a minimum set of fields that phase 3 can later export safely.

Recommended optional metadata for planning artifacts and later workflow artifacts:

- `visibility`: `public`, `maintainer`, or `private-local`
- `lineageRefs`: upstream or downstream artifact IDs needed to reconstruct relationships
- `observatorySummary`: a short public-safe explanation of the artifact's job or current state

Default rule:

- if `visibility` is omitted, treat the artifact as `private-local` until a later workflow step widens it explicitly

### `ExperienceNorthStar`

Purpose:

- define the governing thesis, audience, transformation, and visual direction for one site experience

Required fields:

- `schema`
- `id`
- `title`
- `audience`
- `learnerTransformation`
- `curatorialThesis`
- `siteMode`
- `sourceRefs`
- `primaryRecipes`
- `requiredVisualClasses`

Recommended optional fields:

- `description`
- `tone`
- `evaluationCriteria`
- `releaseIntent`
- `nonGoals`

### `ModuleBrief`

Purpose:

- define one module, gallery room, or narrative section inside an experience

Required fields:

- `schema`
- `id`
- `experienceId`
- `title`
- `job`
- `sequencePosition`
- `learningOutcomes`
- `curatorialQuestions`
- `candidateUnits`

Recommended optional fields:

- `entryConditions`
- `exitConditions`
- `notes`
- `sourceRefs`

### `UnitBrief`

Purpose:

- define the planning contract for one page-level unit before a draft is written

Required fields:

- `schema`
- `id`
- `experienceId`
- `moduleId`
- `recipe`
- `title`
- `dominantJob`
- `learningObjective`
- `curatorialJob`
- `targetAudience`
- `sourceRefs`

Recommended optional fields:

- `misconceptions`
- `requiredEvidence`
- `requiredVisuals`
- `assessmentIdea`
- `nextStepIntent`
- `notes`

### `VisualBrief`

Purpose:

- define the job, class, and evidence expectations for a visual before a draft exists

Required fields:

- `schema`
- `id`
- `experienceId`
- `forUnit`
- `kind`
- `visualClass`
- `intent`
- `mustShow`
- `accessibilityNeeds`

Recommended optional fields:

- `dataSource`
- `sourceRefs`
- `styleProfile`
- `provenanceRequirements`
- `captionDirection`
- `longDescriptionDirection`

### `OrchestrationRun`

Purpose:

- record one durable local workflow operation such as validation, build, assembly, or publish

Required fields:

- `id`
- `operation`
- `subject`
- `status`
- `startedAt`

Recommended optional fields:

- `experienceId`
- `releaseId`
- `commandLine`
- `details`
- `publicSummary`
- `visibility`
- `finishedAt`
- `errorMessage`

### `OrchestrationLock`

Purpose:

- prevent overlapping local operations that would produce unsafe state transitions

Required fields:

- `id`
- `lockKey`
- `ownerRunId`
- `scope`
- `acquiredAt`
- `expiresAt`

Recommended optional fields:

- `metadata`
- `releasedAt`

## Example planning artifacts

### Example `ExperienceNorthStar`

```yaml
schema: experience-north-star/v1
id: identity-portfolio-system
title: Build a Portfolio That Turns Identity Into Opportunity
audience:
  - students
  - early-career builders
learnerTransformation: Learners leave with a coherent public identity, proof strategy, and portfolio publishing plan.
curatorialThesis: Identity, design, psychology, and proof-of-work form one legible public signal system.
siteMode: studio
sourceRefs:
  - docs/_research/identity.md
primaryRecipes:
  - learning-homepage
  - module-overview
  - lesson-page
  - concept-explainer
  - assignment-project
requiredVisualClasses:
  - diagram
  - illustration
  - comparison-table
```

### Example `UnitBrief`

```yaml
schema: unit-brief/v1
id: choose-primary-archetype
experienceId: identity-portfolio-system
moduleId: archetype-and-identity
recipe: concept-explainer
title: Choose a Primary Archetype Without Losing Complexity
dominantJob: Help the learner commit to a primary archetype and understand controlled secondary traits.
learningObjective: Explain why one primary archetype creates coherence in a portfolio system.
curatorialJob: Frame archetype choice as a legibility and trust decision rather than a personality quiz.
targetAudience:
  - students
sourceRefs:
  - docs/_research/identity.md
misconceptions:
  - Strong brands must blend many archetypes equally.
requiredEvidence:
  - comparison of primary vs. uncontrolled mixed signals
requiredVisuals:
  - archetype-system diagram
assessmentIdea: Rewrite a portfolio hero with one dominant archetype.
```

### Example `VisualBrief`

```yaml
schema: visual-brief/v1
id: print-to-ai-timeline-graphic
experienceId: ai-second-renaissance
forUnit: print-to-ai-knowledge-shift
kind: timeline-diagram
visualClass: diagram
intent: Show the analogy between the printing press and AI as a change in the economics of knowledge and skill production.
mustShow:
  - print era shift
  - institutional consequence
  - ai era shift
  - educational consequence
accessibilityNeeds:
  - short alt text
  - long description
  - mobile-safe labels
sourceRefs:
  - docs/_research/renesaince.md
```

## Recommended storage model

```text
content/
  plans/
    experiences/
      identity-portfolio-system.yml
      ai-second-renaissance.yml
    modules/
      archetype-and-identity.yml
      print-to-ai-knowledge-shift.yml
  briefs/
    units/
      choose-primary-archetype.yml
      print-to-ai-knowledge-shift.yml
    visuals/
      archetype-signal-map.yml
      print-to-ai-timeline-graphic.yml
  drafts/
    units/
    visuals/
  units/
  visuals/
  reviews/
  experiences/
  releases/

.site/
  orchestration.sqlite
```

Production builds must ignore `content/plans/` and `content/briefs/` unless a future internal planning UI explicitly renders them.

## SQLite orchestration model

The local SQLite database exists to track workflow operations, failures, and locks without replacing file-based truth.

### Minimum tables

#### `operation_runs`

Use for:

- validate runs
- build runs
- later release-assembly and publish runs

Required columns:

- `id`
- `operation`
- `subject`
- `status`
- `started_at`

Recommended optional columns:

- `experience_id`
- `release_id`
- `command_line`
- `details_json`
- `error_message`
- `finished_at`

#### `operation_events`

Use for:

- append-only event trail inside a run

Required columns:

- `id`
- `run_id`
- `level`
- `message`
- `created_at`

Recommended optional columns:

- `event_type`
- `visibility`
- `public_message`
- `details_json`

#### `locks`

Use for:

- protecting local build, release, or publish scopes from overlapping mutations

Required columns:

- `id`
- `lock_key`
- `owner_run_id`
- `scope`
- `acquired_at`
- `expires_at`

Recommended optional columns:

- `metadata_json`
- `released_at`

### Failure handling rules

1. Every tracked run starts in `running` state.
2. Every tracked run ends in either `succeeded` or `failed` state.
3. Failed runs must record an inspectable error message.
4. Locks must expire or be releasable after failure.
5. Deleting the SQLite file must not destroy the canonical publishing history because the authoritative artifacts remain in Git.

## Command surface additions

Phase 2 adds orchestration commands to the CLI.

Minimum bootstrap commands:

- `site orchestrate init`
- `site orchestrate status`
- `site orchestrate history`

Bootstrap rule:

- `site validate ...` and `site build ...` must record `OrchestrationRun` entries and use locks where concurrent local operations would be unsafe.

## Handoff model

Every major handoff should move through artifacts in this order:

1. source document
2. `ExperienceNorthStar`
3. `ModuleBrief`
4. `UnitBrief`
5. `VisualBrief`
6. `UnitDraft` and `VisualDraft`
7. immutable unit and visual versions
8. review records
9. experience config
10. release manifest
11. release QA and publish state

At no point should an agent rely on hidden memory alone to represent the current production plan.

## Phase-3 readiness rules

1. Planning, draft, version, review, experience, and release artifacts should retain stable IDs and explicit cross-references so lineage can be reconstructed without chat logs.
2. `operation_runs.subject` should use stable artifact, experience, or release identifiers rather than free-form prose alone.
3. `details_json` and event payloads should remain structured and redactable so a future exporter can derive safe summaries without scraping terminal output.
4. Any user-facing run explanation should be recordable separately from raw local diagnostics.
5. SQLite remains local even when its records contribute to exported observability artifacts.

## Acceptance criteria

- The system defines explicit planning artifacts before drafting begins.
- The instructional-design and museum-curation lenses both have durable places in the workflow.
- SQLite gives the local workflow durable runs, event logs, and locks without replacing file-based truth.
- Visuals are planned and reviewed as first-class artifacts.
- The command model can grow toward a full agentic publishing studio without abandoning static export.
