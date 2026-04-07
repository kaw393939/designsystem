import { spawnSync } from "node:child_process";

import {
  indexBook,
  listBooks,
  splitIntoChapters,
  transcribeBook,
} from "../lib/book-pipeline";
import {
  acquireOrchestrationLock,
  appendOperationEvent,
  completeOperationRun,
  failOperationRun,
  getOrchestrationStatus,
  initializeOrchestrationDatabase,
  releaseOrchestrationLock,
  startOperationRun,
  type OperationLockRecord,
  type OrchestrationLockScope,
} from "../lib/agentic-orchestration";
import {
  approveRelease,
  assembleReleaseCandidate,
  buildReleaseDiff,
  createReleaseReviewRecord,
  formatReleaseDiff,
  listReleaseHistory,
  publishRelease,
  requestReleaseReview,
} from "../lib/release-workflow";
import {
  buildObservableStateBundles,
  exportObservableStateBundles,
  type ObservableVisibility,
} from "../lib/observable-state";
import { pageRecipeSpecs, type PageRecipeId } from "../lib/page-recipes";
import {
  assertValidSiteSelection,
  defaultSiteExperienceId,
  defaultSiteReleaseId,
  getConfiguredExperienceId,
  getConfiguredReleaseId,
  resolveSiteSelection,
  validateSiteSchema,
  validateSiteWorkflow,
} from "../lib/site-release";
import {
  approveUnitVersion,
  createUnitReviewRecord,
  freezeUnitDraft,
  listSourceDocuments,
  requestUnitReview,
  registerSourceDocument,
  reviseUnitDraft,
  showUnitArtifact,
  startUnitDraft,
  summarizeSourceDocument,
  summarizeUnitArtifact,
} from "../lib/source-unit-workflow";
import {
  approveVisualVersion,
  createVisualReviewRecord,
  freezeVisualDraft,
  generateVisualVersion,
  requestVisualReview,
  reviseVisualDraft,
  showVisualArtifact,
  startVisualDraft,
  validateVisualArtifacts,
} from "../lib/visual-asset-workflow";

function parseFlag(argumentsList: string[], name: string) {
  const flagIndex = argumentsList.indexOf(name);

  if (flagIndex === -1) {
    return undefined;
  }

  return argumentsList[flagIndex + 1];
}

function getFirstPositional(argumentsList: string[]) {
  return argumentsList.find((argument) => !argument.startsWith("--"));
}

function parseIntegerFlag(argumentsList: string[], name: string) {
  const rawValue = parseFlag(argumentsList, name);

  if (!rawValue) {
    return undefined;
  }

  const parsedValue = Number.parseInt(rawValue, 10);

  if (Number.isNaN(parsedValue)) {
    throw new Error(
      `Expected ${name} to be an integer, but received ${rawValue}.`,
    );
  }

  return parsedValue;
}

function parseVisibilityFlag(argumentsList: string[]) {
  const visibility = parseFlag(argumentsList, "--visibility") ?? "all";

  if (!["all", "public", "maintainer"].includes(visibility)) {
    throw new Error(
      `Expected --visibility to be one of all, public, or maintainer, but received ${visibility}.`,
    );
  }

  return visibility as ObservableVisibility | "all";
}

function requireFlag(argumentsList: string[], name: string) {
  const value = parseFlag(argumentsList, name);

  if (!value) {
    throw new Error(`Expected ${name} to be provided.`);
  }

  return value;
}

function parseCsvFlag(argumentsList: string[], name: string) {
  const value = parseFlag(argumentsList, name);

  if (!value) {
    return undefined;
  }

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function parseRepeatedFlags(argumentsList: string[], name: string) {
  const values: string[] = [];

  for (let index = 0; index < argumentsList.length; index += 1) {
    if (argumentsList[index] !== name) {
      continue;
    }

    const value = argumentsList[index + 1];

    if (!value || value.startsWith("--")) {
      throw new Error(`Expected ${name} to be followed by a value.`);
    }

    values.push(value);
  }

  return values;
}

function parseRecipeFlag(argumentsList: string[]) {
  const recipe = requireFlag(argumentsList, "--recipe");

  if (!(recipe in pageRecipeSpecs)) {
    throw new Error(
      `Expected --recipe to be one of ${Object.keys(pageRecipeSpecs).join(", ")}, but received ${recipe}.`,
    );
  }

  return recipe as PageRecipeId;
}

function parseReviewOutcomeFlag(argumentsList: string[]) {
  const outcome = requireFlag(argumentsList, "--outcome");

  if (!["approved", "changes_requested", "blocked"].includes(outcome)) {
    throw new Error(
      `Expected --outcome to be one of approved, changes_requested, or blocked, but received ${outcome}.`,
    );
  }

  return outcome as "approved" | "changes_requested" | "blocked";
}

function parseReviewFindings(argumentsList: string[]) {
  const findingValues = parseRepeatedFlags(argumentsList, "--finding");

  if (!findingValues.length) {
    throw new Error(
      "Expected at least one --finding value in the form severity:summary.",
    );
  }

  return findingValues.map((finding) => {
    const separatorIndex = finding.indexOf(":");

    if (separatorIndex <= 0 || separatorIndex === finding.length - 1) {
      throw new Error(
        `Expected --finding ${finding} to use the form severity:summary.`,
      );
    }

    return {
      severity: finding.slice(0, separatorIndex).trim(),
      summary: finding.slice(separatorIndex + 1).trim(),
    };
  });
}

function getSelectedVisibilities(visibility: ObservableVisibility | "all") {
  return visibility === "all"
    ? (["public", "maintainer"] as const)
    : ([visibility] as const);
}

function printObservableStateSummary(visibility: ObservableVisibility | "all") {
  const result = buildObservableStateBundles();
  const selectedBundles = getSelectedVisibilities(visibility).map(
    (selectedVisibility) => result.bundles[selectedVisibility],
  );
  let errorCount = 0;

  for (const bundle of selectedBundles) {
    const errors = bundle.issues.filter((issue) => issue.severity === "error");
    const warnings = bundle.issues.filter(
      (issue) => issue.severity === "warning",
    );
    errorCount += errors.length;

    console.log(
      `${bundle.visibility}: ${bundle.productionEvents.length} events, ${bundle.artifactStateSnapshots.length} artifacts, ${bundle.experienceStateSnapshots.length} experience snapshots, ${bundle.releaseStateSnapshots.length} release snapshots, ${errors.length} errors, ${warnings.length} warnings`,
    );

    for (const issue of bundle.issues) {
      console.log(`- [${issue.severity}] ${issue.message}`);
    }
  }

  if (errorCount > 0) {
    throw new Error(
      `Observable-state validation failed with ${errorCount} error(s).`,
    );
  }
}

function printIssues(issues: { message: string }[]) {
  for (const issue of issues) {
    console.error(`- ${issue.message}`);
  }
}

function runCommand(
  command: string,
  args: string[],
  env: NodeJS.ProcessEnv = process.env,
) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env,
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    throw new Error(
      `Command ${command} ${args.join(" ")} failed with exit code ${result.status ?? 1}.`,
    );
  }
}

