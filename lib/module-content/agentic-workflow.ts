/* ------------------------------------------------------------------ */
/*  Agentic Workflow — module data                                    */
/*  Concepts, comparison, brief rubric, limitation categories         */
/* ------------------------------------------------------------------ */

// ── Types ──────────────────────────────────────────────────────────

export type ConceptEntry = {
  id: string;
  term: string;
  definition: string;
};

export type ComparisonRow = {
  dimension: string;
  chatbot: string;
  agent: string;
};

export type BriefRubricItem = {
  id: string;
  question: string;
  tip: string;
};

export type LimitationCategory = {
  id: string;
  label: string;
  tone: "next" | "warning" | "emphasis";
  items: readonly string[];
};

export type BriefSection = {
  id: string;
  title: string;
  definition: string;
  example: string;
};

// ── Concept definitions ────────────────────────────────────────────

export const concepts: readonly ConceptEntry[] = [
  {
    id: "agent",
    term: "Agent",
    definition:
      "A program that takes a goal, makes a plan, and executes steps without being told each one.",
  },
  {
    id: "orchestration",
    term: "Orchestration",
    definition:
      "Directing an AI tool through structured briefs instead of open-ended conversation.",
  },
  {
    id: "brief",
    term: "Brief",
    definition:
      "A document that tells the AI what to do, what constraints to follow, and how to know when it is done.",
  },
  {
    id: "verification",
    term: "Verification",
    definition:
      "Checking the AI's output against the brief instead of trusting it because it sounds confident.",
  },
  {
    id: "hallucination",
    term: "Hallucination",
    definition:
      "When an AI generates text that sounds correct but is factually wrong or invented.",
  },
  {
    id: "context-window",
    term: "Context window",
    definition:
      "The amount of text an AI can 'remember' in a single conversation — and what happens when it runs out.",
  },
] as const;

// ── Chatbot vs. agent comparison ───────────────────────────────────

export const comparisonRows: readonly ComparisonRow[] = [
  {
    dimension: "Input",
    chatbot: "Open-ended question",
    agent: "Structured brief with constraints",
  },
  {
    dimension: "Process",
    chatbot: "Single response to single prompt",
    agent: "Multi-step plan with verification",
  },
  {
    dimension: "Memory",
    chatbot: "Forgets between sessions",
    agent: "Brief persists as an artifact",
  },
  {
    dimension: "Control",
    chatbot: "User hopes for good output",
    agent: "User defines acceptance criteria",
  },
  {
    dimension: "Failure mode",
    chatbot: "Plausible-sounding wrong answer",
    agent: "Detectable deviation from brief",
  },
  {
    dimension: "Best for",
    chatbot: "Quick answers, brainstorming",
    agent: "Building real things, production work",
  },
] as const;

// ── Brief anatomy sections ─────────────────────────────────────────

export const briefSections: readonly BriefSection[] = [
  {
    id: "role",
    title: "Role",
    definition: "Who the AI is acting as — the expertise it should bring.",
    example:
      "Act as a senior front-end developer reviewing a portfolio site for accessibility.",
  },
  {
    id: "scope",
    title: "Scope",
    definition: "What to change and what to leave alone.",
    example:
      "Rewrite only the hero section. Do not modify the navigation, footer, or any other page section.",
  },
  {
    id: "constraints",
    title: "Constraints",
    definition: "Tone, length, format, and things to avoid.",
    example:
      "Use a direct, confident tone. Keep the paragraph to 3–4 sentences. Do not use exclamation marks or superlatives.",
  },
  {
    id: "acceptance-criteria",
    title: "Acceptance criteria",
    definition: "How to know when the output is good enough.",
    example:
      "The rewritten hero must lead with the audience need (hiring managers evaluating senior engineers) and name a specific skill.",
  },
  {
    id: "examples",
    title: "Examples",
    definition:
      "What good output looks like — the most overlooked and most powerful section.",
    example:
      "Good: 'I build accessible React applications that pass WCAG 2.1 AA.' Bad: 'I am a passionate developer who loves creating amazing experiences.'",
  },
] as const;

// ── Brief quality rubric ───────────────────────────────────────────

export const briefRubric: readonly BriefRubricItem[] = [
  {
    id: "names-role",
    question: "Does it name the role the AI should play?",
    tip: "Without a role, the model guesses who it is — and often guesses wrong.",
  },
  {
    id: "defines-scope",
    question: "Does it define the scope (what to touch, what to leave alone)?",
    tip: "Unbounded scope invites the model to rewrite everything, even parts that work.",
  },
  {
    id: "lists-constraints",
    question:
      "Does it list constraints (tone, length, format, things to avoid)?",
    tip: "Constraints prevent the model from defaulting to its most generic register.",
  },
  {
    id: "includes-criteria",
    question:
      "Does it include acceptance criteria (how to know when it is done)?",
    tip: "Without criteria, you cannot tell whether the output is good or just plausible.",
  },
  {
    id: "provides-examples",
    question: "Does it provide examples of what good output looks like?",
    tip: "Examples are worth more than paragraphs of instruction. Show, don't tell.",
  },
  {
    id: "classmate-test",
    question: "Could someone unfamiliar with the project follow it?",
    tip: "If a classmate can follow your brief, an AI tool can too.",
  },
] as const;

// ── Limitation categories ──────────────────────────────────────────

export const limitationCategories: readonly LimitationCategory[] = [
  {
    id: "helps",
    label: "AI helps",
    tone: "next",
    items: [
      "Repetitive structure — generating consistent card layouts, list formats, or boilerplate",
      "First drafts — turning bullet points into paragraphs when you already know the content",
      "Code scaffolding — creating component templates, file structures, or configuration files",
      "Reformatting — converting between formats (Markdown to HTML, CSV to JSON, etc.)",
      "Summarizing source material — condensing long documents when you can check the original",
    ],
  },
  {
    id: "struggles",
    label: "AI struggles",
    tone: "warning",
    items: [
      "Novel factual claims — assertions that require checking against primary sources",
      "Emotional nuance — tone that needs to land precisely with a specific audience",
      "Visual taste judgment — deciding whether an image actually looks good, not just fits a description",
      "Context longer than the window — multi-file codebases, long documents, or extended conversations",
      "Maintaining consistency — keeping facts, names, and dates aligned across a long output",
    ],
  },
  {
    id: "fails",
    label: "AI fails",
    tone: "emphasis",
    items: [
      "Fabricating citations — inventing paper titles, authors, or publication details that do not exist",
      "Impersonating specific people — mimicking someone's voice or making claims on their behalf",
      "Producing evidence that does not exist — generating fake testimonials, reviews, or statistics",
      "Replacing human judgment on trust-sensitive content — legal, medical, or safety-critical decisions",
    ],
  },
] as const;
