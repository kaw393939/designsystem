# Sprint 6: QA, Accessibility, and Baseline Proof

## Goal

Lock the phase-1 baseline with measurable verification so the system can be reused with confidence.

## Scope

1. Expand or finalize coverage for the critical phase-1 component and validation surfaces.
2. Add or refine browser smoke tests for guide routes, exemplar routes, and selected-release proof.
3. Run accessibility and Lighthouse checks in both root-path and repository base-path modes.
4. Validate workflow artifacts and selected-release integrity for the current approved Sprint 5 fixtures.
5. Document the final verification routine for local and CI use.

## Deliverables

- updated unit and browser tests for the critical phase-1 baseline surfaces
- accessibility follow-up list with any unresolved issues called out explicitly
- Lighthouse baseline notes for root-path and repository base-path exported-site runs
- workflow and selected-release validation notes for the approved checked-in fixtures
- final verification checklist for maintainers, including the local and CI command matrix

## Work checklist

1. Define and cover the critical phase-1 component and validation surfaces instead of treating every helper as an equal gate.
2. Ensure guide routes and exemplar pages have route-level smoke coverage.
3. Add breakpoint verification for narrow and wide viewports on the longest learning flows.
4. Capture baseline Lighthouse expectations for accessibility, best-practices, seo, and non-blocking performance.
5. Run Lighthouse against the exported static artifact with a committed config in both root-path and repository base-path modes.
6. Validate schema, workflow, and selected-release invariants for the approved checked-in fixtures.
7. Document how to run the full verification stack locally and in CI, including base-path mode.
8. Record any unresolved accessibility issues explicitly instead of leaving them as implied future work.

## Positive tests

- All required tests pass in clean root-path and repository base-path runs.
- Browser smoke tests cover guide routes, exemplar learning flows, and selected-release navigation proof.
- Lighthouse accessibility, best-practices, and seo meet the agreed thresholds against exported output.
- Workflow and selected-release validation passes on approved checked-in fixtures.

## Negative tests

- No high-severity accessibility issue is knowingly deferred without documentation.
- No critical baseline surface is left untested because it looked visually correct.
- No deployment path bypasses the quality gates.
- No release or baseline-proof gate relies on a dev-server Lighthouse run when exported-site evidence is required.
- No Sprint 6 completion claim implies release readiness without separate release QA.

## Edge-case checks

- CI behavior versus local behavior.
- Reduced-motion and high-contrast states.
- Narrow viewport rendering for long pages.
- Repository base path versus empty base path.

## Accessibility checks

- Heading order audit.
- focus visibility and order audit.
- color contrast audit.
- semantic landmark audit.

## Export and deploy checks

- Verify that the artifact being audited is the exported static site.
- Verify the same proof path in both root-path and repository base-path preview runs.
- Confirm deploy remains blocked when quality gates fail.

## Lighthouse policy for this sprint

- Audit the exported static site, not the development server.
- Use one committed Lighthouse configuration for local and CI runs.
- Gate on accessibility, best-practices, and seo first.
- Record performance as a baseline until stable budgets are adopted.

## Out of scope

- new feature development unrelated to baseline proof
- release QA for a publishable release candidate
- full file-based workflow implementation beyond the approved Sprint 5 selected-build proof

## Exit criteria

Sprint 6 is done when another maintainer can run the documented root-path and repository base-path checks, review any recorded accessibility follow-ups, and trust the design system baseline and current selected-release publishing workflow as serious starting points.
