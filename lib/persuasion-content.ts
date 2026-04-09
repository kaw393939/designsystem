/* ─────────────────────────────────────────────────────────────
   Cialdini × Archetypes — persuasion-method content
   ───────────────────────────────────────────────────────────── */

export type PersuasionMethod = {
  slug: string;
  name: string;
  tagline: string;
  imagePath: string;
  /** One-line definition accessible to CS students */
  definition: string;
  /** Why it works — the psychology in plain language */
  whyItWorks: string;
  /** Which archetypes lean hardest on this principle */
  strongArchetypes: { name: string; slug: string; reason: string }[];
  /** A concrete hero-section example using this method */
  heroExample: {
    archetype: string;
    headline: string;
    deck: string;
    ctaLabel: string;
    ctaSubtext: string;
    visualDirection: string;
  };
  /** Code-level guidance for building the hero section */
  implementationNotes: string[];
  /** Common mistake when applying this method */
  commonMistake: string;
};

export const persuasionMethods: PersuasionMethod[] = [
  /* ── 1. Reciprocity ───────────────────────────────── */
  {
    slug: "reciprocity",
    name: "Reciprocity",
    tagline: "Give first. The return happens on its own.",
    imagePath: "/archetype-atlas/persuasion/reciprocity.png",
    definition:
      "When someone gives us something of value — a free tool, insider knowledge, a head start — we feel a genuine pull to give something back. Reciprocity is the engine behind free trials, open-source contributions, and every \"download our free guide\" CTA you have ever clicked.",
    whyItWorks:
      "Humans are wired for social exchange. Receiving a gift — even an unsolicited one — activates an internal ledger. The bigger or more unexpected the gift, the stronger the felt obligation. In web design, the \"gift\" is often utility: a free checklist, an interactive tool, a code snippet that actually works. When the visitor gets value before being asked for anything, the CTA feels like a natural next step instead of a sales pitch.",
    strongArchetypes: [
      {
        name: "Caregiver",
        slug: "caregiver",
        reason:
          "The Caregiver leads with generosity. Free resources, nurturing onboarding, and visible concern for the visitor's wellbeing create felt reciprocity before any ask.",
      },
      {
        name: "Magician",
        slug: "magician",
        reason:
          "The Magician gives a taste of transformation — a before/after preview, a free demo that shows real results — making the visitor feel they already received something valuable.",
      },
      {
        name: "Creator",
        slug: "creator",
        reason:
          "The Creator shares process, sketches, and knowledge openly. Showing the work behind the work is a gift of transparency that builds trust.",
      },
    ],
    heroExample: {
      archetype: "Caregiver",
      headline: "Your first design system audit — on us.",
      deck: "We built a free 12-point checklist that catches the issues most teams miss. No email required. Just open it and start.",
      ctaLabel: "Open the free checklist",
      ctaSubtext: "No signup. No catch. Just help.",
      visualDirection:
        "Warm, inviting hero with a hand extending a wrapped resource. Gold and navy palette. The visual should feel like receiving a gift from a trusted mentor.",
    },
    implementationNotes: [
      "Lead with the gift, not the ask. The CTA should feel like accepting help, not submitting to a funnel.",
      "Use warm, trust-building colors (golds, soft navy) to reinforce generosity.",
      "Place the free resource above the fold — don't hide it behind a scroll.",
      "The subtext under the CTA should explicitly remove friction: 'No signup required.'",
    ],
    commonMistake:
      "Gating the 'free' resource behind an email form. If the gift has strings attached, reciprocity collapses into a transaction and trust drops.",
  },

  /* ── 2. Commitment & Consistency ───────────────── */
  {
    slug: "commitment",
    name: "Commitment & Consistency",
    tagline: "Small yeses build big ones.",
    imagePath: "/archetype-atlas/persuasion/commitment.png",
    definition:
      "Once someone takes a small action — a click, a quiz answer, a free-tier signup — they feel internal pressure to stay consistent with that choice. Each micro-commitment makes the next \"yes\" easier because people want to act in line with who they have already shown themselves to be.",
    whyItWorks:
      "Cognitive dissonance is uncomfortable. When someone publicly or even privately commits to a position, changing course feels like admitting a mistake. Designers leverage this with progressive disclosure: a personality quiz leads to a result page, which leads to a \"save your results\" CTA, which leads to account creation. Each step feels like a natural continuation, not a new decision.",
    strongArchetypes: [
      {
        name: "Hero",
        slug: "hero",
        reason:
          "The Hero archetype thrives on challenges and defined targets. Commitment escalation feels like leveling up — each step brings the visitor closer to a visible goal.",
      },
      {
        name: "Ruler",
        slug: "ruler",
        reason:
          "The Ruler values structure and consistency. Systems that reward disciplined engagement (streaks, milestones, status tiers) tap directly into the Ruler's psychology.",
      },
      {
        name: "Innocent",
        slug: "innocent",
        reason:
          "The Innocent responds to simple, safe first steps. Low-barrier entry points ('Try it free,' 'Take the quiz') feel approachable rather than pressuring.",
      },
    ],
    heroExample: {
      archetype: "Hero",
      headline: "Take the 60-second brand challenge.",
      deck: "Answer three questions. Get a personalized archetype match. See how your brand stacks up against the competition.",
      ctaLabel: "Start the challenge",
      ctaSubtext: "3 questions. 60 seconds. Real results.",
      visualDirection:
        "Bold, high-contrast hero with a progress indicator showing step 1 of 3. Teal and charcoal palette. The visual should feel like the starting line of a race.",
    },
    implementationNotes: [
      "Start with the smallest possible ask — a single click, a yes/no question.",
      "Show progress visually (step indicators, progress bars) so each commitment feels measurable.",
      "Use action-oriented language: 'Start,' 'Begin,' 'Take the first step.'",
      "Never let the user feel tricked — each escalation should deliver additional value.",
    ],
    commonMistake:
      "Jumping straight to a high-commitment ask (credit card, long form) without earning small commitments first. The escalation has to feel earned, not forced.",
  },

  /* ── 3. Social Proof ──────────────────────────────── */
  {
    slug: "social-proof",
    name: "Social Proof",
    tagline: "We follow the crowd — especially our crowd.",
    imagePath: "/archetype-atlas/persuasion/social-proof.png",
    definition:
      "When people are uncertain, they look at what others — especially similar others — are doing. Testimonials, user counts, star ratings, and 'popular choice' badges all work because they answer the unspoken question: 'Is this safe? Do people like me choose this?'",
    whyItWorks:
      "Social proof exploits informational social influence: when we are unsure, we assume the actions of others reflect correct behavior. The effect is strongest when the \"others\" resemble us (same industry, same role, same problem). A testimonial from a fellow CS student carries more weight than one from a Fortune 500 CEO because it answers the right identity question.",
    strongArchetypes: [
      {
        name: "Everyperson",
        slug: "everyman",
        reason:
          "The Everyperson's entire design language says 'people like you belong here.' Testimonials, community numbers, and peer stories are its lifeblood.",
      },
      {
        name: "Outlaw",
        slug: "outlaw",
        reason:
          "The Outlaw inverts social proof: 'The mainstream does this. We don't.' Showing what the crowd gets wrong is social proof by opposition.",
      },
      {
        name: "Sage",
        slug: "sage",
        reason:
          "The Sage uses citations, peer-reviewed evidence, and expert endorsements as social proof. The crowd that matters is the intellectual community.",
      },
    ],
    heroExample: {
      archetype: "Everyperson",
      headline: "12,847 developers shipped their first design system this year.",
      deck: "Join the community that makes design systems approachable. Real developers. Real projects. No gatekeeping.",
      ctaLabel: "See what they built",
      ctaSubtext: "Join 12,847 developers already inside.",
      visualDirection:
        "Warm, inclusive hero showing diverse faces or avatars in a grid pattern. Coral and cream palette. The visual should feel like walking into a room full of friendly peers.",
    },
    implementationNotes: [
      "Use specific numbers, not vague claims. '12,847 developers' beats 'thousands of developers.'",
      "Match the social proof to the visitor's identity — peer testimonials outperform celebrity endorsements for niche audiences.",
      "Place social proof near the CTA to reduce hesitation at the decision point.",
      "Combine counter-style numbers with faces/avatars for maximum trust signal.",
    ],
    commonMistake:
      "Using social proof from the wrong reference group. A testimonial from someone the visitor can't relate to actually increases doubt instead of reducing it.",
  },

  /* ── 4. Authority ─────────────────────────────────── */
  {
    slug: "authority",
    name: "Authority",
    tagline: "Trust the expert. Then become one.",
    imagePath: "/archetype-atlas/persuasion/authority.png",
    definition:
      "People defer to credible experts. Credentials, certifications, published research, institutional backing, and visible expertise all trigger authority-based compliance. When someone clearly knows what they are talking about, we are more willing to follow their recommendation.",
    whyItWorks:
      "Authority works because evaluating every decision from scratch is cognitively expensive. Deferring to experts is a mental shortcut: if someone has invested years in mastering a domain, their judgment is probably better than my uninformed guess. In design, authority surfaces through professional typography, institution-grade layouts, expert bios, credential badges, and content that demonstrates deep knowledge.",
    strongArchetypes: [
      {
        name: "Sage",
        slug: "sage",
        reason:
          "The Sage IS authority embodied. Every design choice — from serif typography to structured layouts — signals 'this was built by someone who has done the research.'",
      },
      {
        name: "Ruler",
        slug: "ruler",
        reason:
          "The Ruler projects institutional authority: established, governed, and unquestionable. Think banking interfaces, government portals, enterprise dashboards.",
      },
      {
        name: "Creator",
        slug: "creator",
        reason:
          "The Creator demonstrates authority through visible craft. Process documentation, polished portfolios, and meticulous attention to detail say 'this person has earned their expertise.'",
      },
    ],
    heroExample: {
      archetype: "Sage",
      headline: "Built on 40 years of brand psychology research.",
      deck: "Every recommendation in this system traces back to peer-reviewed evidence from Cialdini, Jung, and Maslow. This is not opinion — it is method.",
      ctaLabel: "Read the research",
      ctaSubtext: "47 cited sources. Zero guesswork.",
      visualDirection:
        "Commanding hero with a distinguished expert figure, credentials visible. Deep purple and silver palette. The visual should feel like opening a definitive reference book.",
    },
    implementationNotes: [
      "Show credentials early but naturally — expert bios, publication counts, years of experience.",
      "Use institutional-grade typography (serif display fonts, structured grids) to signal rigor.",
      "Cite sources. Specific citations ('Cialdini, 2001') carry more weight than vague claims ('studies show').",
      "Authority badges (logos, certifications, 'as featured in') work best in clusters of 3-5.",
    ],
    commonMistake:
      "Claiming authority without evidence. Saying 'we are experts' without showing the receipts makes the visitor more skeptical, not less.",
  },

  /* ── 5. Liking ────────────────────────────────────── */
  {
    slug: "liking",
    name: "Liking",
    tagline: "We say yes to people we like.",
    imagePath: "/archetype-atlas/persuasion/liking.png",
    definition:
      "We are more easily persuaded by people and brands we find attractive, similar to us, or associated with positive feelings. Liking is driven by physical attractiveness, similarity, compliments, familiarity, and positive association. A brand that feels like a friend gets more yeses than one that feels like a corporation.",
    whyItWorks:
      "Liking is a heuristic: when we like someone, we assume good intentions and lower our critical filters. Brands that invest in personality, humor, warmth, and visual appeal create what psychologists call the 'halo effect' — one positive attribute (they are funny / stylish / relatable) colors our perception of everything else (they must also be competent / trustworthy / worth paying for).",
    strongArchetypes: [
      {
        name: "Jester",
        slug: "jester",
        reason:
          "The Jester is pure liking fuel. Humor drops defenses, creates positive associations, and makes the brand feel like a friend rather than a vendor.",
      },
      {
        name: "Lover",
        slug: "lover",
        reason:
          "The Lover creates liking through beauty and sensory experience. Exquisite design, rich imagery, and attention to detail make the visitor feel cared for.",
      },
      {
        name: "Everyperson",
        slug: "everyman",
        reason:
          "The Everyperson generates liking through similarity. 'We are just like you' is the most powerful liking trigger when it feels authentic.",
      },
    ],
    heroExample: {
      archetype: "Jester",
      headline: "Design systems should not be boring. Ours is not.",
      deck: "We made a design system that is actually fun to use. Wild concept, we know. But life is too short for another gray component library.",
      ctaLabel: "See what fun looks like",
      ctaSubtext: "Warning: may cause involuntary smiling.",
      visualDirection:
        "Bright, playful hero with warm peach and orange tones. Friendly faces, informal composition. The visual should feel like an invitation to hang out, not a product demo.",
    },
    implementationNotes: [
      "Use conversational, first-person language — 'we' and 'you' instead of 'the platform' and 'users.'",
      "Show real people (or warm illustrations) rather than abstract graphics.",
      "Mirror the visitor's language and concerns — similarity creates liking.",
      "Humor works, but it has to be genuine. Forced jokes feel worse than no jokes.",
    ],
    commonMistake:
      "Trying to be likeable to everyone. A brand that tries to please all audiences ends up with no personality, which is the opposite of liking.",
  },

  /* ── 6. Scarcity ──────────────────────────────────── */
  {
    slug: "scarcity",
    name: "Scarcity",
    tagline: "Less available = more valuable.",
    imagePath: "/archetype-atlas/persuasion/scarcity.png",
    definition:
      "When something is rare, limited, or about to disappear, we want it more. Scarcity triggers loss aversion — the psychological pain of missing out — which is roughly twice as powerful as the pleasure of gaining something equivalent. Countdown timers, limited seats, and 'only 3 left' badges all weaponize this principle.",
    whyItWorks:
      "Scarcity works through two mechanisms: perceived value (rare = valuable) and fear of loss (FOMO). When availability shrinks, our brains shift from evaluative mode ('do I want this?') to competitive mode ('can I get this before it is gone?'). The key is authenticity — manufactured scarcity (fake countdown timers, artificial limits) erodes trust when discovered.",
    strongArchetypes: [
      {
        name: "Hero",
        slug: "hero",
        reason:
          "The Hero responds to urgent deadlines and limited windows of opportunity. 'Act now or miss the chance' aligns perfectly with the Hero's action-oriented psychology.",
      },
      {
        name: "Explorer",
        slug: "explorer",
        reason:
          "The Explorer values exclusivity — early access, insider routes, paths less traveled. Limited availability signals a unique opportunity worth pursuing.",
      },
      {
        name: "Ruler",
        slug: "ruler",
        reason:
          "The Ruler is drawn to status-tier scarcity: exclusive memberships, VIP access, and premium offerings that not everyone can reach.",
      },
    ],
    heroExample: {
      archetype: "Hero",
      headline: "Early access closes in 48 hours.",
      deck: "The first 200 builders get free access to the full archetype toolkit. After that, the window closes and standard pricing kicks in.",
      ctaLabel: "Claim your spot",
      ctaSubtext: "147 of 200 spots claimed.",
      visualDirection:
        "Dramatic, high-contrast hero with a spotlight on a single valuable object. Deep red and black palette. Countdown timer element adds urgency. The visual should feel like the last chance to act.",
    },
    implementationNotes: [
      "Only use scarcity when the limitation is real. Fake urgency destroys trust permanently.",
      "Combine scarcity with specificity: '147 of 200 spots' beats 'limited availability.'",
      "Use warm urgency, not panic. The tone should be 'don't miss this' not 'BUY NOW OR ELSE.'",
      "Countdown timers work when they count down to something real (event start, enrollment close).",
    ],
    commonMistake:
      "Fake scarcity. If the 'limited time offer' resets every week, visitors learn to ignore it — and worse, they stop trusting everything else on the site.",
  },
];

