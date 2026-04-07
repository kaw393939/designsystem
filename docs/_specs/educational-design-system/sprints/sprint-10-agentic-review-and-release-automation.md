# Sprint 10: Agentic Review and Release Automation

## Goal

Complete phase 2 by formalizing release-candidate assembly, review-role orchestration, release diffing, and explicit release promotion on top of the file-backed unit, visual, and experience workflow introduced through Sprint 9.

## Phase Boundary

Sprint 10 should produce observability-ready release evidence, but it should not implement the full observable-state exporter or public observatory routes. That boundary now belongs to phase 3.

## Scope

1. Add the first typed release workflow commands for candidate assembly with explicit release ids, review request, role-scoped review capture, diffing, approval, publish, and release history.
2. Materialize append-only release review evidence so release approval is backed by explicit review artifacts instead of terminal memory or ad hoc notes.
3. Orchestrate bounded review-role passes for release readiness across roles such as editorial, pedagogy, accuracy, accessibility, visual, and release.
4. Add explicit release diff models that compare route, unit, visual, and manifest-level changes between two releases.
5. Extend the orchestration ledger so assemble, review, diff, approve, publish, retry, and supersession flows leave durable run and event history.
6. Keep publish and promotion helpers file-first, static-export-safe, and gated by explicit QA rather than implicit latest-content behavior.
7. Emit structured release and run summaries that phase 3 can later export safely without requiring Sprint 10 to ship observatory bundles.

## Deliverables

- `sprint-10-agentic-review-and-release-automation.md`
- typed release workflow helpers for assemble, request-review, review, diff, approve, publish, and history behavior
- append-only release review storage conventions and at least one checked-in release-review proof artifact
- explicit approval and publish gating that requires the release QA artifact for the exact target release id
- release diff output suitable for human review and later structured export
- release-promotion helpers that can advance a reviewed release to `published` and mark prior live manifests as `superseded`
- richer orchestration events for multi-step release workflows, retries, and blocked promotions
- focused tests for release lifecycle transitions, diff accuracy, approval gating, supersession, and retryability

## Work Checklist

1. Keep release manifests immutable once written; any material release change should produce a new manifest with explicit supersession.
2. Treat release review as append-only evidence with declared reviewer roles and explicit outcomes.
3. Require explicit release targets for assemble, request-review, diff, approve, and publish operations; `assemble` must declare the new release id up front.
4. Compare normalized route ids, unit references, visual references, and status transitions in release diffs instead of relying on prose-only summaries.
5. Record multi-step release workflows in durable orchestration history so failures and retries remain inspectable.
6. Keep approval explicit; no approve or publish helper may succeed without an approved release QA artifact for the exact target release id, and no publish helper may silently treat `assembled`, `review_requested`, or `changes_requested` as publishable.
7. Preserve observability-forward structure in diff summaries, run details, and review evidence so Sprint 11 can export them without scraping terminal output.
8. Leave phase-3 exporter and public observatory routes out of scope.

## Positive Tests

- `site release assemble <experience-id> --release <release-id>` creates a candidate manifest from one explicit experience context using only approved unit and visual references.
- `site release request-review <release-id>` moves an assembled candidate into `review_requested` before role-scoped review evidence is recorded.
- `site release diff` makes route, unit, and visual changes visible between two manifests, including version-reference changes for the same artifact id.
- release review orchestration writes append-only release review evidence for the required roles and blocks approval until required evidence exists.
- `site release approve <release-id>` succeeds only when release validation, an approved release QA artifact, and explicit review evidence all pass.
- `site release publish` can promote one approved release and mark the prior published manifest for that same experience as `superseded` without mutating the old manifest in place.
- failed assemble, review, or publish operations remain inspectable and retryable through orchestration history.

## Negative Tests

- no release may publish directly from `assembled`, `review_requested`, or `changes_requested`
- no release may reach `approved` or `published` without an approved release QA artifact for that exact release id
- no release diff may silently hide changed unit or visual references behind the same artifact id
- no release workflow may bypass selected-release validation, release QA, or explicit approval state
- no assemble helper may silently invent, reuse, or overwrite a release id instead of requiring one explicitly
- no publish helper may mutate an already published manifest in place instead of creating explicit supersession
- no Sprint 10 implementation may require public observatory bundles, runtime SQLite access, or live dashboard infrastructure

## Edge-Case Checks

- diffing two releases that reference the same unit id but different `unit-id@version` values
- diffing two releases with unchanged routes but changed visuals
- assembling a release while fixture-backed and file-backed approved references still coexist during migration
- assembling a release with a release id that already exists
- retrying a blocked publish after a lock conflict or partially completed orchestration run
- promoting a new published release when one prior published release already exists for the same experience

## Accessibility Checks

- release diff output remains legible in plain text and does not rely on color alone to communicate added, removed, or changed state
- release review evidence explains blockers and requested next steps clearly enough for maintainers to act without reading raw logs
- local CLI output for release assembly, diffing, review, and publish remains terminal-readable and inspectable

## Export and Deploy Checks

- selected-release build and validation remain explicit about both experience and release selection
- release approval and publish remain gated by the checked-in release QA artifact for the exact release candidate being promoted
- release promotion must preserve root-path and repository base-path QA as mandatory publish gates
- structured release and run summaries remain build-time artifacts only and do not introduce runtime mutability into the published site

## Out of Scope

- phase-3 observable-state exporter implementation
- public observatory routes and maintainer-only observatory UI
- multi-user approval systems, remote orchestration services, or runtime admin dashboards
- automated release storytelling beyond the diff, review, and promotion evidence needed to hand work forward to phase 3

## Exit Criteria

Sprint 10 is done when the repo can assemble a named release candidate from approved artifacts, diff it against another release, record explicit release-review evidence, require an approved release QA artifact before approval and publish, promote a reviewed release through a durable local workflow, supersede an older published release explicitly, and preserve enough structured history that phase 3 observability work can consume it later without redesigning the phase-2 release model.
