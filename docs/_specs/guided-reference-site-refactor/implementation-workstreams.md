# Guided Reference Site Refactor Implementation Workstreams

## Purpose

Break the approved guided-reference package into bounded implementation workstreams that can be planned, implemented, QAed, and closed one by one without reopening the IA argument every sprint.

This document does not replace the package specs. It translates them into execution order.

Treat these as the governing inputs for every workstream:

1. `spec.md`
2. `page-jobs.md`
3. `content-doctrine.md`
4. `decision-rubrics.md`
5. `migration-plan.md`

## Sequence

| Workstream | Title | Primary outcome | Depends on |
| --- | --- | --- | --- |
| 1 | Lobby and route-family shell | the entrance, top nav, and route-family model become obvious | approved package |
| 2 | Guided-tour frame and visible tour record | guided pages share one shell, one step model, and one persistent learner record | 1 |
| 3 | Guided decision steps | the first half of the tour goes live: signal, archetype, and style | 2 |
| 4 | Guided execution steps | the second half of the tour goes live: proof, build, and publish | 3 |
| 5 | Browse wing reframing | deep rooms become optional reference with explicit handoff back to the tour | 4 |
| 6 | Examples family and proof surfaces | examples get one canonical home and visibly prove the system | 4 |
| 7 | Instructor and support-route cleanup | instructor logic and support routes stop competing with the student path | 5, 6 |
| 8 | Alias, validation, and release hardening | redirects, route cleanup, browser validation, and final IA proof are locked | 7 |

## Recommended four-sprint roadmap

The eight workstreams can be compressed into four larger implementation sprints without weakening the QA model.

This is the recommended execution shape if the team wants fewer handoffs while still preserving one dominant UX objective per sprint.

| Sprint | Bundles these workstreams | Primary outcome | Depends on |
| --- | --- | --- | --- |
| 1 | 1 and 2 | the site entrance, top nav, guided shell, and visible tour record become stable | approved package |
| 2 | 3 and 4 | the guided tour becomes a full end-to-end path from signal through publish | 1 |
| 3 | 5 and 6 | browse and examples become distinct support and proof families instead of competing entry points | 2 |
| 4 | 7 and 8 | instructor logic, support-route cleanup, alias policy, and final validation make the IA releasable | 3 |

### Sprint 1: Entry and tour foundation

- Bundles: Workstream 1 and Workstream 2.
- Why this bundle works: the lobby, route-family nav, guided-page shell, and visible tour record must agree before individual guided steps multiply.
- Must deliver:
  1. lobby-first homepage
  2. route-family top nav
  3. reusable route-status pattern
  4. guided-page shell
  5. visible tour-record component
  6. route metadata for sequence, prerequisite, output, and next move
- Must prove:
  1. a first-time student can tell where to start within one screen
  2. a returning builder can find the production path in one click
  3. guided pages no longer need one-off progress or state chrome
- QA gate:
  1. one planning QA artifact for the sprint brief
  2. one implementation QA artifact for the shipped shell and lobby behavior
  3. first-click and five-second evidence focused on the root route and top navigation
- Exit criteria: the entrance and guided frame are stable enough that later guided-step work can fill a shared system rather than invent one.

### Sprint 2: Guided-tour completion

- Bundles: Workstream 3 and Workstream 4.
- Why this bundle works: the first half and second half of the guided path should be built as one continuity pass so the tour reads as one coherent sequence instead of two disconnected releases.
- Must deliver:
  1. `/tour/signal`
  2. `/tour/archetype`
  3. `/tour/style`
  4. `/tour/proof`
  5. `/tour/build`
  6. `/tour/publish`
  7. alias or migration handling for `/playbook`, `/workbook`, and `/deliverables`
- Must prove:
  1. a learner can move from audience and promise through proof, build, and publish without leaving the canonical tour
  2. each step updates the visible tour record correctly
  3. publish is clearly part of the same family as the earlier decisions
- QA gate:
  1. one planning QA artifact for the sprint brief
  2. one implementation QA artifact covering all guided routes
  3. resume-path evidence showing users can return to the right active build step
- Exit criteria: the required path is complete end to end and behaves like the primary user journey.

