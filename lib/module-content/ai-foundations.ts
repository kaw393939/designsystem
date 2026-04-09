/* ------------------------------------------------------------------ */
/*  AI Foundations — module data                                      */
/*  Era timeline, people profiles, institution profiles, concepts     */
/* ------------------------------------------------------------------ */

// ── Types ──────────────────────────────────────────────────────────

export type EraMilestone = {
  year: string;
  title: string;
  summary: string;
};

export type EraDefinition = {
  id: string;
  title: string;
  period: string;
  thesis: string;
  milestones: readonly EraMilestone[];
};

export type PersonProfile = {
  id: string;
  name: string;
  era: string;
  role: string;
  summary: string;
  portraitSrc: string;
  portraitAlt: string;
  url?: string;
};

export type InstitutionProfile = {
  id: string;
  name: string;
  era: string;
  role: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  url?: string;
};

export type ConceptDefinition = {
  id: string;
  term: string;
  definition: string;
  era: string;
};

// ── Era timeline ───────────────────────────────────────────────────

export const eras: readonly EraDefinition[] = [
  {
    id: "era-1",
    title: "Precursors",
    period: "1840s–1940s",
    thesis:
      "Logic becomes algebra, algebra becomes computation — the raw materials for AI are assembled before anyone names the field.",
    milestones: [
      {
        year: "1843",
        title: "Lovelace's Notes on the Analytical Engine",
        summary:
          "Ada Lovelace publishes the first discussion of what a general-purpose computing machine could do — and what it could not.",
      },
      {
        year: "1847",
        title: "Boole's Laws of Thought",
        summary:
          "George Boole turns reasoning into symbolic algebra — the logical foundation for every digital circuit that follows.",
      },
      {
        year: "1871",
        title: "Babbage's Analytical Engine plans",
        summary:
          "Charles Babbage designs a programmable mechanical computer. It is never built in his lifetime, but the blueprint matters.",
      },
      {
        year: "1936",
        title: "Turing's On Computable Numbers",
        summary:
          "Alan Turing formalizes what computation itself means — and proves some problems are undecidable.",
      },
      {
        year: "1948",
        title: "Shannon's Mathematical Theory of Communication",
        summary:
          "Claude Shannon invents information theory, giving the world a formal language for signals, noise, and communication.",
      },
    ],
  },
  {
    id: "era-2",
    title: "Field formation",
    period: "1950–1956",
    thesis:
      "Computation meets ambition — scattered threads of logic, engineering, and philosophy crystallize into a named research field.",
    milestones: [
      {
        year: "1950",
        title: "Turing's Computing Machinery and Intelligence",
        summary:
          "Turing asks 'Can machines think?' and proposes the imitation game — the question that launches the field.",
      },
      {
        year: "1950",
        title: "Shannon's Theseus maze-solving mouse",
        summary:
          "Shannon builds a physical machine that learns to navigate a maze — one of the first demonstrations of machine learning.",
      },
      {
        year: "1956",
        title: "Dartmouth Summer Research Project",
        summary:
          "McCarthy, Minsky, Rochester, and Shannon propose a summer workshop. The term 'artificial intelligence' enters the vocabulary.",
      },
    ],
  },
  {
    id: "era-3",
    title: "Symbolic optimism",
    period: "1956–1974",
    thesis:
      "If intelligence is symbol manipulation, then programs that manipulate symbols should be intelligent. The first generation bets everything on this idea.",
    milestones: [
      {
        year: "1956",
        title: "Logic Theorist",
        summary:
          "Newell and Simon build the first program that proves mathematical theorems — a machine that reasons.",
      },
      {
        year: "1958",
        title: "McCarthy creates LISP",
        summary:
          "The programming language that defines symbolic AI for decades. LISP makes it easy to manipulate symbols and build reasoning systems.",
      },
      {
        year: "1958",
        title: "Rosenblatt's Perceptron",
        summary:
          "The first trainable neural network — a machine that learns from examples instead of following rules.",
      },
      {
        year: "1966",
        title: "ELIZA",
        summary:
          "Weizenbaum's chatbot demonstrates that pattern matching can simulate conversation — and reveals how easily humans anthropomorphize machines.",
      },
      {
        year: "1969",
        title: "GPS (General Problem Solver)",
        summary:
          "Newell and Simon attempt a general-purpose reasoning program. It works on toy problems but cannot scale.",
      },
    ],
  },
  {
    id: "era-4",
    title: "Expert systems and the first winter",
    period: "1974–1993",
    thesis:
      "Smart programs without learning hit a wall. Expert systems make money, then fail to adapt. Funding dries up.",
    milestones: [
      {
        year: "1969",
        title: "Perceptrons critique",
        summary:
          "Minsky and Papert prove limits of single-layer networks. Neural network research goes dark for over a decade.",
      },
      {
        year: "1973",
        title: "The Lighthill Report",
        summary:
          "The UK government declares AI has failed to deliver. Funding collapses across Britain and doubt spreads worldwide.",
      },
      {
        year: "1976",
        title: "MYCIN expert system",
        summary:
          "A rule-based system diagnoses blood infections better than many doctors — but cannot explain its own reasoning easily.",
      },
      {
        year: "1980s",
        title: "Expert systems boom",
        summary:
          "Companies invest billions in rule-based AI. When the rules cannot handle messy real-world data, the market crashes.",
      },
      {
        year: "1987",
        title: "Second AI winter begins",
        summary:
          "The expert systems market collapses. AI becomes a term researchers avoid.",
      },
    ],
  },
  {
    id: "era-5",
    title: "Statistical revival",
    period: "1993–2012",
    thesis:
      "Instead of writing rules, let the machine learn patterns from data. Statistics and probability replace hand-coded logic.",
    milestones: [
      {
        year: "1986",
        title: "Backpropagation paper",
        summary:
          "Rumelhart, Hinton, and Williams publish the modern training algorithm for neural networks — the key that unlocks deep learning later.",
      },
      {
        year: "1997",
        title: "Deep Blue defeats Kasparov",
        summary:
          "IBM's chess computer wins. It is brute-force search, not learning — but it changes public perception of machine intelligence.",
      },
      {
        year: "2006",
        title: "Hinton's deep belief networks",
        summary:
          "Hinton shows that deep neural networks can be trained layer by layer. The deep learning revival begins.",
      },
      {
        year: "2011",
        title: "Watson wins Jeopardy!",
        summary:
          "IBM's question-answering system beats human champions using statistical NLP — a bridge between classical AI and the deep learning era.",
      },
    ],
  },
  {
    id: "era-6",
    title: "Deep learning breakthroughs",
    period: "2012–2020",
    thesis:
      "Depth plus data plus GPUs beat everything. Neural networks go from niche to dominant in five years.",
    milestones: [
      {
        year: "2012",
        title: "ImageNet moment — AlexNet",
        summary:
          "Krizhevsky, Sutskever, and Hinton crush the image recognition benchmark using a deep convolutional network. The revolution begins.",
      },
      {
        year: "2014",
        title: "GANs (Generative Adversarial Networks)",
        summary:
          "Goodfellow introduces networks that generate realistic images by competing against each other. Machines begin creating, not just classifying.",
      },
      {
        year: "2016",
        title: "AlphaGo defeats Lee Sedol",
        summary:
          "DeepMind's system beats a world Go champion using deep reinforcement learning. Go was thought to be decades away from machine mastery.",
      },
      {
        year: "2017",
        title: "Attention Is All You Need",
        summary:
          "Vaswani et al. introduce the Transformer architecture. Self-attention replaces recurrence and enables the foundation model era.",
      },
      {
        year: "2018",
        title: "BERT and GPT-1",
        summary:
          "Pre-trained language models show that one architecture can learn from massive text and then be fine-tuned for many tasks.",
      },
    ],
  },
  {
    id: "era-7",
    title: "Foundation models go public",
    period: "2020–present",
    thesis:
      "AI becomes something everyone uses, not just researchers. That changes everything — the tools, the risks, and who gets to decide.",
    milestones: [
      {
        year: "2020",
        title: "GPT-3 reveals emergent capabilities",
        summary:
          "OpenAI's 175-billion-parameter model shows abilities no one explicitly trained — few-shot learning from instructions alone.",
      },
      {
        year: "2021",
        title: "AlphaFold solves protein folding",
        summary:
          "DeepMind predicts the structure of almost every known protein. AI becomes a tool for scientific discovery, not just language.",
      },
      {
        year: "2022",
        title: "ChatGPT reaches 100 million users",
        summary:
          "The fastest-growing consumer application in history. AI goes from research demo to daily tool in weeks.",
      },
      {
        year: "2023",
        title: "Multimodal models arrive",
        summary:
          "GPT-4V, Gemini, and Claude see images, write code, and reason across domains. The models become general-purpose assistants.",
      },
      {
        year: "2024",
        title: "Hinton and Hopfield win the Nobel Prize in Physics",
        summary:
          "The Nobel committee recognizes foundational work in neural networks — validation that deep learning is fundamental science.",
      },
      {
        year: "2024–25",
        title: "Governance and safety debates intensify",
        summary:
          "Executive orders, EU AI Act, and frontier-model safety commitments. The field argues about what responsible deployment means.",
      },
    ],
  },
] as const;

