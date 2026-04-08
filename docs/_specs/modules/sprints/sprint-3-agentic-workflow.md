# Sprint 3: Module 3 — Agentic Workflow

## Goal

Build the three-lesson module that bridges AI understanding into practical tool use. This module directly extends the Build step by teaching students the difference between chatbot Q&A and brief-driven orchestration, then giving them the skill to write briefs AI can actually follow.

## Why this sprint exists

The Build step currently says "write a brief clear enough for a classmate or AI tool to follow," but nothing on the site explains what that means in practice. Module 3 fills the gap between knowing what AI is (Module 2) and using it productively (the Build step).

## Scope

1. Create `lib/module-content/agentic-workflow.ts` with concept, comparison, and rubric data
2. Write Module 3 overview page
3. Write Lesson 1: Chatbot vs. agent
4. Write Lesson 2: Writing briefs AI can follow
5. Write Lesson 3: When AI helps and when it does not
6. Write Practice page
7. Write Checkpoint page
8. Wire up module local nav

## Scope boundaries

- Sprint 3 does NOT modify the Build tour step. Cross-linking happens in Sprint 7.
- Sprint 3 does NOT port visualizations from the source project. Content is prose + card grids + callout bands.

## Source content mapping

| Source | Target lesson | Treatment |
| --- | --- | --- |
| Era 7 page — foundation models go public, ChatGPT deployment | Lesson 1 | Adapt: rewrite deployment story as "why AI tools work the way they do now" |
| `docs/foundation/orchestration-method.md` — core problems and operating primitives | Lesson 1 + 2 | Adapt: extract the chatbot-vs-agent distinction and brief anatomy, drop implementation-specific details |
| Era 7 — governance and safety debates | Lesson 3 | Adapt: rewrite as practical limits students will encounter |
| Research memo: `foundation-models-public-ai-and-2026-surface.md` | All lessons | Reference: background framing, not directly migrated |
| Portraits: Karpathy, Altman, Amodei, Yudkowsky | Lessons 1, 3 | Use: 4 images from `public/media/modules/portraits/` |
| Generated: `era-7-foundation-models.webp`, `openai-public-ai.webp` | Lesson 1 | Use: 2 images from `public/media/modules/generated/` |

## Data file: `lib/module-content/agentic-workflow.ts`

### Concept definitions

Key terms with plain-language definitions:
- **Agent** — a program that takes a goal, makes a plan, and executes steps without being told each one
- **Orchestration** — directing an AI tool through structured briefs instead of open-ended conversation
- **Brief** — a document that tells the AI what to do, what constraints to follow, and how to know when it is done
- **Verification** — checking the AI's output against the brief instead of trusting it because it sounds confident
- **Hallucination** — when an AI generates text that sounds correct but is factually wrong or invented
- **Context window** — the amount of text an AI can "remember" in a single conversation (and what happens when it runs out)

### Chatbot vs. agent comparison

Side-by-side data for comparison cards:

| Dimension | Chatbot pattern | Agent pattern |
| --- | --- | --- |
| Input | Open-ended question | Structured brief with constraints |
| Process | Single response to single prompt | Multi-step plan with verification |
| Memory | Forgets between sessions | Brief persists as an artifact |
| Control | User hopes for good output | User defines acceptance criteria |
| Failure mode | Plausible-sounding wrong answer | Detectable deviation from brief |
| Best for | Quick answers, brainstorming | Building real things, production work |

### Brief quality rubric

Items for assessing whether a brief is specific enough:
- Does it name the role the AI should play?
- Does it define the scope (what to touch, what to leave alone)?
- Does it list constraints (tone, length, format, things to avoid)?
- Does it include acceptance criteria (how to know when it is done)?
- Does it provide examples of what good output looks like?
- Could someone unfamiliar with the project follow it?

### Limitation categories

Grouped examples of when AI helps and when it does not:
- **AI helps:** repetitive structure, first drafts, code scaffolding, reformatting, summarizing source material
- **AI struggles:** novel factual claims, emotional nuance, visual taste judgment, context longer than the window
- **AI fails:** fabricating citations, impersonating specific people, producing evidence that does not exist

## Lesson specifications

### Lesson 1: Chatbot vs. agent

**Route:** `/modules/agentic-workflow/chatbot-vs-agent/`

**Structure:**
1. Orientation callout — "You have probably used ChatGPT. That is the chatbot pattern. There is a different way to work."
2. What happens when you type a prompt
   - Simplified pipeline: your text → tokens → model processes → text comes back
   - Why the model sounds confident even when wrong
   - Connection to Module 2's embeddings lesson
3. The chatbot pattern
   - How most people use AI: ask a question, get an answer, hope it is right
   - When this works: quick lookups, brainstorming, casual exploration
   - When it breaks: anything that needs to be correct, consistent, or buildable
4. The agent pattern
   - What changes when you give AI a structured brief instead of an open question
   - The "brief → orchestrate → verify" loop
   - Side-by-side comparison cards using the data from `agentic-workflow.ts`
5. Why this matters for building sites
   - "Your build brief from the tour is already an AI brief if you write it clearly enough."
   - Portrait cards: Karpathy (public AI educator), Altman (deployment), Amodei (safety-first approach)
   - Images: `era-7-foundation-models.webp`, `openai-public-ai.webp`
