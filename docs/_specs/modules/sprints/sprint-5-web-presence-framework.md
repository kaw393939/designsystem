# Sprint 5: Module 1 — Web Presence Framework

## Goal

Curate existing tour content into Module 1's four lessons. This is the lightest content sprint because the tour already contains the teaching material — the module adds structure, pacing, and classroom-specific framing.

## Why this sprint exists

The tour is optimized for self-directed learners moving step by step. Module 1 repackages the same framework for classroom pacing: lessons can be assigned per class session, practice can be done as homework, and the checkpoint provides a peer review moment. None of this replaces the tour — it adds a semester-appropriate container around it.

## Scope

1. Write Module 1 overview page
2. Write Lesson 1: Who is this for (curated from Signal step)
3. Write Lesson 2: Pick the vibe (curated from Archetype step)
4. Write Lesson 3: Choose the look (curated from Style step)
5. Write Lesson 4: Add proof and publish (curated from Proof + Build + Publish steps)
6. Write Practice page
7. Write Checkpoint page

## Content approach

Each lesson:
- Frames the lesson's purpose in 2–3 sentences
- Presents the key teaching content (may reuse data arrays from `web-presence-site-content.ts`)
- Links to the canonical tour step: "For the full walk-through, see [tour step]"
- Links to the browse room for deeper reference
- Adds classroom framing the tour does not have (e.g., "Come to class ready to name your audience out loud")
- Does NOT duplicate the tour step's full content

This is curation, not copying. If a student reads both the tour step and the module lesson, they should feel like one complements the other, not like they are reading the same page twice.

## Lesson specifications

### Lesson 1: Who is this for

**Route:** `/modules/web-presence-framework/who-is-this-for/`

Summary of the Signal step's audience-need-promise framework. Key content:
- The audience-first rule: name a person, not a demographic
- What the person needs to believe after the first read
- The promise: what changes if they keep reading
- Common mistakes: starting from "what I want to show" instead of "what they need to see"
- Link: "For the full walk-through → /tour/signal"
- Link: "See a quick page opener → /examples"
- Classroom frame: "By the end of this class, write down one sentence naming your audience and their need."

### Lesson 2: Pick the vibe

**Route:** `/modules/web-presence-framework/pick-the-vibe/`

Summary of the Archetype step. Key content:
- The 12 archetypes as a decision tool
- How to choose a primary archetype that fits the audience
- The congruence test: does the vibe match the promise?
- Common mistakes: choosing based on personal taste instead of audience fit
- Link: "For the full walk-through → /tour/archetype"
- Link: "Compare vibe options → /browse/archetypes"
- Classroom frame: "Name your primary archetype and one sentence on why it fits before the next class."

### Lesson 3: Choose the look

**Route:** `/modules/web-presence-framework/choose-the-look/`

Summary of the Style step. Key content:
- Visual direction follows archetype, not the other way around
- Layout, color, and typography as signals
- What to avoid: fighting the vibe with the wrong visual direction
- Link: "For the full walk-through → /tour/style"
- Link: "Compare design directions → /browse/design-lineages"
- Classroom frame: "Bring a mood board or 3 reference sites that match your chosen direction."

### Lesson 4: Add proof and publish

**Route:** `/modules/web-presence-framework/proof-and-publish/`

Combines Proof, Build, and Publish steps into one lesson. Key content:
- What counts as proof (evidence tiers, trust signals)
- The build brief as the handoff artifact
- Publishing as a feedback loop, not a finish line
- Link: "For the full walk-through → /tour/proof, /tour/build, /tour/publish"
- Link: "Open the trust and proof room → /browse/attention-trust"
- Classroom frame: "Write a build brief before next class. You will hand it to a classmate."

### Practice page

**Route:** `/modules/web-presence-framework/practice/`

- Task: audit a live site (the student's own or a provided example) using the portfolio and museum checklists from `web-presence-site-content.ts`
- Checklist cards rendered from existing data arrays
- Submission: bring audit notes to class

### Checkpoint page

**Route:** `/modules/web-presence-framework/checkpoint/`

- Peer review: exchange audit notes with a classmate
- Review questions: Can you identify the site's audience from the first screen? Does the visual direction match the stated archetype? Where is the proof?
- Studio criteria: adapted from the Build step's studio review

## File creation list

| File | Type |
| --- | --- |
| `app/modules/web-presence-framework/page.tsx` | route |
| `app/modules/web-presence-framework/who-is-this-for/page.tsx` | route |
| `app/modules/web-presence-framework/pick-the-vibe/page.tsx` | route |
| `app/modules/web-presence-framework/choose-the-look/page.tsx` | route |
| `app/modules/web-presence-framework/proof-and-publish/page.tsx` | route |
| `app/modules/web-presence-framework/practice/page.tsx` | route |
| `app/modules/web-presence-framework/checkpoint/page.tsx` | route |

## Acceptance criteria

- [ ] All 7 pages render
- [ ] Every lesson links to the canonical tour step it summarizes
- [ ] No substantial content duplication with tour steps
- [ ] Practice page renders checklists from existing data arrays
- [ ] Classroom-specific framing is present in every lesson
- [ ] Module local nav shows all 7 pages
- [ ] `npx tsc --noEmit` passes
- [ ] Smoke-render tests
