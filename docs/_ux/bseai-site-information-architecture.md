# BSEAI Site Information Architecture

## Status

- Status: active IA and instructional-architecture note
- Scope: public site structure, reusable module system, and course-wrapper pattern for the BSEAI site
- Governing doctrine: `docs/_ux/course_design.md`
- Supporting program docs: `docs/_projects/bseaid-degree/degree-positioning.md`, `docs/_projects/bseaid-degree/bseai-content-production-blueprint.md`, `docs/_projects/bseaid-degree/first-publishable-route-set.md`, `docs/_projects/bseaid-degree/course-spine.md`, `docs/_projects/bseaid-degree/updated-trivium-quadrivium.md`
- Supporting research corpus: `docs/_content/literature-review/00-synthesis/integrated-research-outline.md`, `docs/_content/literature-review/00-synthesis/bookshelf-to-content-map.md`, `docs/_content/literature-review/media/generated-assets-manifest.md`, `docs/_content/literature-review/media/chart-plans/diagram-inventory.md`, `docs/_content/literature-review/media/chart-plans/data-chart-inventory.md`, `docs/_research/books/transcripts/the-hero-and-the-outlaw/source-brief.md`

## Purpose

Plan the BSEAI site as both:

1. a public-facing program site
2. a reusable instructional system that can support face-to-face, hybrid, and online teaching

This document is the bridge between the public route structure and the course-design doctrine.

It answers five questions:

1. what the top-level site structure should be
2. how reusable instructional modules should be organized
3. how those modules fit inside the course-design model in `course_design.md`
4. how course wrappers such as IS117 should sequence the modules week to week
5. what content should be durable at the site level versus contextual at the course level

## Split reading set

The IA has now been broken into a smaller source-of-truth set for active planning and production.

Use these files for ongoing work:

1. `docs/_ux/bseai-site-information-architecture/00-README.md`
2. `docs/_ux/bseai-site-information-architecture/01-program-structure-and-navigation.md`
3. `docs/_ux/bseai-site-information-architecture/02-content-objects-and-module-library.md`
4. `docs/_ux/bseai-site-information-architecture/03-atlas-galleries-and-media.md`
5. `docs/_ux/bseai-site-information-architecture/04-course-wrappers-and-is117.md`
6. `docs/_ux/bseai-site-information-architecture/05-governance-accessibility-and-release.md`

Use `docs/_projects/bseaid-degree/bseai-content-production-blueprint.md` for the content-production system, artifact flow, and runtime handoff into the current design system.

This consolidated file remains useful as a one-file snapshot, but the split set should guide new planning work.

## Curatorial doctrine

The site should not feel like a docs portal or a lecture dump.

It should feel like a museum-school hybrid.

That means the public experience should be built from curated rooms, not undifferentiated folders.

Each major room should combine:

1. an opening panel that names the question and the stakes
2. one strong diagram, timeline, or comparison board
3. a small set of annotated objects, examples, or case cards
4. a quote rail or short voice layer that sharpens the meaning
5. one worksheet, prompt, or decision handoff into student action
6. a visible next move into either Studio, Course, or Example

This is how the site can use the literature-review corpus intelligently without turning into an archive.

## Core decision

The BSEAI site needs three layers, not one.

### 1. Public route layer

This is the student- and public-facing navigation model.

Its job is orientation, meaning, discoverability, and clear entry into the program.

### 2. Instructional module layer

This is the reusable learning-asset library.

Its job is to hold the canonical teaching blocks that can be reused across courses.

### 3. Course wrapper layer

This is the weekly teaching and scheduling layer.

Its job is to turn canonical modules into a specific course experience with dates, deliverables, grading, in-class activity plans, and online support.

## Non-negotiable IA rules

1. A route is not the same thing as a week.
2. A module is not the same thing as a page.
3. Public routes stay durable; course wrappers own dates, due windows, and grading context.
4. Canonical modules own the stable explanation, outcomes, examples, and artifact model.
5. Studio modules must lead to visible artifacts, not only understanding.
6. Examples, references, and support routes must remain secondary to the main learning path.
7. The instructor voice must remain visible in every course wrapper even when the canonical content is reused.

## Author-facing object model

The public IA is only durable if the authoring objects are explicit.

Use this table before creating a new page, room, or module.

| Object type | Primary job | Use when | Do not use when | Best home |
| --- | --- | --- | --- | --- |
| atlas room | curate a research-backed question into a legible exhibit | the content begins with a thesis, evidence, and interpretation | the real need is a weekly assignment or a reusable how-to lesson | atlas |
| gallery board | help students compare options and leave with a decision | the learner needs contrast, diagnosis, or recognition support | the learner only needs one direct instruction to continue | galleries or module support layer |
| canonical module | teach a durable learning block with outcomes and an output | the same teaching unit should be reused across wrappers | the content exists only for one course week or one date band | modules or the route that owns the module |
| studio step | move the learner toward an artifact or revision | the content must end in a visible product move | the content is primarily historical, philosophical, or evidentiary | studio |
| course-wrapper page | sequence time, deadlines, and instructor-specific expectations | the content needs dates, submission rules, or class rhythm | the explanation should stay stable across terms | courses |
| example walkthrough | prove what a strong output looks like end to end | learners are stalling because they cannot picture the output chain | the content is still abstract or unverified | examples and in-line route callouts |

When an author cannot place a candidate object cleanly in this table, the object should not ship yet.

## IA doctrine from `course_design.md`

The site must respect these instructional constraints.

1. The course must be legible from day one.
2. Learning outcomes are the spine.
3. Modules need consistent weekly structure.
4. The instructor remains the primary voice.
5. Assignments must be scaffolded.
6. Interaction must be designed.
7. Accessibility and support are baseline requirements.

The IA implication is simple:

The BSEAI site cannot be only a content archive.
It must be a modular teaching system that can be wrapped differently by different courses.

