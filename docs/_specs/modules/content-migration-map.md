# Content Migration Map

## Purpose

Track every piece of content from the AI orchestration project and map it to its target location in the modules system. This document is the source of truth for what moves where, what gets condensed, what gets rewritten, and what gets dropped.

## Source project

`/Users/kwilliams/Projects/nextjs_ai_orchestration_spec_sprint_process`

## Migration status key

- **migrate** — content moves to target, rewritten for tone
- **condense** — content is summarized and integrated into a larger page
- **port** — component or data moves with minimal changes
- **adapt** — structure or logic is reused but content is significantly rewritten
- **reference** — used as background for new writing, not directly migrated
- **drop** — not needed in the target site

---

## Era pages → Module 2 Lesson 1

All 7 era pages condense into one lesson: "Where AI came from."

| Source file | Lines | Migration | Target |
| --- | --- | --- | --- |
| `app/eras/precursors-to-machine-intelligence/page.tsx` | 234 | condense | Module 2 Lesson 1 — "Logic and machinery before 1936" section |
| `app/eras/computation-information-field-formation/page.tsx` | 483 | condense | Module 2 Lesson 1 — "Turing, Shannon, and the naming of AI" section |
| `app/eras/symbolic-optimism-and-early-ai-programs/page.tsx` | 412 | condense | Module 2 Lesson 1 — "Symbolic AI: programs that reason" section |
| `app/eras/knowledge-systems-critique-and-the-first-ai-winter/page.tsx` | 348 | condense | Module 2 Lesson 1 — "Expert systems and the first winter" section |
| `app/eras/statistical-learning-and-network-revival/page.tsx` | 410 | condense | Module 2 Lesson 1 — "Learning from data" section |
| `app/eras/deep-learning-breakthroughs/page.tsx` | 349 | condense | Module 2 Lesson 1 — "Deep learning and the ImageNet moment" section |
| `app/eras/foundation-models-and-generative-ai/page.tsx` | 360 | condense + adapt | Module 2 Lesson 1 — "Foundation models go public" section; also feeds Module 3 Lesson 1 |

### Condensation rules

- Each era becomes one section (~80-120 lines) instead of a full page (~300-480 lines)
- Keep: the thesis, 3 key milestones, 2-3 portraits, 1 turning-point image
- Drop: full chronology lists (keep top 3), deep narrative prose (replace with summary), source apparatus (move key citations to "Further reading")
- Rewrite: every sentence must pass the workshop-tone test

---

## Math guide → Module 2 Lesson 2 + Module 4 Lesson 1

| Source file | Lines | Migration | Target |
| --- | --- | --- | --- |
| `app/guides/embeddings-latent-space-and-llm-math/page.tsx` | ~450 | adapt | Module 2 Lesson 2 — "How models learn" (vector concepts, pipeline) |
| Same file — visual/spatial sections | ~150 | adapt | Module 4 Lesson 1 — "How image models see" (latent space applied to images) |

### Adaptation rules

- Keep all KaTeX blocks — they are a strength
- Rewrite framing from "here is the math behind LLMs" to "here is what is happening when you type a prompt"
- Module 2 gets the text/language focus
- Module 4 gets the visual/image focus with additional image-specific framing

---

## People and institutions → Module 2 Lesson 3

| Source file | Lines | Migration | Target |
| --- | --- | --- | --- |
| `app/people-and-institutions/page.tsx` | ~400 | adapt | Module 2 Lesson 3 — "The people who built this" |
| `lib/narrative-data.ts` | 1,100 | port + adapt | `lib/module-content/ai-foundations.ts` — People and institution data |

### Adaptation rules

- Port the data model with simplified types (drop fields not needed for workshop display)
- Keep all 20 people profiles and 6 institution profiles
- Rewrite summaries for workshop tone
- Group by era cluster (precursors, field formation, symbolic, winter, revival, deep learning, foundation) instead of alphabetical
- Keep portraits — they are essential for the human-centered teaching approach

---

## Reading maps → Module 2 Practice

| Source file | Lines | Migration | Target |
| --- | --- | --- | --- |
| `app/reading-maps/intellectual-lineage/page.tsx` | ~500 | adapt | Module 2 Practice — reading list of primary sources |

