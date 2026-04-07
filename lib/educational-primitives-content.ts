import type { EducationalUnitSpec } from "@/lib/educational-contracts";
import type { PanelTone } from "@/lib/theme-tokens";

export const primitiveGuideNavItems = [
  {
    id: "contract-boundary",
    label: "Contract boundary",
    description: "What is stored versus what React derives.",
  },
  {
    id: "primitive-map",
    label: "Primitive map",
    description: "How the pedagogical components divide the work.",
  },
  {
    id: "unit-renderer",
    label: "Unit renderer",
    description: "The block-to-component mapping layer.",
  },
  {
    id: "concept-unit",
    label: "Concept unit",
    description: "A concept explainer rendered from blocks.",
  },
  {
    id: "assignment-unit",
    label: "Assignment unit",
    description: "A process-heavy assignment rendered from blocks.",
  },
  {
    id: "reading-map-unit",
    label: "Reading-map unit",
    description: "A resource map rendered from blocks.",
  },
] as const;

export const contractBoundaryNotes: Array<{
  title: string;
  tone: PanelTone;
  summary: string;
}> = [
  {
    title: "Serialized blocks stay content-first.",
    tone: "reading",
    summary:
      "Unit payloads store fields like body, items, actions, and visualRef. They do not store React-only props or page-specific wrappers.",
  },
  {
    title: "The renderer owns the translation layer.",
    tone: "proof",
    summary:
      "A pure block renderer maps stored payloads into component props so page recipes can validate ordered block types instead of custom page files.",
  },
  {
    title: "Shared sub-shapes prevent drift.",
    tone: "synthesis",
    summary:
      "Actions, metadata, source items, reading-map links, and visual references reuse normalized shapes instead of drifting into one-off per-component variants.",
  },
];

export const primitiveMapNotes: Array<{
  name: string;
  tone: PanelTone;
  purpose: string;
}> = [
  {
    name: "Orientation primitives",
    tone: "emphasis",
    purpose:
      "LessonHero and WhyItMatters establish purpose, stakes, and a usable first read before deeper explanation begins.",
  },
  {
    name: "Explanation primitives",
    tone: "reading",
    purpose:
      "SectionBlock, ComparisonGrid, SequenceTimeline, WorkedExample, EditorialAside, and PullInsight teach the idea instead of decorating it.",
  },
  {
    name: "Closure primitives",
    tone: "next",
    purpose:
      "SummaryGrid, ReflectionPrompt, NextStepBlock, SourceAnchorGrid, and ReadingMapGrid help the learner consolidate and move forward.",
  },
];

