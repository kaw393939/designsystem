# Guided Reference Sprint 3: Browse and Examples Families

## Goal

Turn the provisional `Browse` and `Examples` landings into real support and proof families by shipping the canonical `/browse/*` and `/examples/*` route set, reframing the current atlas-style deep rooms as optional depth, and making every support surface hand back to the owning guided-tour step.

## Why this sprint exists

Sprint 2 completed the canonical guided tour.

That means first-time and in-progress learners can move from `/tour/signal` through `/tour/publish` without leaving the required path.

What still remains unfinished is the second half of the museum-school model: the reference wing and the proof wing.

Today:

1. `/browse` and `/examples` exist as family landings, but both still read like provisional wrappers rather than full route families.
2. `/archetypes`, `/design-styles`, and `/persuasion` still behave like standalone deep rooms rather than canonical browse-family destinations with clear return-to-tour contracts.
3. `/hero-examples` still behaves like an isolated gallery surface instead of one proof object inside a larger examples family.
4. `/examples/module`, `/examples/lesson`, and `/examples/reading-map` exist, but they currently prove the primitive layer more than the guided identity system itself.
5. the route-family model is now canonical in the lobby, nav, and sitemap, but the browse and examples families still need route-level choreography that matches that public promise.

Sprint 3 exists to make the optional-depth routes coherent enough that learners can study, compare, and inspect proof without confusing those families for the primary path or getting stranded away from the tour.

## Scope

1. Create the canonical browse subroutes: `/browse/archetypes`, `/browse/design-lineages`, `/browse/attention-trust`, and `/browse/sources`.
2. Reframe the current deep browse surfaces so they behave as optional reference or continuity wrappers rather than primary student destinations.
3. Create the canonical examples subroutes: `/examples/proof-blocks` and `/examples/student-exemplars`, and update `/examples` so the family explicitly separates outcome-proof surfaces from primitive or structural examples.
4. Apply explicit curatorial room-template rules so each browse room and examples route has one hero object, bounded supporting objects, visible object labels, and no ornamental quotation or panel sprawl.
5. Extend shared route metadata so every browse room and examples page declares the guided step it feeds, the return target, and the related-room or related-example handoff.
6. Add minimum continuity handling for legacy deep links such as `/archetypes/[slug]` so preserved deep routes do not strand users outside the canonical browse family.
7. Add focused tests for browse-room classification, return-to-tour behavior, canonical examples navigation, legacy deep-link continuity, and required release-aware sitemap updates for the new canonical routes.

## Deliverables

- `guided-reference-sprint-3-browse-and-examples-families.md`
- canonical browse-family route implementations for:
  - `app/browse/archetypes/page.tsx`
  - `app/browse/design-lineages/page.tsx`
  - `app/browse/attention-trust/page.tsx`
  - `app/browse/sources/page.tsx`
- canonical examples-family route implementations for:
  - `app/examples/proof-blocks/page.tsx`
  - `app/examples/student-exemplars/page.tsx`
- updated browse and examples family landings in `app/browse/page.tsx` and `app/examples/page.tsx`
- updated family metadata and return-path support in `lib/site-navigation.ts` or adjacent shared route metadata
- room-level curation rules encoded in implementation for hero objects, supporting objects, evidence tiers, and bounded quote usage
- continuity handling for `/archetypes`, `/archetypes/[slug]`, `/design-styles`, `/persuasion`, and `/hero-examples`
- focused unit and browser coverage for browse-room classification, return paths, example-to-tour handoffs, and any canonical-route sitemap additions

## Current-state constraints

The sprint should begin from the approved Sprint 2 guided-tour baseline.

Current implementation facts:

1. `app/browse/page.tsx` currently introduces browse mode, but still describes the deep rooms as a partially rewritten family rather than a finished canonical support wing.
2. `app/examples/page.tsx` currently introduces the examples family, but still treats the current proof surfaces as gathered references rather than a finished examples contract.
3. `app/archetypes/page.tsx`, `app/design-styles/page.tsx`, and `app/persuasion/page.tsx` still present atlas-style standalone rooms with no canonical `/browse/*` wrapper routes and no explicit route-family chrome.
4. `app/archetypes/[slug]/page.tsx` is a live static-export deep-link surface and currently reads as a canonical archetype destination rather than a continuity route pointing back to the browse family and the owning guided step.
5. `app/hero-examples/page.tsx` still acts as its own gallery destination instead of a clearly secondary or migrated examples surface.
6. `app/examples/module/page.tsx`, `app/examples/lesson/page.tsx`, and `app/examples/reading-map/page.tsx` already exist and should stay coherent, but Sprint 3 must explicitly distinguish those structural or primitive examples from the main outcome-proof contract.
7. `lib/site-navigation.ts` already defines initial `browseRoomCards` and `exampleSurfaceCards`, but does not yet model canonical `/browse/*` and `/examples/*` route ownership deeply enough for a full family implementation.
8. the selected-release registry and sitemap layer now reflect the route-family IA, so every new canonical browse or examples subroute introduced in this sprint must update that release metadata rather than leaving route coverage implicit.
9. the package doctrine already defines hero objects, supporting objects, reference objects, room budgets, quote-rail rules, and evidence-tier labels, but the current Sprint 3 brief still needs to force those curatorial constraints into the actual implementation slice.

