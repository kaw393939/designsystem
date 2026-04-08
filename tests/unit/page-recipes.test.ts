import { describe, expect, it } from "vitest";

import type { EducationalUnitSpec } from "@/lib/educational-contracts";
import {
  conceptRecipeUnit,
  lessonRecipeUnit,
} from "@/lib/recipe-exemplar-content";
import {
  buildRecipeLocalNavItems,
  validateUnitRecipe,
} from "@/lib/page-recipes";

describe("page recipe validation", () => {
  it("validates the checked-in concept and lesson exemplar units", () => {
    expect(validateUnitRecipe(conceptRecipeUnit).isValid).toBe(true);
    expect(validateUnitRecipe(lessonRecipeUnit).isValid).toBe(true);
  });

  it("builds local navigation items from anchorable blocks", () => {
    expect(buildRecipeLocalNavItems(lessonRecipeUnit)).toEqual([
      { id: "cue-hunt", label: "Start by naming cues, not just people." },
      {
        id: "pattern-building",
        label: "Track one repeated choice before you name the pattern.",
      },
      { id: "worked-example", label: "Worked example" },
      {
        id: "takeaways",
        label: "Carry these three moves into your own observation.",
      },
      { id: "reflection", label: "Reflection" },
      { id: "sources", label: "Method sources" },
      {
        id: "next-step",
        label: "Keep going",
      },
    ]);
  });

  it("reports missing required blocks", () => {
    const brokenLesson = {
      ...lessonRecipeUnit,
      blocks: lessonRecipeUnit.blocks.filter(
        (block) => block.type !== "nextStep",
      ),
    };

    const result = validateUnitRecipe(brokenLesson);

    expect(result.isValid).toBe(false);
    expect(
      result.issues.some(
        (issue) =>
          issue.code === "missing_block" && issue.blockType === "nextStep",
      ),
    ).toBe(true);
  });

  it("counts repeated required block types across the full recipe contract", () => {
    const brokenAssignment: EducationalUnitSpec = {
      id: "assignment-missing-second-section",
      kind: "assignment",
      recipe: "assignment-project",
      title: "Assignment page with one section missing",
      summary:
        "Deliberately incomplete assignment recipe for validation coverage.",
      blocks: [
        {
          type: "hero",
          title: "Assignment page with one section missing",
          dek: "A minimal assignment page used to verify repeated required block counts.",
        },
        {
          type: "whyItMatters",
          summary: "Learners need a bounded assignment flow.",
          stakes:
            "Missing the rubric section should fail the recipe validator.",
        },
        {
          type: "section",
          id: "brief",
          title: "Task brief",
          body: "Describe what the learner should make.",
        },
        {
          type: "sequenceTimeline",
          mode: "process",
          items: [
            { label: "1", title: "Draft", summary: "Build the first version." },
          ],
        },
        {
          type: "workedExample",
          prompt: "Show one bounded exemplar.",
          steps: [
            { title: "Example", body: "Walk through one strong response." },
          ],
        },
        {
          type: "nextStep",
          title: "Submit the assignment",
          primaryAction: { label: "Submit", href: "/submit", kind: "primary" },
        },
      ],
    };

    const result = validateUnitRecipe(brokenAssignment);

    expect(result.isValid).toBe(false);
    expect(
      result.issues.some(
        (issue) =>
          issue.code === "missing_block" &&
          issue.blockType === "section" &&
          issue.requiredCount === 2 &&
          issue.actualCount === 1,
      ),
    ).toBe(true);
  });

  it("reports wrong block order when the documented sequence is broken", () => {
    const blocks = [...conceptRecipeUnit.blocks];
    const comparisonIndex = blocks.findIndex(
      (block) => block.type === "comparisonGrid",
    );
    const workedExampleIndex = blocks.findIndex(
      (block) => block.type === "workedExample",
    );

    [blocks[comparisonIndex], blocks[workedExampleIndex]] = [
      blocks[workedExampleIndex],
      blocks[comparisonIndex],
    ];

    const result = validateUnitRecipe({
      ...conceptRecipeUnit,
      blocks,
    });

    expect(result.isValid).toBe(false);
    expect(result.issues.some((issue) => issue.code === "wrong_order")).toBe(
      true,
    );
  });

  it("rejects a later required block that appears too early even if another copy appears later", () => {
    const comparisonBlock = conceptRecipeUnit.blocks.find(
      (block) => block.type === "comparisonGrid",
    );

    if (!comparisonBlock) {
      throw new Error(
        "Expected concept recipe unit to include a comparison block.",
      );
    }

    const result = validateUnitRecipe({
      ...conceptRecipeUnit,
      blocks: [comparisonBlock, ...conceptRecipeUnit.blocks],
    });

    expect(result.isValid).toBe(false);
    expect(result.issues.some((issue) => issue.code === "wrong_order")).toBe(
      true,
    );
  });
});
