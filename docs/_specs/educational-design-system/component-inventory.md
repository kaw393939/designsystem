# Educational Design System Component Inventory

## Purpose

This document maps the museum site's component families to their educational design system equivalents and defines the target phase-1 component contracts.

The inventory has three jobs:

1. Classify what is reusable versus topic-bound.
2. Name the new first-class educational primitives.
3. Define enough contract detail for sprint implementation and testing.

For phase 1, the primitives in this file are render targets. Authors and agents should not assemble pages by manually composing primitives. Instead, page-level units should render through an ordered `blocks[]` contract defined in the content schema.

## Abstraction map from the museum site

| Source family                    | Status                | Phase 1 target                  | Reason                                                            |
| -------------------------------- | --------------------- | ------------------------------- | ----------------------------------------------------------------- |
| `chapter-hero.tsx`               | Generalize            | `LessonHero`                    | Strong orientation pattern, but chapter framing is topic-specific |
| `chapter-section.tsx`            | Generalize            | `SectionBlock`                  | Good structural wrapper for labeled explanation sections          |
| `chapter-timeline.tsx`           | Generalize            | `SequenceTimeline`              | Sequence pattern is reusable beyond history                       |
| `chapter-visual-break.tsx`       | Keep and generalize   | `VisualBreak`                   | Useful pacing and narrative reset primitive                       |
| `editorial-aside.tsx`            | Keep and generalize   | `EditorialAside`                | Supports annotation and contextual support                        |
| `pull-quote.tsx`                 | Generalize            | `PullInsight`                   | Quote pattern should become evidence or insight oriented          |
| `transition-block.tsx`           | Generalize            | `NextStepBlock`                 | Strong navigation and sequencing behavior                         |
| `editorial-card-grid.tsx`        | Generalize            | `ConceptGrid`                   | Good for concept summaries and modular overviews                  |
| `editorial-summary-grid.tsx`     | Generalize            | `SummaryGrid`                   | Strong recap pattern                                              |
| `guide-callout.tsx`              | Split and generalize  | `WhyItMatters`, `WorkedExample` | Current callout role is overloaded                                |
| `reading-cluster-grid.tsx`       | Generalize            | `ReadingMapGrid`                | Useful for curated resource navigation                            |
| `narrative-card-grid.tsx`        | Defer                 | `ProfileGrid` later             | Valuable, but not essential for phase 1 baseline                  |
| `historical-anchor-grid` concept | Rename and generalize | `SourceAnchorGrid`              | Source and proof blocks are reusable; historical naming is not    |
| `math-block.tsx`                 | Defer                 | `FormulaBlock` later            | Useful for some disciplines, not part of baseline minimum         |
| home-specific sections           | Decompose             | Recipe parts, not primitives    | These are page compositions, not reusable primitives              |

## Phase-1 block render contracts

| Block type         | Render target      | Minimum payload                  |
| ------------------ | ------------------ | -------------------------------- |
| `hero`             | `LessonHero`       | `title`, `dek`                   |
| `whyItMatters`     | `WhyItMatters`     | `summary`, `stakes`              |
| `section`          | `SectionBlock`     | `title`, `body`                  |
| `conceptGrid`      | `ConceptGrid`      | `items[]`                        |
| `summaryGrid`      | `SummaryGrid`      | `items[]`                        |
| `comparisonGrid`   | `ComparisonGrid`   | `columns`, `rows`                |
| `sequenceTimeline` | `SequenceTimeline` | `mode`, `items[]`                |
| `workedExample`    | `WorkedExample`    | `prompt`, `steps[]`              |
| `editorialAside`   | `EditorialAside`   | `body`                           |
| `pullInsight`      | `PullInsight`      | `quote`                          |
| `visualBreak`      | `VisualBreak`      | `title` or `body` or `visualRef` |
| `reflectionPrompt` | `ReflectionPrompt` | `prompt`                         |
| `nextStep`         | `NextStepBlock`    | `title`, `primaryAction`         |
| `sourceAnchorGrid` | `SourceAnchorGrid` | `items[]`                        |
| `glossary`         | `GlossaryBlock`    | `terms[]`                        |
| `readingMapGrid`   | `ReadingMapGrid`   | `clusters[]`                     |

