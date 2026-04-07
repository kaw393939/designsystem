import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, join, resolve } from "node:path";

import {
  listSourceDocuments,
  readExperienceNorthStar,
  readModuleBrief,
  readUnitBrief,
  type ExperienceNorthStarRecord,
  type ModuleBriefRecord,
  type RegisteredSourceDocument,
  type SourceReference,
  type UnitBriefRecord,
} from "@/lib/source-unit-workflow";

const CONTENT_ROOT = "content";
const EXPERIENCE_PLAN_DIRECTORY = ["plans", "experiences"] as const;
const MODULE_PLAN_DIRECTORY = ["plans", "modules"] as const;
const EXPERIENCE_CONFIG_DIRECTORY = ["experiences"] as const;

type ExperienceSourceReference = string | SourceReference | { path?: string };

export type ExperienceConfigRecord = {
  schema: "experience/v1";
  id: string;
  title: string;
  theme: string;
  audience: string;
  homepage: string;
  navigation: string[];
  unitRefs: string[];
  visualRefs: string[];
  description?: string;
  moduleRefs?: string[];
  siteMetadata?: {
    title: string;
    description: string;
  };
};

export type ExperiencePlanArtifact = {
  filePath: string;
  data: ExperienceNorthStarRecord;
};

export type ExperienceConfigArtifact = {
  filePath: string;
  data: ExperienceConfigRecord;
};

export type ModulePlanArtifact = {
  filePath: string;
  data: ModuleBriefRecord;
};

export type ResolvedExperienceModule = {
  module: ModulePlanArtifact;
  unitBriefs: UnitBriefRecord[];
  sourceDocuments: RegisteredSourceDocument[];
};

export type ResolvedExperienceAssembly = {
  experience: ExperiencePlanArtifact;
  modules: ResolvedExperienceModule[];
  sourceDocuments: RegisteredSourceDocument[];
};

export type ExperiencePlanningIssueCode =
  | "duplicate_experience"
  | "duplicate_module"
  | "unknown_experience"
  | "unknown_experience_source"
  | "unknown_module_experience"
  | "unknown_module_source"
  | "unknown_candidate_unit"
  | "candidate_unit_experience_mismatch"
  | "candidate_unit_module_mismatch";

export type ExperiencePlanningIssue = {
  code: ExperiencePlanningIssueCode;
  message: string;
  experienceId?: string;
  moduleId?: string;
  unitId?: string;
  sourceId?: string;
};

function getWorkspaceRoot(workspaceRoot?: string) {
  return resolve(workspaceRoot ?? process.cwd());
}

function joinContentPath(
  workspaceRoot: string | undefined,
  ...segments: readonly string[]
) {
  return join(getWorkspaceRoot(workspaceRoot), CONTENT_ROOT, ...segments);
}

function readJsonObject(filePath: string, label: string) {
  const parsed = JSON.parse(readFileSync(filePath, "utf8")) as unknown;

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`${label} in ${filePath} must be a JSON object.`);
  }

  return parsed as Record<string, unknown>;
}

function getExperiencePlanDirectory(workspaceRoot?: string) {
  return joinContentPath(workspaceRoot, ...EXPERIENCE_PLAN_DIRECTORY);
}

function getModulePlanDirectory(workspaceRoot?: string) {
  return joinContentPath(workspaceRoot, ...MODULE_PLAN_DIRECTORY);
}

function getExperienceConfigDirectory(workspaceRoot?: string) {
  return joinContentPath(workspaceRoot, ...EXPERIENCE_CONFIG_DIRECTORY);
}

function getExperiencePlanPath(experienceId: string, workspaceRoot?: string) {
  return join(getExperiencePlanDirectory(workspaceRoot), `${experienceId}.yml`);
}

function getModulePlanPath(moduleId: string, workspaceRoot?: string) {
  return join(getModulePlanDirectory(workspaceRoot), `${moduleId}.yml`);
}

function getExperienceConfigPath(experienceId: string, workspaceRoot?: string) {
  return join(
    getExperienceConfigDirectory(workspaceRoot),
    `${experienceId}.json`,
  );
}

function listYamlIds(directoryPath: string) {
  if (!existsSync(directoryPath)) {
    return [] as string[];
  }

  return readdirSync(directoryPath)
    .filter(
      (fileName) => fileName.endsWith(".yml") || fileName.endsWith(".yaml"),
    )
    .map((fileName) =>
      basename(fileName, fileName.endsWith(".yaml") ? ".yaml" : ".yml"),
    )
    .sort((left, right) => left.localeCompare(right));
}

