# Identity Portfolio Homepage Section Inventory

## Purpose

This file is the block-by-block migration ledger for the current identity homepage.

Use it when breaking up `app/experiences/identity-portfolio/page.tsx` into the redesigned route system defined in `spec.md`, `page-jobs.md`, and `migration-plan.md`.

## Scope

- Current implementation file: `app/experiences/identity-portfolio/page.tsx`
- Current route: `/experiences/identity-portfolio/`
- Goal: move the current giant course page into focused routes with one dominant job each

## Page-shell inventory

| Current shell artifact | Current behavior | Action | Target |
| --- | --- | --- | --- |
| `PageShell` + `LessonShell` | wraps the entire course as one long lesson route | keep the shell pattern, but stop using one route as the whole course container | all redesigned routes |
| `localNavItems` | exposes a 13-item on-page table of contents | replace with short route-local navigation or no local nav where it adds clutter | each individual route |
| `progress="Identity Portfolio System / Agentic Web Development"` | mixes course identity and implementation framing | revise so each route names the course plus the current step | all core-path routes |
| `tocTitle="Identity course map"` | implies the whole course lives on one page | remove from the start page and reserve map language for `/experiences/identity-portfolio/system-map` | start page and system-map |

## Top-level section summary

| Order | Current section id | Current job mix | Disposition | Target route |
| --- | --- | --- | --- | --- |
| 1 | `course-overview` | start page, assignment brief, orientation, theory teaser | split | `/experiences/identity-portfolio/`, `/experiences/identity-portfolio/build`, `/experiences/identity-portfolio/system-map` |
| 2 | `student-stories` | examples and transformation proof | move | `/experiences/identity-portfolio/examples` |
| 3 | `course-map` | system overview, module map, concept comparison | move | `/experiences/identity-portfolio/system-map` |
| 4 | `decision-studio` | diagnosis, style lab, psychology lab, archetype lab, persuasion lab, source library, doctrine | split | `/experiences/identity-portfolio/diagnose`, `/experiences/identity-portfolio/style`, `/experiences/identity-portfolio/labs/*`, `/experiences/identity-portfolio/sources` |
| 5 | `module-one` | signal-choice lesson and prep | move | `/experiences/identity-portfolio/signal` |
| 6 | `build-loop` | build-review workflow plus deployment guidance | split | `/experiences/identity-portfolio/build`, `/experiences/identity-portfolio/publish` |
| 7 | `outcomes` | audit rubric, outputs, reflection, next step | split | `/experiences/identity-portfolio/build`, `/experiences/identity-portfolio/publish` |
| 8 | `sources` | research basis and source trail | move | `/experiences/identity-portfolio/sources` |

## Detailed block ledger

### 1. `course-overview`

| Current block | Current component or source | Current job | Disposition | Target route | Rewrite note |
| --- | --- | --- | --- | --- | --- |
| Hero | `LessonHero` | announce the course and open the path | compress | `/experiences/identity-portfolio/` | keep one promise, one proof cue, and one primary CTA; reduce the metadata stack |
| First-screen explanation panel | `SplitLayout` + `TonePanel` + `studentStoryItems` portrait badges | explain what the first screen should do and humanize the page | split | `/experiences/identity-portfolio/` and `/experiences/identity-portfolio/examples` | keep one human proof cue on the start page; move the full story set to examples |
| Before-after visual | `PortfolioComparisonVisual` | show the difference between generic polish and clear signal | keep | `/experiences/identity-portfolio/` | this is a strong start-page proof cue and should stay near the hero |
| Stakes panel | `WhyItMatters` | explain why the problem matters | compress | `/experiences/identity-portfolio/` | keep one short stakes block only |
| AI pressure panel | `AIPortfolioPressureMap` inside the second split layout | explain market pressure and why polish is not enough | move | `/experiences/identity-portfolio/system-map` | keep one line of stakes on the start page and move the full visual off the first route |
| Assignment ladder intro | `SectionHeading` and paragraph in `assignment-ladder` | introduce the short path | move | `/experiences/identity-portfolio/build` | the assignment path belongs on the build route, not the start page |
| Five-step assignment timeline | `SequenceTimeline` with `assignmentLadderItems` | define the required build sequence | move | `/experiences/identity-portfolio/build` | this should become the backbone of the build route |
| Minimum outputs grid | `SummaryGrid` with `assignmentDeliverableItems` | clarify what the student leaves with | move | `/experiences/identity-portfolio/build` | keep as a build-route checklist or completion summary |
| Wayfinding grid | `ConceptGrid` with `wayfindingItems` | offer too many equal-priority paths | replace | `/experiences/identity-portfolio/` | rebuild this as a smaller start-page router: one core CTA, one secondary build CTA, and limited optional depth |
| Pull insight quote | `PullInsight` | summarize the whole research pipeline | move | `/experiences/identity-portfolio/system-map` | good system-map material, not first-screen student action |

