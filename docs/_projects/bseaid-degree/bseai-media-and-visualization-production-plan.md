# BSEAI Media and Visualization Production Plan

## Status

- Status: active production-planning brief
- Scope: diagrams, charts, images, long-form audio, and related asset workflows for the BSEAI site
- Parent docs: `docs/_projects/bseaid-degree/degree-positioning.md`, `docs/_projects/bseaid-degree/bseai-content-production-blueprint.md`, `docs/_ux/bseai-site-information-architecture.md`, `docs/_projects/identity-first-site/multimedia-delivery-strategy.md`

## Purpose

Turn the current research corpus, generated concept assets, and `eai` tooling into a production-ready media system for the site.

This document answers five questions:

1. what kinds of assets the BSEAI site should publish
2. which routes need which visual and audio packages
3. which assets already exist versus which need production
4. which `eai` commands are usable now for image and audio generation
5. what the first production sequence should be

## Capability baseline

### Confirmed `eai` generation commands

The current environment confirms these usable commands:

1. `eai image`
2. `eai speak`
3. `eai transcribe`
4. `eai transcribe_video`
5. `eai multi_vision`
6. `eai vision`

### Image generation capability

`eai image` currently supports:

1. `gpt-image-1`
2. landscape, portrait, square, and auto sizing
3. quality selection including `auto`
4. prompt enhancement by default
5. variations from 1 to 6
6. variation strategies: `creative`, `technical`, `style`, `mixed`
7. presets including `artistic`, `portrait`, `landscape`, `square`, and `hd`
8. batch prompt input

### Audio generation capability

`eai speak` currently supports:

1. OpenAI TTS generation from direct text or input file
2. voices including `alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer`, `ash`, `ballad`, `coral`, `sage`, and `verse`
3. models `tts-1` and `tts-1-hd`
4. audio formats `mp3`, `opus`, `aac`, `flac`, `wav`, and `pcm`
5. pacing and pronunciation instructions
6. streaming generation

### ElevenLabs status

The `eai elevenlabs` command surface exists, including `speak`, `list-models`, and `list-voices`.

However, the current environment does not have an ElevenLabs API key configured, so the production plan should assume OpenAI TTS via `eai speak` as the active audio path.

If ElevenLabs is configured later, it can become an alternate narration path for premium or character-specific voice tracks.

## Working doctrine

The site should not use media as decoration.

Every asset should do at least one of these jobs:

1. establish atmosphere and seriousness quickly
2. compress a system or argument into one readable visual
3. help the student compare options and make a decision
4. anchor a claim in real evidence
5. make long-form material reviewable away from the screen
6. prove what a strong output looks like

The media system should feel like a curated exhibition with a studio attached.

## Asset specification template

Every asset should carry a small production brief before it is made or placed.

Minimum fields:

1. asset title
2. asset family
3. route or room owner
4. story question or teaching job
5. evidence tier
6. source basis or prompt basis
7. required caption, annotation, or transcript note
8. accessibility note
9. QA owner
10. state: `briefed`, `concept-generated`, `approved`, or `runtime-ready`

## Evidence tiers and labeling doctrine

The site will mix evidence visuals and synthetic concept assets, so the distinction must stay visible.

| Tier | Meaning | Labeling rule |
| --- | --- | --- |
| verified evidence | checked, source-backed material | may support a public claim directly |
| interpreted synthesis | curated interpretation of multiple sources | should point back to source anchors |
| concept asset | editorial illustration, speculative board, or atmosphere image | should never be mistaken for documentary evidence |

## Asset families

### 1. System diagrams

Job:
Explain the project's models and operating logic in a form that can be grasped quickly.

Best current inputs:

1. `docs/_content/literature-review/media/chart-plans/diagram-inventory.md`
2. `docs/_content/literature-review/media/generated-assets-manifest.md`
3. `docs/_research/mysystem.md`
4. `docs/_research/identity-system-core.md`

### 2. Evidence charts

Job:
Support the site's major claims about AI, labor, student readiness, governance, and historical change.

Best current inputs:

1. `docs/_content/literature-review/media/chart-plans/data-chart-inventory.md`
2. `docs/_content/literature-review/institutions/*`
3. `docs/_content/literature-review/references/*`

### 3. Editorial illustrations and concept images

Job:
Create atmosphere, mark transitions between major rooms, and keep the site from feeling like a chart-only deck.

Best current inputs:

1. `docs/_content/literature-review/media/image-briefs/editorial-illustration-prompts.md`
2. `docs/_content/literature-review/media/image-briefs/branding-and-system-prompts.md`
3. `docs/_content/literature-review/media/generated/`