/* ── Archetype × Persuasion mapping table ──────────── */
export type ArchetypePersuasionMapping = {
  archetype: string;
  slug: string;
  primaryMethod: string;
  secondaryMethod: string;
  reasoning: string;
};

export const archetypePersuasionMap: ArchetypePersuasionMapping[] = [
  {
    archetype: "Innocent",
    slug: "innocent",
    primaryMethod: "Liking",
    secondaryMethod: "Commitment & Consistency",
    reasoning:
      "The Innocent wins through warmth and approachability (liking), then builds trust through simple, predictable steps (consistency).",
  },
  {
    archetype: "Explorer",
    slug: "explorer",
    primaryMethod: "Scarcity",
    secondaryMethod: "Commitment & Consistency",
    reasoning:
      "The Explorer craves exclusive paths and early access (scarcity), then stays engaged through progressive discovery (commitment).",
  },
  {
    archetype: "Sage",
    slug: "sage",
    primaryMethod: "Authority",
    secondaryMethod: "Social Proof",
    reasoning:
      "The Sage IS authority — credentials, citations, and method are its core signals — reinforced by intellectual community endorsement (social proof).",
  },
  {
    archetype: "Hero",
    slug: "hero",
    primaryMethod: "Commitment & Consistency",
    secondaryMethod: "Scarcity",
    reasoning:
      "The Hero responds to escalating challenges and defined targets (commitment), amplified by time-limited windows that demand action (scarcity).",
  },
  {
    archetype: "Outlaw",
    slug: "outlaw",
    primaryMethod: "Social Proof",
    secondaryMethod: "Authority",
    reasoning:
      "The Outlaw inverts social proof — rejecting the mainstream IS the proof — backed by earned authority through visible acts of refusal.",
  },
  {
    archetype: "Magician",
    slug: "magician",
    primaryMethod: "Reciprocity",
    secondaryMethod: "Social Proof",
    reasoning:
      "The Magician gives a taste of transformation for free (reciprocity), then lets before/after evidence carry the argument (social proof).",
  },
  {
    archetype: "Everyperson",
    slug: "everyman",
    primaryMethod: "Social Proof",
    secondaryMethod: "Liking",
    reasoning:
      "The Everyperson's entire signal is 'people like you succeed here' (social proof) combined with approachable warmth (liking).",
  },
  {
    archetype: "Lover",
    slug: "lover",
    primaryMethod: "Liking",
    secondaryMethod: "Reciprocity",
    reasoning:
      "The Lover creates desire through beauty and sensory experience (liking), then deepens connection by giving attention as a gift (reciprocity).",
  },
  {
    archetype: "Jester",
    slug: "jester",
    primaryMethod: "Liking",
    secondaryMethod: "Reciprocity",
    reasoning:
      "The Jester disarms through humor (liking), then surprises with unexpected value that feels like a gift (reciprocity).",
  },
  {
    archetype: "Caregiver",
    slug: "caregiver",
    primaryMethod: "Reciprocity",
    secondaryMethod: "Liking",
    reasoning:
      "The Caregiver leads with genuine help and free resources (reciprocity), building deep warmth and affinity (liking) in the process.",
  },
  {
    archetype: "Creator",
    slug: "creator",
    primaryMethod: "Authority",
    secondaryMethod: "Reciprocity",
    reasoning:
      "The Creator demonstrates authority through visible craft and process, then shares knowledge openly as a gift (reciprocity).",
  },
  {
    archetype: "Ruler",
    slug: "ruler",
    primaryMethod: "Authority",
    secondaryMethod: "Scarcity",
    reasoning:
      "The Ruler projects institutional authority through quality standards and governance, amplified by exclusive access tiers (scarcity).",
  },
];
