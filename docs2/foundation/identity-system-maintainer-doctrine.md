# Identity Portfolio Maintainer Doctrine

## Status

- Status: maintainer-only operating doctrine for the identity portfolio system
- Primary source for the model: `docs/_research/identity-system-core.md`
- Evidence base: `docs/_research/identity.md`
- Compact blueprint: `docs/_research/mysystem.md`

## Purpose

Protect the identity portfolio system from drifting back into a homepage theory pile, a generic design gallery, or a fake-brand exercise.

## Document roles

1. `identity-system-core.md` explains the system in student language.
2. `identity.md` supplies the longer research grounding and caveats.
3. `mysystem.md` compresses the model for operators.
4. This file defines how maintainers keep the routes and docs coherent.

## Route ownership

1. Start route: introduce the promise, show one proof cue, and send the student forward.
2. Signal route: own audience, need, archetype, and promise.
3. Style route: own perception, hierarchy, imagery, and first-read legibility.
4. Proof route: own trust, artifacts, receipts, and ethical persuasion.
5. Build route: own page assembly, CTA clarity, and pre-publish checks.
6. Publish route: own circulation, weak ties, follow-up, and repeat loops.
7. Support routes: solve a named stuck point fast, then send the student back to the owning route.

## Non-negotiable rules

1. One dominant job per page.
2. One primary archetype on the first read.
3. One real audience at a time.
4. One clear promise on the first screen.
5. Proof must sit near the claim it supports.
6. Every core-path page must make the next step obvious.
7. Deployment is part of the system, not the appendix.
8. Decorative visuals never count as strategy.
9. Theory exists to shorten action, not replace it.

## Forbidden edits

1. Do not move long theory back onto the homepage.
2. Do not give one route two competing jobs.
3. Do not add examples or labs to the core path unless they solve a missing core-path job.
4. Do not add persuasion language that outruns the available proof.
5. Do not add visual references that contradict the chosen signal.
6. Do not treat publishing as optional enrichment.
7. Do not let support routes become a second course.

## Copy rules

1. Write to the student in direct second person.
2. Prefer concrete actions over abstract theory labels.
3. Name the page problem before naming the field or scholar.
4. Put the practical takeaway before the research trail.
5. Use proof language that points to artifacts, outcomes, or visible method.
6. Avoid posture words when a concrete example would do more work.

## Structural checks

Before merging copy or route changes, confirm:

1. Can a first-time reader identify the route's single job?
2. Does the route send the reader to the correct next route?
3. Does the route still match the `Need -> Signal -> Style -> Proof -> Action -> Publish` teaching sequence?
4. Are the shared summaries in `app/experiences/identity-portfolio/content.tsx` still aligned with the route wrappers?
5. Do the diagrams and source references describe the same model as the route copy?

## Maintenance hotspots

1. `app/experiences/identity-portfolio/content.tsx` holds shared summaries, guardrails, audit items, and diagrams.
2. `app/experiences/identity-portfolio/*/page.tsx` holds the route-level framing and single-job contract.
3. `docs/_research/*.md` defines the model hierarchy and supporting research roles.
4. `tests/browser/homepage.spec.ts` and related release tests catch headline drift on the selected release.

## Release rule

If you change route titles, route summaries, or the meaning of a step, review the selected release tests and sitemap expectations in the same pass.

## Bottom line

The system works only when the pages, the shared content layer, and the research stack all describe the same model.

If a proposed addition makes the site more impressive but less legible, cut it.
