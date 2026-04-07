# Planning and QA Artifact Spec

## Purpose

Define the canonical QA artifact structure for planning, implementation, and release work.

This spec exists so the project can use the same documentation and QA rhythm repeatedly without improvising file locations, naming, or review format each sprint.

## Scope

This spec covers:

- planning QA for core specs
- planning QA for sprint briefs
- implementation QA for sprint work
- release QA for publishable builds

## Canonical QA path

All QA artifacts live under:

- `docs/_qa/`

Subpaths:

- `docs/_qa/planning/specs/`
- `docs/_qa/planning/sprints/`
- `docs/_qa/implementation/sprints/`
- `docs/_qa/releases/`
- `docs/_qa/templates/`

Do not scatter QA artifacts through `_specs/`, source folders, or arbitrary sprint directories.

Start new QA artifacts from the template set under `docs/_qa/templates/` unless there is a strong reason not to.

## Artifact types

### 1. Spec QA

Purpose:

- evaluate whether a core planning or architecture spec is good enough to guide implementation

Location:

- `docs/_qa/planning/specs/`

Naming:

- `<spec-id>.qa.md`

Examples:

- `phase-1-foundation-spec.qa.md`
- `content-schema.qa.md`

### 2. Sprint planning QA

Purpose:

- evaluate whether a sprint brief is bounded, testable, and ready to implement

Location:

- `docs/_qa/planning/sprints/`

Naming:

- `<sprint-id>.planning-qa.md`

Examples:

- `sprint-1-theme-tokens.planning-qa.md`
- `sprint-5-static-export.planning-qa.md`

### 3. Sprint implementation QA

Purpose:

- evaluate whether an implementation satisfies the approved sprint brief and quality bars

Location:

- `docs/_qa/implementation/sprints/`

Naming:

- `<sprint-id>.implementation-qa.md`

Examples:

- `sprint-1-theme-tokens.implementation-qa.md`
- `sprint-5-static-export.implementation-qa.md`

### 4. Release QA

Purpose:

- evaluate whether a release manifest and its build are safe to publish

Location:

- `docs/_qa/releases/`

Naming:

- `<experience-id>--<release-id>.release-qa.md`

Example:

- `enterprise-ai-degree--release-2026-04-12.release-qa.md`

## Template set

Use these templates as the default starting points:

- `docs/_qa/templates/spec-qa.template.md`
- `docs/_qa/templates/sprint-planning-qa.template.md`
- `docs/_qa/templates/sprint-implementation-qa.template.md`
- `docs/_qa/templates/release-qa.template.md`

## Required frontmatter

Every QA artifact should begin with frontmatter like this:

```yaml
---
schema: qa/v1
qaType: sprint-implementation
targetId: sprint-3-educational-primitives
targetPath: docs/_specs/educational-design-system/sprints/sprint-3-educational-primitives.md
status: review_requested
reviewer: github-copilot
createdAt: 2026-04-04T12:00:00Z
outcome: changes_requested
supersedes: null
---
```

Recommended `qaType` values:

- `spec`
- `sprint-planning`
- `sprint-implementation`
- `release`

Recommended `status` values:

- `draft`
- `review_requested`
- `approved`
- `superseded`

Recommended `outcome` values:

- `approved`
- `changes_requested`
- `blocked`

## Required sections

Every QA artifact should include these sections in this order:

1. `Scope`
2. `Method`
3. `Findings`
4. `Assumptions`
5. `Decision`
6. `Required Follow-ups`

## Findings format

Findings should follow the same review style every time:

1. findings first
2. ordered by severity
3. include exact target references when possible
4. say explicitly when there are no findings

## Gate rules by artifact type

### Spec QA gate

No major implementation work should start from a changed core spec until its spec QA artifact is approved.

### Sprint planning QA gate

No sprint implementation should start until its planning QA artifact is approved.

### Sprint implementation QA gate

No sprint should be considered complete until its implementation QA artifact is approved.

### Release QA gate

No releasable build should be published until its release QA artifact is approved.

## Deterministic Lighthouse rule

Release QA and any implementation QA that uses Lighthouse must follow these rules:

1. Lighthouse must run against the exported static artifact.
2. The audit configuration must be committed and shared between local and CI runs.
3. The release QA artifact must record the config used, the categories gated, and the result summary.
4. Phase-1 gating should focus on accessibility, best-practices, and seo before adding performance as a blocking budget.

## Minimum required QA set for a sprint

For each sprint, the minimum artifact set is:

1. one sprint planning QA artifact
2. one sprint implementation QA artifact

If the sprint leads directly to publication, also require:

3. one release QA artifact

## Relationship to the workflow spec

The workflow state machine governs publishable content, visuals, and releases.

This QA artifact spec governs the planning and verification documents that drive the delivery process around those artifacts.

The two layers are complementary:

- workflow spec: what content and release artifacts are allowed to do
- QA artifact spec: how the team proves readiness and quality at each gate

## Recommended first implementation set

To keep the system right-sized, begin by using this QA structure for:

- the active foundation spec
- each active sprint brief
- each completed sprint implementation
- each release candidate intended for publication

Do not create QA artifacts for every tiny note or minor wording cleanup.

## Failure modes to prevent

- putting QA comments only in chat instead of in a file
- using different naming conventions each sprint
- mixing planning QA and implementation QA in the same file
- closing a sprint with no implementation QA artifact
- publishing a release with no release QA artifact

## Acceptance criteria

- QA artifacts have one predictable home.
- The artifact types and names are stable enough for automation.
- A human or LLM can find the latest planning and implementation QA for a sprint quickly.
- The process can repeat sprint after sprint without inventing new document conventions.
