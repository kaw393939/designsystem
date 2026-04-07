import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, join, resolve } from "node:path";

import siteRegistryJson from "../content/registry/site-registry.json";

import {
  isPublishableUnitStatus,
  listPublishableUnitVersions,
  parseUnitVersionReference,
  resolveFileBackedUnitVersionReference,
} from "./source-unit-workflow";
import {
  listExperienceConfigs,
  type ExperienceConfigRecord,
} from "./source-experience-workflow";
import {
  isPublishableVisualStatus,
  listPublishableVisualVersions,
  parseVisualVersionReference,
  resolveFileBackedVisualVersionReference,
  type VisualClass,
  type VisualProvider,
} from "./visual-asset-workflow";

export type FixtureApprovalStatus =
  | "approved"
  | "published"
  | "review_requested"
  | "changes_requested";

export type SiteRouteDefinition = {
  id: string;
  href: string;
  title: string;
  navLabel?: string;
  includeInPrimaryNav?: boolean;
  includeInSitemap?: boolean;
  requiredUnitIds?: string[];
  requiredVisualIds?: string[];
};

export type ApprovedUnitFixture = {
  id: string;
  status: FixtureApprovalStatus;
  kind: "concept" | "assignment" | "reading-map" | "lesson";
};

export type ApprovedVisualFixture = {
  id: string;
  status: FixtureApprovalStatus;
};

export type SiteRegistry = {
  schema: string;
  routes: SiteRouteDefinition[];
  approvedUnits: ApprovedUnitFixture[];
  approvedVisuals: ApprovedVisualFixture[];
};

export type ExperienceConfig = ExperienceConfigRecord;

export type ReleaseManifest = {
  schema: string;
  id: string;
  experience: string;
  createdAt: string;
  routeIds: string[];
  unitVersions: string[];
  visualVersions: string[];
  status:
    | "assembled"
    | "review_requested"
    | "changes_requested"
    | "approved"
    | "published"
    | "superseded";
  notes?: string;
  supersedes?: string | null;
};

export type SiteSelectionData = {
  registry: SiteRegistry;
  experiences: ExperienceConfig[];
  releases: ReleaseManifest[];
};

export type SiteSelectionIssueCode =
  | "duplicate_route"
  | "duplicate_unit"
  | "duplicate_visual"
  | "duplicate_experience"
  | "duplicate_release"
  | "invalid_route_href"
  | "unknown_homepage"
  | "unknown_navigation_route"
  | "unknown_experience_unit"
  | "unapproved_experience_unit"
  | "unknown_experience_visual"
  | "unapproved_experience_visual"
  | "unknown_release_experience"
  | "unknown_release_route"
  | "unknown_release_unit"
  | "unapproved_release_unit"
  | "unknown_release_visual"
  | "unapproved_release_visual"
  | "unknown_experience"
  | "unknown_release"
  | "release_experience_mismatch"
  | "multiple_published_releases"
  | "release_supersedes_itself"
  | "unknown_superseded_release"
  | "superseded_release_experience_mismatch"
  | "invalid_release_status"
  | "homepage_not_in_release"
  | "duplicate_release_unit_selection"
  | "duplicate_release_visual_selection"
  | "missing_required_unit"
  | "missing_required_visual";

export type SiteSelectionIssue = {
  code: SiteSelectionIssueCode;
  message: string;
};

export type SiteSelectionContext = {
  experience: ExperienceConfig;
  release: ReleaseManifest;
  routes: SiteRouteDefinition[];
  primaryNavRoutes: SiteRouteDefinition[];
  sitemapRoutes: SiteRouteDefinition[];
  auditRoutes: SiteRouteDefinition[];
  resolvedUnitSelections: ResolvedUnitSelection[];
  resolvedVisualSelections: ResolvedVisualSelection[];
};

export type ResolvedUnitSelection = {
  reference: string;
  unitId: string;
  kind: string;
  status: string;
  source: "fixture" | "file-backed";
  version?: string;
};

