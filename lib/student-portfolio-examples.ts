export type StudentPortfolioPreview = {
  slug: string;
  href: string;
  name: string;
  role: string;
  summary: string;
  audience: string;
  signal: string;
  styleNote: string;
  imagePath: string;
  imageAlt: string;
};

export type StudentPortfolioMetric = {
  value: string;
  label: string;
};

export type StudentPortfolioPrinciple = {
  title: string;
  summary: string;
};

export type StudentPortfolioProject = {
  title: string;
  label: string;
  summary: string;
  outcome: string;
  proof: string;
  imagePath: string;
  imageAlt: string;
};

export type StudentPortfolioQuote = {
  quote: string;
  attribution: string;
  role: string;
};

export type StudentPortfolioPageData = StudentPortfolioPreview & {
  location: string;
  availability: string;
  headline: string;
  intro: string;
  email: string;
  metrics: readonly StudentPortfolioMetric[];
  principles: readonly StudentPortfolioPrinciple[];
  projects: readonly StudentPortfolioProject[];
  quote: StudentPortfolioQuote;
};

export const noorValdezPortfolio: StudentPortfolioPageData = {
  slug: "noor-valdez",
  href: "/examples/student-exemplars/noor-valdez",
  name: "Noor Valdez",
  role: "Exhibition and editorial design student",
  summary:
    "A warm, story-led portfolio for a student who turns archives, interviews, and community research into inviting public-facing pages.",
  audience: "For museum program leads and exhibition studios hiring an emerging designer",
  signal: "Caregiver x Sage",
  styleNote: "Warm editorial collage with paper textures, annotations, and soft museum cues.",
  imagePath: "/student-portfolios/noor/noor-hero-collage.svg",
  imageAlt:
    "Warm editorial collage showing Noor's portfolio mood board with portrait silhouette, pinned notes, and exhibition mockups.",
  location: "Providence, RI",
  availability: "Open to summer internships and museum-design collaborations",
  headline:
    "I turn archives, field notes, and neighborhood stories into exhibition pages people can enter fast.",
  intro:
    "I am a student designer who likes research, labels, and the first screen of a page to feel human before it feels academic. Most of my projects start with interviews, a small stack of primary sources, and the question, 'What would help someone stay curious instead of bouncing?'",
  email: "mailto:noor@example.com",
  metrics: [
    {
      value: "3",
      label: "campus and community exhibitions shaped into public-facing microsites",
    },
    {
      value: "24",
      label: "interviews translated into captions, labels, and onboarding copy",
    },
    {
      value: "92%",
      label: "of critique readers named the intended audience after a first-screen scan",
    },
  ],
  principles: [
    {
      title: "Start with one arrival moment",
      summary:
        "I write for the person arriving cold, not the professor or curator who already knows the whole backstory.",
    },
    {
      title: "Make proof feel human first",
      summary:
        "Receipts matter, but they land better when the page first makes the visitor feel oriented and welcome.",
    },
    {
      title: "Keep the tone across every asset",
      summary:
        "If the poster sounds warm and the page sounds institutional, the story breaks. I design the set together.",
    },
  ],
  projects: [
    {
      title: "Harbor Memory Atlas",
      label: "Archive-led museum microsite",
      summary:
        "A student-built exhibit site that turned oral histories, maps, and dockworker photographs into a guided first-read story for families visiting a local maritime archive.",
      outcome: "Visitors reached the audio-story section 37% faster after the homepage rewrite and layout simplification.",
      proof: "Included interview clips, object captions, a one-screen exhibit map, and a take-home zine teaser.",
      imagePath: "/student-portfolios/noor/noor-case-study-atlas.svg",
      imageAlt:
        "Case study board for Harbor Memory Atlas with annotated website panels, archive imagery, and exhibit story notes.",
    },
    {
      title: "Saturday Archive Club",
      label: "Community workshop campaign",
      summary:
        "A flexible identity and landing page for a student-run archive workshop series that had to feel welcoming to first-time visitors, not just history students.",
      outcome: "Sign-ups filled in 48 hours once the page shifted from event logistics to 'what your Saturday will feel like.'",
      proof: "Used poster sets, registration copy, facilitator notes, and participant quotes as one joined system.",
      imagePath: "/student-portfolios/noor/noor-case-study-studio.svg",
      imageAlt:
        "Workshop campaign board for Saturday Archive Club with poster fragments, registration screens, and handwritten notes.",
    },
  ],
  quote: {
    quote:
      "Noor's strongest move was not making the archive simpler. It was making the invitation into the archive easier to trust.",
    attribution: "Mina Ortega",
    role: "Museum studies instructor",
  },
};

