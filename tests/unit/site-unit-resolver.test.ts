import { describe, expect, it } from "vitest";

import {
  getSiteSelectionFixtures,
  type SiteSelectionData,
} from "@/lib/site-release";
import {
  getSelectedReleaseUnit,
  resolveUnitReferenceToSpec,
} from "@/lib/site-unit-resolver";

describe("site unit resolver", () => {
  it("resolves the baseline fixture-backed recipe unit when that release is selected", () => {
    const unit = getSelectedReleaseUnit("recipe-concept-feedback-loops", {
      experienceId: "phase-1-baseline",
      releaseId: "phase-1-baseline-release",
    });

    expect(unit.id).toBe("recipe-concept-feedback-loops");
    expect(unit.title).toBe(
      "A feedback loop changes what happens next, not just what happened before.",
    );
  });

  it("resolves an explicit file-backed unitId@version reference into the renderer contract", () => {
    const unit = resolveUnitReferenceToSpec(
      "choose-primary-archetype@v2026-04-05T120000Z",
      {
        workspaceRoot: process.cwd(),
      },
    );

    expect(unit.id).toBe("choose-primary-archetype");
    expect(unit.kind).toBe("concept");
    expect(unit.title).toBe(
      "Choose a Primary Archetype Without Losing Complexity",
    );
    expect(unit.blocks.length).toBeGreaterThan(0);
  });

  it("uses a file-backed selection when a release explicitly chooses one", () => {
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

    const unit = getSelectedReleaseUnit("choose-primary-archetype", {
      data,
      experienceId: "phase-1-baseline",
      releaseId: "phase-1-file-backed-proof",
      workspaceRoot: process.cwd(),
    });

    expect(unit.id).toBe("choose-primary-archetype");
    expect(unit.recipe).toBe("concept-explainer");
  });
});
