import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";

import { parse, stringify } from "yaml";

import { listExperienceNorthStars } from "@/lib/source-experience-workflow";
import {
  formatUnitVersionTimestamp,
  listSourceDocuments,
  readUnitBrief,
  type ReviewRecord,
  type SourceReference,
} from "@/lib/source-unit-workflow";

const CONTENT_ROOT = "content";
const VISUAL_BRIEF_DIRECTORY = ["briefs", "visuals"] as const;
const VISUAL_DRAFT_DIRECTORY = ["drafts", "visuals"] as const;
const VISUAL_VERSION_DIRECTORY = ["visuals"] as const;
const VISUAL_REVIEW_DIRECTORY = ["reviews", "visuals"] as const;

type UnknownRecord = Record<string, unknown>;
type VisualSourceReference = string | SourceReference | { path?: string };

export type VisualClass =
  | "illustration"
  | "diagram"
  | "chart"
  | "graph"
  | "comparison-table";

export type VisualProvider =
  | "gpt-image"
  | "mermaid"
  | "vega-lite"
  | "svg-template";

export type VisualBriefRecord = {
  schema: "visual-brief/v1";
  id: string;
  experienceId: string;
  forUnit: string;
  kind: string;
  visualClass: VisualClass;
  intent: string;
  mustShow: string[];
  accessibilityNeeds: string[];
  dataSource?: string;
  sourceRefs?: Array<string | SourceReference>;
  styleProfile?: string;
  provenanceRequirements?: string[];
  captionDirection?: string;
  longDescriptionDirection?: string;
};

export type VisualDraftRecord = {
  schema: "visual-draft/v1";
  id: string;
  status: string;
  kind: string;
  visualClass: VisualClass;
  intent: string;
  forUnit: string;
  provider?: VisualProvider;
  prompt?: string;
  negativePrompt?: string;
  dataSource?: string;
  sourceRefs?: Array<string | SourceReference>;
  styleProfile?: string;
  caption?: string;
  alt?: string;
  longDescription?: string;
  notes?: string[];
  basedOnVersion?: string | null;
};

export type VisualSpecVersionRecord = {
  schema: "visual-spec/v1";
  id: string;
  version: string;
  status: string;
  kind: string;
  visualClass: VisualClass;
  intent: string;
  forUnit: string;
  supersedes: string | null;
  provider?: VisualProvider;
  prompt?: string;
  negativePrompt?: string;
  dataSource?: string;
  sourceRefs?: Array<string | SourceReference>;
  styleProfile?: string;
  caption?: string;
  alt?: string;
  longDescription?: string;
  assetRefs?: string[];
  reviewRefs?: string[];
};

export type VisualArtifact<T extends UnknownRecord> = {
  filePath: string;
  data: T;
};

export type VisualBriefArtifact = VisualArtifact<VisualBriefRecord>;
export type VisualDraftArtifact = VisualArtifact<VisualDraftRecord>;
export type VisualSpecVersionArtifact = VisualArtifact<VisualSpecVersionRecord>;

type MarkdownArtifact<T extends UnknownRecord> = {
  filePath: string;
  data: T;
  body: string;
};

export type VisualReviewArtifact = MarkdownArtifact<ReviewRecord>;

export type StartVisualDraftInput = {
  visualId: string;
  kind: string;
  unitId: string;
  workspaceRoot?: string;
};

export type StartVisualDraftResult = {
  created: boolean;
  artifact: VisualDraftArtifact;
};

export type ShowVisualArtifactInput = {
  visualId: string;
  workspaceRoot?: string;
  draft?: boolean;
  version?: string;
};

export type ShowVisualArtifactResult =
  | ({ mode: "draft" } & VisualDraftArtifact)
  | ({ mode: "version" } & VisualSpecVersionArtifact);

export type FreezeVisualDraftInput = {
  visualId: string;
  workspaceRoot?: string;
  now?: string;
};

export type GenerateVisualVersionInput = {
  visualId: string;
  version: string;
  workspaceRoot?: string;
};

export type GenerateVisualVersionResult = {
  generated: boolean;
  artifact: VisualSpecVersionArtifact;
};

export type RequestVisualReviewInput = {
  visualId: string;
  version: string;
  workspaceRoot?: string;
};

export type RequestVisualReviewResult = {
  requested: boolean;
  artifact: VisualSpecVersionArtifact;
};

export type CreateVisualReviewInput = {
  visualId: string;
  version: string;
  reviewerRole: string;
  outcome: "approved" | "changes_requested" | "blocked";
  findings: ReviewRecord["findings"];
  requestedNextStep?: string;
  workspaceRoot?: string;
  now?: string;
};

export type CreateVisualReviewResult = {
  review: VisualReviewArtifact;
  artifact: VisualSpecVersionArtifact;
};

export type ReviseVisualDraftInput = {
  visualId: string;
  fromVersion: string;
  reviewId: string;
  workspaceRoot?: string;
};

export type ReviseVisualDraftResult = {
  created: boolean;
  artifact: VisualDraftArtifact;
};

export type ApproveVisualVersionInput = {
  visualId: string;
  version: string;
  workspaceRoot?: string;
};

export type ApproveVisualVersionResult = {
  approved: boolean;
  artifact: VisualSpecVersionArtifact;
};

export type FileBackedVisualVersionReference = {
  reference: string;
  visualId: string;
  version: string;
};

export type PublishableVisualVersionSummary = {
  reference: string;
  visualId: string;
  version: string;
  status: string;
  visualClass: VisualClass;
  provider?: VisualProvider;
  filePath: string;
};

export type VisualArtifactIssueCode =
  | "duplicate_visual_brief"
  | "duplicate_visual_draft"
  | "missing_visual_brief"
  | "unknown_visual_experience"
  | "unknown_visual_unit"
  | "unknown_visual_source"
  | "unsupported_visual_class"
  | "visual_brief_draft_mismatch"
  | "invalid_visual_provider"
  | "missing_version_spec"
  | "asset_outside_version_dir";

export type VisualArtifactIssue = {
  code: VisualArtifactIssueCode;
  message: string;
  visualId?: string;
  experienceId?: string;
  unitId?: string;
  sourceId?: string;
};

const SUPPORTED_VISUAL_CLASSES = new Set<VisualClass>([
  "illustration",
  "diagram",
  "chart",
  "graph",
  "comparison-table",
]);
const DETERMINISTIC_VISUAL_CLASSES = new Set<VisualClass>([
  "chart",
  "graph",
  "comparison-table",
]);
const DETERMINISTIC_PROVIDERS = new Set<VisualProvider>([
  "vega-lite",
  "svg-template",
]);
const DIAGRAM_PROVIDERS = new Set<VisualProvider>([
  "mermaid",
  "svg-template",
  "gpt-image",
]);