export const conceptUnit: EducationalUnitSpec = {
  id: "concept-feedback-loops",
  kind: "concept",
  recipe: "concept-explainer",
  title: "A feedback loop changes the next move, not just the current result.",
  summary:
    "Concept-page proof of the educational primitive layer using comparison, worked example, summary, and source anchors.",
  blocks: [
    {
      type: "hero",
      eyebrow: "Concept explainer",
      title:
        "A feedback loop changes the next move, not just the current result.",
      dek: "Use this pattern when you want learners to recognize how outcomes return to shape later choices inside a system.",
      metadata: [
        {
          label: "Best for",
          value: "Concept pages and systems thinking units",
        },
        { label: "Reading time", value: "8 minutes" },
      ],
      actions: [
        {
          label: "Jump to comparison",
          href: "#compare-loops",
          kind: "secondary",
        },
      ],
      visualRef: {
        visualRef: "feedback-loop-map",
        alt: "Abstract diagram showing a result feeding back into a later decision point",
        caption: "Placeholder concept visual",
      },
    },
    {
      type: "whyItMatters",
      title: "Why this matters",
      summary:
        "Learners often see isolated events and miss the pattern that makes a system repeat, amplify, or stabilize.",
      stakes:
        "If they can recognize the loop, they can diagnose why small changes sometimes produce outsized or delayed effects.",
      audience:
        "Useful in design, public policy, ecology, and organizational learning.",
      links: [
        {
          label: "Skip to worked example",
          href: "#worked-example",
          kind: "secondary",
        },
      ],
    },
    {
      type: "conceptGrid",
      id: "signal-map",
      title: "Three signals help a learner spot the loop.",
      summary:
        "The grid format works when the learner needs a quick map before the page deepens into comparison and example.",
      items: [
        {
          title: "Returned signal",
          summary:
            "Something produced by the system returns as information or pressure on the next step.",
          tag: "Core test",
        },
        {
          title: "Time delay",
          summary:
            "The effect often shows up later, which is why the relationship is easy to miss on a first pass.",
          tag: "Watch for this",
        },
        {
          title: "Behavior change",
          summary:
            "The later decision or condition shifts because of the earlier result, not because of a separate outside event.",
          tag: "Interpretive move",
        },
      ],
    },
    {
      type: "section",
      id: "definition",
      eyebrow: "Definition",
      title:
        "A feedback loop appears when an earlier outcome changes a later input.",
      summary:
        "That change can intensify the original pattern or hold it within a range.",
      body: "A loop is not just repetition. It is a relationship between one moment and the next. When a result feeds back into the system and alters what happens later, the system is learning, amplifying, or correcting itself. This is why loops matter in classrooms, public systems, and design studios alike.",
      tone: "reading",
    },
    {
      type: "comparisonGrid",
      id: "compare-loops",
      title:
        "Reinforcing and balancing loops solve different instructional problems.",
      legend:
        "Both are feedback loops, but they push the system in different directions.",
      caption: "Comparison of two common loop patterns",
      columns: [
        { key: "reinforcing", label: "Reinforcing loop" },
        { key: "balancing", label: "Balancing loop" },
      ],
      rows: [
        {
          label: "What it does",
          cells: [
            "Amplifies an early change so the pattern grows stronger over time.",
            "Counteracts a change so the system moves back toward a range or target.",
          ],
        },
        {
          label: "What to teach",
          cells: [
            "Why momentum and escalation can emerge from small beginnings.",
            "Why stability often depends on sensing and correction.",
          ],
        },
        {
          label: "Common learner mistake",
          cells: [
            "Calling every fast-growing pattern a loop without identifying the returned signal.",
            "Treating a correction as a separate intervention instead of part of the recurring system.",
          ],
        },
      ],
    },
    {
      type: "workedExample",
      id: "worked-example",
      title: "Worked example",
      prompt:
        "Imagine a campus kitchen that posts daily wait times outside the door.",
      steps: [
        {
          title: "Step 1: The first signal appears.",
          body: "Students see a long wait and choose the smaller serving line instead.",
        },
        {
          title: "Step 2: The system responds.",
          body: "The smaller line becomes crowded because the earlier posted result shaped the next choice.",
        },
        {
          title: "Step 3: The pattern becomes teachable.",
          body: "A learner can now point to the returned signal, the delayed effect, and the changed behavior.",
          outcome:
            "The example moves the concept from abstract language into a decision sequence.",
        },
      ],
      result:
        "The learner should leave this block able to describe the loop in one sentence and locate its returned signal.",
      reflection:
        "Ask what information must flow back for the pattern to count as a feedback loop at all.",
      visualRef: {
        visualRef: "kitchen-queue-diagram",
        alt: "Annotated queue diagram showing posted wait time changing where students line up next",
        caption: "Placeholder worked-example diagram",
        credit: "Sprint 3 concept proof",
      },
    },
    {
      type: "editorialAside",
      id: "common-mistake",
      title: "Common mistake",
      body: "Readers often call any repeated pattern a feedback loop. The real test is whether the earlier outcome changes the later condition.",
      tone: "warning",
      icon: "!",
    },
    {
      type: "pullInsight",
      quote:
        "If the next decision changes because of the last result, you are probably looking at a loop.",
      attribution: "Studio methods note",
      context:
        "Use this as a scan-first sentence before diving into a technical systems diagram.",
    },
    {
      type: "summaryGrid",
      id: "summary",
      title: "Three takeaways close the page.",
      items: [
        {
          title: "Name the returned signal",
          takeaway:
            "A loop is visible only when the earlier result feeds back into what happens next.",
        },
        {
          title: "Separate growth from correction",
          takeaway:
            "Reinforcing and balancing loops both repeat, but they shape change differently.",
        },
        {
          title: "Ground the abstraction",
          takeaway:
            "A worked example should show the learner exactly where the system changes behavior.",
          action: {
            label: "Continue to assignment demo",
            href: "#assignment-unit",
            kind: "secondary",
          },
        },
      ],
    },
    {
      type: "sourceAnchorGrid",
      title: "Sources and anchors",
      summary:
        "This block proves the page can end with evidence-aware links instead of unsupported claims.",
      items: [
        {
          title: "Systems-thinking primer",
          description:
            "Short explanatory source on reinforcing and balancing loops for novice readers.",
          href: "https://example.com/systems-primer",
          type: "Guide",
        },
        {
          title: "Campus-services queue case",
          description:
            "Applied case study showing how visible wait-time signals reshape user behavior.",
          href: "https://example.com/queue-case",
          type: "Case study",
          note: "Useful when teaching delayed effects.",
        },
      ],
    },
    {
      type: "nextStep",
      title: "Move from concept into process.",
      summary:
        "The next sample shows how the same contract layer can drive a step-based assignment page.",
      primaryAction: {
        label: "Jump to assignment unit",
        href: "#assignment-unit",
        kind: "primary",
      },
      secondaryAction: {
        label: "Review status page",
        href: "/status/",
        kind: "secondary",
      },
    },
  ],
};