### Sprint 3: Browse and examples families

- Bundles: Workstream 5 and Workstream 6.
- Why this bundle works: browse rooms and examples are both secondary families that need to support the guided tour without reclaiming the main entrance.
- Must deliver:
  1. browse landing at `/browse/`
  2. reframed browse rooms for archetypes, design lineages, attention and trust, and sources
  3. examples landing at `/examples`
  4. example subroutes such as proof blocks and student exemplars
  5. room chrome and example annotations that hand back to the owning tour step
- Must prove:
  1. browse rooms are clearly optional depth
  2. examples visibly prove the system rather than acting as decoration
  3. users can move from a browse room or example back into the relevant guided step without confusion
- QA gate:
  1. one planning QA artifact for the sprint brief
  2. one implementation QA artifact covering browse and examples behavior
  3. return-path evidence showing that optional depth does not strand the user away from the tour
- Exit criteria: the reference wing and proof surfaces support the main tour without competing with it.

### Sprint 4: Instructor, support cleanup, and release hardening

- Bundles: Workstream 7 and Workstream 8.
- Why this bundle works: Sprint 3 finished the canonical `/browse/*` and `/examples/*` families, so the remaining release-risk now sits in instructor drift, support-route positioning, continuity policy, and final public-IA validation.
- Must deliver:
  1. updated instructor guide aligned to `/tour/signal` through `/tour/publish` and the visible tour-record outputs
  2. clarified support-route positioning for `/recipes`, `/layouts`, `/tokens`, `/process`, and `/status`
  3. finalized continuity matrix for `/playbook`, `/workbook`, `/deliverables`, `/archetypes`, `/archetypes/[slug]`, `/design-styles`, `/persuasion`, and `/hero-examples`
  4. release, registry, and sitemap cleanup for the post-Sprint-3 public IA, including any decision about whether older `experience-identity-portfolio*` proof routes remain in the same release fixture
  5. route cleanup for stale labels, stale navigation, duplicate-family language, and any continuity copy that still reads as canonical
  6. validation evidence for first-click, five-second, resume-path, return-path, and continuity-or-redirect behavior
- Must prove:
  1. instructors can use the system without reconstructing the student sequence manually from older workshop abstractions
  2. support routes no longer compete with the primary learning path or look like parallel curricula
  3. legacy entry points either redirect cleanly where the stack allows it or clearly expose their new family role through explicit wrapper guidance
  4. the selected release, sitemap, and visible UI now tell the same public story about what is canonical, what is support, and what is continuity only
- QA gate:
  1. one planning QA artifact for the sprint brief
  2. one implementation QA artifact for the stabilization pass
  3. one release QA artifact if this sprint produces the releasable IA cutover
- Exit criteria: the guided-tour plus browse-reference IA is stable, internally consistent, and ready for release or wider rollout.

## Cross-workstream rules

1. No workstream may reintroduce atlas-first primary navigation.
2. No guided page may ship without a visible current-step marker, a visible tour record excerpt, one misconception, and one formative check.
3. No browse room may ship without `Use this room when`, `What this changes in your build`, `Return to tour`, and a visible route-status label.
4. Accessibility, mobile behavior, and obviousness checks happen inside each workstream rather than in a cleanup pass.
5. Legacy flat routes may survive temporarily as aliases or redirects, but they are never the canonical IA.
6. Every completed implementation slice should end with updated docs, approved planning QA, approved implementation QA, and explicit test evidence. In the four-sprint roadmap, the sprint bundle is the QA slice.
7. If a workstream starts mixing more than one dominant UX objective, split it before implementation.

## QA rhythm

The package can be executed in either of these modes:

1. one sprint per workstream when the team wants the lowest-risk, most granular sequence
2. one sprint per bundled roadmap stage in the recommended four-sprint roadmap above

In both modes, no implementation should start without an approved sprint brief and its planning QA artifact.

Recommended naming pattern for the four-sprint roadmap:

1. sprint brief: `docs/_specs/guided-reference-site-refactor/sprints/guided-reference-sprint-<n>-<slug>.md`
2. planning QA: `docs/_qa/planning/sprints/guided-reference-sprint-<n>-<slug>.planning-qa.md`
3. implementation QA: `docs/_qa/implementation/sprints/guided-reference-sprint-<n>-<slug>.implementation-qa.md`

