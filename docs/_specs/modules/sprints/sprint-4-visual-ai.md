# Sprint 4: Module 4 — Visual AI

## Goal

Teach students how to prompt for images with editorial judgment — what models see, how to iterate, and when generated images help vs. hurt a site's credibility.

## Why this sprint exists

Students reach the Build step and need images for their pages. Without guidance, they either avoid AI image generation entirely or use it badly (generic stock-looking heroes, uncanny portraits, images that undermine the proof they worked to build). Module 4 gives them the conceptual grounding (from Module 2's embeddings content) and the practical skill to generate useful images and know when not to.

## Scope

1. Create `lib/module-content/visual-ai.ts` with prompt examples, comparison data, and editorial rubric
2. Write Module 4 overview page
3. Write Lesson 1: How image models see
4. Write Lesson 2: Prompting for images
5. Write Lesson 3: When to generate and when to photograph
6. Write Practice page
7. Write Checkpoint page

## Source content mapping

| Source | Target lesson | Treatment |
| --- | --- | --- |
| Math guide — latent space, embeddings | Lesson 1 | Adapt: reapply vector concepts to visual domain |
| `latent-space-landscape-v1.webp` | Lesson 1 | Use: concept illustration |
| 27 generated illustrations | Lesson 2 | Use: annotated teaching examples |
| Tour proof framework | Lesson 3 | Reference: "proof means real evidence" principle |
| None — mostly new content | Lessons 2, 3 | Write: practical prompting guide and editorial judgment |

## Data file: `lib/module-content/visual-ai.ts`

### Prompt example pairs

8–10 entries, each with:
- `id`: slug
- `prompt`: the text prompt that generated the image — either the documented original or a reconstructed approximation (labeled accordingly)
- `imageSrc`: path to the generated illustration in `public/media/modules/generated/`
- `imageAlt`: descriptive alt text
- `annotation`: what the prompt gets right and what a student should notice
- `category`: "concept illustration" | "landmark moment" | "visual break" | "hero image"

Example entry:
```ts
{
  id: "dartmouth-proposal",
  prompt: "An illustrated scene of a 1956 academic conference at Dartmouth College. Researchers gathered around a table with papers and early computing equipment. Warm afternoon light through institutional windows. Editorial illustration style, muted earth tones, textured paper quality.",
  imageSrc: "/media/modules/generated/dartmouth-proposal.webp",
  imageAlt: "Illustrated scene of researchers at the 1956 Dartmouth AI conference",
  annotation: "Notice the specificity: time period, setting, lighting, and style are all named. The model cannot guess '1956 Dartmouth' from 'AI conference' alone.",
  category: "landmark moment",
}
```

### Image model comparison

Side-by-side concept pairs showing what designers mean vs. what models process:

| Designer concept | What the model sees |
| --- | --- |
| "Style" | Texture patterns, color distributions, brush-stroke frequencies in training data |
| "Composition" | Spatial relationships between regions of the image tensor |
| "Mood" | Color temperature, contrast ratios, lighting direction patterns |
| "Professional" | Visual correlations with stock photography and commercial design in training data |
| "Minimalist" | Low token-count descriptions, negative space patterns, monochromatic palettes |

### Specificity ladder

Three versions of the same prompt at increasing specificity:

**Vague:** "A hero image for a portfolio website"
**Better:** "A clean hero image for a software engineer's portfolio, dark background, code elements, modern feel"
**Precise:** "A wide-format hero image for a senior software engineer's portfolio. Dark blue-gray background (#1a1a2e). Subtle code editor fragments in the background, slightly blurred. A single warm accent light from the left. No text, no faces, no generic tech icons. Aspect ratio 16:9, photographic lighting, shallow depth of field."

Each level annotated with what changed and why it produces better results.

### Editorial judgment rubric

Questions for deciding whether to generate or photograph:
- Does this image need to be factually true? (If yes → photograph or do not use an image)
- Is this image claiming to show a real person, place, or event? (If yes → photograph or use documented source)
- Would a visitor be misled about what is real? (If yes → do not generate)
- Is this image decorative, conceptual, or illustrative? (If yes → generation is appropriate)
- Does the generated image match the archetype and tone? (If no → iterate or reconsider)
- Would a low-quality generated image hurt more than no image? (Often yes → be selective)

## Lesson specifications

### Lesson 1: How image models see

**Route:** `/modules/visual-ai/how-image-models-see/`

**Structure:**
1. Orientation — "In Module 2, you learned how language models turn words into coordinates. Image models do something similar — but with pixels."
2. From text embeddings to image embeddings
   - Quick recap: vectors as learned coordinates (link back to Module 2 Lesson 2)
   - Image models learn a visual latent space: similar images cluster together
   - `latent-space-landscape-v1.webp`
3. What "style" means to a model
   - Designers think about style as a coherent visual identity
   - Models encounter style as statistical patterns: texture frequencies, color distributions, stroke characteristics
   - This is why "in the style of" prompts work — and why they produce approximations, not copies
4. What "composition" means in vector space
   - Spatial relationships are encoded as relative positions in the image tensor
   - Why detailed spatial prompts ("subject on the left, negative space on the right") often get ignored — the model's spatial reasoning is approximate
5. Why specificity wins
   - Concrete details give the model better coordinates
   - Abstract descriptions ("professional," "modern," "clean") map to the statistical average of training data — which is generic
   - The specificity ladder (from data file) as a teaching example
6. Closing callout — "The model does not see what you see. It works from patterns in its training data. Your job is to describe what you want in terms close enough to those patterns. Next: how to write prompts that work."

**Estimated length:** 300–400 lines

### Lesson 2: Prompting for images

**Route:** `/modules/visual-ai/prompting-for-images/`

**Structure:**
1. Orientation — "This lesson is practical. You will learn a prompt structure, see real examples, and understand how to iterate."
2. Prompt anatomy
   - Subject: what is in the image
   - Style: what it looks like (illustration, photograph, watercolor, etc.)
   - Composition: framing, aspect ratio, negative space
   - Mood: lighting, color temperature, atmosphere
   - Technical: resolution, format, aspect ratio
   - Negative prompts: what to exclude
   - Each section as a `TonePanel` card with definition + example
3. Annotated examples
   - 8–10 generated illustrations from the source project, each displayed with:
     - The image
     - The prompt (documented original or labeled "approximate prompt — the original was not recorded")
     - Annotation: what the prompt gets right
     - Teaching point: what a student should learn from this example
   - Use the prompt example pairs from `visual-ai.ts`
4. Iteration patterns
   - **Refine:** same subject, adjust one parameter (style, lighting, composition)
   - **Vary:** keep the concept, change the approach entirely
   - **Extend:** use a successful image as a starting point for related images
   - "Iteration is normal. The first result is a Draft, not a final."
5. Common clichés to avoid
   - Generic corporate: suited figures shaking hands in front of glass buildings
   - Over-HDR: hyper-saturated landscapes that look like phone wallpapers
   - Uncanny faces: close-up portraits that fall into the uncanny valley
   - Tech-bro aesthetic: dark backgrounds with floating holographic UI elements
   - "If the image could belong to any website, it belongs to none."
6. Closing callout — "Good prompts are specific, honest about limitations, and tied to the page's actual needs. Next: when to use these images and when not to."

**Estimated length:** 400–500 lines

### Lesson 3: When to generate and when to photograph

**Route:** `/modules/visual-ai/editorial-judgment/`

**Structure:**
1. Orientation — "You now know how to prompt for images. The harder question is whether you should."
2. The trust test
   - Connection to the tour's proof framework: "Proof means real evidence, not beautiful fiction."
   - A generated image cannot be proof of anything. It is illustration, decoration, or concept art.
   - If the image claims to show a real person, place, or event, it must be real.
3. When generation is appropriate
   - Concept illustrations (like the era images in Module 2 — no one thinks those are photographs)
   - Decorative heroes that set a mood without making factual claims
   - Mood boards and direction explorations during the Style step
   - Placeholder art during development (replaced before publish)
   - Pattern textures, abstract backgrounds, typographic compositions
4. When generation is not appropriate
   - Testimonial photos (a generated face claiming to be a real customer is deceptive)
   - Product shots (a generated image of a product that does not match reality is misleading)
   - Team photos (generated team members are fabricated identity)
   - Documentary images (a generated image of an event that did not happen is misinformation)
   - Proof elements (generated portfolio pieces, fake case studies)
5. The editorial judgment rubric
   - Display the rubric from `visual-ai.ts` as a checklist
   - Apply it to 3 concrete scenarios with correct/incorrect answers
6. Quality threshold
   - "A low-quality generated image hurts more than no image."
   - When to use negative space, typography, or a simple gradient instead
   - "The best hero image is one that helps the first read. If the generated image distracts from the message, remove it."
7. Closing callout — "Generation is a tool, not a shortcut. Use it when it serves the page. Skip it when it undermines trust."

**Estimated length:** 300–400 lines

### Practice page

**Route:** `/modules/visual-ai/practice/`

- Task: generate 3 hero images for a sample site (use the student's own site or a provided brief)
- For each image:
  - Write the prompt (using the anatomy from Lesson 2)
  - Generate the image
  - Annotate: what worked, what did not, what you would change
  - Apply the editorial judgment rubric: should this image be used?
- Submission: 3 images + 3 prompts + 3 annotations + 3 rubric evaluations

**Estimated length:** 100–150 lines

### Checkpoint page

**Route:** `/modules/visual-ai/checkpoint/`

- Peer review: exchange images and prompts with a classmate
- Review questions:
  - Does the image match the site's archetype and tone?
  - Is the prompt specific enough that you could reproduce something similar?
  - Would a visitor trust this image, or would it feel fake?
  - Does the image help the first read, or does it compete with the text?
- Studio question: "Would you put your name on this page with this image?"

**Estimated length:** 100–150 lines

## File creation list

| File | Type |
| --- | --- |
| `lib/module-content/visual-ai.ts` | data |
| `app/modules/visual-ai/page.tsx` | route |
| `app/modules/visual-ai/how-image-models-see/page.tsx` | route |
| `app/modules/visual-ai/prompting-for-images/page.tsx` | route |
| `app/modules/visual-ai/editorial-judgment/page.tsx` | route |
| `app/modules/visual-ai/practice/page.tsx` | route |
| `app/modules/visual-ai/checkpoint/page.tsx` | route |

## Acceptance criteria

- [ ] All pages render with correct visual hierarchy
- [ ] Prompt example cards show image + prompt text + annotation
- [ ] Specificity ladder shows 3 prompt versions with results
- [ ] Editorial judgment rubric renders as a usable checklist
- [ ] Generated illustrations from `public/media/modules/generated/` display correctly
- [ ] Cross-link to Module 2 Lesson 2 works
- [ ] Cross-link to `/tour/proof` works
- [ ] All content reads in workshop-companion voice
- [ ] Every paragraph passes the tone test: "Would a student in week 8 read past this sentence without hesitating?"
- [ ] Approximate prompts are clearly labeled where applicable
- [ ] `npx tsc --noEmit` passes
- [ ] Smoke-render tests for all new pages