### 4. People and scene images

Job:
Make students, mentors, studios, and public work visible as human practice instead of abstraction.

Best current inputs:

1. `docs/_content/literature-review/media/image-briefs/people-and-portrait-prompts.md`
2. existing generated people images in `docs/_content/literature-review/media/generated/people/`

### 5. Comparison boards and exhibit panels

Job:
Teach by contrast and diagnosis, especially in the archetype, design-literacy, and trust/persuasion rooms.

Best current inputs:

1. Hero and the Outlaw chapter candidates
2. literature-review idea papers
3. existing gallery project briefs

### 6. Long-form audio companions

Job:
Make dense material reviewable and reinforce instructor or program voice.

Best current inputs:

1. `docs/_projects/identity-first-site/multimedia-delivery-strategy.md`
2. literature-review synthesis and idea papers
3. source transcript infrastructure in `docs/_research/books/transcripts/`

## Existing assets ready for first deployment

These assets already exist and should be treated as the first production set.

### Branding and hero assets

1. `research-atlas-board.png`
2. `identity-portfolio-signal-poster.png`
3. `second-renaissance-cover.png`

### Illustrations and diagrams

1. `second-renaissance-split-scene.png`
2. `signal-to-opportunity-loop.png`
3. `trust-and-proof-architecture.png`
4. `weak-ties-network-field.png`
5. `motivation-to-opportunity-chain.png`
6. `whole-person-education-stack.png`
7. `archetype-coherence-wheel.png`
8. `crisis-to-agency-data-scene.png`
9. `governance-workspace-overhead.png`
10. `first-read-hierarchy-ladder.png`

### People and scene assets

1. `student-builder-triptych.png`
2. `research-mentor-portrait.png`
3. `public-work-studio-scene.png`

## Core production gaps

The current media layer is strong, but it is still missing several asset classes the IA now expects.

### Missing high-priority diagram and board types

1. archetype cluster map from the Hero and the Outlaw part structure
2. motivation grid for archetype positioning
3. archetype gift-trap-shadow board
4. proof-style matrix by archetype family
5. deployment room map: builder, workshop, networking, governance, career
6. homepage anatomy board tied to first-read and trust patterns
7. student exemplar walkthrough board

### Board inventory priority by room

These boards should be produced in room order rather than as isolated visual requests.

| Board family | First destination | Teaching job | Priority |
| --- | --- | --- | --- |
| archetype cluster map | archetype and identity gallery | turn the atlas into a navigable decision system | high |
| archetype gift-trap-shadow board | archetype and identity gallery | connect archetype choice to likely misuse and behavioral risk | high |
| proof-style matrix by archetype family | Studio and archetype gallery | connect identity choice to proof choice | high |
| design lineage compare board | visual-design literacy gallery | translate historical movements into homepage decisions | high |
| homepage anatomy board | build and visual-design literacy | make first-read hierarchy and trust placement concrete | high |
| trust block anatomy board | trust and persuasion room | standardize proof placement and ethical influence | high |
| deployment room map | publish and opportunity room | match artifact strength to real public rooms | high |
| student exemplar walkthrough board | Studio, IS117, and seeded examples | prove the artifact ladder end to end | high |

### Missing chart packages

1. student-readiness mini-suite as finished charts
2. AI and labor mini-suite as finished charts
3. print-to-AI authority-shift timeline/chart set
4. governance stack visualization drawn from NIST AI RMF

### Missing audio packages

1. narrated why-now overview
2. narrated formation overview
3. archetype cluster intro audio series
4. visual-design literacy movement explainers
5. trust and persuasion principle explainers
6. publish and deployment companion audio

## Route-by-route media plan

### Home

Purpose:
Establish the site as a serious, visual, research-backed studio in under one minute.

Required assets:

1. one hero brand image
2. one system diagram
3. one student-facing atmosphere image
4. one short orientation audio

Recommended first assets:

1. `research-atlas-board.png`
2. `motivation-to-opportunity-chain.png`
3. `student-builder-triptych.png`
4. 45-second audio: `What this site is and how to use it`

### Why Now

Purpose:
Explain the AI-era shift and why public proof matters now.

Required assets:

1. one hero image
2. one historical comparison image
3. four-chart mini-suite
4. one 4- to 6-minute narrated overview

Recommended first assets:

1. `second-renaissance-cover.png`
2. `second-renaissance-split-scene.png`
3. AI adoption and investment trend
4. AI exposure by occupation
5. generative AI value by function
6. employer use of skills-based hiring
7. audio: `Why the economics of skill have changed`

