# Identity Portfolio Redesign Spec

## Status

- Status: Active redesign source of truth
- Scope: current identity-portfolio experience architecture and supporting route behavior
- Research basis: `docs/_research/identity-system-core.md` with `docs/_research/identity-system-student-handout.md` and `docs/_research/identity-system-maintainer-doctrine.md` as companion operating docs

## Project purpose

Redesign the identity-portfolio site so it behaves like a guided student path instead of a single oversized page that tries to do every job at once.

The site should apply the research pipeline from `identity-system-core.md` directly:

Motivation -> Identity -> Perception -> Trust -> Action -> Deployment -> Opportunity

That pipeline should shape the route architecture, not just the copy inside one long course page.

## Problem statement

The current site contains strong material, but the experience still has structural failures:

1. the homepage does not create a clean top-to-bottom student path
2. the homepage is doing too many jobs at once
3. the page repeats its pitch before it lets the student act
4. the strongest problem-based content is buried under framework density
5. theory sections still arrive before or alongside build action instead of branching off from it
6. some language is still smarter than it needs to be for a first read
7. too much of the site still behaves like support material even when the student needs a direct build step

## Rewrite thesis

The redesign must move from **one very smart page** to **many purposeful pages**.

Each route should answer one primary question well. The student should not have to cross a theory library to reach the build path.

## Research-grounded doctrine

The identity research already provides the discipline needed for the redesign.

### Invariants carried forward from the research

1. One primary archetype governs voice, visuals, and proof selection.
2. Every page has one dominant job: attention, understanding, trust, or action.
3. Proof must be concrete and verifiable.
4. Deployment is part of the system, not an afterthought.
5. Faces, imagery, and novelty only matter when they help meaning.

### UX rules carried forward from the research

1. Design for scanning first and reading second.
2. Make the hero communicate what the page is immediately.
3. Use faces and visuals as attention anchors, not decoration.
4. Avoid ad-like or banner-like blocks that pull attention without meaning.
5. Turn strong heuristics into testable page hypotheses when possible.

## Experience goals

The redesigned site should feel:

- clear
- directed
- specific
- human
- useful
- credible

The student should be able to answer three questions quickly on every route:

1. What is this page for?
2. Why am I here now?
3. What do I do next?

## Architecture doctrine

### Core path before optional depth

The core student path must come first and stay short:

1. Start
2. Choose signal
3. Choose visual direction
4. Choose proof
5. Build the page
6. Publish and follow up

Optional theory, labs, and sources may support that path, but they must not interrupt it.

### One-job-per-page rule

No page may simultaneously behave like:

- a course introduction
- an assignment brief
- a style lab
- a psychology explainer
- an archetype browser
- a reference library
- a build workflow page

If the page needs to do more than one of those jobs, it must be split.

### Examples before frameworks

The site should introduce page problems and page fixes before it introduces large explanatory frameworks.

The pattern is:

1. show the page problem
2. show the improved move
3. explain why it works
4. offer the next step

### Trust through proof, not volume

The redesign should reduce the number of explanatory layers on the main path and increase the amount of visible before-and-after proof.

The student should see fewer frameworks per page and more examples of what a better choice looks like.

## Route families

The redesigned site should use these route families:

1. Core path routes: required for the assignment and the main student journey
2. Lab routes: optional deep dives for archetypes, psychology, persuasion, and design lineages
3. Example routes: concrete before-and-after demonstrations and reusable page patterns
4. Support routes: process, status, tokens, and layout references
5. Source routes: research basis and reference library

## Non-goals

The redesign does not aim to:

1. preserve the current giant-page structure
2. maximize how much theory appears on the homepage
3. make every route equally comprehensive
4. turn every guide page into a mini-course
5. treat support docs as part of the core student path

## Acceptance criteria

### Product acceptance

1. The homepage becomes a start page with one dominant job.
2. The assignment path is reachable immediately and can be completed without reading optional theory pages.
3. Every route has one dominant question and one dominant next move.
4. Lab pages are clearly optional and support a specific stuck point.
5. Example pages show concrete improvements, not just named frameworks.

### Content acceptance

1. The site speaks directly to the student in natural second-person language.
2. No route uses meta commentary about what the page is proving or what the learner is supposed to feel.
3. Every theory page includes a concrete page problem and a concrete fix.
4. Every page has at least one visible proof element or concrete artifact.

### Architecture acceptance

1. The route map follows the identity research pipeline across multiple pages.
2. The site no longer depends on a single mega-page to hold the full doctrine.
3. Support pages remain available but are visibly off the core student path.

## Delivery rule

Implementation work for this redesign must follow the existing core runbook under `docs/_specs/educational-design-system/operating-runbook.md`.

This package defines what to change. It does not replace the repository's planning, QA, implementation, and release gates.
