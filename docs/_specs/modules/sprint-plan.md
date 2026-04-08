# Modules Sprint Plan

## Sprint overview

| Sprint | Title | Goal | Effort | Duration |
| --- | --- | --- | --- | --- |
| 1 | Scaffolding and module shell | Stand up the `/modules/` route family, new components, nav integration, module index page | Medium | 1.5 weeks |
| 2 | Module 2 — AI Foundations content | Migrate and adapt AI history, embeddings guide, and people content into Module 2's three lessons | High | 2 weeks |
| 3 | Module 3 — Agentic Workflow content | Adapt Era 7 and orchestration method into chatbot-vs-agent, brief-writing, and honest-limits lessons | High | 2 weeks |
| 4 | Module 4 — Visual AI content | Write image-prompting lessons using latent space concepts and generated illustrations as teaching examples | High | 2 weeks |
| 5 | Module 1 — Web Presence Framework | Curate existing tour content into Module 1's four lessons (lightweight — content exists) | Low-Medium | 1 week |
| 6 | Modules 5–6 — Identity/Proof and Studio/Publish | Build remaining modules from existing experience and tour content + new professional practice writing | Medium-High | 2 weeks |
| 7 | Cross-linking, instructor guide, and polish | Wire up all tour ↔ module links, update lobby, write instructor week mapping, final QA pass | Medium | 1.5 weeks |

**Total estimated duration: ~12 weeks**

## Sprint dependencies

| Sprint | Hard dependencies | Soft dependencies |
| --- | --- | --- |
| 1 | None | — |
| 2 | Sprint 1 (module shell, types, nav, `TimelineSection`, `PersonProfileGrid`) | — |
| 3 | Sprint 1 (module shell, types); Sprint 2 (portrait images in `public/media/modules/portraits/`) | Sprint 2 (tone calibration from Lesson 1 informs Sprint 3 writing) |
| 4 | Sprint 1 (module shell, types); Sprint 2 (generated images in `public/media/modules/generated/`) | Sprint 2 (embeddings content informs Lesson 1 framing) |
| 5 | Sprint 1 (module shell, types) | Sprint 2 (tone precedent) |
| 6 | Sprint 1 (module shell, types) | Sprints 2–4 (tone precedent) |
| 7 | Sprints 1–6 (all module pages must exist for cross-linking) | — |

**Critical path:** Sprint 1 → Sprint 2 → Sprint 7. Sprints 3–6 can overlap with each other after Sprint 2 completes image migration.

---

## Sprint 1: Scaffolding and Module Shell

### Goal

Create the structural foundation so module content can land in sprints 2–4 without inventing infrastructure each time.

### Deliverables

1. `app/modules/layout.tsx` — shared layout for all module pages
2. `app/modules/page.tsx` — module index page with card grid
3. `components/module-shell.tsx` — module overview page shell (hero, lesson list, practice/checkpoint links)
4. `components/module-index-card.tsx` — card component for the module index grid
5. `components/module-local-nav.tsx` — sidebar nav showing lessons within a module (extends or wraps `LocalNav`)
6. `components/timeline-section.tsx` — lightweight vertical timeline for era milestones
7. `components/person-profile-card.tsx` — portrait card for the people grid
8. `components/person-profile-grid.tsx` — grid wrapper using `ContentGrid`
9. `lib/module-content/types.ts` — shared types for modules, lessons, metadata
10. `lib/module-content/index.ts` — module registry (id, slug, title, summary, lessons, status)
11. Update `lib/site-navigation.ts` — add "Modules" to `primarySiteNavItems`
12. Update `components/site-header-nav.tsx` — render the new nav item

### Implementation sequence

1. **Types and registry** — define the module data model in `lib/module-content/`
2. **Module shell component** — `ModuleShell` adapts `SupportRouteShell` for module overview pages
3. **Module index components** — `ModuleIndexCard` + index page grid
4. **Module local nav** — sidebar showing lesson list within a module
5. **Reusable content components** — `TimelineSection`, `PersonProfileCard`, `PersonProfileGrid`
6. **Nav integration** — add "Modules" to header, wire up `matchHrefs`
7. **Placeholder pages** — create `/modules/` index and one placeholder module overview (`/modules/ai-foundations/`) to validate the full shell
8. **Tests** — smoke-render tests for new components

