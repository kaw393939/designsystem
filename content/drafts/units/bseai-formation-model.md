---
schema: unit-draft/v1
id: bseai-formation-model
status: working_draft
kind: concept
recipe: concept-explainer
title: The Seven Capacities BSEAI Is Trying to Form
objective: Explain how reading, writing, reasoning, quantifying, computing, orchestrating, and representing show up in real artifacts and conduct.
audiences:
  - prospective-students
  - current-students
  - faculty-reviewers
sourceRefs:
  - sourceId: bseai
  - sourceId: renesaince
  - sourceId: identity
blocks:
  - type: hero
    title: The Seven Capacities BSEAI Is Trying to Form
    dek: The degree is not only teaching tools. It is trying to form a person who can read, write, reason, quantify, compute, orchestrate, and represent responsibly in public.
    visualRef:
      visualRef: bseai-formation-wheel
      caption: The capacities work together as one formation system rather than as disconnected boxes.
      alt: Diagram grouping the updated trivium and quadrivium around a center of responsible public practice.
  - type: whyItMatters
    summary: A degree needs a clear answer to the question of what kind of person it is trying to form.
    stakes: If the answer stays vague, the curriculum reads like a set of disconnected courses and the site cannot explain why the portfolio and deployment work belong inside the degree.
  - type: section
    id: seven-capacities
    title: The seven capacities connect internal formation to visible public work.
    body: |
      The updated trivium names the student's relationship to language, models, and meaning: read, write, and reason. The updated quadrivium names the student's relationship to measurement, systems, and public form: quantify, compute, orchestrate, and represent.

      The point of the model is not to sound classical for its own sake. The point is to clarify what kind of builder the program is trying to form. Students should be able to interpret context, explain choices, build working systems, measure consequences, coordinate tools, and make their work legible in public.

      That is why the degree can justify portfolio, proof, and deployment as part of its core logic rather than as side assignments.
  - type: comparisonGrid
    id: formation-vs-training
    title: Tool training alone and a formation model lead to different kinds of graduates.
    columns:
      - key: tools
        label: Tool training only
      - key: formation
        label: Formation model
    rows:
      - label: Main outcome
        cells:
          - Learners can use current tools.
          - Learners can use tools, explain choices, and act responsibly in public.
      - label: Evidence of growth
        cells:
          - Completion or familiarity.
          - Visible artifacts, judgment, communication, and follow-through.
      - label: Failure mode
        cells:
          - Fast output with weak interpretation.
          - Slower but more coherent decisions that become externally legible.
  - type: workedExample
    id: capacity-bridge
    prompt: A student can build working code but struggles to explain their decisions, show proof, or make the work trustworthy to others.
    steps:
      - title: Step 1
        body: Identify which capacities are strongest already, such as compute or orchestrate.
      - title: Step 2
        body: Identify which capacities are underdeveloped, such as represent or reason.
      - title: Step 3
        body: Turn that gap into a concrete artifact goal such as a proof block, a reasoning note, or a clearer public-facing explanation.
        outcome: Formation becomes visible through the next artifact rather than remaining abstract.
  - type: summaryGrid
    id: takeaways
    items:
      - title: The model explains the person being formed
        takeaway: The degree is shaping habits and capabilities, not only teaching isolated tools.
      - title: Capacities surface in artifacts
        takeaway: The model matters because it changes what the student can show publicly and defend professionally.
      - title: Formation and deployment belong together
        takeaway: Public practice is part of the degree because legibility and responsibility are part of the formation goal.
  - type: sourceAnchorGrid
    id: sources
    title: Source anchors
    items:
      - title: Updated Trivium and Quadrivium
        description: Internal concept note behind the seven-capacity formation model.
        href: docs/_projects/bseaid-degree/updated-trivium-quadrivium.md
        type: Project note
      - title: BSEAID Curriculum and Degree Planning Sheet
        description: Degree context that the formation model helps interpret.
        href: docs/_research/bseai.md
        type: Source document
      - title: Enterprise AI Degree Vision for the Second Renaissance
        description: Historical frame explaining why educational formation matters more under AI abundance.
        href: docs/_research/renesaince.md
        type: Source document
summary: Translate the seven-capacity formation model into student-facing language and artifact logic.
module: bseai-formation-model
visualDraftRefs:
  - bseai-formation-wheel
briefRef: bseai-formation-model
notes:
  - Keep the tone serious and concrete rather than moralizing.
  - Make sure each capacity can later be tied to specific course and artifact surfaces.
---

Working draft scaffold for the BSEAI formation-model unit.