## QA conclusions from this pass

This QA pass produced four corrections that should govern future implementation.

1. Course wrappers are a separate layer, not a canonical module type.
2. The IA needs an explicit outcomes map, not only descriptive module briefs.
3. The wrapper layer needs a stronger entry architecture so the site satisfies the start-here, syllabus, schedule, and weekly legibility requirements in `course_design.md`.
4. Interaction, accessibility, and instructional-material standards need to be explicit enough that future authors do not treat them as implied.

## Audience architecture

| Audience | Primary need | Best entry point | What success looks like |
| --- | --- | --- | --- |
| prospective student | understand what the degree is and why it matters now | BSEAI home | they understand the program promise, the course spine, and the public-practice model |
| current IS117 student | know what to do this week and what artifact to make | IS117 course wrapper | they can move from module overview to a concrete deliverable without instructor translation |
| later BSEAI student | find the right reusable module for the current course | modules route plus course wrapper | they can see what module they are in, why it matters, and how it connects to the degree |
| instructor | reuse canonical content without losing teaching voice or weekly clarity | course wrapper and module template | they can teach face-to-face while the site handles continuity, directions, and artifacts |
| faculty or program lead | explain the degree coherently to internal stakeholders | home, why-now, philosophy, course spine | they can defend the degree as a formation-and-deployment program |
| employer or reviewer | understand what the student has been formed to do | course spine, studio, examples later | they can see artifacts, proof, and the logic of the program |

## Top-level route architecture

The public route tree should stay intentionally small.

| Route | Layer | Primary job | Main contents |
| --- | --- | --- | --- |
| `/experiences/bseai/` | program shell | orient the reader to the degree and the pathways through the site | start-here block, program promise, main pathways, core CTA into modules or course path |
| `/experiences/bseai/why-now/` | foundation | explain why the degree exists now | second-renaissance framing, institutional shift, labor signal, why this degree is different |
| `/experiences/bseai/philosophy/` | formation | explain the seven-capacity formation model | updated trivium and quadrivium, what kind of person the degree tries to form |
| `/experiences/bseai/atlas/` | research atlas | turn the literature-review corpus into curated exhibit rooms instead of raw research browse | synthesis rooms, idea clusters, luminary rails, quote cards, evidence cards, media index |
| `/experiences/bseai/course-spine/` | program sequence | show how the degree fits together | eight-course spine, artifact ladder, role targets, progression logic |
| `/experiences/bseai/studio/` | studio | route students into artifact-making and public practice | signal, style, proof, build, publish module sequence |
| `/experiences/bseai/modules/` | module library | expose canonical reusable modules | gallery of modules, what each teaches, which courses reuse them |
| `/experiences/bseai/galleries/` | gallery family, later | explain the main comparison libraries and help students enter the right decision support layer | archetype and identity, visual-design literacy, psychology and persuasion |
| `/experiences/bseai/courses/` | course wrapper index | help current students enter the right course pathway | course cards, expectations, which modules belong to which course |
| `/experiences/bseai/courses/is117/` | course wrapper | tell IS117 students exactly what to do and when | week sequence, module list, submission path, critique rhythm |
| `/experiences/bseai/examples/` | evidence, later | prove the system with exemplars | student work, before and after, artifact ladders, role-target examples |

## Release 1 visibility rules

The comprehensive IA is larger than the first publishable release.

Release 1 should expose only the routes needed to establish the program logic and support one live wrapper cleanly.

| Route family | Release 1 status | Visibility rule |
| --- | --- | --- |
| home | visible | primary entry point |
| why-now | visible | top-level item |
| philosophy | visible | top-level item |
| atlas | visible but compressed | one landing page plus a small number of curated rooms |
| course spine | visible | top-level item |
| studio | visible | top-level item |
| modules | visible | top-level item |
| galleries | nested | exposed through modules and studio until the library grows |
| courses | visible | top-level item |
| examples | seeded, not full route family | surface one or two exemplar callouts inside studio and IS117 first |

The build rule is simple.

Do not expose a route family in primary navigation unless it has enough authored material to feel intentional.

## Navigation model

### Primary navigation

The selected BSEAI experience should expose these top-level choices:

1. Home
2. Why Now
3. Formation
4. Atlas
5. Course Spine
6. Studio
7. Modules
8. Courses

The gallery family can remain nested under Modules for the first release and become a primary navigation item later if the library grows large enough to justify it.

If the first release needs a tighter navigation set, Atlas can ship as a visible secondary path from Why Now and Formation rather than as a primary item, but the comprehensive IA should still treat it as a real route family.

### Secondary navigation

Each top-level route should expose the next logical move, not every possible move.

Examples:

1. Home should push toward Why Now, Modules, and the current course path.
2. Why Now should push toward Formation and Course Spine.
3. Course Spine should push toward Studio and Courses.
4. Studio should push through the studio sequence, not back into the entire site.
5. Courses should push into one active wrapper such as IS117.

## First-time visitor path

The site should make the first move obvious for three different starting audiences.

| Visitor type | First CTA | Second CTA | Success condition |
| --- | --- | --- | --- |
| prospective student | Why Now | Course Spine | they understand the program promise before browsing the deeper system |
| current student | Active Course | Studio | they land on this week's path without digging through program framing |
| instructor or reviewer | Formation | Modules | they can inspect the teaching logic without entering a student wrapper |

The home page should show these as distinct path choices rather than one generic `learn more` cluster.

### Global support navigation

The current system support routes stay global rather than being rebuilt inside BSEAI.

1. `/recipes/`
2. `/tokens/`
3. `/layouts/`
4. `/primitives/`
5. `/process/`
6. `/status/`

## The critical distinction: route architecture versus module architecture

The public route tree should stay shallow.

The instructional module tree can be deeper.

That means:

1. one route can contain several sequential instructional modules
2. one instructional module can appear in multiple course wrappers
3. a course wrapper can pull from many routes without changing the public navigation

