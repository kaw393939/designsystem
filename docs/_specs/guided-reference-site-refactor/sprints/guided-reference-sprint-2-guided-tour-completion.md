# Guided Reference Sprint 2: Guided Tour Completion

## Goal

Turn the Sprint 1 tour foundation into the canonical end-to-end guided path by shipping the six required `/tour/*` decision and execution routes, wiring each step to the shared tour frame, and demoting the current flat handoff pages to explicit migration aliases rather than the public IA.

## Why this sprint exists

Sprint 1 solved the entrance and shared frame problems.

That created a stable lobby, family-level navigation, route-status language, a guided shell, and a visible tour record.

What still remains unfinished is the primary student journey itself.

Today:

1. `/tour` exists as a route-family landing and proof surface, but the actual step pages do not exist yet.
2. `/playbook` still carries both signal and archetype work in one flat route.
3. `/workbook` still carries proof and build work in one flat route.
4. `/deliverables` still carries publish and finish-line logic outside the canonical tour family.
5. the tour record is visible, but Sprint 1 only established the frame and initial placeholders rather than a route-by-route decision contract.

Sprint 2 exists to complete the required path so a learner can move from first decision through public deployment without leaving the canonical `Tour` family.

## Scope

1. Create the six canonical guided routes: `/tour/signal`, `/tour/archetype`, `/tour/style`, `/tour/proof`, `/tour/build`, and `/tour/publish`.
2. Split the current flat-route content into the right guided-step ownership so each canonical route has one dominant job, one explicit output, and one next move.
3. Extend the Sprint 1 guided shell and shared metadata so every guided route declares the field it updates in the tour record, the misconception it addresses, and the formative check it requires.
4. Add migration handling for `/playbook`, `/workbook`, and `/deliverables` so they no longer act like the canonical IA even if temporary aliasing or continuity wrappers are still needed.
5. Add focused tests for guided-step sequencing, resume-path clarity, step-route rendering, and canonical-tour navigation behavior.

## Deliverables

- `guided-reference-sprint-2-guided-tour-completion.md`
- canonical route implementations for:
  - `app/tour/signal/page.tsx`
  - `app/tour/archetype/page.tsx`
  - `app/tour/style/page.tsx`
  - `app/tour/proof/page.tsx`
  - `app/tour/build/page.tsx`
  - `app/tour/publish/page.tsx`
- updated guided-step metadata and record-contract support in `lib/site-navigation.ts` or adjacent shared route metadata
- shared guided components extended only as needed to support per-step record updates, current-step state, and bounded optional-depth handoffs
- alias, redirect, or continuity handling for `/playbook`, `/workbook`, and `/deliverables`
- focused unit and browser coverage for the canonical guided route chain and resume path

## Current-state constraints

The sprint should begin from the approved Sprint 1 foundation.

Current implementation facts:

1. `app/tour/page.tsx` currently acts as a route-family landing and shared-shell proof surface, not the first guided lesson route.
2. `components/guided-step-shell.tsx` already provides the shared frame for status, prerequisite, output, misconception, formative check, sequence, and tour-record display.
3. `lib/site-navigation.ts` already defines the primary route-family model, guided-step ordering, and initial tour record placeholders.
4. `app/playbook/page.tsx` currently mixes signal, archetype, and early style-adjacent guidance in one flat route.
5. `app/workbook/page.tsx` currently mixes proof, build, and studio-review content in one flat route.
6. `app/deliverables/page.tsx` currently carries publish requirements, timeline, and failure-mode guidance outside the canonical tour family.
7. Sprint 1 intentionally preserved the flat routes as reachable handoffs during migration.

## Phase boundary

Sprint 2 completes the required guided path.

Sprint 2 does not need to fully reframe the browse wing, the examples family, or the instructor wrapper. It only needs to make the guided tour canonical and keep support-route relationships explicit while those later families are rewritten in later sprints.

## Implementation sequence

