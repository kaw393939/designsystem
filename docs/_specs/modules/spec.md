# Modules System Spec

## Status

- Status: Active planning source of truth
- Scope: new `/modules/` route family, content migration from the AI orchestration project, new navigation, and the repeatable module pattern that supports a growing 16-week course
- Source project: `/Users/kwilliams/Projects/nextjs_ai_orchestration_spec_sprint_process`
- Primary implementation anchors: `lib/site-navigation.ts`, `components/page-shell.tsx`, `components/lesson-shell.tsx`, `components/support-route-shell.tsx`

## Project purpose

Extend the current workshop site from a single-topic guided tour into a modular 16-week course that grows over time. Each new batch of content lands as a self-contained module with a stable internal rhythm. The first expansion brings AI history, agentic orchestration, and image-prompting content from the AI orchestration project into modules 2–4.

## Problem statement

1. The current site teaches one thing well: how to build a public web presence through the Signal → Archetype → Style → Proof → Build → Publish tour.
2. The Build step tells students to write a brief clear enough for "a classmate or AI tool to follow," but nothing on the site explains what AI tools are, how they work, or how to talk to them.
3. A parallel project contains 7,000+ lines of museum-quality AI history content, 52 images (portraits, generated illustrations), a math/embeddings guide, a people-and-institutions registry, and an orchestration method document. That content is not connected to this site.
4. The site has no container that supports sequential multi-week teaching. The tour is a single loop. Experiences are standalone deep-dives. Neither pattern supports a semester-length course spine.
5. Without a module model, every new teaching topic would require inventing a new route family.

## Design thesis

**The tour teaches the framework. Modules teach the skills. Browse is the reference shelf. Examples are the proof.**

Modules are the new primary growth surface. Each module is a self-contained teaching unit with 2–5 internal lessons, a practice exercise, and a checkpoint. Modules plug into the nav as peers, not children, of the tour. Students who complete the tour understand the framework; modules give them the deeper skill and context to do each step well.

## Why modules instead of weeks

- Weeks are brittle. If an instructor reorders or combines topics, every URL, breadcrumb, and cross-reference breaks.
- Modules are semantic. "AI Foundations" means something without a week number. An instructor can teach Module 3 before Module 2 without breaking the site.
- Modules are the unit that grows. Each semester, adding a new module (typography, accessibility, client communication) follows the exact same pattern and touches old content only when cross-linking.
- Weeks can be mapped to modules in the instructor guide without baking that mapping into the IA.

## Information architecture

### Current route families

```
/                  Start (lobby)
/tour/*            Guided tour (6 steps: signal → publish)
/browse/*          Reference rooms (archetypes, design-lineages, attention-trust)
/examples/*        Student exemplars, lessons, before-and-after
/experiences/*     Standalone deep-dives (BSEAI, identity portfolio, AI renaissance)
/instructor-guide  Instructor layer
```

### Target route families

```
/                  Start (lobby) — unchanged
/tour/*            Guided tour (6 steps) — unchanged, gains cross-links to modules
/modules/          Module index — sequenced course spine
/modules/[slug]/   Module overview page
/modules/[slug]/[lesson]/  Lesson pages within a module
/browse/*          Reference rooms — unchanged, gains new rooms over time
/examples/*        Student exemplars — unchanged, grows per module
/experiences/*     Standalone deep-dives — existing ones stay; new deep content becomes modules instead
/instructor-guide  Instructor layer — gains module-to-week mapping table
```

### Primary navigation change

**Current:** Start · Tour · Browse · Examples · Instructor

**Target:** Start · Tour · Modules · Browse · Examples · Instructor

### Module index page (`/modules/`)

A card grid showing all modules in teaching sequence. Each card shows:
- Module number and title
- 1-sentence summary
- Lesson count and estimated time
- Status badge (active, preview, coming)
- Link to module overview

### Module overview page (`/modules/[slug]/`)