function getWorkspaceRoot(workspaceRoot?: string) {
  return resolve(workspaceRoot ?? process.cwd());
}

function ensureDirectory(filePath: string) {
  mkdirSync(dirname(filePath), { recursive: true });
}

function writeYamlArtifact(filePath: string, data: UnknownRecord) {
  ensureDirectory(filePath);
  writeFileSync(filePath, `${stringify(data).trimEnd()}\n`, "utf8");
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

function writeMarkdownArtifact(filePath: string, data: UnknownRecord, body = "") {
  ensureDirectory(filePath);
  const serializedFrontmatter = stringify(data).trimEnd();
  const trimmedBody = body.trim();
  const content = trimmedBody
    ? `---\n${serializedFrontmatter}\n---\n\n${trimmedBody}\n`
    : `---\n${serializedFrontmatter}\n---\n`;

  writeFileSync(filePath, content, "utf8");
}

function readMarkdownArtifact<T extends UnknownRecord>(
  filePath: string,
  label: string,
) {
  const content = readFileSync(filePath, "utf8");
  const { frontmatterText, body } = splitFrontmatter(content, filePath);

  return {
    filePath,
    data: ensureObject(parse(frontmatterText), filePath, label) as T,
    body,
  } satisfies MarkdownArtifact<T>;
}

function joinContentPath(
  workspaceRoot: string | undefined,
  ...segments: readonly string[]
) {
  return join(getWorkspaceRoot(workspaceRoot), CONTENT_ROOT, ...segments);
}

function getVisualBriefDirectory(workspaceRoot?: string) {
  return joinContentPath(workspaceRoot, ...VISUAL_BRIEF_DIRECTORY);
}

function getVisualDraftDirectory(workspaceRoot?: string) {
  return joinContentPath(workspaceRoot, ...VISUAL_DRAFT_DIRECTORY);
}

function getVisualVersionRootDirectory(workspaceRoot?: string) {
  return joinContentPath(workspaceRoot, ...VISUAL_VERSION_DIRECTORY);
}

function getVisualReviewDirectory(workspaceRoot?: string) {
  return joinContentPath(workspaceRoot, ...VISUAL_REVIEW_DIRECTORY);
}

export function getVisualBriefPath(visualId: string, workspaceRoot?: string) {
  return join(getVisualBriefDirectory(workspaceRoot), `${visualId}.yml`);
}

export function getVisualDraftPath(visualId: string, workspaceRoot?: string) {
  return join(getVisualDraftDirectory(workspaceRoot), `${visualId}.yml`);
}

export function getVisualVersionDirectory(
  visualId: string,
  version: string,
  workspaceRoot?: string,
) {
  return join(
    getVisualVersionRootDirectory(workspaceRoot),
    visualId,
    "versions",
    version,
  );
}

export function getVisualVersionSpecPath(
  visualId: string,
  version: string,
  workspaceRoot?: string,
) {
  return join(
    getVisualVersionDirectory(visualId, version, workspaceRoot),
    "spec.yml",
  );
}

function getVisualReviewPath(reviewId: string, workspaceRoot?: string) {
  return join(getVisualReviewDirectory(workspaceRoot), `${reviewId}.md`);
}

export function getVisualVersionAssetPath(
  visualId: string,
  version: string,
  assetRef: string,
  workspaceRoot?: string,
) {
  return resolve(getVisualVersionDirectory(visualId, version, workspaceRoot), assetRef);
}

function ensureObject(value: unknown, filePath: string, label: string) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} in ${filePath} must be a YAML object.`);
  }

  return value as UnknownRecord;
}

function parseYamlObject(filePath: string, label: string) {
  return ensureObject(parse(readFileSync(filePath, "utf8")), filePath, label);
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

function getOptionalReferenceArray(record: UnknownRecord, key: string) {
  const value = record[key];

  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    return undefined;
  }

  return value as Array<string | SourceReference>;
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

function listMarkdownFiles(directoryPath: string) {
  if (!existsSync(directoryPath)) {
    return [] as string[];
  }

  return readdirSync(directoryPath)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => join(directoryPath, fileName))
    .sort((left, right) => left.localeCompare(right));
}

function getLatestVisualVersionId(visualId: string, workspaceRoot?: string) {
  const versionRoot = join(
    getVisualVersionRootDirectory(workspaceRoot),
    visualId,
    "versions",
  );

  if (!existsSync(versionRoot)) {
    return null;
  }

  const versionIds = readdirSync(versionRoot).sort((left, right) =>
    left.localeCompare(right),
  );

  return versionIds.at(-1) ?? null;
}

function asVisualBriefRecord(record: UnknownRecord, filePath: string) {
  return {
    schema: getRequiredString(record, "schema", filePath) as "visual-brief/v1",
    id: getRequiredString(record, "id", filePath),
    experienceId: getRequiredString(record, "experienceId", filePath),
    forUnit: getRequiredString(record, "forUnit", filePath),
    kind: getRequiredString(record, "kind", filePath),
    visualClass: getRequiredString(
      record,
      "visualClass",
      filePath,
    ) as VisualClass,
    intent: getRequiredString(record, "intent", filePath),
    mustShow: getRequiredStringArray(record, "mustShow", filePath),
    accessibilityNeeds: getRequiredStringArray(
      record,
      "accessibilityNeeds",
      filePath,
    ),
    dataSource: getOptionalString(record, "dataSource"),
    sourceRefs: getOptionalReferenceArray(record, "sourceRefs"),
    styleProfile: getOptionalString(record, "styleProfile"),
    provenanceRequirements: getOptionalStringArray(
      record,
      "provenanceRequirements",
      filePath,
    ),
    captionDirection: getOptionalString(record, "captionDirection"),
    longDescriptionDirection: getOptionalString(
      record,
      "longDescriptionDirection",
    ),
  } satisfies VisualBriefRecord;
}

function asVisualDraftRecord(record: UnknownRecord, filePath: string) {
  const basedOnVersion = record.basedOnVersion;

  if (
    basedOnVersion !== undefined &&
    basedOnVersion !== null &&
    typeof basedOnVersion !== "string"
  ) {
    throw new Error(
      `Expected basedOnVersion in ${filePath} to be a string or null.`,
    );
  }

  return {
    schema: getRequiredString(record, "schema", filePath) as "visual-draft/v1",
    id: getRequiredString(record, "id", filePath),
    status: getRequiredString(record, "status", filePath),
    kind: getRequiredString(record, "kind", filePath),
    visualClass: getRequiredString(
      record,
      "visualClass",
      filePath,
    ) as VisualClass,
    intent: getRequiredString(record, "intent", filePath),
    forUnit: getRequiredString(record, "forUnit", filePath),
    provider: getOptionalString(record, "provider") as
      | VisualProvider
      | undefined,
    prompt: getOptionalString(record, "prompt"),
    negativePrompt: getOptionalString(record, "negativePrompt"),
    dataSource: getOptionalString(record, "dataSource"),
    sourceRefs: getOptionalReferenceArray(record, "sourceRefs"),
    styleProfile: getOptionalString(record, "styleProfile"),
    caption: getOptionalString(record, "caption"),
    alt: getOptionalString(record, "alt"),
    longDescription: getOptionalString(record, "longDescription"),
    notes: getOptionalStringArray(record, "notes", filePath),
    basedOnVersion: basedOnVersion as string | null | undefined,
  } satisfies VisualDraftRecord;
}

function asVisualSpecVersionRecord(record: UnknownRecord, filePath: string) {
  const supersedes = record.supersedes;

  if (typeof supersedes !== "string" && supersedes !== null) {
    throw new Error(
      `Expected supersedes in ${filePath} to be a string or null.`,
    );
  }

  return {
    schema: getRequiredString(record, "schema", filePath) as "visual-spec/v1",
    id: getRequiredString(record, "id", filePath),
    version: getRequiredString(record, "version", filePath),
    status: getRequiredString(record, "status", filePath),
    kind: getRequiredString(record, "kind", filePath),
    visualClass: getRequiredString(
      record,
      "visualClass",
      filePath,
    ) as VisualClass,
    intent: getRequiredString(record, "intent", filePath),
    forUnit: getRequiredString(record, "forUnit", filePath),
    supersedes,
    provider: getOptionalString(record, "provider") as
      | VisualProvider
      | undefined,
    prompt: getOptionalString(record, "prompt"),
    negativePrompt: getOptionalString(record, "negativePrompt"),
    dataSource: getOptionalString(record, "dataSource"),
    sourceRefs: getOptionalReferenceArray(record, "sourceRefs"),
    styleProfile: getOptionalString(record, "styleProfile"),
    caption: getOptionalString(record, "caption"),
    alt: getOptionalString(record, "alt"),
    longDescription: getOptionalString(record, "longDescription"),
    assetRefs: getOptionalStringArray(record, "assetRefs", filePath),
    reviewRefs: getOptionalStringArray(record, "reviewRefs", filePath),
  } satisfies VisualSpecVersionRecord;
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

function resolveVisualSourceReference(
  reference: VisualSourceReference,
  registeredSourceIds: Set<string>,
  registeredSourcePaths: Set<string>,
) {
  if (typeof reference === "string") {
    return registeredSourceIds.has(reference) ||
      registeredSourcePaths.has(reference)
      ? reference
      : null;
  }

  if (!reference || typeof reference !== "object" || Array.isArray(reference)) {
    return null;
  }

  if ("sourceId" in reference && typeof reference.sourceId === "string") {
    return registeredSourceIds.has(reference.sourceId)
      ? reference.sourceId
      : null;
  }

  if ("path" in reference && typeof reference.path === "string") {
    return registeredSourcePaths.has(reference.path) ? reference.path : null;
  }

  return null;
}

function getProviderIssue(
  visualClass: VisualClass,
  provider: VisualProvider | undefined,
  visualId: string,
) {
  if (!SUPPORTED_VISUAL_CLASSES.has(visualClass)) {
    return `Visual ${visualId} uses unsupported class ${visualClass}.`;
  }

  if (DETERMINISTIC_VISUAL_CLASSES.has(visualClass)) {
    if (!provider || !DETERMINISTIC_PROVIDERS.has(provider)) {
      return `Visual ${visualId} uses class ${visualClass}, which must stay deterministic through providers such as vega-lite or svg-template.`;
    }

    return null;
  }

  if (visualClass === "illustration" && provider && provider !== "gpt-image") {
    return `Illustration visual ${visualId} should use gpt-image when a provider is declared.`;
  }

  if (
    visualClass === "diagram" &&
    provider &&
    !DIAGRAM_PROVIDERS.has(provider)
  ) {
    return `Diagram visual ${visualId} should use mermaid, svg-template, or another reviewable structured provider.`;
  }

  return null;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildSvgDocument(options: {
  title: string;
  description: string;
  width?: number;
  height?: number;
  body: string;
}) {
  const width = options.width ?? 960;
  const height = options.height ?? 560;

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">`,
    `<title id="title">${escapeXml(options.title)}</title>`,
    `<desc id="desc">${escapeXml(options.description)}</desc>`,
    options.body,
    `</svg>`,
  ].join("\n");
}

