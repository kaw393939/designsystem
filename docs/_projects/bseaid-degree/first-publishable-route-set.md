# First Publishable Route Set

## Status

- Status: active route-planning note
- Experience target: first BSEAI selected-release build
- Working experience id: `bseai-program`

## Purpose

Define the smallest publishable BSEAI route set that can ship as a coherent human-first program site without pretending the whole degree and module library are already complete.

## Working rule

The first release should feel intentional and legible.

It should not try to expose every future module, every course, or every support route in the first pass.

## Recommended route family

The BSEAI route family should begin under:

`/experiences/bseai/`

When BSEAI is the selected experience, the root `/` should route or special-case into this family the same way the identity experience does today.

## First publishable route set

| Route id | Href | Page job | Unit strategy | Visual strategy | Release 1 decision |
| --- | --- | --- | --- | --- | --- |
| `experience-bseai` | `/experiences/bseai/` | orient the user to the degree, the story, and the main pathways | create new units `bseai-homepage` and `bseai-program-pillars` | create later visual brief `bseai-program-hero`; acceptable to launch with strong editorial layout first | include |
| `experience-bseai-why-now` | `/experiences/bseai/why-now/` | explain why this degree exists now and why AI is an institutional shift | reuse `print-to-ai-knowledge-shift`; add a new bridge unit `bseai-why-now` for degree-specific framing | reuse `renaissance-to-ai-hero` and `ai-labor-demand-chart` | include |
| `experience-bseai-philosophy` | `/experiences/bseai/philosophy/` | explain the formation model, updated trivium, and updated quadrivium | create new unit `bseai-formation-model` | create later visual brief `bseai-formation-wheel`; launch with diagram/text if needed | include |
| `experience-bseai-course-spine` | `/experiences/bseai/course-spine/` | show the eight-course story, artifact ladder, and role logic | create new unit `bseai-course-spine-overview` | create later visual brief `bseai-course-artifact-ladder` | include |
| `experience-bseai-studio` | `/experiences/bseai/studio/` | explain why portfolio and public practice are part of the degree and route students into the live studio path | create new unit `bseai-studio-introduction`; hand off into existing identity portfolio routes | reuse `archetype-signal-map` first; add richer studio visuals later | include |
| `experience-bseai-modules` | `/experiences/bseai/modules/` | present the canonical reusable module library and what each module teaches | create new unit `bseai-module-library` | cards and comparison boards first; no custom hero required for release 1 | include |
| `experience-bseai-course-is117` | `/experiences/bseai/courses/is117/` | tell IS117 students exactly where to start, what to complete, and what artifact to produce | create new unit `is117-path-entry`; link to `choose-primary-archetype` and the identity studio flow | no new bespoke visual required in release 1 | include |

## Existing content to reuse immediately

The first release should reuse the strongest current content rather than duplicate it.

### Reuse these units

1. `print-to-ai-knowledge-shift`
2. `choose-primary-archetype`

### Reuse these visuals

1. `renaissance-to-ai-hero`
2. `ai-labor-demand-chart`
3. `archetype-signal-map`

## New units to author first

Author these units in this order:

1. `bseai-homepage`
2. `bseai-why-now`
3. `bseai-formation-model`
4. `bseai-course-spine-overview`
5. `bseai-studio-introduction`
6. `bseai-module-library`
7. `is117-path-entry`

## Support routes to keep from the current system

The BSEAI site should continue using the existing global support routes instead of rebuilding them immediately.

Keep using:

1. `/recipes/`
2. `/tokens/`
3. `/layouts/`
4. `/primitives/`
5. `/process/`
6. `/status/`

## What to defer from release 1

Do not ship these in the first release unless the underlying content is actually ready:

1. dedicated course pages for every spine course beyond IS117
2. a full exemplar route before the first real exemplar exists
3. a public feedback or AI coaching route
4. employer outcomes or hiring claims that still need validation
5. every future gallery as a fully built route family

## Route-level design rule

Each route should have one dominant job.

1. the homepage orients
2. the why-now page justifies
3. the philosophy page interprets
4. the course-spine page sequences
5. the studio page routes into public practice
6. the modules page catalogs durable learning assets
7. the IS117 page gives the student a clear first-term path

## Release-1 user journey

The intended first user journey should be:

1. open BSEAI home
2. understand why the degree exists now
3. understand the formation model
4. understand the course spine
5. enter the studio
6. if in IS117, open the IS117 path and complete the first artifact sequence

## Success condition

This route set is sufficient if it lets a student move from curiosity about the degree to a concrete first artifact path without needing an instructor to explain the entire architecture first.