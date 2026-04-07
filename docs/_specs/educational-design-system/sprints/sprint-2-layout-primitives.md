# Sprint 2: Layout Primitives and Shell Hardening

## Goal

Generalize the reference repo's layout logic into reusable educational shells and structural primitives.

## Scope

1. Implement `PageShell` and `LessonShell`.
2. Implement `ProseBlock`, `EditorialBand`, `SplitLayout`, `ContentGrid`, `CalloutBand`, `MediaBlock`, and `LocalNav`.
3. Harden header, footer, and responsive shell behavior.

## Deliverables

- reusable shell components
- responsive layout primitives
- layout usage notes in the component inventory

## Work checklist

1. Establish the frame width and reading width relationship.
2. Define how wide bands and reading-width blocks coexist on the same page.
3. Normalize section padding and inter-section spacing.
4. Define single-column fallback behavior for all split or grid layouts.
5. Make sure header and footer copy remain topic-neutral.

## Positive tests

- At least three different page types can be assembled from the same primitives.
- Mobile layouts collapse cleanly to readable single-column flows.
- Wide bands and reading sections feel part of one system.

## Negative tests

- No shell component hardcodes topic-specific labels.
- No layout primitive requires page-specific rescue wrappers.
- No sticky navigation behavior blocks content access on small screens.

## Edge-case checks

- Long card titles and empty secondary split content.
- Dense resource grids and sparse summary grids.
- Pages with no local navigation.

## Accessibility checks

- Verify landmark structure.
- Verify tab order with sticky or local navigation.
- Verify heading flow remains logical regardless of visual placement.

## Export and deploy checks

- Static build after shell refactors.
- Verify layouts render correctly from exported output, not only dev mode.

## Out of scope

- content primitives beyond minimal placeholder scaffolding

## Exit criteria

Sprint 2 is done when layout concerns are solved by reusable shells and primitives rather than by page-specific composition hacks.
