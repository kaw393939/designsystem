# Canonical Phase 1 Letter to the Coding Agent

## Status note

This letter is the phase-1 vision brief.

Until the configuration-driven publishing model is fully reconciled across the spec set, implementation should follow `docs/_specs/educational-design-system/spec.md` and `docs/_specs/educational-design-system/repair-plan.md` wherever this letter conflicts with newer architecture decisions.

You have access to:

- Museum-site repo:
  `/Users/kwilliams/Desktop/nextjs_ai_orchestration_spec_sprint_process`
- Research papers:
  `/Users/kwilliams/Desktop/desgin_system/docs/_research`

Your assignment is to study the existing museum site and convert its strongest instructional and technical patterns into a reusable educational design system.

This is not a request to clone the museum site as a history-of-AI experience.
This is not a request to build the whole future product.

This is phase 1 only.

The goal is to create a static-first, GitHub-Pages-friendly educational site system that can support many future learning experiences.

## Core mandate

Build a reusable educational editorial system that is optimized for:

- comprehension before decoration
- narrative scaffolding before content dumping
- scanability before density
- cognitive support before cleverness
- reusable primitives before one-off pages
- instructional coherence before marketing energy

The result should feel like the work of a strong instructional designer, a rigorous front-end engineer, and someone who understands motivation, cognition, novice learning, and the realities of 18-20-year-old learners.

The aim is not a blog theme or a generic pattern library.
The aim is a serious learning-oriented design system.

## What to study in the museum site

Read the museum repo deeply enough to understand its instructional grammar, not just its styling.

The current site already demonstrates the right abstraction direction through elements such as:

- `ChapterHero`
- `ChapterSection`
- `ChapterTimeline`
- `ChapterVisualBreak`
- `EditorialAside`
- `PullQuote`
- `TransitionBlock`
- `EditorialCardGrid`
- `EditorialSummaryGrid`
- `HistoricalAnchorGrid`
- `NarrativeProfileGrid`
- `GuideCallout`
- home/editorial design-system files
- export scripts and static-hosting assumptions
- Lighthouse configuration
- Vitest and Playwright coverage
- page and component tests

Treat the existing repo as evidence that the right system layering is:

1. Tokens
2. UI primitives
3. Educational/editorial primitives
4. Page recipes
5. Content examples
6. Export/deployment pipeline
7. Tests

When studying the museum repo, identify:

1. what is genuinely reusable
2. what is too topic-specific
3. what should become a first-class primitive
4. what should become a page recipe
5. what should be deleted or deferred

## Phase 1 target

Deliver a static-first educational design system that is:

- cognitively supportive
- visually coherent
- modular
- export-safe
- testable
- reusable across many educational projects

The system should support pages that teach, guide, explain, compare, sequence, and transition learners through material.

Do not build the full content experience yet.
Do not ingest the research papers into site content yet.
Do not optimize for business conversion.
Do not add backend features.

## Educational design doctrine

### 1. Teach through sequence

Pages should guide learners through a stable and comprehensible order rather than overwhelm them with undifferentiated information.

A default instructional page recipe should usually move through something close to:

- orientation or hero
- why it matters
- key idea map
- chronology or conceptual sequence when relevant
- core explanation
- worked example or visual bridge
- summary or concept cards
- reflection or action prompt
- transition to the next page or task

This generalizes the museum site's strongest pattern: guided sequencing with explicit section roles.

### 2. Design for 18-20-year-old learners

Assume uneven reading readiness, fragmented attention, varying self-management, and the need for visible progress and early wins.

The interface must therefore favor:

- strong section labeling
- short readable chunks
- obvious hierarchy
- recurring orientation cues
- low-friction navigation
- embedded explanation support
- explicit next-step transitions

### 3. Scan first, read second

Assume that users initially scan before they commit to deep reading.

Therefore:

- headings must carry meaning
- subheads must reduce ambiguity
- cards must summarize intelligently
- callouts must do real instructional work
- section boundaries must be visually obvious
- every page must have one dominant job

### 4. Be editorial, not hype

