# Page Jobs — Content Reorganization

Every page touched by this spec has a clear job. If the page cannot do its job after the change, the change is wrong.

## Tour step pages (6 pages)

### Primary job
Teach one concept in the Signal → Archetype → Style → Proof → Build → Publish sequence and collect one design brief field from the student.

### Jobs added by this spec
- Surface 1–3 psychology principles that inform the decision this step asks the student to make
- Provide a collapsible "go deeper" section linking to the relevant module lesson(s)
- Feed the companion panel with step-specific diagnostic questions for the "Stuck?" tab

### Jobs this spec must NOT break
- The page must remain completable in a single session without expanding any `<details>` section
- The brief field must remain the dominant call to action
- The page must not require module completion as a prerequisite

---

## Companion panel (`GuidedStepCompanion`)

### Primary job
Show the student's evolving brief and their position in the tour path.

### Jobs added by this spec
- Third tab: "Stuck?" — show 3–5 diagnostic questions specific to the current tour step
- Each diagnostic question links to a specific page (identity-portfolio lab, browse room, or module lesson) that answers it
- After visiting a diagnostic link, the student should be able to return to the tour step without losing brief progress

### Jobs this spec must NOT break
- Brief tab must remain the default/first tab
- Path tab must continue to show all 6 steps with current progress
- Panel must remain dismissible on mobile

---

## Module index page (`/modules/`)

### Primary job
Show all modules in teaching sequence with status, lesson count, and entry links.

### Jobs added by this spec
- Each module card gains a "Deepens: [Tour Step Name]" label showing which tour step the module supports
- This label is a link back to the relevant tour step

### Jobs this spec must NOT break
- Module sequencing (1–6) must remain the primary ordering
- Status badges (active, preview, coming) must remain visible
- Card grid layout must not break at any viewport

---

## Module practice pages (`/modules/*/practice/`)

### Primary job
Give the student a hands-on exercise tied to the module's teaching goal.

### Jobs added by this spec
- A "Return to tour" CTA appears below the exercise instructions
- The CTA links to the tour step this module deepens
- The CTA is contextual: it only appears if the student has tour progress in localStorage

### Jobs this spec must NOT break
- The exercise description must remain the dominant content
- The return CTA must not feel like a requirement — it is an invitation

---

## Module checkpoint pages (`/modules/*/checkpoint/`)

### Primary job
Let the student verify they absorbed the module's key ideas.

### Jobs added by this spec
- Same "Return to tour" CTA pattern as practice pages

### Jobs this spec must NOT break
- Checkpoint content must remain self-contained

---

## Browse: Archetypes page (`/browse/archetypes/`)

### Primary job
Let students compare all 12 archetypes side by side.

### Jobs added by this spec
- Expand each archetype card from name/tagline to include: psychology profile summary, 2–3 brand examples, visual identity guidance (color palette, typography direction, imagery style)
- Add a "decision filter" prompt at the top: "Which archetype matches your signal?"
- Link back to the Archetype tour step for students who arrived via browse

### Jobs this spec must NOT break
- All 12 archetypes must remain visible without requiring interaction
- The comparison layout must not become so long that side-by-side comparison is impossible
- Existing links from tour step to this page must continue to work

---

## Browse: Attention-Trust / Persuasion page

### Primary job
Teach the attention-trust framework and persuasion principles as reference material.

### Jobs added by this spec
- Surface the full Cialdini 6-move framework from `persuasion-content.ts`
- Each move gets: definition, design application ("Use this when..."), example from a real site, and link to the tour step where it matters most
- Add the attention-trust pipeline as a visual diagram

### Jobs this spec must NOT break
- The page must remain useful as a standalone reference, not only as a tour supplement

---

## Identity-portfolio diagnose page (`/experiences/identity-portfolio/diagnose/`)

### Primary job
Help a confused student figure out what is wrong with their current identity choices.

### Jobs added by this spec
- No content changes — this page is already well-designed
- This page gains INBOUND links from the companion panel "Stuck?" tab (Archetype and Signal steps)
- The page should link back to the tour step that is most relevant to the student's diagnosis

### Jobs this spec must NOT break
- The diagnostic flow must remain self-contained and completable without tour context

---

## Homepage (`/`)

### Primary job
Route visitors to the right starting point based on intent.

### Jobs added by this spec
- None. The homepage is out of scope for this spec.

### Jobs this spec must NOT break
- The 5 intent entry points must continue to work
