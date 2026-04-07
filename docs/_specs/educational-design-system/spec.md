# Educational Design System Phase 1 Foundation Spec

## Status

- Status: Active phase-1 source of truth
- Scope: Phase 1 fundamentals only
- Current baseline release: `content/releases/phase-1-baseline-release.json` is published and represents the completed phase-1 baseline
- Reference implementation: `/Users/kwilliams/Desktop/nextjs_ai_orchestration_spec_sprint_process`
- Research inputs: `docs/_research/identity.md`, `docs/_research/renesaince.md`

Historical planning artifacts live under `docs/_specs/_archive/` and are not authoritative.

## Project purpose

Create a reusable educational editorial design system derived from the museum site's strongest instructional and technical patterns.

The system is intended to support static learning sites that help learners move from orientation to understanding to reflection to action. It should also support a configuration-driven publishing model so the same research base can generate multiple site variants, units, and release bundles. It is not a generic marketing theme, a blog starter, or a full learning platform.

## Problem statement

The reference museum site already demonstrates a strong instructional grammar: explicit section roles, visual hierarchy, narrative sequencing, editorial pacing, static export discipline, and serious verification. Those strengths are currently bound to a history-of-AI product surface.

Phase 1 exists to abstract that working grammar into a reusable baseline that can support multiple educational domains without carrying topic-specific language, layouts, or assumptions.

## Users

### Primary users

- Learners aged roughly 18 to 20 with uneven reading readiness, fragmented attention, mixed confidence, and a need for visible progress.
- Educators and instructional designers who need a stable page grammar for lessons, modules, explainers, assignments, and reading maps.

### Secondary users

- Front-end engineers implementing reusable educational components.
- Content authors who need clear recipes and constraints.
- Content operators running draft, freeze, review, revise, and publish workflows.
- Maintainers responsible for static deployment, accessibility, and QA.

## Experience goals

The system should help teams produce pages that feel:

- calm
- legible
- structured
- serious
- encouraging
- evidence-aware

The learner should be able to answer three questions quickly on every page:

1. What is this page for?
2. What should I understand or do next?
3. Where am I in the learning sequence?

## Instructional design doctrine

### Teach through sequence

Pages should present information in a guided order instead of dumping content into undifferentiated long-form blocks.

The default instructional sequence is:

1. Orientation
2. Why it matters
3. Key idea map or sequence
4. Core explanation
5. Worked example or visual bridge
6. Summary
7. Reflection or action
8. Next step

### Design for scan-first behavior

The first read is usually a scan, not a deep read. Therefore the system must provide strong section labeling, meaningful headings, obvious section boundaries, and cards or callouts that summarize real instructional value.

### Support novice learners structurally

The research inputs support scaffolding, multimodal explanation, coaching, project-based progression, workload pacing, and visible early wins. Those requirements should be encoded into the component system rather than treated as optional style choices.

### Keep persuasion ethical and structural

The system may use proof, framing, and clarity to improve attention and trust, but it must not use dark patterns, fake urgency, manipulative scarcity, or decorative hype.

### Preserve single-job page discipline

Each page must have one dominant instructional job. A lesson page should not behave like a resource directory. An assignment page should not behave like a marketing homepage.

## Design-system principles

1. Pedagogical function outranks ornament.
2. Reusable primitives outrank one-off pages.
3. Editorial clarity outranks startup-style energy.
4. Proof, sources, and examples outrank vague claims.
5. Composition outranks giant page files.
6. Semantic tokens outrank magic numbers.
7. Accessibility is part of the baseline, not a later QA pass.
8. Static export constraints are first-class architectural constraints.
9. Append-only content versioning outranks in-place edits.
10. Workflow state should live in artifacts, not chat memory.
11. Planning QA and implementation QA are first-class delivery artifacts.

## Reference baseline from the museum site

The reference repo already contains the abstraction seeds for this system.

### Reusable content families

- `ChapterHero`
- `ChapterSection`
- `ChapterTimeline`
- `ChapterVisualBreak`
- `EditorialAside`
- `PullQuote`
- `TransitionBlock`
- `EditorialCardGrid`
- `EditorialSummaryGrid`
- `GuideCallout`
- `ReadingClusterGrid`

### Reusable shell and UI families

- `site-header.tsx`
- `site-footer.tsx`
- `editorial-layout.tsx`
- `section-heading.tsx`
- `card.tsx`
- `panel.tsx`
- `accordion.tsx`

### Technical baseline already proven

- Next.js 16 App Router
- static export via `output: "export"`
- `trailingSlash: true`
- `basePath` driven by `NEXT_PUBLIC_BASE_PATH`
- `next/image` with `unoptimized: true`
- strict TypeScript
- Tailwind CSS v4
- Vitest coverage
- Playwright breakpoint smoke tests
- Lighthouse CI
- GitHub Pages workflow

## Target architecture

Phase 1 should establish this layered architecture:

1. Source documents
2. Structured units and visual specs
3. Workflow and review artifacts
4. Experience configs and release manifests
5. Tokens
6. UI primitives
7. Educational/editorial primitives
8. Page recipes
9. Exemplar pages
10. Export and deployment pipeline
11. Tests and QA gates

