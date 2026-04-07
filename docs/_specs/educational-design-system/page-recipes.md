# Educational Design System Page Recipes

## Purpose

This document defines the reusable page-level grammar for the educational design system.

Each recipe describes:

- the page's dominant instructional job
- required sections
- optional sections
- recommended order
- content constraints
- common anti-patterns

## Recipe rules that apply to every page

1. Each page gets one dominant instructional job.
2. Every page starts with orientation before depth.
3. Every long page needs clear section anchors and visible boundaries.
4. Cards and callouts must do real instructional work.
5. Every page ends with either reflection, action, or a clear next step.
6. Source or proof sections are required whenever the page makes substantive claims or curates external material.

## Recipe render contract

For phase 1, a page recipe is satisfied by a page-level `UnitVersion` whose ordered `blocks[]` array matches the recipe contract.

The primitives named in this document are render targets. The validator should inspect block types and block order, not freeform Markdown prose.

In the required-sections lists below, each line follows this pattern:

- `blockType` -> `RenderPrimitive`

## Learning homepage

### Dominant job

Orient the learner to the experience, explain the promise, show the pathway, and invite a meaningful first step.

### Required sections

1. `hero` -> `LessonHero` or homepage hero
2. `whyItMatters` -> `WhyItMatters`
3. `conceptGrid` -> pathway or module map using `ConceptGrid`
4. `sourceAnchorGrid` -> proof or source section
5. `nextStep` -> `NextStepBlock`

### Optional sections

- featured lesson cards
- visual break
- short learner guidance note
- reading or resource map preview

### Recommended order

Hero -> why it matters -> pathway map -> proof or trust section -> preview cards -> next step

### Content constraints

- Do not overload the homepage with too many equal-priority entry points.
- Keep pathway labels concrete and directional.
- Copy should explain how to begin, not just what the project values.

### Common anti-patterns

- Turning the homepage into a marketing splash page
- Treating every module as equally urgent above the fold
- Using generic claims without proof or examples

## Module overview page

### Dominant job

Show how a module is organized, what the learner will gain, and how lessons relate to each other.

### Required sections

1. `hero` -> `LessonHero`
2. `whyItMatters` -> `WhyItMatters`
3. `sequenceTimeline` -> module sequence or `SequenceTimeline`
4. `conceptGrid` -> lesson or concept grid
5. `section` -> expectations or success criteria section
6. `nextStep` -> `NextStepBlock`

### Optional sections

- glossary block
- summary grid
- proof or source section
- reading map

### Recommended order

Hero -> why it matters -> sequence overview -> lesson cards -> success criteria -> resources -> next step

### Content constraints

- Sequence should communicate progression, not just topic grouping.
- Each lesson card needs a clear outcome or question.
- Limit prerequisite language to what the learner actually needs.

### Common anti-patterns

- Dumping all module details into one dense prose block
- Listing lessons without explaining the sequence logic
- Hiding workload or expectations until later

## Lesson page

### Dominant job

Guide a learner through a bounded idea or skill from orientation to understanding to reflection.

### Required sections

1. `hero` -> `LessonHero`
2. `whyItMatters` -> `WhyItMatters`
3. one or more `section` blocks -> `SectionBlock`
4. `workedExample` -> `WorkedExample` or equivalent bridge
5. `summaryGrid` -> `SummaryGrid`
6. `reflectionPrompt` -> `ReflectionPrompt`
7. `nextStep` -> `NextStepBlock`

### Optional sections

- `GlossaryBlock`
- `SequenceTimeline`
- `ComparisonGrid`
- `PullInsight`
- `SourceAnchorGrid`

### Recommended order

Hero -> why it matters -> key terms or sequence -> explanation sections -> worked example -> summary -> reflection -> next step

### Content constraints

- Keep each section focused on one sub-idea.
- Provide at least one example before asking for reflection.
- Do not bury the page outcome below decorative content.

### Common anti-patterns

- Long uninterrupted prose with no instructional segmentation
- Reflection prompts that arrive before the concept is taught
- Multiple competing calls to action at the end

## Concept explainer page

### Dominant job

Clarify a concept, define its boundaries, and help the learner distinguish it from nearby ideas.

### Required sections

