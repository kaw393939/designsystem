# Sprint 2: Module 2 — AI Foundations

## Goal

Populate the AI Foundations module with three complete lessons, a practice page, and a checkpoint page. This is the first real content module and validates the entire module pattern with the highest-volume content migration.

## Why this sprint exists

Module 2 is the hardest content migration. It condenses 2,800 lines of era content into ~700 lines, ports a math guide, adapts a people registry, and copies 52 images. If this module works — visually, tonally, and structurally — the remaining modules follow the proven pattern.

## Scope

1. Copy all 52 images from the source project to `public/media/modules/`
2. Create `lib/module-content/ai-foundations.ts` with all adapted data
3. Port `MathBlock` component (KaTeX rendering)
4. Port `EmbeddingsNeighborhoodDiagram` component
5. Write Module 2 overview page
6. Write Lesson 1: Where AI came from
7. Write Lesson 2: How models learn
8. Write Lesson 3: The people who built this
9. Write Practice page
10. Write Checkpoint page
11. Wire up module local nav with all 5 sub-pages
12. Tone review pass

## Scope boundaries

- Sprint 2 does NOT modify existing tour, browse, or experience pages.
- Sprint 2 does NOT build modules 1, 3–6.
- Sprint 2 writes all content in workshop-companion voice, never museum-curatorial voice.

## Pre-work: Image migration

```bash
mkdir -p public/media/modules/generated
mkdir -p public/media/modules/portraits

cp /path/to/source/public/media/generated/*.webp public/media/modules/generated/
cp /path/to/source/public/media/generated/*.svg public/media/modules/generated/
cp /path/to/source/public/media/wikimedia/*.webp public/media/modules/portraits/
```

Verify all 52 files are present before proceeding.

## Pre-work: Audit `EmbeddingsNeighborhoodDiagram`

Before porting, audit the source component at `components/content/visualizations/EmbeddingsNeighborhoodDiagram`:
- List all dependencies (D3? Canvas? SVG-only?)
- Measure its bundle contribution
- Decide: port as-is, simplify to static SVG, or replace with an annotated image
- If porting, note any browser APIs or animation libraries used

This audit determines the scope of the port task below.

## Data file: `lib/module-content/ai-foundations.ts`

### Era timeline data

7 eras, each with:
- `id`: slug
- `title`: short name
- `period`: date range string
- `thesis`: 1-sentence summary in workshop voice
- `milestones`: 3–5 items with `{ year, title, summary }`

Total: ~35 milestones across 7 eras.

### People profiles

20 profiles adapted from `narrative-data.ts`, each with:
- `id`: slug
- `name`: full name
- `era`: era cluster label
- `role`: 1-line role description
- `summary`: 2–3 sentence workshop-tone summary
- `portraitSrc`: path to portrait in `public/media/modules/portraits/`
- `portraitAlt`: "[Name], [role/era descriptor]" (e.g., "Alan Turing, mathematician and computing pioneer")

### Institution profiles

6 profiles:
- Bell Labs, MIT AI Lab, DARPA, OpenAI, DeepMind, Anthropic

Same structure as people profiles but with `imageSrc` instead of `portraitSrc`.

### Concept definitions

Key concepts grouped by era, each with:
- `id`: slug
- `term`: display name
- `definition`: 1–2 sentence plain-language definition
- `era`: era cluster label

## Lesson specifications

### Lesson 1: Where AI came from

**Route:** `/modules/ai-foundations/where-ai-came-from/`

**Structure:**
1. Orientation callout — "Here is the story in seven waves. Each one happened because the last one hit a wall."
2. Eras 1–2: Logic and the naming of AI
   - `TimelineSection` with ~8 milestones (Boole, Babbage, Lovelace, Turing, Shannon, Dartmouth)
   - Portraits: Boole, Babbage, Lovelace (era 1); Turing, Shannon, McCarthy (era 2)
   - Images: `era-1-precursors.webp`, `dartmouth-proposal.webp`, `shannon-theseus-maze.webp`
   - Key teaching point: "Logic becomes computation, computation becomes a field."
