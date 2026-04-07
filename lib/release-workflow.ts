import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

import { parse, stringify } from "yaml";

import {
  getReleaseManifestPath,
  getSiteSelectionFixtures,
  listReleaseManifests,
  readReleaseManifest,
  resolveSiteSelection,
  type ReleaseManifest,
} from "./site-release";
import {
  listPublishableUnitVersions,
  parseUnitVersionReference,
  type PublishableUnitVersionSummary,
  type ReviewRecord,
} from "./source-unit-workflow";
import {
  listPublishableVisualVersions,
  parseVisualVersionReference,
  type PublishableVisualVersionSummary,
} from "./visual-asset-workflow";

const CONTENT_ROOT = "content";
const RELEASE_REVIEW_DIRECTORY = ["reviews", "releases"] as const;
const RELEASE_QA_DIRECTORY = ["docs", "_qa", "releases"] as const;
const REQUIRED_RELEASE_REVIEW_ROLES = [
  "editorial",
  "pedagogy",
  "accuracy",
  "accessibility",
  "release",
] as const;

type MarkdownArtifact<T extends Record<string, unknown>> = {
  filePath: string;
  data: T;
  body: string;
};

export type ReleaseReviewOutcome = "approved" | "changes_requested" | "blocked";

export type ReleaseReviewArtifact = MarkdownArtifact<ReviewRecord>;

export type ReleaseWorkflowArtifact = {
  filePath: string;
  data: ReleaseManifest;
};

export type ReleaseQaArtifact = {
  filePath: string;
  targetId: string;
  targetPath?: string;
  status?: string;
  outcome?: string;
  createdAt?: string;
  experienceId?: string;
  releaseId?: string;
};

export type AssembleReleaseInput = {
  experienceId: string;
  releaseId: string;
  notes?: string;
  workspaceRoot?: string;
  now?: string;
};

export type AssembleReleaseResult = {
  artifact: ReleaseWorkflowArtifact;
};

export type RequestReleaseReviewInput = {
  releaseId: string;
  workspaceRoot?: string;
};

export type RequestReleaseReviewResult = {
  requested: boolean;
  artifact: ReleaseWorkflowArtifact;
};

export type CreateReleaseReviewInput = {
  releaseId: string;
  reviewerRole: string;
  outcome: ReleaseReviewOutcome;
  findings: ReviewRecord["findings"];
  requestedNextStep?: string;
  workspaceRoot?: string;
  now?: string;
};

export type CreateReleaseReviewResult = {
  review: ReleaseReviewArtifact;
  artifact: ReleaseWorkflowArtifact;
};

export type ApproveReleaseInput = {
  releaseId: string;
  workspaceRoot?: string;
};

export type ApproveReleaseResult = {
  approved: boolean;
  artifact: ReleaseWorkflowArtifact;
};

export type PublishReleaseInput = {
  releaseId: string;
  workspaceRoot?: string;
};

export type PublishReleaseResult = {
  published: boolean;
  artifact: ReleaseWorkflowArtifact;
  supersededReleaseIds: string[];
};

export type ReleaseReferenceSnapshot = {
  subjectId: string;
  reference: string;
};

export type ReleaseReferenceChange = {
  subjectId: string;
  from: string;
  to: string;
};

export type ReleaseIdDiff = {
  added: string[];
  removed: string[];
  unchanged: string[];
};

export type ReleaseReferenceDiff = {
  added: ReleaseReferenceSnapshot[];
  removed: ReleaseReferenceSnapshot[];
  changed: ReleaseReferenceChange[];
  unchanged: ReleaseReferenceSnapshot[];
};

export type ReleaseDiffResult = {
  oldRelease: ReleaseManifest;
  newRelease: ReleaseManifest;
  experienceChanged: boolean;
  statusChanged: boolean;
  supersedesChanged: boolean;
  routeDiff: ReleaseIdDiff;
  unitDiff: ReleaseReferenceDiff;
  visualDiff: ReleaseReferenceDiff;
  hasChanges: boolean;
};

