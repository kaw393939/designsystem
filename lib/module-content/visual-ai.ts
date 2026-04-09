/* ------------------------------------------------------------------ */
/*  Visual AI — module data                                           */
/*  Prompt examples, comparison, specificity ladder, editorial rubric */
/* ------------------------------------------------------------------ */

// ── Types ──────────────────────────────────────────────────────────

export type PromptExample = {
  id: string;
  prompt: string;
  imageSrc: string;
  imageAlt: string;
  annotation: string;
  category: "concept illustration" | "landmark moment" | "visual break" | "hero image";
  isApproximate?: boolean;
};

export type ModelComparisonRow = {
  designerConcept: string;
  whatModelSees: string;
};

export type SpecificityLevel = {
  level: "vague" | "better" | "precise";
  label: string;
  prompt: string;
  annotation: string;
};

export type EditorialRubricItem = {
  id: string;
  question: string;
  guidance: string;
};

export type PromptAnatomySection = {
  id: string;
  title: string;
  definition: string;
  example: string;
};

export type ClicheEntry = {
  id: string;
  label: string;
  description: string;
};

// ── Prompt example pairs ───────────────────────────────────────────

export const promptExamples: readonly PromptExample[] = [
  {
    id: "dartmouth-proposal",
    prompt:
      "An illustrated scene of a 1956 academic conference at Dartmouth College. Researchers gathered around a table with papers and early computing equipment. Warm afternoon light through institutional windows. Editorial illustration style, muted earth tones, textured paper quality.",
    imageSrc: "/media/modules/generated/dartmouth-proposal.webp",
    imageAlt:
      "Illustrated scene of researchers at the 1956 Dartmouth AI conference",
    annotation:
      "Notice the specificity: time period, setting, lighting, and style are all named. The model cannot guess '1956 Dartmouth' from 'AI conference' alone.",
    category: "landmark moment",
  },
  {
    id: "shannon-theseus-maze",
    prompt:
      "A mechanical mouse navigating a simple maze, inspired by Claude Shannon's Theseus experiment. Warm overhead lighting on a wooden maze. Retro-scientific illustration style with visible wood grain and brass components.",
    imageSrc: "/media/modules/generated/shannon-theseus-maze.webp",
    imageAlt:
      "Illustration of a mechanical mouse in a maze inspired by Shannon's Theseus",
    annotation:
      "The prompt names a specific historical artifact. Without 'Shannon' and 'Theseus,' the model would generate a generic maze illustration.",
    category: "landmark moment",
    isApproximate: true,
  },
  {
    id: "backpropagation-paper",
    prompt:
      "An illustrated depiction of a seminal 1986 machine learning paper. Layered neural network diagram with arrows showing signal flow forward and error flowing backward. Academic paper aesthetic with graph-paper texture and hand-drawn diagram quality.",
    imageSrc: "/media/modules/generated/backpropagation-paper.webp",
    imageAlt:
      "Illustration of the backpropagation algorithm as a layered neural network diagram",
    annotation:
      "Style cues like 'graph-paper texture' and 'hand-drawn diagram quality' push the model toward an editorial look instead of a generic tech render.",
    category: "landmark moment",
    isApproximate: true,
  },
  {
    id: "era-1-precursors",
    prompt:
      "A wide illustration representing the precursor era of artificial intelligence. Boolean logic gates, mechanical calculation devices, and early telegraph-era communication symbols. Sepia-toned with engraving-style line work. Horizontal composition, suitable as a section header.",
    imageSrc: "/media/modules/generated/era-1-precursors.webp",
    imageAlt: "Sepia-toned illustration of pre-computer logic devices and symbols",
    annotation:
      "This is a concept illustration — it does not claim to show a real scene. The horizontal composition note tells the model this is for a layout, not a standalone image.",
    category: "concept illustration",
    isApproximate: true,
  },
  {
    id: "imagenet-moment",
    prompt:
      "An illustrated scene of a pivotal moment in computer vision history. A neural network diagram overlaid on a massive grid of photographs — dogs, cars, flowers, everyday objects. Dramatic lighting suggesting a breakthrough, modern editorial illustration style.",
    imageSrc: "/media/modules/generated/imagenet-moment.webp",
    imageAlt:
      "Illustration of the ImageNet breakthrough moment in deep learning",
    annotation:
      "The 'grid of photographs' detail gives the model a concrete visual anchor for an abstract concept (a dataset competition).",
    category: "landmark moment",
    isApproximate: true,
  },
  {
    id: "era-6-deep-learning",
    prompt:
      "A wide concept illustration representing the deep learning era. Multiple layers of interconnected nodes glowing with data flow. Cool blue and violet tones with warm accent highlights. Modern editorial illustration, clean lines, suitable as a section divider.",
    imageSrc: "/media/modules/generated/era-6-deep-learning.webp",
    imageAlt:
      "Concept illustration of deep learning neural network layers with blue-violet tones",
    annotation:
      "Color direction ('cool blue and violet' with 'warm accent highlights') is more effective than 'make it look techy.' Naming specific colors narrows the model's search space.",
    category: "concept illustration",
    isApproximate: true,
  },
  {
    id: "era-7-foundation-models",
    prompt:
      "A wide editorial illustration of the foundation model era. Token embeddings radiating outward from a central model, with human silhouettes at the interfaces — typing, reading, building. Warm amber and cool slate palette. No text in the image.",
    imageSrc: "/media/modules/generated/era-7-foundation-models.webp",
    imageAlt:
      "Illustration of the foundation model era with human silhouettes interacting with AI",
    annotation:
      "The 'no text in the image' negative prompt prevents the model from generating fake UI labels or captions — a common failure mode.",
    category: "concept illustration",
    isApproximate: true,
  },
  {
    id: "transformer-paper",
    prompt:
      "An illustrated depiction of the 2017 Transformer architecture paper. Attention mechanism visualized as connecting lines between word tokens. Academic diagram aesthetic with clean vectors and subtle color coding. White background, publication-ready feel.",
    imageSrc: "/media/modules/generated/transformer-paper.webp",
    imageAlt:
      "Illustration of the Transformer attention mechanism connecting word tokens",
    annotation:
      "Naming the specific architecture ('Transformer') and visualization style ('attention mechanism as connecting lines') beats a generic 'AI paper' prompt.",
    category: "landmark moment",
    isApproximate: true,
  },
  {
    id: "latent-space-landscape",
    prompt:
      "A landscape visualization of a latent space. Rolling terrain where nearby hills represent similar concepts and distant peaks represent unrelated ones. Topographic map aesthetic with contour lines and soft gradient fills. Warm earth tones, wide aspect ratio.",
    imageSrc: "/media/modules/generated/latent-space-landscape-v1.webp",
    imageAlt:
      "Topographic landscape visualization of a latent space with contour lines",
    annotation:
      "An analogy prompt: mapping an abstract math concept (vector space) onto a familiar visual (landscape). The model can generate landscapes — your job is to connect the metaphor.",
    category: "concept illustration",
    isApproximate: true,
  },
  {
    id: "math-guide-hero",
    prompt:
      "A wide hero image for an educational guide about the mathematics behind AI. Soft gradient background transitioning from deep navy to warm amber. Floating geometric shapes — vectors, coordinate grids, simple function curves — arranged with generous negative space. No text, no faces.",
    imageSrc: "/media/modules/generated/math-guide-hero.webp",
    imageAlt:
      "Hero image with floating geometric shapes representing AI mathematics",
    annotation:
      "This is a decorative hero — it sets a mood without making factual claims. The negative prompts ('no text, no faces') prevent common unwanted elements.",
    category: "hero image",
    isApproximate: true,
  },
] as const;