## Phase boundary

Sprint 3 completes the browse and examples family framing.

Sprint 3 does not need to rewrite the instructor guide, clean up all support routes, or harden final redirects for every legacy path. It only needs to make browse and examples behave like true support and proof families that reinforce the guided tour rather than competing with it.

## Implementation sequence

Sprint 3 should land in this order so the family model gets stronger without drifting from the approved route contracts.

### 1. Browse and examples route metadata hardening

- extend shared route metadata so each browse room and examples page declares its status, its owning guided step, its return target, and its related-room or related-example handoff
- define the canonical route set for `/browse/*` and `/examples/*`
- define which legacy routes remain continuity wrappers, which direct deep-link routes need minimum wrapper behavior, and which become extracted content sources only
- define which new canonical routes must be added to the selected-release registry and sitemap contract as part of the same sprint
- define the required curatorial contract for each canonical route: hero object, supporting objects, reference objects, quote budget, evidence-card budget, and object-label needs

### Curatorial contract for this sprint

Apply these rules to every new canonical browse or examples route introduced by Sprint 3.

#### Browse-room budget

1. one opening interpretation panel
2. one hero compare surface or hero proof surface
3. two to four supporting objects
4. zero to two quote rails
5. zero to two evidence cards
6. one `what this changes` panel
7. one explicit `return to tour` handoff

#### Source-room budget

1. one framing panel
2. three to six source clusters
3. visible evidence-tier labels for each cluster
4. related-room links without turning the route into a guided lesson

#### Examples-route budget

1. one opening interpretation panel
2. one hero proof object such as an annotated before-and-after, anatomy board, or exemplar spread
3. one to three supporting objects
4. zero to one quote rail
5. zero to two evidence cards
6. one explicit `feeds back to` or `return to tour` handoff

#### Object hierarchy rule

1. every browse room and examples route must name one hero object that does the main interpretive work
2. supporting objects may sharpen or contrast the hero object, but may not compete with it
3. reference objects belong lower in the page or in bounded supporting sections

#### Object-label rule

Every hero object and every supporting object should carry a compact label package when relevant:

1. object title
2. object type
3. source or provenance
4. why this object is here
5. what this object proves or changes
6. evidence tier

#### Quote and density rule

1. quotes may sharpen interpretation, expose a contradiction, or point to a verified source anchor, but may not act as decoration
2. no more than two quote rails belong in a standard browse room and no more than one in a standard examples route
3. do not stack multiple dense compare boards, timelines, or large galleries on the same screen without an interpretive break
4. skim-first structure remains mandatory: what this room is for, main object, what this changes, then deeper study

### 2. Browse-family routes

- implement `/browse/archetypes` as the canonical compare room for archetype families and first-read tradeoffs
- implement `/browse/design-lineages` as the canonical visual-literacy room for style, lineage, and anti-pattern translation
- implement `/browse/attention-trust` as the canonical proof and persuasion room with page-problem framing
- implement `/browse/sources` as the canonical provenance room for transcripts, research, and concept lineage

### 3. Examples-family routes

- update `/examples` so it distinguishes outcome proof from primitive or structural examples and stops presenting all example surfaces as peers
- implement `/examples/proof-blocks` as the canonical proof-anatomy route tied back to `/tour/proof`
- implement `/examples/student-exemplars` as the canonical end-to-end outcome route tied back to `/tour/build` and `/tour/publish`
- decide how `/hero-examples`, `/examples/module`, `/examples/lesson`, and `/examples/reading-map` fit the examples family without leaving duplicate canonical homes, and encode that split clearly in landing-page hierarchy and continuity copy

### 4. Migration and validation pass

- reframe `/archetypes`, `/archetypes/[slug]`, `/design-styles`, `/persuasion`, and `/hero-examples` as aliases, wrappers, or extracted-source continuity routes rather than canonical family homes
- verify that browse rooms and examples pages return to the relevant guided step without route-family confusion
- update release metadata, sitemap coverage, and focused browser tests for every new canonical `/browse/*` or `/examples/*` route added in the sprint

## File-by-file implementation checklist

Use this list to keep the sprint concrete.

