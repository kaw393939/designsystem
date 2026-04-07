# BSEAI Content Production Blueprint

## Status

- Status: active production-planning document
- Scope: separate content creation and QA from runtime site construction while mapping the handoff into the current design system and release pipeline
- Governing IA set: `docs/_ux/bseai-site-information-architecture/`

## Purpose

Create a production document that lets the team do three things in the right order.

1. define coherent content and assets before building routes
2. QA that content and those assets as artifacts in their own right
3. hand approved artifacts into the current site system with minimal ambiguity

This document treats the site as two coupled but different systems.

The first system is the content-production system.

The second system is the live-site construction system.

They should share vocabulary and file contracts, but they should not force content strategy, unit authoring, and visual QA to happen inside route implementation work.

## Working doctrine

1. Content cohesion is a pre-build concern, not something to discover during React implementation.
2. Routes should be assembled from approved units and visuals whenever possible.
3. The current design system is already strong enough to host BSEAI if the content arrives in the right shapes.
4. The production plan must stop the team from mixing planning, authoring, review, release assembly, and live route construction into one blurry phase.

## Separation of tracks

| Track | Primary job | Main artifact homes | Output before the next track starts |
| --- | --- | --- | --- |
| IA and program planning | define route logic, module logic, wrapper logic, and release boundaries | `docs/_ux/bseai-site-information-architecture/`, `docs/_projects/bseaid-degree/` | approved route, module, and wrapper plan |
| experience and module planning | define the experience north star and module sequence | `content/plans/experiences/`, `content/plans/modules/` | one BSEAI experience plan plus module briefs |
| unit and visual briefing | define page jobs and asset jobs before drafts exist | `content/briefs/units/`, `content/briefs/visuals/` | brief set for each release-1 route |
| draft authoring | write the actual content blocks and visual specs | `content/drafts/units/`, `content/drafts/visuals/` | reviewable drafts |
| artifact review and approval | freeze, review, revise, and approve content and visuals | `content/units/*/versions/`, `content/visuals/*/versions/`, review refs, `docs/_qa/` | approved unit versions and visual versions |
| experience and release assembly | decide what the live experience and a release will contain | `content/experiences/`, `content/registry/site-registry.json`, `content/releases/` | approved release candidate |
| runtime implementation | wire approved artifacts into route families, navigation, and shells | `app/`, `components/`, `lib/` | exportable site build |

## Artifact homes

The production system should use the repo's existing file-backed conventions.

| Artifact type | Primary path | Notes |
| --- | --- | --- |
| split IA source of truth | `docs/_ux/bseai-site-information-architecture/` | governs route, module, wrapper, and governance decisions |
| program-level build planning | `docs/_projects/bseaid-degree/` | executive framing, route-set, media plan, production blueprint |
| experience north star | `content/plans/experiences/` | one file per experience |
| module brief | `content/plans/modules/` | one file per canonical module or gallery sequence |
| unit brief | `content/briefs/units/` | one file per page-level unit |
| visual brief | `content/briefs/visuals/` | one file per meaningful diagram, chart, board, or illustration |
| unit draft | `content/drafts/units/` | mutable working draft with `blocks[]` content |
| visual draft | `content/drafts/visuals/` | mutable working visual specification |
| approved unit version | `content/units/<unit-id>/versions/` | immutable versioned markdown artifact |
| approved visual version | `content/visuals/<visual-id>/versions/` | immutable versioned spec plus owned assets |
| experience config | `content/experiences/` | binds homepage, navigation, unit refs, visual refs, and module refs |
| route registry | `content/registry/site-registry.json` | route ids, hrefs, nav visibility, and required artifact ids |
| release manifest | `content/releases/` | explicit route, unit, and visual selection for a build |

## IA object to design-system mapping

This is the key translation layer between the BSEAI planning vocabulary and the current site system.

The rule here is strict.

Recipe mappings must reflect the actual recipe validator in `lib/page-recipes.ts`.

When an IA object needs more than the recipe minimum, treat those additions as optional extensions rather than silently redefining the recipe.