### Adaptation rules

- Keep 10-15 most important source references (not the full list)
- Add "Why this paper matters in one sentence" for each
- Frame as a practice assignment, not a reference gallery

---

## Orchestration method → Module 3

| Source file | Lines | Migration | Target |
| --- | --- | --- | --- |
| `docs/foundation/orchestration-method.md` | ~400 | adapt | Module 3 Lesson 1 (chatbot vs. agent framing) + Lesson 2 (brief anatomy) |

### Adaptation rules

- Lesson 1 draws the core distinction: chat as Q&A vs. orchestration as brief-driven work
- Lesson 2 extracts the brief anatomy (role, scope, constraints, acceptance criteria) and applies it to web-presence examples instead of software-engineering examples
- Drop implementation-specific details (sprint contracts, QA gates for codebases)
- Keep the thesis: "humans focus on strategy, scope, architecture, taste, communication, and verification; AI is directed through explicit artifacts"

---

## Era 7 content → Module 3

| Source content | Migration | Target |
| --- | --- | --- |
| Era 7 page — foundation models, ChatGPT deployment | adapt | Module 3 Lesson 1 — why AI went public, what it means for your work |
| Era 7 page — governance and safety debates | adapt | Module 3 Lesson 3 — honest limits, hallucination, verification |
| Research memo: `foundation-models-public-ai-and-2026-surface.md` | reference | Background for all Module 3 lessons |
| Research memo: `embeddings-latent-space-and-llm-math-bridges.md` | reference | Background for Module 2 Lesson 2 |

---

## Research memos → Background reference

| Source file | Migration | Target |
| --- | --- | --- |
| `docs/_research/topics/pre-shannon-to-dartmouth.md` | reference | Background for Module 2 Lesson 1 (eras 1-2) |
| `docs/_research/topics/post-dartmouth-to-first-ai-winter.md` | reference | Background for Module 2 Lesson 1 (eras 3-4) |
| `docs/_research/topics/statistical-learning-through-transformers.md` | reference | Background for Module 2 Lesson 1 (eras 5-6) |
| `docs/_research/topics/foundation-models-public-ai-and-2026-surface.md` | reference | Background for Module 2 Lesson 1 (era 7) + Module 3 |
| `docs/_research/topics/embeddings-latent-space-and-llm-math-bridges.md` | reference | Background for Module 2 Lesson 2 + Module 4 Lesson 1 |

---

## Student reading guide → Module 2 framing

| Source file | Migration | Target |
| --- | --- | --- |
| `docs/foundation/student-reading-guide.md` | reference | Informs the framing and pacing of Module 2 lessons; not directly migrated |

---

## Components → Port or replace

| Source component | Lines | Migration | Target |
| --- | --- | --- | --- |
| `components/content/chapter/ChapterHero` | ~80 | drop | Replaced by `ModuleShell` hero / `LessonShell` hero |
| `components/content/chapter/ChapterSection` | ~60 | drop | Replaced by `SectionHeading` + content |
| `components/content/chapter/ChapterTimeline` | ~100 | adapt | New `TimelineSection` component (simplified) |
| `components/content/chapter/ChapterVisualBreak` | ~40 | drop | Replaced by `MediaBlock` |
| `components/content/chapter/TransitionBlock` | ~50 | drop | Replaced by `CalloutBand` |
| `components/content/editorial/EditorialCardGrid` | ~60 | drop | Existing `ContentGrid` serves the same purpose |
| `components/content/editorial/EditorialSplit` | ~50 | drop | Existing `SplitLayout` serves the same purpose |
| `components/content/editorial/NarrativeProfileGrid` | ~80 | adapt | New `PersonProfileGrid` using `ContentGrid` |
| `components/content/editorial/EditorialSummaryGrid` | ~60 | drop | Replaced by `ContentGrid` + `TonePanel` |
| `components/content/editorial/HistoricalAnchorGrid` | ~70 | drop | Source links integrated into lesson content directly |
| `components/content/guide-callout.tsx` | ~30 | drop | Replaced by `CalloutBand` |
| `components/content/math-block.tsx` | ~40 | port | New `components/math-block.tsx` (KaTeX rendering) |
| `components/content/visualizations/EmbeddingsNeighborhoodDiagram` | ~150 | port | New `components/embeddings-diagram.tsx` |
| `components/content/visualizations/InterpretabilityGapDiagram` | ~100 | drop | Not needed for workshop scope |
| `components/content/visualizations/FoundationModelTurningPointsDiagram` | ~100 | drop | Timeline section covers this |

