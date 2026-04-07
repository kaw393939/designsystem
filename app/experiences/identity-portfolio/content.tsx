import type { IdentitySignalExplorerItem } from "@/components/identity-signal-explorer";
import type {
  GlossaryTermSpec,
  ReadingMapClusterSpec,
  SummaryItemSpec,
} from "@/lib/educational-contracts";
import { getSelectedReleaseUnit } from "@/lib/site-unit-resolver";

export const identityCoreRouteCards = [
  {
    label: "Step 1",
    title: "Choose the signal",
    summary:
      "Find the need, choose the audience, and commit to the signal that should govern the first read.",
    href: "/experiences/identity-portfolio/signal/",
  },
  {
    label: "Step 2",
    title: "Pick the visual lane",
    summary:
      "Turn that signal into hierarchy, contrast, imagery, and pacing that feel legible in the first second.",
    href: "/experiences/identity-portfolio/style/",
  },
  {
    label: "Step 3",
    title: "Earn trust with proof",
    summary:
      "Put a real artifact near the promise so trust comes from evidence instead of adjectives.",
    href: "/experiences/identity-portfolio/proof/",
  },
  {
    label: "Step 4",
    title: "Build the page stack",
    summary:
      "Assemble the hero, proof block, and CTA into a page stack that tells people what to do next.",
    href: "/experiences/identity-portfolio/build/",
  },
  {
    label: "Step 5",
    title: "Publish into weak ties",
    summary:
      "Carry the page into posts, conversations, and follow-ups until weak ties can actually remember and reuse it.",
    href: "/experiences/identity-portfolio/publish/",
  },
] as const;

export const identitySupportRouteCards = [
  {
    label: "If stuck",
    title: "Diagnose the page problem",
    summary:
      "When the page feels wrong, this route helps you tell whether the issue lives in signal, style, proof, or follow-through.",
    href: "/experiences/identity-portfolio/diagnose/",
  },
  {
    label: "Receipts",
    title: "See concrete examples",
    summary:
      "See before-and-after moves, stronger proof blocks, and page patterns that read clearly on the first pass.",
    href: "/experiences/identity-portfolio/examples/",
  },
  {
    label: "Optional lab",
    title: "Compare archetypes",
    summary:
      "Browse the twelve archetypes as meaning systems, proof styles, and visual lanes before you commit.",
    href: "/experiences/identity-portfolio/labs/archetypes/",
  },
  {
    label: "Optional lab",
    title: "Open the psychology lab",
    summary:
      "Trace the page decisions back to attention, motivation, identity, and trust.",
    href: "/experiences/identity-portfolio/labs/psychology/",
  },
  {
    label: "Optional lab",
    title: "Open the persuasion lab",
    summary:
      "See how authority, reciprocity, social proof, and consistency become honest page structure.",
    href: "/experiences/identity-portfolio/labs/persuasion/",
  },
  {
    label: "Reference",
    title: "See the system map",
    summary:
      "View the full seven-layer model behind the shorter build path.",
    href: "/experiences/identity-portfolio/system-map/",
  },
  {
    label: "Reference",
    title: "Open sources and references",
    summary:
      "Follow the research trail behind the course without losing the practical build path.",
    href: "/experiences/identity-portfolio/sources/",
  },
] as const;

export const studentStoryItems = [
  {
    name: "Maya",
    archetype: "Sage",
    role: "Accessibility-focused front-end student",
    palette: "sage" as const,
    startingPoint:
      "Her site looked polished, but reviewers still could not tell what kind of problems she was best at solving.",
    move:
      "She rebuilt the homepage around one promise: careful systems thinking, accessible interface decisions, and annotated proof blocks.",
    outcome:
      "The first read shifted from generic talent to credible method, which made follow-up conversations easier to start.",
  },
  {
    name: "Jordan",
    archetype: "Explorer",
    role: "Creative technologist with too many directions",
    palette: "sky" as const,
    startingPoint:
      "Every project on the site felt interesting on its own, but the collection had no obvious center of gravity.",
    move:
      "He chose exploration as the dominant signal and rewrote the portfolio around field tests, experiments, and public learning loops.",
    outcome:
      "Instead of looking scattered, the same projects began to read like one coherent practice of discovery.",
  },
  {
    name: "Lina",
    archetype: "Magician",
    role: "Designer trying to prove transformation work",
    palette: "rose" as const,
    startingPoint:
      "She had strong outcomes hidden inside long paragraphs, so the page felt tasteful but strategically quiet.",
    move:
      "She switched to before-and-after framing, sharper headlines, and clearer calls to action tied to transformation.",
    outcome:
      "People could finally see what changed because of her work, not just what she made.",
  },
] as const;

export const courseMapItems = [
  {
    label: "Step 1",
    title: "Decode the system",
    summary:
      "Start by extracting the need, signal, perception, trust, action, deployment, and opportunity logic from the core research.",
  },
  {
    label: "Step 2",
    title: "Choose one dominant archetype",
    summary:
      "Pick the single interpretive frame you want a first-time viewer to feel before any secondary traits show up.",
  },
  {
    label: "Step 3",
    title: "Translate identity into page decisions",
    summary:
      "The archetype becomes constraints for headlines, proof selection, visuals, tone, and page hierarchy.",
  },
  {
    label: "Step 4",
    title: "Build action paths, not just claims",
    summary:
      "Assemble the homepage, proof block, and CTA so the portfolio tells people what to do next.",
  },
  {
    label: "Step 5",
    title: "Publish and get weak-tie feedback",
    summary:
      "The course treats posts, meetups, demos, and follow-ups as the repeat loop that turns one page into recurring signal.",
  },
  {
    label: "Step 6",
    title: "Iterate with agentic tooling",
    summary:
      "Use agents to propose drafts, compare versions, and enforce constraints while keeping the final signal coherent.",
  },
] as const;

