# Educational Design System Phase 3 Sprint Plan

## Purpose

This document defines phase 3 after the phase-2 workflow and orchestration foundation.

Phase 3 turns the local educational-site studio into a public, browsable observatory that can expose safe, static, inspectable production state for documents, artifacts, runs, releases, and lineage.

## Status

- Status: active phase-3 planning source of truth
- Depends on: phase-2 workflow and orchestration foundation
- Relationship to phase 2: phase 2 produces the file-based artifacts, stable lineage, and local orchestration history; phase 3 materializes that state into public and maintainer observability surfaces without making SQLite or runtime mutability part of the published site

## Phase-3 goal

Build a static, public-safe observability layer that can:

1. export observable state from canonical files plus selected local orchestration records
2. let the public browse what exists, what is in progress, what is published, and what changed
3. give maintainers deeper inspection of queues, failures, retries, and release deltas without direct database access
4. preserve the existing file-first, Git-reviewable, QA-gated release model
5. turn the production system itself into part of the educational and institutional story

## Primary outcomes

- public-safe snapshot artifacts for experiences, releases, queue state, failures, and lineage
- a deterministic exporter that derives observatory build inputs from files plus the local orchestration ledger
- public observatory routes for sources, experiences, modules, artifacts, releases, runs, queue, failures, and lineage
- visibility tiers separating public, maintainer, and private-local state
- release-ready observability pages that explain current progress and historical evolution without exposing raw local internals

## Phase-3 sprint sequence

| Sprint | Title                                 | Primary outcome                                                                  | Depends on |
| ------ | ------------------------------------- | -------------------------------------------------------------------------------- | ---------- |
| 11     | Observable-state exporter foundation  | Snapshot schemas, visibility policy, redaction rules, and derived build inputs   | Phase 2    |
| 12     | Public observatory routes             | Static observatory pages for sources, experiences, artifacts, releases, and runs | 11         |
| 13     | Maintainer stewardship and governance | Maintainer-safe drill-downs, failure handling, release storytelling, and diffs   | 12         |

## Cross-phase rules

1. Published observatory pages must render from exported safe-state artifacts, never directly from SQLite or ad hoc live process state.
2. Visibility is explicit: each exported snapshot is classified as `public`, `maintainer`, or `private-local`.
3. Public observability may include in-progress state only when that state has an explicit artifact, stable identifier, and approved visibility tier.
4. The observatory is derivative, not canonical; files and Git remain the system of record.
5. Raw prompts, secrets, absolute local paths, and unreduced terminal dumps are never publishable observatory inputs.
6. Every public state view must link back to concrete artifacts, releases, or runs rather than vague status prose.
7. Failure views must explain what failed, where it failed, and what supersedes or retries it.
8. Maintainer visibility may be richer than public visibility, but it must still be build-time materializable and static-export-safe.
9. Observable state must remain auditable across releases so historical views do not depend on the current local machine.

## Sprint 11: Observable-state exporter foundation

- Objective: define and implement the safe-state exporter boundary between canonical authoring artifacts, local orchestration records, and published observatory pages.
- Deliverables: observability artifact schemas, visibility policy, redaction rules, exporter inputs and outputs, and build-time snapshot generation from files plus SQLite.
- Validation: the exporter yields the same snapshot set from the same inputs, private-local fields are excluded from public output, and missing lineage is detected rather than silently dropped.
- Exit criteria: release assembly can generate a public-safe observatory data bundle without shipping SQLite.

## Sprint 12: Public observatory routes

- Objective: build the public route family that turns exported observable state into legible static pages.
- Deliverables: the `/observatory/` route family, overview cards, timelines, state tables, and detail pages for sources, experiences, artifacts, releases, runs, queue, failures, and lineage.
- Validation: the public can browse current system state from exported artifacts alone, broken or missing links surface in validation, and routes work in both root-path and repository base-path modes.
- Exit criteria: a static build can explain what the system is making, what is published, what is waiting, and how pieces connect.

## Sprint 13: Maintainer stewardship and governance

- Objective: support deeper maintainer inspection and release storytelling without breaking the public-safe export boundary.
- Deliverables: maintainer-safe expansions of observatory views, release narratives and diffs, queue and failure drill-downs, and documented governance rules for public vs. maintainer state.
- Validation: maintainers can inspect retries, supersessions, and release deltas without reading SQLite directly, while the public build remains safe when richer maintainer data exists.
- Exit criteria: the same production system can present a public workshop view and a deeper maintainer inspection layer from one export model.

## Definition of done for phase 3

Phase 3 is done when:

1. safe observable-state snapshots are derived deterministically from files and local orchestration history
2. the public can browse documents, artifacts, releases, and production progress through static pages
3. maintainers can inspect queue, failure, and lineage state without depending on raw local database access
4. visibility tiers prevent accidental publication of local-only details
5. observability strengthens rather than bypasses QA and release governance
