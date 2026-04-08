import { describe, expect, it } from "vitest";

import type { SiteSelectionData } from "@/lib/site-release";
import {
  assertValidSiteSelection,
  getSelectedSiteMetadata,
  getSiteSelectionFixtures,
  resolveSiteSelection,
} from "@/lib/site-release";

const identityReleaseRouteIds = [
  "overview",
  "tour",
  "tour-signal",
  "tour-archetype",
  "tour-style",
  "tour-proof",
  "tour-build",
  "tour-publish",
  "browse",
  "browse-archetypes",
  "browse-design-lineages",
  "browse-attention-trust",
  "browse-sources",
  "examples",
  "examples-proof-blocks",
  "examples-student-exemplars",
  "examples-module",
  "examples-lesson",
  "examples-reading-map",
  "instructor-guide",
  "tokens",
  "layouts",
  "recipes",
  "process",
  "status",
];

const identityNonPublicSelectedRouteIds = [
  "archetypes",
  "design-styles",
  "persuasion",
  "experience-identity-portfolio",
  "experience-identity-portfolio-signal",
  "experience-identity-portfolio-style",
  "experience-identity-portfolio-proof",
  "experience-identity-portfolio-build",
  "experience-identity-portfolio-publish",
  "experience-identity-portfolio-diagnose",
  "experience-identity-portfolio-examples",
  "experience-identity-portfolio-labs-archetypes",
  "experience-identity-portfolio-labs-psychology",
  "experience-identity-portfolio-labs-persuasion",
  "experience-identity-portfolio-system-map",
  "experience-identity-portfolio-sources",
];

const identitySelectedRouteIds = [
  ...identityReleaseRouteIds,
  ...identityNonPublicSelectedRouteIds,
];