The visual language should feel:

- calm
- serious
- elegant
- legible
- structured
- encouraging
- evidence-aware

Avoid startup landing-page energy.
Avoid SaaS cliches.
Avoid manipulative urgency.
Avoid decorative clutter.

### 5. Ethics and persuasion must be structural

Use persuasion only in the service of:

- clarity
- trust
- coherence
- visible proof
- helpful framing
- real guidance

Do not introduce dark patterns, fake urgency, or shallow engagement gimmicks.

## What phase 1 must produce

### A. Theme tokens and foundation

Create a generalized educational theme system with:

- color roles
- type scale
- spacing scale
- radius and shadow rules
- content-width rules
- section-rhythm rules
- motion rules
- contrast and accessibility rules

These should be instructional tokens, not arbitrary branding tokens.

Prefer semantic roles such as:

- reading surface
- emphasis surface
- orientation
- synthesis
- warning
- reflection
- next step
- proof or source

Also define typographic roles such as:

- hero
- section
- concept
- caption
- annotation
- metadata

### B. Layout primitives

Build reusable layout primitives for:

- page shell
- lesson shell
- reading-width prose blocks
- wide editorial bands
- split layouts
- content grids
- callout bands
- transition zones
- media blocks
- local navigation or progress affordances if static-safe
- reusable header and footer patterns

These must be abstracted cleanly and documented.

### C. Instructional content primitives

Generalize the museum site's best content blocks into reusable educational components.

At minimum, define and implement:

- `LessonHero`
- `SectionBlock`
- `WhyItMatters`
- `ConceptGrid`
- `SummaryGrid`
- `ComparisonGrid`
- `SequenceTimeline`
- `WorkedExample`
- `EditorialAside`
- `PullInsight`
- `VisualBreak`
- `ReflectionPrompt`
- `NextStepBlock`
- `SourceAnchorGrid`
- optional `GlossaryBlock`

These should support more than history pages. The system must also support:

- concept pages
- process pages
- assignment pages
- guide pages
- module overviews
- portfolio-learning pages

### D. Page recipes

Define page recipes, not just loose components.

At minimum, document recipes for:

- learning homepage
- module overview page
- lesson page
- concept explainer page
- timeline or story page
- assignment or project page
- reading map or resource map page

Each recipe must specify:

- required sections
- optional sections
- recommended order
- content constraints
- common anti-patterns
- when to use it
- when not to use it

### E. GitHub Pages technical baseline

Keep the system in Next.js and make phase 1 static-first.

Use the App Router if it fits the current repo structure well, but configure the project around static export so the output can be deployed to GitHub Pages without a Node server.

Phase 1 should therefore be designed around:

- static routes
- no backend dependency
- no server-only assumptions for core functionality
- export-safe assets and navigation
- base-path awareness
- future custom-domain readiness

### F. Testing and quality bar

Preserve and strengthen the museum site's quality mindset.

Phase 1 should include:

- component tests
- page-recipe smoke tests
- responsive breakpoint browser tests
- accessibility checks
- Lighthouse or performance baseline
- static export validation in CI
- link integrity and sitemap sanity where relevant

## Required phase-1 outputs

By the end of phase 1, produce:

- one foundational spec
- one component inventory spec
- one page-recipe spec
- one deployment or export spec
- one content schema spec
- one workflow state-machine spec
- one visual asset pipeline spec
- one CLI command-surface spec
- one implemented design-system baseline
- one minimal configuration-driven content operating model
- one or two exemplar pages demonstrating the recipes from structured unit inputs
- tests and CI gates proving the baseline works

## Required spec set

Create the spec set under `docs/_specs/educational-design-system/`.

Minimum files:

- `spec.md`
- `component-inventory.md`
- `page-recipes.md`
- `deployment.md`
- `phase-1-sprint-plan.md`
- `content-schema.md`
- `workflow-state-machine.md`
- `visual-asset-pipeline.md`
- `cli-command-surface.md`

Once implementation begins, each sprint should also get its own sprint document.

## Sprint plan