### 2. `student-stories`

| Current block | Current component or source | Current job | Disposition | Target route | Rewrite note |
| --- | --- | --- | --- | --- | --- |
| Stories intro | `SectionBlock` | frame the stories as page-problem examples | move | `/experiences/identity-portfolio/examples` | tighten into a short examples-page intro |
| Story cards | `ContentGrid` built from `studentStoryItems` | show transformation through three composite cases | move | `/experiences/identity-portfolio/examples` | these should anchor the examples route; optionally reuse one teaser card on the start page |

### 3. `course-map`

| Current block | Current component or source | Current job | Disposition | Target route | Rewrite note |
| --- | --- | --- | --- | --- | --- |
| System-map intro | `SectionBlock` with `id="system-map"` | explain the whole model | move | `/experiences/identity-portfolio/system-map` | this becomes the system-overview page intro |
| Progress visual | `ProgressPathVisual` | show the path from signal to deploy | move | `/experiences/identity-portfolio/system-map` | keep as an overview graphic |
| Module roadmap cards | `ContentGrid` with `moduleRoadmapItems` | summarize the four module stages | move | `/experiences/identity-portfolio/system-map` | use as route previews or system-overview cards |
| Seven-layer model | `MediaBlock` with `IdentitySystemDiagram` | visualize the full framework | move | `/experiences/identity-portfolio/system-map` | this is core system-map material |
| Course map timeline | `SequenceTimeline` with `courseMapItems` | give the longer course sequence | move | `/experiences/identity-portfolio/system-map` | keep if the system-map needs a full-sequence timeline |
| Typical vs identity grid | `ComparisonGrid` with `comparisonColumns` and `comparisonRows` | explain the conceptual difference between portfolio modes | move | `/experiences/identity-portfolio/system-map` | keep here unless rewritten into concrete before-and-after examples |

### 4. `decision-studio`

#### 4a. Diagnosis blocks

| Current block | Current component or source | Current job | Disposition | Target route | Rewrite note |
| --- | --- | --- | --- | --- | --- |
| Decision-studio intro | `SectionBlock` with `id="decision-studio-intro"` | tell the student to start from the problem, not the whole theory stack | move | `/experiences/identity-portfolio/diagnose` | this is the right tone for the diagnosis route |
| Problem chooser | `ConceptGrid` with `decisionStudioScenarioItems` | let the student choose a stuck state | move | `/experiences/identity-portfolio/diagnose` | this should become the diagnose route's main interaction |

#### 4b. Style blocks

| Current block | Current component or source | Current job | Disposition | Target route | Rewrite note |
| --- | --- | --- | --- | --- | --- |
| Design-lineages intro | `SectionBlock` with `id="design-lineages-intro"` | frame visual direction as signal, not decoration | move | `/experiences/identity-portfolio/style` | use as the style-route intro |
| Swiss vs brutalist compare | inline `section` with two `TonePanel`s | show one sharp visual contrast | keep and anchor | `/experiences/identity-portfolio/style` | this is the strongest visual-teaching block on the page and should lead the style route |
| Style direction cards | `ContentGrid` with `designLineageItems` | broaden style options beyond the contrast demo | move | `/experiences/identity-portfolio/style` | keep, but place after the main contrast block |

#### 4c. Psychology lab blocks

