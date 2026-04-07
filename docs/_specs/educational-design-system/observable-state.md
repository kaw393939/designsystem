# Observable State and Public Observatory Spec

## Purpose

Define the public-safe observability artifacts, visibility model, route map, and export boundary for phase 3.

This spec turns the educational design system into an observable workshop where the public and maintainers can browse documents, artifacts, releases, and production progress without making the published site depend on live mutable infrastructure.

## Core doctrine

1. Files and Git remain canonical truth.
2. SQLite remains a local orchestration ledger and is never queried by the published site runtime.
3. Public observability is a product surface, not a raw debug console.
4. Observable state is derived, redacted, and releasable.
5. In-progress visibility requires explicit artifacts, stable identifiers, and declared visibility.
6. Public pages should explain state and lineage, not just dump logs.
7. The same export model should support both public and maintainer builds.

## Observable domains

The observatory should make these domains browsable:

- source research documents and ingestion coverage
- experience plans, module structures, and active assembly state
- units, visuals, reviews, manifests, and publish status
- local runs, queue state, failures, retries, and supersessions
- lineage from source document through release

## Visibility tiers

### `public`

Use for state that is safe to ship in the public static build.

Allowed examples:

- titles, summaries, current status, timestamps, and lineage links
- public-safe failure summaries and next-step explanations
- approved thumbnails, charts, or diagrams that are already releasable

Never include:

- secrets, credentials, tokens, or internal-only notes
- raw prompts or hidden reviewer commentary
- absolute local paths or machine-specific details

### `maintainer`

Use for richer operational detail that should appear only in local or private preview builds.

Allowed examples:

- blocking reasons, retry guidance, queue ownership, and deeper diff summaries
- internal release notes or richer operational explanations

Rule:

- maintainer-visible state must still be generated at build time from exported artifacts rather than from live runtime access

### `private-local`

Use for raw local details that should never ship in exported observatory output.

Examples:

- raw terminal dumps
- unreduced SQLite details
- lock internals used only for local recovery
- hidden prompts, scratch notes, or any unredacted machine-local metadata

Default rule:

- if a derived observability object has no explicit visibility decision, treat it as `private-local`

## Observability artifact types

These artifacts are derived observability outputs, not canonical content inputs.

### `ProductionEvent`

Purpose:

- record one append-only human-readable and machine-readable event emitted during planning, drafting, review, release, export, or failure handling

Required fields:

- `schema`
- `id`
- `runId`
- `eventType`
- `subjectType`
- `subjectId`
- `status`
- `visibility`
- `message`
- `createdAt`

Recommended optional fields:

- `experienceId`
- `releaseId`
- `artifactRefs`
- `publicDetails`
- `details`
- `severity`
- `supersedesEventId`

### `ArtifactStateSnapshot`

Purpose:

- summarize the current known state of one publish-relevant artifact or source document for observatory pages

Required fields:

- `schema`
- `id`
- `artifactType`
- `artifactId`
- `title`
- `status`
- `visibility`
- `lastChangedAt`

Recommended optional fields:

- `experienceId`
- `moduleId`
- `versionId`
- `sourceRefs`
- `runRefs`
- `reviewStatus`
- `publishState`
- `summary`
- `nextStep`

### `ExperienceStateSnapshot`

Purpose:

- summarize the current health, scope, and progress of one experience across planning, unit assembly, visual coverage, and release readiness

Required fields:

- `schema`
- `id`
- `experienceId`
- `title`
- `status`
- `visibility`
- `moduleRefs`
- `artifactRefs`
- `lastChangedAt`

Recommended optional fields:

- `northStarId`
- `sourceRefs`
- `releaseRefs`
- `progressSummary`
- `currentRisks`
- `nextMilestone`

### `ReleaseStateSnapshot`

Purpose:

- summarize one candidate or published release so the observatory can show history, readiness, and diffs without treating the release manifest itself as a UI model

Required fields:

- `schema`
- `id`
- `releaseId`
- `status`
- `visibility`
- `assembledAt`
- `artifactRefs`

Recommended optional fields:

- `publishedAt`
- `experienceRefs`
- `qaRefs`
- `diffSummary`
- `routeCount`
- `supersedes`
- `summary`

### `QueueSnapshot`

Purpose:

- summarize queued, blocked, or waiting work for one logical queue or lifecycle stage

Required fields:

- `schema`
- `id`
- `queueKey`
- `visibility`
- `generatedAt`
- `entries`

Recommended optional fields:

- `summary`
- `oldestCreatedAt`
- `blockingReason`
- `countsByStatus`

