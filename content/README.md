# Content Library Index

## Purpose

This folder is the file-backed publishing library for the educational design system.

It stores the operational content artifacts that the app, release pipeline, and CLI work from.

## Structure

- `sources/`: registered long-form source materials
- `briefs/`: north-star, module, and other planning briefs tied to content development
- `drafts/`: mutable working content artifacts before they are frozen
- `units/`: page-level units and immutable approved versions
- `visuals/`: visual specs and approved visual artifacts
- `reviews/`: append-only review records
- `experiences/`: experience configs that assemble approved units
- `releases/`: immutable release manifests
- `plans/`: planning-chain materials connected to experiences or modules
- `registry/`: shared registries such as the site registry

## Working rule

This folder is the operational content system, not the raw research library.

Use `docs/_research/` and `docs/_content/` to think, synthesize, and validate.
Use `content/` when the result needs to become a managed unit, experience, visual, or release artifact.

## Maintenance rule

Avoid creating new top-level subfolders here unless they represent a genuinely new artifact type in the publishing workflow.