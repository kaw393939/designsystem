# Guided Reference Sprint 4: Instructor, Support Cleanup, and Release Hardening

## Goal

Turn the now-complete route-family IA into a stable teaching and release surface by aligning the instructor layer to the canonical `/tour/*` outputs, demoting support routes to explicit secondary surfaces, finalizing continuity policy for legacy paths, and making the selected release, sitemap, and validation evidence tell one coherent public story.

## Why this sprint exists

Sprint 3 finished the canonical browse and examples families.

That means the core public IA is now structurally in place:

1. the guided path is canonical under `/tour/*`
2. the reference wing is canonical under `/browse/*`
3. the proof family is canonical under `/examples/*`
4. the main legacy browse and gallery routes are already continuity wrappers instead of sitemap-level canon

What remains unfinished is the stabilization work that decides whether this IA is only implemented or actually teachable and releasable.

Today:

1. `app/instructor-guide/page.tsx` still behaves like a standalone workshop session-plan page rather than a wrapper that sequences the canonical route families.
2. support routes such as `/recipes`, `/layouts`, `/tokens`, `/process`, and `/status` remain live and useful, but they still read more like parallel documentation surfaces than clearly secondary support routes inside the new IA.
3. legacy continuity routes such as `/playbook`, `/workbook`, `/deliverables`, `/archetypes`, `/archetypes/[slug]`, `/design-styles`, `/persuasion`, and `/hero-examples` are still reachable, but the final route-by-route policy has not been locked.
4. the active release fixture still bundles the new public route-family IA together with older `experience-identity-portfolio*` proof routes, which is acceptable as an intermediate state but not yet explicit enough for long-term release discipline.
5. the package now needs final validation evidence for first-click, five-second, resume-path, return-path, and continuity behavior before the IA can be treated as stable.

Sprint 4 exists to close that gap.

## Scope

1. Update `/instructor-guide` so it explicitly maps to the canonical `/tour/*` sequence, the visible tour-record outputs, and the current browse/examples support surfaces.
2. Reframe `/recipes`, `/layouts`, `/tokens`, `/process`, and `/status` as clearly secondary support routes that sharpen or explain the main system without behaving like parallel curriculum entry points.
3. Finalize the continuity policy for `/playbook`, `/workbook`, `/deliverables`, `/archetypes`, `/archetypes/[slug]`, `/design-styles`, `/persuasion`, and `/hero-examples`.
4. Encode the chosen continuity policy in implementation, whether that means wrapper handoffs, host-level redirects, or route removal from the selected release.
5. Align the site registry, selected release, sitemap contract, and public route labels with the final post-Sprint-3 IA story.
6. Remove stale labels, stale navigation language, and duplicate-family copy that still speaks as if the old flat topology were canonical.
7. Add focused tests and QA evidence for instructor handoffs, support-route classification, continuity behavior, and release/sitemap coherence.

## Deliverables

- `guided-reference-sprint-4-instructor-support-cleanup-and-release-hardening.md`
- updated instructor wrapper in `app/instructor-guide/page.tsx`
- clarified support-route positioning across:
  - `app/recipes/page.tsx`
  - `app/layouts/page.tsx`
  - `app/tokens/page.tsx`
  - `app/process/page.tsx`
  - `app/status/page.tsx`
- finalized continuity handling for:
  - `app/playbook/page.tsx`
  - `app/workbook/page.tsx`
  - `app/deliverables/page.tsx`
  - `app/archetypes/page.tsx`
  - `app/archetypes/[slug]/page.tsx`
  - `app/design-styles/page.tsx`
  - `app/persuasion/page.tsx`
  - `app/hero-examples/page.tsx`
- any required route-policy support in `next.config.ts` or equivalent export-aware continuity handling
- release-aware metadata updates in:
  - `content/registry/site-registry.json`
  - `content/experiences/identity-portfolio-system.json`
  - `content/releases/identity-portfolio-system-proof-release.json`
- focused unit and browser coverage for instructor handoffs, support-route positioning, continuity behavior, and release/sitemap validation

## Current-state constraints

Sprint 4 should begin from the approved and implemented Sprint 3 baseline.

Current implementation facts:

1. the canonical public families now live under `/tour/*`, `/browse/*`, and `/examples/*`, and those routes are already selected in the active release fixture.
2. structural examples under `/examples/module`, `/examples/lesson`, and `/examples/reading-map` remain active and should stay visibly secondary to the canonical outcome-proof routes added in Sprint 3.
3. `/archetypes`, `/design-styles`, `/persuasion`, and `/hero-examples` already behave as continuity routes and are excluded from sitemap output, while `/playbook`, `/workbook`, and `/deliverables` still remain reachable as flat-route continuity handoffs from the earlier guided-tour migration.
4. `app/instructor-guide/page.tsx` still lacks route-status framing, direct mapping to the canonical step sequence, explicit tour-output ownership, and explicit links into the current canonical route-family surfaces.
5. `app/recipes/page.tsx`, `app/layouts/page.tsx`, `app/tokens/page.tsx`, `app/process/page.tsx`, and `app/status/page.tsx` remain selected and live, but they do not yet consistently identify themselves as support-only surfaces inside the route-family model.
6. `content/releases/identity-portfolio-system-proof-release.json` still selects the canonical root-site route families, structural examples, continuity wrappers, and older `experience-identity-portfolio*` proof routes together, which means Sprint 4 must either formalize that mixed release state or reduce it.
7. `content/experiences/identity-portfolio-system.json` already uses `overview`, `tour`, `browse`, `examples`, and `instructor-guide` as the experience navigation model, so Sprint 4 must not reintroduce flat-route or atlas-first navigation as a side effect of hardening.
8. the site uses static export via `output: "export"` in `next.config.ts`, so Sprint 4 cannot assume every continuity decision can be expressed as a runtime HTTP redirect.

## Phase boundary

Sprint 4 stabilizes and teaches from the route-family IA that Sprints 1 through 3 already established.

Sprint 4 does not need to reopen the canonical `/tour/*`, `/browse/*`, or `/examples/*` choreography, and it does not need to rewrite the older `experience-identity-portfolio*` routes beyond whatever release-selection or label-cleanup decisions are required to keep the public IA coherent.

## Implementation sequence

Sprint 4 should land in this order so the release story gets simpler instead of broader.

### 1. Instructor and support-route contract hardening

- update `/instructor-guide` so it behaves as a wrapper around the canonical guided tour rather than as a parallel workshop script
- map instructor guidance to the exact tour outputs now visible in the shared tour record
- define the support-route positioning language for `/recipes`, `/layouts`, `/tokens`, `/process`, and `/status`
- decide where route-status labels, continuity callouts, or support-family framing are required so those routes stop competing with the student ladder

### 2. Continuity and alias matrix

- decide route-by-route behavior for every remaining flat or legacy path: keep as wrapper, remove from selected release, or redirect at the host/platform layer where supported
- because the site is statically exported, distinguish clearly between true redirect behavior and explicit wrapper handoff behavior
- encode the chosen policy in implementation so continuity stops being implicit or contradictory

### 3. Release, registry, and sitemap hardening

- align `content/registry/site-registry.json`, `content/experiences/identity-portfolio-system.json`, and `content/releases/identity-portfolio-system-proof-release.json` with the chosen continuity policy
- decide whether the older `experience-identity-portfolio*` proof routes stay in the same release fixture with an explicit non-public role or move into a separate proof-specific release fixture
- clean up route labels, notes, and any stale copy that still describes the older topology as if it were public canon

### 4. Validation and release proof

- add focused unit and browser tests for instructor-route clarity, support-route classification, continuity behavior, and release/sitemap integrity
- record browser evidence for first-click, five-second, resume-path, return-path, and continuity behavior
- add a release QA artifact if this sprint produces the releasable IA cutover

## File-by-file implementation checklist

Use this list to keep the sprint concrete.

### Update instructor and support-route surfaces

- `app/instructor-guide/page.tsx`: add explicit route-family status, guided-step map, tour-output crosswalk, links to canonical `/tour/*` steps, and bounded links to browse/examples support surfaces
- `app/recipes/page.tsx`: clarify that recipes are support-route patterns, not a second curriculum; keep exemplar fallback logic aligned with the canonical examples family
- `app/layouts/page.tsx`: make the layout guide read as support-route help for structure problems rather than as a peer entry surface
- `app/tokens/page.tsx`: make the token guide read as a support route for diagnosing visual drift rather than as alternate onboarding
- `app/process/page.tsx`: align the process route to the current route-family and release-validation model
- `app/status/page.tsx`: make the status route tell the truth about what is canonical, what is support, and what remains continuity-only or pending

### Finalize continuity handling

- `app/playbook/page.tsx`, `app/workbook/page.tsx`, and `app/deliverables/page.tsx`: finalize whether these remain explicit continuity wrappers or become redirect-only entry points at the platform layer
- `app/archetypes/page.tsx`, `app/archetypes/[slug]/page.tsx`, `app/design-styles/page.tsx`, `app/persuasion/page.tsx`, and `app/hero-examples/page.tsx`: finalize whether each route remains a continuity wrapper in the selected release, becomes host-level redirect material, or is removed from the selected release entirely
- `next.config.ts`: update only if the chosen continuity policy can be expressed safely in the static-export deployment model; otherwise keep the policy explicit in wrapper implementation and docs instead of pretending redirects exist

### Align release-aware metadata

- `content/registry/site-registry.json`: align `includeInSitemap`, `includeInPrimaryNav`, and selected-route coverage with the final continuity and support-route policy
- `content/experiences/identity-portfolio-system.json`: keep experience navigation aligned to the canonical route-family IA after any release cleanup
- `content/releases/identity-portfolio-system-proof-release.json`: decide whether continuity wrappers and older `experience-identity-portfolio*` proof routes remain in the active release and document the chosen reason clearly in notes
- `app/sitemap.ts` and `lib/site-release.ts`: update only if release behavior changes require harder guarantees or better audit clarity