### Add canonical browse routes

- `app/browse/archetypes/page.tsx`: create the canonical archetype compare room with one hero family-map or compare surface, bounded supporting contrasts, use-when framing, decision output, and return-to-tour handoff to `/tour/archetype`
- `app/browse/design-lineages/page.tsx`: create the canonical design-lineages room with one hero lineage or contrast surface, bounded supporting translation objects, and return-to-tour handoff to `/tour/style`
- `app/browse/attention-trust/page.tsx`: create the canonical attention-and-trust room with one hero proof or page-problem surface, bounded supporting evidence, ethics framing, and return-to-tour handoff to `/tour/proof`
- `app/browse/sources/page.tsx`: create the canonical sources room with three to six source clusters, visible evidence tiers, and related-room navigation without turning it into a required path surface

### Add canonical examples routes

- `app/examples/proof-blocks/page.tsx`: create the proof-block examples route with one hero anatomy board or annotated comparison, bounded critique annotations, and explicit ties back to `/tour/proof`
- `app/examples/student-exemplars/page.tsx`: create the exemplar route with one hero end-to-end proof object, bounded supporting artifacts, brief and decision-trail framing, and ties back to `/tour/build` and `/tour/publish`

### Update current migration surfaces

- `app/browse/page.tsx`: remove provisional-language framing and turn the landing into a real browse family map with room-purpose labels, related-room logic, and explicit route ownership
- `app/examples/page.tsx`: promote the landing from gathered proof surfaces to a true family map that separates proof-of-system examples from structural examples and gives those two groups visibly different jobs
- `app/archetypes/page.tsx`: preserve useful content only as a temporary alias, continuity wrapper, or extracted source for `/browse/archetypes`
- `app/archetypes/[slug]/page.tsx`: preserve useful content only as a bounded continuity route that points back to `/browse/archetypes` and `/tour/archetype` rather than behaving like a competing canonical browse home
- `app/design-styles/page.tsx`: preserve useful content only as a temporary alias, continuity wrapper, or extracted source for `/browse/design-lineages`
- `app/persuasion/page.tsx`: preserve useful content only as a temporary alias, continuity wrapper, or extracted source for `/browse/attention-trust`
- `app/hero-examples/page.tsx`: preserve useful content only as a temporary alias, continuity wrapper, or extracted source for the canonical examples family rather than leaving a separate public-facing gallery home
- `app/examples/module/page.tsx`, `app/examples/lesson/page.tsx`, and `app/examples/reading-map/page.tsx`: keep these routes coherent as structural examples while clarifying their secondary relationship to the main examples family and ensuring the landing no longer treats them as the primary proof routes

### Extend shared route-family support only where needed

- `lib/site-navigation.ts`: extend browse-room and examples metadata to support canonical subroute ownership, return targets, related-room links, and example-to-tour handoffs
- `components/`: add any bounded browse-room chrome, object-label primitives, evidence-tier markers, or examples annotation primitives only when they reduce duplication across the new family routes
- `content/registry/site-registry.json`, `content/experiences/identity-portfolio-system.json`, and `content/releases/identity-portfolio-system-proof-release.json`: update release-aware route metadata so every new canonical browse and examples subroute participates in sitemap and selected-build QA as part of the same change

### Add or extend focused tests

- `tests/unit/`: add focused coverage for browse/examples route metadata, return-path helpers, and any shared browse-room or example-annotation components introduced by the sprint
- `tests/browser/`: add or extend coverage for canonical `/browse/*` and `/examples/*` routes, five-second family classification, return-to-tour behavior, and any continuity wrappers left in place during migration

## Work checklist

1. Make browse rooms clearly optional depth rather than alternate first-time entry points.
2. Give every browse room one dominant teaching job and one explicit `what this changes` handoff back into the build path.
3. Give the examples family one canonical public home and distinguish outcome proof from structural example surfaces.
4. Ensure every browse room and examples page names the guided step it feeds.
5. Keep legacy browse and examples routes incremental, but make the canonical families impossible to mistake.
6. Preserve skim-first hierarchy so deep rooms feel curated rather than dumped.
7. Keep release-aware route metadata aligned with the canonical route-family model as the new support routes ship.
8. Make the examples landing visibly separate outcome proof from system or structural examples so the family stops flattening unlike teaching jobs into one grid.
9. Give every canonical browse room and examples route one hero object and prevent supporting objects from competing with it.
10. Keep quote rails interpretive and sparse rather than atmospheric or decorative.
11. Keep high-entropy surfaces bounded so no room reads like a wall of equal-weight artifacts.

## Positive tests

