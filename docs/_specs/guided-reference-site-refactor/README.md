# Guided Reference Site Refactor Spec Package

## Status

- Status: Active domain redesign package
- Scope: the current root-site learning experience, its top-level navigation, and the relationship between guided learning pages and browse-reference rooms
- Primary research input: `docs/_research/identity-system-core.md`
- Supporting research input: `docs/_research/identity-system-student-handout.md`, `docs/_research/identity-system-maintainer-doctrine.md`, `docs/_research/identity.md`, and `docs/_research/books/transcripts/the-hero-and-the-outlaw/source-brief.md`
- Primary project inputs: `docs/_projects/identity-first-site/project-brief.md`, `docs/_projects/identity-first-site/archetype-gallery.md`, `docs/_projects/identity-first-site/visual-design-literacy-gallery.md`, `docs/_projects/identity-first-site/psychology-attention-persuasion-gallery.md`, `docs/_projects/identity-first-site/multimedia-delivery-strategy.md`, and the BSEAI IA review set under `docs/_projects/bseaid-degree/qa-reviews/`
- Depends on: `docs/_specs/educational-design-system/spec.md`, `docs/_specs/educational-design-system/operating-runbook.md`, and `docs/_specs/identity-portfolio-redesign/spec.md`

## Purpose

This package defines an aggressive refactor of the current site so it stops behaving like an atlas-first field guide and starts behaving like a guided museum-school with:

1. a guided studio tour for first-time and in-progress learners
2. a browse-reference wing for return visits, comparisons, and deeper study
3. a dedicated examples family that proves the system through visible outcomes
4. an instructor layer that sequences the same materials without rebuilding the logic

The repo already contains enough content for this model. The problem is choreography, route ownership, visible learner outputs, and clarity at the entrance.

## Package doctrine

1. One canonical home per route family.
2. Guided tour before reference browsing.
3. Guided steps must write into a visible tour record.
4. Required, recommended, optional, and instructor-only surfaces are labeled explicitly.
5. Browse rooms must hand off back to build work.
6. Curate rooms like exhibits, not content dumps.
7. Evidence tiers and provenance are visible.
8. Cognitive-load limits are part of accessibility.
9. Obviousness must be tested, not assumed.
10. Aggressive refactor is allowed when current surfaces compete with the learning path.

## Source-of-truth order

For this refactor, read these in order:

1. `spec.md`
2. `page-jobs.md`
3. `content-doctrine.md`
4. `decision-rubrics.md`
5. `migration-plan.md`
6. `implementation-workstreams.md`
7. `sprints/guided-reference-sprint-1-entry-and-tour-foundation.md`
8. `sprints/guided-reference-sprint-2-guided-tour-completion.md`
9. `sprints/guided-reference-sprint-3-browse-and-examples-families.md`
10. `sprints/guided-reference-sprint-4-instructor-support-cleanup-and-release-hardening.md`
11. `docs/_research/identity-system-core.md`
12. `docs/_research/identity-system-student-handout.md`
13. `docs/_research/identity-system-maintainer-doctrine.md`
14. `docs/_research/identity.md`
15. `docs/_research/books/transcripts/the-hero-and-the-outlaw/source-brief.md`
16. `docs/_projects/identity-first-site/project-brief.md`
17. `docs/_projects/identity-first-site/archetype-gallery.md`
18. `docs/_projects/identity-first-site/visual-design-literacy-gallery.md`
19. `docs/_projects/identity-first-site/psychology-attention-persuasion-gallery.md`
20. `docs/_projects/identity-first-site/multimedia-delivery-strategy.md`
21. `docs/_projects/bseaid-degree/qa-reviews/03-curatorial-editorial-experience-review.md`
22. `docs/_projects/bseaid-degree/qa-reviews/04-brand-identity-systems-review.md`
23. `docs/_projects/bseaid-degree/qa-reviews/06-accessibility-inclusive-design-review.md`
24. `docs/_projects/bseaid-degree/qa-reviews/09-ux-student-journey-review.md`
25. `docs/_projects/bseaid-degree/qa-reviews/13-synthesis-action-plan.md`

## Active sprint target

The current implementation target for this package is:

1. `sprints/guided-reference-sprint-4-instructor-support-cleanup-and-release-hardening.md`

## Relationship to the other spec packages

The `educational-design-system/` package still defines the platform, workflow, QA loop, content contracts, and release discipline.

The `identity-portfolio-redesign/` package still defines the smaller-grain one-job-per-page rules for the identity-system learning path.

This package sits above both and defines how the current root-site experience should stage those ideas across:

1. the lobby and first-time entry ladder
2. the guided tour route family
3. the browse-reference route family
4. the examples and instructor route families

## Success condition

This package is successful when:

1. a first-time student can tell where to start within one screen
2. a returning student can resume build work without crossing a theory menu
3. a browser can study archetypes, design lineages, and persuasion in depth without confusing those rooms for the required path
4. every deep room tells the visitor what decision or action it should change
5. the guided pages display an accumulating learner record instead of leaving decisions implicit
6. the site feels more like a curated museum-school and less like a flat list of strong topics
7. the labels and first-click paths are obvious enough to pass lightweight usability checks before implementation is considered stable
