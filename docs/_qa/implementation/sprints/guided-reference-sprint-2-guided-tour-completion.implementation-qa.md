---
schema: qa/v1
qaType: sprint-implementation
targetId: guided-reference-sprint-2-guided-tour-completion
targetPath: docs/_specs/guided-reference-site-refactor/sprints/guided-reference-sprint-2-guided-tour-completion.md
status: approved
reviewer: github-copilot
createdAt: 2026-04-07T19:12:36Z
outcome: approved
supersedes: null
---

# Guided Reference Sprint 2 Guided Tour Completion Implementation QA

## Scope

Review the Sprint 2 implementation for the canonical `/tour/*` route chain, shared guided-step metadata and tour-record progression, migration handling for the former flat handoff routes, and the focused validation promised by the Sprint 2 brief.

## Method

Reviewed:

- `app/page.tsx`
- `app/tour/page.tsx`
- `app/tour/signal/page.tsx`
- `app/tour/archetype/page.tsx`
- `app/tour/style/page.tsx`
- `app/tour/proof/page.tsx`
- `app/tour/build/page.tsx`
- `app/tour/publish/page.tsx`
- `app/playbook/page.tsx`
- `app/workbook/page.tsx`
- `app/deliverables/page.tsx`
- `components/guided-step-shell.tsx`
- `components/tour-record-panel.tsx`
- `content/registry/site-registry.json`
- `content/experiences/identity-portfolio-system.json`
- `content/releases/identity-portfolio-system-proof-release.json`
- `lib/site-navigation.ts`
- `tests/browser/homepage.spec.ts`
- `tests/browser/site-release.spec.ts`
- `tests/unit/guided-step-shell.test.tsx`
- `tests/unit/tour-record-panel.test.tsx`
- `tests/unit/site-navigation.test.ts`
- `tests/unit/site-release.test.ts`

Checked the implementation against the Sprint 2 brief for:

- six canonical guided routes under `/tour/*` with one dominant job, prerequisite, output, misconception, formative check, and next move
- progressive tour-record presentation that highlights the field owned by the current step
- migration handling that keeps `/playbook`, `/workbook`, and `/deliverables` reachable while clearly demoting them to legacy continuity routes
- canonical start and resume entry points from the lobby to `/tour/signal` and `/tour/build`
- family-level navigation behavior that still treats the guided tour as one coherent route family rather than six disconnected pages

Validation completed with these command results:

- `npm run test -- tests/unit/layout-primitives.test.tsx tests/unit/tour-record-panel.test.tsx tests/unit/guided-step-shell.test.tsx tests/unit/site-navigation.test.ts tests/unit/site-release.test.ts`: passed with `5` files and `16` tests
- `npm run test:browser -- tests/browser/homepage.spec.ts tests/browser/site-release.spec.ts tests/browser/experience-proof.spec.ts`: passed with `16` tests and `4` skipped checks across desktop and mobile, including the homepage entry points, the tour family landing, all six canonical guided steps, the legacy flat-route wrappers, the examples routes, the selected-release sitemap contract, and the release-aware parked-route behavior; this suite ran against the exported preview via Playwright `webServer`
- `npm run typecheck && echo TYPECHECK_OK`: passed and printed `TYPECHECK_OK`
- verified the selected-release registry, experience navigation, active release fixture, and selected-build derivation in `lib/site-release.ts` to confirm that sitemap and audit output now expose the canonical Sprint 2 route-family surface instead of the older proof-route topology

## Findings

No blocking findings.

## Assumptions

- The current guided-tour record remains a visible teaching exemplar and route-level contract, not a user-persistent state system.
- `/tour/page.tsx` remains acceptable as a family landing and route map so long as `/tour/signal` is the canonical first guided lesson route.
- The legacy flat routes may remain in place for continuity during later browse, examples, and redirect hardening work as long as they keep exposing the canonical `/tour/*` path explicitly.
- The selected release may continue to include the older `experience-identity-portfolio*` proof routes for availability and proof-specific browser coverage, but those routes should remain out of sitemap output while the root route-family IA is the canonical public surface.

## Decision

Approved.

## Required Follow-ups

- Keep `content/registry/site-registry.json`, `content/experiences/identity-portfolio-system.json`, and `content/releases/identity-portfolio-system-proof-release.json` aligned whenever future sprints change the canonical route-family IA, so sitemap and audit output do not drift behind the UI again.
- If the older `experience-identity-portfolio*` proof routes become a separately promoted surface later, split them into a dedicated release fixture rather than reintroducing them into the root-site sitemap by accident.
- Revisit browse-room return links and examples-family handoffs during Sprint 3 so the canonical guided steps remain the consistent return target across all optional-depth surfaces.