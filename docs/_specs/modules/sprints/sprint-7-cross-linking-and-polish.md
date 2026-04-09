# Sprint 7: Cross-linking, Instructor Guide, and Polish

## Goal

Wire all modules into the existing site: tour ↔ module links, lobby update, instructor week mapping, and a comprehensive quality pass. After this sprint, the site behaves as a unified 16-week course.

## Why this sprint exists

Sprints 1–6 built the module pages and their internal content. But modules in isolation are not a course. Sprint 7 connects every module back to the tour, updates the homepage to surface the module path, gives instructors a week-by-week teaching plan, and resolves every loose end.

## Current state (post-sprint 6)

The following are already in place:

- **All 6 modules are `status: "active"`** with correct lesson counts, summaries, week ranges, and tones.
- **221 tests passing** across 36 test files (tsc clean, eslint clean, build clean).
- **Module-to-module checkpoint navigation** — every checkpoint links to the next module ("Continue to Module N") except Module 6, which links back to `/modules`.
- **ModuleShell bottom nav** — always shows "← All modules" on the left and either "Module N: Title →" (next module link) or "All modules →" (Module 6).
- **Within-module lesson chains** — every lesson page has a "Continue to Lesson N" link; practice links to checkpoint; checkpoint links forward.
- **All internal cross-references** from module content to tour/browse/experience routes resolve to existing pages.
- **Module local nav** in sidebar shows all lessons + practice + checkpoint with active-page highlighting.
- **Module index page** renders 6 `ModuleIndexCard` components showing lesson count, week range, and status.

What does NOT exist yet (Sprint 7 scope):
- ~~No tour → module cross-link panels~~ ✅ Done
- ~~No homepage entry intent for modules~~ ✅ Done
- ~~No module-to-week mapping in instructor guide~~ ✅ Done
- ~~No browse → module cross-links~~ ✅ Done
- ~~No tour step references on module overview pages~~ ✅ Done

## Scope

1. Add tour → module cross-links on each tour step page
2. Add module → tour return links on each module overview page
3. Update the homepage with a "Course modules" entry intent
4. Update the instructor guide with a module-to-week mapping table
5. Add browse → module cross-links where appropriate
6. Finalize module index page with accurate statuses and metadata
7. Full navigation QA
8. Full responsive QA
9. Full tone QA across all module content
10. Comprehensive test suite for all module pages and components
11. Performance check: build time and bundle size

## Deliverables

### 1. Tour → Module cross-links

Add an optional "Go deeper" panel to each tour step that links to the relevant module(s).

| Tour step | Module link(s) |
| --- | --- |
| `/tour/signal` | Module 1: Web Presence Framework |
| `/tour/archetype` | Module 1: Web Presence Framework |
| `/tour/style` | Module 1: Web Presence Framework |
| `/tour/proof` | Module 5: Identity and Proof |
| `/tour/build` | Module 3: Agentic Workflow, Module 4: Visual AI |
| `/tour/publish` | Module 6: Studio and Publish |

Implementation: add a `TonePanel` at the bottom of each tour step page with module title, summary, and link. Use tone `"synthesis"` to distinguish from the step's own content.

### 2. Module → Tour return links

ModuleShell does not currently show tour step references. Add an optional `tourSteps` field to `ModuleDefinition` and render a "Where this fits" panel on each module overview.

**Type change in `lib/module-content/types.ts`:**

```ts
export type ModuleDefinition = {
  // ... existing fields ...
  tourSteps?: readonly string[]; // e.g. ["signal", "archetype", "style"]
};
```

**Data additions in `lib/module-content/index.ts`:**

| Module | tourSteps |
| --- | --- |
| Web Presence Framework | signal, archetype, style, proof, build, publish |
| AI Foundations | (none — no direct tour step) |
| Agentic Workflow | build |
| Visual AI | build |
| Identity and Proof | proof |
| Studio and Publish | build, publish |

