import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join, relative, resolve } from "node:path";

import {
  getOrchestrationExportState,
  type OperationEventRecord,
  type OperationRunRecord,
} from "@/lib/agentic-orchestration";
import {
  getSiteSelectionFixtures,
  type ExperienceConfig,
  type ReleaseManifest,
  type SiteRegistry,
} from "@/lib/site-release";
import {
  listPublishableUnitVersions,
  parseUnitVersionReference,
  type PublishableUnitVersionSummary,
} from "@/lib/source-unit-workflow";
import {
  listPublishableVisualVersions,
  parseVisualVersionReference,
  type PublishableVisualVersionSummary,
} from "@/lib/visual-asset-workflow";

const DEFAULT_OUTPUT_ROOT = ".site/observable-state";

export type ObservableVisibility = "public" | "maintainer";
export type ObservableIssueSeverity = "warning" | "error";

export type ObservableStateIssue = {
  id: string;
  code: string;
  severity: ObservableIssueSeverity;
  message: string;
  subjectType?: string;
  subjectId?: string;
};

export type ProductionEvent = {
  schema: "production-event/v1";
  id: string;
  runId: string;
  eventType: string;
  subjectType: string;
  subjectId: string;
  status: string;
  visibility: ObservableVisibility;
  message: string;
  createdAt: string;
  experienceId?: string;
  releaseId?: string;
  artifactRefs?: string[];
  publicDetails?: Record<string, unknown>;
  details?: Record<string, unknown>;
  severity?: "info" | "warning" | "error";
  supersedesEventId?: string;
};

export type ArtifactStateSnapshot = {
  schema: "artifact-state-snapshot/v1";
  id: string;
  artifactType: string;
  artifactId: string;
  title: string;
  status: string;
  visibility: ObservableVisibility;
  lastChangedAt: string;
  experienceId?: string;
  moduleId?: string;
  versionId?: string;
  sourceRefs?: string[];
  runRefs?: string[];
  reviewStatus?: string;
  publishState?: string;
  summary?: string;
  nextStep?: string;
};

export type ExperienceStateSnapshot = {
  schema: "experience-state-snapshot/v1";
  id: string;
  experienceId: string;
  title: string;
  status: string;
  visibility: ObservableVisibility;
  moduleRefs: string[];
  artifactRefs: string[];
  lastChangedAt: string;
  northStarId?: string;
  sourceRefs?: string[];
  releaseRefs?: string[];
  progressSummary?: string;
  currentRisks?: string[];
  nextMilestone?: string;
};

export type ReleaseStateSnapshot = {
  schema: "release-state-snapshot/v1";
  id: string;
  releaseId: string;
  status: string;
  visibility: ObservableVisibility;
  assembledAt: string;
  artifactRefs: string[];
  publishedAt?: string;
  experienceRefs?: string[];
  qaRefs?: string[];
  diffSummary?: string;
  routeCount?: number;
  supersedes?: string;
  summary?: string;
};

export type QueueEntry = {
  id: string;
  subjectType: string;
  subjectId: string;
  status: string;
  createdAt: string;
  message: string;
  runId?: string;
};

export type QueueSnapshot = {
  schema: "queue-snapshot/v1";
  id: string;
  queueKey: string;
  visibility: ObservableVisibility;
  generatedAt: string;
  entries: QueueEntry[];
  summary?: string;
  oldestCreatedAt?: string;
  blockingReason?: string;
  countsByStatus?: Record<string, number>;
};

export type FailureSnapshot = {
  schema: "failure-snapshot/v1";
  id: string;
  runId: string;
  subjectType: string;
  subjectId: string;
  status: string;
  visibility: ObservableVisibility;
  firstFailedAt: string;
  latestMessage: string;
  experienceId?: string;
  artifactRefs?: string[];
  retryRunIds?: string[];
  supersededBy?: string;
  publicResolution?: string;
  errorCode?: string;
};

export type LineageNode = {
  id: string;
  label: string;
  nodeType: string;
  href?: string;
};

export type LineageEdge = {
  from: string;
  to: string;
  relationship: string;
};

export type LineageSnapshot = {
  schema: "lineage-snapshot/v1";
  id: string;
  subjectType: string;
  subjectId: string;
  visibility: ObservableVisibility;
  generatedAt: string;
  nodes: LineageNode[];
  edges: LineageEdge[];
  experienceId?: string;
  releaseId?: string;
  summary?: string;
  sourceRefs?: string[];
};

export type ObservableStateBundle = {
  schema: "observable-state-bundle/v1";
  visibility: ObservableVisibility;
  generatedAt: string;
  issues: ObservableStateIssue[];
  productionEvents: ProductionEvent[];
  artifactStateSnapshots: ArtifactStateSnapshot[];
  experienceStateSnapshots: ExperienceStateSnapshot[];
  releaseStateSnapshots: ReleaseStateSnapshot[];
  queueSnapshots: QueueSnapshot[];
  failureSnapshots: FailureSnapshot[];
  lineageSnapshots: LineageSnapshot[];
};

export type ObservableStateManifest = {
  schema: "observable-state-manifest/v1";
  visibility: ObservableVisibility;
  generatedAt: string;
  bundleFile: string;
  files: Record<string, string>;
  counts: Record<string, number>;
};

export type ObservableStateBuildResult = {
  generatedAt: string;
  bundles: Record<ObservableVisibility, ObservableStateBundle>;
};

export type ObservableStateExportResult = ObservableStateBuildResult & {
  outputRoot: string;
  writtenFiles: Record<ObservableVisibility, string[]>;
};

type ResearchSource = {
  id: string;
  title: string;
  relativePath: string;
  summary: string;
  lastChangedAt: string;
};

type ReleaseQaArtifact = {
  id: string;
  title: string;
  relativePath: string;
  status: string;
  createdAt: string;
  releaseId?: string;
  experienceId?: string;
};

function toPosixPath(value: string) {
  return value.replaceAll("\\", "/");
}

function stableSortById<T extends { id: string }>(items: T[]) {
  return items.sort((left, right) => left.id.localeCompare(right.id));
}