export const assignmentLadderItems = [
  {
    label: "Step 1",
    title: "Pick one need, one audience, one signal",
    summary:
      "Write a short signal brief: who you want to help, what they need, and which archetype should carry the page.",
    href: "/experiences/identity-portfolio/signal/",
  },
  {
    label: "Step 2",
    title: "Design the first screen around that signal",
    summary:
      "Choose the headline, hierarchy, proof cue, face, and visual direction so the first screen stops feeling mixed or generic.",
    href: "/experiences/identity-portfolio/style/",
  },
  {
    label: "Step 3",
    title: "Choose proof that actually earns trust",
    summary:
      "Pick the project or artifact that proves the promise fastest and place it close enough to the claim that trust does not lag.",
    href: "/experiences/identity-portfolio/proof/",
  },
  {
    label: "Step 4",
    title: "Build the page stack",
    summary:
      "Turn the signal into a homepage with one proof block and one clear CTA using the build patterns in this site.",
    href: "/experiences/identity-portfolio/build/",
  },
  {
    label: "Step 5",
    title: "Publish, test, and repeat",
    summary:
      "Share the result, ask what people understood in one glance, then tighten the page using the audit questions and public response.",
    href: "/experiences/identity-portfolio/publish/",
  },
] as const;

export const assignmentDeliverableItems: SummaryItemSpec[] = [
  {
    title: "Signal brief",
    takeaway:
      "One need, one audience, one archetype, and one homepage promise in plain language.",
    action: {
      label: "Open the signal step",
      href: "/experiences/identity-portfolio/signal/",
      kind: "secondary",
    },
  },
  {
    title: "First-screen direction",
    takeaway:
      "A headline, visual direction, proof cue, and CTA that reinforce the same signal within seconds.",
    action: {
      label: "Open the style step",
      href: "/experiences/identity-portfolio/style/",
      kind: "secondary",
    },
  },
  {
    title: "Proof page and feedback note",
    takeaway:
      "One proof page, one public share, and a short note on what viewers actually understood first.",
    action: {
      label: "Open the publish step",
      href: "/experiences/identity-portfolio/publish/",
      kind: "secondary",
    },
  },
];

export const moduleRoadmapItems = [
  {
    label: "Module 1",
    title: "Choose the signal",
    summary:
      "Pick one dominant archetype, identify the need you help satisfy, and write a homepage promise that can survive a first read.",
    output: "Signal brief + headline direction",
  },
  {
    label: "Module 2",
    title: "Design the first read",
    summary:
      "Turn the signal into perception so hierarchy, imagery, proof selection, and CTA language all reinforce the same story.",
    output: "Homepage wireframe + visual lane decisions",
  },
  {
    label: "Module 3",
    title: "Build proof, not posture",
    summary:
      "Turn projects into evidence pages so trust comes from artifacts, process, and outcomes rather than self-description alone.",
    output: "One proof block + one annotated case study",
  },
  {
    label: "Module 4",
    title: "Deploy into weak ties",
    summary:
      "The site leaves the browser and enters the world through posts, demos, meetups, follow-ups, and repeated public signal reinforcement.",
    output: "Publishing plan + repeat loop",
  },
] as const;

export const comparisonColumns = [
  { key: "default", label: "Typical polished portfolio" },
  { key: "system", label: "Identity system portfolio" },
];

export const comparisonRows = [
  {
    label: "Core question",
    cells: [
      "What should I put on the page?",
      "What should someone understand about me in the first read?",
    ],
  },
  {
    label: "Homepage",
    cells: [
      "A general introduction with many competing claims.",
      "One dominant signal that organizes the rest of the site.",
    ],
  },
  {
    label: "Project selection",
    cells: [
      "Projects are listed because they exist.",
      "Projects are chosen because they reinforce the archetype and the opportunity you want.",
    ],
  },
  {
    label: "Visual style",
    cells: [
      "The aesthetic looks current but may not mean anything.",
      "Typography, imagery, and diagram choices support the same story the copy is telling.",
    ],
  },
  {
    label: "Persuasion",
    cells: [
      "Calls to action feel bolted on at the end.",
      "Trust, clarity, proof, and commitment are built into the page structure from the start.",
    ],
  },
  {
    label: "Outcome",
    cells: [
      "A portfolio that looks finished but does not create much response.",
      "A portfolio system that helps people understand you, remember you, and contact you.",
    ],
  },
];

export const decisionStudioScenarioItems = [
  {
    title: "Looks nice, says nothing",
    summary:
      "The hero carries too many labels and none of them become a readable promise. Start by choosing the signal.",
    tag: "Common failure",
    href: "/experiences/identity-portfolio/signal/",
  },
  {
    title: "Too many projects, zero center",
    summary:
      "Every project is decent on its own, but the collection has no center of gravity. Tighten the visual lane and cut the extra directions.",
    tag: "Common failure",
    href: "/experiences/identity-portfolio/style/",
  },
  {
    title: "Smart page, no trust",
    summary:
      "The copy sounds thoughtful, but there is no screenshot, metric, artifact, or outcome near the claim. Fix proof, not adjectives.",
    tag: "Common failure",
    href: "/experiences/identity-portfolio/proof/",
  },
  {
    title: "I need receipts fast",
    summary:
      "When someone asks what the work actually looks like, go straight to examples and source-backed patterns.",
    tag: "Common failure",
    href: "/experiences/identity-portfolio/examples/",
  },
] as const;

export const designLineageItems = [
  {
    title: "Swiss clarity",
    summary:
      "Use grids, restraint, and typographic order when you want the page to feel calm, credible, and instantly readable.",
    visualSignal: "Grid, whitespace, quiet contrast, disciplined type.",
    example:
      "Swiss says, 'I can organize this for you.' Think: one strong headline, one annotated screenshot, one calm proof block instead of twelve equal-sized things yelling at you.",
    internalHref: "/tokens/",
    internalLabel: "See the token system",
    externalHref: "https://www.nngroup.com/articles/visual-hierarchy-ux-definition/",
    externalLabel: "Read NN/g on visual hierarchy",
  },
  {
    title: "Brutalist friction",
    summary:
      "Use raw contrast, hard edges, and deliberate tension when you want the page to feel blunt, urgent, or anti-corporate on purpose.",
    visualSignal: "Heavy type, sharp contrast, exposed rules, compressed spacing, deliberate friction.",
    example:
      "Brutalism says, 'Wake up, this matters.' Where Swiss calms the page down, brutalism adds bite. Use it when the work has edge, not when you just want to look louder.",
    internalHref: "/layouts/",
    internalLabel: "See layout tension in practice",
    externalHref: "https://brutalistwebsites.com/",
    externalLabel: "Browse brutalist web references",
  },
  {
    title: "Platform legibility",
    summary:
      "Borrow the Apple HIG habit of hierarchy, consistency, and calm interface behavior so the page reads as intentional on the first scroll.",
    visualSignal: "Clear priorities, stable controls, legible typography, calm density.",
    example:
      "Think: one obvious next click, stable spacing, and no mystery-meat button pile in the hero.",
    internalHref: "/layouts/",
    internalLabel: "Open the layout guide",
    externalHref: "https://developer.apple.com/design/human-interface-guidelines/",
    externalLabel: "Browse Apple HIG",
  },
  {
    title: "Pattern systems",
    summary:
      "Treat components as a language that can scale across pages without making the site feel like a random starter kit.",
    visualSignal: "Repeatable modules, stateful patterns, constrained variation.",
    example:
      "Think: your lesson page, project page, and about page feel related instead of like three cousins with different parents.",
    internalHref: "/examples/module/",
    internalLabel: "See the module example",
    externalHref: "https://atomicdesign.bradfrost.com/",
    externalLabel: "Read Atomic Design",
  },
  {
    title: "Proof-driven storytelling",
    summary:
      "Pair narrative with evidence so the site persuades through receipts instead of vague personality claims.",
    visualSignal: "Before and after frames, annotated outcomes, captions with stakes.",
    example:
      "Think: before this redesign bounce was wild, after it dropped. That hits way harder than 'I love solving problems.'",
    internalHref: "/recipes/",
    internalLabel: "Browse exemplar recipes",
    externalHref: "https://www.influenceatwork.com/7-principles-of-persuasion/",
    externalLabel: "Review persuasion principles",
  },
];