These block contracts are the bridge between the content schema and the component layer. If a page cannot be expressed through this block set, either the recipe is wrong or the system needs a new block type and primitive pair.

## Render-contract boundary

The content schema owns serialized block payloads. The component props in this inventory describe runtime component APIs, not the exact shape stored inside `UnitDraft` or `UnitVersion` artifacts.

Sprint 3 should follow these rules:

1. Unit artifacts use named content fields such as `body`, `summary`, `prompt`, `items`, and `visualRef`.
2. React-only props such as `children`, `primary`, `secondary`, and `media` should be derived by the renderer rather than stored directly in unit artifacts.
3. Shared payload sub-shapes such as actions, metadata, source links, and reading-map links should be normalized once and reused across block types.
4. Blocks that may appear in local navigation or direct links should carry stable `id` values rather than deriving anchors from headings at render time.
5. The block renderer should stay a pure mapping layer from `BlockSpec` payloads to primitive props, with no page-specific branching.

## Layout primitives

### `PageShell`

- Intent: Provide the outer frame, width rules, page padding, background treatment, and consistent header/footer placement.
- Derived from: `editorial-layout.tsx`, site shell usage in `app/layout.tsx`.
- Core props: `children`, `header`, `footer`, `tone?`, `maxWidth?`.
- Visual behavior: Supports default reading pages and wider overview layouts without page-specific wrappers.
- Accessibility: Main landmark required; skip-link support; preserve logical source order.
- Example usage: Any lesson, overview, assignment, or resource page.

### `LessonShell`

- Intent: Narrower composition for content-heavy lesson and concept pages.
- Derived from: `chapter-section.tsx` page rhythm plus `editorial-layout.tsx` width conventions.
- Core props: `children`, `localNav?`, `progress?`, `toc?`.
- Visual behavior: Combines reading-width prose with optional side or sticky orientation affordances.
- Accessibility: Table of contents must remain optional and keyboard reachable.
- Example usage: Lesson page and concept explainer recipe.

### `ProseBlock`

- Intent: Standardize readable prose width, paragraph rhythm, and spacing between text elements.
- Derived from: Global reading width tokens and chapter-body compositions.
- Core props: `children`, `measure?`, `lead?`.
- Visual behavior: Defaults to reading width; supports lead treatment without custom CSS.
- Accessibility: Must not reduce contrast; support semantic headings, lists, and tables.
- Example usage: Core explanation sections.

### `EditorialBand`

- Intent: Wide visual band for transitions, summaries, or emphasis sections.
- Derived from: `editorial-layout.tsx`, homepage editorial bands.
- Core props: `children`, `tone`, `bleed?`, `paddingScale?`.
- Visual behavior: Handles wide background treatment while keeping inner content aligned to the layout grid.
- Accessibility: Tone changes must preserve contrast.
- Example usage: Summary band or visual break band.

### `SplitLayout`

- Intent: Present two related content regions such as explanation plus example or concept plus evidence.
- Derived from: Home and editorial split sections.
- Core props: `primary`, `secondary`, `ratio?`, `stackAt?`.
- Visual behavior: Collapses to single-column on smaller screens.
- Accessibility: Reading order must remain sensible when stacked.
- Example usage: Worked example block.

### `ContentGrid`

- Intent: Shared grid primitive for concept cards, summary cards, resource cards, and proof tiles.
- Derived from: `editorial-card-grid.tsx`, `editorial-summary-grid.tsx`.
- Core props: `items`, `columns?`, `minCardWidth?`, `variant?`.
- Visual behavior: Supports responsive card layouts with predictable gap and card height rhythm.
- Accessibility: Card titles must be semantic and link targets explicit.
- Example usage: ConceptGrid, SummaryGrid, ReadingMapGrid.

### `CalloutBand`

- Intent: Surface a bounded callout with a distinct state such as warning, reflection, synthesis, or proof.
- Derived from: `guide-callout.tsx`, panels, callout styling in global tokens.
- Core props: `label`, `title`, `children`, `tone`, `icon?`.
- Visual behavior: Strong contrast from surrounding prose without feeling like an ad banner.
- Accessibility: Role should usually remain semantic section or aside, not alert, unless urgency is real.
- Example usage: Why-it-matters or proof blocks.

### `MediaBlock`

