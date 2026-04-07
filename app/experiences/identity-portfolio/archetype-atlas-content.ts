import type { IdentitySignalExplorerItem } from "@/components/identity-signal-explorer";

type ArchetypeStoryItem = {
  title: string;
  archetype: string;
  summary: string;
  lesson: string;
  quote?: string;
};

export const archetypeDoctrineItems = [
  {
    title: "Meaning is the strategic asset",
    summary:
      "Mark and Pearson argue that when features become easy to imitate, the felt meaning of the brand becomes the part competitors cannot simply copy.",
    quote: "The meaning of a brand is its most precious and irreplaceable asset.",
  },
  {
    title: "One dominant center beats a blur",
    summary:
      "A portfolio becomes legible when one archetype clearly outranks the rest instead of sharing equal weight with competing signals.",
    quote:
      "Meaning management is the missing link between customer motivation and product sales.",
  },
  {
    title: "Archetypes are recurring human motivations",
    summary:
      "These are not decorative moods or quiz results. They are stable public patterns that help people recognize what kind of promise they are being offered.",
    quote: "Archetypes are the software of the psyche.",
  },
  {
    title: "Every archetype has a shadow",
    summary:
      "Hero can become bullying, Outlaw can become cynical destruction, and Magician can become manipulation. The trap belongs in the strategy pack next to the promise.",
    quote:
      "Every archetype has a trap; understanding it lets you guard against negativity.",
  },
] as const;

export const archetypeClusterItems = [
  {
    title: "Yearning for Paradise",
    members: ["Innocent", "Explorer", "Sage"],
    summary:
      "This cluster promises relief, discovery, or understanding. The page should feel like renewal, a frontier, or a clearer way of seeing.",
    decision:
      "Choose this family when your promise is peace, self-discovery, or hard-won clarity.",
  },
  {
    title: "Leaving a Thumbprint on the World",
    members: ["Hero", "Outlaw", "Magician"],
    summary:
      "This cluster is about proving worth, breaking stale systems, or making transformation visible. The page needs stakes, threshold, and consequence.",
    decision:
      "Choose this family when the work must demonstrate courage, disruption, or change.",
  },
  {
    title: "No Man or Woman Is an Island",
    members: ["Regular Guy/Gal", "Lover", "Jester"],
    summary:
      "This cluster centers belonging, intimacy, and social warmth. The page should feel welcoming, memorable, and unmistakably human.",
    decision:
      "Choose this family when the promise depends on connection, acceptance, or delight.",
  },
  {
    title: "Providing Structure to the World",
    members: ["Caregiver", "Creator", "Ruler"],
    summary:
      "This cluster is about stewardship, invention, and order. The page should reassure the viewer that something important is being built, shaped, or held together.",
    decision:
      "Choose this family when the promise depends on care, craft, or authority.",
  },
] as const;

export const archetypeStoryItems: readonly ArchetypeStoryItem[] = [
  {
    title: "Nelson Mandela",
    archetype: "Hero",
    summary:
      "The book treats Mandela as Hero at the highest level: strength used to free people from hatred, not simply to defeat an enemy.",
    lesson:
      "Choose Hero when the page promises disciplined courage in service of something larger than ego.",
    quote:
      "The highest-level hero uses strength to be a peacemaker, not a warrior.",
  },
  {
    title: "Fred Smith and FedEx",
    archetype: "Hero",
    summary:
      "FedEx becomes heroic because the promise is tied to reliability under pressure and backed by a founder story shaped by adversity and service.",
    lesson:
      "Hero works best when the claim is precise, visible, and proven under real constraints.",
  },
  {
    title: "O.J. Simpson",
    archetype: "Hero shadow",
    summary:
      "The book uses Simpson as a cautionary inversion: the Hero myth can collapse into tragedy when the shadow inside the archetype becomes the story people remember.",
    lesson:
      "Write the shadow beside the signal so confidence does not tip into domination or denial.",
  },
  {
    title: "Madonna",
    archetype: "Outlaw",
    summary:
      "Madonna is presented as an Outlaw who challenges the culture's sacred and profane categories, taking real risk in order to force a renegotiation of values.",
    lesson:
      "Outlaw is strongest when the provocation serves a clear critique rather than empty spectacle.",
  },
  {
    title: "Harley-Davidson riders",
    archetype: "Outlaw",
    summary:
      "Harley gives otherwise respectable people a sanctioned way to express their wild side. The rebellion works because it is coherent and culturally legible.",
    lesson:
      "Outlaw pages need a principled refusal, not random disorder.",
  },
  {
    title: "Apple 1984",
    archetype: "Outlaw",
    summary:
      "Apple's 1984 ad positioned the company as the force that breaks the monolith. The rebellion was tied to a clearer, more humane computing future.",
    lesson:
      "Show what system you are challenging and what better world your page is opening instead.",
  },
  {
    title: "Princess Diana",
    archetype: "Lover",
    summary:
      "Diana stays archetypally coherent even as the story changes chapters. The emotional line remains visible, which is why the public keeps reading her through the same mythic frame.",
    lesson:
      "Lover pages can evolve, but they still need one stable emotional center.",
  },
  {
    title: "Elian Gonzalez in the news",
    archetype: "Hero myth in real time",
    summary:
      "The book shows how the public instinctively read Elian Gonzalez through heroic myth. The point is not that events are fictional; it is that archetypes organize meaning in real time.",
    lesson:
      "Your audience is already reading the page through story patterns. Choose one consciously.",
  },
];