export const psychologyPrincipleItems = [
  {
    title: "Need before style",
    scholar: "Maslow and needs research",
    summary:
      "Choose the need before you choose the palette or headline structure.",
    pageMove: "Lead with one need, one audience, and one promise.",
    example:
      "Example: if your page is for someone stressed and trying to get hired, calm and clear beats flashy and mysterious.",
    href: "/experiences/identity-portfolio/signal/",
  },
  {
    title: "Identity needs coherence",
    scholar: "Erikson and identity formation",
    summary:
      "The first read lands faster when the site expresses one stable self instead of many competing selves.",
    pageMove: "Choose one dominant signal before you add nuance.",
    example:
      "Example: do not mix hacker neon, soft-caregiver copy, and corporate consultant energy on the same homepage.",
    href: "/experiences/identity-portfolio/signal/",
  },
  {
    title: "Autonomy, competence, relatedness",
    scholar: "Deci and Ryan",
    summary:
      "Pages land better when they give people choice, visible skill, and a human reason to care.",
    pageMove: "Offer choices, proof, and connection instead of generic inspiration.",
    example:
      "Example: give me one clear next click, one good artifact, and one reason this work matters to an actual person.",
    href: "/experiences/identity-portfolio/build/",
  },
  {
    title: "Attention is selective",
    scholar: "Kahneman and Tversky",
    summary:
      "People use shortcuts under pressure, so the hierarchy has to work in seconds.",
    pageMove: "Make the hierarchy obvious and the next step easy to spot.",
    example:
      "Example: if the CTA is hiding under three cute panels and a giant quote block, people are just going to miss it.",
    href: "/experiences/identity-portfolio/style/",
  },
  {
    title: "Archetypes organize meaning",
    scholar: "Jung, Mark, and Pearson",
    summary:
      "An archetype is a narrative constraint, not a diagnosis. It helps a portfolio sound like itself faster.",
    pageMove: "Let copy, imagery, and proof all point toward one center.",
    example:
      "Example: if you want Sage energy, the page should feel measured and grounded, not loud and scattered.",
    href: "/experiences/identity-portfolio/labs/archetypes/",
  },
  {
    title: "Influence has to stay ethical",
    scholar: "Cialdini and marketing ethics",
    summary:
      "Authority, reciprocity, and social proof should be structural and verifiable, not cosmetic overlays.",
    pageMove: "Use receipts, real credentials, and honest next steps.",
    example:
      "Example: a real screenshot plus a caption beats 'trusted by amazing people' with zero proof every single time.",
    href: "/experiences/identity-portfolio/proof/",
  },
] as const;

