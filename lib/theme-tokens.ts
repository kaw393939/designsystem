export type PanelTone =
  | "neutral"
  | "reading"
  | "emphasis"
  | "proof"
  | "reflection"
  | "synthesis"
  | "warning"
  | "next";

export const colorRoles = [
  {
    name: "Reading",
    tone: "reading",
    token: "surface-reading",
    guidance:
      "Use this for long-form reading and reference blocks.",
  },
  {
    name: "Emphasis",
    tone: "emphasis",
    token: "surface-emphasis",
    guidance:
      "Use this for page openers, orientation blocks, and big transitions.",
  },
  {
    name: "Proof",
    tone: "proof",
    token: "surface-proof",
    guidance:
      "Use this for evidence and receipts that should feel serious but calm.",
  },
  {
    name: "Reflection",
    tone: "reflection",
    token: "surface-reflection",
    guidance:
      "Use this for slower pauses, reflection prompts, and retrospective notes.",
  },
  {
    name: "Synthesis",
    tone: "synthesis",
    token: "surface-synthesis",
    guidance:
      "Use this for comparisons, clustering, summaries, and concept maps.",
  },
  {
    name: "Warning",
    tone: "warning",
    token: "surface-warning",
    guidance:
      "Use this for risk, caution, or dependency notes that need visibility without panic.",
  },
  {
    name: "Next Step",
    tone: "next",
    token: "surface-next",
    guidance:
      "Use this when the page needs to point clearly at what to do next.",
  },
] as const;

export const typographyRoles = [
  {
    name: "Hero",
    token: "type-hero",
    sample: "Big directional framing for the page's main job.",
  },
  {
    name: "Section",
    token: "type-section",
    sample:
      "Clear section titles with enough hierarchy to support scan-first reading.",
  },
  {
    name: "Body",
    token: "type-body",
    sample:
      "Long-form reading copy tuned for calm pacing and readable measure.",
  },
  {
    name: "Concept",
    token: "type-concept",
    sample:
      "Short explanatory labels for cards, concept clusters, and preview tiles.",
  },
  {
    name: "Caption",
    token: "type-caption",
    sample: "Supportive detail for examples, previews, and verification notes.",
  },
  {
    name: "Annotation",
    token: "type-annotation",
    sample:
      "Secondary notes, edge-case hints, and non-dominant side information.",
  },
  {
    name: "Metadata",
    token: "type-meta",
    sample: "Eyebrows and overlines that orient without stealing attention.",
  },
] as const;

export const layoutRoles = [
  {
    name: "Reading measure",
    token: "measure-reading",
    value: "68ch",
    guidance:
      "Long-form text should land here unless a narrower caption or wider grid is clearly better.",
  },
  {
    name: "Hero measure",
    token: "measure-hero",
    value: "18ch",
    guidance:
      "Large page statements should wrap deliberately instead of stretching across the full viewport.",
  },
  {
    name: "Panel radius",
    token: "radius-panel",
    value: "2rem",
    guidance:
      "Shared shell radius for major sections so the whole system feels coherent.",
  },
  {
    name: "Card radius",
    token: "radius-card",
    value: "1.5rem",
    guidance:
      "Secondary surfaces use a tighter radius to remain differentiated but related.",
  },
  {
    name: "Section rhythm",
    token: "space-6",
    value: "3rem",
    guidance:
      "Major sections should separate at this rhythm before resorting to custom spacing.",
  },
  {
    name: "Motion",
    token: "motion-gentle",
    value: "260ms",
    guidance:
      "Subtle hover and focus transitions stay calm and disappear for reduced-motion users.",
  },
] as const;

export const pageTypeExamples = [
  {
    title: "Lesson Page",
    tone: "reading",
    href: "/examples/lesson",
    purpose:
      "Moves you from orientation to explanation to example to reflection.",
    sections: [
      "Orientation",
      "Why it matters",
      "Core explanation",
      "Worked example",
      "Reflection",
    ],
  },
  {
    title: "Module Overview",
    tone: "synthesis",
    href: "/examples/module",
    purpose:
      "Shows the big structure, the sequence, and where to start.",
    sections: [
      "Module frame",
      "Sequence map",
      "Receipts and next move",
      "Learning arc",
      "Next step",
    ],
  },
  {
    title: "Reading Map",
    tone: "next",
    href: "/examples/reading-map",
    purpose:
      "Guides scan-first movement through sources, annotations, and suggested order.",
    sections: [
      "Reading goal",
      "Source cluster",
      "Annotations",
      "Suggested path",
      "Action",
    ],
  },
] as const;
