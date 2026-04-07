---
schema: qa/v1
qaType: release
targetId: bseai-program--bseai-program-studio-proof-release
targetPath: content/releases/bseai-program-studio-proof-release.json
status: approved
reviewer: github-copilot
createdAt: 2026-04-06T05:40:00Z
outcome: approved
supersedes: bseai-program--bseai-program-proof-release
---

# BSEAI Formation and Deployment bseai-program-studio-proof-release Release QA

## Scope

Review the `bseai-program-studio-proof-release` candidate for the `bseai-program` experience and determine whether it is safe to approve as the expanded BSEAI preview release.

## Method

Reviewed:

- the release manifest in `content/releases/bseai-program-studio-proof-release.json`
- the selected experience in `content/experiences/bseai-program.json`
- the selected-route registry and artifact requirements in `content/registry/site-registry.json`
- the studio handoff updates in `components/recipe-exemplar-page.tsx`, `app/experiences/bseai/studio/page.tsx`, and `app/experiences/bseai/courses/is117/page.tsx`
- the already-present identity portfolio route family under `app/experiences/identity-portfolio/`

Validation completed with these command results:

- `SITE_EXPERIENCE_ID=bseai-program SITE_RELEASE_ID=bseai-program-studio-proof-release npm run site:validate`: passed
- `npm run site -- release diff bseai-program-proof-release bseai-program-studio-proof-release`: showed `+13` routes, `+1` unit, `+0` visuals, with only the identity studio route family and `choose-primary-archetype` added
- `SITE_EXPERIENCE_ID=bseai-program SITE_RELEASE_ID=bseai-program-studio-proof-release npm run build`: passed
- exported preview verification against `http://127.0.0.1:3101/`: passed for `/experiences/bseai/studio/`, `/experiences/bseai/courses/is117/`, `/experiences/identity-portfolio/`, `/experiences/identity-portfolio/signal/`, `/experiences/identity-portfolio/build/`, `/experiences/identity-portfolio/publish/`, and `/experiences/identity-portfolio/labs/psychology/` with zero browser console errors
- changed-file editor diagnostics on the BSEAI experience config and studio handoff changes: no errors reported

## Findings

No blocking findings.

## Assumptions

- The identity portfolio route family is intentionally being activated as the next live studio slice under the BSEAI shell rather than duplicated into separate BSEAI-owned units.
- The expanded release continues to inherit `experience-ai-second-renaissance` because the BSEAI why-now route still composes the approved historical comparison assets.

## Decision

Approved for preview release approval.

## Required Follow-ups

- Add Lighthouse evidence later if this larger preview moves closer to publication.

## Build Evidence

- The approved release built successfully through `npm run build` with `SITE_EXPERIENCE_ID=bseai-program` and `SITE_RELEASE_ID=bseai-program-studio-proof-release`.
- The generated static app now includes the BSEAI shell routes plus the full identity studio slice, including `identity-portfolio`, `signal`, `style`, `proof`, `build`, `publish`, `diagnose`, `examples`, `labs/archetypes`, `labs/psychology`, `labs/persuasion`, `system-map`, and `sources`.
- Preview verification on `http://127.0.0.1:3101/` confirmed the new BSEAI studio handoff actions and representative identity routes with zero browser console errors.