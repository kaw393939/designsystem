# Guided Reference Sprint 1: Entry and Tour Foundation

## Goal

Replace the current atlas-first entrance with a clear lobby and route-family model, while establishing the shared guided-page frame and visible tour record that later guided steps will depend on.

## Why this sprint exists

The current site has strong material but surfaces the wrong first impression.

Today:

1. the root route behaves like an archetype-atlas landing page
2. the top nav promotes browse rooms as peers to the main learning path
3. the repo already contains a stronger guided workshop model, but it is not the dominant public route
4. there is no shared guided-page shell or persistent learner record yet, which means later guided pages would drift if they were built directly

Sprint 1 exists to solve the entrance problem and the shared-tour-frame problem together.

## Scope

1. Rewrite the root route into a lobby that sorts visitor intent across first-time students, returning builders, reference browsers, and instructors.
2. Replace the current atlas-first top navigation with route-family navigation built around `Start`, `Tour`, `Browse`, `Examples`, and `Instructor`.
3. Introduce a reusable visible route-status pattern and task-language labels so surfaces communicate whether they are entry, required, support, optional reference, or instructor-only.
4. Create the shared guided-page shell, step metadata contract, current-step indicator, and visible tour-record component needed by future `/tour/*` routes.
5. Keep the implementation compatible with the current flat-route site during migration rather than requiring all guided-step pages to exist immediately.

## Deliverables

- `guided-reference-sprint-1-entry-and-tour-foundation.md`
- a lobby-first implementation of `app/page.tsx`
- updated primary navigation in `components/site-header.tsx` and `components/site-header-nav.tsx`
- a reusable route-status display pattern for route-family surfaces
- shared guided-tour frame components and metadata support for future guided routes
- a compact visible tour-record component or equivalent shared surface
- typed content or config updates that separate route-family navigation from the current atlas navigation model
- focused tests for entry clarity, nav behavior, and guided-shell state rendering

## Current-state constraints

The sprint should begin from the repo as it exists today.

Current implementation facts:

1. `app/page.tsx` currently presents an atlas-first overview with CTAs to `/playbook` and `/archetypes`.
2. `components/site-header.tsx` currently derives its nav from `atlasNavItems` in `lib/archetype-atlas-content.ts`.
3. `lib/web-presence-site-content.ts` already contains a stronger guided workshop chain and role-based path cards, but that logic is not the main surfaced nav model.
4. `components/page-shell.tsx` and `components/local-nav.tsx` already provide structural primitives that Sprint 1 should reuse or extend rather than bypass.

## Phase boundary

Sprint 1 establishes the entrance and shared frame.

Sprint 1 does not need to finish the individual guided-tour content pages such as `/tour/signal` or `/tour/proof`. It only needs to make those pages structurally possible and keep the route-family logic ready for Sprint 2.

## Implementation sequence

Sprint 1 should land in this order so the site gains clarity early and shared shell logic is defined before guided-route content expands.

### 1. Route-family content and metadata foundation

- define the route-family navigation model independent of the current atlas navigation
- define the route-status vocabulary and public task-language labels in implementation-facing data or metadata
- define the guided-step metadata contract for label, order, prerequisite, output, and next move

### 2. Lobby and top-nav rewrite

- rewrite `app/page.tsx` around the role-based start-here ladder from the approved spec package
- replace atlas-first header logic with route-family navigation in `components/site-header.tsx` and `components/site-header-nav.tsx`
- make the first screen communicate guided versus browse mode without forcing a deep theory choice first

### 3. Shared guided-page shell and visible tour record

- add the structural shell for future guided routes
- add current-step state and a visible excerpt of the learner record
- define slots for one misconception and one formative check so later pages do not reinvent the frame

### 4. Compatibility and validation pass

- ensure the new navigation and shell can coexist with the current flat-route site during migration
- add tests for navigation state, entry clarity, and shared guided-shell rendering
- verify the sprint against five-second and first-click expectations before calling the foundation stable

## File-by-file implementation checklist

Use this list to keep the sprint concrete.

### Update current entry and nav surfaces

- `app/page.tsx`: replace the atlas-first overview with the lobby contract, role-based CTAs, one proof cue, and clear guided-versus-browse framing
- `components/site-header.tsx`: stop sourcing the primary nav directly from `atlasNavItems` and move to the route-family model
- `components/site-header-nav.tsx`: support the new family-level nav state and any bounded contextual item behavior required by the new IA
- `lib/archetype-atlas-content.ts`: demote atlas-specific nav assumptions so they no longer define the global entry model
- `lib/web-presence-site-content.ts`: reuse or extract the existing guided workshop sequence and path-card logic where it helps the lobby and tour framing

