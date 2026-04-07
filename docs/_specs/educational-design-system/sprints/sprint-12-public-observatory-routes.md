# Sprint 12: Public Observatory Routes

## Goal

Build the public observatory route family that turns exported observable-state bundles into legible static pages.

## Scope

1. Add the public `/observatory/` route family defined by the observable-state spec.
2. Render overview, collection, and detail routes from exported snapshot bundles only.
3. Create shared observatory page primitives for state cards, tables, timelines, empty states, and lineage views.
4. Add route-generation and validation behavior for missing snapshot IDs, broken internal links, and unresolved detail views.
5. Preserve static export, root-path validation, and GitHub Pages-style base-path validation for the full public observatory surface.

## Deliverables

- public observatory overview, collection, and detail routes under `/observatory/`
- shared route components for state summaries, timelines, lineage links, and empty-state handling
- snapshot-loading and route-generation logic that reads from `.site/observable-state/public/`
- static-route coverage for sources, experiences, modules, artifacts, releases, runs, queue, failures, and lineage
- tests for route rendering, broken-reference handling, and exported-site behavior in both deployment modes

## Work checklist

1. Keep the public observatory bound to exported public snapshots rather than raw canonical files or SQLite queries at runtime.
2. Match the public route family to the observable-state spec instead of inventing a second route vocabulary.
3. Make state pages explain what exists, what is in progress, what failed, and how artifacts connect.
4. Ensure missing IDs and unresolved detail pages fail clearly through validation or explicit not-found handling.
5. Reuse stable identifiers and lineage links so the public observatory remains historically auditable.
6. Keep route behavior compatible with root-path and repository base-path deployment modes.

## Positive tests

- The public observatory builds statically from exported public snapshots alone.
- Overview, collection, and detail routes link to each other through stable IDs and lineage references.
- Empty queue, empty failure, and sparse-history states render legibly instead of collapsing into broken pages.
- Broken or unresolved snapshot references are surfaced clearly during validation or route generation.
- The route family passes exported-site QA in both root-path and repository base-path modes.

## Negative tests

- No public observatory route depends on live SQLite access.
- No maintainer-only or private-local field is rendered into the public build.
- No route silently drops broken lineage or missing state while still claiming completeness.
- No route requires a server runtime or dynamic request-time fetch to explain state.

## Edge-case checks

- zero current failures
- zero queued items
- one published release with no older history
- multiple experiences sharing sources without losing stable lineage links

## Accessibility checks

- Each observatory page keeps one clear page-level heading and meaningful section structure.
- State tables, timelines, and status indicators remain understandable without color alone.
- Empty states and failure summaries remain readable and keyboard-navigable.

## Export and deploy checks

- Static route generation remains deterministic for the same exported public bundle.
- Public observatory pages respect root-path and repository base-path deployments.
- Sitemap and route coverage can include observatory pages without introducing export-hostile behavior.

## Out of scope

- maintainer-only richer observatory views
- governance and visibility-review policy beyond the public route needs already defined in specs
- live filtering, search backends, or interactive query consoles
- runtime authoring or operational mutation tools

## Exit criteria

Sprint 12 is done when the public observatory route family can explain current system state, history, failures, and lineage from exported public snapshots alone while preserving the project’s static-export and QA rules.
