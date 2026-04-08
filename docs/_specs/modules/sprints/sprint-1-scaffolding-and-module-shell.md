# Sprint 1: Scaffolding and Module Shell

## Goal

Stand up the `/modules/` route family, define the module data model, build the reusable module components, integrate with site navigation, and validate with a placeholder module.

## Why this sprint exists

Every subsequent sprint needs to drop content into a working container. If the shell, data model, nav integration, and reusable components are not in place first, each content sprint would reinvent infrastructure. Sprint 1 solves the container problem once so sprints 2–7 focus entirely on content.

## Scope

1. Define the typed module data model (`ModuleDefinition`, `ModuleLesson`, `ModuleStatus`)
2. Create the module registry in `lib/module-content/` with all 6 modules declared (most as "coming" status)
3. Build `ModuleShell` — composes `SupportRouteShell` for the hero, then adds module-specific sections below
4. Build `ModuleIndexCard` — card for the module index grid; renders as disabled (no link) when status is `"coming"`
5. Build `ModuleLocalNav` — route-based sidebar showing lesson links within a module (NOT a wrapper around `LocalNav`, which is scroll-based in-page navigation)
6. Build `TimelineSection` — vertical timeline for era milestones; uses `<ol>` with `aria-label`
7. Build `PersonProfileCard` and `PersonProfileGrid` — portrait-based people display; cards use `<article>` with heading hierarchy, portraits use `rounded-full` (circular)
8. Create `app/modules/layout.tsx` (shared layout for all module pages)
9. Create per-module `layout.tsx` files (e.g., `app/modules/ai-foundations/layout.tsx`) that inject module context and render `ModuleLocalNav` sidebar for all child lesson pages
10. Create `app/modules/page.tsx` (module index with card grid)
11. Create placeholder `app/modules/ai-foundations/page.tsx` to validate the full shell
12. Add "Modules" to `primarySiteNavItems` in `lib/site-navigation.ts`
13. Install `katex` dependency (required for Sprint 2's `MathBlock`); configure for dynamic import
14. Write smoke-render tests for all new components

## Scope boundaries

- Sprint 1 does NOT write module lesson content. Only the overview page for `ai-foundations` is created, and it may use placeholder text for lesson cards.
- Sprint 1 does NOT copy images. Image migration happens at the start of Sprint 2.
- Sprint 1 does NOT modify existing tour, browse, or experience pages.
- Sprint 1 DOES install `katex` as a dependency but does NOT build the `MathBlock` component (that ships in Sprint 2).

## Data model

### `lib/module-content/types.ts`

```ts
import type { PanelTone } from "@/lib/theme-tokens";

export type ModuleStatus = "active" | "preview" | "coming";

export type ModuleLesson = {
  id: string;
  slug: string;
  title: string;
  summary: string;
};

export type ModuleDefinition = {
  id: string;
  slug: string;
  number: number;
  title: string;
  summary: string;
  leaveWith: string;
  weekRange: string;
  status: ModuleStatus;
  tone: PanelTone;
  lessons: readonly ModuleLesson[];
  hasPractice: boolean;
  hasCheckpoint: boolean;
};
```

### `lib/module-content/index.ts`

Exports `allModules: readonly ModuleDefinition[]` with all 6 modules declared. Module 2 (AI Foundations) has status `"active"` or `"preview"`. Modules 1, 3–6 have status `"coming"`.

Each module declares its lessons with slugs even if the pages do not exist yet. The module shell renders lesson cards with status indicators.

## Component specifications

### `ModuleShell`

Wraps a module overview page. Composes `SupportRouteShell` internally for the hero, then renders module-specific sections below. Receives:
- `module: ModuleDefinition`
- `children: ReactNode` (additional content below the lesson grid)

Renders:
- `SupportRouteShell` hero with module title, summary, "What you leave with," week range
- Ordered lesson card grid using `ContentGrid`
- Practice and checkpoint links (if `hasPractice` / `hasCheckpoint`)
- Prev/next module navigation at the bottom

### `ModuleIndexCard`

Card for the `/modules/` index page. Receives:
- `module: ModuleDefinition`

Renders:
- Module number badge
- Title and summary
- Lesson count
- Week range
- Status badge (`active` / `preview` / `coming`)
- Link to `/modules/[slug]/` — **disabled (no `<a>` wrapper, reduced opacity) when status is `"coming"`**

### `ModuleLocalNav`

Route-based sidebar for navigating between lesson pages within a module. This is fundamentally different from the existing `LocalNav` component, which uses scroll-position intersection observers for in-page section navigation.

Receives:
- `module: ModuleDefinition` (to derive lesson links)
- `currentSlug: string` (to highlight the active lesson)

Renders:
- Module title as heading
- Ordered list of lesson links (`/modules/[module-slug]/[lesson-slug]/`)
- Practice link (if module has practice)
- Checkpoint link (if module has checkpoint)
- Active state for the current lesson
- Collapses to a disclosure on mobile (below `lg:`) similar to `LocalNav`'s pattern

Data flow: rendered from a **per-module `layout.tsx`** file (e.g., `app/modules/ai-foundations/layout.tsx`) that looks up the module definition from the registry and passes it as context. This ensures every lesson page within a module gets the sidebar without prop-threading.

### `TimelineSection`

Vertical timeline for chronological milestones. Receives:
- `items: readonly { year: string; title: string; summary: string }[]`
- `className?: string`

Renders:
- Vertical line with dot markers
- Year labels
- Title and summary per milestone
- Uses `<ol aria-label="Timeline">` with `<li>` for each milestone for screen reader accessibility
- Keyboard-navigable (standard list navigation)

### `PersonProfileCard`

Portrait card. Receives:
- `name: string`
- `role: string`
- `era?: string`
- `summary: string`
- `imageSrc: string`
- `imageAlt: string`

Renders:
- Circular portrait image (`rounded-full`, consistent across all profile cards)
- Name as heading (`<h3>` or appropriate level), role, era badge
- Summary text
- Wrapped in `<article>` for semantic grouping

### `PersonProfileGrid`

Grid wrapper. Receives:
- `profiles: readonly PersonProfileCardProps[]`
- `minCardWidth?: string`

Renders:
- `ContentGrid` with `PersonProfileCard` items

## File creation list

| File | Type | Purpose |
| --- | --- | --- |
| `lib/module-content/types.ts` | data | Shared types |
| `lib/module-content/index.ts` | data | Module registry |
| `components/module-shell.tsx` | component | Module overview layout (composes `SupportRouteShell`) |
| `components/module-index-card.tsx` | component | Index page card (disabled when "coming") |
| `components/module-local-nav.tsx` | component | Route-based lesson sidebar |
| `components/timeline-section.tsx` | component | Vertical timeline (`<ol>` semantics) |
| `components/person-profile-card.tsx` | component | Portrait card (`<article>`, circular image) |
| `components/person-profile-grid.tsx` | component | Portrait grid |
| `app/modules/layout.tsx` | route | Shared module layout |
| `app/modules/page.tsx` | route | Module index page |
| `app/modules/ai-foundations/layout.tsx` | route | Per-module layout with `ModuleLocalNav` sidebar |
| `app/modules/ai-foundations/page.tsx` | route | Placeholder module overview |
| `tests/unit/module-shell.test.tsx` | test | Shell render test |
| `tests/unit/module-index-card.test.tsx` | test | Card render test |
| `tests/unit/timeline-section.test.tsx` | test | Timeline render test |
| `tests/unit/person-profile-grid.test.tsx` | test | Profile grid render test |

## Files modified

| File | Change |
| --- | --- |
| `lib/site-navigation.ts` | Add "Modules" to `primarySiteNavItems` |
| `package.json` | Add `katex` and `@types/katex` dependencies |

## Implementation sequence

1. Install `katex` dependency: `npm install katex @types/katex`
2. Types and registry (`lib/module-content/`)
3. `TimelineSection` and `PersonProfileCard` / `PersonProfileGrid` (no route dependency)
4. `ModuleIndexCard` (depends on types)
5. `ModuleLocalNav` (depends on types, route-based not scroll-based)
6. `ModuleShell` (depends on types, composes `SupportRouteShell`)
7. `app/modules/layout.tsx` and `app/modules/page.tsx` (depends on `ModuleIndexCard`)
8. `app/modules/ai-foundations/layout.tsx` (per-module layout with `ModuleLocalNav`)
9. `app/modules/ai-foundations/page.tsx` (depends on `ModuleShell`)
10. Nav integration in `site-navigation.ts`
11. Tests

## Acceptance criteria

- [ ] `/modules/` renders a card grid with 6 module cards (1 active/preview, 5 coming)
- [ ] "Coming" module cards are visually disabled (no link, reduced opacity)
- [ ] `/modules/ai-foundations/` renders the module shell with placeholder lesson list
- [ ] "Modules" appears in the header nav between "Tour" and "Browse"
- [ ] "Modules" highlights when on any `/modules/*` route
- [ ] Module local nav sidebar renders on `lg:` breakpoint and above as route-based links
- [ ] Per-module layout (`app/modules/ai-foundations/layout.tsx`) renders `ModuleLocalNav` for child pages
- [ ] `TimelineSection` uses `<ol>` with `aria-label` for screen reader accessibility
- [ ] `PersonProfileCard` uses `<article>` with heading hierarchy and circular portrait
- [ ] `katex` is installed in `package.json`
- [ ] `npx tsc --noEmit` passes
- [ ] All existing tests pass
- [ ] New component tests pass