Sprint 2 should land in this order so the tour becomes canonical without drifting from the approved route contracts.

### 1. Guided-step metadata and record contract hardening

- extend the guided-step data so each step can declare the record field it updates, the current handoff it replaces, and the bounded optional-depth surfaces it may link to
- define the per-step output language for audience, archetype, visual lane, proof plan, build brief, and publish asset
- define the canonical resume-path targets for in-progress learners

### 2. Guided decision routes

- implement `/tour/signal` as the first real decision step for audience, need, and promise
- implement `/tour/archetype` as the dedicated primary-archetype decision step with scoring logic, anti-patterns, and output contract
- implement `/tour/style` as the visual-direction step with one chosen lane, contrast guidance, and anti-patterns

### 3. Guided execution routes

- implement `/tour/proof` as the proof-block and CTA-fit step
- implement `/tour/build` as the page skeleton, build brief, and audit step
- implement `/tour/publish` as the public deployment, finish-line, and repeat-loop step

### 4. Migration and validation pass

- reframe `/playbook`, `/workbook`, and `/deliverables` as aliases, wrappers, or redirects rather than primary student destinations
- verify that the top navigation and direct links privilege the canonical `/tour/*` routes
- add tests for route rendering, tour-sequence continuity, resume path, and canonical-route correctness before calling the tour complete

## File-by-file implementation checklist

Use this list to keep the sprint concrete.

### Add canonical guided routes

- `app/tour/signal/page.tsx`: create the audience, need, and promise step with one primary forward CTA to `/tour/archetype`
- `app/tour/archetype/page.tsx`: create the archetype-decision step with rubric, fit criteria, trap handling, and forward CTA to `/tour/style`
- `app/tour/style/page.tsx`: create the visual-direction step with chosen-lane output, anti-patterns, and forward CTA to `/tour/proof`
- `app/tour/proof/page.tsx`: create the proof and CTA-fit step with proof-block anatomy and forward CTA to `/tour/build`
- `app/tour/build/page.tsx`: create the build step with page skeleton, audit, and executable brief output leading to `/tour/publish`
- `app/tour/publish/page.tsx`: create the publish step with deployment asset, finish-line check, and loop to examples or completion

### Update current migration surfaces

- `app/tour/page.tsx`: keep or revise as a tour map and route-family landing only if it no longer competes with `/tour/signal` as the first guided step
- `app/playbook/page.tsx`: preserve useful content only as a temporary alias, continuity wrapper, or extracted source for `/tour/signal`, `/tour/archetype`, and `/tour/style`
- `app/workbook/page.tsx`: preserve useful content only as a temporary alias, continuity wrapper, or extracted source for `/tour/proof` and `/tour/build`
- `app/deliverables/page.tsx`: preserve useful content only as a temporary alias, continuity wrapper, or extracted source for `/tour/publish`
- `components/site-header.tsx` and `components/site-header-nav.tsx`: keep family-level nav state correct when the active route is any canonical `/tour/*` path

### Extend shared guided support only where needed

- `lib/site-navigation.ts`: extend guided-step metadata and tour-record structure to reflect the canonical route-level outputs and resume-path logic
- `components/guided-step-shell.tsx`: extend only if needed to support explicit `currentStepId`, updated record fields, per-step optional-depth handoffs, or stronger resume cues
- `components/tour-record-panel.tsx`: extend only if needed to display route-specific updated fields without adding unnecessary runtime complexity
- `components/`: add any bounded shared decision or rubric surfaces only when they reduce duplication across the six guided routes

### Add or extend focused tests

- `tests/unit/`: add focused coverage for guided-step metadata, record-update presentation, and any shared decision-support components introduced by the sprint
- `tests/browser/`: add or extend coverage for the six canonical guided routes, resume-path behavior, and migration handling for the flat-route aliases

## Work checklist