// ── Image model comparison ─────────────────────────────────────────

export const modelComparisonRows: readonly ModelComparisonRow[] = [
  {
    designerConcept: "Style",
    whatModelSees:
      "Texture patterns, color distributions, brush-stroke frequencies in training data",
  },
  {
    designerConcept: "Composition",
    whatModelSees:
      "Spatial relationships between regions of the image tensor",
  },
  {
    designerConcept: "Mood",
    whatModelSees:
      "Color temperature, contrast ratios, lighting direction patterns",
  },
  {
    designerConcept: "Professional",
    whatModelSees:
      "Visual correlations with stock photography and commercial design in training data",
  },
  {
    designerConcept: "Minimalist",
    whatModelSees:
      "Low token-count descriptions, negative space patterns, monochromatic palettes",
  },
] as const;

// ── Specificity ladder ─────────────────────────────────────────────

export const specificityLadder: readonly SpecificityLevel[] = [
  {
    level: "vague",
    label: "Vague",
    prompt: "A hero image for a portfolio website",
    annotation:
      "Too broad — the model will average across millions of portfolio heroes in its training data. You will get the statistical mean of 'portfolio hero,' which is generic.",
  },
  {
    level: "better",
    label: "Better",
    prompt:
      "A clean hero image for a software engineer's portfolio, dark background, code elements, modern feel",
    annotation:
      "Adds audience and mood, but 'clean,' 'modern,' and 'code elements' are still vague. The model interprets each one by statistical average.",
  },
  {
    level: "precise",
    label: "Precise",
    prompt:
      "A wide-format hero image for a senior software engineer's portfolio. Dark blue-gray background (#1a1a2e). Subtle code editor fragments in the background, slightly blurred. A single warm accent light from the left. No text, no faces, no generic tech icons. Aspect ratio 16:9, photographic lighting, shallow depth of field.",
    annotation:
      "Names the color, the lighting direction, the composition, and what to exclude. Each detail narrows the model's search space toward a specific result.",
  },
] as const;