Uses `SupportRouteShell` or a new `ModuleShell` variant with:
- Hero: module title, summary, "what you leave with," where it fits in the course
- Lesson cards: ordered list of internal lessons
- Practice link
- Checkpoint link
- Return link to module index

### Lesson pages (`/modules/[slug]/[lesson]/`)

Use `LessonShell` with `LocalNav` sidebar. Each lesson follows the same internal rhythm:
1. Orientation — what the lesson covers and why it matters
2. Content — the teaching material (prose, portraits, timelines, diagrams, cards)
3. Key ideas — concept cards or summary grid
4. Next step — link to next lesson or to practice

### Practice pages (`/modules/[slug]/practice/`)

Hands-on exercise tied to the module's teaching goal. Template:
- What to do (clear task)
- What to hand in or show
- Example of done well

### Checkpoint pages (`/modules/[slug]/checkpoint/`)

Formative review. Template:
- Self-check questions
- Peer review prompt
- Studio criteria (the "hand it to someone else" pattern from the Build step)

## Module plan (6 modules for 16 weeks)

### Module 1: Web Presence Framework

- **Weeks:** 1–3
- **Source:** existing tour content
- **Purpose:** orient students to the Signal → Publish framework
- **Lessons:**
  1. Who is this for — audience, need, promise (draws from `/tour/signal`)
  2. Pick the vibe — archetype selection and congruence (draws from `/tour/archetype`)
  3. Choose the look — visual direction tied to archetype (draws from `/tour/style`)
  4. Add proof and publish — proof plan + deployment (draws from `/tour/proof`, `/tour/build`, `/tour/publish`)
- **Practice:** audit a live site using the portfolio/museum checklists
- **Checkpoint:** peer review of audit notes
- **Migration effort:** low — lessons are curated excerpts from existing tour steps, not copies; the tour stays canonical and lessons link back to it
- **Image needs:** none new — reuses existing site visuals

### Module 2: AI Foundations

- **Weeks:** 4–5
- **Source:** AI orchestration project (7 era pages, people/institutions data, images)
- **Purpose:** give students the historical and conceptual ground for understanding AI tools before they use them
- **Lessons:**
  1. Where AI came from — condensed 7-era story as a single page with key turning points, portraits, and timeline (draws from all 7 era pages, heavily condensed)
  2. How models learn — embeddings, vectors, latent space explained plainly (draws from math/embeddings guide)
  3. The people who built this — cast-focused view through key researchers and institutions with portraits (draws from people-and-institutions page + narrative-data registry)
- **Practice:** read a primary source paper from the reading map and write a 1-paragraph summary of what it changed
- **Checkpoint:** explain one AI concept to a classmate without jargon
- **Migration effort:** high — requires condensing ~2,800 lines of era content into ~600-800 lines of workshop-tone prose, adapting the data model, copying and referencing 52 images
- **Image needs:** copy all 52 images from source project (`public/media/generated/`, `public/media/wikimedia/`) to `public/media/modules/`

### Module 3: Agentic Workflow

- **Weeks:** 6–7
- **Source:** AI orchestration project (Era 7 content, orchestration-method.md, spec-driven workflow docs)
- **Purpose:** teach students the difference between using AI as a chatbot and using AI as an orchestrated tool, then connect that directly to the Build step's brief-writing
- **Lessons:**
  1. Chatbot vs. agent — what changes when AI follows a brief instead of answering a question (draws from Era 7 content + orchestration method)
  2. Writing briefs AI can follow — the "brief → orchestrate → verify" loop applied to real page-building tasks (draws from orchestration method, adapted to workshop examples)
  3. When AI helps and when it does not — honest limits, hallucination, verification mindset (draws from Era 7 governance content + research memos)
