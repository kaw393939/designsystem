# QA Archive Index

## Purpose

This folder contains QA artifacts that are no longer part of the active review chain.

Archive material stays here for provenance and auditability, but it should not be treated as the current approved target for planning, implementation, or release work.

## Archive structure

- `planning/`: superseded planning-spec and planning-sprint QA artifacts
- `implementation/`: superseded implementation QA artifacts
- `releases/`: historical release QA artifacts that have been replaced by later publish-ready reviews

## Usage rule

Move a QA file here only when a newer artifact clearly supersedes it or when the older artifact no longer serves as the active provenance chain for the current system state.

If there is any doubt, leave the file in the active QA path and mark its relationship in the file metadata or README instead.
