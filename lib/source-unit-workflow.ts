import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, extname, join, relative, resolve } from "node:path";

import { parse, stringify } from "yaml";

import type {
  EducationalUnitSpec,
  UnitBlockSpec,
} from "./educational-contracts";
import type { PageRecipeId } from "./page-recipes";

const CONTENT_ROOT = "content";
const SOURCE_DIRECTORY = ["sources"] as const;
const EXPERIENCE_PLAN_DIRECTORY = ["plans", "experiences"] as const;
const MODULE_PLAN_DIRECTORY = ["plans", "modules"] as const;
const UNIT_BRIEF_DIRECTORY = ["briefs", "units"] as const;
const UNIT_DRAFT_DIRECTORY = ["drafts", "units"] as const;
const UNIT_REVIEW_DIRECTORY = ["reviews", "units"] as const;
const UNIT_VERSION_DIRECTORY = ["units"] as const;

type UnknownRecord = Record<string, unknown>;

export type SourceDocumentRecord = {
  schema: "source-document/v1";
  id: string;
  title: string;
  path: string;
  topics: string[];
  status: string;
  registeredAt?: string;
};

export type SourceReference = {
  sourceId: string;
  sections?: string[];
};

export type ExperienceNorthStarRecord = {
  schema: "experience-north-star/v1";
  id: string;
  title: string;
  audience: string[];
  learnerTransformation: string;
  curatorialThesis: string;
  siteMode: string;
  sourceRefs: Array<string | SourceReference>;
  primaryRecipes: string[];
  requiredVisualClasses: string[];
  description?: string;
};

export type ModuleBriefRecord = {
  schema: "module-brief/v1";
  id: string;
  experienceId: string;
  title: string;
  job: string;
  sequencePosition: number;
  learningOutcomes: string[];
  curatorialQuestions: string[];
  candidateUnits: string[];
  sourceRefs?: Array<string | SourceReference>;
};

export type UnitBriefRecord = {
  schema: "unit-brief/v1";
  id: string;
  experienceId: string;
  moduleId: string;
  recipe: string;
  title: string;
  dominantJob: string;
  learningObjective: string;
  curatorialJob: string;
  targetAudience: string[];
  sourceRefs: Array<string | SourceReference>;
  misconceptions?: string[];
  requiredEvidence?: string[];
  requiredVisuals?: string[];
  assessmentIdea?: string;
  nextStepIntent?: string;
  notes?: string[];
};

export type UnitDraftRecord = {
  schema: "unit-draft/v1";
  id: string;
  status: string;
  kind: string;
  recipe: string;
  title: string;
  objective: string;
  audiences: string[];
  sourceRefs: SourceReference[];
  blocks: UnknownRecord[];
  summary?: string;
  tags?: string[];
  module?: string;
  visualDraftRefs?: string[];
  basedOnVersion?: string | null;
  notes?: string[];
  briefRef?: string;
};

export type UnitVersionRecord = {
  schema: "unit/v2";
  id: string;
  version: string;
  status: string;
  kind: string;
  recipe: string;
  title: string;
  objective: string;
  audiences: string[];
  sourceRefs: SourceReference[];
  blocks: UnknownRecord[];
  supersedes: string | null;
  summary?: string;
  tags?: string[];
  module?: string;
  visualRefs?: string[];
  next?: string;
  notes?: string[];
  reviewRefs?: string[];
  briefRef?: string;
};

export type ReviewRecord = {
  schema: "review-record/v1";
  id: string;
  targetType: string;
  targetId: string;
  targetVersion: string;
  reviewerRole: string;
  outcome: string;
  findings: Array<{
    severity: string;
    summary: string;
    detail?: string;
  }>;
  createdAt: string;
  requestedNextStep?: string;
};

export type MarkdownArtifact<T extends UnknownRecord> = {
  filePath: string;
  data: T;
  body: string;
};

export type RegisteredSourceDocument = MarkdownArtifact<SourceDocumentRecord>;
export type DraftArtifact = MarkdownArtifact<UnitDraftRecord>;
export type VersionArtifact = MarkdownArtifact<UnitVersionRecord>;
export type ReviewArtifact = MarkdownArtifact<ReviewRecord>;

export type RegisterSourceDocumentInput = {
  path: string;
  id?: string;
  title?: string;
  topics?: string[];
  workspaceRoot?: string;
  now?: string;
};

export type RegisterSourceDocumentResult = {
  created: boolean;
  artifact: RegisteredSourceDocument;
};

export type StartUnitDraftInput = {
  unitId: string;
  kind: string;
  recipe: PageRecipeId;
  sourceId: string;
  workspaceRoot?: string;
};

export type StartUnitDraftResult = {
  created: boolean;
  artifact: DraftArtifact;
};

export type ShowUnitArtifactInput = {
  unitId: string;
  workspaceRoot?: string;
  draft?: boolean;
  version?: string;
};

export type ShowUnitArtifactResult =
  | ({ mode: "draft" } & DraftArtifact)
  | ({ mode: "version" } & VersionArtifact);

export type FreezeUnitDraftInput = {
  unitId: string;
  workspaceRoot?: string;
  now?: string;
};

export type ReviewOutcome = "approved" | "changes_requested" | "blocked";

export type RequestUnitReviewInput = {
  unitId: string;
  version: string;
  workspaceRoot?: string;
};

export type RequestUnitReviewResult = {
  requested: boolean;
  artifact: VersionArtifact;
};

export type CreateUnitReviewInput = {
  unitId: string;
  version: string;
  reviewerRole: string;
  outcome: ReviewOutcome;
  findings: ReviewRecord["findings"];
  requestedNextStep?: string;
  workspaceRoot?: string;
  now?: string;
};

export type CreateUnitReviewResult = {
  review: ReviewArtifact;
  artifact: VersionArtifact;
};

export type ReviseUnitDraftInput = {
  unitId: string;
  fromVersion: string;
  reviewId: string;
  workspaceRoot?: string;
};

export type ReviseUnitDraftResult = {
  created: boolean;
  artifact: DraftArtifact;
};

export type ApproveUnitVersionInput = {
  unitId: string;
  version: string;
  workspaceRoot?: string;
};

export type ApproveUnitVersionResult = {
  approved: boolean;
  artifact: VersionArtifact;
};

export type FileBackedUnitVersionReference = {
  reference: string;
  unitId: string;
  version: string;
};

export type PublishableUnitVersionSummary = {
  reference: string;
  unitId: string;
  version: string;
  status: string;
  kind: string;
  filePath: string;
};

function toPosixPath(value: string) {
  return value.replaceAll("\\", "/");
}

function ensureObject(value: unknown, filePath: string, label: string) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} in ${filePath} must be a YAML object.`);
  }

  return value as UnknownRecord;
}

function getRequiredString(
  record: UnknownRecord,
  key: string,
  filePath: string,
) {
  const value = record[key];

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Expected ${key} in ${filePath} to be a non-empty string.`);
  }

  return value;
}