- **Practice:** write a build brief for a page revision and have an AI tool attempt it, then evaluate the result
- **Checkpoint:** peer comparison of brief quality and AI output quality
- **Migration effort:** medium-high — Era 7 content exists but needs significant rewriting for workshop tone; orchestration method is process-focused and needs student-facing adaptation; lesson 2 is partly new content
- **Image needs:** reuses Era 7 images (foundation-models hero, OpenAI visual, portraits of Altman, Karpathy, Amodei)

### Module 4: Visual AI

- **Weeks:** 8–9
- **Source:** partially new, grounded in the latent space guide and the generated illustrations as teaching examples
- **Purpose:** teach students how to prompt for images — what models see vs. what you mean, iteration patterns, and when generated images help vs. hurt a site
- **Lessons:**
  1. How image models see — latent space applied to images, what "style" and "composition" mean to a model (draws from embeddings guide, adapted for visual domain)
  2. Prompting for images — practical guide: prompt structure, iteration, specificity, avoiding clichés (mostly new content, uses the 27 generated illustrations as before/after teaching examples)
  3. When to generate and when to photograph — editorial judgment about when AI images serve a site and when they undermine trust (new content, grounded in the proof/evidence framework from the tour)
- **Practice:** generate 3 hero images for a sample site, write the prompts, and annotate what worked and what did not
- **Checkpoint:** peer review of image quality, prompt clarity, and editorial judgment
- **Migration effort:** high — lesson 1 has source material to adapt, but lessons 2–3 are mostly new writing
- **Image needs:** reuses the 27 generated illustrations as teaching examples; may generate new before/after pairs

### Module 5: Identity and Proof

- **Weeks:** 10–12
- **Source:** existing identity portfolio experience + tour proof step
- **Purpose:** deepen the identity system and proof strategy introduced in the tour
- **Lessons:**
  1. Identity signals — how audience, archetype, and visual direction create a coherent identity (draws from identity portfolio experience)
  2. Building proof that lands — types of evidence, placement strategy, trust mechanics (draws from `/tour/proof` + `/browse/attention-trust`)
  3. Portfolio as proof system — the portfolio itself as an identity proof artifact (draws from student exemplars + identity portfolio experience)
- **Practice:** redesign the proof section of the student's own site using the audit criteria
- **Checkpoint:** studio review using the portfolio and museum review criteria from the Build step
- **Migration effort:** medium — content exists across existing routes; requires curation and some new connecting prose
- **Image needs:** reuses existing student exemplar screenshots; may add new annotated examples

### Module 6: Studio and Publish

- **Weeks:** 13–16
- **Source:** existing tour build/publish steps + new professional practice content
- **Purpose:** teach the full build-review-publish-iterate cycle as professional practice
- **Lessons:**
  1. From brief to build — turning a build brief into a working page (deepens `/tour/build`)
  2. Review and revision — studio critique methods, giving and receiving feedback (partly new)
  3. Deployment and iteration — publishing, measuring, deciding what to fix next (deepens `/tour/publish`)
  4. Professional practice — maintaining a site over time, when to redesign vs. when to iterate (new content)
- **Practice:** publish a real page revision and document the before/after
- **Checkpoint:** final portfolio review using the full course criteria
- **Migration effort:** medium — core build/publish content exists; professional practice lesson is new
- **Image needs:** student before/after screenshots; minimal new generation

## Content migration strategy

### Source project inventory

| Source | Lines | Items | Target module |
| --- | --- | --- | --- |
| 7 era pages | 2,796 | 7 pages with heroes, timelines, profiles, concepts | Module 2 lesson 1 (condensed) |
| Math/embeddings guide | ~450 | 1 guide with KaTeX, diagrams | Module 2 lesson 2, Module 4 lesson 1 |
| People and institutions page | ~400 | 1 hub page | Module 2 lesson 3 |
| Reading maps | ~500 | 1 page with source references | Module 2 practice |
| Narrative data registry | 1,100 | 20 people + 6 institutions + 8 anchors + 11 visuals | Shared data model |
| Orchestration method docs | ~400 | 1 guide | Module 3 lessons 1–2 |
| Era 7 page | 360 | Foundation models, ChatGPT, governance | Module 3 lessons 1, 3 |
| Research memos | ~1,700 | 5 deep-dive documents | Background reference for all modules |
| Generated illustrations | 27 files | Era heroes, concept visuals | Modules 2, 3, 4 |
| Wikimedia portraits | 25 files | Historical and modern figures | Module 2 lesson 3 |

