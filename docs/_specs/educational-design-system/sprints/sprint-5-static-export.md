# Sprint 5: Static Export and GitHub Pages Hardening

## Goal

Make the educational design system safe for static deployment on GitHub Pages while proving the first explicit release-selected export path.

## Scope

1. Confirm export-safe route behavior.
2. Validate base-path-aware navigation and assets.
3. Harden image and metadata handling.
4. Align CI with export reality.
5. Implement one checked-in experience-and-release selection path or equivalent selected-build fixture that can stand in for the future broader release workflow.
6. Validate initial release-manifest-driven build and CLI integration points without requiring the full authoring CLI surface.

## Deliverables

- finalized static export configuration
- deployment workflow notes
- CI updates where needed
- export validation checks for both root-path and repository base-path modes
- one checked-in `ExperienceConfig` plus one checked-in `ReleaseManifest`, or an equivalent checked-in release-selection fixture that targets the approved Sprint 4 baseline
- initial build-selection integration through a typed build path or narrow CLI entry point
- release assembly rules for static publishing

## Work checklist

1. Validate `output: "export"` behavior.
2. Validate `trailingSlash: true` assumptions.
3. Validate `NEXT_PUBLIC_BASE_PATH` handling.
4. Confirm images and public assets resolve correctly.
5. Confirm sitemap and robots remain valid.
6. Introduce one checked-in experience-and-release selection path, or equivalent selected-build fixture, rather than relying on implicit latest content.
7. Confirm the selected release input rejects missing, unapproved, or unresolved unit and visual references.
8. Confirm CI and local QA validate a fresh exported `out/` artifact rather than stale build output or dev-only behavior.
9. Document any constraints authors must follow to stay export-safe.

## Positive tests

- The site builds cleanly to a fresh `out/` artifact.
- Internal links resolve under repository-path hosting and under an empty base path.
- Exemplar pages render with their assets intact.
- One checked-in experience-and-release pair, or equivalent selected-build fixture, reproduces the same output from the same inputs.
- The selected build path stays explicit in local commands and CI configuration.

## Negative tests

- No route requires a server runtime.
- No asset path is hardcoded to root when base-path awareness is required.
- No CI step validates only dev mode while ignoring exported output.
- No selected build falls back silently to an implicit latest release when explicit selection is required.
- No selected release input with missing or unapproved references passes validation.

## Edge-case checks

- Nested route paths under base path.
- Remote image allowlist behavior.
- Empty base path for custom-domain readiness.
- Selected release with a reduced navigation set still produces valid internal links and sitemap output.

## Accessibility checks

- Metadata and route changes do not break page titles, landmarks, or canonical navigation cues.

## Export and deploy checks

- Manual or automated verification of a fresh `out/` artifact.
- Root-path and repository base-path verification of the selected export artifact.
- Pages workflow remains blocked behind quality gates.

## Out of scope

- full authoring CLI implementation across sources, units, visuals, and releases
- large-scale migration of all future content into the final file-based publishing library beyond the initial selected-release proof
- backend deployment targets
- dynamic application hosting

## Exit criteria

Sprint 5 is done when the design system can be deployed to GitHub Pages as a static site without special-case patches, when one explicit checked-in experience-and-release selection path or equivalent selected-build fixture can reproduce the same exported output from the same inputs, and when that path is validated in both root-path and repository base-path QA.
