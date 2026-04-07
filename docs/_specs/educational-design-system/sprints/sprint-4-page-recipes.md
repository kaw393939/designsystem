# Sprint 4: Page Recipes and Exemplar Pages

## Goal

Prove the design system as a page grammar through implemented exemplar pages.

## Scope

1. Finalize recipe documentation for all required page types.
2. Implement at least two exemplar pages.
3. Prove that recipes can be assembled from checked-in approved unit-config fixtures or typed unit specs that stand in for approved selections until the release-manifest workflow exists.
4. Validate scanning, sequence clarity, and next-step flow.
5. Validate recipe conformance against required block presence and block order rather than relying only on route smoke tests.

## Required recipe coverage

- learning homepage
- module overview page
- lesson page
- concept explainer page
- timeline or story page
- assignment or project page
- reading map or resource map page

## Required exemplar pages

- one lesson-style page on its own route
- one overview or concept page on its own route

## Deliverables

- implemented exemplar pages on dedicated routes
- updated recipe documentation
- checked-in approved unit-config fixtures or typed unit specs for recipe assembly
- recipe-conformance validation helpers or tests for required block presence and ordered block contracts
- smoke tests for exemplar routes

## Work checklist

1. Build pages from recipes rather than from improvised composition.
2. Confirm each page has one dominant instructional job.
3. Make transitions explicit between sections.
4. Assemble the exemplar pages from checked-in approved unit-config fixtures or typed unit specs rather than hardcoded page copy.
5. Use placeholder content that proves subject-general reuse.
6. Add recipe-conformance coverage for required block presence, required block order, and at least one failing case.
7. Add smoke coverage for the exemplar routes.

## Positive tests

- Exemplar pages feel like a coherent learning system.
- The first screen of each page communicates page purpose.
- The final screen of each page communicates next action.
- Checked-in approved unit selections can drive the exemplar pages without custom page-only content wiring.
- Recipe validation can prove that each exemplar page satisfies its documented required block contract.

## Negative tests

- No exemplar page behaves like a component gallery.
- No page includes recipe sections that do not serve its dominant job.
- No page depends on hidden implementation assumptions from the museum site.
- Wrong section order or missing required blocks should fail recipe validation.

## Edge-case checks

- Sparse lesson page versus dense lesson page.
- Optional glossary or source blocks omitted.
- Long sequences and short sequences.

## Accessibility checks

- Full page heading flow.
- Landmark and navigation clarity.
- Keyboard access to all interactive elements.

## Export and deploy checks

- Verify exemplar pages in exported output and under a base path.

## Out of scope

- large-scale content production beyond the exemplar proof pages
- release-manifest wiring and full file-based `UnitVersion` workflow implementation

## Exit criteria

Sprint 4 is done when the system can demonstrate at least two credible educational pages on dedicated routes that are clearly built from documented recipes and checked-in approved unit inputs, and when recipe validation can prove those pages satisfy the documented block contracts.