### Add or extend focused tests

- `tests/unit/site-release.test.ts`: verify the selected release, primary nav, sitemap, and continuity policy still resolve coherently after hardening
- `tests/browser/homepage.spec.ts`: add or refine checks for instructor handoffs, support-route classification, and continuity behavior
- `tests/browser/site-release.spec.ts`: add or refine checks for sitemap exposure, non-public selected routes, and any chosen redirect-or-wrapper behavior

## Work checklist

1. Make the instructor guide teach from the canonical guided tour instead of reconstructing the sequence manually.
2. Make support routes obviously secondary and bounded in job.
3. Decide every remaining legacy route's role instead of leaving continuity policy implicit.
4. Keep static-export reality visible so the sprint does not promise redirect behavior the deployment model cannot actually ship.
5. Remove stale labels and duplicate-family language that still describe the old topology as if it were canonical.
6. Keep the selected release, sitemap, and visible UI aligned.
7. Preserve useful continuity without leaving hidden parallel curricula inside the public release.

## Positive tests

- an instructor can open `/instructor-guide` and move through the canonical `/tour/*` sequence without reconstructing the logic from older flat routes
- `/recipes`, `/layouts`, `/tokens`, `/process`, and `/status` clearly read as support surfaces rather than alternate start points
- every remaining continuity route either redirects where the stack allows it or clearly identifies itself as continuity-only and hands off to the canonical family in one click
- the selected release, primary experience navigation, and sitemap expose the same canonical route-family story
- a returning learner can still reach the build step quickly after any continuity hardening
- the canonical browse and examples families remain untouched in role and hierarchy after the support-route cleanup

## Negative tests

- no support route becomes easier to interpret as the primary student path than `/tour/*`
- no instructor page duplicates browse-room density or examples-gallery behavior as if it were a second public family
- no continuity route remains selected or exposed in sitemap output by accident once its role changes
- no route label implies that `/playbook`, `/workbook`, `/deliverables`, `/archetypes`, `/design-styles`, `/persuasion`, or `/hero-examples` are public canon after hardening
- no release note or test suite quietly preserves a different IA than the one users actually see in navigation and sitemap output

## Edge-case checks

- direct links to `/archetypes/[slug]` remain coherent if deep archetype references are preserved during migration
- the chosen continuity policy remains coherent in static export, base-path preview, and local preview environments
- parked or fallback exemplar behavior in `/recipes` remains coherent if recipe-specific routes are not selected in the active release
- older `experience-identity-portfolio*` proof routes either remain explicitly non-public in the mixed release or move cleanly into a separate release fixture without breaking current validation
- support-route positioning remains understandable on mobile when route-status copy and action links stack vertically

## Accessibility checks

- route-status or support-positioning language remains visible in text and does not rely on color alone
- instructor and support-route pages preserve logical heading structure and keyboard-reachable next moves
- any continuity-wrapper or redirect-equivalent messaging remains understandable without relying on layout position or visual inference
- validation of support-route demotion includes mobile and keyboard checks, not only visual desktop review

## Browser and usability checks

- five-second classification check: a viewer can tell whether the page is a guided step, browse room, examples page, instructor wrapper, or support route on first look
- first-click check: a first-time learner still chooses the guided tour instead of a support route or continuity wrapper
- resume-path check: a returning learner still reaches `/tour/build` in one click from the lobby or nearby support surfaces
- return-path check: an instructor or support-route visitor can identify the owning canonical family quickly without scanning the whole page
- continuity check: any retained wrapper route exposes its canonical destination clearly enough that the user is not stranded in the old topology

## Export and deploy checks

- static export remains valid after any continuity-policy change
- if host-level redirects are used, they are documented separately from wrapper behavior rather than implied by route copy alone
- selected-release route metadata, sitemap output, and browser coverage stay aligned in the same sprint as any continuity or support-route cleanup
- no Sprint 4 implementation should depend on server-only redirect behavior that the static-export deployment model cannot guarantee

## Out of scope

- reopening the canonical `/tour/*`, `/browse/*`, or `/examples/*` IA contracts established in Sprints 1 through 3
- rewriting the older `experience-identity-portfolio*` proof routes as a new product surface beyond any release-selection or labeling cleanup needed for coherence
- large new content additions inside browse rooms or examples routes that are unrelated to instructor alignment, support cleanup, or release hardening

## Exit criteria

Sprint 4 is done when the instructor layer clearly teaches from the canonical route-family system, support routes are visibly secondary, continuity policy for legacy entry points is explicit and implemented in a static-export-safe way, and the selected release, sitemap, route labels, and validation evidence all agree about what the public IA actually is.
