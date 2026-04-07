# Identity Portfolio Redesign Spec Package

## Status

- Status: Active domain redesign package
- Scope: the identity-portfolio experience and the supporting site routes that feed it
- Primary research input: `docs/_research/identity-system-core.md`
- Supporting research input: `docs/_research/identity-system-student-handout.md`, `docs/_research/identity-system-maintainer-doctrine.md`, `docs/_research/identity.md`, and `docs/_research/mysystem.md`
- Depends on: `docs/_specs/educational-design-system/spec.md` and `docs/_specs/educational-design-system/operating-runbook.md`

## Purpose

This package translates the identity research into a site architecture that does one thing per page and keeps the core build path shorter than the optional theory path.

The current site has enough good material to support a serious student-facing experience, but it is still too concentrated in one place. The redesign package exists to break that concentration into a route system that is easier to start, easier to follow, and easier to remember.

## Package doctrine

1. One dominant job per page.
2. Core build path before optional labs.
3. Concrete examples before abstract frameworks.
4. Proof before claims.
5. Direct second-person voice.
6. Optional depth must branch, not gate.

## Source-of-truth order

For identity-portfolio site work, read these in order:

1. `spec.md`
2. `page-jobs.md`
3. `content-doctrine.md`
4. `migration-plan.md`
5. `homepage-section-inventory.md`
6. `docs/_research/identity-system-core.md`
7. `docs/_research/identity-system-student-handout.md`
8. `docs/_research/identity-system-maintainer-doctrine.md`
9. `docs/_research/identity.md`
10. `docs/_research/mysystem.md`

## Relationship to the core system specs

The `educational-design-system/` package still defines the platform, workflow, primitives, and QA process.

This package does not replace that foundation. It defines how the identity research should be distributed across the site so the current experience stops behaving like one giant smart page and starts behaving like a coherent student path.

## Success condition

The redesign package is successful when a student can:

1. understand what the site is for within one screen
2. begin the assignment path without reading optional theory first
3. find the right support page when they are stuck
4. leave each page knowing exactly what that page was trying to do
