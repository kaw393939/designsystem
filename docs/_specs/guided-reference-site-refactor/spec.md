# Guided Reference Site Refactor Spec

## Status

- Status: Active planning source of truth
- Scope: the current root-site experience, top-level IA, guided-tour choreography, browse-reference choreography, and cross-route decision handoffs
- Primary research basis: `docs/_research/identity-system-core.md`, `docs/_research/identity.md`, and `docs/_research/books/transcripts/the-hero-and-the-outlaw/source-brief.md`
- Primary planning basis: the identity-first-site project set and the BSEAI IA review set under `docs/_projects/`
- Current implementation anchors: `app/page.tsx`, `components/site-header.tsx`, `components/site-header-nav.tsx`, `lib/archetype-atlas-content.ts`, and `lib/web-presence-site-content.ts`

## Project purpose

Refactor the current site so it behaves like a museum-school with two explicit modes instead of a single atlas-first surface:

1. a guided tour that moves a learner from orientation to decision to build to deployment
2. a browse-reference wing that supports comparison, deeper study, and return visits after the tour

The site should support the teaching outcome described repeatedly across the research and project docs:

Need -> Signal -> Style -> Proof -> CTA -> Publish -> Repeat

That chain should shape the public IA, not only the workbook copy.

## Problem statement

The current site contains strong material, but the surfaced experience still has structural failures.

1. Two competing IA models exist in the repo.
   The current header and homepage expose the archetype atlas as the main product surface, while the workbook, deliverables, and instructor materials define a clearer guided workshop model.
2. The root route behaves like a topical overview instead of a start-here lobby.
   Visitors are shown important ideas, but the first screen does not clearly separate first-time learning, active building, reference browsing, and instruction.
3. The top navigation over-promotes browse surfaces.
   Archetypes, style lab, hero examples, and persuasion are visible as peers even though they do not play equal roles in the learner journey.
4. The guided path exists, but it is not dominant.
   The workbook and deliverables already contain a strong action spine, but that spine is not the primary route family.
5. Browse rooms do not consistently hand off back into production decisions.
   Students can compare and admire concepts without leaving with the exact decision that must change on the page.
6. The archetype system still lacks a formal decision rubric and congruence test.
   This leaves too much room for taste-based or flattering choices.
7. Museum-style room rules are under-specified.
   The project docs already flag missing room templates, object hierarchy, quote discipline, evidence tiers, and cognitive-load limits.
8. Publish and repeat remain under-surfaced in the public IA.
   The research treats public deployment as part of the system, but the site still presents that step as weaker than it should be.
9. Some current top-level surfaces are doing too similar a job.
   A more aggressive split between guided pages and reference rooms is needed.
10. The refactor must remove duplicate doors.
   Examples need one canonical family and publish must remain one finish step inside the guided tour.
11. The guided path needs a persistent learner record that carries decisions forward.
   Each step should produce an output and update a visible tour record that keeps those outputs connected.
12. The package must require obviousness testing.
   The new lobby, labels, and return paths should be validated with first-click, five-second, and resume-path checks.
13. The package must preserve strong instructional sequencing.
   Route families, prerequisite integrity, route status, misconceptions, and formative checks need to stay explicit enough to guide implementation.

## Refactor thesis

Move from an atlas-first field guide to a dual-mode museum-school.

The site should feel like this:

1. the lobby answers: where do I begin right now
2. the guided tour answers: what decision do I make next
3. the browse wing answers: what do I want to study in more depth
4. the examples wing answers: what does better look like in practice
5. the instructor layer answers: how do I teach or assign this sequence

The current codebase already contains most of the raw content for this model. The refactor is primarily about staging, route contracts, navigation, and room discipline.

The better metaphor is not only a museum. It is a guided museum studio:

1. one clear entrance
2. one route map
3. one visible visitor booklet or tour record
4. one separate reference wing
5. one examples wing that proves the museum teaches something useful

## Combined review lenses

This package now combines three design lenses that need to agree with each other.

### 1. Curator and exhibit-designer lens

The site must stage objects, transitions, evidence, and room hierarchy deliberately.

### 2. Steven Krug usability lens

The site must make the next click, the page purpose, and the route-family difference obvious enough that the visitor does not have to puzzle it out.

### 3. Instructional-design lens

The site must change the learner's state step by step, preserve prerequisite integrity, and leave visible outputs that can be reviewed, revised, and carried forward.

## Research-grounded doctrine

The refactor should follow these research-backed rules.

### Identity-system rules carried forward

1. Start from audience need before style taste.
2. One primary archetype should govern the first read.
3. Style should translate the signal, not replace it.
4. Proof must sit near the promise.
5. The next move must be explicit.
6. Deployment is part of the assignment, not optional enrichment.

### Hero-and-Outlaw rules carried forward