function stableSortByCreatedAt<T extends { createdAt: string; id: string }>(
  items: T[],
) {
  return items.sort((left, right) => {
    if (left.createdAt === right.createdAt) {
      return left.id.localeCompare(right.id);
    }

    return left.createdAt.localeCompare(right.createdAt);
  });
}

function sanitizeText(value: string, workspaceRoot: string) {
  return value.split(workspaceRoot).join("<workspace>");
}

function getSelectedVisibilities(visibility: ObservableVisibility | "all") {
  return visibility === "all"
    ? (["public", "maintainer"] as const)
    : ([visibility] as const);
}

function extractMarkdownTitle(content: string, fallback: string) {
  const titleLine = content
    .split("\n")
    .find((line) => line.trimStart().startsWith("# "));

  return titleLine ? titleLine.replace(/^#\s+/, "").trim() : fallback;
}

function extractMarkdownSummary(content: string) {
  const summaryLine = content
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith("#"));

  if (!summaryLine) {
    return "";
  }

  return summaryLine.length > 220
    ? `${summaryLine.slice(0, 217).trim()}...`
    : summaryLine;
}

function parseFrontmatter(content: string) {
  const lines = content.split("\n");

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

function artifactSnapshotId(kind: string, id: string) {
  return `artifact:${kind}:${id}`;
}

function experienceStateId(experienceId: string) {
  return `experience-state:${experienceId}`;
}

function releaseStateId(releaseId: string) {
  return `release-state:${releaseId}`;
}

function queueSnapshotId(queueKey: string) {
  return `queue:${queueKey}`;
}

function failureSnapshotId(runId: string) {
  return `failure:${runId}`;
}

function lineageSnapshotId(subjectType: string, subjectId: string) {
  return `lineage:${subjectType}:${subjectId}`;
}

function productionEventId(eventId: string) {
  return `production-event:${eventId}`;
}

function getWorkspaceRoot(workspaceRoot?: string) {
  return resolve(workspaceRoot ?? process.cwd());
}

function getOutputRoot(outputRoot?: string, workspaceRoot?: string) {
  return resolve(
    getWorkspaceRoot(workspaceRoot),
    outputRoot ?? DEFAULT_OUTPUT_ROOT,
  );
}

function getResearchSources(workspaceRoot: string) {
  const researchRoot = join(workspaceRoot, "docs", "_research");

  if (!existsSync(researchRoot)) {
    return [] as ResearchSource[];
  }

  return stableSortById(
    readdirSync(researchRoot)
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const fullPath = join(researchRoot, fileName);
        const content = readFileSync(fullPath, "utf8");
        const stats = statSync(fullPath);
        const id = fileName.replace(/\.md$/u, "");

        return {
          id,
          title: extractMarkdownTitle(content, id),
          relativePath: toPosixPath(relative(workspaceRoot, fullPath)),
          summary: extractMarkdownSummary(content),
          lastChangedAt: stats.mtime.toISOString(),
        } satisfies ResearchSource;
      }),
  );
}

function getReleaseQaArtifacts(workspaceRoot: string) {
  const qaRoot = join(workspaceRoot, "docs", "_qa", "releases");

  if (!existsSync(qaRoot)) {
    return [] as ReleaseQaArtifact[];
  }

  return stableSortById(
    readdirSync(qaRoot)
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const fullPath = join(qaRoot, fileName);
        const content = readFileSync(fullPath, "utf8");
        const frontmatter = parseFrontmatter(content);
        const targetId = frontmatter.get("targetId") ?? fileName;
        const releaseIdMatch = targetId.match(/--(.+)$/u);
        const experienceIdMatch = targetId.match(/^(.+)--/u);

        return {
          id: targetId,
          title: `Release QA: ${targetId}`,
          relativePath: toPosixPath(relative(workspaceRoot, fullPath)),
          status: frontmatter.get("status") ?? "review_requested",
          createdAt:
            frontmatter.get("createdAt") ??
            statSync(fullPath).mtime.toISOString(),
          releaseId: releaseIdMatch?.[1],
          experienceId: experienceIdMatch?.[1],
        } satisfies ReleaseQaArtifact;
      }),
  );
}

function getLatestReleaseDate(releases: ReleaseManifest[]) {
  return releases
    .map((release) => release.createdAt)
    .sort((left, right) => right.localeCompare(left))[0];
}

function normalizeUnitReference(reference: string) {
  return parseUnitVersionReference(reference)?.unitId ?? reference;
}

function normalizeVisualReference(reference: string) {
  return parseVisualVersionReference(reference)?.visualId ?? reference;
}

function getLatestPublishableUnits(workspaceRoot: string) {
  const latestById = new Map<string, PublishableUnitVersionSummary>();

  for (const unit of listPublishableUnitVersions({ workspaceRoot })) {
    const current = latestById.get(unit.unitId);

    if (!current || unit.version.localeCompare(current.version) > 0) {
      latestById.set(unit.unitId, unit);
    }
  }

  return stableSortById(
    [...latestById.values()].map((unit) => ({ id: unit.unitId, ...unit })),
  );
}

function getLatestPublishableVisuals(workspaceRoot: string) {
  const latestById = new Map<string, PublishableVisualVersionSummary>();

  for (const visual of listPublishableVisualVersions({ workspaceRoot })) {
    const current = latestById.get(visual.visualId);

    if (!current || visual.version.localeCompare(current.version) > 0) {
      latestById.set(visual.visualId, visual);
    }
  }

  return stableSortById(
    [...latestById.values()].map((visual) => ({
      id: visual.visualId,
      ...visual,
    })),
  );
}

function getPublishedState(statuses: string[]) {
  if (statuses.includes("published")) {
    return "published";
  }

  if (statuses.includes("approved")) {
    return "approved";
  }

  if (statuses.includes("assembled") || statuses.includes("review_requested")) {
    return "in_progress";
  }

  return "registered";
}

