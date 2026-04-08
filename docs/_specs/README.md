# Specs Index

## Purpose

This folder contains the active specification set for the educational design system and its publishing workflow.

The repository-level entrypoint for new maintainers or external LLMs is `README.md` at the repo root. This file is the spec index once that higher-level context has been read.

The current phase-1 baseline release is `phase-1-baseline-release`, which is now published. Phase 2 implementation is active through the phase-2 sprint plan, the agentic orchestration spec, the completed Sprint 8 source-to-unit workflow implementation, the approved Sprint 9 planning brief for multi-experience assembly and visual workflow, the checked-in Sprint 8 planning chain under `content/`, and the explicit file-backed selected-unit compatibility path. Phase-3 observability planning is now locked through the phase-3 sprint plan and the observable-state spec.

The goal of this index is to make the doc hierarchy explicit so a human or an LLM can tell:

1. which docs are authoritative
2. which docs are supporting references
3. which docs are historical and archived

## Source of truth

For active planning and implementation, treat these documents as authoritative in this order:

1. `educational-design-system/spec.md`
2. `educational-design-system/operating-runbook.md`
3. `identity-portfolio-redesign/spec.md` for the current identity-site rewrite
4. `identity-portfolio-redesign/page-jobs.md`
5. `identity-portfolio-redesign/content-doctrine.md`
6. `identity-portfolio-redesign/migration-plan.md`
7. `identity-portfolio-redesign/homepage-section-inventory.md`
8. `guided-reference-site-refactor/README.md` for the current guided-tour plus browse-reference site refactor
9. `guided-reference-site-refactor/spec.md`
10. `guided-reference-site-refactor/page-jobs.md`
11. `guided-reference-site-refactor/content-doctrine.md`
12. `guided-reference-site-refactor/decision-rubrics.md`
13. `guided-reference-site-refactor/migration-plan.md`
14. `guided-reference-site-refactor/implementation-workstreams.md`
15. `guided-reference-site-refactor/sprints/guided-reference-sprint-1-entry-and-tour-foundation.md`
16. `guided-reference-site-refactor/sprints/guided-reference-sprint-2-guided-tour-completion.md`
17. `guided-reference-site-refactor/sprints/guided-reference-sprint-3-browse-and-examples-families.md`
18. `guided-reference-site-refactor/sprints/guided-reference-sprint-4-instructor-support-cleanup-and-release-hardening.md`
19. `educational-design-system/phase-2-sprint-plan.md`
20. `educational-design-system/phase-3-sprint-plan.md`
21. `educational-design-system/planning-qa-spec.md`
22. `bseai-content-production/README.md`, `bseai-content-production/operating-runbook.md`, and `bseai-content-production/first-content-checklist.md` for the pre-implementation BSEAI content system
23. the active domain specs under `educational-design-system/`
24. `educational-design-system/phase-1-sprint-plan.md` for published-baseline context
25. the detailed sprint briefs under `educational-design-system/sprints/`

Archived materials under `_archive/` are historical context only.

## Recommended reading order

