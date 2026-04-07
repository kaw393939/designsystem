// @vitest-environment node

import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  assertValidExperienceAssemblyPlan,
  listExperienceConfigs,
  listExperienceNorthStars,
  listModuleBriefs,
  validateExperiencePlanningArtifacts,
} from "@/lib/source-experience-workflow";

const tempDirectories: string[] = [];

function createTempWorkspace() {
  const workspaceRoot = mkdtempSync(
    join(tmpdir(), "source-experience-workflow-"),
  );
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

afterEach(() => {
  for (const directory of tempDirectories.splice(0, tempDirectories.length)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("source experience workflow", () => {
  it("reads the checked-in Sprint 9 experience plans and resolves their modules", () => {
    const experiences = listExperienceNorthStars({
      workspaceRoot: process.cwd(),
    });
    const configs = listExperienceConfigs({ workspaceRoot: process.cwd() });
    const modules = listModuleBriefs({ workspaceRoot: process.cwd() });

    expect(experiences.map((experience) => experience.data.id)).toEqual([
      "ai-second-renaissance",
      "identity-portfolio-system",
    ]);
    expect(configs.map((experience) => experience.data.id)).toEqual([
      "ai-second-renaissance",
      "identity-portfolio-system",
      "phase-1-baseline",
    ]);
    expect(modules.map((module) => module.data.id)).toEqual([
      "archetype-and-identity",
      "print-to-ai-knowledge-shift",
    ]);
    expect(
      validateExperiencePlanningArtifacts({ workspaceRoot: process.cwd() }),
    ).toEqual([]);

    const aiAssembly = assertValidExperienceAssemblyPlan(
      "ai-second-renaissance",
      {
        workspaceRoot: process.cwd(),
      },
    );
    const identityAssembly = assertValidExperienceAssemblyPlan(
      "identity-portfolio-system",
      {
        workspaceRoot: process.cwd(),
      },
    );

    expect(aiAssembly.sourceDocuments.map((source) => source.data.id)).toEqual([
      "renesaince",
    ]);
    expect(aiAssembly.modules).toHaveLength(1);
    expect(aiAssembly.modules[0]?.module.data.id).toBe(
      "print-to-ai-knowledge-shift",
    );
    expect(aiAssembly.modules[0]?.unitBriefs[0]?.id).toBe(
      "print-to-ai-knowledge-shift",
    );
    expect(identityAssembly.modules).toHaveLength(1);
    expect(identityAssembly.modules[0]?.unitBriefs[0]?.id).toBe(
      "choose-primary-archetype",
    );
    expect(
      configs.find((experience) => experience.data.id === "ai-second-renaissance")
        ?.data.visualRefs,
    ).toEqual(["renaissance-to-ai-hero", "ai-labor-demand-chart"]);
  });

  it("reports broken module source and candidate unit relationships", () => {
    const workspaceRoot = createTempWorkspace();

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
  - diagram
`,
    );
    writeWorkspaceFile(
      workspaceRoot,
      "content/plans/modules/broken-module.yml",
      `schema: module-brief/v1
id: broken-module
experienceId: identity-portfolio-system
title: Broken Module
job: Trigger validation errors.
sequencePosition: 1
learningOutcomes:
  - Detect a broken source reference.
curatorialQuestions:
  - What happens when the module points at the wrong unit?
candidateUnits:
  - mismatched-unit
sourceRefs:
  - missing-source
`,
    );
    writeWorkspaceFile(
      workspaceRoot,
      "content/briefs/units/mismatched-unit.yml",
      `schema: unit-brief/v1
id: mismatched-unit
experienceId: other-experience
moduleId: other-module
recipe: concept-explainer
title: Mismatched Unit
dominantJob: Trigger validation errors.
learningObjective: Prove the validator catches mismatches.
curatorialJob: Keep the failure explicit.
targetAudience:
  - students
sourceRefs:
  - sourceId: identity
`,
    );

    const issues = validateExperiencePlanningArtifacts({ workspaceRoot });
    const issueCodes = issues.map((issue) => issue.code);

    expect(issueCodes).toContain("unknown_module_source");
    expect(issueCodes).toContain("candidate_unit_experience_mismatch");
    expect(issueCodes).toContain("candidate_unit_module_mismatch");
  });
});
