export type WebPresenceNavItem = {
  id: string;
  href: string;
  label: string;
};

export type WebPresenceProduct = {
  title: string;
  audience: string;
  summary: string;
  mustDo: string[];
  submit: string[];
  review: string[];
};

export type WorkbookPrompt = {
  title: string;
  summary: string;
  example?: string;
};

export type Archetype = {
  title: string;
  promise: string;
  feel: string;
  gift: string;
  trap: string;
  fits: string;
};

export type ArchetypeFamily = {
  title: string;
  archetypesLabel: string;
  summary: string;
  archetypes: Archetype[];
};

export const webPresenceSiteTitle = "Web Presence Workshop";

export const webPresenceNavItems: WebPresenceNavItem[] = [
  { id: "overview", href: "/", label: "Overview" },
  { id: "workbook", href: "/workbook", label: "Workbook" },
  { id: "archetypes", href: "/archetypes", label: "Archetypes" },
  { id: "deliverables", href: "/deliverables", label: "Deliverables" },
  { id: "instructor-guide", href: "/instructor-guide", label: "Instructor" },
];

export const webPresencePathCards = [
  {
    title: "Workbook",
    summary:
      "Move through the signal brief, page audit, proof block, and three-week build plan in the same order students use in studio.",
    href: "/workbook",
    cta: "Open workbook",
  },
  {
    title: "Archetypes",
    summary:
      "Compare all 12 archetypes by first-read feel, gift, trap, and best-fit contexts before anyone locks a headline or visual lane.",
    href: "/archetypes",
    cta: "Compare archetypes",
  },
  {
    title: "Deliverables",
    summary:
      "Keep the portfolio final and museum final visible as concrete public products with review criteria, common mistakes, and a three-week timeline.",
    href: "/deliverables",
    cta: "Review deliverables",
  },
  {
    title: "Instructor guide",
    summary:
      "Use the two-session facilitation plan, watch-fors, prompts, and materials checklist to run the workshop without re-deriving the structure.",
    href: "/instructor-guide",
    cta: "Open instructor guide",
  },
];

export const webPresenceSystemSteps = [
  {
    title: "Need",
    summary: "Figure out the real problem the page is solving before you worry about making it look cool.",
    tag: "1",
  },
  {
    title: "Signal",
    summary: "Decide what you want people to get right away and what overall vibe should shape that first impression.",
    tag: "2",
  },
  {
    title: "Style",
    summary: "Choose a look that supports the same message through layout, hierarchy, images, and pacing.",
    tag: "3",
  },
  {
    title: "Proof",
    summary: "Put real proof near the main claim so people trust the page fast.",
    tag: "4",
  },
  {
    title: "CTA",
    summary: "Tell the visitor what to do next in a voice that still matches the page.",
    tag: "5",
  },
  {
    title: "Publish and repeat",
    summary: "Put the page live, see what people actually notice, and use that to improve the next version.",
    tag: "6",
  },
];

export const webPresenceProducts: WebPresenceProduct[] = [
  {
    title: "Portfolio site",
    audience: "For your portfolio",
    summary:
      "A personal portfolio that quickly shows who you are, what you are good at, and why someone should trust you.",
    mustDo: [
      "Communicate one clear archetype on the first read.",
      "State a specific professional promise on the first screen.",
      "Show real proof near the promise instead of burying it.",
      "Give the visitor a clear next step.",
      "Feel intentionally made rather than template-shaped.",
    ],
    submit: [
      "A live URL.",
      "Completed workbook signal brief for the portfolio.",
      "The most important agent spec from the three-week build.",
      "A short reflection on how clearer briefs changed the output.",
    ],
    review: [
      "A classmate describes what they understand from a five-second look.",
      "That read is compared against the signal brief.",
      "The gap between intention and first-read outcome becomes the design problem.",
    ],
  },
  {
    title: "Museum site",
    audience: "For your museum site",
    summary:
      "A designed public-facing site about a subject you chose, with real curation instead of just a pile of information.",
    mustDo: [
      "Communicate the archetype of the subject on the first read.",
      "Show a site promise that explains why the subject deserves a serious public experience.",
      "Demonstrate real curatorial judgment rather than topic summary.",
      "Apply clear hierarchy, editorial care, and attention design.",
      "Read like a site that knows what it is and why it was made.",
    ],
    submit: [
      "A live URL.",
      "Completed workbook signal brief for the museum site.",
      "One agent spec and the output it produced.",
      "A short reflection on the design or attention principle that mattered most.",
    ],
    review: [
      "A classmate describes the subject, feeling, and editorial intelligence after a 30-second look.",
      "That description is compared against the signal brief.",
      "Students also explain what they told the agent and why.",
    ],
  },
];