function getOptionalString(record: UnknownRecord, key: string) {
  const value = record[key];

  if (typeof value === "string" && value.trim()) {
    return value;
  }

  return undefined;
}

function getRequiredStringArray(
  record: UnknownRecord,
  key: string,
  filePath: string,
) {
  const value = record[key];

  if (
    !Array.isArray(value) ||
    value.some((entry) => typeof entry !== "string")
  ) {
    throw new Error(
      `Expected ${key} in ${filePath} to be an array of strings.`,
    );
  }

  return value as string[];
}

function getOptionalStringArray(
  record: UnknownRecord,
  key: string,
  filePath: string,
) {
  if (!(key in record) || record[key] === undefined) {
    return undefined;
  }

  return getRequiredStringArray(record, key, filePath);
}

function getRequiredNumber(
  record: UnknownRecord,
  key: string,
  filePath: string,
) {
  const value = record[key];

  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`Expected ${key} in ${filePath} to be a number.`);
  }

  return value;
}

function getRequiredObjectArray(
  record: UnknownRecord,
  key: string,
  filePath: string,
) {
  const value = record[key];

  if (
    !Array.isArray(value) ||
    value.some(
      (entry) => !entry || typeof entry !== "object" || Array.isArray(entry),
    )
  ) {
    throw new Error(
      `Expected ${key} in ${filePath} to be an array of objects.`,
    );
  }

  return value as UnknownRecord[];
}

function parseYamlObject<T extends UnknownRecord>(
  yamlText: string,
  filePath: string,
  label: string,
) {
  return ensureObject(parse(yamlText), filePath, label) as T;
}

function splitFrontmatter(content: string, filePath: string) {
  const normalizedContent = content.replace(/\r\n/g, "\n");

  if (!normalizedContent.startsWith("---\n")) {
    throw new Error(`Expected ${filePath} to begin with YAML frontmatter.`);
  }

  const endMarkerIndex = normalizedContent.indexOf("\n---\n", 4);

  if (endMarkerIndex === -1) {
    throw new Error(
      `Expected ${filePath} to contain a closing frontmatter marker.`,
    );
  }

  return {
    frontmatterText: normalizedContent.slice(4, endMarkerIndex),
    body: normalizedContent.slice(endMarkerIndex + 5).trim(),
  };
}

function getWorkspaceRoot(workspaceRoot?: string) {
  return resolve(workspaceRoot ?? process.cwd());
}

function getContentRoot(workspaceRoot?: string) {
  return join(getWorkspaceRoot(workspaceRoot), CONTENT_ROOT);
}

function joinContentPath(
  workspaceRoot: string | undefined,
  ...segments: readonly string[]
) {
  return join(getContentRoot(workspaceRoot), ...segments);
}

function ensureDirectory(filePath: string) {
  mkdirSync(dirname(filePath), { recursive: true });
}

function readYamlArtifact<T extends UnknownRecord>(
  filePath: string,
  label: string,
) {
  return parseYamlObject<T>(readFileSync(filePath, "utf8"), filePath, label);
}

function readMarkdownArtifact<T extends UnknownRecord>(
  filePath: string,
  label: string,
) {
  const content = readFileSync(filePath, "utf8");
  const { frontmatterText, body } = splitFrontmatter(content, filePath);

  return {
    filePath,
    data: parseYamlObject<T>(frontmatterText, filePath, label),
    body,
  } satisfies MarkdownArtifact<T>;
}

export function writeYamlArtifact(filePath: string, data: UnknownRecord) {
  ensureDirectory(filePath);
  writeFileSync(filePath, `${stringify(data).trimEnd()}\n`, "utf8");
}

function writeMarkdownArtifact(
  filePath: string,
  data: UnknownRecord,
  body = "",
) {
  ensureDirectory(filePath);
  const serializedFrontmatter = stringify(data).trimEnd();
  const trimmedBody = body.trim();
  const content = trimmedBody
    ? `---\n${serializedFrontmatter}\n---\n\n${trimmedBody}\n`
    : `---\n${serializedFrontmatter}\n---\n`;

  writeFileSync(filePath, content, "utf8");
}

function humanizeId(value: string) {
  return value
    .split(/[-_]/u)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "")
    .replace(/-{2,}/gu, "-");
}

function inferSourceIdFromPath(sourcePath: string) {
  return slugify(basename(sourcePath, extname(sourcePath)));
}

function inferTitleFromMarkdown(content: string, fallbackId: string) {
  const normalizedContent = content.replace(/\r\n/g, "\n");
  const titleLine = normalizedContent
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.startsWith("# "));

  return titleLine
    ? titleLine.replace(/^#\s+/u, "").trim()
    : humanizeId(fallbackId);
}

function extractSummaryFromMarkdown(content: string) {
  const normalizedContent = content.replace(/\r\n/g, "\n");

  return (
    normalizedContent
      .split("\n")
      .map((line) => line.trim())
      .find((line) => line && !line.startsWith("#")) ?? ""
  );
}

function inferTopics(sourceId: string) {
  const parts = sourceId.split("-").filter(Boolean);
  return parts.length ? parts : [sourceId];
}

function asSourceDocumentRecord(record: UnknownRecord, filePath: string) {
  return {
    schema: getRequiredString(
      record,
      "schema",
      filePath,
    ) as "source-document/v1",
    id: getRequiredString(record, "id", filePath),
    title: getRequiredString(record, "title", filePath),
    path: getRequiredString(record, "path", filePath),
    topics: getRequiredStringArray(record, "topics", filePath),
    status: getRequiredString(record, "status", filePath),
    registeredAt: getOptionalString(record, "registeredAt"),
  } satisfies SourceDocumentRecord;
}

function asUnitBriefRecord(record: UnknownRecord, filePath: string) {
  const sourceRefs = record.sourceRefs;

  if (!Array.isArray(sourceRefs)) {
    throw new Error(`Expected sourceRefs in ${filePath} to be an array.`);
  }

  return {
    schema: getRequiredString(record, "schema", filePath) as "unit-brief/v1",
    id: getRequiredString(record, "id", filePath),
    experienceId: getRequiredString(record, "experienceId", filePath),
    moduleId: getRequiredString(record, "moduleId", filePath),
    recipe: getRequiredString(record, "recipe", filePath),
    title: getRequiredString(record, "title", filePath),
    dominantJob: getRequiredString(record, "dominantJob", filePath),
    learningObjective: getRequiredString(record, "learningObjective", filePath),
    curatorialJob: getRequiredString(record, "curatorialJob", filePath),
    targetAudience: getRequiredStringArray(record, "targetAudience", filePath),
    sourceRefs: sourceRefs as Array<string | SourceReference>,
    misconceptions: getOptionalStringArray(record, "misconceptions", filePath),
    requiredEvidence: getOptionalStringArray(
      record,
      "requiredEvidence",
      filePath,
    ),
    requiredVisuals: getOptionalStringArray(
      record,
      "requiredVisuals",
      filePath,
    ),
    assessmentIdea: getOptionalString(record, "assessmentIdea"),
    nextStepIntent: getOptionalString(record, "nextStepIntent"),
    notes: getOptionalStringArray(record, "notes", filePath),
  } satisfies UnitBriefRecord;
}

