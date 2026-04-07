// @vitest-environment node

import {
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  approveUnitVersion,
  createUnitReviewRecord,
  freezeUnitDraft,
  formatUnitVersionTimestamp,
  getUnitDraftPath,
  listSourceDocuments,
  listPublishableUnitVersions,
  parseUnitVersionReference,
  requestUnitReview,
  registerSourceDocument,
  reviseUnitDraft,
  showUnitArtifact,
  startUnitDraft,
} from "@/lib/source-unit-workflow";

const tempDirectories: string[] = [];

function createTempWorkspace() {
  const workspaceRoot = mkdtempSync(join(tmpdir(), "source-unit-workflow-"));
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

function seedBrief(workspaceRoot: string) {
  writeWorkspaceFile(
    workspaceRoot,
    "content/briefs/units/choose-primary-archetype.yml",
    `schema: unit-brief/v1
id: choose-primary-archetype
experienceId: identity-portfolio-system
moduleId: archetype-and-identity
recipe: concept-explainer
title: Choose a Primary Archetype Without Losing Complexity
dominantJob: Help the learner commit to one dominant portfolio signal.
learningObjective: Explain why one primary archetype creates coherence in a portfolio system.
curatorialJob: Frame archetype choice as a legibility and trust decision rather than a personality quiz.
targetAudience:
  - students
sourceRefs:
  - sourceId: identity
    sections:
      - Choose One Primary Archetype
misconceptions:
  - Strong brands must blend many archetypes equally.
requiredEvidence:
  - comparison of primary vs mixed signals
assessmentIdea: Rewrite a portfolio hero with one dominant archetype.
nextStepIntent: Move from concept selection into a portfolio self-audit.
`,
  );
}

afterEach(() => {
  for (const directory of tempDirectories.splice(0, tempDirectories.length)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("source and unit workflow", () => {
  it("registers source records without duplicating the canonical research path", () => {
    const workspaceRoot = createTempWorkspace();

    writeWorkspaceFile(
      workspaceRoot,
      "docs/_research/identity.md",
      `# Identity Portfolio Research Notes

Identity, portfolio legibility, and proof-of-work operate as one public signal system.
`,
    );

    const firstRegistration = registerSourceDocument({
      path: "docs/_research/identity.md",
      workspaceRoot,
      now: "2026-04-05T12:00:00.000Z",
    });

    expect(firstRegistration.created).toBe(true);
    expect(firstRegistration.artifact.data.id).toBe("identity");
    expect(firstRegistration.artifact.data.path).toBe(
      "docs/_research/identity.md",
    );

    const duplicateRegistration = registerSourceDocument({
      path: "docs/_research/identity.md",
      workspaceRoot,
    });

    expect(duplicateRegistration.created).toBe(false);
    expect(listSourceDocuments({ workspaceRoot })).toHaveLength(1);
  });

  it("refuses to start a draft when the brief or registered source is missing", () => {
    const workspaceRoot = createTempWorkspace();

    writeWorkspaceFile(
      workspaceRoot,
      "docs/_research/identity.md",
      `# Identity Portfolio Research Notes

Identity is easier to read when the signal system is coherent.
`,
    );

    expect(() =>
      startUnitDraft({
        unitId: "choose-primary-archetype",
        kind: "concept",
        recipe: "concept-explainer",
        sourceId: "identity",
        workspaceRoot,
      }),
    ).toThrow(/Unit brief/);

    seedBrief(workspaceRoot);

    expect(() =>
      startUnitDraft({
        unitId: "choose-primary-archetype",
        kind: "concept",
        recipe: "concept-explainer",
        sourceId: "identity",
        workspaceRoot,
      }),
    ).toThrow(/Registered source identity/);
  });

  it("starts a draft from a checked-in brief and shows it as the default artifact", () => {
    const workspaceRoot = createTempWorkspace();

    writeWorkspaceFile(
      workspaceRoot,
      "docs/_research/identity.md",
      `# Identity Portfolio Research Notes

Identity, portfolio legibility, and proof-of-work operate as one public signal system.
`,
    );
    seedBrief(workspaceRoot);

    registerSourceDocument({
      path: "docs/_research/identity.md",
      workspaceRoot,
    });

    const result = startUnitDraft({
      unitId: "choose-primary-archetype",
      kind: "concept",
      recipe: "concept-explainer",
      sourceId: "identity",
      workspaceRoot,
    });

    expect(result.created).toBe(true);
    expect(
      existsSync(getUnitDraftPath("choose-primary-archetype", workspaceRoot)),
    ).toBe(true);
    expect(result.artifact.data.briefRef).toBe("choose-primary-archetype");
    expect(result.artifact.data.blocks.length).toBeGreaterThan(0);

    const shown = showUnitArtifact({
      unitId: "choose-primary-archetype",
      workspaceRoot,
    });

    expect(shown.mode).toBe("draft");
    expect(shown.data.status).toBe("working_draft");
    expect(shown.data.sourceRefs[0]?.sourceId).toBe("identity");
  });

  it("scaffolds timeline-story drafts with the valid timeline mode", () => {
    const workspaceRoot = createTempWorkspace();

    writeWorkspaceFile(
      workspaceRoot,
      "docs/_research/renesaince.md",
      `# Enterprise AI Degree Vision for the Second Renaissance

The printing press and AI both change the cost of symbolic production.
`,
    );
    writeWorkspaceFile(
      workspaceRoot,
      "content/briefs/units/print-to-ai-knowledge-shift.yml",
      `schema: unit-brief/v1
id: print-to-ai-knowledge-shift
experienceId: ai-second-renaissance
moduleId: print-to-ai-knowledge-shift
recipe: timeline-story
title: Why the Printing Press and AI Reshape Institutions in Similar Ways
dominantJob: Compare two knowledge revolutions without flattening them.
learningObjective: Explain how symbolic production costs reshape institutions.
curatorialJob: Keep the analogy institutional instead of gadget-driven.
targetAudience:
  - students
sourceRefs:
  - sourceId: renesaince
`,
    );

    registerSourceDocument({
      path: "docs/_research/renesaince.md",
      workspaceRoot,
    });

    const result = startUnitDraft({
      unitId: "print-to-ai-knowledge-shift",
      kind: "concept",
      recipe: "timeline-story",
      sourceId: "renesaince",
      workspaceRoot,
    });

    const sequenceBlock = result.artifact.data.blocks.find(
      (block) => block.type === "sequenceTimeline",
    );

    expect(sequenceBlock?.type).toBe("sequenceTimeline");
    expect(sequenceBlock && "mode" in sequenceBlock ? sequenceBlock.mode : null).toBe(
      "timeline",
    );
  });

  it("freezes immutable versions and records supersession without mutating earlier snapshots", () => {
    const workspaceRoot = createTempWorkspace();

    writeWorkspaceFile(
      workspaceRoot,
      "docs/_research/identity.md",
      `# Identity Portfolio Research Notes

Identity, portfolio legibility, and proof-of-work operate as one public signal system.
`,
    );
    seedBrief(workspaceRoot);

    registerSourceDocument({
      path: "docs/_research/identity.md",
      workspaceRoot,
    });
    startUnitDraft({
      unitId: "choose-primary-archetype",
      kind: "concept",
      recipe: "concept-explainer",
      sourceId: "identity",
      workspaceRoot,
    });

    const firstVersion = freezeUnitDraft({
      unitId: "choose-primary-archetype",
      workspaceRoot,
      now: "2026-04-05T12:00:00.000Z",
    });
    const firstVersionSnapshot = readFileSync(firstVersion.filePath, "utf8");

    const secondVersion = freezeUnitDraft({
      unitId: "choose-primary-archetype",
      workspaceRoot,
      now: "2026-04-06T09:30:00.000Z",
    });

    expect(firstVersion.data.version).toBe(
      formatUnitVersionTimestamp("2026-04-05T12:00:00.000Z"),
    );
    expect(secondVersion.data.supersedes).toBe(firstVersion.data.version);
    expect(readFileSync(firstVersion.filePath, "utf8")).toBe(
      firstVersionSnapshot,
    );

    const shown = showUnitArtifact({
      unitId: "choose-primary-archetype",
      workspaceRoot,
      version: secondVersion.data.version,
    });

    expect(shown.mode).toBe("version");
    expect(shown.data.status).toBe("frozen_candidate");
  });

  it("requires explicit review evidence before a frozen unit version can be approved", () => {
    const workspaceRoot = createTempWorkspace();

    writeWorkspaceFile(
      workspaceRoot,
      "docs/_research/identity.md",
      `# Identity Portfolio Research Notes

Identity, portfolio legibility, and proof-of-work operate as one public signal system.
`,
    );
    seedBrief(workspaceRoot);

    registerSourceDocument({
      path: "docs/_research/identity.md",
      workspaceRoot,
    });
    startUnitDraft({
      unitId: "choose-primary-archetype",
      kind: "concept",
      recipe: "concept-explainer",
      sourceId: "identity",
      workspaceRoot,
    });

    const frozenVersion = freezeUnitDraft({
      unitId: "choose-primary-archetype",
      workspaceRoot,
      now: "2026-04-05T12:00:00.000Z",
    });

    const requested = requestUnitReview({
      unitId: "choose-primary-archetype",
      version: frozenVersion.data.version,
      workspaceRoot,
    });

    expect(requested.requested).toBe(true);
    expect(requested.artifact.data.status).toBe("review_requested");

    expect(() =>
      approveUnitVersion({
        unitId: "choose-primary-archetype",
        version: frozenVersion.data.version,
        workspaceRoot,
      }),
    ).toThrow(/approved review record/);

    const reviewed = createUnitReviewRecord({
      unitId: "choose-primary-archetype",
      version: frozenVersion.data.version,
      reviewerRole: "editorial",
      outcome: "approved",
      findings: [
        {
          severity: "note",
          summary: "The concept stays tightly aligned to the source record.",
        },
      ],
      workspaceRoot,
      now: "2026-04-05T13:00:00.000Z",
    });

    expect(reviewed.review.data.id).toBe(
      `review-choose-primary-archetype-${frozenVersion.data.version}-editorial`,
    );
    expect(reviewed.artifact.data.status).toBe("review_requested");
    expect(reviewed.artifact.data.reviewRefs).toContain(
      reviewed.review.data.id,
    );

    const approved = approveUnitVersion({
      unitId: "choose-primary-archetype",
      version: frozenVersion.data.version,
      workspaceRoot,
    });

    expect(approved.approved).toBe(true);
    expect(approved.artifact.data.status).toBe("approved");
    expect(approved.artifact.data.reviewRefs).toContain(
      reviewed.review.data.id,
    );
  });

  it("creates a revision draft from a reviewed version after changes are requested", () => {
    const workspaceRoot = createTempWorkspace();

    writeWorkspaceFile(
      workspaceRoot,
      "docs/_research/identity.md",
      `# Identity Portfolio Research Notes

Identity, portfolio legibility, and proof-of-work operate as one public signal system.
`,
    );
    seedBrief(workspaceRoot);

    registerSourceDocument({
      path: "docs/_research/identity.md",
      workspaceRoot,
    });
    startUnitDraft({
      unitId: "choose-primary-archetype",
      kind: "concept",
      recipe: "concept-explainer",
      sourceId: "identity",
      workspaceRoot,
    });

    const frozenVersion = freezeUnitDraft({
      unitId: "choose-primary-archetype",
      workspaceRoot,
      now: "2026-04-05T12:00:00.000Z",
    });

    requestUnitReview({
      unitId: "choose-primary-archetype",
      version: frozenVersion.data.version,
      workspaceRoot,
    });

    const reviewed = createUnitReviewRecord({
      unitId: "choose-primary-archetype",
      version: frozenVersion.data.version,
      reviewerRole: "pedagogy",
      outcome: "changes_requested",
      findings: [
        {
          severity: "warning",
          summary:
            "The worked example should make the learner action more explicit.",
        },
      ],
      workspaceRoot,
      now: "2026-04-05T13:00:00.000Z",
    });

    expect(reviewed.artifact.data.status).toBe("changes_requested");

    const revised = reviseUnitDraft({
      unitId: "choose-primary-archetype",
      fromVersion: frozenVersion.data.version,
      reviewId: reviewed.review.data.id,
      workspaceRoot,
    });

    expect(revised.created).toBe(false);
    expect(revised.artifact.data.basedOnVersion).toBe(
      frozenVersion.data.version,
    );
    expect(revised.artifact.data.notes).toContain(
      `Address review ${reviewed.review.data.id} before freezing the next candidate.`,
    );
    expect(revised.artifact.body).toContain(reviewed.review.data.id);
  });

  it("discovers publishable file-backed unit versions through explicit unitId@version references", () => {
    const publishableVersions = listPublishableUnitVersions({
      workspaceRoot: process.cwd(),
    });
    const reference = `choose-primary-archetype@v2026-04-05T120000Z`;

    expect(parseUnitVersionReference(reference)).toEqual({
      reference,
      unitId: "choose-primary-archetype",
      version: "v2026-04-05T120000Z",
    });
    expect(
      publishableVersions.some((entry) => entry.reference === reference),
    ).toBe(true);
  });

  it("parses the checked-in Sprint 8 example artifacts from the repository", () => {
    const sources = listSourceDocuments({ workspaceRoot: process.cwd() });
    const source = sources.find((artifact) => artifact.data.id === "identity");

    expect(source).toBeDefined();
    expect(source?.data.path).toBe("docs/_research/identity.md");

    const draft = showUnitArtifact({
      unitId: "choose-primary-archetype",
      workspaceRoot: process.cwd(),
      draft: true,
    });
    const version = showUnitArtifact({
      unitId: "choose-primary-archetype",
      workspaceRoot: process.cwd(),
      version: "v2026-04-05T120000Z",
    });

    expect(draft.mode).toBe("draft");
    expect(draft.data.briefRef).toBe("choose-primary-archetype");
    expect(version.mode).toBe("version");
    expect(version.data.status).toBe("approved");
  });
});
