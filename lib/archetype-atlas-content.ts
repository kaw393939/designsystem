export type AtlasNavItem = {
  id: string;
  href: string;
  label: string;
};

export type FamilyOverview = {
  id: string;
  title: string;
  archetypesLabel: string;
  summary: string;
};

export type ArchetypeProfile = {
  slug: string;
  name: string;
  familyId: string;
  familyTitle: string;
  imagePath: string;
  corePromise: string;
  firstRead: string;
  gift: string;
  trap: string;
  chooseWhen: string;
  avoidWhen: string;
  personalBrandUse: string;
  businessBrandUse: string;
  fontDirection: {
    display: string;
    body: string;
    accent: string;
  };
  vocabularyUse: string[];
  vocabularyAvoid: string[];
  layoutMoves: string[];
  proofMoves: string[];
  ctaMoves: string[];
  stylePartners: string[];
  exampleBrands: string[];
  heroHeadline: string;
  heroDeck: string;
  /* ── expanded fields (book-grounded) ── */
  /** Maslow need-pull this archetype addresses */
  needPull: string;
  /** Cialdini persuasion emphasis when designing for this archetype */
  persuasionEmphasis: string;
  /** What the brand ultimately fears / the shadow side */
  coreFear: string;
  /** What drives people toward this archetype */
  coreDesire: string;
  /** The emotional reward when done right */
  emotionalReward: string;
  /** What feels obviously WRONG for this archetype — the "anti-signal" */
  whatFeelsWrong: string[];
  /** Extended narrative: the story of why this archetype matters */
  narrative: string;
  /** How this archetype uses color and imagery */
  colorAndImagery: string;
  /** Real-world design application scenario: a short walkthrough */
  designWalkthrough: string;
  /** How this archetype adapts across contexts (portfolio → business → product) */
  contextShifts: string;
  /** How this archetype differs from its family siblings */
  familyContrast: string;
  /** The five-second test: what the visitor should say after 5s exposure */
  fiveSecondTest: string;
};

export type SelectionStep = {
  title: string;
  summary: string;
  prompt: string;
};

export type DesignStyle = {
  slug: string;
  name: string;
  imagePath: string;
  stance: string;
  clarifies: string;
  controlledFriction: string;
  bestFor: string;
  watchOut: string;
  fontGuidance: string;
  pairings: string[];
};

export type HeroExample = {
  slug: string;
  title: string;
  archetype: string;
  style: string;
  imagePath: string;
  headline: string;
  deck: string;
  eyebrow: string;
  proofLabel: string;
  cta: string;
  whyItWorks: string[];
  variantClassName: string;
};

export const atlasSiteTitle = "Archetype Atlas";

export const atlasSiteDescription =
  "A signal-first field guide for choosing an archetype, shaping tone, selecting fonts, building hero sections, and translating brand strategy into a visible web presence.";

export const atlasNavItems: AtlasNavItem[] = [
  { id: "overview", href: "/", label: "Overview" },
  { id: "playbook", href: "/playbook", label: "Choose" },
  { id: "archetypes", href: "/archetypes", label: "Archetypes" },
  { id: "hero-examples", href: "/hero-examples", label: "Hero Examples" },
  { id: "persuasion", href: "/persuasion", label: "Persuasion" },
  { id: "design-styles", href: "/design-styles", label: "Style Lab" },
];

export const atlasHomeHighlights = [
  {
    title: "Choose one clear signal",
    summary:
      "Start from the first read: what should somebody feel before they finish the headline, and which archetype best governs that feeling?",
  },
  {
    title: "Translate strategy into design",
    summary:
      "The site shows how archetype decisions change fonts, vocabulary, hierarchy, proof, CTA language, and hero composition instead of staying abstract.",
  },
  {
    title: "Compare clarity and controlled friction",
    summary:
      "Swiss design gets the message across fast and clean. Punk, grunge, and brutalist styles can add deliberate tension when the brand needs edge, energy, or intrigue — just make sure the roughness serves the idea.",
  },
  {
    title: "Build for personal or business brands",
    summary:
      "Every archetype entry explains how to use the same underlying signal for a founder, a portfolio, a practice, a product, or a service business.",
  },
];

export const familyOverviews: FamilyOverview[] = [
  {
    id: "paradise",
    title: "Yearning for Paradise",
    archetypesLabel: "Innocent · Explorer · Sage",
    summary:
      "These archetypes promise clarity, discovery, or understanding. They are ideal when the brand needs openness, guidance, or trust before intensity.",
  },
  {
    id: "thumbprint",
    title: "Leaving a Thumbprint on the World",
    archetypesLabel: "Hero · Outlaw · Magician",
    summary:
      "These archetypes drive mastery, disruption, and transformation. Use them when the brand is trying to challenge, energize, or change the situation.",
  },
  {
    id: "island",
    title: "No One Is an Island",
    archetypesLabel: "Everyman · Lover · Jester",
    summary:
      "These archetypes work through belonging, pleasure, and social charge. They are strongest when the brand needs relatability, taste, or relief from stiffness.",
  },
  {
    id: "structure",
    title: "Providing Structure to the World",
    archetypesLabel: "Caregiver · Creator · Ruler",
    summary:
      "These archetypes promise care, craft, or order. Use them when the work must feel dependable, made with intent, or confidently in command.",
  },
];

export const selectionSteps: SelectionStep[] = [
  {
    title: "Start with the audience, not yourself",
    summary:
      "Do not begin by asking which archetype flatters you. Start by naming what the visitor needs to feel or resolve within the first five seconds of landing on your page.",
    prompt:
      "When this page opens, should the visitor feel safe, ambitious, skeptical, curious, rebellious, delighted, or taken care of?",
  },
  {
    title: "Choose the dominant first impression, not your whole personality",
    summary:
      "An archetype is a public meaning system, not a total self-description. It controls what people think when they first see your page and how your proof backs that up.",
    prompt:
      "If the visitor could describe the page in one phrase, what phrase would you want them to say?",
  },
  {
    title: "Turn the decision into design constraints",
    summary:
      "Once the archetype is chosen, push it through the whole hero section: headline tone, image choice, hierarchy, proof block, and CTA language.",
    prompt:
      "What would feel obviously wrong for this archetype — even if it looked trendy?",
  },
  {
    title: "Pick the visual style second",
    summary:
      "Swiss, brutalist, punk, editorial, and systems-modern are not archetypes. They are visual delivery systems — like camera lenses. Choose them only after the signal is locked.",
    prompt:
      "Does the page need maximum clarity, or does it need a measured amount of friction and tension?",
  },
  {
    title: "Keep proof near the claim",
    summary:
      "A high-energy archetype without receipts feels fake. A trust-heavy archetype without evidence feels timid. Put the proof close enough to the claim that it changes the visitor's mind before they scroll away.",
    prompt:
      "What artifact, metric, client result, screenshot, testimonial, or process object proves the promise in view?",
  },
];

export const designStyles: DesignStyle[] = [
  {
    slug: "swiss",
    name: "Swiss Grid",
    imagePath: "/archetype-atlas/styles/swiss-grid.png",
    stance:
      "Clarity first. The layout behaves like an argument: ordered, exact, quiet, and fast to scan.",
    clarifies:
      "Best when the page has to earn trust through discipline, precision, and calm legibility.",
    controlledFriction:
      "Very low. Swiss design removes noise instead of adding atmosphere.",
    bestFor:
      "Sage, Ruler, Hero, and selected Creator brands that need strong hierarchy and quick comprehension.",
    watchOut:
      "Can become cold, generic, or over-corporate if the brand also needs warmth or appetite.",
    fontGuidance:
      "Use a disciplined sans display, a neutral body sans, and a restrained mono accent only when needed.",
    pairings: ["Sage", "Hero", "Ruler", "Creator"],
  },
  {
    slug: "brutalist",
    name: "Brutalist Interface",
    imagePath: "/archetype-atlas/styles/brutalist-interface.png",
    stance:
      "Blunt, raw, unapologetic. It speaks with force and refuses polish as the main value.",
    clarifies:
      "Useful when the brand has to feel direct, uncompromised, and hard to ignore.",
    controlledFriction:
      "Medium to high. The roughness creates pressure and confrontation.",
    bestFor:
      "Hero, Outlaw, and Ruler brands that benefit from weight, bluntness, and high-contrast hierarchy.",
    watchOut:
      "Can feel hostile or unreadable if the product already asks the visitor to do heavy cognitive work.",
    fontGuidance:
      "Use blocky sans faces, large scale shifts, monospace details, and strong black rules.",
    pairings: ["Hero", "Outlaw", "Ruler"],
  },
  {
    slug: "punk",
    name: "Punk and Grunge",
    imagePath: "/archetype-atlas/styles/punk-collage.png",
    stance:
      "Rule-breaking, expressive, and appetite-driven. The design carries attitude before it carries polish.",
    clarifies:
      "Useful when the brand must signal defiance, critique, underground credibility, or cultural edge.",
    controlledFriction:
      "High. The page stays intentionally rough, layered, or interrupted so curiosity increases before certainty arrives.",
    bestFor:
      "Outlaw, Jester, some Explorer, and selected Creator brands that benefit from tension and anti-default energy.",
    watchOut:
      "The edge must serve a real idea. If the content is thin, the roughness reads like theater.",
    fontGuidance:
      "Mix bold grotesk or stencil display type with rough monospace or xerox-style accents. Keep one layer stable.",
    pairings: ["Outlaw", "Jester", "Explorer", "Creator"],
  },
  {
    slug: "editorial",
    name: "Editorial Luxury",
    imagePath: "/archetype-atlas/styles/editorial-luxury.png",
    stance:
      "Taste, pacing, and attention quality become part of the proof. The page feels composed, not assembled.",
    clarifies:
      "Best when the brand needs intimacy, refinement, craft, or a premium reading experience.",
    controlledFriction:
      "Low to medium. It slows the visitor down on purpose, but through seduction rather than abrasion.",
    bestFor:
      "Lover, Creator, Ruler, and some Caregiver brands that need specificity and emotional richness.",
    watchOut:
      "Can drift into decorative emptiness if the page has no argument or no receipts.",
    fontGuidance:
      "Use a high-contrast serif display, a clean supporting sans, and careful spacing as part of the tone.",
    pairings: ["Lover", "Creator", "Ruler", "Caregiver"],
  },
  {
    slug: "systems-modern",
    name: "Systems Modern",
    imagePath: "/archetype-atlas/styles/systems-modern.png",
    stance:
      "Structured but future-facing. It feels like a coherent system instead of a one-off page.",
    clarifies:
      "Ideal when the brand promise depends on transformation, products, methods, or layered thinking.",
    controlledFriction:
      "Medium. It adds intrigue through modularity and transformation rather than noise.",
    bestFor:
      "Magician, Sage, Creator, and some Explorer brands that need visible systems thinking.",
    watchOut:
      "If overdesigned, it can feel abstract and withhold the human point of the work.",
    fontGuidance:
      "Use a modern sans or neo-grotesk display, systematic spacing, and one technical accent treatment.",
    pairings: ["Magician", "Sage", "Creator", "Explorer"],
  },
];