function asSourceReference(record: unknown, filePath: string) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new Error(
      `Expected source reference in ${filePath} to be an object.`,
    );
  }

  const sourceRecord = record as UnknownRecord;
  const sourceId = getRequiredString(sourceRecord, "sourceId", filePath);
  const sections = getOptionalStringArray(sourceRecord, "sections", filePath);

  return {
    sourceId,
    sections,
  } satisfies SourceReference;
}

function asUnitDraftRecord(record: UnknownRecord, filePath: string) {
  return {
    schema: getRequiredString(record, "schema", filePath) as "unit-draft/v1",
    id: getRequiredString(record, "id", filePath),
    status: getRequiredString(record, "status", filePath),
    kind: getRequiredString(record, "kind", filePath),
    recipe: getRequiredString(record, "recipe", filePath),
    title: getRequiredString(record, "title", filePath),
    objective: getRequiredString(record, "objective", filePath),
    audiences: getRequiredStringArray(record, "audiences", filePath),
    sourceRefs: getRequiredObjectArray(record, "sourceRefs", filePath).map(
      (entry) => asSourceReference(entry, filePath),
    ),
    blocks: getRequiredObjectArray(record, "blocks", filePath),
    summary: getOptionalString(record, "summary"),
    tags: getOptionalStringArray(record, "tags", filePath),
    module: getOptionalString(record, "module"),
    visualDraftRefs: getOptionalStringArray(
      record,
      "visualDraftRefs",
      filePath,
    ),
    basedOnVersion:
      typeof record.basedOnVersion === "string" ||
      record.basedOnVersion === null
        ? (record.basedOnVersion as string | null | undefined)
        : undefined,
    notes: getOptionalStringArray(record, "notes", filePath),
    briefRef: getOptionalString(record, "briefRef"),
  } satisfies UnitDraftRecord;
}

function asUnitVersionRecord(record: UnknownRecord, filePath: string) {
  const supersedes = record.supersedes;

  if (typeof supersedes !== "string" && supersedes !== null) {
    throw new Error(
      `Expected supersedes in ${filePath} to be a string or null.`,
    );
  }

  return {
    schema: getRequiredString(record, "schema", filePath) as "unit/v2",
    id: getRequiredString(record, "id", filePath),
    version: getRequiredString(record, "version", filePath),
    status: getRequiredString(record, "status", filePath),
    kind: getRequiredString(record, "kind", filePath),
    recipe: getRequiredString(record, "recipe", filePath),
    title: getRequiredString(record, "title", filePath),
    objective: getRequiredString(record, "objective", filePath),
    audiences: getRequiredStringArray(record, "audiences", filePath),
    sourceRefs: getRequiredObjectArray(record, "sourceRefs", filePath).map(
      (entry) => asSourceReference(entry, filePath),
    ),
    blocks: getRequiredObjectArray(record, "blocks", filePath),
    supersedes,
    summary: getOptionalString(record, "summary"),
    tags: getOptionalStringArray(record, "tags", filePath),
    module: getOptionalString(record, "module"),
    visualRefs: getOptionalStringArray(record, "visualRefs", filePath),
    next: getOptionalString(record, "next"),
    notes: getOptionalStringArray(record, "notes", filePath),
    reviewRefs: getOptionalStringArray(record, "reviewRefs", filePath),
    briefRef: getOptionalString(record, "briefRef"),
  } satisfies UnitVersionRecord;
}

function asReviewRecord(record: UnknownRecord, filePath: string) {
  return {
    schema: getRequiredString(record, "schema", filePath) as "review-record/v1",
    id: getRequiredString(record, "id", filePath),
    targetType: getRequiredString(record, "targetType", filePath),
    targetId: getRequiredString(record, "targetId", filePath),
    targetVersion: getRequiredString(record, "targetVersion", filePath),
    reviewerRole: getRequiredString(record, "reviewerRole", filePath),
    outcome: getRequiredString(record, "outcome", filePath),
    findings: getRequiredObjectArray(record, "findings", filePath).map(
      (entry) => ({
        severity: getRequiredString(entry, "severity", filePath),
        summary: getRequiredString(entry, "summary", filePath),
        detail: getOptionalString(entry, "detail"),
      }),
    ),
    createdAt: getRequiredString(record, "createdAt", filePath),
    requestedNextStep: getOptionalString(record, "requestedNextStep"),
  } satisfies ReviewRecord;
}

function getSourceDirectory(workspaceRoot?: string) {
  return joinContentPath(workspaceRoot, ...SOURCE_DIRECTORY);
}

function getExperiencePlanDirectory(workspaceRoot?: string) {
  return joinContentPath(workspaceRoot, ...EXPERIENCE_PLAN_DIRECTORY);
}

function getModulePlanDirectory(workspaceRoot?: string) {
  return joinContentPath(workspaceRoot, ...MODULE_PLAN_DIRECTORY);
}

function getUnitBriefDirectory(workspaceRoot?: string) {
  return joinContentPath(workspaceRoot, ...UNIT_BRIEF_DIRECTORY);
}

function getUnitDraftDirectory(workspaceRoot?: string) {
  return joinContentPath(workspaceRoot, ...UNIT_DRAFT_DIRECTORY);
}

export function getUnitReviewDirectory(workspaceRoot?: string) {
  return joinContentPath(workspaceRoot, ...UNIT_REVIEW_DIRECTORY);
}

function getReviewArtifactPath(reviewId: string, workspaceRoot?: string) {
  return join(getUnitReviewDirectory(workspaceRoot), `${reviewId}.md`);
}

function getUnitVersionRootDirectory(workspaceRoot?: string) {
  return joinContentPath(workspaceRoot, ...UNIT_VERSION_DIRECTORY);
}

function getSourceArtifactPath(sourceId: string, workspaceRoot?: string) {
  return join(getSourceDirectory(workspaceRoot), `${sourceId}.md`);
}

export function getUnitBriefPath(unitId: string, workspaceRoot?: string) {
  return join(getUnitBriefDirectory(workspaceRoot), `${unitId}.yml`);
}

export function getUnitDraftPath(unitId: string, workspaceRoot?: string) {
  return join(getUnitDraftDirectory(workspaceRoot), `${unitId}.md`);
}

export function getUnitVersionDirectory(
  unitId: string,
  workspaceRoot?: string,
) {
  return join(getUnitVersionRootDirectory(workspaceRoot), unitId, "versions");
}

export function getUnitVersionPath(
  unitId: string,
  version: string,
  workspaceRoot?: string,
) {
  return join(getUnitVersionDirectory(unitId, workspaceRoot), `${version}.md`);
}

function listMarkdownFiles(directoryPath: string) {
  if (!existsSync(directoryPath)) {
    return [] as string[];
  }

  return readdirSync(directoryPath)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => join(directoryPath, fileName))
    .sort((left, right) => left.localeCompare(right));
}