1. `hero` -> `LessonHero`
2. `whyItMatters` -> `WhyItMatters`
3. `section` -> definition or framing section
4. `comparisonGrid` -> `ComparisonGrid`
5. `workedExample` -> `WorkedExample` or example bridge
6. `summaryGrid` -> `SummaryGrid`
7. `sourceAnchorGrid` -> `SourceAnchorGrid`

### Optional sections

- glossary block
- misconceptions section inside `SectionBlock`
- pull insight
- next step block

### Recommended order

Hero -> why it matters -> definition -> comparison -> example -> misconceptions -> summary -> sources -> next step

### Content constraints

- Define the concept in plain language before technical nuance.
- Use comparison only where distinctions matter.
- Keep examples concrete and bounded.

### Common anti-patterns

- Using abstract definitions without an example
- Comparing too many adjacent concepts in one page
- Hiding source support for contested or technical claims

## Timeline or story page

### Dominant job

Lead the learner through a sequence of events, phases, or turning points.

### Required sections

1. `hero` -> `LessonHero`
2. `whyItMatters` -> `WhyItMatters`
3. `sequenceTimeline` -> `SequenceTimeline`
4. one or more `section` blocks -> supporting `SectionBlock` segments
5. `summaryGrid` -> `SummaryGrid`
6. `nextStep` -> `NextStepBlock`

### Optional sections

- `PullInsight`
- `VisualBreak`
- profile or source cards
- reflection prompt

### Recommended order

Hero -> why it matters -> timeline -> turning point sections -> visual break -> summary -> sources -> next step

### Content constraints

- Every sequence item needs a signal of why it matters.
- Avoid overloading the timeline with dense paragraph text.
- Use supporting sections to interpret the sequence, not repeat it.

### Common anti-patterns

- Building a decorative timeline with no explanatory value
- Treating chronology as self-explanatory
- Mixing unrelated subplots into the same page without boundaries

## Assignment or project page

### Dominant job

Explain what the learner must make or do, why it matters, and how success will be judged.

### Required sections

1. `hero` -> `LessonHero`
2. `whyItMatters` -> `WhyItMatters`
3. `section` -> task brief in `SectionBlock`
4. `sequenceTimeline` -> process steps or `SequenceTimeline`
5. `workedExample` -> `WorkedExample` or exemplar walkthrough
6. `section` -> success criteria or rubric section
7. `nextStep` -> `NextStepBlock`

### Optional sections

- checklist block
- glossary block
- source block
- reflection prompt for post-completion review

### Recommended order

Hero -> why it matters -> brief -> process -> exemplar -> rubric -> submission or next step

### Content constraints

- Brief must describe the output in concrete terms.
- Process steps must be actionable.
- Rubric language must be observable, not vague.

### Common anti-patterns

- Presenting only deliverables without process support
- Hiding evaluation criteria in dense prose
- Using aspirational language where explicit instructions are needed

## Reading map or resource map page

### Dominant job

Help the learner navigate supporting resources without overwhelming them.

### Required sections

1. `hero` -> `LessonHero`
2. `section` -> how-to-use section in `SectionBlock`
3. `readingMapGrid` -> `ReadingMapGrid`
4. `sourceAnchorGrid` -> proof or source section
5. `nextStep` -> `NextStepBlock`

### Optional sections

- module or lesson links
- difficulty labels
- sequence recommendations
- reflection prompt

### Recommended order

Hero -> how to use this map -> resource clusters -> recommendation notes -> proof or source block -> next step

### Content constraints

- Cluster by purpose, sequence, or difficulty rather than arbitrary topic buckets.
- Annotate resources so the learner knows why each item matters.
- Keep the number of top-level groups manageable.

### Common anti-patterns

- Raw link dumping
- Labeling resources without guidance on use
- Mixing essential and optional materials without distinction

## Recipe adoption rules

1. New page types should be introduced only when an existing recipe cannot carry the instructional job without distortion.
2. Recipe deviations should be documented so the system does not drift into page-by-page improvisation.
3. Homepage and overview recipes may use broader layout bands, but lesson and concept pages should default to reading-first shells.
4. Recipe validation should inspect ordered block contracts, not rely on ad hoc page wiring.