## Sprint 0 - Repo analysis and abstraction map

### Goal

Deep-read the museum repo and classify what should be kept, generalized, deferred, or removed while defining the file-based content operating model for the new system.

### Produce

- `docs/_specs/educational-design-system/spec.md`
- `docs/_specs/educational-design-system/component-inventory.md`
- `docs/_specs/educational-design-system/page-recipes.md`
- `docs/_specs/educational-design-system/deployment.md`
- `docs/_specs/educational-design-system/phase-1-sprint-plan.md`
- `docs/_specs/educational-design-system/content-schema.md`
- `docs/_specs/educational-design-system/workflow-state-machine.md`
- `docs/_specs/educational-design-system/visual-asset-pipeline.md`
- `docs/_specs/educational-design-system/cli-command-surface.md`

### Must analyze

- chapter components
- editorial layout components
- home design system
- site shell, header, and footer
- global tokens and layout rhythms
- scripts
- tests
- export assumptions
- image handling, base path, and static-hosting concerns

### Acceptance tests

Sprint 0 is complete only if:

- every major existing component family is classified as keep, generalize, defer, or remove
- there is a named target architecture
- there is a page-level block schema for unit-driven rendering
- there is a documented working-draft and immutable-version boundary
- phase-1 non-goals are explicit
- the specs explain how the research papers influence doctrine without prematurely turning into content

## Sprint 1 - Theme tokens and educational visual baseline

### Goal

Create the theme and token layer for the educational system.

### Build

- semantic color roles
- typography roles
- spacing scale
- content-width system
- section-rhythm rules
- border, radius, and shadow rules
- responsive scale rules
- motion and transition rules
- accessibility contrast baseline

### Acceptance tests

Sprint 1 is complete only if:

- all tokens are semantic rather than arbitrary
- the system can style reading pages, lesson pages, and overview pages without ad hoc CSS
- typography is visibly hierarchical on mobile and desktop
- long-form reading width is controlled
- contrast meets baseline accessibility expectations
- no page depends on magic numbers that should be tokens

## Sprint 2 - Layout primitives and shell hardening

### Goal

Generalize the museum layout into reusable educational layout primitives.

### Build

- page shell
- lesson shell
- prose container
- wide editorial band
- split layout
- card grid
- summary grid
- transition band
- media block
- local navigation or progress affordance if static-safe
- reusable header and footer patterns

### Acceptance tests

Sprint 2 is complete only if:

- layout primitives support at least three different page shapes without custom rewrites
- mobile layouts collapse cleanly to one-column reading flows
- section spacing is consistent across pages
- header, footer, and navigation remain legible across breakpoints
- no foundational layout component contains topic-specific wording

## Sprint 3 - Educational content primitives

### Goal

Turn the museum's instructional grammar into generalized content components.

### Required components

Implement educational versions of:

- `LessonHero`
- `SectionBlock`
- `WhyItMatters`
- `ConceptGrid`
- `SummaryGrid`
- `ComparisonGrid`
- `SequenceTimeline`
- `WorkedExample`
- `EditorialAside`
- `PullInsight`
- `VisualBreak`
- `ReflectionPrompt`
- `NextStepBlock`
- `SourceAnchorGrid`
- optional `GlossaryBlock`

### Acceptance tests

Sprint 3 is complete only if:

- each component has a documented pedagogical purpose
- each component has a clean prop contract
- each component renders well with placeholder educational content unrelated to AI history
- each component has at least one unit test
- each component has accessible heading structure and sensible semantics
- no component is coupled to museum-specific data models

## Sprint 4 - Page recipes and exemplar implementations

### Goal

Define reusable page-level grammar and prove it with exemplar pages.

### Required page recipes

- learning homepage
- module overview page
- lesson page
- concept explainer page
- timeline or story page
- assignment or project page
- reading map or resource map page

### Build

Implement at least two exemplar pages:

- one lesson-style page
- one overview or concept page

### Acceptance tests

Sprint 4 is complete only if:

