# Educational Design System Operating Runbook

## Purpose

Define the repeatable operating loop for phase-1 development so the team can move quickly without losing rigor.

This runbook is the day-to-day process layer that sits above the architecture specs and below implementation work.

## Process doctrine

1. Specs are written before implementation.
2. Planning artifacts are QA'd before implementation begins.
3. Implementation is QA'd before a sprint is considered done.
4. Releases are validated before they are published.
5. Every gate leaves behind a durable artifact.

## Canonical loop

Use this loop for every meaningful workstream or sprint.

1. Update the active source-of-truth specs in `docs/_specs/educational-design-system/`.
2. Create or update the relevant planning QA artifact under `docs/_qa/planning/`.
3. Review the planning artifact and record findings.
4. Resolve planning issues until the planning QA artifact is approved.
5. Implement the sprint scope.
6. Create or update the relevant implementation QA artifact under `docs/_qa/implementation/`.
7. Review the implementation and record findings.
8. Resolve implementation issues until the implementation QA artifact is approved.
9. If the sprint contributes to a releasable build, create or update release QA under `docs/_qa/releases/`.
10. Publish only after release validation passes.
11. After publication, update the README and index docs and archive any superseded kickoff or repair docs that no longer belong in the active path.

## Deterministic verification rule

When browser-level quality is measured, the measurement must be reproducible enough to act as a gate.

For Lighthouse, that means:

1. audit the exported static site, not the dev server
2. use a committed Lighthouse CI config once implementation exists
3. keep the categories and thresholds identical between local and CI runs
4. gate on stable categories first: accessibility, best-practices, and seo
5. store the result summary in the relevant implementation or release QA artifact

Performance may be tracked as a baseline during phase 1, but it should not become a hard gate until the runtime environment and budgets are stable enough to avoid noisy failures.

## Mandatory gates

### Gate 1: Planning gate

Implementation must not begin until:

- the active spec docs are updated enough to bound the work
- the relevant planning QA artifact exists
- the planning QA artifact is approved or explicitly records no blocking findings

### Gate 2: Implementation gate

A sprint is not done until:

- the implementation exists
- the relevant tests and validations were run
- the implementation QA artifact exists
- the implementation QA artifact is approved or explicitly records no blocking findings

### Gate 3: Release gate

Publishing must not happen until:

- the release manifest is assembled
- release validation passes
- the release QA artifact exists when the build is intended for publication

## Artifact map

### Source-of-truth specs

Live under:

- `docs/_specs/educational-design-system/`

These define what the system is supposed to be.

### Planning QA artifacts

Live under:

- `docs/_qa/planning/specs/`
- `docs/_qa/planning/sprints/`

These verify whether the spec or sprint plan is good enough to implement.

### Implementation QA artifacts

Live under:

- `docs/_qa/implementation/sprints/`

These verify whether the implementation matches the approved planning artifacts.

### Release QA artifacts

Live under:

- `docs/_qa/releases/`

These verify whether a build is safe to publish.

## Default sequence by artifact type

### New or changed core spec

1. edit active spec
2. create spec QA artifact
3. review and resolve findings
4. mark approved

### New or changed sprint

1. edit sprint brief
2. create sprint planning QA artifact
3. review and resolve findings
4. mark approved
5. implement sprint
6. create sprint implementation QA artifact
7. review and resolve findings
8. mark approved

### Release candidate

1. assemble release manifest
2. validate release
3. create release QA artifact
4. resolve findings if needed
5. publish
6. update the repo status docs and archive any superseded kickoff or repair docs

## What an LLM should read first

When working in this repo, an LLM should read in this order:

1. `docs/_specs/README.md`
2. `docs/_specs/educational-design-system/spec.md`
3. `docs/_specs/educational-design-system/operating-runbook.md`
4. `docs/_specs/educational-design-system/planning-qa-spec.md`
5. the relevant domain spec or sprint brief
6. the latest relevant QA artifact under `docs/_qa/`

## Failure modes to prevent

- implementing from an unreviewed spec
- treating chat history as the QA record
- closing a sprint because code exists without a QA artifact
- publishing a release without release validation
- letting `_specs/` accumulate superseded planning docs instead of archiving them

## Acceptance criteria

- The process defines a single repeatable loop from planning through release.
- The loop produces durable QA artifacts at each gate.
- An LLM can determine what to read, what to update, and what must be approved before moving forward.