function printOrchestrationStatus(limit: number) {
  const status = getOrchestrationStatus(undefined, limit);

  console.log(`SQLite orchestration database: ${status.dbPath}`);
  console.log(
    `Runs: ${status.runCounts.running} running, ${status.runCounts.succeeded} succeeded, ${status.runCounts.failed} failed`,
  );
  console.log(`Active locks: ${status.activeLocks.length}`);

  if (status.activeLocks.length) {
    console.log("\nLocks:");

    for (const lock of status.activeLocks) {
      console.log(
        `- ${lock.lockKey} (${lock.scope}) owned by ${lock.ownerRunId} until ${lock.expiresAt}`,
      );
    }
  }

  if (status.recentRuns.length) {
    console.log("\nRecent runs:");

    for (const run of status.recentRuns) {
      const experienceLabel = run.experienceId
        ? ` experience=${run.experienceId}`
        : "";
      const releaseLabel = run.releaseId ? ` release=${run.releaseId}` : "";

      console.log(
        `- ${run.startedAt} ${run.status} ${run.operation} ${run.subject}${experienceLabel}${releaseLabel}`,
      );
    }
  }
}

function executeTrackedOperation<T>(
  options: {
    operation: string;
    subject: string;
    experienceId?: string;
    releaseId?: string;
    details?: Record<string, unknown>;
    lock?: {
      lockKey: string;
      scope: OrchestrationLockScope;
      ttlSeconds?: number;
      metadata?: Record<string, unknown>;
    };
  },
  action: (runId: string) => T,
) {
  const commandLine = `npm run site -- ${process.argv.slice(2).join(" ")}`;
  const run = startOperationRun({
    operation: options.operation,
    subject: options.subject,
    experienceId: options.experienceId,
    releaseId: options.releaseId,
    commandLine,
    details: options.details,
  });
  let lockRecord: OperationLockRecord | null = null;

  try {
    if (options.lock) {
      const acquiredLock = acquireOrchestrationLock({
        lockKey: options.lock.lockKey,
        ownerRunId: run.runId,
        scope: options.lock.scope,
        ttlSeconds: options.lock.ttlSeconds,
        metadata: options.lock.metadata,
      });
      lockRecord = acquiredLock;

      appendOperationEvent(
        run.runId,
        "info",
        `Acquired lock ${acquiredLock.lockKey}.`,
        {
          scope: acquiredLock.scope,
          expiresAt: acquiredLock.expiresAt,
        },
      );
    }

    const result = action(run.runId);
    completeOperationRun(run.runId, options.details);
    return result;
  } catch (error) {
    failOperationRun(run.runId, error, options.details);
    throw error;
  } finally {
    if (lockRecord) {
      releaseOrchestrationLock(lockRecord.lockKey, run.runId);
    }
  }
}

function printUsage() {
  console.log(`Usage:
  npm run site -- orchestrate init
  npm run site -- orchestrate status [--limit <count>]
  npm run site -- orchestrate history [--limit <count>]
  npm run site -- source register <path> [--id <source-id>] [--title <title>] [--topics <topic-a,topic-b>]
  npm run site -- source list
  npm run site -- unit start <unit-id> --kind <kind> --recipe <recipe> --source <source-id>
  npm run site -- unit show <unit-id> [--draft | --version <version>]
  npm run site -- unit freeze <unit-id>
  npm run site -- unit request-review <unit-id> --version <version>
  npm run site -- unit review <unit-id> --version <version> --role <role> --outcome <approved|changes_requested|blocked> --finding <severity:summary> [--finding <severity:summary>] [--next-step <step>]
  npm run site -- unit revise <unit-id> --from <version> --review <review-id>
  npm run site -- unit approve <unit-id> --version <version>
  npm run site -- visual start <visual-id> --kind <kind> --unit <unit-id>
  npm run site -- visual show <visual-id> [--draft | --version <version>]
  npm run site -- visual freeze <visual-id>
  npm run site -- visual generate <visual-id> --version <version>
  npm run site -- visual request-review <visual-id> --version <version>
  npm run site -- visual review <visual-id> --version <version> --role <role> --outcome <approved|changes_requested|blocked> --finding <severity:summary> [--finding <severity:summary>] [--next-step <step>]
  npm run site -- visual revise <visual-id> --from <version> --review <review-id>
  npm run site -- visual approve <visual-id> --version <version>
  npm run site -- release assemble <experience-id> --release <release-id> [--notes <notes>]
  npm run site -- release request-review <release-id>
  npm run site -- release review <release-id> --role <role> --outcome <approved|changes_requested|blocked> --finding <severity:summary> [--finding <severity:summary>] [--next-step <step>]
  npm run site -- release diff <old-release-id> <new-release-id>
  npm run site -- release approve <release-id>
  npm run site -- release publish <release-id>
  npm run site -- release list [experience-id]
  npm run site -- release history [experience-id]
  npm run site -- validate schema
  npm run site -- validate workflow
  npm run site -- validate release [release-id] [--experience <experience-id>]
  npm run site -- validate visuals [experience-id] [--release <release-id>]
  npm run site -- validate observatory [--visibility <all|public|maintainer>]
  npm run site -- build experience [experience-id] --release <release-id>
  npm run site -- book list
  npm run site -- book transcribe <audio-file> [--no-parallel] [--max-concurrent <n>]
  npm run site -- book split-chapters <slug> [--pattern <regex>]
  npm run site -- book index <slug> [--model <model>]
  npm run site -- export observatory [--visibility <all|public|maintainer>] [--output-root <path>]

Defaults:
  SITE_EXPERIENCE_ID=${defaultSiteExperienceId}
  SITE_RELEASE_ID=${defaultSiteReleaseId}`);
}