### Formation

Purpose:
Explain the whole-person model and why the degree is not only tool training.

Required assets:

1. one stack diagram
2. one supporting chart pair about student conditions
3. one mentor or studio image
4. one 5-minute narrated explainer

Recommended first assets:

1. `whole-person-education-stack.png`
2. student sadness and hopelessness chart
3. teen near-constant internet use chart
4. `research-mentor-portrait.png`
5. audio: `Why formation matters under AI abundance`

### Atlas

Purpose:
Turn the literature-review corpus into curated rooms rather than hidden files.

Required assets:

1. room-intro visuals
2. quote rails
3. one diagram or comparison board per room
4. one optional deep companion audio per major room

Recommended room set:

1. motivation and need
2. identity and archetypes
3. perception and first read
4. trust and ethical influence
5. weak ties and opportunity
6. second renaissance and educational redesign
7. virtue and whole-person formation

### Archetype and identity gallery

Purpose:
Help students choose a coherent first-read identity.

Required assets:

1. archetype atlas landing visual
2. motivation grid
3. four cluster boards
4. compare cards for commonly confused archetypes
5. primary choice worksheet
6. 60- to 90-second cluster audio intros
7. one 8- to 12-minute companion audio for the full atlas

Recommended first assets:

1. `archetype-coherence-wheel.png`
2. new `archetype-cluster-map`
3. new `archetype-gift-trap-board`
4. new `archetype-proof-style-matrix`

### Visual-design literacy gallery

Purpose:
Teach how visual lineages change hierarchy, trust, pace, and meaning.

Required assets:

1. lineage timeline
2. movement compare boards
3. annotated interface overlays
4. first-read hierarchy diagram
5. 3- to 5-minute narrated movement explainers
6. one deep audio companion for the full lineage survey

Recommended first assets:

1. `first-read-hierarchy-ladder.png`
2. new `bauhaus-to-swiss-to-product-systems timeline`
3. new `poster-to-homepage translation boards`

### Psychology, attention, and persuasion gallery

Purpose:
Teach attention, scanning, proof placement, and ethical influence through real page problems.

Required assets:

1. trust and proof core diagram
2. scanning or reading-path boards
3. dark-pattern guardrail cards
4. page audit comparison boards
5. narrated principle explainers

Recommended first assets:

1. `trust-and-proof-architecture.png`
2. `first-read-hierarchy-ladder.png`
3. new `trust-block anatomy board`
4. new `ethical influence boundary chart`

### Studio and IS117 wrapper

Purpose:
Make the build sequence feel concrete and actionable.

Required assets:

1. workbook-facing system diagram
2. one worked exemplar panel per major milestone
3. one studio scene image
4. short week-intro audio where useful

Recommended first assets:

1. `signal-to-opportunity-loop.png`
2. `public-work-studio-scene.png`
3. `student-builder-triptych.png`
4. new `homepage anatomy board`
5. new `worked exemplar walkthrough board`

### Publish and opportunity layer

Purpose:
Show how the portfolio leaves the page and moves through real rooms and weak ties.

Required assets:

1. network diagram
2. deployment room map
3. skills-based-hiring evidence card
4. one deployment companion audio

Recommended first assets:

1. `weak-ties-network-field.png`
2. NACE skills-based hiring chart
3. new `deployment-room map`
4. audio: `How to use your site in public without sounding fake`

## Diagram production plan

### Tier 1 diagrams

These should be finished first because they are central to both the site and the course path.

| Diagram | Current status | Best source docs | Best first destination |
| --- | --- | --- | --- |
| motivation to opportunity chain | concept asset exists | `mysystem.md`, `identity-system-core.md` | home, course overview |
| need to publish loop | needs production | `identity-system-student-handout.md`, `mysystem.md` | worksheet and start route |
| archetype coherence model | concept asset exists | identity and archetype papers | archetype gallery |
| archetype cluster map | needs production | Hero and the Outlaw part structure | archetype atlas |
| first-read hierarchy ladder | concept asset exists | perception and attention paper | style and trust rooms |
| trust block anatomy | needs production | trust and persuasion paper | proof route and psychology gallery |
| weak-ties opportunity system | concept asset exists | signaling and weak ties paper | publish route |
| whole-person education stack | concept asset exists | second-renaissance and virtue papers | philosophy and formation |

### Tier 2 diagrams