function buildGeneratedIllustrationSvg(record: VisualSpecVersionRecord) {
  return buildSvgDocument({
    title: record.caption ?? record.id,
    description: record.longDescription ?? record.intent,
    body: `
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#efe5d7"/>
          <stop offset="55%" stop-color="#d5d7cb"/>
          <stop offset="100%" stop-color="#d9e2ee"/>
        </linearGradient>
      </defs>
      <rect width="960" height="560" rx="36" fill="url(#bg)"/>
      <rect x="72" y="84" width="360" height="392" rx="28" fill="#8c6744" opacity="0.72"/>
      <rect x="528" y="84" width="360" height="392" rx="28" fill="#5a748f" opacity="0.72"/>
      <circle cx="252" cy="222" r="72" fill="#f4d8bb"/>
      <circle cx="708" cy="222" r="72" fill="#f2efe8"/>
      <rect x="186" y="290" width="132" height="118" rx="20" fill="#f2efe8" opacity="0.86"/>
      <rect x="642" y="290" width="132" height="118" rx="20" fill="#edf4fb" opacity="0.86"/>
      <path d="M432 188 C504 214 530 254 560 330" stroke="#293240" stroke-width="10" fill="none" stroke-linecap="round"/>
      <text x="88" y="504" font-size="34" font-family="Georgia, serif" fill="#1f2732">${escapeXml(record.caption ?? record.id)}</text>
    `,
  });
}