Optional naming pattern if the team chooses to run one sprint per workstream instead:

1. sprint brief: `docs/_specs/guided-reference-site-refactor/sprints/guided-reference-ws-<n>-<slug>.md`
2. planning QA: `docs/_qa/planning/sprints/guided-reference-ws-<n>-<slug>.planning-qa.md`
3. implementation QA: `docs/_qa/implementation/sprints/guided-reference-ws-<n>-<slug>.implementation-qa.md`

This package-level plan is the sequence map. The active sprint brief, whether it covers one workstream or one bundled roadmap stage, should contain the exact file list, test matrix, and stop conditions.

## Workstream 1: Lobby and route-family shell

- Goal: make the entrance obvious and replace atlas-first framing with the route-family model.
- Scope:
  1. rewrite the root route around the role-based start-here ladder
  2. replace the current header navigation with `Start`, `Tour`, `Browse`, `Examples`, and `Instructor`
  3. add visible route-status labels and public task-language labels
  4. harden mobile navigation and first-screen CTA clarity
- Likely touch points:
  1. `app/page.tsx`
  2. `components/site-header.tsx`
  3. `components/site-header-nav.tsx`
  4. `components/local-nav.tsx`
  5. route-family navigation content in `lib/`
- Deliverables:
  1. lobby-first homepage
  2. route-family top nav
  3. reusable route-status display pattern
  4. role-based CTA ladder for first-time, returning, browse, and instructor intents
- Positive tests:
  1. a first-time student reaches the start of the tour in one click
  2. a returning builder reaches build work in one click
  3. a reference browser can choose browse mode without mistaking it for the primary path
- Negative tests:
  1. the homepage no longer reads like an atlas landing page
  2. no deep browse room remains a primary-nav peer
  3. no CTA label requires internal vocabulary to understand
- Accessibility and usability checks:
  1. five-second test: a viewer can name where to start, resume, browse, and teach
  2. mobile nav does not bury the primary CTA ladder
  3. keyboard users can reach the primary route-family choices without friction
- Exit criteria: the root route sorts user intent within one screen and the top nav reflects the new family model.

## Workstream 2: Guided-tour frame and visible tour record

- Goal: create the shared structural contract for all guided pages before populating every step.
- Scope:
  1. define the guided-page shell
  2. define the step sequence model and current-step indicator
  3. define the persistent learner record or strategy-pack surface
  4. define how resume state and prerequisite messaging appear
- Likely touch points:
  1. shared shell components under `components/`
  2. route metadata and sequence content under `lib/`
  3. any local-nav or progress components reused by guided routes
- Deliverables:
  1. reusable guided-page shell
  2. visible tour-record component
  3. route metadata for step order, prerequisite, output, and next move
  4. consistent slot structure for misconception and formative-check blocks
- Positive tests:
  1. the same shell can render all guided steps without one-off page rescue wrappers
  2. a user can tell what step they are on and what output they have already produced
  3. a returning visitor can resume the current step without guessing
- Negative tests:
  1. no guided page invents its own progress chrome
  2. no guided route hides the current learner record
  3. no step omits prerequisite or output language
- Accessibility and usability checks:
  1. the sequence remains understandable on mobile
  2. current-step state is announced semantically, not only by color
  3. the tour record is compact enough to support scanning rather than hijacking the page
- Exit criteria: guided routes can now be built by filling a shared frame instead of re-solving layout, progress, and state each time.

## Workstream 3: Guided decision steps

- Goal: launch the first half of the tour so users can define message, archetype, and visual direction.
- Scope:
  1. create `/tour/signal`
  2. create `/tour/archetype`
  3. create `/tour/style`
  4. map `/playbook` into the new guided family as needed for continuity
- Likely touch points:
  1. new guided route files under `app/tour/`
  2. current `app/playbook/page.tsx`
  3. archetype and style content modules under `lib/`
  4. compare, rubric, and decision-support components under `components/`
- Deliverables:
  1. message step with audience, need, and promise output
  2. archetype step with explicit decision rubric and anti-patterns
  3. style step with one chosen lane, one contrast example, and apply-now block
  4. tour-record updates wired through all three steps