export const julesMorrowPortfolio: StudentPortfolioPageData = {
  slug: "jules-morrow",
  href: "/examples/student-exemplars/jules-morrow",
  name: "Jules Morrow",
  role: "Product systems and front-end design student",
  summary:
    "A sharper, high-contrast portfolio for a student who designs interface systems, prototypes them in code, and proves they survive messy campus tools.",
  audience: "For product design leads hiring an emerging systems-minded designer-builder",
  signal: "Hero x Sage",
  styleNote: "High-contrast systems dashboard with acid accents, status rails, and coded visual rhythm.",
  imagePath: "/student-portfolios/jules/jules-hero-grid.svg",
  imageAlt:
    "Dark systems-portfolio board with neon grid, dashboard panels, and interface fragments for Jules's portfolio.",
  location: "Boston, MA",
  availability: "Seeking product design internships with systems and front-end depth",
  headline:
    "I build calm systems for messy student tools, then document them well enough that a team can keep shipping.",
  intro:
    "I am a design student who likes the part after the concept sprint: the naming, component logic, empty states, and interaction rules that make a product hold together. My best work usually sits between interface design, prototyping, and testing with people who are already under time pressure.",
  email: "mailto:jules@example.com",
  metrics: [
    {
      value: "4",
      label: "campus tools redesigned from ad hoc UI into reusable systems",
    },
    {
      value: "31%",
      label: "reduction in task time across tested scheduling and intake flows",
    },
    {
      value: "118",
      label: "documented components and states across coded prototypes",
    },
  ],
  principles: [
    {
      title: "Find the repeated decision",
      summary:
        "I look for the rule the interface keeps forcing people to relearn, then turn that into a reusable component or status pattern.",
    },
    {
      title: "Prototype the ugly states early",
      summary:
        "The edge cases tell me whether the system is real. I test wait states, blank states, and errors before polishing hero screens.",
    },
    {
      title: "Ship the explanation with the UI",
      summary:
        "I like design systems that explain themselves. The notes, names, and examples matter as much as the component drawings.",
    },
  ],
  projects: [
    {
      title: "Studio Queue",
      label: "Crit sign-up and critique dashboard",
      summary:
        "A critique scheduling tool for a design department that replaced shared spreadsheets with a calmer queue, clearer status rules, and mobile-ready sign-up patterns.",
      outcome: "Students completed sign-up with half the previous navigation steps after the queue logic was simplified and visibly staged.",
      proof: "Included coded component states, instructor overrides, accessibility checks, and a release note set for departmental handoff.",
      imagePath: "/student-portfolios/jules/jules-case-study-kernel.svg",
      imageAlt:
        "Systems case study board for Studio Queue with queue states, components, and annotated dashboard panels.",
    },
    {
      title: "Clinic Forms",
      label: "Intake flow for a campus support service",
      summary:
        "A redesign of a student-support intake flow where the main problem was not visual polish but fear, ambiguity, and repeated form abandonment.",
      outcome: "Testing participants finished the intake path more consistently once the form split into calmer steps with visible progress and trust cues.",
      proof: "Combined service-map diagrams, field-language revisions, component rules, and a lightweight coded prototype.",
      imagePath: "/student-portfolios/jules/jules-case-study-clinic.svg",
      imageAlt:
        "Service-design systems board for Clinic Forms with intake steps, status bars, and prototype fragments.",
    },
  ],
  quote: {
    quote:
      "Jules does not stop at the clean frame in Figma. The work gets stronger when it reaches naming, states, and release notes.",
    attribution: "Lena Park",
    role: "Product design studio faculty",
  },
};