function listJsonIds(directoryPath: string) {
  if (!existsSync(directoryPath)) {
    return [] as string[];
  }

  return readdirSync(directoryPath)
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => basename(fileName, ".json"))
    .sort((left, right) => left.localeCompare(right));
}

function getDuplicateIds(items: Array<{ data: { id: string } }>) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const item of items) {
    if (seen.has(item.data.id)) {
      duplicates.add(item.data.id);
      continue;
    }

    seen.add(item.data.id);
  }

  return [...duplicates].sort((left, right) => left.localeCompare(right));
}

function resolvePlanningSourceReference(
  reference: ExperienceSourceReference,
  sources: RegisteredSourceDocument[],
) {
  if (typeof reference === "string") {
    return (
      sources.find(
        (source) =>
          source.data.id === reference || source.data.path === reference,
      ) ?? null
    );
  }

  if (!reference || typeof reference !== "object" || Array.isArray(reference)) {
    return null;
  }

  if ("sourceId" in reference && typeof reference.sourceId === "string") {
    return (
      sources.find((source) => source.data.id === reference.sourceId) ?? null
    );
  }

  if ("path" in reference && typeof reference.path === "string") {
    return (
      sources.find((source) => source.data.path === reference.path) ?? null
    );
  }

  return null;
}

function sortModulesBySequence(modules: ModulePlanArtifact[]) {
  return [...modules].sort((left, right) => {
    if (left.data.sequencePosition === right.data.sequencePosition) {
      return left.data.id.localeCompare(right.data.id);
    }

    return left.data.sequencePosition - right.data.sequencePosition;
  });
}

function asExperienceConfigRecord(
  record: Record<string, unknown>,
  filePath: string,
) {
  const siteMetadata = record.siteMetadata;

  if (
    siteMetadata !== undefined &&
    (!siteMetadata || typeof siteMetadata !== "object" || Array.isArray(siteMetadata))
  ) {
    throw new Error(`Expected siteMetadata in ${filePath} to be an object.`);
  }

  const moduleRefs = record.moduleRefs;

  if (
    moduleRefs !== undefined &&
    (!Array.isArray(moduleRefs) || moduleRefs.some((value) => typeof value !== "string"))
  ) {
    throw new Error(`Expected moduleRefs in ${filePath} to be an array of strings.`);
  }

  const visualRefs = record.visualRefs;

  if (
    visualRefs !== undefined &&
    (!Array.isArray(visualRefs) || visualRefs.some((value) => typeof value !== "string"))
  ) {
    throw new Error(`Expected visualRefs in ${filePath} to be an array of strings.`);
  }

  return {
    schema: String(record.schema ?? "") as "experience/v1",
    id: String(record.id ?? ""),
    title: String(record.title ?? ""),
    theme: String(record.theme ?? ""),
    audience: String(record.audience ?? ""),
    homepage: String(record.homepage ?? ""),
    navigation: Array.isArray(record.navigation)
      ? record.navigation.map((value) => String(value))
      : [],
    unitRefs: Array.isArray(record.unitRefs)
      ? record.unitRefs.map((value) => String(value))
      : [],
    visualRefs: Array.isArray(visualRefs)
      ? visualRefs.map((value) => String(value))
      : [],
    description:
      typeof record.description === "string" ? record.description : undefined,
    moduleRefs: Array.isArray(moduleRefs)
      ? moduleRefs.map((value) => String(value))
      : undefined,
    siteMetadata:
      siteMetadata && typeof siteMetadata === "object" && !Array.isArray(siteMetadata)
        ? {
            title: String((siteMetadata as Record<string, unknown>).title ?? ""),
            description: String(
              (siteMetadata as Record<string, unknown>).description ?? "",
            ),
          }
        : undefined,
  } satisfies ExperienceConfigRecord;
}

export function listExperienceNorthStars(options?: { workspaceRoot?: string }) {
  const workspaceRoot = getWorkspaceRoot(options?.workspaceRoot);

  return listYamlIds(getExperiencePlanDirectory(workspaceRoot)).map(
    (experienceId) => ({
      filePath: getExperiencePlanPath(experienceId, workspaceRoot),
      data: readExperienceNorthStar(experienceId, { workspaceRoot }),
    }),
  ) satisfies ExperiencePlanArtifact[];
}