export const heroExamples: HeroExample[] = [
  {
    slug: "sage-swiss",
    title: "Sage with Swiss discipline",
    archetype: "Sage",
    style: "Swiss Grid",
    imagePath: "/archetype-atlas/examples/sage-swiss-hero-board.png",
    eyebrow: "Research-led personal brand",
    headline: "Evidence-first strategy for teams that cannot afford vague thinking.",
    deck:
      "I help founders and operators turn complex systems into clear decisions, with receipts close enough to trust before the second scroll.",
    proofLabel: "12 shipped systems, 4 retained clients, 1 public methods archive",
    cta: "Read the methods",
    whyItWorks: [
      "The archetype promises grounded understanding, so the headline is measured rather than grandiose.",
      "Swiss hierarchy keeps the read fast and makes the proof block feel inevitable instead of ornamental.",
      "The CTA is specific and low-drama, which protects the tone.",
    ],
    variantClassName: "hero-example--sage-swiss",
  },
  {
    slug: "hero-brutalist",
    title: "Hero with brutalist force",
    archetype: "Hero",
    style: "Brutalist Interface",
    imagePath: "/archetype-atlas/archetypes/hero.png",
    eyebrow: "Performance-focused business brand",
    headline: "Build faster. Ship cleaner. Raise the standard of the room.",
    deck:
      "Operational design for teams under pressure. Stronger systems, sharper execution, and proof that survives a live read.",
    proofLabel: "48 launches, 99.97% delivery uptime, 3 enterprise rebuilds",
    cta: "See the scorecard",
    whyItWorks: [
      "The phrasing is action-heavy and outcome-forward, which suits the Hero promise.",
      "Brutalist weight keeps the page from becoming motivational fluff by giving the energy a hard frame.",
      "Numbers appear early because Hero without proof feels performative.",
    ],
    variantClassName: "hero-example--hero-brutalist",
  },
  {
    slug: "outlaw-punk",
    title: "Outlaw with punk friction",
    archetype: "Outlaw",
    style: "Punk and Grunge",
    imagePath: "/archetype-atlas/examples/outlaw-punk-hero-board.png",
    eyebrow: "Counter-positioned studio",
    headline: "The category default is the problem.",
    deck:
      "I help bold brands stop sounding house-trained, cut through polite sameness, and launch identity systems with teeth.",
    proofLabel: "9 repositions, 3 cult launches, 1 banned campaign that still sold out",
    cta: "Open the teardown",
    whyItWorks: [
      "The first line is an attack on the category, not a summary of services, which gives the page teeth immediately.",
      "Punk texture creates controlled friction, which increases appetite and edge before the full explanation arrives.",
      "The CTA promises confrontation and evidence at the same time.",
    ],
    variantClassName: "hero-example--outlaw-punk",
  },
  {
    slug: "creator-editorial",
    title: "Creator with editorial richness",
    archetype: "Creator",
    style: "Editorial Luxury",
    imagePath: "/archetype-atlas/archetypes/creator.png",
    eyebrow: "Craft-led portfolio",
    headline: "Built with a point of view, not assembled from defaults.",
    deck:
      "Brand systems, interfaces, and objects that show the hand of the maker without losing the clarity of the message.",
    proofLabel: "Process films, prototype library, annotated design decisions",
    cta: "Enter the studio",
    whyItWorks: [
      "Creator language is about making, judgment, and visible craft, not vague creativity claims.",
      "Editorial spacing slows the read enough for texture and taste to register as proof.",
      "The proof offers artifacts and process, which is where Creator credibility lives.",
    ],
    variantClassName: "hero-example--creator-editorial",
  },
  {
    slug: "magician-systems",
    title: "Magician with systems-modern logic",
    archetype: "Magician",
    style: "Systems Modern",
    imagePath: "/archetype-atlas/examples/magician-systems-hero-board.png",
    eyebrow: "Transformation-led consultancy",
    headline: "Change the way the work behaves, not just the way it looks.",
    deck:
      "I turn scattered tools, stories, and operations into coherent systems people can actually use, trust, and scale.",
    proofLabel: "Before/after workflow maps, transformation case files, adoption metrics",
    cta: "See a system before and after",
    whyItWorks: [
      "Magician claims must describe a real shift in state, not just a mood.",
      "Systems-modern design makes the transformation feel engineered rather than mystical fluff.",
      "Before-and-after proof blocks are the native evidence form for this archetype.",
    ],
    variantClassName: "hero-example--magician-systems",
  },
  {
    slug: "caregiver-warm",
    title: "Caregiver with calm warmth",
    archetype: "Caregiver",
    style: "Editorial warmth",
    imagePath: "/archetype-atlas/archetypes/caregiver.png",
    eyebrow: "Human-centered practice",
    headline: "Design that makes people feel guided, not handled.",
    deck:
      "Clear journeys, accessible interfaces, and honest communication for services where trust begins with how people are treated.",
    proofLabel: "Accessibility audits, patient journey maps, support outcomes",
    cta: "Review the care patterns",
    whyItWorks: [
      "Caregiver language removes posture and centers reassurance without sounding weak.",
      "The hero uses warmth as part of the signal but still keeps evidence visible.",
      "The CTA points toward concrete care patterns instead of generic connection language.",
    ],
    variantClassName: "hero-example--caregiver-warm",
  },
];

