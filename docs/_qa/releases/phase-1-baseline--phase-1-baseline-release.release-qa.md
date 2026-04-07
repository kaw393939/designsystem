---
schema: qa/v1
qaType: release
targetId: phase-1-baseline--phase-1-baseline-release
targetPath: content/releases/phase-1-baseline-release.json
status: approved
reviewer: github-copilot
createdAt: 2026-04-04T00:00:00Z
outcome: approved
supersedes: null
---

# Educational Design System phase-1-baseline-release Release QA

## Scope

Review the `phase-1-baseline-release` candidate for the `phase-1-baseline` experience and determine whether it is safe to publish.

## Method

Reviewed:

- the release manifest in `content/releases/phase-1-baseline-release.json`
- the selected experience in `content/experiences/phase-1-baseline.json`
- the selected-route registry and approved unit and visual fixtures in `content/registry/site-registry.json`
- the selected-build validation path in `lib/site-release.ts`, `scripts/site.ts`, and `package.json`
- the exported artifact served from `out/` through `npm run preview`
- the selected-release route set through root-path and repository base-path Playwright and Lighthouse runs

Validation completed with these command results:

- `npm run format`: passed and normalized the repository to the configured Prettier policy
- `npm run format:check`: passed
- `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run site:validate`: passed
- `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run typecheck`: passed
- `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run lint`: passed
- `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run test`: passed with `29` tests
- `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release CI=1 npm run test:browser`: passed with `25` browser tests and `1` intentional skip
- `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run lighthouse`: passed for the selected-release route set
- `NEXT_PUBLIC_BASE_PATH=/education_design NEXT_PUBLIC_SITE_URL=https://kaw393939.github.io SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release CI=1 npm run test:browser`: passed with the same `25` browser tests and `1` intentional skip under `/education_design/`
- `NEXT_PUBLIC_BASE_PATH=/education_design NEXT_PUBLIC_SITE_URL=https://kaw393939.github.io SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run lighthouse`: passed for the same Pages-style selected-release routes

## Findings

No blocking findings. The repository now conforms to the configured Prettier policy, and the selected release, exported artifact, browser smoke coverage, and deterministic Lighthouse checks all passed in both root-path and repository base-path modes.

## Assumptions

- This review approved `phase-1-baseline-release` immediately before publication; the manifest now sits in `published` state.
- The current Prettier policy in `package.json` and the deployment spec remains part of the release gate.
- The local Lighthouse runs used the committed `.lighthouserc.js` configuration and the exported `out/` artifact served by `npm run preview`; the missing GitHub token warning during local LHCI runs is not itself a publish blocker.

## Decision

Approved for publish. The release manifest has since been advanced to `published`.

## Required Follow-ups

- Re-run release QA if the selected release contents, quality gates, or formatting policy change materially.

## Lighthouse Evidence

- Exported artifact path: `out/`
- Local server command used to serve the export: `npm run preview`
- Config file used: `.lighthouserc.js`
- Categories gated: `accessibility`, `best-practices`, `seo`
- Thresholds used: `accessibility >= 0.95`, `best-practices >= 0.9`, `seo >= 0.9`, `performance` non-blocking
- Result summary: Lighthouse assertions passed for all `12` selected-release URLs in both root-path and repository base-path modes against the exported static artifact.
