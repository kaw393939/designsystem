# Content Reorganization Spec — Integrated Progressive Path

## Status

- Status: Active planning source of truth
- Scope: restructure the relationship between tour steps, modules, identity-portfolio experience, browse rooms, and the companion panel to create a single coherent progressive learning path
- Primary research basis: student UX walkthrough (QA remediation plan), content/navigation audit, proposal "Integrated Progressive Path"
- Primary implementation anchors: `app/tour/*/page.tsx`, `components/guided-step-companion.tsx`, `components/guided-step-shell.tsx`, `lib/site-navigation.ts`, `lib/module-content/index.ts`, `app/experiences/identity-portfolio/`, `app/browse/`

## Project purpose

Connect the three existing content layers — the 6-step guided tour, the 6 course modules, and the identity-portfolio experience — into a single progressive path where each tour step teaches a concept, links to deeper module content, surfaces relevant psychology principles, and feeds an evolving design brief. Today these layers exist in parallel with near-zero cross-linking. Students complete the tour without knowing modules exist, skip the identity-portfolio labs entirely, and never encounter the psychology and persuasion content that would make their decisions stronger.

## Problem statement

1. **Three parallel content layers with no connective tissue.** The tour (6 steps), modules (6 multi-week units), and identity-portfolio experience (5 steps + 3 labs) all teach overlapping concepts but share zero navigation links. A student can finish the tour without ever seeing a module page.

2. **Psychology and persuasion content is buried.** The site contains a rich psychology principles library (`lib/persuasion-content.ts` — 6 Cialdini moves, attention-trust framework) and an archetype psychology layer (`lib/archetype-atlas-content.ts`). None of this surfaces during the tour where students are actually making decisions that depend on it.

3. **No "I'm stuck" escape hatch.** The companion panel offers Brief and Path tabs. There is no diagnostic pathway for a student who is confused about what archetype fits, what tone to use, or why their design feels wrong. The identity-portfolio diagnose page exists but is unreachable from the tour.

4. **Agentic workflow arrives too late.** Module 3 (Agentic Workflow, weeks 6-7) teaches brief-writing-for-AI, but the Build tour step already asks students to "write a brief clear enough for a classmate or AI tool to follow." The skill should be available when the task appears.

5. **Module content is one-way.** Students enter modules from the module index but never return to the tour step that motivated the learning. There is no "apply what you just learned" loop.

6. **Browse rooms are under-stocked.** The archetype explorer shows 12 cards with name/tagline but hides the full psychology profiles, brand examples, and visual identity systems that exist in `archetype-atlas-content.ts`. The persuasion framework page is a stub.

## Design thesis

**Each tour step becomes a "Learn → Apply → Prove" micro-cycle.** The tour teaches the concept. The companion panel surfaces the psychology principles that inform the decision. Module content provides deeper skill-building. Browse rooms provide reference material. The design brief accumulates the student's decisions across all six steps.

The reorganization does not move pages or change URLs. It adds connective tissue: cross-links, progressive disclosure sections, companion panel upgrades, and content surfacing in existing containers.

## Architecture: Three integration patterns

### Pattern A — Tour step progressive disclosure

Each tour step page gains collapsible `<details>` sections that surface content currently hidden in modules and identity-portfolio labs:

| Tour step | New progressive disclosure content | Source |
| --- | --- | --- |
| Signal | "Why signals work" — psychology of first impressions, attention-trust framework | `persuasion-content.ts`, identity-portfolio psychology lab |
| Archetype | "The psychology behind archetypes" — Jungian roots, brand congruence test | `archetype-atlas-content.ts`, identity-portfolio archetypes lab |
| Style | "Design principles that persuade" — Cialdini's 6 moves applied to visual design | `persuasion-content.ts`, identity-portfolio persuasion lab |
| Proof | "What counts as evidence" — evidence tier framework, social proof psychology | `evidence-tier-badge.tsx` content, persuasion reciprocity/authority |
| Build | "Writing briefs for AI tools" — agentic workflow basics, brief structure | Module 3 content (adapted), `lib/agentic-orchestration.ts` |
| Publish | "The deployment checklist" — what to verify, how to iterate post-launch | Module 6 content (adapted) |

### Pattern B — Companion panel "Stuck?" tab

The `GuidedStepCompanion` component gains a third tab alongside Brief and Path:

- **Stuck?** — Shows diagnostic questions relevant to the current tour step
- Each question links to the specific identity-portfolio lab, browse room, or module lesson that answers it
- Example at the Archetype step: "Not sure which archetype fits?" → links to identity-portfolio diagnose page → links to full archetype explorer in browse

### Pattern C — Module return loops

At each module checkpoint and practice page, a "Return to tour" CTA links back to the relevant tour step with the student's brief pre-populated from module work. The module index page gains a "Where this fits" column showing which tour step each module deepens.