---

## Images → Copy

### Generated illustrations (27 files)

| Source path | Target path | Used in |
| --- | --- | --- |
| `public/media/generated/era-1-precursors.webp` | `public/media/modules/generated/era-1-precursors.webp` | Module 2 L1 |
| `public/media/generated/era-2-field-formation.webp` | `public/media/modules/generated/era-2-field-formation.webp` | Module 2 L1 |
| `public/media/generated/era-3-symbolic-programs.webp` | `public/media/modules/generated/era-3-symbolic-programs.webp` | Module 2 L1 |
| `public/media/generated/era-4-expert-systems.webp` | `public/media/modules/generated/era-4-expert-systems.webp` | Module 2 L1 |
| `public/media/generated/era-5-statistical-revival.webp` | `public/media/modules/generated/era-5-statistical-revival.webp` | Module 2 L1 |
| `public/media/generated/era-6-deep-learning.webp` | `public/media/modules/generated/era-6-deep-learning.webp` | Module 2 L1 |
| `public/media/generated/era-7-foundation-models.webp` | `public/media/modules/generated/era-7-foundation-models.webp` | Module 2 L1 + Module 3 L1 |
| `public/media/generated/dartmouth-proposal.webp` | `public/media/modules/generated/dartmouth-proposal.webp` | Module 2 L1 |
| `public/media/generated/shannon-theseus-maze.webp` | `public/media/modules/generated/shannon-theseus-maze.webp` | Module 2 L1 |
| `public/media/generated/lighthill-report.webp` | `public/media/modules/generated/lighthill-report.webp` | Module 2 L1 |
| `public/media/generated/backpropagation-paper.webp` | `public/media/modules/generated/backpropagation-paper.webp` | Module 2 L1 |
| `public/media/generated/imagenet-moment.webp` | `public/media/modules/generated/imagenet-moment.webp` | Module 2 L1 |
| `public/media/generated/transformer-paper.webp` | `public/media/modules/generated/transformer-paper.webp` | Module 2 L1 |
| `public/media/generated/openai-public-ai.webp` | `public/media/modules/generated/openai-public-ai.webp` | Module 2 L1 + Module 3 L1 |
| `public/media/generated/era-1-visual-break.webp` | `public/media/modules/generated/era-1-visual-break.webp` | Module 2 L1 |
| `public/media/generated/era-2-visual-break.webp` | `public/media/modules/generated/era-2-visual-break.webp` | Module 2 L1 |
| `public/media/generated/era-3-visual-break.webp` | `public/media/modules/generated/era-3-visual-break.webp` | Module 2 L1 |
| `public/media/generated/era-4-visual-break.webp` | `public/media/modules/generated/era-4-visual-break.webp` | Module 2 L1 |
| `public/media/generated/era-5-visual-break.webp` | `public/media/modules/generated/era-5-visual-break.webp` | Module 2 L1 |
| `public/media/generated/era-6-visual-break.webp` | `public/media/modules/generated/era-6-visual-break.webp` | Module 2 L1 |
| `public/media/generated/era-7-visual-break.webp` | `public/media/modules/generated/era-7-visual-break.webp` | Module 2 L1 |
| `public/media/generated/latent-space-landscape-v1.webp` | `public/media/modules/generated/latent-space-landscape-v1.webp` | Module 2 L2 + Module 4 L1 |
| `public/media/generated/representation-learning-bridge.webp` | `public/media/modules/generated/representation-learning-bridge.webp` | Module 2 L2 |
| `public/media/generated/math-guide-hero.webp` | `public/media/modules/generated/math-guide-hero.webp` | Module 2 L2 |
| `public/media/generated/people-institutions-hero.webp` | `public/media/modules/generated/people-institutions-hero.webp` | Module 2 L3 |
| `public/media/generated/section-divider-chronology.webp` | `public/media/modules/generated/section-divider-chronology.webp` | Module 2 L1 |
| `public/media/generated/era-timeline.svg` | `public/media/modules/generated/era-timeline.svg` | Module 2 L1 |