function listUnitVersionFiles(unitId: string, workspaceRoot?: string) {
  return listMarkdownFiles(getUnitVersionDirectory(unitId, workspaceRoot));
}

function listUnitDirectories(workspaceRoot?: string) {
  const versionRoot = getUnitVersionRootDirectory(workspaceRoot);

  if (!existsSync(versionRoot)) {
    return [] as string[];
  }

  return readdirSync(versionRoot)
    .map((entry) => join(versionRoot, entry))
    .filter((entry) => statSync(entry).isDirectory())
    .sort((left, right) => left.localeCompare(right));
}

export function formatUnitVersionTimestamp(now = new Date().toISOString()) {
  const normalized = now.replace(/\.\d{3}Z$/u, "Z").replace(/:/gu, "");
  return `v${normalized}`;
}

function getRelativeWorkspacePath(filePath: string, workspaceRoot?: string) {
  return toPosixPath(relative(getWorkspaceRoot(workspaceRoot), filePath));
}

export function listSourceDocuments(options?: { workspaceRoot?: string }) {
  return listMarkdownFiles(getSourceDirectory(options?.workspaceRoot))
    .map((filePath) => {
      const artifact = readMarkdownArtifact<SourceDocumentRecord>(
        filePath,
        "source document",
      );

      return {
        ...artifact,
        data: asSourceDocumentRecord(artifact.data, filePath),
      } satisfies RegisteredSourceDocument;
    })
    .sort((left, right) => left.data.id.localeCompare(right.data.id));
}

export function readUnitBrief(
  unitId: string,
  options?: { workspaceRoot?: string },
) {
  const filePath = getUnitBriefPath(unitId, options?.workspaceRoot);

  if (!existsSync(filePath)) {
    throw new Error(`Unit brief ${unitId} does not exist at ${filePath}.`);
  }

  return asUnitBriefRecord(
    readYamlArtifact<UnitBriefRecord>(filePath, "unit brief"),
    filePath,
  );
}

export function readUnitDraft(
  unitId: string,
  options?: { workspaceRoot?: string },
) {
  const filePath = getUnitDraftPath(unitId, options?.workspaceRoot);

  if (!existsSync(filePath)) {
    throw new Error(`Unit draft ${unitId} does not exist at ${filePath}.`);
  }

  const artifact = readMarkdownArtifact<UnitDraftRecord>(
    filePath,
    "unit draft",
  );

  return {
    ...artifact,
    data: asUnitDraftRecord(artifact.data, filePath),
  } satisfies DraftArtifact;
}

export function readUnitVersion(
  unitId: string,
  version: string,
  options?: { workspaceRoot?: string },
) {
  const filePath = getUnitVersionPath(unitId, version, options?.workspaceRoot);

  if (!existsSync(filePath)) {
    throw new Error(
      `Unit version ${unitId}@${version} does not exist at ${filePath}.`,
    );
  }

  const artifact = readMarkdownArtifact<UnitVersionRecord>(
    filePath,
    "unit version",
  );

  return {
    ...artifact,
    data: asUnitVersionRecord(artifact.data, filePath),
  } satisfies VersionArtifact;
}

export function readUnitReviewRecord(
  reviewId: string,
  options?: { workspaceRoot?: string },
) {
  const filePath = getReviewArtifactPath(reviewId, options?.workspaceRoot);

  if (!existsSync(filePath)) {
    throw new Error(`Review record ${reviewId} does not exist at ${filePath}.`);
  }

  const artifact = readMarkdownArtifact<ReviewRecord>(
    filePath,
    "review record",
  );

  return {
    ...artifact,
    data: asReviewRecord(artifact.data, filePath),
  } satisfies ReviewArtifact;
}

export function listUnitReviewRecords(options?: {
  workspaceRoot?: string;
  unitId?: string;
  version?: string;
}) {
  return listMarkdownFiles(getUnitReviewDirectory(options?.workspaceRoot))
    .map((filePath) => {
      const artifact = readMarkdownArtifact<ReviewRecord>(
        filePath,
        "review record",
      );

      return {
        ...artifact,
        data: asReviewRecord(artifact.data, filePath),
      } satisfies ReviewArtifact;
    })
    .filter((artifact) => artifact.data.targetType === "unit")
    .filter((artifact) =>
      options?.unitId ? artifact.data.targetId === options.unitId : true,
    )
    .filter((artifact) =>
      options?.version ? artifact.data.targetVersion === options.version : true,
    )
    .sort((left, right) => left.data.id.localeCompare(right.data.id));
}

export function formatUnitVersionReference(unitId: string, version: string) {
  return `${unitId}@${version}`;
}

export function parseUnitVersionReference(reference: string) {
  const separatorIndex = reference.lastIndexOf("@");

  if (separatorIndex <= 0 || separatorIndex === reference.length - 1) {
    return null;
  }

  const unitId = reference.slice(0, separatorIndex).trim();
  const version = reference.slice(separatorIndex + 1).trim();

  if (!unitId || !version) {
    return null;
  }

  return {
    reference,
    unitId,
    version,
  } satisfies FileBackedUnitVersionReference;
}

export function isPublishableUnitStatus(status: string) {
  return status === "approved" || status === "published";
}

export function listFileBackedUnitVersions(options?: {
  workspaceRoot?: string;
}) {
  return listUnitDirectories(options?.workspaceRoot).flatMap(
    (directoryPath) => {
      const unitId = basename(directoryPath);

      return listUnitVersionFiles(unitId, options?.workspaceRoot).map(
        (filePath) => {
          const version = basename(filePath, ".md");
          return readUnitVersion(unitId, version, options);
        },
      );
    },
  );
}

export function listPublishableUnitVersions(options?: {
  workspaceRoot?: string;
}) {
  return listFileBackedUnitVersions(options)
    .filter((artifact) => isPublishableUnitStatus(artifact.data.status))
    .map((artifact) => ({
      reference: formatUnitVersionReference(
        artifact.data.id,
        artifact.data.version,
      ),
      unitId: artifact.data.id,
      version: artifact.data.version,
      status: artifact.data.status,
      kind: artifact.data.kind,
      filePath: artifact.filePath,
    }))
    .sort((left, right) => left.reference.localeCompare(right.reference));
}

export function resolveFileBackedUnitVersionReference(
  reference: string,
  options?: { workspaceRoot?: string },
) {
  const parsedReference = parseUnitVersionReference(reference);

  if (!parsedReference) {
    throw new Error(
      `Expected ${reference} to use the unitId@version reference format.`,
    );
  }

  const artifact = readUnitVersion(
    parsedReference.unitId,
    parsedReference.version,
    options,
  );

  return {
    ...parsedReference,
    artifact,
  };
}

function dedupeStrings(values: string[] | undefined) {
  const seen = new Set<string>();
  const deduped: string[] = [];

  for (const value of values ?? []) {
    if (seen.has(value)) {
      continue;
    }

    seen.add(value);
    deduped.push(value);
  }

  return deduped;
}

