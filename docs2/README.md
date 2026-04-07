# docs2 — Canonical Content Library

This is the master content library and canonical source of truth for the BSEAID degree and all supporting courses.

It is organized for just-in-time derivative generation, not for pre-generating everything at once.

## Structure

### `foundation/`

The canonical core source documents. Everything else derives from these.

Do not edit these files lightly. They are the seeds from which student materials, site content, faculty briefs, and press materials are generated on demand.

| File | Role |
| --- | --- |
| `identity-system-core.md` | Primary student-facing model for the identity portfolio system |
| `mysystem.md` | Compressed operator blueprint for the identity system |
| `identity-system-student-handout.md` | Shortest student quickstart |
| `identity-system-maintainer-doctrine.md` | Editorial and architectural rules for identity system content |
| `updated-trivium-quadrivium.md` | The seven-capacity formation model seed (needs expansion) |
| `degree-positioning.md` | Program claim, non-negotiable outcomes, capability-to-artifact tables |
| `course-spine.md` | Eight-course backbone with artifact ladder |
| `integrated-research-outline.md` | Master synthesis of all research into a unified program thesis |
| `letter1.md` | Original design doctrine for the educational system (rescued from archive) |
| `bseai-site-executive-brief.md` | Stakeholder-facing program manifesto (rescued from archive) |

### `units/`

Student-facing teaching units. Each unit is a self-contained folder with:

- A student workbook (the working document students fill in)
- An archetype or reference sheet (printable companion)
- An instructor session plan (timing, talking points, review prompts)
- A final deliverable brief (what students produce and how it is assessed)

Units are designed to be used directly and to also feed derivative content (site pages, lecture slides, syllabi) on demand.

| Unit folder | Topic |
| --- | --- |
| `web-presence/` | Building a signal-first web presence using the identity system |

### `research/`

The research corpus organized by degree module rather than by taxonomy.

Populated on demand when a module requires specific citations, quotes, or evidence.

## Generation rule

This library is built for just-in-time production.

Do not generate content you do not yet need.

Do generate canonical source documents that are dense, structured, and reusable enough that any derivative — student handout, faculty brief, site page, press material — can be written from them without re-researching the underlying ideas.