### Portrait photos (25 files)

| Source path | Target path | Used in |
| --- | --- | --- |
| `public/media/wikimedia/ada-lovelace.webp` | `public/media/modules/portraits/ada-lovelace.webp` | Module 2 L1, L3 |
| `public/media/wikimedia/george-boole.webp` | `public/media/modules/portraits/george-boole.webp` | Module 2 L1, L3 |
| `public/media/wikimedia/charles-babbage.webp` | `public/media/modules/portraits/charles-babbage.webp` | Module 2 L1, L3 |
| `public/media/wikimedia/alan-turing.webp` | `public/media/modules/portraits/alan-turing.webp` | Module 2 L1, L3 |
| `public/media/wikimedia/claude-shannon.webp` | `public/media/modules/portraits/claude-shannon.webp` | Module 2 L1, L3 |
| `public/media/wikimedia/john-mccarthy.webp` | `public/media/modules/portraits/john-mccarthy.webp` | Module 2 L1, L3 |
| `public/media/wikimedia/marvin-minsky.webp` | `public/media/modules/portraits/marvin-minsky.webp` | Module 2 L1, L3 |
| `public/media/wikimedia/allen-newell.webp` | `public/media/modules/portraits/allen-newell.webp` | Module 2 L3 |
| `public/media/wikimedia/herbert-simon.webp` | `public/media/modules/portraits/herbert-simon.webp` | Module 2 L3 |
| `public/media/wikimedia/edward-feigenbaum.webp` | `public/media/modules/portraits/edward-feigenbaum.webp` | Module 2 L3 |
| `public/media/wikimedia/frank-rosenblatt.webp` | `public/media/modules/portraits/frank-rosenblatt.webp` | Module 2 L3 |
| `public/media/wikimedia/geoffrey-hinton.webp` | `public/media/modules/portraits/geoffrey-hinton.webp` | Module 2 L1, L3 |
| `public/media/wikimedia/yann-lecun.webp` | `public/media/modules/portraits/yann-lecun.webp` | Module 2 L3 |
| `public/media/wikimedia/yoshua-bengio.webp` | `public/media/modules/portraits/yoshua-bengio.webp` | Module 2 L3 |
| `public/media/wikimedia/ilya-sutskever.webp` | `public/media/modules/portraits/ilya-sutskever.webp` | Module 2 L1, L3 |
| `public/media/wikimedia/demis-hassabis.webp` | `public/media/modules/portraits/demis-hassabis.webp` | Module 2 L3 |
| `public/media/wikimedia/andrej-karpathy.webp` | `public/media/modules/portraits/andrej-karpathy.webp` | Module 3 L1 |
| `public/media/wikimedia/sam-altman.webp` | `public/media/modules/portraits/sam-altman.webp` | Module 3 L1 |
| `public/media/wikimedia/dario-amodei.webp` | `public/media/modules/portraits/dario-amodei.webp` | Module 3 L1 |
| `public/media/wikimedia/eliezer-yudkowsky.webp` | `public/media/modules/portraits/eliezer-yudkowsky.webp` | Module 3 L3 |
| `public/media/wikimedia/bell-labs.webp` | `public/media/modules/portraits/bell-labs.webp` | Module 2 L3 |
| `public/media/wikimedia/mit-csail.webp` | `public/media/modules/portraits/mit-csail.webp` | Module 2 L3 |
| `public/media/wikimedia/darpa-hq.webp` | `public/media/modules/portraits/darpa-hq.webp` | Module 2 L3 |
| `public/media/wikimedia/deepmind-social.webp` | `public/media/modules/portraits/deepmind-social.webp` | Module 2 L3 |
| `public/media/wikimedia/anthropic-social.webp` | `public/media/modules/portraits/anthropic-social.webp` | Module 2 L3 |