export function listModuleBriefs(options?: { workspaceRoot?: string }) {
  const workspaceRoot = getWorkspaceRoot(options?.workspaceRoot);

  return sortModulesBySequence(
    listYamlIds(getModulePlanDirectory(workspaceRoot)).map((moduleId) => ({
      filePath: getModulePlanPath(moduleId, workspaceRoot),
      data: readModuleBrief(moduleId, { workspaceRoot }),
    })),
  );
}

export function listExperienceConfigs(options?: { workspaceRoot?: string }) {
  const workspaceRoot = getWorkspaceRoot(options?.workspaceRoot);

  return listJsonIds(getExperienceConfigDirectory(workspaceRoot)).map(
    (experienceId) => ({
      filePath: getExperienceConfigPath(experienceId, workspaceRoot),
      data: asExperienceConfigRecord(
        readJsonObject(
          getExperienceConfigPath(experienceId, workspaceRoot),
          "experience config",
        ),
        getExperienceConfigPath(experienceId, workspaceRoot),
      ),
    }),
  ) satisfies ExperienceConfigArtifact[];
}

export function readExperienceConfig(
  experienceId: string,
  options?: { workspaceRoot?: string },
) {
  const workspaceRoot = getWorkspaceRoot(options?.workspaceRoot);
  const filePath = getExperienceConfigPath(experienceId, workspaceRoot);

  if (!existsSync(filePath)) {
    throw new Error(`Experience config ${experienceId} does not exist at ${filePath}.`);
  }

  return {
    filePath,
    data: asExperienceConfigRecord(readJsonObject(filePath, "experience config"), filePath),
  } satisfies ExperienceConfigArtifact;
}

export function validateExperiencePlanningArtifacts(options?: {
  workspaceRoot?: string;
}) {
  const workspaceRoot = getWorkspaceRoot(options?.workspaceRoot);
  const issues: ExperiencePlanningIssue[] = [];
  const experiences = listExperienceNorthStars({ workspaceRoot });
  const modules = listModuleBriefs({ workspaceRoot });
  const sources = listSourceDocuments({ workspaceRoot });
  const experienceIds = new Set(
    experiences.map((experience) => experience.data.id),
  );

  for (const experienceId of getDuplicateIds(experiences)) {
    issues.push({
      code: "duplicate_experience",
      message: `Experience planning artifacts contain duplicate id ${experienceId}.`,
      experienceId,
    });
  }

  for (const moduleId of getDuplicateIds(modules)) {
    issues.push({
      code: "duplicate_module",
      message: `Module planning artifacts contain duplicate id ${moduleId}.`,
      moduleId,
    });
  }

  for (const experience of experiences) {
    for (const sourceRef of experience.data
      .sourceRefs as ExperienceSourceReference[]) {
      const source = resolvePlanningSourceReference(sourceRef, sources);

      if (source) {
        continue;
      }

      const sourceId =
        typeof sourceRef === "string"
          ? sourceRef
          : "sourceId" in sourceRef && typeof sourceRef.sourceId === "string"
            ? sourceRef.sourceId
            : "path" in sourceRef && typeof sourceRef.path === "string"
              ? sourceRef.path
              : undefined;

      issues.push({
        code: "unknown_experience_source",
        message: `Experience ${experience.data.id} references unknown source ${sourceId ?? "(unreadable source reference)"}.`,
        experienceId: experience.data.id,
        sourceId,
      });
    }
  }

  for (const moduleArtifact of modules) {
    if (!experienceIds.has(moduleArtifact.data.experienceId)) {
      issues.push({
        code: "unknown_module_experience",
        message: `Module ${moduleArtifact.data.id} references unknown experience ${moduleArtifact.data.experienceId}.`,
        experienceId: moduleArtifact.data.experienceId,
        moduleId: moduleArtifact.data.id,
      });
    }

    for (const sourceRef of (moduleArtifact.data.sourceRefs ??
      []) as ExperienceSourceReference[]) {
      const source = resolvePlanningSourceReference(sourceRef, sources);

      if (source) {
        continue;
      }

      const sourceId =
        typeof sourceRef === "string"
          ? sourceRef
          : "sourceId" in sourceRef && typeof sourceRef.sourceId === "string"
            ? sourceRef.sourceId
            : "path" in sourceRef && typeof sourceRef.path === "string"
              ? sourceRef.path
              : undefined;

      issues.push({
        code: "unknown_module_source",
        message: `Module ${moduleArtifact.data.id} references unknown source ${sourceId ?? "(unreadable source reference)"}.`,
        experienceId: moduleArtifact.data.experienceId,
        moduleId: moduleArtifact.data.id,
        sourceId,
      });
    }

    for (const unitId of moduleArtifact.data.candidateUnits) {
      let unitBrief: UnitBriefRecord;

      try {
        unitBrief = readUnitBrief(unitId, { workspaceRoot });
      } catch {
        issues.push({
          code: "unknown_candidate_unit",
          message: `Module ${moduleArtifact.data.id} references unknown unit brief ${unitId}.`,
          experienceId: moduleArtifact.data.experienceId,
          moduleId: moduleArtifact.data.id,
          unitId,
        });
        continue;
      }

      if (unitBrief.experienceId !== moduleArtifact.data.experienceId) {
        issues.push({
          code: "candidate_unit_experience_mismatch",
          message: `Unit brief ${unitId} belongs to experience ${unitBrief.experienceId}, not ${moduleArtifact.data.experienceId}.`,
          experienceId: moduleArtifact.data.experienceId,
          moduleId: moduleArtifact.data.id,
          unitId,
        });
      }

      if (unitBrief.moduleId !== moduleArtifact.data.id) {
        issues.push({
          code: "candidate_unit_module_mismatch",
          message: `Unit brief ${unitId} belongs to module ${unitBrief.moduleId}, not ${moduleArtifact.data.id}.`,
          experienceId: moduleArtifact.data.experienceId,
          moduleId: moduleArtifact.data.id,
          unitId,
        });
      }
    }
  }

  return issues.sort((left, right) =>
    left.message.localeCompare(right.message),
  );
}