export const assignmentUnit: EducationalUnitSpec = {
  id: "assignment-field-observation",
  kind: "assignment",
  recipe: "assignment-project",
  title: "A field-observation memo needs a method, not just raw notes.",
  summary:
    "Assignment-page proof of sequence, worked example, glossary, reflection, and next-step rendering from structured blocks.",
  blocks: [
    {
      type: "hero",
      eyebrow: "Assignment brief",
      title: "A field-observation memo needs a method, not just raw notes.",
      dek: "This sample shows a process-heavy page where the learner needs a concrete brief, staged sequence, and success criteria.",
      metadata: [
        { label: "Output", value: "600-word memo with one annotated sketch" },
        { label: "Time", value: "45 minutes in the field plus drafting" },
      ],
      progress: "Assignment 1 of 3",
      actions: [
        {
          label: "Skip to process steps",
          href: "#process-steps",
          kind: "secondary",
        },
      ],
    },
    {
      type: "whyItMatters",
      summary:
        "Observation assignments often fail because students collect too much detail without a frame for what counts.",
      stakes:
        "A staged method helps them notice patterns, choose evidence, and write something interpretable instead of dumping notes.",
      audience: "Useful for studio, writing, and community-research courses.",
    },
    {
      type: "section",
      id: "task-brief",
      eyebrow: "Task brief",
      title: "Observe one public space and explain how people move through it.",
      summary: "The assignment asks for interpretation, not transcription.",
      body: "Pick a place where people arrive, pause, and decide what to do next. Spend enough time there to see more than one kind of movement pattern. Your memo should explain what choices people seem to be making, what cues shape those choices, and what evidence supports your interpretation.",
      tone: "reading",
    },
    {
      type: "sequenceTimeline",
      id: "process-steps",
      title: "A short process sequence keeps the assignment usable.",
      summary:
        "The process variant proves the same component can teach staged action without pretending the page is historical or chronological.",
      mode: "process",
      items: [
        {
          label: "1",
          title: "Choose a bounded site.",
          summary:
            "Pick a place small enough to track repeated movement but busy enough to show meaningful choices.",
        },
        {
          label: "2",
          title: "Record behavior and cues.",
          summary:
            "Capture what people do and what signals may be guiding them, such as signage, noise, visibility, or bottlenecks.",
        },
        {
          label: "3",
          title: "Write the interpretive memo.",
          summary:
            "Move from notes to claim: explain the pattern, cite the evidence, and name one uncertainty.",
        },
      ],
    },
    {
      type: "workedExample",
      id: "assignment-example",
      title: "Worked example",
      prompt: "What would a strong observation look like in practice?",
      steps: [
        {
          title: "Observe a doorway",
          body: "The student notices that people slow down before entering because the signage is angled away from the main walking path.",
        },
        {
          title: "Name the pattern",
          body: "The memo explains that hesitation is not random. It clusters where visibility drops and directional cues compete.",
        },
        {
          title: "Support the claim",
          body: "The student cites three concrete moments from the observation rather than general impressions.",
          outcome: "The reader can see how evidence becomes interpretation.",
        },
      ],
      result:
        "A good worked example shows the learner what counts as usable evidence before they are asked to produce their own.",
      visualRef: {
        visualRef: "observation-memo-sketch",
        alt: "Annotated field sketch showing doorway flow and pauses",
        caption: "Placeholder assignment visual",
        credit: "Sprint 3 assignment proof",
      },
    },
    {
      type: "visualBreak",
      title: "Pause before the rubric.",
      body: "A visual or pacing break gives the learner one moment to reset before shifting from process into evaluation criteria.",
      tone: "synthesis",
      visualRef: {
        visualRef: "field-note-break",
        alt: "Simple visual break with notebook, map, and annotation marks",
      },
    },
    {
      type: "section",
      id: "success-criteria",
      eyebrow: "Success criteria",
      title:
        "Strong submissions make one claim, support it, and admit one uncertainty.",
      summary: "The criteria stay observable and instructional.",
      body: "A strong memo identifies a clear movement pattern, cites specific evidence from the site, and explains why that evidence matters. It also names one uncertainty or competing interpretation so the writing remains honest rather than performative.",
      tone: "proof",
    },
    {
      type: "glossary",
      title: "Useful terms for this assignment",
      layout: "grid",
      terms: [
        {
          term: "Cue",
          definition:
            "A signal in the environment that suggests what a person should do next.",
        },
        {
          term: "Pattern",
          definition:
            "A repeated relationship across multiple moments, not a single isolated event.",
        },
        {
          term: "Uncertainty",
          definition:
            "A place where the observer can describe a limit in the evidence or a competing explanation.",
          note: "Including one uncertainty often strengthens the memo.",
        },
      ],
    },
    {
      type: "reflectionPrompt",
      title: "Reflection before submission",
      prompt:
        "What part of your memo depends on direct evidence, and what part depends on interpretation?",
      questions: [
        "Which observation best supports your main claim?",
        "What would a skeptical reader ask you to prove more clearly?",
      ],
      mode: "write",
      timeEstimate: "5 minutes",
    },
    {
      type: "nextStep",
      title: "Shift from assignment into a supporting reading map.",
      summary:
        "The next sample shows how the same contract layer can organize optional and essential resources without turning into a raw link list.",
      primaryAction: {
        label: "Jump to reading-map unit",
        href: "#reading-map-unit",
        kind: "primary",
      },
      secondaryAction: {
        label: "Back to contract notes",
        href: "#contract-boundary",
        kind: "secondary",
      },
    },
  ],
};

