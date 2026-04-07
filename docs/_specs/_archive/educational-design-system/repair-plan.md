# Educational Design System Repair Plan

## Purpose

This document converts the current review findings into a concrete repair pass.

The goal is not to restart the project. The goal is to remove the contradictions that would otherwise cause implementation drift, schema confusion, broken release reproducibility, and workflow ambiguity.

## What this repair pass is fixing

This plan addresses six cross-cutting issues:

1. the source-of-truth conflict between the phase-1 letter and the newer architecture specs
2. the lack of a block-level content schema that can actually render the documented page recipes
3. the missing mutable working-draft stage before append-only version snapshots
4. the asset-storage model that undermines visual reproducibility
5. the CLI examples that conflict with the explicit-release doctrine
6. the deployment spec that still behaves like a normal static-site CI flow instead of a release-manifest build flow

## Repair doctrine

1. Do not widen scope while repairing scope.
2. Prefer one explicit model over several loosely compatible ones.
3. Preserve the append-only principle, but place the mutation boundary in the right place.
4. Keep the first implementation slice small enough to prove the workflow with real artifacts.
5. Make the build path deterministic before making it convenient.

## Decision summary

### Source of truth

For implementation purposes, `spec.md` is the controlling document during the repair pass.

`letter1.md` remains the vision brief, but it must either be reconciled with the repaired architecture or explicitly reduced to a directional brief.

### Phase-1 boundary

Phase 1 is now two linked outcomes, not one:

1. a reusable educational design system
2. a minimal but real content operating model that can draft, review, approve, version, and publish static site content

The repair pass should keep that second outcome minimal. It does not justify building a full CMS, collaborative editor, or generalized automation platform.

### Unit granularity

For phase 1, treat a `UnitVersion` as a page-level publishable artifact.

Do not introduce independently versioned reusable sub-units yet.

Instead, each page-level unit should contain an ordered `blocks[]` array whose block types map to the educational primitives and recipe slots.

This keeps the model expressive enough to render real pages without exploding complexity.

## Repair workstreams

## Workstream 1: Reconcile the source-of-truth hierarchy

### Problem

The letter still describes a smaller, older phase-1 baseline, while the foundation spec now includes configuration-driven publishing, workflow state, visual versioning, and CLI orchestration.

### Required changes

1. Decide and document that `spec.md` governs implementation.
2. Update `letter1.md` so its required outputs and non-goals no longer contradict the current architecture.
3. Add a short status note to any top-level doc that could be mistaken for the authority source.

### Files to update

- `docs/_specs/letters/letter1.md`
- `docs/_specs/educational-design-system/spec.md`
- `docs/_specs/educational-design-system/phase-1-sprint-plan.md`

### Exit criteria

- No two top-level docs disagree about phase-1 outputs.
- The team can answer "which doc wins when specs conflict?" with one sentence.

## Workstream 2: Add a block-level unit schema

### Problem

The recipes require typed, ordered instructional structures such as `SectionBlock`, `WorkedExample`, `SummaryGrid`, `ReflectionPrompt`, and `SourceAnchorGrid`, but the current `UnitVersion` model only defines metadata plus Markdown body.

That model is not sufficient to render the documented page recipes without hidden page-specific logic or brittle Markdown parsing.

### Required changes

1. Extend `UnitVersion` with an ordered `blocks[]` field.
2. Define a closed union of block types for phase 1.
3. Map each block type to one educational primitive.
4. Define recipe validators that check required block presence and order.
5. Add at least two complete unit examples that satisfy different recipes.

### Recommended phase-1 block set

- `hero`
- `whyItMatters`
- `section`
- `conceptGrid`
- `summaryGrid`
- `comparisonGrid`
- `sequenceTimeline`
- `workedExample`
- `editorialAside`
- `pullInsight`
- `visualBreak`
- `reflectionPrompt`
- `nextStep`
- `sourceAnchorGrid`
- `glossary`
- `readingMapGrid`

### Recommended unit shape