function updateUnitVersionArtifact(
  unitId: string,
  version: string,
  updater: (data: UnitVersionRecord) => UnitVersionRecord,
  workspaceRoot?: string,
) {
  const artifact = readUnitVersion(unitId, version, { workspaceRoot });
  const updatedData = updater(structuredClone(artifact.data));

  writeMarkdownArtifact(artifact.filePath, updatedData, artifact.body);

  return {
    filePath: artifact.filePath,
    data: asUnitVersionRecord(updatedData, artifact.filePath),
    body: artifact.body,
  } satisfies VersionArtifact;
}

function getSourceDocumentById(sourceId: string, workspaceRoot?: string) {
  const artifact = listSourceDocuments({ workspaceRoot }).find(
    (entry) => entry.data.id === sourceId,
  );

  if (!artifact) {
    throw new Error(
      `Registered source ${sourceId} does not exist under content/sources/.`,
    );
  }

  return artifact;
}

function normalizeBriefSourceReference(
  reference: string | SourceReference,
  sources: RegisteredSourceDocument[],
  filePath: string,
) {
  if (typeof reference === "string") {
    const source = sources.find(
      (candidate) =>
        candidate.data.id === reference ||
        candidate.data.path === toPosixPath(reference),
    );

    if (!source) {
      throw new Error(
        `Unit brief ${filePath} references source ${reference}, but no registered source record matches it.`,
      );
    }

    return {
      sourceId: source.data.id,
    } satisfies SourceReference;
  }

  if (typeof reference !== "object" || !reference || Array.isArray(reference)) {
    throw new Error(
      `Expected sourceRefs in ${filePath} to contain strings or objects.`,
    );
  }

  const record = reference as UnknownRecord;
  const sourceId = getOptionalString(record, "sourceId");
  const sourcePath = getOptionalString(record, "path");
  const source = sources.find(
    (candidate) =>
      candidate.data.id === sourceId ||
      candidate.data.path ===
        (sourcePath ? toPosixPath(sourcePath) : undefined),
  );

  if (!source) {
    throw new Error(
      `Unit brief ${filePath} references an unregistered source via ${sourceId ?? sourcePath ?? "unknown reference"}.`,
    );
  }

  const sections = getOptionalStringArray(record, "sections", filePath);

  return {
    sourceId: source.data.id,
    sections,
  } satisfies SourceReference;
}

function buildDraftBody(
  brief: UnitBriefRecord,
  source: RegisteredSourceDocument,
) {
  return [
    `Draft scaffold started from UnitBrief ${brief.id}.`,
    ``,
    `Canonical source: ${source.data.path}`,
    ``,
    `Replace the placeholder block copy below with researched content before freezing a publishable version.`,
  ].join("\n");
}

function buildDraftBlocksForRecipe(
  recipe: PageRecipeId,
  title: string,
  objective: string,
  source: RegisteredSourceDocument,
) {
  const heroBlock = {
    type: "hero",
    title,
    dek: objective,
  } satisfies UnknownRecord;
  const whyItMattersBlock = {
    type: "whyItMatters",
    summary: objective,
    stakes: `Ground this page in ${source.data.title} before freezing an immutable version.`,
  } satisfies UnknownRecord;
  const sectionBlock = {
    type: "section",
    id: "core-section",
    title: `Develop the core claim for ${title}`,
    body: `Replace this placeholder with sourced instructional content from ${source.data.title}.`,
  } satisfies UnknownRecord;
  const nextStepBlock = {
    type: "nextStep",
    title: `Decide the next instructional move for ${title}`,
    primaryAction: {
      label: "Name the next unit",
      href: "/status/",
      kind: "primary",
    },
  } satisfies UnknownRecord;

  switch (recipe) {
    case "learning-homepage":
      return [
        heroBlock,
        whyItMattersBlock,
        {
          type: "conceptGrid",
          items: [
            {
              title: "Add the first orientation card",
              summary: `Summarize one key idea from ${source.data.title}.`,
            },
          ],
        },
        {
          type: "sourceAnchorGrid",
          items: [
            {
              title: source.data.title,
              description: `Canonical research input recorded at ${source.data.path}.`,
              href: source.data.path,
              type: "Source document",
            },
          ],
        },
        nextStepBlock,
      ];
    case "module-overview":
      return [
        heroBlock,
        whyItMattersBlock,
        {
          type: "sequenceTimeline",
          mode: "process",
          items: [
            {
              label: "1",
              title: "Outline the module sequence",
              summary: `Turn ${source.data.title} into one bounded module arc.`,
            },
          ],
        },
        {
          type: "conceptGrid",
          items: [
            {
              title: "Define the first module concept",
              summary: objective,
            },
          ],
        },
        sectionBlock,
        nextStepBlock,
      ];
    case "lesson-page":
      return [
        heroBlock,
        whyItMattersBlock,
        sectionBlock,
        {
          type: "workedExample",
          id: "worked-example",
          prompt: `Show one concrete teaching move derived from ${source.data.title}.`,
          steps: [
            {
              title: "Replace this placeholder step",
              body: `Use a sourced example from ${source.data.title}.`,
            },
          ],
        },
        {
          type: "summaryGrid",
          items: [
            {
              title: "Summarize the lesson",
              takeaway: objective,
            },
          ],
        },
        {
          type: "reflectionPrompt",
          prompt: `What still needs stronger evidence from ${source.data.title}?`,
        },
        nextStepBlock,
      ];
    case "concept-explainer":
      return [
        heroBlock,
        whyItMattersBlock,
        {
          ...sectionBlock,
          id: "definition",
          title: `Define the core concept behind ${title}`,
        },
        {
          type: "comparisonGrid",
          id: "comparison",
          columns: [
            {
              key: "primary",
              label: "Primary signal",
            },
            {
              key: "mixed",
              label: "Mixed signal",
            },
          ],
          rows: [
            {
              label: "Replace with sourced evidence",
              cells: [
                `Clarify one strong signal from ${source.data.title}.`,
                `Clarify one mixed signal from ${source.data.title}.`,
              ],
            },
          ],
        },
        {
          type: "workedExample",
          id: "worked-example",
          prompt: `Explain one concrete example from ${source.data.title}.`,
          steps: [
            {
              title: "Replace this placeholder example",
              body: `Turn a source passage from ${source.data.title} into a bounded instructional example.`,
            },
          ],
        },
        {
          type: "summaryGrid",
          id: "takeaways",
          items: [
            {
              title: "State the core concept",
              takeaway: objective,
            },
          ],
        },
        {
          type: "sourceAnchorGrid",
          id: "sources",
          items: [
            {
              title: source.data.title,
              description: `Canonical source recorded at ${source.data.path}.`,
              href: source.data.path,
              type: "Source document",
            },
          ],
        },
      ];
    case "timeline-story":
      return [
        heroBlock,
        whyItMattersBlock,
        {
          type: "sequenceTimeline",
          mode: "timeline",
          items: [
            {
              label: "1",
              title: "Replace this timeline point",
              summary: `Add one sourced sequence marker from ${source.data.title}.`,
            },
          ],
        },
        sectionBlock,
        {
          type: "summaryGrid",
          items: [
            {
              title: "Capture the story arc",
              takeaway: objective,
            },
          ],
        },
        nextStepBlock,
      ];
    case "assignment-project":
      return [
        heroBlock,
        whyItMattersBlock,
        {
          ...sectionBlock,
          id: "assignment-brief",
        },
        {
          type: "sequenceTimeline",
          mode: "process",
          items: [
            {
              label: "1",
              title: "Define the first assignment step",
              summary: `Use ${source.data.title} to ground the task.`,
            },
          ],
        },
        {
          type: "workedExample",
          id: "worked-example",
          prompt: `Show one model response informed by ${source.data.title}.`,
          steps: [
            {
              title: "Replace this placeholder example",
              body: `Turn one source-backed move into a model response.`,
            },
          ],
        },
        {
          type: "section",
          id: "success-criteria",
          title: "State the success criteria",
          body: `Replace this placeholder with explicit success criteria informed by ${source.data.title}.`,
        },
        nextStepBlock,
      ];
    case "reading-map":
      return [
        heroBlock,
        {
          ...sectionBlock,
          id: "how-to-use",
        },
        {
          type: "readingMapGrid",
          id: "reading-map",
          clusters: [
            {
              title: "Core reading cluster",
              summary: `Start with ${source.data.title} before branching out.`,
              links: [
                {
                  label: source.data.title,
                  href: source.data.path,
                  type: "Source document",
                },
              ],
            },
          ],
        },
        {
          type: "sourceAnchorGrid",
          id: "sources",
          items: [
            {
              title: source.data.title,
              description: `Canonical source recorded at ${source.data.path}.`,
              href: source.data.path,
              type: "Source document",
            },
          ],
        },
        nextStepBlock,
      ];
    default:
      throw new Error(`Unsupported recipe ${recipe}.`);
  }
}