### Tone adaptation rules

The source project writes in museum-curatorial voice. The target site writes in workshop-companion voice.

| Source pattern | Target adaptation |
| --- | --- |
| "Each era answers a pressure created by the chapter before it." | "Every wave of AI happened because the last one hit a wall." |
| "Let this era serve as..." | Drop. Start with what happened and why it matters. |
| "Reading Frame" / "Organizing Lens" section headers | Use plain headers: "What to notice" / "The big picture" |
| Third-person historical distance | Second-person when addressing the student: "Here is what you need to know about..." |
| Dense multi-paragraph narrative prose | Shorter paragraphs, more headings, card-grid summaries where possible |
| Full citation apparatus | Keep key citations, move deep bibliography to a "Further reading" section |

### Image migration plan

1. Copy all files from source `public/media/generated/` to target `public/media/modules/generated/`
2. Copy all files from source `public/media/wikimedia/` to target `public/media/modules/portraits/`
3. Update all image references to use new paths
4. Add alt text following these guidelines:
   - **Portraits:** "[Name], [role/era descriptor]" (e.g., "Alan Turing, mathematician and computing pioneer")
   - **Illustrations:** Describe the scene depicted (e.g., "Illustrated scene of researchers at the 1956 Dartmouth AI conference")
   - **Diagrams:** Describe what the diagram shows and its purpose (e.g., "Embedding space showing word neighborhoods for king, queen, man, woman")
   - **Visual breaks:** Mark as decorative with `alt=""`
5. Verify all Wikimedia images carry appropriate attribution

### Data model integration

The source project uses `lib/narrative-data.ts` with typed arrays of people, institutions, anchors, and visuals. The target site should:

1. Create `lib/module-content/ai-foundations.ts` with adapted data structures
2. Create `lib/module-content/agentic-workflow.ts` with concept and comparison data
3. Create `lib/module-content/visual-ai.ts` with prompt examples and editorial rubrics
4. Module 1 imports data arrays from existing `lib/web-presence-site-content.ts` (no new data file required)
5. Create `lib/module-content/identity-and-proof.ts` with signal, evidence-tier, and portfolio rubric data
6. Create `lib/module-content/studio-and-publish.ts` with review criteria and professional-practice rubric data
7. Use the existing `PanelTone` and content-model types where possible
8. Keep the data self-contained per module (no global narrative registry that grows unbounded)
9. Each module’s data file exports what its pages need; shared types live in a module-content index

### Component reuse plan

| Source component | Target approach |
| --- | --- |
| `ChapterHero` | Replace with `SupportRouteShell` hero for module overview, `LessonShell` for lessons |
| `ChapterSection` | Replace with `SectionHeading` + `TonePanel` pattern already used in tour steps |
| `ChapterTimeline` | Build a lightweight `TimelineSection` component (reusable across modules) |
| `NarrativeProfileGrid` | Build a `PersonProfileGrid` component using existing `ContentGrid` + portrait cards |
| `EditorialCardGrid` | Reuse existing `ContentGrid` |
| `EditorialSplit` | Reuse existing `SplitLayout` |
| `ChapterVisualBreak` | Replace with `MediaBlock` |
| `TransitionBlock` | Replace with `CalloutBand` |
| `GuideCallout` | Replace with `CalloutBand` |
| `MathBlock` | Port directly (KaTeX) |
| `EmbeddingsNeighborhoodDiagram` | Port directly (data visualization) |

### New components needed

