---
schema: qa/v1
qaType: sprint-planning
targetId: guided-reference-sprint-4-instructor-support-cleanup-and-release-hardening
targetPath: docs/_specs/guided-reference-site-refactor/sprints/guided-reference-sprint-4-instructor-support-cleanup-and-release-hardening.md
status: approved
reviewer: github-copilot
createdAt: 2026-04-07T19:54:57Z
outcome: approved
supersedes: null
---

# Guided Reference Sprint 4 Instructor Support Cleanup and Release Hardening Planning QA

## Scope

Review the Sprint 4 brief to confirm the instructor alignment, support-route cleanup, continuity policy, and release-hardening work is bounded, testable, and grounded in the now-complete Sprint 3 route-family baseline.

## Method

Reviewed the sprint brief against:

- `docs/_specs/guided-reference-site-refactor/spec.md`
- `docs/_specs/guided-reference-site-refactor/page-jobs.md`
- `docs/_specs/guided-reference-site-refactor/content-doctrine.md`
- `docs/_specs/guided-reference-site-refactor/decision-rubrics.md`
- `docs/_specs/guided-reference-site-refactor/migration-plan.md`
- `docs/_specs/guided-reference-site-refactor/implementation-workstreams.md`
- `docs/_specs/guided-reference-site-refactor/sprints/guided-reference-sprint-3-browse-and-examples-families.md`
- `docs/_qa/implementation/sprints/guided-reference-sprint-3-browse-and-examples-families.implementation-qa.md`
- `app/instructor-guide/page.tsx`
- `content/registry/site-registry.json`
- `content/experiences/identity-portfolio-system.json`
- `content/releases/identity-portfolio-system-proof-release.json`
- `next.config.ts`

Checked for:

- alignment with the post-Sprint-3 baseline in which `/tour/*`, `/browse/*`, and `/examples/*` are already canonical
- explicit treatment of the instructor guide as a wrapper around canonical route-family outputs rather than as a parallel curriculum
- explicit treatment of `/recipes`, `/layouts`, `/tokens`, `/process`, and `/status` as support surfaces that must stop competing with the main student path
- a route-by-route continuity policy for legacy flat and deep-link surfaces without pretending the static-export stack can guarantee runtime redirects everywhere
- explicit release, registry, and sitemap hardening requirements for the mixed selected-release state that still includes older `experience-identity-portfolio*` proof routes
- bounded scope that avoids reopening the canonical guided-tour, browse, or examples IA work already completed in Sprints 1 through 3

## Findings

No blocking findings.

## Assumptions

- Some legacy routes may remain explicit continuity wrappers rather than true HTTP redirects because the site currently uses static export.
- Older `experience-identity-portfolio*` proof routes may remain selected if their non-public role stays explicit, or they may move into a separate release fixture during Sprint 4 if that produces a cleaner public IA.
- Support routes may remain reachable and even selected so long as their support-only role becomes obvious and they stop behaving like alternate public entry points.

## Decision

Approved for implementation.

## Required Follow-ups

- Create `guided-reference-sprint-4-instructor-support-cleanup-and-release-hardening.implementation-qa.md` once the instructor wrapper, support-route cleanup, continuity policy, and release-hardening evidence exist.
- Record explicit browser evidence for instructor handoffs, support-route classification, continuity behavior, and the first-click, five-second, resume-path, and return-path checks named in the brief.
- If Sprint 4 changes whether older `experience-identity-portfolio*` proof routes remain in the active release, capture that decision explicitly in release notes and QA rather than leaving it implicit in route selection.
