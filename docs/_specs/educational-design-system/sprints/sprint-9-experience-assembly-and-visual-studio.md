# Sprint 9: Experience Assembly and Visual Studio

## Goal

Extend phase 2 from a single file-backed unit lifecycle proof into the first real multi-experience assembly layer and the first file-backed visual lifecycle.

## Scope

1. Add the first file-backed experience assembly path for at least two distinct experiences that can share sources, units, and visuals without forking the whole content library.
2. Materialize checked-in experience-level assembly artifacts so experience-specific navigation, selected units, and selected visuals are explicit and reviewable in files.
3. Implement the first file-backed visual lifecycle commands for draft creation, inspection, freeze, generation, review request, review recording, revision, and approval.
4. Support illustration, diagram, and deterministic chart or graph workflows in a way that matches the visual-asset-pipeline rules instead of collapsing them into one generic image flow.
5. Extend selected-release validation and build compatibility so new experience assembly artifacts and approved visual versions can coexist with the current published phase-1 fixture-backed baseline during migration.
6. Record mutating experience-assembly and visual lifecycle operations in the local orchestration ledger introduced in Sprint 7.

## Deliverables

- `sprint-9-experience-assembly-and-visual-studio.md`
- checked-in planning and assembly artifacts for at least two distinct site directions, including the identity portfolio system and the AI-and-Renaissance interpretation site
- file-backed experience assembly support that makes selected navigation, unit selection, and visual selection explicit per experience
- visual lifecycle commands for `start`, `show`, `freeze`, `generate`, `request-review`, `review`, `revise`, and `approve`
- checked-in `VisualBrief`, `VisualDraft`, and `VisualSpecVersion` examples with stable lineage, accessibility text, version-owned assets, and supersession links
- at least one illustration-class proof, one diagram-class proof, and one deterministic chart or graph proof aligned to the visual pipeline
- tests for shared-library experience assembly, approved-visual resolution, deterministic chart rules, version-owned asset paths, and release rejection of working drafts or unapproved visuals

## Implementation sequence

Sprint 9 should land in this order so the repo extends the existing Sprint 8 compatibility path instead of introducing a second disconnected workflow.

### 1. Experience artifact and assembly foundation

- extend the file-backed workflow layer so the current Sprint 8 helpers in `lib/source-unit-workflow.ts` either grow explicit experience-assembly support or are split into adjacent helpers such as `lib/source-experience-workflow.ts` and `lib/visual-asset-workflow.ts`
- add typed readers and validators for file-backed experience assembly artifacts that complement the existing `ExperienceNorthStar`, `ModuleBrief`, and `UnitBrief` handling already present in `lib/source-unit-workflow.ts`
- add checked-in assembly examples under `content/plans/experiences/`, `content/plans/modules/`, `content/briefs/visuals/`, `content/experiences/`, and `content/releases/` for both the identity portfolio system and the AI-and-Renaissance interpretation site
- keep the published `content/experiences/phase-1-baseline.json` and `content/releases/phase-1-baseline-release.json` fixtures valid while the new file-backed assembly path proves itself alongside them

### 2. Selected-release resolution and route integration

- extend `lib/site-release.ts` so release validation can resolve file-backed experience and approved visual references with the same explicitness already used for Sprint 8 `unitId@version` unit references
- add a dedicated resolver layer for visuals, for example `lib/site-visual-resolver.ts`, alongside the current `lib/site-unit-resolver.ts`
- preserve `SITE_EXPERIENCE_ID` and `SITE_RELEASE_ID` as the explicit build inputs while allowing additional checked-in experiences and releases to be selected without implicit latest-content fallback
- update the existing route and build integration surfaces only after the selection layer is typed and validated, so `app/`, sitemap derivation, and Lighthouse route scope keep one source of truth

### 3. Visual lifecycle and version-owned asset workflow

- implement typed `VisualDraft` and `VisualSpecVersion` support with checked-in storage under `content/drafts/visuals/` and `content/visuals/<visual-id>/versions/<version>/`
- add visual lifecycle helpers for `start`, `show`, `freeze`, `generate`, `request-review`, `review`, `revise`, and `approve`, reusing the same immutable-snapshot and append-only review rules already enforced for units
- keep illustration, diagram, and chart or graph providers distinct in the workflow model: illustration may use `gpt-image`, diagrams should prefer Mermaid or SVG-style structured sources, and charts or graphs must stay deterministic through code-driven specs such as Vega-Lite, SVG, or equivalent structured output
- ensure `assetRefs` resolve only to files owned by the exact visual version directory so generation never mutates a prior version in place