// ── People profiles ────────────────────────────────────────────────

const P = "/media/modules/portraits";

export const peopleProfiles: readonly PersonProfile[] = [
  // Era 1 — Precursors
  {
    id: "george-boole",
    name: "George Boole",
    era: "Precursors",
    role: "Mathematician who turned reasoning into algebra",
    summary:
      "Boole's 1854 'Laws of Thought' created Boolean algebra — the symbolic logic that became the foundation for every digital circuit and logic-based AI system.",
    portraitSrc: `${P}/george-boole.webp`,
    portraitAlt: "George Boole, mathematician and logician",
  },
  {
    id: "charles-babbage",
    name: "Charles Babbage",
    era: "Precursors",
    role: "Mechanical computation pioneer",
    summary:
      "Babbage designed the Analytical Engine — the first blueprint for a general-purpose programmable computer. It was never built in his lifetime, but the concept launched computing.",
    portraitSrc: `${P}/charles-babbage.webp`,
    portraitAlt: "Charles Babbage, mechanical computation pioneer",
  },
  {
    id: "ada-lovelace",
    name: "Ada Lovelace",
    era: "Precursors",
    role: "First person to describe general-purpose computing",
    summary:
      "Lovelace's 1843 notes on Babbage's engine include the first published algorithm and her famous caution that the machine 'has no pretensions to originate anything.'",
    portraitSrc: `${P}/ada-lovelace.webp`,
    portraitAlt: "Ada Lovelace, computing pioneer",
  },
  // Era 2 — Field formation
  {
    id: "alan-turing",
    name: "Alan Turing",
    era: "Field formation",
    role: "Computability theorist and wartime codebreaker",
    summary:
      "Turing formalized what computation means, broke the Enigma code, and asked whether machines could think — giving AI its foundational question.",
    portraitSrc: `${P}/alan-turing.webp`,
    portraitAlt: "Alan Turing, mathematician and computing pioneer",
  },
  {
    id: "claude-shannon",
    name: "Claude Shannon",
    era: "Field formation",
    role: "Father of information theory",
    summary:
      "Shannon linked Boolean logic to electrical circuits and created information theory — the formal language for communication, signals, and uncertainty that AI depends on.",
    portraitSrc: `${P}/claude-shannon.webp`,
    portraitAlt: "Claude Shannon, information theorist",
  },
  {
    id: "john-mccarthy",
    name: "John McCarthy",
    era: "Field formation",
    role: "Coined 'artificial intelligence' and created LISP",
    summary:
      "McCarthy named the field, organized the 1956 Dartmouth workshop, and built LISP — the language that defined symbolic AI for decades.",
    portraitSrc: `${P}/john-mccarthy.webp`,
    portraitAlt: "John McCarthy, AI pioneer",
  },
  // Era 3 — Symbolic optimism
  {
    id: "marvin-minsky",
    name: "Marvin Minsky",
    era: "Symbolic optimism",
    role: "Co-founder of MIT AI Lab",
    summary:
      "Minsky built the institutional home for AI research at MIT, shaped how a generation thought about intelligence, and co-authored the Perceptrons critique that redirected the field for 15 years.",
    portraitSrc: `${P}/marvin-minsky.webp`,
    portraitAlt: "Marvin Minsky, AI researcher",
  },
  {
    id: "allen-newell",
    name: "Allen Newell",
    era: "Symbolic optimism",
    role: "Co-creator of Logic Theorist and cognitive architectures",
    summary:
      "Newell (with Simon) built the first theorem-proving program and spent decades trying to unify AI under a single theory of cognition.",
    portraitSrc: `${P}/allen-newell.webp`,
    portraitAlt: "Allen Newell, cognitive scientist",
  },
  {
    id: "herbert-simon",
    name: "Herbert Simon",
    era: "Symbolic optimism",
    role: "Nobel laureate and co-creator of early AI programs",
    summary:
      "Simon (with Newell) proved that machines could reason by building Logic Theorist and GPS. He brought the cognitive-science claim that human thinking itself is information processing.",
    portraitSrc: `${P}/herbert-simon.webp`,
    portraitAlt: "Herbert Simon, cognitive scientist and Nobel laureate",
  },
  // Era 4 — Expert systems and the first winter
  {
    id: "edward-feigenbaum",
    name: "Edward Feigenbaum",
    era: "Expert systems",
    role: "Father of expert systems",
    summary:
      "Feigenbaum turned AI from general-purpose ambition into domain-specific industrial tools. Expert systems made money — until the rules could not handle messy real-world data.",
    portraitSrc: `${P}/edward-feigenbaum.webp`,
    portraitAlt: "Edward Feigenbaum, expert systems pioneer",
  },
  // Era 5 — Statistical revival
  {
    id: "frank-rosenblatt",
    name: "Frank Rosenblatt",
    era: "Statistical revival",
    role: "Inventor of the Perceptron",
    summary:
      "Rosenblatt built the first trainable neural network in 1958. His work was marginalized by the Minsky-Papert critique but vindicated when deep learning proved neural networks could outperform everything.",
    portraitSrc: `${P}/frank-rosenblatt.webp`,
    portraitAlt: "Frank Rosenblatt, neural network inventor",
  },
  // Era 6 — Deep learning breakthroughs
  {
    id: "geoffrey-hinton",
    name: "Geoffrey Hinton",
    era: "Deep learning",
    role: "Pioneer of deep learning and 2024 Nobel laureate",
    summary:
      "Hinton championed neural networks through decades of skepticism, co-invented backpropagation, and proved that depth plus data beat everything. His 2024 Nobel Prize validated deep learning as fundamental science.",
    portraitSrc: `${P}/geoffrey-hinton.webp`,
    portraitAlt: "Geoffrey Hinton, deep learning pioneer",
  },
  {
    id: "yann-lecun",
    name: "Yann LeCun",
    era: "Deep learning",
    role: "Inventor of convolutional neural networks",
    summary:
      "LeCun designed ConvNets for image recognition, proving that deep architectures could learn useful patterns from raw data. His work made the ImageNet moment possible.",
    portraitSrc: `${P}/yann-lecun.webp`,
    portraitAlt: "Yann LeCun, deep learning researcher",
  },
  {
    id: "yoshua-bengio",
    name: "Yoshua Bengio",
    era: "Deep learning",
    role: "Deep learning theorist and attention mechanism pioneer",
    summary:
      "Bengio's work on language models and attention mechanisms laid the groundwork for the Transformer architecture. He also became one of the most prominent voices for AI safety regulation.",
    portraitSrc: `${P}/yoshua-bengio.webp`,
    portraitAlt: "Yoshua Bengio, deep learning researcher",
  },
  // Era 7 — Foundation models go public
  {
    id: "ilya-sutskever",
    name: "Ilya Sutskever",
    era: "Foundation models",
    role: "Research leader connecting deep learning to large-scale models",
    summary:
      "Sutskever bridges the deep learning revival and the scaling era. His work at OpenAI and later SSI shaped how frontier models are trained and aligned.",
    portraitSrc: `${P}/ilya-sutskever.webp`,
    portraitAlt: "Ilya Sutskever, AI researcher",
  },
  {
    id: "demis-hassabis",
    name: "Demis Hassabis",
    era: "Foundation models",
    role: "Leader of DeepMind and scientific AI applications",
    summary:
      "Hassabis keeps AI broader than chatbots by connecting it to AlphaFold, protein folding, and long-horizon scientific discovery through Google DeepMind.",
    portraitSrc: `${P}/demis-hassabis.webp`,
    portraitAlt: "Demis Hassabis, DeepMind leader",
  },
  {
    id: "andrej-karpathy",
    name: "Andrej Karpathy",
    era: "Foundation models",
    role: "Public technical educator and frontier researcher",
    summary:
      "Karpathy makes the modern AI stack legible to a broad audience while contributing to frontier research. He shows that the current era is about explaining AI, not just building it.",
    portraitSrc: `${P}/andrej-karpathy.webp`,
    portraitAlt: "Andrej Karpathy, AI educator and researcher",
  },
  {
    id: "sam-altman",
    name: "Sam Altman",
    era: "Foundation models",
    role: "Executive who deployed AI as consumer infrastructure",
    summary:
      "Altman led the transition from research demo to public product at OpenAI. His decisions made deployment a historical choice, not an automatic consequence of capability.",
    portraitSrc: `${P}/sam-altman.webp`,
    portraitAlt: "Sam Altman, OpenAI executive",
  },
  {
    id: "dario-amodei",
    name: "Dario Amodei",
    era: "Foundation models",
    role: "Safety-and-scaling leader at Anthropic",
    summary:
      "Amodei connects responsible scaling and constitutional AI with frontier-model institution building. Safety in his framing is part of how labs narrate themselves, not just an external critique.",
    portraitSrc: `${P}/dario-amodei.webp`,
    portraitAlt: "Dario Amodei, Anthropic leader",
  },
  {
    id: "eliezer-yudkowsky",
    name: "Eliezer Yudkowsky",
    era: "Foundation models",
    role: "Alignment researcher and existential-risk advocate",
    summary:
      "Yudkowsky shows that the AI safety conversation did not begin with ChatGPT. His alignment and instrumental-convergence arguments shaped safety vocabulary before large language models existed.",
    portraitSrc: `${P}/eliezer-yudkowsky.webp`,
    portraitAlt: "Eliezer Yudkowsky, alignment researcher",
  },
] as const;