```yaml
schema: unit/v2
id: student-readiness-lesson
version: v2026-04-12T100000Z
status: review_requested
kind: lesson
recipe: lesson
title: Why student readiness changes the teaching model
objective: Explain why learner support is a core curriculum design concern.
audiences:
  - educators
  - institutions
sourceRefs:
  - sourceId: renesaince
    sections:
      - Incoming Freshmen Reality
blocks:
  - type: hero
    title: Why student readiness changes the teaching model
    dek: The curriculum model fails if it assumes strong reading and self-management by default.
  - type: whyItMatters
    summary: Many learners enter with real reading, attention, and confidence constraints.
    stakes: The program has to teach through those realities, not around them.
  - type: section
    title: Reading readiness is uneven
    body: |
      National indicators suggest many incoming students will struggle with dense specifications.
  - type: workedExample
    prompt: Redesign a lesson to reduce cognitive overload.
    steps:
      - Break the lesson into bounded instructional chunks.
      - Add a visible sequence and summary.
  - type: summaryGrid
    items:
      - title: Reading support
        takeaway: Specs must be scaffolded.
  - type: reflectionPrompt
    prompt: Where does your current teaching model assume too much learner readiness?
  - type: nextStep
    title: Continue to multimodal instruction
    primaryAction:
      label: Next lesson
      href: /lessons/ordo-multimodal-instruction/
```

### Files to update

- `docs/_specs/educational-design-system/content-schema.md`
- `docs/_specs/educational-design-system/component-inventory.md`
- `docs/_specs/educational-design-system/page-recipes.md`

### Exit criteria

- Every required recipe section maps to a machine-readable block type.
- A renderer can build a page from a unit without special-case page wiring.

## Workstream 3: Introduce a real working-draft model

### Problem

The current append-only rule is correct for reviewed and published artifacts, but it leaves no clearly defined place for normal authoring before review.

Without a working-draft stage, authors will either mutate version files in place or create excessive version churn.

### Required changes

1. Distinguish mutable working drafts from immutable version snapshots.
2. Declare that append-only guarantees begin at the reviewable snapshot boundary, not at every keystroke.
3. Add workflow states and CLI commands that reflect this boundary.

### Recommended model

Use two artifact layers:

1. working draft files
2. immutable version snapshots

Recommended transitions:

```text
idea -> working_draft -> frozen_candidate -> review_requested -> changes_requested -> superseding_candidate -> approved -> published
```

### Recommended command changes

- `site unit start <unit-id>`
- `site unit freeze <unit-id>`
- `site unit request-review <unit-id> --version <version>`
- `site unit revise <unit-id> --from <version> --review <review-id>`

The same pattern should apply to visuals.

### Files to update

- `docs/_specs/educational-design-system/workflow-state-machine.md`
- `docs/_specs/educational-design-system/content-schema.md`
- `docs/_specs/educational-design-system/cli-command-surface.md`

### Exit criteria

- There is a documented mutable phase for normal authoring.
- Reviewed and published artifacts remain immutable.

## Workstream 4: Repair visual reproducibility

### Problem

The visual pipeline says each regeneration creates a new version, but the example directory structure still uses shared asset folders with stable filenames.

That makes accidental overwrite likely and weakens historical release reproducibility.

### Required changes

1. Store each visual version in its own version directory or use content-addressed filenames.
2. Ensure the spec version and the binary assets are version-aligned.
3. Keep asset references immutable once a visual version is approved.

### Recommended directory shape

```text
content/
  visuals/
    student-readiness-chart/
      v2026-04-04T160000Z/
        spec.yml
        chart.svg
        chart.csv
    renaissance-press-hero/
      v2026-04-04T161500Z/
        spec.yml
        image.png
        prompt.txt
```

### Files to update

- `docs/_specs/educational-design-system/visual-asset-pipeline.md`
- `docs/_specs/educational-design-system/content-schema.md`

### Exit criteria

- A historical release can always resolve the exact visual artifact it referenced.
- Regeneration cannot silently overwrite older assets.

## Workstream 5: Make the CLI consistent with the release model

### Problem

The current CLI examples partly follow the explicit-release doctrine and partly bypass it.