export const webPresenceTimelineItems = [
  {
    label: "Week 1",
    title: "Lock signal and first read",
    summary:
      "Portfolio: apply the signal brief to page structure and headline. Museum site: align the homepage archetype, hero, and navigation to the subject's register.",
  },
  {
    label: "Week 2",
    title: "Strengthen proof and editorial care",
    summary:
      "Portfolio: add or strengthen proof blocks and tighten the CTA. Museum site: deepen curatorial quality, source credibility, and visible editorial judgment.",
  },
  {
    label: "Week 3",
    title: "Coherence pass and public readiness",
    summary:
      "Finish the final coherence pass, polish what matters, and confirm both products can travel publicly without reading like drafts.",
  },
];

export const strongWorkItems = [
  "The goal of the page is clear and easy to say out loud.",
  "The site is honest about what it is and who it is for.",
  "The proof is real and easy to spot.",
  "The build prompts get more specific over time, not more vague.",
  "The student can explain the choices instead of only showing the final screen.",
];

export const portfolioFailureModes = [
  "Mixing archetypes so the first read communicates multiple personalities at once.",
  "Hiding the best work or strongest proof far below the fold.",
  "Writing a headline that says nothing specific about the person or the promise.",
  "Using a generic CTA with no reason for the visitor to act now.",
];

export const museumFailureModes = [
  "Building a topic summary instead of a curated public experience.",
  "Using design to perform complexity without revealing the subject.",
  "Letting navigation mirror research notes rather than the visitor's reading path.",
  "Showing no visible editorial judgment, so the site could have been auto-generated.",
];

export const workbookPortfolioPrompts: WorkbookPrompt[] = [
  {
    title: "Audience",
    summary: "Name one real person in one real situation, not a giant category like ‘employers’ or ‘people in tech.’",
    example:
      "A startup founder hiring their second engineer who needs evidence of fast building and clear communication.",
  },
  {
    title: "Need",
    summary: "Say what problem that person has right now and why a weak first impression from your page would hurt.",
  },
  {
    title: "Promise",
    summary: "Write what your portfolio should make that person understand right away, in plain language.",
  },
  {
    title: "Archetype application",
    summary: "Translate the archetype into headline tone, imagery, proof style, and CTA behavior.",
  },
  {
    title: "Agent spec note",
    summary: "Write the page brief the way you would actually send it to an AI agent building or revising the page.",
  },
];

export const workbookMuseumPrompts: WorkbookPrompt[] = [
  {
    title: "Subject",
    summary: "Describe the museum topic in one sentence so the site starts from something clear and specific.",
  },
  {
    title: "Ideal visitor",
    summary: "Say who the site is for and what they probably already know before they get there.",
  },
  {
    title: "First 10 seconds",
    summary: "Describe what the visitor should understand or feel in the first few seconds.",
  },
  {
    title: "Subject archetype",
    summary: "Choose the archetype that fits the subject's register rather than the student's personal preference.",
  },
  {
    title: "Navigation and curation spec",
    summary: "Translate the archetype into headline register, visual approach, navigation logic, and proof of curation.",
  },
];

export const workbookPairReviewPrompts = [
  "What kind of person do you expect to meet from this portfolio brief?",
  "Does the vibe match the promise, or do those feel disconnected?",
  "What kind of subject do you expect this museum site to be about?",
  "Does the chosen vibe fit the subject, or does it just feel like personal taste?",
  "What one thing would make the build prompt clearer?",
];

