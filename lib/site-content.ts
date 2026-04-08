export const readingOrder = [
  "docs/_specs/README.md",
  "docs/_specs/educational-design-system/spec.md",
  "docs/_specs/educational-design-system/operating-runbook.md",
  "docs/_specs/educational-design-system/planning-qa-spec.md",
  "Relevant domain spec or sprint brief",
  "Latest relevant QA artifact under docs/_qa/",
];

export const operatingLoop = [
  "Update the active spec or sprint document.",
  "Create or update the planning QA artifact.",
  "Resolve planning findings until approved.",
  "Implement the work.",
  "Create or update the implementation QA artifact.",
  "Resolve implementation findings until approved.",
  "Create release QA when the work is releasable.",
  "Publish only after release validation passes.",
];

export const completedItems = [
  "Foundation architecture spec set",
  "Sprint plan and sprint briefs",
  "Workflow and publishing-model specs",
  "QA directory structure and templates",
  "Operating runbook and QA artifact rules",
  "Initial planning QA artifacts",
  "Next.js static-export scaffold",
  "Committed Lighthouse config and runnable scripts",
  "Sprint 1 semantic token system and documentation route",
  "GitHub Actions quality and Pages deployment workflows",
  "Validated local quality pass after Sprint 1 token and routing changes",
  "Sprint 2 layout primitives and shared page shells",
  "Layout guide plus module, lesson, and reading-map proof routes",
  "Validated root-path and GitHub Pages-style base-path QA after Sprint 2 layout changes",
  "Sprint 3 educational primitives and normalized render-contract types",
  "Unit-driven renderer plus the /primitives guide route",
  "Concept, assignment, and reading-map block examples rendered from structured unit payloads",
  "Sprint 4 recipe checks and checked-in approved example units",
  "Recipe guide plus dedicated concept and lesson exemplar routes",
  "Validated root-path and GitHub Pages-style base-path QA after Sprint 4 recipe changes",
  "Sprint 5 checked-in experience and release examples for selected static export",
  "Selected-release metadata, primary navigation, sitemap, and Lighthouse route scope",
  "Validated fresh out artifacts in root-path and GitHub Pages-style base-path modes after Sprint 5 export changes",
  "Sprint 6 accessibility smoke audits and keyboard-focus fixes",
  "Reduced-motion and forced-colors coverage on representative long-form routes",
  "Documented root-path and GitHub Pages-style maintainer verification routine",
  "Canonical `/tour/*`, `/browse/*`, and `/examples/*` route families with legacy continuity wrappers kept reachable but out of sitemap where they formerly looked canonical",
  "Sprint 4 instructor-guide alignment, support-route cleanup, flat-wrapper continuity handoffs, and selected-release continuity notes for the route-family IA",
  "Focused browser and unit validation for the route-family IA, selected release, and selected sitemap surface",
];

export const pendingItems = [
  "Release QA for a publishable selected release candidate",
  "Full file-based approved-unit and release-manifest workflow beyond the current Sprint 5 selected example",
  "Approved content and visual version flow",
  "Release QA artifacts tied to real release manifests",
];

export const qualityBars = [
  "Test the exported site, not the dev server.",
  "Pick the experience and release explicitly before exporting.",
  "Run Lighthouse against the exported output.",
  "Accessibility, best practices, and SEO are the first gate — nothing ships without passing those.",
  "Watch performance scores, but do not fake confidence before the budgets are stable.",
  "Guide and example pages need passing accessibility audits before you trust them.",
  "Keep skip links, heading order, reduced motion, and high-contrast states in your browser testing.",
  "Rebuild the export from scratch before previewing or running Lighthouse.",
  "Run base-path checks in CI so deploys to GitHub Pages do not break unexpectedly.",
];

export const automationNotes = [
  "The quality workflow checks schema, workflow state, and the selected release before running typecheck, tests, and Lighthouse.",
  "Browser tests include accessibility audits plus keyboard, reduced-motion, and forced-colors checks on the longest lesson page.",
  "The Pages workflow rebuilds the selected experience and release with the correct base path before deploying.",
  "Both Playwright and Lighthouse read the current base path, while the build selection stays explicit through environment variables.",
];

export const topLevelCards = [
  {
    title: "System",
    description:
      "One place for tokens, layouts, lessons, recipes, releases, and accessibility checks — so the site feels coherent instead of stitched together.",
  },
  {
    title: "Process",
    description:
      "Read the specs, plan the work, build it, review it, approve it, then publish. Files are the source of truth.",
  },
  {
    title: "Verification",
    description:
      "Typecheck, Playwright tests, and Lighthouse audits keep the live site honest.",
  },
];