export const archetypeExplorerItems: IdentitySignalExplorerItem[] = [
  {
    id: "sage",
    title: "Sage",
    summary:
      "The Sage signal feels trustworthy because it privileges method, evidence, and quiet confidence over visual hype.",
    need: "Competence and clarity",
    persuasion: "Authority plus consistency; lead with method, receipts, and calm proof.",
    palette: "sage",
    routeHref: "/examples/lesson/",
    routeLabel: "See the long-form lesson example",
    visualMoves: ["measured grid", "restrained palette", "annotated proof", "quiet contrast"],
    vocabulary: ["audit", "method", "evidence", "clarity", "legibility"],
    proofMoves: ["decision log", "annotated case study", "systems teardown"],
    people: [
      { name: "Maya", label: "Accessibility systems builder" },
      { name: "Theo", label: "Research-heavy front-end student" },
      { name: "Nina", label: "Design audit writer" },
    ],
  },
  {
    id: "explorer",
    title: "Explorer",
    summary:
      "The Explorer signal works when the page feels like guided discovery instead of scattered experimentation.",
    need: "Autonomy and discovery",
    persuasion: "Curiosity plus commitment; invite small experiments and visible next steps.",
    palette: "sky",
    routeHref: "/examples/reading-map/",
    routeLabel: "Open the reading-map example",
    visualMoves: ["map layouts", "journey labels", "dynamic imagery", "field-note captions"],
    vocabulary: ["test", "map", "discover", "iterate", "probe"],
    proofMoves: ["prototype trail", "iteration notes", "what changed and why"],
    people: [
      { name: "Jordan", label: "Creative technologist" },
      { name: "Ari", label: "Prototype-heavy builder" },
      { name: "Sel", label: "Systems explorer" },
    ],
  },
  {
    id: "magician",
    title: "Magician",
    summary:
      "The Magician signal becomes legible when the page makes transformation visible rather than merely dramatic.",
    need: "Transformation and possibility",
    persuasion: "Reciprocity plus social proof; show what changed because of the work.",
    palette: "rose",
    routeHref: "/examples/module/",
    routeLabel: "See the overview example",
    visualMoves: ["before and after", "system diagrams", "contrast", "transformation captions"],
    vocabulary: ["shift", "unlock", "transform", "turn into", "reframe"],
    proofMoves: ["outcome comparison", "transformation story", "change metric"],
    people: [
      { name: "Lina", label: "Transformation-focused designer" },
      { name: "Rae", label: "Service redesign student" },
      { name: "Kai", label: "Before-after storyteller" },
    ],
  },
  {
    id: "caregiver",
    title: "Caregiver",
    summary:
      "The Caregiver signal earns trust through warmth, accessibility, and visible care rather than vague friendliness.",
    need: "Belonging and support",
    persuasion: "Liking plus reciprocity; make the page feel safe, useful, and attentive.",
    palette: "amber",
    routeHref: "/recipes/",
    routeLabel: "Browse supportive recipe pages",
    visualMoves: ["warm human imagery", "calm spacing", "accessibility cues", "supportive copy"],
    vocabulary: ["guide", "support", "welcome", "steady", "care"],
    proofMoves: ["helpful checklist", "onboarding guide", "accessibility receipt"],
    people: [
      { name: "Imani", label: "Inclusive UX student" },
      { name: "Rosa", label: "Community design lead" },
      { name: "Ben", label: "Support-focused builder" },
    ],
  },
  {
    id: "hero",
    title: "Hero",
    summary:
      "The Hero signal works when the challenge, the stakes, and the visible win are all easy to scan.",
    need: "Achievement and challenge",
    persuasion: "Commitment plus scarcity; rally attention around a concrete outcome.",
    palette: "amber",
    routeHref: "/status/",
    routeLabel: "See the status and progress route",
    visualMoves: ["milestones", "bold targets", "goal language", "high-contrast action zones"],
    vocabulary: ["ship", "deliver", "solve", "improve", "reach"],
    proofMoves: ["metric callout", "deadline result", "performance comparison"],
    people: [
      { name: "Dani", label: "Shipping-first engineer" },
      { name: "Micah", label: "Outcome-driven designer" },
      { name: "Tori", label: "Challenge-oriented student" },
    ],
  },
  {
    id: "everyman",
    title: "Everyman",
    summary:
      "The Everyman signal is strongest when the site feels approachable, useful, and plainly human without becoming flat.",
    need: "Belonging and simplicity",
    persuasion: "Social proof plus liking; show that people like the audience already use and trust the work.",
    palette: "sage",
    routeHref: "/examples/module/",
    routeLabel: "Return to the overview example",
    visualMoves: ["plain language", "approachable visuals", "simple templates", "familiar interaction patterns"],
    vocabulary: ["practical", "clear", "usable", "shared", "real-world"],
    proofMoves: ["peer quote", "usable template", "everyday workflow demo"],
    people: [
      { name: "Ava", label: "First-generation CS student" },
      { name: "Luis", label: "Community builder" },
      { name: "Jess", label: "Pragmatic designer" },
    ],
  },
  {
    id: "creator",
    title: "Creator",
    summary:
      "The Creator signal works when the page feels original because the decisions are specific, not because everything is styled to death.",
    need: "Expression and invention",
    persuasion: "Commitment plus originality; show the making, the taste, and the system behind the output.",
    palette: "rose",
    routeHref: "/layouts/",
    routeLabel: "Open the layout guide",
    visualMoves: ["custom compositions", "distinct type pairings", "process artifacts", "maker captions"],
    vocabulary: ["compose", "make", "shape", "craft", "prototype"],
    proofMoves: ["design iterations", "component sketches", "material studies"],
    people: [
      { name: "Noor", label: "Interface maker" },
      { name: "Ezra", label: "Motion-heavy designer" },
      { name: "Pia", label: "Brand systems builder" },
    ],
  },
  {
    id: "innocent",
    title: "Innocent",
    summary:
      "The Innocent signal feels strong when the page is open, simple, and hopeful without turning naive or empty.",
    need: "Simplicity and optimism",
    persuasion: "Liking plus clarity; reduce anxiety and make the next step feel easy.",
    palette: "sky",
    routeHref: "/recipes/",
    routeLabel: "Browse simple page recipes",
    visualMoves: ["bright whitespace", "clean imagery", "soft contrast", "simple guidance"],
    vocabulary: ["clear", "simple", "honest", "light", "open"],
    proofMoves: ["easy-start checklist", "plain-language promise", "clean before-after"],
    people: [
      { name: "June", label: "Calm product designer" },
      { name: "Milo", label: "Beginner-friendly builder" },
      { name: "Sana", label: "Service design student" },
    ],
  },
  {
    id: "rebel",
    title: "Rebel",
    summary:
      "The Rebel signal works when the page challenges the default with intent, not when it is loud for no reason.",
    need: "Freedom and disruption",
    persuasion: "Scarcity plus conviction; show what you reject and what better alternative you built.",
    palette: "amber",
    routeHref: "/status/",
    routeLabel: "Open the status route",
    visualMoves: ["raw contrast", "deliberate interruption", "bold statements", "anti-template structure"],
    vocabulary: ["reject", "break", "rewrite", "call out", "refuse"],
    proofMoves: ["sharp teardown", "provocative case study", "before-after critique"],
    people: [
      { name: "Vee", label: "Critical design student" },
      { name: "Ash", label: "Culture-focused builder" },
      { name: "Rio", label: "Anti-template designer" },
    ],
  },
  {
    id: "lover",
    title: "Lover",
    summary:
      "The Lover signal lands when the page feels intimate, intentional, and emotionally tuned instead of vague or over-romantic.",
    need: "Connection and devotion",
    persuasion: "Liking plus reciprocity; show care, closeness, and attention to detail.",
    palette: "rose",
    routeHref: "/examples/lesson/",
    routeLabel: "Open the lesson example",
    visualMoves: ["close crops", "editorial rhythm", "detail-focused imagery", "lush spacing"],
    vocabulary: ["care", "invite", "attentive", "close", "devoted"],
    proofMoves: ["testimonial excerpt", "detail study", "experience vignette"],
    people: [
      { name: "Mina", label: "Editorial designer" },
      { name: "Owen", label: "Experience-focused builder" },
      { name: "Leah", label: "Brand storyteller" },
    ],
  },
  {
    id: "jester",
    title: "Jester",
    summary:
      "The Jester signal works when the page is playful and sharp without turning into random meme soup.",
    need: "Joy and release",
    persuasion: "Liking plus surprise; make the page memorable without trashing clarity.",
    palette: "sky",
    routeHref: "/examples/module/",
    routeLabel: "See the overview example",
    visualMoves: ["unexpected captions", "playful motion", "comic contrast", "timed surprises"],
    vocabulary: ["play", "twist", "wink", "lighten", "remix"],
    proofMoves: ["humorous annotation", "unexpected demo", "playful utility cue"],
    people: [
      { name: "Nico", label: "Playful interaction designer" },
      { name: "Tess", label: "Creative coder" },
      { name: "Jay", label: "Experimental storyteller" },
    ],
  },
  {
    id: "ruler",
    title: "Ruler",
    summary:
      "The Ruler signal reads as credible when the page shows standards, governance, and repeatability rather than stiffness for its own sake.",
    need: "Order and certainty",
    persuasion: "Authority plus consistency; make the operating model explicit.",
    palette: "rose",
    routeHref: "/process/",
    routeLabel: "Open the process route",
    visualMoves: ["operating models", "premium spacing", "clear status states", "structured architecture"],
    vocabulary: ["system", "standard", "governed", "repeatable", "baseline"],
    proofMoves: ["review artifact", "workflow checkpoint", "approval trail"],
    people: [
      { name: "Elliot", label: "Design system maintainer" },
      { name: "Priya", label: "Release coordinator" },
      { name: "Sam", label: "Standards-minded builder" },
    ],
  },
];