| Current block | Current component or source | Current job | Disposition | Target route | Rewrite note |
| --- | --- | --- | --- | --- | --- |
| Psychology intro | `SectionBlock` with `id="psychology-principles-intro"` | frame psychology as practical, not academic | move | `/experiences/identity-portfolio/labs/psychology` | good lab intro once the core path is elsewhere |
| Scholar constellation visual | `SplitLayout` with `ScholarSignalConstellation` and use-instructions panel | explain how to use the psychology section | move | `/experiences/identity-portfolio/labs/psychology` | keep if the lab needs orientation; otherwise reduce |
| Psychology principle cards | `ContentGrid` with `psychologyPrincipleItems` | map theory to page problems | move | `/experiences/identity-portfolio/labs/psychology` | keep the cards, but each should still start with the page problem |

#### 4d. Archetype lab blocks

| Current block | Current component or source | Current job | Disposition | Target route | Rewrite note |
| --- | --- | --- | --- | --- | --- |
| Archetype intro | `SectionBlock` with `id="archetype-explorer-intro"` | explain how to compare archetypes | move | `/experiences/identity-portfolio/labs/archetypes` | keep as a short lab intro |
| Archetype studio | `IdentitySignalExplorer` with `archetypeExplorerItems` | compare all 12 archetypes | move | `/experiences/identity-portfolio/labs/archetypes` | this is the lab's core block |
| Vocabulary glossary | `GlossaryBlock` with `signalVocabularyTerms` | provide reusable wording | move | `/experiences/identity-portfolio/labs/archetypes` | keep as supporting material below the explorer |

#### 4e. Persuasion blocks

| Current block | Current component or source | Current job | Disposition | Target route | Rewrite note |
| --- | --- | --- | --- | --- | --- |
| Persuasion intro | `SectionBlock` with `id="persuasion-patterns-intro"` | explain trust as page behavior | split | `/experiences/identity-portfolio/proof` and `/experiences/identity-portfolio/labs/persuasion` | use a shorter version on the proof route and the fuller framing in the lab |
| Persuasion board | `SplitLayout` with `PersuasionPatternBoard` and use-instructions panel | orient the student to the trust patterns | split | `/experiences/identity-portfolio/proof` and `/experiences/identity-portfolio/labs/persuasion` | keep a reduced proof-facing version on the core path |
| Persuasion pattern cards | `ContentGrid` with `persuasionPatternItems` | teach the individual persuasion moves | split | `/experiences/identity-portfolio/proof` and `/experiences/identity-portfolio/labs/persuasion` | keep proof-critical patterns on the core route; move the full catalog to the lab |

#### 4f. Sources and doctrine blocks

| Current block | Current component or source | Current job | Disposition | Target route | Rewrite note |
| --- | --- | --- | --- | --- | --- |
| Reference-library grid | `ReadingMapGrid` with `referenceLibraryClusters` | let the student open the right source cluster | move | `/experiences/identity-portfolio/sources` | this belongs on the dedicated sources route |
| Guardrails callout | `CalloutBand` | state the operating rules for archetype, page jobs, and imagery | split | `/experiences/identity-portfolio/signal`, `/experiences/identity-portfolio/style`, `/experiences/identity-portfolio/system-map` | distribute the rules to the routes that own them instead of keeping one doctrine pile on the homepage |

### 5. `module-one`

| Current block | Current component or source | Current job | Disposition | Target route | Rewrite note |
| --- | --- | --- | --- | --- | --- |
| Module-one intro | `SectionBlock` with `id="module-one-intro"` | explain why signal choice comes first | move | `/experiences/identity-portfolio/signal` | this is the correct intro for the signal route |
| Prep checks | `ConceptGrid` with `moduleOnePrepItems` | prepare the student before opening the lesson | move | `/experiences/identity-portfolio/signal` | keep as preflight checks on the signal route |
| Main lesson | `UnitRenderer` with `adaptedUnit` | teach how to choose the primary archetype | move | `/experiences/identity-portfolio/signal` | this is the signal route's core instructional block |

### 6. `build-loop`

| Current block | Current component or source | Current job | Disposition | Target route | Rewrite note |
| --- | --- | --- | --- | --- | --- |
| Build-loop intro | `SectionBlock` with `id="build-loop-intro"` | explain how to use agents without losing the signal | split | `/experiences/identity-portfolio/build` and `/experiences/identity-portfolio/publish` | the review loop belongs with build; the circulation logic belongs with publish |
| Build-review timeline | `SequenceTimeline` with `buildLoopItems` | define the repeatable production loop | move | `/experiences/identity-portfolio/build` | this is build-route workflow content |
| Weak-tie map | `MediaBlock` with `WeakTieOpportunityMap` | show how the page turns into opportunity through circulation | move | `/experiences/identity-portfolio/publish` | this is publish-route anchor material |
| Deployment kit | `ConceptGrid` with `deploymentKitItems` | list publishing and follow-up assets | move | `/experiences/identity-portfolio/publish` | keep as the publish-route toolkit |

