# Guided Reference Site Refactor Migration Plan

## Purpose

Map the current site surfaces into the target guided-tour plus browse-reference model so implementation can proceed decisively instead of preserving the current atlas-first structure by accident.

## Response to the current-site critique

| Current problem | Refactor response |
| --- | --- |
| The root route behaves like an atlas landing page | turn `/` into a lobby with a role-based CTA ladder |
| The top nav privileges browse rooms | replace flat topic nav with route-family nav |
| The workbook path exists but is not dominant | promote the guided tour as the primary site family |
| Deep rooms do not hand off back to build work | add `what this changes` and `return to tour` rules to every browse room |
| Archetype choice is still taste-driven in practice | add an explicit decision rubric and congruence checklist |
| The museum metaphor is strong but under-governed | add room templates, object hierarchy, quote rules, and density caps |
| Publish and repeat are under-surfaced | make deployment a named guided-tour step |

## Current top navigation to target model

The current primary nav is atlas-first.

| Current primary item | Current role | Target disposition |
| --- | --- | --- |
| `Overview` | atlas landing | convert into the lobby at `/` |
| `Choose` | partial guided step | fold into the guided tour as the archetype decision step |
| `Archetypes` | deep browse room | keep, but move under the `Browse` family |
| `Hero Examples` | example surface | move into the canonical `Examples` family |
| `Persuasion` | deep browse room | keep, but move under the `Browse` family |
| `Style Lab` | deep browse room | keep, but move under the `Browse` family |

## Route migration map

The current flat routes should be reorganized around explicit route families.

| Current route | Target role | Target route family | Migration rule |
| --- | --- | --- | --- |
| `/` | lobby | `/` | replace atlas-first hero and nav framing with role-based start-here logic |
| `/playbook` | guided archetype step | `/tour/archetype` | preserve strong process content, but treat the flat route as a legacy alias during migration |
| `/workbook` | guided build step | `/tour/build` | promote as a core-path route and keep the flat route as a temporary alias if needed |
| `/deliverables` | guided publish and finish step | `/tour/publish` | keep the evaluation logic, but make it explicitly part of the tour |
| `/instructor-guide` | instructor family | `/instructor-guide` | keep as a top-level route because the user intent is distinct |
| `/archetypes` | browse room | `/browse/archetypes` | keep deep content, add browse-room chrome and tour handoff |
| `/archetypes/[slug]` | deep browse room | `/browse/archetypes/[slug]` or preserved alias | preserve the deep dives, but treat them as browse destinations |
| `/design-styles` | browse room | `/browse/design-lineages` | keep the content, but reframe it as deeper reference rather than a main-nav peer |
| `/persuasion` | browse room | `/browse/attention-trust` | keep the content, but separate the guided proof step from the full room |
| `/hero-examples` | examples family | `/examples` | consolidate with before-and-after and exemplar surfaces in one canonical family |

## Current content-family migration

| Current content family | Target disposition | Reason |
| --- | --- | --- |
| `atlasHomeHighlights` | move to browse landing or examples support | useful, but not the main lobby contract |
| `familyOverviews` | keep in archetypes browse landing | good browse taxonomy from Hero and the Outlaw |
| `selectionSteps` | split between `/tour/archetype` and browse support | belongs to the guided decision step first |
| `designStyles` | keep as browse reference and distilled guided excerpt | too deep for primary path, valuable for return study |
| `heroExamples` | move into `/examples` | examples should become a first-class proof surface with one canonical home |
| `webPresenceSystemSteps` | promote into the lobby and guided tour | this is the clearest existing student-facing chain |
| workbook prompts and audit fields | keep in `/tour/build` | already aligned to build work |
| deliverable briefs and failure modes | keep in `/tour/publish` | already aligned to finish and review |

## Aggressive refactor permissions

The implementation may make the following changes without preserving the old IA shape.

1. Rewrite the homepage around the lobby contract.
2. Replace the current header nav entirely.
3. Create new guided-tour pages even if they duplicate high-level ideas from deep browse rooms.
4. Demote flat browse pages out of the primary nav.
5. Merge `hero-examples` into a larger examples family.
6. Preserve old flat routes only as aliases or redirects when that helps continuity.

## Implementation phases

Use `implementation-workstreams.md` for the bounded sprint-by-sprint execution sequence. The phases below remain the larger architectural grouping for that work.

### Phase 1: Establish the route-family shell

1. create the new top-nav model
2. establish route-family framing for `Start`, `Tour`, `Browse`, `Examples`, and `Instructor`
3. add role-based entry CTAs to the root route
4. add route-status labels and public display-language rules

### Phase 2: Establish the visible tour record

1. define the learner-facing tour record or strategy-pack surface
2. decide which fields appear on every guided page
3. wire each guided step to update one explicit field

### Phase 3: Promote the guided tour

1. create `/tour/signal`
2. move or alias `/playbook` into `/tour/archetype`
3. create `/tour/style`
4. create `/tour/proof`
5. promote `/workbook` to `/tour/build`
6. promote `/deliverables` to `/tour/publish`

### Phase 4: Reframe the browse wing

1. create `/browse/` landing
2. reframe `/archetypes`, `/design-styles`, and `/persuasion` as browse rooms
3. add room chrome: `use this room when`, `what this changes`, `return to tour`, and route-status labels

### Phase 5: Build the examples family

1. consolidate `/hero-examples` with additional before-and-after and exemplar surfaces
2. give examples an explicit landing and stronger links back to guided steps

### Phase 6: Encode decision rules, instructional rules, and curation rules

1. add the archetype decision rubric to the guided archetype step
2. add the congruence checklist to guided review points
3. apply room-template budgets, evidence tiers, and cognitive-load rules across browse rooms
4. add misconception blocks, apply-now blocks, and formative checks to guided pages

### Phase 7: Alias, redirect, and validation QA

1. keep old flat routes only where they reduce breakage during migration
2. ensure old routes either redirect cleanly or clearly expose their new family role
3. run route-by-route QA against the new page-job contracts
4. run first-click, five-second, resume-path, and return-path checks before calling the IA stable

## Alias and redirect policy

Use temporary aliasing during migration when it reduces disruption, but the canonical architecture should remain visible.

Recommended temporary aliasing:

1. `/playbook` -> `/tour/archetype`
2. `/workbook` -> `/tour/build`
3. `/deliverables` -> `/tour/publish`
4. `/hero-examples` -> `/examples`

Recommended content preservation without immediate redirect:

1. `/archetypes`
2. `/design-styles`
3. `/persuasion`

Those routes should be reframed first as browse surfaces before any later path-level migration is considered.

## Acceptance checklist for migration

1. The root route no longer reads as the front page of the atlas.
2. The top nav exposes a guided path more clearly than a flat topic list.
3. A first-time student can begin the tour without opening a browse room.
4. A returning student can jump straight to build work.
5. Browse rooms no longer feel like orphaned theory pages.
6. Examples visibly prove the system rather than living as side material.
7. Publish and repeat are visible as part of the same learning path as earlier decisions.
8. The examples family has one canonical home.
9. Every guided page displays the current tour record.
10. Route statuses are visible across tour, browse, examples, and instructor surfaces.
11. Lightweight obviousness checks pass before the IA is treated as stable.