---

## Content not migrated

The following source content is intentionally dropped or deferred.

| Source | Reason |
| --- | --- |
| Homepage (`app/page.tsx`, `lib/content/homepage.ts`) | Site-specific framing for the AI history site; our lobby is different |
| Layout and site chrome (`components/site/`) | Our site has its own header, footer, nav |
| Era-specific visualizations (`LogicToAiDiagram`) | Over-specialized for workshop scope |
| `InterpretabilityGapDiagram` | Research-depth visualization not needed at workshop level |
| `FoundationModelTurningPointsDiagram` | Replaced by `TimelineSection` |
| Full reading-map apparatus | Condensed into practice reading list |
| Sprint/spec docs (`docs/_specs/`) | Process docs for the source project, not content |
| Test files (`tests/`) | Source project tests do not apply |
| Config files (`next.config.ts`, etc.) | Source project infrastructure |
| `agent.md` | Source project AI instructions |

---

## Migration execution checklist

### Phase 1: Infrastructure (Sprint 1)
- [ ] Create `public/media/modules/generated/` directory
- [ ] Create `public/media/modules/portraits/` directory
- [ ] Copy 27 generated illustrations
- [ ] Copy 25 portrait photos
- [ ] Verify all images load at correct paths
- [ ] Create `lib/module-content/types.ts`
- [ ] Create `lib/module-content/index.ts`

### Phase 2: AI Foundations data (Sprint 2)
- [ ] Create `lib/module-content/ai-foundations.ts`
- [ ] Port and adapt 20 people profiles
- [ ] Port and adapt 6 institution profiles
- [ ] Define era timeline data (7 eras × 3-5 milestones)
- [ ] Define concept definitions
- [ ] Map all image references to new paths

### Phase 3: AI Foundations content (Sprint 2)
- [ ] Write Module 2 overview page
- [ ] Write Lesson 1: Where AI came from (~700 lines)
- [ ] Write Lesson 2: How models learn (~350 lines)
- [ ] Port `MathBlock` component
- [ ] Port `EmbeddingsNeighborhoodDiagram` component
- [ ] Write Lesson 3: The people who built this (~250 lines)
- [ ] Write Practice page (~120 lines)
- [ ] Write Checkpoint page (~120 lines)
- [ ] Tone review pass — rewrite any museum-voice sentences
- [ ] Wire up module local nav

### Phase 4: Agentic Workflow content (Sprint 3)
- [ ] Create `lib/module-content/agentic-workflow.ts`
- [ ] Write Module 3 overview page
- [ ] Write Lesson 1: Chatbot vs. agent (~450 lines)
- [ ] Write Lesson 2: Writing briefs AI can follow (~400 lines)
- [ ] Write Lesson 3: When AI helps and when it does not (~400 lines)
- [ ] Write Practice page (~120 lines)
- [ ] Write Checkpoint page (~120 lines)
- [ ] Tone review pass

### Phase 5: Visual AI content (Sprint 4)
- [ ] Create `lib/module-content/visual-ai.ts`
- [ ] Write Module 4 overview page
- [ ] Write Lesson 1: How image models see (~350 lines)
- [ ] Write Lesson 2: Prompting for images (~450 lines)
- [ ] Write Lesson 3: When to generate and when to photograph (~350 lines)
- [ ] Write Practice page (~120 lines)
- [ ] Write Checkpoint page (~120 lines)
- [ ] Tone review pass

### Phase 6: Framework + remaining modules (Sprints 5-6)
- [ ] Write Module 1 (4 lessons + practice + checkpoint)
- [ ] Write Module 5 (3 lessons + practice + checkpoint)
- [ ] Write Module 6 (4 lessons + practice + checkpoint)
- [ ] Tone review pass for all three

### Phase 7: Integration (Sprint 7)
- [ ] Add tour → module cross-links
- [ ] Add module → tour return links
- [ ] Update homepage entry intents
- [ ] Update instructor guide with week mapping
- [ ] Final navigation QA
- [ ] Final responsive QA
- [ ] Final tone QA
- [ ] Full test suite pass