function inferEventType(event: OperationEventRecord) {
  if (event.level === "error") {
    return "run_failed";
  }

  if (event.message.startsWith("Started ")) {
    return "run_started";
  }

  if (event.message.startsWith("Operation completed")) {
    return "run_completed";
  }

  if (event.message.startsWith("Acquired lock ")) {
    return "lock_acquired";
  }

  return "run_event";
}

function inferEventStatus(
  event: OperationEventRecord,
  run: OperationRunRecord | undefined,
) {
  if (event.level === "error") {
    return "failed";
  }

  if (event.message.startsWith("Started ")) {
    return "running";
  }

  if (event.message.startsWith("Operation completed")) {
    return "succeeded";
  }

  return run?.status ?? "running";
}

function getRunArtifactRefs(run: OperationRunRecord) {
  const refs = new Set<string>();

  if (run.experienceId) {
    refs.add(artifactSnapshotId("experience-config", run.experienceId));
    refs.add(experienceStateId(run.experienceId));
  }

  if (run.releaseId) {
    refs.add(artifactSnapshotId("release-manifest", run.releaseId));
    refs.add(releaseStateId(run.releaseId));
  }

  return [...refs].sort((left, right) => left.localeCompare(right));
}

function buildProductionEvents(
  visibility: ObservableVisibility,
  runs: OperationRunRecord[],
  events: OperationEventRecord[],
  workspaceRoot: string,
) {
  const runById = new Map(runs.map((run) => [run.id, run]));

  return stableSortByCreatedAt(
    events.map((event) => {
      const run = runById.get(event.runId);
      const artifactRefs = run ? getRunArtifactRefs(run) : [];
      const publicMessage = run
        ? `Operation ${run.operation} ${inferEventStatus(event, run)} for ${run.subject}.`
        : sanitizeText(event.message, workspaceRoot);

      const productionEvent: ProductionEvent = {
        schema: "production-event/v1",
        id: productionEventId(event.id),
        runId: event.runId,
        eventType: inferEventType(event),
        subjectType: "run",
        subjectId: event.runId,
        status: inferEventStatus(event, run),
        visibility,
        message: publicMessage,
        createdAt: event.createdAt,
        severity: event.level,
        publicDetails: run
          ? {
              operation: run.operation,
              subject: run.subject,
            }
          : undefined,
        artifactRefs: artifactRefs.length ? artifactRefs : undefined,
        experienceId: run?.experienceId ?? undefined,
        releaseId: run?.releaseId ?? undefined,
      };

      if (visibility === "maintainer") {
        productionEvent.details = {
          rawMessage: sanitizeText(event.message, workspaceRoot),
          runOperation: run?.operation,
          runSubject: run?.subject,
          commandLine: run?.commandLine,
          eventDetails: event.details,
          runDetails: run?.details,
        };
      }

      return productionEvent;
    }),
  );
}

