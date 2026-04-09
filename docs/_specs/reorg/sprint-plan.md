# Sprint Plan — Content Reorganization

## Sprint overview

| Sprint | Title | Goal | Effort | Duration |
| --- | --- | --- | --- | --- |
| 1 | Tour step progressive disclosure | Add collapsible psychology/skill content to all 6 tour step pages | Medium | 1 week |
| 2 | Companion panel "Stuck?" tab | Add third tab to GuidedStepCompanion with per-step diagnostic questions and links | Medium | 1 week |
| 3 | Browse room expansion | Expand archetype explorer and attention-trust/persuasion pages to render full datasets | Medium-High | 1.5 weeks |
| 4 | Module return loops and cross-links | Add return-to-tour CTAs on module pages, "Deepens" labels on module index | Low-Medium | 1 week |

**Total estimated duration: ~4.5 weeks**

## Sprint dependencies

| Sprint | Hard dependencies | Soft dependencies |
| --- | --- | --- |
| 1 | None | — |
| 2 | None | Sprint 1 (progressive disclosure establishes the "go deeper" pattern that Stuck? tab complements) |
| 3 | None | Sprint 1 (browse expansion pages are linked from progressive disclosure sections) |
| 4 | None | Sprints 1–2 (return CTAs are most useful once tour steps have richer content) |

**Critical path:** Sprints 1–4 are technically independent — no sprint blocks another. However, the recommended execution order is 1 → 2 → 3 → 4 because each sprint builds on the editorial patterns established by the previous one.

## Sprint 1: Tour Step Progressive Disclosure

### Goal

Add collapsible `<details>` sections to all 6 tour step pages that surface psychology principles, persuasion frameworks, and deeper module content — without changing the primary teaching flow of any page.

### Deliverables

1. Create a reusable `PsychologyPrincipleCard` component for rendering a principle with title, 1-sentence explanation, and "Use this when..." application guidance
2. Create a reusable `ProgressiveDisclosure` wrapper component (wraps `<details>`/`<summary>` with consistent styling)
3. Add progressive disclosure section to `app/tour/signal/page.tsx` — "Why signals work"
4. Add progressive disclosure section to `app/tour/archetype/page.tsx` — "The psychology behind archetypes"
5. Add progressive disclosure section to `app/tour/style/page.tsx` — "Design principles that persuade"
6. Add progressive disclosure section to `app/tour/proof/page.tsx` — "What counts as evidence"
7. Add progressive disclosure section to `app/tour/build/page.tsx` — "Writing briefs for AI tools"
8. Add progressive disclosure section to `app/tour/publish/page.tsx` — "The deployment checklist"
9. Each section includes 1–3 `PsychologyPrincipleCard` instances and a "Go deeper" link to the relevant module
10. Tests: smoke-render tests for new components, updated snapshot tests for tour pages

### Acceptance criteria

- All 6 tour step pages render a collapsible section that is CLOSED by default
- Opening a section shows psychology/skill content sourced from existing data files
- Each section contains at least one "Go deeper" link to a module or browse page
- The brief field remains the dominant CTA (above the fold; progressive disclosure is below)
- All existing tests pass
- `npx tsc --noEmit` passes
- Lighthouse performance scores do not regress on tour step URLs

---

## Sprint 2: Companion Panel "Stuck?" Tab

### Goal

Add a third tab to the `GuidedStepCompanion` component that shows step-specific diagnostic questions with links to existing content that answers them.

### Deliverables

1. Add `"stuck"` tab option to `GuidedStepCompanion` tab system
2. Create a `DiagnosticQuestion` component — renders a question with a brief explanation and a link to the answer page
3. Define diagnostic question data: 3–5 questions per tour step (see migration-map.md for the full list)
4. Wire step context from `GuidedStepShell` into companion so it knows which step's questions to show
5. Add a tab icon/label: "Stuck?" with a help-circle icon
6. Tests: render tests for Stuck tab, test that correct questions appear per step

### Acceptance criteria

- The companion panel shows 3 tabs: Brief, Path, Stuck?
- Brief remains the default tab
- Switching to Stuck? shows 3–5 diagnostic questions specific to the current tour step
- Each question links to an existing page (identity-portfolio lab, browse room, or module lesson)
- All linked pages exist and pass the link checker
- Panel remains dismissible on mobile
- All existing tests pass

---

## Sprint 3: Browse Room Expansion

### Goal

Expand the archetype explorer and persuasion/attention-trust browse rooms to render their full datasets instead of summary cards.

### Deliverables

1. Expand `/browse/archetypes/` page:
   - Each archetype card shows: name, tagline, psychology profile summary, 2–3 brand examples, visual identity guidance
   - Add accordion or tabbed sections within each card to manage content density
   - Add "decision filter" prompt at page top: "Which archetype matches your signal?"
   - Add link back to Archetype tour step
2. Expand `/browse/attention-trust/` page (or create `/browse/persuasion/` if needed):
   - Surface full Cialdini 6-move framework from `persuasion-content.ts`
   - Each move: definition, design application, real-site example, tour step link
   - Add attention-trust pipeline as a visual diagram or ordered list
   - Add link back to Style tour step
3. Tests: render tests for expanded content, visual regression baseline

### Acceptance criteria

- `/browse/archetypes/` displays full psychology profiles for all 12 archetypes
- Each archetype card includes brand examples and visual identity guidance
- Page remains scannable — accordion/tabs prevent overwhelming scroll
- `/browse/attention-trust/` (or `/browse/persuasion/`) displays all 6 Cialdini moves with design applications
- Both pages link back to relevant tour steps
- All existing tests pass
- Lighthouse performance scores acceptable (may need lazy loading for expanded content)

---

## Sprint 4: Module Return Loops and Cross-Links

### Goal

Close the learning loop by adding return-to-tour CTAs on module pages and "Deepens: [Tour Step]" labels on the module index.

### Deliverables

1. Create a `ReturnToTourCTA` component:
   - Accepts a tour step slug and renders a styled link: "Apply this → Return to [Step Name]"
   - Conditionally renders based on localStorage tour progress (only shows if student has visited that tour step)
2. Add `ReturnToTourCTA` to module practice pages (`app/modules/*/practice/page.tsx`)
3. Add `ReturnToTourCTA` to module checkpoint pages (if they exist)
4. Extend `ModuleIndexCard` to show "Deepens: [Tour Step Name]" label with a link to the tour step
5. Update `lib/module-content/index.ts` types (or add a mapping) to associate each module with its related tour step(s)
6. Tests: render tests for ReturnToTourCTA, conditional rendering based on mock localStorage

### Acceptance criteria

- Module practice pages show a "Return to tour" CTA linking to the relevant tour step
- The CTA only appears when localStorage contains tour progress
- The module index page shows "Deepens: [Step]" per module
- "Deepens" labels are clickable links to tour steps
- All existing tests pass
- Zero broken links (verified by link checker)