function buildGeneratedDiagramSvg(record: VisualSpecVersionRecord) {
  return buildSvgDocument({
    title: record.caption ?? record.id,
    description: record.longDescription ?? record.intent,
    body: `
      <rect width="960" height="560" rx="36" fill="#f6f3ec"/>
      <rect x="100" y="212" width="220" height="120" rx="24" fill="#dce7d6" stroke="#36553f" stroke-width="4"/>
      <rect x="370" y="92" width="220" height="120" rx="24" fill="#efe2bf" stroke="#7f6740" stroke-width="4"/>
      <rect x="370" y="332" width="220" height="120" rx="24" fill="#efe2bf" stroke="#7f6740" stroke-width="4"/>
      <rect x="640" y="212" width="220" height="120" rx="24" fill="#d5ddec" stroke="#41566f" stroke-width="4"/>
      <path d="M320 272 H370" stroke="#41566f" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M590 152 H640" stroke="#41566f" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M590 392 H640" stroke="#41566f" stroke-width="8" fill="none" stroke-linecap="round"/>
      <text x="142" y="280" font-size="28" font-family="Georgia, serif" fill="#203028">Core signal</text>
      <text x="408" y="160" font-size="24" font-family="Georgia, serif" fill="#3e2f16">Supporting trait</text>
      <text x="410" y="400" font-size="24" font-family="Georgia, serif" fill="#3e2f16">Evidence layer</text>
      <text x="690" y="280" font-size="28" font-family="Georgia, serif" fill="#24384e">Audience trust</text>
      <text x="100" y="504" font-size="34" font-family="Georgia, serif" fill="#1f2732">${escapeXml(record.caption ?? record.id)}</text>
    `,
  });
}

function buildGeneratedChartSvg(record: VisualSpecVersionRecord) {
  return buildSvgDocument({
    title: record.caption ?? record.id,
    description: record.longDescription ?? record.intent,
    body: `
      <rect width="960" height="560" rx="36" fill="#f8f4ed"/>
      <line x1="140" y1="420" x2="840" y2="420" stroke="#223243" stroke-width="4"/>
      <line x1="140" y1="120" x2="140" y2="420" stroke="#223243" stroke-width="4"/>
      <rect x="260" y="220" width="170" height="200" rx="20" fill="#587b97"/>
      <rect x="540" y="170" width="170" height="250" rx="20" fill="#95a05b"/>
      <text x="290" y="210" font-size="28" font-family="Georgia, serif" fill="#223243">1.4%</text>
      <text x="570" y="160" font-size="28" font-family="Georgia, serif" fill="#223243">1.8%</text>
      <text x="305" y="464" font-size="26" font-family="Georgia, serif" fill="#223243">2023</text>
      <text x="585" y="464" font-size="26" font-family="Georgia, serif" fill="#223243">2024</text>
      <text x="140" y="80" font-size="34" font-family="Georgia, serif" fill="#1f2732">${escapeXml(record.caption ?? record.id)}</text>
    `,
  });
}

function buildGeneratedMermaid(record: VisualSpecVersionRecord) {
  return [
    "flowchart LR",
    `  A[${record.id}] --> B[Intent]`,
    `  B --> C[${record.forUnit}]`,
    "  C --> D[Audience outcome]",
  ].join("\n");
}

function buildGeneratedVegaLite(record: VisualSpecVersionRecord) {
  return JSON.stringify(
    {
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      description: record.intent,
      data: {
        values: [
          { label: "2023", value: 1.4 },
          { label: "2024", value: 1.8 },
        ],
      },
      mark: { type: "bar", cornerRadiusEnd: 12 },
      encoding: {
        x: { field: "label", type: "nominal", axis: { title: null } },
        y: { field: "value", type: "quantitative", axis: { title: "Percent" } },
      },
    },
    null,
    2,
  );
}

function buildGeneratedCsv() {
  return ["label,value", "2023,1.4", "2024,1.8"].join("\n");
}

