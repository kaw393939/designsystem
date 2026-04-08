# Expert Panel QA Review — Modules System Spec

## Panel composition

| Expert | Domain | Focus |
| --- | --- | --- |
| **Curriculum designer** | Instructional design, learning theory | Sequencing, scaffolding, assessment alignment, pacing |
| **Information architect** | IA, URL structure, content relationships | Route naming, navigation model, data flow, naming conventions |
| **Front-end engineer** | Next.js, React, component architecture | Data model, dependency management, build impact, layout patterns |
| **Content strategist** | Editorial, tone adaptation, migration planning | Content volume, voice consistency, migration feasibility |
| **Accessibility specialist** | WCAG, assistive tech, inclusive UX | Semantic markup, screen reader support, keyboard navigation |
| **Sprint planner** | Project management, risk, estimation | Sprint sizing, dependencies, risk mitigation, acceptance criteria |

---

## Findings and resolutions

### Critical (must fix before starting work)

#### C1 — `LocalNav` is page-section navigation, not route navigation

**Found by:** Front-end engineer

The existing `LocalNav` component uses scroll-position intersection observers to highlight sections _within a single page_. The spec describes `ModuleLocalNav` as a sidebar linking to different _lesson routes_ within a module. These are fundamentally different components. Saying "extends or wraps `LocalNav`" is incorrect — `ModuleLocalNav` needs a new implementation pattern, and the data flow requires a per-module `layout.tsx` to pass module context to all lesson pages.

**Resolution:** Updated Sprint 1 spec to:
- Clarify that `ModuleLocalNav` is a route-based sidebar, not scroll-based
- Require per-module `layout.tsx` files (e.g., `app/modules/ai-foundations/layout.tsx`) that inject module context
- Remove the "extends or wraps `LocalNav`" language

---

#### C2 — Image directory named for one module but serves three

**Found by:** Information architect

All 52 images land in `public/media/ai-foundations/` but Modules 3 and 4 also use images from this directory. Future contributors will be confused about why Module 3 (Agentic Workflow) images live in an `ai-foundations` folder.

**Resolution:** Updated content-migration-map and Sprint 2 spec to use `public/media/modules/` with subdirectories `generated/` and `portraits/`, shared across all modules that originated from the AI orchestration project.

---

#### C3 — KaTeX not in project dependencies

**Found by:** Front-end engineer

`katex` is not in `package.json`. It's a significant dependency (~300KB CSS + JS). The spec defers the check to mid-Sprint-2, which is too late — it affects bundle size planning for the whole project.

**Resolution:** Added explicit `katex` dependency installation as a Sprint 1 deliverable (infrastructure setup), with a note about bundle-size impact and the need for dynamic import.

---

#### C4 — Module 4 pacing: 5 pages in 1 week

**Found by:** Curriculum designer

Module 4 (Visual AI) is assigned 1 week but has 3 lessons + practice + checkpoint — the same structure as modules spanning 2-3 weeks. Either the lessons need to be shorter or the week allocation needs revisiting.

**Resolution:** Updated spec.md and sprint-plan to allocate weeks 8-9 to Module 4, shifting Modules 5-6 to weeks 10-12 and 13-15. Module 4 Lesson 1 (How image models see) can be handled in one session but lessons 2-3 plus practice need a second week.

---

#### C5 — No data files specified for Modules 1, 5, 6

**Found by:** Information architect

Sprints 2-4 each create a data file (`ai-foundations.ts`, `agentic-workflow.ts`, `visual-ai.ts`). Modules 1, 5, 6 have no equivalent. Sprint 5 says lessons "may reuse data arrays from `web-presence-site-content.ts`" but doesn't specify what gets created for Modules 5-6.

**Resolution:** Updated Sprint 5 and Sprint 6 specs to clarify the data approach: Module 1 imports from existing content files (confirmed `lib/web-presence-site-content.ts` exists). Modules 5-6 create lightweight data files (`identity-and-proof.ts`, `studio-and-publish.ts`) for lesson metadata and rubric data.

---

#### C6 — `EmbeddingsNeighborhoodDiagram` dependencies unknown

**Found by:** Front-end engineer

The spec says "port directly" but never analyzes the component's implementation. If it uses D3, Canvas, or heavy SVG generation, the bundle impact could be significant and the port may take longer than expected.

**Resolution:** Added a pre-work task in Sprint 2 to audit the source component's dependencies, measure its bundle contribution, and decide whether to port, simplify, or replace with a static SVG.

---

#### C7 — `ModuleShell` relationship to `SupportRouteShell` unclear

**Found by:** Front-end engineer

The spec alternates between "variant of `SupportRouteShell`" and "uses `SupportRouteShell`-style hero." Does it compose around `SupportRouteShell` or duplicate its pattern?

**Resolution:** Updated Sprint 1 spec to clarify: `ModuleShell` composes `SupportRouteShell` internally (wraps it), adding module-specific sections (lesson grid, practice/checkpoint links, prev/next navigation) below the hero.

---

### High priority (should fix before starting work)

#### H1 — No "coming soon" page pattern

**Found by:** Front-end engineer

When modules have status `"coming"`, their URLs don't exist yet. Clicking a "coming" card on the module index leads to a 404. No fallback page or disabled state is specified.

**Resolution:** Updated Sprint 1 to add a `app/modules/[slug]/coming-soon.tsx` pattern or conditional rendering in `ModuleIndexCard` that disables the link and shows status for `"coming"` modules.

---

#### H2 — Module 2 Lesson 1 condensation effort underestimated

**Found by:** Content strategist

