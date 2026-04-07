---
schema: qa/v1
qaType: sprint-implementation
targetId: sprint-5-static-export
targetPath: docs/_specs/educational-design-system/sprints/sprint-5-static-export.md
status: approved
reviewer: github-copilot
createdAt: 2026-04-04T00:00:00Z
outcome: approved
supersedes: null
---

# Sprint 5 Static Export and GitHub Pages Hardening Implementation QA

## Scope

Review the Sprint 5 implementation for the first explicit selected-release export path, including checked-in experience and release fixtures, typed selection validation, selected navigation and sitemap derivation, export-safe CI wiring, and deterministic exported-site QA in both root-path and GitHub Pages-style base-path modes.

## Method

Reviewed:

- the checked-in route, approved-unit, and approved-visual registry in `content/registry/site-registry.json`
- the checked-in experience fixture in `content/experiences/phase-1-baseline.json`
- the checked-in baseline and reduced-navigation release fixtures in `content/releases/phase-1-baseline-release.json` and `content/releases/phase-1-compact-release.json`
- the typed selection, schema validation, workflow validation, and selected-build derivation layer in `lib/site-release.ts`
- the narrow typed CLI in `scripts/site.ts` and its package-script wiring in `package.json`
- the selected-release metadata, primary navigation, and sitemap integration in `app/layout.tsx`, `components/site-header.tsx`, and `app/sitemap.ts`
- the selected-release Lighthouse route derivation in `.lighthouserc.js`
- the CI and Pages workflow updates in `.github/workflows/quality.yml` and `.github/workflows/deploy-pages.yml`
- the Sprint 5 app-surface copy and status updates that describe the selected export path
- unit coverage for baseline selection, reduced-navigation selection, missing required units, unresolved visuals, and unapproved visuals
- browser coverage proving that the selected release drives primary navigation and sitemap output while the existing guide and exemplar routes still render under exported output

Validation completed with these command results:

- `npm run site:validate`: passed
- `npm run typecheck`: passed
- `npm run lint`: passed
- `npm run test`: passed with `28` tests covering the existing baseline plus selected-release validation, unresolved-reference failures, unapproved-reference failures, and the existing recipe and layout regressions
- `CI=1 npm run test:browser`: passed with `20` browser tests on desktop and mobile projects against `/`, `/process/`, `/status/`, `/tokens/`, `/layouts/`, `/primitives/`, `/recipes/`, `/recipes/feedback-loops/`, `/recipes/public-space-observation/`, `/examples/module/`, `/examples/lesson/`, and `/examples/reading-map/`
- `npm run lighthouse`: passed for the same root-path selected-release routes using `.lighthouserc.js`
- `NEXT_PUBLIC_BASE_PATH=/education_design NEXT_PUBLIC_SITE_URL=https://kaw393939.github.io SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release CI=1 npm run test:browser`: passed for the same routes under `/education_design/`
- `NEXT_PUBLIC_BASE_PATH=/education_design NEXT_PUBLIC_SITE_URL=https://kaw393939.github.io SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run lighthouse`: passed for the same Pages-style selected-release routes using `.lighthouserc.js`

## Findings

No blocking findings.

## Assumptions

- The checked-in experience and release fixtures remain the intentionally narrow Sprint 5 proof boundary, not the full future publishing library.
- `SITE_EXPERIENCE_ID` and `SITE_RELEASE_ID` remain explicit build inputs in local QA and CI until broader release selection and authoring workflows exist.
- Release QA remains a separate gate before describing any selected release as publishable.

## Decision

Approved.

## Required Follow-ups

- Keep primary navigation, sitemap output, and Lighthouse route scope derived from the same selected release so build proof does not drift across tools.
- Preserve hard validation for missing, unresolved, or unapproved unit and visual references when additional releases or experiences are introduced.
- Extend this checked-in fixture proof into the later file-based approved-unit and release-manifest workflow rather than reintroducing implicit latest-content selection.