function buildArtifactStateSnapshots(
  visibility: ObservableVisibility,
  registry: SiteRegistry,
  experiences: ExperienceConfig[],
  releases: ReleaseManifest[],
  fileBackedUnits: Array<PublishableUnitVersionSummary & { id: string }>,
  fileBackedVisuals: Array<PublishableVisualVersionSummary & { id: string }>,
  researchSources: ResearchSource[],
  releaseQaArtifacts: ReleaseQaArtifact[],
  runs: OperationRunRecord[],
  generatedAt: string,
) {
  const routeStatuses = new Map<string, string[]>();
  const unitStatuses = new Map<string, string[]>();
  const visualStatuses = new Map<string, string[]>();

  for (const release of releases) {
    for (const routeId of release.routeIds) {
      routeStatuses.set(routeId, [
        ...(routeStatuses.get(routeId) ?? []),
        release.status,
      ]);
    }

    for (const unitId of release.unitVersions) {
      const normalizedUnitId = normalizeUnitReference(unitId);

      unitStatuses.set(normalizedUnitId, [
        ...(unitStatuses.get(normalizedUnitId) ?? []),
        release.status,
      ]);
    }

    for (const visualId of release.visualVersions) {
      const normalizedVisualId = normalizeVisualReference(visualId);

      visualStatuses.set(normalizedVisualId, [
        ...(visualStatuses.get(normalizedVisualId) ?? []),
        release.status,
      ]);
    }
  }

  const runRefsByExperience = new Map<string, string[]>();
  const runRefsByRelease = new Map<string, string[]>();

  for (const run of runs) {
    if (run.experienceId) {
      runRefsByExperience.set(run.experienceId, [
        ...(runRefsByExperience.get(run.experienceId) ?? []),
        run.id,
      ]);
    }

    if (run.releaseId) {
      runRefsByRelease.set(run.releaseId, [
        ...(runRefsByRelease.get(run.releaseId) ?? []),
        run.id,
      ]);
    }
  }

  const sourceSnapshots = researchSources.map(
    (source) =>
      ({
        schema: "artifact-state-snapshot/v1",
        id: artifactSnapshotId("source", source.id),
        artifactType: "source-document",
        artifactId: source.id,
        title: source.title,
        status: "available",
        visibility,
        lastChangedAt: source.lastChangedAt,
        summary: source.summary,
        nextStep:
          "Explicit downstream lineage has not yet been materialized for this source document.",
      }) satisfies ArtifactStateSnapshot,
  );

  const experienceSnapshots = experiences.map((experience) => {
    const relevantReleases = releases.filter(
      (release) => release.experience === experience.id,
    );
    const latestReleaseDate =
      getLatestReleaseDate(relevantReleases) ?? generatedAt;

    return {
      schema: "artifact-state-snapshot/v1",
      id: artifactSnapshotId("experience-config", experience.id),
      artifactType: "experience-config",
      artifactId: experience.id,
      title: experience.title,
      status: getPublishedState(
        relevantReleases.map((release) => release.status),
      ),
      visibility,
      lastChangedAt: latestReleaseDate,
      runRefs: runRefsByExperience.get(experience.id),
      publishState: getPublishedState(
        relevantReleases.map((release) => release.status),
      ),
      summary: experience.description ?? experience.audience,
      nextStep:
        "Extend canonical planning artifacts and exported observable-state routes for this experience.",
    } satisfies ArtifactStateSnapshot;
  });

  const routeSnapshots = registry.routes.map(
    (route) =>
      ({
        schema: "artifact-state-snapshot/v1",
        id: artifactSnapshotId("route", route.id),
        artifactType: "route",
        artifactId: route.id,
        title: route.title,
        status: getPublishedState(routeStatuses.get(route.id) ?? []),
        visibility,
        lastChangedAt: generatedAt,
        summary: `${route.title} resolves to ${route.href} and appears in ${(routeStatuses.get(route.id) ?? []).length} selected release${(routeStatuses.get(route.id) ?? []).length === 1 ? "" : "s"}.`,
        publishState: getPublishedState(routeStatuses.get(route.id) ?? []),
        nextStep:
          route.includeInPrimaryNav === false
            ? "Route remains secondary until a selected release promotes it into primary navigation."
            : "Route is ready for release-selected navigation and later observatory linking.",
      }) satisfies ArtifactStateSnapshot,
  );

  const unitSnapshots = registry.approvedUnits.map(
    (unit) =>
      ({
        schema: "artifact-state-snapshot/v1",
        id: artifactSnapshotId("unit", unit.id),
        artifactType: "unit-fixture",
        artifactId: unit.id,
        title: unit.id,
        status: unit.status,
        visibility,
        lastChangedAt: generatedAt,
        versionId: unit.id,
        publishState: getPublishedState(unitStatuses.get(unit.id) ?? []),
        summary: `${unit.kind} unit fixture available for release-selected assembly.`,
      }) satisfies ArtifactStateSnapshot,
  );
  const fileBackedUnitSnapshots = fileBackedUnits
    .filter(
      (unit) =>
        !registry.approvedUnits.some((fixture) => fixture.id === unit.unitId),
    )
    .map(
      (unit) =>
        ({
          schema: "artifact-state-snapshot/v1",
          id: artifactSnapshotId("unit", unit.unitId),
          artifactType: "unit-version",
          artifactId: unit.unitId,
          title: unit.unitId,
          status: unit.status,
          visibility,
          lastChangedAt: unit.version.slice(1),
          versionId: unit.version,
          publishState: getPublishedState(unitStatuses.get(unit.unitId) ?? []),
          summary: `${unit.kind} file-backed unit version ${unit.version} available for release-selected assembly.`,
        }) satisfies ArtifactStateSnapshot,
    );

  const visualSnapshots = registry.approvedVisuals.map(
    (visual) =>
      ({
        schema: "artifact-state-snapshot/v1",
        id: artifactSnapshotId("visual", visual.id),
        artifactType: "visual-fixture",
        artifactId: visual.id,
        title: visual.id,
        status: visual.status,
        visibility,
        lastChangedAt: generatedAt,
        versionId: visual.id,
        publishState: getPublishedState(visualStatuses.get(visual.id) ?? []),
        summary:
          "Approved visual fixture available for selected-release assembly.",
      }) satisfies ArtifactStateSnapshot,
  );
  const fileBackedVisualSnapshots = fileBackedVisuals
    .filter(
      (visual) =>
        !registry.approvedVisuals.some(
          (fixture) => fixture.id === visual.visualId,
        ),
    )
    .map(
      (visual) =>
        ({
          schema: "artifact-state-snapshot/v1",
          id: artifactSnapshotId("visual", visual.visualId),
          artifactType: "visual-version",
          artifactId: visual.visualId,
          title: visual.visualId,
          status: visual.status,
          visibility,
          lastChangedAt: visual.version.slice(1),
          versionId: visual.version,
          publishState: getPublishedState(
            visualStatuses.get(visual.visualId) ?? [],
          ),
          summary: `${visual.visualClass} file-backed visual version ${visual.version} available for selected-release assembly.`,
        }) satisfies ArtifactStateSnapshot,
    );

  const releaseSnapshots = releases.map(
    (release) =>
      ({
        schema: "artifact-state-snapshot/v1",
        id: artifactSnapshotId("release-manifest", release.id),
        artifactType: "release-manifest",
        artifactId: release.id,
        title: release.id,
        status: release.status,
        visibility,
        lastChangedAt: release.createdAt,
        experienceId: release.experience,
        runRefs: runRefsByRelease.get(release.id),
        publishState: release.status,
        summary: release.notes ?? `Release manifest for ${release.experience}.`,
      }) satisfies ArtifactStateSnapshot,
  );

  const releaseQaSnapshots = releaseQaArtifacts.map(
    (artifact) =>
      ({
        schema: "artifact-state-snapshot/v1",
        id: artifactSnapshotId("release-qa", artifact.id),
        artifactType: "release-qa",
        artifactId: artifact.id,
        title: artifact.title,
        status: artifact.status,
        visibility,
        lastChangedAt: artifact.createdAt,
        reviewStatus: artifact.status,
        summary: `Release QA record stored at ${artifact.relativePath}.`,
        nextStep:
          "Update this QA record when release composition or release evidence changes materially.",
      }) satisfies ArtifactStateSnapshot,
  );

  return stableSortById([
    ...sourceSnapshots,
    ...experienceSnapshots,
    ...routeSnapshots,
    ...unitSnapshots,
    ...fileBackedUnitSnapshots,
    ...visualSnapshots,
    ...fileBackedVisualSnapshots,
    ...releaseSnapshots,
    ...releaseQaSnapshots,
  ]);
}

