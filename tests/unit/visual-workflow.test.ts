// @vitest-environment node

import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  approveVisualVersion,
  createVisualReviewRecord,
  freezeVisualDraft,
  generateVisualVersion,
  isVersionOwnedAssetRef,
  listVisualBriefs,
  listVisualDrafts,
  listPublishableVisualVersions,
  readVisualBrief,
  readVisualDraft,
  requestVisualReview,
  reviseVisualDraft,
  startVisualDraft,
  validateVisualArtifacts,
} from "@/lib/visual-asset-workflow";

const tempDirectories: string[] = [];

function createTempWorkspace() {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "visual-workflow-"));
  tempDirectories.push(workspaceRoot);
  return workspaceRoot;
}

function writeWorkspaceFile(
  workspaceRoot: string,
  relativePath: string,
  content: string,
) {
  const filePath = join(workspaceRoot, relativePath);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content, "utf8");
  return filePath;
}

function seedBaseVisualWorkspace(workspaceRoot: string, visualId: string) {
  writeWorkspaceFile(
    workspaceRoot,
    "content/sources/identity.md",
    `---
schema: source-document/v1
id: identity
title: Identity Notes
path: docs/_research/identity.md
topics:
  - identity
status: registered
registeredAt: 2026-04-06T00:00:00Z
---

Identity source record.
`,
  );
  writeWorkspaceFile(
    workspaceRoot,
    "content/plans/experiences/identity-portfolio-system.yml",
    `schema: experience-north-star/v1
id: identity-portfolio-system
title: Identity Portfolio System
audience:
  - students
learnerTransformation: Learners leave with one coherent public signal.
curatorialThesis: Identity becomes opportunity when signals stay legible.
siteMode: studio
sourceRefs:
  - identity
primaryRecipes:
  - concept-explainer
requiredVisualClasses:
  - chart
`,
  );
  writeWorkspaceFile(
    workspaceRoot,
    "content/briefs/units/chart-proof-unit.yml",
    `schema: unit-brief/v1
id: chart-proof-unit
experienceId: identity-portfolio-system
moduleId: chart-proof-module
recipe: concept-explainer
title: Chart Proof Unit
dominantJob: Keep chart workflow tests bounded.
learningObjective: Validate provider and asset rules.
curatorialJob: Keep the visual proof explicit.
targetAudience:
  - students
sourceRefs:
  - sourceId: identity
`,
  );
  writeWorkspaceFile(
    workspaceRoot,
    `content/briefs/visuals/${visualId}.yml`,
    `schema: visual-brief/v1
id: ${visualId}
experienceId: identity-portfolio-system
forUnit: chart-proof-unit
kind: evidence-chart
visualClass: chart
intent: Keep the chart workflow test explicit.
mustShow:
  - first value
  - second value
accessibilityNeeds:
  - short alt text
  - long description
sourceRefs:
  - sourceId: identity
`,
  );
}