| Diagram | Current status | Best first destination |
| --- | --- | --- |
| second-renaissance institutional shift | needs production | why-now and atlas |
| deployment room map | needs production | publish route |
| homepage anatomy board | needs production | build route |
| exemplar walkthrough board | needs production | examples and IS117 |
| archetype gift-trap-shadow board | needs production | archetype atlas and critique |

### Build method

1. prototype in Mermaid or Figma when the structure matters most
2. move to `eai image` when the final need is more editorial, atmospheric, or presentation-oriented
3. keep labels and cited data out of image-generation prompts when precise typography is required; add those in post-production

## Chart production plan

### Chart suite 1: student readiness

Charts:

1. student sadness and hopelessness
2. teen near-constant internet use
3. college readiness benchmark attainment
4. NAEP reading trend

Use:

1. formation page
2. why-now page
3. executive presentations

### Chart suite 2: AI and labor

Charts:

1. AI exposure by occupation
2. generative AI value by business function
3. employer use of skills-based hiring
4. AI adoption and investment trend

Use:

1. why-now page
2. atlas evidence cards
3. degree framing pages

### Chart suite 3: historical framing

Charts:

1. print adoption and city growth
2. print-to-AI comparison matrix

Use:

1. why-now page
2. atlas historical room

### Chart suite 4: governance

Charts:

1. governance stack map
2. NIST function ladder or matrix

Use:

1. responsible AI sections
2. later course and enterprise pages

### Chart rules

1. charts should be redrawn from cited values, never image-generated from prompts alone
2. every finished chart should have an extraction sheet with values, source URL, and retrieval date
3. each chart should answer one visible story question on the page

### Chart-card template

Every chart should ship with a consistent card structure.

1. story question
2. one-sentence takeaway
3. chart caption
4. source line with retrieval date
5. accessibility note or long description path when needed

## Image production plan

### Reuse first

The site should first reuse and place the strongest concept assets already generated.

### Commission next

The next image-generation wave should produce:

1. archetype cluster posters
2. design lineage mood boards
3. trust and proof board backgrounds
4. deployment room posters
5. more student-builder and public-work scenes
6. atlas room covers for the seven idea clusters

### `eai image` usage pattern

Use these defaults unless a route needs something else:

1. `--size 1536x1024` for hero and landscape editorial images
2. `--size 1024x1536` for posters and vertical covers
3. `--quality auto` or `high`
4. `--preset artistic` for editorial illustrations
5. `--variations 4 --variation-strategy style` when choosing art direction

### Generation modes by asset type

| Asset type | Recommended `eai image` approach |
| --- | --- |
| hero illustration | `--preset artistic --size 1536x1024 --quality high` |
| poster or cover | `--size 1024x1536 --quality high` |
| art-direction exploration | `--variations 4 --variation-strategy mixed` |
| technical board background | `--variation-strategy technical --no-enhance` only when precise control matters |

## Audio production plan

### Working decision

Use `eai speak` with OpenAI TTS as the active production path now.

Treat ElevenLabs as optional later because its key is not currently configured.

### Voice architecture

Use a small, consistent voice system.

| Audio type | Recommended voice and model | Reason |
| --- | --- | --- |
| site orientation and main explainers | `nova` with `tts-1-hd` | clear, warm, and credible for instructional narration |
| reflective or formation-oriented pieces | `sage` with `tts-1-hd` | slightly more deliberate tone for philosophical content |
| quick utility clips | `alloy` with `tts-1` | fast and efficient for short prompts |

### Audio formats

1. publish `mp3` for general site use
2. keep `flac` or `wav` only when an archival master is necessary
3. use `opus` only when streaming or low-latency preview matters

### Audio package types

| Package type | Length | Use case |
| --- | --- | --- |
| orientation clip | 30 to 60 seconds | home, route intros, quick recap |
| guided lesson | 3 to 5 minutes | gallery and atlas room explanation |
| long-form companion | 8 to 15 minutes | deeper review while walking or commuting |
| source encounter | 12 to 20 minutes, chaptered | carefully adapted source-based synthesis, not raw text dump |

### Audio selection rubric

Use audio only when it improves the learning job.

| Audio decision | Use when | Do not use when |
| --- | --- | --- |
| no audio | the visual or written page is already fast and legible | narration would only repeat the page |
| short orientation clip | the learner needs a quick welcome, recap, or route introduction | the topic requires sustained explanation |
| guided lesson | the learner benefits from spoken sequencing through a dense concept | the topic is better taught as a comparison board alone |
| long-form companion | the room has enough conceptual density to justify review away from screen | the content is still too rough or too close to raw prose |

### Script package template

Every guided lesson or long-form audio piece should include:

1. working title
2. intended audience
3. learning job
4. chapter map
5. spoken script
6. paired visual or board
7. transcript note
8. pronunciation or pacing note

### First audio slate

1. `What this site is and how to use it`
2. `Why AI changes the value of proof`
3. `Why formation matters now`
4. `How to choose a primary archetype`
5. `How pages earn trust on the second look`
6. `How to use your site in public`

### Long-form audio rules

1. do not read dense prose unchanged when a spoken rewrite would teach better
2. never publish audio without a transcript
3. chapter any audio longer than 6 minutes
4. pair each audio with a visual anchor or note map
5. use instructions for pacing and pronunciation explicitly

### `eai speak` usage pattern

Recommended baseline:

```bash
eai speak --input script.txt --output lesson.mp3 --voice nova --model tts-1-hd --format mp3 --instructions "Speak clearly, slightly slower than normal, with calm instructional pacing and light emphasis on key terms."
```

For reflective formation pieces:

```bash
eai speak --input script.txt --output reflection.mp3 --voice sage --model tts-1-hd --format mp3 --instructions "Use a thoughtful, steady tone with measured pacing and clear paragraph breaks."
```

## Production workflow

### Diagram workflow

1. define the story question
2. sketch the structure in Mermaid or on paper
3. confirm the information hierarchy
4. generate or design the final visual
5. add labels, citations, and accessibility notes

### Chart workflow

1. create extraction sheet
2. verify source values and retrieval date
3. draw chart in a controlled charting tool
4. write chart caption and one-sentence takeaway
5. place near the claim it supports

### Image workflow

1. write prompt from the appropriate image-brief family
2. run 3 to 4 variations when choosing art direction
3. review for tone, clarity, and unwanted artifacts
4. save the selected version and record it in the generated-assets manifest

### Audio workflow

1. draft spoken script
2. shorten for speech rather than page prose
3. generate with `eai speak`
4. review pacing and pronunciation
5. create transcript and chapter list
6. pair with one diagram or board

### Media QA gates

An asset should not move to `approved` without the right review gates.

| Asset family | Required QA gates |
| --- | --- |
| diagram | hierarchy review, label review, accessibility note |
| chart | extraction check, citation check, caption check, long-description check when needed |
| image | tone review, artifact review, labeling check when synthetic |
| audio | script review, pronunciation review, pacing review, transcript review, visual-pairing review |

## File and storage planning

Until a final runtime media pipeline is formalized, use this working split.

1. prompts, briefs, storyboards, and manifests remain under `docs/_content/literature-review/media/`
2. generated concept assets remain under `docs/_content/literature-review/media/generated/`
3. publish-ready site assets should be staged into `public/` when approved for runtime use
4. audio scripts and chapter notes should stay in docs until the final audio publish convention is defined

The state model should stay consistent across asset types.

1. `briefed`: the asset job and source basis are defined
2. `concept-generated`: a first draft or generated candidate exists
3. `approved`: the asset passed content and accessibility review
4. `runtime-ready`: the asset is named, placed, and ready for public use

## First production sequence

### Phase 1: place what already exists

1. assign existing hero images and diagrams to the routes named above
2. finalize the first five diagram placements
3. define the chart-card templates

### Phase 2: build the missing instructional boards

1. archetype cluster map
2. archetype gift-trap board
3. trust block anatomy
4. homepage anatomy board
5. deployment room map

### Phase 3: build the evidence suites

1. student readiness
2. AI and labor
3. historical framing

### Phase 4: publish the first audio slate

1. home orientation clip
2. why-now overview
3. formation overview
4. archetype intro
5. trust overview

### Phase 5: produce the exemplar media set

1. worked homepage walkthrough board
2. proof block close reading
3. publish kit examples
4. companion audio for the exemplar

## Quality bar

1. every visual must explain, compare, or orient
2. every chart must sit near a real claim
3. every image set must support the room mood without becoming generic startup art
4. every long-form audio piece must sound intentionally written for speech
5. the site should feel closer to a museum-grade editorial product than to an LMS handout
6. every evidence asset must be distinguishable from concept art
7. every runtime audio asset must have a transcript and a deliberate pairing with a visual or note map

## Bottom line

The repo already has enough prompts, concept assets, research, and `eai` capability to start a serious media production pass now.

The right move is not to create random visuals one by one.

The right move is to build a coherent media system:

1. diagrams for structure
2. charts for evidence
3. editorial images for atmosphere
4. comparison boards for decision-making
5. long-form audio for review and depth

That is the asset stack most likely to make the BSEAI site feel intelligent, memorable, and teachable.
