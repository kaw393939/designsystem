# BSEAI Content Promotion Map

## Status

- Status: active promotion note
- Scope: mapping the current BSEAI, identity, and second-renaissance material into the file-backed `content/` workflow

## Purpose

Take the strongest current doctrine and planning docs and identify what should become:

1. a registered source
2. an experience plan
3. a module brief
4. a unit brief and draft
5. a visual brief
6. a later support or process document

## Working rule

Only promote material that is stable enough to guide a student or explain the program publicly.

Keep unstable exploration in `docs/_projects/`, `docs/_research/`, and `docs/_content/` until it stops changing shape.

## Lane 1: Source registration

| Current file | Current role | Promote to | Proposed id | Priority | Notes |
| --- | --- | --- | --- | --- | --- |
| `docs/_research/bseai.md` | catalog and program source note | `content/sources/bseai.md` | `bseai` | immediate | now registered; this should remain the canonical program source id |
| `docs/_research/identity.md` | identity portfolio research base | already registered source | `identity` | reuse | keep using the existing source record |
| `docs/_research/renesaince.md` | historical and institutional framing | already registered source | `renesaince` | reuse with caution | source id is already active; file still contains raw retrieval markup and should be treated as an internal draft |

## Lane 2: Experience and module planning

| Current file | Current role | Promote to | Proposed id | Priority | Notes |
| --- | --- | --- | --- | --- | --- |
| `docs/_projects/bseaid-degree/degree-positioning.md` | degree doctrine and public frame | experience north star plus homepage unit briefs | `bseai-program` | immediate | this is the core program-facing doctrine |
| `docs/_ux/bseai-site-information-architecture/` plus `docs/_projects/bseaid-degree/bseai-content-production-blueprint.md` | site-shape and production doctrine | experience-assembly rule set | `bseai-program` support note | immediate | this pair now supersedes the older standalone site-architecture note |
| `docs/_projects/bseaid-degree/course-spine.md` | eight-course narrative | module brief plus overview unit brief | `bseai-course-spine` | immediate | should become one durable module, not only a project note |
| `docs/_projects/bseaid-degree/updated-trivium-quadrivium.md` | formation model | module brief plus philosophy unit brief | `bseai-formation-model` | immediate | strong candidate for a canonical philosophy module |
| `docs/_projects/identity-first-site/project-brief.md` | first-site doctrine and studio requirements | module brief for studio entry | `bseai-portfolio-studio` | immediate | use for the BSEAI studio-introduction route |
| `docs/_projects/identity-first-site/archetype-gallery.md` | archetype gallery doctrine | module brief | `archetype-and-identity-gallery` | near-term | canonical module for IS117 and studio use |
| `docs/_projects/identity-first-site/visual-design-literacy-gallery.md` | visual-literacy doctrine | module brief | `visual-design-literacy` | near-term | one of the most important reusable BSEAI modules |
| `docs/_projects/identity-first-site/psychology-attention-persuasion-gallery.md` | psychology and persuasion doctrine | module brief | `attention-trust-and-persuasion` | near-term | shared module across studio and later product courses |
| `docs/_projects/identity-first-site/multimedia-delivery-strategy.md` | media and audio planning note | keep in project/process layer for now | later spec/process note | later | do not promote into student-facing content until the audio workflow is real |

## Lane 3: First unit promotion set

| Proposed unit id | Built from | Route target | Priority | Notes |
| --- | --- | --- | --- | --- |
| `bseai-homepage` | `degree-positioning.md` plus `01-program-structure-and-navigation.md` and the production blueprint | BSEAI home | immediate | explains the degree, the promise, and the route into the site |
| `bseai-program-pillars` | `degree-positioning.md` plus `course-spine.md` | BSEAI home | immediate | optional second home unit if the homepage needs a clearer pillar section |
| `bseai-why-now` | `degree-positioning.md` plus current second-renaissance material | why-now route | immediate | should bridge the degree to the reusable `print-to-ai-knowledge-shift` unit |
| `bseai-formation-model` | `updated-trivium-quadrivium.md` | philosophy route | immediate | canonical unit for the formation language |
| `bseai-course-spine-overview` | `course-spine.md` | course-spine route | immediate | should explain the eight-course sequence through artifacts and public capability |
| `bseai-studio-introduction` | `project-brief.md` plus `identity-portfolio-course-outline.md` | studio route | immediate | routes students into the existing identity studio logic |
| `bseai-module-library` | `project-brief.md` plus gallery briefs | modules route | immediate | catalogs reusable modules rather than teaching them all inline |
| `is117-path-entry` | `course-spine.md` plus identity studio material | IS117 route | immediate | the first course-specific wrapper page |

## Lane 4: Existing approved content to reuse

| Existing artifact | Current role | Reuse in BSEAI | Notes |
| --- | --- | --- | --- |
| `print-to-ai-knowledge-shift` | approved AI/history concept unit | yes | use as the canonical why-now teaching block |
| `choose-primary-archetype` | approved identity concept unit | yes | use inside studio and IS117 pathing |
| `renaissance-to-ai-hero` | approved illustration | yes | why-now and philosophy support |
| `ai-labor-demand-chart` | approved chart | yes | why-now support |
| `archetype-signal-map` | approved diagram | yes | studio and IS117 support |

## Lane 5: Visual promotion priorities

| Proposed visual id | Built from | Priority | Notes |
| --- | --- | --- | --- |
| `bseai-program-hero` | degree positioning plus site architecture | near-term | a program-level visual surface for the homepage |
| `bseai-formation-wheel` | updated trivium/quadrivium | near-term | makes the philosophy page legible fast |
| `bseai-course-artifact-ladder` | course spine | near-term | shows how artifacts accumulate across the degree |
| `bseai-module-map` | module library | later | visual index of canonical modules and their reuse across courses |

## Keep in docs for now

These files should remain in the project or research layers until the student-facing content model is clearer.

1. `docs/_projects/research-backlog.md`
2. `docs/_projects/identity-first-site/student-deployment-scenarios.md`
3. `docs/_projects/identity-first-site/multimedia-delivery-strategy.md`
4. `docs/_research/identity.md` until its retrieval markup is cleaned up
5. `docs/_research/renesaince.md` until its retrieval markup is cleaned up

## Promotion order

1. maintain `content/sources/bseai.md` as the canonical BSEAI source record
2. maintain and refine `content/plans/experiences/bseai-program.yml`
3. create `content/experiences/bseai-program.json`
4. create the first BSEAI module briefs
5. create the first BSEAI unit briefs and working drafts
6. reuse existing approved units and visuals where possible instead of rewriting them
7. assemble the first BSEAI selected release only after the route set and unit set are coherent

## Bottom line

The repo already contains enough doctrine to build the first BSEAI site.

The work now is not more broad ideation.
The work is promotion:

1. move the stable program doctrine into `content/`
2. reuse the current approved identity and second-renaissance artifacts intelligently
3. assemble one selected BSEAI experience from those pieces
