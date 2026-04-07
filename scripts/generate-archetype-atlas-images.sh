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

echo "Archetype atlas image generation complete."