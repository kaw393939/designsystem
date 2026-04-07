# BSEAI Content Production Operating Runbook

## Status

- Status: active pre-implementation runbook
- Scope: organize and execute BSEAI content production through release assembly, stopping before route implementation

## Purpose

Define the exact order for producing BSEAI content so the repo can support autonomous execution without confusing research, planning, drafts, review, and implementation.

## Authority stack

Use these documents in order when a conflict appears.

1. `docs/_ux/bseai-site-information-architecture/`
2. `docs/_projects/bseaid-degree/bseai-content-production-blueprint.md`
3. `docs/_projects/bseaid-degree/degree-positioning.md`
4. `docs/_projects/bseaid-degree/first-publishable-route-set.md`
5. `docs/_projects/bseaid-degree/content-promotion-map.md`
6. `docs/_projects/bseaid-degree/course-spine.md`
7. `docs/_projects/bseaid-degree/updated-trivium-quadrivium.md`
8. `docs/_projects/bseaid-degree/qa-reviews/13-synthesis-action-plan.md`
9. this runbook
10. `first-content-checklist.md`

## Boundary model

Keep each layer doing one job.

| Layer | Primary job | Do not use it for |
| --- | --- | --- |
| `docs/_research/` | source documents, transcripts, shelf decisions, internal evidence bases | publishable units, route logic, or release manifests |
| `docs/_content/` | synthesis, literature-review outputs, and comparative doctrine | operational content artifacts |
| `docs/_projects/` | active program decisions, route scope, and promotion planning | long-term workflow specs or immutable release records |
| `docs/_specs/bseai-content-production/` | execution order, acceptance rules, and autonomous work guidance | free-form ideation |
| `content/` | managed sources, plans, briefs, drafts, approved versions, experience configs, and release manifests | raw research notes or unresolved strategic debate |

## Execution phases

### Phase 0: stabilize the source-of-truth layer

Complete these first.

1. make sure the split IA set and production blueprint reflect the current doctrine
2. treat archived project notes as historical only
3. register the BSEAI source and seed the BSEAI experience north star

### Phase 1: create planning artifacts

Required outputs:

1. `content/plans/experiences/bseai-program.yml`
2. release-1 module plans under `content/plans/modules/`

Exit condition:

Every release-1 route pack has a governing experience or module plan.

### Phase 2: create unit briefs and visual briefs

Required outputs:

1. release-1 unit briefs under `content/briefs/units/`
2. release-1 visual briefs under `content/briefs/visuals/`

Exit condition:

Every release-1 route or pack named in the production blueprint has a briefed content set with recipe, job, audience, and evidence requirements.

### Phase 3: draft the artifacts

Required outputs:

1. unit drafts under `content/drafts/units/`
2. visual drafts under `content/drafts/visuals/`

Exit condition:

Every release-1 unit and visual exists in mutable draft form with enough structure to review.

### Phase 4: freeze and review

Required outputs:

1. frozen unit versions under `content/units/<unit-id>/versions/`
2. frozen visual versions under `content/visuals/<visual-id>/versions/`
3. review records under `content/reviews/` or linked QA artifacts under `docs/_qa/`

Required checks:

1. recipe validity
2. evidence and provenance checks
3. accessibility review
4. public-proof rubric
5. outside-reviewer test

Exit condition:

The first release slice has approved units and visuals, not only drafts.

### Phase 5: assemble the experience and release

Required outputs:

1. `content/experiences/bseai-program.json`
2. `content/registry/site-registry.json` entries for BSEAI routes
3. `content/releases/bseai-release-1.json`

Exit condition:

The first selected release is explicit enough to validate and build.

### Phase 6: hand off to implementation

Implementation should start only when the content system has stopped discovering what the site is supposed to say.

Required handoff package:

1. approved experience plan
2. approved module plans
3. approved unit and visual versions for the release slice
4. explicit route registry requirements
5. explicit release manifest
6. unresolved strategic questions called out separately from approved copy

## Blocking decisions

These questions may remain open in planning, but they should not leak into approved public-facing copy as if they are already settled.

| Decision | Why it matters | Blocked artifacts |
| --- | --- | --- |
| public claim about being the first BS degree of its kind | affects legal, admissions, and reputational risk | homepage hero copy, executive summaries, press language |
| final eighth-course slot in the spine | affects the artifact ladder and course-spine promise | course-spine overview, course-spine diagram, later wrapper planning |
| final judgment and responsible-deployment credentialing language | affects employer trust and governance claims | philosophy, governance, exemplar pack, career-room outputs |

## Archive rules

1. move superseded one-file planning notes into project-level `_archive/`
2. keep raw logs, superseded run-state, and obsolete transcript outputs under the relevant `_archive/` folder near their source material
3. do not leave two active docs that appear to govern the same decision
4. if a stable workflow rule stops being project-specific, promote it into `_specs/`

## Stop conditions

Pause autonomous execution and escalate if any of these happen.

1. a required artifact needs a route decision that is not present in the split IA set
2. a public claim depends on unresolved leadership approval
3. a route pack lacks a module or unit brief but drafting has already started
4. archived notes and active notes disagree and the active note is not clearly newer
5. a visual is treated as evidence without a visible source trail

## Success condition

The runbook succeeds when the repo can support autonomous production of BSEAI content through approved release artifacts without forcing the runtime site to become the place where meaning, scope, or governance are discovered for the first time.