const [command, subject, ...rest] = process.argv.slice(2);

if (!command || !subject) {
  printUsage();
  process.exit(1);
}

try {
  if (command === "orchestrate" && subject === "init") {
    const { dbPath } = initializeOrchestrationDatabase();

    console.log(`SQLite orchestration database initialized at ${dbPath}.`);
    process.exit(0);
  }

  if (command === "orchestrate" && subject === "status") {
    printOrchestrationStatus(parseIntegerFlag(rest, "--limit") ?? 10);
    process.exit(0);
  }

  if (command === "orchestrate" && subject === "history") {
    const limit = parseIntegerFlag(rest, "--limit") ?? 20;
    const status = getOrchestrationStatus(undefined, limit);

    console.log(`SQLite orchestration database: ${status.dbPath}`);

    for (const run of status.recentRuns) {
      console.log(
        `- ${run.startedAt} ${run.status} ${run.operation} ${run.subject}${run.errorMessage ? ` error=${run.errorMessage}` : ""}`,
      );
    }

    process.exit(0);
  }

  if (command === "source" && subject === "list") {
    const sources = listSourceDocuments();

    if (!sources.length) {
      console.log("No registered sources found under content/sources/.");
      process.exit(0);
    }

    for (const source of sources) {
      console.log(`- ${summarizeSourceDocument(source)}`);
    }

    process.exit(0);
  }

  if (command === "source" && subject === "register") {
    const sourcePath = getFirstPositional(rest);

    if (!sourcePath) {
      throw new Error(
        "Expected a canonical source path after `site source register`.",
      );
    }

    const requestedId = parseFlag(rest, "--id");
    const requestedTitle = parseFlag(rest, "--title");
    const requestedTopics = parseCsvFlag(rest, "--topics");

    executeTrackedOperation(
      {
        operation: "source_register",
        subject: requestedId ?? sourcePath,
        details: {
          path: sourcePath,
          requestedId,
        },
        lock: {
          lockKey: `source:${requestedId ?? sourcePath}`,
          scope: "operation",
          metadata: {
            path: sourcePath,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Registering canonical source document.",
          {
            path: sourcePath,
          },
        );

        const result = registerSourceDocument({
          path: sourcePath,
          id: requestedId,
          title: requestedTitle,
          topics: requestedTopics,
        });

        console.log(
          result.created
            ? `Registered source ${result.artifact.data.id} at ${result.artifact.filePath} for ${result.artifact.data.path}.`
            : `Source ${result.artifact.data.id} already exists at ${result.artifact.filePath} for ${result.artifact.data.path}.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "unit" && subject === "start") {
    const unitId = getFirstPositional(rest);

    if (!unitId) {
      throw new Error("Expected a unit id after `site unit start`.");
    }

    const kind = requireFlag(rest, "--kind");
    const recipe = parseRecipeFlag(rest);
    const sourceId = requireFlag(rest, "--source");

    executeTrackedOperation(
      {
        operation: "unit_start",
        subject: unitId,
        details: {
          kind,
          recipe,
          sourceId,
        },
        lock: {
          lockKey: `unit:${unitId}:draft`,
          scope: "operation",
          metadata: {
            unitId,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Creating or reusing a working draft.",
          {
            unitId,
            sourceId,
            recipe,
          },
        );

        const result = startUnitDraft({
          unitId,
          kind,
          recipe,
          sourceId,
        });

        console.log(
          result.created
            ? `Created unit draft ${result.artifact.filePath} from brief ${result.artifact.data.briefRef} and source ${sourceId}.`
            : `Unit draft ${result.artifact.filePath} already exists for ${unitId}.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "unit" && subject === "show") {
    const unitId = getFirstPositional(rest);

    if (!unitId) {
      throw new Error("Expected a unit id after `site unit show`.");
    }

    const version = parseFlag(rest, "--version");
    const draft = rest.includes("--draft");

    if (draft && version) {
      throw new Error(
        "Choose either --draft or --version when showing a unit artifact.",
      );
    }

    console.log(
      summarizeUnitArtifact(
        showUnitArtifact({
          unitId,
          draft,
          version,
        }),
      ),
    );
    process.exit(0);
  }

  if (command === "unit" && subject === "freeze") {
    const unitId = getFirstPositional(rest);

    if (!unitId) {
      throw new Error("Expected a unit id after `site unit freeze`.");
    }

    executeTrackedOperation(
      {
        operation: "unit_freeze",
        subject: unitId,
        lock: {
          lockKey: `unit:${unitId}:freeze`,
          scope: "operation",
          metadata: {
            unitId,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Freezing working draft into an immutable version.",
          {
            unitId,
          },
        );

        const version = freezeUnitDraft({ unitId });

        appendOperationEvent(
          runId,
          "info",
          `Created immutable unit version ${version.data.version}.`,
          {
            unitId,
            version: version.data.version,
          },
        );
        console.log(
          `Created immutable unit version ${version.data.id}@${version.data.version} at ${version.filePath}.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "unit" && subject === "request-review") {
    const unitId = getFirstPositional(rest);

    if (!unitId) {
      throw new Error("Expected a unit id after `site unit request-review`.");
    }

    const version = requireFlag(rest, "--version");

    executeTrackedOperation(
      {
        operation: "unit_request_review",
        subject: `${unitId}@${version}`,
        lock: {
          lockKey: `unit:${unitId}:${version}:review`,
          scope: "operation",
          metadata: {
            unitId,
            version,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Requesting review for an immutable unit version.",
          {
            unitId,
            version,
          },
        );

        const result = requestUnitReview({
          unitId,
          version,
        });

        console.log(
          result.requested
            ? `Requested review for ${unitId}@${version}.`
            : `Unit version ${unitId}@${version} is already review_requested.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "unit" && subject === "review") {
    const unitId = getFirstPositional(rest);

    if (!unitId) {
      throw new Error("Expected a unit id after `site unit review`.");
    }

    const version = requireFlag(rest, "--version");
    const reviewerRole = requireFlag(rest, "--role");
    const outcome = parseReviewOutcomeFlag(rest);
    const findings = parseReviewFindings(rest);
    const requestedNextStep = parseFlag(rest, "--next-step");

    executeTrackedOperation(
      {
        operation: "unit_review",
        subject: `${unitId}@${version}`,
        details: {
          reviewerRole,
          outcome,
        },
        lock: {
          lockKey: `unit:${unitId}:${version}:review`,
          scope: "operation",
          metadata: {
            unitId,
            version,
            reviewerRole,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Recording an append-only review record.",
          {
            unitId,
            version,
            reviewerRole,
            outcome,
          },
        );

        const result = createUnitReviewRecord({
          unitId,
          version,
          reviewerRole,
          outcome,
          findings,
          requestedNextStep,
        });

        appendOperationEvent(
          runId,
          outcome === "approved" ? "info" : "warning",
          `Created review record ${result.review.data.id}.`,
          {
            reviewId: result.review.data.id,
            versionStatus: result.artifact.data.status,
          },
        );
        console.log(
          `Created review record ${result.review.data.id} at ${result.review.filePath}; ${unitId}@${version} is now ${result.artifact.data.status}.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "unit" && subject === "revise") {
    const unitId = getFirstPositional(rest);

    if (!unitId) {
      throw new Error("Expected a unit id after `site unit revise`.");
    }

    const fromVersion = requireFlag(rest, "--from");
    const reviewId = requireFlag(rest, "--review");

    executeTrackedOperation(
      {
        operation: "unit_revise",
        subject: `${unitId}@${fromVersion}`,
        details: {
          reviewId,
        },
        lock: {
          lockKey: `unit:${unitId}:draft`,
          scope: "operation",
          metadata: {
            unitId,
            fromVersion,
            reviewId,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Seeding a revision draft from an immutable version.",
          {
            unitId,
            fromVersion,
            reviewId,
          },
        );

        const result = reviseUnitDraft({
          unitId,
          fromVersion,
          reviewId,
        });

        console.log(
          `${result.created ? "Created" : "Updated"} revision draft ${result.artifact.filePath} from ${unitId}@${fromVersion} using review ${reviewId}.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "unit" && subject === "approve") {
    const unitId = getFirstPositional(rest);

    if (!unitId) {
      throw new Error("Expected a unit id after `site unit approve`.");
    }

    const version = requireFlag(rest, "--version");

    executeTrackedOperation(
      {
        operation: "unit_approve",
        subject: `${unitId}@${version}`,
        lock: {
          lockKey: `unit:${unitId}:${version}:approve`,
          scope: "operation",
          metadata: {
            unitId,
            version,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Approving an explicitly reviewed unit version.",
          {
            unitId,
            version,
          },
        );

        const result = approveUnitVersion({
          unitId,
          version,
        });

        console.log(
          result.approved
            ? `Approved unit version ${unitId}@${version}.`
            : `Unit version ${unitId}@${version} is already approved.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "visual" && subject === "start") {
    const visualId = getFirstPositional(rest);

    if (!visualId) {
      throw new Error("Expected a visual id after `site visual start`.");
    }

    const kind = requireFlag(rest, "--kind");
    const unitId = requireFlag(rest, "--unit");

    executeTrackedOperation(
      {
        operation: "visual_start",
        subject: visualId,
        details: {
          kind,
          unitId,
        },
        lock: {
          lockKey: `visual:${visualId}:draft`,
          scope: "operation",
          metadata: {
            visualId,
            unitId,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Creating or reusing a working visual draft.",
          {
            visualId,
            unitId,
            kind,
          },
        );

        const result = startVisualDraft({
          visualId,
          kind,
          unitId,
        });

        console.log(
          result.created
            ? `Created visual draft ${result.artifact.filePath} for ${visualId} and unit ${unitId}.`
            : `Visual draft ${result.artifact.filePath} already exists for ${visualId}.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "visual" && subject === "show") {
    const visualId = getFirstPositional(rest);

    if (!visualId) {
      throw new Error("Expected a visual id after `site visual show`.");
    }

    const version = parseFlag(rest, "--version");
    const draft = rest.includes("--draft");

    if (draft && version) {
      throw new Error(
        "Choose either --draft or --version when showing a visual artifact.",
      );
    }

    const artifact = showVisualArtifact({
      visualId,
      draft,
      version,
    });

    console.log(
      artifact.mode === "draft"
        ? [
            `draft: ${artifact.data.id}`,
            `status: ${artifact.data.status}`,
            `kind: ${artifact.data.kind}`,
            `class: ${artifact.data.visualClass}`,
            `provider: ${artifact.data.provider ?? "unspecified"}`,
            `file: ${artifact.filePath}`,
          ].join("\n")
        : [
            `version: ${artifact.data.id}@${artifact.data.version}`,
            `status: ${artifact.data.status}`,
            `kind: ${artifact.data.kind}`,
            `class: ${artifact.data.visualClass}`,
            `provider: ${artifact.data.provider ?? "unspecified"}`,
            `assets: ${(artifact.data.assetRefs ?? []).join(", ") || "none"}`,
            `reviews: ${(artifact.data.reviewRefs ?? []).join(", ") || "none"}`,
            `file: ${artifact.filePath}`,
          ].join("\n"),
    );
    process.exit(0);
  }

  if (command === "visual" && subject === "freeze") {
    const visualId = getFirstPositional(rest);

    if (!visualId) {
      throw new Error("Expected a visual id after `site visual freeze`.");
    }

    executeTrackedOperation(
      {
        operation: "visual_freeze",
        subject: visualId,
        lock: {
          lockKey: `visual:${visualId}:freeze`,
          scope: "operation",
          metadata: {
            visualId,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Freezing working visual draft into an immutable version.",
          {
            visualId,
          },
        );

        const version = freezeVisualDraft({ visualId });

        appendOperationEvent(
          runId,
          "info",
          `Created immutable visual version ${version.data.version}.`,
          {
            visualId,
            version: version.data.version,
          },
        );
        console.log(
          `Created immutable visual version ${version.data.id}@${version.data.version} at ${version.filePath}.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "visual" && subject === "generate") {
    const visualId = getFirstPositional(rest);

    if (!visualId) {
      throw new Error("Expected a visual id after `site visual generate`.");
    }

    const version = requireFlag(rest, "--version");

    executeTrackedOperation(
      {
        operation: "visual_generate",
        subject: `${visualId}@${version}`,
        lock: {
          lockKey: `visual:${visualId}:${version}:generate`,
          scope: "operation",
          metadata: {
            visualId,
            version,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Generating version-owned visual assets.",
          {
            visualId,
            version,
          },
        );

        const result = generateVisualVersion({
          visualId,
          version,
        });

        console.log(
          result.generated
            ? `Generated visual assets for ${visualId}@${version}: ${(result.artifact.data.assetRefs ?? []).join(", ") || "none"}.`
            : `Visual assets already exist for ${visualId}@${version}.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "visual" && subject === "request-review") {
    const visualId = getFirstPositional(rest);

    if (!visualId) {
      throw new Error(
        "Expected a visual id after `site visual request-review`.",
      );
    }

    const version = requireFlag(rest, "--version");

    executeTrackedOperation(
      {
        operation: "visual_request_review",
        subject: `${visualId}@${version}`,
        lock: {
          lockKey: `visual:${visualId}:${version}:review`,
          scope: "operation",
          metadata: {
            visualId,
            version,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Requesting review for an immutable visual version.",
          {
            visualId,
            version,
          },
        );

        const result = requestVisualReview({
          visualId,
          version,
        });

        console.log(
          result.requested
            ? `Requested review for ${visualId}@${version}.`
            : `Visual version ${visualId}@${version} is already review_requested.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "visual" && subject === "review") {
    const visualId = getFirstPositional(rest);

    if (!visualId) {
      throw new Error("Expected a visual id after `site visual review`.");
    }

    const version = requireFlag(rest, "--version");
    const reviewerRole = requireFlag(rest, "--role");
    const outcome = parseReviewOutcomeFlag(rest);
    const findings = parseReviewFindings(rest);
    const requestedNextStep = parseFlag(rest, "--next-step");

    executeTrackedOperation(
      {
        operation: "visual_review",
        subject: `${visualId}@${version}`,
        details: {
          reviewerRole,
          outcome,
        },
        lock: {
          lockKey: `visual:${visualId}:${version}:review`,
          scope: "operation",
          metadata: {
            visualId,
            version,
            reviewerRole,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Recording an append-only visual review record.",
          {
            visualId,
            version,
            reviewerRole,
            outcome,
          },
        );

        const result = createVisualReviewRecord({
          visualId,
          version,
          reviewerRole,
          outcome,
          findings,
          requestedNextStep,
        });

        appendOperationEvent(
          runId,
          outcome === "approved" ? "info" : "warning",
          `Created visual review record ${result.review.data.id}.`,
          {
            reviewId: result.review.data.id,
            versionStatus: result.artifact.data.status,
          },
        );
        console.log(
          `Created visual review record ${result.review.data.id} at ${result.review.filePath}; ${visualId}@${version} is now ${result.artifact.data.status}.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "visual" && subject === "revise") {
    const visualId = getFirstPositional(rest);

    if (!visualId) {
      throw new Error("Expected a visual id after `site visual revise`.");
    }

    const fromVersion = requireFlag(rest, "--from");
    const reviewId = requireFlag(rest, "--review");

    executeTrackedOperation(
      {
        operation: "visual_revise",
        subject: `${visualId}@${fromVersion}`,
        details: {
          reviewId,
        },
        lock: {
          lockKey: `visual:${visualId}:draft`,
          scope: "operation",
          metadata: {
            visualId,
            fromVersion,
            reviewId,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Seeding a visual revision draft from an immutable version.",
          {
            visualId,
            fromVersion,
            reviewId,
          },
        );

        const result = reviseVisualDraft({
          visualId,
          fromVersion,
          reviewId,
        });

        console.log(
          `${result.created ? "Created" : "Updated"} revision draft ${result.artifact.filePath} from ${visualId}@${fromVersion} using review ${reviewId}.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "visual" && subject === "approve") {
    const visualId = getFirstPositional(rest);

    if (!visualId) {
      throw new Error("Expected a visual id after `site visual approve`.");
    }

    const version = requireFlag(rest, "--version");

    executeTrackedOperation(
      {
        operation: "visual_approve",
        subject: `${visualId}@${version}`,
        lock: {
          lockKey: `visual:${visualId}:${version}:approve`,
          scope: "operation",
          metadata: {
            visualId,
            version,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Approving an explicitly reviewed visual version.",
          {
            visualId,
            version,
          },
        );

        const result = approveVisualVersion({
          visualId,
          version,
        });

        console.log(
          result.approved
            ? `Approved visual version ${visualId}@${version}.`
            : `Visual version ${visualId}@${version} is already approved.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "release" && subject === "assemble") {
    const experienceId = getFirstPositional(rest);

    if (!experienceId) {
      throw new Error("Expected an experience id after `site release assemble`.");
    }

    const releaseId = requireFlag(rest, "--release");
    const notes = parseFlag(rest, "--notes");

    executeTrackedOperation(
      {
        operation: "release_assemble",
        subject: releaseId,
        experienceId,
        releaseId,
        details: {
          notes,
        },
        lock: {
          lockKey: `release:${releaseId}`,
          scope: "operation",
          metadata: {
            experienceId,
            releaseId,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Assembling a named candidate release from the experience configuration.",
          {
            experienceId,
            releaseId,
          },
        );

        const result = assembleReleaseCandidate({
          experienceId,
          releaseId,
          notes,
        });

        console.log(
          `Assembled release ${result.artifact.data.id} for ${result.artifact.data.experience} at ${result.artifact.filePath} with ${result.artifact.data.routeIds.length} routes, ${result.artifact.data.unitVersions.length} units, and ${result.artifact.data.visualVersions.length} visuals.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "release" && subject === "request-review") {
    const releaseId = getFirstPositional(rest);

    if (!releaseId) {
      throw new Error("Expected a release id after `site release request-review`.");
    }

    executeTrackedOperation(
      {
        operation: "release_request_review",
        subject: releaseId,
        releaseId,
        lock: {
          lockKey: `release:${releaseId}:review`,
          scope: "operation",
          metadata: {
            releaseId,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Moving an assembled release into review_requested.",
          {
            releaseId,
          },
        );

        const result = requestReleaseReview({ releaseId });

        console.log(
          result.requested
            ? `Requested review for release ${releaseId}.`
            : `Release ${releaseId} is already review_requested.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "release" && subject === "review") {
    const releaseId = getFirstPositional(rest);

    if (!releaseId) {
      throw new Error("Expected a release id after `site release review`.");
    }

    const reviewerRole = requireFlag(rest, "--role");
    const outcome = parseReviewOutcomeFlag(rest);
    const findings = parseReviewFindings(rest);
    const requestedNextStep = parseFlag(rest, "--next-step");

    executeTrackedOperation(
      {
        operation: "release_review",
        subject: releaseId,
        releaseId,
        details: {
          reviewerRole,
          outcome,
        },
        lock: {
          lockKey: `release:${releaseId}:review`,
          scope: "operation",
          metadata: {
            releaseId,
            reviewerRole,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Recording an append-only release review record.",
          {
            releaseId,
            reviewerRole,
            outcome,
          },
        );

        const result = createReleaseReviewRecord({
          releaseId,
          reviewerRole,
          outcome,
          findings,
          requestedNextStep,
        });

        appendOperationEvent(
          runId,
          outcome === "approved" ? "info" : "warning",
          `Created release review record ${result.review.data.id}.`,
          {
            reviewId: result.review.data.id,
            releaseStatus: result.artifact.data.status,
          },
        );
        console.log(
          `Created release review record ${result.review.data.id} at ${result.review.filePath}; ${releaseId} is now ${result.artifact.data.status}.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "release" && subject === "diff") {
    const [oldReleaseId, newReleaseId] = rest.filter(
      (argument) => !argument.startsWith("--"),
    );

    if (!oldReleaseId || !newReleaseId) {
      throw new Error(
        "Expected two release ids after `site release diff`: the previous release and the candidate release.",
      );
    }

    executeTrackedOperation(
      {
        operation: "release_diff",
        subject: `${oldReleaseId}:${newReleaseId}`,
        details: {
          oldReleaseId,
          newReleaseId,
        },
      },
      () => {
        const diff = buildReleaseDiff(oldReleaseId, newReleaseId);

        console.log(formatReleaseDiff(diff));
      },
    );
    process.exit(0);
  }

  if (command === "release" && subject === "approve") {
    const releaseId = getFirstPositional(rest);

    if (!releaseId) {
      throw new Error("Expected a release id after `site release approve`.");
    }

    executeTrackedOperation(
      {
        operation: "release_approve",
        subject: releaseId,
        releaseId,
        lock: {
          lockKey: `release:${releaseId}:approve`,
          scope: "operation",
          metadata: {
            releaseId,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Approving a release after review and QA gates pass.",
          {
            releaseId,
          },
        );

        const result = approveRelease({ releaseId });

        console.log(
          result.approved
            ? `Approved release ${releaseId}.`
            : `Release ${releaseId} is already approved.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "release" && subject === "publish") {
    const releaseId = getFirstPositional(rest);

    if (!releaseId) {
      throw new Error("Expected a release id after `site release publish`.");
    }

    executeTrackedOperation(
      {
        operation: "release_publish",
        subject: releaseId,
        releaseId,
        lock: {
          lockKey: `release:${releaseId}:publish`,
          scope: "operation",
          metadata: {
            releaseId,
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Publishing an approved release and superseding the current published release for that experience.",
          {
            releaseId,
          },
        );

        const result = publishRelease({ releaseId });

        console.log(
          result.published
            ? `Published release ${releaseId}.${result.supersededReleaseIds.length ? ` Superseded ${result.supersededReleaseIds.join(", ")}.` : ""}`
            : `Release ${releaseId} is already published.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "release" && ["list", "history"].includes(subject)) {
    const experienceId = getFirstPositional(rest);

    executeTrackedOperation(
      {
        operation: subject === "list" ? "release_list" : "release_history",
        subject: experienceId ?? "all-releases",
        experienceId,
      },
      () => {
        const history = listReleaseHistory({ experienceId });

        if (!history.length) {
          console.log(
            experienceId
              ? `No releases found for experience ${experienceId}.`
              : "No releases found.",
          );
          return;
        }

        for (const entry of history) {
          console.log(
            [
              `${entry.releaseId} (${entry.experienceId})`,
              `status=${entry.status}`,
              `qa=${entry.qaStatus}`,
              `approvedRoles=${entry.approvedRoles.join(",") || "none"}`,
              `blockingRoles=${entry.blockingRoles.join(",") || "none"}`,
              `routes=${entry.routeCount}`,
              `units=${entry.unitCount}`,
              `visuals=${entry.visualCount}`,
              `createdAt=${entry.createdAt}`,
              `supersedes=${entry.supersedes ?? "none"}`,
            ].join(" "),
          );
        }
      },
    );
    process.exit(0);
  }

  if (command === "validate" && subject === "schema") {
    executeTrackedOperation(
      {
        operation: "validate_schema",
        subject: "site schema",
      },
      () => {
        const issues = validateSiteSchema();

        if (issues.length) {
          console.error("Site schema validation failed:");
          printIssues(issues);
          throw new Error(
            `Site schema validation failed with ${issues.length} issue(s).`,
          );
        }

        console.log("Site schema validation passed.");
      },
    );
    process.exit(0);
  }

  if (command === "validate" && subject === "visuals") {
    const experienceId = getFirstPositional(rest) ?? getConfiguredExperienceId();
    const releaseId = parseFlag(rest, "--release") ?? getConfiguredReleaseId();

    executeTrackedOperation(
      {
        operation: "validate_visuals",
        subject: `${experienceId}:${releaseId}`,
        experienceId,
        releaseId,
      },
      () => {
        const issues = validateVisualArtifacts();
        const releaseResult = resolveSiteSelection({
          experienceId,
          releaseId,
          allowCandidateRelease: true,
        });
        const releaseIssues = releaseResult.issues.filter((issue) =>
          [
            "unknown_release_visual",
            "unapproved_release_visual",
            "duplicate_release_visual_selection",
            "missing_required_visual",
          ].includes(issue.code),
        );

        if (issues.length || releaseIssues.length) {
          console.error("Visual validation failed:");
          printIssues([...issues, ...releaseIssues]);
          throw new Error(
            `Visual validation failed with ${issues.length + releaseIssues.length} issue(s).`,
          );
        }

        console.log(
          `Visual validation passed for ${experienceId} on release ${releaseId}.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "validate" && subject === "workflow") {
    executeTrackedOperation(
      {
        operation: "validate_workflow",
        subject: "site workflow",
      },
      () => {
        const issues = validateSiteWorkflow();

        if (issues.length) {
          console.error("Site workflow validation failed:");
          printIssues(issues);
          throw new Error(
            `Site workflow validation failed with ${issues.length} issue(s).`,
          );
        }

        console.log("Site workflow validation passed.");
      },
    );
    process.exit(0);
  }

  if (command === "validate" && subject === "release") {
    const experienceId =
      parseFlag(rest, "--experience") ?? getConfiguredExperienceId();
    const releaseId = getFirstPositional(rest) ?? getConfiguredReleaseId();
    executeTrackedOperation(
      {
        operation: "validate_release",
        subject: releaseId,
        experienceId,
        releaseId,
      },
      () => {
        const result = resolveSiteSelection({
          experienceId,
          releaseId,
          allowCandidateRelease: true,
        });

        if (!result.isValid) {
          console.error(`Release validation failed for ${releaseId}:`);
          printIssues(result.issues);
          throw new Error(`Release validation failed for ${releaseId}.`);
        }

        console.log(
          `Release validation passed for ${releaseId} on experience ${experienceId}.`,
        );
      },
    );
    process.exit(0);
  }

  if (command === "validate" && subject === "observatory") {
    const visibility = parseVisibilityFlag(rest);

    executeTrackedOperation(
      {
        operation: "validate_observable_state",
        subject: `observatory:${visibility}`,
        details: {
          visibility,
        },
      },
      () => {
        printObservableStateSummary(visibility);
        console.log("Observable-state validation passed.");
      },
    );
    process.exit(0);
  }

  if (command === "build" && subject === "experience") {
    const experienceId =
      getFirstPositional(rest) ?? getConfiguredExperienceId();
    const releaseId = parseFlag(rest, "--release") ?? getConfiguredReleaseId();
    executeTrackedOperation(
      {
        operation: "build_experience",
        subject: experienceId,
        experienceId,
        releaseId,
        details: {
          lockKey: `build:${experienceId}:${releaseId}`,
        },
        lock: {
          lockKey: `build:${experienceId}:${releaseId}`,
          scope: "build",
          metadata: {
            experienceId,
            releaseId,
          },
        },
      },
      (runId) => {
        const context = assertValidSiteSelection({ experienceId, releaseId });

        console.log(
          `Building experience ${context.experience.id} with release ${context.release.id}.`,
        );
        appendOperationEvent(
          runId,
          "info",
          "Running clean:next before Next.js build.",
        );
        runCommand("npm", ["run", "clean:next"]);
        appendOperationEvent(
          runId,
          "info",
          "Running next build for selected release.",
          {
            experienceId: context.experience.id,
            releaseId: context.release.id,
          },
        );
        runCommand("npx", ["next", "build"], {
          ...process.env,
          SITE_EXPERIENCE_ID: context.experience.id,
          SITE_RELEASE_ID: context.release.id,
        });
      },
    );
    process.exit(0);
  }

  if (command === "export" && subject === "observatory") {
    const visibility = parseVisibilityFlag(rest);
    const outputRoot = parseFlag(rest, "--output-root");

    executeTrackedOperation(
      {
        operation: "export_observable_state",
        subject: `observatory:${visibility}`,
        details: {
          visibility,
          outputRoot: outputRoot ?? ".site/observable-state",
        },
        lock: {
          lockKey: `observatory-export:${visibility}`,
          scope: "operation",
          metadata: {
            visibility,
            outputRoot: outputRoot ?? ".site/observable-state",
          },
        },
      },
      (runId) => {
        appendOperationEvent(
          runId,
          "info",
          "Exporting observable-state bundles.",
          {
            visibility,
            outputRoot: outputRoot ?? ".site/observable-state",
          },
        );

        const result = exportObservableStateBundles({
          visibility,
          outputRoot,
        });

        for (const selectedVisibility of getSelectedVisibilities(visibility)) {
          console.log(
            `Wrote ${selectedVisibility} observable-state bundle to ${result.outputRoot}/${selectedVisibility}.`,
          );
        }
      },
    );
    process.exit(0);
  }

  /* -------------------------------------------------------------- */
  /*  Book pipeline commands                                        */
  /* -------------------------------------------------------------- */

  if (command === "book" && subject === "list") {
    const books = listBooks();

    if (!books.length) {
      console.log("No books found in docs/_research/books/.");
      process.exit(0);
    }

    for (const book of books) {
      const flags = [
        book.hasTranscript ? "T" : "-",
        book.hasChapters ? "C" : "-",
        book.hasIndex ? "I" : "-",
      ].join("");
      console.log(`  [${flags}] ${book.fileName}  (${book.slug})`);
    }

    console.log("\nFlags: T=transcript  C=chapters  I=index");
    process.exit(0);
  }

  if (command === "book" && subject === "transcribe") {
    const audioFile = getFirstPositional(rest);

    if (!audioFile) {
      throw new Error(
        "Expected an audio file path after `site book transcribe`.",
      );
    }

    const noParallel = rest.includes("--no-parallel");
    const maxConcurrent = parseIntegerFlag(rest, "--max-concurrent");

    executeTrackedOperation(
      {
        operation: "book_transcribe",
        subject: audioFile,
        lock: {
          lockKey: `book-transcribe:${audioFile}`,
          scope: "operation",
        },
      },
      () => {
        transcribeBook({
          file: audioFile,
          parallel: !noParallel,
          maxConcurrent: maxConcurrent ?? 5,
        });
      },
    );
    process.exit(0);
  }

  if (command === "book" && subject === "split-chapters") {
    const slug = getFirstPositional(rest);

    if (!slug) {
      throw new Error(
        "Expected a book slug after `site book split-chapters`.",
      );
    }

    const patternStr = parseFlag(rest, "--pattern");
    const customPatterns = patternStr
      ? [new RegExp(patternStr, "gi")]
      : undefined;

    executeTrackedOperation(
      {
        operation: "book_split_chapters",
        subject: slug,
      },
      () => {
        const result = splitIntoChapters(slug, customPatterns);
        console.log(`\nChapter manifest:`);
        for (const ch of result.chapters) {
          console.log(
            `  ${String(ch.number).padStart(2)} ${ch.title.padEnd(40)} ${ch.wordCount.toLocaleString()} words`,
          );
        }
      },
    );
    process.exit(0);
  }

  if (command === "book" && subject === "index") {
    const slug = getFirstPositional(rest);

    if (!slug) {
      throw new Error("Expected a book slug after `site book index`.");
    }

    const model = parseFlag(rest, "--model");

    executeTrackedOperation(
      {
        operation: "book_index",
        subject: slug,
        lock: {
          lockKey: `book-index:${slug}`,
          scope: "operation",
        },
      },
      () => {
        // indexBook is async — wrap in a sync-compatible call
        const { execSync: execSyncLocal } = require("node:child_process");
        // Run as a subprocess to handle the async nature
        const scriptContent = `
          const { indexBook } = require("../lib/book-pipeline");
          indexBook({ slug: "${slug}", model: ${model ? `"${model}"` : "undefined"} })
            .then(() => process.exit(0))
            .catch((e) => { console.error(e.message); process.exit(1); });
        `;
        // Since we're in tsx context, just call it directly
        indexBook({ slug, model: model ?? undefined })
          .then(() => {
            console.log("Indexing complete.");
          })
          .catch((err: Error) => {
            console.error(`Indexing failed: ${err.message}`);
            process.exit(1);
          });
      },
    );
    // Note: the async indexBook will handle exit
  }

  printUsage();
  process.exit(1);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }

  process.exit(1);
}
