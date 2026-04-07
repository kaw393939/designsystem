# Identity Portfolio Redesign Migration Plan

## Purpose

Map the current site into the redesigned route system so the implementation can move section by section instead of drifting.

For the exact current-homepage block ledger, use `homepage-section-inventory.md` alongside this plan.

## Response to the homepage critique

This plan explicitly resolves the previously identified problems.

| Problem identified in review | Redesign response |
| --- | --- |
| No clean top-to-bottom student path | create a short core route sequence and move optional depth out of the main scroll |
| Homepage is doing too many jobs | split course intro, build path, labs, examples, and sources into separate routes |
| Pitch repeats before action | compress homepage into one promise, one proof cue, and one CTA |
| Best problem-based content is buried | move page-problem language into dedicated diagnosis and example routes |
| Theory arrives too early | move psychology, archetypes, persuasion, and source library off the main build path |
| Language still feels too smart in places | apply the content doctrine across all rewritten routes |
| Support pages compete with the student journey | keep support routes available but clearly off the core path |

## Current homepage section migration map

| Current section on the identity page | Action | Target route | Reason |
| --- | --- | --- | --- |
| Hero | keep in compressed form | `/experiences/identity-portfolio/` | the start page still needs one promise and one CTA |
| First-screen explanation panel | compress | `/experiences/identity-portfolio/` | keep only the shortest explanation of the page job |
| Why it matters | compress | `/experiences/identity-portfolio/` | keep one reason to care, not a second pitch block |
| Assignment ladder | move | `/experiences/identity-portfolio/build` | the build page should own the assignment path |
| Wayfinding grid | replace | `/experiences/identity-portfolio/` | the start page should route to core path and optional depth, not offer a theory menu |
| Pull insight quote | move | `/experiences/identity-portfolio/system-map` | this belongs on the full-model page, not the start page |
| Studio stories | move | `/experiences/identity-portfolio/examples` | examples deserve their own page and can do more there |
| System map and course map | move | `/experiences/identity-portfolio/system-map` | this is support architecture, not first-step student action |
| Comparison grid | move | `/experiences/identity-portfolio/examples` or `/experiences/identity-portfolio/system-map` | it supports explanation, not the immediate build step |
| Decision studio problem cards | move | `/experiences/identity-portfolio/diagnose` | problem diagnosis should be a dedicated support page |
| Design lineages | move | `/experiences/identity-portfolio/style` | the visual-direction page should own this job |
| Swiss vs brutalist comparison | keep and anchor | `/experiences/identity-portfolio/style` | this is the best quick contrast and should stay central there |
| Psychology principles | move | `/experiences/identity-portfolio/labs/psychology` | optional theory, not core-path content |
| Archetype explorer | move | `/experiences/identity-portfolio/labs/archetypes` | this is a dedicated lab, not homepage content |
| Persuasion patterns | split | `/experiences/identity-portfolio/proof` plus `/experiences/identity-portfolio/labs/persuasion` | keep only proof-critical guidance on the core path |
| Reference library | move | `/experiences/identity-portfolio/sources` | references should sit at the edge, not in the main scroll |
| Guardrails callout | split | `/experiences/identity-portfolio/signal` plus `/experiences/identity-portfolio/style` plus `/experiences/identity-portfolio/system-map` | distribute the doctrine to the routes that actually own the rules |
| Module 1 | move earlier and expand | `/experiences/identity-portfolio/signal` | the signal-choice route should own archetype, audience, and promise before build sequencing starts |
| Build loop | split | `/experiences/identity-portfolio/build` plus `/experiences/identity-portfolio/publish` | keep build-review workflow near production and deployment workflow near circulation |
| Outcomes and audit questions | move | `/experiences/identity-portfolio/build` and `/experiences/identity-portfolio/publish` | split completion criteria from deployment guidance |
| Research basis | move | `/experiences/identity-portfolio/sources` | keep the long-form source trail separate from the assignment flow |

## Support route migration map

| Current route | Keep / revise | New rule |
| --- | --- | --- |
| `/recipes` | keep and revise | one job: help someone borrow a page pattern |
| `/examples/module` | keep and revise | one job: show a module opener pattern |
| `/examples/lesson` | keep and revise | one job: show a lesson pattern |
| `/examples/reading-map` | keep and revise | one job: show a reading-map pattern |
| `/layouts` | keep and revise | one job: help fix structure |
| `/tokens` | keep and revise | one job: help explain why a page feels off or works |
| `/process` | keep and revise | one job: explain how trust is produced |
| `/status` | keep and revise | one job: show done versus pending honestly |

## Implementation phases

### Phase 1: Route contracts

1. create the new route scaffolds
2. assign one dominant job to each route
3. move the current homepage content into target buckets before rewriting copy

### Phase 2: Core path first

1. ship the start page
2. ship signal, style, proof, build, and publish pages
3. make the assignment completable without any lab route

### Phase 3: Optional depth and examples

1. ship diagnose and examples pages
2. ship archetypes, psychology, and persuasion labs
3. move sources and system map off the main path

### Phase 4: Support-page alignment

1. revise recipes, examples, layouts, tokens, process, and status pages so each has one job
2. ensure support routes do not compete with the core student flow

### Phase 5: Audit and QA

1. run a fresh page-by-page student audit
2. confirm each route passes the one-job checklist
3. verify that the start page and build page no longer bury the action under theory

## Acceptance checklist for the migration

1. The root student path can be described in under one sentence per route.
2. A student can reach the build page in one click from the start page.
3. No optional theory page is required to complete the assignment path.
4. Every route has one dominant CTA and one obvious next move.
5. The old homepage section pile no longer exists as one giant scroll.