export function resolveExperienceAssemblyPlan(
  experienceId: string,
  options?: { workspaceRoot?: string },
) {
  const workspaceRoot = getWorkspaceRoot(options?.workspaceRoot);
  const sources = listSourceDocuments({ workspaceRoot });
  const experience = listExperienceNorthStars({ workspaceRoot }).find(
    (candidate) => candidate.data.id === experienceId,
  );

  if (!experience) {
    return null;
  }

  const modules = listModuleBriefs({ workspaceRoot }).filter(
    (module) => module.data.experienceId === experienceId,
  );
  const experienceSources = (
    experience.data.sourceRefs as ExperienceSourceReference[]
  )
    .map((sourceRef) => resolvePlanningSourceReference(sourceRef, sources))
    .filter((source): source is RegisteredSourceDocument => source !== null);

  return {
    experience,
    modules: modules.map((moduleArtifact) => ({
      module: moduleArtifact,
      unitBriefs: moduleArtifact.data.candidateUnits.map((unitId) =>
        readUnitBrief(unitId, { workspaceRoot }),
      ),
      sourceDocuments: (
        (moduleArtifact.data.sourceRefs ?? []) as ExperienceSourceReference[]
      )
        .map((sourceRef) => resolvePlanningSourceReference(sourceRef, sources))
        .filter(
          (source): source is RegisteredSourceDocument => source !== null,
        ),
    })),
    sourceDocuments: experienceSources,
  } satisfies ResolvedExperienceAssembly;
}

export function assertValidExperienceAssemblyPlan(
  experienceId: string,
  options?: { workspaceRoot?: string },
) {
  const assembly = resolveExperienceAssemblyPlan(experienceId, options);

  if (!assembly) {
    throw new Error(
      `Experience ${experienceId} does not have a planning artifact.`,
    );
  }

  const moduleIds = new Set(
    assembly.modules.map((moduleArtifact) => moduleArtifact.module.data.id),
  );
  const unitIds = new Set(
    assembly.modules.flatMap((moduleArtifact) =>
      moduleArtifact.unitBriefs.map((unitBrief) => unitBrief.id),
    ),
  );
  const issues = validateExperiencePlanningArtifacts(options).filter(
    (issue) => {
      if (issue.experienceId === experienceId) {
        return true;
      }

      if (issue.moduleId && moduleIds.has(issue.moduleId)) {
        return true;
      }

      return Boolean(issue.unitId && unitIds.has(issue.unitId));
    },
  );

  if (issues.length) {
    throw new Error(issues.map((issue) => issue.message).join(" "));
  }

  return assembly;
}