// ── Institution profiles ───────────────────────────────────────────

const I = "/media/modules/portraits";

export const institutionProfiles: readonly InstitutionProfile[] = [
  {
    id: "bell-labs",
    name: "Bell Labs",
    era: "Field formation",
    role: "Information theory birthplace and computing research hub",
    summary:
      "Bell Labs gave the world information theory, the transistor, and early computing machines — the technical substrate on which AI was built.",
    imageSrc: `${I}/bell-labs.webp`,
    imageAlt: "Bell Labs Holmdel Complex",
  },
  {
    id: "mit-ai-lab",
    name: "MIT AI Laboratory",
    era: "Symbolic optimism",
    role: "Home of symbolic AI and hacker culture",
    summary:
      "The MIT AI Lab was the institutional home of Minsky, McCarthy, and a generation of researchers who believed intelligence could be programmed in symbolic logic.",
    imageSrc: `${I}/mit-csail.webp`,
    imageAlt: "MIT Computer Science and Artificial Intelligence Laboratory",
  },
  {
    id: "darpa",
    name: "DARPA",
    era: "Statistical revival",
    role: "Federal funder that kept AI alive through winters",
    summary:
      "DARPA funded AI research when no one else would — from speech recognition to autonomous vehicles — keeping the field alive through its winters.",
    imageSrc: `${I}/darpa-hq.webp`,
    imageAlt: "DARPA headquarters building",
  },
  {
    id: "openai",
    name: "OpenAI",
    era: "Foundation models",
    role: "Research-and-deployment institution behind the public AI turn",
    summary:
      "OpenAI turned frontier-model capability into mass public interface. ChatGPT made deployment itself a historical fact, not merely a technical consequence.",
    imageSrc: `${I}/anthropic-social.webp`,
    imageAlt: "OpenAI research institution",
  },
  {
    id: "google-deepmind",
    name: "Google DeepMind",
    era: "Foundation models",
    role: "Science, models, and responsibility at frontier scale",
    summary:
      "Google DeepMind keeps the story broader than chat by foregrounding AlphaFold, Gemini, and the Brain/DeepMind merger — connecting AI to scientific discovery.",
    imageSrc: `${I}/deepmind-social.webp`,
    imageAlt: "Google DeepMind",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    era: "Foundation models",
    role: "Safety-first frontier-model company",
    summary:
      "Anthropic shows that reliability, interpretability, and steerability can be part of a company's identity — not just external critique.",
    imageSrc: `${I}/anthropic-social.webp`,
    imageAlt: "Anthropic research institution",
  },
] as const;

