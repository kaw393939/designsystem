# Round 1 Site Think-Aloud

Date: 2026-04-05
Reader lens: 18-25 college student trying to decide whether this site will help me build something real, get noticed, and feel less generic online.

## Method

- Read the current identity homepage visually and in source.
- Read all page routes in `app/**/page.tsx`.
- Treated inactive routes as product surfaces that still need to earn attention when their release is selected.
- Focused on what feels human, what feels cold, and what would make me keep scrolling.

## Global Read

The site already has a strong system underneath it, but too many pages still speak like internal proof docs instead of a course or a public-facing learning product. When I read it like a student, the biggest mismatch is simple: the site explains the machine better than it shows the student.

Three things are working:

1. The identity experience has the beginnings of a real course shape.
2. The layout system is coherent and calmer than most student projects.
3. The design system has enough tones, shells, and blocks to support richer storytelling.

Three things are still holding the whole site back:

1. Too little face imagery and too few human turning points.
2. Too many pages lead with implementation proof instead of learner payoff.
3. Several example and guide pages still feel like placeholders because the visuals are abstract gradients instead of lived scenes, screenshots, or believable illustrated moments.

## Page-by-Page Notes

### `/` and `/experiences/identity-portfolio/`

What I feel first:
The headline is strong. It sounds ambitious and useful. The page finally has a course frame, but it still reads a little like a smart system explaining itself rather than a high-stakes student journey.

What keeps me going:
- The phrase "turns identity into opportunity" is concrete.
- The student stories help.
- The course map feels more substantial than a normal portfolio advice page.

What still feels weak:
- The hero visual is clean, but the face is tiny. I want a more human, emotionally legible first contact.
- The story cards still feel text-first. I want to see the students, their old portfolio shape, and the shift.
- I still do not see enough proof of what the finished portfolio outputs look like.

Round 1 action:
- Make the hero more human and larger.
- Add portraits or portrait-style visuals to the story section.
- Add a before/after portfolio proof block near the top.

### `/recipes/`

What I feel first:
This page sounds like it is written for maintainers, not learners.

What keeps me going:
- The route is organized.
- The cards are clear.

What loses me:
- "typed validator model" is not a student hook.
- There is no face, no scenario, no visible outcome.
- It explains recipe coverage before it explains why I should care which page shape I choose.

Round 1 action:
- Reframe the page around student choices: "Which page shape helps you teach, prove, or guide?"
- Add a human scenario visual.
- Turn the recipe cards into use-case cards, not only contract cards.

### `/tokens/`

What I feel first:
This page is useful for a designer or maintainer, but emotionally flat for a student.

What keeps me going:
- The idea that each tone has a job is good.
- The page is orderly.

What loses me:
- The page needs a visible before/after atmosphere example.
- The token names are clear, but they do not yet feel alive.
- I do not see how these choices change a student-facing page emotionally.

Round 1 action:
- Add a visual showing a flat generic page versus a more intentional, human page.
- Add an illustrated student board or interface mood study.
- Reframe the text toward learner feeling, memory, and trust.

### `/layouts/`

What I feel first:
This page knows what it is doing structurally, but the placeholder visual makes it feel unfinished.

What keeps me going:
- The layout explanations are reasonable.
- The local nav is useful.

What loses me:
- The page is proving a system using abstraction about abstraction.
- I want to see a student moving through an actual page, not a gradient box standing in for proof.

Round 1 action:
- Replace the placeholder media with a human-centered illustrated scene.
- Shift copy from component logic toward reader experience.
- Make the example route cards feel like actual page outcomes.

### `/process/`

What I feel first:
This is the right information for maintainers, but not inviting for students.

What keeps me going:
- The operating loop is explicit.
- The QA discipline is clear.

What loses me:
- I do not see the human reason for the process.
- There is no sense that this process protects real learning, not just repo hygiene.

Round 1 action:
- Add a visual that shows the handoff from idea to review to public proof.
- Add copy about trust, quality, and not wasting student effort.
- Reduce the feeling that this page is only a runbook.

