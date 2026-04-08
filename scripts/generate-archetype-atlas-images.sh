#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT_DIR"

if [[ ! -f .env.local ]]; then
  echo "Missing .env.local in $ROOT_DIR" >&2
  exit 1
fi

set -a
source .env.local
set +a

if [[ -z "${API__OPENAI_API_KEY:-}" && -n "${OPENAI_API_KEY:-}" ]]; then
  export API__OPENAI_API_KEY="$OPENAI_API_KEY"
fi

if [[ -z "${API__OPENAI_API_KEY:-}" ]]; then
  echo "Set OPENAI_API_KEY or API__OPENAI_API_KEY before running this script." >&2
  exit 1
fi

mkdir -p public/archetype-atlas/archetypes
mkdir -p public/archetype-atlas/styles
mkdir -p public/archetype-atlas/examples
mkdir -p public/archetype-atlas/routes

generate() {
  local output_path="$1"
  local preset="$2"
  local prompt="$3"

  echo "Generating ${output_path}"
  eai image "$prompt" --preset "$preset" --output "$output_path" --no-cache
}

generate \
  public/archetype-atlas/archetypes/innocent.png \
  portrait \
  "Editorial poster for the Innocent archetype in brand strategy: luminous morning room, fresh linen, open window, pale cream and sky palette, simple hopeful composition, clean light, minimal props, premium magazine art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/archetypes/explorer.png \
  portrait \
  "Editorial poster for the Explorer archetype in brand strategy: windswept traveler on a ridge with map fragments and distant horizon, mineral blues and sand tones, expansive motion, disciplined composition, adventurous but intelligent, premium magazine art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/archetypes/sage.png \
  portrait \
  "Editorial poster for the Sage archetype in brand strategy: researcher at a desk with diagrams, index cards, books, and measured light, indigo, parchment, graphite palette, calm authority, typographic-grid feeling, premium magazine art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/archetypes/hero.png \
  portrait \
  "Editorial poster for the Hero archetype in brand strategy: determined athlete-builder mid-stride, disciplined geometry, bold red and graphite palette, high-contrast light, purposeful movement, premium magazine art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/archetypes/outlaw.png \
  portrait \
  "Editorial poster for the Outlaw archetype in brand strategy: defiant innovator in black leather and workwear, torn poster textures, sharp diagonals, black, bone, rust-red palette, rebellious but intelligent, premium magazine art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/archetypes/magician.png \
  portrait \
  "Editorial poster for the Magician archetype in brand strategy: figure surrounded by transformation diagrams, light trails, mirrors, and shifting materials, prismatic teal, violet, charcoal palette, visionary systems mood, premium magazine art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/archetypes/everyman.png \
  portrait \
  "Editorial poster for the Everyman archetype in brand strategy: approachable person in an honest studio-kitchen workspace, denim, paper notes, warm daylight, wheat, navy, clay palette, unpretentious and trustworthy, premium magazine art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/archetypes/lover.png \
  portrait \
  "Editorial poster for the Lover archetype in brand strategy: tactile close-up of a craft-oriented person arranging rich materials, velvet, paper, ceramics, deep burgundy, blush, espresso palette, intimate and beautiful, premium magazine art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/archetypes/jester.png \
  portrait \
  "Editorial poster for the Jester archetype in brand strategy: witty playful character amid cut-paper shapes, unexpected props, punchy yellow, cobalt, tomato palette, smart mischief, graphic humor, premium magazine art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/archetypes/caregiver.png \
  portrait \
  "Editorial poster for the Caregiver archetype in brand strategy: calm supportive mentor figure in a welcoming learning space, warm wood, soft green, cream palette, accessible human atmosphere, premium magazine art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/archetypes/creator.png \
  portrait \
  "Editorial poster for the Creator archetype in brand strategy: maker in a design studio surrounded by prototypes, sketches, material samples, ink, ochre, ultramarine palette, craft visible, premium magazine art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/archetypes/ruler.png \
  portrait \
  "Editorial poster for the Ruler archetype in brand strategy: poised leader in an architectural interior, restrained luxury, black, ivory, brass palette, powerful order, premium magazine art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/styles/swiss-grid.png \
  landscape \
  "Swiss modern web and poster style board for brand archetype education: exact grid, asymmetric typography blocks, black, ivory, signal-red palette, clean margins, rational hierarchy, disciplined clarity, premium editorial art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/styles/brutalist-interface.png \
  landscape \
  "Brutalist web style board for brand archetype education: raw interface blocks, heavy black rules, stark monochrome with acid accent, oversized type shapes, blunt hierarchy, intentional severity, premium editorial art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/styles/punk-collage.png \
  landscape \
  "Punk and grunge web style board for brand archetype education: xerox textures, torn paper, spray paint, tape, rough type fragments, black, dirty white, fluorescent red palette, rebellious energy with intelligent composition, premium editorial art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/styles/editorial-luxury.png \
  landscape \
  "Editorial luxury web style board for brand archetype education: refined serif typography blocks, photography crops, paper texture, cream, espresso, oxblood palette, intimate but controlled hierarchy, premium magazine art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/styles/systems-modern.png \
  landscape \
  "Systems modern web style board for brand archetype education: modular components, calm geometry, muted teal, graphite, fog palette, product-thinking meets editorial design, structured but human, premium art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/examples/sage-swiss-hero-board.png \
  landscape \
  "Website hero concept board for a Sage archetype personal brand using Swiss design logic: disciplined grid, evidence-first hierarchy, diagrams, real artifacts, calm indigo and cream palette, serious but inviting, premium editorial art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/examples/outlaw-punk-hero-board.png \
  landscape \
  "Website hero concept board for an Outlaw archetype personal brand using punk design logic: ripped collage, sharp contrast, transgressive energy, black, rust, bone palette, disruptive but intentional, premium editorial art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/examples/magician-systems-hero-board.png \
  landscape \
  "Website hero concept board for a Magician archetype personal brand using systems-modern design logic: transformation narrative, layered cards, light paths, prototypes, teal, violet, charcoal palette, future-facing and credible, premium editorial art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/routes/start-orientation-board.png \
  landscape \
  "Editorial concept board for a web presence workshop homepage: student designer at a desk choosing between route cards, archetype portraits, style swatches, proof artifacts, and a laptop hero mockup, warm sage, parchment, sky, and brass palette, premium magazine art direction, intelligent educational systems mood, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/routes/tour-storyboard.png \
  landscape \
  "Six-panel storyboard for a guided web-presence build path: audience note, archetype portrait, style board, proof receipt, page wireframe, and live publish moment, cinematic editorial collage, warm paper textures, disciplined hierarchy, human-centered learning studio, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/routes/browse-comparison-board.png \
  landscape \
  "Comparison-room concept board for a design-system workshop: archetype portraits, style boards, research cards, trust cues, and route map pinned across a studio wall, gallery-meets-workshop atmosphere, sage, indigo, rust, and cream palette, premium editorial art direction, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/routes/examples-proof-spread.png \
  landscape \
  "Outcome-proof editorial spread for a web presence workshop: one side a student portfolio site, the other a museum experience page, visible proof artifacts, screenshots, annotations, and before-to-after confidence, refined classroom studio aesthetic, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/routes/signal-brief-board.png \
  landscape \
  "Audience and promise planning board for a web-presence workshop: portrait of a student persona, sticky-note brief with problem and promise, first-screen website mockup, field-research scraps, calm evidence-first composition, sage, amber, and cream palette, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/routes/proof-receipt-board.png \
  landscape \
  "Proof-receipt board for a web-presence workshop: testimonial portrait, metric card, screenshot, artifact photo, and CTA mockup arranged as a trust-building evidence spread, serious but inviting editorial design, deep green, cream, and copper palette, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/routes/build-wireframe-board.png \
  landscape \
  "Wireframe-and-review board for a web-presence build step: page skeleton sketches, section blocks, proof placement notes, sticky critique tags, laptop mockup, calm editorial systems aesthetic, sage, graphite, cream, and brass palette, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/routes/publish-release-board.png \
  landscape \
  "Public-release board for a web-presence workshop: live website on laptop and phone, social share card, peer review notes, reaction cues, follow-up checklist, editorial launch montage, deep green, cream, sky, and copper palette, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/routes/sources-provenance-map.png \
  landscape \
  "Research provenance map for a design workshop sources page: books, transcripts, archival cards, QA notes, diagrams, and linked evidence clusters pinned across a studio table, elegant documentary-editorial composition, parchment, indigo, sage, and rust palette, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/routes/student-exemplar-spread.png \
  landscape \
  "End-to-end exemplar spread for a student web-presence workshop: portfolio site and museum site shown as finished outcomes with decision trail artifacts, proof objects, annotations, and public-facing share moments, premium editorial classroom spread, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/examples/portfolio-exemplar-board.png \
  landscape \
  "Portfolio exemplar board for a student web-presence workshop: polished portfolio homepage, proof receipts, project cards, recruiter-facing clarity, careful editorial layout, warm neutral and deep green palette, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/examples/museum-exemplar-board.png \
  landscape \
  "Museum-site exemplar board for a student web-presence workshop: curated subject homepage, exhibit navigation, archive imagery, editorial hierarchy, public-facing cultural site mood, parchment, ink, rust, and blue palette, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/routes/archetypes-compare-strip.png \
  landscape \
  "Archetype comparison hero strip for a web-presence workshop browse room: trio of archetype portraits and family-cluster cues arranged as a compare board, sage, hero, and caregiver energy, refined editorial museum display, parchment, deep green, cobalt, and brass palette, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/routes/design-lineages-strip.png \
  landscape \
  "Design-lineages hero strip for a web-presence workshop browse room: Swiss grid, brutalist, and editorial style boards aligned in one compare surface, typography samples, image crops, hierarchy cues, refined design-museum mood, cream, graphite, signal red, ink blue palette, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/routes/attention-trust-strip.png \
  landscape \
  "Attention-and-trust hero strip for a web-presence workshop browse room: authority, reciprocity, and social proof shown as three contrasting trust levers with testimonial objects, badges, screenshots, and interface fragments, serious editorial systems style, deep green, copper, cream, and slate palette, no readable text, no logo, no watermark"

generate \
  public/archetype-atlas/examples/proof-blocks-before-after-board.png \
  landscape \
  "Before-and-after proof-block montage for a web-presence workshop example page: weak claim-heavy proof section contrasted with strong receipt-first proof section, annotations, screenshots, testimonial card, metric chip, CTA refinement, premium editorial critique board, no readable text, no logo, no watermark"

echo "Archetype atlas image generation complete."