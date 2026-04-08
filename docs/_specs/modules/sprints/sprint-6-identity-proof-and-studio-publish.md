# Sprint 6: Modules 5–6 — Identity/Proof and Studio/Publish

## Goal

Build the remaining two modules. Module 5 deepens the identity system and proof strategy introduced in the tour. Module 6 teaches the full build-review-publish-iterate cycle as professional practice.

## Why this sprint combines two modules

Both modules draw heavily from existing content. Module 5 curates from the identity portfolio experience and the proof/attention-trust browse room. Module 6 deepens the Build and Publish tour steps and adds one new lesson on professional practice. Neither requires the volume of new writing that modules 2–4 demanded.

## Module 5: Identity and Proof

### Source content mapping

| Source | Target lesson | Treatment |
| --- | --- | --- |
| Identity portfolio experience pages | Lesson 1 | Curate: identity signal framework |
| `/tour/proof` + `/browse/attention-trust` | Lesson 2 | Curate: evidence tiers, trust mechanics |
| Student exemplars (Jules Morrow, Nia Okafor, Noor Valdez) | Lesson 3 | Reference: annotated examples of portfolio-as-proof |

### Lesson specifications

#### Lesson 1: Identity signals

**Route:** `/modules/identity-and-proof/identity-signals/`

- How audience, archetype, and visual direction create a coherent identity
- The identity as a system, not a collection of choices
- What breaks coherence: mismatched signals, conflicting tones, borrowed identities
- Link: "Explore the identity portfolio system → /experiences/identity-portfolio"
- Classroom frame: "Map your own site's identity signals. Where do they align? Where do they contradict?"

#### Lesson 2: Building proof that lands

**Route:** `/modules/identity-and-proof/building-proof/`

- Types of evidence: case studies, metrics, testimonials, process documentation, credentials
- Placement strategy: where proof belongs on the page relative to claims
- Trust mechanics: what makes evidence believable vs. what makes visitors suspicious
- The attention-trust arc: first scan → interest → investigation → trust
- Link: "For the full framework → /tour/proof"
- Link: "Open the trust and proof room → /browse/attention-trust"

#### Lesson 3: Portfolio as proof system

**Route:** `/modules/identity-and-proof/portfolio-as-proof/`

- The portfolio itself is a proof artifact: it demonstrates the skills it claims
- Annotated walk-throughs of student exemplars showing how identity + proof + presentation work together
- Common failures: beautiful portfolios that prove nothing, evidence-heavy portfolios with no identity
- "Does every section of the portfolio earn the next scroll?"

### Practice page

**Route:** `/modules/identity-and-proof/practice/`

- Task: redesign the proof section of the student's own site
- Apply the evidence tier framework
- Map each claim to its supporting evidence
- Identify gaps: claims without proof, proof without claims

### Checkpoint page

**Route:** `/modules/identity-and-proof/checkpoint/`

- Studio review using portfolio and museum criteria from the Build step
- Peer review: can a classmate identify the identity system and verify the proof?

---

## Module 6: Studio and Publish

### Source content mapping

| Source | Target lesson | Treatment |
| --- | --- | --- |
| `/tour/build` (build brief, audit checklists) | Lesson 1 | Deepen: more detail on turning briefs into pages |
| New content | Lesson 2 | Write: studio critique methods, feedback frameworks |
| `/tour/publish` (deployment, iteration) | Lesson 3 | Deepen: measurement, deciding what to fix |
| New content | Lesson 4 | Write: maintaining a site over time as professional practice |

### Lesson specifications

#### Lesson 1: From brief to build

**Route:** `/modules/studio-and-publish/from-brief-to-build/`

- Turning the build brief into a working page structure
- Decision hierarchy: what to build first, what to defer
- Working with constraints: time, skill, tools, content gaps
- Connecting to Module 3: using agentic workflow for the build
- Link: "For the full walk-through → /tour/build"

#### Lesson 2: Review and revision

**Route:** `/modules/studio-and-publish/review-and-revision/`

- Studio critique as a skill: specific, constructive, tied to criteria
- How to give feedback: name the page job, check against the brief, suggest one concrete change
- How to receive feedback: separate taste-based opinions from criteria-based observations
- Revision as iteration, not surrender: "The reviewer does not own your page. You decide what to change."
- Peer review template with structured prompts

#### Lesson 3: Deployment and iteration

**Route:** `/modules/studio-and-publish/deployment-and-iteration/`

- Publishing as the beginning of measurement, not the end of work
- What to check after launch: does the first read land? Does the proof register? Do people take the intended action?
- Deciding what to fix: the biggest gap between intention and result
- When to iterate vs. when to redesign: small fixes compound; full redesigns are expensive
- Link: "For the full walk-through → /tour/publish"

#### Lesson 4: Professional practice

**Route:** `/modules/studio-and-publish/professional-practice/`

- A site is a living artifact, not a one-time project
- Maintenance rhythm: what to check monthly, quarterly, yearly
- Content freshness: when credentials, projects, and testimonials go stale
- Technology maintenance: keeping dependencies current, accessibility audits
- Career inflection points: when a site needs to change because you have changed
- "The best professional site is the one that still represents you accurately."

### Practice page

**Route:** `/modules/studio-and-publish/practice/`

- Task: publish a real page revision (on the student's own site)
- Document the before and after
- Name the one biggest change and why it matters
- Record what you would fix next

### Checkpoint page

**Route:** `/modules/studio-and-publish/checkpoint/`

- Final portfolio review using the full course criteria
- Peer review: walk through a classmate's site and answer: "Would you hire/trust/follow this person based on the first 10 seconds?"
- Self-assessment: map every tour step output to the final site — is it visible?

## File creation list

### Module 5

| File | Type |
| --- | --- |
| `app/modules/identity-and-proof/page.tsx` | route |
| `app/modules/identity-and-proof/identity-signals/page.tsx` | route |
| `app/modules/identity-and-proof/building-proof/page.tsx` | route |
| `app/modules/identity-and-proof/portfolio-as-proof/page.tsx` | route |
| `app/modules/identity-and-proof/practice/page.tsx` | route |
| `app/modules/identity-and-proof/checkpoint/page.tsx` | route |

### Module 6

| File | Type |
| --- | --- |
| `app/modules/studio-and-publish/page.tsx` | route |
| `app/modules/studio-and-publish/from-brief-to-build/page.tsx` | route |
| `app/modules/studio-and-publish/review-and-revision/page.tsx` | route |
| `app/modules/studio-and-publish/deployment-and-iteration/page.tsx` | route |
| `app/modules/studio-and-publish/professional-practice/page.tsx` | route |
| `app/modules/studio-and-publish/practice/page.tsx` | route |
| `app/modules/studio-and-publish/checkpoint/page.tsx` | route |

## Acceptance criteria

- [ ] All 13 pages render (6 Module 5 + 7 Module 6)
- [ ] Module 5 lessons link to identity portfolio experience and browse rooms
- [ ] Module 6 Lesson 4 (professional practice) reads as fresh workshop content, not filler
- [ ] Student exemplar references in Module 5 Lesson 3 render with correct links
- [ ] Peer review templates are structured and actionable
- [ ] Module local nav for each module shows all pages
- [ ] `npx tsc --noEmit` passes
- [ ] Smoke-render tests for all new pages
