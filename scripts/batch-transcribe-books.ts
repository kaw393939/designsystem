import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, createWriteStream, unlinkSync } from "node:fs";
import { basename, resolve, join } from "node:path";

type Options = {
  queueFile: string;
  bookJobs: number;
  chunkJobs: number;
  language: string;
  dryRun: boolean;
  force: boolean;
  unsafeParallelBooks: boolean;
};

type QueueEntry = {
  filePath: string;
  slug: string;
  outputDir: string;
  jsonPath: string;
  txtPath: string;
  logPath: string;
};

type RunLock = {
  pid: number;
  startedAt: string;
  queueFile: string;
  bookJobs: number;
  chunkJobs: number;
  force: boolean;
};

const TRANSCRIPTS_ROOT = resolve("docs/_research/books/transcripts");
const LOCK_PATH = join(TRANSCRIPTS_ROOT, ".batch-transcribe.lock.json");

function parseArgs(argv: string[]): Options {
  const getValue = (flag: string, fallback: string) => {
    const index = argv.indexOf(flag);
    return index >= 0 && argv[index + 1] ? argv[index + 1] : fallback;
  };

  return {
    queueFile: getValue("--queue", "scripts/transcription-queue.txt"),
    bookJobs: Number.parseInt(getValue("--book-jobs", "1"), 10),
    chunkJobs: Number.parseInt(getValue("--chunk-jobs", "2"), 10),
    language: getValue("--language", "en"),
    dryRun: argv.includes("--dry-run"),
    force: argv.includes("--force"),
    unsafeParallelBooks: argv.includes("--unsafe-parallel-books"),
  };
}

function validateOptions(options: Options) {
  if (options.bookJobs > 1 && !options.unsafeParallelBooks) {
    throw new Error(
      "Parallel book jobs are disabled because concurrent eai transcribe processes can mix outputs across books. Use --book-jobs 1, or pass --unsafe-parallel-books to bypass this guard.",
    );
  }
}

function isProcessAlive(pid: number) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "EPERM"
    ) {
      return true;
    }

    return false;
  }
}

function readExistingLock(): RunLock | null {
  if (!existsSync(LOCK_PATH)) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(LOCK_PATH, "utf-8")) as RunLock;
  } catch {
    return null;
  }
}

function removeLock() {
  if (!existsSync(LOCK_PATH)) {
    return;
  }

  const lock = readExistingLock();
  if (!lock || lock.pid === process.pid) {
    unlinkSync(LOCK_PATH);
  }
}

function acquireLock(options: Options) {
  const existing = readExistingLock();

  if (existing) {
    if (isProcessAlive(existing.pid) && existing.pid !== process.pid) {
      throw new Error(
        `Another batch transcription run is already active (pid ${existing.pid}, started ${existing.startedAt}). Wait for it to finish before starting a new queue runner.`,
      );
    }

    unlinkSync(LOCK_PATH);
  }

  const lock: RunLock = {
    pid: process.pid,
    startedAt: new Date().toISOString(),
    queueFile: resolve(options.queueFile),
    bookJobs: options.bookJobs,
    chunkJobs: options.chunkJobs,
    force: options.force,
  };

  writeFileSync(LOCK_PATH, `${JSON.stringify(lock, null, 2)}\n`, "utf-8");
}