### Acceptance criteria

- `/modules/` renders a card grid with at least one module card
- `/modules/ai-foundations/` renders the module shell with placeholder lesson list
- "Modules" appears in the header nav and highlights on module routes
- Module local nav sidebar renders on `lg:` and above
- `npx tsc --noEmit` passes
- All existing tests pass
- New components have at least one render test each

---

## Sprint 2: Module 2 — AI Foundations

### Goal

Populate the AI Foundations module — the first real content module — with three lessons migrated and adapted from the AI orchestration project.

### Pre-work

- Copy all images from source project to `public/media/modules/`
- Create `lib/module-content/ai-foundations.ts` with adapted data (people, eras, concepts, images)

### Deliverables

1. **Image migration** — 52 files copied to `public/media/modules/generated/` and `public/media/modules/portraits/`
2. **Data file** — `lib/module-content/ai-foundations.ts` with:
   - Era timeline data (7 eras condensed: title, period, thesis, 3–5 milestones each)
   - People profiles (20 entries: name, era, role, summary, image path, optional URL)
   - Institution profiles (6 entries: name, era, role, summary, image path)
   - Concept definitions (key concepts per era, plain-language)
3. **Module overview** — `app/modules/ai-foundations/page.tsx` using `ModuleShell`
4. **Lesson 1: Where AI came from** — `app/modules/ai-foundations/where-ai-came-from/page.tsx`
   - Condensed 7-era story as one flowing page
   - `TimelineSection` with key milestones per era (35–40 items total, not all 7×5)
   - Key turning-point images: `era-1-precursors.webp`, `dartmouth-proposal.webp`, `lighthill-report.webp`, `imagenet-moment.webp`, `transformer-paper.webp`, `openai-public-ai.webp`
   - 2–3 `PersonProfileGrid` sections grouping figures by era cluster
   - `CalloutBand` transitions between era groups
   - Workshop tone throughout — every museum sentence rewritten
5. **Lesson 2: How models learn** — `app/modules/ai-foundations/how-models-learn/page.tsx`
   - Vectors as learned coordinates (plain-language + KaTeX)
   - Similarity as geometric comparison (cosine analogy)
   - Latent space as neighborhood story
   - Token → representation → attention pipeline
   - Port `EmbeddingsNeighborhoodDiagram` and `MathBlock` components
   - `latent-space-landscape-v1.webp` and `representation-learning-bridge.webp` visuals
6. **Lesson 3: The people who built this** — `app/modules/ai-foundations/the-people-who-built-this/page.tsx`
   - Full `PersonProfileGrid` grouped by era
   - Institution cards with images
   - Links to primary sources
   - Connection to the "why this matters for your work" framing
7. **Practice page** — `app/modules/ai-foundations/practice/page.tsx`
   - Task: read a primary source paper and write a 1-paragraph summary
   - Reading list drawn from the intellectual-lineage reading map
   - Template for summary structure
8. **Checkpoint page** — `app/modules/ai-foundations/checkpoint/page.tsx`
   - Explain one concept without jargon
   - Peer review prompt
   - Self-assessment rubric
9. **Module local nav** — wired up with all 5 pages (3 lessons + practice + checkpoint)

### Content volume

- Lesson 1: ~600-800 lines (condensing ~2,800 lines of era content)
- Lesson 2: ~300-400 lines (adapting ~450 lines of math guide)
- Lesson 3: ~200-300 lines (curating from ~400 lines + data registry)
- Practice + checkpoint: ~100-150 lines each
- Data file: ~500-600 lines
- Total new/adapted: ~1,800-2,400 lines

### Tone adaptation pass

