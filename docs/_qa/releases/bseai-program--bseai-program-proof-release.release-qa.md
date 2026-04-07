---
schema: qa/v1
qaType: release
targetId: bseai-program--bseai-program-proof-release
targetPath: content/releases/bseai-program-proof-release.json
status: approved
reviewer: github-copilot
createdAt: 2026-04-06T05:14:59Z
outcome: approved
supersedes: null
---

# BSEAI Formation and Deployment bseai-program-proof-release Release QA

## Scope

Review the `bseai-program-proof-release` candidate for the `bseai-program` experience and determine whether it is safe to approve as the selected BSEAI preview release.

## Method

Reviewed:

- the release manifest in `content/releases/bseai-program-proof-release.json`
- the selected experience in `content/experiences/bseai-program.json`
- the selected-route registry and artifact requirements in `content/registry/site-registry.json`
- the selected-build validation path in `lib/site-release.ts`, `lib/release-workflow.ts`, and `scripts/site.ts`
- the route wrappers added under `app/experiences/bseai/`

Validation completed with these command results:

- `SITE_EXPERIENCE_ID=bseai-program SITE_RELEASE_ID=bseai-program-proof-release npm run site:validate`: passed
- `npm run typecheck`: passed
- `SITE_EXPERIENCE_ID=bseai-program SITE_RELEASE_ID=bseai-program-proof-release npm run build`: passed
- exported preview verification against `http://127.0.0.1:3100/`: passed for `/`, `/experiences/bseai/why-now/`, `/experiences/bseai/philosophy/`, `/experiences/bseai/course-spine/`, `/experiences/bseai/studio/`, `/experiences/bseai/modules/`, `/experiences/bseai/courses/is117/`, and `/experiences/ai-second-renaissance/` with zero browser console errors
- changed-file editor diagnostics on the BSEAI route, release, and homepage-helper changes: no errors reported

## Findings

No blocking findings.

## Assumptions

- The BSEAI preview is intentionally conservative about unresolved public-claim language and keeps the final advanced course slot provisional.
- The selected release includes one inherited route, `experience-ai-second-renaissance`, because the BSEAI why-now route intentionally composes the approved historical comparison assets.

## Decision

Approved for publish.

## Required Follow-ups

- Add Lighthouse evidence in a later hardening pass if this preview release is promoted toward publication.
- Re-run release QA if the selected BSEAI route set, core claims, or approved artifact references change materially.

## Lighthouse Evidence

- Lighthouse evidence deferred for this preview approval pass.
- Preview verification used the exported `out/` artifact served by `node scripts/preview-export-runner.mjs` on `http://127.0.0.1:3100/`.
- Browser verification covered the root experience bridge, the full BSEAI primary route family, and the inherited AI context route with zero console errors.