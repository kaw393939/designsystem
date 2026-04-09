# Sprint 1: Tour Step Progressive Disclosure

## Goal

Add collapsible `<details>` sections to all 6 tour step pages that surface psychology principles, persuasion frameworks, and deeper module content. The sections are closed by default, preserving the current teaching flow while giving curious or returning students a path to deeper understanding.

## Why this sprint is first

Progressive disclosure sections are the foundation of the entire reorganization. They establish the editorial pattern ("here's a concept — want to go deeper?"), introduce the reusable components that other sprints build on, and create the first visible cross-links between the tour and other content layers. Every subsequent sprint either links to these sections or complements them.

## Scope

### New components

1. **`components/progressive-disclosure.tsx`** — Wraps native `<details>`/`<summary>` with consistent design tokens (border, padding, chevron icon, open/closed states). Props:
   - `title: string` — the summary label
   - `children: ReactNode` — the expanded content
   - `defaultOpen?: boolean` — defaults to `false`

2. **`components/psychology-principle-card.tsx`** — Renders a single psychology principle. Props:
   - `title: string` — principle name (e.g., "Social Proof")
   - `description: string` — 1–2 sentence explanation
   - `application: string` — "Use this when..." guidance
   - `tone?: PanelTone` — optional color accent

### Tour step page changes

Each of the 6 tour step pages gains one `<ProgressiveDisclosure>` section placed BELOW the existing teaching content and ABOVE the companion panel trigger. The section contains:

- 1–3 `PsychologyPrincipleCard` instances
- A "Go deeper" link to the relevant module or browse room

#### Signal step (`app/tour/signal/page.tsx`)

**Section title:** "Why signals work"

**Content:**
- Principle card: First impressions (from attention-trust framework)
- Principle card: Cognitive load (audience makes snap judgments)
- "Go deeper" link → Module 1 (Web Presence Framework)

**Data source:** `lib/persuasion-content.ts` — attention-trust section

#### Archetype step (`app/tour/archetype/page.tsx`)

**Section title:** "The psychology behind archetypes"

**Content:**
- Principle card: Jungian archetypes (universal patterns that audiences recognize)
- Principle card: Brand congruence (alignment between archetype and actual behavior)
- "Go deeper" link → `/browse/archetypes/` (full explorer)
- "Go deeper" link → Module 5 (Identity & Proof)

**Data source:** `lib/archetype-atlas-content.ts` — psychology/theory sections

#### Style step (`app/tour/style/page.tsx`)

**Section title:** "Design principles that persuade"

**Content:**
- Principle card: Reciprocity ("Give value before asking for action")
- Principle card: Commitment & Consistency ("Small yeses lead to big yeses")
- Principle card: Liking ("Design that reflects the audience's self-image")
- "Go deeper" link → `/browse/attention-trust/` (full persuasion framework)
- "Go deeper" link → Module 4 (Visual AI)

**Data source:** `lib/persuasion-content.ts` — Cialdini moves

#### Proof step (`app/tour/proof/page.tsx`)

**Section title:** "What counts as evidence"

**Content:**
- Principle card: Social Proof ("Others like me chose this")
- Principle card: Authority ("Endorsed by a credible source")
- Principle card: Evidence Tiers (anecdotal → statistical → experimental)
- "Go deeper" link → Module 5 (Identity & Proof)

**Data source:** `lib/persuasion-content.ts` — social proof and authority sections; evidence tier framework from existing components

#### Build step (`app/tour/build/page.tsx`)

**Section title:** "Writing briefs for AI tools"

**Content:**
- Principle card: Brief anatomy (context, constraints, deliverables, quality bar)
- Principle card: Specificity gradient ("The more specific your brief, the better the AI output")
- "Go deeper" link → Module 3 (Agentic Workflow)

**Data source:** `lib/agentic-orchestration.ts` — brief structure; Module 3 content

#### Publish step (`app/tour/publish/page.tsx`)

**Section title:** "The deployment checklist"

**Content:**
- Principle card: Pre-launch verification (accessibility, performance, content review)
- Principle card: Post-launch iteration ("Ship, measure, improve")
- "Go deeper" link → Module 6 (Studio & Publish)

**Data source:** Module 6 content (may need light original writing if module content is not yet fully developed)

## Implementation sequence

1. Build `ProgressiveDisclosure` component with tests
2. Build `PsychologyPrincipleCard` component with tests
3. Read data from source files and define display-ready content constants (one per tour step)
4. Add progressive disclosure section to Signal step page
5. Add progressive disclosure section to Archetype step page
6. Add progressive disclosure section to Style step page
7. Add progressive disclosure section to Proof step page
8. Add progressive disclosure section to Build step page
9. Add progressive disclosure section to Publish step page
10. Run full test suite + link checker + Lighthouse

## Acceptance criteria

- [ ] All 6 tour step pages render a collapsible section that is CLOSED by default
- [ ] Opening a section shows 1–3 psychology principle cards sourced from existing data files
- [ ] Each section contains at least one "Go deeper" link to a module or browse page
- [ ] The brief field / primary CTA remains above the progressive disclosure section
- [ ] `<details>` sections use native HTML semantics (no JS-driven accordion)
- [ ] New components have TypeScript types, no `any` casts
- [ ] All 239+ existing tests pass
- [ ] New components each have at least one smoke-render test
- [ ] `npx tsc --noEmit` passes
- [ ] Lighthouse performance scores do not regress on any of the 6 tour step URLs
- [ ] Link checker reports zero broken links

## Scope boundaries

- This sprint does NOT modify the companion panel (that's Sprint 2)
- This sprint does NOT modify browse room content (that's Sprint 3)
- This sprint does NOT add module return CTAs (that's Sprint 4)
- This sprint does NOT write new prose — all content comes from existing data files
- This sprint does NOT change any URL or route structure