export type ReleaseHistoryEntry = {
  releaseId: string;
  experienceId: string;
  createdAt: string;
  status: ReleaseManifest["status"];
  supersedes: string | null;
  qaStatus: string;
  approvedRoles: string[];
  blockingRoles: string[];
  routeCount: number;
  unitCount: number;
  visualCount: number;
};

function getWorkspaceRoot(workspaceRoot?: string) {
  return resolve(workspaceRoot ?? process.cwd());
}

function joinWorkspacePath(
  workspaceRoot: string | undefined,
  ...segments: readonly string[]
) {
  return join(getWorkspaceRoot(workspaceRoot), ...segments);
}

function joinContentPath(
  workspaceRoot: string | undefined,
  ...segments: readonly string[]
) {
  return joinWorkspacePath(workspaceRoot, CONTENT_ROOT, ...segments);
}

function getReleaseReviewDirectory(workspaceRoot?: string) {
  return joinContentPath(workspaceRoot, ...RELEASE_REVIEW_DIRECTORY);
}

function getReleaseReviewPath(reviewId: string, workspaceRoot?: string) {
  return join(getReleaseReviewDirectory(workspaceRoot), `${reviewId}.md`);
}

function getReleaseQaDirectory(workspaceRoot?: string) {
  return joinWorkspacePath(workspaceRoot, ...RELEASE_QA_DIRECTORY);
}

function ensureDirectory(filePath: string) {
  mkdirSync(dirname(filePath), { recursive: true });
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

function ensureObject(value: unknown, filePath: string, label: string) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} in ${filePath} must be a YAML object.`);
  }

  return value as Record<string, unknown>;
}

function getRequiredString(
  record: Record<string, unknown>,
  key: string,
  filePath: string,
) {
  const value = record[key];

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Expected ${key} in ${filePath} to be a non-empty string.`);
  }

  return value;
}

function getOptionalString(record: Record<string, unknown>, key: string) {
  const value = record[key];

  return typeof value === "string" && value.trim() ? value : undefined;
}

function getRequiredObjectArray(
  record: Record<string, unknown>,
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

  return value as Array<Record<string, unknown>>;
}

