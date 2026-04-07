import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

function usage() {
  console.error('Usage: node scripts/generate-transcript-chapter-candidates.mjs <spec.json>');
  process.exit(1);
}

const [specPathArg] = process.argv.slice(2);

if (!specPathArg) {
  usage();
}

const specPath = resolve(process.cwd(), specPathArg);
const spec = JSON.parse(readFileSync(specPath, 'utf8'));

if (!spec.sourceTranscript || !spec.outputDir || !Array.isArray(spec.sections) || spec.sections.length === 0) {
  console.error('Spec must include sourceTranscript, outputDir, and at least one section.');
  process.exit(1);
}

const sourceTranscriptPath = resolve(process.cwd(), spec.sourceTranscript);
const outputDirPath = resolve(process.cwd(), spec.outputDir);
const transcriptText = readFileSync(sourceTranscriptPath, 'utf8');
const generatedAt = spec.generatedAt || new Date().toISOString().slice(0, 10);

const sections = spec.sections.map((section, index) => {
  const nextStart = index + 1 < spec.sections.length ? spec.sections[index + 1].start : transcriptText.length;
  const chunk = transcriptText.slice(section.start, nextStart).trim();
  return {
    ...section,
    order: index,
    end: nextStart,
    wordCount: chunk.split(/\s+/).filter(Boolean).length,
    strategy: 'first',
    chunk,
  };
});

mkdirSync(outputDirPath, { recursive: true });

for (const section of sections) {
  const filePath = resolve(outputDirPath, section.file);
  const content = [
    `# ${section.title}`,
    '',
    `Kind: ${section.kind}`,
    `Candidate split generated from transcript.txt on ${generatedAt}.`,
    `Detected boundary: ${section.boundary}`,
    '',
    '---',
    '',
    section.chunk,
    '',
  ].join('\n');
  writeFileSync(filePath, content);
}

const manifest = {
  sourceTranscript: spec.sourceTranscript,
  generatedAt,
  sectionCount: sections.length,
  sections: sections.map(({ chunk, boundary, ...section }) => section),
};

writeFileSync(resolve(outputDirPath, '_manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Generated ${sections.length} sections in ${spec.outputDir}`);