- a learner can open `/browse/archetypes`, `/browse/design-lineages`, `/browse/attention-trust`, and `/browse/sources` and immediately tell that each route is optional depth rather than the primary path
- each browse room clearly exposes `Use this room when`, `What this changes`, `Return to tour step`, and one related-room or related-example handoff
- each browse room has one clearly identifiable hero object and bounded supporting objects rather than a flat wall of equal-weight cards
- `/examples` clearly separates proof-of-system examples from primitive or structural examples
- `/examples/proof-blocks` visibly sharpens `/tour/proof` rather than behaving like a generic gallery wall
- `/examples/student-exemplars` visibly sharpens `/tour/build` and `/tour/publish` rather than behaving like inspiration-only material
- a visitor can move from a browse room or example page back to the relevant guided step in one click

## Negative tests

- no browse room becomes easier to find or more canonical than the guided tour
- no examples page ships as an unannotated mood board or inspiration gallery with no teaching job
- no deep room omits the return-to-tour cue or the `what this changes` panel
- no route leaves two different canonical homes for archetype comparison or hero-example proof
- no Sprint 3 route hides its optional or support status behind color alone or background knowledge
- no legacy deep-link or gallery route remains in sitemap output as if it were the canonical browse or examples destination
- no browse room or examples route stacks multiple hero-grade objects without hierarchy or interpretive breaks
- no route uses quote rails as ambient decoration or leaves hero/supporting objects unlabeled

## Edge-case checks

- direct deep links to `/browse/archetypes`, `/browse/design-lineages`, `/browse/attention-trust`, `/browse/sources`, `/examples/proof-blocks`, and `/examples/student-exemplars` remain coherent even when the visitor did not arrive from the guided tour first
- preserved deep links such as `/archetypes/[slug]` remain coherent, identify themselves as continuity or deep-reference surfaces, and point back to `/browse/archetypes` and `/tour/archetype`
- continuity routes such as `/archetypes`, `/design-styles`, `/persuasion`, and `/hero-examples` remain reachable if they are kept during migration, but clearly expose their canonical family destination
- browse-room and examples-family navigation stays correct on mobile when the main interpretation panel and return CTA stack vertically
- any new canonical subroutes added to browse or examples remain aligned with selected-release registry and sitemap output
- primitive-example routes under `/examples/module`, `/examples/lesson`, and `/examples/reading-map` remain coherent even after the broader examples family becomes more outcome-focused

## Accessibility checks

- browse rooms preserve logical heading structure, visible route-status text, and keyboard-reachable return-to-tour links
- compare boards, lineage surfaces, and evidence cards remain legible on small screens and by assistive technology
- examples pages use readable captions, alt text, and annotation text so the teaching value is understandable without inference from imagery alone
- evidence-tier language in the sources room remains explicit in text, not only visual ornament
- return-to-tour and related-room cues remain understandable without relying on layout position or color alone
- object-label packages remain readable as text and do not require the visitor to infer provenance or teaching purpose from visuals alone

## Browser and usability checks

- five-second classification check: a viewer can tell whether the page is a browse room, an examples surface, or a guided step on first look
- return-path check: a browse-room or examples-page visitor can identify the owning guided step without scanning the entire page
- browse-family landing check: a visitor can tell which room to open for archetype comparison, visual lineage, attention and trust, or research provenance in one scan
- examples-family landing check: a visitor can tell which example route to open for proof anatomy versus end-to-end finished work in one scan
- migration check: legacy browse and hero-example routes, if still present, clearly expose the canonical `/browse/*` or `/examples/*` destination
- density check: a first scan of each browse room still reveals the room purpose, hero object, and return path before dense supporting material takes over

## Export and deploy checks

- static build remains valid after adding the canonical `/browse/*` and `/examples/*` route set
- selected-release route metadata and sitemap output are updated in the same sprint as any new canonical support and proof routes
- browser coverage runs against the canonical browse and examples routes in exported preview mode, not only dev mode
- no Sprint 3 implementation should depend on hidden server-only state for room classification, return-path cues, or examples annotations

## Out of scope

- instructor-guide rewrite beyond any links or handoffs needed to keep route-family references coherent
- final alias and redirect hardening for all legacy browse and examples routes
- support-route cleanup for recipes, layouts, tokens, process, or status beyond any link adjustments needed for family coherence
- complete migration of every deep archetype slug route beyond the minimum wrapper, return handoff, and sitemap exclusion needed to keep direct deep links coherent

## Exit criteria

Sprint 3 is done when the browse-reference wing and the examples family both behave like explicit support and proof families, the canonical `/browse/*` and `/examples/*` routes no longer feel provisional, the deep rooms and proof surfaces visibly hand back to the guided tour, and the resulting optional-depth experience is clear enough to pass lightweight family-classification and return-path validation before Sprint 4 begins.