### 4. CLI and orchestration extension

- extend `scripts/site.ts` with the visual command group already named in `docs/_specs/educational-design-system/cli-command-surface.md` and add the first experience-assembly commands only where checked-in artifacts and validation logic already exist
- record mutating visual and experience operations in the existing SQLite orchestration ledger via `lib/agentic-orchestration.ts`, following the same tracked-run and lock discipline used by the Sprint 8 unit commands
- keep the public npm surface small by continuing to route everything through `npm run site -- ...` instead of spreading the workflow into ad hoc package scripts

### 5. Validation, migration proof, and baseline protection

- extend `tests/unit/site-release.test.ts` and add focused coverage such as `tests/unit/visual-workflow.test.ts`, `tests/unit/site-visual-resolver.test.ts`, and experience-assembly tests that prove shared units and visuals can be selected into more than one experience without ambiguous precedence
- preserve the current selected-release baseline proof by rerunning schema, workflow, release, and exported-site validation after the new compatibility path lands
- explicitly test that working visual drafts, unapproved visual versions, non-deterministic chart outputs, and ambiguous experience or release selections fail before they can affect builds
- keep the migration bounded: Sprint 9 should prove the new file-backed experience and visual path with new checked-in examples, not require a one-sprint rewrite of every existing fixture-backed baseline artifact

## File-by-file implementation checklist

Use this checklist to stage implementation work in concrete repository terms.

### Extend existing workflow and selection files

- `lib/source-unit-workflow.ts`: keep shared parsing helpers, markdown artifact I/O, timestamping, and review-record utilities aligned with any new experience or visual workflow modules
- `lib/site-release.ts`: extend typed selection, schema checks, and selected-release resolution so file-backed experience and approved visual references can coexist with the current fixture-backed baseline
- `lib/site-unit-resolver.ts`: preserve the current resolver behavior while experience-level selection expands beyond the phase-1 proof
- `scripts/site.ts`: add the first visual command handlers and any bounded experience-assembly commands only after the underlying typed helpers exist
- `docs/_specs/educational-design-system/content-schema.md`: update canonical artifact shapes and release-reference rules if implementation clarifies experience or visual version formats
- `docs/_specs/educational-design-system/workflow-state-machine.md`: update lifecycle details if visual generation, review, or publish transitions need sharper wording during implementation
- `docs/_specs/educational-design-system/cli-command-surface.md`: keep the implemented visual and experience command surface truthful once code lands

### Add new workflow and resolver modules

- `lib/source-experience-workflow.ts`: typed readers, validators, and artifact helpers for file-backed experience assembly artifacts such as `ExperienceConfig` and any experience-specific selection helpers
- `lib/visual-asset-workflow.ts`: typed `VisualBrief`, `VisualDraft`, `VisualSpecVersion`, generation metadata, review hooks, and version-owned asset-path rules
- `lib/site-visual-resolver.ts`: resolve selected visual references into build-time usable visual records the same way `lib/site-unit-resolver.ts` resolves units

### Add or extend focused unit tests

- `tests/unit/site-release.test.ts`: extend release validation coverage for file-backed experience and approved visual references
- `tests/unit/source-unit-workflow.test.ts`: keep the shared artifact and review guarantees stable if common workflow helpers move or expand
- `tests/unit/visual-workflow.test.ts`: add lifecycle coverage for visual start, freeze, generate, request-review, review, revise, and approve
- `tests/unit/site-visual-resolver.test.ts`: prove fixture-backed and file-backed visual resolution behavior
- `tests/unit/source-experience-workflow.test.ts`: prove that multiple checked-in experiences can share sources, units, and visuals without ambiguous precedence

### Add or extend exported-site and integration tests

- `tests/browser/site-release.spec.ts`: extend selected-release proof where new experience-specific navigation or sitemap behavior becomes externally visible
- `tests/browser/accessibility.spec.ts`: add representative coverage if new visual proof routes introduce longer alt-text, long-description, chart, or diagram surfaces
- `tests/browser/page-recipes.spec.ts` or a new browser suite: cover any new exemplar routes added to prove the second experience or visual workflow output