## Content inventory

### What exists today

| Layer | Pages | Student visibility | Cross-links to other layers |
| --- | --- | --- | --- |
| Tour (6 steps) | 6 guided step pages + companion panel | High — primary navigation | Zero outbound links to modules or identity-portfolio |
| Modules (6 units) | 6 overviews + ~20 lessons + practice + checkpoints | Medium — "Modules" in nav | Zero return links to tour steps |
| Identity-portfolio | 5 steps + 3 labs + diagnose + system-map + sources + examples | Near-zero — buried under Experiences | Zero links from tour or modules |
| Browse rooms | Archetypes, design-lineages, attention-trust | Medium — "Browse" in nav | Minimal — some archetype links from tour |
| Psychology content | `persuasion-content.ts`, archetype psychology data | Zero — data files only, no pages surface them during tour | N/A |

### What this spec adds

| Addition | Where it surfaces | Source content |
| --- | --- | --- |
| Progressive disclosure sections on tour steps | 6 tour step pages | Module lessons, identity-portfolio labs, persuasion-content.ts |
| "Stuck?" tab in companion panel | All tour step pages | Identity-portfolio diagnose content, browse room links |
| Psychology principle cards | Tour step pages (inside `<details>`) | `persuasion-content.ts`, `archetype-atlas-content.ts` |
| Module return CTAs | Module checkpoint/practice pages | New component, links back to tour steps |
| "Where this fits" on module index | `/modules/` page | Map of module → tour step |
| Full archetype explorer | `/browse/archetypes/` | `archetype-atlas-content.ts` (already has full data) |
| Full persuasion framework | `/browse/attention-trust/` or new `/browse/persuasion/` | `persuasion-content.ts` (already has full data) |

## Scope boundaries

- **No URL changes.** All existing routes remain stable. No redirects needed.
- **No content rewriting.** Existing prose stays as-is. New content is limited to transition sentences, diagnostic questions, and cross-link labels.
- **No new route families.** All additions land in existing route families (tour, modules, browse).
- **No changes to the brief data model.** The `useSiteJourney()` hook and localStorage structure remain unchanged.
- **No changes to the module data model.** `ModuleDefinition` and `ModuleLesson` types stay as-is.

## Implementation anchors

| File | Changes |
| --- | --- |
| `app/tour/signal/page.tsx` | Add progressive disclosure section with psychology content |
| `app/tour/archetype/page.tsx` | Add progressive disclosure section with archetype psychology |
| `app/tour/style/page.tsx` | Add progressive disclosure section with persuasion principles |
| `app/tour/proof/page.tsx` | Add progressive disclosure section with evidence framework |
| `app/tour/build/page.tsx` | Add progressive disclosure section with agentic brief-writing |
| `app/tour/publish/page.tsx` | Add progressive disclosure section with deployment checklist |
| `components/guided-step-companion.tsx` | Add "Stuck?" tab with diagnostic content per step |
| `components/guided-step-shell.tsx` | Pass step context to companion for Stuck tab rendering |
| `app/modules/page.tsx` | Add "Tour step" column to module cards |
| `app/modules/*/practice/page.tsx` | Add return-to-tour CTA |
| `app/modules/*/checkpoint/page.tsx` | Add return-to-tour CTA (if checkpoint pages exist) |
| `app/browse/archetypes/page.tsx` | Expand archetype cards with full psychology profiles |
| `app/browse/attention-trust/page.tsx` | Expand with full Cialdini 6-move framework |

## Success criteria

1. A student completing the tour encounters at least one psychology principle, one module cross-link, and one "stuck?" diagnostic option per step.
2. A student completing a module checkpoint sees a clear return path to the relevant tour step.
3. The browse archetype room displays full psychology profiles, brand examples, and visual identity guidance — not just name/tagline cards.
4. All 239+ existing tests continue to pass.
5. Zero broken links (verified by `scripts/check-internal-links.mjs`).
6. Lighthouse scores remain above current baselines on all 12 audited URLs.
7. No new route families or URL changes are introduced.

## Risk register

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Progressive disclosure sections increase page weight beyond Lighthouse budgets | Medium | Medium | Use `<details>` with lazy content; measure per-sprint |
| "Stuck?" tab content feels generic across steps | Medium | High | Write step-specific diagnostic questions; link to specific pages, not categories |
| Module return CTAs are confusing if student arrived from module index, not tour | Low | Low | Show CTA only if localStorage indicates tour progress |
| Archetype explorer expansion creates very long scroll | Medium | Low | Use tabbed or accordion layout within the browse room |
| Psychology content references feel academic rather than actionable | Medium | High | Frame every principle as a design decision: "Use this when..." not "Research shows..." |