function installLockCleanup() {
  let cleaned = false;

  const cleanup = () => {
    if (cleaned) {
      return;
    }

    cleaned = true;
    removeLock();
  };

  process.on("exit", cleanup);
  process.on("SIGINT", () => {
    cleanup();
    process.exit(130);
  });
  process.on("SIGTERM", () => {
    cleanup();
    process.exit(143);
  });
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ensureDir(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function getApiKey(): string {
  const envPath = resolve(".env.local");
  if (!existsSync(envPath)) {
    throw new Error("Missing .env.local with OPENAI_API_KEY.");
  }

  const content = readFileSync(envPath, "utf-8");
  const explicit = content.match(/^API__OPENAI_API_KEY=(.+)$/m);
  if (explicit) {
    return explicit[1].trim();
  }

  const openAi = content.match(/^OPENAI_API_KEY=(.+)$/m);
  if (!openAi) {
    throw new Error("OPENAI_API_KEY not found in .env.local.");
  }

  return openAi[1].trim();
}

function readQueue(queueFile: string): QueueEntry[] {
  const queuePath = resolve(queueFile);
  if (!existsSync(queuePath)) {
    throw new Error(`Queue file not found: ${queuePath}`);
  }

  const raw = readFileSync(queuePath, "utf-8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));

  return raw.map((relativePath) => {
    const filePath = resolve(relativePath);
    const stem = basename(filePath).replace(/\.[^.]+$/, "");
    const slug = slugify(stem);
    const outputDir = join(TRANSCRIPTS_ROOT, slug);

    return {
      filePath,
      slug,
      outputDir,
      jsonPath: join(outputDir, "transcript.raw.json"),
      txtPath: join(outputDir, "transcript.txt"),
      logPath: join(outputDir, "eai-transcribe.log"),
    };
  });
}

function extractText(jsonPath: string, txtPath: string) {
  const raw = JSON.parse(readFileSync(jsonPath, "utf-8"));
  const text = typeof raw === "string" ? raw : raw.text ?? "";
  writeFileSync(txtPath, text, "utf-8");
}

function runSingle(entry: QueueEntry, apiKey: string, options: Options): Promise<void> {
  return new Promise((resolvePromise, rejectPromise) => {
    ensureDir(entry.outputDir);

    if (existsSync(entry.jsonPath) && !options.force) {
      if (!existsSync(entry.txtPath)) {
        extractText(entry.jsonPath, entry.txtPath);
      }
      console.log(`[skip] ${entry.slug} already has ${entry.jsonPath}`);
      resolvePromise();
      return;
    }

    if (options.dryRun) {
      console.log(`[dry-run] ${entry.filePath}`);
      console.log(`          -> ${entry.jsonPath}`);
      console.log(`          -> ${entry.logPath}`);
      resolvePromise();
      return;
    }

    writeFileSync(
      entry.logPath,
      `Starting transcription for ${entry.filePath}\nOutput: ${entry.jsonPath}\n\n`,
      "utf-8",
    );

    const logStream = createWriteStream(entry.logPath, { flags: "a" });
    const child = spawn(
      "eai",
      [
        "transcribe",
        entry.filePath,
        "-f",
        "json",
        "-l",
        options.language,
        "--parallel",
        "--max-concurrent",
        String(options.chunkJobs),
        "-o",
        entry.jsonPath,
      ],
      {
        env: {
          ...process.env,
          API__OPENAI_API_KEY: apiKey,
        },
      },
    );

    console.log(`[start] ${entry.slug}`);

    child.stdout.on("data", (chunk) => {
      logStream.write(chunk);
    });

    child.stderr.on("data", (chunk) => {
      logStream.write(chunk);
    });

    child.on("error", (error) => {
      logStream.end();
      rejectPromise(error);
    });

    child.on("close", (code) => {
      logStream.end();

      if (code !== 0) {
        rejectPromise(new Error(`Transcription failed for ${entry.slug} with exit code ${code}.`));
        return;
      }

      try {
        extractText(entry.jsonPath, entry.txtPath);
      } catch (error) {
        rejectPromise(error instanceof Error ? error : new Error(String(error)));
        return;
      }

      console.log(`[done] ${entry.slug}`);
      resolvePromise();
    });
  });
}

async function runQueue(entries: QueueEntry[], apiKey: string, options: Options) {
  let cursor = 0;

  async function worker() {
    while (cursor < entries.length) {
      const entry = entries[cursor++];
      await runSingle(entry, apiKey, options);
    }
  }

  const workers = Array.from({ length: Math.max(1, options.bookJobs) }, () => worker());
  await Promise.all(workers);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  validateOptions(options);
  ensureDir(TRANSCRIPTS_ROOT);
  acquireLock(options);
  installLockCleanup();

  const apiKey = getApiKey();
  const entries = readQueue(options.queueFile);

  if (!entries.length) {
    console.log("No books found in the transcription queue.");
    return;
  }

  console.log(`Queue: ${entries.length} books`);
  console.log(`Book concurrency: ${options.bookJobs}`);
  console.log(`Chunk concurrency per book: ${options.chunkJobs}`);
  console.log(`Transcripts root: ${TRANSCRIPTS_ROOT}`);

  await runQueue(entries, apiKey, options);
}

main().catch((error) => {
  removeLock();
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});