export const readingMapUnit: EducationalUnitSpec = {
  id: "reading-map-design-ethics",
  kind: "reading-map",
  recipe: "reading-map",
  title: "A reading map should guide sequence, not dump links.",
  summary:
    "Reading-map proof of clustered resources, source anchors, and next-step guidance rendered from normalized link payloads.",
  blocks: [
    {
      type: "hero",
      eyebrow: "Reading map",
      title: "A reading map should guide sequence, not dump links.",
      dek: "This sample proves that resource guidance can stay instructional when clusters, notes, and next steps are encoded as first-class blocks.",
      metadata: [
        { label: "Best for", value: "Support materials and optional depth" },
        {
          label: "Suggested use",
          value: "Read core items first, then branch by need",
        },
      ],
    },
    {
      type: "section",
      id: "how-to-use",
      eyebrow: "How to use this map",
      title:
        "Start with framing, then move to cases, then deepen with methods.",
      summary:
        "The reading map becomes usable when it explains sequence and purpose instead of assuming the learner can infer both.",
      body: "Read one framing piece first so the central question is clear. Then move into one or two applied cases to see how the issue appears in practice. Use the methods cluster only when you want to go deeper or need stronger language for analysis.",
      tone: "reading",
    },
    {
      type: "readingMapGrid",
      id: "resource-clusters",
      title: "Cluster resources by job, not by arbitrary topic label.",
      progression: "Core framing -> Applied cases -> Methods and critique",
      clusters: [
        {
          title: "Core framing",
          summary:
            "Read these first so the main question and vocabulary are settled before the cases complicate them.",
          links: [
            {
              label: "Short brief on design ethics",
              href: "https://example.com/design-ethics-brief",
              note: "Five-minute orientation piece",
              type: "Guide",
            },
            {
              label: "Vocabulary note on public-interest design",
              href: "https://example.com/public-interest-design",
              note: "Useful before seminars or discussion",
              type: "Reference",
            },
          ],
        },
        {
          title: "Applied cases",
          summary:
            "Use these when you want to see how the framing question behaves in real decisions.",
          links: [
            {
              label: "Transit-signage case study",
              href: "https://example.com/transit-signage-case",
              note: "Strong example of small interface choices creating unequal navigation burdens",
              type: "Case study",
            },
          ],
        },
        {
          title: "Methods and critique",
          summary:
            "Return to these when you need a stronger method or a more skeptical reading lens.",
          links: [
            {
              label: "Interview method checklist",
              href: "https://example.com/interview-checklist",
              note: "Useful after a first pass through the assignment",
              type: "Method",
            },
            {
              label: "Short critique of convenience sampling",
              href: "https://example.com/convenience-sampling",
              note: "Best after you have already drafted a claim",
              type: "Critique",
            },
          ],
        },
      ],
    },
    {
      type: "sourceAnchorGrid",
      title: "Source anchors",
      summary:
        "This block makes the provenance layer explicit when a page is curating external material.",
      items: [
        {
          title: "Public-interest design guide",
          description:
            "Foundational framing source used to define the core question for the map.",
          href: "https://example.com/public-interest-guide",
          type: "Guide",
        },
        {
          title: "Observation-method note",
          description:
            "Short methods source that helps learners move from reading into action.",
          href: "https://example.com/observation-methods",
          type: "Method",
          note: "Paired with the assignment demo above.",
        },
      ],
    },
    {
      type: "nextStep",
      title: "Return to implementation or move into Sprint 4 recipes.",
      summary:
        "The contract layer now supports orientation, explanation, example, reflection, and resource guidance without ad hoc page logic.",
      primaryAction: {
        label: "Review process docs",
        href: "/process/",
        kind: "primary",
      },
      secondaryAction: {
        label: "Back to top",
        href: "#contract-boundary",
        kind: "secondary",
      },
      context:
        "Sprint 4 can now focus on recipe proof instead of inventing primitive shapes from scratch.",
    },
  ],
};

export const renderedUnitExamples = [
  conceptUnit,
  assignmentUnit,
  readingMapUnit,
] as const;
