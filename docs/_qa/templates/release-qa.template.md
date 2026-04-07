---
schema: qa/v1
qaType: release
targetId: <experience-id>--<release-id>
targetPath: <release-manifest-path>
status: review_requested
reviewer: <reviewer-name>
createdAt: 2026-04-04T00:00:00Z
outcome: changes_requested
supersedes: null
---

# <Experience Title> <Release Id> Release QA

## Scope

State what release candidate is being reviewed and whether it is safe to publish.

## Method

List the release validation method, including:

- release manifest checked
- exported artifact path checked
- route and asset validation performed
- Lighthouse config and command used
- exact categories and thresholds enforced

## Findings

List findings first, highest severity first.

If there are no findings, say exactly: `No blocking findings.`

## Assumptions

Record any deployment-environment assumptions.

## Decision

State one explicit outcome:

- Approved for publish
- Changes requested before publish
- Blocked

## Required Follow-ups

List any remaining publish or documentation actions.

## Lighthouse Evidence

Record the deterministic Lighthouse evidence here:

- exported artifact path
- local or CI server command used to serve `out/`
- config file used
- categories gated
- thresholds used
- summary of pass or fail result