3. Eras 3–4: Symbolic AI and the first winter
   - `TimelineSection` with ~8 milestones (Logic Theorist, GPS, LISP, expert systems, Lighthill Report)
   - Portraits: McCarthy, Minsky, Newell, Simon, Feigenbaum
   - Images: `era-3-symbolic-programs.webp`, `era-4-expert-systems.webp`, `lighthill-report.webp`
   - Key teaching point: "Smart programs without learning hit a wall. Funding dried up."
4. Eras 5–6: Learning from data and the deep learning moment
   - `TimelineSection` with ~8 milestones (backpropagation, Deep Blue, ImageNet 2012, transformers)
   - Portraits: Hinton, LeCun, Bengio, Rosenblatt
   - Images: `backpropagation-paper.webp`, `imagenet-moment.webp`, `transformer-paper.webp`
   - Key teaching point: "Instead of writing rules, let the machine learn patterns from data."
5. Era 7: Foundation models go public
   - `TimelineSection` with ~6 milestones (GPT-3, AlphaFold, ChatGPT, multimodal models, governance debates)
   - Portraits: Sutskever, Hassabis, Karpathy, Altman, Amodei
   - Images: `era-7-foundation-models.webp`, `openai-public-ai.webp`
   - Key teaching point: "AI becomes something everyone uses, not just researchers. That changes everything."
6. Closing callout — "Now you know the story. Next, see how these models actually learn."
   - Link to Lesson 2

**Estimated length:** 600–800 lines

### Lesson 2: How models learn

**Route:** `/modules/ai-foundations/how-models-learn/`

**Structure:**
1. Orientation — "You do not need to be a mathematician. You need to understand what happens when you type a prompt."
2. Words as numbers — tokens, embeddings, learned coordinates
   - KaTeX: $\mathbf{e} = [e_1, e_2, \ldots, e_n]$
   - Plain-language: "Each word gets turned into a list of numbers. The numbers encode meaning, not just spelling."
3. Similarity as closeness — cosine similarity, neighborhood analogy
   - `EmbeddingsNeighborhoodDiagram` (ported)
   - "Words that mean similar things end up near each other in this space."
4. Latent space — the learned map of meaning
   - `latent-space-landscape-v1.webp`
   - "Think of it as a map the model builds during training. Every word, sentence, and concept gets a location."
5. The pipeline: token → representation → attention → output
   - Step-by-step walkthrough of what happens when you type a prompt
   - `representation-learning-bridge.webp`
6. Why this matters for your work — "When you write a clear prompt, you are giving the model better coordinates to work with."
   - Link to Module 3

**Estimated length:** 300–400 lines

### Lesson 3: The people who built this

**Route:** `/modules/ai-foundations/the-people-who-built-this/`

**Structure:**
1. Orientation — "AI is not a single invention. It is a relay of ambitions carried by specific people, labs, and institutions."
2. Precursors and founders (pre-1960)
   - `PersonProfileGrid` with Boole, Babbage, Lovelace, Turing, Shannon, McCarthy
3. Builders and critics (1960–2000)
   - `PersonProfileGrid` with Minsky, Newell, Simon, Feigenbaum, Rosenblatt
   - `SectionHeading` on the Lighthill critique and funding collapse
4. The learning revolution (2000–2020)
   - `PersonProfileGrid` with Hinton, LeCun, Bengio
5. The public AI era (2020–2026)
   - `PersonProfileGrid` with Sutskever, Hassabis, Karpathy, Altman, Amodei, Yudkowsky
6. Institutions
   - Institution cards: Bell Labs, MIT AI Lab, DARPA, OpenAI, DeepMind, Anthropic
   - `people-institutions-hero.webp`
7. Closing — "These are the people behind the tools you use. Knowing their work helps you understand what the tools can and cannot do."

**Estimated length:** 200–300 lines

### Practice page

**Route:** `/modules/ai-foundations/practice/`

- Task: pick one primary source paper from a provided reading list (10–15 entries), read the abstract and introduction, and write a 1-paragraph summary of what it changed
- Reading list drawn from the intellectual-lineage reading map (condensed)
- Summary template: "This paper [title] by [author(s)] in [year] argued that [thesis]. It changed the field because [impact]. The most interesting claim is [claim]."
- Submission format: bring the summary to class or post to the course discussion

