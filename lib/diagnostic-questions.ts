import type { GuidedTourStepId } from "@/lib/site-navigation";

export type DiagnosticQuestion = {
  stepSlug: GuidedTourStepId;
  question: string;
  hint: string;
  href: string;
  linkLabel: string;
};

export const diagnosticQuestions: readonly DiagnosticQuestion[] = [
  /* ── Signal ────────────────────────────────────── */
  {
    stepSlug: "signal",
    question: "What makes a first impression work?",
    hint: "Learn how attention and trust form in the first seconds.",
    href: "/experiences/identity-portfolio/labs/psychology",
    linkLabel: "Explore psychology lab →",
  },
  {
    stepSlug: "signal",
    question: "I don't know what my signal should be.",
    hint: "Walk through a diagnostic that helps you identify your core signal.",
    href: "/experiences/identity-portfolio/diagnose",
    linkLabel: "Try the diagnose tool →",
  },
  {
    stepSlug: "signal",
    question: "What does a strong signal look like?",
    hint: "See real examples of effective signals.",
    href: "/examples",
    linkLabel: "Browse examples →",
  },

  /* ── Archetype ─────────────────────────────────── */
  {
    stepSlug: "archetype",
    question: "Not sure which archetype fits?",
    hint: "Answer a few questions to narrow down your archetype.",
    href: "/experiences/identity-portfolio/diagnose",
    linkLabel: "Try the diagnose tool →",
  },
  {
    stepSlug: "archetype",
    question: "Want to see all 12 archetypes in depth?",
    hint: "Compare psychology profiles, brand examples, and visual identities.",
    href: "/browse/archetypes",
    linkLabel: "Open archetype explorer →",
  },
  {
    stepSlug: "archetype",
    question: "How do archetypes connect to psychology?",
    hint: "Understand the Jungian roots and why archetypes resonate with audiences.",
    href: "/experiences/identity-portfolio/labs/archetypes",
    linkLabel: "Explore archetypes lab →",
  },

  /* ── Style ─────────────────────────────────────── */
  {
    stepSlug: "style",
    question: "Which persuasion principles apply to my design?",
    hint: "Learn the 6 persuasion moves and how they translate to visual decisions.",
    href: "/experiences/identity-portfolio/labs/persuasion",
    linkLabel: "Explore persuasion lab →",
  },
  {
    stepSlug: "style",
    question: "How do I choose colors and typography?",
    hint: "Study how design lineages connect style choices to meaning.",
    href: "/browse/design-lineages",
    linkLabel: "Browse design lineages →",
  },
  {
    stepSlug: "style",
    question: "What style matches my archetype?",
    hint: "See visual identity guidance for each archetype.",
    href: "/browse/archetypes",
    linkLabel: "Check archetype visual guides →",
  },

  /* ── Proof ─────────────────────────────────────── */
  {
    stepSlug: "proof",
    question: "What kind of evidence should I show?",
    hint: "Understand the hierarchy from anecdotal to experimental evidence.",
    href: "/browse/attention-trust",
    linkLabel: "See evidence framework →",
  },
  {
    stepSlug: "proof",
    question: "How do I collect testimonials or case studies?",
    hint: "Learn practical strategies for gathering proof.",
    href: "/modules/identity-and-proof",
    linkLabel: "Go to Identity & Proof module →",
  },
  {
    stepSlug: "proof",
    question: "Why does social proof work?",
    hint: "The psychology behind 'others like me chose this.'",
    href: "/experiences/identity-portfolio/labs/persuasion",
    linkLabel: "Explore persuasion lab →",
  },

  /* ── Build ─────────────────────────────────────── */
  {
    stepSlug: "build",
    question: "How do I write a brief an AI can follow?",
    hint: "Learn the structure of an effective AI brief.",
    href: "/modules/agentic-workflow",
    linkLabel: "Go to Agentic Workflow module →",
  },
  {
    stepSlug: "build",
    question: "What is agentic workflow?",
    hint: "Understand the difference between chatbots and agentic AI tools.",
    href: "/modules/agentic-workflow/chatbot-vs-agent",
    linkLabel: "Read: Chatbot vs Agent →",
  },
  {
    stepSlug: "build",
    question: "My design isn't coming together.",
    hint: "Step back and diagnose what's not working.",
    href: "/experiences/identity-portfolio/diagnose",
    linkLabel: "Try the diagnose tool →",
  },

  /* ── Publish ───────────────────────────────────── */
  {
    stepSlug: "publish",
    question: "What should I check before going live?",
    hint: "Walk through the pre-launch verification checklist.",
    href: "/modules/studio-and-publish",
    linkLabel: "Go to Studio & Publish module →",
  },
  {
    stepSlug: "publish",
    question: "How do I know if my site is working?",
    hint: "Learn what to measure and how to iterate after launch.",
    href: "/modules/studio-and-publish",
    linkLabel: "Go to Studio & Publish module →",
  },
  {
    stepSlug: "publish",
    question: "I want to start over with a different approach.",
    hint: "Go back to your signal and rethink from the beginning.",
    href: "/tour/signal",
    linkLabel: "Return to Signal step →",
  },
] as const;

export function getQuestionsForStep(stepSlug: GuidedTourStepId): DiagnosticQuestion[] {
  return diagnosticQuestions.filter((q) => q.stepSlug === stepSlug);
}
