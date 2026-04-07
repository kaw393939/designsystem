import type { LocalNavItem } from "@/components/local-nav";
import type { PanelTone } from "@/lib/theme-tokens";

export const layoutPrimitiveNotes: Array<{
  name: string;
  tone: PanelTone;
  purpose: string;
  proof: string;
}> = [
  {
    name: "PageShell",
    tone: "reading",
    purpose:
      "Keeps the outer frame, background, skip link, header, footer, and shared width rules stable.",
    proof:
      "Use it when you do not want to hand-tune the outside frame on every page.",
  },
  {
    name: "LessonShell",
    tone: "emphasis",
    purpose:
      "Pairs reading-width lesson content with optional local navigation and progress context.",
    proof:
      "Best when a long page needs progress, local nav, and calm reading width at the same time.",
  },
  {
    name: "ProseBlock",
    tone: "reading",
    purpose:
      "Standardizes readable text measure and section rhythm for long-form explanation.",
    proof:
      "Best when the page needs real explanation, not just summary cards.",
  },
  {
    name: "EditorialBand",
    tone: "synthesis",
    purpose:
      "Creates wide structural bands that still align inner content to the page system.",
    proof:
      "Use it for page openers and transitions that need room to breathe.",
  },
  {
    name: "SplitLayout",
    tone: "proof",
    purpose:
      "Pairs related regions such as explanation plus example or media plus annotation.",
    proof: "Best when one idea needs a main explanation plus a supporting side.",
  },
  {
    name: "ContentGrid",
    tone: "neutral",
    purpose:
      "Builds responsive card grids that collapse cleanly without page-specific rescue wrappers.",
    proof:
      "Best when cards need to breathe on desktop and collapse cleanly on mobile.",
  },
  {
    name: "CalloutBand",
    tone: "warning",
    purpose:
      "Holds proof, warning, reflection, or next-step notes without breaking the page rhythm.",
    proof:
      "Best when one bounded note needs to stand out without becoming a giant detour.",
  },
  {
    name: "MediaBlock",
    tone: "proof",
    purpose:
      "Keeps visual media, caption, credit, and annotation together in one export-safe primitive.",
    proof:
      "Best when a visual and a note need to land as one idea.",
  },
  {
    name: "LocalNav",
    tone: "next",
    purpose:
      "Provides optional on-page orientation that stays readable and keyboard reachable on small screens.",
    proof:
      "Best when a long page needs orientation without taking over the main read.",
  },
];

export const examplePageCards: Array<{
  title: string;
  href: string;
  tone: PanelTone;
  summary: string;
}> = [
  {
    title: "Module Overview Example",
    href: "/examples/module",
    tone: "synthesis",
    summary:
      "Use this when the page has to explain the big picture and the first move in the same screen.",
  },
  {
    title: "Lesson Example",
    href: "/examples/lesson",
    tone: "reading",
    summary:
      "Use this when the page needs real explanation, support blocks, and a clear ending.",
  },
  {
    title: "Reading Map Example",
    href: "/examples/reading-map",
    tone: "next",
    summary:
      "Use this when you need to guide someone through sources without dumping everything at once.",
  },
];

export const lessonNavItems: LocalNavItem[] = [
  {
    id: "orientation",
    label: "Orientation",
    description: "What this lesson is for and why it matters.",
  },
  {
    id: "comparison",
    label: "Comparison",
    description: "How wide and narrow layouts cooperate.",
  },
  {
    id: "worked-example",
    label: "Worked example",
    description: "A split layout and media treatment.",
  },
  {
    id: "reflection",
    label: "Reflection",
    description: "How the shell ends with a next action.",
  },
];

export const moduleCards = [
  {
    title: "Orientation and promise",
    summary: "How the module frames its outcome before diving into detail.",
  },
  {
    title: "Structural pathway",
    summary: "How the lessons relate to each other and why that order matters.",
  },
  {
    title: "Receipts and next move",
    summary:
      "How the page uses evidence, success criteria, and next steps together.",
  },
];

export const readingMapClusters = [
  {
    title: "Start here",
    summary:
      "Read the foundation spec, then the runbook, then the planning and QA rules so the rest makes sense.",
    items: ["Foundation spec", "Operating runbook", "Planning QA spec"],
  },
  {
    title: "What already shipped",
    summary:
      "Use these artifacts when you want to see what actually happened, not what was hoped for.",
    items: [
      "Scaffold implementation QA",
      "Sprint 1 implementation QA",
      "Planning artifacts",
    ],
  },
  {
    title: "What comes next",
    summary:
      "Use the sprint briefs as the future queue, not as proof the work already exists.",
    items: ["Sprint 2 brief", "Sprint 3 brief", "Deployment spec"],
  },
];