export const workbookPrinciples = [
  {
    title: "The first read happens before anyone reads a word",
    summary: "Visitors classify the page from the visual feel before they process the headline, so the archetype has to survive the first glance.",
  },
  {
    title: "Hierarchy is trust",
    summary: "A clear hierarchy shows that someone made real decisions about what matters — and that transfers trust to the work itself.",
  },
  {
    title: "Proof must stay close to the promise",
    summary: "If your evidence is several scrolls away from your claim, the visitor leaves before the page becomes believable.",
  },
];

export const portfolioAuditItems = [
  "Hero image or top visual",
  "Headline",
  "Supporting copy in the first two or three sentences",
  "First proof element visible without scrolling",
  "Call to action",
  "Overall first-read feeling",
];

export const museumAuditItems = [
  "Homepage visual or hero",
  "Site title and headline",
  "Navigation labels and structure",
  "First content section below the fold",
  "How curated the subject feels versus merely informational",
  "Visible proof of research or editorial judgment",
];

export const proofBlockFields = {
  portfolio: [
    "Block title naming what this proof demonstrates.",
    "The artifact itself: project, system, page, or piece of work.",
    "What changed because of it in plain language.",
    "A method note describing the judgment or process move that mattered.",
    "A caption tying the proof directly back to the promise.",
  ],
  museum: [
    "One artifact, page, or design decision that proves curatorial care.",
    "How source handling, citations, or editorial voice make the site trustworthy.",
    "One visual or layout choice that proves the design serves the subject.",
    "A caption connecting that curatorial quality back to the site promise.",
  ],
};

export const studioReviewCriteria = {
  both: [
    "Signal clarity: a classmate can name the archetype from a five-second look.",
    "Proof placement: real evidence appears before or near the main promise.",
    "Coherence: headline, image, layout, and CTA all belong to the same archetype.",
    "Spec quality: the student can explain what they asked the agent to build and why.",
  ],
  portfolio: [
    "Audience fit: the page reads like it was made for one specific person rather than everyone.",
    "Professional promise: the one-sentence promise can be stated clearly from memory.",
  ],
  museum: [
    "Curatorial judgment: the site shows editorial intelligence rather than information aggregation.",
    "Subject-archetype match: the design register fits the subject's own demands.",
    "Build quality: the site is attractive, clear, and deliberately using design and attention principles.",
  ],
};

export const workbookChecklist = [
  "Completed signal brief for the portfolio.",
  "Completed signal brief for the museum site.",
  "Page audit scores for both products.",
  "At least one proof block drafted for each product.",
  "A realistic three-week build plan.",
  "A clear idea of what to spec for agents this week.",
];