- Intent: Standardize images, diagrams, captions, annotations, and optional side notes.
- Derived from: Museum image handling and visual break media treatments.
- Core props: `media`, `caption?`, `credit?`, `annotation?`, `alignment?`.
- Visual behavior: Support wide, inset, and split media placements.
- Accessibility: Alt text required for meaningful images; captions and credits semantically grouped.
- Example usage: Worked examples, story pages, resource pages.

### `LocalNav`

- Intent: Provide static-safe orientation inside long pages or modules.
- Derived from: Reading-oriented navigation patterns in the reference repo.
- Core props: `items`, `title?`, `progress?`, `sticky?`.
- Visual behavior: Optional sticky presentation on large screens; inline fallback on small screens.
- Accessibility: Must support keyboard navigation, visible focus, and clear current-item state.
- Example usage: Lesson and module overview pages.

## Educational and editorial primitives

### `LessonHero`

- Intent: Orient the learner at the top of a page with title, stakes, and progress context.
- Derived from: `ChapterHero`.
- Core props: `eyebrow?`, `title`, `dek`, `metadata?`, `progress?`, `actions?`, `visual?`.
- Visual behavior: One dominant title, concise support text, optional progress or module metadata.
- Accessibility: Must contain the page `h1`; actions must be optional and descriptive.
- Example usage: Lesson page header.

### `SectionBlock`

- Intent: Wrap a single instructional section with visible label, heading, and bounded content rhythm.
- Derived from: `ChapterSection`.
- Core props: `id`, `eyebrow?`, `title`, `summary?`, `children`, `tone?`.
- Visual behavior: Clear separation between sections, predictable heading spacing, optional theme tone.
- Accessibility: Section label and heading structure must remain consistent.
- Example usage: Core explanation, misconceptions, process steps.

### `WhyItMatters`

- Intent: Explain why the current page or concept matters before deep explanation begins.
- Derived from: `GuideCallout`.
- Core props: `title`, `summary`, `stakes`, `audience?`, `links?`.
- Visual behavior: Compact, high-signal callout near the top of a page.
- Accessibility: Do not use alert semantics unless content is truly urgent.
- Example usage: Near the hero on lesson and concept pages.

### `ConceptGrid`

- Intent: Present key ideas as scannable concept cards.
- Derived from: `EditorialCardGrid`.
- Core props: `items[{ title, summary, href?, tag? }]`, `columns?`.
- Visual behavior: Short cards with disciplined text length and optional pathway links.
- Accessibility: Card headings should be semantic; summaries must not rely on color alone.
- Example usage: Key ideas on overview and lesson pages.

### `SummaryGrid`

- Intent: Recap the page in a bounded, review-friendly card grid.
- Derived from: `EditorialSummaryGrid`.
- Core props: `items[{ title, takeaway, action? }]`, `title?`.
- Visual behavior: Lower-density recap cards, usually late in the page.
- Accessibility: Cards must preserve reading order and adequate touch targets.
- Example usage: Lesson wrap-up or module recap.

### `ComparisonGrid`

- Intent: Compare concepts, methods, periods, or options side by side.
- Derived from: Summary and card-grid patterns in the museum repo.
- Core props: `columns`, `rows`, `legend?`, `caption?`.
- Visual behavior: Responsive comparison layout with graceful stacking on small screens.
- Accessibility: Use table semantics when true tabular comparison is present.
- Example usage: Concept explainer contrasts or assignment option comparison.

### `SequenceTimeline`

- Intent: Show chronological or conceptual progression in ordered steps.
- Derived from: `ChapterTimeline`.
- Core props: `items[{ label, title, summary, anchor?, media? }]`, `mode`.
- Visual behavior: Supports timeline and process-sequence variants.
- Accessibility: Ordered list semantics by default; support reduced motion.
- Example usage: Story page or step-by-step process lesson.

### `WorkedExample`

- Intent: Bridge abstraction and application using an example, walkthrough, or annotated case.
- Derived from: `GuideCallout`, split editorial layouts.
- Core props: `prompt`, `steps`, `result`, `reflection?`, `media?`.
- Visual behavior: Often a split layout with explanation on one side and artifact or output on the other.
- Accessibility: Step order must be explicit; media needs alt text or transcript.
- Example usage: Example bridge in a lesson or assignment page.

### `EditorialAside`

