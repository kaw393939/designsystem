# Sprint 4: Module Return Loops and Cross-Links

## Goal

Close the learning loop by adding return-to-tour CTAs on module practice and checkpoint pages, and "Deepens: [Tour Step]" labels on the module index. After completing a module, students should see a clear invitation to return to the tour step where they can apply what they learned.

## Why this sprint is last

Sprints 1–3 build the forward paths: tour → deeper content. Sprint 4 builds the return paths: modules → tour. This order ensures the tour steps are enriched before we send students back to them. A return CTA pointing to a bare tour step is less compelling than one pointing to a tour step with progressive disclosure and a Stuck? rescue hatch.

## Scope

### New component

**`components/return-to-tour-cta.tsx`** — A styled call-to-action that invites students to return to the tour step related to the module they just completed.

Props:
- `tourStepSlug: string` — e.g., `"build"`
- `tourStepTitle: string` — e.g., `"Build"`
- `moduleTitle: string` — e.g., `"Agentic Workflow"`

Behavior:
- Renders a visually distinct card: "Apply what you learned → Return to the [Tour Step] step"
- Subtext: "You just completed [Module Title]. The [Tour Step] step is where you put this into practice."
- Uses `<Link>` for the internal route to `/tour/[tourStepSlug]/`
- **Conditional rendering:** Only renders if `typeof window !== 'undefined'` and localStorage contains tour journey data (check for the `siteJourney` key). If the student has no tour progress, the CTA does not appear — they likely arrived at the module independently, not from the tour.
- Falls back gracefully during SSR (renders nothing)

### Module → Tour step mapping

Add a `relatedTourSteps` field to module definitions or create a standalone mapping:

| Module | Related tour step(s) | Return CTA text |
| --- | --- | --- |
| Module 1 — Web Presence Framework | Signal, Archetype | "Return to the Signal step" (primary) |
| Module 2 — AI Foundations | Build | "Return to the Build step" |
| Module 3 — Agentic Workflow | Build | "Return to the Build step" |
| Module 4 — Visual AI | Style | "Return to the Style step" |
| Module 5 — Identity & Proof | Proof | "Return to the Proof step" |
| Module 6 — Studio & Publish | Publish | "Return to the Publish step" |

Implementation option: Add `relatedTourSteps: string[]` to `ModuleDefinition` in `lib/module-content/types.ts`, or create a separate mapping in `lib/module-tour-mapping.ts` if modifying the type is too invasive.

### Module practice page changes

Add `ReturnToTourCTA` to each module's practice page:

- `app/modules/web-presence-framework/practice/page.tsx`
- `app/modules/ai-foundations/practice/page.tsx`
- `app/modules/agentic-workflow/practice/page.tsx`
- `app/modules/visual-ai/practice/page.tsx`
- `app/modules/identity-proof/practice/page.tsx`
- `app/modules/studio-publish/practice/page.tsx`

Placement: Below the exercise instructions, above the page footer. The CTA should feel like a natural "what's next" suggestion, not a mandatory step.

### Module checkpoint page changes

Same pattern as practice pages. Add `ReturnToTourCTA` to each module's checkpoint page if it exists.

### Module index page changes

Update `app/modules/page.tsx` (and potentially `components/module-index-card.tsx`):

- Each module card gains a small label: "Deepens: [Tour Step Name]"
- The label is a `<Link>` to `/tour/[tourStepSlug]/`
- Placement: Below the module summary, above the lesson count
- Styling: Small text, muted color, with a subtle arrow or link icon

## Implementation sequence

1. Decide: modify `ModuleDefinition` type OR create standalone mapping file
2. Build `ReturnToTourCTA` component with tests (including conditional localStorage rendering)
3. Add `ReturnToTourCTA` to all module practice pages
4. Add `ReturnToTourCTA` to module checkpoint pages (if they exist)
5. Update `ModuleIndexCard` to render "Deepens" label
6. Update module index page if needed
7. Run full test suite + link checker

## Acceptance criteria

- [ ] `ReturnToTourCTA` component renders a styled card with tour step link
- [ ] CTA only renders when localStorage contains tour journey data
- [ ] CTA renders nothing during SSR (no hydration mismatch)
- [ ] All 6 module practice pages show the return CTA (when localStorage is present)
- [ ] Module checkpoint pages show the return CTA (if checkpoint pages exist)
- [ ] Module index page shows "Deepens: [Step]" per module card
- [ ] "Deepens" label is a clickable `<Link>` to the tour step
- [ ] All links use `<Link>` component (not bare `<a>`)
- [ ] All existing tests pass
- [ ] New component has smoke-render tests
- [ ] At least one test verifies conditional rendering based on mock localStorage
- [ ] `npx tsc --noEmit` passes
- [ ] Link checker reports zero broken links

## Scope boundaries

- This sprint does NOT modify tour step page content (that was Sprint 1)
- This sprint does NOT modify the companion panel (that was Sprint 2)
- This sprint does NOT modify browse room content (that was Sprint 3)
- This sprint does NOT add new brief fields or change the brief data model
- If a module does not have a practice or checkpoint page, skip the CTA for that module — do not create the page
- The `relatedTourSteps` data is added as a lightweight mapping, not as a deep content dependency
