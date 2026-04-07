# Configuration-Driven Content Schema Spec

## Purpose

Define the file-based content architecture for a static educational site system that can produce multiple site variants from shared research and approved content units.

The system should support:

- long-form canonical research sources
- page-level educational units derived from those sources
- multiple experience builds from the same unit library
- mutable working drafts before review
- append-only versioning for frozen units, visuals, reviews, and releases
- static compilation into GitHub-Pages-friendly output

## Core principles

1. Canonical sources stay rich and human-readable.
2. Phase-1 publishable units are page-level artifacts.
3. Page-level units render through an ordered `blocks[]` array rather than hidden page logic.
4. Working drafts may be mutable.
5. Append-only guarantees begin at the frozen-candidate boundary.
6. Releases are assembled from approved manifests.
7. Markdown remains the authoring surface, with YAML frontmatter or YAML files carrying structure and workflow metadata.

## Phase-1 unit granularity

For phase 1, a `UnitVersion` is a page-level publishable artifact.

This means:

- one lesson page is one unit version
- one concept explainer page is one unit version
- one timeline page is one unit version
- one assignment page is one unit version

Phase 1 does not yet introduce independently versioned reusable sub-units.

Instead, each page-level unit contains an ordered `blocks[]` array whose block types map to recipe sections and educational primitives.

## Authoring boundary

The system has two content layers:

1. mutable working drafts
2. immutable version snapshots

Working drafts exist so authors and agents can revise normally.

Version snapshots exist so review, approval, publishing, and release history remain auditable and reproducible.

## Entity model

### `SourceDocument`

Canonical research or briefing material.

Required fields:

- `id`
- `title`
- `path`
- `topics`
- `status`

Notes:

- Source documents are input artifacts rather than directly published page units.
- The source layer should preserve citations, evidence, and nuance even when later units simplify the material.

### `UnitDraft`

A mutable page-level working draft.

Required fields:

- `schema`
- `id`
- `status`
- `kind`
- `recipe`
- `title`
- `objective`
- `audiences`
- `sourceRefs`
- `blocks`

Optional fields:

- `summary`
- `tags`
- `module`
- `visualDraftRefs`
- `basedOnVersion`
- `notes`

Recommended status values:

- `working_draft`
- `ready_to_freeze`

### `UnitVersion`

An immutable, versioned snapshot of a page-level educational unit.

Required fields:

- `schema`
- `id`
- `version`
- `status`
- `kind`
- `recipe`
- `title`
- `objective`
- `audiences`
- `sourceRefs`
- `blocks`
- `supersedes`

Optional fields:

- `summary`
- `tags`
- `module`
- `visualRefs`
- `next`
- `notes`
- `reviewRefs`

Recommended status values:

- `frozen_candidate`
- `review_requested`
- `changes_requested`
- `approved`
- `published`
- `retired`
- `superseded`

Narrative content lives inside the block payloads, typically as Markdown strings using YAML literal blocks. The Markdown file body is optional and should not be required for rendering.

### `BlockSpec`

An ordered content block inside a page-level unit.

Every block must include:

- `type`

Recommended shared rules:

- use named serializable content fields rather than React-only props
- include stable `id` values on blocks that may be linked from local navigation or direct anchors
- reuse shared sub-shapes for actions, metadata, media references, and link lists rather than inventing one-off variants per block

Block payloads then vary by type.

### Shared render-contract sub-shapes

Use these normalized shapes when defining phase-1 block payloads.

#### `ActionLinkSpec`

Required fields:

- `label`
- `href`

Optional fields:

- `kind`
- `note`

#### `MetadataItemSpec`

Required fields:

- `label`
- `value`

#### `GridItemSpec`

Required fields:

- `title`
- `summary`

Optional fields:

- `href`
- `tag`

#### `ComparisonColumnSpec`

Required fields:

- `key`
- `label`

#### `ComparisonRowSpec`

Required fields:

- `label`
- `cells`

#### `SequenceItemSpec`

Required fields:

- `label`
- `title`
- `summary`

Optional fields:

- `href`
- `visualRef`

#### `WorkedExampleStepSpec`

Required fields:

- `title`
- `body`

Optional fields:

- `outcome`

#### `SourceItemSpec`

Required fields:

- `title`
- `description`
- `href`
- `type`

Optional fields:

- `note`

#### `ReadingMapLinkSpec`

Required fields:

- `label`
- `href`

Optional fields:

- `note`
- `type`

#### `ReadingMapClusterSpec`

Required fields:

- `title`
- `summary`
- `links`

#### `GlossaryTermSpec`

Required fields:

- `term`
- `definition`

Optional fields:

- `note`

#### `VisualReferenceSpec`

Required fields:

- `visualRef`

Optional fields:

- `caption`
- `credit`
- `alt`