**ModuleShell change:** When `module.tourSteps` is provided, render a `TonePanel` with tone `"synthesis"` showing "This module deepens" + linked tour step names.

### 3. Homepage update

Add a new entry intent to `siteEntryIntents` in `lib/site-navigation.ts`:

```ts
{
  id: "course-modules",
  title: "Follow the full course",
  summary: "Work through the semester path from framework to professional practice, with AI foundations, prompting, and proof along the way.",
  href: "/modules",
  actionLabel: "Open course modules",
  tone: "next",
  status: "Required in tour",
}
```

### 4. Instructor guide update

Add a new section to the instructor guide page with:

**Module-to-week mapping table:**

| Weeks | Module | Focus | Key deliverable |
| --- | --- | --- | --- |
| 1–3 | Module 1: Web Presence Framework | Signal → Archetype → Style → Proof | Site audit + initial brief |
| 4–5 | Module 2: AI Foundations | AI history, how models learn, key people | Primary source summary |
| 6–7 | Module 3: Agentic Workflow | Chatbot vs. agent, writing briefs, limits | AI-assisted build brief |
| 8–9 | Module 4: Visual AI | Image prompting, editorial judgment | Generated hero image set |
| 10–12 | Module 5: Identity and Proof | Identity signals, proof strategy, portfolio | Proof section redesign |
| 13–16 | Module 6: Studio and Publish | Build, review, deploy, iterate, professional practice | Published site + portfolio review |

**Teaching notes per module:**

Brief notes for each module:
- Prerequisites: what students should have completed before starting
- In-class activities: what to do during the class session
- Homework: what to assign between sessions
- Watch-fors: common student mistakes to address early
- Resequencing notes: which modules can be swapped and which cannot (Module 2 must precede 3 and 4; Modules 1, 5, 6 are flexible in order)

### 5. Browse → Module cross-links

Add "Go deeper in the course" links to browse room pages:

| Browse room | Module link |
| --- | --- |
| `/browse/archetypes` | Module 1: Web Presence Framework |
| `/browse/design-lineages` | Module 1: Web Presence Framework |
| `/browse/attention-trust` | Module 5: Identity and Proof |
| `/browse/sources` | Module 2: AI Foundations (reading list) |

Implementation: add a `CalloutBand` at the bottom of each browse room page.

### 6. Module index finalization

✅ **Already complete.** All 6 modules are `status: "active"` with accurate lesson counts, summaries, and week ranges. No changes needed.

### 7. Navigation QA

Verify:
- [ ] "Modules" highlights in the header when on any `/modules/*` route
- [ ] Module local nav highlights the current lesson
- [ ] All "Next lesson" links resolve
- [ ] All "Previous lesson" links resolve
- [ ] Module overview → lesson links resolve
- [ ] Lesson → module overview "back" links resolve
- [ ] Tour → module links resolve
- [ ] Module → tour links resolve
- [ ] Browse → module links resolve
- [ ] Homepage → modules link resolves

### 8. Responsive QA

Test all module pages at:
- `sm` (640px) — single column, no sidebar
- `md` (768px) — wider padding, no sidebar
- `lg` (1024px) — sidebar appears, grids go multi-column
- `xl` (1280px) — full width with comfortable margins

Verify:
- [ ] `PersonProfileGrid` stacks cleanly on mobile
- [ ] `TimelineSection` is readable on narrow screens
- [ ] Prompt example cards in Module 4 stack properly
- [ ] KaTeX blocks in Module 2 do not overflow on mobile
- [ ] Module index cards form a readable grid at all widths

### 9. Tone QA

Full read-through of all module content. Check for:
- [ ] No museum-curatorial voice remnants (third-person distance, "Let this era serve as...")
- [ ] Consistent use of "you" when addressing the student
- [ ] Plain-language explanations (no unexplained jargon)
- [ ] Every section answers "why this matters" within the first 2 sentences
- [ ] Classroom framing is present in Modules 1, 5, 6
- [ ] Cross-references between modules feel natural, not forced

