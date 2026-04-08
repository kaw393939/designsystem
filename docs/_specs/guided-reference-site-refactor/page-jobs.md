# Guided Reference Site Refactor Page Jobs

## Purpose

Define the route families, page jobs, audience ladders, and return-to-tour rules for the refactor so the site clearly separates guided learning from reference browsing.

## Global navigation model

The primary navigation should stop listing deep rooms as peers.

The target top-level nav groups are:

1. `Start`
2. `Tour`
3. `Browse`
4. `Examples`
5. `Instructor`

`Support` routes such as recipes, layouts, tokens, process, and status should remain available but should not compete with the primary teaching path.

`Deliverables` is not a separate top-level family. It is the finish step inside `Tour`.

## Public display-language map

The internal route model may use precise conceptual language. The public UI should prefer task language when it is clearer.

| Internal concept | Public-facing label goal |
| --- | --- |
| `Tour` | build your site |
| `Signal` | start with the message |
| `Archetype` | choose the signal |
| `Style` | pick the visual direction |
| `Proof` | show the proof |
| `Build` | build the page |
| `Publish` | put it in public |
| `Browse` | explore the rooms |

## Audience entry ladder

The lobby must route by visitor intent.

| Visitor type | Primary CTA | First destination | Secondary CTA | Rule |
| --- | --- | --- | --- | --- |
| First-time student | Start the tour | `/tour/signal` | See one strong example | do not force deep browse before the first decision |
| Returning student | Resume the build | `/tour/build` | Check the finish line | take them back to production, not theory |
| Reference browser | Browse the museum | `/browse/` | Open examples | make the optional nature of browse mode explicit |
| Instructor | Teach this sequence | `/instructor-guide` | Open the tour map | keep facilitation logic out of student tour pages |

## Route status labels

Every route family should expose one of these statuses visibly.

| Status | Meaning |
| --- | --- |
| `Entry` | the main threshold into the experience |
| `Required in tour` | part of the main guided path |
| `Recommended support` | useful support linked from the tour |
| `Optional reference` | browse and revisit depth, not required to progress |
| `Instructor only` | facilitation or wrapper logic, not part of the student path |
| `Wrapper-specific` | course- or cohort-specific routing layered on top of the canonical tour |

## Canonical guided-tour path

The guided tour is the required path for first-time and in-progress learners.

During migration, flat legacy routes may remain as aliases, but the canonical architecture should use the tour family below.

| Canonical route | Public label goal | Status | Prerequisite | Required output | Dominant job | Must include | Must not include | Next move |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Start | Entry | none | lane choice | Lobby and route sorting | start-here ladder, role-based CTAs, one proof cue, one explanation of guided versus browse mode | full atlas surfacing, long compare grids, equal-weight topic list | go to `/tour/signal` |
| `/tour/signal` | Start with the message | Required in tour | lane choice from lobby | audience sentence plus need statement | audience, need, and promise | audience sentence, need statement, one-sentence promise, first-read examples, current tour record, one misconception, one quick check | full archetype library, full style history, long research trail | go to `/tour/archetype` |
| `/tour/archetype` | Choose the signal | Required in tour | signal output | primary archetype plus promise direction | primary archetype decision | decision rubric, compare of top candidates, anti-patterns, primary plus subtle-secondary output, current tour record, one quick check | full 12-room browse experience, unrelated style history | go to `/tour/style` |
| `/tour/style` | Pick the visual direction | Required in tour | signal plus archetype output | chosen visual lane plus anti-patterns | visual lane and first-read hierarchy | one chosen lane, one contrast example, typography and imagery rules, current tour record, one apply-now block, one quick check | full movement survey, full browse-room density | go to `/tour/proof` |
| `/tour/proof` | Show the proof | Required in tour | signal, archetype, and style output | proof-block spec plus CTA contract | trust, proof, and CTA fit | proof-block anatomy, proof proximity, CTA contract, ethical persuasion guardrails, current tour record, one quick check | full persuasion catalog, unrelated deployment advice | go to `/tour/build` |
| `/tour/build` | Build the page | Required in tour | prior tour record outputs | page skeleton plus build brief | build sequence and audit | workbook fields, page skeleton, audit checklist, build brief output, current tour record, one peer-review check | full source library, broad reference browsing | go to `/tour/publish` |
| `/tour/publish` | Put it in public | Required in tour | build draft or build brief | post, opener, or follow-up asset | deployment, review, and repeat | deliverable requirements, post or meetup output, follow-up loop, reflection on what landed, current tour record, one finish-line check | archetype compare boards, style lab survey | go to `/examples` or finish |

## Browse-reference family

These routes support comparison, deep study, and return visits. They must never be mistaken for the required path.