export const persuasionPatternItems = [
  {
    title: "Authority",
    visualCue: "Put artifacts, annotated proof, and credentials close to the claim.",
    vocabularyCue: "Use audited, tested, documented, measured.",
    guardrail: "Do not borrow status the work cannot support.",
    example:
      "Instead of 'I know UX,' show the teardown, the shipped screen, and the result.",
    href: "/experiences/identity-portfolio/proof/",
  },
  {
    title: "Social proof",
    visualCue: "Show outcome snippets, peer adoption, and visible reuse instead of vague popularity claims.",
    vocabularyCue: "Use teams used, people reused, readers responded.",
    guardrail: "Keep the proof specific and verifiable.",
    example:
      "Instead of 'people loved it,' say '27 people reused this template during critique week.'",
    href: "/experiences/identity-portfolio/examples/",
  },
  {
    title: "Reciprocity",
    visualCue: "Offer a helpful framework, checklist, or guide before asking for attention.",
    vocabularyCue: "Use share, guide, give, help, support.",
    guardrail: "The value has to be real, not bait for a CTA.",
    example: "Give the checklist first, ask for the meeting second.",
    href: "/experiences/identity-portfolio/publish/",
  },
  {
    title: "Consistency",
    visualCue: "Use one signal across hero, proof, CTA, and follow-up so the audience sees the same story repeatedly.",
    vocabularyCue: "Repeat a stable promise in slightly different forms across the route.",
    guardrail: "Consistency should clarify meaning, not flatten personality.",
    example:
      "If the hero says careful systems thinker, the proof cards cannot suddenly sound like crypto launch copy.",
    href: "/experiences/identity-portfolio/signal/",
  },
  {
    title: "Liking",
    visualCue: "Use faces, warm captions, and shared context so the page feels like a person, not a brochure.",
    vocabularyCue: "Use language that sounds attentive, grounded, and specific.",
    guardrail: "Warmth works only when the work still looks competent.",
    example:
      "A real face and a grounded caption beat a glossy faceless wall almost every time.",
    href: "/experiences/identity-portfolio/examples/",
  },
  {
    title: "Scarcity and unity",
    visualCue: "Reserve urgency for real moments and use belonging language only when community is honest.",
    vocabularyCue: "Use now only when the timing is real and together only when the group is real.",
    guardrail: "No fake urgency, no forced tribe language.",
    example:
      "If there is no deadline, do not invent one. People can smell fake urgency instantly.",
    href: "/experiences/identity-portfolio/publish/",
  },
] as const;

export const signalVocabularyTerms: GlossaryTermSpec[] = [
  {
    term: "Restrained",
    definition:
      "Cut ornament, use measured claims, and let proof do the persuasive work.",
    note: "Often aligns with Sage or Ruler signals.",
  },
  {
    term: "Exploratory",
    definition:
      "Use language that sounds like testing, mapping, and discovering in public.",
    note: "Often aligns with Explorer signals.",
  },
  {
    term: "Transformational",
    definition:
      "Write in a way that makes change visible rather than merely exciting.",
    note: "Often aligns with Magician signals.",
  },
  {
    term: "Supportive",
    definition:
      "Use calm, practical phrasing that lowers anxiety and increases trust.",
    note: "Often aligns with Caregiver or Everyman signals.",
  },
  {
    term: "Proof block",
    definition:
      "A compact cluster of evidence, method, and outcome that turns a claim into something readable and believable.",
    note: "Useful across every archetype.",
  },
  {
    term: "Weak-tie signal",
    definition:
      "A page, post, or artifact that gives acquaintances enough clarity to remember, share, or reply.",
    note: "This is how deployment turns into opportunity.",
  },
];

export const referenceLibraryClusters: ReadingMapClusterSpec[] = [
  {
    title: "My page looks polished but still says nothing",
    summary:
      "Open these when the page looks decent but the signal is still mush.",
    links: [
      {
        label: "Self-Determination Theory overview",
        href: "https://selfdeterminationtheory.org/the-theory/",
        note: "Useful when the page has surface polish but no clear human need.",
        type: "External",
      },
      {
        label: "Carl Jung biography",
        href: "https://www.britannica.com/biography/Carl-Jung",
        note: "Background on archetypal thinking and the symbolic roots of recurring signals.",
        type: "External",
      },
      {
        label: "Return to the psychology lab",
        href: "/experiences/identity-portfolio/labs/psychology/",
        note: "Course translation of the same ideas with direct page-level applications.",
        type: "Internal",
      },
    ],
  },
  {
    title: "I need trust, not fake marketing sauce",
    summary:
      "Open these when the page needs stronger trust cues without exaggeration.",
    links: [
      {
        label: "Cialdini principles overview",
        href: "https://www.influenceatwork.com/7-principles-of-persuasion/",
        note: "Read this when you want the framework behind reciprocity, social proof, and commitment.",
        type: "External",
      },
      {
        label: "AMA Code of Conduct",
        href: "https://myama.my.site.com/s/article/AMA-Code-of-Conduct",
        note: "Helpful reset when the copy starts sounding manipulative or ethically thin.",
        type: "External",
      },
      {
        label: "Review the proof route",
        href: "/experiences/identity-portfolio/proof/",
        note: "This is where the trust question becomes a concrete proof decision.",
        type: "Internal",
      },
    ],
  },
  {
    title: "I need a visual direction that does not feel random",
    summary:
      "Use these when the page has too many aesthetics fighting each other.",
    links: [
      {
        label: "Apple Human Interface Guidelines",
        href: "https://developer.apple.com/design/human-interface-guidelines/",
        note: "Useful when the visual hierarchy needs to become calmer and clearer.",
        type: "External",
      },
      {
        label: "NN/g on visual hierarchy",
        href: "https://www.nngroup.com/articles/visual-hierarchy-ux-definition/",
        note: "Useful when too many elements compete at the same volume.",
        type: "External",
      },
      {
        label: "Brad Frost's Atomic Design",
        href: "https://atomicdesign.bradfrost.com/",
        note: "Useful when the pages need a stronger shared system.",
        type: "External",
      },
      {
        label: "Open the token guide",
        href: "/tokens/",
        note: "Open this when you want the working design system inside the site.",
        type: "Internal",
      },
    ],
  },
  {
    title: "Show me a real page, not another theory paragraph",
    summary:
      "Open these when you need receipts and page structure right now.",
    links: [
      {
        label: "Overview page example",
        href: "/examples/module/",
        note: "Strong opening screen and a clean route through the content.",
        type: "Internal",
      },
      {
        label: "Lesson page example",
        href: "/examples/lesson/",
        note: "Good for dense content that still needs pacing.",
        type: "Internal",
      },
      {
        label: "Recipe pages",
        href: "/recipes/",
        note: "A catalog of page patterns you can adapt directly.",
        type: "Internal",
      },
      {
        label: "Process route",
        href: "/process/",
        note: "The behind-the-scenes review loop behind the page.",
        type: "Internal",
      },
    ],
  },
];