function assertPathIsWithinWorkspace(filePath: string, workspaceRoot: string) {
  const relativePath = toPosixPath(relative(workspaceRoot, filePath));

  if (relativePath.startsWith("../") || relativePath === "..") {
    throw new Error(
      `Expected ${filePath} to be inside the workspace root ${workspaceRoot}.`,
    );
  }

  return relativePath;
}

export function registerSourceDocument(
  input: RegisterSourceDocumentInput,
): RegisterSourceDocumentResult {
  const workspaceRoot = getWorkspaceRoot(input.workspaceRoot);
  const sourcePath = resolve(workspaceRoot, input.path);

  if (!existsSync(sourcePath) || !statSync(sourcePath).isFile()) {
    throw new Error(`Canonical source path ${sourcePath} does not exist.`);
  }

  const relativeSourcePath = assertPathIsWithinWorkspace(
    sourcePath,
    workspaceRoot,
  );
  const existingSources = listSourceDocuments({ workspaceRoot });
  const existingByPath = existingSources.find(
    (artifact) => artifact.data.path === relativeSourcePath,
  );

  if (existingByPath) {
    return {
      created: false,
      artifact: existingByPath,
    };
  }

  const sourceId = input.id ?? inferSourceIdFromPath(sourcePath);
  const existingById = existingSources.find(
    (artifact) => artifact.data.id === sourceId,
  );

  if (existingById) {
    throw new Error(
      `Source id ${sourceId} is already registered for ${existingById.data.path}.`,
    );
  }

  const sourceContent = readFileSync(sourcePath, "utf8");
  const artifactPath = getSourceArtifactPath(sourceId, workspaceRoot);
  const data: SourceDocumentRecord = {
    schema: "source-document/v1",
    id: sourceId,
    title: input.title ?? inferTitleFromMarkdown(sourceContent, sourceId),
    path: relativeSourcePath,
    topics: input.topics?.length ? input.topics : inferTopics(sourceId),
    status: "registered",
    registeredAt: input.now ?? new Date().toISOString(),
  };
  const summary = extractSummaryFromMarkdown(sourceContent);
  const body = [
    `Canonical research lives at ${relativeSourcePath}.`,
    ``,
    `This source record provides a stable source id for phase-2 planning, draft, and version artifacts without copying the full research document into local-only state.`,
    ...(summary ? ["", "Working summary", "", summary] : []),
  ].join("\n");

  writeMarkdownArtifact(artifactPath, data, body);

  return {
    created: true,
    artifact: {
      filePath: artifactPath,
      data,
      body,
    },
  };
}

export function readExperienceNorthStar(
  experienceId: string,
  options?: { workspaceRoot?: string },
) {
  const filePath = join(
    getExperiencePlanDirectory(options?.workspaceRoot),
    `${experienceId}.yml`,
  );

  if (!existsSync(filePath)) {
    throw new Error(
      `Experience north star ${experienceId} does not exist at ${filePath}.`,
    );
  }

  return readYamlArtifact<ExperienceNorthStarRecord>(
    filePath,
    "experience north star",
  );
}

export function readModuleBrief(
  moduleId: string,
  options?: { workspaceRoot?: string },
) {
  const filePath = join(
    getModulePlanDirectory(options?.workspaceRoot),
    `${moduleId}.yml`,
  );

  if (!existsSync(filePath)) {
    throw new Error(`Module brief ${moduleId} does not exist at ${filePath}.`);
  }

  const record = readYamlArtifact<ModuleBriefRecord>(filePath, "module brief");
  const data = ensureObject(record, filePath, "module brief");

  return {
    schema: getRequiredString(data, "schema", filePath) as "module-brief/v1",
    id: getRequiredString(data, "id", filePath),
    experienceId: getRequiredString(data, "experienceId", filePath),
    title: getRequiredString(data, "title", filePath),
    job: getRequiredString(data, "job", filePath),
    sequencePosition: getRequiredNumber(data, "sequencePosition", filePath),
    learningOutcomes: getRequiredStringArray(
      data,
      "learningOutcomes",
      filePath,
    ),
    curatorialQuestions: getRequiredStringArray(
      data,
      "curatorialQuestions",
      filePath,
    ),
    candidateUnits: getRequiredStringArray(data, "candidateUnits", filePath),
    sourceRefs: data.sourceRefs as Array<string | SourceReference> | undefined,
  } satisfies ModuleBriefRecord;
}

