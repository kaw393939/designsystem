# Sprint 9 Implementation QA

## Scope

Sprint 9 is now implemented as a file-backed compatibility path that adds:

- two checked-in experience assemblies:
  - `identity-portfolio-system`
  - `ai-second-renaissance`
- explicit file-backed release manifests for those experiences
- file-backed visual lifecycle commands and approved visual versions
- selected-release visual resolution for `visual-id@version`
- runtime proof routes that render approved file-backed visuals while remaining build-safe under the baseline release

The published `phase-1-baseline-release` remains valid and unchanged as the default selected release.

## Implemented Artifacts

### Experience assembly

- `content/experiences/identity-portfolio-system.json`
- `content/experiences/ai-second-renaissance.json`
- `content/releases/identity-portfolio-system-proof-release.json`
- `content/releases/ai-second-renaissance-proof-release.json`

### File-backed unit proof

- `choose-primary-archetype@v2026-04-05T031355Z`
- `print-to-ai-knowledge-shift@v2026-04-05T031410Z`

### File-backed visual proof

- `archetype-signal-map@v2026-04-05T031424Z`
- `renaissance-to-ai-hero@v2026-04-05T031424Z`
- `ai-labor-demand-chart@v2026-04-05T031424Z`

Those visual versions include version-owned assets under `content/visuals/<visual-id>/versions/<version>/` plus append-only review records under `content/reviews/visuals/`.

## QA Evidence

### Focused unit suites

Command:

```bash
npm run test -- tests/unit/source-experience-workflow.test.ts tests/unit/source-unit-workflow.test.ts tests/unit/visual-workflow.test.ts tests/unit/site-release.test.ts tests/unit/site-visual-resolver.test.ts
```

Result:

- passed
- `5` files
- `28` tests

### Standard validation chain

Command:

```bash
npm run site:validate
```

Result:

- schema validation passed
- workflow validation passed
- default release validation passed for `phase-1-baseline-release`
- default visual validation passed for `phase-1-baseline-release`

### Explicit Sprint 9 release validation

Commands:

```bash
npm run site -- validate release identity-portfolio-system-proof-release --experience identity-portfolio-system
npm run site -- validate visuals identity-portfolio-system --release identity-portfolio-system-proof-release
npm run site -- validate release ai-second-renaissance-proof-release --experience ai-second-renaissance
npm run site -- validate visuals ai-second-renaissance --release ai-second-renaissance-proof-release
```

Result:

- all four commands passed

### Typecheck, full unit suite, and lint

Commands:

```bash
npm run typecheck
npm run test
npm run lint
```

Result:

- typecheck passed
- full unit suite passed
- lint passed

### Baseline browser and Lighthouse validation

Commands:

```bash
npm run test:browser
npm run lighthouse
```

Result:

- default browser suite passed
- proof-route browser suite skipped under the default baseline by design
- baseline Lighthouse run passed for the selected published phase-1 route scope

### Sprint 9 proof-route browser validation

Commands:

```bash
SITE_EXPERIENCE_ID=identity-portfolio-system SITE_RELEASE_ID=identity-portfolio-system-proof-release npx playwright test tests/browser/experience-proof.spec.ts --project=desktop-chrome
SITE_EXPERIENCE_ID=ai-second-renaissance SITE_RELEASE_ID=ai-second-renaissance-proof-release npx playwright test tests/browser/experience-proof.spec.ts --project=desktop-chrome
```

Result:

- identity proof route passed
- AI proof route passed

### GitHub Pages-style base-path validation

Commands:

```bash
NEXT_PUBLIC_BASE_PATH=/education_design NEXT_PUBLIC_SITE_URL=https://kaw393939.github.io SITE_EXPERIENCE_ID=identity-portfolio-system SITE_RELEASE_ID=identity-portfolio-system-proof-release npx playwright test tests/browser/experience-proof.spec.ts --project=desktop-chrome
NEXT_PUBLIC_BASE_PATH=/education_design NEXT_PUBLIC_SITE_URL=https://kaw393939.github.io SITE_EXPERIENCE_ID=ai-second-renaissance SITE_RELEASE_ID=ai-second-renaissance-proof-release npx playwright test tests/browser/experience-proof.spec.ts --project=desktop-chrome
NEXT_PUBLIC_BASE_PATH=/education_design NEXT_PUBLIC_SITE_URL=https://kaw393939.github.io SITE_EXPERIENCE_ID=identity-portfolio-system SITE_RELEASE_ID=identity-portfolio-system-proof-release npm run lighthouse
NEXT_PUBLIC_BASE_PATH=/education_design NEXT_PUBLIC_SITE_URL=https://kaw393939.github.io SITE_EXPERIENCE_ID=ai-second-renaissance SITE_RELEASE_ID=ai-second-renaissance-proof-release npm run lighthouse
```

Result:

- both proof-route browser checks passed in base-path mode
- both proof-release Lighthouse runs passed in base-path mode

## Key Integration Fixes Verified

- `lib/site-release.ts` now loads live checked-in experience and release files and resolves file-backed visual references alongside file-backed unit references.
- `lib/site-visual-resolver.ts` resolves selected-release visuals into renderable assets and supports explicit `visual-id@version` references.
- `components/educational-primitives.tsx` now renders approved file-backed visual assets when the selected release provides them and falls back to placeholders otherwise.
- selected-unit routes are guarded so alternative releases remain build-safe instead of failing static generation for routes that are out of scope.
- `.lighthouserc.js` now loads release manifests dynamically from `content/releases/` rather than hard-coding only the phase-1 baseline files.
- `lib/observable-state.ts` now understands file-backed unit and visual references and no longer reports false missing-reference errors when Sprint 9 proof releases are present.

## Residual Notes

- The baseline `app/page.tsx` content remains the historical phase-1 overview proof. Sprint 9 adds experience-specific proof routes rather than replacing the root landing page.
- Proof-route browser coverage is explicit and env-gated so the default baseline suite stays stable while alternative selected releases are still testable.

## Conclusion

Sprint 9 now satisfies its implementation goal: two distinct experiences can be assembled from checked-in files, approved file-backed visuals can be resolved and rendered through selected releases, the visual lifecycle is executable through the site CLI with orchestration history, and the baseline export path remains valid while the new compatibility path is exercised by tests, browser runs, and Lighthouse in both root-path and base-path modes.