1. Archetypes are meaning systems, not personality entertainment.
2. The four cluster families are best used as a browse and compare taxonomy.
3. The choice of archetype must connect to audience fit, proof fit, tone fit, and category essence.
4. Congruence matters across public signal, actual artifact, and operating behavior.

### Curatorial rules carried forward

1. Not every object deserves equal prominence.
2. Rooms need hero objects, supporting objects, and reference objects.
3. Quote rails should sharpen interpretation rather than decorate.
4. A room should teach one dominant move and then hand the visitor onward.

### Accessibility and cognitive-load rules carried forward

1. Summary must come before depth.
2. Dense rooms must be broken into bounded panels.
3. Audio requires transcripts.
4. Diagrams and charts require textual takeaways and long descriptions when needed.
5. The room should be understandable by a skim-first visitor before it rewards the slow read.

### Krug-style usability rules carried forward

1. The first click should be obvious from the lobby.
2. Public-facing labels should describe the visitor's task, not only the internal conceptual model.
3. A returning visitor should be able to resume the build path in one click.
4. No route family should have duplicate doors unless the alias policy is explicit and temporary.
5. Obviousness should be tested with lightweight checks rather than assumed from planning prose.

### Instructional-design rules carried forward

1. Every guided step must declare its prerequisite and its output.
2. Every guided step must surface one common misconception or trap.
3. Every guided step must end with one small formative check.
4. Deep rooms should include an apply-now or transfer block, not only interpretation.
5. Route status must be explicit: `Entry`, `Required in tour`, `Recommended support`, `Optional reference`, `Instructor only`, or `Wrapper-specific`.
6. The learner should accumulate a visible tour record across the guided path.

## Primary users

### 1. First-time student

Needs a clear entry ladder, a short guided path, and enough seriousness to feel the work matters.

### 2. Returning builder

Needs a fast route back into the exact step they are currently working on without being forced through the museum intro again.

### 3. Instructor

Needs a wrapper that explains sequencing, prompts, materials, and watch-fors without reconstructing the logic from deep rooms.

### 4. Reference browser

Needs the freedom to compare rooms, archetypes, examples, and sources without being mistaken for the primary student journey.

### 5. Maintainer and author

Needs explicit room rules, route jobs, evidence labeling, and decision-output contracts so new pages do not drift.

## Experience goals

The refactored site should feel:

- directed
- serious
- curated
- concrete
- memorable
- visually rich but controlled
- useful on the first read

Every route should help the visitor answer three questions quickly:

1. Why am I here now?
2. What is this page trying to help me decide or do?
3. What should I open next?

## Architecture doctrine

### 1. The root route becomes a lobby, not an atlas landing page

The root route should stop behaving like the front page of the archetype atlas.

Its primary job is to sort visitors into the right lane:

1. start the guided tour
2. resume build work
3. browse the museum/reference rooms
4. open instructor materials

The lobby first screen must contain:

1. one dominant CTA
2. one secondary CTA
3. one proof object or example cue
4. one plain-language explanation of guided versus browse mode
5. no more than four role or intent options

### 2. Guided tour and browse wing must be separate route families

The current site should stop making deep browse rooms look like the required path.

The refactor should establish explicit route families for:

1. guided tour
2. browse-reference rooms
3. examples
4. instructor and wrapper pages
5. support and system pages

### 3. Guided steps must produce explicit decision artifacts in a visible tour record

Each guided step must leave the learner with one output that changes the next build move.

Examples:

1. audience and need sentence
2. primary archetype and promise
3. visual lane choice and anti-pattern list
4. proof-block specification
5. build prompt or agent spec
6. public deployment asset

Those outputs should not remain hidden in copy. They should appear in a persistent learner-facing tour record or strategy pack across the guided route family.

### 4. Browse rooms must always point back to the tour

Every deep room must answer three things near the top or bottom:

1. use this room when
2. what this should change in your build
3. where to go back in the guided tour

### 5. Examples are a first-class family with one canonical home

Hero examples, before-and-after corrections, proof blocks, and student exemplars should not remain scattered as supporting ornaments.

They should become an explicit family that proves the site earns its claims.

Examples should have one canonical home in the IA. They should not live half inside Browse and half outside it.

### 6. Evidence tiers must be visible

The site should label whether something is:

1. verified evidence
2. interpreted synthesis
3. concept model
4. generated illustration

This protects trust and prevents the rooms from feeling like AI-generated mood boards.

### 7. Aggressive refactor is allowed

The implementation is allowed to make structural changes that are larger than cosmetic cleanup.

Allowed moves include:

1. changing the root-page job entirely
2. replacing the current top nav with a new route-family model
3. demoting current top-level browse pages out of primary navigation
4. creating new guided-tour routes even when deep browse pages already exist
5. merging, nesting, redirecting, or aliasing overlapping routes
6. moving current content blocks out of the homepage without preserving the old shape

### 8. Publish must remain a visible teaching step

