# Information Architecture and Content Strategy Review

## Status

- Lens: information architect and content strategist
- Review target: BSEAI site IA and closely related planning docs

## Findings

1. The major route families are conceptually strong, but the author-facing boundary between `atlas`, `galleries`, `modules`, `studio`, and `examples` is still too implicit.
2. The IA distinguishes the comprehensive site from release 1, but the compression rule is not strong enough to prevent navigation sprawl during implementation.
3. The examples layer exists as a destination, but the routes do not yet specify where examples should surface in-context before a learner reaches the dedicated examples layer.

## Risks

1. Authors will create duplicate pages because they cannot tell whether a new object belongs in atlas, gallery, or module space.
2. Release 1 may inherit too much of the comprehensive route tree and become cognitively noisy.
3. Exemplars may remain separate proof surfaces instead of working as embedded teaching supports.

## Required changes

1. Add an author-facing object-placement model that says exactly when something is an atlas room, gallery board, canonical module, studio step, support page, or example.
2. Add a release-1 navigation compression table that states which top-level items are visible, nested, or deferred in the first build.
3. Add route-level example hooks so each major route knows where exemplars should appear in-line before the dedicated examples area is complete.