export const niaOkaforPortfolio: StudentPortfolioPageData = {
  slug: "nia-okafor",
  href: "/examples/student-exemplars/nia-okafor",
  name: "Nia Okafor",
  role: "Communication design and campaign systems student",
  summary:
    "A bold, poster-forward portfolio for a student who turns health campaigns, transit stories, and civic messages into visual systems people trust on first contact.",
  audience: "For agency creative leads and nonprofit teams hiring an emerging campaign designer",
  signal: "Creator x Outlaw",
  styleNote: "Bold poster aesthetic with deep navy, warm amber, and cinematic portrait photography.",
  imagePath: "/student-portfolios/nia/nia-hero-stage.png",
  imageAlt:
    "Studio wall with bold TRUST and ATTENTION poster studies, portrait photography, and campaign sketches behind Nia.",
  location: "Philadelphia, PA",
  availability: "Open to campaign design internships and civic communication projects",
  headline:
    "I design campaigns that earn trust in one look, then hold up when people read closer.",
  intro:
    "I am a communication design student who likes the moment a poster, a landing page, and a social card all have to say the same thing without repeating themselves. Most of my projects start with a public audience that has every reason to scroll past, and a message that has to land before that happens.",
  email: "mailto:nia@example.com",
  metrics: [
    {
      value: "5",
      label: "campus and civic campaigns carried from concept through multi-channel delivery",
    },
    {
      value: "3×",
      label: "increase in hotline page engagement after the trust-first homepage redesign",
    },
    {
      value: "40+",
      label: "poster, card, and screen assets managed as one connected visual system",
    },
  ],
  principles: [
    {
      title: "Earn trust before asking for attention",
      summary:
        "I design the first frame as a trust signal, not a hook. If people believe the message, they keep reading on their own.",
    },
    {
      title: "One campaign, one voice across every surface",
      summary:
        "Poster, page, card, and story have to sound like the same person. I design the system, not just the hero.",
    },
    {
      title: "Show real faces, not stock confidence",
      summary:
        "The campaigns I care about work because the people in them look like the people the campaign is for.",
    },
  ],
  projects: [
    {
      title: "Student Support Hotline",
      label: "Health communication campaign",
      summary:
        "A campus-wide campaign system for a student mental-health hotline that needed to feel approachable and trustworthy across posters, a landing page, and social cards — without sounding clinical or desperate.",
      outcome: "Hotline page visits tripled in the first week after the campaign shifted from crisis language to 'support is just a call away' framing.",
      proof: "Included poster series, landing page, social cards, phone-script tone guide, and a coordinator handoff kit as one joined system.",
      imagePath: "/student-portfolios/nia/nia-case-study-clinic.png",
      imageAlt:
        "Campaign board for Student Support Hotline showing poster fragments, landing page mockup, social cards, and photography direction.",
    },
    {
      title: "Night Transit Stories",
      label: "Civic storytelling campaign",
      summary:
        "A portrait-driven campaign and microsite for a city transit agency that wanted late-night riders to see themselves in the system instead of feeling surveilled by it.",
      outcome: "The pilot campaign was adopted by the transit authority's community-engagement office after student testing showed riders recognized themselves in the portraits.",
      proof: "Used cinematic night portraits, transit-card formats, bus-shelter poster specs, and a responsive story page as one campaign system.",
      imagePath: "/student-portfolios/nia/nia-case-study-transit.png",
      imageAlt:
        "Night Transit Stories campaign grid with cinematic portraits, bus-shelter poster mockups, and mobile story screens in warm amber light.",
    },
  ],
  quote: {
    quote:
      "Nia does not start with the visual. She starts with who needs to believe this, and then every surface answers that question.",
    attribution: "Marcus Healy",
    role: "Communication design studio faculty",
  },
};

export const studentPortfolioPreviews: readonly StudentPortfolioPreview[] = [
  noorValdezPortfolio,
  julesMorrowPortfolio,
  niaOkaforPortfolio,
];