// ── Prompt anatomy ─────────────────────────────────────────────────

export const promptAnatomySections: readonly PromptAnatomySection[] = [
  {
    id: "subject",
    title: "Subject",
    definition: "What is in the image — the main content the viewer should see.",
    example:
      "A mechanical mouse navigating a wooden maze; A neural network diagram with layered nodes",
  },
  {
    id: "style",
    title: "Style",
    definition:
      "What the image looks like — illustration, photograph, watercolor, diagram, etc.",
    example:
      "Editorial illustration style, muted earth tones; Retro-scientific illustration with visible wood grain",
  },
  {
    id: "composition",
    title: "Composition",
    definition: "Framing, aspect ratio, negative space, and spatial arrangement.",
    example:
      "Wide horizontal format suitable as a section header; Subject on the left third, generous negative space on the right",
  },
  {
    id: "mood",
    title: "Mood",
    definition:
      "Lighting, color temperature, atmosphere — the emotional register of the image.",
    example:
      "Warm afternoon light through institutional windows; Cool blue-violet tones with warm accent highlights",
  },
  {
    id: "technical",
    title: "Technical",
    definition: "Resolution, format, aspect ratio, and rendering specifics.",
    example:
      "Aspect ratio 16:9, photographic lighting, shallow depth of field; Publication-ready feel, white background",
  },
  {
    id: "negative",
    title: "Negative prompts",
    definition:
      "What to exclude — prevents common unwanted elements from appearing.",
    example:
      "No text, no faces, no generic tech icons; No lens flare, no stock-photo watermarks",
  },
] as const;

// ── Common clichés ─────────────────────────────────────────────────

export const commonCliches: readonly ClicheEntry[] = [
  {
    id: "generic-corporate",
    label: "Generic corporate",
    description:
      "Suited figures shaking hands in front of glass buildings. If the image could belong to any company, it belongs to none.",
  },
  {
    id: "over-hdr",
    label: "Over-HDR",
    description:
      "Hyper-saturated landscapes that look like phone wallpapers. These scream 'stock image' and undermine the editorial voice.",
  },
  {
    id: "uncanny-faces",
    label: "Uncanny faces",
    description:
      "Close-up portraits that fall into the uncanny valley. Generated faces are getting better, but viewers still detect something wrong — and distrust follows.",
  },
  {
    id: "tech-bro",
    label: "Tech-bro aesthetic",
    description:
      "Dark backgrounds with floating holographic UI elements. This is the visual equivalent of buzzwords — it looks techy without communicating anything specific.",
  },
] as const;

// ── Editorial judgment rubric ──────────────────────────────────────

export const editorialRubric: readonly EditorialRubricItem[] = [
  {
    id: "factually-true",
    question: "Does this image need to be factually true?",
    guidance:
      "If yes, photograph it or do not use an image. A generated image cannot be evidence of anything.",
  },
  {
    id: "real-person-place",
    question:
      "Is this image claiming to show a real person, place, or event?",
    guidance:
      "If yes, use a real photograph or a documented source. A generated portrait of a 'real' person is fabrication.",
  },
  {
    id: "misleading",
    question: "Would a visitor be misled about what is real?",
    guidance:
      "If yes, do not generate. Trust is hard to earn and easy to lose.",
  },
  {
    id: "decorative",
    question: "Is this image decorative, conceptual, or illustrative?",
    guidance:
      "If yes, generation is appropriate. Concept illustrations and mood-setting heroes are honest uses.",
  },
  {
    id: "matches-tone",
    question: "Does the generated image match the archetype and tone?",
    guidance:
      "If no, iterate or reconsider. A mismatched image is worse than no image.",
  },
  {
    id: "quality-threshold",
    question:
      "Would a low-quality generated image hurt more than no image?",
    guidance:
      "Often yes. Negative space, typography, or a simple gradient can be more effective than a mediocre generation.",
  },
] as const;