function buildGeneratedAssets(record: VisualSpecVersionRecord) {
  if (record.provider === "vega-lite") {
    return [
      {
        ref: "chart.vl.json",
        content: `${buildGeneratedVegaLite(record)}\n`,
      },
      {
        ref: "chart.csv",
        content: `${buildGeneratedCsv()}\n`,
      },
      {
        ref: "chart.svg",
        content: `${buildGeneratedChartSvg(record)}\n`,
      },
    ];
  }

  if (record.provider === "mermaid") {
    return [
      {
        ref: "diagram.mmd",
        content: `${buildGeneratedMermaid(record)}\n`,
      },
      {
        ref: "diagram.svg",
        content: `${buildGeneratedDiagramSvg(record)}\n`,
      },
    ];
  }

  if (record.provider === "svg-template") {
    return [
      {
        ref: record.visualClass === "diagram" ? "diagram.svg" : "chart.svg",
        content: `${
          record.visualClass === "diagram"
            ? buildGeneratedDiagramSvg(record)
            : buildGeneratedChartSvg(record)
        }\n`,
      },
    ];
  }

  return [
    {
      ref: "prompt.txt",
      content: `${record.prompt ?? record.intent}\n`,
    },
    {
      ref: "image.svg",
      content: `${buildGeneratedIllustrationSvg(record)}\n`,
    },
  ];
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

function getDefaultRequestedNextStep(outcome: CreateVisualReviewInput["outcome"]) {
  return outcome === "approved" ? "approve" : "revise";
}

function normalizeSourceReferences(
  references: Array<string | SourceReference> | undefined,
  filePath: string,
  workspaceRoot?: string,
) {
  const sources = listSourceDocuments({ workspaceRoot });

  return (references ?? []).map((reference) => {
    if (typeof reference === "string") {
      const source = sources.find(
        (candidate) =>
          candidate.data.id === reference || candidate.data.path === reference,
      );

      if (!source) {
        throw new Error(
          `Visual artifact ${filePath} references unregistered source ${reference}.`,
        );
      }

      return { sourceId: source.data.id } satisfies SourceReference;
    }

    if (!reference || typeof reference !== "object" || Array.isArray(reference)) {
      throw new Error(
        `Visual artifact ${filePath} contains an unreadable source reference.`,
      );
    }

    if ("sourceId" in reference && typeof reference.sourceId === "string") {
      return {
        sourceId: reference.sourceId,
        sections: Array.isArray(reference.sections)
          ? reference.sections.filter(
              (value): value is string => typeof value === "string",
            )
          : undefined,
      } satisfies SourceReference;
    }

    if ("path" in reference && typeof reference.path === "string") {
      const source = sources.find(
        (candidate) => candidate.data.path === reference.path,
      );

      if (!source) {
        throw new Error(
          `Visual artifact ${filePath} references unregistered source path ${reference.path}.`,
        );
      }

      return { sourceId: source.data.id } satisfies SourceReference;
    }

    throw new Error(
      `Visual artifact ${filePath} contains an unreadable source reference.`,
    );
  });
}

function updateVisualSpecVersionArtifact(
  visualId: string,
  version: string,
  updater: (data: VisualSpecVersionRecord) => VisualSpecVersionRecord,
  workspaceRoot?: string,
) {
  const artifact = readVisualSpecVersion(visualId, version, { workspaceRoot });
  const updatedData = updater(structuredClone(artifact.data));

  writeYamlArtifact(artifact.filePath, updatedData);

  return {
    filePath: artifact.filePath,
    data: asVisualSpecVersionRecord(updatedData, artifact.filePath),
  } satisfies VisualSpecVersionArtifact;
}

function readVisualReviewRecord(reviewId: string, workspaceRoot?: string) {
  const filePath = getVisualReviewPath(reviewId, workspaceRoot);

  if (!existsSync(filePath)) {
    throw new Error(`Visual review record ${reviewId} does not exist at ${filePath}.`);
  }

  const artifact = readMarkdownArtifact<ReviewRecord>(filePath, "visual review record");

  return {
    ...artifact,
    data: asReviewRecord(artifact.data, filePath),
  } satisfies VisualReviewArtifact;
}

function listVisualReviewRecords(options?: {
  workspaceRoot?: string;
  visualId?: string;
  version?: string;
}) {
  return listMarkdownFiles(getVisualReviewDirectory(options?.workspaceRoot))
    .map((filePath) => {
      const artifact = readMarkdownArtifact<ReviewRecord>(filePath, "visual review record");

      return {
        ...artifact,
        data: asReviewRecord(artifact.data, filePath),
      } satisfies VisualReviewArtifact;
    })
    .filter((artifact) => artifact.data.targetType === "visual")
    .filter((artifact) =>
      options?.visualId ? artifact.data.targetId === options.visualId : true,
    )
    .filter((artifact) =>
      options?.version ? artifact.data.targetVersion === options.version : true,
    )
    .sort((left, right) => left.data.id.localeCompare(right.data.id));
}

export function isVersionOwnedAssetRef(
  visualId: string,
  version: string,
  assetRef: string,
  workspaceRoot?: string,
) {
  const versionDirectory = getVisualVersionDirectory(
    visualId,
    version,
    workspaceRoot,
  );
  const resolvedAssetPath = resolve(versionDirectory, assetRef);
  const relativeAssetPath = relative(versionDirectory, resolvedAssetPath);

  return (
    relativeAssetPath !== "" &&
    relativeAssetPath !== ".." &&
    !relativeAssetPath.startsWith("..")
  );
}

export function listVisualBriefs(options?: { workspaceRoot?: string }) {
  const workspaceRoot = getWorkspaceRoot(options?.workspaceRoot);

  return listYamlIds(getVisualBriefDirectory(workspaceRoot)).map(
    (visualId) => ({
      filePath: getVisualBriefPath(visualId, workspaceRoot),
      data: asVisualBriefRecord(
        parseYamlObject(
          getVisualBriefPath(visualId, workspaceRoot),
          "visual brief",
        ),
        getVisualBriefPath(visualId, workspaceRoot),
      ),
    }),
  ) satisfies VisualBriefArtifact[];
}

export function readVisualBrief(
  visualId: string,
  options?: { workspaceRoot?: string },
) {
  const workspaceRoot = getWorkspaceRoot(options?.workspaceRoot);
  const filePath = getVisualBriefPath(visualId, workspaceRoot);

  if (!existsSync(filePath)) {
    throw new Error(`Visual brief ${visualId} does not exist at ${filePath}.`);
  }

  return {
    filePath,
    data: asVisualBriefRecord(
      parseYamlObject(filePath, "visual brief"),
      filePath,
    ),
  } satisfies VisualBriefArtifact;
}

export function listVisualDrafts(options?: { workspaceRoot?: string }) {
  const workspaceRoot = getWorkspaceRoot(options?.workspaceRoot);

  return listYamlIds(getVisualDraftDirectory(workspaceRoot)).map(
    (visualId) => ({
      filePath: getVisualDraftPath(visualId, workspaceRoot),
      data: asVisualDraftRecord(
        parseYamlObject(
          getVisualDraftPath(visualId, workspaceRoot),
          "visual draft",
        ),
        getVisualDraftPath(visualId, workspaceRoot),
      ),
    }),
  ) satisfies VisualDraftArtifact[];
}

export function readVisualDraft(
  visualId: string,
  options?: { workspaceRoot?: string },
) {
  const workspaceRoot = getWorkspaceRoot(options?.workspaceRoot);
  const filePath = getVisualDraftPath(visualId, workspaceRoot);

  if (!existsSync(filePath)) {
    throw new Error(`Visual draft ${visualId} does not exist at ${filePath}.`);
  }

  return {
    filePath,
    data: asVisualDraftRecord(
      parseYamlObject(filePath, "visual draft"),
      filePath,
    ),
  } satisfies VisualDraftArtifact;
}

export function readVisualSpecVersion(
  visualId: string,
  version: string,
  options?: { workspaceRoot?: string },
) {
  const workspaceRoot = getWorkspaceRoot(options?.workspaceRoot);
  const filePath = getVisualVersionSpecPath(visualId, version, workspaceRoot);

  if (!existsSync(filePath)) {
    throw new Error(
      `Visual spec version ${visualId}@${version} does not exist at ${filePath}.`,
    );
  }

  return {
    filePath,
    data: asVisualSpecVersionRecord(
      parseYamlObject(filePath, "visual spec version"),
      filePath,
    ),
  } satisfies VisualSpecVersionArtifact;
}

export function listVisualSpecVersions(options?: { workspaceRoot?: string }) {
  const workspaceRoot = getWorkspaceRoot(options?.workspaceRoot);
  const visualRoot = getVisualVersionRootDirectory(workspaceRoot);

  if (!existsSync(visualRoot)) {
    return [] as VisualSpecVersionArtifact[];
  }

  return readdirSync(visualRoot)
    .flatMap((visualId) => {
      const versionsDirectory = join(visualRoot, visualId, "versions");

      if (!existsSync(versionsDirectory)) {
        return [] as VisualSpecVersionArtifact[];
      }

      return readdirSync(versionsDirectory)
        .sort((left, right) => left.localeCompare(right))
        .flatMap((version) => {
          const specPath = getVisualVersionSpecPath(
            visualId,
            version,
            workspaceRoot,
          );

          if (!existsSync(specPath)) {
            return [] as VisualSpecVersionArtifact[];
          }

          return [readVisualSpecVersion(visualId, version, { workspaceRoot })];
        });
    })
    .sort((left, right) => {
      const leftKey = `${left.data.id}:${left.data.version}`;
      const rightKey = `${right.data.id}:${right.data.version}`;
      return leftKey.localeCompare(rightKey);
    });
}

export function formatVisualVersionReference(visualId: string, version: string) {
  return `${visualId}@${version}`;
}

export function parseVisualVersionReference(reference: string) {
  const separatorIndex = reference.lastIndexOf("@");

  if (separatorIndex <= 0 || separatorIndex === reference.length - 1) {
    return null;
  }

  const visualId = reference.slice(0, separatorIndex).trim();
  const version = reference.slice(separatorIndex + 1).trim();

  if (!visualId || !version) {
    return null;
  }

  return {
    reference,
    visualId,
    version,
  } satisfies FileBackedVisualVersionReference;
}

export function isPublishableVisualStatus(status: string) {
  return status === "approved" || status === "published";
}

export function listPublishableVisualVersions(options?: {
  workspaceRoot?: string;
}) {
  return listVisualSpecVersions(options)
    .filter((artifact) => isPublishableVisualStatus(artifact.data.status))
    .map((artifact) => ({
      reference: formatVisualVersionReference(
        artifact.data.id,
        artifact.data.version,
      ),
      visualId: artifact.data.id,
      version: artifact.data.version,
      status: artifact.data.status,
      visualClass: artifact.data.visualClass,
      provider: artifact.data.provider,
      filePath: artifact.filePath,
    }))
    .sort((left, right) => left.reference.localeCompare(right.reference));
}

export function resolveFileBackedVisualVersionReference(
  reference: string,
  options?: { workspaceRoot?: string },
) {
  const parsedReference = parseVisualVersionReference(reference);

  if (!parsedReference) {
    throw new Error(
      `Expected ${reference} to use the visualId@version reference format.`,
    );
  }

  const artifact = readVisualSpecVersion(
    parsedReference.visualId,
    parsedReference.version,
    options,
  );

  return {
    ...parsedReference,
    artifact,
  };
}

export function startVisualDraft(
  input: StartVisualDraftInput,
): StartVisualDraftResult {
  const workspaceRoot = getWorkspaceRoot(input.workspaceRoot);
  const brief = readVisualBrief(input.visualId, { workspaceRoot });
  const draftPath = getVisualDraftPath(input.visualId, workspaceRoot);

  if (brief.data.forUnit !== input.unitId) {
    throw new Error(
      `Visual brief ${input.visualId} expects unit ${brief.data.forUnit}, but start requested ${input.unitId}.`,
    );
  }

  if (brief.data.kind !== input.kind) {
    throw new Error(
      `Visual brief ${input.visualId} expects kind ${brief.data.kind}, but start requested ${input.kind}.`,
    );
  }

  readUnitBrief(input.unitId, { workspaceRoot });

  if (existsSync(draftPath)) {
    return {
      created: false,
      artifact: readVisualDraft(input.visualId, { workspaceRoot }),
    };
  }

  const draftRecord: VisualDraftRecord = {
    schema: "visual-draft/v1",
    id: brief.data.id,
    status: "working_draft",
    kind: brief.data.kind,
    visualClass: brief.data.visualClass,
    intent: brief.data.intent,
    forUnit: brief.data.forUnit,
    provider:
      brief.data.visualClass === "illustration"
        ? "gpt-image"
        : brief.data.visualClass === "diagram"
          ? "mermaid"
          : "vega-lite",
    dataSource: brief.data.dataSource,
    sourceRefs: normalizeSourceReferences(
      brief.data.sourceRefs,
      brief.filePath,
      workspaceRoot,
    ),
    styleProfile: brief.data.styleProfile,
    caption: brief.data.captionDirection,
    alt: brief.data.accessibilityNeeds[0],
    longDescription: brief.data.longDescriptionDirection,
    prompt: `Create ${brief.data.visualClass} ${brief.data.id} for ${brief.data.forUnit}.`,
    notes: [
      `Started from VisualBrief ${brief.data.id}.`,
      `Keep ${brief.data.forUnit} as the owning unit until a later superseding draft changes that relationship.`,
    ],
    basedOnVersion: null,
  };

  writeYamlArtifact(draftPath, draftRecord);

  return {
    created: true,
    artifact: {
      filePath: draftPath,
      data: asVisualDraftRecord(draftRecord, draftPath),
    },
  };
}

export function showVisualArtifact(
  input: ShowVisualArtifactInput,
): ShowVisualArtifactResult {
  if (input.version) {
    return {
      mode: "version",
      ...readVisualSpecVersion(input.visualId, input.version, {
        workspaceRoot: input.workspaceRoot,
      }),
    };
  }

  const draftPath = getVisualDraftPath(input.visualId, input.workspaceRoot);

  if (input.draft || existsSync(draftPath)) {
    return {
      mode: "draft",
      ...readVisualDraft(input.visualId, { workspaceRoot: input.workspaceRoot }),
    };
  }

  const latestVersionId = getLatestVisualVersionId(
    input.visualId,
    input.workspaceRoot,
  );

  if (!latestVersionId) {
    throw new Error(`No draft or version exists for visual ${input.visualId}.`);
  }

  return {
    mode: "version",
    ...readVisualSpecVersion(input.visualId, latestVersionId, {
      workspaceRoot: input.workspaceRoot,
    }),
  };
}

export function freezeVisualDraft(input: FreezeVisualDraftInput) {
  const workspaceRoot = getWorkspaceRoot(input.workspaceRoot);
  const draft = readVisualDraft(input.visualId, { workspaceRoot });
  const version = formatUnitVersionTimestamp(
    input.now ?? new Date().toISOString(),
  );
  const specPath = getVisualVersionSpecPath(input.visualId, version, workspaceRoot);

  if (existsSync(specPath)) {
    throw new Error(`Visual version ${draft.data.id}@${version} already exists.`);
  }

  const versionRecord: VisualSpecVersionRecord = {
    schema: "visual-spec/v1",
    id: draft.data.id,
    version,
    status: "frozen_candidate",
    kind: draft.data.kind,
    visualClass: draft.data.visualClass,
    intent: draft.data.intent,
    forUnit: draft.data.forUnit,
    supersedes: getLatestVisualVersionId(input.visualId, workspaceRoot),
    provider: draft.data.provider,
    prompt: draft.data.prompt,
    negativePrompt: draft.data.negativePrompt,
    dataSource: draft.data.dataSource,
    sourceRefs: draft.data.sourceRefs,
    styleProfile: draft.data.styleProfile,
    caption: draft.data.caption,
    alt: draft.data.alt,
    longDescription: draft.data.longDescription,
    assetRefs: [],
    reviewRefs: [],
  };

  writeYamlArtifact(specPath, versionRecord);

  return {
    filePath: specPath,
    data: asVisualSpecVersionRecord(versionRecord, specPath),
  } satisfies VisualSpecVersionArtifact;
}

export function generateVisualVersion(
  input: GenerateVisualVersionInput,
): GenerateVisualVersionResult {
  const workspaceRoot = getWorkspaceRoot(input.workspaceRoot);
  const artifact = readVisualSpecVersion(input.visualId, input.version, {
    workspaceRoot,
  });

  if (
    artifact.data.status !== "frozen_candidate" &&
    artifact.data.status !== "generated_candidate"
  ) {
    throw new Error(
      `Visual version ${input.visualId}@${input.version} must be frozen_candidate before generation, but its status is ${artifact.data.status}.`,
    );
  }

  const versionDirectory = getVisualVersionDirectory(
    input.visualId,
    input.version,
    workspaceRoot,
  );
  mkdirSync(versionDirectory, { recursive: true });

  const generatedAssets = buildGeneratedAssets(artifact.data);

  for (const generatedAsset of generatedAssets) {
    const assetPath = getVisualVersionAssetPath(
      input.visualId,
      input.version,
      generatedAsset.ref,
      workspaceRoot,
    );
    ensureDirectory(assetPath);
    writeFileSync(assetPath, generatedAsset.content, "utf8");
  }

  return {
    generated: artifact.data.status !== "generated_candidate",
    artifact: updateVisualSpecVersionArtifact(
      input.visualId,
      input.version,
      (data) => ({
        ...data,
        status: "generated_candidate",
        assetRefs: generatedAssets.map((generatedAsset) => generatedAsset.ref),
      }),
      workspaceRoot,
    ),
  };
}

export function requestVisualReview(
  input: RequestVisualReviewInput,
): RequestVisualReviewResult {
  const artifact = readVisualSpecVersion(input.visualId, input.version, {
    workspaceRoot: input.workspaceRoot,
  });

  if (artifact.data.status === "review_requested") {
    return {
      requested: false,
      artifact,
    };
  }

  if (artifact.data.status !== "generated_candidate") {
    throw new Error(
      `Visual version ${input.visualId}@${input.version} must be generated_candidate before review can be requested, but its status is ${artifact.data.status}.`,
    );
  }

  return {
    requested: true,
    artifact: updateVisualSpecVersionArtifact(
      input.visualId,
      input.version,
      (data) => ({
        ...data,
        status: "review_requested",
      }),
      input.workspaceRoot,
    ),
  };
}

export function createVisualReviewRecord(
  input: CreateVisualReviewInput,
): CreateVisualReviewResult {
  if (!input.findings.length) {
    throw new Error("A visual review must include at least one finding.");
  }

  const versionArtifact = readVisualSpecVersion(input.visualId, input.version, {
    workspaceRoot: input.workspaceRoot,
  });

  if (versionArtifact.data.status !== "review_requested") {
    throw new Error(
      `Visual version ${input.visualId}@${input.version} must be review_requested before a review record can be added, but its status is ${versionArtifact.data.status}.`,
    );
  }

  const reviewId = `review-${input.visualId}-${input.version}-${input.reviewerRole}`;
  const reviewPath = getVisualReviewPath(reviewId, input.workspaceRoot);

  if (existsSync(reviewPath)) {
    throw new Error(
      `Visual review record ${reviewId} already exists for ${input.visualId}@${input.version}.`,
    );
  }

  const reviewRecord: ReviewRecord = {
    schema: "review-record/v1",
    id: reviewId,
    targetType: "visual",
    targetId: input.visualId,
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
    artifact: updateVisualSpecVersionArtifact(
      input.visualId,
      input.version,
      (data) => ({
        ...data,
        status: nextStatus,
        reviewRefs: [...new Set([...(data.reviewRefs ?? []), reviewId])],
      }),
      input.workspaceRoot,
    ),
  };
}

export function reviseVisualDraft(
  input: ReviseVisualDraftInput,
): ReviseVisualDraftResult {
  const versionArtifact = readVisualSpecVersion(
    input.visualId,
    input.fromVersion,
    { workspaceRoot: input.workspaceRoot },
  );
  const reviewArtifact = readVisualReviewRecord(
    input.reviewId,
    input.workspaceRoot,
  );

  if (
    reviewArtifact.data.targetType !== "visual" ||
    reviewArtifact.data.targetId !== input.visualId ||
    reviewArtifact.data.targetVersion !== input.fromVersion
  ) {
    throw new Error(
      `Visual review ${input.reviewId} does not target ${input.visualId}@${input.fromVersion}.`,
    );
  }

  if (reviewArtifact.data.outcome === "approved") {
    throw new Error(
      `Visual review ${input.reviewId} already approved ${input.visualId}@${input.fromVersion}; revise should only be used after changes_requested or blocked outcomes.`,
    );
  }

  const draftPath = getVisualDraftPath(input.visualId, input.workspaceRoot);
  const hadExistingDraft = existsSync(draftPath);
  const draftRecord: VisualDraftRecord = {
    schema: "visual-draft/v1",
    id: versionArtifact.data.id,
    status: "working_draft",
    kind: versionArtifact.data.kind,
    visualClass: versionArtifact.data.visualClass,
    intent: versionArtifact.data.intent,
    forUnit: versionArtifact.data.forUnit,
    provider: versionArtifact.data.provider,
    prompt: versionArtifact.data.prompt,
    negativePrompt: versionArtifact.data.negativePrompt,
    dataSource: versionArtifact.data.dataSource,
    sourceRefs: versionArtifact.data.sourceRefs,
    styleProfile: versionArtifact.data.styleProfile,
    caption: versionArtifact.data.caption,
    alt: versionArtifact.data.alt,
    longDescription: versionArtifact.data.longDescription,
    basedOnVersion: versionArtifact.data.version,
    notes: [
      `Revision draft seeded from ${versionArtifact.data.version}.`,
      `Address review ${reviewArtifact.data.id} before freezing the next candidate.`,
    ],
  };

  writeYamlArtifact(draftPath, draftRecord);

  return {
    created: !hadExistingDraft,
    artifact: {
      filePath: draftPath,
      data: asVisualDraftRecord(draftRecord, draftPath),
    },
  };
}

export function approveVisualVersion(
  input: ApproveVisualVersionInput,
): ApproveVisualVersionResult {
  const artifact = readVisualSpecVersion(input.visualId, input.version, {
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
      `Visual version ${input.visualId}@${input.version} must stay in review_requested before approval, but its status is ${artifact.data.status}.`,
    );
  }

  const reviews = listVisualReviewRecords({
    workspaceRoot: input.workspaceRoot,
    visualId: input.visualId,
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
      `Visual version ${input.visualId}@${input.version} cannot be approved without at least one approved review record.`,
    );
  }

  if (blockingReviews.length) {
    throw new Error(
      `Visual version ${input.visualId}@${input.version} still has non-approved review outcomes and cannot be approved.`,
    );
  }

  return {
    approved: true,
    artifact: updateVisualSpecVersionArtifact(
      input.visualId,
      input.version,
      (data) => ({
        ...data,
        status: "approved",
        reviewRefs: [
          ...new Set([...(data.reviewRefs ?? []), ...reviews.map((review) => review.data.id)]),
        ],
      }),
      input.workspaceRoot,
    ),
  };
}

export function validateVisualArtifacts(options?: { workspaceRoot?: string }) {
  const workspaceRoot = getWorkspaceRoot(options?.workspaceRoot);
  const issues: VisualArtifactIssue[] = [];
  const briefs = listVisualBriefs({ workspaceRoot });
  const drafts = listVisualDrafts({ workspaceRoot });
  const versions = listVisualSpecVersions({ workspaceRoot });
  const experiences = new Set(
    listExperienceNorthStars({ workspaceRoot }).map(
      (experience) => experience.data.id,
    ),
  );
  const sources = listSourceDocuments({ workspaceRoot });
  const sourceIds = new Set(sources.map((source) => source.data.id));
  const sourcePaths = new Set(sources.map((source) => source.data.path));
  const briefById = new Map(briefs.map((brief) => [brief.data.id, brief]));

  for (const visualId of getDuplicateIds(briefs)) {
    issues.push({
      code: "duplicate_visual_brief",
      message: `Visual briefs contain duplicate id ${visualId}.`,
      visualId,
    });
  }

  for (const visualId of getDuplicateIds(drafts)) {
    issues.push({
      code: "duplicate_visual_draft",
      message: `Visual drafts contain duplicate id ${visualId}.`,
      visualId,
    });
  }

  for (const brief of briefs) {
    if (!SUPPORTED_VISUAL_CLASSES.has(brief.data.visualClass)) {
      issues.push({
        code: "unsupported_visual_class",
        message: `Visual brief ${brief.data.id} uses unsupported class ${brief.data.visualClass}.`,
        visualId: brief.data.id,
      });
    }

    if (!experiences.has(brief.data.experienceId)) {
      issues.push({
        code: "unknown_visual_experience",
        message: `Visual brief ${brief.data.id} references unknown experience ${brief.data.experienceId}.`,
        visualId: brief.data.id,
        experienceId: brief.data.experienceId,
      });
    }

    try {
      const unitBrief = readUnitBrief(brief.data.forUnit, { workspaceRoot });

      if (unitBrief.experienceId !== brief.data.experienceId) {
        issues.push({
          code: "visual_brief_draft_mismatch",
          message: `Visual brief ${brief.data.id} belongs to experience ${brief.data.experienceId}, but its unit brief ${brief.data.forUnit} belongs to ${unitBrief.experienceId}.`,
          visualId: brief.data.id,
          experienceId: brief.data.experienceId,
          unitId: brief.data.forUnit,
        });
      }
    } catch {
      issues.push({
        code: "unknown_visual_unit",
        message: `Visual brief ${brief.data.id} references unknown unit brief ${brief.data.forUnit}.`,
        visualId: brief.data.id,
        unitId: brief.data.forUnit,
      });
    }

    for (const sourceRef of brief.data.sourceRefs ?? []) {
      const resolvedSource = resolveVisualSourceReference(
        sourceRef as VisualSourceReference,
        sourceIds,
        sourcePaths,
      );

      if (resolvedSource) {
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
        code: "unknown_visual_source",
        message: `Visual brief ${brief.data.id} references unknown source ${sourceId ?? "(unreadable source reference)"}.`,
        visualId: brief.data.id,
        sourceId,
      });
    }
  }

  for (const draft of drafts) {
    if (!SUPPORTED_VISUAL_CLASSES.has(draft.data.visualClass)) {
      issues.push({
        code: "unsupported_visual_class",
        message: `Visual draft ${draft.data.id} uses unsupported class ${draft.data.visualClass}.`,
        visualId: draft.data.id,
      });
    }

    const brief = briefById.get(draft.data.id);

    if (!brief) {
      issues.push({
        code: "missing_visual_brief",
        message: `Visual draft ${draft.data.id} does not have a matching visual brief.`,
        visualId: draft.data.id,
      });
    } else if (
      brief.data.forUnit !== draft.data.forUnit ||
      brief.data.kind !== draft.data.kind ||
      brief.data.visualClass !== draft.data.visualClass
    ) {
      issues.push({
        code: "visual_brief_draft_mismatch",
        message: `Visual draft ${draft.data.id} does not stay aligned with its brief for unit, kind, and visual class.`,
        visualId: draft.data.id,
        unitId: draft.data.forUnit,
      });
    }

    try {
      readUnitBrief(draft.data.forUnit, { workspaceRoot });
    } catch {
      issues.push({
        code: "unknown_visual_unit",
        message: `Visual draft ${draft.data.id} references unknown unit brief ${draft.data.forUnit}.`,
        visualId: draft.data.id,
        unitId: draft.data.forUnit,
      });
    }

    const providerIssue = getProviderIssue(
      draft.data.visualClass,
      draft.data.provider,
      draft.data.id,
    );

    if (providerIssue) {
      issues.push({
        code: "invalid_visual_provider",
        message: providerIssue,
        visualId: draft.data.id,
      });
    }

    for (const sourceRef of draft.data.sourceRefs ?? []) {
      const resolvedSource = resolveVisualSourceReference(
        sourceRef as VisualSourceReference,
        sourceIds,
        sourcePaths,
      );

      if (resolvedSource) {
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
        code: "unknown_visual_source",
        message: `Visual draft ${draft.data.id} references unknown source ${sourceId ?? "(unreadable source reference)"}.`,
        visualId: draft.data.id,
        sourceId,
      });
    }

    if (
      draft.data.basedOnVersion &&
      !existsSync(
        getVisualVersionSpecPath(
          draft.data.id,
          draft.data.basedOnVersion,
          workspaceRoot,
        ),
      )
    ) {
      issues.push({
        code: "missing_version_spec",
        message: `Visual draft ${draft.data.id} is based on unknown version ${draft.data.basedOnVersion}.`,
        visualId: draft.data.id,
      });
    }
  }

  for (const version of versions) {
    const providerIssue = getProviderIssue(
      version.data.visualClass,
      version.data.provider,
      version.data.id,
    );

    if (providerIssue) {
      issues.push({
        code: "invalid_visual_provider",
        message: providerIssue,
        visualId: version.data.id,
      });
    }

    if (!briefById.has(version.data.id)) {
      issues.push({
        code: "missing_visual_brief",
        message: `Visual version ${version.data.id}@${version.data.version} does not have a matching visual brief.`,
        visualId: version.data.id,
      });
    }

    for (const assetRef of version.data.assetRefs ?? []) {
      if (
        isVersionOwnedAssetRef(
          version.data.id,
          version.data.version,
          assetRef,
          workspaceRoot,
        )
      ) {
        continue;
      }

      issues.push({
        code: "asset_outside_version_dir",
        message: `Visual version ${version.data.id}@${version.data.version} references asset ${assetRef}, which escapes its version-owned directory.`,
        visualId: version.data.id,
      });
    }
  }

  return issues.sort((left, right) =>
    left.message.localeCompare(right.message),
  );
}