- Positive tests:
  1. a learner leaves the first three steps with a visible audience statement, primary archetype, and visual lane
  2. each step has one dominant forward CTA and one bounded optional-depth CTA
  3. each step writes the correct field into the tour record
- Negative tests:
  1. no step opens with a full browse-room wall before the main decision appears
  2. no step collapses guided and browse jobs into the same scroll
  3. no step requires a theory detour to move forward
- Accessibility and usability checks:
  1. summary comes before depth on each step
  2. visual comparisons remain readable on small screens
  3. a peer can understand the decision output without reading the entire page
- Exit criteria: a first-time student can make the first three decisions of the tour and see them persist.

## Workstream 4: Guided execution steps

- Goal: turn the earlier decisions into proof, build, and publish actions so the required path becomes end-to-end.
- Scope:
  1. create `/tour/proof`
  2. create `/tour/build`
  3. create `/tour/publish`
  4. promote or alias `/workbook` and `/deliverables` into the guided family
- Likely touch points:
  1. new guided route files under `app/tour/`
  2. current `app/workbook/page.tsx`
  3. current `app/deliverables/page.tsx`
  4. build, audit, and exemplar components under `components/`
- Deliverables:
  1. proof step with proof-block and CTA contract
  2. build step with page skeleton, workbook fields, and audit checklist
  3. publish step with deliverable requirements, finish-line check, and repeat loop
  4. end-to-end guided handoff from proof to examples or finish
- Positive tests:
  1. a learner can turn prior decisions into a proof plan, build brief, and public-facing asset
  2. build and publish steps feel like the continuation of the same tour, not detached utilities
  3. resume behavior lands users back in the production step they were last using
- Negative tests:
  1. publish is not treated as an orphan route outside the main path
  2. build work is not buried under unrelated theory depth
  3. old flat routes do not out-rank the canonical guided routes
- Accessibility and usability checks:
  1. build and audit checklists are keyboard-friendly and readable
  2. the next move after publish is obvious
  3. the guided path remains scannable even with denser action content
- Exit criteria: the guided tour is complete from first decision through publish and repeat.

## Workstream 5: Browse wing reframing

- Goal: preserve deep study while making it clearly optional reference rather than the first-time path.
- Scope:
  1. create the browse landing at `/browse/`
  2. reframe archetypes, design lineages, attention and trust, and sources as browse rooms
  3. apply room chrome, object hierarchy, evidence labels, and return-to-tour rules
- Likely touch points:
  1. `app/archetypes/`
  2. `app/design-styles/page.tsx`
  3. `app/persuasion/page.tsx`
  4. any new `app/browse/` route wrappers
  5. browse-room support components under `components/`
- Deliverables:
  1. browse landing with room map and room-purpose labels
  2. browse-room chrome with `Use this room when`, `What this changes`, `Return to tour`, and `Next related room`
  3. bounded room layouts that respect the content-doctrine density rules
  4. a dedicated sources room for provenance and longer reading
- Positive tests:
  1. every browse room tells the visitor what decision it should sharpen
  2. a reference browser can move among rooms without losing the path back to the tour
  3. room labels make optional status explicit
- Negative tests:
  1. no browse room reads like the required first step
  2. no room becomes an orphan with no route back to build work
  3. no room mixes lobby, compare, and build jobs in the same scroll
- Accessibility and usability checks:
  1. skim-first summaries exist before dense panels
  2. headings and compare structures remain readable on mobile
  3. charts, diagrams, and media retain textual takeaways and transcripts when needed
- Exit criteria: deep rooms now support the guided path instead of competing with it.

## Workstream 6: Examples family and proof surfaces

- Goal: give examples one canonical home and make them prove the system through visible outcomes.
- Scope:
  1. create the `/examples` landing
  2. consolidate `hero-examples` into the examples family
  3. build example subroutes such as proof blocks and student exemplars
  4. connect each example back to the owning tour step
- Likely touch points:
  1. `app/hero-examples/`
  2. any new `app/examples/` routes
  3. preview, annotation, and card components under `components/`
  4. example content modules under `lib/`
