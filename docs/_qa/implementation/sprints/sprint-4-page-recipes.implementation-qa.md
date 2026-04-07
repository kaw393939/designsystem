---
schema: qa/v1
qaType: sprint-implementation
targetId: sprint-4-page-recipes
targetPath: docs/_specs/educational-design-system/sprints/sprint-4-page-recipes.md
status: approved
reviewer: github-copilot
createdAt: 2026-04-04T00:00:00Z
outcome: approved
supersedes: null
---

# Sprint 4 Page Recipes Implementation QA

## Scope

Review the Sprint 4 implementation for typed recipe validation, checked-in approved unit fixtures, dedicated exemplar routes, and exported-site proof expected by the approved planning artifact, including the follow-up fixes for stricter order enforcement and content-first mobile reading flow.

## Method

Reviewed:

- the typed recipe-contract and validation layer in `lib/page-recipes.ts`, including occurrence-aware ordered-block enforcement for repeated required block types
- the checked-in approved lesson and concept unit fixtures in `lib/recipe-exemplar-content.ts`
- the reusable route wrapper in `components/recipe-exemplar-page.tsx`
- the lesson shell ordering in `components/lesson-shell.tsx` so exemplar pages keep orientation before navigation on smaller viewports
- the build cleanup in `scripts/clean-next.mjs` so export-based QA runs against a fresh `out/` artifact rather than stale static files
- the new `/recipes/`, `/recipes/feedback-loops/`, and `/recipes/public-space-observation/` routes
- homepage, navigation, footer, status, and Lighthouse-route updates that surface the Sprint 4 baseline
- unit coverage for passing recipe validation, missing-block failures, repeated required-block counts, duplicated out-of-order required blocks, and derived local navigation
- browser coverage for the recipes guide, both dedicated exemplar routes, and mobile content-first ordering ahead of local navigation

Validation completed with these command results:

- `npm run typecheck`: passed
- `npm run lint`: passed
- `npm run test`: passed with `23` tests covering the existing baseline plus the stricter recipe-validation and layout-order coverage
- `CI=1 npm run test:browser`: passed on desktop and mobile projects against `/`, `/process/`, `/status/`, `/tokens/`, `/layouts/`, `/primitives/`, `/recipes/`, `/recipes/feedback-loops/`, `/recipes/public-space-observation/`, `/examples/module/`, `/examples/lesson/`, and `/examples/reading-map/`
- `npm run lighthouse`: passed for the same root-path routes using `.lighthouserc.js`
- `NEXT_PUBLIC_BASE_PATH=/education_design NEXT_PUBLIC_SITE_URL=https://kaw393939.github.io CI=1 npm run test:browser`: passed for the same routes under `/education_design/`
- `NEXT_PUBLIC_BASE_PATH=/education_design NEXT_PUBLIC_SITE_URL=https://kaw393939.github.io npm run lighthouse`: passed for the same Pages-style routes using `.lighthouserc.js`

## Findings

No blocking findings after the follow-up fixes for stricter recipe-order validation, content-first mobile exemplar layout, and clean export rebuilds before Lighthouse.

## Assumptions

- Checked-in approved unit fixtures remain the correct Sprint 4 stand-in for the future file-based `UnitVersion` and release-manifest workflow.
- The `/recipes/` route is an implementation guide, while `/recipes/feedback-loops/` and `/recipes/public-space-observation/` are the actual exemplar proof pages.
- Future exemplar routes should reuse the same validator path rather than introducing ad hoc route-only composition.

## Decision

Approved.

## Required Follow-ups

- Reuse the typed recipe validator as the default gate for any future exemplar-page route.
- Keep Playwright and Lighthouse coverage aligned when new recipe routes are added.
- Keep export-based QA anchored to a clean `out/` build artifact before preview and Lighthouse runs.
- Replace checked-in approved fixtures with file-based approved unit artifacts once the release-manifest workflow is implemented.