1. `educational-design-system/spec.md`
2. `educational-design-system/operating-runbook.md`
3. `identity-portfolio-redesign/README.md`
4. `identity-portfolio-redesign/spec.md`
5. `identity-portfolio-redesign/page-jobs.md`
6. `identity-portfolio-redesign/content-doctrine.md`
7. `identity-portfolio-redesign/migration-plan.md`
8. `identity-portfolio-redesign/homepage-section-inventory.md`
9. `guided-reference-site-refactor/README.md`
10. `guided-reference-site-refactor/spec.md`
11. `guided-reference-site-refactor/page-jobs.md`
12. `guided-reference-site-refactor/content-doctrine.md`
13. `guided-reference-site-refactor/decision-rubrics.md`
14. `guided-reference-site-refactor/migration-plan.md`
15. `guided-reference-site-refactor/implementation-workstreams.md`
16. `guided-reference-site-refactor/sprints/guided-reference-sprint-1-entry-and-tour-foundation.md`
17. `guided-reference-site-refactor/sprints/guided-reference-sprint-2-guided-tour-completion.md`
18. `guided-reference-site-refactor/sprints/guided-reference-sprint-3-browse-and-examples-families.md`
19. `guided-reference-site-refactor/sprints/guided-reference-sprint-4-instructor-support-cleanup-and-release-hardening.md`
20. `../_research/identity-system-core.md`
21. `../_research/identity-system-student-handout.md`
22. `../_research/identity-system-maintainer-doctrine.md`
23. `../_research/identity.md`
24. `../_research/mysystem.md`
25. `../_research/books/transcripts/the-hero-and-the-outlaw/source-brief.md`
26. `../_projects/identity-first-site/project-brief.md`
27. `../_projects/identity-first-site/archetype-gallery.md`
28. `../_projects/identity-first-site/visual-design-literacy-gallery.md`
29. `../_projects/identity-first-site/psychology-attention-persuasion-gallery.md`
30. `../_projects/identity-first-site/multimedia-delivery-strategy.md`
31. `../_projects/bseaid-degree/qa-reviews/03-curatorial-editorial-experience-review.md`
32. `../_projects/bseaid-degree/qa-reviews/04-brand-identity-systems-review.md`
33. `../_projects/bseaid-degree/qa-reviews/06-accessibility-inclusive-design-review.md`
34. `../_projects/bseaid-degree/qa-reviews/09-ux-student-journey-review.md`
35. `../_projects/bseaid-degree/qa-reviews/13-synthesis-action-plan.md`
36. `educational-design-system/phase-2-sprint-plan.md`
37. `educational-design-system/phase-3-sprint-plan.md`
38. `educational-design-system/planning-qa-spec.md`
39. `bseai-content-production/README.md`
40. `bseai-content-production/operating-runbook.md`
41. `bseai-content-production/first-content-checklist.md`
42. `educational-design-system/content-schema.md`
43. `educational-design-system/workflow-state-machine.md`
44. `educational-design-system/agentic-orchestration.md`
45. `educational-design-system/observable-state.md`
46. `educational-design-system/component-inventory.md`
47. `educational-design-system/page-recipes.md`
48. `educational-design-system/visual-asset-pipeline.md`
49. `educational-design-system/deployment.md`
50. `educational-design-system/cli-command-surface.md`
51. `educational-design-system/phase-1-sprint-plan.md`
52. `educational-design-system/sprints/*.md`
53. the latest relevant QA artifact under `docs/_qa/`

## Active docs

### Core

- `educational-design-system/spec.md`: the active phase-1 foundation and architecture spec
- `educational-design-system/operating-runbook.md`: the canonical doc -> QA -> implement -> QA -> release loop
- `identity-portfolio-redesign/spec.md`: the active site-restructure spec for the identity-portfolio experience
- `identity-portfolio-redesign/page-jobs.md`: route-level one-job-per-page contracts for the redesign
- `identity-portfolio-redesign/content-doctrine.md`: voice, density, and example rules for the redesign
- `identity-portfolio-redesign/migration-plan.md`: current-to-target route migration plan for the redesign
- `identity-portfolio-redesign/homepage-section-inventory.md`: exact block-by-block extraction ledger for the current homepage
- `guided-reference-site-refactor/README.md`: entrypoint for the current guided-tour plus browse-reference refactor of the root site
- `guided-reference-site-refactor/spec.md`: the active planning source of truth for the dual-mode museum-school refactor
- `guided-reference-site-refactor/page-jobs.md`: global IA, page jobs, audience entry ladders, and route-family contracts for the refactor
- `guided-reference-site-refactor/content-doctrine.md`: curatorial, cognitive-load, evidence-tier, and room-template rules for the refactor
- `guided-reference-site-refactor/decision-rubrics.md`: archetype selection rubric, congruence checks, and browse-to-build decision-output contracts
- `guided-reference-site-refactor/migration-plan.md`: current-surface to target-surface migration and alias plan for the refactor
- `guided-reference-site-refactor/implementation-workstreams.md`: bounded sprint and workstream sequence for implementing the refactor package one UX objective at a time
- `guided-reference-site-refactor/sprints/guided-reference-sprint-1-entry-and-tour-foundation.md`: the Sprint 1 brief for the lobby, route-family shell, and guided-tour frame foundation
- `guided-reference-site-refactor/sprints/guided-reference-sprint-2-guided-tour-completion.md`: the Sprint 2 brief for making the canonical guided tour complete under `/tour/*`
- `guided-reference-site-refactor/sprints/guided-reference-sprint-3-browse-and-examples-families.md`: the Sprint 3 brief for making browse and examples real support and proof families under `/browse/*` and `/examples/*`
- `guided-reference-site-refactor/sprints/guided-reference-sprint-4-instructor-support-cleanup-and-release-hardening.md`: the active Sprint 4 brief for instructor alignment, support-route cleanup, continuity policy, and release hardening after the Sprint 3 route-family cutover
- `../_research/identity-system-core.md`: the primary research model behind the identity redesign
- `../_research/identity-system-student-handout.md`: the shortest student-facing version of the identity system
- `../_research/identity-system-maintainer-doctrine.md`: the maintainer guardrails for keeping the identity routes coherent
- `educational-design-system/phase-2-sprint-plan.md`: the active next-round plan for agentic publishing and multi-experience workflow
- `educational-design-system/phase-3-sprint-plan.md`: the active plan for public observable-state export and observatory surfaces
- `educational-design-system/phase-1-sprint-plan.md`: sprint sequence and cross-sprint rules
- `educational-design-system/planning-qa-spec.md`: QA artifact rules, naming, and gate requirements
- `bseai-content-production/README.md`: entrypoint for pre-implementation BSEAI content execution
- `bseai-content-production/operating-runbook.md`: execution order, archive boundaries, and stop conditions for BSEAI content work
- `bseai-content-production/first-content-checklist.md`: concrete artifact backlog and acceptance rules for the first BSEAI content wave

