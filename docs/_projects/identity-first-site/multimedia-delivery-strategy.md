# Multimedia Delivery Strategy

## Status

- Status: active implementation note
- Scope: archetype, visual-design literacy, and psychology gallery family

## Purpose

Define how the first site should use text, audio, diagrams, graphics, charts, and other media so longer ideas become easier to understand, revisit, and remember.

## Working doctrine

Longer content should not live only as long pages.

For this site, multimedia is not decoration.
It is part of the teaching method.

## Current repo reality

### Already present

1. research and transcript infrastructure for audiobook source ingestion
2. chapter-candidate generation workflows for long-form source material
3. media planning docs for diagrams, charts, and illustration prompts

Examples in the repo:

1. `lib/book-pipeline.ts`
2. `scripts/batch-transcribe-books.ts`
3. `scripts/generate-transcript-chapter-candidates.mjs`
4. `docs/_content/literature-review/media/chart-plans/diagram-inventory.md`
5. `docs/_content/literature-review/media/chart-plans/mermaid-diagram-prototypes.md`

### Not yet present

1. text-to-speech generation pipeline for student-facing site content
2. audio publishing conventions for the galleries
3. metadata rules for audio chapters, transcripts, and downloadable assets

## Multimedia layers by content depth

### Layer 1: quick orientation

Use for first-screen or skim-first readers.

Assets:

1. summary cards
2. hero diagrams
3. 30 to 60 second audio snippets

### Layer 2: guided lesson

Use for the main gallery experience.

Assets:

1. annotated visuals
2. comparison boards
3. charts and diagrams
4. 3 to 5 minute narrated explainers

### Layer 3: deep companion mode

Use for students who want more context while walking, commuting, or reviewing.

Assets:

1. 8 to 15 minute audio companions
2. chaptered transcripts
3. source lists and related visuals

## Gallery-specific media recommendations

### Archetype gallery

1. cluster intro audio
2. archetype compare boards
3. portrait and historical figure references
4. proof-style diagrams

### Visual design literacy gallery

1. lineage timeline
2. poster and interface comparisons
3. grid overlays and type annotations
4. narrated movement explainers

### Psychology and persuasion gallery

1. scanning heatmaps
2. trust and proof diagrams
3. ethical-boundary charts
4. narrated principle explainers

## Audio strategy

### Why audio matters here

1. supports accessibility
2. helps students revisit longer content away from the screen
3. reinforces instructor presence and voice
4. turns dense modules into repeatable learning assets

### Recommended audio formats

1. quick hit: 30 to 60 seconds
2. section overview: 3 to 5 minutes
3. long-form companion: 8 to 15 minutes

### Audio rules

1. never ship audio without transcript
2. chapter long audio into meaningful sections
3. keep narration concrete and student-facing
4. avoid reading giant blocks of unchanged prose when a spoken rewrite would teach better
5. pair audio with at least one strong supporting visual or note map

## Suggested production workflow

1. draft lesson copy
2. reduce it into spoken script form
3. generate TTS draft audio
4. review pacing, pronunciation, and clarity
5. export transcript and chapter markers
6. pair with diagrams, boards, or charts
7. publish with accessibility checks

## Asset package per lesson

Each major gallery lesson should eventually ship with:

1. short summary
2. main lesson page
3. one core diagram or comparison board
4. one audio companion
5. transcript
6. source anchors

## Media quality bar

1. visuals must explain, not only decorate
2. charts must come from cited data, not invented numbers
3. audio must sound intentional and paced, not like raw text dumped into a voice model
4. transcripts must be clean enough to quote and review

## Immediate next tasks

1. decide the voice style for student-facing audio
2. define file naming and storage rules for generated audio
3. identify the first three lessons that deserve audio before the rest
4. connect gallery scripts to the existing source-transcript workflows where useful