Markdown-bearing fields such as `body`, `summary`, `stakes`, `prompt`, `takeaway`, `context`, and `note` should be stored as Markdown strings that the renderer can pass into the appropriate primitive.

### Phase-1 block union

| Block type         | Renders through    | Required payload                             | Common optional fields                                        |
| ------------------ | ------------------ | -------------------------------------------- | ------------------------------------------------------------- |
| `hero`             | `LessonHero`       | `title`, `dek`                               | `eyebrow`, `metadata[]`, `progress`, `actions[]`, `visualRef` |
| `whyItMatters`     | `WhyItMatters`     | `summary`, `stakes`                          | `title`, `audience`, `links[]`                                |
| `section`          | `SectionBlock`     | `id`, `title`, `body`                        | `eyebrow`, `summary`, `tone`                                  |
| `conceptGrid`      | `ConceptGrid`      | `items[]`                                    | `id`, `title`, `summary`, `columns`                           |
| `summaryGrid`      | `SummaryGrid`      | `items[]`                                    | `id`, `title`                                                 |
| `comparisonGrid`   | `ComparisonGrid`   | `columns[]`, `rows[]`                        | `id`, `title`, `legend`, `caption`                            |
| `sequenceTimeline` | `SequenceTimeline` | `mode`, `items[]`                            | `id`, `title`, `summary`                                      |
| `workedExample`    | `WorkedExample`    | `prompt`, `steps[]`                          | `id`, `title`, `result`, `reflection`, `visualRef`            |
| `editorialAside`   | `EditorialAside`   | `body`                                       | `id`, `title`, `tone`, `icon`                                 |
| `pullInsight`      | `PullInsight`      | `quote`                                      | `attribution`, `context`                                      |
| `visualBreak`      | `VisualBreak`      | at least one of `title`, `body`, `visualRef` | `id`, `tone`, `caption`, `credit`, `alt`                      |
| `reflectionPrompt` | `ReflectionPrompt` | `prompt`                                     | `id`, `title`, `questions[]`, `mode`, `timeEstimate`          |
| `nextStep`         | `NextStepBlock`    | `title`, `primaryAction`                     | `summary`, `secondaryAction`, `context`                       |
| `sourceAnchorGrid` | `SourceAnchorGrid` | `items[]`                                    | `id`, `title`, `summary`                                      |
| `glossary`         | `GlossaryBlock`    | `terms[]`                                    | `id`, `title`, `layout`                                       |
| `readingMapGrid`   | `ReadingMapGrid`   | `clusters[]`                                 | `id`, `title`, `progression`                                  |

Block order matters because recipes validate sequence as well as presence.

When a block can appear in local navigation or section-level deep links, treat `id` as required in practice even if the page recipe does not mention it explicitly.

### `VisualDraft`

A mutable working draft for a visual specification.

Required fields:

- `schema`
- `id`
- `status`
- `kind`
- `intent`
- `forUnit`

Optional fields:

- `prompt`
- `negativePrompt`
- `dataSource`
- `styleProfile`
- `caption`
- `alt`
- `notes`
- `basedOnVersion`

Recommended status values:

- `working_draft`
- `ready_to_freeze`

### `VisualSpecVersion`

An immutable, versioned visual specification paired with its generated or deterministic assets.

Required fields:

- `schema`
- `id`
- `version`
- `status`
- `kind`
- `intent`
- `forUnit`
- `supersedes`

Optional fields:

- `prompt`
- `negativePrompt`
- `dataSource`
- `styleProfile`
- `caption`
- `alt`
- `provider`
- `assetRefs`
- `reviewRefs`

Recommended status values:

- `frozen_candidate`
- `generated_candidate`
- `review_requested`
- `changes_requested`
- `approved`
- `published`
- `retired`
- `superseded`

### `ReviewRecord`

An append-only record of a review pass against a target artifact.

Required fields:

- `id`
- `targetType`
- `targetId`
- `targetVersion`
- `reviewerRole`
- `outcome`
- `findings`
- `createdAt`

### `ExperienceConfig`

Defines a site variant or learning experience assembled from approved units.

Required fields:

- `id`
- `title`
- `theme`
- `audience`
- `homepage`
- `navigation`
- `unitRefs`

Optional fields:

- `description`
- `visualRefs`
- `moduleRefs`
- `siteMetadata`
- `featureFlags`
- `releasePolicy`

### `ReleaseManifest`

An immutable manifest that determines exactly which versions are published in a site build.

Required fields:

- `id`
- `experience`
- `createdAt`
- `routeIds`
- `unitVersions`
- `visualVersions`
- `status`

Optional fields:

- `notes`
- `supersedes`

Recommended status values:

- `assembled`
- `review_requested`
- `changes_requested`
- `approved`
- `published`
- `superseded`