### `/status/`

What I feel first:
This page is honest, which is good, but visually and emotionally thin.

What keeps me going:
- It clearly separates completed from pending.

What loses me:
- It does not show why the completed work matters for a student.
- It needs a stronger sense of motion and direction.

Round 1 action:
- Add a progress visual.
- Make completed work feel like visible gains, not only repository milestones.
- Give pending work clearer stakes.

### `/primitives/`

What I feel first:
This page is useful for system builders but reads cold.

What keeps me going:
- The contract boundary is clear.
- The page has strong informational structure.

What loses me:
- There is still too much language about renderer contracts and not enough language about what these blocks do for actual learners.
- There are no faces or human situations anchoring the explanations.

Round 1 action:
- Reframe each primitive by learner job.
- Add a small visual or illustrated use scene.
- Keep the technical accuracy, but let the learner outcome lead.

### `/examples/module/`

What I feel first:
The page is calm, but it looks like a wireframe with polished copy.

What keeps me going:
- The structure is readable.

What loses me:
- The placeholder visual makes the example feel unreal.
- The copy keeps talking about the shell instead of the lesson.

Round 1 action:
- Turn this into a believable module about student identity or portfolio proof.
- Add a human scene and a stronger first milestone.

### `/examples/lesson/`

What I feel first:
The local nav and pacing are good, but the page keeps reminding me it is a demo.

What keeps me going:
- The structure does prove readability.

What loses me:
- The opening tells me it is intentionally sparse on content sophistication.
- That kills trust immediately.

Round 1 action:
- Rewrite this as a real-feeling lesson.
- Add an annotated human-centered illustration.
- Stop describing the demo-ness of the page so loudly.

### `/examples/reading-map/`

What I feel first:
The organization is decent, but the page does not yet feel like something I would actually use.

What keeps me going:
- The cluster structure works.

What loses me:
- The placeholder visual and internal documentation tone flatten the page.

Round 1 action:
- Make the reading map feel like a real student study route.
- Add a studio desk or research-planning visual.
- Reframe the clusters around learner goals.

### `/recipes/feedback-loops/`

What I feel first:
This is one of the better pages because it already has a real topic.

What keeps me going:
- There is a concept to learn.
- The comparison structure is useful.

What still feels weak:
- The opening still feels pedagogically correct more than emotionally compelling.
- I want stronger visual proof and a clearer reason this matters now.

Round 1 action:
- Keep the logic, but sharpen the stakes.
- Make the visual feel less placeholder and more observed.

### `/recipes/public-space-observation/`

What I feel first:
This is also stronger than the guide pages because it has a real subject and a sequence.

What keeps me going:
- The lesson arc is clear.

What still feels weak:
- I want a more vivid opening and more grounded imagery.
- The topic is concrete, but the emotional entry point is still soft.

Round 1 action:
- Push the observation scene harder visually.
- Make the learner task feel more active.

### `/experiences/ai-second-renaissance/`

What I feel first:
This route is structurally there, but it does not yet feel like a developed experience the way the identity page now does.

What keeps me going:
- The topic is powerful.

What loses me:
- The wrapper is too thin.
- The page needs human stakes, imagery, and a reason this matters for young builders now.

Round 1 action:
- Build a fuller experience wrapper around the unit.
- Add a human-centered hero visual.
- Add present-day stakes, labor pressure, and student pathways.

## Immediate Build Priorities

1. Strengthen the identity experience with larger human imagery and clearer proof.
2. Rewrite the guide pages so they lead with student use and visual scenes instead of implementation posture.
3. Replace placeholder gradient media on examples and layout pages with illustrated human moments.
4. Give the AI experience a real wrapper instead of only a thin recipe route shell.
5. Preserve exact tested route headings where tests depend on them.

## Round 1 Design Rule

If a page starts by proving the system, add a human reason to care before the proof.
If a page uses a placeholder visual, replace it with a face, a scene, a portfolio artifact, or an observed moment.
If a page explains structure, pair it with the learner outcome that structure makes possible.