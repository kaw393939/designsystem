---
schema: qa/v1
qaType: sprint-implementation
targetId: sprint-6-quality-gates
targetPath: docs/_specs/educational-design-system/sprints/sprint-6-quality-gates.md
status: approved
reviewer: github-copilot
createdAt: 2026-04-04T00:00:00Z
outcome: approved
supersedes: null
---

# Sprint 6 QA, Accessibility, and Baseline Proof Implementation QA

## Scope

Review the Sprint 6 implementation for accessibility-proof and baseline-locking work on top of the approved Sprint 5 selected-release export path, including automated accessibility audits, keyboard-focus fixes, reduced-motion and high-contrast-state coverage, maintainers' verification documentation, and deterministic validation in both root-path and GitHub Pages-style base-path modes.

## Method

Reviewed:

- the shared accessibility fixes in `components/page-shell.tsx`, `components/section-heading.tsx`, and `components/educational-primitives.tsx`
- the shared token and media-query updates in `app/globals.css`, including stronger signal and muted text contrast plus forced-colors handling alongside existing reduced-motion and prefers-contrast rules
- the expanded unit coverage in `tests/unit/layout-primitives.test.tsx`, `tests/unit/section-heading.test.tsx`, and `tests/unit/educational-primitives.test.tsx`
- the new browser accessibility coverage in `tests/browser/accessibility.spec.ts`, including representative-route axe audits, skip-link focus, reduced-motion checks, and forced-colors checks on the longest lesson flow
- the existing browser suites proving guide routes, exemplar routes, selected-release routing, and layout behavior still pass alongside the new accessibility checks
- the maintainer verification routine documented in `docs/_specs/educational-design-system/deployment.md`
- the app-surface status updates in `app/page.tsx`, `app/process/page.tsx`, `components/site-footer.tsx`, and `lib/site-content.ts`

Validation completed with these command results:

- `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run site:validate`: passed
- `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run typecheck`: passed
- `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run lint`: passed
- `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run test`: passed with `29` tests covering the existing baseline plus page-shell focusability, configurable top-level section headings, and non-landmark editorial asides
- `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release CI=1 npm run test:browser`: passed with `25` browser tests and `1` intentional skip, where the axe audit runs once on the desktop baseline while the remaining accessibility, guide-route, exemplar-route, and selected-release checks run across desktop and mobile projects
- `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run lighthouse`: passed for the selected-release route set using `.lighthouserc.js`
- `NEXT_PUBLIC_BASE_PATH=/education_design NEXT_PUBLIC_SITE_URL=https://kaw393939.github.io SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release CI=1 npm run test:browser`: passed with the same `25` browser tests and `1` intentional skip under `/education_design/`
- `NEXT_PUBLIC_BASE_PATH=/education_design NEXT_PUBLIC_SITE_URL=https://kaw393939.github.io SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run lighthouse`: passed for the same Pages-style selected-release routes using `.lighthouserc.js`

Accessibility follow-up list:

- No blocking accessibility findings remain in the current phase-1 baseline after making the skip-link target focusable, restoring page-level `h1` coverage on top-level routes that relied on `SectionHeading`, increasing shared signal and muted-text contrast, and removing the nested complementary landmark from `EditorialAside`.
- Automated high-contrast proof currently runs through `forced-colors: active` in browser automation, while the CSS baseline also retains `prefers-contrast: more` handling for environments that expose that media query directly.

## Findings

No blocking findings.

## Assumptions

- Sprint 6 locks the current phase-1 selected-release baseline and its verification routine, not a publishable release candidate.
- The representative-route axe audit is intentionally executed once on the desktop project because the accessibility violations it targets are structural and route-level, while mobile-specific behavior remains covered by the rest of the browser suite.
- Release QA remains a separate gate before describing `phase-1-baseline-release` as publishable.

## Decision

Approved.

## Required Follow-ups

- Keep the representative-route accessibility audit list aligned with the routes that define the current public baseline.
- Re-run the contrast and landmark audit whenever new panel tones, long-form guide routes, or complementary-callout patterns are introduced.
- Create release QA before treating the current selected release as publication-ready.