**Estimated length:** 100–150 lines

### Checkpoint page

**Route:** `/modules/ai-foundations/checkpoint/`

- Self-check: explain one AI concept (embedding, latent space, transformer, foundation model) to a classmate without using jargon
- Peer review prompt: listen to a classmate's explanation and answer: "Could someone who has never heard of AI understand this?"
- Self-assessment rubric:
  - Did I name a specific concept, not just "AI"?
  - Did I use an analogy or comparison instead of technical terms?
  - Did I connect it to something the listener already knows?

**Estimated length:** 100–150 lines

## Component ports

### `MathBlock`

Port from `components/content/math-block.tsx`. Renders KaTeX blocks inside a styled container. Minimal adaptation — mainly update import paths.

Dependency: `katex` (installed in Sprint 1). Use `next/dynamic` for dynamic import to avoid loading KaTeX on pages that don't use math.

Accessibility: add `aria-label` describing the equation in plain language, or use KaTeX's `output: "mathml"` option for MathML annotation that screen readers can interpret.

### `EmbeddingsNeighborhoodDiagram`

Port from `components/content/visualizations/`. Scope depends on the pre-work audit (see above):
- If SVG-only: port with minimal changes, adapt styling to `--surface-*` variables
- If D3/Canvas: evaluate simplifying to a static annotated SVG to avoid heavy dependencies
- Must include `aria-label` or `aria-describedby` describing the visualization for screen readers

## File creation list

| File | Type |
| --- | --- |
| `lib/module-content/ai-foundations.ts` | data |
| `components/math-block.tsx` | component (port) |
| `components/embeddings-diagram.tsx` | component (port) |
| `app/modules/ai-foundations/page.tsx` | route (replace placeholder) |
| `app/modules/ai-foundations/where-ai-came-from/page.tsx` | route |
| `app/modules/ai-foundations/how-models-learn/page.tsx` | route |
| `app/modules/ai-foundations/the-people-who-built-this/page.tsx` | route |
| `app/modules/ai-foundations/practice/page.tsx` | route |
| `app/modules/ai-foundations/checkpoint/page.tsx` | route |

## Acceptance criteria

- [ ] All 52 images load from `public/media/modules/`
- [ ] Module overview page renders with all 5 lesson/practice/checkpoint cards
- [ ] Lesson 1 renders era timeline, portraits, and turning-point images
- [ ] Lesson 2 renders KaTeX blocks (with `aria-label` or MathML) and embeddings diagram
- [ ] Lesson 3 renders `PersonProfileGrid` with all 20 people
- [ ] Practice page displays reading list and summary template
- [ ] Checkpoint page displays self-check and peer review prompts
- [ ] Module local nav shows all pages with active state
- [ ] All images below the fold use `loading="lazy"`; only the first hero/timeline image uses `priority`
- [ ] All content reads in workshop-companion voice (no museum-voice remnants)
- [ ] Every paragraph passes the tone test: "Would a student in week 4 read past this sentence without hesitating?"
- [ ] `npx tsc --noEmit` passes
- [ ] Smoke-render tests for all new pages
- [ ] Record actual line counts for Lesson 1, 2, 3 to calibrate Sprint 3–6 estimates

## Risk mitigation

Sprint 2 is the highest-risk sprint. If it runs longer than expected:

1. **Split into 2a and 2b:** 2a covers data file, image migration, component ports, and the module overview page. 2b covers the three lessons, practice, checkpoint, and tone review.
2. **2a unblocks Sprint 3:** Sprint 3 only depends on the images being in place (from 2a), not on Sprint 2’s lesson content.
3. **Lesson 1 is the critical path:** Write it first. It is the hardest condensation task (2,800 → 700 lines). If Lesson 1 lands well, Lessons 2–3 follow the proven tone. If it struggles, budget extra time before moving to Sprint 3.
4. **Editorial gate:** Lesson 1 gets a dedicated tone review before Lessons 2–3 are written. The review answers: "Does this read like a workshop? Would a student stay engaged?"
