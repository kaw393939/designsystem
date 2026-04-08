import type { ModuleDefinition } from "@/lib/module-content/types";

export const allModules: readonly ModuleDefinition[] = [
  {
    id: "web-presence-framework",
    slug: "web-presence-framework",
    number: 1,
    title: "Web Presence Framework",
    summary:
      "Orient yourself to the Signal → Publish framework and learn to audit any site with it.",
    leaveWith: "A completed site audit using the portfolio and museum checklists.",
    weekRange: "Weeks 1–3",
    status: "coming",
    tone: "emphasis",
    lessons: [
      {
        id: "who-is-this-for",
        slug: "who-is-this-for",
        title: "Who is this for",
        summary: "Audience, need, and promise — the Signal step unpacked.",
      },
      {
        id: "pick-the-vibe",
        slug: "pick-the-vibe",
        title: "Pick the vibe",
        summary: "Archetype selection and congruence across every page.",
      },
      {
        id: "choose-the-look",
        slug: "choose-the-look",
        title: "Choose the look",
        summary: "Visual direction tied to your archetype choice.",
      },
      {
        id: "add-proof-and-publish",
        slug: "add-proof-and-publish",
        title: "Add proof and publish",
        summary: "Proof plan plus deployment in one pass.",
      },
    ],
    hasPractice: true,
    hasCheckpoint: true,
  },
  {
    id: "ai-foundations",
    slug: "ai-foundations",
    number: 2,
    title: "AI Foundations",
    summary:
      "Understand where AI came from, how models learn, and the people who built the tools you use.",
    leaveWith:
      "A one-paragraph summary of a primary source paper that changed the field.",
    weekRange: "Weeks 4–5",
    status: "preview",
    tone: "reading",
    lessons: [
      {
        id: "where-ai-came-from",
        slug: "where-ai-came-from",
        title: "Where AI came from",
        summary:
          "Seven eras of AI as one flowing story — key turning points, portraits, and a timeline.",
      },
      {
        id: "how-models-learn",
        slug: "how-models-learn",
        title: "How models learn",
        summary:
          "Vectors, similarity, latent space, and the token-to-representation pipeline explained plainly.",
      },
      {
        id: "the-people-who-built-this",
        slug: "the-people-who-built-this",
        title: "The people who built this",
        summary:
          "Key researchers and institutions grouped by era, with portraits and primary sources.",
      },
    ],
    hasPractice: true,
    hasCheckpoint: true,
  },
  {
    id: "agentic-workflow",
    slug: "agentic-workflow",
    number: 3,
    title: "Agentic Workflow",
    summary:
      "Learn the difference between chatting with AI and orchestrating it with a brief, then connect that to your build process.",
    leaveWith:
      "A build brief tested against an AI tool, with a written evaluation of the result.",
    weekRange: "Weeks 6–7",
    status: "coming",
    tone: "next",
    lessons: [
      {
        id: "chatbot-vs-agent",
        slug: "chatbot-vs-agent",
        title: "Chatbot vs. agent",
        summary:
          "What changes when AI follows a brief instead of answering a question.",
      },
      {
        id: "writing-briefs",
        slug: "writing-briefs",
        title: "Writing briefs AI can follow",
        summary:
          "The brief as the unit of orchestration — anatomy, examples, and the Build step connection.",
      },
      {
        id: "honest-limits",
        slug: "honest-limits",
        title: "When AI helps and when it does not",
        summary:
          "Hallucination, context limits, and the verification mindset.",
      },
    ],
    hasPractice: true,
    hasCheckpoint: true,
  },
  {
    id: "visual-ai",
    slug: "visual-ai",
    number: 4,
    title: "Visual AI",
    summary:
      "Prompt for images that actually serve your site — what models see, iteration patterns, and editorial judgment.",
    leaveWith:
      "Three hero images with documented prompts and annotations on what worked.",
    weekRange: "Weeks 8–9",
    status: "coming",
    tone: "synthesis",
    lessons: [
      {
        id: "how-image-models-see",
        slug: "how-image-models-see",
        title: "How image models see",
        summary:
          "Latent space applied to images — what 'style' and 'composition' mean to a model.",
      },
      {
        id: "prompting-for-images",
        slug: "prompting-for-images",
        title: "Prompting for images",
        summary:
          "Prompt structure, iteration, specificity, and avoiding clichés.",
      },
      {
        id: "editorial-judgment",
        slug: "editorial-judgment",
        title: "When to generate and when to photograph",
        summary:
          "Editorial judgment about when AI images serve a site and when they undermine trust.",
      },
    ],
    hasPractice: true,
    hasCheckpoint: true,
  },
  {
    id: "identity-and-proof",
    slug: "identity-and-proof",
    number: 5,
    title: "Identity and Proof",
    summary:
      "Deepen the identity system and proof strategy introduced in the tour to build pages that earn trust.",
    leaveWith:
      "A redesigned proof section on your own site using the audit criteria.",
    weekRange: "Weeks 10–12",
    status: "coming",
    tone: "proof",
    lessons: [
      {
        id: "identity-signals",
        slug: "identity-signals",
        title: "Identity signals",
        summary:
          "How audience, archetype, and visual direction create a coherent identity.",
      },
      {
        id: "building-proof-that-lands",
        slug: "building-proof-that-lands",
        title: "Building proof that lands",
        summary:
          "Types of evidence, placement strategy, and trust mechanics.",
      },
      {
        id: "portfolio-as-proof-system",
        slug: "portfolio-as-proof-system",
        title: "Portfolio as proof system",
        summary:
          "The portfolio itself as an identity proof artifact.",
      },
    ],
    hasPractice: true,
    hasCheckpoint: true,
  },
  {
    id: "studio-and-publish",
    slug: "studio-and-publish",
    number: 6,
    title: "Studio and Publish",
    summary:
      "Master the full build-review-publish-iterate cycle as professional practice.",
    leaveWith:
      "A published page revision with before/after documentation and a final portfolio review.",
    weekRange: "Weeks 13–16",
    status: "coming",
    tone: "reflection",
    lessons: [
      {
        id: "from-brief-to-build",
        slug: "from-brief-to-build",
        title: "From brief to build",
        summary: "Turning a build brief into a working page.",
      },
      {
        id: "review-and-revision",
        slug: "review-and-revision",
        title: "Review and revision",
        summary:
          "Studio critique methods — giving and receiving feedback that moves work forward.",
      },
      {
        id: "deployment-and-iteration",
        slug: "deployment-and-iteration",
        title: "Deployment and iteration",
        summary:
          "Publishing, measuring, and deciding what to fix next.",
      },
      {
        id: "professional-practice",
        slug: "professional-practice",
        title: "Professional practice",
        summary:
          "Maintaining a site over time — when to redesign vs. when to iterate.",
      },
    ],
    hasPractice: true,
    hasCheckpoint: true,
  },
] as const;

export function getModule(slug: string): ModuleDefinition | undefined {
  return allModules.find((m) => m.slug === slug);
}

export function getModuleByNumber(num: number): ModuleDefinition | undefined {
  return allModules.find((m) => m.number === num);
}
