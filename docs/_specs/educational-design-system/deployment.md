# Educational Design System Deployment and Static Export Spec

## Purpose

Define the phase-1 deployment baseline for a static-first Next.js educational site intended for GitHub Pages.

The goal is to preserve the reference repo's export discipline while aligning the build and deployment path to the repaired content model: explicit experiences, explicit release manifests, approved unit versions, and approved visual versions.

## Active deployment doctrine

1. The site must remain static-first and GitHub-Pages-friendly.
2. Production builds must be driven by an explicit `experience` plus an explicit `release`.
3. Production builds may never consume working drafts.
4. Only approved unit versions and approved visual versions may appear in a published release.
5. The same release manifest must reproduce the same site output.

## Reference baseline

The museum repo already demonstrates the correct static-export direction:

- `output: "export"` in `next.config.ts`
- `trailingSlash: true`
- `basePath` driven by `NEXT_PUBLIC_BASE_PATH`
- `images.unoptimized: true`
- GitHub Actions deployment to Pages
- Lighthouse CI against the exported `out` directory

Phase 1 should retain this baseline while making the build path release-aware.

Lighthouse should be treated as a deterministic exported-site gate, not as an informal dev-server spot check.

## Build inputs

A production build should have exactly these controlling inputs:

1. one `ExperienceConfig`
2. one `ReleaseManifest`
3. the approved `UnitVersion` files referenced by that release
4. the approved `VisualSpecVersion` files referenced by that release
5. build-time environment such as `NEXT_PUBLIC_BASE_PATH`

If any required input is missing, unapproved, or inconsistent, the build must fail.

## Static export strategy

1. Use Next.js App Router with static export enabled.
2. Prefer static routes and static content generation.
3. If dynamic segment routes are introduced later, they must be backed by `generateStaticParams` or equivalent export-safe generation.
4. Do not rely on server actions, runtime-only APIs, or backend data fetching for core educational flows.
5. Build artifacts must emit to `out/` and remain deployable as a static site.

## Release-manifest-driven build model

### Required behavior

1. Select an experience id and a release id explicitly.
2. Validate the release manifest before build.
3. Resolve the unit and visual versions referenced by the release.
4. Reject any reference to:
   - working drafts
   - unapproved versions
   - retired versions
   - missing assets
5. Build only the pages and navigation defined by the selected experience and release.

### Recommended build flow

```text
validate schema
-> validate workflow
-> validate release <release-id>
-> validate observatory [--visibility all]
-> build experience <experience-id> --release <release-id>
-> export observatory --visibility public
-> run checks against exported output
-> publish artifact
```

## Observable-state export baseline

Phase 3 adds a generated observable-state bundle layer that remains local and build-time-only until public observatory routes consume it.

Required behavior:

1. Validate observable-state bundles before treating them as publishable evidence.
2. Write generated bundles under `.site/observable-state/public/` and `.site/observable-state/maintainer/`.
3. Keep observable-state output outside `out/` until a later sprint explicitly wires route generation to those files.
4. Preserve public redaction even when maintainer bundles retain richer local orchestration detail.
5. Keep observable-state export optional for deployment until Sprint 12 lands the public observatory route family.

## Routing and URL rules

1. Internal navigation must work with `trailingSlash: true`.
2. The site must support repository-based hosting via `NEXT_PUBLIC_BASE_PATH`.
3. Links should be written and tested under both root-path and base-path assumptions.
4. Route generation, navigation, sitemap entries, and internal links must derive from the selected experience and release, not from all files present in content directories.
5. Recipe pages and exemplar pages should avoid patterns that break static hosting, such as runtime-generated navigation trees.

## Base-path and custom-domain strategy

### Repository-hosted mode

- Use `NEXT_PUBLIC_BASE_PATH` for the repository path, for example `/educational-design-system`.
- Build and deploy with that base path set in CI.
- Validate internal links, sitemap entries, and asset URLs against the repository path.

### Custom-domain mode

- Keep the application capable of running with an empty base path.
- If a custom domain is added later, document the required CNAME and environment handling.
- Do not hardcode repository names into components, content, or manifests.

## Asset handling

1. Use `next/image` only in export-safe mode with `unoptimized: true`.
2. Keep local assets in `public/` when possible only for shared static assets that are not versioned publishing artifacts.
3. Versioned visual artifacts should be resolved from the content/visuals version structure during build.
4. Remote images should be explicitly allowlisted.
5. Any preprocessing step must produce deterministic output for a given approved visual version.
6. Media blocks must degrade gracefully when remote assets are unavailable.