// ── Concept definitions ────────────────────────────────────────────

export const concepts: readonly ConceptDefinition[] = [
  // Precursors
  {
    id: "boolean-algebra",
    term: "Boolean algebra",
    definition:
      "A system of logic using true/false values and operators (AND, OR, NOT). Every digital circuit and search query uses it.",
    era: "Precursors",
  },
  {
    id: "algorithm",
    term: "Algorithm",
    definition:
      "A step-by-step procedure for solving a problem. Lovelace described the first one for a computing machine.",
    era: "Precursors",
  },
  // Field formation
  {
    id: "turing-test",
    term: "Turing test",
    definition:
      "A test where a human judges whether they are talking to a person or a machine. It measures behavioral imitation, not understanding.",
    era: "Field formation",
  },
  {
    id: "information-theory",
    term: "Information theory",
    definition:
      "The mathematical study of how information is encoded, transmitted, and decoded. It gives us bits, entropy, and compression.",
    era: "Field formation",
  },
  // Symbolic optimism
  {
    id: "symbolic-ai",
    term: "Symbolic AI",
    definition:
      "An approach that represents knowledge as symbols and rules. Programs manipulate these symbols to reason — like a very precise recipe.",
    era: "Symbolic optimism",
  },
  {
    id: "expert-system",
    term: "Expert system",
    definition:
      "A program that captures human expertise as if/then rules. Useful in narrow domains but brittle when the world is messy.",
    era: "Expert systems",
  },
  // Statistical revival and deep learning
  {
    id: "neural-network",
    term: "Neural network",
    definition:
      "A computing system inspired by biological neurons. It learns patterns from data by adjusting connection weights during training.",
    era: "Statistical revival",
  },
  {
    id: "backpropagation",
    term: "Backpropagation",
    definition:
      "The training algorithm that tells each connection in a neural network how much to adjust. It works backwards from the output error.",
    era: "Statistical revival",
  },
  {
    id: "embedding",
    term: "Embedding",
    definition:
      "A list of numbers that represents the meaning of a word, sentence, or concept. Similar meanings get similar numbers.",
    era: "Deep learning",
  },
  {
    id: "latent-space",
    term: "Latent space",
    definition:
      "The learned map of meaning that a model builds during training. Every concept gets a location — proximity means similarity.",
    era: "Deep learning",
  },
  {
    id: "transformer",
    term: "Transformer",
    definition:
      "The architecture behind GPT, BERT, and every modern language model. It uses self-attention to process all tokens in parallel.",
    era: "Deep learning",
  },
  {
    id: "attention",
    term: "Attention mechanism",
    definition:
      "A way for models to focus on the most relevant parts of the input. 'Attention Is All You Need' made it the core of the Transformer.",
    era: "Deep learning",
  },
  // Foundation models
  {
    id: "foundation-model",
    term: "Foundation model",
    definition:
      "A large model trained on broad data that can be adapted to many tasks. GPT-4, Claude, and Gemini are examples.",
    era: "Foundation models",
  },
  {
    id: "few-shot-learning",
    term: "Few-shot learning",
    definition:
      "The ability of a model to perform a new task from just a few examples in the prompt — no retraining required.",
    era: "Foundation models",
  },
  {
    id: "rlhf",
    term: "RLHF (Reinforcement Learning from Human Feedback)",
    definition:
      "A training technique where human preferences guide model behavior. It is how chatbots learn to be helpful instead of just probable.",
    era: "Foundation models",
  },
] as const;

