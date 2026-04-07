// @vitest-environment node

import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  acquireOrchestrationLock,
  completeOperationRun,
  failOperationRun,
  startOperationRun,
} from "@/lib/agentic-orchestration";
import {
  buildObservableStateBundles,
  exportObservableStateBundles,
} from "@/lib/observable-state";

const tempDirectories: string[] = [];

function createTempDirectory(prefix: string) {
  const directory = mkdtempSync(join(tmpdir(), prefix));
  tempDirectories.push(directory);
  return directory;
}

afterEach(() => {
  for (const directory of tempDirectories.splice(0, tempDirectories.length)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("observable-state exporter foundation", () => {
  it("builds deterministic public and maintainer bundles with visibility-aware redaction", () => {
    const tempDirectory = createTempDirectory("observable-state-");
    const dbPath = join(tempDirectory, "orchestration.sqlite");
    const generatedAt = "2026-01-02T03:04:05.000Z";

    const runningRun = startOperationRun(
      {
        operation: "validate_release",
        subject: "phase-1-baseline-release",
        experienceId: "phase-1-baseline",
        releaseId: "phase-1-baseline-release",
        commandLine:
          "npm run site -- validate release phase-1-baseline-release",
      },
      dbPath,
    );

    acquireOrchestrationLock(
      {
        lockKey: "observatory-export:public",
        ownerRunId: runningRun.runId,
        scope: "operation",
      },
      dbPath,
    );

    const successRun = startOperationRun(
      {
        operation: "validate_schema",
        subject: "site schema",
        commandLine: "npm run site -- validate schema",
      },
      dbPath,
    );
    completeOperationRun(successRun.runId, { result: "ok" }, dbPath);

    const failedRun = startOperationRun(
      {
        operation: "build_experience",
        subject: "phase-1-baseline",
        experienceId: "phase-1-baseline",
        releaseId: "phase-1-baseline-release",
        commandLine:
          "npm run site -- build experience phase-1-baseline --release phase-1-baseline-release",
      },
      dbPath,
    );
    failOperationRun(
      failedRun.runId,
      new Error(`${process.cwd()}/private/build-log.txt`),
      undefined,
      dbPath,
    );

    const first = buildObservableStateBundles({
      workspaceRoot: process.cwd(),
      dbPath,
      generatedAt,
    });
    const second = buildObservableStateBundles({
      workspaceRoot: process.cwd(),
      dbPath,
      generatedAt,
    });

    expect(first).toEqual(second);

    const publicBundle = first.bundles.public;
    const maintainerBundle = first.bundles.maintainer;

    expect(
      publicBundle.issues.every((issue) => issue.severity !== "error"),
    ).toBe(true);
    expect(
      publicBundle.productionEvents.every(
        (event) => event.details === undefined,
      ),
    ).toBe(true);
    expect(JSON.stringify(publicBundle)).not.toContain(process.cwd());
    expect(JSON.stringify(maintainerBundle)).not.toContain(process.cwd());
    expect(JSON.stringify(maintainerBundle)).toContain("<workspace>");
    expect(publicBundle.queueSnapshots[0]?.entries.length).toBeGreaterThan(0);
    expect(
      publicBundle.failureSnapshots.some((snapshot) =>
        snapshot.latestMessage.includes("build_experience failed"),
      ),
    ).toBe(true);
    expect(
      maintainerBundle.productionEvents.some(
        (event) => event.details !== undefined,
      ),
    ).toBe(true);
  });

  it("writes per-visibility bundle files to the configured output root", () => {
    const tempDirectory = createTempDirectory("observable-state-export-");
    const dbPath = join(tempDirectory, "orchestration.sqlite");
    const outputRoot = join(tempDirectory, "observable-state");

    const result = exportObservableStateBundles({
      workspaceRoot: process.cwd(),
      dbPath,
      outputRoot,
      generatedAt: "2026-01-02T03:04:05.000Z",
    });

    expect(existsSync(join(outputRoot, "public", "manifest.json"))).toBe(true);
    expect(existsSync(join(outputRoot, "maintainer", "bundle.json"))).toBe(
      true,
    );
    expect(result.writtenFiles.public.length).toBeGreaterThan(0);
    expect(result.writtenFiles.maintainer.length).toBeGreaterThan(0);

    const manifest = JSON.parse(
      readFileSync(join(outputRoot, "public", "manifest.json"), "utf8"),
    ) as { counts: Record<string, number> };

    expect(manifest.counts.productionEvents).toBe(
      result.bundles.public.productionEvents.length,
    );
  });
});