### Add checked-in content and planning artifacts

- `content/plans/experiences/identity-portfolio-system.yml`: extend the existing Sprint 8 planning chain into the first assembled experience proof
- `content/plans/experiences/ai-second-renaissance.yml`: add the second distinct experience required by Sprint 9
- `content/plans/modules/`: add the module briefs needed for the new experience-level proof path
- `content/briefs/visuals/`: add at least one illustration brief, one diagram brief, and one deterministic chart or graph brief
- `content/drafts/visuals/`: add working visual draft examples tied to the chosen units
- `content/visuals/<visual-id>/versions/<version>/`: add immutable visual versions with version-owned assets and spec files
- `content/experiences/`: add file-backed experience assembly artifacts for the new experiences while keeping `phase-1-baseline.json` valid
- `content/releases/`: add release fixtures or file-backed proof manifests that exercise the new experience and visual compatibility path without changing the published phase-1 baseline by accident

### Update runtime integration only after the selection layer is stable

- `app/`: update routes only where new selected units or visuals must be rendered as proof of Sprint 9 behavior
- `app/sitemap.ts`, shared navigation surfaces, and `.lighthouserc.js`: keep route scope derived from the same selected release once new experience-visible routes are introduced
- `package.json`: add only minimal script-surface updates if Sprint 9 truly needs them; keep workflow logic in typed application code rather than script sprawl

## Phase-by-phase execution plan

Use these phases as the recommended implementation order and commit rhythm. Each phase should leave the repo in a valid intermediate state instead of depending on one oversized integration patch.

### Phase 1. Experience and visual artifact scaffolding

Primary work:

- add `lib/source-experience-workflow.ts` with typed readers and validators for file-backed experience assembly artifacts
- add `lib/visual-asset-workflow.ts` with the initial `VisualBrief`, `VisualDraft`, and `VisualSpecVersion` models plus version-owned asset-path rules
- add the first checked-in Sprint 9 planning and content artifacts under `content/plans/experiences/`, `content/plans/modules/`, `content/briefs/visuals/`, and `content/drafts/visuals/`

Task-by-task build order:

1. Add typed artifact shapes and parsing helpers for file-backed experience and visual artifacts.
2. Add the first checked-in experience and visual planning examples that those helpers must parse.
3. Add focused unit coverage proving the new helpers read and validate the checked-in examples.

Completion gate:

- new workflow modules parse the checked-in Sprint 9 examples successfully
- no runtime route or CLI behavior changes yet

Validation commands:

- `npm run test -- tests/unit/source-experience-workflow.test.ts tests/unit/visual-workflow.test.ts`
- `npm run typecheck`
- `npm run lint`

Recommended commit boundary:

- `sprint-9 scaffold experience and visual artifacts`

### Phase 2. Selection and resolver layer

Primary work:

- extend `lib/site-release.ts` to validate file-backed experience and approved visual references
- add `lib/site-visual-resolver.ts`
- add or extend focused tests such as `tests/unit/source-experience-workflow.test.ts`, `tests/unit/site-release.test.ts`, and `tests/unit/site-visual-resolver.test.ts`

Task-by-task build order:

1. Extend release-selection types and schema validation to understand file-backed experience and visual references.
2. Add the visual resolver and any experience-selection helper functions required by release resolution.
3. Extend unit coverage to prove fixture-backed and file-backed references coexist without ambiguous precedence.

Completion gate:

- selected-release resolution can prove shared experience, unit, and visual selection behavior through unit tests
- the current published `phase-1-baseline-release` still validates unchanged

Validation commands:

- `npm run test -- tests/unit/source-experience-workflow.test.ts tests/unit/site-release.test.ts tests/unit/site-visual-resolver.test.ts`
- `npm run site:validate`
- `npm run typecheck`
- `npm run lint`

Recommended commit boundary:

- `sprint-9 add experience and visual selection resolution`

### Phase 3. Visual lifecycle core

Primary work:

- implement visual lifecycle helpers for `start`, `show`, `freeze`, `generate`, `request-review`, `review`, `revise`, and `approve`
- add immutable visual-version directories under `content/visuals/<visual-id>/versions/<version>/`
- prove one illustration workflow, one diagram workflow, and one deterministic chart or graph workflow
- add focused lifecycle coverage in `tests/unit/visual-workflow.test.ts`

