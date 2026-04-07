// @vitest-environment node

import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  approveRelease,
  assembleReleaseCandidate,
  buildReleaseDiff,
  createReleaseReviewRecord,
  listReleaseHistory,
  listReleaseReviewRecords,
  publishRelease,
  requestReleaseReview,
} from "@/lib/release-workflow";
import { readReleaseManifest } from "@/lib/site-release";

const tempDirectories: string[] = [];

function createTempWorkspace() {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "release-workflow-"));
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

function seedExperienceConfig(
  workspaceRoot: string,
  options?: {
    experienceId?: string;
    unitRefs?: string[];
    visualRefs?: string[];
  },
) {
  const experienceId = options?.experienceId ?? "phase-1-baseline";

  writeWorkspaceFile(
    workspaceRoot,
    `content/experiences/${experienceId}.json`,
    `${JSON.stringify(
      {
        schema: "experience/v1",
        id: experienceId,
        title: "Release Workflow Proof",
        theme: "Proof Theme",
        audience: "students",
        homepage: "overview",
        navigation: ["overview"],
        unitRefs: options?.unitRefs ?? ["release-proof-unit"],
        visualRefs: options?.visualRefs ?? [],
        siteMetadata: {
          title: "Release Workflow Proof",
          description: "Release workflow test fixture.",
        },
      },
      null,
      2,
    )}\n`,
  );
}

function seedUnitVersion(
  workspaceRoot: string,
  options: {
    unitId?: string;
    version: string;
    status: string;
    supersedes?: string | null;
  },
) {
  const unitId = options.unitId ?? "release-proof-unit";

  writeWorkspaceFile(
    workspaceRoot,
    `content/units/${unitId}/versions/${options.version}.md`,
    `---
schema: unit/v2
id: ${unitId}
version: ${options.version}
status: ${options.status}
kind: concept
recipe: concept-explainer
title: Release Workflow Proof Unit
objective: Validate release workflow assembly and promotion.
audiences:
  - students
sourceRefs:
  - sourceId: release-proof-source
blocks:
  - type: prose
    value: Release workflow proof block.
supersedes: ${options.supersedes ?? "null"}
---

Release workflow proof unit.
`,
  );
}

function seedReleaseManifest(
  workspaceRoot: string,
  options: {
    releaseId: string;
    experienceId?: string;
    createdAt: string;
    unitVersions: string[];
    status: string;
    supersedes?: string | null;
  },
) {
  writeWorkspaceFile(
    workspaceRoot,
    `content/releases/${options.releaseId}.json`,
    `${JSON.stringify(
      {
        schema: "release/v1",
        id: options.releaseId,
        experience: options.experienceId ?? "phase-1-baseline",
        createdAt: options.createdAt,
        routeIds: ["overview"],
        unitVersions: options.unitVersions,
        visualVersions: [],
        status: options.status,
        notes: `Fixture ${options.releaseId}`,
        supersedes: options.supersedes ?? null,
      },
      null,
      2,
    )}\n`,
  );
}

function seedApprovedReleaseQaArtifact(
  workspaceRoot: string,
  releaseId: string,
  experienceId = "phase-1-baseline",
) {
  writeWorkspaceFile(
    workspaceRoot,
    `docs/_qa/releases/${experienceId}--${releaseId}.release-qa.md`,
    `---
schema: qa/v1
qaType: release
targetId: ${experienceId}--${releaseId}
targetPath: content/releases/${releaseId}.json
status: approved
reviewer: vitest
createdAt: 2026-04-07T12:30:00Z
outcome: approved
supersedes: null
---

# ${releaseId} Release QA

No blocking findings.
`,
  );
}