describe("site release selection", () => {
  it("selects the identity course release and derives navigation plus audit routes", () => {
    const context = assertValidSiteSelection();

    expect(context.experience.id).toBe("identity-portfolio-system");
    expect(context.release.id).toBe("identity-portfolio-system-proof-release");
    expect(context.primaryNavRoutes.map((route) => route.id)).toEqual([
      "overview",
      "tour",
      "browse",
      "examples",
      "instructor-guide",
    ]);
    expect(context.sitemapRoutes.map((route) => route.id)).toEqual(
      identityReleaseRouteIds,
    );
    expect(context.auditRoutes).toHaveLength(context.sitemapRoutes.length);
    expect(context.routes.map((route) => route.id)).toContain(
      "experience-identity-portfolio-signal",
    );
    expect(context.sitemapRoutes.map((route) => route.id)).not.toContain(
      "experience-identity-portfolio-signal",
    );
    expect(getSelectedSiteMetadata()).toEqual({
      title: "Identity Portfolio System",
      description:
        "Selected-release proof for the identity portfolio experience with file-backed unit and diagram assembly.",
    });
  });

  it("supports a reduced release while keeping navigation derivation explicit", () => {
    const context = assertValidSiteSelection({
      experienceId: "phase-1-baseline",
      releaseId: "phase-1-compact-release",
    });

    expect(context.primaryNavRoutes.map((route) => route.id)).toEqual([
      "overview",
      "tokens",
      "primitives",
      "recipes",
    ]);
    expect(context.sitemapRoutes.map((route) => route.id)).not.toContain(
      "status",
    );
    expect(context.routes.map((route) => route.id)).toContain(
      "recipes-feedback-loops",
    );
  });

  it("fails when a selected route is missing a required unit fixture", () => {
    const data = structuredClone(
      getSiteSelectionFixtures(),
    ) as SiteSelectionData;
    const release = data.releases.find(
      (entry) => entry.id === "phase-1-baseline-release",
    );

    if (!release) {
      throw new Error("Expected baseline release fixture to exist.");
    }

    release.unitVersions = release.unitVersions.filter(
      (unitId) => unitId !== "recipe-lesson-public-space-observation",
    );

    const result = resolveSiteSelection({
      data,
      experienceId: "phase-1-baseline",
      releaseId: release.id,
    });

    expect(result.isValid).toBe(false);
    expect(
      result.issues.some((issue) => issue.code === "missing_required_unit"),
    ).toBe(true);
  });

  it("fails when a release references an unresolved visual fixture", () => {
    const data = structuredClone(
      getSiteSelectionFixtures(),
    ) as SiteSelectionData;
    const release = data.releases.find(
      (entry) => entry.id === "phase-1-baseline-release",
    );

    if (!release) {
      throw new Error("Expected baseline release fixture to exist.");
    }

    release.visualVersions = [
      ...release.visualVersions,
      "unknown-visual-fixture",
    ];

    const result = resolveSiteSelection({
      data,
      experienceId: "phase-1-baseline",
      releaseId: release.id,
    });

    expect(result.isValid).toBe(false);
    expect(
      result.issues.some((issue) => issue.code === "unknown_release_visual"),
    ).toBe(true);
  });

  it("fails when a selected release depends on an unapproved visual fixture", () => {
    const data = structuredClone(
      getSiteSelectionFixtures(),
    ) as SiteSelectionData;
    const visual = data.registry.approvedVisuals.find(
      (entry) => entry.id === "feedback-loop-park-system",
    );

    if (!visual) {
      throw new Error("Expected recipe visual fixture to exist.");
    }

    visual.status = "review_requested";

    const result = resolveSiteSelection({
      data,
      experienceId: "phase-1-baseline",
      releaseId: "phase-1-baseline-release",
    });

    expect(result.isValid).toBe(false);
    expect(
      result.issues.some((issue) => issue.code === "unapproved_release_visual"),
    ).toBe(true);
  });

  it("resolves approved file-backed unit references during release selection", () => {
    const data = structuredClone(
      getSiteSelectionFixtures(),
    ) as SiteSelectionData;

    data.registry.routes.push({
      id: "recipes-file-backed-proof",
      href: "/recipes/file-backed-proof/",
      title: "File-backed Proof Page",
      includeInPrimaryNav: false,
      includeInSitemap: true,
      requiredUnitIds: ["choose-primary-archetype"],
    });
    data.releases.push({
      schema: "release/v1",
      id: "phase-1-file-backed-proof",
      experience: "phase-1-baseline",
      createdAt: "2026-04-05T14:00:00Z",
      routeIds: ["overview", "recipes-file-backed-proof"],
      unitVersions: ["choose-primary-archetype@v2026-04-05T120000Z"],
      visualVersions: [],
      status: "approved",
      notes: "Proof release for file-backed Sprint 8 unit resolution.",
    });

    const result = resolveSiteSelection({
      data,
      experienceId: "phase-1-baseline",
      releaseId: "phase-1-file-backed-proof",
      workspaceRoot: process.cwd(),
    });

    expect(result.isValid).toBe(true);
    expect(result.resolvedUnitSelections).toEqual([
      {
        reference: "choose-primary-archetype@v2026-04-05T120000Z",
        unitId: "choose-primary-archetype",
        version: "v2026-04-05T120000Z",
        kind: "concept",
        status: "approved",
        source: "file-backed",
      },
    ]);
  });

  it("loads and validates the checked-in identity proof release with file-backed visuals", () => {
    const result = resolveSiteSelection({
      experienceId: "identity-portfolio-system",
      releaseId: "identity-portfolio-system-proof-release",
      workspaceRoot: process.cwd(),
    });

    expect(result.isValid).toBe(true);
    expect(result.routes.map((route) => route.id)).toEqual(identitySelectedRouteIds);
    expect(result.sitemapRoutes.map((route) => route.id)).toEqual(identityReleaseRouteIds);
    expect(result.resolvedUnitSelections).toEqual([
      {
        reference: "choose-primary-archetype@v2026-04-05T031355Z",
        unitId: "choose-primary-archetype",
        version: "v2026-04-05T031355Z",
        kind: "concept",
        status: "approved",
        source: "file-backed",
      },
    ]);
    expect(result.resolvedVisualSelections).toEqual([
      {
        reference: "archetype-signal-map@v2026-04-05T031424Z",
        visualId: "archetype-signal-map",
        version: "v2026-04-05T031424Z",
        status: "approved",
        source: "file-backed",
        visualClass: "diagram",
        provider: "mermaid",
        assetRefs: ["diagram.mmd", "diagram.svg"],
      },
    ]);
  });

  it("keeps only the chosen non-public continuity surfaces selected in the identity release", () => {
    const context = assertValidSiteSelection();
    const routeIds = context.routes.map((route) => route.id);
    const nonPublicRouteIds = routeIds.filter(
      (routeId) => !context.sitemapRoutes.some((route) => route.id === routeId),
    );

    expect(nonPublicRouteIds).toEqual(identityNonPublicSelectedRouteIds);
    expect(routeIds).not.toContain("playbook");
    expect(routeIds).not.toContain("workbook");
    expect(routeIds).not.toContain("deliverables");
    expect(routeIds).not.toContain("hero-examples");
  });

  it("loads and validates the checked-in AI proof release with file-backed visuals", () => {
    const result = resolveSiteSelection({
      experienceId: "ai-second-renaissance",
      releaseId: "ai-second-renaissance-proof-release",
      workspaceRoot: process.cwd(),
    });

    expect(result.isValid).toBe(true);
    expect(result.routes.map((route) => route.id)).toEqual([
      "experience-ai-second-renaissance",
    ]);
    expect(result.resolvedUnitSelections[0]?.reference).toBe(
      "print-to-ai-knowledge-shift@v2026-04-05T031410Z",
    );
    expect(result.resolvedVisualSelections.map((selection) => selection.reference)).toEqual([
      "renaissance-to-ai-hero@v2026-04-05T031424Z",
      "ai-labor-demand-chart@v2026-04-05T031424Z",
    ]);
  });

  it("rejects release manifests that select the same unit more than once", () => {
    const data = structuredClone(
      getSiteSelectionFixtures(),
    ) as SiteSelectionData;
    const release = data.releases.find(
      (entry) => entry.id === "phase-1-baseline-release",
    );

    if (!release) {
      throw new Error("Expected baseline release fixture to exist.");
    }

    release.unitVersions = [
      ...release.unitVersions,
      "recipe-concept-feedback-loops",
    ];

    const result = resolveSiteSelection({
      data,
      experienceId: "phase-1-baseline",
      releaseId: release.id,
    });

    expect(result.isValid).toBe(false);
    expect(
      result.issues.some(
        (issue) => issue.code === "duplicate_release_unit_selection",
      ),
    ).toBe(true);
  });
});
