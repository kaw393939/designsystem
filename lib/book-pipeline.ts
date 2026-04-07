/**
 * Book processing pipeline for the design-system corpus.
 *
 * Handles: transcription orchestration, chapter splitting, indexing,
 * and summarization for audiobooks and text sources.
 */

import { execSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BOOKS_ROOT = "docs/_research/books";
const TRANSCRIPTS_DIR = join(BOOKS_ROOT, "transcripts");
const CHAPTERS_DIR = join(BOOKS_ROOT, "chapters");
const INDEX_DIR = join(BOOKS_ROOT, "index");

const SUPPORTED_AUDIO = [".mp3", ".m4a", ".m4b", ".wav", ".ogg", ".flac"];
const SUPPORTED_TEXT = [".txt", ".md"];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function ensureDir(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getApiKey(): string {
  const envPath = resolve(".env.local");
  if (!existsSync(envPath)) {
    throw new Error("Missing .env.local with OPENAI_API_KEY.");
  }
  const content = readFileSync(envPath, "utf-8");
  const match = content.match(/^OPENAI_API_KEY=(.+)$/m);
  if (!match) {
    throw new Error("OPENAI_API_KEY not found in .env.local.");
  }
  return match[1].trim();
}

/* ------------------------------------------------------------------ */
/*  List books                                                         */
/* ------------------------------------------------------------------ */

export interface BookEntry {
  fileName: string;
  slug: string;
  ext: string;
  hasTranscript: boolean;
  hasChapters: boolean;
  hasIndex: boolean;
}

export function listBooks(): BookEntry[] {
  ensureDir(BOOKS_ROOT);
  const allFiles = readdirSync(BOOKS_ROOT, { withFileTypes: true });
  const books: BookEntry[] = [];

  for (const entry of allFiles) {
    if (entry.isDirectory()) continue;
    const ext = entry.name.slice(entry.name.lastIndexOf(".")).toLowerCase();
    if (![...SUPPORTED_AUDIO, ...SUPPORTED_TEXT].includes(ext)) continue;

    const nameWithoutExt = entry.name.slice(0, entry.name.lastIndexOf("."));
    const slug = slugify(nameWithoutExt);

    books.push({
      fileName: entry.name,
      slug,
      ext,
      hasTranscript: existsSync(join(TRANSCRIPTS_DIR, `${slug}-raw.json`)) ||
                     existsSync(join(TRANSCRIPTS_DIR, `${slug}-raw.txt`)),
      hasChapters: existsSync(join(CHAPTERS_DIR, slug)),
      hasIndex: existsSync(join(INDEX_DIR, `${slug}.json`)),
    });
  }

  return books;
}

/* ------------------------------------------------------------------ */
/*  Transcribe                                                         */
/* ------------------------------------------------------------------ */

export interface TranscribeOptions {
  file: string;
  parallel?: boolean;
  maxConcurrent?: number;
}

export function transcribeBook(options: TranscribeOptions): string {
  const filePath = resolve(options.file);
  if (!existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const nameWithoutExt = basename(filePath).slice(0, basename(filePath).lastIndexOf("."));
  const slug = slugify(nameWithoutExt);

  ensureDir(TRANSCRIPTS_DIR);
  const outJson = join(TRANSCRIPTS_DIR, `${slug}-raw.json`);
  const outTxt = join(TRANSCRIPTS_DIR, `${slug}-raw.txt`);

  const apiKey = getApiKey();

  const parallelFlags = options.parallel !== false
    ? `--parallel --max-concurrent ${options.maxConcurrent ?? 5}`
    : "";

  const cmd = `eai transcribe "${filePath}" ${parallelFlags} -f json -o "${outJson}" -l en`;

  console.log(`Transcribing: ${basename(filePath)}`);
  console.log(`Output: ${outJson}`);

  const result = spawnSync("sh", ["-c", cmd], {
    stdio: "inherit",
    env: { ...process.env, API__OPENAI_API_KEY: apiKey },
    timeout: 0, // no timeout for long audiobooks
  });

  if (result.status !== 0) {
    throw new Error(`Transcription failed with exit code ${result.status}.`);
  }

  // Also write a plain-text version
  if (existsSync(outJson)) {
    try {
      const raw = JSON.parse(readFileSync(outJson, "utf-8"));
      writeFileSync(outTxt, raw.text ?? raw, "utf-8");
      console.log(`Plain text saved: ${outTxt}`);
    } catch {
      // JSON might not be standard format — just copy as-is
      const rawText = readFileSync(outJson, "utf-8");
      writeFileSync(outTxt, rawText, "utf-8");
    }
  }

  return outJson;
}

/* ------------------------------------------------------------------ */
/*  Chapter splitting                                                  */
/* ------------------------------------------------------------------ */

export interface ChapterSplitResult {
  slug: string;
  chapters: { number: number; title: string; file: string; wordCount: number }[];
}

/**
 * Split a transcript into chapters using regex patterns.
 * Works with common audiobook patterns:
 * - "Chapter 1", "Chapter One", "Part 1", "Part One"
 * - Numbered sections like "1.", "2."
 * - Named sections like "Introduction", "Conclusion", "Epilogue", "Prologue"
 * - Book-specific patterns passed as customPatterns
 */
export function splitIntoChapters(
  slug: string,
  customPatterns?: RegExp[],
): ChapterSplitResult {
  const txtPath = join(TRANSCRIPTS_DIR, `${slug}-raw.txt`);
  const jsonPath = join(TRANSCRIPTS_DIR, `${slug}-raw.json`);

  let text: string;
  if (existsSync(txtPath)) {
    text = readFileSync(txtPath, "utf-8");
  } else if (existsSync(jsonPath)) {
    const raw = JSON.parse(readFileSync(jsonPath, "utf-8"));
    text = typeof raw === "string" ? raw : raw.text ?? JSON.stringify(raw);
  } else {
    throw new Error(
      `No transcript found for "${slug}". Run transcribe first.`,
    );
  }

  // Default chapter-boundary patterns (case-insensitive)
  const defaultPatterns: RegExp[] = [
    // "Chapter 1: Title" or "Chapter One"
    /(?:^|\n)\s*chapter\s+(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)[:\s.,]*/gi,
    // "Part 1" / "Part One"
    /(?:^|\n)\s*part\s+(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten)[:\s.,]*/gi,
    // Common section names
    /(?:^|\n)\s*(?:introduction|conclusion|epilogue|prologue|foreword|preface|afterword|appendix)[:\s.,]*/gi,
  ];

  const patterns = [...defaultPatterns, ...(customPatterns ?? [])];

  // Find all chapter boundary positions
  interface Boundary {
    index: number;
    title: string;
  }

  const boundaries: Boundary[] = [];

  for (const pattern of patterns) {
    // Reset lastIndex for global patterns
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text)) !== null) {
      boundaries.push({
        index: match.index,
        title: match[0].trim(),
      });
    }
  }

  // Sort by position and deduplicate nearby boundaries (within 200 chars)
  boundaries.sort((a, b) => a.index - b.index);
  const deduped: Boundary[] = [];
  for (const b of boundaries) {
    if (deduped.length === 0 || b.index - deduped[deduped.length - 1].index > 200) {
      deduped.push(b);
    }
  }

  // If no chapters found, treat whole text as one chapter
  if (deduped.length === 0) {
    deduped.push({ index: 0, title: "Full Text" });
  }

  // Split text into chapters
  const chapterDir = join(CHAPTERS_DIR, slug);
  ensureDir(chapterDir);

  const chapters: ChapterSplitResult["chapters"] = [];

  for (let i = 0; i < deduped.length; i++) {
    const start = deduped[i].index;
    const end = i + 1 < deduped.length ? deduped[i + 1].index : text.length;
    const chapterText = text.slice(start, end).trim();
    const wordCount = chapterText.split(/\s+/).length;

    const num = i + 1;
    const safeTitle = slugify(deduped[i].title).slice(0, 60);
    const fileName = `${String(num).padStart(2, "0")}-${safeTitle}.md`;
    const filePath = join(chapterDir, fileName);

    const markdown = `# ${deduped[i].title}\n\n${chapterText}\n`;
    writeFileSync(filePath, markdown, "utf-8");

    chapters.push({
      number: num,
      title: deduped[i].title,
      file: fileName,
      wordCount,
    });
  }

  // Write chapter manifest
  const manifest = {
    slug,
    totalWords: text.split(/\s+/).length,
    chapterCount: chapters.length,
    chapters,
  };
  writeFileSync(
    join(chapterDir, "_manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf-8",
  );

  console.log(
    `Split "${slug}" into ${chapters.length} chapters → ${chapterDir}`,
  );

  return { slug, chapters };
}

/* ------------------------------------------------------------------ */
/*  Index / summarize via OpenAI                                       */
/* ------------------------------------------------------------------ */

export interface IndexOptions {
  slug: string;
  model?: string;
}

export async function indexBook(options: IndexOptions): Promise<string> {
  const { slug, model = "gpt-4.1-mini" } = options;
  const chapterDir = join(CHAPTERS_DIR, slug);

  if (!existsSync(chapterDir)) {
    throw new Error(
      `No chapters found for "${slug}". Run split-chapters first.`,
    );
  }

  const manifestPath = join(chapterDir, "_manifest.json");
  if (!existsSync(manifestPath)) {
    throw new Error(`No _manifest.json found in ${chapterDir}.`);
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
  const apiKey = getApiKey();

  ensureDir(INDEX_DIR);
  const indexPath = join(INDEX_DIR, `${slug}.json`);
  const summaryMdPath = join(INDEX_DIR, `${slug}-summary.md`);

  const chapterSummaries: {
    number: number;
    title: string;
    file: string;
    wordCount: number;
    summary: string;
    keyQuotes: string[];
    keyConcepts: string[];
  }[] = [];

  for (const chapter of manifest.chapters) {
    const chapterPath = join(chapterDir, chapter.file);
    const chapterText = readFileSync(chapterPath, "utf-8");

    // Truncate very long chapters to ~12000 words for the API
    const words = chapterText.split(/\s+/);
    const truncated = words.length > 12000
      ? words.slice(0, 12000).join(" ") + "\n\n[...truncated for summarization]"
      : chapterText;

    const systemPrompt = `You are an expert research assistant creating a structured index of a book chapter for an academic corpus. Return valid JSON only, no markdown wrapping.`;

    const userPrompt = `Summarize this chapter from "${slug}" for a research index.

Return this exact JSON structure:
{
  "summary": "2-3 paragraph summary of key arguments and insights",
  "keyQuotes": ["up to 5 verbatim quotes worth citing, with enough context to be useful"],
  "keyConcepts": ["list of 5-10 key concepts, theories, or frameworks mentioned"]
}

Chapter title: ${chapter.title}
Chapter text:
${truncated}`;

    console.log(`  Indexing chapter ${chapter.number}: ${chapter.title}...`);

    try {
      const response = execSync(
        `curl -s https://api.openai.com/v1/chat/completions \
          -H "Content-Type: application/json" \
          -H "Authorization: Bearer ${apiKey}" \
          -d '${JSON.stringify({
            model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            temperature: 0.2,
            max_tokens: 2000,
          }).replace(/'/g, "'\\''")}'`,
        { encoding: "utf-8", timeout: 120000 },
      );

      const parsed = JSON.parse(response);
      const content = parsed.choices?.[0]?.message?.content ?? "";

      // Try to parse the JSON content
      let result: { summary: string; keyQuotes: string[]; keyConcepts: string[] };
      try {
        // Strip markdown code fences if present
        const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        result = JSON.parse(cleaned);
      } catch {
        result = {
          summary: content,
          keyQuotes: [],
          keyConcepts: [],
        };
      }

      chapterSummaries.push({
        ...chapter,
        summary: result.summary,
        keyQuotes: result.keyQuotes,
        keyConcepts: result.keyConcepts,
      });
    } catch (err) {
      console.error(`  Warning: Failed to index chapter ${chapter.number}: ${err}`);
      chapterSummaries.push({
        ...chapter,
        summary: "[indexing failed]",
        keyQuotes: [],
        keyConcepts: [],
      });
    }
  }

  // Write JSON index
  const index = {
    slug,
    totalWords: manifest.totalWords,
    chapterCount: manifest.chapterCount,
    model,
    indexedAt: new Date().toISOString(),
    chapters: chapterSummaries,
  };

  writeFileSync(indexPath, JSON.stringify(index, null, 2), "utf-8");
  console.log(`Index saved: ${indexPath}`);

  // Write human-readable summary markdown
  const lines: string[] = [
    `# ${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} — Index`,
    "",
    `Indexed: ${index.indexedAt}`,
    `Model: ${model}`,
    `Total words: ${manifest.totalWords.toLocaleString()}`,
    `Chapters: ${manifest.chapterCount}`,
    "",
  ];

  for (const ch of chapterSummaries) {
    lines.push(`## ${ch.number}. ${ch.title}`);
    lines.push("");
    lines.push(`Words: ${ch.wordCount.toLocaleString()}`);
    lines.push("");
    lines.push(ch.summary);
    lines.push("");

    if (ch.keyConcepts.length) {
      lines.push("### Key concepts");
      lines.push("");
      for (const concept of ch.keyConcepts) {
        lines.push(`- ${concept}`);
      }
      lines.push("");
    }

    if (ch.keyQuotes.length) {
      lines.push("### Notable quotes");
      lines.push("");
      for (const quote of ch.keyQuotes) {
        lines.push(`> ${quote}`);
        lines.push("");
      }
    }
  }

  writeFileSync(summaryMdPath, lines.join("\n") + "\n", "utf-8");
  console.log(`Summary saved: ${summaryMdPath}`);

  return indexPath;
}