export const archetypeFamilies: ArchetypeFamily[] = [
  {
    title: "Yearning for Paradise",
    archetypesLabel: "Innocent · Explorer · Sage",
    summary:
      "These archetypes connect the visitor to something better through openness, clarity, discovery, or understanding rather than through drama.",
    archetypes: [
      {
        title: "Innocent",
        promise: "This will be clear, honest, and safe.",
        feel: "Clean, minimal, warm, optimistic, and low-noise.",
        gift: "Immediate trust because the page feels like it has nothing to hide.",
        trap: "Can read as naive or too lightweight for work that needs authority.",
        fits: "Accessibility-focused tools, early work, and educational pages where belonging matters most.",
      },
      {
        title: "Explorer",
        promise: "This will take you somewhere new.",
        feel: "Open, dynamic, movement-oriented, and beginning-focused.",
        gift: "Creates curiosity and makes the visitor want to follow.",
        trap: "Can feel restless if the page never lands anywhere concrete.",
        fits: "Discovery-driven work, research, and emerging areas.",
      },
      {
        title: "Sage",
        promise: "This will be accurate, grounded, and worth trusting.",
        feel: "Structured, measured, evidence-aware, and typographically controlled.",
        gift: "Deep trust because method is visible before the claim is fully stated.",
        trap: "Can feel cold or intimidating if there is no human warmth anywhere.",
        fits: "Research-heavy work, technical expertise, teaching systems, and consulting.",
      },
    ],
  },
  {
    title: "Leaving a Thumbprint on the World",
    archetypesLabel: "Hero · Outlaw · Magician",
    summary:
      "These archetypes connect the visitor to change, challenge, or transformation and usually work through stronger energy and assertion.",
    archetypes: [
      {
        title: "Hero",
        promise: "This will show you what is possible with effort and skill.",
        feel: "Forward-moving, decisive, high-contrast, and goal-oriented.",
        gift: "Inspires the visitor to believe the work can deliver under pressure.",
        trap: "Feels exhausting or self-congratulatory if proof cannot carry the energy.",
        fits: "Achievement-oriented portfolios, results-driven work, and competitive fields.",
      },
      {
        title: "Outlaw",
        promise: "This challenges what you assumed was fixed.",
        feel: "Rule-bending, surprising, high-contrast, and deliberately different.",
        gift: "Sharp differentiation that makes the page impossible to confuse with category defaults.",
        trap: "Alienates fast if the edge serves style rather than a real idea.",
        fits: "Critique, counterintuitive work, disruption, and anti-default arguments.",
      },
      {
        title: "Magician",
        promise: "This will change how you see something.",
        feel: "Transformation-oriented, system-aware, and built on before-and-after logic.",
        gift: "Creates fascination and a sense of crossing into a new understanding.",
        trap: "Turns vague or grandiose if the transformation claim has no visible evidence.",
        fits: "AI, creative process work, emerging technology, and transformation-heavy subjects.",
      },
    ],
  },
  {
    title: "No One Is an Island",
    archetypesLabel: "Regular Guy/Gal · Lover · Jester",
    summary:
      "These archetypes connect through belonging, taste, or pleasure and work through relatability more than authority.",
    archetypes: [
      {
        title: "Regular Guy/Gal",
        promise: "This is for someone like you.",
        feel: "Plainspoken, approachable, honest, and unpretentious.",
        gift: "Immediate belonging because nobody feels excluded from the page.",
        trap: "Disappears into the background if execution becomes generic.",
        fits: "Community-centered work, practical tools, and accessible services.",
      },
      {
        title: "Lover",
        promise: "This is for someone who cares deeply about quality.",
        feel: "Sensory, intimate, beautiful, and detail-rich.",
        gift: "Creates emotional resonance and visible care.",
        trap: "Feels indulgent or decorative if beauty is not carrying a real argument.",
        fits: "Craft, design, food, culture, and any domain where attention quality matters.",
      },
      {
        title: "Jester",
        promise: "This will be smart and more interesting than it first looks.",
        feel: "Playful, witty, and knowingly off-angle.",
        gift: "Gets past defenses quickly and can make intelligence feel accessible.",
        trap: "Undermines trust if the humor is louder than the idea.",
        fits: "Light satire, culture critique, and creative work where wit is real evidence.",
      },
    ],
  },
  {
    title: "Providing Structure to the World",
    archetypesLabel: "Caregiver · Creator · Ruler",
    summary:
      "These archetypes connect the visitor to care, craft, or order and work through reliability and competence.",
    archetypes: [
      {
        title: "Caregiver",
        promise: "This is here for you.",
        feel: "Warm, supportive, accessible, and visibly attentive.",
        gift: "Creates emotional safety and removes friction from trust.",
        trap: "Feels paternalistic or empty if warmth is not backed by real substance.",
        fits: "Education, mentorship, healthcare, support services, and relationship-led work.",
      },
      {
        title: "Creator",
        promise: "This is the result of genuine making.",
        feel: "Craft-visible, process-aware, and original in the details.",
        gift: "Shows integrity because the quality of making is visible.",
        trap: "Turns precious if craft starts serving itself instead of communication.",
        fits: "Design, engineering systems, original research, and maker-centered work.",
      },
      {
        title: "Ruler",
        promise: "This is the standard.",
        feel: "Controlled, ordered, premium, and structurally authoritative.",
        gift: "Delivers immediate credibility when the work actually warrants it.",
        trap: "Feels inaccessible or defensive if the authority is unearned.",
        fits: "Senior-level work, governance systems, executive contexts, and category-leading institutions.",
      },
    ],
  },
];

