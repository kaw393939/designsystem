// @vitest-environment node

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  acquireOrchestrationLock,
  completeOperationRun,
  failOperationRun,
  getOrchestrationStatus,
  initializeOrchestrationDatabase,
  releaseOrchestrationLock,
  startOperationRun,
} from "@/lib/agentic-orchestration";

const tempDirectories: string[] = [];

function createTempDbPath() {
  const tempDirectory = mkdtempSync(join(tmpdir(), "site-orchestration-"));
  tempDirectories.push(tempDirectory);
  return join(tempDirectory, "orchestration.sqlite");
}

afterEach(() => {
  for (const directory of tempDirectories.splice(0, tempDirectories.length)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("agentic orchestration sqlite ledger", () => {
  it("initializes an empty local orchestration database", () => {
    const dbPath = createTempDbPath();
    const initialized = initializeOrchestrationDatabase(dbPath);
    const status = getOrchestrationStatus(dbPath);

    expect(initialized.dbPath).toBe(dbPath);
    expect(status.dbPath).toBe(dbPath);
    expect(status.runCounts).toEqual({
      running: 0,
      succeeded: 0,
      failed: 0,
    });
    expect(status.activeLocks).toEqual([]);
    expect(status.recentRuns).toEqual([]);
  });

  it("records successful and failed operation runs", () => {
    const dbPath = createTempDbPath();
    const successRun = startOperationRun(
      {
        operation: "validate_schema",
        subject: "site schema",
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
      },
      dbPath,
    );
    failOperationRun(
      failedRun.runId,
      new Error("synthetic build failure"),
      undefined,
      dbPath,
    );

    const status = getOrchestrationStatus(dbPath);

    expect(status.runCounts).toEqual({
      running: 0,
      succeeded: 1,
      failed: 1,
    });
    expect(status.recentRuns).toHaveLength(2);
    expect(status.recentRuns.some((run) => run.status === "succeeded")).toBe(
      true,
    );
    expect(
      status.recentRuns.some(
        (run) => run.errorMessage === "synthetic build failure",
      ),
    ).toBe(true);
  });

  it("enforces local orchestration locks until they are released", () => {
    const dbPath = createTempDbPath();
    const ownerRun = startOperationRun(
      {
        operation: "build_experience",
        subject: "phase-1-baseline",
      },
      dbPath,
    );

    const lock = acquireOrchestrationLock(
      {
        lockKey: "build:phase-1-baseline:phase-1-baseline-release",
        ownerRunId: ownerRun.runId,
        scope: "build",
      },
      dbPath,
    );

    expect(() =>
      acquireOrchestrationLock(
        {
          lockKey: "build:phase-1-baseline:phase-1-baseline-release",
          ownerRunId: ownerRun.runId,
          scope: "build",
        },
        dbPath,
      ),
    ).toThrow(/already held/);

    releaseOrchestrationLock(lock.lockKey, ownerRun.runId, dbPath);

    const reacquiredLock = acquireOrchestrationLock(
      {
        lockKey: "build:phase-1-baseline:phase-1-baseline-release",
        ownerRunId: ownerRun.runId,
        scope: "build",
      },
      dbPath,
    );

    expect(reacquiredLock.lockKey).toBe(lock.lockKey);

    const status = getOrchestrationStatus(dbPath);
    expect(status.activeLocks).toHaveLength(1);
    expect(status.activeLocks[0]?.lockKey).toBe(lock.lockKey);
  });
});