export function startUnitDraft(
  input: StartUnitDraftInput,
): StartUnitDraftResult {
  const workspaceRoot = getWorkspaceRoot(input.workspaceRoot);
  const brief = readUnitBrief(input.unitId, { workspaceRoot });
  const source = getSourceDocumentById(input.sourceId, workspaceRoot);
  const sources = listSourceDocuments({ workspaceRoot });
  const normalizedSourceRefs = brief.sourceRefs.map((reference) =>
    normalizeBriefSourceReference(
      reference,
      sources,
      getUnitBriefPath(input.unitId, workspaceRoot),
    ),
  );

  if (brief.recipe !== input.recipe) {
    throw new Error(
      `Unit brief ${brief.id} expects recipe ${brief.recipe}, but start requested ${input.recipe}.`,
    );
  }

  if (
    !normalizedSourceRefs.some(
      (reference) => reference.sourceId === source.data.id,
    )
  ) {
    throw new Error(
      `Unit brief ${brief.id} does not reference registered source ${source.data.id}.`,
    );
  }

  const draftPath = getUnitDraftPath(input.unitId, workspaceRoot);

  if (existsSync(draftPath)) {
    return {
      created: false,
      artifact: readUnitDraft(input.unitId, { workspaceRoot }),
    };
  }

  const draftRecord: UnitDraftRecord = {
    schema: "unit-draft/v1",
    id: input.unitId,
    status: "working_draft",
    kind: input.kind,
    recipe: input.recipe,
    title: brief.title,
    objective: brief.learningObjective,
    audiences: brief.targetAudience,
    sourceRefs: normalizedSourceRefs,
    blocks: buildDraftBlocksForRecipe(
      input.recipe,
      brief.title,
      brief.learningObjective,
      source,
    ),
    summary: brief.dominantJob,
    module: brief.moduleId,
    notes: [
      `Started from UnitBrief ${brief.id}.`,
      `Keep ${source.data.id} as the canonical source id until a broader multi-source drafting pass is needed.`,
    ],
    briefRef: brief.id,
  };

  const body = buildDraftBody(brief, source);
  writeMarkdownArtifact(draftPath, draftRecord, body);

  return {
    created: true,
    artifact: {
      filePath: draftPath,
      data: draftRecord,
      body,
    },
  };
}

function getLatestUnitVersionId(unitId: string, workspaceRoot?: string) {
  const versionFiles = listUnitVersionFiles(unitId, workspaceRoot);

  if (!versionFiles.length) {
    return null;
  }

  const latestFilePath = versionFiles[versionFiles.length - 1];
  return basename(latestFilePath, ".md");
}

function buildReviewRecordBody(review: ReviewRecord) {
  return [
    `Review outcome: ${review.outcome}.`,
    "",
    ...review.findings.map(
      (finding) =>
        `- [${finding.severity}] ${finding.summary}${
          finding.detail ? ` ${finding.detail}` : ""
        }`,
    ),
  ].join("\n");
}

function getDefaultRequestedNextStep(outcome: ReviewOutcome) {
  if (outcome === "approved") {
    return "approve";
  }

  return "revise";
}

export function requestUnitReview(
  input: RequestUnitReviewInput,
): RequestUnitReviewResult {
  const artifact = readUnitVersion(input.unitId, input.version, {
    workspaceRoot: input.workspaceRoot,
  });

  if (artifact.data.status === "review_requested") {
    return {
      requested: false,
      artifact,
    };
  }

  if (artifact.data.status !== "frozen_candidate") {
    throw new Error(
      `Unit version ${input.unitId}@${input.version} must be frozen_candidate before review can be requested, but its status is ${artifact.data.status}.`,
    );
  }

  return {
    requested: true,
    artifact: updateUnitVersionArtifact(
      input.unitId,
      input.version,
      (data) => ({
        ...data,
        status: "review_requested",
      }),
      input.workspaceRoot,
    ),
  };
}

export function createUnitReviewRecord(
  input: CreateUnitReviewInput,
): CreateUnitReviewResult {
  if (!input.findings.length) {
    throw new Error("A unit review must include at least one finding.");
  }

  const versionArtifact = readUnitVersion(input.unitId, input.version, {
    workspaceRoot: input.workspaceRoot,
  });

  if (versionArtifact.data.status !== "review_requested") {
    throw new Error(
      `Unit version ${input.unitId}@${input.version} must be review_requested before a review record can be added, but its status is ${versionArtifact.data.status}.`,
    );
  }

  const reviewId = `review-${input.unitId}-${input.version}-${input.reviewerRole}`;
  const reviewPath = getReviewArtifactPath(reviewId, input.workspaceRoot);

  if (existsSync(reviewPath)) {
    throw new Error(
      `Review record ${reviewId} already exists for ${input.unitId}@${input.version}.`,
    );
  }

  const reviewRecord: ReviewRecord = {
    schema: "review-record/v1",
    id: reviewId,
    targetType: "unit",
    targetId: input.unitId,
    targetVersion: input.version,
    reviewerRole: input.reviewerRole,
    outcome: input.outcome,
    findings: input.findings,
    createdAt: input.now ?? new Date().toISOString(),
    requestedNextStep:
      input.requestedNextStep ?? getDefaultRequestedNextStep(input.outcome),
  };
  const body = buildReviewRecordBody(reviewRecord);

  writeMarkdownArtifact(reviewPath, reviewRecord, body);

  const nextStatus =
    input.outcome === "approved"
      ? versionArtifact.data.status
      : "changes_requested";

  return {
    review: {
      filePath: reviewPath,
      data: reviewRecord,
      body,
    },
    artifact: updateUnitVersionArtifact(
      input.unitId,
      input.version,
      (data) => ({
        ...data,
        status: nextStatus,
        reviewRefs: dedupeStrings([...(data.reviewRefs ?? []), reviewId]),
      }),
      input.workspaceRoot,
    ),
  };
}

export function reviseUnitDraft(
  input: ReviseUnitDraftInput,
): ReviseUnitDraftResult {
  const versionArtifact = readUnitVersion(input.unitId, input.fromVersion, {
    workspaceRoot: input.workspaceRoot,
  });
  const reviewArtifact = readUnitReviewRecord(input.reviewId, {
    workspaceRoot: input.workspaceRoot,
  });

  if (
    reviewArtifact.data.targetType !== "unit" ||
    reviewArtifact.data.targetId !== input.unitId ||
    reviewArtifact.data.targetVersion !== input.fromVersion
  ) {
    throw new Error(
      `Review ${input.reviewId} does not target ${input.unitId}@${input.fromVersion}.`,
    );
  }

  if (reviewArtifact.data.outcome === "approved") {
    throw new Error(
      `Review ${input.reviewId} already approved ${input.unitId}@${input.fromVersion}; revise should only be used after changes_requested or blocked outcomes.`,
    );
  }

  const draftPath = getUnitDraftPath(input.unitId, input.workspaceRoot);
  const hadExistingDraft = existsSync(draftPath);
  const draftRecord: UnitDraftRecord = {
    schema: "unit-draft/v1",
    id: versionArtifact.data.id,
    status: "working_draft",
    kind: versionArtifact.data.kind,
    recipe: versionArtifact.data.recipe,
    title: versionArtifact.data.title,
    objective: versionArtifact.data.objective,
    audiences: versionArtifact.data.audiences,
    sourceRefs: versionArtifact.data.sourceRefs,
    blocks: versionArtifact.data.blocks,
    summary: versionArtifact.data.summary,
    tags: versionArtifact.data.tags,
    module: versionArtifact.data.module,
    basedOnVersion: versionArtifact.data.version,
    notes: dedupeStrings([
      ...(versionArtifact.data.notes ?? []),
      `Revision draft seeded from ${versionArtifact.data.version}.`,
      `Address review ${reviewArtifact.data.id} before freezing the next candidate.`,
    ]),
    briefRef: versionArtifact.data.briefRef,
  };
  const body = [
    `Revision draft seeded from ${getRelativeWorkspacePath(versionArtifact.filePath, input.workspaceRoot)}.`,
    "",
    `Address review ${reviewArtifact.data.id} before freezing the next candidate version.`,
    ...(versionArtifact.body ? ["", versionArtifact.body] : []),
  ].join("\n");

  writeMarkdownArtifact(draftPath, draftRecord, body);

  return {
    created: !hadExistingDraft,
    artifact: {
      filePath: draftPath,
      data: draftRecord,
      body,
    },
  };
}