| IA object | Valid recipe patterns | Recipe-minimum blocks | Common optional extensions | Current design-system targets | Typical visual classes | Construction note |
| --- | --- | --- | --- | --- | --- | --- |
| program shell page | `learning-homepage` | `hero`, `whyItMatters`, `conceptGrid`, `sourceAnchorGrid`, `nextStep` | `comparisonGrid`, `summaryGrid`, route-entry CTA bands | `LessonHero`, `WhyItMatters`, `ConceptGrid`, `SourceAnchorGrid`, `NextStepBlock`, `PageShell` | illustration, diagram | should usually need content assembly more than custom React |
| why-now explainer | `concept-explainer` for contrast-first pages; `timeline-story` for sequence-first pages | `concept-explainer`: `hero`, `whyItMatters`, `section`, `comparisonGrid`, `workedExample`, `summaryGrid`, `sourceAnchorGrid`; `timeline-story`: `hero`, `whyItMatters`, `sequenceTimeline`, `section`, `summaryGrid`, `nextStep` | `visualBreak`, `pullInsight`, `sourceAnchorGrid` on timeline pages, chart-card sidebars | `LessonHero`, `SectionBlock`, `ComparisonGrid`, `SequenceTimeline`, `WorkedExample`, `SummaryGrid`, `SourceAnchorGrid`, `NextStepBlock` | chart, diagram, editorial illustration | use existing history and labor visuals before custom page logic |
| atlas room | `timeline-story` for lineage and shift rooms; `concept-explainer` for compare-and-interpret rooms | `timeline-story`: `hero`, `whyItMatters`, `sequenceTimeline`, `section`, `summaryGrid`, `nextStep`; `concept-explainer`: `hero`, `whyItMatters`, `section`, `comparisonGrid`, `workedExample`, `summaryGrid`, `sourceAnchorGrid` | `visualBreak`, `pullInsight`, `editorialAside`, room-specific evidence cards | `LessonHero`, `SectionBlock`, `SequenceTimeline`, `ComparisonGrid`, `WorkedExample`, `SummaryGrid`, `VisualBreak`, `PullInsight`, `MediaBlock`, `LessonShell` | diagram, chart, illustration | keep room density low and hand back to a decision or next move |
| gallery board | `concept-explainer` for decision boards; `module-overview` for board-family indexes | `concept-explainer`: `hero`, `whyItMatters`, `section`, `comparisonGrid`, `workedExample`, `summaryGrid`, `sourceAnchorGrid`; `module-overview`: `hero`, `whyItMatters`, `sequenceTimeline`, `conceptGrid`, `section`, `nextStep` | `nextStep`, `reflectionPrompt`, compact exemplar cards | `ComparisonGrid`, `WorkedExample`, `SummaryGrid`, `ConceptGrid`, `SequenceTimeline`, `SectionBlock`, `NextStepBlock` | comparison board, diagram | comparison logic should live in content, not custom component branching |
| canonical module overview | `module-overview` | `hero`, `whyItMatters`, `sequenceTimeline`, `conceptGrid`, `section`, `nextStep` | `summaryGrid`, `sourceAnchorGrid`, wrapper notes | `LessonHero`, `SequenceTimeline`, `ConceptGrid`, `SectionBlock`, `NextStepBlock` | diagram, board | should become a reusable approved unit set |
| studio step | `assignment-project` | `hero`, `whyItMatters`, `section`, `sequenceTimeline`, `workedExample`, `section`, `nextStep` | `summaryGrid`, `reflectionPrompt`, proof or exemplar sidebars | `WorkedExample`, `SequenceTimeline`, `SectionBlock`, `NextStepBlock`, `LessonShell` | diagram, screenshot, exemplar walkthrough | artifact expectations belong in content before coding support pages |
| wrapper entry page | `learning-homepage` | `hero`, `whyItMatters`, `conceptGrid`, `sourceAnchorGrid`, `nextStep` | wrapper metadata, schedule panels, `LocalNav`, support links | `PageShell`, `LocalNav`, `LessonHero`, `ConceptGrid`, `SourceAnchorGrid`, `NextStepBlock` | light illustration or orientation diagram | route code may add schedule chrome, but teaching logic should live in approved units |
| example walkthrough | `lesson-page` for annotated teaching walkthroughs; `assignment-project` for output-building walkthroughs | `lesson-page`: `hero`, `whyItMatters`, `section`, `workedExample`, `summaryGrid`, `reflectionPrompt`, `nextStep`; `assignment-project`: `hero`, `whyItMatters`, `section`, `sequenceTimeline`, `workedExample`, `section`, `nextStep` | `sourceAnchorGrid`, `visualBreak`, external-review rubric callouts | `WorkedExample`, `SummaryGrid`, `ReflectionPrompt`, `SequenceTimeline`, `SectionBlock`, `NextStepBlock` | annotated screenshots, diagrams | examples should be content artifacts first, not ad hoc page prose |