1. **`ModuleShell`** — composes `SupportRouteShell` internally for the hero, then adds module-specific sections below (lesson grid, practice/checkpoint links, prev/next module navigation)
2. **`ModuleIndexCard`** — card for the `/modules/` index grid showing module metadata and status; renders as a disabled card (no link) when module status is `"coming"`
3. **`TimelineSection`** — lightweight vertical timeline for era content (5–7 milestone items with dates); uses `<ol>` with `aria-label` for accessibility
4. **`PersonProfileCard`** — circular portrait (`rounded-full`) + name + era + role + summary; uses `<article>` with heading hierarchy
5. **`PersonProfileGrid`** — grid of `PersonProfileCard` items using `ContentGrid`
6. **`ModuleLocalNav`** — route-based sidebar showing lesson links within a module (NOT a wrapper around `LocalNav`, which is scroll-position-based page-section navigation); rendered from a per-module `layout.tsx` that provides module context to all child pages
7. **`MathBlock`** — KaTeX rendering wrapper, ported from source project; uses dynamic import to avoid 300KB+ synchronous bundle impact; includes `aria-label` for screen reader access
8. **`FurtherReading`** — simple `<aside>` section for source references at the bottom of lessons that cite deep material

### New dependencies

- **`katex`** — required for `MathBlock` component. Install in Sprint 1 as infrastructure. Use dynamic import (`next/dynamic`) to keep the main bundle lean.

## Navigation and cross-linking

### Header nav update

Add "Modules" between "Tour" and "Browse" in `primarySiteNavItems`:

```ts
{
  id: "modules",
  href: "/modules",
  label: "Modules",
  matchHrefs: ["/modules"],
}
```

### Tour → Module cross-links

Each tour step gains an optional `moduleHref` and `moduleLabel` that links to the module providing deeper skill context:

| Tour step | Module link |
| --- | --- |
| Signal | Module 1: Web Presence Framework |
| Build | Module 3: Agentic Workflow (brief-writing with AI) |
| Build | Module 4: Visual AI (image prompting) |
| Proof | Module 5: Identity and Proof |
| Publish | Module 6: Studio and Publish |

### Module → Tour return links

Every module overview page includes a "Where this fits" callout linking back to the tour step(s) it supports.

### Module → Browse cross-links

Modules link to browse rooms for deeper reference (e.g., Module 5 links to `/browse/attention-trust`).

### Lobby update

The homepage entry intents gain a new card:

```
Course modules — Follow the full semester path from framework through professional practice.
→ /modules/
```

## Instructor guide update

Add a "Module-to-week mapping" section showing the recommended 16-week schedule:

| Weeks | Module | Key deliverable |
| --- | --- | --- |
| 1–3 | Module 1: Web Presence Framework | Site audit + initial brief |
| 4–5 | Module 2: AI Foundations | Primary source summary |
| 6–7 | Module 3: Agentic Workflow | AI-assisted build brief |
| 8–9 | Module 4: Visual AI | Generated hero image set |
| 10–12 | Module 5: Identity and Proof | Proof section redesign |
| 13–16 | Module 6: Studio and Publish | Published site + portfolio review |

Instructors can resequence modules. The mapping is a recommendation, not a constraint baked into URLs.

## Quality gates

1. **Type-check:** `npx tsc --noEmit` must pass after every sprint
2. **Tests:** all existing tests must continue to pass; new modules add at least smoke-render tests
3. **Visual consistency:** every module page must use the same `max-w-7xl`, padding chain, and tone-panel palette as the rest of the site
4. **Tone consistency:** content review pass after each module's lessons are written — must read like the workshop, not like the museum
5. **Image accessibility:** all images have meaningful alt text
6. **Cross-link integrity:** every module → tour and tour → module link resolves
7. **Navigation:** module index, local nav, and header nav all render correctly
8. **Responsive:** module pages must work at `sm`, `md`, `lg`, `xl` breakpoints