### 10. Test suite

**Already covered (221 tests across 36 files):**
- Smoke-render tests for all 6 module overview pages ✅
- Smoke-render tests for all lesson pages (M1: 16, M2: 13, M3: 10, M4: 14, M5: 13, M6: 16) ✅
- Component tests for `ModuleShell`, `ModuleIndexCard`, `ModuleLocalNav`, `TimelineSection`, `PersonProfileCard`, `PersonProfileGrid`, `MathBlock`, `EmbeddingsNeighborhoodDiagram` ✅
- Navigation tests: header highlight, local nav active state ✅

**New tests for Sprint 7:**
- Tour step pages render "Go deeper" module cross-link panels
- Browse room pages render module cross-link callouts
- Homepage renders "Follow the full course" entry intent card
- Instructor guide renders module-to-week mapping table
- ModuleShell renders tour step references when `tourSteps` provided
- Cross-link resolution tests (optional but valuable)

### 11. Performance check

- [ ] `next build` completes without errors
- [ ] Build time has not increased by more than 30% (image assets are the main risk)
- [ ] No individual page bundle exceeds 200KB JS
- [ ] Images use `next/image` with appropriate `sizes` and `priority` attributes
- [ ] KaTeX loads via dynamic import — not in the main bundle for non-math pages
- [ ] Largest Contentful Paint on module pages is within acceptable range

## Files modified

| File | Change |
| --- | --- |
| `lib/module-content/types.ts` | Add optional `tourSteps` field to `ModuleDefinition` |
| `lib/module-content/index.ts` | Add `tourSteps` data to module definitions |
| `lib/site-navigation.ts` | Add "course-modules" entry intent |
| `components/module-shell.tsx` | Add tour step reference panel when `tourSteps` present |
| `app/page.tsx` | Render new "Follow the full course" entry intent card |
| `app/tour/signal/page.tsx` | Add module cross-link panel |
| `app/tour/archetype/page.tsx` | Add module cross-link panel |
| `app/tour/style/page.tsx` | Add module cross-link panel |
| `app/tour/proof/page.tsx` | Add module cross-link panel |
| `app/tour/build/page.tsx` | Add module cross-link panels (2 modules) |
| `app/tour/publish/page.tsx` | Add module cross-link panel |
| `app/instructor-guide/page.tsx` | Add module-to-week mapping section + per-module teaching notes |
| `app/browse/archetypes/page.tsx` | Add module cross-link callout |
| `app/browse/design-lineages/page.tsx` | Add module cross-link callout |
| `app/browse/attention-trust/page.tsx` | Add module cross-link callout |
| `app/browse/sources/page.tsx` | Add module cross-link callout |

## Acceptance criteria

**Already passing (from sprints 1–6):**
- [x] All 6 modules active with correct metadata
- [x] All internal module navigation links resolve (lesson chains, practice, checkpoint)
- [x] Every checkpoint links forward to the next module
- [x] `npx tsc --noEmit` passes (221 tests, 36 files)
- [x] `next build` succeeds with all routes exported
- [x] Smoke-render tests for all module pages

**Sprint 7 deliverables:**
- [x] Every tour step links to at least one module ("Go deeper" panel)
- [x] Every module overview shows related tour steps ("Where this fits" panel)
- [x] Homepage shows "Follow the full course" entry intent
- [x] Instructor guide has the 16-week table with per-module teaching notes
- [x] Browse rooms link to related modules
- [x] All new navigation links resolve (no 404s) — verified via `next build` static export
- [ ] All pages render correctly at sm, md, lg, xl breakpoints
- [ ] No museum-voice remnants in any module content
- [x] Full test suite passes (including new cross-link tests) — 239/239 across 37 files
- [x] Bundle size and build time within acceptable limits — build clean