The clearest example is the studio route.

Publicly, the BSEAI site only needs one Studio route.

Instructionally, the Studio route should hold five sequential modules:

1. Identity and signal
2. Visual lane and design decisions
3. Proof and trust
4. Build and product shape
5. Publish and weak ties

The project docs add a second requirement.

The Studio route is the core production path, but it should sit beside a reusable gallery family that helps students make better decisions without turning the main path into endless browsing.

That gallery family has three branches:

1. archetype and identity gallery
2. visual-design literacy gallery
3. psychology, attention, and persuasion gallery

## Canonical module taxonomy

The BSEAI module system should use five canonical module types.

| Module type | Job | Typical recipe shape |
| --- | --- | --- |
| orientation | start the learner fast and explain the path | learning-homepage or orientation brief |
| foundation concept | explain a durable idea that several courses reuse | concept-explainer, timeline-story, comparison page |
| atlas or exhibit | curate a research cluster into a legible teaching room | atlas landing, timeline, compare wall, quote rail, evidence cards |
| gallery | teach comparison, diagnosis, and recognition through examples | module-overview, gallery, annotated comparison |
| studio | drive artifact production and iterative refinement | assignment-project, studio workflow, critique page |
| evidence/support | supply references, exemplars, and process backup | reading map, examples route, support guide |

Course wrappers are not part of the canonical module taxonomy.

They are the sequencing layer that assembles canonical modules into a teachable course.

## Module shell required by the course-design doctrine

Every reusable instructional module should support the same teaching shape, even when the public presentation differs.

Each module should carry these fields or sections:

1. module title and topic
2. module overview and why it matters now
3. measurable module outcomes
4. instructor framing or contextual note
5. required materials
6. recommended in-class activity plan
7. online support elements for hybrid or online use
8. artifact or deliverable expectation
9. assessment or critique criteria
10. next move in the sequence
11. accessibility and support notes when needed

The canonical module page does not need due dates.

The course wrapper adds:

1. week number
2. date range
3. assignment deadline
4. submission path
5. discussion or critique requirement
6. announcement and feedback cadence

## Instructional materials standards

Each canonical module should enforce the instructional-material rules from `course_design.md`.

1. materials must be purposeful rather than archival
2. materials must connect directly to module outcomes
3. materials must be contextualized by the instructor or the program voice
4. materials should be balanced across text, visuals, and media when that improves comprehension
5. long asynchronous explanation should be segmented into smaller parts rather than delivered as one large recording or wall of text
6. every required material should answer a clear student question such as why this matters, what to notice, or what to do next

## Curatorial asset grammar

The literature-review package already contains the right raw ingredients for a museum-grade instructional site.

The IA should formalize how those ingredients appear.

| Asset type | Job in the experience | Best current source layer |
| --- | --- | --- |
| opening panel | name the room question and the stakes | `00-synthesis/` |
| timeline or comparison wall | compress a complex shift or lineage visually | `ideas/`, `media/chart-plans/` |
| object label or case card | make one brand, page, person, or institution legible fast | `people/`, `luminaries/`, book chapter candidates |
| quote rail | supply voice and memory hooks without turning the page into a quote dump | `quotes/`, idea papers |
| diagram | explain a system at a glance | `media/chart-plans/diagram-inventory.md` |
| chart card | anchor a major claim in evidence | `institutions/`, `references/`, `media/chart-plans/data-chart-inventory.md` |
| worksheet or decision board | turn the room into action | canonical modules and wrappers |
| exemplar walkthrough | prove what a good output looks like | examples layer and course wrapper |

## Curatorial room template and density rules

Atlas rooms and gallery rooms should be curated to a repeatable density.

Use this template unless a room has a strong reason to break it.

| Room element | Recommended count | Rule |
| --- | --- | --- |
| opening panel | 1 | name the question, stakes, and what the learner should notice |
| hero diagram or board | 1 | make the main structural claim visible fast |
| annotated objects or case cards | 2 to 4 | distinguish one hero object from supporting objects |
| quote rail | 1 to 3 quotes | every quote must sharpen interpretation, not set mood only |
| evidence cards | 1 to 3 | evidence should be enough to anchor the claim without overloading the room |
| worksheet or decision handoff | 1 | the room must hand back to a decision, studio move, or next route |

Hero objects should carry the main interpretive weight.

Supporting objects should broaden or stress-test the room's claim.

Reference objects should stay minimal and should not compete with the hero object.

The cognitive-load rule is equally important.

If a room needs more than one hero board or more than four annotated objects, it should probably become two rooms.

## Phase 1 canonical module library

These are the first modules the BSEAI site should standardize.

| Module id | Module type | Core job | Signature artifact or output | Best first home | Best first course fit |
| --- | --- | --- | --- | --- | --- |
| `bseai-orientation` | orientation | explain what the degree is, why the site exists, and how to begin | orientation checklist and pathway choice | home | IS117 week 0 |
| `bseai-why-now` | foundation concept | explain AI as an institutional shift instead of a tool trend | short why-now synthesis note | why-now | IS117 week 1 |
| `bseai-formation-model` | foundation concept | explain the seven-capacity formation model | personal capacity audit | philosophy | IS117 week 1 |
| `identity-and-signal` | studio | help students choose a dominant signal and audience need | signal brief | studio | IS117 weeks 2-3 |
| `archetype-gallery` | gallery | help students compare archetypes as public meaning systems and leave with one coherent choice | archetype decision sheet | modules or galleries | IS117 week 4 |
| `visual-design-literacy` | gallery | teach students how design lineages change perception and trust | visual lane selection sheet | modules or studio | IS117 weeks 4-5 |
| `attention-trust-and-persuasion` | gallery | teach first-read cognition, proof placement, and ethical influence | trust-and-proof decision board | modules or studio | IS117 weeks 5-6 |
| `proof-of-work` | studio | turn claims into visible proof and receipts | proof block draft | studio | IS117 weeks 6-7 |
| `build-and-product-shape` | studio | turn signal and proof into a coherent page or product surface | homepage or product skeleton | studio | IS117 weeks 7-9 |
| `publish-and-weak-ties` | studio | teach deployment, circulation, follow-up, and iteration | post draft, meetup opener, follow-up script | studio | IS117 weeks 10-12 |

