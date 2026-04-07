# Sprint 11: Observable-State Exporter Foundation

## Goal

Build the safe-state exporter boundary that turns canonical file artifacts plus local orchestration history into generated observability bundles for public and maintainer builds.

## Scope

1. Define the generated observable-state bundle layout and snapshot serialization rules.
2. Derive snapshot input from canonical file artifacts using stable identifiers and explicit lineage references.
3. Reduce local SQLite run, event, and lock records into structured production-event, queue, failure, and lineage state.
4. Apply visibility classification and redaction before any observable-state output is written.
5. Add a narrow exporter command path and validation hooks without changing the published site runtime model.
6. Keep observable-state generation build-time-only, static-export-safe, and local by default.

## Deliverables

- a generated observable-state bundle layout under `.site/observable-state/<visibility>/`
- typed exporter logic for `ProductionEvent`, `ArtifactStateSnapshot`, `ExperienceStateSnapshot`, `ReleaseStateSnapshot`, `QueueSnapshot`, `FailureSnapshot`, and `LineageSnapshot`
- explicit visibility and redaction rules wired into exporter behavior
- a narrow command surface for observable-state export and validation
- validation for missing lineage, unresolved references, unsafe public fields, and malformed snapshot output
- tests for deterministic emission, visibility filtering, and degraded local-state scenarios

## Work checklist

1. Keep files and Git as canonical truth over generated observability output.
2. Normalize canonical inputs by stable IDs before reducing them into snapshot models.
3. Reduce SQLite records into structured summaries instead of scraping terminal prose.
4. Support public output even when richer maintainer or private-local detail exists.
5. Emit explicit validation failures or warnings for missing lineage and unresolved snapshot references.
6. Keep generated observable state separate from the published runtime until route generation consumes it.
7. Document the exporter boundary clearly enough that Sprint 12 can consume it without querying SQLite directly.

## Positive tests

- The same canonical inputs and local orchestration inputs emit the same public bundle.
- Public output excludes maintainer and private-local fields consistently.
- The exporter can derive run, queue, failure, and lineage state from tracked orchestration history.
- Missing or superseded lineage is explicit in validation output rather than silently dropped.
- The exporter still emits a valid public bundle when there are no active failures or queue entries.

## Negative tests

- No published page reads SQLite directly.
- No raw prompt text, secret, absolute local path, or terminal dump reaches the public bundle.
- No exported snapshot lacks a stable subject identity once written.
- No unclassified state is silently treated as `public`.

## Edge-case checks

- Missing SQLite file in an otherwise file-complete workspace.
- Expired or released locks do not appear as active queue blockers.
- Partially completed runs reduce to intelligible in-progress or failed state.
- Public output still emits cleanly when the maintainer bundle carries richer detail.

## Accessibility checks

- Exported text fields remain human-readable enough for later route rendering and narration.
- Visual snapshot summaries preserve the alt-text and long-description references needed by later public pages.

## Export and deploy checks

- Generated observable-state bundles remain outside the published site content path until routes consume them.
- Exporter output stays base-path neutral because deployment path behavior belongs to routes, not bundle data.
- Public builds remain shippable without shipping SQLite.

## Out of scope

- public observatory page routes
- maintainer-only drill-down UI
- live runtime observability services or remote shared databases
- final release-archival policy beyond the minimum bundle hooks needed for exporter proof

## Exit criteria

Sprint 11 is done when the repo can generate deterministic, validated, public-safe observable-state bundles from canonical files plus local orchestration records without adding any live SQLite dependency to the published site runtime.