6. Closing callout — "The difference is not the tool. It is the instruction. Next: how to write briefs that actually work."

**Estimated length:** 400–500 lines

### Lesson 2: Writing briefs AI can follow

**Route:** `/modules/agentic-workflow/writing-briefs/`

**Structure:**
1. Orientation — "A brief is not a wish. It is an instruction set with enough detail that the result can be checked."
2. Brief anatomy
   - Role: who the AI is acting as
   - Scope: what to change and what to leave alone
   - Constraints: tone, length, format, things to avoid
   - Acceptance criteria: how to know when the output is good enough
   - Examples: what good output looks like (most overlooked, most powerful)
   - Each section as a `TonePanel` card with the definition + a concrete web-presence example
3. Good brief vs. bad brief
   - Side-by-side comparison with a real page-revision scenario
   - Bad: "Make my About page better"
   - Good: "Rewrite the first paragraph of my About page to lead with the audience need (hiring managers evaluating senior engineers). Keep the tone direct and confident. Do not add claims I cannot prove. The paragraph should be 3–4 sentences."
   - Annotated: what makes the good version work (names audience, constrains scope, defines tone, sets format, adds a constraint about proof)
4. The build brief is already an AI brief
   - Connection to the tour's Build step
   - "If you followed the tour, you already have a brief. Let's see if it is specific enough."
   - Brief quality rubric as a checklist (from data file)
5. Closing callout — "A well-written brief does double duty: a classmate can follow it, and an AI tool can follow it. Next: the honest limits."

**Estimated length:** 350–450 lines

### Lesson 3: When AI helps and when it does not

**Route:** `/modules/agentic-workflow/honest-limits/`

**Structure:**
1. Orientation — "AI tools are powerful, but they are not reliable in the way a calculator is reliable. Here is what to watch for."
2. Hallucination
   - What it is: the model generates text that sounds correct but is invented
   - Why it happens: the model predicts likely next tokens, not true statements
   - How to spot it: check facts against sources, watch for vague authority claims, be suspicious of perfect-sounding citations
   - `TonePanel` with a concrete example: "The model says a design principle was coined by [invented name] in [invented year]. It sounds authoritative. It is fiction."
3. Context windows and memory
   - What the context window is: the text the model can "see" at once
   - What happens when it runs out: the model forgets earlier instructions
   - Practical implication: long conversations degrade; structured briefs within the window work better
4. The verification mindset
   - "Check the output, not the confidence."
   - Questions to ask: Does this match my brief? Can I verify the claims? Would I put my name on this?
   - Connection to the proof framework: "You learned in the tour that proof means real evidence. The same rule applies to AI output."
5. When to use AI and when not to
   - Limitation categories from data file, displayed as card grids
   - AI helps: repetitive structure, first drafts, code scaffolding
   - AI struggles: novel claims, emotional nuance, visual taste
   - AI fails: fabricating sources, impersonating people, generating evidence
   - Portrait: Yudkowsky — the safety-first perspective
6. Closing callout — "The best use of AI is when you can verify the output. The worst is when you cannot tell whether it is right."

**Estimated length:** 350–450 lines

### Practice page

**Route:** `/modules/agentic-workflow/practice/`

- Task: write a build brief for a specific page revision (use the student's own site or a provided sample)
- Brief template with all 5 sections (role, scope, constraints, acceptance criteria, examples)
- Give the brief to an AI tool (ChatGPT, Claude, etc.) and save the output
- Evaluation rubric:
  - Did the AI follow the brief?
  - What did it miss?
  - What would you change in the brief to get a better result?
  - Did you spot any hallucinations?

**Estimated length:** 100–150 lines

### Checkpoint page

**Route:** `/modules/agentic-workflow/checkpoint/`

- Peer comparison: trade briefs with a classmate, both give them to an AI tool, compare outputs
- Discussion questions:
  - Was the brief specific enough that both outputs were similar?
  - Where did the outputs diverge? What does that tell you about the brief?
  - Which output would you actually use? Why?
- Studio review: apply the Build step's review criteria to the AI's output

**Estimated length:** 100–150 lines

## File creation list

| File | Type |
| --- | --- |
| `lib/module-content/agentic-workflow.ts` | data |
| `app/modules/agentic-workflow/page.tsx` | route |
| `app/modules/agentic-workflow/chatbot-vs-agent/page.tsx` | route |
| `app/modules/agentic-workflow/writing-briefs/page.tsx` | route |
| `app/modules/agentic-workflow/honest-limits/page.tsx` | route |
| `app/modules/agentic-workflow/practice/page.tsx` | route |
| `app/modules/agentic-workflow/checkpoint/page.tsx` | route |

## Acceptance criteria

- [ ] All pages render with correct visual hierarchy
- [ ] Comparison cards display side-by-side on `lg:` screens
- [ ] Brief template is clearly structured and usable
- [ ] Brief quality rubric renders as a checklist
- [ ] Limitation categories display as categorized card grids
- [ ] Portraits of Karpathy, Altman, Amodei, Yudkowsky render correctly
- [ ] All content reads in workshop-companion voice
- [ ] Every paragraph passes the tone test: "Would a student in week 6 read past this sentence without hesitating?"
- [ ] `npx tsc --noEmit` passes
- [ ] Smoke-render tests for all new pages