Condensing 2,800 lines of narrative prose into 600-800 lines while maintaining coherence _and_ rewriting every sentence for tone is not a standard lesson-writing task. It's closer to writing a standalone long-form article from research notes. The spec treats it equivalently to other lessons.

**Resolution:** Updated Sprint 2 to flag Lesson 1 as the sprint's critical-path item, recommend writing it first (before other lessons), and add an explicit editorial review gate before proceeding to Lessons 2-3.

---

#### H3 — Reconstructed prompts in Module 4 need disclaimer

**Found by:** Content strategist

Module 4 Lesson 2 uses "reconstructed" prompts for existing generated images — prompts the spec admits were "likely" used but not documented. Presenting speculative prompts as teaching examples without disclosure is misleading.

**Resolution:** Updated Sprint 4 spec to require either (a) regenerating example images from documented prompts, or (b) labeling reconstructed prompts as "approximate prompt — the original was not recorded."

---

#### H4 — Timeline and profile card accessibility unspecified

**Found by:** Accessibility specialist

`TimelineSection` and `PersonProfileCard`/`Grid` are custom components with no semantic markup guidance. Timelines need `<ol>` semantics with `role="list"`. Profile grids need heading hierarchy. Neither addresses keyboard navigation or ARIA.

**Resolution:** Updated Sprint 1 component specs to include semantic markup requirements: `TimelineSection` uses `<ol>` with `aria-label`, profile cards use `<article>` with heading hierarchy.

---

#### H5 — No sprint durations

**Found by:** Sprint planner

7 sprints are defined with relative effort (Low to High) but no calendar duration. Without durations, the project has no timeline and sprint-to-sprint dependencies cannot be assessed for blocking risk.

**Resolution:** Added recommended sprint durations to sprint-plan.md based on effort levels: High = 2 weeks, Medium-High = 2 weeks, Medium = 1.5 weeks, Low-Medium = 1 week. Total: ~11 weeks implementation.

---

#### H6 — Sprint 2 has no risk mitigation 

**Found by:** Sprint planner

Sprint 2 is flagged "High effort" — the riskiest sprint with the most content, images, two component ports, and tone rewriting. No contingency is described.

**Resolution:** Added risk mitigation section to Sprint 2: split into 2a (data + images + component ports) and 2b (content writing + tone review) if the sprint runs long. 2a unblocks Sprint 3's image needs.

---

#### H7 — Sprint dependencies not explicit

**Found by:** Sprint planner

Sprint 3 uses portraits copied in Sprint 2. Sprint 4 reuses images from Sprint 2. Sprint 5 uses `web-presence-site-content.ts`. These cross-sprint dependencies are implicit, not documented.

**Resolution:** Added a dependency table to sprint-plan.md showing what each sprint consumes from prior sprints.

---

#### H8 — `browse/sources` room not cross-linked

**Found by:** Information architect

Sprint 7 links 3 of 4 browse rooms to modules but omits `/browse/sources/`. The sources room could link to Module 2's reading list or Module 3's primary source references.

**Resolution:** Updated Sprint 7 to include `/browse/sources/` → Module 2 cross-link.

---

#### H9 — Content acceptance criteria missing

**Found by:** Sprint planner, Content strategist

Every sprint's acceptance criteria are technical ("renders correctly," "tsc passes"). The hardest work — writing good content — has no measurable quality gate.

**Resolution:** Added content acceptance criteria to each content sprint: a tone-check rubric (5 questions every paragraph must pass) and a required editorial read-through before the sprint is marked complete.

---

#### H10 — "Further reading" pattern mentioned but never specified

**Found by:** Content strategist

The spec says "move deep bibliography to a 'Further reading' section" (tone adaptation rules) but no component, data model, or placement pattern for this section appears in any sprint.

**Resolution:** Added a `FurtherReading` section pattern to Sprint 2's component list — a simple `<aside>` with a list of source references, rendered at the bottom of lessons that reference deep material.

---

### Medium priority (fix during implementation)

#### M1 — Alt text guidelines not established

**Found by:** Accessibility specialist

The spec mentions "meaningful alt text" twice but provides no guidelines for different image types (portraits vs. illustrations vs. diagrams). Portrait alt text should include the person's name and era; illustration alt text should describe what the scene depicts.

**Resolution:** Added alt text guidelines to content-migration-map.md.

---

#### M2 — KaTeX screen reader support

**Found by:** Accessibility specialist

KaTeX renders math as CSS-styled spans, which screen readers may not interpret correctly. The spec should note the need for `aria-label` on math blocks or `katex`'s HTML mode with MathML annotations.

**Resolution:** Added accessibility note to Sprint 2's MathBlock component port section.

---

#### M3 — No image loading strategy for heavy pages

**Found by:** Accessibility specialist, Front-end engineer

Module 2 Lesson 1 will have 15+ images. Without lazy loading or priority hints, initial page load will be slow.

**Resolution:** Added image loading note to Sprint 2: use `next/image` with `loading="lazy"` for all images below the fold, `priority` only for the first hero/timeline image.

---

#### M4 — PersonProfileCard shape not specified

**Found by:** Front-end engineer

The spec says "circular or rounded portrait image" — these are different visual treatments. Should be explicit.

**Resolution:** Specified `rounded-full` (circular) for portrait photos, consistent with the human-centered visual approach.

---

#### M5 — Line count ranges too wide

**Found by:** Sprint planner

Ranges like "600-800 lines" and "1,800-2,400 lines" represent 25-33% uncertainty. This is acceptable for planning purposes but should be tracked against actuals in Sprint 2 to calibrate future estimates.

**Resolution:** Added a note to Sprint 2 acceptance criteria: record actual line counts and use them to adjust Sprint 3-6 estimates.
