# Sprint 13: Maintainer Stewardship and Governance

## Goal

Add the richer maintainer observability layer and governance rules without breaking the public-safe export boundary.

## Scope

1. Add a maintainer bundle consumption path or private preview mode that preserves the same route model and stable identifiers as the public observatory.
2. Expand queue, failure, run, and release views with maintainer-safe drill-downs for retries, supersessions, blockers, and diffs.
3. Materialize release narrative and diff summaries from exported observable-state snapshots.
4. Document governance rules for visibility classification, redaction review, bundle retention, and public storytelling.
5. Validate that public and maintainer builds stay aligned while the public build never leaks maintainer or private-local state.

## Deliverables

- a maintainer observatory consumption path built from exported maintainer snapshots
- richer maintainer-safe route states for queue, failures, runs, releases, and lineage drill-downs
- release narrative and diff summaries derived from exported observability artifacts
- documented governance rules for visibility review, redaction boundaries, and historical observatory retention
- tests for public-versus-maintainer separation, identifier parity, and leakage prevention

## Work checklist

1. Keep maintainer views derived from exported bundles rather than from live runtime database access.
2. Preserve the same route families and stable identifiers across public and maintainer builds.
3. Make retries, supersessions, blockers, and diffs inspectable without exposing private-local raw diagnostics in public output.
4. Treat visibility widening as an auditable governance action rather than an implicit default.
5. Ensure release narratives and diff summaries remain grounded in approved artifacts and release QA history.
6. Document how public-safe storytelling differs from maintainer-only operational inspection.

## Positive tests

- Maintainer builds resolve the same route identities as public builds while adding richer state detail.
- Public builds hide maintainer-only content derived from the same underlying subject IDs.
- Retries, supersessions, release diffs, and blocker summaries are inspectable in maintainer mode without direct SQLite access.
- Governance rules make visibility changes and redaction boundaries explicit enough for review.
- Maintainer preview builds remain static-export-safe even when they contain richer observability detail.

## Negative tests

- No public page leaks maintainer or private-local detail.
- No live admin console, runtime auth backend, or mutable operations panel is required.
- No incompatible second route model is introduced just for maintainers.
- No release narrative bypasses explicit release QA or approved artifact lineage.

## Edge-case checks

- one-release history with no meaningful diff yet
- no active failures but a retained failure history
- retries that supersede earlier failures cleanly
- maintainer build with richer data while the public build remains minimal and safe

## Accessibility checks

- Expanded maintainer tables, timelines, and diff summaries remain readable and keyboard-navigable.
- Severity and status remain understandable without color-only meaning.
- Public and maintainer empty states still explain what is absent and why.

## Export and deploy checks

- Public deployment remains unchanged and Pages-safe.
- Maintainer preview builds remain static-export-safe even if they are not broadly deployed.
- Public and maintainer bundles preserve stable identifiers and route parity for the same release history.

## Out of scope

- multi-user accounts or role-management systems
- live operational mutation tools
- server-side monitoring dashboards or remote observability infrastructure
- new canonical publishing truth outside files and Git

## Exit criteria

Sprint 13 is done when the project can produce aligned public and maintainer observability builds from exported state, richer maintainer inspection is available without live runtime infrastructure, and governance rules clearly define how visibility and redaction decisions are made.