export const quickComparisonItems = [
  {
    title: "Trustworthy, grounded, methodical",
    summary: "Sage or Ruler are the first candidates when credibility and standards are the core argument.",
  },
  {
    title: "Warm, approachable, human",
    summary: "Caregiver, Regular Guy/Gal, or Innocent are better fits when belonging matters more than elite distance.",
  },
  {
    title: "Exciting, forward-moving, ambitious",
    summary: "Hero and Explorer fit work that needs motion, ambition, or discovery on the first read.",
  },
  {
    title: "Surprising, defiant, counterintuitive",
    summary: "Outlaw or Jester work when the page is meant to challenge category defaults rather than comfort them.",
  },
  {
    title: "Beautiful, specific, craft-forward",
    summary: "Lover or Creator fit when visible attention quality is part of the proof.",
  },
  {
    title: "Transformative, visionary, system-aware",
    summary: "Magician fits when the argument is really about changing the visitor's understanding.",
  },
];

export const instructorSessionOneItems = [
  {
    label: "8:30–8:38",
    title: "Frame the two finals",
    summary:
      "Open with the deliverable brief, put both products in front of students, and make the connection to future agent specs explicit early.",
  },
  {
    label: "8:38–8:55",
    title: "Archetype exploration",
    summary:
      "Students read the reference sheet, cross out what feels wrong, and defend their eliminations before they drift into personality-test talk.",
  },
  {
    label: "8:55–9:15",
    title: "Portfolio signal brief",
    summary:
      "Push students away from generic audiences, test the one-sentence promise, and translate archetype language into agent-spec language.",
  },
  {
    label: "9:15–9:35",
    title: "Museum site signal brief",
    summary:
      "Reframe archetype as the subject's register, not the student's personality, then make the site promise and spec concrete.",
  },
  {
    label: "9:35–9:48",
    title: "Pair review and share out",
    summary:
      "Students read each other's briefs aloud, test whether the expected page matches the brief, and surface interesting tensions for the room.",
  },
  {
    label: "9:48–9:50",
    title: "Wrap",
    summary:
      "Assign the live site audit for Session 2 and make the gap between brief and page the next design problem.",
  },
];

export const instructorSessionTwoItems = [
  {
    label: "8:30–8:40",
    title: "First-read principles",
    summary:
      "Refresh visual-field reading, hierarchy as trust, and proof placement quickly so students have a diagnostic lens before auditing.",
  },
  {
    label: "8:40–8:58",
    title: "Portfolio audit",
    summary:
      "Students audit the live portfolio against the brief, prioritize one high-leverage change, and write the corresponding agent prompt.",
  },
  {
    label: "8:58–9:16",
    title: "Museum site audit",
    summary:
      "Students test whether the site feels curated and subject-appropriate rather than merely attractive or informational.",
  },
  {
    label: "9:16–9:28",
    title: "Proof blocks",
    summary:
      "Students draft one proof block for each product and separate receipts from vague summaries or tool lists.",
  },
  {
    label: "9:28–9:40",
    title: "Three-week build plan",
    summary:
      "Students turn audit gaps into realistic weekly specs they can actually send to agents.",
  },
  {
    label: "9:40–9:50",
    title: "Whole-class review",
    summary:
      "One student shows the live site, someone else reads the page cold, then the room compares that read against the signal brief and writes the one-sentence fix.",
  },
];

export const instructorWatchFors = [
  "Students performing identity rather than deciding on a page signal they can actually defend.",
  "Students defaulting to the same archetype for both products without checking whether the subject demands a different register.",
  "Students writing vague agent specs, which usually means the underlying decision is still vague.",
  "Students over-investing in polish while the page still lacks a clear argument.",
  "Students treating the museum site as already finished because a site exists, even though the signal brief is still weak.",
];

export const instructorMaterials = [
  "Printed or shared digital workbooks.",
  "Printed archetype reference sheets or a clear screen version.",
  "The final deliverable brief distributed by the end of Session 1.",
  "Live URLs for both student sites ready for Session 2.",
];

export const instructorPrompts = [
  "What did you cross out first and why?",
  "Does the subject's register actually match how you want to present yourself?",
  "If you sent this spec to your agent right now, what would it build?",
  "What does this site have that Wikipedia does not?",
  "If this is the gap, what is the one-sentence fix you need to brief?",
];

export const degreeConnection =
  "This unit goes beyond portfolio advice. Learning to read yourself and a subject clearly, writing specs precise enough for a collaborator or AI tool to follow, and building toward visible proof are core habits the degree is trying to form — not just skills for one class.";