## Research corpus architecture

The literature-review package should not stay trapped as a back-office folder.

It should be translated into a public research-atlas layer with clear exposure rules.

| Corpus layer | Site-facing equivalent | Job in the IA | Exposure rule |
| --- | --- | --- | --- |
| `00-synthesis/` | atlas landing and room intros | explain the thesis and orient the reader | public-first |
| `ideas/` | exhibit essays and compare rooms | teach the major conceptual blocks | public-curated |
| `luminaries/` and `people/` | person cards and profile rails | humanize the ideas and anchor them in recognizable thinkers | selective public |
| `quotes/` | quote rails and margin lines | sharpen memory and tone | curated only |
| `references/` and `institutions/` | evidence cards and chart notes | back claims with visible authority | public summary with cited source trail |
| `media/` | diagrams, charts, image boards, and mood frames | make the research visual and teachable | public selected assets |

The critical rule is:

Do not expose raw folder structure as if it were the experience.
Every public research surface should be curated into a room, atlas panel, or evidence card set.

## Evidence tiers and provenance rules

The research atlas needs explicit public evidence tiers so authors know what can be shown and how it should be labeled.

| Evidence tier | Meaning | Public use rule |
| --- | --- | --- |
| verified evidence | directly grounded in checked source material with visible citation trail | may anchor a public claim, chart card, or evidence note |
| interpreted synthesis | a cross-source interpretation or instructional summary | may appear in panels and narration, but should point back to source anchors |
| concept asset | synthetic image, atmosphere asset, or speculative visual model | may orient mood or explain a model, but must never be mistaken for documentary evidence |

Additional provenance rules:

1. audiobook transcripts and chapter candidates must be checked against the source before being used as public quotations.
2. chart cards must identify source, retrieval date, and the question the chart answers.
3. concept images should be labeled as concept art, editorial illustration, or synthetic board when confusion is possible.

## Gallery family architecture

The first-site project docs make the gallery family a first-class architectural layer rather than optional enrichment.

Each gallery family solves a specific student problem.

| Gallery family | Student problem it solves | Main outputs | Core rule |
| --- | --- | --- | --- |
| archetype and identity | I do not know what kind of person my site should read as on first contact | primary archetype choice, tone direction, proof-style direction | end in a usable decision, not indefinite browsing |
| visual-design literacy | I do not know what visual lane I am choosing or what it optimizes for | visual lane sheet, design lineage references, anti-pattern list | translate design history into homepage decisions |
| psychology, attention, and persuasion | I do not know why a page move works or fails | page-problem diagnosis, trust-and-proof board, ethical guardrail notes | teach psychology through page problems, not detached theory |

## Gallery family boundaries

The project backlog identified this boundary problem directly, so the IA should make it explicit.

### Keep on the core Studio path

1. the minimum signal worksheet
2. the minimum archetype decision needed to proceed
3. the visual-lane decision needed to proceed
4. the proof-block structure needed to proceed
5. the publish kit needed to proceed

### Put inside the gallery family

1. comparison views
2. broader example pools
3. annotated movement and lineage materials
4. deeper page-problem cards
5. anti-pattern libraries
6. optional diagnose or compare modes

### Keep in evidence and support layers

1. source trails
2. deep theory maps
3. maintainer-facing system overviews
4. content-process receipts

## Archetype atlas architecture

The Hero and the Outlaw source material adds a much stronger internal structure for the archetype gallery.

The archetype system should be authored as an atlas, not as twelve disconnected cards.

### Core atlas sequence

1. meaning-management overview
2. motivation grid and tension map
3. cluster rooms
4. compare lab
5. positioning lab
6. ethics and shadow room

### Cluster rooms derived from the book

1. `Yearning for Paradise`: Innocent, Explorer, Sage
2. `Leaving a Thumbprint on the World`: Hero, Outlaw, Magician
3. `No Man or Woman Is an Island`: Regular Guy or Gal, Lover, Jester
4. `Providing Structure to the World`: Caregiver, Creator, Ruler

### Positioning layer derived from the book

The book's `Finding True North` section should shape the student-facing positioning lab.

That lab should force a real choice instead of adjective soup.

Students should leave with:

1. one primary archetype
2. one audience-facing reason for that choice
3. headline tone cues
4. proof-style cues
5. CTA-style cues
6. one shadow or trap to avoid

### Ethics layer derived from the book

The book's `Deeper Waters` material should shape the ethics and congruence layer.

Every archetype room should therefore include:

1. the archetype gift
2. the archetype trap
3. common category misuses
4. congruence test between voice, visuals, proof, and actual conduct

### Primary archetype decision rubric

The archetype atlas should end in a defensible decision rather than a favorite label.

Each student or page owner should test the leading archetype options against these questions.

1. which archetype best matches the actual audience need being served
2. which archetype fits the kind of proof the page can really show
3. which archetype can stay coherent across headline, visuals, CTA, and follow-through
4. which archetype is most likely to be misused or overperformed here

Each final decision should produce five outputs:

1. one primary archetype
2. one short audience-facing reason for that choice
3. headline tone cues
4. proof-style cues
5. one shadow or trap to monitor

Every decision should also answer one category-essence question:

What is this page, artifact, or person actually promising beyond surface style?

## Route-to-module ownership map

This map clarifies which canonical modules actually belong inside each public route.