### `FailureSnapshot`

Purpose:

- summarize one current or recent failure so failure pages can stay legible without exposing raw internal diagnostics

Required fields:

- `schema`
- `id`
- `runId`
- `subjectType`
- `subjectId`
- `status`
- `visibility`
- `firstFailedAt`
- `latestMessage`

Recommended optional fields:

- `experienceId`
- `artifactRefs`
- `retryRunIds`
- `supersededBy`
- `publicResolution`
- `errorCode`

### `LineageSnapshot`

Purpose:

- make source-to-release relationships browsable as an explicit graph or ordered chain

Required fields:

- `schema`
- `id`
- `subjectType`
- `subjectId`
- `visibility`
- `generatedAt`
- `nodes`
- `edges`

Recommended optional fields:

- `experienceId`
- `releaseId`
- `summary`
- `sourceRefs`

## Public observatory route map

Each collection route should have a matching detail route when the underlying snapshot type has stable IDs.

| Route family                                                                  | Purpose                                                             | Primary snapshot types                                                                |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `/observatory/`                                                               | top-level overview of current system state                          | `ExperienceStateSnapshot`, `QueueSnapshot`, `ReleaseStateSnapshot`, `FailureSnapshot` |
| `/observatory/sources/` and `/observatory/sources/[id]/`                      | browse research documents and ingestion coverage                    | `ArtifactStateSnapshot`, `LineageSnapshot`                                            |
| `/observatory/experiences/` and `/observatory/experiences/[id]/`              | browse experience status, progress, and readiness                   | `ExperienceStateSnapshot`, `LineageSnapshot`                                          |
| `/observatory/modules/` and `/observatory/modules/[id]/`                      | browse module or gallery sequences inside experiences               | `ArtifactStateSnapshot`, `LineageSnapshot`                                            |
| `/observatory/artifacts/` and `/observatory/artifacts/[id]/`                  | browse units, visuals, reviews, manifests, and other artifact state | `ArtifactStateSnapshot`, `LineageSnapshot`, `ProductionEvent`                         |
| `/observatory/releases/` and `/observatory/releases/[id]/`                    | browse release history, readiness, and published baselines          | `ReleaseStateSnapshot`, `LineageSnapshot`                                             |
| `/observatory/runs/` and `/observatory/runs/[id]/`                            | browse durable workflow operations and their event trails           | `ProductionEvent`, `FailureSnapshot`                                                  |
| `/observatory/queue/`                                                         | inspect waiting, blocked, and in-flight work                        | `QueueSnapshot`, `ProductionEvent`                                                    |
| `/observatory/failures/` and `/observatory/failures/[id]/`                    | inspect active and recent failures plus retries or supersessions    | `FailureSnapshot`, `ProductionEvent`                                                  |
| `/observatory/lineage/` and `/observatory/lineage/[subjectType]/[subjectId]/` | follow source-to-release relationships                              | `LineageSnapshot`                                                                     |

## Export model

Observable state must be produced as a derived build artifact rather than read live at runtime.

### Inputs

Canonical file inputs:

- plans and briefs
- drafts and immutable versions
- review records
- experience configs
- release manifests and release QA

Local operational inputs:

- SQLite `operation_runs`
- SQLite `operation_events`
- SQLite `locks`
- future queue-oriented orchestration records once they exist

### Materialization pipeline

1. Collect canonical artifact state from files and normalize it by stable IDs.
2. Collect local operational state from SQLite and reduce it to structured run, event, queue, and failure summaries.
3. Apply visibility rules and redaction rules before any page-generation step.
4. Derive observability snapshots and write them into a generated bundle under `.site/observable-state/<visibility>/`.
5. Generate static pages from that bundle; the Next.js runtime never queries SQLite directly.
6. Optionally archive the emitted public observability bundle alongside a release candidate so historical observatory views stay reproducible.

### Export requirements

1. The exporter must tolerate missing private-local data and still emit a valid public bundle.
2. Every exported snapshot must retain stable IDs, timestamps, and enough references to reconstruct lineage.
3. Redaction happens before publication, not in the browser.
4. Public and maintainer bundles may differ in detail, but they must share the same core identifiers and route model.
5. The exporter must never require scraping terminal text as its primary source of truth.

## Acceptance criteria

- observable state is derived from canonical files plus local orchestration records
- the public route family is build-time materialized and static-export-safe
- visibility and redaction rules prevent accidental publication of local-only details
- current, in-progress, failed, and historical states are all representable without live database access
- lineage across sources, artifacts, runs, and releases is explicit enough for browsable public explanation