export type ResolvedVisualSelection = {
  reference: string;
  visualId: string;
  status: string;
  source: "fixture" | "file-backed";
  version?: string;
  visualClass?: VisualClass;
  provider?: VisualProvider;
  assetRefs?: string[];
};

const CONTENT_ROOT = "content";
const RELEASE_DIRECTORY = ["releases"] as const;
const VALID_RELEASE_STATUSES = new Set<ReleaseManifest["status"]>([
  "assembled",
  "review_requested",
  "changes_requested",
  "approved",
  "published",
  "superseded",
]);

export const defaultSiteExperienceId = "identity-portfolio-system";
export const defaultSiteReleaseId = "identity-portfolio-system-proof-release";

const ROOT_HOMEPAGE_EXPERIENCE_IDS = new Set([
  "identity-portfolio-system",
  "bseai-program",
]);

export function shouldUseRootHomepage(experienceId: string) {
  return ROOT_HOMEPAGE_EXPERIENCE_IDS.has(experienceId);
}

export function getExperienceHomepageRoute(
  context: Pick<SiteSelectionContext, "experience" | "routes">,
) {
  return (
    context.routes.find((route) => route.id === context.experience.homepage) ??
    null
  );
}

export function getExperienceHomepageHref(
  context: Pick<SiteSelectionContext, "experience" | "routes">,
) {
  if (shouldUseRootHomepage(context.experience.id)) {
    return "/";
  }

  return getExperienceHomepageRoute(context)?.href ?? "/";
}

function getWorkspaceRoot(workspaceRoot?: string) {
  return resolve(workspaceRoot ?? process.cwd());
}

function joinContentPath(
  workspaceRoot: string | undefined,
  ...segments: readonly string[]
) {
  return join(getWorkspaceRoot(workspaceRoot), CONTENT_ROOT, ...segments);
}

function getReleaseDirectory(workspaceRoot?: string) {
  return joinContentPath(workspaceRoot, ...RELEASE_DIRECTORY);
}

export function getReleaseManifestPath(
  releaseId: string,
  workspaceRoot?: string,
) {
  return join(getReleaseDirectory(workspaceRoot), `${releaseId}.json`);
}

function readJsonObject(filePath: string, label: string) {
  const parsed = JSON.parse(readFileSync(filePath, "utf8")) as unknown;

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`${label} in ${filePath} must be a JSON object.`);
  }

  return parsed as Record<string, unknown>;
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