## Release-1 production matrix

The first publishable route set should be planned as artifact packs before route implementation.

This matrix must cover every route family the IA marks as `visible`, `visible but compressed`, `nested`, or `seeded` in release 1.

| Route or pack | Core units to author or reuse | Core visuals to author or reuse | Preferred recipes | Primary QA focus | Runtime note |
| --- | --- | --- | --- | --- | --- |
| BSEAI home | `bseai-homepage`, `bseai-program-pillars` | `bseai-program-hero` later, reuse strongest orientation diagram first | `learning-homepage`, `module-overview` | route clarity, CTA ladder, audience legibility | should fit current page shell and hero patterns |
| why-now | reuse `print-to-ai-knowledge-shift`, add `bseai-why-now` bridge unit | reuse `renaissance-to-ai-hero`, `ai-labor-demand-chart` | `concept-explainer`, `timeline-story` | evidence tiers, narrative compression, chart captions | should assemble from existing unit and visual contracts |
| philosophy | `bseai-formation-model` | `bseai-formation-wheel` later, use diagram-first fallback | `concept-explainer` | theory-to-action clarity, concept density | should use existing section, summary, and source-anchor blocks |
| atlas landing | `bseai-atlas-landing` | `research-atlas-board.png`, `motivation-to-opportunity-chain.png` | `learning-homepage` | browse-versus-build framing, room selection clarity, source labeling | visible top-level route even in compressed release 1 |
| atlas slice | `bseai-atlas-room-identity-and-archetypes`, `bseai-atlas-room-second-renaissance`, plus one optional third room only if fully authored | `archetype-coherence-wheel.png`, `second-renaissance-split-scene.png`, first chart-card set | `concept-explainer`, `timeline-story` | room density, theory-to-action handoff, evidence-tier labeling, cognitive load | ship only a small curated room set, not the full atlas tree |
| course spine | `bseai-course-spine-overview` | `bseai-course-artifact-ladder` | `module-overview`, `timeline-story` | sequence clarity, artifact ladder legibility | likely no new primitives required |
| studio landing | `bseai-studio-introduction` | reuse `archetype-signal-map` first, add studio map later | `learning-homepage`, `module-overview` | artifact path clarity, start-here direction, next-step compression | landing route should orient and hand off, not teach every studio step itself |
| studio core sequence | `identity-and-signal`, `archetype-gallery`, `visual-design-literacy`, `attention-trust-and-persuasion`, `proof-of-work`, `build-and-product-shape`, `publish-and-weak-ties` | `archetype-signal-map`, `first-read-hierarchy-ladder.png`, `trust-and-proof-architecture.png`, deployment-room boards | `assignment-project`, `concept-explainer`, `module-overview` | prerequisite integrity, artifact ladder continuity, decision-to-build handoff | route code will still compose several approved units explicitly |
| modules | `bseai-module-library` | comparison boards and module cards first | `module-overview` | catalog clarity, module boundaries | should be mostly content-grid driven |
| galleries seed pack | `archetype-gallery`, `visual-design-literacy`, `attention-trust-and-persuasion` | archetype cluster boards, gift-trap board, first-read ladder, trust anatomy board | `concept-explainer`, `module-overview` | decision clarity, comparison discipline, output-to-strategy continuity | nested through Studio and Modules in release 1 rather than primary navigation |
| exemplar pack | `bseai-homepage-walkthrough`, `bseai-proof-block-close-reading`, `is117-exemplar-callout` | `student-builder-triptych.png`, homepage anatomy board, proof walkthrough board | `lesson-page`, `assignment-project` | external credibility, one-minute readability, artifact ladder proof | seeded in Studio, one gallery room, and IS117 before a dedicated examples route |
| IS117 entry | `is117-path-entry` plus later weekly units | reuse existing approved visuals where useful | `learning-homepage`, later `assignment-project` for week pages | start-here clarity, strategy-pack legibility, public-proof expectations | route code should stay thin and point to approved units |

