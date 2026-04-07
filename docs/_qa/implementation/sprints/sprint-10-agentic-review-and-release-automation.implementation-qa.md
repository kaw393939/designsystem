# Sprint 10 Implementation QA

## Scope

Sprint 10 is now implemented as a file-backed release workflow layer that adds:

- explicit `site release ...` commands for assembly, review, diff, approval, publish, and history
- candidate release support for `assembled`, `review_requested`, and `changes_requested` states without breaking selected-build gating
- append-only release review records under `content/reviews/releases/`
- release approval and publish guards that require an approved checked-in release QA artifact for the exact release target
- release diff and history summaries suitable for later observable-state export

The default selected build path remains restricted to approved or published releases.

## Implemented Artifacts

### Release workflow code

- `lib/release-workflow.ts`
- `lib/site-release.ts`
- `scripts/site.ts`

### Release workflow tests

- `tests/unit/release-workflow.test.ts`

### Checked-in proof artifact

- `content/reviews/releases/review-identity-portfolio-system-proof-release-release.md`

## QA Evidence

### Focused Sprint 10 workflow tests

Command:

```bash
npm test -- --run tests/unit/release-workflow.test.ts
```

Result:

- passed
- `1` file
- `3` tests
- verified candidate assembly, changes-requested review transition, QA-gated approval, diffing, publish, and supersession behavior in temp workspaces

### Static validation and full unit suite

Commands:

```bash
npm run typecheck
npm run lint
npm run site:validate
npm test
```

Result:

- typecheck passed
- lint passed
- schema validation passed
- workflow validation passed
- default release validation passed for `phase-1-baseline-release`
- default visual validation passed for `phase-1-baseline-release`
- full unit suite passed
- `15` files
- `63` tests

### Non-mutating release CLI smoke checks

Commands:

```bash
npm run site -- release list
npm run site -- release diff phase-1-baseline-release phase-1-compact-release
```

Result:

- `release list` passed and reported all checked-in releases with status, QA status, review-role summary, route count, unit count, visual count, and supersession metadata
- `release diff` passed and reported the expected status change from `published` to `approved` plus the six routes removed by `phase-1-compact-release`

## Key Integration Fixes Verified

- `lib/site-release.ts` now distinguishes repository-valid candidate releases from selected-build-valid publishable releases.
- `scripts/site.ts` now exposes the planned Sprint 10 release command surface while keeping mutating operations tracked through orchestration runs.
- `lib/release-workflow.ts` writes deterministic release manifests and append-only release review records, enforces QA gates on approval and publish, and supersedes prior published releases for the same experience.
- Release validation and visual validation can now inspect candidate releases through `allowCandidateRelease: true` without weakening the baseline build/export gate.

## Residual Notes

- Browser and Lighthouse suites were not re-run for Sprint 10 because this sprint changes release orchestration and validation behavior rather than route rendering, asset generation, or export markup.
- Mutating release lifecycle operations are covered through temp-workspace unit tests rather than against the checked-in repository so the workspace stays stable.

## Conclusion

Sprint 10 now satisfies its implementation goal: named candidate releases can be assembled from checked-in experience/unit/visual state, reviewed through append-only release-review artifacts, compared through deterministic diffs, and promoted only when both structured review roles and an approved release QA artifact are present, while the selected site runtime remains gated to approved or published releases.