During the migration from checked-in approved fixtures to file-backed unit versions, `unitVersions` may contain either:

- an approved fixture id such as `recipe-concept-feedback-loops`
- an explicit file-backed unit reference in the form `unit-id@version`, for example `choose-primary-archetype@v2026-04-05T120000Z`

During the same migration, `visualVersions` may contain either:

- an approved fixture id such as `feedback-loop-map`
- an explicit file-backed visual reference in the form `visual-id@version`, for example `archetype-signal-map@v2026-04-05T031424Z`

Release validation should reject working drafts, unapproved file-backed versions, and duplicate selections for the same unit id.

## Phase-2 planning and orchestration artifacts

Phase 2 adds planning and orchestration artifacts that guide authoring and local workflow state before publishable units and releases exist.

These artifacts are not direct production inputs for the static site build. They define how a source document becomes an experience, how a page gets planned before drafting, and how local workflow operations are recorded durably.

The detailed field definitions for these artifacts live in `agentic-orchestration.md`.

### `ExperienceNorthStar`

Use for:

- the governing thesis, audience, transformation, recipe mix, and visual direction for one site experience

### `ModuleBrief`

Use for:

- module, gallery, or narrative-section planning before page-level drafting begins

### `UnitBrief`

Use for:

- page-level planning that joins instructional and curatorial jobs before a `UnitDraft` exists

### `VisualBrief`

Use for:

- deciding whether a page needs an illustration, diagram, chart, graph, photo, or timeline and what that visual must accomplish

### `OrchestrationRun`

Use for:

- append-only local workflow run history such as validation, build, assembly, or publish attempts

### `OrchestrationLock`

Use for:

- preventing overlapping local operations where concurrent workflow state would be unsafe

## Add-only and remove-only versioning model

The system should not support mutable editing of frozen, approved, or published artifacts.

### Allowed operations

- edit a working draft
- freeze a new unit version from a working draft
- freeze a new visual version from a working draft
- add a review record
- add a release manifest
- retire or tombstone a prior artifact by reference

### Disallowed operations

- editing a frozen unit version in place
- editing a frozen visual version in place
- editing a published unit version in place
- editing a published visual version in place
- silently mutating the active release
- deleting historical review records

### Removal model

"Remove" means one of two things:

1. The artifact is excluded from future releases.
2. The artifact is explicitly retired or tombstoned by a newer version or manifest.

History remains intact.

## Recipe validation model

Recipes validate against `UnitVersion.blocks[]`.

At minimum, a validator should check:

1. required block presence
2. required block order
3. allowed optional blocks
4. block-payload completeness for the chosen recipe

## Recommended directory structure

```text
content/
  sources/
    identity.md
    renesaince.md
  plans/
    experiences/
    modules/
  briefs/
    units/
    visuals/
  drafts/
    units/
      student-readiness-lesson.md
    visuals/
      student-readiness-chart.yml
  units/
    student-readiness-lesson/
      versions/
        v2026-04-04T120000Z.md
        v2026-04-10T090000Z.md
    print-to-ai-timeline/
      versions/
        v2026-04-04T150000Z.md
  visuals/
    student-readiness-chart/
      versions/
        v2026-04-04T160000Z/
          spec.yml
          chart.svg
          chart.csv
    renaissance-press-hero/
      versions/
        v2026-04-04T161500Z/
          spec.yml
          image.png
          prompt.txt
  reviews/
    units/
    visuals/
    releases/
  experiences/
    enterprise-ai-degree.yml
    identity-system.yml
  releases/
    enterprise-ai-degree/
      release-2026-04-12.yml

.site/
  orchestration.sqlite
```

## Example unit draft

```md
---
schema: unit-draft/v1
id: student-readiness-lesson
status: working_draft
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
---
```

## Example unit version

```md
---
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
      - Pedagogical Model and Curriculum Architecture
visualRefs:
  - student-readiness-chart@v2026-04-12T101500Z
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
supersedes: null
---
```

## Build model

1. Parse source documents, working drafts, unit versions, visuals, experiences, and release manifests.
2. Ignore planning briefs and local orchestration files for production builds.
3. Ignore working drafts for production builds.
4. Select an experience and explicit release.
5. Resolve approved unit and visual versions from the release manifest.
6. Validate recipe contracts against each selected unit's `blocks[]` array.
7. Render units through the page recipes and design-system primitives.
8. Produce static output.

The build should never infer live content from "latest file wins" without an explicit release selection.

## Acceptance criteria

- The schema cleanly separates sources, drafts, units, visuals, reviews, experiences, and releases.
- A single source can support multiple units without duplication of the full document.
- A single page-level unit can appear in more than one experience.
- The documented page recipes can be represented through ordered block contracts.
- The system can rebuild a whole site or one section from explicit versions.
- Frozen and published content remains immutable.