function getOptionalString(record: Record<string, unknown>, key: string) {
  const value = record[key];

  return typeof value === "string" && value.trim() ? value : undefined;
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

function getRequiredStringArray(
  record: Record<string, unknown>,
  key: string,
  filePath: string,
) {
  const value = record[key];

  if (
    !Array.isArray(value) ||
    value.some((entry) => typeof entry !== "string")
  ) {
    throw new Error(`Expected ${key} in ${filePath} to be an array of strings.`);
  }

  return value;
}

function asReleaseManifest(
  record: Record<string, unknown>,
  filePath: string,
) {
  const supersedes = record.supersedes;

  if (
    supersedes !== undefined &&
    supersedes !== null &&
    typeof supersedes !== "string"
  ) {
    throw new Error(
      `Expected supersedes in ${filePath} to be a string, null, or omitted.`,
    );
  }

  return {
    schema: getRequiredString(record, "schema", filePath),
    id: getRequiredString(record, "id", filePath),
    experience: getRequiredString(record, "experience", filePath),
    createdAt: getRequiredString(record, "createdAt", filePath),
    routeIds: getRequiredStringArray(record, "routeIds", filePath),
    unitVersions: getRequiredStringArray(record, "unitVersions", filePath),
    visualVersions: getRequiredStringArray(record, "visualVersions", filePath),
    status: getRequiredString(record, "status", filePath) as ReleaseManifest["status"],
    notes: getOptionalString(record, "notes"),
    supersedes: (supersedes as string | null | undefined) ?? null,
  } satisfies ReleaseManifest;
}

export function listReleaseManifests(options?: { workspaceRoot?: string }) {
  const workspaceRoot = getWorkspaceRoot(options?.workspaceRoot);

  return listJsonIds(getReleaseDirectory(workspaceRoot)).map((releaseId) => {
    const filePath = getReleaseManifestPath(releaseId, workspaceRoot);

    return {
      filePath,
      data: asReleaseManifest(readJsonObject(filePath, "release manifest"), filePath),
    };
  });
}

export function readReleaseManifest(
  releaseId: string,
  options?: { workspaceRoot?: string },
) {
  const workspaceRoot = getWorkspaceRoot(options?.workspaceRoot);
  const filePath = getReleaseManifestPath(releaseId, workspaceRoot);

  if (!existsSync(filePath)) {
    throw new Error(`Release manifest ${releaseId} does not exist at ${filePath}.`);
  }

  return {
    filePath,
    data: asReleaseManifest(readJsonObject(filePath, "release manifest"), filePath),
  };
}

function loadSiteSelectionData(workspaceRoot?: string) {
  return {
    registry: siteRegistryJson as SiteRegistry,
    experiences: listExperienceConfigs({ workspaceRoot }).map(
      (artifact) => artifact.data,
    ),
    releases: listReleaseManifests({ workspaceRoot }).map(
      (artifact) => artifact.data,
    ),
  } satisfies SiteSelectionData;
}

function indexById<T extends { id: string }>(items: readonly T[]) {
  return new Map(items.map((item) => [item.id, item]));
}

function getDuplicateIds(items: readonly { id: string }[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const item of items) {
    if (seen.has(item.id)) {
      duplicates.add(item.id);
      continue;
    }

    seen.add(item.id);
  }

  return [...duplicates];
}

function isApprovedFixtureStatus(status: FixtureApprovalStatus) {
  return status === "approved" || status === "published";
}

export function isPublishableReleaseStatus(status: ReleaseManifest["status"]) {
  return status === "approved" || status === "published";
}

function isNormalizedRouteHref(href: string) {
  return href === "/" || (/^\/.*\/$/.test(href) && !href.includes("//"));
}

function getPublishableFileBackedUnitIds(workspaceRoot?: string) {
  return new Set(
    listPublishableUnitVersions({ workspaceRoot }).map((unit) => unit.unitId),
  );
}

function getPublishableFileBackedVisualIds(workspaceRoot?: string) {
  return new Set(
    listPublishableVisualVersions({ workspaceRoot }).map(
      (visual) => visual.visualId,
    ),
  );
}

function resolveReleaseUnitSelections(
  release: ReleaseManifest,
  unitById: Map<string, ApprovedUnitFixture>,
  issues: SiteSelectionIssue[],
  workspaceRoot?: string,
) {
  const resolvedSelections: ResolvedUnitSelection[] = [];

  for (const unitReference of release.unitVersions) {
    const parsedReference = parseUnitVersionReference(unitReference);

    if (parsedReference) {
      try {
        const resolvedReference = resolveFileBackedUnitVersionReference(
          unitReference,
          { workspaceRoot },
        );

        if (!isPublishableUnitStatus(resolvedReference.artifact.data.status)) {
          issues.push({
            code: "unapproved_release_unit",
            message: `Release ${release.id} references file-backed unit ${unitReference} with non-approved status ${resolvedReference.artifact.data.status}.`,
          });
          continue;
        }

        resolvedSelections.push({
          reference: unitReference,
          unitId: resolvedReference.artifact.data.id,
          version: resolvedReference.artifact.data.version,
          kind: resolvedReference.artifact.data.kind,
          status: resolvedReference.artifact.data.status,
          source: "file-backed",
        });
      } catch {
        issues.push({
          code: "unknown_release_unit",
          message: `Release ${release.id} references unknown file-backed unit ${unitReference}.`,
        });
      }

      continue;
    }

    const unit = unitById.get(unitReference);

    if (!unit) {
      issues.push({
        code: "unknown_release_unit",
        message: `Release ${release.id} references unknown unit fixture ${unitReference}.`,
      });
      continue;
    }

    if (!isApprovedFixtureStatus(unit.status)) {
      issues.push({
        code: "unapproved_release_unit",
        message: `Release ${release.id} references unit fixture ${unitReference} with non-approved status ${unit.status}.`,
      });
      continue;
    }

    resolvedSelections.push({
      reference: unitReference,
      unitId: unit.id,
      kind: unit.kind,
      status: unit.status,
      source: "fixture",
    });
  }

  const seenUnitIds = new Map<string, string>();

  for (const selection of resolvedSelections) {
    const priorReference = seenUnitIds.get(selection.unitId);

    if (priorReference) {
      issues.push({
        code: "duplicate_release_unit_selection",
        message: `Release ${release.id} selects multiple unit references for ${selection.unitId}: ${priorReference} and ${selection.reference}.`,
      });
      continue;
    }

    seenUnitIds.set(selection.unitId, selection.reference);
  }

  return resolvedSelections;
}

function resolveReleaseVisualSelections(
  release: ReleaseManifest,
  visualById: Map<string, ApprovedVisualFixture>,
  issues: SiteSelectionIssue[],
  workspaceRoot?: string,
) {
  const resolvedSelections: ResolvedVisualSelection[] = [];

  for (const visualReference of release.visualVersions) {
    const parsedReference = parseVisualVersionReference(visualReference);

    if (parsedReference) {
      try {
        const resolvedReference = resolveFileBackedVisualVersionReference(
          visualReference,
          { workspaceRoot },
        );

        if (!isPublishableVisualStatus(resolvedReference.artifact.data.status)) {
          issues.push({
            code: "unapproved_release_visual",
            message: `Release ${release.id} references file-backed visual ${visualReference} with non-approved status ${resolvedReference.artifact.data.status}.`,
          });
          continue;
        }

        resolvedSelections.push({
          reference: visualReference,
          visualId: resolvedReference.artifact.data.id,
          version: resolvedReference.artifact.data.version,
          status: resolvedReference.artifact.data.status,
          source: "file-backed",
          visualClass: resolvedReference.artifact.data.visualClass,
          provider: resolvedReference.artifact.data.provider,
          assetRefs: resolvedReference.artifact.data.assetRefs,
        });
      } catch {
        issues.push({
          code: "unknown_release_visual",
          message: `Release ${release.id} references unknown file-backed visual ${visualReference}.`,
        });
      }

      continue;
    }

    const visual = visualById.get(visualReference);

    if (!visual) {
      issues.push({
        code: "unknown_release_visual",
        message: `Release ${release.id} references unknown visual fixture ${visualReference}.`,
      });
      continue;
    }

    if (!isApprovedFixtureStatus(visual.status)) {
      issues.push({
        code: "unapproved_release_visual",
        message: `Release ${release.id} references visual fixture ${visualReference} with non-approved status ${visual.status}.`,
      });
      continue;
    }

    resolvedSelections.push({
      reference: visualReference,
      visualId: visual.id,
      status: visual.status,
      source: "fixture",
    });
  }

  const seenVisualIds = new Map<string, string>();

  for (const selection of resolvedSelections) {
    const priorReference = seenVisualIds.get(selection.visualId);

    if (priorReference) {
      issues.push({
        code: "duplicate_release_visual_selection",
        message: `Release ${release.id} selects multiple visual references for ${selection.visualId}: ${priorReference} and ${selection.reference}.`,
      });
      continue;
    }

    seenVisualIds.set(selection.visualId, selection.reference);
  }

  return resolvedSelections;
}

function collectSchemaIssues(
  data: SiteSelectionData,
  options?: { workspaceRoot?: string },
) {
  const issues: SiteSelectionIssue[] = [];
  const routeById = indexById(data.registry.routes);
  const unitById = indexById(data.registry.approvedUnits);
  const visualById = indexById(data.registry.approvedVisuals);
  const experienceById = indexById(data.experiences);
  const publishableFileBackedUnitIds = getPublishableFileBackedUnitIds(
    options?.workspaceRoot,
  );
  const publishableFileBackedVisualIds = getPublishableFileBackedVisualIds(
    options?.workspaceRoot,
  );

  for (const routeId of getDuplicateIds(data.registry.routes)) {
    issues.push({
      code: "duplicate_route",
      message: `Route registry contains duplicate route id ${routeId}.`,
    });
  }

  for (const unitId of getDuplicateIds(data.registry.approvedUnits)) {
    issues.push({
      code: "duplicate_unit",
      message: `Approved unit registry contains duplicate unit id ${unitId}.`,
    });
  }

  for (const visualId of getDuplicateIds(data.registry.approvedVisuals)) {
    issues.push({
      code: "duplicate_visual",
      message: `Approved visual registry contains duplicate visual id ${visualId}.`,
    });
  }

  for (const experienceId of getDuplicateIds(data.experiences)) {
    issues.push({
      code: "duplicate_experience",
      message: `Experience registry contains duplicate experience id ${experienceId}.`,
    });
  }

  for (const releaseId of getDuplicateIds(data.releases)) {
    issues.push({
      code: "duplicate_release",
      message: `Release registry contains duplicate release id ${releaseId}.`,
    });
  }

  for (const route of data.registry.routes) {
    if (!isNormalizedRouteHref(route.href)) {
      issues.push({
        code: "invalid_route_href",
        message: `Route ${route.id} must use normalized href values with a leading slash and trailing slash where applicable, but received ${route.href}.`,
      });
    }
  }

  for (const experience of data.experiences) {
    if (!routeById.has(experience.homepage)) {
      issues.push({
        code: "unknown_homepage",
        message: `Experience ${experience.id} references unknown homepage route ${experience.homepage}.`,
      });
    }

    for (const routeId of experience.navigation) {
      if (!routeById.has(routeId)) {
        issues.push({
          code: "unknown_navigation_route",
          message: `Experience ${experience.id} references unknown navigation route ${routeId}.`,
        });
      }
    }

    for (const unitId of experience.unitRefs) {
      const unit = unitById.get(unitId);

      if (!unit && !publishableFileBackedUnitIds.has(unitId)) {
        issues.push({
          code: "unknown_experience_unit",
          message: `Experience ${experience.id} references unknown approved unit ${unitId}.`,
        });
        continue;
      }

      if (unit && !isApprovedFixtureStatus(unit.status)) {
        issues.push({
          code: "unapproved_experience_unit",
          message: `Experience ${experience.id} references unit fixture ${unitId} with non-approved status ${unit.status}.`,
        });
      }
    }

    for (const visualId of experience.visualRefs ?? []) {
      const visual = visualById.get(visualId);

      if (!visual && !publishableFileBackedVisualIds.has(visualId)) {
        issues.push({
          code: "unknown_experience_visual",
          message: `Experience ${experience.id} references unknown approved visual ${visualId}.`,
        });
        continue;
      }

      if (visual && !isApprovedFixtureStatus(visual.status)) {
        issues.push({
          code: "unapproved_experience_visual",
          message: `Experience ${experience.id} references visual fixture ${visualId} with non-approved status ${visual.status}.`,
        });
      }
    }
  }

  for (const release of data.releases) {
    if (!experienceById.has(release.experience)) {
      issues.push({
        code: "unknown_release_experience",
        message: `Release ${release.id} references unknown experience ${release.experience}.`,
      });
    }

    for (const routeId of release.routeIds) {
      if (!routeById.has(routeId)) {
        issues.push({
          code: "unknown_release_route",
          message: `Release ${release.id} references unknown route ${routeId}.`,
        });
      }
    }

    resolveReleaseUnitSelections(
      release,
      unitById,
      issues,
      options?.workspaceRoot,
    );

    resolveReleaseVisualSelections(
      release,
      visualById,
      issues,
      options?.workspaceRoot,
    );
  }

  return issues;
}

export function getSiteSelectionFixtures(options?: { workspaceRoot?: string }) {
  return loadSiteSelectionData(options?.workspaceRoot);
}

export function getConfiguredExperienceId() {
  return process.env.SITE_EXPERIENCE_ID || defaultSiteExperienceId;
}

export function getConfiguredReleaseId() {
  return process.env.SITE_RELEASE_ID || defaultSiteReleaseId;
}

export function validateSiteSchema(
  data?: SiteSelectionData,
  options?: { workspaceRoot?: string },
) {
  return collectSchemaIssues(
    data ?? loadSiteSelectionData(options?.workspaceRoot),
    options,
  );
}

export function validateSiteWorkflow(
  data: SiteSelectionData = loadSiteSelectionData(),
) {
  const issues: SiteSelectionIssue[] = [];
  const releaseById = indexById(data.releases);
  const publishedCountByExperience = new Map<string, number>();

  for (const release of data.releases) {
    if (!VALID_RELEASE_STATUSES.has(release.status)) {
      issues.push({
        code: "invalid_release_status",
        message: `Release ${release.id} has unsupported workflow status ${release.status}.`,
      });
    }

    if (release.supersedes === release.id) {
      issues.push({
        code: "release_supersedes_itself",
        message: `Release ${release.id} cannot supersede itself.`,
      });
    }

    if (release.supersedes) {
      const supersededRelease = releaseById.get(release.supersedes);

      if (!supersededRelease) {
        issues.push({
          code: "unknown_superseded_release",
          message: `Release ${release.id} supersedes unknown release ${release.supersedes}.`,
        });
      } else if (supersededRelease.experience !== release.experience) {
        issues.push({
          code: "superseded_release_experience_mismatch",
          message: `Release ${release.id} cannot supersede ${release.supersedes} because they belong to different experiences.`,
        });
      }
    }

    if (release.status === "published") {
      publishedCountByExperience.set(
        release.experience,
        (publishedCountByExperience.get(release.experience) ?? 0) + 1,
      );
    }
  }

  for (const [experienceId, count] of publishedCountByExperience.entries()) {
    if (count <= 1) {
      continue;
    }

    issues.push({
      code: "multiple_published_releases",
      message: `Experience ${experienceId} has ${count} published releases; only one published baseline should remain active at a time.`,
    });
  }

  return issues;
}

export function resolveSiteSelection(
  options: {
    data?: SiteSelectionData;
    experienceId?: string;
    releaseId?: string;
    workspaceRoot?: string;
    allowCandidateRelease?: boolean;
  } = {},
) {
  const data = options.data ?? loadSiteSelectionData(options.workspaceRoot);
  const issues = [
    ...validateSiteSchema(data, { workspaceRoot: options.workspaceRoot }),
    ...validateSiteWorkflow(data),
  ];
  const experienceId = options.experienceId ?? getConfiguredExperienceId();
  const releaseId = options.releaseId ?? getConfiguredReleaseId();
  const routeById = indexById(data.registry.routes);
  const experienceById = indexById(data.experiences);
  const releaseById = indexById(data.releases);
  const unitById = indexById(data.registry.approvedUnits);
  const visualById = indexById(data.registry.approvedVisuals);

  const experience = experienceById.get(experienceId);
  const release = releaseById.get(releaseId);

  if (!experience) {
    issues.push({
      code: "unknown_experience",
      message: `Unknown experience ${experienceId}.`,
    });
  }

  if (!release) {
    issues.push({
      code: "unknown_release",
      message: `Unknown release ${releaseId}.`,
    });
  }

  if (!experience || !release) {
    return {
      isValid: false,
      issues,
      experience: experience ?? null,
      release: release ?? null,
      routes: [] as SiteRouteDefinition[],
      primaryNavRoutes: [] as SiteRouteDefinition[],
      sitemapRoutes: [] as SiteRouteDefinition[],
      auditRoutes: [] as SiteRouteDefinition[],
      resolvedUnitSelections: [] as ResolvedUnitSelection[],
      resolvedVisualSelections: [] as ResolvedVisualSelection[],
    };
  }

  if (
    !options.allowCandidateRelease &&
    !isPublishableReleaseStatus(release.status)
  ) {
    issues.push({
      code: "invalid_release_status",
      message: `Release ${release.id} must be approved or published before it can drive static export, but its status is ${release.status}.`,
    });
  }

  const resolvedUnitSelections = resolveReleaseUnitSelections(
    release,
    unitById,
    [],
    options.workspaceRoot,
  );
  const resolvedVisualSelections = resolveReleaseVisualSelections(
    release,
    visualById,
    [],
    options.workspaceRoot,
  );

  if (release.experience !== experience.id) {
    issues.push({
      code: "release_experience_mismatch",
      message: `Release ${release.id} targets experience ${release.experience}, not ${experience.id}.`,
    });
  }

  const selectedRoutes = release.routeIds
    .map((routeId) => routeById.get(routeId))
    .filter((route): route is SiteRouteDefinition => route !== undefined);
  const selectedRouteIds = new Set(selectedRoutes.map((route) => route.id));
  const selectedUnits = new Set(
    resolvedUnitSelections.map((selection) => selection.unitId),
  );
  const selectedVisuals = new Set(
    resolvedVisualSelections.map((selection) => selection.visualId),
  );

  if (!selectedRouteIds.has(experience.homepage)) {
    issues.push({
      code: "homepage_not_in_release",
      message: `Release ${release.id} does not include the experience homepage route ${experience.homepage}.`,
    });
  }

  for (const route of selectedRoutes) {
    for (const unitId of route.requiredUnitIds ?? []) {
      if (!selectedUnits.has(unitId)) {
        issues.push({
          code: "missing_required_unit",
          message: `Release ${release.id} selects route ${route.id} but does not include required unit fixture ${unitId}.`,
        });
      }
    }

    for (const visualId of route.requiredVisualIds ?? []) {
      if (!selectedVisuals.has(visualId)) {
        issues.push({
          code: "missing_required_visual",
          message: `Release ${release.id} selects route ${route.id} but does not include required visual ${visualId}.`,
        });
      }
    }
  }

  const primaryNavRoutes = experience.navigation
    .map((routeId) => routeById.get(routeId))
    .filter((route): route is SiteRouteDefinition => route !== undefined)
    .filter(
      (route) =>
        selectedRouteIds.has(route.id) && route.includeInPrimaryNav !== false,
    );
  const sitemapRoutes = selectedRoutes.filter(
    (route) => route.includeInSitemap !== false,
  );

  return {
    isValid: !issues.length,
    issues,
    experience,
    release,
    routes: selectedRoutes,
    primaryNavRoutes,
    sitemapRoutes,
    auditRoutes: sitemapRoutes,
    resolvedUnitSelections,
    resolvedVisualSelections,
  };
}

export function assertValidSiteSelection(
  options: {
    data?: SiteSelectionData;
    experienceId?: string;
    releaseId?: string;
    workspaceRoot?: string;
    allowCandidateRelease?: boolean;
  } = {},
): SiteSelectionContext {
  const result = resolveSiteSelection(options);

  if (!result.isValid || !result.experience || !result.release) {
    throw new Error(result.issues.map((issue) => issue.message).join(" "));
  }

  return {
    experience: result.experience,
    release: result.release,
    routes: result.routes,
    primaryNavRoutes: result.primaryNavRoutes,
    sitemapRoutes: result.sitemapRoutes,
    auditRoutes: result.auditRoutes,
    resolvedUnitSelections: result.resolvedUnitSelections,
    resolvedVisualSelections: result.resolvedVisualSelections,
  };
}

export function getSelectedSiteBuildContext() {
  return assertValidSiteSelection();
}

export function getSelectedSiteMetadata() {
  const { experience } = getSelectedSiteBuildContext();

  return {
    title: experience.siteMetadata?.title ?? experience.title,
    description:
      experience.siteMetadata?.description ??
      experience.description ??
      experience.audience,
  };
}