- at least two page recipes are fully implemented with the new primitives
- the pages feel like a coherent learning system rather than a component demo
- the pages scan clearly on first view
- each page has one dominant instructional job
- transitions between sections are explicit and readable
- the recipes are documented well enough for reuse

## Sprint 5 - Static export and GitHub Pages hardening

### Goal

Make the system safe for static deployment.

### Build

- export-safe routing assumptions
- asset-path strategy
- base-path handling
- image strategy compatible with static hosting
- sitemap and robots sanity
- deployment notes for GitHub Pages
- CI export validation

### Acceptance tests

Sprint 5 is complete only if:

- the site builds cleanly to a static output
- no core page depends on a server runtime
- internal links work under a base path
- images and static assets resolve correctly
- sitemap and robots behavior is preserved or consciously adapted
- deployment instructions are reproducible

## Sprint 6 - QA, accessibility, and baseline proof

### Goal

Lock the foundation with measurable quality gates.

### Required checks

- Vitest for components
- Playwright for breakpoint and browser smoke tests
- accessibility checks
- Lighthouse baseline
- link integrity
- export validation in CI

### Acceptance tests

Sprint 6 is complete only if:

- all core components have tests
- all exemplar pages have smoke coverage
- at least one breakpoint suite verifies mobile and desktop behavior
- basic accessibility issues are addressed rather than deferred
- Lighthouse is run and documented
- the repo can be handed off as a reusable baseline rather than a one-off prototype

## Foundational spec requirements

The foundational spec must define:

- project purpose
- users
- instructional design doctrine
- design-system principles
- technical constraints
- phase-1 scope
- non-goals
- acceptance criteria

## Component inventory requirements

The component inventory must document:

- component name
- intent
- props or data contract
- visual behavior
- accessibility requirements
- example usage
- which museum component it was derived from

## Page recipe requirements

The page-recipe spec must define:

- homepage recipe
- lesson recipe
- concept page recipe
- module overview recipe
- assignment recipe
- reading map recipe

## Deployment spec requirements

The deployment spec must define:

- static export strategy
- base-path and custom-domain strategy
- asset handling
- workflow outline
- CI gates for export viability

## Architectural rules

1. Prefer composition over giant page files.
2. Keep topic content out of the primitives.
3. Separate visual primitives from pedagogical primitives.
4. Do not hide complexity in global CSS when it belongs in tokens or components.
5. Use consistent naming tied to pedagogical function.
6. Keep data contracts simple and future-proof.
7. Preserve testability and exportability at every stage.

## Non-goals

Not in phase 1:

- CMS or editor workflow beyond what is strictly necessary
- user accounts
- analytics productization
- unconstrained learner-facing AI generation features
- research ingestion into live content
- course-progress backend
- personalization engine
- social or community features
- monetization features
- deep curriculum-engine ambition

We are building the foundation, not the whole future platform.

## Research usage rule

Use the two research papers to shape the system doctrine.

Use the degree paper mainly for:

- scaffolding
- multimodality
- project-based progression
- competency framing
- support for attention and reading challenges
- workload pacing and early wins

Use the identity or opportunity paper mainly for:

- coherence
- hierarchy
- scanability
- proof blocks
- ethical persuasion
- page-level single-job discipline

Do not yet convert the papers into live site copy except for brief doctrine notes inside the specs.

## Initial success criteria

Phase 1 is successful if it delivers:

- a clean educational design doctrine
- a reusable static Next.js design system
- a documented configuration-driven content model
- a documented set of instructional components
- a documented set of page recipes
- an export-safe GitHub Pages baseline
- a documented workflow for draft, review, approve, and publish
- a testable implementation scaffold
- a visual and technical system clearly derived from the museum site's strengths but generalized beyond it

## Final standard

Do not merely redesign the museum site.
Do not merely restyle components.
Do not make this prettier without making it more teachable.

Study the museum site as a working prototype of instructional editorial structure, then abstract its strongest ideas into a reusable educational system that can support many future learning experiences.

Produce a system that feels calm, coherent, legible, modular, cognitively supportive, technically disciplined, and genuinely useful for teaching.
