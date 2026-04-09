# Content Migration Map — Content Reorganization

This document maps every piece of content that moves or gets surfaced in a new location. Nothing is deleted. All changes are additive: existing content stays where it is and gains new visibility through cross-links, progressive disclosure sections, or expanded rendering.

## Content surfacing: Psychology principles → Tour steps

These data sources contain psychology/persuasion content that currently has no student-facing rendering during the tour. This spec surfaces them as collapsible `<details>` sections on tour step pages.

| Source file | Content | Target tour step | Rendering |
| --- | --- | --- | --- |
| `lib/persuasion-content.ts` — attention-trust framework | First impressions, cognitive load, trust signals | Signal | `<details>` section: "Why signals work" |
| `lib/archetype-atlas-content.ts` — archetype psychology | Jungian roots, shadow/ally dynamics, brand congruence | Archetype | `<details>` section: "The psychology behind archetypes" |
| `lib/persuasion-content.ts` — Cialdini 6 moves | Reciprocity, commitment, social proof, authority, liking, scarcity | Style | `<details>` section: "Design principles that persuade" |
| `lib/persuasion-content.ts` — social proof, authority | Evidence tiers, testimonial psychology, authority signals | Proof | `<details>` section: "What counts as evidence" |
| `lib/agentic-orchestration.ts` — brief structure | Brief anatomy, AI-readable instructions, quality criteria | Build | `<details>` section: "Writing briefs for AI tools" |
| Module 6 content — deployment practices | Pre-launch checklist, iteration framework | Publish | `<details>` section: "The deployment checklist" |

## Content surfacing: Diagnostic questions → Companion panel

Each tour step's "Stuck?" tab needs 3–5 diagnostic questions. These are NEW micro-content pieces (not migrated), but each question links to existing content:

| Tour step | Diagnostic question (new) | Links to (existing) |
| --- | --- | --- |
| Signal | "What makes a first impression work?" | `/experiences/identity-portfolio/labs/psychology/` |
| Signal | "I don't know what my signal should be" | `/experiences/identity-portfolio/diagnose/` |
| Archetype | "Not sure which archetype fits?" | `/experiences/identity-portfolio/diagnose/` |
| Archetype | "Want to see all 12 archetypes in depth?" | `/browse/archetypes/` |
| Archetype | "How do archetypes connect to psychology?" | `/experiences/identity-portfolio/labs/archetypes/` |
| Style | "Which persuasion principles apply to my design?" | `/experiences/identity-portfolio/labs/persuasion/` |
| Style | "How do I choose colors and typography?" | `/browse/design-lineages/` |
| Proof | "What kind of evidence should I show?" | `/browse/attention-trust/` |
| Proof | "How do I collect testimonials or data?" | Module 5 lesson (identity & proof) |
| Build | "How do I write a brief an AI can follow?" | Module 3 lesson 2 (brief-writing) |
| Build | "What is agentic workflow?" | Module 3 lesson 1 (chatbot-vs-agent) |
| Publish | "What should I check before going live?" | Module 6 lesson (deployment) |
| Publish | "How do I measure if my site is working?" | Module 6 lesson (iteration) |

## Content expansion: Browse rooms

These browse rooms currently render partial data from their source files. This spec expands them to render the full dataset:

| Browse room | Source file | Currently rendered | Expanded to include |
| --- | --- | --- | --- |
| `/browse/archetypes/` | `lib/archetype-atlas-content.ts` | Name, tagline, 1-sentence summary per archetype | Full psychology profile, brand examples, visual identity guidance (colors, typography, imagery) |
| `/browse/attention-trust/` | `lib/persuasion-content.ts` | Partial attention-trust overview | Full Cialdini 6-move framework with design applications |

## Cross-links: Module → Tour (new)

These are new navigation elements added to module pages:

| Module | Related tour step | Cross-link location |
| --- | --- | --- |
| Module 1 — Web Presence Framework | Signal, Archetype | Module overview page, practice page, checkpoint page |
| Module 2 — AI Foundations | Build (context for AI tools) | Module overview page, practice page |
| Module 3 — Agentic Workflow | Build | Module overview page, practice page, checkpoint page |
| Module 4 — Visual AI | Style (visual design decisions) | Module overview page, practice page |
| Module 5 — Identity & Proof | Proof, Archetype | Module overview page, practice page, checkpoint page |
| Module 6 — Studio & Publish | Publish | Module overview page, practice page, checkpoint page |

## Cross-links: Tour → Module (new)

These are new links added inside progressive disclosure sections on tour step pages:

| Tour step | Links to module | Context |
| --- | --- | --- |
| Signal | Module 1 — Web Presence Framework | "Go deeper: build a full web presence framework" |
| Archetype | Module 1 — Web Presence Framework, Module 5 — Identity & Proof | "Go deeper: understand identity systems" |
| Style | Module 4 — Visual AI | "Go deeper: use AI for visual design" |
| Proof | Module 5 — Identity & Proof | "Go deeper: build your evidence portfolio" |
| Build | Module 3 — Agentic Workflow | "Go deeper: master brief-writing for AI" |
| Publish | Module 6 — Studio & Publish | "Go deeper: professional deployment practices" |

## Files NOT touched

The following content files are referenced but not modified:

- `lib/persuasion-content.ts` — read-only data source
- `lib/archetype-atlas-content.ts` — read-only data source  
- `lib/agentic-orchestration.ts` — read-only data source
- `lib/module-content/index.ts` — read-only (module definitions)
- `lib/module-content/types.ts` — read-only (type definitions)
- `content/experiences/identity-portfolio-system.json` — read-only
- All existing tour step pages retain their current content; new content is additive