| Canonical route | Current likely surface | Status | Dominant job | Use when | Must include | Must not include | Feeds step |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/browse/` | new route | Optional reference | browse landing | you want to explore by room instead of follow the tour | room map, room purpose labels, explicit note that browse mode is optional depth, clear status labels | start-here ladder for the guided path | any |
| `/browse/archetypes` | `/archetypes` | Recommended support | compare archetypes by family and first read | you need deeper comparison after the guided archetype step | family map, compare mode, decision handoff, return-to-tour links | workbook instructions | archetype |
| `/browse/design-lineages` | `/design-styles` | Recommended support | study visual lineages and how they shape meaning | you need more visual literacy than the guided style step provides | lineage framing, compare boards, translation-to-page decisions, return-to-tour links | core build sequence | style |
| `/browse/attention-trust` | `/persuasion` | Recommended support | study attention, trust, and ethical influence in depth | you need the why behind first-read and proof behavior | page-problem cards, experiments, ethics boundaries, return-to-tour links | broad start-page orientation | proof |
| `/browse/sources` | new route | Optional reference | see the longer research trail | you want sources, transcripts, and concept provenance | source clusters, evidence tiers, reading map | the main build ladder | any relevant step |

## Instructor and wrapper routes

| Canonical route | Current likely surface | Status | Dominant job | Must include | Must not include | Next move |
| --- | --- | --- | --- | --- | --- | --- |
| `/instructor-guide` | `/instructor-guide` | Instructor only | facilitation and sequencing | session plan, prompts, materials, watch-fors, wrapper notes, assessment criteria tied to tour outputs | deep compare rooms inline | point to tour and publish |
| `/courses/*` or experience wrappers | future wrapper routes | Wrapper-specific | course-specific pathing | assignment sequence, deadlines, wrapper-only requirements, canonical links into the tour, explicit required and optional room statuses | duplicate theory rooms | point to the exact guided-tour step |

## Examples family contract

The examples family should be treated as proof, not decoration.

| Canonical route | Status | Dominant job | Must include | Must not include |
| --- | --- | --- | --- | --- |
| `/examples/` | Recommended support | prove the system through visible outcomes | before-and-after comparisons, critique annotations, short captions, links to owning tour steps | generic inspiration gallery with no teaching job |
| `/examples/proof-blocks` | Recommended support | show what evidence looks like when done well | artifact anatomy, caption logic, trust takeaways, ties back to proof route | full archetype theory |
| `/examples/student-exemplars` | Recommended support | show strong end-to-end outcomes | brief, decision trail, finished page fragments, what changed | unannotated gallery wall |

## Persistent tour-record contract

Every guided page must display the current learner record in a compact, visible way.

The record should accumulate these fields as the visitor moves through the tour:

1. audience
2. need
3. primary archetype
4. subtle secondary trait if used
5. visual lane
6. proof plan
7. build brief
8. publish asset

Browse rooms should reference the relevant field they are meant to sharpen.

## Formative-check contract

Every guided page must end with one small check that proves the learner understood the move.

Examples:

1. can another person restate the audience and need
2. can a peer identify the archetype after a five-second look
3. can the learner reject two wrong visual lanes
4. can the learner point to the proof cue and CTA fit
5. can another person build from the brief
6. can the signal survive in a short public post

## Support routes

These remain useful but should be visually and structurally outside the main student path.

| Route | Dominant job | Keep as | Rule |
| --- | --- | --- | --- |
| `/recipes` | borrow a working page pattern | support route | solve a structure problem, then get out of the way |
| `/layouts` | choose or debug layout primitives | support route | help with structure, not curriculum |
| `/tokens` | explain tone and hierarchy contracts | support route | help authors and advanced builders, not first-time orientation |
| `/process` | explain how trust is produced through the system | support route | keep factual and bounded |
| `/status` | show what is done versus planned | support route | keep honest and non-marketing |

## Room-level navigation contract

Every browse room must include these navigation devices:

1. `Use this room when...`
2. `What this should change in your build`
3. `Return to tour step`
4. `Next related room`
5. visible route-status label

Every guided page must include these navigation devices:

1. one primary forward CTA
2. one bounded secondary CTA into optional depth
3. one visible reminder of the current step in the sequence
4. one visible excerpt of the current tour record
5. one misconception or trap callout
6. one formative check

## Forbidden route states

1. a browse room presented as if it were the required first step
2. a guided page that branches into multiple equal-priority theory options before the main action appears
3. a room with no explicit handoff back into the build path
4. a route that mixes lobby, comparison, and build jobs in the same scroll
5. a top nav that lists five deep rooms but no explicit build path
6. two different canonical homes for the same family such as examples or finish-line content