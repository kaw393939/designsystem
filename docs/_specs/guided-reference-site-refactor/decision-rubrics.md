# Guided Reference Site Refactor Decision Rubrics

## Purpose

Define the decision artifacts, scoring rules, congruence checks, and browse-to-build crosswalks that the refactor needs in order to turn deep rooms into usable outputs.

## Core rule

The site should stop asking visitors to admire frameworks and start forcing better decisions.

Every guided step should output one artifact that changes the next build move.

## Persistent tour record or strategy pack

Those outputs should accumulate in one visible learner artifact.

Required fields across the tour:

1. audience
2. need
3. one-sentence promise
4. primary archetype
5. subtle secondary trait if any
6. visual lane
7. proof-block plan
8. CTA contract
9. build brief
10. publish asset

Rules:

1. the learner should see this record on every guided page
2. each guided page should say which field it is updating
3. browse rooms should name which field they sharpen

## Prerequisite and dependency map

The guided path should preserve prerequisite integrity.

| Guided step | Requires before entry | Produces before exit | Cannot be skipped because |
| --- | --- | --- | --- |
| Need and signal | lobby lane choice | audience sentence plus need statement | all later choices depend on who the page is for |
| Archetype | signal output | primary archetype plus promise direction | style and proof should not float free from the signal |
| Style | signal and archetype output | visual lane plus anti-pattern list | proof and build need a visual direction to organize around |
| Proof | signal, archetype, and style output | proof-block spec plus CTA contract | the build step should not invent trust logic from scratch |
| Build | prior tour record outputs | page skeleton plus build brief | the page cannot be assembled coherently without the earlier decisions |
| Publish | build draft or build brief | short public deployment asset | deployment is part of the system, not the bonus round |

## Primary-archetype decision rubric

The archetype step should score candidate options against fit, not flattery.

Use a 1 to 5 score for each dimension.

| Dimension | What to ask | Why it matters |
| --- | --- | --- |
| Audience fit | Does this archetype match what the target audience needs to feel first? | prevents self-flattering but irrelevant choices |
| Proof fit | Do I have artifacts that naturally support this signal? | prevents choosing an image the work cannot support |
| Tone fit | Can the headline, rhythm, and vocabulary honestly carry this archetype? | prevents mismatch between words and identity |
| Category essence fit | Does this fit what the underlying page or artifact is promising beyond surface style? | keeps the choice tied to the real object |
| Misuse risk | How likely is this archetype to be read in the wrong or shallow way here? | surfaces trap states early |
| Deployment fit | Will this signal still make sense in posts, conversations, and follow-up? | keeps the choice public-world viable |

### Scoring rule

1. No candidate can win if `audience fit` is below 4.
2. No candidate can win if `proof fit` is below 4.
3. Any candidate with high misuse risk must include an explicit mitigation note.
4. The chosen primary archetype should be the highest-scoring option that the current proof can honestly support.

### Required output

The guided archetype step should always end with:

1. chosen primary archetype
2. optional subtle secondary trait
3. one-sentence promise direction
4. one likely trap to guard against
5. one line explaining why the choice fits the audience and proof

## Category-essence note

The archetype decision must ask what the underlying page or artifact is actually promising.

Questions to ask:

1. What kind of relief, aspiration, control, belonging, transformation, or guidance is this page really promising?
2. What would feel false even if it looked stylish?
3. What kind of public behavior would make this identity collapse?

## Congruence checklist

After the archetype and style decisions are made, the page should pass this congruence check.

| Layer | Pass question |
| --- | --- |
| Audience | Does the page still feel aimed at one real person in one situation? |
| Promise | Is the one-sentence promise specific enough to remember? |
| Voice | Does the headline and supporting copy sound like the chosen archetype? |
| Visuals | Do the imagery, hierarchy, and typography support the same signal? |
| Proof | Does the visible evidence match the same promise instead of a different one? |
| CTA | Does the call to action sound like the same person the page introduced? |
| Behavior | Would the real artifact, service, or person behind the page behave in a way that matches this identity? |
| Deployment | Does the same signal survive in posts, presentations, and follow-up messages? |

If the answer is no on any layer, the page is not yet coherent.

## Guided-step output contract

The tour should serialize decisions instead of keeping them implicit.

| Guided step | Required output | It controls | Common misconception | Formative check |
| --- | --- | --- | --- | --- |
| Need and signal | audience sentence plus need statement | first-screen framing and stakes | confusing audience definition with a generic market category | can another person restate who the page is for and what tension it solves |
| Archetype | primary archetype, subtle secondary, one-sentence promise | headline tone, emotional frame, image logic | choosing the most flattering archetype instead of the best-fit one | can a peer identify the signal after a five-second look |
| Style | visual lane, type and hierarchy rules, anti-pattern list | grid, pacing, imagery, typography, density | picking a style before the signal is stable | can the learner name one chosen lane and two lanes that would be wrong |
| Proof | proof-block spec and CTA contract | placement of receipts, trust cues, next-step language | using adjectives where receipts are needed | can the learner point to the proof cue and explain why it belongs near the claim |
| Build | page skeleton plus agent spec or implementation brief | actual production work | treating the brief like mood language instead of executable instruction | could another person or agent build the intended page from this brief |
| Publish | post, opener, or follow-up asset | public deployment and repetition | treating deployment as optional after the page is done | does the same signal survive in a short post or spoken opener |

## Instructor assessment alignment

The guided outputs should be reviewable by instructors and peers.

| Tour output | Review question |
| --- | --- |
| audience and need | is the page clearly aimed at one person in one situation |
| archetype and promise | does the signal feel coherent rather than flattering or mixed |
| visual lane | does the page look like the same promise it claims |
| proof plan | is the evidence both visible and native to the promise |
| build brief | is the instruction concrete enough to execute |
| publish asset | can the signal travel beyond the page itself |

## Browse-to-build crosswalk

Deep rooms should not only teach concepts. They should feed exact assignment fields.

| Browse room | Decision output | Build artifact it feeds | Owning guided step |
| --- | --- | --- | --- |
| Archetype room | primary signal, trap, proof style, CTA tone | promise line, voice rules, image choice | archetype |
| Design-lineage room | chosen visual lane and anti-patterns | layout, type, imagery, density rules | style |
| Attention and trust room | proof and attention hypotheses | proof block, hero composition, CTA placement | proof |
| Examples room | concrete model to emulate or avoid | build brief and revision targets | build |
| Sources room | verified anchor or deeper context | captions, citations, evidence labels | any relevant guided step |

## Decision-room completion rule

No decision room is finished unless the visitor can leave with:

1. one choice
2. one reason
3. one anti-pattern
4. one next move

## Obviousness and comprehension checks

The planning package should require lightweight validation of the IA and the outputs it produces.

1. Lobby first-click check: can a first-time visitor choose the tour, browse wing, examples family, or instructor layer correctly from the first screen?
2. Five-second classification check: can a visitor tell whether the page is a guided step, a browse room, an examples page, or an instructor page?
3. Resume-path check: can a returning learner reach the build step in one click?
4. Return-path check: can a browse-room visitor identify the relevant tour step without scanning the entire room?

## Forbidden decision states

1. choosing the archetype that sounds most flattering
2. choosing a style lane that the proof cannot support
3. using deep browse rooms without recording what changed
4. letting compare mode multiply options without forcing elimination
5. treating category essence as optional background theory
6. finishing a guided step without updating the visible tour record