After all content is in place, a dedicated review pass rewrites any remaining museum-voice sentences into workshop-companion voice. Every paragraph should pass the test: "Would a student in week 4 read past this sentence without hesitating?"

### Acceptance criteria

- All 5 module pages render with images, profiles, and timelines
- Module local nav shows all lessons, practice, and checkpoint
- `PersonProfileGrid` renders portraits correctly
- `TimelineSection` renders era milestones
- `MathBlock` renders KaTeX correctly
- All images load from new paths
- Workshop tone throughout — no museum-voice remnants
- `npx tsc --noEmit` passes
- Smoke-render tests for all new pages

---

## Sprint 3: Module 3 — Agentic Workflow

### Goal

Build the three-lesson module that bridges AI understanding into practical tool use, directly connecting to the Build step's brief-writing.

### Deliverables

1. **Data file** — `lib/module-content/agentic-workflow.ts` with:
   - Key concept definitions (agent, orchestration, brief, verification, hallucination, context window)
   - Comparison data (chatbot vs. agent characteristics)
   - Brief-quality rubric items
   - Limitation categories with examples
2. **Module overview** — `app/modules/agentic-workflow/page.tsx`
3. **Lesson 1: Chatbot vs. agent** — `app/modules/agentic-workflow/chatbot-vs-agent/page.tsx`
   - What happens when you type into ChatGPT (simplified pipeline)
   - The "ask and hope" pattern vs. the "brief → orchestrate → verify" pattern
   - Side-by-side comparison cards
   - Why the distinction matters for building real things
   - Uses Era 7 content about foundation models going public
   - Portraits: Karpathy (public educator), Altman (deployment), Amodei (safety)
4. **Lesson 2: Writing briefs AI can follow** — `app/modules/agentic-workflow/writing-briefs/page.tsx`
   - The brief as the unit of orchestration
   - Brief anatomy: role, scope, constraints, acceptance criteria, examples
   - Good brief vs. bad brief comparison (concrete web-presence examples)
   - Connection to Build step: "Your build brief is already an AI brief"
   - Draws from orchestration-method.md, adapted with workshop examples
5. **Lesson 3: When AI helps and when it does not** — `app/modules/agentic-workflow/honest-limits/page.tsx`
   - Hallucination: what it is, why it happens, how to spot it
   - Context windows and memory limits
   - The verification mindset: check the output, not the confidence
   - When to use AI (repetitive structure, first drafts, code scaffolding) vs. when not to (novel claims, emotional nuance, final judgment)
   - Draws from Era 7 governance content + research memos
6. **Practice page** — `app/modules/agentic-workflow/practice/page.tsx`
   - Task: write a build brief for a page revision, give it to an AI tool, evaluate the result
   - Brief template provided
   - Evaluation rubric: did the AI follow the brief? What did it miss? What would you change?
7. **Checkpoint page** — `app/modules/agentic-workflow/checkpoint/page.tsx`
   - Peer comparison: trade briefs, compare AI outputs
   - Was the brief specific enough?
   - Studio review using the Build step criteria

### Content volume

- Lesson 1: ~400-500 lines (adapting Era 7 + new comparison content)
- Lesson 2: ~350-450 lines (adapting orchestration method + new workshop examples)
- Lesson 3: ~350-450 lines (adapting governance content + new limits writing)
- Practice + checkpoint: ~100-150 lines each
- Data file: ~200-300 lines
- Total: ~1,500-2,000 lines

### Acceptance criteria

- All pages render with correct tone and visual hierarchy
- Comparison cards render side-by-side on `lg:` screens
- Brief template is copy-pasteable
- Cross-links to `/tour/build` work in both directions
- Workshop tone throughout
- `npx tsc --noEmit` passes
- Smoke-render tests

---

## Sprint 4: Module 4 — Visual AI

### Goal

Teach students how to prompt for images, using the latent space concepts from Module 2 and the generated illustrations from the source project as teaching examples.

### Deliverables