export function approveUnitVersion(
  input: ApproveUnitVersionInput,
): ApproveUnitVersionResult {
  const artifact = readUnitVersion(input.unitId, input.version, {
    workspaceRoot: input.workspaceRoot,
  });

  if (artifact.data.status === "approved") {
    return {
      approved: false,
      artifact,
    };
  }

  if (artifact.data.status !== "review_requested") {
    throw new Error(
      `Unit version ${input.unitId}@${input.version} must stay in review_requested before approval, but its status is ${artifact.data.status}.`,
    );
  }

  const reviews = listUnitReviewRecords({
    workspaceRoot: input.workspaceRoot,
    unitId: input.unitId,
    version: input.version,
  });
  const approvedReviews = reviews.filter(
    (review) => review.data.outcome === "approved",
  );
  const blockingReviews = reviews.filter(
    (review) => review.data.outcome !== "approved",
  );

  if (!approvedReviews.length) {
    throw new Error(
      `Unit version ${input.unitId}@${input.version} cannot be approved without at least one approved review record.`,
    );
  }

  if (blockingReviews.length) {
    throw new Error(
      `Unit version ${input.unitId}@${input.version} still has non-approved review outcomes and cannot be approved.`,
    );
  }

  return {
    approved: true,
    artifact: updateUnitVersionArtifact(
      input.unitId,
      input.version,
      (data) => ({
        ...data,
        status: "approved",
        reviewRefs: dedupeStrings([
          ...(data.reviewRefs ?? []),
          ...reviews.map((review) => review.data.id),
        ]),
      }),
      input.workspaceRoot,
    ),
  };
}

export function showUnitArtifact(
  input: ShowUnitArtifactInput,
): ShowUnitArtifactResult {
  if (input.version) {
    const artifact = readUnitVersion(input.unitId, input.version, {
      workspaceRoot: input.workspaceRoot,
    });

    return {
      mode: "version",
      ...artifact,
    };
  }

  const draftPath = getUnitDraftPath(input.unitId, input.workspaceRoot);

  if (input.draft || existsSync(draftPath)) {
    const artifact = readUnitDraft(input.unitId, {
      workspaceRoot: input.workspaceRoot,
    });

    return {
      mode: "draft",
      ...artifact,
    };
  }

  const latestVersionId = getLatestUnitVersionId(
    input.unitId,
    input.workspaceRoot,
  );

  if (!latestVersionId) {
    throw new Error(`No draft or version exists for unit ${input.unitId}.`);
  }

  const artifact = readUnitVersion(input.unitId, latestVersionId, {
    workspaceRoot: input.workspaceRoot,
  });

  return {
    mode: "version",
    ...artifact,
  };
}

export function freezeUnitDraft(input: FreezeUnitDraftInput) {
  const workspaceRoot = getWorkspaceRoot(input.workspaceRoot);
  const draft = readUnitDraft(input.unitId, { workspaceRoot });
  const version = formatUnitVersionTimestamp(
    input.now ?? new Date().toISOString(),
  );
  const versionPath = getUnitVersionPath(input.unitId, version, workspaceRoot);

  if (existsSync(versionPath)) {
    throw new Error(`Unit version ${draft.data.id}@${version} already exists.`);
  }

  const latestVersionId = getLatestUnitVersionId(input.unitId, workspaceRoot);
  const versionRecord: UnitVersionRecord = {
    schema: "unit/v2",
    id: draft.data.id,
    version,
    status: "frozen_candidate",
    kind: draft.data.kind,
    recipe: draft.data.recipe,
    title: draft.data.title,
    objective: draft.data.objective,
    audiences: draft.data.audiences,
    sourceRefs: draft.data.sourceRefs,
    blocks: draft.data.blocks,
    supersedes: latestVersionId,
    summary: draft.data.summary,
    tags: draft.data.tags,
    module: draft.data.module,
    notes: draft.data.notes,
    briefRef: draft.data.briefRef,
    reviewRefs: [],
  };

  const body = [
    `Immutable version frozen from ${getRelativeWorkspacePath(draft.filePath, workspaceRoot)}.`,
    ``,
    `Any change after this point must happen through the working draft and a new superseding version.`,
  ].join("\n");

  writeMarkdownArtifact(versionPath, versionRecord, body);

  return {
    filePath: versionPath,
    data: versionRecord,
    body,
  } satisfies VersionArtifact;
}

export function toEducationalUnitSpec(
  artifact: VersionArtifact | UnitVersionRecord,
) {
  const data = "data" in artifact ? artifact.data : artifact;

  return {
    id: data.id,
    kind: data.kind as EducationalUnitSpec["kind"],
    recipe: data.recipe,
    title: data.title,
    summary: data.summary ?? data.objective,
    blocks: data.blocks as UnitBlockSpec[],
  } satisfies EducationalUnitSpec;
}

export function summarizeSourceDocument(
  artifact: RegisteredSourceDocument,
  workspaceRoot?: string,
) {
  return `${artifact.data.id} | ${artifact.data.status} | ${artifact.data.title} | ${artifact.data.path} | record ${getRelativeWorkspacePath(artifact.filePath, workspaceRoot)}`;
}

export function summarizeUnitArtifact(
  artifact: ShowUnitArtifactResult,
  workspaceRoot?: string,
) {
  if (artifact.mode === "draft") {
    return [
      `mode: draft`,
      `path: ${getRelativeWorkspacePath(artifact.filePath, workspaceRoot)}`,
      `status: ${artifact.data.status}`,
      `recipe: ${artifact.data.recipe}`,
      `kind: ${artifact.data.kind}`,
      `sources: ${artifact.data.sourceRefs.map((reference) => reference.sourceId).join(", ")}`,
      `blocks: ${artifact.data.blocks.length}`,
    ].join("\n");
  }

  return [
    `mode: version`,
    `path: ${getRelativeWorkspacePath(artifact.filePath, workspaceRoot)}`,
    `status: ${artifact.data.status}`,
    `version: ${artifact.data.version}`,
    `recipe: ${artifact.data.recipe}`,
    `kind: ${artifact.data.kind}`,
    `sources: ${artifact.data.sourceRefs.map((reference) => reference.sourceId).join(", ")}`,
    `blocks: ${artifact.data.blocks.length}`,
  ].join("\n");
}