export const archetypeProfiles: ArchetypeProfile[] = [
  {
    slug: "innocent",
    name: "Innocent",
    familyId: "paradise",
    familyTitle: "Yearning for Paradise",
    imagePath: "/archetype-atlas/archetypes/innocent.png",
    corePromise: "This will feel clear, honest, and safe.",
    firstRead: "Light, open, optimistic, and low-noise.",
    gift: "Immediate trust because the page feels undefended and sincere.",
    trap: "It can turn naive, childish, or too thin for work that needs gravity.",
    chooseWhen: "Use it when simplicity, optimism, belonging, or safety are the first psychological jobs.",
    avoidWhen: "Avoid it when the work depends on friction, argument, or visible intensity.",
    personalBrandUse: "Strong for educators, early-career builders, coaches, and makers whose main signal is honesty rather than dominance.",
    businessBrandUse: "Useful for wellness, family, accessibility, onboarding, and products that lower fear or complexity.",
    fontDirection: {
      display: "Soft serif or rounded humanist sans with generous space.",
      body: "Clean humanist sans with high readability and light rhythm.",
      accent: "Avoid harsh mono accents unless they are tiny and functional.",
    },
    vocabularyUse: ["clear", "simple", "welcome", "steady", "honest", "gentle"],
    vocabularyAvoid: ["dominate", "crush", "shock", "disrupt", "chaos"],
    layoutMoves: [
      "Use open margins, fewer competing elements, and one reassuring hero image.",
      "Let the hierarchy breathe so the page never feels defensive or crowded.",
      "Keep navigation plain-language and reduce jargon wherever possible.",
    ],
    proofMoves: [
      "Use testimonials, plain outcomes, and before/after relief states.",
      "Show trust badges carefully; too many can break the innocence.",
      "Favor one or two calm proof objects rather than a hard sell wall.",
    ],
    ctaMoves: [
      "Choose soft but specific next steps such as Start here or See how it works.",
      "Avoid urgency language unless the context truly requires it.",
    ],
    stylePartners: ["Swiss Grid", "Editorial Luxury"],
    exampleBrands: ["Ivory", "Disney", "Breyers", "PBS"],
    heroHeadline: "A calmer way to start, learn, and move forward.",
    heroDeck:
      "Friendly systems, simple language, and gentle guidance for people who need clarity before confidence.",
    needPull: "Safety, belonging, and simplicity (the base of Maslow's hierarchy — the pyramid of human needs). The Innocent appeals to the desire to return to a state where things were uncomplicated and trustworthy.",
    persuasionEmphasis: "Liking + consistency. The page earns trust by being likeable and transparent, then reinforces it with steady, predictable behavior across every touchpoint.",
    coreFear: "Doing something wrong, being punished, or being deceived.",
    coreDesire: "To experience paradise — safety, happiness, and simplicity.",
    emotionalReward: "The visitor feels a sense of relief and belonging. The world feels manageable.",
    whatFeelsWrong: [
      "Dark mode with aggressive typography or neon accents",
      "Competitive language like 'crush,' 'dominate,' or 'outperform'",
      "Complex multi-level navigation with jargon-heavy labels",
      "High-friction CTAs with countdown timers or scarcity warnings",
      "Dense data visualizations or technical architecture diagrams",
    ],
    narrative: "The Innocent is the oldest promise in brand strategy: the world can be simple, good, and safe. Mark and Pearson trace it to the paradise myth — the idea that somewhere, a version of life exists without complication. In branding, this translates to clarity without cynicism. The Innocent page does not argue; it reassures. It removes friction, excess, and complexity so the visitor can arrive and immediately feel that they are in good hands. The danger is that simplicity without substance reads as naivety. Disney succeeds with the Innocent because behind the warmth lives an engineering empire. PBS succeeds because behind the gentleness lives editorial rigor. The Innocent works when the simplicity is earned, not just performed.",
    colorAndImagery: "Light, warm palettes with natural tones — soft whites, pale greens, gentle blues, warm creams. Imagery should show open spaces, natural light, and human faces with genuine expressions. Avoid stock-photo perfection; the Innocent reads best when the warmth feels real. Photography should feel documentary or lifestyle, not staged. Illustrations work well when they are hand-drawn or watercolor-influenced.",
    designWalkthrough: "Imagine designing a portfolio for a wellness educator. The hero section opens with a soft-focus photo of real students in a workshop, not a stock hero. The headline reads 'A gentler way to learn what your body already knows.' Below, three cards with plain-language labels — How it works, What people say, Start here — each with a single icon and two lines of text. No carousel, no animation, no noise. The proof block is a single testimonial with a real face and a specific outcome. The CTA says 'Begin with a free session.' Every element breathes. The page feels like arriving at a space that was prepared for you.",
    contextShifts: "For a personal brand, the Innocent voice works as a warm, approachable educator or guide who strips away jargon. For a business brand, it becomes the 'safe choice' positioning — the product that reduces anxiety and complexity. For a product, it manifests as clean onboarding, simple pricing, and visible trust signals. The key shift across contexts: personal brands lean into warmth, business brands lean into clarity, products lean into ease.",
    familyContrast: "Within the Paradise family, the Innocent offers safety where the Explorer offers adventure and the Sage offers understanding. The Innocent says 'everything will be fine.' The Explorer says 'let's find out what's next.' The Sage says 'here is why.' If the visitor needs reassurance before curiosity or understanding, the Innocent is the right choice. If they need to feel stimulated or intellectually grounded first, the Innocent will read as too simple.",
    fiveSecondTest: "'This feels friendly and honest. I trust it already.'",
  },
  {
    slug: "explorer",
    name: "Explorer",
    familyId: "paradise",
    familyTitle: "Yearning for Paradise",
    imagePath: "/archetype-atlas/archetypes/explorer.png",
    corePromise: "This will take you somewhere new.",
    firstRead: "Open, restless, horizon-facing, and full of forward motion.",
    gift: "It creates curiosity and makes people want to follow the journey.",
    trap: "It can wander, posture as freedom, or never land anywhere useful.",
    chooseWhen: "Use it when the brand is about discovery, autonomy, research, travel, or opening a new path.",
    avoidWhen: "Avoid it when the page must read as highly stable, formal, or tightly governed.",
    personalBrandUse: "Strong for researchers, strategists, field-builders, adventurous founders, and people whose work is truly discovery-led.",
    businessBrandUse: "Useful for expedition, media, research, innovation, education, and products that promise self-direction.",
    fontDirection: {
      display: "Wide grotesk or lightly rugged serif with momentum.",
      body: "Simple sans that stays out of the way of the hero image and motion.",
      accent: "Map-like mono or technical labels can work well in small doses.",
    },
    vocabularyUse: ["discover", "horizon", "move", "explore", "path", "field"],
    vocabularyAvoid: ["settled", "proven forever", "safe lane", "frozen", "static"],
    layoutMoves: [
      "Use broad imagery, route lines, sequences, and horizon-oriented compositions.",
      "Let the page imply movement without turning into noise.",
      "Use modular sections that feel like stages or checkpoints.",
    ],
    proofMoves: [
      "Show field notes, maps, process diagrams, or trail markers instead of polished finality.",
      "Use proof that demonstrates range and forward motion.",
    ],
    ctaMoves: [
      "Use invitations such as Explore the route or Follow the investigation.",
      "Avoid overly static CTAs such as Download brochure unless necessary.",
    ],
    stylePartners: ["Systems Modern", "Punk and Grunge"],
    exampleBrands: ["Levi's", "Jeep", "Patagonia", "The North Face"],
    heroHeadline: "Go further than the category expects.",
    heroDeck:
      "Research, strategy, and systems for brands that are still becoming themselves and need a visible route forward.",
    needPull: "Autonomy, discovery, and self-direction (Maslow's growth/self-actualization layers). The Explorer is drawn to expansion and the freedom to find one's own path.",
    persuasionEmphasis: "Curiosity + commitment. Open a question or route, then invite small experiments. The Explorer trusts brands that let them discover rather than being told.",
    coreFear: "Being trapped, confined, or forced into conformity.",
    coreDesire: "The freedom to find out who you are by exploring the world.",
    emotionalReward: "The visitor feels free, expansive, and curious. The horizon opens.",
    whatFeelsWrong: [
      "A locked, linear funnel with no alternative paths or exit routes",
      "Corporate stock photography of boardrooms or handshakes",
      "Rigid grid layouts with no breathing room or visual momentum",
      "Language about 'proven formulas' or 'guaranteed results'",
      "A static, contained feel with no sense of journey or progression",
    ],
    narrative: "The Explorer is the archetype of the frontier. Mark and Pearson connect it to the deep cultural desire for autonomy and discovery — the belief that the real thing is always one more step away. In branding, this becomes a restless energy that refuses to settle for the category default. Patagonia, Jeep, and The North Face do not sell products; they sell the possibility of going further. The Explorer brand promises that if you follow this path, you will find something real. The trap is that restlessness without arrival feels like wandering. The Explorer must eventually show what was found, not just that the search is ongoing. It works best when the journey has landmarks, the discoveries are concrete, and the visitor can see both where they are and where the path leads next.",
    colorAndImagery: "Earthy, horizon-tinted palettes — tans, deep greens, sky blues, burnt oranges, and weathered textures. Imagery should suggest open terrain, unfinished journeys, and real landscapes. Maps, route lines, topographic textures, and field photography work better than studio shots. The visual language should feel like it was collected along the way, not art-directed in advance.",
    designWalkthrough: "Imagine building a site for a research strategist who helps startups find product-market fit. The hero opens with a dramatic landscape split — half terrain, half sky — with the headline 'Go where the obvious answer stops working.' Below, a horizontal scroll of project snapshots styled as field notes, each with a location tag and a one-line finding. The proof section shows a 'route map' of the engagement process with five waypoints. The CTA reads 'Start the investigation.' The whole page feels like a briefing before an expedition, not a brochure.",
    contextShifts: "For a personal brand, the Explorer works as the person who goes first and reports back — the scout, the field researcher, the pathfinder. For a business brand, it becomes the company that takes customers into new territory. For a product, it manifests as features that enable discovery, customization, and self-directed use. The key shift: personal brands emphasize the journey, business brands emphasize the destination, products emphasize the freedom.",
    familyContrast: "Within the Paradise family, the Explorer offers adventure where the Innocent offers safety and the Sage offers understanding. The Innocent says 'everything will be fine.' The Explorer says 'let's find out what's next.' The Sage says 'here is why.' The Explorer is for visitors who feel restless, not anxious — people who need horizons, not reassurance.",
    fiveSecondTest: "'This is going somewhere interesting. I want to follow.'",
  },
  {
    slug: "sage",
    name: "Sage",
    familyId: "paradise",
    familyTitle: "Yearning for Paradise",
    imagePath: "/archetype-atlas/archetypes/sage.png",
    corePromise: "This will be accurate, grounded, and worth trusting.",
    firstRead: "Measured, structured, evidence-aware, and calm under pressure.",
    gift: "It earns trust quickly because method is visible before the full argument lands.",
    trap: "It can become cold, overlong, or subtly arrogant.",
    chooseWhen: "Use it when credibility, explanation, or disciplined thinking are the central arguments.",
    avoidWhen: "Avoid it when the page must spark appetite through raw emotion or disruption first.",
    personalBrandUse: "Strong for consultants, researchers, teachers, analysts, systems thinkers, and technical founders.",
    businessBrandUse: "Useful for education, software, intelligence, healthcare guidance, and any field where belief follows evidence.",
    fontDirection: {
      display: "Disciplined sans or intellectual serif with strong hierarchy.",
      body: "Highly readable sans with excellent spacing and low drama.",
      accent: "Use mono or tabular treatments for captions, labels, and evidence metadata.",
    },
    vocabularyUse: ["evidence", "method", "measured", "clear", "grounded", "tested"],
    vocabularyAvoid: ["revolutionary" , "limitless", "epic", "magic"],
    layoutMoves: [
      "Lead with a thesis, then show how the page earns the claim.",
      "Use diagrams, tables, labeled figures, and highly legible sectioning.",
      "Keep decorative gestures subordinate to reading speed.",
    ],
    proofMoves: [
      "Use citations, metrics, diagrams, process artifacts, and named case studies.",
      "Put one visible proof object above the fold when possible.",
    ],
    ctaMoves: [
      "Use exact next steps like Read the methods, Review the cases, or Inspect the system.",
      "Avoid vague social CTAs that feel unearned.",
    ],
    stylePartners: ["Swiss Grid", "Systems Modern"],
    exampleBrands: ["Oprah's Book Club", "Harvard Business Review", "MIT Media Lab"],
    heroHeadline: "Clear thinking for work that must hold up under scrutiny.",
    heroDeck:
      "Research-led strategy, visible methods, and proof built close enough to the claim that trust arrives early.",
    needPull: "Competence, clarity, and understanding (Maslow's esteem and cognitive growth layers). The Sage appeals to the desire to know what is true and to build on reliable ground.",
    persuasionEmphasis: "Authority + consistency. Show method and receipts. The Sage earns compliance by demonstrating that the thinking has been done rigorously and the conclusions follow from evidence.",
    coreFear: "Being duped, misled, or caught in ignorance.",
    coreDesire: "To find the truth and understand how the world actually works.",
    emotionalReward: "The visitor feels grounded, informed, and confident in the quality of the thinking.",
    whatFeelsWrong: [
      "Flashy animations or auto-playing video that prioritizes spectacle over content",
      "Vague, inspirational language without specific claims or evidence",
      "Emojis, exclamation marks, or casual bro-marketing tone",
      "Social proof that relies on follower counts rather than substance",
      "Cluttered layouts where no single argument gets room to land",
    ],
    narrative: "The Sage is the archetype of the teacher, the advisor, the expert who earns authority by showing their work. Mark and Pearson connect it to the human need for truth and understanding — the belief that knowledge itself is a form of power. In branding, the Sage translates to disciplined clarity: Oprah's Book Club earns authority by selecting rigorously, Harvard Business Review earns it by publishing carefully, MIT Media Lab earns it by building visibly. The Sage page reads like a well-organized argument. Its structure is itself a form of proof. The trap is becoming so careful that the page reads as cold or withholding. The Sage needs enough warmth to remain approachable — a touch of the Caregiver or the Creator — without abandoning its intellectual center. The five-second read should communicate: this person has done the thinking, and the thinking is visible.",
    colorAndImagery: "Cool, disciplined palettes — slate, navy, warm grays, forest green, with occasional warm accent for emphasis. Imagery should favor diagrams, charts, structured compositions, annotated figures, and real environments of thinking (libraries, labs, workshops). Portraits should be direct and thoughtful, not dramatic. The visual language should communicate that effort went into the organization, not just the decoration.",
    designWalkthrough: "Imagine building a site for a data strategy consultant. The hero has a clean headline — 'Evidence-first strategy for teams that cannot afford vague thinking' — over a subtle grid background. Below it: three labeled proof objects (shipped systems count, retained clients, methods archive link) arranged as metadata, not marketing. The body sections are thesis-driven: each starts with a bold claim, then walks through the reasoning. Diagrams replace paragraphs wherever possible. The CTA reads 'Read the methods.' The page earns trust through visible structure, not through enthusiasm.",
    contextShifts: "For a personal brand, the Sage works as the expert who publishes, teaches, and shows their reasoning in public. For a business brand, it becomes the reliable research institution or consultancy. For a product, it manifests as documentation quality, transparent pricing, and clear feature explanations. The key shift: personal brands emphasize method, business brands emphasize rigor, products emphasize clarity.",
    familyContrast: "Within the Paradise family, the Sage offers understanding where the Innocent offers safety and the Explorer offers adventure. The Sage says 'here is why.' The Innocent says 'everything will be fine.' The Explorer says 'let's find out what's next.' The Sage is for visitors who need to trust the thinking before they trust the person — people who evaluate arguments, not atmospheres.",
    fiveSecondTest: "'This person has done the work. The thinking is real.'",
  },
  {
    slug: "hero",
    name: "Hero",
    familyId: "thumbprint",
    familyTitle: "Leaving a Thumbprint on the World",
    imagePath: "/archetype-atlas/archetypes/hero.png",
    corePromise: "This will show what effort, courage, and skill can accomplish.",
    firstRead: "Decisive, strong, high-contrast, and moving toward a target.",
    gift: "It creates ambition, momentum, and belief in disciplined action.",
    trap: "It slides into aggression, vanity, or empty performance if the proof is weak.",
    chooseWhen: "Use it when the brand promise is about achievement, mastery, or rising to difficulty.",
    avoidWhen: "Avoid it when the work is fundamentally about reassurance, intimacy, or playful ease.",
    personalBrandUse: "Strong for operators, athletes, turnaround specialists, builders, and ambitious professionals in competitive fields.",
    businessBrandUse: "Useful for training, logistics, high-performance software, fitness, and mission-driven service brands.",
    fontDirection: {
      display: "Condensed grotesk or athletic serif with force and compression.",
      body: "Neutral sans that keeps pace with the stronger display voice.",
      accent: "Use bold mono counters, scorecards, or compact metadata treatments.",
    },
    vocabularyUse: ["build", "ship", "win", "endure", "raise", "perform"],
    vocabularyAvoid: ["vibes", "maybe", "gentle exploration", "drift", "softly"],
    layoutMoves: [
      "Use strong diagonals, sharp hierarchy, and a visible path to the next action.",
      "Show the target or threshold the work is meant to hit.",
      "Keep the hero tight and forceful rather than sprawling.",
    ],
    proofMoves: [
      "Use scorecards, milestones, delivery metrics, case outcomes, and time-sensitive achievements.",
      "Show where standards were raised, not just what was made.",
    ],
    ctaMoves: [
      "Use action-heavy CTAs such as See the scorecard, Review the rebuild, or Start the sprint.",
      "Avoid passive CTAs that dissipate the energy.",
    ],
    stylePartners: ["Brutalist Interface", "Swiss Grid"],
    exampleBrands: ["Nike", "FedEx", "The Marines", "Olympics"],
    heroHeadline: "Build faster. Hold the line. Deliver under pressure.",
    heroDeck:
      "Operational systems and performance design for teams that need visible standards, not motivational wallpaper.",
    needPull: "Achievement, competence, and mastery (Maslow's esteem layer). The Hero is drawn to challenge and the opportunity to prove capability through action.",
    persuasionEmphasis: "Commitment + scarcity. Rally to a clear outcome. The Hero responds to defined targets, deadlines, and the implication that action is required now, not eventually.",
    coreFear: "Weakness, incompetence, or being shown to lack courage.",
    coreDesire: "To prove worth through courageous action and mastery.",
    emotionalReward: "The visitor feels motivated, capable, and ready to rise to the challenge.",
    whatFeelsWrong: [
      "Passive, meandering language like 'explore at your own pace' or 'whenever feels right'",
      "Soft, muted color palettes with no visual tension or contrast",
      "Decorative illustrations instead of real outcomes, metrics, and results",
      "Long philosophical preambles before the point arrives",
      "CTAs that hedge: 'Maybe consider reaching out if you'd like'",
    ],
    narrative: "The Hero is the archetype of discipline, ambition, and visible performance. Mark and Pearson root it in the human need to prove oneself under pressure — to demonstrate that effort and skill lead to real outcomes. Nike is the canonical Hero brand: its promise is not that you will feel good, but that you will become better through the work. FedEx promises that the package will arrive. The Marines promise that the standard will be held. The Hero page reads like a briefing: here is the target, here is the plan, here is the proof that it works. The trap is that intensity without evidence becomes posturing. A Hero page full of power language and no receipts reads as motivational wallpaper. The proof must be specific — scorecards, metrics, delivery timelines, outcomes — and it must sit close to the claim. The Hero earns loyalty not by inspiring, but by delivering.",
    colorAndImagery: "High-contrast palettes — black, white, deep red, steel blue, with sharp edges and bold rules. Imagery should show motion, effort, and real performance contexts — athletes, operators, builders at work. Avoid posed power shots; the Hero reads best when the effort is authentic. Use performance data, scorecards, and milestone visualizations as visual elements alongside photographs.",
    designWalkthrough: "Imagine building a site for an operations consultant who rebuilds delivery pipelines. The hero is high-contrast: white text on near-black, headline reading 'Build faster. Ship cleaner. Raise the standard of the room.' Below it, a compact scorecard — 48 launches, 99.97% uptime, 3 enterprise rebuilds — presented as facts, not marketing. The body is structured as three case outcomes, each with a before/after metric and a one-line summary. The CTA reads 'See the scorecard.' There is no softness, no preamble, and no philosophy. The page is the performance.",
    contextShifts: "For a personal brand, the Hero works as the operator who ships and has the receipts. For a business brand, it becomes the performance-focused firm with visible outcomes. For a product, it manifests as speed, reliability metrics, and challenge-oriented onboarding. The key shift: personal brands emphasize the track record, business brands emphasize the standard, products emphasize the performance.",
    familyContrast: "Within the Thumbprint family, the Hero offers mastery through discipline where the Outlaw offers liberation through disruption and the Magician offers transformation through vision. The Hero says 'I will outperform.' The Outlaw says 'I will break the rule.' The Magician says 'I will change the system.' The Hero is for visitors who need to see competence and drive before they commit.",
    fiveSecondTest: "'This person ships. The standards are real.'",
  },
  {
    slug: "outlaw",
    name: "Outlaw",
    familyId: "thumbprint",
    familyTitle: "Leaving a Thumbprint on the World",
    imagePath: "/archetype-atlas/archetypes/outlaw.png",
    corePromise: "This will challenge what you thought was fixed.",
    firstRead: "Edgy, confrontational, anti-default, and impossible to mistake for category-safe.",
    gift: "It creates sharp differentiation and makes a critique feel alive.",
    trap: "It can become adolescent, cynical, or merely rude.",
    chooseWhen: "Use it when the brand wins by exposing a default as false, stale, oppressive, or fake.",
    avoidWhen: "Avoid it when the audience needs calm containment before they can hear the argument.",
    personalBrandUse: "Strong for critics, iconoclasts, independent creators, challenger consultants, and founders attacking category sameness.",
    businessBrandUse: "Useful for challenger brands, anti-establishment media, independent fashion, and disruptive products with real bite.",
    fontDirection: {
      display: "Stencil, grotesk, or collision-heavy display type with raw edge.",
      body: "Simple sans that stabilizes the rougher layers.",
      accent: "Mono, xerox labels, tape notes, or handwritten details can add force.",
    },
    vocabularyUse: ["default", "break", "refuse", "tear down", "counter", "uncage"],
    vocabularyAvoid: ["delightful", "peaceful", "trusted by everyone", "gentle clarity"],
    layoutMoves: [
      "Use interruption, contrast, torn forms, and asymmetry with enough control to keep the message legible.",
      "Make the first line a challenge, not a summary.",
      "Let one element misbehave while the rest keeps the page usable.",
    ],
    proofMoves: [
      "Use before-and-after teardowns, critique cases, exposed category habits, or visible acts of refusal.",
      "Show why the rebellion is necessary, not just cool.",
    ],
    ctaMoves: [
      "Use direct CTAs such as Open the teardown, See what we cut, or Break the category brief.",
      "Avoid polite networking language; it weakens the stance.",
    ],
    stylePartners: ["Punk and Grunge", "Brutalist Interface"],
    exampleBrands: ["Harley-Davidson", "Apple", "MTV", "Calvin Klein"],
    heroHeadline: "The category default is the problem.",
    heroDeck:
      "Brand strategy and design systems for challengers who need to look unmistakable, not merely competent.",
    needPull: "Liberation and self-determination (Maslow's autonomy layer). The Outlaw is drawn to breaking constraints that feel false, arbitrary, or oppressive.",
    persuasionEmphasis: "Social proof (inverted: proof that the mainstream is wrong) + authority (earned through visible acts of refusal). The Outlaw builds credibility by demonstrating what it has rejected and why.",
    coreFear: "Powerlessness, conformity, being co-opted by the system.",
    coreDesire: "Revolution or radical freedom — to overturn what is not working.",
    emotionalReward: "The visitor feels seen, validated in their dissatisfaction, and emboldened to act differently.",
    whatFeelsWrong: [
      "Polished corporate photography with smiling executives in suits",
      "Language that tries to please everyone: 'trusted by 10,000+ happy clients'",
      "Rounded corners, pastel palettes, and gentle gradients",
      "Safe, focus-grouped CTAs like 'Learn more' or 'Get in touch'",
      "A page that could belong to any competitor in the same category",
    ],
    narrative: "The Outlaw is the archetype of the challenger, the critic, the deliberate refusal of category defaults. Mark and Pearson connect it to the deep need for liberation — the belief that some rules exist not to protect but to control, and that breaking them is a form of service. Harley-Davidson does not sell motorcycles; it sells the feeling of riding away from the cubicle. Apple's 1984 campaign did not describe a computer; it described the destruction of conformity. MTV in its early era did not just play music; it broke the format of television itself. The Outlaw page must make the rebellion legible in the first line. The first sentence should be a challenge, not a summary. The trap is that rebellion without substance becomes pose — the brand that looks edgy but has nothing to say. Calvin Klein succeeded because behind the provocation sat real design. The Outlaw only works when the critique is earned and the replacement is visible.",
    colorAndImagery: "High-contrast, disrupted palettes — black, red, raw white, industrial tones. Texture matters: torn edges, halftone patterns, xerox artifacts, stencil marks, and deliberate roughness. Imagery should feel documented rather than art-directed — candid shots, concert photography, protest aesthetics, street-level reality. Avoid anything that looks like it came from a brand guidelines PDF.",
    designWalkthrough: "Imagine building a site for a brand strategist who helps challenger companies break category sameness. The hero is almost all type: massive headline reading 'The category default is the problem.' on a rough, high-contrast background. No hero image — the words are the image. Below, a torn-edge divider leads to three teardowns: real examples of category sameness with annotations showing what's wrong and what the repositioned version looks like. The proof is '9 repositions, 3 cult launches, 1 banned campaign that still sold out.' The CTA reads 'Open the teardown.' The page feels like evidence from the scene of the crime.",
    contextShifts: "For a personal brand, the Outlaw works as the visible critic who has put skin in the game. For a business brand, it becomes the challenger that names what the industry gets wrong. For a product, it manifests as features that deliberately break category conventions. The key shift: personal brands emphasize the stance, business brands emphasize the critique, products emphasize the alternative.",
    familyContrast: "Within the Thumbprint family, the Outlaw offers liberation through disruption where the Hero offers mastery through discipline and the Magician offers transformation through vision. The Outlaw says 'I will break the rule.' The Hero says 'I will outperform.' The Magician says 'I will change the system.' The Outlaw is for visitors who are angry at the default, not just ambitious to do better.",
    fiveSecondTest: "'This is not like anything else in the category. Something real is happening here.'",
  },
  {
    slug: "magician",
    name: "Magician",
    familyId: "thumbprint",
    familyTitle: "Leaving a Thumbprint on the World",
    imagePath: "/archetype-atlas/archetypes/magician.png",
    corePromise: "This will change how the world works or how you understand it.",
    firstRead: "Transformational, luminous, layered, and oriented toward a changed state.",
    gift: "It makes change feel possible and gives systems a sense of wonder and consequence.",
    trap: "It becomes vague or pseudo-mystical when the transformation is not demonstrated.",
    chooseWhen: "Use it when the offer changes a state, a workflow, a relationship, or a way of seeing.",
    avoidWhen: "Avoid it when the brand is simply about reliability or utility without transformation.",
    personalBrandUse: "Strong for systems consultants, AI builders, change leaders, designers of transitions, and transformation-led educators.",
    businessBrandUse: "Useful for AI, coaching, software, healthcare journeys, and products that promise real shifts in capability.",
    fontDirection: {
      display: "Modern sans with crisp edges or a subtly futuristic serif.",
      body: "Quiet sans that supports diagrams and transitions.",
      accent: "Technical labels, layered captions, and before/after markers work well.",
    },
    vocabularyUse: ["transform", "shift", "unlock", "reframe", "evolve", "system"],
    vocabularyAvoid: ["magic" , "mystical" , "limitless vibes", "mystery for its own sake"],
    layoutMoves: [
      "Use sequences, layers, light paths, and transitions that show state change.",
      "Make the visual field feel like one system unfolding into another.",
      "Anchor the wonder in legible structure.",
    ],
    proofMoves: [
      "Use before/after diagrams, transformation case files, adoption changes, and workflow evidence.",
      "Show the mechanism of change whenever possible.",
    ],
    ctaMoves: [
      "Use CTAs like See the transformation, Review the before and after, or Enter the system.",
      "Avoid generic discovery language if the point is real change.",
    ],
    stylePartners: ["Systems Modern", "Editorial Luxury"],
    exampleBrands: ["Apple keynote culture", "Tesla launch theater", "Disney Imagineering"],
    heroHeadline: "Change the system, not just the surface.",
    heroDeck:
      "Transformation design for teams and brands that need a visible shift in capability, not a cosmetic refresh.",
    needPull: "Transformation and self-actualization (Maslow's highest layer). The Magician is drawn to the moment when one state becomes another — the belief that change is possible and can be engineered.",
    persuasionEmphasis: "Reciprocity + social proof of transformation. Show what changes, then let the evidence of the shift carry the argument. The Magician persuades by demonstrating a real before/after.",
    coreFear: "Unintended negative consequences, creating harm through change.",
    coreDesire: "To understand the fundamental laws of how things work and use them to make things happen.",
    emotionalReward: "The visitor feels that the impossible is suddenly plausible. The world reshapes itself.",
    whatFeelsWrong: [
      "Static, finished-looking layouts that suggest nothing changes",
      "Language that describes features instead of transformations: 'We offer X, Y, Z'",
      "Before/after content where the after looks basically the same as the before",
      "Heavy, brutalist design that feels immovable rather than fluid",
      "Proof that shows quantity rather than quality of change",
    ],
    narrative: "The Magician is the archetype of transformation — not tricks, but real shifts in how things work. Mark and Pearson connect it to the human desire to understand the deep laws of the universe and use them to create change. Apple keynotes are Magician theater: they don't describe specifications, they reveal a changed world. Tesla launch events don't sell cars, they sell the moment when fossil fuel transportation becomes obsolete. Disney Imagineering doesn't build rides, it engineers wonder. The Magician page must demonstrate transformation, not just claim it. The most powerful Magician proof is the before/after: here is how the system worked, here is how it works now, here is what changed. Without that mechanism, the Magician becomes the archetype of vague promises and pseudo-mystical language. The word 'magic' should almost never appear on a Magician page — the transformation should be so visible that the visitor supplies the wonder themselves.",
    colorAndImagery: "Luminous, layered palettes — deep purples, electric blues, warm whites, with light effects suggesting transition and emergence. Imagery should show systems in motion: process diagrams, state-change sequences, layered compositions that suggest depth and transformation. Use light, gradients, and transparency as tools, not decorations. Avoid literal magic imagery (sparkles, wands); the visual language should feel engineered, not fantastical.",
    designWalkthrough: "Imagine building a site for an AI systems consultant who transforms how organizations operate. The hero opens with a split composition: left side shows a tangled workflow diagram in muted gray, right side shows the optimized version in luminous color. Headline: 'Change the way the work behaves, not just the way it looks.' Below, three transformation case files, each with a before state, an intervention summary, and measurable after metrics. The proof reads 'Before-and-after workflow maps, transformation case files, adoption metrics.' The CTA: 'See a system before and after.' The page makes change visible and mechanical, not mystical.",
    contextShifts: "For a personal brand, the Magician works as the systems thinker who shows how they changed the game. For a business brand, it becomes the transformative consultancy or product. For a product, it manifests as features that change workflows, not just automate them. The key shift: personal brands emphasize the vision, business brands emphasize the mechanism, products emphasize the before/after.",
    familyContrast: "Within the Thumbprint family, the Magician offers transformation through vision where the Hero offers mastery through discipline and the Outlaw offers liberation through disruption. The Magician says 'I will change the system.' The Hero says 'I will outperform.' The Outlaw says 'I will break the rule.' The Magician is for visitors who need to see that a better version is possible, not just that the current version can be fought or outworked.",
    fiveSecondTest: "'Something is different here. This person understands how to make real change happen.'",
  },
  {
    slug: "everyman",
    name: "Everyman",
    familyId: "island",
    familyTitle: "No One Is an Island",
    imagePath: "/archetype-atlas/archetypes/everyman.png",
    corePromise: "This is for someone like you.",
    firstRead: "Approachable, plainspoken, honest, and socially easy to enter.",
    gift: "It creates belonging fast and lowers intimidation.",
    trap: "It can disappear into generic niceness or fear of distinction.",
    chooseWhen: "Use it when trust depends on relatability, fairness, or the removal of performance.",
    avoidWhen: "Avoid it when the offer wins by exclusivity, provocation, or technical authority.",
    personalBrandUse: "Strong for community leaders, practical service providers, teachers, and local businesses.",
    businessBrandUse: "Useful for utility products, community brands, service businesses, and affordable tools.",
    fontDirection: {
      display: "Simple grotesk or sturdy serif with little flourish.",
      body: "Readable sans with low contrast and plain rhythm.",
      accent: "Use accents sparingly; friendliness matters more than novelty.",
    },
    vocabularyUse: ["real", "solid", "useful", "plain", "honest", "together"],
    vocabularyAvoid: ["elite", "iconic", "transgressive", "visionary genius"],
    layoutMoves: [
      "Use straight lines, easy navigation, familiar patterns, and plain language labels.",
      "Let the page feel lived-in rather than spectacular.",
      "Avoid unnecessary theater or mystery.",
    ],
    proofMoves: [
      "Use real faces, ordinary success stories, testimonials, and practical receipts.",
      "Show how the work fits into everyday life.",
    ],
    ctaMoves: [
      "Use CTAs such as Start here, See the practical guide, or Talk through the options.",
      "Avoid exclusivity language unless the business actually depends on it.",
    ],
    stylePartners: ["Swiss Grid", "Editorial Luxury"],
    exampleBrands: ["Wendy's", "Saturn", "Levi's 501 in its plain mode", "IKEA basics"],
    heroHeadline: "A real web presence for real work.",
    heroDeck:
      "Practical strategy, honest messaging, and human proof for brands that win by being believable, useful, and easy to trust.",
    needPull: "Belonging, inclusion, and social connection (Maslow's belonging layer). The Everyman appeals to the desire to be part of the group, not above it.",
    persuasionEmphasis: "Social proof + liking. 'People like you succeed here.' The Everyman persuades by making the visitor feel recognized and included rather than impressed or intimidated.",
    coreFear: "Standing out, being rejected, or being seen as pretentious.",
    coreDesire: "To belong, to connect, and to be accepted as part of the group.",
    emotionalReward: "The visitor feels welcome, recognized, and unburdened by performance pressure.",
    whatFeelsWrong: [
      "Luxury typography with high-contrast serifs and dramatic white space",
      "Language about 'elite,' 'exclusive,' or 'curated for the discerning'",
      "Dark moody photography with fashion-editorial staging",
      "Complex navigation hierarchies with insider terminology",
      "A page that makes the visitor feel like they need to earn the right to be there",
    ],
    narrative: "The Everyman is the archetype of the neighbor, the co-worker, the person who succeeds not by being extraordinary but by being genuine. Mark and Pearson connect it to the fundamental human need for belonging — the desire to be part of the community rather than separate from it. Wendy's succeeds as an Everyman brand because it feels like actual food made by actual people. IKEA basics succeed because the furniture acknowledges that most people have real budgets and real living rooms. The Everyman page removes all performance and posture. Its language is plain, its imagery is real, and its promise is practical. The trap is invisibility: if the Everyman has no distinctive voice at all, it disappears into generic niceness. The solution is specificity — plain does not mean vague, and honest does not mean bland. The best Everyman brands are memorable precisely because their honesty feels rare in a sea of aspiration.",
    colorAndImagery: "Warm, approachable palettes — natural browns, soft blues, off-whites, warm grays, and unpretentious greens. Imagery should show real people in real contexts: actual workplaces, actual neighborhoods, actual hands doing actual work. Avoid stock photography where everyone is beautiful and diverse in the same focus-grouped way. The visual language should feel like photos from someone's phone, not from a shoot.",
    designWalkthrough: "Imagine building a site for a local bookkeeping service. The hero shows a real photo of the owner at their desk with a client, headline reading 'Honest books for honest businesses.' Below, three plain sections: What we do, What people say, and What it costs — each with clear, jargon-free language and real numbers. The testimonials use first names and specific outcomes. The pricing is visible, not hidden behind a 'contact us' form. The CTA reads 'Start here.' The page feels like a conversation with a competent neighbor, not a sales pitch.",
    contextShifts: "For a personal brand, the Everyman works as the trustworthy practitioner who relates to the audience's real situation. For a business brand, it becomes the accessible, honest service provider. For a product, it manifests as simple pricing, plain language, and features that solve common problems without ceremony. The key shift: personal brands emphasize relatability, business brands emphasize accessibility, products emphasize practicality.",
    familyContrast: "Within the Island family, the Everyman offers belonging through relatability where the Lover offers connection through intensity and the Jester offers connection through play. The Everyman says 'I'm one of you.' The Lover says 'I see you deeply.' The Jester says 'I'll make you laugh.' The Everyman is for visitors who need to feel recognized as ordinary people with real needs, not seduced or entertained.",
    fiveSecondTest: "'These are real people. This is for someone like me.'",
  },
  {
    slug: "lover",
    name: "Lover",
    familyId: "island",
    familyTitle: "No One Is an Island",
    imagePath: "/archetype-atlas/archetypes/lover.png",
    corePromise: "This is made for people who care deeply about quality and feeling.",
    firstRead: "Sensory, specific, intimate, and emotionally charged.",
    gift: "It creates desire, emotional resonance, and the sense of being carefully attended to.",
    trap: "It can become indulgent, coy, or decorative without substance.",
    chooseWhen: "Use it when taste, intimacy, experience, or devotion are part of the value proposition.",
    avoidWhen: "Avoid it when the work must read as neutral, institutional, or stripped to pure utility.",
    personalBrandUse: "Strong for designers, makers, chefs, photographers, fashion brands, and hospitality-led portfolios.",
    businessBrandUse: "Useful for premium products, culture brands, food, interiors, wellness, and craft-led businesses.",
    fontDirection: {
      display: "High-contrast serif or elegant sans with obvious taste.",
      body: "Warm sans or soft serif that supports a slower, more sensual read.",
      accent: "Use italics or narrow caps sparingly for emotional detail.",
    },
    vocabularyUse: ["crafted", "rich", "devoted", "sensory", "carefully", "beautifully"],
    vocabularyAvoid: ["efficient", "generic", "industrial", "clinical", "blunt"],
    layoutMoves: [
      "Use generous image crops, tactile materials, close details, and slower pacing.",
      "Let the hero feel composed and intimate rather than loud.",
      "Use whitespace to imply confidence and attention.",
    ],
    proofMoves: [
      "Use close-up craft evidence, testimonials about experience, and process details that show care.",
      "Show material richness as proof, not decoration alone.",
    ],
    ctaMoves: [
      "Use CTAs like Experience the collection, Enter the studio, or Book a tasting.",
      "Avoid cold administrative language if warmth is the promise.",
    ],
    stylePartners: ["Editorial Luxury"],
    exampleBrands: ["Hallmark", "Aesop", "Bottega Veneta", "Kinfolk-style hospitality"],
    heroHeadline: "Made for people who notice the difference.",
    heroDeck:
      "A brand language of taste, intimacy, and quality for work that wins by making people feel the care in the details.",
    needPull: "Intimacy, sensory pleasure, and emotional connection (Maslow's belonging and esteem layers). The Lover appeals to the desire to experience beauty and to be deeply seen.",
    persuasionEmphasis: "Liking + reciprocity through experience. The Lover persuades by giving the visitor a sensory experience that feels like a gift — attention to detail that creates emotional debt and desire.",
    coreFear: "Being unwanted, unloved, or alone.",
    coreDesire: "Intimacy, sensory experience, and the feeling of being deeply valued.",
    emotionalReward: "The visitor feels attended to, desired, and treated with unusual care.",
    whatFeelsWrong: [
      "Utilitarian layouts with dense data tables and bullet-point specifications",
      "Language that is purely functional: 'features include,' 'specifications,' 'output metrics'",
      "Industrial or brutalist design with raw concrete textures and monospace type",
      "Bright, cheerful palettes with cartoon illustrations or mascots",
      "Fast-paced layouts designed for quick scanning rather than lingering",
    ],
    narrative: "The Lover is the archetype of devotion, taste, and sensory intelligence. Mark and Pearson connect it to the human desire for intimacy and beauty — the belief that quality of attention is itself a form of love. Hallmark sells the Lover promise through cards that say what people cannot say themselves. Aesop sells it through packaging that makes a soap bottle feel like a considered object. Bottega Veneta sells it through craftsmanship so refined that the logo becomes unnecessary. The Lover page must create an experience, not just describe one. The pacing slows down on purpose, the imagery invites close looking, and the language carries specific sensory detail. 'We craft beautiful experiences' is not Lover language; 'Hand-stitched with waxed linen thread, finished with a bone folder' is. The trap is that beauty without purpose becomes decoration. The Lover works when the care is visible proof that the maker is paying a kind of attention the visitor has not encountered elsewhere.",
    colorAndImagery: "Rich, warm palettes — deep burgundy, warm gold, soft black, cream, olive, and dusky rose. Imagery should feature close-up textures, material details, hands at work, and spaces that invite lingering. Photography should be intimate in scale — macro shots, shallow depth of field, and natural light. The visual language should make the visitor want to touch the screen.",
    designWalkthrough: "Imagine building a site for an artisan leather goods maker. The hero is a full-bleed macro photograph of hands burnishing a leather edge, with a one-line headline in elegant serif: 'Made for people who notice the difference.' Below, the product grid uses large-scale photography with generous white space between each piece. Each product card shows a detail shot and a process shot side by side. The 'About' section does not list credentials; it shows a video of the maker's hands at work with ambient workshop sound. The CTA reads 'Experience the collection.' The page smells like leather even though you cannot smell it.",
    contextShifts: "For a personal brand, the Lover works as the tastemaker who demonstrates care through visible craft and attention. For a business brand, it becomes the premium experience provider. For a product, it manifests as packaging, unboxing, and material quality that exceed expectations. The key shift: personal brands emphasize taste, business brands emphasize experience, products emphasize sensory quality.",
    familyContrast: "Within the Island family, the Lover offers connection through intensity where the Everyman offers connection through relatability and the Jester offers connection through play. The Lover says 'I see you deeply.' The Everyman says 'I'm one of you.' The Jester says 'I'll make you laugh.' The Lover is for visitors who value quality, taste, and emotional richness over simplicity or humor.",
    fiveSecondTest: "'This is beautiful, specific, and made with real care. I want to look closer.'",
  },
  {
    slug: "jester",
    name: "Jester",
    familyId: "island",
    familyTitle: "No One Is an Island",
    imagePath: "/archetype-atlas/archetypes/jester.png",
    corePromise: "This will be lively, smart, and more interesting than the usual version.",
    firstRead: "Playful, surprising, bright, and socially disarming.",
    gift: "It lowers defenses and makes a brand memorable through wit.",
    trap: "It can undermine trust, become silly, or dodge seriousness when seriousness is required.",
    chooseWhen: "Use it when wit, mischief, relief, or social ease are part of the value.",
    avoidWhen: "Avoid it when the audience is in crisis or the work must feel solemn and exact.",
    personalBrandUse: "Strong for entertainers, culture writers, playful agencies, and brands that teach by delight.",
    businessBrandUse: "Useful for beverage, food, leisure, media, and challenger brands that need social electricity.",
    fontDirection: {
      display: "Punchy sans with obvious personality.",
      body: "Friendly sans with slightly tighter rhythm.",
      accent: "Use playful mono or oversized microcopy for surprise beats.",
    },
    vocabularyUse: ["play", "wink", "lighten", "smart", "surprise", "alive"],
    vocabularyAvoid: ["solemn", "impeccable authority", "total control", "grave seriousness"],
    layoutMoves: [
      "Use one or two surprise interruptions, playful scale jumps, and tension-breaking details.",
      "Keep the joke subordinate to the idea.",
      "Use brightness and rhythm to keep energy moving.",
    ],
    proofMoves: [
      "Use social proof, memorable brand acts, campaign artifacts, or examples of wit that still served the objective.",
      "Prove intelligence, not just noise.",
    ],
    ctaMoves: [
      "Use CTAs like See the bit, Watch the campaign, or Open the playful version.",
      "Avoid dead contact language that collapses the energy.",
    ],
    stylePartners: ["Punk and Grunge", "Brutalist Interface"],
    exampleBrands: ["Pepsi", "Ben & Jerry's", "M&M's", "Club Med"],
    heroHeadline: "A serious idea can still arrive with a grin.",
    heroDeck:
      "Playful strategy and memorable brand systems for companies that win by being sharp, social, and impossible to forget.",
    needPull: "Joy, social connection, and relief from pressure (Maslow's belonging and psychological well-being layers). The Jester appeals to the human need for play and the relief of laughter.",
    persuasionEmphasis: "Liking + surprise. The Jester disarms defenses through humor, then redirects attention toward the real point. Persuasion works because the visitor's guard is down.",
    coreFear: "Being boring, being irrelevant, or losing the audience's attention.",
    coreDesire: "To live in the moment with full enjoyment and to lighten the world.",
    emotionalReward: "The visitor feels delighted, disarmed, and genuinely entertained while learning something.",
    whatFeelsWrong: [
      "Solemn institutional layouts with zero personality or surprise",
      "Long, earnest paragraphs of self-serious thought leadership",
      "Conservative color palettes with navy, gray, and gold",
      "Formal language: 'We are committed to delivering value'",
      "A completely predictable page where every section does what you expect",
    ],
    narrative: "The Jester is the archetype of wit, mischief, and social intelligence. Mark and Pearson connect it to the human need for enjoyment and the power of humor to create belonging. Pepsi has always played Jester to Coca-Cola's more earnest positioning. Ben & Jerry's makes ice cream fun and political at the same time. M&M's built an entire universe of anthropomorphized candy that should not work but does. The Jester page must surprise. One element misbehaves, one line lands differently than expected, one visual breaks the pattern. But the intelligence must be visible. The Jester is not the Clown — the humor serves the idea, not the other way around. The trap is that a joke page with no substance loses trust after the first laugh. The best Jester brands — like Wendy's Twitter presence or Old Spice's campaigns — are ferociously smart underneath the play. They know exactly what they are doing, and part of the delight is that the audience can feel the intelligence.",
    colorAndImagery: "Bright, energetic palettes — bold primaries, unexpected color clashes, saturated tones with high contrast. Imagery should be dynamic: action shots, exaggerated expressions, collage-style compositions, and visual surprises. Illustration and animation work well. The visual language should feel like it was made by someone who is having fun and wants you to have fun too. Avoid anything that looks like it was approved by a committee.",
    designWalkthrough: "Imagine building a site for a creative agency that uses humor as a strategy tool. The hero features oversized type that reads 'A serious idea can still arrive with a grin' — but the period at the end is a tiny smiley face that you only notice on second look. Below, the case studies are labeled 'Things we made that actually worked' with each thumbnail slightly askew. The proof section uses real metrics but presents them as a fake quiz: 'How many campaigns generated >200% ROI? A) Most of them B) Basically all C) We stopped counting.' The CTA reads 'See the bit.' The page is seriously playful, not playfully unserious.",
    contextShifts: "For a personal brand, the Jester works as the sharp voice that people follow for the takes, not just the information. For a business brand, it becomes the company with the memorable campaign and the loyal social following. For a product, it manifests as delightful microcopy, Easter eggs, and experiences that make the user smile. The key shift: personal brands emphasize wit, business brands emphasize memorability, products emphasize delight.",
    familyContrast: "Within the Island family, the Jester offers connection through play where the Everyman offers connection through relatability and the Lover offers connection through intensity. The Jester says 'I'll make you laugh.' The Everyman says 'I'm one of you.' The Lover says 'I see you deeply.' The Jester is for visitors who need to be entertained before they trust, and who respect intelligence expressed as humor.",
    fiveSecondTest: "'This is smart and funny. I want to keep looking to see what they do next.'",
  },
  {
    slug: "caregiver",
    name: "Caregiver",
    familyId: "structure",
    familyTitle: "Providing Structure to the World",
    imagePath: "/archetype-atlas/archetypes/caregiver.png",
    corePromise: "This will take care of people, not simply process them.",
    firstRead: "Warm, accessible, calm, and visibly human-centered.",
    gift: "It creates safety and lowers the fear of being mishandled.",
    trap: "It can become sentimental, paternalistic, or soft without evidence.",
    chooseWhen: "Use it when service, protection, guidance, or care is the primary value.",
    avoidWhen: "Avoid it when the brand wins by severity, rebellion, or sensual appetite.",
    personalBrandUse: "Strong for educators, therapists, health practitioners, mentors, support teams, and nonprofits.",
    businessBrandUse: "Useful for healthcare, education, social services, community infrastructure, and values-led service brands.",
    fontDirection: {
      display: "Soft serif or humanist sans with warmth but not weakness.",
      body: "Calm sans optimized for readability and reassurance.",
      accent: "Use restrained captions and guidance labels, not aggressive badges.",
    },
    vocabularyUse: ["support", "guide", "care", "ease", "clarify", "protect"],
    vocabularyAvoid: ["dominate", "shock", "crush", "weaponize", "elite"],
    layoutMoves: [
      "Use generous spacing, visible wayfinding, and human imagery that actually fits the service.",
      "Make the path through the page feel anticipated and supported.",
      "Reduce friction wherever the visitor is likely anxious.",
    ],
    proofMoves: [
      "Use support outcomes, accessibility audits, trust markers, and stories of care done well.",
      "Show systems, not just smiles.",
    ],
    ctaMoves: [
      "Use CTAs like Start with support, Review the care plan, or See how we guide the process.",
      "Avoid hard-close urgency unless the context truly calls for it.",
    ],
    stylePartners: ["Editorial Luxury", "Swiss Grid"],
    exampleBrands: ["Johnson & Johnson in its caregiving mode", "March of Dimes", "Khan Academy support materials"],
    heroHeadline: "Design that makes people feel guided, not handled.",
    heroDeck:
      "Accessible systems, calm messaging, and real proof for services where trust begins with how people are treated.",
    needPull: "Safety, protection, and nurturing (Maslow's safety and belonging layers). The Caregiver appeals to the desire to be taken care of and the fear of being abandoned or harmed.",
    persuasionEmphasis: "Liking + reciprocity. Emphasize care and protection. The Caregiver persuades by making the visitor feel genuinely supported — trust follows from visible kindness and competence.",
    coreFear: "Selfishness, ingratitude, or inability to protect those in need.",
    coreDesire: "To protect and care for others, to prevent harm and suffering.",
    emotionalReward: "The visitor feels safe, attended to, and confident that they will not be abandoned or mishandled.",
    whatFeelsWrong: [
      "Aggressive, high-contrast design with sharp edges and confrontational language",
      "Achievement-oriented metrics: 'fastest,' 'most powerful,' 'industry-leading'",
      "Dark interfaces with neon accents and tech-startup energy",
      "Scarcity-driven CTAs: 'Only 3 spots left' or 'Act before midnight'",
      "A page that makes the visitor feel assessed, judged, or hurried",
    ],
    narrative: "The Caregiver is the archetype of protection, service, and human-centered design. Mark and Pearson connect it to the parental instinct — the desire to keep others safe, to anticipate needs before they become crises, and to create environments where vulnerability is honored rather than exploited. Johnson & Johnson in its best moments embodies this: the brand promise is not performance but safety. Khan Academy succeeds as a Caregiver because its design removes anxiety from learning. March of Dimes succeeds because it makes protection visible and fundable. The Caregiver page must anticipate how the visitor feels upon arrival — often anxious, uncertain, or seeking help — and respond with immediate reassurance. Navigation should feel like guidance. Language should feel like someone who knows the way. The trap is that warmth without competence reads as sentimental or patronizing. The Caregiver must show systems, not just smiles. The care must be visibly engineered, not just emotionally performed.",
    colorAndImagery: "Warm, reassuring palettes — soft greens, warm whites, gentle blues, natural tans, and touches of warm amber. Imagery should show real care in action: hands guiding, people being supported, calm environments designed for comfort. Avoid clinical stock photography where the care looks sterile. The visual language should feel like a well-designed waiting room — calm, competent, and obviously prepared for your arrival.",
    designWalkthrough: "Imagine building a site for a therapy practice. The hero shows a warm, naturally lit space with the headline 'A safe place to begin the conversation you've been putting off.' Below, the first section is 'What to expect' — a three-step visual guide to the intake process, each step with a reassuring one-line explanation. The therapist bios show real faces with warm expressions and specific specializations, not generic credentials. The FAQ addresses real anxieties: 'What if I cry?' 'What if I don't know what to say?' The CTA reads 'Start with a free conversation.' Every element reduces friction and anticipates where the visitor might feel afraid.",
    contextShifts: "For a personal brand, the Caregiver works as the trusted guide who leads with empathy and competence. For a business brand, it becomes the service organization that treats people as people. For a product, it manifests as accessible onboarding, supportive error messages, and human customer support. The key shift: personal brands emphasize empathy, business brands emphasize systems of care, products emphasize accessibility.",
    familyContrast: "Within the Structure family, the Caregiver offers care and protection where the Creator offers craft and originality and the Ruler offers order and authority. The Caregiver says 'I will take care of you.' The Creator says 'I made this with purpose.' The Ruler says 'I set the standard.' The Caregiver is for visitors who are anxious or vulnerable and need to feel protected before they need to feel impressed.",
    fiveSecondTest: "'I feel safe here. This was designed by someone who understands what I need.'",
  },
  {
    slug: "creator",
    name: "Creator",
    familyId: "structure",
    familyTitle: "Providing Structure to the World",
    imagePath: "/archetype-atlas/archetypes/creator.png",
    corePromise: "This is made with genuine craft and authorship.",
    firstRead: "Original, process-aware, detail-rich, and intentionally composed.",
    gift: "It shows visible skill and turns making itself into part of the argument.",
    trap: "It can become precious, self-referential, or disconnected from usefulness.",
    chooseWhen: "Use it when the originality and quality of making are central to why the work matters.",
    avoidWhen: "Avoid it when the audience needs plain utility before expressive authorship.",
    personalBrandUse: "Strong for designers, architects, artists, engineers, product builders, and anyone whose process is part of the proof.",
    businessBrandUse: "Useful for studios, tools for makers, product teams, interiors, craft brands, and original research organizations.",
    fontDirection: {
      display: "Distinct serif or crafted grotesk with visual character.",
      body: "Quiet sans or readable serif that supports process notes.",
      accent: "Use labels, sketch notes, or material captions where they deepen the making story.",
    },
    vocabularyUse: ["make", "compose", "build", "craft", "prototype", "shape"],
    vocabularyAvoid: ["template", "quick fix", "mass content", "generic solution"],
    layoutMoves: [
      "Expose process, material decisions, and annotated fragments.",
      "Let the page feel authored, not auto-filled.",
      "Use rhythm and detail to make the craft legible without overwhelming the read.",
    ],
    proofMoves: [
      "Use sketches, prototypes, process clips, material libraries, and decision annotations.",
      "Make the transition from process to result visible.",
    ],
    ctaMoves: [
      "Use CTAs like Enter the studio, Inspect the process, or Review the prototypes.",
      "Avoid generic portfolio CTAs that hide the making story.",
    ],
    stylePartners: ["Editorial Luxury", "Systems Modern", "Punk and Grunge"],
    exampleBrands: ["Crayola", "Martha Stewart", "Sesame Street", "Kinko's in its maker mode"],
    heroHeadline: "Built with a point of view, not assembled from defaults.",
    heroDeck:
      "Strategy, systems, and design work that make the hand of the maker visible without sacrificing clarity.",
    needPull: "Self-expression, imagination, and enduring creation (Maslow's self-actualization layer). The Creator is driven to bring something new into existence — to shape the world through making.",
    persuasionEmphasis: "Authority (of craft) + reciprocity (through visible process). The Creator persuades by showing the work behind the work — sketches, prototypes, decisions — which creates trust in the quality of the result.",
    coreFear: "Mediocrity, being derivative, or creating something that doesn't matter.",
    coreDesire: "To create something of enduring value that expresses a genuine vision.",
    emotionalReward: "The visitor feels they are in the presence of genuine skill and intentional choices. The work feels made, not generated.",
    whatFeelsWrong: [
      "Template-driven layouts that look identical to every other site in the category",
      "Stock photography where every image could be swapped without changing the meaning",
      "Language that is purely strategic with no sense of craft: 'solutions,' 'deliverables,' 'value-add'",
      "Minimalist to the point of anonymity — so stripped that no maker is visible",
      "Auto-generated or AI-produced content presented without visible human judgment",
    ],
    narrative: "The Creator is the archetype of making, craft, and visible authorship. Mark and Pearson connect it to the deep human desire to create something that outlasts the moment — to shape raw material into form through judgment, skill, and vision. Crayola embodies this by making creativity itself the product: not the crayon, but what the crayon makes possible. Martha Stewart embodies it by showing that taste and process are inseparable. Sesame Street embodies it by proving that entertainment and education can be crafted into one thing by people who care about both. The Creator page must show the hand of the maker. Process is not behind-the-scenes content; it is the proof. When the visitor sees sketches, prototypes, annotations, and the decisions that shaped the final work, they trust the result more than any list of credentials could achieve. The trap is preciousness — the maker so in love with their process that the page serves the portfolio rather than the audience. The Creator works when the craft serves communication, not when it replaces it.",
    colorAndImagery: "Curated, intentional palettes — warm grays, natural materials (wood, stone, paper, ink), muted earth tones with one strong accent. Imagery should show process: sketches, material samples, prototypes in progress, annotated iterations, and workshop environments. The visual language should make craft visible. Show the hand, the tool, the decision — not just the finished artifact.",
    designWalkthrough: "Imagine building a portfolio for an industrial designer. The hero shows a split: one side is a rough prototype sketch on kraft paper, the other is the finished product photographed in use. Headline: 'Built with a point of view, not assembled from defaults.' Below, each project unfolds as a three-stage story: the brief, the process (with annotated photos of iterations, material tests, and decision moments), and the result (with real-use photography and client testimony). The 'About' section shows the studio space with tools visible. The CTA reads 'Enter the studio.' The page does not just show beautiful work — it shows how the work was made.",
    contextShifts: "For a personal brand, the Creator works as the maker whose process is visible proof of quality. For a business brand, it becomes the studio or firm where authorship and craft are the differentiators. For a product, it manifests as visible design decisions, quality materials, and features that show intentional making. The key shift: personal brands emphasize process, business brands emphasize authorship, products emphasize craft.",
    familyContrast: "Within the Structure family, the Creator offers craft and originality where the Caregiver offers care and protection and the Ruler offers order and authority. The Creator says 'I made this with purpose.' The Caregiver says 'I will take care of you.' The Ruler says 'I set the standard.' The Creator is for visitors who need to see genuine skill and authorship before they commit.",
    fiveSecondTest: "'This person made this. The work is original and the craft is visible.'",
  },
  {
    slug: "ruler",
    name: "Ruler",
    familyId: "structure",
    familyTitle: "Providing Structure to the World",
    imagePath: "/archetype-atlas/archetypes/ruler.png",
    corePromise: "This sets the standard and knows how to keep order.",
    firstRead: "Controlled, premium, orderly, and self-possessed.",
    gift: "It creates immediate authority and the sense that the system is under control.",
    trap: "It can become cold, domineering, or exclusionary.",
    chooseWhen: "Use it when leadership, governance, stewardship, or category-setting authority are part of the claim.",
    avoidWhen: "Avoid it when the brand must feel playful, anti-establishment, or highly democratic.",
    personalBrandUse: "Strong for executives, operators, institution builders, legal or financial advisors, and senior consultants.",
    businessBrandUse: "Useful for governance, luxury, finance, executive services, and brands that must feel in command.",
    fontDirection: {
      display: "Refined serif or sharp grotesk with quiet authority.",
      body: "Neutral premium sans with exact spacing and low ornament.",
      accent: "Use small caps, rules, and measured metadata for order rather than spectacle.",
    },
    vocabularyUse: ["standard", "govern", "lead", "structure", "steward", "command"],
    vocabularyAvoid: ["messy", "wild", "roughly", "chaotic", "just vibes"],
    layoutMoves: [
      "Use strong containment, aligned edges, premium spacing, and a restrained palette.",
      "Make the hero look composed and finished before any supporting text appears.",
      "Use order itself as part of the proof.",
    ],
    proofMoves: [
      "Use governance artifacts, institutional results, systems diagrams, and visible standards.",
      "Show what the brand governs or safeguards.",
    ],
    ctaMoves: [
      "Use CTAs like Review the standard, Enter the framework, or See the governance model.",
      "Avoid needy or overly casual CTAs.",
    ],
    stylePartners: ["Swiss Grid", "Editorial Luxury", "Brutalist Interface"],
    exampleBrands: ["American Express in its premium mode", "Rolex", "Harvard in its institutional mode", "Microsoft in its ruler mode"],
    heroHeadline: "Order, standards, and systems people can trust.",
    heroDeck:
      "Brand architecture and operating logic for organizations that need to look composed, authoritative, and decisively in command.",
    needPull: "Control, stability, and predictability (Maslow's safety and esteem layers). The Ruler appeals to the desire for order — for someone to be in charge who actually knows what they are doing.",
    persuasionEmphasis: "Authority + consistency. The Ruler persuades by demonstrating visible control, institutional quality, and standards that do not waver. Trust comes from seeing that the system is governed, not improvised.",
    coreFear: "Chaos, being overthrown, or losing control.",
    coreDesire: "To create a prosperous, successful organization or community through control and leadership.",
    emotionalReward: "The visitor feels that they are dealing with the standard — the organization that sets the benchmark and holds the line.",
    whatFeelsWrong: [
      "Playful, colorful interfaces with emoji, informal language, or visible humor",
      "Rough, unfinished, or deliberately broken layouts (punk, grunge, brutalist excess)",
      "Language that hedges: 'we think,' 'we're exploring,' 'we're figuring it out'",
      "Social proof that relies on personality or virality rather than institutional results",
      "A design that looks improvised, experimental, or still in progress",
    ],
    narrative: "The Ruler is the archetype of authority, governance, and the setting of standards. Mark and Pearson connect it to the human desire for order and the belief that someone should be in charge who deserves to be. American Express in its premium mode does not sell a credit card; it sells membership in an institution. Rolex does not sell watches; it sells the visible achievement of owning the standard. Harvard does not sell education; it sells the imprimatur of the most trusted institution. Microsoft in its enterprise mode does not sell software; it sells the operating logic of serious organizations. The Ruler page must look finished, composed, and unshakeable before a single word is read. The structure itself is the argument. Premium spacing, controlled typography, and restrained palettes communicate that every detail has been decided by someone who knows what they are doing. The trap is becoming cold, exclusionary, or rigid. The Ruler needs enough humanity to remain approachable — typically a touch of Caregiver warmth or Creator craft — without abandoning the authority. The five-second read should communicate: this is the standard, and it is not an accident.",
    colorAndImagery: "Controlled, premium palettes — deep navy, charcoal, rich burgundy, gold accents, and extensive use of white space as a signal of confidence. Imagery should show environments of order: architecture, boardrooms (real ones, not stock), institutional buildings, precise engineering, and composed portraits. Avoid anything that looks casual, spontaneous, or unplanned. The visual language should feel governed.",
    designWalkthrough: "Imagine building a site for an executive advisory firm. The hero is minimal: navy background, gold type, one line reading 'Order, standards, and systems people can trust.' Below, the service offering is presented as a structured framework with three pillars, each with a contained card, precise language, and no decorative elements. Client logos are institutional (Fortune 500, government, university). The case studies use before/after metrics with proper data visualization. The team section shows restrained professional portraits with titles. The CTA reads 'Review the governance model.' The page looks like it was designed by the firm it represents — precise, premium, and in complete control.",
    contextShifts: "For a personal brand, the Ruler works as the executive or advisor whose authority is visible and earned. For a business brand, it becomes the institution that sets the category standard. For a product, it manifests as premium materials, precise documentation, and enterprise-grade reliability. The key shift: personal brands emphasize earned authority, business brands emphasize institutional quality, products emphasize premium execution.",
    familyContrast: "Within the Structure family, the Ruler offers order and authority where the Caregiver offers care and protection and the Creator offers craft and originality. The Ruler says 'I set the standard.' The Caregiver says 'I will take care of you.' The Creator says 'I made this with purpose.' The Ruler is for visitors who need to see institutional confidence and governing authority before they commit.",
    fiveSecondTest: "'This is the standard. These people are in charge and they deserve to be.'",
  },
];