| Public route | Canonical modules it should expose first | Notes |
| --- | --- | --- |
| `/experiences/bseai/` | `bseai-orientation` | may also preview `bseai-why-now` and the active course wrapper |
| `/experiences/bseai/why-now/` | `bseai-why-now` | should reuse the strongest current second-renaissance content |
| `/experiences/bseai/philosophy/` | `bseai-formation-model` | should translate the seven-capacity framework into student language |
| `/experiences/bseai/course-spine/` | program sequence overview module to be authored from the spine docs | should remain degree-wide, not course-specific |
| `/experiences/bseai/studio/` | `identity-and-signal`, `archetype-gallery`, `visual-design-literacy`, `attention-trust-and-persuasion`, `proof-of-work`, `build-and-product-shape`, `publish-and-weak-ties` | one public studio route, many internal modules |
| `/experiences/bseai/modules/` | module index over all canonical modules | this is the catalog, not the weekly path |
| `/experiences/bseai/galleries/` | `archetype-gallery`, `visual-design-literacy`, `attention-trust-and-persuasion` | comparison and diagnosis layer for students who need richer decision support |
| `/experiences/bseai/courses/is117/` | wrapper over the full Phase 1 module sequence | must add dates, grading, submission, and teaching rhythm |

## Detailed module briefs for Phase 1

### 1. `bseai-orientation`

- Module type: orientation
- Student question: what is this program and how do I use this site?
- Primary outcomes:
  1. identify the program promise
  2. identify the main site pathways
  3. know where to start as a current student versus a prospective student
- Required materials:
  1. short program overview
  2. pathway map
  3. start-here checklist
- In-class use:
  1. first-day walkthrough
  2. quick navigation exercise
- Online support:
  1. welcome video or written overview
  2. ask-the-instructor link
- Deliverable:
  1. completed orientation checklist
  2. declared course path or learning pathway

### 2. `bseai-why-now`

- Module type: foundation concept
- Student question: why does this degree exist now?
- Primary outcomes:
  1. explain AI as a change in the economics of symbolic work
  2. connect that change to education and labor
  3. explain why public proof and judgment now matter more
- Required materials:
  1. `print-to-ai-knowledge-shift`
  2. program-specific bridge framing
  3. labor-signal visual
- In-class use:
  1. discussion on how AI changes what counts as strong evidence of capability
  2. compare print-era and AI-era institutional shifts
- Online support:
  1. narrated explainer or concise written overview
  2. comparison discussion or reflection
- Deliverable:
  1. short why-now explanation in student language

### 3. `bseai-formation-model`

- Module type: foundation concept
- Student question: what kind of person is the degree trying to form?
- Primary outcomes:
  1. name the seven capacities
  2. distinguish tool fluency from formation
  3. identify current strengths and gaps
- Required materials:
  1. updated trivium and quadrivium explanation
  2. formation diagram or checklist
- In-class use:
  1. self-audit and discussion
  2. compare weak and strong examples of public formation
- Online support:
  1. self-audit worksheet
  2. reflection prompt
- Deliverable:
  1. personal capacity audit

### 4. `identity-and-signal`

- Module type: studio
- Student question: what should people understand about me first?
- Primary outcomes:
  1. identify audience, need, and promise
  2. choose a dominant signal or archetype
  3. explain why one signal is better than many mixed signals
- Required materials:
  1. identity-system core logic
  2. archetype comparison tools
  3. signal worksheet
- In-class use:
  1. workshop and critique
  2. signal-brief review in pairs or small groups
- Online support:
  1. signal worksheet
  2. asynchronous critique prompt
- Deliverable:
  1. signal brief

### 5. `archetype-gallery`

- Module type: gallery
- Student question: what kind of public meaning system should my site use on the first read?
- Primary outcomes:
  1. compare archetypes as coherence devices rather than personality diagnoses
  2. choose one primary archetype with a defensible reason
  3. connect archetype to headline tone, proof style, CTA style, and likely failure mode
- Required materials:
  1. archetype clusters and compare views
  2. motivation grid and part-family map
  3. anti-patterns and commonly confused archetypes
  4. decision worksheet
- In-class use:
  1. compare and critique likely archetype choices
  2. test whether another student can read the intended signal back accurately
- Online support:
  1. browse mode
  2. compare mode
  3. decision mode
  4. gift and trap notes
- Deliverable:
  1. archetype decision sheet

### 6. `visual-design-literacy`

- Module type: gallery
- Student question: what visual lane supports the signal best?
- Primary outcomes:
  1. recognize design lineages and their effects on trust and pace
  2. choose a visual lane on purpose
  3. translate style into page decisions
- Required materials:
  1. lineage gallery
  2. before-and-after comparisons
  3. lane translation worksheet
- In-class use:
  1. gallery walk or comparison critique
  2. style board selection
- Online support:
  1. annotated comparisons
  2. short reflection or decision board
- Deliverable:
  1. visual lane selection sheet

### 7. `attention-trust-and-persuasion`

- Module type: gallery
- Student question: how do attention and trust work on a real page?
- Primary outcomes:
  1. explain first-read behavior
  2. place proof near the claim
  3. distinguish ethical influence from manipulation
- Required materials:
  1. psychology and persuasion gallery
  2. annotated trust patterns
  3. proof-placement examples
- In-class use:
  1. page audit or critique
  2. trust-move diagnosis exercise
- Online support:
  1. critique board
  2. pattern library
- Deliverable:
  1. trust-and-proof decision board

### 8. `proof-of-work`

- Module type: studio
- Student question: what evidence actually makes the page believable?
- Primary outcomes:
  1. identify the strongest artifact or receipt
  2. write a proof block that supports the promise
  3. remove vague claims not backed by evidence
- Required materials:
  1. proof-block examples
  2. proof worksheet
  3. persuasion guardrails
- In-class use:
  1. artifact review
  2. evidence ranking exercise
- Online support:
  1. template download or checklist
  2. peer feedback prompt
- Deliverable:
  1. proof block draft

### 9. `build-and-product-shape`

