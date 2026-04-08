---
schema: qa/v1
qaType: sprint-planning
targetId: guided-reference-sprint-3-browse-and-examples-families
targetPath: docs/_specs/guided-reference-site-refactor/sprints/guided-reference-sprint-3-browse-and-examples-families.md
status: approved
reviewer: github-copilot
createdAt: 2026-04-07T00:00:00Z
outcome: approved
supersedes: null
---

# Guided Reference Sprint 3 Browse and Examples Families Planning QA

## Scope

Review the Sprint 3 brief to confirm the browse-reference and examples-family work is bounded, testable, and ready to implement on top of the approved Sprint 2 guided-tour baseline.

## Method

Reviewed the sprint brief against:

- `docs/_specs/guided-reference-site-refactor/spec.md`
- `docs/_specs/guided-reference-site-refactor/page-jobs.md`
- `docs/_specs/guided-reference-site-refactor/content-doctrine.md`
- `docs/_specs/guided-reference-site-refactor/decision-rubrics.md`
- `docs/_specs/guided-reference-site-refactor/migration-plan.md`
- `docs/_specs/guided-reference-site-refactor/implementation-workstreams.md`
- `docs/_specs/guided-reference-site-refactor/sprints/guided-reference-sprint-2-guided-tour-completion.md`
- `docs/_qa/implementation/sprints/guided-reference-sprint-2-guided-tour-completion.implementation-qa.md`

Checked for:

- alignment with the canonical browse-reference and examples-family contracts in `page-jobs.md`
- room-template and density discipline that treats browse rooms as curated optional depth rather than alternate first-time entry points
- explicit curatorial room budgets for browse rooms, source rooms, and examples routes so Sprint 3 cannot drift into panel sprawl
- explicit object hierarchy rules that distinguish hero objects, supporting objects, and reference objects inside the new family routes
- explicit quote, evidence-card, and object-label discipline so supporting devices sharpen interpretation instead of adding ornamental density
- explicit return-to-tour and step-ownership rules for browse rooms and examples surfaces
- an explicit split between outcome-proof examples and structural or primitive examples so the examples family does not flatten unlike jobs into one surface
- minimum continuity handling for legacy deep links such as `/archetypes/[slug]` so preserved deep routes do not remain ungoverned
- bounded migration handling for `/archetypes`, `/design-styles`, `/persuasion`, and `/hero-examples` so legacy routes stop competing with the canonical family model
- sufficient testing and validation requirements for family classification, return-path clarity, legacy deep-link continuity, and release-aware route metadata for any new canonical support routes added during the sprint
- bounded scope that avoids prematurely pulling instructor cleanup, support-route cleanup, or redirect hardening into the same sprint

## Findings

No blocking findings.

## Assumptions

- Sprint 3 may preserve `/archetypes`, `/design-styles`, `/persuasion`, and `/hero-examples` as temporary aliases, wrappers, or extracted-source continuity routes so long as the canonical family destinations are clearly under `/browse/*` and `/examples/*`.
- The existing structural examples under `/examples/module`, `/examples/lesson`, and `/examples/reading-map` may remain in place as secondary proof surfaces so long as the main examples family clearly distinguishes them from outcome-proof routes.
- Sprint 3 does not need to rewrite the instructor guide or support routes beyond the links required to keep browse and examples handoffs coherent.

## Decision

Approved for implementation.

## Required Follow-ups

- Create `guided-reference-sprint-3-browse-and-examples-families.implementation-qa.md` once the canonical browse and examples routes, continuity handling, and validation evidence exist.
- Record explicit browser evidence for browse-room classification, return-to-tour behavior, legacy deep-link continuity, and examples-to-tour handoffs.
- Keep release-aware route metadata and sitemap validation in the implementation QA for every canonical `/browse/*` or `/examples/*` subroute added during the sprint.