export const moduleOnePrepItems = [
  {
    title: "Audience",
    summary:
      "Name the person you want to recognize themselves in the page before you touch the visual layer.",
    tag: "Question 1",
  },
  {
    title: "Need",
    summary:
      "Name the human need or tension your work is promising to help with before you start styling the answer.",
    tag: "Question 2",
  },
  {
    title: "Signal",
    summary:
      "Choose the archetype and one-sentence promise that should govern the first read.",
    tag: "Question 3",
  },
] as const;

export const buildLoopItems = [
  {
    label: "Loop 1",
    title: "Read and extract",
    summary:
      "Use the core doc and source files to collect claims, tensions, and practical rules rather than treating research as decoration.",
  },
  {
    label: "Loop 2",
    title: "Constrain the signal",
    summary:
      "Choose the archetype, audience, and proof angle before asking an agent to draft copy or layouts.",
  },
  {
    label: "Loop 3",
    title: "Generate candidate pages",
    summary:
      "Use agents to propose headings, proof structures, diagrams, and portfolio sections inside those constraints.",
  },
  {
    label: "Loop 4",
    title: "Review for clarity and ethics",
    summary:
      "Check that the page remains legible, honest, trustworthy, and obvious about the next step to a first-time visitor.",
  },
  {
    label: "Loop 5",
    title: "Publish, observe, and repeat",
    summary:
      "Ship the page, share it, and use reactions, questions, and opportunities as feedback instead of guessing in private forever.",
  },
] as const;

export const deploymentKitItems = [
  {
    title: "Portfolio page",
    summary:
      "One calm homepage with a dominant signal, one proof angle, and one clear next action beats five half-formed pages.",
    tag: "Asset",
  },
  {
    title: "Publishing note",
    summary:
      "Translate the page into a short LinkedIn post or studio note so weak ties see the same signal in public.",
    tag: "Asset",
  },
  {
    title: "Meetup opener",
    summary:
      "Bring one sentence, one image, and one proof story so people know what to remember after a quick conversation.",
    tag: "Move",
  },
  {
    title: "Follow-up loop",
    summary:
      "Send the page after a conversation, log what questions repeat, and use those questions to tighten the next version.",
    tag: "Move",
  },
] as const;

export const outcomeItems: SummaryItemSpec[] = [
  {
    title: "A clear portfolio point of view",
    takeaway:
      "You can describe your dominant signal in one sentence and make the homepage prove it.",
    action: {
      label: "Review the signal step",
      href: "/experiences/identity-portfolio/signal/",
      kind: "secondary",
    },
  },
  {
    title: "A research-backed design rationale",
    takeaway:
      "You can explain why motivation, attention, persuasion, and signaling affect your portfolio choices.",
  },
  {
    title: "A proof-first build workflow",
    takeaway:
      "You leave with a method for turning sources into pages, visuals, and public artifacts through agentic iteration.",
    action: {
      label: "See the build route",
      href: "/experiences/identity-portfolio/build/",
      kind: "secondary",
    },
  },
  {
    title: "A portfolio you can keep using",
    takeaway:
      "The final site supports internships, independent work, collaboration, and public publishing after the course ends.",
  },
];

export const signalAuditItems = [
  {
    title: "Five-second coherence",
    summary:
      "Can a stranger name the dominant signal after one quick scan of the hero and proof blocks?",
    tag: "Rubric",
  },
  {
    title: "One-sentence clarity",
    summary:
      "Can the homepage state who the work is for, what it solves, and why it matters without hedging?",
    tag: "Rubric",
  },
  {
    title: "Proof beats vibe",
    summary:
      "Do the strongest artifacts appear early enough to earn trust before the reader has to infer competence?",
    tag: "Rubric",
  },
  {
    title: "Action is obvious",
    summary:
      "After the first proof block, is the next step clear, small, and worth taking?",
    tag: "Rubric",
  },
  {
    title: "Trust stays honest",
    summary:
      "Are authority, reciprocity, and commitment built honestly into the structure rather than layered on as pressure tactics?",
    tag: "Rubric",
  },
  {
    title: "Publish and repeat",
    summary:
      "Is the site connected to posts, follow-ups, and real conversations, or does it still stop at the page itself?",
    tag: "Rubric",
  },
] as const;

export const fieldGuideItems = [
  {
    title: "Homepage is giving chaos",
    summary:
      "Cut to one need, one dominant signal, one proof angle, and one CTA before you add another block.",
    href: "/experiences/identity-portfolio/signal/",
  },
  {
    title: "Looks polished, still generic",
    summary:
      "Return to the style route and rewrite the design choices so the same signal appears in copy, visuals, and proof.",
    href: "/experiences/identity-portfolio/style/",
  },
  {
    title: "People say cool and then vanish",
    summary:
      "Use the publish route: post the page, bring it into weak ties, follow up, and watch what questions repeat.",
    href: "/experiences/identity-portfolio/publish/",
  },
  {
    title: "Story works, receipts are weak",
    summary:
      "Replace broad self-description with one artifact that makes the promise visible in under a minute.",
    href: "/experiences/identity-portfolio/proof/",
  },
] as const;

