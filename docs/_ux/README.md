# UX Notes Index

## Purpose

This folder stores UX observations, audits, examples, and exploratory notes that support design and content decisions without being active runtime code.

## Current structure

- `course_design.md`: stable course-design doctrine and teaching-shape thinking
- `bseai-site-information-architecture.md`: consolidated hub pointing to the modular BSEAI IA split set
- `bseai-site-information-architecture/`: split IA source-of-truth set for program structure, content objects, atlas logic, wrappers, and governance
- `is117-online-presence-course-architecture.md`: IS117-specific course architecture centered on building a public-facing online presence and self-promotion tool through the portfolio system
- `page_audit/`: dated route-audit materials and remediation trail
- `2026-04-05-student-audit-report.md`: student-path audit of the live identity flow
- `2026-04-05-student-portfolio-example.md`: concrete worked example produced from the live route flow
- `round-1-site-think-aloud.md`: first UX read focused on gaps and cold spots
- `round-2-site-think-aloud.md`: second UX read after route and visual improvements

## Reading order

If you are trying to understand the UX state of the site quickly, read in this order:

1. `page_audit/README.md`
2. `2026-04-05-student-audit-report.md`
3. `2026-04-05-student-portfolio-example.md`
4. `round-2-site-think-aloud.md`

If you are trying to shape the BSEAI site as a teaching system, read in this order:

1. `course_design.md`
2. `bseai-site-information-architecture/00-README.md`
3. `bseai-site-information-architecture/01-program-structure-and-navigation.md`
4. `bseai-site-information-architecture/02-content-objects-and-module-library.md`
5. `bseai-site-information-architecture/03-atlas-galleries-and-media.md`
6. `bseai-site-information-architecture/04-course-wrappers-and-is117.md`
7. `bseai-site-information-architecture/05-governance-accessibility-and-release.md`
8. `is117-online-presence-course-architecture.md`

## Archive rule

Keep dated audit files in place.

Do not rename them unless they are being promoted into a different durable documentation layer.

## Use rule

Treat this folder as supporting evidence and exploratory input.

If a UX finding becomes a durable rule for the system, promote that rule into:

- `docs/_specs/` if it changes architecture or policy
- `docs/_research/` if it becomes part of the conceptual model
- `docs/_content/` if it becomes part of a synthesis or curriculum argument