The site should treat publishing, follow-up, and weak-tie circulation as part of the guided path, not as a postscript.

### 9. Route status must be explicit

Every surface should visibly tell the visitor whether it is:

1. `Entry`
2. `Required in tour`
3. `Recommended support`
4. `Optional reference`
5. `Instructor only`
6. `Wrapper-specific`

### 10. Cognitive-load limits are part of the build contract

No room should be considered good merely because it is rich.

The room must also be bounded, scannable, and teach one dominant move.

### 11. Every guided page must include one misconception and one formative check

The tour should not only explain ideal choices. It should expose the mistake most likely to derail that step and then require one small proof that the learner understood the move.

### 12. Obviousness must be validated before the IA is considered stable

The lobby, route labels, and resume paths should pass lightweight first-click and five-second checks before implementation is considered successful.

## Target experience model

The refactored site should use these route families.

### 1. Lobby family

Purpose:

- route the visitor into the right mode
- explain the difference between guided tour and browse mode
- show one clear proof cue and one clear primary CTA

### 2. Guided tour family

Purpose:

- move from need to signal to build to public action
- stay shorter than the reference wing
- produce explicit decision outputs at each step
- display the current tour record at each step

### 3. Browse-reference family

Purpose:

- let visitors compare archetypes, design lineages, trust patterns, examples, and source-backed rooms
- support return visits after the guided tour
- remain optional for completion of the core path

### 4. Examples family

Purpose:

- make the site visually and pedagogically credible
- prove that better choices look different from weaker ones
- give learners worked examples, revisions, and exemplars they can transfer into their own work

### 5. Instructor and wrapper family

Purpose:

- tell instructors and course-specific users exactly how to sequence the material
- keep wrapper logic out of the browse rooms

### 6. Support and system family

Purpose:

- expose recipes, layouts, process, tokens, status, and other infrastructure pages without allowing them to compete with the student journey

## Non-goals

The refactor does not aim to:

1. preserve the current atlas-first homepage shape
2. keep every existing top-level browse page in primary navigation
3. make every deep room mandatory for first-time students
4. treat the guided tour and the reference wing as equal entry points
5. let strong content volume stand in for choreography or curation
6. solve implementation by adding more theory to the root route

## Acceptance criteria

### Product acceptance

1. The root route becomes a clear lobby with distinct CTAs for first-time students, returning builders, reference browsers, and instructors.
2. The guided path is visible as the main route family.
3. Browsing and guided work are both supported, but they are no longer confused with each other.
4. The publish step is visible in the same family as the earlier build steps.
5. Examples have one canonical home in the IA.
6. Guided pages expose a visible tour record rather than leaving decisions implicit.

### Architecture acceptance

1. The global nav reflects route families instead of a flat list of deep rooms.
2. Each route has one dominant job and one dominant next move.
3. Every browse room has a clear return-to-tour handoff.
4. Overlapping pages are merged, nested, or demoted rather than preserved for convenience.
5. Route status is visible across required, recommended, optional, and instructor-only surfaces.
6. Public-facing labels are simpler and more task-oriented than the internal model when needed.

### Curatorial acceptance

1. Room templates specify hero objects, supporting objects, reference objects, quote limits, evidence-card limits, and next-move expectations.
2. The site visually distinguishes interpretation from verified evidence.
3. Examples and exemplars become a more visible proof family.
4. Objects use a consistent label format that identifies what the object is, why it is here, and what it proves.

### Instructional acceptance

1. Each guided step declares its prerequisite and its output artifact.
2. Each guided step surfaces one common misconception or trap.
3. Each guided step ends with one small formative check.
4. Deep rooms include an apply-now transfer block rather than stopping at interpretation.

### Content acceptance

1. The lobby and guided pages speak directly and concretely.
2. Guided pages begin from page problems and decisions, not deep theory.
3. Browse rooms can be richer, but still state what decision they should change.
4. The archetype system uses a real decision rubric and congruence checklist.
5. The lobby explains the tour-versus-browse distinction in plain language within the first screen.

### Accessibility and media acceptance

1. Dense rooms use summary-before-depth structure.
2. Audio ships with transcript.
3. Diagrams and charts include textual takeaways and long descriptions when needed.
4. Room density limits reduce the risk of technically accessible but cognitively overwhelming pages.

### Validation acceptance

1. A first-time visitor can choose the correct lane from the lobby in a lightweight first-click test.
2. A visitor shown the first screen for five seconds can explain whether the page is a tour step, a browse room, an examples page, or an instructor surface.
3. A returning visitor can reach the build step in one click from the lobby.
4. A browse-room visitor can identify the return-to-tour step without searching the whole page.

## Delivery rule

Implementation work for this refactor must follow the existing runbook under `docs/_specs/educational-design-system/operating-runbook.md`.

This spec defines the target site model. It does not replace the repository's planning QA, implementation QA, or release gates.