function buildExperienceStateSnapshots(
  visibility: ObservableVisibility,
  experiences: ExperienceConfig[],
  releases: ReleaseManifest[],
  generatedAt: string,
) {
  return stableSortById(
    experiences.map((experience) => {
      const relevantReleases = releases.filter(
        (release) => release.experience === experience.id,
      );
      const latestReleaseDate =
        getLatestReleaseDate(relevantReleases) ?? generatedAt;
      const releaseRefs = relevantReleases.map((release) =>
        releaseStateId(release.id),
      );
      const routeRefs = experience.navigation.map((routeId) =>
        artifactSnapshotId("route", routeId),
      );
      const unitRefs = experience.unitRefs.map((unitId) =>
        artifactSnapshotId("unit", unitId),
      );
      const visualRefs = (experience.visualRefs ?? []).map((visualId) =>
        artifactSnapshotId("visual", visualId),
      );
      const status = relevantReleases.some(
        (release) => release.status === "published",
      )
        ? "published-baseline"
        : relevantReleases.some((release) => release.status === "approved")
          ? "approved"
          : "planned";

      return {
        schema: "experience-state-snapshot/v1",
        id: experienceStateId(experience.id),
        experienceId: experience.id,
        title: experience.title,
        status,
        visibility,
        moduleRefs: [],
        artifactRefs: [
          artifactSnapshotId("experience-config", experience.id),
          ...routeRefs,
          ...unitRefs,
          ...visualRefs,
        ],
        lastChangedAt: latestReleaseDate,
        releaseRefs,
        progressSummary: `${relevantReleases.length} release${relevantReleases.length === 1 ? "" : "s"}, ${experience.navigation.length} navigation route${experience.navigation.length === 1 ? "" : "s"}, ${experience.unitRefs.length} unit reference${experience.unitRefs.length === 1 ? "" : "s"}, and ${(experience.visualRefs ?? []).length} visual reference${(experience.visualRefs ?? []).length === 1 ? "" : "s"}.`,
        currentRisks: [
          "Source-to-experience lineage is not yet explicit in canonical planning artifacts.",
        ],
        nextMilestone:
          "Feed the exported observable-state bundle into the public observatory route family.",
      } satisfies ExperienceStateSnapshot;
    }),
  );
}

function buildReleaseStateSnapshots(
  visibility: ObservableVisibility,
  releases: ReleaseManifest[],
  releaseQaArtifacts: ReleaseQaArtifact[],
) {
  return stableSortById(
    releases.map((release) => {
      const qaRefs = releaseQaArtifacts
        .filter((artifact) => artifact.releaseId === release.id)
        .map((artifact) => artifactSnapshotId("release-qa", artifact.id));

      return {
        schema: "release-state-snapshot/v1",
        id: releaseStateId(release.id),
        releaseId: release.id,
        status: release.status,
        visibility,
        assembledAt: release.createdAt,
        publishedAt:
          release.status === "published" ? release.createdAt : undefined,
        artifactRefs: [
          artifactSnapshotId("release-manifest", release.id),
          ...release.routeIds.map((routeId) =>
            artifactSnapshotId("route", routeId),
          ),
          ...release.unitVersions.map((unitId) =>
            artifactSnapshotId("unit", normalizeUnitReference(unitId)),
          ),
          ...release.visualVersions.map((visualId) =>
            artifactSnapshotId(
              "visual",
              normalizeVisualReference(visualId),
            ),
          ),
          ...qaRefs,
        ],
        experienceRefs: [experienceStateId(release.experience)],
        qaRefs,
        routeCount: release.routeIds.length,
        supersedes: release.supersedes ?? undefined,
        summary:
          release.notes ?? `Release ${release.id} for ${release.experience}.`,
      } satisfies ReleaseStateSnapshot;
    }),
  );
}

function buildQueueSnapshots(
  visibility: ObservableVisibility,
  runs: OperationRunRecord[],
  activeLocks: Array<{
    id: string;
    lockKey: string;
    ownerRunId: string;
    acquiredAt: string;
  }>,
  generatedAt: string,
) {
  const entries: QueueEntry[] = [
    ...runs
      .filter((run) => run.status === "running")
      .map(
        (run) =>
          ({
            id: `queue-entry:run:${run.id}`,
            subjectType: "run",
            subjectId: run.id,
            status: "running",
            createdAt: run.startedAt,
            message: `${run.operation} for ${run.subject} is currently running.`,
            runId: run.id,
          }) satisfies QueueEntry,
      ),
    ...activeLocks.map(
      (lock) =>
        ({
          id: `queue-entry:lock:${lock.id}`,
          subjectType: "lock",
          subjectId: lock.id,
          status: "locked",
          createdAt: lock.acquiredAt,
          message: `${lock.lockKey} is currently protected by a local lock.`,
          runId: lock.ownerRunId,
        }) satisfies QueueEntry,
    ),
  ].sort((left, right) => left.createdAt.localeCompare(right.createdAt));

  const countsByStatus = entries.reduce<Record<string, number>>(
    (counts, entry) => {
      counts[entry.status] = (counts[entry.status] ?? 0) + 1;
      return counts;
    },
    {},
  );

  return [
    {
      schema: "queue-snapshot/v1",
      id: queueSnapshotId("local-operations"),
      queueKey: "local-operations",
      visibility,
      generatedAt,
      entries,
      summary: entries.length
        ? `${entries.length} local operation${entries.length === 1 ? " is" : "s are"} currently active or locked.`
        : "No local operations are currently running or blocked by active locks.",
      oldestCreatedAt: entries[0]?.createdAt,
      blockingReason: activeLocks.length
        ? "Local lock protection is preventing overlapping workflow mutations."
        : undefined,
      countsByStatus,
    } satisfies QueueSnapshot,
  ];
}

function buildFailureSnapshots(
  visibility: ObservableVisibility,
  runs: OperationRunRecord[],
  workspaceRoot: string,
) {
  return stableSortById(
    runs
      .filter((run) => run.status === "failed")
      .map((run) => {
        const retryRuns = runs.filter(
          (candidate) =>
            candidate.operation === run.operation &&
            candidate.subject === run.subject &&
            candidate.startedAt > run.startedAt,
        );
        const supersedingRun = retryRuns.find(
          (candidate) => candidate.status === "succeeded",
        );

        return {
          schema: "failure-snapshot/v1",
          id: failureSnapshotId(run.id),
          runId: run.id,
          subjectType: "run",
          subjectId: run.id,
          status: supersedingRun ? "superseded" : "failed",
          visibility,
          firstFailedAt: run.startedAt,
          latestMessage:
            visibility === "public"
              ? `Operation ${run.operation} failed for ${run.subject}.`
              : sanitizeText(
                  run.errorMessage ?? "Unknown failure.",
                  workspaceRoot,
                ),
          experienceId: run.experienceId ?? undefined,
          artifactRefs: getRunArtifactRefs(run),
          retryRunIds: retryRuns.map((candidate) => candidate.id),
          supersededBy: supersedingRun?.id,
          publicResolution: supersedingRun
            ? `A later successful run superseded this failure.`
            : "Inspect the durable run history and retry after resolving the blocking condition.",
        } satisfies FailureSnapshot;
      }),
  );
}