function writeMarkdownArtifact(
  filePath: string,
  data: Record<string, unknown>,
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

function writeReleaseManifestArtifact(filePath: string, data: ReleaseManifest) {
  ensureDirectory(filePath);
  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function asReviewRecord(
  record: Record<string, unknown>,
  filePath: string,
): ReviewRecord {
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
  };
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

function getDefaultRequestedNextStep(outcome: ReleaseReviewOutcome) {
  return outcome === "approved" ? "approve" : "assemble-new-release";
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

function parseFrontmatter(content: string) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");

  if (lines[0]?.trim() !== "---") {
    return new Map<string, string>();
  }

  const values = new Map<string, string>();

  for (let index = 1; index < lines.length; index += 1) {
    const line = lines[index]?.trim();

    if (!line) {
      continue;
    }

    if (line === "---") {
      break;
    }

    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    values.set(
      line.slice(0, separatorIndex).trim(),
      line.slice(separatorIndex + 1).trim(),
    );
  }

  return values;
}

function parseReleaseQaTargetId(targetId: string | undefined) {
  if (!targetId) {
    return null;
  }

  const match = targetId.match(/^(.*)--(.*)$/u);

  if (!match) {
    return null;
  }

  return {
    experienceId: match[1],
    releaseId: match[2],
  };
}

function isApprovedReleaseQaArtifact(artifact: ReleaseQaArtifact | null) {
  if (!artifact) {
    return false;
  }

  const status = artifact.status?.toLowerCase();
  const outcome = artifact.outcome?.toLowerCase();

  return status === "approved" && (!outcome || outcome === "approved");
}

function isApprovedSelectionStatus(status: string) {
  return status === "approved" || status === "published";
}

function getLatestPublishableUnitReferenceMap(workspaceRoot?: string) {
  const latestById = new Map<string, PublishableUnitVersionSummary>();

  for (const entry of listPublishableUnitVersions({ workspaceRoot })) {
    const current = latestById.get(entry.unitId);

    if (!current || entry.version.localeCompare(current.version) > 0) {
      latestById.set(entry.unitId, entry);
    }
  }

  return latestById;
}

function getLatestPublishableVisualReferenceMap(workspaceRoot?: string) {
  const latestById = new Map<string, PublishableVisualVersionSummary>();

  for (const entry of listPublishableVisualVersions({ workspaceRoot })) {
    const current = latestById.get(entry.visualId);

    if (!current || entry.version.localeCompare(current.version) > 0) {
      latestById.set(entry.visualId, entry);
    }
  }

  return latestById;
}

function normalizeUnitReference(reference: string) {
  return parseUnitVersionReference(reference)?.unitId ?? reference;
}

function normalizeVisualReference(reference: string) {
  return parseVisualVersionReference(reference)?.visualId ?? reference;
}

function selectUnitReference(
  unitId: string,
  latestFileBackedById: Map<string, PublishableUnitVersionSummary>,
  fixtureStatuses: Map<string, string>,
) {
  const latestFileBacked = latestFileBackedById.get(unitId);

  if (latestFileBacked) {
    return latestFileBacked.reference;
  }

  const fixtureStatus = fixtureStatuses.get(unitId);

  if (fixtureStatus && isApprovedSelectionStatus(fixtureStatus)) {
    return unitId;
  }

  return null;
}

function selectVisualReference(
  visualId: string,
  latestFileBackedById: Map<string, PublishableVisualVersionSummary>,
  fixtureStatuses: Map<string, string>,
) {
  const latestFileBacked = latestFileBackedById.get(visualId);

  if (latestFileBacked) {
    return latestFileBacked.reference;
  }

  const fixtureStatus = fixtureStatuses.get(visualId);

  if (fixtureStatus && isApprovedSelectionStatus(fixtureStatus)) {
    return visualId;
  }

  return null;
}

function dedupeStrings(values: string[]) {
  const seen = new Set<string>();
  const deduped: string[] = [];

  for (const value of values) {
    if (seen.has(value)) {
      continue;
    }

    seen.add(value);
    deduped.push(value);
  }

  return deduped;
}

function buildAssembledRouteIds(
  experience: {
    homepage: string;
    navigation: string[];
  },
  routes: Array<{
    id: string;
    requiredUnitIds?: string[];
    requiredVisualIds?: string[];
  }>,
  selectedUnitIds: Set<string>,
  selectedVisualIds: Set<string>,
) {
  const explicitRouteIds = new Set([
    experience.homepage,
    ...experience.navigation,
  ]);

  return routes
    .filter((route) => {
      if (explicitRouteIds.has(route.id)) {
        return true;
      }

      const requiresSelectedArtifacts = Boolean(
        (route.requiredUnitIds?.length ?? 0) ||
          (route.requiredVisualIds?.length ?? 0),
      );

      if (!requiresSelectedArtifacts) {
        return false;
      }

      return (route.requiredUnitIds ?? []).every((unitId) =>
        selectedUnitIds.has(unitId),
      ) &&
        (route.requiredVisualIds ?? []).every((visualId) =>
          selectedVisualIds.has(visualId)
        );
    })
    .map((route) => route.id);
}

function getReleaseQaTargetId(release: ReleaseManifest) {
  return `${release.experience}--${release.id}`;
}

function updateReleaseManifestArtifact(
  releaseId: string,
  updater: (data: ReleaseManifest) => ReleaseManifest,
  workspaceRoot?: string,
) {
  const artifact = readReleaseManifest(releaseId, { workspaceRoot });
  const updatedData = updater(structuredClone(artifact.data));

  writeReleaseManifestArtifact(artifact.filePath, updatedData);

  return {
    filePath: artifact.filePath,
    data: updatedData,
  } satisfies ReleaseWorkflowArtifact;
}

function getRequiredReleaseReviewRoles(release: ReleaseManifest) {
  return release.visualVersions.length
    ? [...REQUIRED_RELEASE_REVIEW_ROLES, "visual"]
    : [...REQUIRED_RELEASE_REVIEW_ROLES];
}

function groupReviewRolesByOutcome(reviews: ReleaseReviewArtifact[]) {
  const approvedRoles = reviews
    .filter((review) => review.data.outcome === "approved")
    .map((review) => review.data.reviewerRole)
    .sort((left, right) => left.localeCompare(right));
  const blockingRoles = reviews
    .filter((review) => review.data.outcome !== "approved")
    .map((review) => review.data.reviewerRole)
    .sort((left, right) => left.localeCompare(right));

  return {
    approvedRoles,
    blockingRoles,
  };
}

function assertValidReleaseCandidate(
  release: ReleaseManifest,
  workspaceRoot?: string,
) {
  const fixtures = getSiteSelectionFixtures({ workspaceRoot });
  const validation = resolveSiteSelection({
    data: {
      ...fixtures,
      releases: [...fixtures.releases.filter((entry) => entry.id !== release.id), release],
    },
    experienceId: release.experience,
    releaseId: release.id,
    workspaceRoot,
    allowCandidateRelease: true,
  });

  if (!validation.isValid) {
    throw new Error(validation.issues.map((issue) => issue.message).join(" "));
  }
}

function assertReleaseReadyForApproval(
  releaseId: string,
  workspaceRoot?: string,
) {
  const artifact = readReleaseManifest(releaseId, { workspaceRoot });
  const validation = resolveSiteSelection({
    experienceId: artifact.data.experience,
    releaseId,
    workspaceRoot,
    allowCandidateRelease: true,
  });

  if (!validation.isValid) {
    throw new Error(validation.issues.map((issue) => issue.message).join(" "));
  }

  const qaArtifact = findReleaseQaArtifact(releaseId, artifact.data.experience, {
    workspaceRoot,
  });

  if (!isApprovedReleaseQaArtifact(qaArtifact)) {
    throw new Error(
      `Release ${releaseId} requires an approved release QA artifact with target id ${getReleaseQaTargetId(artifact.data)} before approval or publish can succeed.`,
    );
  }

  const reviews = listReleaseReviewRecords({ releaseId, workspaceRoot });
  const requiredRoles = getRequiredReleaseReviewRoles(artifact.data);
  const { approvedRoles, blockingRoles } = groupReviewRolesByOutcome(reviews);
  const missingRoles = requiredRoles.filter(
    (role) => !approvedRoles.includes(role),
  );

  if (blockingRoles.length) {
    throw new Error(
      `Release ${releaseId} still has non-approved review outcomes for roles: ${blockingRoles.join(", ")}.`,
    );
  }

  if (missingRoles.length) {
    throw new Error(
      `Release ${releaseId} is missing approved review evidence for roles: ${missingRoles.join(", ")}.`,
    );
  }

  return {
    artifact,
    qaArtifact,
    reviews,
  };
}

function buildReferenceMap(
  references: string[],
  normalize: (reference: string) => string,
) {
  const map = new Map<string, string>();

  for (const reference of references) {
    map.set(normalize(reference), reference);
  }

  return map;
}

function buildIdDiff(oldIds: string[], newIds: string[]): ReleaseIdDiff {
  const oldSet = new Set(oldIds);
  const newSet = new Set(newIds);

  return {
    added: newIds.filter((id) => !oldSet.has(id)).sort((left, right) => left.localeCompare(right)),
    removed: oldIds.filter((id) => !newSet.has(id)).sort((left, right) => left.localeCompare(right)),
    unchanged: newIds.filter((id) => oldSet.has(id)).sort((left, right) => left.localeCompare(right)),
  };
}

function buildReferenceDiff(
  oldReferences: string[],
  newReferences: string[],
  normalize: (reference: string) => string,
): ReleaseReferenceDiff {
  const oldMap = buildReferenceMap(oldReferences, normalize);
  const newMap = buildReferenceMap(newReferences, normalize);
  const subjectIds = [...new Set([...oldMap.keys(), ...newMap.keys()])].sort(
    (left, right) => left.localeCompare(right),
  );
  const added: ReleaseReferenceSnapshot[] = [];
  const removed: ReleaseReferenceSnapshot[] = [];
  const changed: ReleaseReferenceChange[] = [];
  const unchanged: ReleaseReferenceSnapshot[] = [];

  for (const subjectId of subjectIds) {
    const oldReference = oldMap.get(subjectId);
    const newReference = newMap.get(subjectId);

    if (!oldReference && newReference) {
      added.push({ subjectId, reference: newReference });
      continue;
    }

    if (oldReference && !newReference) {
      removed.push({ subjectId, reference: oldReference });
      continue;
    }

    if (oldReference && newReference && oldReference !== newReference) {
      changed.push({
        subjectId,
        from: oldReference,
        to: newReference,
      });
      continue;
    }

    if (oldReference && newReference) {
      unchanged.push({ subjectId, reference: newReference });
    }
  }

  return {
    added,
    removed,
    changed,
    unchanged,
  };
}

export function listReleaseReviewRecords(options?: {
  releaseId?: string;
  workspaceRoot?: string;
}) {
  return listMarkdownFiles(getReleaseReviewDirectory(options?.workspaceRoot))
    .map((filePath) => {
      const content = readFileSync(filePath, "utf8");
      const { frontmatterText, body } = splitFrontmatter(content, filePath);
      const record = ensureObject(
        parse(frontmatterText),
        filePath,
        "release review record",
      );

      return {
        filePath,
        data: asReviewRecord(record, filePath),
        body,
      } satisfies ReleaseReviewArtifact;
    })
    .filter((artifact) => artifact.data.targetType === "release")
    .filter((artifact) =>
      options?.releaseId ? artifact.data.targetId === options.releaseId : true,
    )
    .sort((left, right) => left.data.id.localeCompare(right.data.id));
}

export function listReleaseQaArtifacts(options?: { workspaceRoot?: string }) {
  return listMarkdownFiles(getReleaseQaDirectory(options?.workspaceRoot))
    .map((filePath) => {
      const frontmatter = parseFrontmatter(readFileSync(filePath, "utf8"));
      const targetId = frontmatter.get("targetId") ?? basename(filePath, ".md");
      const parsedTargetId = parseReleaseQaTargetId(targetId);

      return {
        filePath,
        targetId,
        targetPath: frontmatter.get("targetPath"),
        status: frontmatter.get("status"),
        outcome: frontmatter.get("outcome"),
        createdAt: frontmatter.get("createdAt"),
        experienceId: parsedTargetId?.experienceId,
        releaseId: parsedTargetId?.releaseId,
      } satisfies ReleaseQaArtifact;
    })
    .sort((left, right) => left.targetId.localeCompare(right.targetId));
}

export function findReleaseQaArtifact(
  releaseId: string,
  experienceId: string,
  options?: { workspaceRoot?: string },
) {
  const targetId = `${experienceId}--${releaseId}`;

  return (
    listReleaseQaArtifacts(options).find((artifact) => artifact.targetId === targetId) ??
    null
  );
}

export function assembleReleaseCandidate(
  input: AssembleReleaseInput,
): AssembleReleaseResult {
  const workspaceRoot = getWorkspaceRoot(input.workspaceRoot);
  const fixtures = getSiteSelectionFixtures({ workspaceRoot });
  const experience = fixtures.experiences.find(
    (candidate) => candidate.id === input.experienceId,
  );

  if (!experience) {
    throw new Error(`Unknown experience ${input.experienceId}.`);
  }

  if (fixtures.releases.some((release) => release.id === input.releaseId)) {
    throw new Error(
      `Release ${input.releaseId} already exists. Use a new explicit release id instead of overwriting an existing manifest.`,
    );
  }

  const latestUnitReferences = getLatestPublishableUnitReferenceMap(workspaceRoot);
  const latestVisualReferences = getLatestPublishableVisualReferenceMap(
    workspaceRoot,
  );
  const fixtureUnitStatuses = new Map(
    fixtures.registry.approvedUnits.map((entry) => [entry.id, entry.status]),
  );
  const fixtureVisualStatuses = new Map(
    fixtures.registry.approvedVisuals.map((entry) => [entry.id, entry.status]),
  );
  const unitVersions = dedupeStrings(
    experience.unitRefs.map((unitId) => {
      const selectedReference = selectUnitReference(
        unitId,
        latestUnitReferences,
        fixtureUnitStatuses,
      );

      if (!selectedReference) {
        throw new Error(
          `Experience ${experience.id} references unit ${unitId}, but no approved fixture or publishable file-backed version is available.`,
        );
      }

      return selectedReference;
    }),
  );
  const visualVersions = dedupeStrings(
    (experience.visualRefs ?? []).map((visualId) => {
      const selectedReference = selectVisualReference(
        visualId,
        latestVisualReferences,
        fixtureVisualStatuses,
      );

      if (!selectedReference) {
        throw new Error(
          `Experience ${experience.id} references visual ${visualId}, but no approved fixture or publishable file-backed version is available.`,
        );
      }

      return selectedReference;
    }),
  );
  const routeIds = buildAssembledRouteIds(
    experience,
    fixtures.registry.routes,
    new Set(unitVersions.map(normalizeUnitReference)),
    new Set(visualVersions.map(normalizeVisualReference)),
  );
  const manifest: ReleaseManifest = {
    schema: "release/v1",
    id: input.releaseId,
    experience: experience.id,
    createdAt: input.now ?? new Date().toISOString(),
    routeIds,
    unitVersions,
    visualVersions,
    status: "assembled",
    notes: input.notes,
    supersedes: null,
  };

  assertValidReleaseCandidate(manifest, workspaceRoot);

  const filePath = getReleaseManifestPath(input.releaseId, workspaceRoot);
  writeReleaseManifestArtifact(filePath, manifest);

  return {
    artifact: {
      filePath,
      data: manifest,
    },
  };
}

export function requestReleaseReview(
  input: RequestReleaseReviewInput,
): RequestReleaseReviewResult {
  const artifact = readReleaseManifest(input.releaseId, {
    workspaceRoot: input.workspaceRoot,
  });

  if (artifact.data.status === "review_requested") {
    return {
      requested: false,
      artifact,
    };
  }

  if (artifact.data.status !== "assembled") {
    throw new Error(
      `Release ${input.releaseId} must be assembled before review can be requested, but its status is ${artifact.data.status}.`,
    );
  }

  return {
    requested: true,
    artifact: updateReleaseManifestArtifact(
      input.releaseId,
      (data) => ({
        ...data,
        status: "review_requested",
      }),
      input.workspaceRoot,
    ),
  };
}

export function createReleaseReviewRecord(
  input: CreateReleaseReviewInput,
): CreateReleaseReviewResult {
  if (!input.findings.length) {
    throw new Error("A release review must include at least one finding.");
  }

  const artifact = readReleaseManifest(input.releaseId, {
    workspaceRoot: input.workspaceRoot,
  });

  if (artifact.data.status !== "review_requested") {
    throw new Error(
      `Release ${input.releaseId} must be review_requested before a review record can be added, but its status is ${artifact.data.status}.`,
    );
  }

  const reviewId = `review-${input.releaseId}-${input.reviewerRole}`;
  const reviewPath = getReleaseReviewPath(reviewId, input.workspaceRoot);

  if (existsSync(reviewPath)) {
    throw new Error(
      `Release review record ${reviewId} already exists for ${input.releaseId}.`,
    );
  }

  const reviewRecord: ReviewRecord = {
    schema: "review-record/v1",
    id: reviewId,
    targetType: "release",
    targetId: input.releaseId,
    targetVersion: input.releaseId,
    reviewerRole: input.reviewerRole,
    outcome: input.outcome,
    findings: input.findings,
    createdAt: input.now ?? new Date().toISOString(),
    requestedNextStep:
      input.requestedNextStep ?? getDefaultRequestedNextStep(input.outcome),
  };
  const body = buildReviewRecordBody(reviewRecord);

  writeMarkdownArtifact(reviewPath, reviewRecord, body);

  return {
    review: {
      filePath: reviewPath,
      data: reviewRecord,
      body,
    },
    artifact: updateReleaseManifestArtifact(
      input.releaseId,
      (data) => ({
        ...data,
        status:
          input.outcome === "approved" ? data.status : "changes_requested",
      }),
      input.workspaceRoot,
    ),
  };
}

export function approveRelease(
  input: ApproveReleaseInput,
): ApproveReleaseResult {
  const artifact = readReleaseManifest(input.releaseId, {
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
      `Release ${input.releaseId} must stay in review_requested before approval, but its status is ${artifact.data.status}.`,
    );
  }

  assertReleaseReadyForApproval(input.releaseId, input.workspaceRoot);

  return {
    approved: true,
    artifact: updateReleaseManifestArtifact(
      input.releaseId,
      (data) => ({
        ...data,
        status: "approved",
      }),
      input.workspaceRoot,
    ),
  };
}

export function publishRelease(
  input: PublishReleaseInput,
): PublishReleaseResult {
  const workspaceRoot = getWorkspaceRoot(input.workspaceRoot);
  const artifact = readReleaseManifest(input.releaseId, { workspaceRoot });

  if (artifact.data.status === "published") {
    return {
      published: false,
      artifact,
      supersededReleaseIds: [],
    };
  }

  if (artifact.data.status !== "approved") {
    throw new Error(
      `Release ${input.releaseId} must be approved before publish can succeed, but its status is ${artifact.data.status}.`,
    );
  }

  assertReleaseReadyForApproval(input.releaseId, workspaceRoot);

  const releaseArtifacts = listReleaseManifests({ workspaceRoot });
  const supersededReleaseIds = releaseArtifacts
    .map((entry) => entry.data)
    .filter(
      (release) =>
        release.experience === artifact.data.experience &&
        release.id !== input.releaseId &&
        release.status === "published",
    )
    .map((release) => release.id)
    .sort((left, right) => left.localeCompare(right));

  for (const supersededReleaseId of supersededReleaseIds) {
    updateReleaseManifestArtifact(
      supersededReleaseId,
      (data) => ({
        ...data,
        status: "superseded",
      }),
      workspaceRoot,
    );
  }

  const publishedArtifact = updateReleaseManifestArtifact(
    input.releaseId,
    (data) => ({
      ...data,
      status: "published",
      supersedes:
        data.supersedes ?? supersededReleaseIds[0] ?? data.supersedes ?? null,
    }),
    workspaceRoot,
  );

  return {
    published: true,
    artifact: publishedArtifact,
    supersededReleaseIds,
  };
}

export function buildReleaseDiff(
  oldReleaseId: string,
  newReleaseId: string,
  options?: { workspaceRoot?: string },
): ReleaseDiffResult {
  const oldRelease = readReleaseManifest(oldReleaseId, options).data;
  const newRelease = readReleaseManifest(newReleaseId, options).data;
  const routeDiff = buildIdDiff(oldRelease.routeIds, newRelease.routeIds);
  const unitDiff = buildReferenceDiff(
    oldRelease.unitVersions,
    newRelease.unitVersions,
    normalizeUnitReference,
  );
  const visualDiff = buildReferenceDiff(
    oldRelease.visualVersions,
    newRelease.visualVersions,
    normalizeVisualReference,
  );

  return {
    oldRelease,
    newRelease,
    experienceChanged: oldRelease.experience !== newRelease.experience,
    statusChanged: oldRelease.status !== newRelease.status,
    supersedesChanged:
      (oldRelease.supersedes ?? null) !== (newRelease.supersedes ?? null),
    routeDiff,
    unitDiff,
    visualDiff,
    hasChanges:
      routeDiff.added.length > 0 ||
      routeDiff.removed.length > 0 ||
      unitDiff.added.length > 0 ||
      unitDiff.removed.length > 0 ||
      unitDiff.changed.length > 0 ||
      visualDiff.added.length > 0 ||
      visualDiff.removed.length > 0 ||
      visualDiff.changed.length > 0 ||
      oldRelease.experience !== newRelease.experience ||
      oldRelease.status !== newRelease.status ||
      (oldRelease.supersedes ?? null) !== (newRelease.supersedes ?? null),
  };
}

export function formatReleaseDiff(diff: ReleaseDiffResult) {
  const lines = [
    `${diff.oldRelease.id} -> ${diff.newRelease.id}`,
    `experience: ${diff.oldRelease.experience}${
      diff.experienceChanged ? ` -> ${diff.newRelease.experience}` : " (unchanged)"
    }`,
    `status: ${diff.oldRelease.status}${
      diff.statusChanged ? ` -> ${diff.newRelease.status}` : " (unchanged)"
    }`,
    `routes: +${diff.routeDiff.added.length} -${diff.routeDiff.removed.length}`,
    `units: +${diff.unitDiff.added.length} -${diff.unitDiff.removed.length} ~${diff.unitDiff.changed.length}`,
    `visuals: +${diff.visualDiff.added.length} -${diff.visualDiff.removed.length} ~${diff.visualDiff.changed.length}`,
  ];

  for (const routeId of diff.routeDiff.added) {
    lines.push(`+ route ${routeId}`);
  }

  for (const routeId of diff.routeDiff.removed) {
    lines.push(`- route ${routeId}`);
  }

  for (const change of diff.unitDiff.changed) {
    lines.push(`~ unit ${change.subjectId}: ${change.from} -> ${change.to}`);
  }

  for (const change of diff.visualDiff.changed) {
    lines.push(`~ visual ${change.subjectId}: ${change.from} -> ${change.to}`);
  }

  for (const entry of diff.unitDiff.added) {
    lines.push(`+ unit ${entry.subjectId}: ${entry.reference}`);
  }

  for (const entry of diff.unitDiff.removed) {
    lines.push(`- unit ${entry.subjectId}: ${entry.reference}`);
  }

  for (const entry of diff.visualDiff.added) {
    lines.push(`+ visual ${entry.subjectId}: ${entry.reference}`);
  }

  for (const entry of diff.visualDiff.removed) {
    lines.push(`- visual ${entry.subjectId}: ${entry.reference}`);
  }

  return lines.join("\n");
}

export function listReleaseHistory(options?: {
  experienceId?: string;
  workspaceRoot?: string;
}) {
  const qaArtifacts = listReleaseQaArtifacts({ workspaceRoot: options?.workspaceRoot });

  return listReleaseManifests({ workspaceRoot: options?.workspaceRoot })
    .map((artifact) => {
      const reviews = listReleaseReviewRecords({
        workspaceRoot: options?.workspaceRoot,
        releaseId: artifact.data.id,
      });
      const qaArtifact = qaArtifacts.find(
        (entry) =>
          entry.releaseId === artifact.data.id &&
          entry.experienceId === artifact.data.experience,
      );
      const { approvedRoles, blockingRoles } = groupReviewRolesByOutcome(reviews);

      return {
        releaseId: artifact.data.id,
        experienceId: artifact.data.experience,
        createdAt: artifact.data.createdAt,
        status: artifact.data.status,
        supersedes: artifact.data.supersedes ?? null,
        qaStatus: qaArtifact?.status ?? "missing",
        approvedRoles,
        blockingRoles,
        routeCount: artifact.data.routeIds.length,
        unitCount: artifact.data.unitVersions.length,
        visualCount: artifact.data.visualVersions.length,
      } satisfies ReleaseHistoryEntry;
    })
    .filter((entry) =>
      options?.experienceId ? entry.experienceId === options.experienceId : true,
    )
    .sort((left, right) => {
      if (left.createdAt === right.createdAt) {
        return left.releaseId.localeCompare(right.releaseId);
      }

      return right.createdAt.localeCompare(left.createdAt);
    });
}