1. **Data file** — `lib/module-content/visual-ai.ts` with:
   - Prompt example pairs (prompt text + resulting image + annotation)
   - Image model comparison data (what models see vs. what you mean)
   - Editorial judgment rubric (when to generate, when to photograph)
2. **Module overview** — `app/modules/visual-ai/page.tsx`
3. **Lesson 1: How image models see** — `app/modules/visual-ai/how-image-models-see/page.tsx`
   - Latent space applied to images (adapted from Module 2's embeddings content)
   - What "style" means to a model vs. what it means to a designer
   - What "composition" means in vector space
   - Why prompts with concrete details outperform abstract requests
   - Uses `latent-space-landscape-v1.webp` and concept diagrams
4. **Lesson 2: Prompting for images** — `app/modules/visual-ai/prompting-for-images/page.tsx`
   - Prompt anatomy: subject, style, composition, mood, technical specs
   - Iteration patterns: refine, vary, extend
   - Specificity ladder: vague → good → precise (with actual generated image examples)
   - Common clichés to avoid (generic corporate, over-HDR, uncanny faces)
   - Uses 8–10 of the 27 generated illustrations as annotated examples; prompts are either (a) regenerated from documented prompts or (b) labeled "approximate prompt — the original was not recorded"
5. **Lesson 3: When to generate and when to photograph** — `app/modules/visual-ai/editorial-judgment/page.tsx`
   - Generated images as illustration vs. evidence (generated images cannot be proof)
   - The trust question: does this image help or hurt the page's credibility?
   - When AI images fit: concept illustration, decorative heroes, mood boards, placeholder art
   - When they do not: testimonial photos, product shots, team photos, anything claiming to document reality
   - Connection to the proof framework: "Proof means real evidence, not beautiful fiction"
6. **Practice page** — `app/modules/visual-ai/practice/page.tsx`
   - Task: generate 3 hero images for a sample site, write the prompts, annotate what worked
   - Prompt template provided
   - Evaluation: does the image match the archetype? Does it support the proof plan?
7. **Checkpoint page** — `app/modules/visual-ai/checkpoint/page.tsx`
   - Peer review of image quality, prompt clarity, and editorial judgment
   - Studio question: "Would a visitor trust this image?"

### Content volume

- Lesson 1: ~300-400 lines (adapted from embeddings guide)
- Lesson 2: ~400-500 lines (mostly new, with annotated examples)
- Lesson 3: ~300-400 lines (new, grounded in existing proof framework)
- Practice + checkpoint: ~100-150 lines each
- Data file: ~200-300 lines
- Total: ~1,400-1,900 lines

### Acceptance criteria

- All pages render with images displayed correctly
- Prompt examples appear as styled cards with image + prompt text + annotation
- Generated illustrations load from `public/media/modules/generated/`
- Editorial judgment lesson cross-links to `/tour/proof`
- Workshop tone throughout
- `npx tsc --noEmit` passes
- Smoke-render tests

---

## Sprint 5: Module 1 — Web Presence Framework

### Goal

Curate existing tour content into Module 1's four lessons. This module is lightweight because the tour steps already contain the teaching content — the lessons add structure and pacing for a classroom context.

### Deliverables

1. **Module overview** — `app/modules/web-presence-framework/page.tsx`
2. **Lesson 1: Who is this for** — audience, need, promise (curated from `/tour/signal`)
3. **Lesson 2: Pick the vibe** — archetype selection (curated from `/tour/archetype` + `/browse/archetypes`)
4. **Lesson 3: Choose the look** — visual direction (curated from `/tour/style` + `/browse/design-lineages`)
5. **Lesson 4: Add proof and publish** — proof plan + deployment (curated from `/tour/proof`, `/tour/build`, `/tour/publish`)
6. **Practice page** — audit a live site using the portfolio/museum checklists
7. **Checkpoint page** — peer review of audit notes

### Content approach

These lessons are curated excerpts and summaries, not copies. Each lesson:
- Frames the lesson's purpose in 2–3 sentences
- Presents the key teaching content (imports data arrays from `lib/web-presence-site-content.ts` — confirmed to exist)
- Links to the canonical tour step: "For the full walk-through, see [tour step name]"
- Links to the browse room for deeper reference
- Adds classroom-specific framing the tour step does not have (e.g., "Bring your audit notes to the next class")

### Content volume

- Each lesson: ~200-300 lines (curated, not written from scratch)
- Practice + checkpoint: ~100-150 lines each
- Total: ~1,100-1,500 lines

### Acceptance criteria

- All pages render and link to tour steps correctly
- Module local nav shows all 6 pages
- No content duplication — lessons reference and link, not copy
- Every paragraph passes the tone test: "Would a student in week 1 read past this sentence without hesitating?"
- `npx tsc --noEmit` passes

---

## Sprint 6: Modules 5–6 — Identity/Proof and Studio/Publish

### Goal

Build the remaining two modules from existing experience and tour content plus new professional practice writing.

### Deliverables

#### Module 5: Identity and Proof
1. Data file: `lib/module-content/identity-and-proof.ts` with identity signal categories, evidence-tier definitions, and portfolio rubric data
2. Module overview
3. Lesson 1: Identity signals (from identity portfolio experience)
4. Lesson 2: Building proof that lands (from proof step + attention-trust room)
5. Lesson 3: Portfolio as proof system (from student exemplars)
6. Practice + checkpoint

#### Module 6: Studio and Publish
1. Data file: `lib/module-content/studio-and-publish.ts` with review criteria, feedback framework, and professional-practice rubric data
2. Module overview
2. Lesson 1: From brief to build (deepens Build step)
3. Lesson 2: Review and revision (new studio critique content)
4. Lesson 3: Deployment and iteration (deepens Publish step)
5. Lesson 4: Professional practice (new — maintaining a site over time)
6. Practice + checkpoint

### Content volume

- Module 5: ~900-1,200 lines (mostly curated from existing content)
- Module 6: ~1,200-1,600 lines (mixed curation + new professional practice writing)
- Total: ~2,100-2,800 lines

### Acceptance criteria

- All module pages render
- Identity portfolio experience content adapted, not duplicated
- Professional practice lesson reads as new workshop content, not filler
- All cross-links resolve
- Every paragraph passes the tone test: "Would a student in week 10 read past this sentence without hesitating?"
- `npx tsc --noEmit` passes

---

## Sprint 7: Cross-linking, Instructor Guide, and Polish

### Goal

Wire everything together: tour ↔ module links, lobby update, instructor week mapping, and final quality pass.

### Deliverables

1. **Tour → Module cross-links** — each tour step gains a "Go deeper" link to the relevant module
2. **Module → Tour return links** — each module overview shows "Where this fits" in the tour
3. **Lobby update** — new entry intent card for "Course modules" on the homepage
4. **Instructor guide update** — new "Module-to-week mapping" section with the 16-week recommended schedule and per-module teaching notes (prerequisites, in-class activities, homework, watch-fors, resequencing notes)
5. **Browse → Module links** — browse rooms link to the module that teaches the skill in depth (archetypes, design-lineages, attention-trust, and sources)
6. **Module index polish** — finalize card grid with accurate statuses, lesson counts, and summaries
7. **Navigation QA** — verify header nav highlight, local nav, breadcrumbs, and all cross-links
8. **Responsive QA** — verify all module pages at `sm`, `md`, `lg`, `xl` breakpoints
9. **Tone QA** — final read-through of all module content for workshop-voice consistency
10. **Test suite** — comprehensive render tests for all module pages and components
11. **Performance check** — verify no regressions in build time or bundle size from image/data additions

### Acceptance criteria

- Every tour step links to at least one module
- Every module links back to the tour
- Homepage shows module entry intent
- Instructor guide has the 16-week table with per-module teaching notes
- All links resolve (no 404s)
- `npx tsc --noEmit` passes
- Full test suite passes
- Site renders correctly at all breakpoints
- No museum-voice remnants in any module content