### Add or extend shared route-family and guided-shell support

- `lib/`: add or extend a shared site-navigation or route-family content module if implementation clarity requires one distinct source of truth for `Start`, `Tour`, `Browse`, `Examples`, and `Instructor`
- `components/page-shell.tsx`: extend only if the shell needs route-family-aware framing or a clearer way to host the new header behavior
- `components/local-nav.tsx`: extend only if the guided-step shell needs a stable current-step or progress pattern that this component can support cleanly
- `components/`: add any small shared components required for route-status labels, tour-record display, or current-step framing
- `app/tour/`: add the initial shell-level route or layout scaffolding only if needed to prove the shared guided frame during this sprint

### Add or extend focused tests

- `tests/unit/`: add focused tests for route metadata, navigation state, and tour-record rendering if the new logic is expressed as typed helpers or components
- `tests/browser/`: add or extend browser coverage for root-route first-click clarity, top-nav behavior, and the shared guided-shell proof surface if one is added in this sprint

## Work checklist

1. Separate route-family navigation content from the current atlas navigation content.
2. Make the root route answer four questions immediately: where to start, how to resume, where to browse, and where instructors go.
3. Ensure the primary nav labels describe user tasks, not only internal taxonomy.
4. Add visible route-status language in a reusable pattern that later routes can adopt without redesign.
5. Define one shared guided-page frame before any later guided-step page tries to solve progress, state, or tour-record display on its own.
6. Keep the tour record compact, legible, and obviously cumulative.
7. Keep the migration incremental so current flat routes can still function while the new IA is taking shape.

## Positive tests

- a first-time student can reach the beginning of the guided path in one click from the root route
- a returning builder can identify the resume path in one click from the root route
- a reference browser can choose browse mode without mistaking it for the primary guided path
- the top nav communicates route families rather than deep topic rooms
- the same guided shell can render a step label, prerequisite, output, current-step state, and visible tour-record excerpt without page-specific rescue wrappers
- route-status labels are visible and understandable without reading the full page copy

## Negative tests

- the homepage does not still read like the front page of the archetype atlas
- no deep browse room remains a first-order peer in primary navigation
- no lobby CTA requires internal jargon like archetype, atlas, or lineage to understand the action
- no guided shell hides current-step state or the learner record behind interaction that is required to understand the page
- no shared tour-frame logic depends on later Sprint 2 guided-content pages already existing

## Edge-case checks

- the current path highlighting in `components/site-header-nav.tsx` remains correct when the active route is a future `/tour/*` or `/browse/*` family path
- the root route remains coherent on small screens where the CTA ladder may stack vertically
- the visible tour record handles an empty or initial state without looking broken or unfinished
- contextual navigation does not cause duplicate or contradictory current-page states
- existing flat routes such as `/playbook`, `/workbook`, and `/deliverables` remain reachable during this sprint even if they are not yet fully migrated

## Accessibility checks

- the first screen exposes the main actions with logical heading structure and keyboard reachability
- the new top navigation remains fully operable by keyboard and announces current route state semantically
- route-status labels do not rely on color alone
- the guided shell exposes current-step state, misconception content, and formative-check content in a way that remains readable for assistive technology
- the tour record is understandable as text, not only as a visual badge or progress ornament

## Browser and usability checks

- five-second check: a new viewer can answer where to start, where to resume, where to browse, and where to teach after one short look at the root route
- first-click check: representative users choose the intended CTA for first-time and returning flows without opening a browse room first
- mobile check: the primary CTA ladder remains visible before deep scroll and before optional browse content
- return-state check: when a guided shell proof route exists, a user can tell what step they are on without inference

## Export and deploy checks

- static build remains valid after the root-route and navigation rewrite
- sitemap and route metadata stay valid even if `/tour/*` shell scaffolding is introduced in this sprint
- no Sprint 1 implementation should require runtime state or server-only behavior for the tour record foundation

## Out of scope

- finishing the full guided-tour content pages for signal, archetype, style, proof, build, and publish
- fully reframing browse rooms and examples-family pages
- final alias and redirect policy for all legacy flat routes
- instructor-guide rewrite beyond whatever minimal nav integration is needed for the new route-family shell

## Exit criteria

Sprint 1 is done when the root route behaves like a start-here lobby rather than an atlas landing page, the top nav reflects the approved route-family model, the repo has one shared guided-page frame with a visible tour-record foundation, and the resulting entry experience is clear enough to pass lightweight first-click and five-second validation before Sprint 2 begins.