export const signalGuardrails = [
  "Pick one real audience and one primary archetype before you add secondary traits.",
  "Do not mix audience, promise, and proof for three different versions of yourself on the same first screen.",
  "If the signal cannot survive one sentence, it is not ready to govern the page.",
];

export const styleGuardrails = [
  "Do not borrow a visual style that contradicts the signal you picked on the previous step.",
  "Use faces, contrast, and novelty only when they sharpen meaning or guide attention.",
  "If everything is equally loud, nothing is helping the first read.",
];

export const systemGuardrails = [
  "Every page needs one dominant job: attention, understanding, trust, or action.",
  "Deployment is part of the system, not the bonus round after the portfolio is done.",
  "The route map should reduce confusion, not preserve every good idea on one screen.",
];

export const proofGuardrails = [
  "Put the strongest artifact or outcome near the claim it supports.",
  "Specific, verifiable proof beats broad, flattering adjectives every time.",
  "Trust patterns should make the page clearer, not more sales-scripted.",
];

const systemDiagramStages = [
  "Motivation",
  "Identity",
  "Perception",
  "Trust",
  "Action",
  "Deployment",
  "Opportunity",
];

export function getAdaptedArchetypeUnit() {
  const unit = getSelectedReleaseUnit("choose-primary-archetype");

  return {
    ...unit,
    summary: "Commit to one dominant portfolio signal without flattening nuance.",
    blocks: unit.blocks.map((block) => {
      if (block.type === "whyItMatters") {
        return {
          ...block,
          summary:
            "Trying to project every trait at once usually makes the portfolio noisier.",
        };
      }

      if (block.type === "section" && block.id === "definition") {
        return {
          ...block,
          body:
            "You do not need to flatten your personality into one cliche. You need one dominant interpretive frame that keeps the portfolio readable. That frame helps people understand why the work belongs together before secondary traits add range.",
        };
      }

      if (block.type === "workedExample") {
        return {
          ...block,
          prompt:
            "You want to appear rigorous, warm, and rebellious all at once on your homepage.",
        };
      }

      if (block.type !== "sourceAnchorGrid") {
        return block;
      }

      return {
        ...block,
        items: block.items.map((item) =>
          item.href === "docs/_research/identity.md"
            ? {
                ...item,
                href: "/experiences/identity-portfolio/sources/",
                note:
                  "Stay in the site for the working version. Open Sources if you want the longer research trail.",
              }
            : item,
        ),
      };
    }),
  };
}

