# Sprint 3: Browse Room Expansion

## Goal

Expand the archetype explorer and attention-trust/persuasion browse rooms to render their full datasets. Currently these pages show summary cards when the underlying data files contain rich psychology profiles, brand examples, visual identity guidance, and persuasion frameworks. This sprint makes that hidden content visible.

## Why this sprint is third

Sprints 1 and 2 create cross-links pointing INTO browse rooms ("Go deeper" links and "Stuck?" diagnostic links). Sprint 3 ensures those destination pages deliver on the promise. A student who clicks "Open archetype explorer →" from the Stuck? tab should land on a page that actually helps them compare archetypes in depth — not a grid of name/tagline cards.

## Scope

### Archetype explorer expansion (`/browse/archetypes/`)

**Current state:** The page renders 12 archetype cards showing name, tagline, and a 1-sentence summary. The full data in `lib/archetype-atlas-content.ts` includes psychology profiles, brand examples, visual identity guidance (color palettes, typography directions, imagery styles), shadow traits, and ally dynamics.

**Target state:**

1. **Page header** — Add a decision filter prompt: "Which archetype matches your signal? Review the profiles below, then return to the Archetype step to lock in your choice." Link to `/tour/archetype/`.

2. **Expanded archetype cards** — Each card becomes an expandable section (accordion or tabbed layout within the card) showing:
   - **Summary tab/section** (default visible): Name, tagline, 1-sentence summary (unchanged from current)
   - **Psychology tab/section**: Motivation, shadow trait, ally archetype, audience relationship pattern
   - **Brand examples tab/section**: 2–3 real-world brand examples with brief explanations of why they fit
   - **Visual identity tab/section**: Color palette direction, typography style, imagery guidance, tone keywords

3. **Data source:** All content comes from `lib/archetype-atlas-content.ts`. No new data creation needed — the file already contains this information.

4. **Layout:** Use accordion sections within each card rather than tabs (better for mobile, allows scanning multiple archetypes). The summary section is open by default; psychology, brands, and visual identity are closed.

5. **Return link:** Footer section with "Ready to choose? → Return to Archetype step" linking to `/tour/archetype/`.

### Attention-trust / Persuasion page expansion

**Current state:** The `/browse/attention-trust/` page shows a partial overview of the attention-trust framework.

**Target state:**

1. **Attention-trust pipeline** — Render the full pipeline as an ordered visual progression:
   - Attention → Interest → Trust → Action → Advocacy
   - Each stage: definition, what the visitor is thinking, design tactics

2. **Cialdini 6-move framework** — Full section for each of the 6 moves from `lib/persuasion-content.ts`:
   - **Reciprocity**: Definition, design application ("Give something valuable before asking for action"), example
   - **Commitment & Consistency**: Definition, design application ("Start with small agreements"), example
   - **Social Proof**: Definition, design application ("Show that others like the visitor have acted"), example
   - **Authority**: Definition, design application ("Display credentials, endorsements, certifications"), example
   - **Liking**: Definition, design application ("Mirror the audience's identity and values"), example
   - **Scarcity**: Definition, design application ("Show limited availability or time-sensitivity"), example

3. **Tour step connections** — Each move includes a "Where this matters" link to the tour step where the principle is most relevant:
   - Reciprocity → Build step (what you give in the brief)
   - Commitment & Consistency → Signal step (first micro-commitment)
   - Social Proof → Proof step
   - Authority → Proof step
   - Liking → Style step, Archetype step
   - Scarcity → Publish step (urgency in CTA)

4. **Data source:** `lib/persuasion-content.ts`. If the file doesn't have all 6 moves fully defined, add the missing content during this sprint.

5. **Return link:** "Apply these principles → Return to Style step" linking to `/tour/style/`.

## New components

1. **`components/archetype-detail-card.tsx`** — Expanded archetype card with accordion sections. Props:
   - `archetype: ArchetypeDefinition` (from atlas content types)
   - Renders summary (default open) + collapsible psychology, brands, visual identity sections

2. **`components/persuasion-move-card.tsx`** — Card for a single Cialdini move. Props:
   - `title: string`
   - `definition: string`
   - `application: string` — "Use this when..." framing
   - `example: string` — real-world example
   - `tourStepHref: string` — link to relevant tour step
   - `tourStepLabel: string`

## Implementation sequence

1. Audit `lib/archetype-atlas-content.ts` — confirm all 12 archetypes have psychology, brands, and visual identity data populated
2. Audit `lib/persuasion-content.ts` — confirm all 6 Cialdini moves are fully defined
3. Fill in any missing content in data files
4. Build `ArchetypeDetailCard` component with tests
5. Rewrite `/browse/archetypes/` page to use expanded cards with accordion layout
6. Build `PersuasionMoveCard` component with tests
7. Expand `/browse/attention-trust/` page with full pipeline and 6-move framework
8. Add return links to both pages
9. Run full test suite + link checker + Lighthouse

## Acceptance criteria

- [ ] `/browse/archetypes/` displays all 12 archetypes with expandable psychology, brand, and visual identity sections
- [ ] Summary section is open by default; detail sections are closed
- [ ] Page is scannable on mobile — accordion layout does not create overwhelming scroll
- [ ] Decision filter prompt at top links to `/tour/archetype/`
- [ ] `/browse/attention-trust/` displays the full attention-trust pipeline
- [ ] All 6 Cialdini moves are rendered with definition, application, example, and tour step link
- [ ] Both pages include return links to relevant tour steps
- [ ] All links use `<Link>` component (not bare `<a>`)
- [ ] All existing tests pass
- [ ] New components have smoke-render tests
- [ ] Lighthouse performance acceptable (lazy load expanded content if needed)
- [ ] Link checker reports zero broken links

## Scope boundaries

- This sprint does NOT modify tour step pages (that was Sprint 1)
- This sprint does NOT modify the companion panel (that was Sprint 2)
- This sprint does NOT add module return CTAs (that's Sprint 4)
- If `lib/persuasion-content.ts` is missing data for some Cialdini moves, this sprint DOES add that data — this is the only data-file modification in the entire spec
- Archetype images/portraits are used only if they already exist in `public/` — no new image creation