// ── Helper: group people by era cluster ────────────────────────────

export function getPeopleByEraCluster(cluster: string): readonly PersonProfile[] {
  return peopleProfiles.filter((p) => p.era === cluster);
}

// ── Reading list for Practice page ─────────────────────────────────

export type ReadingListEntry = {
  id: string;
  title: string;
  authors: string;
  year: string;
  summary: string;
  url: string;
  urlLabel: string;
};

export const readingList: readonly ReadingListEntry[] = [
  {
    id: "turing-1950",
    title: "Computing Machinery and Intelligence",
    authors: "Alan Turing",
    year: "1950",
    summary: "The paper that asked 'Can machines think?' and proposed the imitation game.",
    url: "https://doi.org/10.1093/mind/LIX.236.433",
    urlLabel: "Mind journal",
  },
  {
    id: "shannon-1948",
    title: "A Mathematical Theory of Communication",
    authors: "Claude Shannon",
    year: "1948",
    summary: "The founding document of information theory — bits, entropy, and channel capacity.",
    url: "https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf",
    urlLabel: "PDF",
  },
  {
    id: "mccarthy-1955",
    title: "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence",
    authors: "John McCarthy, Marvin Minsky, Nathaniel Rochester, Claude Shannon",
    year: "1955",
    summary: "The two-page proposal that named the field and set its research agenda.",
    url: "http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf",
    urlLabel: "Stanford archive",
  },
  {
    id: "rosenblatt-1958",
    title: "The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain",
    authors: "Frank Rosenblatt",
    year: "1958",
    summary: "The first trainable neural network — a machine that learns from examples.",
    url: "https://doi.org/10.1037/h0042519",
    urlLabel: "Psychological Review",
  },
  {
    id: "minsky-papert-1969",
    title: "Perceptrons: An Introduction to Computational Geometry",
    authors: "Marvin Minsky, Seymour Papert",
    year: "1969",
    summary: "The critique that proved limits of single-layer networks and redirected AI for 15 years.",
    url: "https://mitpress.mit.edu/9780262631112/perceptrons/",
    urlLabel: "MIT Press",
  },
  {
    id: "rumelhart-1986",
    title: "Learning Representations by Back-Propagating Errors",
    authors: "David Rumelhart, Geoffrey Hinton, Ronald Williams",
    year: "1986",
    summary: "The modern formulation of backpropagation that gave neural networks a practical training algorithm.",
    url: "https://www.nature.com/articles/323533a0",
    urlLabel: "Nature",
  },
  {
    id: "lecun-1998",
    title: "Gradient-Based Learning Applied to Document Recognition",
    authors: "Yann LeCun, Léon Bottou, Yoshua Bengio, Patrick Haffner",
    year: "1998",
    summary: "The paper that proved convolutional neural networks could read handwritten digits — the basis for modern computer vision.",
    url: "http://yann.lecun.com/exdb/publis/pdf/lecun-01a.pdf",
    urlLabel: "LeCun archive",
  },
  {
    id: "krizhevsky-2012",
    title: "ImageNet Classification with Deep Convolutional Neural Networks",
    authors: "Alex Krizhevsky, Ilya Sutskever, Geoffrey Hinton",
    year: "2012",
    summary: "AlexNet crushed the ImageNet benchmark and proved that depth plus data plus GPUs beat handcrafted features.",
    url: "https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html",
    urlLabel: "NeurIPS",
  },
  {
    id: "vaswani-2017",
    title: "Attention Is All You Need",
    authors: "Ashish Vaswani et al.",
    year: "2017",
    summary: "The Transformer architecture — self-attention replaces recurrence, enabling GPT, BERT, and every modern foundation model.",
    url: "https://arxiv.org/abs/1706.03762",
    urlLabel: "arXiv",
  },
  {
    id: "brown-2020",
    title: "Language Models are Few-Shot Learners",
    authors: "Tom Brown et al. (OpenAI)",
    year: "2020",
    summary: "GPT-3 showed that scaling a language model to 175 billion parameters unlocks few-shot learning from instructions alone.",
    url: "https://arxiv.org/abs/2005.14165",
    urlLabel: "arXiv",
  },
] as const;