function buildLineageSnapshots(
  visibility: ObservableVisibility,
  researchSources: ResearchSource[],
  experiences: ExperienceConfig[],
  releases: ReleaseManifest[],
  releaseQaArtifacts: ReleaseQaArtifact[],
  generatedAt: string,
) {
  const sourceLineages = researchSources.map(
    (source) =>
      ({
        schema: "lineage-snapshot/v1",
        id: lineageSnapshotId("source", source.id),
        subjectType: "source",
        subjectId: source.id,
        visibility,
        generatedAt: source.lastChangedAt,
        nodes: [
          {
            id: artifactSnapshotId("source", source.id),
            label: source.title,
            nodeType: "source-document",
          },
        ],
        edges: [],
        summary:
          "Downstream lineage is not yet materialized from this source document in canonical planning artifacts.",
        sourceRefs: [artifactSnapshotId("source", source.id)],
      }) satisfies LineageSnapshot,
  );

  const experienceLineages = experiences.map((experience) => {
    const relevantReleases = releases.filter(
      (release) => release.experience === experience.id,
    );
    const nodes: LineageNode[] = [
      {
        id: artifactSnapshotId("experience-config", experience.id),
        label: experience.title,
        nodeType: "experience-config",
      },
      ...experience.navigation.map((routeId) => ({
        id: artifactSnapshotId("route", routeId),
        label: routeId,
        nodeType: "route",
      })),
      ...experience.unitRefs.map((unitId) => ({
        id: artifactSnapshotId("unit", unitId),
        label: unitId,
        nodeType: "unit",
      })),
      ...(experience.visualRefs ?? []).map((visualId) => ({
        id: artifactSnapshotId("visual", visualId),
        label: visualId,
        nodeType: "visual",
      })),
      ...relevantReleases.map((release) => ({
        id: artifactSnapshotId("release-manifest", release.id),
        label: release.id,
        nodeType: "release-manifest",
      })),
    ];
    const edges: LineageEdge[] = [
      ...experience.navigation.map((routeId) => ({
        from: artifactSnapshotId("experience-config", experience.id),
        to: artifactSnapshotId("route", routeId),
        relationship: "includes-route",
      })),
      ...experience.unitRefs.map((unitId) => ({
        from: artifactSnapshotId("experience-config", experience.id),
        to: artifactSnapshotId("unit", unitId),
        relationship: "references-unit",
      })),
      ...(experience.visualRefs ?? []).map((visualId) => ({
        from: artifactSnapshotId("experience-config", experience.id),
        to: artifactSnapshotId("visual", visualId),
        relationship: "references-visual",
      })),
      ...relevantReleases.map((release) => ({
        from: artifactSnapshotId("experience-config", experience.id),
        to: artifactSnapshotId("release-manifest", release.id),
        relationship: "assembled-as-release",
      })),
    ];

    return {
      schema: "lineage-snapshot/v1",
      id: lineageSnapshotId("experience", experience.id),
      subjectType: "experience",
      subjectId: experience.id,
      visibility,
      generatedAt: getLatestReleaseDate(relevantReleases) ?? generatedAt,
      nodes: stableSortById(nodes),
      edges: edges.sort((left, right) =>
        `${left.from}:${left.to}`.localeCompare(`${right.from}:${right.to}`),
      ),
      experienceId: experience.id,
      summary: `${experience.title} currently links ${experience.navigation.length} routes, ${experience.unitRefs.length} unit references, ${(experience.visualRefs ?? []).length} visual references, and ${relevantReleases.length} release${relevantReleases.length === 1 ? "" : "s"}.`,
    } satisfies LineageSnapshot;
  });

  const releaseLineages = releases.map((release) => {
    const qaRefs = releaseQaArtifacts.filter(
      (artifact) => artifact.releaseId === release.id,
    );
    const nodes: LineageNode[] = [
      {
        id: artifactSnapshotId("experience-config", release.experience),
        label: release.experience,
        nodeType: "experience-config",
      },
      {
        id: artifactSnapshotId("release-manifest", release.id),
        label: release.id,
        nodeType: "release-manifest",
      },
      ...release.routeIds.map((routeId) => ({
        id: artifactSnapshotId("route", routeId),
        label: routeId,
        nodeType: "route",
      })),
      ...release.unitVersions.map((unitId) => ({
        id: artifactSnapshotId("unit", normalizeUnitReference(unitId)),
        label: unitId,
        nodeType: "unit",
      })),
      ...release.visualVersions.map((visualId) => ({
        id: artifactSnapshotId("visual", normalizeVisualReference(visualId)),
        label: visualId,
        nodeType: "visual",
      })),
      ...qaRefs.map((artifact) => ({
        id: artifactSnapshotId("release-qa", artifact.id),
        label: artifact.id,
        nodeType: "release-qa",
      })),
    ];
    const edges: LineageEdge[] = [
      {
        from: artifactSnapshotId("experience-config", release.experience),
        to: artifactSnapshotId("release-manifest", release.id),
        relationship: "selects-release",
      },
      ...release.routeIds.map((routeId) => ({
        from: artifactSnapshotId("release-manifest", release.id),
        to: artifactSnapshotId("route", routeId),
        relationship: "publishes-route",
      })),
      ...release.unitVersions.map((unitId) => ({
        from: artifactSnapshotId("release-manifest", release.id),
        to: artifactSnapshotId("unit", normalizeUnitReference(unitId)),
        relationship: "selects-unit",
      })),
      ...release.visualVersions.map((visualId) => ({
        from: artifactSnapshotId("release-manifest", release.id),
        to: artifactSnapshotId(
          "visual",
          normalizeVisualReference(visualId),
        ),
        relationship: "selects-visual",
      })),
      ...qaRefs.map((artifact) => ({
        from: artifactSnapshotId("release-manifest", release.id),
        to: artifactSnapshotId("release-qa", artifact.id),
        relationship: "validated-by",
      })),
    ];

    return {
      schema: "lineage-snapshot/v1",
      id: lineageSnapshotId("release", release.id),
      subjectType: "release",
      subjectId: release.id,
      visibility,
      generatedAt: release.createdAt,
      nodes: stableSortById(nodes),
      edges: edges.sort((left, right) =>
        `${left.from}:${left.to}`.localeCompare(`${right.from}:${right.to}`),
      ),
      experienceId: release.experience,
      releaseId: release.id,
      summary: `${release.id} currently resolves ${release.routeIds.length} routes, ${release.unitVersions.length} unit references, and ${release.visualVersions.length} visual references.`,
    } satisfies LineageSnapshot;
  });

  return stableSortById([
    ...sourceLineages,
    ...experienceLineages,
    ...releaseLineages,
  ]);
}