## Metadata, navigation, sitemap, and robots

1. `robots.ts` and `sitemap.ts` should remain static-safe.
2. Sitemap generation must include only the routes present in the selected experience and release.
3. Navigation structures should derive from the selected `ExperienceConfig` and selected release manifest.
4. Base-path handling must be reflected in canonical URL generation where relevant.
5. If the project begins as documentation-only, sitemap scope should match the routes actually published.

## CI workflow outline

The release model should be enforced in CI.

### Pull requests

Run these gates on every pull request:

1. format check
2. lint
3. type check
4. unit tests
5. browser smoke tests where feasible
6. validate schema
7. validate workflow
8. validate release `<release-id>` for the target experience
9. validate observatory
10. static build with export settings

### Push to main

Run all quality gates, then:

1. build the selected experience with explicit `experience` and `release` ids
2. set `NEXT_PUBLIC_BASE_PATH`
3. validate or export the observable-state bundle if the change touches observability or route-consumption logic
4. run Lighthouse CI against the exported output using the committed config
5. upload `out/` as the Pages artifact
6. deploy only after the quality job passes

## Minimum CI gates for phase 1

1. `npm run format:check`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run test`
5. `npm run site -- validate schema`
6. `npm run site -- validate workflow`
7. `npm run site -- validate release <release-id>`
8. `npm run site -- validate observatory`
9. `npm run site -- build experience <experience-id> --release <release-id>`
10. `npm run lighthouse`

Recommended additions during implementation:

- `npm run test:browser`
- link-integrity check against exported output
- explicit manifest-to-route sanity check
- `npm run site -- export observatory --visibility public`

## Lighthouse policy

1. Lighthouse must run against the exported `out/` directory served locally or in CI, never against the development server as the release gate.
2. The Lighthouse configuration must be committed so local and CI runs use the same categories, thresholds, and collection settings.
3. Phase-1 blocking categories should be accessibility, best-practices, and seo.
4. Performance may be recorded and tracked, but should remain non-blocking until the project adopts stable budgets and a stable enough runtime environment.
5. Lighthouse evidence should be summarized in the relevant implementation QA or release QA artifact.

## Environment and selection rules

Production and CI builds should use explicit environment or workflow inputs such as:

- `SITE_EXPERIENCE_ID`
- `SITE_RELEASE_ID`
- `NEXT_PUBLIC_BASE_PATH`

These values should be visible in workflow configuration, not hidden behind implicit defaults.

## Sprint 6 maintainer verification routine

Use the same selected-release inputs locally and in CI so baseline proof is reproducible.

Root-path verification:

1. `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run site:validate`
2. `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run typecheck`
3. `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run lint`
4. `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run test`
5. `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release CI=1 npm run test:browser`
6. `SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run lighthouse`

Repository base-path verification:

1. `NEXT_PUBLIC_BASE_PATH=/education_design NEXT_PUBLIC_SITE_URL=https://kaw393939.github.io SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release CI=1 npm run test:browser`
2. `NEXT_PUBLIC_BASE_PATH=/education_design NEXT_PUBLIC_SITE_URL=https://kaw393939.github.io SITE_EXPERIENCE_ID=phase-1-baseline SITE_RELEASE_ID=phase-1-baseline-release npm run lighthouse`

If any step fails, do not treat the baseline as locked until the relevant implementation QA artifact records a clean rerun.

## Failure conditions

The deployment baseline fails if any of the following become true:

- pages require a server runtime for core content
- asset URLs break under a repository base path
- internal links fail after export
- the selected release references working drafts or unapproved versions
- sitemap or navigation includes routes not present in the selected release
- Lighthouse accessibility falls below the agreed threshold
- Lighthouse gating is run against a dev server instead of the exported artifact
- example pages render correctly in dev but fail in `out/`
- the same release manifest does not reproduce the same output

## Implementation rules for engineers

1. Treat export safety as a design constraint, not a final deployment concern.
2. Keep route assumptions obvious and documented.
3. Avoid introducing data loaders or component patterns that only work in development.
4. Validate the exported site, not only the dev server behavior.
5. Treat manifest validation as part of the build path, not a separate administrative step.

## Acceptance criteria

- The educational design system builds to static output cleanly.
- Internal links and assets resolve under a base path.
- Exemplar pages are represented in sitemap and navigation through the selected release.
- CI blocks deployment when quality gates fail.
- CI cannot publish content that was not approved into a release manifest.
- The same approved release can be rebuilt reproducibly by another maintainer.