- Module type: studio
- Student question: what do I actually build from these decisions?
- Primary outcomes:
  1. turn signal and proof into a coherent page stack
  2. structure the first read, evidence, and CTA
  3. avoid shape drift
- Required materials:
  1. homepage skeleton
  2. product-shape examples
  3. build checklist
- In-class use:
  1. build sprint
  2. critique and revision loop
- Online support:
  1. recipes and exemplars
  2. build checklist
- Deliverable:
  1. homepage or product skeleton

### 10. `publish-and-weak-ties`

- Module type: studio
- Student question: how does the work leave the page and start creating opportunity?
- Primary outcomes:
  1. explain why weak ties matter
  2. prepare a basic deployment kit
  3. use follow-up and revision as part of the learning loop
- Required materials:
  1. weak-ties model
  2. publishing templates
  3. follow-up examples
- In-class use:
  1. conversation rehearsal
  2. deployment planning
- Online support:
  1. post template
  2. follow-up script template
- Deliverable:
  1. short post draft
  2. meetup opener
  3. follow-up script

## Multimedia package rule

The project docs make multimedia part of the teaching method rather than decoration.

Each major gallery or long-form module should eventually ship with a media package.

| Package element | Minimum expectation |
| --- | --- |
| quick orientation asset | summary card, hero diagram, or 30 to 60 second audio |
| guided lesson asset | annotated comparison, diagram, chart, or 3 to 5 minute narrated explainer |
| deep companion asset | chaptered 8 to 15 minute audio companion where warranted |
| transcript | required for all audio |
| source anchors | visible references or linked source trail |

The first implementation pass should prioritize media for the gallery family and the why-now module before building media for every route.

## Asset specification rule

Each public-facing asset should have a small production record before it is treated as runtime-ready.

Minimum fields:

1. asset title
2. asset family
3. route or room owner
4. teaching job
5. evidence tier
6. source basis or prompt basis
7. required annotation or transcript notes
8. QA owner
9. runtime readiness state

## Research-to-route asset deployment map

The literature-review media layer already contains assets that should shape the BSEAI experience architecture.

| Site area | Existing or planned assets to use first | Why they belong there |
| --- | --- | --- |
| home and atlas entry | `research-atlas-board.png`, `motivation-to-opportunity-chain.png` | establish the site as a research-backed studio rather than a marketing homepage |
| why-now | `second-renaissance-cover.png`, `second-renaissance-split-scene.png`, AI and labor chart suite, student-readiness chart suite | explain the authority shift, labor shift, and student-condition context |
| philosophy | `whole-person-education-stack.png`, virtue and formation quote rails, updated trivium and quadrivium diagrams | translate the program's formation claim into a legible model |
| archetype atlas | `archetype-coherence-wheel.png`, cluster boards to be authored from the Hero and the Outlaw material, quote rails from identity and archetype papers | help students choose a coherent first-read meaning system |
| visual-design literacy | `first-read-hierarchy-ladder.png`, lineage boards, comparison overlays, annotated historical references | teach how visual language shapes trust and pace |
| trust and persuasion | `trust-and-proof-architecture.png`, ethics cards, dark-pattern warnings, trust-block anatomy diagram | connect influence to proof and ethical limits |
| publish and opportunity | `weak-ties-network-field.png`, NACE skills-based hiring chart, deployment-room posters | show how public work travels into opportunity |
| course wrapper and examples | `student-builder-triptych.png`, `public-work-studio-scene.png`, one full worked exemplar | prove the site is about real student work, not theory alone |

The first chart build sequence should follow the existing media plan:

1. student-readiness mini-suite
2. AI and labor suite
3. historical framing suite
4. governance suite

## Phase 1 outcomes map

This is the first explicit alignment map required by `course_design.md`.

| Starter outcome id | Program or course outcome | Canonical modules that teach it | Primary artifacts or assessments |
| --- | --- | --- | --- |
| `SO-1` | Explain why AI changes the value of judgment, proof, and public capability | `bseai-why-now` | why-now synthesis note |
| `SO-2` | Explain the seven-capacity formation model and identify personal growth areas | `bseai-formation-model` | personal capacity audit |
| `SO-3` | Define audience, need, promise, and dominant signal clearly | `identity-and-signal` | signal brief |
| `SO-4` | Choose and justify a coherent primary archetype as the first-read signal | `archetype-gallery` | archetype decision sheet |
| `SO-5` | Choose and justify a visual lane that supports the intended signal | `visual-design-literacy` | visual lane selection sheet |
| `SO-6` | Use attention, proof, and ethical trust moves to strengthen a public-facing page | `attention-trust-and-persuasion`, `proof-of-work` | trust-and-proof decision board plus proof block |
| `SO-7` | Build a coherent page or product surface that aligns signal, proof, and action path | `build-and-product-shape` | homepage or product skeleton |
| `SO-8` | Publish work into weak ties and use feedback as part of the iteration loop | `publish-and-weak-ties` | deployment kit and reflection |

## Exemplar strategy

The first-site project brief makes one completed student example a non-negotiable deliverable.

The IA should therefore treat exemplars as required evidence infrastructure rather than optional inspiration.

### Release 1 exemplar rule

Ship at least one completed student-like example that includes:

1. signal brief
2. archetype choice
3. style direction
4. proof block
5. homepage skeleton or draft
6. short public post
7. meetup opener
8. follow-up note

Students currently stall because the system explains decisions better than outputs.
The exemplar solves that by showing the chain end to end.

Exemplars should also appear before the dedicated examples route is complete.

Release 1 should place at least one exemplar callout inside:

1. the studio landing
2. the active IS117 wrapper
3. one gallery decision room where students commonly stall

## Phase 2 degree-wide expansion modules

These modules should be added after the first site proves the Phase 1 stack.

