# Sprint 1: Theme Tokens and Educational Visual Baseline

## Goal

Create the semantic visual system for the educational design system.

## Scope

1. Define color roles for reading, emphasis, proof, reflection, synthesis, warning, and next-step states.
2. Define typography roles for hero, section, body, concept, caption, annotation, and metadata text.
3. Define spacing, width, radius, shadow, and border rules.
4. Define motion rules and reduced-motion behavior.
5. Establish contrast expectations and high-contrast behavior.

## Deliverables

- token documentation
- baseline theme variables
- visual-state naming map
- examples showing token application across multiple page types

## Work checklist

1. Replace arbitrary color names with semantic state names.
2. Define a reading-width system for long-form educational content.
3. Define section-rhythm spacing so pages feel consistent.
4. Normalize border and surface rules for cards, bands, and callouts.
5. Document when accent colors are allowed and when neutral surfaces should dominate.

## Positive tests

- A lesson page, module overview page, and reading map can all be styled from the same token layer.
- Mobile and desktop typography maintain clear hierarchy.
- Reading surfaces and callout surfaces remain visually distinct without looking promotional.

## Negative tests

- No page needs custom magic-number spacing to look correct.
- No token name depends on a specific subject area or visual theme.
- No contrast-critical text relies on low-contrast decorative color.

## Edge-case checks

- Very long headings still fit the type scale.
- Dense card grids remain readable with short and long summaries.
- Reflection and warning states feel different without drifting into alarm styling.

## Accessibility checks

- Verify contrast for all major text and surface combinations.
- Verify reduced-motion behavior and high-contrast overrides.

## Export and deploy checks

- Build after token changes to ensure theme refactors do not break static export.

## Out of scope

- page recipe implementation
- topic-specific visual branding

## Exit criteria

Sprint 1 is done when the design system has a semantic token layer that can carry the whole educational baseline without ad hoc exceptions.
