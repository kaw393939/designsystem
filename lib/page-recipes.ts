import type { LocalNavItem } from "@/components/local-nav";
import {
  getBlockTitle,
  type EducationalUnitSpec,
  type UnitBlockSpec,
} from "@/lib/educational-contracts";

export type PageRecipeId =
  | "learning-homepage"
  | "module-overview"
  | "lesson-page"
  | "concept-explainer"
  | "timeline-story"
  | "assignment-project"
  | "reading-map";

type BlockType = UnitBlockSpec["type"];

type RecipeSequenceStep = {
  type: BlockType;
  count?: number;
};

type PageRecipeSpec = {
  id: PageRecipeId;
  label: string;
  orderedRequirements: readonly RecipeSequenceStep[];
};

export const pageRecipeSpecs: Record<PageRecipeId, PageRecipeSpec> = {
  "learning-homepage": {
    id: "learning-homepage",
    label: "Learning homepage",
    orderedRequirements: [
      { type: "hero" },
      { type: "whyItMatters" },
      { type: "conceptGrid" },
      { type: "sourceAnchorGrid" },
      { type: "nextStep" },
    ],
  },
  "module-overview": {
    id: "module-overview",
    label: "Module overview page",
    orderedRequirements: [
      { type: "hero" },
      { type: "whyItMatters" },
      { type: "sequenceTimeline" },
      { type: "conceptGrid" },
      { type: "section" },
      { type: "nextStep" },
    ],
  },
  "lesson-page": {
    id: "lesson-page",
    label: "Lesson page",
    orderedRequirements: [
      { type: "hero" },
      { type: "whyItMatters" },
      { type: "section" },
      { type: "workedExample" },
      { type: "summaryGrid" },
      { type: "reflectionPrompt" },
      { type: "nextStep" },
    ],
  },
  "concept-explainer": {
    id: "concept-explainer",
    label: "Concept explainer page",
    orderedRequirements: [
      { type: "hero" },
      { type: "whyItMatters" },
      { type: "section" },
      { type: "comparisonGrid" },
      { type: "workedExample" },
      { type: "summaryGrid" },
      { type: "sourceAnchorGrid" },
    ],
  },
  "timeline-story": {
    id: "timeline-story",
    label: "Timeline or story page",
    orderedRequirements: [
      { type: "hero" },
      { type: "whyItMatters" },
      { type: "sequenceTimeline" },
      { type: "section" },
      { type: "summaryGrid" },
      { type: "nextStep" },
    ],
  },
  "assignment-project": {
    id: "assignment-project",
    label: "Assignment or project page",
    orderedRequirements: [
      { type: "hero" },
      { type: "whyItMatters" },
      { type: "section" },
      { type: "sequenceTimeline" },
      { type: "workedExample" },
      { type: "section" },
      { type: "nextStep" },
    ],
  },
  "reading-map": {
    id: "reading-map",
    label: "Reading map or resource map page",
    orderedRequirements: [
      { type: "hero" },
      { type: "section" },
      { type: "readingMapGrid" },
      { type: "sourceAnchorGrid" },
      { type: "nextStep" },
    ],
  },
};

export type RecipeValidationIssue = {
  code: "unknown_recipe" | "missing_block" | "wrong_order";
  message: string;
  blockType?: BlockType;
  requiredCount?: number;
  actualCount?: number;
};

export type RecipeValidationResult = {
  recipeId: string;
  isValid: boolean;
  issues: RecipeValidationIssue[];
  matchedTypes: BlockType[];
};

type RequiredBlockInstance = {
  type: BlockType;
  occurrence: number;
};

function collectBlockPositions(blocks: readonly UnitBlockSpec[]) {
  const positions = new Map<BlockType, number[]>();

  blocks.forEach((block, index) => {
    const blockPositions = positions.get(block.type) ?? [];
    blockPositions.push(index);
    positions.set(block.type, blockPositions);
  });

  return positions;
}

function countRequiredTypes(steps: readonly RecipeSequenceStep[]) {
  const counts = new Map<BlockType, number>();

  for (const step of steps) {
    counts.set(step.type, (counts.get(step.type) ?? 0) + (step.count ?? 1));
  }

  return counts;
}

