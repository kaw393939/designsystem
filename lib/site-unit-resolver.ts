import type { EducationalUnitSpec } from "@/lib/educational-contracts";
import {
  assignmentUnit,
  conceptUnit,
  readingMapUnit,
} from "@/lib/educational-primitives-content";
import {
  conceptRecipeUnit,
  lessonRecipeUnit,
} from "@/lib/recipe-exemplar-content";
import {
  assertValidSiteSelection,
  type ResolvedUnitSelection,
  type SiteSelectionData,
} from "@/lib/site-release";
import {
  resolveFileBackedUnitVersionReference,
  toEducationalUnitSpec,
} from "@/lib/source-unit-workflow";

const fixtureUnitsById: Record<string, EducationalUnitSpec> = {
  [conceptUnit.id]: conceptUnit,
  [assignmentUnit.id]: assignmentUnit,
  [readingMapUnit.id]: readingMapUnit,
  [conceptRecipeUnit.id]: conceptRecipeUnit,
  [lessonRecipeUnit.id]: lessonRecipeUnit,
};

export function getFixtureUnitById(unitId: string) {
  return fixtureUnitsById[unitId] ?? null;
}

export function resolveUnitSelectionToSpec(
  selection: ResolvedUnitSelection,
  options?: { workspaceRoot?: string },
) {
  if (selection.source === "fixture") {
    const fixtureUnit = getFixtureUnitById(selection.unitId);

    if (!fixtureUnit) {
      throw new Error(
        `No checked-in fixture EducationalUnitSpec exists for ${selection.unitId}.`,
      );
    }

    return fixtureUnit;
  }

  return toEducationalUnitSpec(
    resolveFileBackedUnitVersionReference(selection.reference, options)
      .artifact,
  );
}

export function resolveUnitReferenceToSpec(
  reference: string,
  options?: { workspaceRoot?: string },
) {
  const fixtureUnit = getFixtureUnitById(reference);

  if (fixtureUnit) {
    return fixtureUnit;
  }

  return toEducationalUnitSpec(
    resolveFileBackedUnitVersionReference(reference, options).artifact,
  );
}

export function getSelectedReleaseUnit(
  unitId: string,
  options?: {
    data?: SiteSelectionData;
    experienceId?: string;
    releaseId?: string;
    workspaceRoot?: string;
  },
) {
  const selection = assertValidSiteSelection(options);
  const unitSelections = selection.resolvedUnitSelections.filter(
    (entry) => entry.unitId === unitId,
  );

  if (!unitSelections.length) {
    throw new Error(
      `The selected release does not include a unit reference for ${unitId}.`,
    );
  }

  if (unitSelections.length > 1) {
    throw new Error(
      `The selected release resolves multiple unit references for ${unitId}, which should have been rejected during validation.`,
    );
  }

  return resolveUnitSelectionToSpec(unitSelections[0]!, {
    workspaceRoot: options?.workspaceRoot,
  });
}