function collectBundleIssues(
  bundle: Omit<ObservableStateBundle, "issues">,
  workspaceRoot: string,
) {
  const issues: ObservableStateIssue[] = [];
  const knownIds = new Set<string>([
    ...bundle.productionEvents.map((entry) => entry.id),
    ...bundle.artifactStateSnapshots.map((entry) => entry.id),
    ...bundle.experienceStateSnapshots.map((entry) => entry.id),
    ...bundle.releaseStateSnapshots.map((entry) => entry.id),
    ...bundle.queueSnapshots.map((entry) => entry.id),
    ...bundle.failureSnapshots.map((entry) => entry.id),
    ...bundle.lineageSnapshots.map((entry) => entry.id),
  ]);
  const knownRunIds = new Set<string>([
    ...bundle.productionEvents.map((entry) => entry.runId),
    ...bundle.failureSnapshots.map((entry) => entry.runId),
    ...bundle.queueSnapshots.flatMap((snapshot) =>
      snapshot.entries
        .map((entry) => entry.runId)
        .filter((runId): runId is string => Boolean(runId)),
    ),
  ]);

  const ensureReference = (
    parentId: string,
    subjectType: string,
    references: string[] | undefined,
  ) => {
    for (const reference of references ?? []) {
      if (!knownIds.has(reference)) {
        issues.push({
          id: `${parentId}:missing-ref:${reference}`,
          code: "missing_reference",
          severity: "error",
          message: `${parentId} references unknown snapshot ${reference}.`,
          subjectType,
          subjectId: parentId,
        });
      }
    }
  };

  for (const snapshot of bundle.artifactStateSnapshots) {
    if (!snapshot.id || !snapshot.artifactId || !snapshot.title) {
      issues.push({
        id: `${snapshot.id || "artifact"}:invalid`,
        code: "invalid_snapshot",
        severity: "error",
        message: `Artifact snapshot ${snapshot.id || "(missing id)"} is missing a required identity field.`,
        subjectType: "artifact",
        subjectId: snapshot.id,
      });
    }

    ensureReference(snapshot.id, "artifact", snapshot.sourceRefs);

    for (const runRef of snapshot.runRefs ?? []) {
      if (!knownRunIds.has(runRef)) {
        issues.push({
          id: `${snapshot.id}:missing-run:${runRef}`,
          code: "missing_reference",
          severity: "error",
          message: `${snapshot.id} references unknown run ${runRef}.`,
          subjectType: "artifact",
          subjectId: snapshot.id,
        });
      }
    }
  }

  for (const snapshot of bundle.experienceStateSnapshots) {
    ensureReference(snapshot.id, "experience", snapshot.moduleRefs);
    ensureReference(snapshot.id, "experience", snapshot.artifactRefs);
    ensureReference(snapshot.id, "experience", snapshot.sourceRefs);
    ensureReference(snapshot.id, "experience", snapshot.releaseRefs);
  }

  for (const snapshot of bundle.releaseStateSnapshots) {
    ensureReference(snapshot.id, "release", snapshot.artifactRefs);
    ensureReference(snapshot.id, "release", snapshot.experienceRefs);
    ensureReference(snapshot.id, "release", snapshot.qaRefs);
  }

  for (const snapshot of bundle.failureSnapshots) {
    ensureReference(snapshot.id, "failure", snapshot.artifactRefs);
  }

  for (const snapshot of bundle.lineageSnapshots) {
    ensureReference(snapshot.id, "lineage", snapshot.sourceRefs);

    const nodeIds = new Set(snapshot.nodes.map((node) => node.id));

    for (const edge of snapshot.edges) {
      if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
        issues.push({
          id: `${snapshot.id}:broken-edge:${edge.from}:${edge.to}`,
          code: "broken_lineage_edge",
          severity: "error",
          message: `${snapshot.id} contains a lineage edge that targets a missing node.`,
          subjectType: snapshot.subjectType,
          subjectId: snapshot.subjectId,
        });
      }
    }

    if (snapshot.subjectType === "source" && snapshot.edges.length === 0) {
      issues.push({
        id: `${snapshot.id}:missing-lineage`,
        code: "missing_lineage",
        severity: "warning",
        message: `${snapshot.subjectId} has no downstream canonical lineage yet; this state is explicit but incomplete.`,
        subjectType: snapshot.subjectType,
        subjectId: snapshot.subjectId,
      });
    }
  }

  if (bundle.visibility === "public") {
    const publicJson = JSON.stringify(bundle);

    if (publicJson.includes(workspaceRoot)) {
      issues.push({
        id: "public-bundle:absolute-path",
        code: "unsafe_public_field",
        severity: "error",
        message:
          "The public observable-state bundle contains an absolute workspace path.",
      });
    }

    if (publicJson.includes('"details":')) {
      issues.push({
        id: "public-bundle:details-field",
        code: "unsafe_public_field",
        severity: "error",
        message:
          "The public observable-state bundle should not include maintainer-only details fields.",
      });
    }
  }

  return issues.sort((left, right) => left.id.localeCompare(right.id));
}

