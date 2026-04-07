# BSEAI Site Architecture

## Status

- Status: active architecture note
- Repository folder remains `bseaid-degree/` until naming and catalog language are finalized
- Working public label: `BSEAI` site
- System basis: the current selected-release publishing model in `content/`, `lib/site-release.ts`, and the existing experience routes

## Purpose

Define how to build the first BSEAI site using the current `design_system` architecture instead of treating the degree as a separate product that needs a different platform.

## Working decision

Build BSEAI as one selected experience first.

Do not start with:

1. a multi-experience portal
2. a RAG or feedback product
3. a docs archive pretending to be a program site
4. a fully dynamic course platform

Those can come later.
The first job is a human-first BSEAI site that students, parents, faculty, and employers can actually read and understand.

## What the site should be

The BSEAI site should function as the human-facing operating system for the degree.

It should combine:

1. degree explanation
2. philosophy and historical framing
3. reusable module access
4. portfolio and public-practice studio entry
5. course pathways starting with IS117
6. exemplar and proof surfaces over time

## What the site should not be

1. not only a recruiting homepage
2. not only a content library
3. not a hidden internal doctrine folder
4. not a feedback or agent system yet
5. not many disconnected mini-sites fighting each other for identity

## Fit with the current system

The current repo already assumes one selected experience drives:

1. homepage behavior
2. metadata
3. primary navigation
4. sitemap scope
5. route availability
6. release validation

That means the first BSEAI site should be implemented as:

1. one new experience config
2. one new selected release
3. one new route family under `/experiences/bseai/`
4. one root-page special case when BSEAI is the selected experience, the same way identity is treated today

## Recommended site layers

### 1. Program shell

This is the degree-facing layer.

It should answer:

1. what BSEAI is
2. why it exists now
3. what kinds of graduates it forms
4. how the degree differs from a generic AI survey

### 2. Philosophy layer

This is the civilizational and formation layer.

It should answer:

1. why the print-to-AI comparison matters
2. why the program uses a formation model instead of a tool-hype model
3. how the updated trivium and quadrivium shape the degree

### 3. Module layer

This is the durable reusable teaching layer.

These modules should outlive any single course page.

Examples:

1. AI and the second renaissance
2. identity and signal
3. visual design literacy
4. attention, trust, and persuasion
5. proof-of-work and deployment

### 4. Studio layer

This is the public-practice layer.

The portfolio system belongs here.

The key rule is:

The portfolio is not a side assignment beside the degree.
It is the longitudinal public-practice spine that makes the degree visible.

### 5. Course pathway layer

Course pages should be thin wrappers around the canonical modules.

Each course page should answer:

1. which modules matter in this course
2. which artifact the student produces here
3. how the artifact enters the portfolio and the larger degree story

### 6. Example and evidence layer

This is where the system proves itself.

It should eventually include:

1. student exemplars
2. artifact ladders across courses
3. role-target proof patterns
4. examples of strong and weak public signal

## Relationship to current experiences

The current identity and AI proof experiences should be treated as source material for BSEAI, not as competing top-level brands.

### Identity portfolio system

This should become the first serious studio path inside BSEAI.

The BSEAI site should point students into that studio logic rather than rebuilding the portfolio path from zero.

### AI second renaissance

This should become the strongest current “why now” and historical framing module inside BSEAI.

The BSEAI site should absorb that content into the program narrative instead of making it feel like a separate public product.

## Site composition rules

1. Program pages explain the degree and route users forward.
2. Module pages are canonical and reusable across multiple courses.
3. Course pages stay thin and sequence students through the right modules.
4. Studio pages own artifact creation and public-practice routines.
5. Example pages prove the claims with visible artifacts.
6. Philosophy constrains the system; it should not become decorative background copy.

## Recommended first experience configuration

The first working configuration should look like this.

- Experience id: `bseai-program`
- Working title: `BSEAI`
- Route family: `/experiences/bseai/`
- Site mode: hybrid of program, interpretation, and studio
- Core source refs: `bseai`, `renesaince`, `identity`

## First-release boundary

The first release should include:

1. program home
2. why-now page
3. philosophy page
4. course-spine page
5. studio introduction page
6. module library page
7. IS117 entry page

The first release should defer:

1. deep multi-course wrappers beyond IS117
2. a full exemplar library if the exemplar does not exist yet
3. student accounts and AI feedback features
4. employer-facing claims that still need verification
5. a giant browse-everything module archive

## Immediate implementation implications

1. create a `bseai` source record in `content/sources/`
2. create a `bseai-program` experience north-star and config
3. promote the current degree and first-site doctrine into a small first unit set
4. assemble one first release around those units and existing reusable visuals
5. keep `recipes`, `tokens`, `layouts`, `primitives`, `process`, and `status` as global support routes rather than rebuilding them inside BSEAI

## Success condition

The first BSEAI site succeeds if a student can answer these questions quickly:

1. what is this degree trying to form in me
2. why does it exist now
3. how do the courses fit together
4. where do I start in IS117
5. why is the portfolio part of the degree rather than a side task