export function IdentitySystemDiagram() {
  return (
    <div className="space-y-4 rounded-(--radius-panel) border border-(--border-synthesis) bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(228,234,242,0.7))] p-5 shadow-(--shadow-card)">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="type-meta text-(--accent-strong)">System flow</p>
          <p className="mt-2 type-concept text-(--ink-strong)">
            Need to opportunity system
          </p>
        </div>
        <p className="type-caption text-(--ink-body)">Course model</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {systemDiagramStages.map((stage, index) => (
          <div
            key={stage}
            className="rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.7)] p-4"
          >
            <p className="type-meta text-(--accent-strong)">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 type-concept text-(--ink-strong)">{stage}</p>
            <p className="mt-2 type-annotation text-(--ink-body)">
              {index === 0
                ? "What people want or fear frames the promise."
                : index === 1
                  ? "One dominant archetype makes the signal legible."
                  : index === 2
                    ? "Hierarchy and visuals decide whether the idea gets noticed."
                    : index === 3
                      ? "Proof and ethical persuasion reduce uncertainty honestly."
                      : index === 4
                        ? "A clear CTA tells the reader what to do next."
                        : index === 5
                          ? "Posts, conversations, and follow-ups put the signal into circulation."
                          : "Repeated exposure creates interviews, clients, collaborators, and invitations."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AIPortfolioPressureMap() {
  const bars = [
    { label: "Surface polish", width: 180, color: "#bfa07b" },
    { label: "Clear point of view", width: 260, color: "#8f6c48" },
    { label: "Proof of work", width: 340, color: "#6e8a64" },
    { label: "Public follow-through", width: 410, color: "#4d6680" },
  ];

  return (
    <div
      role="img"
      aria-label="Teaching chart showing that surface polish is easier to generate while proof of work and public follow-through are harder to fake"
      className="overflow-hidden rounded-(--radius-panel) border border-(--border-neutral) bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(245,241,231,0.92))] p-4"
    >
      <svg viewBox="0 0 520 360" className="h-auto w-full">
        <rect x="42" y="56" width="430" height="236" rx="24" fill="#fcfaf6" stroke="#d7d4ce" strokeWidth="2" />
        <text x="42" y="30" fontSize="22" fontFamily="Georgia, serif" fill="#223243">
          AI pressure map for student portfolios
        </text>
        <text x="42" y="334" fontSize="15" fontFamily="system-ui, sans-serif" fill="#6b7280">
          Easier to imitate
        </text>
        <text x="346" y="334" fontSize="15" fontFamily="system-ui, sans-serif" fill="#6b7280">
          Harder to fake
        </text>
        {bars.map((bar, index) => {
          const y = 92 + index * 52;

          return (
            <g key={bar.label}>
              <text
                x="62"
                y={y + 18}
                fontSize="16"
                fontFamily="system-ui, sans-serif"
                fill="#223243"
              >
                {bar.label}
              </text>
              <rect x="62" y={y + 24} width="388" height="18" rx="9" fill="#ece7dd" />
              <rect x="62" y={y + 24} width={bar.width} height="18" rx="9" fill={bar.color} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function WeakTieOpportunityMap() {
  const nodes = [
    { x: 34, y: 122, w: 116, label: "Publish" },
    { x: 178, y: 52, w: 136, label: "Share in public" },
    { x: 178, y: 192, w: 136, label: "Bring to weak ties" },
    { x: 350, y: 122, w: 128, label: "Follow up" },
    { x: 512, y: 122, w: 140, label: "Opportunity" },
  ] as const;

  return (
    <div
      role="img"
      aria-label="Flow diagram showing the path from publishing work to weak ties and opportunity"
      className="overflow-hidden rounded-(--radius-panel) border border-(--border-neutral) bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(228,234,242,0.86))] p-4"
    >
      <svg viewBox="0 0 690 320" className="h-auto w-full">
        <text x="22" y="32" fontSize="22" fontFamily="Georgia, serif" fill="#223243">
          Weak ties turn a page into a career signal
        </text>
        <path d="M150 146h28" stroke="#6e8a64" strokeWidth="6" strokeLinecap="round" />
        <path d="M314 84h36" stroke="#6e8a64" strokeWidth="6" strokeLinecap="round" />
        <path d="M314 230h36" stroke="#6e8a64" strokeWidth="6" strokeLinecap="round" />
        <path d="M478 146h34" stroke="#6e8a64" strokeWidth="6" strokeLinecap="round" />
        <path d="M246 122c18 0 28 8 40 24" stroke="#8f6c48" strokeWidth="4" fill="none" strokeDasharray="8 10" />
        <path d="M246 198c18 0 28-8 40-24" stroke="#8f6c48" strokeWidth="4" fill="none" strokeDasharray="8 10" />
        {nodes.map((node, index) => (
          <g key={node.label}>
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height="56"
              rx="20"
              fill={index === nodes.length - 1 ? "#dce7d6" : "#ffffff"}
              stroke="#c6d0dc"
              strokeWidth="2"
            />
            <text
              x={node.x + node.w / 2}
              y={node.y + 34}
              textAnchor="middle"
              fontSize="18"
              fontFamily="Georgia, serif"
              fill="#223243"
            >
              {node.label}
            </text>
          </g>
        ))}
        <text x="44" y="254" fontSize="15" fontFamily="system-ui, sans-serif" fill="#6b7280">
          Site or proof page
        </text>
        <text x="190" y="254" fontSize="15" fontFamily="system-ui, sans-serif" fill="#6b7280">
          Post, note, demo, critique
        </text>
        <text x="364" y="254" fontSize="15" fontFamily="system-ui, sans-serif" fill="#6b7280">
          DM, email, coffee, reply
        </text>
        <text x="526" y="254" fontSize="15" fontFamily="system-ui, sans-serif" fill="#6b7280">
          Interview, client, talk
        </text>
      </svg>
    </div>
  );
}

export function ScholarSignalConstellation() {
  const nodes = [
    { x: 116, y: 100, label: "Maslow", note: "need" },
    { x: 458, y: 92, label: "Deci + Ryan", note: "motivation" },
    { x: 112, y: 258, label: "Jung", note: "archetype" },
    { x: 300, y: 282, label: "Kahneman + Tversky", note: "attention" },
    { x: 500, y: 252, label: "Cialdini", note: "influence" },
  ];

  return (
    <div
      role="img"
      aria-label="Constellation diagram linking Maslow, Erikson, Deci and Ryan, Jung, Kahneman and Tversky, and Cialdini to the portfolio system"
      className="overflow-hidden rounded-(--radius-panel) border border-(--border-synthesis) bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(228,234,242,0.88))] p-4"
    >
      <svg viewBox="0 0 660 380" className="h-auto w-full">
        <text x="22" y="34" fontSize="22" fontFamily="Georgia, serif" fill="#223243">
          The portfolio system is built from named schools of thought
        </text>
        <circle cx="332" cy="180" r="86" fill="#ffffff" stroke="#c6d0dc" strokeWidth="3" />
        <text x="332" y="170" textAnchor="middle" fontSize="24" fontFamily="Georgia, serif" fill="#223243">
          Portfolio
        </text>
        <text x="332" y="202" textAnchor="middle" fontSize="24" fontFamily="Georgia, serif" fill="#223243">
          signal system
        </text>
        {nodes.map((node) => (
          <g key={node.label}>
            <path d={`M332 180 L${node.x} ${node.y}`} stroke="#7d9875" strokeWidth="4" strokeDasharray="8 10" />
            <circle cx={node.x} cy={node.y} r="42" fill="#fcfaf6" stroke="#d7d4ce" strokeWidth="2" />
            <text x={node.x} y={node.y - 6} textAnchor="middle" fontSize="16" fontFamily="Georgia, serif" fill="#223243">
              {node.label}
            </text>
            <text x={node.x} y={node.y + 16} textAnchor="middle" fontSize="13" fontFamily="system-ui, sans-serif" fill="#6b7280">
              {node.note}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function PersuasionPatternBoard() {
  const cards = [
    {
      title: "Authority",
      x: 48,
      y: 74,
      accent: "#6e8a64",
      detail: "proof + credentials",
    },
    {
      title: "Social proof",
      x: 356,
      y: 74,
      accent: "#4d6680",
      detail: "visible reuse",
    },
    {
      title: "Reciprocity",
      x: 48,
      y: 212,
      accent: "#b78d54",
      detail: "help before ask",
    },
    {
      title: "Consistency",
      x: 356,
      y: 212,
      accent: "#8f6c48",
      detail: "same signal across pages",
    },
  ];

  return (
    <div
      role="img"
      aria-label="Four-card persuasion board showing authority, social proof, reciprocity, and consistency as interface behaviors"
      className="overflow-hidden rounded-(--radius-panel) border border-(--border-proof) bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,241,231,0.92))] p-4"
    >
      <svg viewBox="0 0 660 380" className="h-auto w-full">
        <text x="24" y="34" fontSize="22" fontFamily="Georgia, serif" fill="#223243">
          Persuasion should show up as structure, not as tricks
        </text>
        {cards.map((card) => (
          <g key={card.title}>
            <rect x={card.x} y={card.y} width="256" height="108" rx="24" fill="#ffffff" stroke="#d7d4ce" strokeWidth="2" />
            <rect x={card.x + 22} y={card.y + 22} width="62" height="62" rx="18" fill={card.accent} opacity="0.2" />
            <rect x={card.x + 104} y={card.y + 30} width="116" height="14" rx="7" fill={card.accent} opacity="0.82" />
            <rect x={card.x + 104} y={card.y + 56} width="132" height="12" rx="6" fill="#d7d4ce" />
            <text x={card.x + 104} y={card.y + 96} fontSize="16" fontFamily="system-ui, sans-serif" fill="#6b7280">
              {card.detail}
            </text>
            <text x={card.x + 24} y={card.y + 138} fontSize="24" fontFamily="Georgia, serif" fill="#223243">
              {card.title}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}