Release-1 alignment rule:

If a route family is called `visible`, `visible but compressed`, `nested`, or `seeded` in the IA, it should have an explicit artifact pack here.

## Content QA before site construction

The team should QA content as content before writing route code.

Required review lenses for release-1 artifact packs:

1. information architecture and content strategy
2. instructional design and curriculum logic
3. curatorial and editorial experience
4. accessibility and inclusive design
5. research and citation rigor
6. media and asset production quality

Each release-1 route pack should be reviewed in this order:

1. experience and module plan
2. unit briefs and visual briefs
3. unit drafts and visual drafts
4. frozen versions
5. release candidate

## What the content team can finish before route implementation

The content team can finish all of this before the frontend team builds the final route family.

1. experience north star
2. module briefs
3. unit briefs
4. visual briefs
5. unit drafts with `blocks[]`
6. visual drafts with captions, alt text, long descriptions, and source refs
7. first frozen and approved versions
8. draft experience config and draft release composition plan

This is the point of the separation.

The live site should not be where coherence is discovered for the first time.

## Transition from content production to live site

The current system already defines the transition boundary.

Use it explicitly.

1. Create or update the split IA notes in `docs/_ux/bseai-site-information-architecture/`.
2. Create the BSEAI experience north star in `content/plans/experiences/`.
3. Create module briefs in `content/plans/modules/`.
4. Create unit briefs in `content/briefs/units/` and visual briefs in `content/briefs/visuals/`.
5. Draft the actual content in `content/drafts/units/` and `content/drafts/visuals/`.
6. Freeze, request review, review, revise, and approve those artifacts through the repo's workflow.
7. Add approved refs into `content/experiences/<experience-id>.json`.
8. Add route ids and required artifact ids into `content/registry/site-registry.json`.
9. Assemble a release in `content/releases/<release-id>.json`.
10. Only after that work is stable, implement or refine the live route family in `app/`, `components/`, and `lib/`.

The repo's command surface already matches this flow.

Relevant workflow commands for this blueprint:

1. unit workflow: `site unit start`, `site unit freeze`, `site unit request-review`, `site unit review`, `site unit revise`, `site unit approve`, `site unit show`
2. visual workflow: `site visual start`, `site visual freeze`, `site visual generate`, `site visual request-review`, `site visual review`, `site visual revise`, `site visual approve`, `site visual show`
3. release workflow: `site release assemble`, `site release request-review`, `site release review`, `site release approve`, `site release publish`, `site release diff`
4. validation workflow: `site validate recipe <unit-id> --version <version>`, `site validate release <release-id>`, `site validate visuals <experience-id> --release <release-id>`
5. build workflow: `site build experience <experience-id> --release <release-id>`

The authoritative command surface remains `docs/_specs/educational-design-system/cli-command-surface.md`.

## Definition of ready for frontend implementation

The frontend team should treat a route family as ready only when:

1. the route jobs are fixed in the split IA set
2. the experience north star exists
3. the module briefs exist
4. the release-1 unit briefs and visual briefs exist
5. the first frozen unit and visual versions exist
6. the required artifact ids are known for the route registry
7. the release candidate composition is explicit enough to validate

At that point the implementation work becomes a mapping problem, not a discovery problem.

## Transition into the live design system

The handoff into the live site should be minimal and explicit.

1. approved unit versions map to the current `EducationalUnitSpec` block renderer
2. approved visual versions map to the current visual resolver and `MediaBlock` usage
3. experience configs decide homepage, navigation, and artifact pools
4. site registry decides which route ids exist and which artifacts are required
5. release manifests decide what actually ships

That means the BSEAI site can stay content-first while still using the current design system.

The content and asset system does the thinking.

The runtime system does the assembly.