Examples such as `--release latest` and `site:publish` with no release id undermine the determinism promised elsewhere.

### Required changes

1. Remove ambiguous `latest` examples unless `latest` is itself an explicit alias file.
2. Require an explicit release id for publish operations.
3. Align draft, freeze, review, revise, approve, and publish commands with the repaired workflow model.
4. Add validation steps that enforce manifest approval before build or publish.

### Recommended npm surface

```json
{
  "scripts": {
    "site": "tsx scripts/site.ts",
    "site:validate": "npm run site -- validate schema && npm run site -- validate workflow",
    "site:build": "npm run site -- build experience enterprise-ai-degree --release release-2026-04-12",
    "site:publish": "npm run site -- release publish release-2026-04-12"
  }
}
```

If you want convenience shortcuts, define them as explicit local aliases, not as hidden selection rules.

### Files to update

- `docs/_specs/educational-design-system/cli-command-surface.md`
- `docs/_specs/educational-design-system/workflow-state-machine.md`
- `docs/_specs/educational-design-system/deployment.md`

### Exit criteria

- No command example contradicts the manifest model.
- A maintainer can tell exactly what release a command will build or publish.

## Workstream 6: Make deployment manifest-driven

### Problem

The sprint plan now expects reproducible release-manifest builds, but the deployment spec still describes a conventional static build pipeline.

### Required changes

1. Add release-manifest validation to the deployment spec.
2. Define how CI selects the release to build.
3. Ensure sitemap, navigation, and route inclusion derive from the selected experience and release.
4. Add a failure mode for unapproved or missing manifest references.

### Recommended CI flow

```text
validate schema
-> validate workflow
-> validate release <release-id>
-> build experience <experience-id> --release <release-id>
-> run tests against the built output
-> publish artifact
```

### Files to update

- `docs/_specs/educational-design-system/deployment.md`
- `docs/_specs/educational-design-system/phase-1-sprint-plan.md`

### Exit criteria

- The deployment spec describes release-based builds rather than implicit site builds.
- CI cannot publish content that was never approved into a release manifest.

## Workstream 7: Prove the repaired model with a pilot slice

### Problem

A repaired spec set is still theoretical until it survives one real pass through the workflow.

### Required changes

1. Create a minimal pilot content tree.
2. Build two experience variants from the same source base.
3. Use one deterministic chart and one generated illustration.
4. Produce one review cycle and one superseding content version.
5. Produce one release manifest and one reproducible build.

### Recommended pilot assets

- one lesson unit derived from `renesaince.md`
- one concept or guide unit derived from `identity.md`
- one chart spec from student-readiness data
- one illustration spec for a historical or conceptual hero
- two experience configs that reuse at least one unit

### Files to create later during implementation

- `content/sources/*`
- `content/units/*`
- `content/visuals/*`
- `content/experiences/*`
- `content/releases/*`

### Exit criteria

- One content unit has gone through draft, review, superseding revision, approval, and release.
- Two experiences reuse shared source material without page duplication.

## Execution order

Run the repair pass in this order:

1. Workstream 1: source-of-truth reconciliation
2. Workstream 2: block-level schema
3. Workstream 3: working-draft model
4. Workstream 4: visual reproducibility
5. Workstream 5: CLI consistency
6. Workstream 6: manifest-driven deployment
7. Workstream 7: pilot proof

Do not start Sprint 1 implementation until Workstreams 1 through 3 are complete.

## Non-goals of the repair pass

- building the full CLI implementation
- building a CMS
- building collaborative editing
- expanding the block schema beyond what the documented recipes need
- designing a generalized automation platform beyond the educational site workflow

## Acceptance criteria for the repair pass

- The letter, foundation spec, and sprint plan agree on phase-1 scope.
- The content model can represent the documented recipes without hidden page logic.
- The workflow model includes a normal mutable authoring phase before immutable review snapshots.
- The visual pipeline is historically reproducible.
- The CLI and deployment specs no longer contradict the release-manifest doctrine.
- The repaired model is small enough to prove with a pilot slice before large implementation begins.