Task-by-task build order:

1. Implement visual draft and version lifecycle helpers through freeze and show behavior.
2. Add generation metadata and version-owned asset-path support.
3. Add review, revise, and approve behavior with append-only review records.
4. Add checked-in proof artifacts for one illustration, one diagram, and one deterministic chart or graph.
5. Extend lifecycle tests to cover mutation boundaries, asset ownership, and deterministic chart enforcement.

Completion gate:

- visual lifecycle tests pass for version creation, generation, review, approval, and version-owned assets
- deterministic chart or graph rules are enforced explicitly rather than by convention

Validation commands:

- `npm run test -- tests/unit/visual-workflow.test.ts tests/unit/site-visual-resolver.test.ts`
- `npm run typecheck`
- `npm run lint`

Recommended commit boundary:

- `sprint-9 implement visual lifecycle and asset ownership`

### Phase 4. CLI and orchestration wiring

Primary work:

- extend `scripts/site.ts` with the visual command group and any bounded experience-assembly commands supported by the new workflow modules
- record new mutating operations through `lib/agentic-orchestration.ts`
- update `docs/_specs/educational-design-system/cli-command-surface.md` only if implementation clarifies or narrows the already approved command model

Task-by-task build order:

1. Add CLI parsing helpers and command handlers for the visual lifecycle surface.
2. Add any bounded experience-assembly commands only after the underlying typed helpers exist.
3. Record new mutating paths in the orchestration ledger with locks where overlap would be unsafe.
4. Reconcile command-surface documentation only after the implementation behavior is explicit.

Completion gate:

- the new CLI commands operate against checked-in Sprint 9 artifact examples
- orchestration history captures the new mutating paths with locks where overlap would be unsafe

Validation commands:

- `npm run test -- tests/unit/visual-workflow.test.ts tests/unit/source-experience-workflow.test.ts`
- `npm run site -- validate schema`
- `npm run site -- validate workflow`
- `npm run typecheck`
- `npm run lint`

Recommended commit boundary:

- `sprint-9 wire cli and orchestration for visual workflow`

### Phase 5. Runtime proof and export-safe integration

Primary work:

- update `app/`, `app/sitemap.ts`, shared navigation surfaces, and any release-derived route scope only where the new experience and visual selection path must be rendered as proof
- extend browser coverage where new routes or visual surfaces become externally visible
- keep `.lighthouserc.js` aligned with the same selected-release route source of truth

Task-by-task build order:

1. Switch any new proof routes to selected-release-driven experience, unit, and visual resolution.
2. Update sitemap, navigation, and Lighthouse route derivation only after the runtime proof path is stable.
3. Add or extend browser coverage for the new externally visible route and visual behavior.

Completion gate:

- the new experience and visual proof surfaces render from the selected-release path instead of a second hard-coded content path
- exported-site validation still uses one explicit release-selected route scope

Validation commands:

- `npm run test:browser -- tests/browser/site-release.spec.ts`
- `npm run test:browser -- tests/browser/accessibility.spec.ts`
- `npm run typecheck`
- `npm run lint`

Recommended commit boundary:

- `sprint-9 integrate runtime proof routes and release-derived navigation`

### Phase 6. Full validation and QA record

Primary work:

- run schema, workflow, release, test, browser, and Lighthouse validation against the new compatibility path and the existing published baseline
- write `docs/_qa/implementation/sprints/sprint-9-experience-assembly-and-visual-studio.implementation-qa.md`
- update any repo status docs that changed materially during implementation

Task-by-task build order:

1. Run the focused unit suites introduced earlier in the sprint.
2. Run the repo-level static checks and full unit suite.
3. Run browser validation against the root-path selected-release surface.
4. Run Lighthouse against the exported artifact.
5. If Sprint 9 changes route scope materially, repeat browser and Lighthouse checks in GitHub Pages-style base-path mode.
6. Write the implementation QA artifact only after the evidence is complete.

Completion gate:

- Sprint 9 implementation evidence is durable and explicit in the implementation QA artifact
- the published baseline still passes validation after the Sprint 9 additions land

Validation commands:

- `npm run test -- tests/unit/source-experience-workflow.test.ts tests/unit/visual-workflow.test.ts tests/unit/site-release.test.ts tests/unit/site-visual-resolver.test.ts`
- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run test:browser`
- `npm run lighthouse`
- `NEXT_PUBLIC_BASE_PATH=/education_design NEXT_PUBLIC_SITE_URL=https://kaw393939.github.io npm run test:browser`
- `NEXT_PUBLIC_BASE_PATH=/education_design NEXT_PUBLIC_SITE_URL=https://kaw393939.github.io npm run lighthouse`

Recommended commit boundary:

- `sprint-9 finalize validation and implementation qa`

## Work checklist

1. Keep sources, units, visuals, experiences, and releases file-backed and Git-reviewable; SQLite may record operations but must not become the publishing truth.
2. Make experience assembly explicit through checked-in artifacts rather than hard-coded route imports or implicit latest-content selection.
3. Preserve the current published `phase-1-baseline-release` baseline while new experience and visual paths are introduced incrementally.
4. Keep illustration, diagram, and chart or graph behavior distinct so deterministic evidence graphics are never routed through a generative raster-only path.
5. Ensure every frozen visual version owns its generated assets and can be rebuilt or reviewed without mutating earlier version directories.
6. Allow shared units or visuals to appear in more than one experience, but require each experience and release to choose explicit approved references.
7. Record mutating experience and visual operations in durable orchestration history so failures, retries, and blocked states remain inspectable.

## Positive tests

- two different experiences can be assembled from shared research inputs without duplicating canonical source files or forking the entire approved unit library
- selected-release validation can resolve experience-specific approved unit and visual references while preserving explicit experience and release selection
- `site visual start` creates a working draft from an existing `VisualBrief` and owning unit context
- `site visual freeze`, `site visual generate`, `site visual review`, and `site visual approve` produce explicit immutable versions, version-owned assets, and append-only review records
- deterministic charts or graphs remain code-driven and reviewable rather than relying on generative raster output
- the current published baseline still validates and builds after the new experience and visual compatibility paths land

## Negative tests

- no experience assembly path silently defaults to the latest approved unit or visual when an explicit versioned reference is required
- no chart or graph workflow uses a generative raster provider as its canonical factual output path
- no visual freeze or generate step mutates assets owned by a prior visual version
- no working visual draft or unapproved visual version can appear in a release or production build
- no second experience implementation breaks the existing published phase-1 selection, sitemap, or Lighthouse route scope

## Edge-case checks

- the same approved unit appearing in more than one experience with different release-level selections
- the same source document contributing to more than one experience without ambiguous lineage
- regenerated visual output requiring a new visual version and a new asset directory rather than in-place overwrite
- missing provider, missing unit linkage, or missing accessibility text on a visual draft or version failing explicitly
- fixture-backed and file-backed visual or experience resolution coexisting during migration without ambiguous precedence

## Accessibility checks

- visual artifacts preserve alt text, caption, and long-description fields explicitly instead of burying accessibility state in prompts or freeform notes
- diagram and chart outputs remain legible on mobile and desktop and keep text alternatives available for later route rendering
- local CLI output for experience and visual operations remains plain-text readable and inspectable in the terminal

## Export and deploy checks

- selected-release validation and build remain explicit about experience and release selection even when more than one experience is available
- file-backed experience and visual introduction must not weaken static export, GitHub Pages-style base-path proof, or deterministic Lighthouse gating
- production builds continue to ignore working drafts, local orchestration files, and any non-approved visual artifacts

## Out of scope

- multi-agent critique orchestration beyond the explicit visual and experience workflow needed for this sprint
- release diffing, promotion, or publish automation beyond the current selected-release baseline
- public observatory route consumption of experience-assembly or visual-workflow state
- full migration of every existing fixture-backed unit, visual, experience, and release artifact in a single sprint
- live editing tools or design-studio UIs that bypass the checked-in file workflow

## Exit criteria

Sprint 9 is done when at least two distinct experiences can be expressed through checked-in planning and assembly artifacts, the repo has a real file-backed visual lifecycle with explicit immutable versions and version-owned assets, deterministic charts remain deterministic, and selected-release validation and build still preserve the published baseline while accepting the new experience and visual compatibility path.
