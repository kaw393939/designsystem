# Generated Assets Manifest

## Purpose

This file tracks every AI-generated image produced for the literature-review corpus, including the prompt used, output path, and intended destination.

## Images

### Branding

| File | Size | Preset | Prompt summary | Destination |
| --- | --- | --- | --- | --- |
| [research-atlas-board.png](../generated/branding/research-atlas-board.png) | 1536x1024 | artistic | Top-down flat-lay of research atlas with maps, identity cards, booklets, printed graphs, coffee stain, warm midcentury palette | Site hero, about page |
| [identity-portfolio-signal-poster.png](../generated/branding/identity-portfolio-signal-poster.png) | 1024x1536 | artistic | Bold typographic poster "Identity Portfolio", layered geometric shapes, International Typographic style, warm gold + navy + white | Cover art, social media |
| [second-renaissance-cover.png](../generated/branding/second-renaissance-cover.png) | 1024x1536 | artistic | Renaissance-era letterpress workshop dissolving into modern digital design studio, split left-right, engraving to vector, warm sepia to cool blue | Course cover, section headers |

### Editorial Illustrations

| File | Size | Preset | Prompt summary | Destination |
| --- | --- | --- | --- | --- |
| [second-renaissance-split-scene.png](../generated/illustrations/second-renaissance-split-scene.png) | 1536x1024 | artistic | Gutenberg printing press on left dissolving into digital screen on right, scholar figures in both halves, cinematic lighting | Chapter opener |
| [signal-to-opportunity-loop.png](../generated/illustrations/signal-to-opportunity-loop.png) | 1024x1024 | artistic | Circular system diagram: student creates portfolio, signals reach audiences, trust forms, opportunities return, editorial flat style | Systems thinking section |
| [trust-and-proof-architecture.png](../generated/illustrations/trust-and-proof-architecture.png) | 1536x1024 | artistic | Isometric building section showing layers of trust: foundation (identity), walls (portfolio proof), windows (public signals), roof (opportunity) | Trust and proof section |
| [weak-ties-network-field.png](../generated/illustrations/weak-ties-network-field.png) | 1536x1024 | artistic | Network visualization with dense clusters connected by long bridging ties, nodes as people silhouettes, warm+cool palette | Networks and reach section |
| [motivation-to-opportunity-chain.png](../generated/illustrations/motivation-to-opportunity-chain.png) | 1024x1024 | landscape | Horizontal flow: figure recognizes need, crafts signals through portfolio artifacts, published work radiates outward and returns as opportunity loops | Course overview, homepage |
| [whole-person-education-stack.png](../generated/illustrations/whole-person-education-stack.png) | 1024x1024 | portrait | Layered isometric stack: readiness (amber), coaching (teal), literacy (white), production (coral), deployment (blue) with human silhouettes | Program design pages |
| [archetype-coherence-wheel.png](../generated/illustrations/archetype-coherence-wheel.png) | 1024x1024 | square | Central hub identity signal with four spokes: voice, visuals, proof, CTA; midcentury poster aesthetic, cream and charcoal | Identity lessons |
| [crisis-to-agency-data-scene.png](../generated/illustrations/crisis-to-agency-data-scene.png) | 1024x1024 | landscape | Split scene: anxious teens in blue-gray (left) to energized builders in gold (right), abstract trend line overlay | Student readiness pages |
| [governance-workspace-overhead.png](../generated/illustrations/governance-workspace-overhead.png) | 1024x1024 | landscape | Overhead: dark oak table with framework documents, matrix grids, highlighted forms, laptop dashboard, editorial product photography | Responsible AI sections |
| [first-read-hierarchy-ladder.png](../generated/illustrations/first-read-hierarchy-ladder.png) | 1024x1024 | portrait | Vertical reading path: headline zone, credibility band, narrative zone, evidence cards, CTA at bottom, architectural floor-plate aesthetic | Homepage and page-design lessons |

### People and Scenes

| File | Size | Preset | Prompt summary | Destination |
| --- | --- | --- | --- | --- |
| [student-builder-triptych.png](../generated/people/student-builder-triptych.png) | 1536x1024 | default | Three-panel triptych: diverse young builders at work (coding, designing, presenting), documentary photography style | Student stories section |
| [research-mentor-portrait.png](../generated/people/research-mentor-portrait.png) | 1024x1536 | default | Experienced mentor at a cluttered research desk, warm overhead light, bookshelves behind, editorial portrait | Faculty/mentor profiles |
| [public-work-studio-scene.png](../generated/people/public-work-studio-scene.png) | 1536x1024 | default | Open studio with students working on laptops, projector showing portfolio, collaborative energy, natural daylight | Community and studio culture |

## Generation notes

- All images generated via `eai image` using `gpt-image-1` model.
- API key exported as `API__OPENAI_API_KEY` from `.env.local`.
- `second-renaissance-cover.png` hit OpenAI safety filter on first attempt; succeeded on auto-retry.
- Quality setting: `high` for all images except where noted.