afterEach(() => {
  for (const directory of tempDirectories.splice(0, tempDirectories.length)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("release workflow", () => {
  it("assembles a named candidate release from the latest publishable file-backed unit version", () => {
    const workspaceRoot = createTempWorkspace();

    seedExperienceConfig(workspaceRoot);
    seedUnitVersion(workspaceRoot, {
      version: "v2026-04-06T120000Z",
      status: "published",
    });
    seedUnitVersion(workspaceRoot, {
      version: "v2026-04-07T120000Z",
      status: "approved",
      supersedes: "v2026-04-06T120000Z",
    });

    const result = assembleReleaseCandidate({
      experienceId: "phase-1-baseline",
      releaseId: "phase-1-baseline-proof-release",
      workspaceRoot,
      now: "2026-04-07T12:05:00Z",
    });

    expect(result.artifact.data.status).toBe("assembled");
    expect(result.artifact.data.routeIds).toEqual(["overview"]);
    expect(result.artifact.data.unitVersions).toEqual([
      "release-proof-unit@v2026-04-07T120000Z",
    ]);
    expect(result.artifact.data.visualVersions).toEqual([]);
  });

  it("marks a release changes_requested when a non-approving release review is recorded", () => {
    const workspaceRoot = createTempWorkspace();

    seedExperienceConfig(workspaceRoot);
    seedUnitVersion(workspaceRoot, {
      version: "v2026-04-07T120000Z",
      status: "approved",
    });

    assembleReleaseCandidate({
      experienceId: "phase-1-baseline",
      releaseId: "phase-1-baseline-review-gate",
      workspaceRoot,
      now: "2026-04-07T12:05:00Z",
    });
    requestReleaseReview({
      releaseId: "phase-1-baseline-review-gate",
      workspaceRoot,
    });

    const reviewed = createReleaseReviewRecord({
      releaseId: "phase-1-baseline-review-gate",
      reviewerRole: "editorial",
      outcome: "changes_requested",
      findings: [
        {
          severity: "high",
          summary: "Release notes do not yet explain the selected evidence set.",
        },
      ],
      workspaceRoot,
      now: "2026-04-07T12:10:00Z",
    });

    expect(reviewed.review.data.id).toBe(
      "review-phase-1-baseline-review-gate-editorial",
    );
    expect(reviewed.artifact.data.status).toBe("changes_requested");
    expect(
      listReleaseReviewRecords({
        releaseId: "phase-1-baseline-review-gate",
        workspaceRoot,
      }).map((artifact) => artifact.data.reviewerRole),
    ).toEqual(["editorial"]);
  });

  it("requires approved release QA and complete role reviews before approval and publish", () => {
    const workspaceRoot = createTempWorkspace();

    seedExperienceConfig(workspaceRoot);
    seedUnitVersion(workspaceRoot, {
      version: "v2026-04-06T120000Z",
      status: "published",
    });
    seedUnitVersion(workspaceRoot, {
      version: "v2026-04-07T120000Z",
      status: "approved",
      supersedes: "v2026-04-06T120000Z",
    });
    seedReleaseManifest(workspaceRoot, {
      releaseId: "phase-1-baseline-current-release",
      createdAt: "2026-04-06T12:15:00Z",
      unitVersions: ["release-proof-unit@v2026-04-06T120000Z"],
      status: "published",
    });

    assembleReleaseCandidate({
      experienceId: "phase-1-baseline",
      releaseId: "phase-1-baseline-next-release",
      workspaceRoot,
      now: "2026-04-07T12:05:00Z",
    });
    requestReleaseReview({
      releaseId: "phase-1-baseline-next-release",
      workspaceRoot,
    });

    for (const reviewerRole of [
      "editorial",
      "pedagogy",
      "accuracy",
      "accessibility",
      "release",
    ]) {
      createReleaseReviewRecord({
        releaseId: "phase-1-baseline-next-release",
        reviewerRole,
        outcome: "approved",
        findings: [
          {
            severity: "note",
            summary: `${reviewerRole} review approved the candidate.`,
          },
        ],
        workspaceRoot,
        now: `2026-04-07T12:${String(10 + Math.max(0, ["editorial", "pedagogy", "accuracy", "accessibility", "release"].indexOf(reviewerRole))).padStart(2, "0")}:00Z`,
      });
    }

    expect(() =>
      approveRelease({
        releaseId: "phase-1-baseline-next-release",
        workspaceRoot,
      }),
    ).toThrow(/approved release QA artifact/);

    seedApprovedReleaseQaArtifact(
      workspaceRoot,
      "phase-1-baseline-next-release",
    );

    const approved = approveRelease({
      releaseId: "phase-1-baseline-next-release",
      workspaceRoot,
    });

    expect(approved.approved).toBe(true);
    expect(approved.artifact.data.status).toBe("approved");

    const diff = buildReleaseDiff(
      "phase-1-baseline-current-release",
      "phase-1-baseline-next-release",
      { workspaceRoot },
    );

    expect(diff.routeDiff.added).toEqual([]);
    expect(diff.unitDiff.changed).toEqual([
      {
        subjectId: "release-proof-unit",
        from: "release-proof-unit@v2026-04-06T120000Z",
        to: "release-proof-unit@v2026-04-07T120000Z",
      },
    ]);

    const published = publishRelease({
      releaseId: "phase-1-baseline-next-release",
      workspaceRoot,
    });

    expect(published.published).toBe(true);
    expect(published.supersededReleaseIds).toEqual([
      "phase-1-baseline-current-release",
    ]);
    expect(
      readReleaseManifest("phase-1-baseline-current-release", { workspaceRoot })
        .data.status,
    ).toBe("superseded");
    expect(
      readReleaseManifest("phase-1-baseline-next-release", { workspaceRoot })
        .data,
    ).toMatchObject({
      status: "published",
      supersedes: "phase-1-baseline-current-release",
    });

    expect(
      listReleaseHistory({
        experienceId: "phase-1-baseline",
        workspaceRoot,
      }),
    ).toEqual([
      expect.objectContaining({
        releaseId: "phase-1-baseline-next-release",
        status: "published",
        qaStatus: "approved",
        approvedRoles: [
          "accessibility",
          "accuracy",
          "editorial",
          "pedagogy",
          "release",
        ],
        blockingRoles: [],
      }),
      expect.objectContaining({
        releaseId: "phase-1-baseline-current-release",
        status: "superseded",
      }),
    ]);
  });
});