1. Make `/tour/signal` the actual first guided destination promised by the lobby and route-family docs.
2. Give each guided step one dominant job, one explicit output artifact, and one explicit next move.
3. Ensure each guided step updates or highlights the exact field it owns in the visible tour record.
4. Keep misconceptions, formative checks, and bounded optional-depth links inside every guided route.
5. Split the current flat-route content by route ownership rather than preserving mixed-step pages for convenience.
6. Preserve prerequisite integrity so later steps cannot feel independent of earlier decisions.
7. Keep the migration incremental, but make the canonical tour impossible to mistake for the flat-route aliases.

## Positive tests

- a first-time learner can move from `/tour/signal` through `/tour/publish` without leaving the canonical tour family
- each guided route clearly exposes its prerequisite, its output, its current step, and its next move
- the visible tour record shows the right decision fields for each step rather than remaining generic placeholder chrome
- a returning learner can identify the canonical resume destination for build work in one click
- publish reads as part of the same guided sequence as signal, archetype, style, proof, and build
- the top nav continues to communicate route families rather than step-level topic sprawl

## Negative tests

- no flat route remains easier to find or more canonical than its replacement guided route
- no guided step collapses multiple dominant jobs into one scroll the way the old flat handoff pages did
- no guided step requires opening a browse room before the main decision becomes clear
- no guided page omits misconception, formative-check, or tour-record context
- no guided route treats publish as an optional bonus outside the main path

## Edge-case checks

- direct deep links to `/tour/archetype`, `/tour/style`, `/tour/proof`, `/tour/build`, and `/tour/publish` remain coherent even when a user did not arrive via the immediately previous step
- the route-family nav state remains correct for all canonical `/tour/*` routes and any temporary flat-route aliases
- the tour record remains legible when a step has mostly placeholder fields and only one newly emphasized output
- the tour map or landing route does not create contradictory current-step signals when viewed alongside a canonical step route
- mobile layouts preserve the main decision, the current-step cue, and the primary forward CTA before optional-depth content dominates the screen

## Accessibility checks

- every guided route exposes logical heading structure and keyboard-reachable forward motion
- current-step state, misconception content, and formative-check content remain understandable without relying on color alone
- the tour record remains readable as text and does not require visual inference to understand which field matters now
- score or rubric surfaces introduced on the archetype step remain legible and navigable on small screens and by assistive technology
- proof, build, and publish steps preserve readable checklist structure and clear landmark boundaries

## Browser and usability checks

- first-click check: a new learner starting from the lobby chooses the guided tour and reaches `/tour/signal` without opening a flat-route alias first
- continuity check: a learner can move from one canonical guided step to the next without route-family confusion or dead-end handoffs
- resume-path check: a returning learner can identify and reach `/tour/build` as the production route without reopening theory-heavy earlier steps
- five-second classification check: a viewer can tell the difference between a canonical guided step and a browse or examples surface on first look
- migration check: flat-route aliases, if still present, clearly expose that the canonical path now lives under `/tour/*`

## Export and deploy checks

- static build remains valid after adding the canonical `/tour/*` route set
- route metadata and sitemap output remain valid as the canonical tour expands beyond the Sprint 1 landing pages
- browser coverage runs against the canonical tour routes in exported preview mode, not only dev mode
- no Sprint 2 implementation should depend on hidden server-only state for the tour sequence to render coherently

## Out of scope

- full browse-room reframing for archetypes, design lineages, persuasion, and sources
- full examples-family rewrite beyond any bounded handoff needed from `/tour/publish`
- instructor-guide rewrite and wrapper cleanup beyond whatever is necessary to keep guided-route references coherent
- final alias and redirect hardening for all legacy routes across the site

## Exit criteria

Sprint 2 is done when the guided tour is a complete canonical route family from `/tour/signal` through `/tour/publish`, the current flat handoff pages no longer masquerade as the primary IA, every guided step uses the shared frame with explicit outputs and tour-record context, and the resulting end-to-end path is clear enough to pass lightweight continuity and resume-path validation before Sprint 3 begins.