### System contracts

- `educational-design-system/content-schema.md`: page-level units, drafts, versions, blocks, experiences, releases
- `educational-design-system/workflow-state-machine.md`: authoring, review, approval, and publish lifecycle
- `educational-design-system/agentic-orchestration.md`: planning artifact types, agent roles, and SQLite-backed local orchestration rules
- `educational-design-system/observable-state.md`: public-safe observability artifacts, visibility tiers, route map, and export model
- `educational-design-system/component-inventory.md`: render primitives and block-to-component contracts
- `educational-design-system/page-recipes.md`: page grammar and recipe validation targets
- `educational-design-system/visual-asset-pipeline.md`: illustration, diagram, chart, and visual-version model
- `educational-design-system/deployment.md`: static export and release-manifest-driven deployment
- `educational-design-system/cli-command-surface.md`: command model for the publishing workflow

### Sprint briefs

- `educational-design-system/sprints/`: one focused sprint brief per active implementation sprint

The sprint directory now continues through phases 2 and 3. The phase-1 sprint briefs remain active because approved QA artifacts still reference them, while the phase-2 and phase-3 sprint briefs define the next implementation rounds.

The next active phase-2 implementation target is now Sprint 9. Sprint 8 is implemented and QAed, and Sprint 9 now has an approved planning brief and planning QA artifact for the broader phase-2 experience-assembly and visual-workflow layer.

Sprint 0 has been archived because it is now purely historical kickoff material. Phase-1 sprint briefs remain in the active path because approved QA artifacts still reference them as their authoritative targets.

### QA artifacts

- `../_qa/`: durable planning, implementation, and release QA records

The current planning artifact for the guided-reference refactor is:

- `../_qa/planning/specs/guided-reference-site-refactor.qa.md`

That artifact records the planning review for the active guided-tour plus browse-reference package.

## Archive policy

Move documents to `_archive/` when they are any of the following:

- superseded by an active spec
- useful as historical context but no longer authoritative
- temporary repair or migration documents that have already been integrated into active docs

Do not leave superseded planning documents in the active path if they duplicate active guidance.

## Current archive contents

- `_archive/letters/`: historical vision briefs
- `_archive/educational-design-system/`: repaired or superseded planning artifacts
- `_archive/educational-design-system/sprint-0-repo-analysis.md`: the historical phase-1 kickoff brief that produced the active spec set

## Maintenance rule

If a new doc is added to `_specs/`, update this README or do not add the doc.

If a kickoff, repair, or superseded planning doc no longer serves as an active target for QA or implementation work, move it to `_archive/` instead of leaving it in the active path.

The folder should stay small enough that an LLM can read the full active spec set without guessing which files matter.
