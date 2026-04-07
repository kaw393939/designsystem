import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

import Database from "better-sqlite3";

const DEFAULT_DB_PATH = ".site/orchestration.sqlite";
const DEFAULT_LOCK_TTL_SECONDS = 30 * 60;

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS operation_runs (
  id TEXT PRIMARY KEY,
  operation TEXT NOT NULL,
  subject TEXT NOT NULL,
  experience_id TEXT,
  release_id TEXT,
  status TEXT NOT NULL,
  command_line TEXT,
  details_json TEXT,
  error_message TEXT,
  started_at TEXT NOT NULL,
  finished_at TEXT
);

CREATE TABLE IF NOT EXISTS operation_events (
  id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL,
  level TEXT NOT NULL,
  message TEXT NOT NULL,
  details_json TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(run_id) REFERENCES operation_runs(id)
);

CREATE TABLE IF NOT EXISTS locks (
  id TEXT PRIMARY KEY,
  lock_key TEXT NOT NULL,
  owner_run_id TEXT NOT NULL,
  scope TEXT NOT NULL,
  metadata_json TEXT,
  acquired_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  released_at TEXT,
  FOREIGN KEY(owner_run_id) REFERENCES operation_runs(id)
);

CREATE INDEX IF NOT EXISTS idx_operation_runs_started_at ON operation_runs(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_operation_runs_status ON operation_runs(status);
CREATE INDEX IF NOT EXISTS idx_operation_events_run_id ON operation_events(run_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_locks_lookup ON locks(lock_key, released_at, expires_at);
`;

export type OperationRunStatus = "running" | "succeeded" | "failed";
export type OperationEventLevel = "info" | "warning" | "error";
export type OrchestrationLockScope =
  | "build"
  | "release"
  | "experience"
  | "operation";

export type StartOperationRunInput = {
  operation: string;
  subject: string;
  experienceId?: string;
  releaseId?: string;
  commandLine?: string;
  details?: Record<string, unknown>;
};

export type OperationRunRecord = {
  id: string;
  operation: string;
  subject: string;
  experienceId: string | null;
  releaseId: string | null;
  status: OperationRunStatus;
  startedAt: string;
  finishedAt: string | null;
  commandLine: string | null;
  errorMessage: string | null;
  details: Record<string, unknown> | null;
};

export type OperationLockRecord = {
  id: string;
  lockKey: string;
  ownerRunId: string;
  scope: OrchestrationLockScope;
  acquiredAt: string;
  expiresAt: string;
  releasedAt: string | null;
  metadata: Record<string, unknown> | null;
};

export type OperationEventRecord = {
  id: string;
  runId: string;
  level: OperationEventLevel;
  message: string;
  createdAt: string;
  details: Record<string, unknown> | null;
};

export type AcquireLockInput = {
  lockKey: string;
  ownerRunId: string;
  scope: OrchestrationLockScope;
  ttlSeconds?: number;
  metadata?: Record<string, unknown>;
};

export type OrchestrationStatusSnapshot = {
  dbPath: string;
  runCounts: Record<OperationRunStatus, number>;
  activeLocks: OperationLockRecord[];
  recentRuns: OperationRunRecord[];
};

export type OrchestrationExportState = {
  dbPath: string;
  runs: OperationRunRecord[];
  events: OperationEventRecord[];
  activeLocks: OperationLockRecord[];
};

function getNowIsoString() {
  return new Date().toISOString();
}

function toJson(value: unknown) {
  return value === undefined ? null : JSON.stringify(value);
}

function parseJsonRecord(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as unknown;

    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    return null;
  }

  return null;
}

function resolveDbPath(dbPath?: string) {
  return resolve(
    dbPath ?? process.env.SITE_ORCHESTRATION_DB_PATH ?? DEFAULT_DB_PATH,
  );
}

function openDatabase(dbPath?: string) {
  const resolvedDbPath = resolveDbPath(dbPath);
  mkdirSync(dirname(resolvedDbPath), { recursive: true });

  const database = new Database(resolvedDbPath);
  database.pragma("journal_mode = WAL");
  database.pragma("foreign_keys = ON");
  database.exec(SCHEMA_SQL);

  return { database, dbPath: resolvedDbPath };
}

function mapOperationRunRecord(row: {
  id: string;
  operation: string;
  subject: string;
  experience_id: string | null;
  release_id: string | null;
  status: OperationRunStatus;
  started_at: string;
  finished_at: string | null;
  command_line: string | null;
  error_message: string | null;
  details_json: string | null;
}): OperationRunRecord {
  return {
    id: row.id,
    operation: row.operation,
    subject: row.subject,
    experienceId: row.experience_id,
    releaseId: row.release_id,
    status: row.status,
    startedAt: row.started_at,
    finishedAt: row.finished_at,
    commandLine: row.command_line,
    errorMessage: row.error_message,
    details: parseJsonRecord(row.details_json),
  };
}

function mapLockRecord(row: {
  id: string;
  lock_key: string;
  owner_run_id: string;
  scope: OrchestrationLockScope;
  acquired_at: string;
  expires_at: string;
  released_at: string | null;
  metadata_json: string | null;
}): OperationLockRecord {
  return {
    id: row.id,
    lockKey: row.lock_key,
    ownerRunId: row.owner_run_id,
    scope: row.scope,
    acquiredAt: row.acquired_at,
    expiresAt: row.expires_at,
    releasedAt: row.released_at,
    metadata: parseJsonRecord(row.metadata_json),
  };
}

function mapOperationEventRecord(row: {
  id: string;
  run_id: string;
  level: OperationEventLevel;
  message: string;
  details_json: string | null;
  created_at: string;
}): OperationEventRecord {
  return {
    id: row.id,
    runId: row.run_id,
    level: row.level,
    message: row.message,
    createdAt: row.created_at,
    details: parseJsonRecord(row.details_json),
  };
}

export function initializeOrchestrationDatabase(dbPath?: string) {
  const { database, dbPath: resolvedDbPath } = openDatabase(dbPath);
  database.close();

  return {
    dbPath: resolvedDbPath,
  };
}

export function startOperationRun(
  input: StartOperationRunInput,
  dbPath?: string,
) {
  const { database, dbPath: resolvedDbPath } = openDatabase(dbPath);

  try {
    const runId = randomUUID();
    const startedAt = getNowIsoString();

    database
      .prepare(
        `
          INSERT INTO operation_runs (
            id,
            operation,
            subject,
            experience_id,
            release_id,
            status,
            command_line,
            details_json,
            error_message,
            started_at,
            finished_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
      )
      .run(
        runId,
        input.operation,
        input.subject,
        input.experienceId ?? null,
        input.releaseId ?? null,
        "running",
        input.commandLine ?? null,
        toJson(input.details),
        null,
        startedAt,
        null,
      );

    database
      .prepare(
        `INSERT INTO operation_events (id, run_id, level, message, details_json, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .run(
        randomUUID(),
        runId,
        "info",
        `Started ${input.operation} for ${input.subject}.`,
        toJson(input.details),
        startedAt,
      );

    return {
      runId,
      dbPath: resolvedDbPath,
    };
  } finally {
    database.close();
  }
}

export function appendOperationEvent(
  runId: string,
  level: OperationEventLevel,
  message: string,
  details?: Record<string, unknown>,
  dbPath?: string,
) {
  const { database } = openDatabase(dbPath);

  try {
    database
      .prepare(
        `INSERT INTO operation_events (id, run_id, level, message, details_json, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .run(
        randomUUID(),
        runId,
        level,
        message,
        toJson(details),
        getNowIsoString(),
      );
  } finally {
    database.close();
  }
}

export function completeOperationRun(
  runId: string,
  details?: Record<string, unknown>,
  dbPath?: string,
) {
  const { database } = openDatabase(dbPath);

  try {
    const finishedAt = getNowIsoString();

    database
      .prepare(
        `
          UPDATE operation_runs
          SET status = ?, finished_at = ?, details_json = COALESCE(?, details_json), error_message = NULL
          WHERE id = ?
        `,
      )
      .run("succeeded", finishedAt, toJson(details), runId);

    database
      .prepare(
        `INSERT INTO operation_events (id, run_id, level, message, details_json, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .run(
        randomUUID(),
        runId,
        "info",
        "Operation completed successfully.",
        toJson(details),
        finishedAt,
      );
  } finally {
    database.close();
  }
}

export function failOperationRun(
  runId: string,
  error: unknown,
  details?: Record<string, unknown>,
  dbPath?: string,
) {
  const { database } = openDatabase(dbPath);

  try {
    const finishedAt = getNowIsoString();
    const errorMessage = error instanceof Error ? error.message : String(error);

    database
      .prepare(
        `
          UPDATE operation_runs
          SET status = ?, finished_at = ?, details_json = COALESCE(?, details_json), error_message = ?
          WHERE id = ?
        `,
      )
      .run("failed", finishedAt, toJson(details), errorMessage, runId);

    database
      .prepare(
        `INSERT INTO operation_events (id, run_id, level, message, details_json, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .run(
        randomUUID(),
        runId,
        "error",
        errorMessage,
        toJson(details),
        finishedAt,
      );
  } finally {
    database.close();
  }
}

export function acquireOrchestrationLock(
  input: AcquireLockInput,
  dbPath?: string,
) {
  const { database } = openDatabase(dbPath);

  try {
    const acquiredAt = getNowIsoString();
    const expiresAt = new Date(
      Date.now() + (input.ttlSeconds ?? DEFAULT_LOCK_TTL_SECONDS) * 1000,
    ).toISOString();

    const transaction = database.transaction(() => {
      const activeLock = database
        .prepare(
          `
            SELECT id, lock_key, owner_run_id, scope, acquired_at, expires_at, released_at
            FROM locks
            WHERE lock_key = ?
              AND released_at IS NULL
              AND expires_at > ?
            ORDER BY acquired_at DESC
            LIMIT 1
          `,
        )
        .get(input.lockKey, acquiredAt) as
        | {
            id: string;
            lock_key: string;
            owner_run_id: string;
            scope: OrchestrationLockScope;
            acquired_at: string;
            expires_at: string;
            released_at: string | null;
          }
        | undefined;

      if (activeLock) {
        throw new Error(
          `Lock ${input.lockKey} is already held by run ${activeLock.owner_run_id} until ${activeLock.expires_at}.`,
        );
      }

      database
        .prepare(
          `
            UPDATE locks
            SET released_at = ?
            WHERE lock_key = ?
              AND released_at IS NULL
              AND expires_at <= ?
          `,
        )
        .run(acquiredAt, input.lockKey, acquiredAt);

      const lockId = randomUUID();

      database
        .prepare(
          `
            INSERT INTO locks (
              id,
              lock_key,
              owner_run_id,
              scope,
              metadata_json,
              acquired_at,
              expires_at,
              released_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `,
        )
        .run(
          lockId,
          input.lockKey,
          input.ownerRunId,
          input.scope,
          toJson(input.metadata),
          acquiredAt,
          expiresAt,
          null,
        );

      return {
        id: lockId,
        lockKey: input.lockKey,
        ownerRunId: input.ownerRunId,
        scope: input.scope,
        acquiredAt,
        expiresAt,
        releasedAt: null,
        metadata: input.metadata ?? null,
      } satisfies OperationLockRecord;
    });

    return transaction();
  } finally {
    database.close();
  }
}

export function releaseOrchestrationLock(
  lockKey: string,
  ownerRunId: string,
  dbPath?: string,
) {
  const { database } = openDatabase(dbPath);

  try {
    const releasedAt = getNowIsoString();

    database
      .prepare(
        `
          UPDATE locks
          SET released_at = ?
          WHERE lock_key = ?
            AND owner_run_id = ?
            AND released_at IS NULL
        `,
      )
      .run(releasedAt, lockKey, ownerRunId);
  } finally {
    database.close();
  }
}

export function getOrchestrationStatus(
  dbPath?: string,
  recentRunLimit = 10,
): OrchestrationStatusSnapshot {
  const { database, dbPath: resolvedDbPath } = openDatabase(dbPath);

  try {
    const counts = {
      running: 0,
      succeeded: 0,
      failed: 0,
    } satisfies Record<OperationRunStatus, number>;

    const countRows = database
      .prepare(
        `SELECT status, COUNT(*) as count FROM operation_runs GROUP BY status`,
      )
      .all() as Array<{ status: OperationRunStatus; count: number }>;

    for (const row of countRows) {
      counts[row.status] = row.count;
    }

    const activeLocks = (
      database
        .prepare(
          `
            SELECT id, lock_key, owner_run_id, scope, acquired_at, expires_at, released_at, metadata_json
            FROM locks
            WHERE released_at IS NULL
              AND expires_at > ?
            ORDER BY acquired_at DESC
          `,
        )
        .all(getNowIsoString()) as Array<{
        id: string;
        lock_key: string;
        owner_run_id: string;
        scope: OrchestrationLockScope;
        acquired_at: string;
        expires_at: string;
        released_at: string | null;
        metadata_json: string | null;
      }>
    ).map(mapLockRecord);

    const recentRuns = (
      database
        .prepare(
          `
            SELECT id, operation, subject, experience_id, release_id, status, started_at, finished_at, command_line, error_message, details_json
            FROM operation_runs
            ORDER BY started_at DESC
            LIMIT ?
          `,
        )
        .all(recentRunLimit) as Array<{
        id: string;
        operation: string;
        subject: string;
        experience_id: string | null;
        release_id: string | null;
        status: OperationRunStatus;
        started_at: string;
        finished_at: string | null;
        command_line: string | null;
        error_message: string | null;
        details_json: string | null;
      }>
    ).map(mapOperationRunRecord);

    return {
      dbPath: resolvedDbPath,
      runCounts: counts,
      activeLocks,
      recentRuns,
    };
  } finally {
    database.close();
  }
}

export function getOrchestrationExportState(
  dbPath?: string,
): OrchestrationExportState {
  const { database, dbPath: resolvedDbPath } = openDatabase(dbPath);

  try {
    const runs = (
      database
        .prepare(
          `
            SELECT id, operation, subject, experience_id, release_id, status, started_at, finished_at, command_line, error_message, details_json
            FROM operation_runs
            ORDER BY started_at DESC
          `,
        )
        .all() as Array<{
        id: string;
        operation: string;
        subject: string;
        experience_id: string | null;
        release_id: string | null;
        status: OperationRunStatus;
        started_at: string;
        finished_at: string | null;
        command_line: string | null;
        error_message: string | null;
        details_json: string | null;
      }>
    ).map(mapOperationRunRecord);

    const events = (
      database
        .prepare(
          `
            SELECT id, run_id, level, message, details_json, created_at
            FROM operation_events
            ORDER BY created_at ASC
          `,
        )
        .all() as Array<{
        id: string;
        run_id: string;
        level: OperationEventLevel;
        message: string;
        details_json: string | null;
        created_at: string;
      }>
    ).map(mapOperationEventRecord);

    const activeLocks = (
      database
        .prepare(
          `
            SELECT id, lock_key, owner_run_id, scope, acquired_at, expires_at, released_at, metadata_json
            FROM locks
            WHERE released_at IS NULL
              AND expires_at > ?
            ORDER BY acquired_at DESC
          `,
        )
        .all(getNowIsoString()) as Array<{
        id: string;
        lock_key: string;
        owner_run_id: string;
        scope: OrchestrationLockScope;
        acquired_at: string;
        expires_at: string;
        released_at: string | null;
        metadata_json: string | null;
      }>
    ).map(mapLockRecord);

    return {
      dbPath: resolvedDbPath,
      runs,
      events,
      activeLocks,
    };
  } finally {
    database.close();
  }
}
