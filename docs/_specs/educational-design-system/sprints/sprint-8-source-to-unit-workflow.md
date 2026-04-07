# Sprint 8: Source-to-Unit Workflow

## Goal

Move phase 2 from checked-in fixture proof to the first real file-backed authoring flow from registered source document to approved unit version.

## Scope

1. Add source registration for canonical research inputs so source documents have stable IDs and explicit workflow references.
2. Require a checked-in `UnitBrief` before a new `UnitDraft` can be started.
3. Implement the first file-backed unit lifecycle commands for draft creation, inspection, freeze, review request, review recording, revision, and approval.
4. Materialize `UnitDraft`, `UnitVersion`, and `ReviewRecord` files under the phase-2 content-model directories with stable lineage back to sources and briefs.
5. Provide a migration path from the current checked-in fixture model to file-backed approved units without breaking the selected-release validation and build baseline.
6. Record mutating source and unit lifecycle operations in the local orchestration ledger introduced in Sprint 7.

## Deliverables

- `sprint-8-source-to-unit-workflow.md`
- source registration commands and storage conventions for `SourceDocument` records
- unit lifecycle commands for `start`, `show`, `freeze`, `request-review`, `review`, `revise`, and `approve`
- file-backed `UnitDraft`, `UnitVersion`, and `ReviewRecord` examples with stable IDs, source lineage, and supersession links
- at least one minimal checked-in planning chain that includes the upstream `UnitBrief` required to start a draft
- a migration or compatibility path that lets approved file-backed units coexist with the current fixture proof during transition
- tests for source registration, immutable freeze behavior, review-record generation, approval gating, and release rejection of working drafts

## Work checklist

1. Keep research files as canonical inputs; source registration should add explicit workflow metadata, not replace source truth with SQLite-only state.
2. Refuse to start a unit draft unless the referenced `UnitBrief` and registered source both exist.
3. Freeze working drafts into immutable version snapshots with explicit source and brief lineage.
4. Generate append-only `ReviewRecord` files for every review pass instead of hiding review state in terminal output.
5. Ensure revision creates a superseding draft or version path rather than editing frozen content blocks in place.
6. Keep the current selected-release validation and build baseline working while file-backed units are introduced incrementally.
7. Record mutating lifecycle operations in durable orchestration history so failures and retries remain inspectable.

## Positive tests

- `site source register` creates a stable source record and `site source list` shows it.
- `site unit start` creates a working draft from an existing `UnitBrief` and registered source.
- `site unit freeze` creates an immutable version snapshot with explicit lineage and supersession metadata.
- `site unit review` creates an append-only review record and `site unit approve` succeeds only after explicit review evidence exists.
- selected-release validation can resolve approved file-backed unit versions and rejects working drafts as publishable inputs.

## Negative tests

- No unit draft can be created without a `UnitBrief` and registered source.
- No freeze command edits a prior unit version in place.
- No review pass updates unit workflow state without producing a durable `ReviewRecord`.
- No release or build path treats a working draft as a valid publishable unit.
- No source registration flow duplicates canonical research content into hidden local-only state.

## Edge-case checks

- registering the same source path twice should produce a stable conflict or deduplication result
- revising after `changes_requested` should create a superseding draft path tied back to the reviewed version
- missing reviewer role or missing target version should fail explicitly
- fixture-backed and file-backed unit resolution should coexist during migration without ambiguous precedence

## Accessibility checks

- local CLI outputs remain plain-text readable and inspectable in the terminal
- draft, version, and review artifacts preserve explicit accessibility-relevant fields and references rather than burying them in ad hoc prose

## Export and deploy checks

- selected-release validation and build remain explicit about experience and release selection
- file-backed unit introduction must not weaken static export or repository-base-path proof
- production builds continue to ignore working drafts and local orchestration files

## Out of scope

- visual draft or version workflow
- multi-experience assembly and experience-specific navigation design
- release diffing, promotion, or publish automation beyond the current selected-release baseline
- public observatory route consumption of the new workflow artifacts
- full migration of every existing fixture-backed unit in a single sprint

## Exit criteria

Sprint 8 is done when at least one real source can be registered, planned through a checked-in `UnitBrief`, drafted, frozen, reviewed, revised if needed, approved, and inspected through the CLI without hidden manual state, while selected-release validation and build still reject working drafts and preserve the published baseline.
