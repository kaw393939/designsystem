// @vitest-environment node

import { describe, expect, it } from "vitest";

import {
  getSelectedReleaseVisual,
  resolveVisualReferenceToRenderable,
} from "@/lib/site-visual-resolver";

describe("site visual resolver", () => {
  it("keeps fixture-backed selected visuals as placeholders without file assets", () => {
    const visual = getSelectedReleaseVisual("feedback-loop-map", {
      experienceId: "phase-1-baseline",
      releaseId: "phase-1-baseline-release",
    });

    expect(visual.source).toBe("fixture");
    expect(visual.primaryAsset).toBeNull();
  });

  it("resolves the identity proof release diagram into a renderable file-backed asset", () => {
    const visual = getSelectedReleaseVisual("archetype-signal-map", {
      experienceId: "identity-portfolio-system",
      releaseId: "identity-portfolio-system-proof-release",
      workspaceRoot: process.cwd(),
    });

    expect(visual.source).toBe("file-backed");
    expect(visual.version).toBe("v2026-04-05T031424Z");
    expect(visual.primaryAsset?.ref).toBe("diagram.svg");
    expect(visual.primaryAsset?.dataUri?.startsWith("data:image/svg+xml;base64,")).toBe(true);
    expect(visual.caption).toContain("stable public signal");
  });

  it("can resolve an explicit visualId@version reference without relying on the selected release", () => {
    const visual = resolveVisualReferenceToRenderable(
      "ai-labor-demand-chart@v2026-04-05T031424Z",
      {
        workspaceRoot: process.cwd(),
      },
    );

    expect(visual?.source).toBe("file-backed");
    expect(visual?.primaryAsset?.ref).toBe("chart.svg");
    expect(visual?.primaryAsset?.dataUri?.startsWith("data:image/svg+xml;base64,")).toBe(true);
    expect(visual?.alt).toContain("Two-bar chart");
  });
});
