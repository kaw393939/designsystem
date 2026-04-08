import type { PanelTone } from "@/lib/theme-tokens";

export type RouteVisualPlanId =
  | "start"
  | "tour"
  | "browse"
  | "examples"
  | "signal"
  | "proof"
  | "build"
  | "publish"
  | "sources"
  | "studentExemplars"
  | "browseArchetypes"
  | "designLineages"
  | "attentionTrust"
  | "proofBlocks";

export type RouteVisualPlan = {
  id: RouteVisualPlanId;
  eyebrow: string;
  title: string;
  caption: string;
  imagePath: string;
  imageAlt: string;
  cues: readonly string[];
  tone: PanelTone;
};

export const routeVisualPlans: Record<RouteVisualPlanId, RouteVisualPlan> = {
  start: {
    id: "start",
    eyebrow: "Route orientation board",
    title: "See the audience, the look, the proof, and the build before you choose a path.",
    caption:
      "Use the board to spot the ingredients that carry through the site: audience, vibe, look, proof, and build direction.",
    imagePath: "/archetype-atlas/routes/start-orientation-board.png",
    imageAlt:
      "Editorial concept board showing a student sorting route cards, archetype portraits, proof artifacts, and a website mockup.",
    cues: ["Audience", "Vibe", "Look", "Proof"],
    tone: "synthesis",
  },
  tour: {
    id: "tour",
    eyebrow: "Guided build storyboard",
    title: "See the six steps as work changing on the page.",
    caption:
      "The storyboard keeps the path tied to real artifacts: brief notes, vibe choices, proof receipts, wireframes, and release moments.",
    imagePath: "/archetype-atlas/routes/tour-storyboard.png",
    imageAlt:
      "Six-panel storyboard showing audience notes, archetype choices, style boards, proof receipts, wireframes, and a live publish moment.",
    cues: ["Signal", "Archetype", "Style", "Publish"],
    tone: "next",
  },
  browse: {
    id: "browse",
    eyebrow: "Comparison room board",
    title: "Use browse as a wall of choices you can narrow fast.",
    caption:
      "Each room compares one kind of decision, then sends you back to the tour with a clearer call.",
    imagePath: "/archetype-atlas/routes/browse-comparison-board.png",
    imageAlt:
      "Studio wall covered with archetype portraits, style boards, proof cues, and route-map fragments.",
    cues: ["Compare", "Narrow", "Check", "Return"],
    tone: "reading",
  },
  examples: {
    id: "examples",
    eyebrow: "Outcome proof spread",
    title: "Look at examples as receipts you can learn from.",
    caption:
      "The spread keeps finished pages, proof objects, and decision trails on one surface so the change is easy to see.",
    imagePath: "/archetype-atlas/routes/examples-proof-spread.png",
    imageAlt:
      "Editorial spread showing a portfolio site, a museum page, and proof artifacts arranged as an outcome board.",
    cues: ["Outcome", "Evidence", "Transfer", "Review"],
    tone: "proof",
  },
  signal: {
    id: "signal",
    eyebrow: "Audience brief board",
    title: "Start with one person, one problem, one promise.",
    caption:
      "Use the board to keep the step tied to a real audience and first-screen promise.",
    imagePath: "/archetype-atlas/routes/signal-brief-board.png",
    imageAlt:
      "Persona planning board with a student portrait, audience notes, problem framing, and a homepage mockup.",
    cues: ["Person", "Problem", "Promise"],
    tone: "reading",
  },
  proof: {
    id: "proof",
    eyebrow: "Proof receipt board",
    title: "Put the receipts where trust has to happen.",
    caption:
      "Metrics, testimonials, screenshots, and artifacts work best when they read as one evidence system.",
    imagePath: "/archetype-atlas/routes/proof-receipt-board.png",
    imageAlt:
      "Trust-building board with a testimonial portrait, metric card, screenshot, artifact photo, and next-step button mockup.",
    cues: ["Receipt", "Trust", "Next step", "Evidence"],
    tone: "proof",
  },
  build: {
    id: "build",
    eyebrow: "Build wireframe board",
    title: "Build from a page plan you can actually review.",
    caption:
      "The wireframe, proof placement, and critique notes should make the next revision obvious.",
    imagePath: "/archetype-atlas/routes/build-wireframe-board.png",
    imageAlt:
      "Wireframe-and-review board showing page skeleton sketches, section blocks, proof placement notes, critique tags, and a laptop mockup.",
    cues: ["Wireframe", "Sections", "Proof", "Review"],
    tone: "reading",
  },
  publish: {
    id: "publish",
    eyebrow: "Public release board",
    title: "Treat publish like a public release, not a private finish.",
    caption:
      "A live page, share asset, review notes, and follow-up loop make the launch feel real.",
    imagePath: "/archetype-atlas/routes/publish-release-board.png",
    imageAlt:
      "Public-release board showing a live site on laptop and phone, a share card, peer review notes, and follow-up cues.",
    cues: ["Launch", "Share", "Review", "Repeat"],
    tone: "next",
  },
  sources: {
    id: "sources",
    eyebrow: "Source trail map",
    title: "Follow the research trail without getting lost.",
    caption:
      "Books, transcripts, QA notes, and evidence clusters should feel navigable, not buried.",
    imagePath: "/archetype-atlas/routes/sources-provenance-map.png",
    imageAlt:
      "Research source-trail map showing books, transcripts, archival cards, QA notes, diagrams, and linked evidence clusters across a studio table.",
    cues: ["Books", "Transcripts", "QA", "Evidence"],
    tone: "reflection",
  },
  studentExemplars: {
    id: "studentExemplars",
    eyebrow: "End-to-end exemplar spread",
    title: "Keep the finished page and the decisions behind it together.",
    caption:
      "The strongest exemplars let you see the outcome, the proof, and the public-facing choices at the same time.",
    imagePath: "/archetype-atlas/routes/student-exemplar-spread.png",
    imageAlt:
      "End-to-end exemplar spread showing portfolio and museum site outcomes with decision-trail artifacts, proof objects, and public-facing share moments.",
    cues: ["Portfolio", "Museum", "Proof", "Publish"],
    tone: "proof",
  },
  browseArchetypes: {
    id: "browseArchetypes",
    eyebrow: "Archetype compare strip",
    title: "Compare likely archetypes before the labels blur together.",
    caption:
      "Family cues and faces make it easier to rule options in or out on first read.",
    imagePath: "/archetype-atlas/routes/archetypes-compare-strip.png",
    imageAlt:
      "Archetype comparison hero strip showing a trio of portraits and family-cluster cues arranged as a compare board.",
    cues: ["Families", "Faces", "Fit", "Trap"],
    tone: "synthesis",
  },
  designLineages: {
    id: "designLineages",
    eyebrow: "Design lineages strip",
    title: "See the main visual lanes together before you commit.",
    caption:
      "Use the strip to judge clarity, friction, and tone before the deeper boards below.",
    imagePath: "/archetype-atlas/routes/design-lineages-strip.png",
    imageAlt:
      "Design-lineages hero strip showing Swiss grid, brutalist, and editorial style boards aligned in one compare surface.",
    cues: ["Swiss", "Brutalist", "Editorial", "Hierarchy"],
    tone: "reading",
  },
  attentionTrust: {
    id: "attentionTrust",
    eyebrow: "Trust lever strip",
    title: "Start with the trust levers that change the first screen fastest.",
    caption:
      "Authority, reciprocity, and social proof help you choose the lever before you dive into theory.",
    imagePath: "/archetype-atlas/routes/attention-trust-strip.png",
    imageAlt:
      "Attention-and-trust hero strip showing authority, reciprocity, and social proof as three contrasting trust levers with testimonial objects and interface fragments.",
    cues: ["Authority", "Reciprocity", "Social Proof", "Next step"],
    tone: "proof",
  },
  proofBlocks: {
    id: "proofBlocks",
    eyebrow: "Before-and-after proof montage",
    title: "See the proof change before you read about it.",
    caption:
      "The before-and-after view keeps the route anchored in visible change: weaker claim-first copy versus stronger receipt-first proof.",
    imagePath: "/archetype-atlas/examples/proof-blocks-before-after-board.png",
    imageAlt:
      "Before-and-after proof-block montage contrasting a weak claim-heavy section with a stronger receipt-first proof section.",
    cues: ["Before", "After", "Receipt", "Next step"],
    tone: "proof",
  },
};