afterEach(() => {
  for (const directory of tempDirectories.splice(0, tempDirectories.length)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("visual asset workflow", () => {
  it("reads the checked-in Sprint 9 visual briefs and drafts", () => {
    const briefs = listVisualBriefs({ workspaceRoot: process.cwd() });
    const drafts = listVisualDrafts({ workspaceRoot: process.cwd() });
    const publishableVersions = listPublishableVisualVersions({
      workspaceRoot: process.cwd(),
    });

    expect(briefs.map((brief) => brief.data.id)).toEqual([
      "ai-labor-demand-chart",
      "archetype-signal-map",
      "renaissance-to-ai-hero",
    ]);
    expect(drafts.map((draft) => draft.data.id)).toEqual([
      "ai-labor-demand-chart",
      "archetype-signal-map",
      "renaissance-to-ai-hero",
    ]);
    expect(validateVisualArtifacts({ workspaceRoot: process.cwd() })).toEqual(
      [],
    );

    const chartDraft = readVisualDraft("ai-labor-demand-chart", {
      workspaceRoot: process.cwd(),
    });
    const illustrationBrief = readVisualBrief("renaissance-to-ai-hero", {
      workspaceRoot: process.cwd(),
    });

    expect(chartDraft.data.provider).toBe("vega-lite");
    expect(chartDraft.data.visualClass).toBe("chart");
    expect(illustrationBrief.data.visualClass).toBe("illustration");
    expect(publishableVersions.map((artifact) => artifact.reference)).toEqual([
      "ai-labor-demand-chart@v2026-04-05T031424Z",
      "archetype-signal-map@v2026-04-05T031424Z",
      "renaissance-to-ai-hero@v2026-04-05T031424Z",
    ]);
  });

  it("rejects chart drafts that use non-deterministic providers", () => {
    const workspaceRoot = createTempWorkspace();
    seedBaseVisualWorkspace(workspaceRoot, "bad-chart");

    writeWorkspaceFile(
      workspaceRoot,
      "content/drafts/visuals/bad-chart.yml",
      `schema: visual-draft/v1
id: bad-chart
status: working_draft
kind: evidence-chart
visualClass: chart
intent: Trigger a deterministic-provider validation error.
forUnit: chart-proof-unit
provider: gpt-image
sourceRefs:
  - sourceId: identity
`,
    );

    const issues = validateVisualArtifacts({ workspaceRoot });

    expect(
      issues.some((issue) => issue.code === "invalid_visual_provider"),
    ).toBe(true);
  });

  it("keeps version assets inside the owning version directory", () => {
    const workspaceRoot = createTempWorkspace();
    seedBaseVisualWorkspace(workspaceRoot, "owned-chart");

    writeWorkspaceFile(
      workspaceRoot,
      "content/drafts/visuals/owned-chart.yml",
      `schema: visual-draft/v1
id: owned-chart
status: working_draft
kind: evidence-chart
visualClass: chart
intent: Keep the asset ownership test explicit.
forUnit: chart-proof-unit
provider: vega-lite
sourceRefs:
  - sourceId: identity
`,
    );
    writeWorkspaceFile(
      workspaceRoot,
      "content/visuals/owned-chart/versions/v2026-04-06T120000Z/spec.yml",
      `schema: visual-spec/v1
id: owned-chart
version: v2026-04-06T120000Z
status: generated_candidate
kind: evidence-chart
visualClass: chart
intent: Keep the asset ownership test explicit.
forUnit: chart-proof-unit
supersedes: null
provider: vega-lite
assetRefs:
  - ../chart.svg
`,
    );

    expect(
      isVersionOwnedAssetRef(
        "owned-chart",
        "v2026-04-06T120000Z",
        "chart.svg",
        workspaceRoot,
      ),
    ).toBe(true);
    expect(
      isVersionOwnedAssetRef(
        "owned-chart",
        "v2026-04-06T120000Z",
        "../chart.svg",
        workspaceRoot,
      ),
    ).toBe(false);

    const issues = validateVisualArtifacts({ workspaceRoot });

    expect(
      issues.some((issue) => issue.code === "asset_outside_version_dir"),
    ).toBe(true);
  });

  it("runs the visual lifecycle from draft start through approval", () => {
    const workspaceRoot = createTempWorkspace();
    seedBaseVisualWorkspace(workspaceRoot, "lifecycle-chart");

    const started = startVisualDraft({
      visualId: "lifecycle-chart",
      kind: "evidence-chart",
      unitId: "chart-proof-unit",
      workspaceRoot,
    });

    expect(started.created).toBe(true);
    expect(started.artifact.data.provider).toBe("vega-lite");

    const frozen = freezeVisualDraft({
      visualId: "lifecycle-chart",
      workspaceRoot,
      now: "2026-04-06T12:00:00.000Z",
    });

    const generated = generateVisualVersion({
      visualId: "lifecycle-chart",
      version: frozen.data.version,
      workspaceRoot,
    });

    expect(generated.artifact.data.assetRefs).toContain("chart.svg");

    const requested = requestVisualReview({
      visualId: "lifecycle-chart",
      version: frozen.data.version,
      workspaceRoot,
    });

    expect(requested.artifact.data.status).toBe("review_requested");

    const reviewed = createVisualReviewRecord({
      visualId: "lifecycle-chart",
      version: frozen.data.version,
      reviewerRole: "visual",
      outcome: "approved",
      findings: [
        {
          severity: "note",
          summary: "Deterministic output remains legible and reviewable.",
        },
      ],
      workspaceRoot,
      now: "2026-04-06T12:15:00.000Z",
    });

    expect(reviewed.review.data.id).toBe(
      `review-lifecycle-chart-${frozen.data.version}-visual`,
    );

    const approved = approveVisualVersion({
      visualId: "lifecycle-chart",
      version: frozen.data.version,
      workspaceRoot,
    });

    expect(approved.approved).toBe(true);
    expect(approved.artifact.data.status).toBe("approved");
  });

  it("seeds a revision draft after a changes_requested visual review", () => {
    const workspaceRoot = createTempWorkspace();
    seedBaseVisualWorkspace(workspaceRoot, "revision-chart");

    startVisualDraft({
      visualId: "revision-chart",
      kind: "evidence-chart",
      unitId: "chart-proof-unit",
      workspaceRoot,
    });

    const frozen = freezeVisualDraft({
      visualId: "revision-chart",
      workspaceRoot,
      now: "2026-04-06T13:00:00.000Z",
    });

    generateVisualVersion({
      visualId: "revision-chart",
      version: frozen.data.version,
      workspaceRoot,
    });
    requestVisualReview({
      visualId: "revision-chart",
      version: frozen.data.version,
      workspaceRoot,
    });

    const review = createVisualReviewRecord({
      visualId: "revision-chart",
      version: frozen.data.version,
      reviewerRole: "visual",
      outcome: "changes_requested",
      findings: [
        {
          severity: "major",
          summary: "Tighten the chart labels before approval.",
        },
      ],
      workspaceRoot,
      now: "2026-04-06T13:10:00.000Z",
    });

    const revised = reviseVisualDraft({
      visualId: "revision-chart",
      fromVersion: frozen.data.version,
      reviewId: review.review.data.id,
      workspaceRoot,
    });

    expect(revised.artifact.data.basedOnVersion).toBe(frozen.data.version);
    expect(revised.artifact.data.notes?.[0]).toContain("Revision draft");
  });
});