export const archetypeDecisionItems = [
  {
    title: "Relief, discovery, or clarity",
    summary:
      "Choose Yearning for Paradise when the page needs to promise renewal, frontier, or understanding before it promises style.",
    members: "Innocent, Explorer, Sage",
  },
  {
    title: "Achievement, disruption, or transformation",
    summary:
      "Choose Leaving a Thumbprint on the World when the page must prove capability, challenge a default, or make visible change believable.",
    members: "Hero, Outlaw, Magician",
  },
  {
    title: "Belonging, intimacy, or play",
    summary:
      "Choose No Man or Woman Is an Island when the promise depends on warmth, connection, welcome, or delight.",
    members: "Regular Guy/Gal, Lover, Jester",
  },
  {
    title: "Care, craft, or authority",
    summary:
      "Choose Providing Structure to the World when the page must reassure the audience that you can protect, build, or govern something important.",
    members: "Caregiver, Creator, Ruler",
  },
] as const;

export const archetypeAtlasExplorerItems: IdentitySignalExplorerItem[] = [
  {
    id: "hero",
    title: "Hero",
    summary:
      "The Hero signal works when the challenge, the stakes, and the visible win are easy to scan. The audience should feel that the work can meet pressure and deliver.",
    cluster: "Leaving a Thumbprint on the World",
    need: "Prove worth through effort, courage, and visible results.",
    coreFear: "Weakness, failure, or looking equal to the challenge.",
    persuasion:
      "Commitment plus evidence; show the hard thing, the standard, and the win.",
    quote: "Where there's a will, there's a way.",
    palette: "amber",
    routeHref: "/experiences/identity-portfolio/proof/",
    routeLabel: "See how proof carries the promise",
    visualMoves: ["bold hierarchy", "goal language", "high-contrast proof blocks", "clear milestones"],
    imageCues: ["summit push", "training room", "finish line"],
    imageTips: [
      "Choose images with effort, tension, or visible progress.",
      "Show the obstacle as clearly as the result.",
      "Prefer real strain and teamwork over empty flexing.",
    ],
    vocabulary: ["achieve", "deliver", "overcome", "advance", "lead"],
    phrases: [
      "Built for hard problems that need a clear result.",
      "I show the work, the stakes, and the outcome.",
      "The page should feel ready for pressure, not afraid of it.",
    ],
    proofMoves: ["performance comparison", "before-after metric", "deadline or mission result"],
    references: [
      { name: "Nelson Mandela", label: "Heroism as strength used in service of peace." },
      { name: "Nike", label: "Performance brand built on challenge and mastery." },
      { name: "FedEx", label: "Hero promise rooted in reliability under pressure." },
    ],
    shadow:
      "Hero collapses when confidence turns into domination or empty chest-beating.",
  },
  {
    id: "outlaw",
    title: "Outlaw",
    summary:
      "The Outlaw signal works when the page challenges the default with intention. The audience should feel refusal, contrast, and a better alternative taking shape.",
    cluster: "Leaving a Thumbprint on the World",
    need: "Challenge dead systems and give people permission to move differently.",
    coreFear: "Powerlessness, trivialization, or being trapped inside someone else's rules.",
    persuasion:
      "Conviction plus contrast; show what you reject and the sharper alternative you built.",
    quote: "Rules are meant to be broken.",
    palette: "sage",
    routeHref: "/experiences/identity-portfolio/style/",
    routeLabel: "See how the visual lane changes the argument",
    visualMoves: ["hard edges", "deliberate friction", "sharp contrast", "anti-template compositions"],
    imageCues: ["motorcycle chrome", "cut chain", "counterculture poster"],
    imageTips: [
      "Choose images that show a boundary being crossed or redefined.",
      "Keep the rebellion principled, not chaotic for its own sake.",
      "Look for tension, refusal, and self-possession rather than generic darkness.",
    ],
    vocabulary: ["disrupt", "reject", "break", "rewrite", "refuse"],
    phrases: [
      "For people who are done with the default.",
      "I show what no longer works and what replaces it.",
      "The page should feel fearless, not sloppy.",
    ],
    proofMoves: ["before-after critique", "sharp teardown", "system replacement case study"],
    references: [
      { name: "Harley-Davidson", label: "A coherent rebellion that respectable people can inhabit." },
      { name: "Apple 1984", label: "Outlaw framing tied to a clearer computing future." },
      { name: "Madonna", label: "Risk-taking cultural challenge with a legible point of view." },
    ],
    shadow:
      "Outlaw loses credibility when refusal becomes cynicism, grime, or theater without a real critique.",
  },
  {
    id: "magician",
    title: "Magician",
    summary:
      "The Magician signal becomes legible when the page makes transformation visible rather than merely dramatic. The audience should see a threshold crossed.",
    cluster: "Leaving a Thumbprint on the World",
    need: "Transform reality, make change visible, and help people cross a threshold.",
    coreFear: "Using power badly, producing spectacle without substance, or triggering unintended consequences.",
    persuasion:
      "Transformation plus testimony; show what changed, not just what was made.",
    quote: "It Can Happen.",
    palette: "rose",
    routeHref: "/experiences/identity-portfolio/proof/",
    routeLabel: "See how transformation becomes proof",
    visualMoves: ["before-and-after framing", "symbolic contrast", "guided reveal", "flow through sections"],
    imageCues: ["threshold light", "hands in motion", "transformation sequence"],
    imageTips: [
      "Choose images that show transition, reveal, or altered state.",
      "Use atmosphere only when change is still concrete.",
      "Anchor wonder to a visible outcome or process shift.",
    ],
    vocabulary: ["transform", "unlock", "shift", "reframe", "make real"],
    phrases: [
      "The work changes what is possible on the other side.",
      "I make the turning point visible.",
      "The page should promise transformation with evidence.",
    ],
    proofMoves: ["transformation story", "before-after artifact", "outcome narrative with clear change"],
    references: [
      { name: "MasterCard", label: "Ordinary transactions reframed as memorable moments." },
      { name: "Wright Brothers", label: "Turning an impossible threshold into reality." },
      { name: "Tesla", label: "Technology framed as future-shifting rather than incremental." },
    ],
    shadow:
      "Magician fails when wonder turns manipulative, mystical for its own sake, or disconnected from proof.",
  },
  {
    id: "innocent",
    title: "Innocent",
    summary:
      "The Innocent signal feels strong when the page is open, simple, and restorative. The audience should feel relief rather than noise.",
    cluster: "Yearning for Paradise",
    need: "Safety, optimism, renewal, and a cleaner way in.",
    coreFear: "Corruption, disappointment, or avoidable pain.",
    persuasion:
      "Clarity plus relief; show how the work makes life easier, calmer, or more trustworthy.",
    palette: "sky",
    routeHref: "/recipes/",
    routeLabel: "Browse calmer page patterns",
    visualMoves: ["lightweight hierarchy", "open whitespace", "soft contrast", "plainspoken headlines"],
    imageCues: ["morning light", "clean table", "open sky"],
    imageTips: [
      "Choose photographs with breathing room and visible ease.",
      "Prefer natural light over hard dramatic lighting.",
      "Show welcome, restoration, or relief instead of spectacle.",
    ],
    vocabulary: ["clear", "honest", "simple", "light", "welcome"],
    phrases: [
      "A calm way into complex work.",
      "Clear guidance for real situations.",
      "Designed to feel usable from the first second.",
    ],
    proofMoves: ["quick-start guide", "before-after simplification", "plain-language testimonial"],
    references: [
      { name: "Ivory", label: "Purity and simplicity as brand promise." },
      { name: "Disney", label: "Wonder and safety held in one coherent world." },
      { name: "Coca-Cola", label: "Optimism and uncomplicated happiness." },
    ],
    shadow:
      "Innocent loses force when optimism starts hiding difficulty or promising a world with no friction at all.",
  },
  {
    id: "explorer",
    title: "Explorer",
    summary:
      "The Explorer signal works when the page feels like guided discovery instead of scattered experimentation. The audience should feel movement with direction.",
    cluster: "Yearning for Paradise",
    need: "Autonomy, discovery, and a path toward the next horizon.",
    coreFear: "Being trapped, conforming, or living someone else's script.",
    persuasion:
      "Curiosity plus momentum; invite the viewer into a journey with visible waypoints.",
    palette: "sky",
    routeHref: "/examples/reading-map/",
    routeLabel: "See a route built around movement",
    visualMoves: ["map-like layouts", "journey language", "field-note captions", "wide directional framing"],
    imageCues: ["open road", "trail marker", "field notebook"],
    imageTips: [
      "Choose images with horizon, terrain, or visible route markers.",
      "Favor lived-in tools and landscapes over generic travel stock.",
      "Show motion or exploration, but keep the destination legible.",
    ],
    vocabulary: ["discover", "test", "map", "venture", "probe"],
    phrases: [
      "The work is a path, not a pose.",
      "I learn in public and show what changed.",
      "The page should feel open-ended but not lost.",
    ],
    proofMoves: ["iteration trail", "field log", "what changed and why"],
    references: [
      { name: "Levi's", label: "Freedom, frontier, and self-definition." },
      { name: "National Geographic", label: "Discovery framed as disciplined wonder." },
      { name: "Exploration journals", label: "Movement, observation, and return made visible." },
    ],
    shadow:
      "Explorer goes vague when motion never resolves into insight, arrival, or a usable path.",
  },
  {
    id: "sage",
    title: "Sage",
    summary:
      "The Sage signal feels trustworthy because it privileges method, evidence, and quiet confidence over hype. The audience should feel oriented by the page.",
    cluster: "Yearning for Paradise",
    need: "Competence, truth, and deeper understanding.",
    coreFear: "Confusion, deception, or acting without clarity.",
    persuasion:
      "Authority plus consistency; lead with method, receipts, and calm explanation.",
    palette: "sage",
    routeHref: "/examples/lesson/",
    routeLabel: "See the long-form lesson example",
    visualMoves: ["measured grid", "restrained palette", "annotated proof", "quiet contrast"],
    imageCues: ["marked-up book", "research desk", "diagram wall"],
    imageTips: [
      "Choose images that show study, observation, or careful interpretation.",
      "Avoid theatrical cleverness; the frame should feel patient and exact.",
      "Let objects, notes, and diagrams carry the signal as much as faces.",
    ],
    vocabulary: ["audit", "method", "evidence", "clarity", "legibility"],
    phrases: [
      "The method should be visible in the first read.",
      "I make the reasoning traceable.",
      "The page should feel calm because the thinking is clear.",
    ],
    proofMoves: ["decision log", "annotated case study", "systems teardown"],
    references: [
      { name: "Harvard", label: "Authority rooted in knowledge and method." },
      { name: "Oprah's Book Club", label: "Trusted cultural guidance through curation and judgment." },
      { name: "Investigative journalism", label: "Credibility earned through evidence and interpretation." },
    ],
    shadow:
      "Sage becomes distant when insight turns into detachment, jargon, or analysis without usable conclusions.",
  },
  {
    id: "regular-guy-gal",
    title: "Regular Guy/Gal",
    summary:
      "The Regular Guy/Gal signal works when the page feels approachable, useful, and plainly human without becoming flat. The audience should feel at home fast.",
    cluster: "No Man or Woman Is an Island",
    need: "Belonging, common ground, and ordinary usefulness.",
    coreFear: "Standing apart in a way that feels alienating, superior, or inaccessible.",
    persuasion:
      "Liking plus social proof; show that real people can use, understand, and trust the work.",
    palette: "sky",
    routeHref: "/examples/module/",
    routeLabel: "See a grounded overview page",
    visualMoves: ["plain language", "friendly faces", "practical modules", "steady hierarchy"],
    imageCues: ["shared table", "everyday studio", "practical tools"],
    imageTips: [
      "Choose familiar settings and real-seeming people over elite distance.",
      "Keep the frame useful, not generic or bland.",
      "Show normal life with care and competence, not indifference.",
    ],
    vocabulary: ["practical", "clear", "shared", "real", "useful"],
    phrases: [
      "Work people can actually use.",
      "Built for real situations, not just presentation day.",
      "The page should feel open to ordinary human need.",
    ],
    proofMoves: ["peer adoption", "usable template", "everyday workflow demonstration"],
    references: [
      { name: "Wendy's", label: "Down-to-earth familiarity and accessibility." },
      { name: "Saturn", label: "Belonging and common-sense friendliness." },
      { name: "Neighborhood service brands", label: "Competence that feels near rather than elite." },
    ],
    shadow:
      "Regular Guy/Gal goes dull when approachability becomes sameness with no memorable center.",
  },
  {
    id: "lover",
    title: "Lover",
    summary:
      "The Lover signal lands when the page feels intimate, intentional, and emotionally tuned instead of vague or over-romantic. The audience should feel invited closer.",
    cluster: "No Man or Woman Is an Island",
    need: "Connection, intimacy, devotion, and emotional richness.",
    coreFear: "Loneliness, separation, or feeling emotionally untouched.",
    persuasion:
      "Warmth plus attention to detail; show closeness, care, and the value of emotional precision.",
    palette: "rose",
    routeHref: "/examples/lesson/",
    routeLabel: "See a more intimate editorial rhythm",
    visualMoves: ["close crops", "editorial pacing", "detail-rich imagery", "warm tonal contrast"],
    imageCues: ["hands touching", "close portrait", "textured fabric"],
    imageTips: [
      "Choose images with tactility, proximity, and emotional specificity.",
      "Let color temperature and texture carry as much meaning as the subject.",
      "Avoid generic romance cues if the work is actually about care, craft, or devotion.",
    ],
    vocabulary: ["care", "invite", "attentive", "close", "devoted"],
    phrases: [
      "Made with care you can actually feel.",
      "The details matter because the relationship matters.",
      "The page should feel close without becoming sentimental fog.",
    ],
    proofMoves: ["testimonial excerpt", "experience vignette", "detail study with emotional stakes"],
    references: [
      { name: "Princess Diana", label: "A coherent emotional myth carried across changing chapters." },
      { name: "Hallmark", label: "Connection and feeling translated into ritual." },
      { name: "Wedding and hospitality brands", label: "Atmosphere organized around intimacy and care." },
    ],
    shadow:
      "Lover becomes cloying when intensity outruns substance or when intimacy turns performative.",
  },
  {
    id: "jester",
    title: "Jester",
    summary:
      "The Jester signal works when the page is playful and sharp without turning into random noise. The audience should feel delight with control.",
    cluster: "No Man or Woman Is an Island",
    need: "Joy, play, relief, and social ease.",
    coreFear: "Boredom, heaviness, or being trapped inside solemnity.",
    persuasion:
      "Surprise plus liking; create memorability without sacrificing legibility.",
    palette: "sky",
    routeHref: "/examples/module/",
    routeLabel: "See play without losing structure",
    visualMoves: ["playful timing", "unexpected captions", "comic contrast", "lightweight interruption"],
    imageCues: ["comic prop", "offbeat expression", "color collision"],
    imageTips: [
      "Choose images with timing, gesture, or comic juxtaposition.",
      "Keep the joke aligned with the promise instead of stapled on top.",
      "Let play open the reader up; do not let it erase clarity.",
    ],
    vocabulary: ["play", "twist", "wink", "remix", "lighten"],
    phrases: [
      "Serious enough to matter, playful enough to remember.",
      "The page gets lighter without getting thinner.",
      "Humor should sharpen the signal, not replace it.",
    ],
    proofMoves: ["humorous annotation", "surprising demo", "playful utility cue"],
    references: [
      { name: "Miller Lite", label: "Levity used as a social invitation." },
      { name: "Saturday Night Live", label: "Jester energy through timing, exaggeration, and release." },
      { name: "Mad Magazine", label: "Playfulness sharpened into critique." },
    ],
    shadow:
      "Jester fails when the page becomes unserious, cynical, or distracted by its own performance.",
  },
  {
    id: "caregiver",
    title: "Caregiver",
    summary:
      "The Caregiver signal earns trust through warmth, accessibility, and visible care rather than vague friendliness. The audience should feel held, not sold.",
    cluster: "Providing Structure to the World",
    need: "Protection, support, generosity, and service.",
    coreFear: "Selfishness, neglect, or failing the people who need help.",
    persuasion:
      "Reciprocity plus reassurance; show care through structure, generosity, and steadiness.",
    palette: "amber",
    routeHref: "/recipes/",
    routeLabel: "See supportive page patterns",
    visualMoves: ["warm human imagery", "calm spacing", "clear support hierarchy", "service-oriented captions"],
    imageCues: ["helping hands", "shared care space", "support desk"],
    imageTips: [
      "Choose images that show attention, service, or protection in action.",
      "Let faces and gestures carry calm reassurance.",
      "Avoid soft-focus sentimentality if the work is actually practical or clinical.",
    ],
    vocabulary: ["guide", "support", "steady", "care", "welcome"],
    phrases: [
      "The work lowers anxiety without lowering standards.",
      "Care should feel practical, not ornamental.",
      "The page should reassure the reader that someone competent is paying attention.",
    ],
    proofMoves: ["service outcome", "helpful checklist", "accessibility or support receipt"],
    references: [
      { name: "Red Cross", label: "Caregiver promise anchored in service." },
      { name: "AT&T Ma Bell", label: "Care framed as dependable connection." },
      { name: "Nursing and care work", label: "Steady human support made visible." },
    ],
    shadow:
      "Caregiver becomes smothering or self-erasing when sacrifice replaces boundaries and competence.",
  },
  {
    id: "creator",
    title: "Creator",
    summary:
      "The Creator signal works when the page feels original because the decisions are specific, not because everything is styled to death. The audience should sense making in progress.",
    cluster: "Providing Structure to the World",
    need: "Expression, invention, and bringing something new into being.",
    coreFear: "Mediocrity, repetition, or feeling derivative.",
    persuasion:
      "Originality plus process; show the making, the taste, and the system behind the output.",
    palette: "rose",
    routeHref: "/layouts/",
    routeLabel: "See how structure supports original work",
    visualMoves: ["custom compositions", "work-in-progress surfaces", "process artifacts", "distinct type rhythm"],
    imageCues: ["draft wall", "tool table", "work in progress"],
    imageTips: [
      "Choose images with tools, materials, edits, or unfinished stages still visible.",
      "Let specificity do the work instead of layering on random style signals.",
      "Show the maker's hand, not just the final polished object.",
    ],
    vocabulary: ["compose", "make", "shape", "craft", "prototype"],
    phrases: [
      "The work shows its making.",
      "Originality lives in decisions, not ornament alone.",
      "The page should feel authored, not merely decorated.",
    ],
    proofMoves: ["iteration strip", "component study", "process note tied to a final outcome"],
    references: [
      { name: "William Sonoma", label: "Creator energy through taste and making." },
      { name: "Design studios", label: "Originality made legible through process." },
      { name: "Maker workshops", label: "Tools and materials as public signal." },
    ],
    shadow:
      "Creator gets trapped when taste becomes perfectionism and nothing ever exits the studio.",
  },
  {
    id: "ruler",
    title: "Ruler",
    summary:
      "The Ruler signal reads as credible when the page shows standards, governance, and repeatability rather than stiffness for its own sake. The audience should feel order.",
    cluster: "Providing Structure to the World",
    need: "Order, authority, control, and a stable system that can be trusted.",
    coreFear: "Chaos, loss of control, or being governed by weaker standards.",
    persuasion:
      "Authority plus consistency; make the operating model explicit and show that the system holds.",
    palette: "rose",
    routeHref: "/process/",
    routeLabel: "See operating structure in practice",
    visualMoves: ["premium spacing", "clear status states", "governed modules", "explicit standards"],
    imageCues: ["control room", "architectural axis", "review table"],
    imageTips: [
      "Choose images with order, hierarchy, and visibly managed complexity.",
      "Let materials, architecture, and spacing communicate authority before luxury does.",
      "Avoid stiffness that feels punitive rather than dependable.",
    ],
    vocabulary: ["system", "standard", "governed", "repeatable", "baseline"],
    phrases: [
      "The standard is part of the promise.",
      "Authority should feel calm because the system holds.",
      "The page should make governance visible without becoming rigid theater.",
    ],
    proofMoves: ["approval trail", "review artifact", "workflow checkpoint"],
    references: [
      { name: "American Express", label: "Status and control turned into trust." },
      { name: "IBM", label: "Order, structure, and enterprise authority." },
      { name: "Control environments", label: "Complexity governed into reliability." },
    ],
    shadow:
      "Ruler becomes brittle when authority turns into distance, rigidity, or control for its own sake.",
  },
];