### 7. `outcomes`

| Current block | Current component or source | Current job | Disposition | Target route | Rewrite note |
| --- | --- | --- | --- | --- | --- |
| Homepage audit questions | `ConceptGrid` with `signalAuditItems` | provide the rubric for judging the page | move | `/experiences/identity-portfolio/build` | this should close the build route as a quality gate |
| What you leave with | `SummaryGrid` with `outcomeItems` | summarize deliverables and outcomes | move | `/experiences/identity-portfolio/build` | keep as the build-route completion summary |
| Reflection prompt | `ReflectionPrompt` | force the student to check whether the signal survives a fast read | move | `/experiences/identity-portfolio/build` | this is a strong build-route checkpoint |
| Next-step footer | `NextStepBlock` | point the student toward the next action | split | `/experiences/identity-portfolio/build` and `/experiences/identity-portfolio/publish` | rewrite so build points to publish instead of looping back into the giant page |

### 8. `sources`

| Current block | Current component or source | Current job | Disposition | Target route | Rewrite note |
| --- | --- | --- | --- | --- | --- |
| Sources intro | `SectionBlock` with `id="sources"` | explain where the long-form research lives | move | `/experiences/identity-portfolio/sources` | this becomes the sources-route intro |
| Field-guide cards | `ContentGrid` with `fieldGuideItems` | give readers fast entry points into source material | move | `/experiences/identity-portfolio/sources` | keep as the first sources-route content block |
| Research-basis paragraphs | static paragraphs pointing to `docs/_research/identity.md` | connect the course back to the research source | move | `/experiences/identity-portfolio/sources` | preserve the pointer to `docs/_research/identity.md` |

## Reusable content asset migration map

| Current content source | Destination route |
| --- | --- |
| `studentStoryItems` | `/experiences/identity-portfolio/examples` |
| `assignmentLadderItems` | `/experiences/identity-portfolio/build` |
| `assignmentDeliverableItems` | `/experiences/identity-portfolio/build` |
| `wayfindingItems` | replace with a smaller start-page routing set for `/experiences/identity-portfolio/` |
| `moduleRoadmapItems` | `/experiences/identity-portfolio/system-map` |
| `courseMapItems` | `/experiences/identity-portfolio/system-map` |
| `comparisonColumns` and `comparisonRows` | `/experiences/identity-portfolio/system-map` |
| `decisionStudioScenarioItems` | `/experiences/identity-portfolio/diagnose` |
| `designLineageItems` | `/experiences/identity-portfolio/style` |
| `psychologyPrincipleItems` | `/experiences/identity-portfolio/labs/psychology` |
| `archetypeExplorerItems` | `/experiences/identity-portfolio/labs/archetypes` |
| `signalVocabularyTerms` | `/experiences/identity-portfolio/labs/archetypes` |
| `persuasionPatternItems` | split between `/experiences/identity-portfolio/proof` and `/experiences/identity-portfolio/labs/persuasion` |
| `referenceLibraryClusters` | `/experiences/identity-portfolio/sources` |
| `moduleOnePrepItems` | `/experiences/identity-portfolio/signal` |
| `adaptedUnit` | `/experiences/identity-portfolio/signal` |
| `buildLoopItems` | `/experiences/identity-portfolio/build` |
| `deploymentKitItems` | `/experiences/identity-portfolio/publish` |
| `signalAuditItems` | `/experiences/identity-portfolio/build` |
| `outcomeItems` | `/experiences/identity-portfolio/build` |
| `fieldGuideItems` | `/experiences/identity-portfolio/sources` |

## Start-page salvage set

After the split, the start page should keep only a small set of material from the current homepage:

1. a compressed hero
2. the before-and-after proof cue
3. one short stakes block
4. one primary CTA into `/experiences/identity-portfolio/signal`
5. one secondary CTA into `/experiences/identity-portfolio/build`
6. at most one optional example or support teaser

Everything else should leave the first route.