| Module id | Module type | Core job | Best first course fit |
| --- | --- | --- | --- |
| `systems-and-organizations` | foundation concept | teach students how products live inside institutions, workflows, and actors | IS265 |
| `interactive-product-construction` | studio | turn the page into an interactive workflow or application | IS218 |
| `data-and-information-architecture` | studio | teach schema, data structure, retrieval, and IA through build and application work | IS331 |
| `product-discovery-and-requirements` | studio | move from ambiguity to a requirements package | IS390 |
| `enterprise-ai-orchestration` | studio | teach LLM application building, orchestration, evaluation, and deployment notes | IS425 |
| `workflow-change-and-adoption` | studio | connect systems to business-process redesign and adoption through applied workflow redesign | IS455 |
| `advanced-depth-module` | variable | support the final distinctive edge of the degree | selected advanced IS course |

## Course-wrapper architecture

Course wrappers are where `course_design.md` becomes concrete.

## Atlas use rules for course wrappers

Atlas rooms should support teaching without overwhelming the wrapper path.

Use these wrapper statuses explicitly.

| Atlas use status | Meaning | Wrapper rule |
| --- | --- | --- |
| required in wrapper | students must use this atlas room to complete the current assignment or discussion | place directly in the weekly path |
| recommended support | the room strengthens judgment but is not necessary for minimum forward motion | place as recommended support, not as a required gate |
| optional depth | the room is for enrichment, advanced curiosity, or later reuse | keep off the core weekly checklist |

The theory-to-action rule governs all three statuses.

No atlas room should be assigned in a wrapper unless the instructor can name the artifact, discussion move, or decision it improves.

## Course entry layer specification

Every course wrapper must begin with an entry layer that satisfies the start-here rule in `course_design.md`.

That entry layer should include:

1. welcome or start-here page
2. course purpose and real-world relevance
3. instructor introduction and presence statement
4. syllabus or syllabus link
5. schedule with consistent due-date rhythm
6. explanation of how the week works in face-to-face, hybrid, and online contexts
7. submission and communication rules
8. support links and technology help

Every course wrapper should contain:

1. course welcome and start-here block
2. course purpose and relevance
3. course outcomes
4. weekly module index
5. due-date rhythm
6. submission paths
7. discussion, critique, and office-hour rules
8. instructor communication and feedback expectations
9. support and accessibility guidance

## Wrapper-level outcomes map rule

Every course wrapper should include one visible table that shows:

1. course outcomes
2. which weekly modules teach each outcome
3. where each outcome is assessed

The canonical module pages define module outcomes.
The wrapper page is responsible for showing how those outcomes roll up into the course.

## Wrapper template

Each weekly wrapper page should follow this order:

1. week title and date range
2. this week in one paragraph
3. module outcomes
4. required materials
5. in-class plan
6. online support or follow-up work
7. deliverable and due date
8. success criteria or rubric link
9. next week preview

## Reusable weekly module template

This is the standard weekly wrapper shape the site should reuse across courses.

| Section | Required content | Why it exists |
| --- | --- | --- |
| week header | week number, title, date range | creates weekly legibility |
| week overview | one short paragraph explaining the point of the week | gives context before the details |
| outcomes | measurable weekly outcomes in student language | keeps the week aligned to assessment |
| required materials | reading, watching, reviewing, or preparing | makes preparation concrete |
| in-class plan | lecture, workshop, critique, lab, discussion, or demo | distinguishes room activity from online support |
| online support | follow-up prompts, recordings, reflection, Q&A, discussion, or templates | applies the translation rule from `course_design.md` |
| deliverables | what gets submitted or shown this week | ties work to action |
| assessment criteria | rubric, checklist, or success criteria | makes expectations visible |
| next move | what the learner should be ready for next | keeps continuity strong |

## What belongs in the canonical module versus the course wrapper

| Keep in the canonical module | Keep in the course wrapper |
| --- | --- |
| stable explanation of the idea | date-specific instructions |
| reusable examples and visuals | week number and deadline |
| durable outcomes | submission links |
| worksheets and templates that many courses can reuse | instructor note for this section or cohort |
| default activity suggestions | class-specific activity plan |
| artifact model | grading expectations and point values |

## Example translation for IS117

IS117 should be the first thin wrapper around the canonical module system.

It should not rewrite the modules.

It should sequence them clearly.

| Week band | Primary module focus | In-class emphasis | Online support | Main output |
| --- | --- | --- | --- | --- |
| week 0 | `bseai-orientation` | course launch and site walkthrough | welcome page and start-here checklist | orientation completion |
| week 1 | `bseai-why-now` and `bseai-formation-model` | why-now discussion and capacity audit | reflection prompt | why-now note plus self-audit |
| weeks 2-3 | `identity-and-signal` | workshop and peer critique | worksheet and examples | signal brief |
| week 4 | `archetype-gallery` | compare archetypes and lock a first-read signal | compare tools and decision sheet | archetype decision sheet |
| weeks 5-6 | `visual-design-literacy` | lineage comparison and style decision | gallery review | visual lane sheet |
| weeks 6-7 | `attention-trust-and-persuasion` | page audit and trust critique | pattern board | trust-and-proof decision board |
| weeks 7-8 | `proof-of-work` | artifact ranking and caption writing | proof template | proof block |
| weeks 8-10 | `build-and-product-shape` | build sprint and feedback | recipes and examples | homepage skeleton |
| weeks 11-12 | `publish-and-weak-ties` | deployment planning and rehearsal | post and follow-up templates | deployment kit |
| weeks 13-15 | revision and showcase wrapper | critique, polish, public presentation | reflection and final checklist | revised final portfolio surface |

## IS117 outcome and assessment alignment map

This makes the wrapper logic explicit instead of leaving it implied.