## Configuration-driven publishing model

The design system should not depend on hand-authored page files alone.

Phase 1 should define a file-based publishing model with these characteristics:

- canonical long-form source documents remain in Markdown
- phase-1 publishable units are page-level artifacts derived from those sources
- each page-level unit contains an ordered `blocks[]` array that maps directly to recipe sections and educational primitives
- reusable units are derived from those sources and stored as versioned content artifacts
- mutable working drafts are allowed before reviewable snapshots are frozen
- visuals are first-class artifacts with their own specs, reviews, and versions
- experiences assemble approved units into site variants
- releases publish immutable manifests rather than mutating live content in place
- draft, freeze, review, revise, approve, and publish steps produce durable records

Append-only guarantees begin at the frozen review-snapshot boundary. Working drafts may be mutable, but frozen candidates, approved versions, published visuals, review records, and release manifests must be immutable.

This model allows a single research base to produce multiple learning experiences without duplicating the whole site or rewriting its structure every time.

## Phase 1 scope

### In scope

- Educational theme tokens for reading, emphasis, reflection, proof, warning, synthesis, and next-step states
- Layout primitives for shells, prose widths, editorial bands, split layouts, grids, media blocks, and transitions
- Instructional primitives for heroes, sections, why-it-matters blocks, concept grids, comparison grids, sequences, examples, asides, quotes, summaries, reflection, sources, and next-step transitions
- Recipe documentation for homepage, module overview, lesson, concept explainer, timeline or story, assignment, and reading map pages
- One or two exemplar pages that prove the recipe grammar
- Page-level block-based content schema, working-draft model, and append-only snapshot/versioning rules
- Workflow state-machine, visual asset, and CLI command-surface specifications
- Static-export-safe technical baseline for GitHub Pages
- Testing and QA expectations aligned to the reference repo

### Out of scope

- CMS or editorial workflow beyond minimal authoring support
- authentication or student accounts
- analytics dashboards or productization layers
- unconstrained learner-facing AI generation features
- dynamic backends or databases
- community features
- monetization systems
- full curriculum engine behavior
- deep ingestion of research papers into page content

## Technical constraints

1. The system must remain Next.js-based and static-first.
2. Core functionality must not require a Node server at runtime.
3. Internal links, assets, and route generation must remain safe under a repository base path.
4. Components must not depend on topic-specific data models.
5. Heading structure, semantics, and contrast must be accessible by default.
6. Motion must respect reduced-motion preferences.
7. The implementation must remain testable with Vitest and Playwright.
8. Published content and visuals must be immutable; changes happen through superseding versions.
9. Release builds must be driven by approved manifests rather than by mutable working files.
10. Working drafts must never be used directly in production builds.

## Content constraints

1. Headings should carry meaning, not mood alone.
2. Every section should have a visible job.
3. Cards and callouts must summarize, orient, compare, prove, or guide. They should not exist as decoration.
4. Long text must be chunked into readable widths and bounded sections.
5. Reflection and next-step elements should feel instructional, not performative.
6. Charts and graphs should be code-generated from structured data or specs when accuracy matters.
7. Generative image workflows should be used for illustration and atmosphere, not as a replacement for data graphics.

## Acceptance criteria

### Product acceptance

- The system has a documented doctrine that reflects sequence, novice support, scanability, coherence, proof, and ethical persuasion.
- The component inventory distinguishes what is kept, generalized, deferred, and removed from the museum site.
- The page recipe spec covers the required page types with explicit required and optional sections.
- The content schema, workflow state machine, visual asset pipeline, and CLI command surface are documented.
- The content schema can represent the documented page recipes through ordered block contracts rather than hidden page logic.
- The exemplar pages feel like a coherent learning system instead of a component gallery.

### Technical acceptance

- The baseline supports static export to GitHub Pages.
- Core routes and assets resolve correctly under a base path.
- Components are structured for testability and accessible semantics.
- The publishing model can regenerate sections or whole experiences from approved content and release manifests.
- The QA plan includes unit tests, browser smoke tests, accessibility checks, and Lighthouse thresholds.

### Design acceptance

- The visual system is editorial, calm, and legible.
- Reading width, spacing rhythm, hierarchy, and state styling are governed by semantic tokens.
- The system works on mobile and desktop without custom per-page rescue CSS.

## Risks to manage

1. Over-generalization that strips away the museum site's useful instructional structure.
2. Under-generalization that leaves AI-history assumptions embedded in the primitives.
3. Treating visual polish as success while leaving pedagogy vague.
4. Introducing export-hostile features during implementation.

## Definition of phase-1 success

Phase 1 is successful when the project has a clear doctrine, a reusable component and layout baseline, a configuration-driven content model, documented recipe grammar, export-safe deployment guidance, and a quality bar that matches the seriousness of the reference implementation.

The published `phase-1-baseline-release` baseline satisfies that phase-1 success condition. Subsequent work should extend the system through a new phase plan rather than reopening the completed phase-1 scope implicitly.