- Deliverables:
  1. examples landing with before-and-after and critique framing
  2. annotated example cards or blocks with decision-trail captions
  3. proof-block example surface tied back to `/tour/proof`
  4. student-exemplar surface tied back to build and publish outputs
- Positive tests:
  1. examples explain what changed and why, not only what looks good
  2. a user can jump from an example to the exact guided step it proves
  3. the examples family reads as proof of the system rather than side inspiration
- Negative tests:
  1. no duplicate examples homes remain in the IA
  2. no gallery wall ships without captions or teaching value
  3. examples do not displace the guided start route in primary navigation
- Accessibility and usability checks:
  1. media assets have alt text, provenance, and readable captions
  2. annotations remain legible on mobile
  3. visual proof is paired with concise textual takeaways
- Exit criteria: examples become a first-class proof family with one canonical home.

## Workstream 7: Instructor and support-route cleanup

- Goal: keep instructor and support surfaces useful without muddying the student journey.
- Scope:
  1. update `/instructor-guide` around the new guided-tour outputs
  2. clarify how wrapper routes or course-specific overlays point into the canonical tour
  3. demote support routes so they remain available without competing with the primary path
- Likely touch points:
  1. `app/instructor-guide/page.tsx`
  2. support-route surfaces such as `app/recipes/`, `app/layouts/`, `app/tokens/`, `app/process/`, and `app/status/`
  3. header, local-nav, or footer structures that expose support routes
- Deliverables:
  1. instructor wrapper aligned to guided-tour sequence and outputs
  2. assessment criteria tied to learner-record fields
  3. explicit support-route positioning outside the main student ladder
  4. wrapper guidance for future course-specific routes
- Positive tests:
  1. an instructor can run the sequence without reconstructing the logic from multiple pages
  2. a student does not accidentally land in instructor-only or wrapper-only material while following the main path
  3. support routes remain reachable when needed but visually secondary
- Negative tests:
  1. no facilitator logic leaks into student tour pages as required content
  2. no support route reappears as a main entry point
  3. no course wrapper becomes a second canonical tour
- Accessibility and usability checks:
  1. labels reflect user tasks rather than internal taxonomy
  2. support-route demotion does not make them inaccessible to keyboard or search users
  3. instructor pages remain scannable despite denser operational content
- Exit criteria: the teaching layer becomes a wrapper around the tour rather than a competing curriculum.

## Workstream 8: Alias, validation, and release hardening

- Goal: make the new IA stable, testable, and safe to ship.
- Scope:
  1. finalize redirects and alias policy
  2. remove stale navigation affordances and duplicate-family language
  3. run browser validation for first-click, five-second, resume-path, and return-path behavior
  4. update route metadata, route tests, and release-facing docs as needed
- Likely touch points:
  1. route files across `app/`
  2. navigation and route metadata under `components/` and `lib/`
  3. browser and unit tests under `tests/`
  4. route-map files such as `app/sitemap.ts` where needed
- Deliverables:
  1. alias and redirect matrix with canonical-route confirmation
  2. browser validation evidence for route clarity and resume behavior
  3. updated navigation, sitemap, and metadata coverage for the new families
  4. final implementation QA artifacts for the workstream chain
- Positive tests:
  1. legacy routes redirect cleanly or expose their new family role clearly
  2. users can start, resume, browse, and return to tour reliably
  3. no duplicate canonical homes remain for tour, browse, examples, or publish surfaces
- Negative tests:
  1. no broken nav loops, stale labels, or contradictory family names remain
  2. no route retains old atlas-first framing after migration
  3. no validation step is skipped because the pages look coherent in planning prose
- Accessibility and usability checks:
  1. full keyboard pass across the new family model
  2. route labels remain understandable when read out of visual context
  3. mobile entry, resume, and return behaviors remain stable
- Exit criteria: the guided-tour plus browse-reference IA can be treated as stable and releasable.

## Recommended immediate next move

Start Sprint 4 now that Sprint 3 is implemented and QAed.

Do not treat the instructor guide, support-route positioning, or continuity policy as incidental cleanup after release. Those are now the main pieces that decide whether the shipped route-family IA is actually teachable, publicly coherent, and releasable.