- Intent: Hold clarifications, cautions, side context, or advanced notes without breaking the main flow.
- Derived from: `editorial-aside.tsx`.
- Core props: `title?`, `children`, `tone?`, `icon?`.
- Visual behavior: Lower emphasis than hero content but clearly bounded.
- Accessibility: Use `aside` semantics only when content is truly tangential.
- Example usage: Vocabulary note or caution note.

### `PullInsight`

- Intent: Highlight a memorable statement, evidence point, or interpretive lens.
- Derived from: `pull-quote.tsx`.
- Core props: `quote`, `attribution?`, `context?`.
- Visual behavior: Large, low-density text used sparingly for pacing.
- Accessibility: Preserve quote semantics when quoting a source.
- Example usage: Mid-page interpretive reset.

### `VisualBreak`

- Intent: Reset attention and rhythm between dense sections.
- Derived from: `ChapterVisualBreak`.
- Core props: `title?`, `body?`, `media?`, `tone?`.
- Visual behavior: More spacious band with optional media or short reflective copy.
- Accessibility: Must not interrupt heading order or trap keyboard focus.
- Example usage: Between core explanation and summary.

### `ReflectionPrompt`

- Intent: Ask the learner to synthesize, evaluate, or apply what they just learned.
- Derived from: Reflection behavior implied across guide and summary patterns.
- Core props: `prompt`, `questions`, `mode?`, `timeEstimate?`.
- Visual behavior: Bounded reflective prompt with optional writing or discussion variant.
- Accessibility: Prompt text must be explicit without relying on icons or tone color.
- Example usage: End of lesson or assignment prework.

### `NextStepBlock`

- Intent: Transition learners toward the next page, task, or sequence item.
- Derived from: `TransitionBlock`.
- Core props: `title`, `summary`, `primaryAction`, `secondaryAction?`, `context?`.
- Visual behavior: Strong closing block with one clear next move.
- Accessibility: Action labels must describe the destination.
- Example usage: End of lesson and module overview pages.

### `SourceAnchorGrid`

- Intent: Show the source base, evidence anchors, or proof artifacts supporting the page.
- Derived from: Historical anchor grid pattern in the museum site.
- Core props: `items[{ title, description, href, type }]`, `title?`.
- Visual behavior: Compact grid or list of source tiles with clear metadata.
- Accessibility: Source labels must be descriptive and distinguishable without color.
- Example usage: End of concept, story, or resource pages.

### `GlossaryBlock`

- Intent: Define terms that learners may need to revisit during reading.
- Derived from: Vocabulary and explanatory needs in the research, not a direct one-to-one source component.
- Core props: `terms[{ term, definition, note? }]`, `layout?`.
- Visual behavior: Compact glossary list or card cluster.
- Accessibility: Consider definition list semantics where appropriate.
- Example usage: Lesson pages with high terminology load.

### `ReadingMapGrid`

- Intent: Organize resources into a curated map rather than a raw link list.
- Derived from: `reading-cluster-grid.tsx`.
- Core props: `clusters[{ title, summary, links[] }]`, `progression?`.
- Visual behavior: Resource groups should communicate sequence or purpose, not just topic buckets.
- Accessibility: Group headings and link labels must make sense out of context.
- Example usage: Reading map and resource map pages.

## Deferred or removed phase-1 candidates

| Candidate                               | Decision                     | Why                                                                    |
| --------------------------------------- | ---------------------------- | ---------------------------------------------------------------------- |
| `ProfileGrid`                           | Defer                        | Useful for biography-heavy experiences, not required for the baseline  |
| `FormulaBlock`                          | Defer                        | Important for STEM-specific sites but not universal enough for phase 1 |
| Home-only chronology and scene sections | Do not elevate as primitives | They belong inside recipes, not the primitive layer                    |
| Topic-specific narrative cards          | Rename or remove             | They should return only if a later recipe truly needs them             |

## Testing expectations for this inventory

1. Every phase-1 educational primitive needs at least one unit test.
2. Layout primitives need responsive and semantic smoke coverage.
3. Components that affect sequencing or navigation need explicit keyboard and focus checks.
4. Placeholder content must prove the components work outside AI-history subject matter.
5. Block-to-component mappings should be validated so recipe rendering does not depend on page-specific glue code.
