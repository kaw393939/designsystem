# Docs Index

## Purpose

This folder is the durable documentation and research spine for the repository.

Use it to answer four different questions:

1. what the system is supposed to be
2. what has been reviewed and approved
3. what research supports the current educational thesis
4. what UX observations and supporting materials exist outside the runtime app
5. what active cross-cutting builds are currently being shaped

## Structure

- `_specs/`: active specifications, runbooks, sprint briefs, and archived planning context
- `_qa/`: planning, implementation, and release QA artifacts, plus explicit archive paths for superseded QA
- `_research/`: internal source documents, books, and primary research materials
- `_content/`: synthesized literature-review outputs and course-facing research packages
- `_ux/`: UX notes, audits, examples, and think-aloud materials
- `_projects/`: active project briefs, decision docs, and working build plans that combine research, curriculum, and product direction

## Reading rule

If you are trying to understand how the repo should behave, start with:

1. `../README.md`
2. `_specs/README.md`
3. `_qa/README.md`
4. `_research/README.md`

If you are trying to build new educational content from the research stack, then continue with:

1. `_content/README.md`
2. `_content/literature-review/README.md`

If you are trying to understand an active build that cuts across research, curriculum, and site work, then continue with:

1. `_projects/README.md`

## Folder roles

The most important boundary in this folder is this:

- `_research/` stores source material and durable internal foundations
- `_content/` stores synthesis, comparative argument, and curriculum-facing outputs derived from those sources
- `_projects/` stores active build framing, sequencing, and decisions while the work is still being shaped

Do not let those two folders collapse into one another.

## Maintenance rule

If a new top-level documentation area is added under `docs/`, add it to this index in the same pass.