| IS117 outcome | Week bands | Canonical modules | Main formative checks | Main assessed artifact |
| --- | --- | --- | --- | --- |
| explain why public proof matters in the AI era | week 1 | `bseai-why-now`, `bseai-formation-model` | discussion and reflection | why-now note plus self-audit |
| define audience, need, promise, and signal | weeks 2-3 | `identity-and-signal` | workshop critique | signal brief |
| choose and justify a coherent public signal | week 4 | `archetype-gallery` | compare critique | archetype decision sheet |
| choose and justify a visual lane | weeks 5-6 | `visual-design-literacy` | comparison critique | visual lane sheet |
| use trust and proof intentionally | weeks 6-8 | `attention-trust-and-persuasion`, `proof-of-work` | page audit and evidence ranking | trust-and-proof board plus proof block |
| build a coherent public-facing page | weeks 8-10 | `build-and-product-shape` | build check-ins | homepage skeleton or page draft |
| deploy the page into weak ties and iterate | weeks 11-15 | `publish-and-weak-ties` plus revision wrapper | rehearsal and peer review | deployment kit plus revised final artifact |

## Assessment scaffold

The BSEAI site should support a four-level scaffold.

### Level 1: low-stakes comprehension and orientation

Examples:

1. pathway choice
2. short why-now response
3. self-audit

### Level 2: decision artifacts

Examples:

1. signal brief
2. archetype decision sheet
3. visual lane selection sheet
4. trust-and-proof decision board

### Level 3: build artifacts

Examples:

1. proof block
2. homepage skeleton
3. page draft

### Level 4: deployment and public proof

Examples:

1. post draft
2. follow-up script
3. published artifact and reflection

## Assessment milestone pattern

To stay aligned with `course_design.md`, major work should never appear as one undivided assignment dump.

The default pattern should be:

1. explanation and example
2. low-stakes decision artifact
3. critique or feedback checkpoint
4. build artifact
5. revision
6. public-facing or summative submission

## Interaction architecture

The site should support these interaction patterns across course wrappers.

1. weekly instructor overview or announcement
2. structured critique during studio modules
3. public question pathway such as an ask-the-instructor forum
4. peer response at signal, proof, build, and publish stages
5. explicit feedback timing and office-hour rhythm

The public module pages can suggest these patterns, but the wrapper pages must specify them.

## Deployment-pattern architecture

The project deployment note adds a stronger real-world structure for the publish logic.

The publish and promote layer should teach five durable room types rather than a random list of events.

1. builder room
2. workshop room
3. networking room
4. governance room
5. career room

Every deployment-oriented module or wrapper should help the student answer:

1. which room fits my current artifact
2. what one-sentence signal should I use there
3. what proof should I show
4. what follow-up should I send within 24 hours

## Recommended interaction rhythm for wrappers

| Interaction touchpoint | Recommended rhythm | Purpose |
| --- | --- | --- |
| instructor overview | once per week | keeps the instructor voice visible |
| ask-the-instructor pathway | always open | replaces informal hallway clarification when needed |
| peer critique | at every major decision or build stage | turns interaction into a designed part of learning |
| artifact feedback | within a stated response window | makes revision possible before the next milestone |
| office hours or help session | weekly | gives continuity and escalation support |
| showcase or synthesis reflection | end of unit or milestone | turns completion into integration rather than mere submission |

## Accessibility and support architecture

Every canonical module and course wrapper should assume:

1. readable headings and short sections
2. strong contrast and legible typography
3. alt text and captions for visuals and media
4. descriptive links
5. clear instructions for tools or templates
6. visible support links for technology and course help

They should also assume cognitive accessibility.

That means:

1. summary before depth in atlas and gallery rooms
2. one clear takeaway block before dense evidence clusters
3. long description for complex charts or diagrams when a short alt text is not enough
4. transcripts and captions attached to every audio or narrated asset
5. section density low enough that the page can be skimmed before it is studied

## Accessibility and support checklist

Use this checklist during authoring and QA.

| Check | Canonical module | Course wrapper |
| --- | --- | --- |
| clear heading hierarchy | required | required |
| measurable outcomes visible | required | required |
| media has captions or transcript pathway | required | required |
| visuals have alt text or long description when needed | required | required |
| links use descriptive text | required | required |
| assignment instructions are explicit | recommended | required |
| due dates and submission path are visible | not required | required |
| support and technology help links are visible | recommended | required |
| instructor presence is visible | recommended | required |
| page can be understood without live explanation only | required | required |

## Content governance rules

1. Stable module doctrine belongs in `content/` once promoted.
2. Active IA and wrapper planning can live in `docs/_ux/` until the content model is ready.
3. Public routes should not accumulate week-specific instructions.
4. Course wrappers should not rewrite canonical module content unless there is a true course-specific reason.
5. The module library should grow slowly and intentionally; do not create a module every time a page idea appears.

Asset governance rules:

1. assets move through four states: `briefed`, `concept-generated`, `approved`, `runtime-ready`
2. only `approved` and `runtime-ready` assets should be referenced in release planning
3. evidence visuals must carry their source trail before reaching `approved`
4. audio cannot reach `runtime-ready` without transcript and review notes

## First implementation priority

The first BSEAI build should prioritize:

1. the top-level route structure
2. the Phase 1 module library
3. the IS117 course wrapper
4. the studio sequence and artifacts
5. the gallery family as decision support for the core path
6. one full worked exemplar that proves the artifact ladder is real
7. a first atlas slice that turns the literature-review corpus into curated rooms rather than hidden research files
8. the highest-value diagrams and chart cards from the existing media inventory

It should defer:

1. a giant module archive
2. wrappers for every spine course at once
3. a large exemplar library before the exemplars exist
4. AI feedback features that distract from the core instructional architecture

## Bottom line

The right information architecture for BSEAI is not a flat sitemap.

It is a three-layer teaching system:

1. a small public route tree that stays legible
2. a reusable module library that carries the durable learning logic
3. course wrappers that turn those modules into weekly, teachable, assessable experiences aligned with `docs/_ux/course_design.md`

That is the structure that lets the site stay coherent for the public while remaining useful to instructors and students inside real courses.