function expandRequiredInstances(steps: readonly RecipeSequenceStep[]) {
  const seenCounts = new Map<BlockType, number>();

  return steps.flatMap((step) =>
    Array.from({ length: step.count ?? 1 }, () => {
      const occurrence = (seenCounts.get(step.type) ?? 0) + 1;
      seenCounts.set(step.type, occurrence);

      return { type: step.type, occurrence } satisfies RequiredBlockInstance;
    }),
  );
}

function formatOrdinal(value: number) {
  const lastTwoDigits = value % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${value}th`;
  }

  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
}

export function getPageRecipeSpec(recipeId: string) {
  return pageRecipeSpecs[recipeId as PageRecipeId];
}

export function validateUnitRecipe(
  unit: EducationalUnitSpec,
): RecipeValidationResult {
  const recipe = getPageRecipeSpec(unit.recipe);

  if (!recipe) {
    return {
      recipeId: unit.recipe,
      isValid: false,
      issues: [
        {
          code: "unknown_recipe",
          message: `Unit ${unit.id} references unknown recipe ${unit.recipe}.`,
        },
      ],
      matchedTypes: [],
    };
  }

  const issues: RecipeValidationIssue[] = [];
  const matchedTypes: BlockType[] = [];
  const blockPositions = collectBlockPositions(unit.blocks);
  const requiredCounts = countRequiredTypes(recipe.orderedRequirements);

  for (const [blockType, requiredCount] of requiredCounts.entries()) {
    const actualCount = blockPositions.get(blockType)?.length ?? 0;

    if (actualCount < requiredCount) {
      issues.push({
        code: "missing_block",
        blockType,
        requiredCount,
        actualCount,
        message: `Recipe ${recipe.label} requires ${requiredCount} ${blockType} block${requiredCount === 1 ? "" : "s"}, but unit ${unit.id} only provides ${actualCount}.`,
      });
    }
  }

  if (!issues.length) {
    let previousBlock: RequiredBlockInstance | null = null;
    let previousPosition = -1;

    for (const requiredBlock of expandRequiredInstances(
      recipe.orderedRequirements,
    )) {
      const foundPosition = blockPositions.get(requiredBlock.type)?.[
        requiredBlock.occurrence - 1
      ];

      if (foundPosition === undefined) {
        issues.push({
          code: "wrong_order",
          blockType: requiredBlock.type,
          message: `Recipe ${recipe.label} could not resolve the ${formatOrdinal(requiredBlock.occurrence)} ${requiredBlock.type} block while checking order for unit ${unit.id}.`,
        });
        break;
      }

      if (foundPosition <= previousPosition) {
        const previousLabel = previousBlock
          ? `${formatOrdinal(previousBlock.occurrence)} ${previousBlock.type}`
          : "the page start";

        issues.push({
          code: "wrong_order",
          blockType: requiredBlock.type,
          message: `Recipe ${recipe.label} requires the ${formatOrdinal(requiredBlock.occurrence)} ${requiredBlock.type} block to appear after ${previousLabel}, but unit ${unit.id} breaks that order.`,
        });
        break;
      }

      matchedTypes.push(requiredBlock.type);
      previousBlock = requiredBlock;
      previousPosition = foundPosition;
    }
  }

  return {
    recipeId: recipe.id,
    isValid: !issues.length,
    issues,
    matchedTypes,
  };
}

export function assertValidUnitRecipe(unit: EducationalUnitSpec) {
  const result = validateUnitRecipe(unit);

  if (!result.isValid) {
    throw new Error(
      `Recipe validation failed for ${unit.id}: ${result.issues.map((issue) => issue.message).join(" ")}`,
    );
  }
}

export function buildRecipeLocalNavItems(
  unit: EducationalUnitSpec,
): LocalNavItem[] {
  return unit.blocks.flatMap((block) => {
    if (!block.id) {
      return [];
    }

    const label = getBlockTitle(block);

    if (!label) {
      return [];
    }

    return [{ id: block.id, label }];
  });
}