export function buildObservableStateBundles(options?: {
  workspaceRoot?: string;
  dbPath?: string;
  generatedAt?: string;
}) {
  const workspaceRoot = getWorkspaceRoot(options?.workspaceRoot);
  const generatedAt = options?.generatedAt ?? new Date().toISOString();
  const siteFixtures = getSiteSelectionFixtures({ workspaceRoot });
  const fileBackedUnits = getLatestPublishableUnits(workspaceRoot);
  const fileBackedVisuals = getLatestPublishableVisuals(workspaceRoot);
  const researchSources = getResearchSources(workspaceRoot);
  const releaseQaArtifacts = getReleaseQaArtifacts(workspaceRoot);
  const orchestrationState = getOrchestrationExportState(options?.dbPath);

  const buildBundle = (visibility: ObservableVisibility) => {
    const productionEvents = buildProductionEvents(
      visibility,
      orchestrationState.runs,
      orchestrationState.events,
      workspaceRoot,
    );
    const artifactStateSnapshots = buildArtifactStateSnapshots(
      visibility,
      siteFixtures.registry,
      siteFixtures.experiences,
      siteFixtures.releases,
      fileBackedUnits,
      fileBackedVisuals,
      researchSources,
      releaseQaArtifacts,
      orchestrationState.runs,
      generatedAt,
    );
    const experienceStateSnapshots = buildExperienceStateSnapshots(
      visibility,
      siteFixtures.experiences,
      siteFixtures.releases,
      generatedAt,
    );
    const releaseStateSnapshots = buildReleaseStateSnapshots(
      visibility,
      siteFixtures.releases,
      releaseQaArtifacts,
    );
    const queueSnapshots = buildQueueSnapshots(
      visibility,
      orchestrationState.runs,
      orchestrationState.activeLocks,
      generatedAt,
    );
    const failureSnapshots = buildFailureSnapshots(
      visibility,
      orchestrationState.runs,
      workspaceRoot,
    );
    const lineageSnapshots = buildLineageSnapshots(
      visibility,
      researchSources,
      siteFixtures.experiences,
      siteFixtures.releases,
      releaseQaArtifacts,
      generatedAt,
    );

    const provisionalBundle = {
      schema: "observable-state-bundle/v1",
      visibility,
      generatedAt,
      productionEvents,
      artifactStateSnapshots,
      experienceStateSnapshots,
      releaseStateSnapshots,
      queueSnapshots,
      failureSnapshots,
      lineageSnapshots,
    } satisfies Omit<ObservableStateBundle, "issues">;

    return {
      ...provisionalBundle,
      issues: collectBundleIssues(provisionalBundle, workspaceRoot),
    } satisfies ObservableStateBundle;
  };

  return {
    generatedAt,
    bundles: {
      public: buildBundle("public"),
      maintainer: buildBundle("maintainer"),
    },
  } satisfies ObservableStateBuildResult;
}

function writeJsonFile(filePath: string, value: unknown) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function createManifest(bundle: ObservableStateBundle) {
  const files = {
    bundle: "bundle.json",
    issues: "issues.json",
    productionEvents: "production-events.json",
    artifactStateSnapshots: "artifact-state-snapshots.json",
    experienceStateSnapshots: "experience-state-snapshots.json",
    releaseStateSnapshots: "release-state-snapshots.json",
    queueSnapshots: "queue-snapshots.json",
    failureSnapshots: "failure-snapshots.json",
    lineageSnapshots: "lineage-snapshots.json",
  };

  return {
    schema: "observable-state-manifest/v1",
    visibility: bundle.visibility,
    generatedAt: bundle.generatedAt,
    bundleFile: files.bundle,
    files,
    counts: {
      issues: bundle.issues.length,
      productionEvents: bundle.productionEvents.length,
      artifactStateSnapshots: bundle.artifactStateSnapshots.length,
      experienceStateSnapshots: bundle.experienceStateSnapshots.length,
      releaseStateSnapshots: bundle.releaseStateSnapshots.length,
      queueSnapshots: bundle.queueSnapshots.length,
      failureSnapshots: bundle.failureSnapshots.length,
      lineageSnapshots: bundle.lineageSnapshots.length,
    },
  } satisfies ObservableStateManifest;
}

export function exportObservableStateBundles(options?: {
  workspaceRoot?: string;
  dbPath?: string;
  outputRoot?: string;
  generatedAt?: string;
  visibility?: ObservableVisibility | "all";
}) {
  const result = buildObservableStateBundles(options);
  const outputRoot = getOutputRoot(options?.outputRoot, options?.workspaceRoot);
  const writtenFiles = {
    public: [] as string[],
    maintainer: [] as string[],
  };

  for (const visibility of getSelectedVisibilities(
    options?.visibility ?? "all",
  )) {
    const bundle = result.bundles[visibility];
    const targetDirectory = join(outputRoot, visibility);
    rmSync(targetDirectory, { recursive: true, force: true });
    mkdirSync(targetDirectory, { recursive: true });

    const manifest = createManifest(bundle);
    const filesToWrite = {
      "manifest.json": manifest,
      "bundle.json": bundle,
      "issues.json": bundle.issues,
      "production-events.json": bundle.productionEvents,
      "artifact-state-snapshots.json": bundle.artifactStateSnapshots,
      "experience-state-snapshots.json": bundle.experienceStateSnapshots,
      "release-state-snapshots.json": bundle.releaseStateSnapshots,
      "queue-snapshots.json": bundle.queueSnapshots,
      "failure-snapshots.json": bundle.failureSnapshots,
      "lineage-snapshots.json": bundle.lineageSnapshots,
    } as const;

    for (const [fileName, value] of Object.entries(filesToWrite)) {
      const filePath = join(targetDirectory, fileName);
      writeJsonFile(filePath, value);
      writtenFiles[visibility].push(filePath);
    }
  }

  return {
    ...result,
    outputRoot,
    writtenFiles,
  } satisfies ObservableStateExportResult;
}
