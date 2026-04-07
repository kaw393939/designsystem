---
schema: unit-draft/v1
id: choose-primary-archetype
status: working_draft
kind: concept
recipe: concept-explainer
title: Choose a Primary Archetype Without Losing Complexity
objective: Explain why one primary archetype creates coherence in a portfolio system.
audiences:
  - students
sourceRefs:
  - sourceId: identity
    sections:
      - Choose One Primary Archetype
      - Public Signal and Portfolio Coherence
blocks:
  - type: hero
    title: Choose a Primary Archetype Without Losing Complexity
    dek: One dominant public signal makes a portfolio legible before secondary traits add nuance.
    visualRef:
      visualRef: archetype-signal-map
      caption: One dominant archetype creates a stable public signal; secondary traits stay legible only when they orbit that center.
      alt: Diagram showing a primary archetype at the center with secondary traits feeding into audience trust.
  - type: whyItMatters
    summary: Learners often make the portfolio noisier by trying to project every trait at once.
    stakes: If the signal system is mixed from the start, the work feels improvised instead of intentional.
  - type: section
    id: definition
    title: A primary archetype creates coherence because it gives every page the same center of gravity.
    body: The learner does not need to flatten their personality into one cliche. They need one dominant interpretive frame that keeps the portfolio readable. That frame helps the audience understand why the work belongs together before the secondary traits add range.
  - type: comparisonGrid
    id: comparison
    title: A dominant signal behaves differently from a blended signal cloud.
    columns:
      - key: primary
        label: Dominant archetype
      - key: mixed
        label: Uncontrolled blend
    rows:
      - label: First impression
        cells:
          - The audience can name the portfolio's core energy quickly.
          - The audience sees many cues but no stable center.
      - label: Portfolio effect
        cells:
          - Secondary pieces feel like variation inside one system.
          - Every page competes to redefine what the portfolio is.
  - type: workedExample
    id: worked-example
    prompt: A learner wants to appear rigorous, warm, and rebellious all at once on their homepage.
    steps:
      - title: Step 1
        body: Name the one archetype that should govern the first read of the portfolio.
      - title: Step 2
        body: Let the other traits appear in project voice, proof, and secondary pages instead of the hero statement.
        outcome: The portfolio gains coherence without losing range.
  - type: summaryGrid
    id: takeaways
    items:
      - title: Start with one dominant signal
        takeaway: One archetype gives the audience a stable interpretive frame.
      - title: Let nuance arrive second
        takeaway: Secondary traits belong in variation, not in the first sentence.
  - type: sourceAnchorGrid
    id: sources
    title: Source anchors
    items:
      - title: Identity Portfolio Research Notes
        description: Canonical source record for the portfolio identity planning chain.
        href: docs/_research/identity.md
        type: Source document
briefRef: choose-primary-archetype
summary: Help the learner commit to one dominant portfolio signal without flattening nuance.
module: archetype-and-identity
notes:
  - Started from UnitBrief choose-primary-archetype.
  - Keep identity as the stable source id for the first file-backed workflow proof.
  - Add the approved diagram proof before freezing the Sprint 9 identity release version.
---

Working draft scaffold for the first file-backed Sprint 8 unit lifecycle slice.
