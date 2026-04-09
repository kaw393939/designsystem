# Sprint 2: Companion Panel "Stuck?" Tab

## Goal

Add a third tab to the `GuidedStepCompanion` component that shows step-specific diagnostic questions with links to existing content. A student who is confused at any tour step can tap "Stuck?" and immediately see 3–5 targeted questions that lead to the exact page that will help them.

## Why this sprint is second

Sprint 1 adds depth below the fold. Sprint 2 adds a rescue hatch inside the panel the student is already using. Together they create two complementary paths to deeper content: opt-in discovery (Sprint 1) and need-based help (Sprint 2). The Stuck? tab should feel like asking a tutor "I don't understand this" — not like browsing a help index.

## Scope

### Component changes

1. **`components/guided-step-companion.tsx`** — Add `"stuck"` as a third tab alongside `"brief"` and `"path"`:
   - Tab label: "Stuck?"
   - Tab icon: help-circle (use Lucide `HelpCircle` or equivalent)
   - Tab content: renders a list of `DiagnosticQuestion` components filtered by current step
   - Brief tab remains the default open tab

2. **`components/diagnostic-question.tsx`** (new) — Renders a single diagnostic question:
   - `question: string` — the question text
   - `hint: string` — 1-sentence explanation of what the linked page will help with
   - `href: string` — link to the answer page
   - `linkLabel: string` — CTA text (e.g., "Explore archetypes →")
   - Uses `<Link>` (not `<a>`) for all internal routes

3. **`components/guided-step-shell.tsx`** — Pass the current step slug to the companion component so it can filter diagnostic questions by step.

### Diagnostic question data

Define diagnostic questions as a typed data structure in `lib/diagnostic-questions.ts`:

```ts
type DiagnosticQuestion = {
  stepSlug: string;       // which tour step this question belongs to
  question: string;       // the question text
  hint: string;           // what the linked page helps with
  href: string;           // internal route
  linkLabel: string;      // CTA text
};
```

#### Signal step questions

1. "What makes a first impression work?"
   - Hint: "Learn how attention and trust form in the first seconds"
   - Link: `/experiences/identity-portfolio/labs/psychology/`
   - Label: "Explore psychology lab →"

2. "I don't know what my signal should be"
   - Hint: "Walk through a diagnostic that helps you identify your core signal"
   - Link: `/experiences/identity-portfolio/diagnose/`
   - Label: "Try the diagnose tool →"

3. "What does a strong signal look like?"
   - Hint: "See real examples of effective signals"
   - Link: `/examples/`
   - Label: "Browse examples →"

#### Archetype step questions

1. "Not sure which archetype fits?"
   - Hint: "Answer a few questions to narrow down your archetype"
   - Link: `/experiences/identity-portfolio/diagnose/`
   - Label: "Try the diagnose tool →"

2. "Want to see all 12 archetypes in depth?"
   - Hint: "Compare psychology profiles, brand examples, and visual identities"
   - Link: `/browse/archetypes/`
   - Label: "Open archetype explorer →"

3. "How do archetypes connect to psychology?"
   - Hint: "Understand the Jungian roots and why archetypes resonate with audiences"
   - Link: `/experiences/identity-portfolio/labs/archetypes/`
   - Label: "Explore archetypes lab →"

#### Style step questions

1. "Which persuasion principles apply to my design?"
   - Hint: "Learn the 6 persuasion moves and how they translate to visual decisions"
   - Link: `/experiences/identity-portfolio/labs/persuasion/`
   - Label: "Explore persuasion lab →"

2. "How do I choose colors and typography?"
   - Hint: "Study how design lineages connect style choices to meaning"
   - Link: `/browse/design-lineages/`
   - Label: "Browse design lineages →"

3. "What style matches my archetype?"
   - Hint: "See visual identity guidance for each archetype"
   - Link: `/browse/archetypes/`
   - Label: "Check archetype visual guides →"

#### Proof step questions

1. "What kind of evidence should I show?"
   - Hint: "Understand the hierarchy from anecdotal to experimental evidence"
   - Link: `/browse/attention-trust/`
   - Label: "See evidence framework →"

2. "How do I collect testimonials or case studies?"
   - Hint: "Learn practical strategies for gathering proof"
   - Link: `/modules/identity-proof/`
   - Label: "Go to Identity & Proof module →"

3. "Why does social proof work?"
   - Hint: "The psychology behind 'others like me chose this'"
   - Link: `/experiences/identity-portfolio/labs/persuasion/`
   - Label: "Explore persuasion lab →"

#### Build step questions

1. "How do I write a brief an AI can follow?"
   - Hint: "Learn the structure of an effective AI brief"
   - Link: `/modules/agentic-workflow/`
   - Label: "Go to Agentic Workflow module →"

2. "What is agentic workflow?"
   - Hint: "Understand the difference between chatbots and agentic AI tools"
   - Link: `/modules/agentic-workflow/chatbot-vs-agent/`
   - Label: "Read: Chatbot vs Agent →"

3. "My design isn't coming together"
   - Hint: "Step back and diagnose what's not working"
   - Link: `/experiences/identity-portfolio/diagnose/`
   - Label: "Try the diagnose tool →"

#### Publish step questions

1. "What should I check before going live?"
   - Hint: "Walk through the pre-launch verification checklist"
   - Link: `/modules/studio-publish/`
   - Label: "Go to Studio & Publish module →"

2. "How do I know if my site is working?"
   - Hint: "Learn what to measure and how to iterate after launch"
   - Link: `/modules/studio-publish/`
   - Label: "Go to Studio & Publish module →"

3. "I want to start over with a different approach"
   - Hint: "Go back to your signal and rethink from the beginning"
   - Link: `/tour/signal/`
   - Label: "Return to Signal step →"

## Implementation sequence

1. Create `lib/diagnostic-questions.ts` with typed data for all 6 steps
2. Build `DiagnosticQuestion` component with tests
3. Update `GuidedStepShell` to pass step slug to companion
4. Update `GuidedStepCompanion` to accept step slug and render 3-tab layout
5. Build Stuck? tab content that filters questions by step
6. Run full test suite + link checker

## Acceptance criteria

- [ ] Companion panel shows 3 tabs: Brief (default), Path, Stuck?
- [ ] Stuck? tab renders 3–5 diagnostic questions specific to the current tour step
- [ ] Each question links to an existing page using `<Link>` component
- [ ] All linked pages exist and pass the link checker
- [ ] Brief tab remains the default/first tab on page load
- [ ] Tab switching works on mobile and desktop
- [ ] Panel remains dismissible on mobile
- [ ] Step slug is passed correctly from shell to companion
- [ ] All 239+ existing tests pass
- [ ] New components have smoke-render tests
- [ ] Stuck? tab for each step has at least one test verifying correct questions appear
- [ ] `npx tsc --noEmit` passes

## Scope boundaries

- This sprint does NOT expand browse room content (that's Sprint 3)
- This sprint does NOT modify tour step page content (that was Sprint 1)
- This sprint does NOT add module return CTAs (that's Sprint 4)
- Diagnostic questions link to existing pages — if a linked page does not exist yet, the question is deferred to a later sprint
- The Stuck? tab does NOT include an interactive diagnostic wizard — just questions with links
