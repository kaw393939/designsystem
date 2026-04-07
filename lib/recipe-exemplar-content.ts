import type { EducationalUnitSpec } from "@/lib/educational-contracts";
import type { PanelTone } from "@/lib/theme-tokens";

export const recipeGuideNotes: Array<{
  title: string;
  tone: PanelTone;
  summary: string;
}> = [
  {
    title: "Dedicated recipe pages are ready to borrow.",
    tone: "proof",
    summary:
      "The recipes guide is no longer just theory. These exemplar pages give you real flows you can open, study, and adapt.",
  },
  {
    title: "The block order is there so the page does not drift.",
    tone: "emphasis",
    summary:
      "The checks keep lesson and concept pages from wandering into improvised structure when the content gets dense.",
  },
  {
    title: "Start with the checked-in examples, then make them yours.",
    tone: "reading",
    summary:
      "The current units are solid starting points while the broader release workflow keeps growing.",
  },
];

export const recipeExemplarCards: Array<{
  title: string;
  href: string;
  tone: PanelTone;
  summary: string;
}> = [
  {
    title: "Feedback Loops Concept Page",
    href: "/recipes/feedback-loops",
    tone: "synthesis",
    summary:
      "Use this when you need a concept page with a clean definition, one worked example, and a real next move.",
  },
  {
    title: "Public Square Lesson Page",
    href: "/recipes/public-space-observation",
    tone: "reading",
    summary:
      "Use this when you need a lesson page that moves from observation to claim without turning into a wall of notes.",
  },
];

export const conceptRecipeUnit: EducationalUnitSpec = {
  id: "recipe-concept-feedback-loops",
  kind: "concept",
  recipe: "concept-explainer",
  title:
    "A feedback loop changes what happens next, not just what happened before.",
  summary:
    "Use this concept page when you need to explain a feedback loop without making it sound abstract.",
  blocks: [
    {
      type: "hero",
      eyebrow: "Concept page",
      title:
        "A feedback loop changes what happens next, not just what happened before.",
      dek: "Start with the simplest version: something happens, that result comes back, and it changes what happens next.",
      metadata: [
        { label: "Page type", value: "Concept explainer" },
        { label: "Reading time", value: "7 minutes" },
      ],
      actions: [
        {
          label: "Jump to the definition",
          href: "#definition",
          kind: "secondary",
        },
        {
          label: "Skip to the worked example",
          href: "#worked-example",
          kind: "secondary",
        },
      ],
      visualRef: {
        visualRef: "feedback-loop-park-system",
        alt: "Placeholder diagram showing one result feeding back into the next decision point",
        caption: "Feedback loop map",
      },
    },
    {
      type: "whyItMatters",
      title: "Why this matters",
      summary:
        "People notice the event and miss the loop underneath.",
      stakes:
        "Once you can see the loop, you can explain why small changes keep showing up instead of treating everything like a one-off.",
      audience: "Useful in ecology, policy, design, and public-space analysis.",
      links: [
        {
          label: "Compare nearby ideas",
          href: "#comparison",
          kind: "secondary",
        },
      ],
    },
    {
      type: "section",
      id: "definition",
      eyebrow: "Definition",
      title: "A loop exists when an outcome returns to shape a later input.",
      summary:
        "That returned signal can push the pattern harder or keep it in range.",
      body: "A feedback loop is not just repetition. It is a relationship across time. Something happens, that result becomes information or pressure, and that returned signal changes what happens next. Once you see that move, you can distinguish a true loop from a simple chain of unrelated events.",
      tone: "reading",
    },
    {
      type: "comparisonGrid",
      id: "comparison",
      title: "A loop is not the same as a chain or a trend.",
      legend:
        "They can look similar on the surface, but they answer different questions.",
      caption: "Concept distinctions for novice readers",
      columns: [
        { key: "loop", label: "Feedback loop" },
        { key: "chain", label: "Cause chain" },
        { key: "trend", label: "Trend" },
      ],
      rows: [
        {
          label: "Key test",
          cells: [
            "The earlier result returns to shape what happens next.",
            "One event leads to another without a returned signal.",
            "A pattern changes over time, but the mechanism may still be unknown.",
          ],
        },
        {
          label: "Best teaching use",
          cells: [
            "Explain escalation, stability, or correction inside a system.",
            "Explain sequence and immediate consequence.",
            "Describe visible change before explaining why it happens.",
          ],
        },
        {
          label: "Common mistake",
          cells: [
            "Calling any repeated pattern a loop without locating the returned signal.",
            "Treating a long chain as a system even when nothing feeds back.",
            "Mistaking surface change for explanation.",
          ],
        },
      ],
    },
    {
      type: "workedExample",
      id: "worked-example",
      title: "Worked example",
      prompt:
        "Picture a shaded public square where benches fill fast at lunch.",
      steps: [
        {
          title: "Step 1: The square sends a signal.",
          body: "People see which benches still have shade and move toward those spots first.",
        },
        {
          title: "Step 2: The signal changes the next condition.",
          body: "As the shaded benches fill, newcomers start clustering near the same path edges and tree cover.",
        },
        {
          title: "Step 3: The pattern becomes teachable.",
          body: "The earlier result, visible crowding under shade, now changes later decisions about where people wait or gather.",
          outcome:
            "Now you can point to the returned signal instead of only describing crowd movement.",
        },
      ],
      result:
        "If the example works, you can say what came back into the system and what it changed.",
      reflection:
        "Ask what evidence would prove this is a loop rather than a one-time crowding event.",
      visualRef: {
        visualRef: "shade-bench-diagram",
        alt: "Placeholder diagram showing shaded benches influencing later movement through a square",
        caption: "Shaded-square example",
        credit: "Sprint 4 concept exemplar",
      },
    },
    {
      type: "summaryGrid",
      id: "takeaways",
      title: "Keep these three checks in your head.",
      items: [
        {
          title: "Look for a returned signal",
          takeaway:
            "If nothing comes back to shape the next condition, you may be looking at a chain, not a loop.",
        },
        {
          title: "Separate pattern from explanation",
          takeaway:
            "A visible trend can hint at a loop, but the mechanism still has to be named.",
        },
        {
          title: "Use one bounded example",
          takeaway:
            "A tight public-space example often teaches the loop more clearly than a giant abstract system map.",
        },
      ],
    },
    {
      type: "sourceAnchorGrid",
      id: "sources",
      title: "Sources and further reading",
      summary:
        "End with sources that actually help, not filler.",
      items: [
        {
          title: "Systems primer for novice readers",
          description:
            "Short introduction to reinforcing and balancing feedback written for non-specialists.",
          href: "https://example.com/systems-primer",
          type: "Guide",
        },
        {
          title: "Public-space behavior note",
          description:
            "Observation-focused case note on how visible cues change later movement patterns.",
          href: "https://example.com/public-space-note",
          type: "Case note",
          note: "Useful when moving from concept into lesson work.",
        },
      ],
    },
    {
      type: "nextStep",
      id: "next-step",
      title: "Try the same idea inside a lesson.",
      summary:
        "The companion lesson turns the same systems lens into a guided observation task with practice and reflection.",
      primaryAction: {
        label: "Open the lesson page",
        href: "/recipes/public-space-observation",
        kind: "primary",
      },
      secondaryAction: {
        label: "Back to recipe guide",
        href: "/recipes",
        kind: "secondary",
      },
      context:
        "Concept pages can end with action even when the source section appears just above it.",
    },
  ],
};

export const lessonRecipeUnit: EducationalUnitSpec = {
  id: "recipe-lesson-public-space-observation",
  kind: "lesson",
  recipe: "lesson-page",
  title: "How to read a public square like a system.",
  summary:
    "Use this lesson when you need to turn raw observation into a claim you can actually defend.",
  blocks: [
    {
      type: "hero",
      eyebrow: "Lesson page",
      title: "How to read a public square like a system.",
      dek: "Notice cues, track the repeat, then test one grounded explanation before you reflect.",
      metadata: [
        { label: "Page type", value: "Lesson" },
        { label: "Time", value: "10 minutes" },
        {
          label: "Outcome",
          value: "Describe one repeated public-space pattern with evidence.",
        },
      ],
      actions: [
        { label: "Jump to cue work", href: "#cue-hunt", kind: "secondary" },
        { label: "Skip to reflection", href: "#reflection", kind: "secondary" },
      ],
      visualRef: {
        visualRef: "public-square-overview",
        alt: "Placeholder overview diagram of a public square with paths, benches, and tree cover",
        caption: "Public square overview",
      },
    },
    {
      type: "whyItMatters",
      title: "Why this matters",
      summary:
        "It is easy to collect notes and still miss the pattern.",
      stakes:
        "A good sequence helps you choose evidence, explain behavior, and admit uncertainty without collapsing into vibes.",
      audience:
        "Useful for studio courses, public-interest design, and observational writing.",
      links: [
        {
          label: "See the worked example",
          href: "#worked-example",
          kind: "secondary",
        },
      ],
    },
    {
      type: "section",
      id: "cue-hunt",
      eyebrow: "Step 1",
      title: "Start by naming cues, not just people.",
      summary: "What in the square seems to guide the next move?",
      body: "A cue can be shade, noise, visibility, edge conditions, benches, signage, or even the density of other people. The first job is not to explain motivation. It is to notice what in the environment might be shaping later decisions.",
      tone: "reading",
    },
    {
      type: "section",
      id: "pattern-building",
      eyebrow: "Step 2",
      title: "Track one repeated choice before you name the pattern.",
      summary:
        "Track the repeat before you explain it.",
      body: "Watch for one repeated behavior such as where people pause, which path edges they prefer, or how they choose seating. Record only enough detail to support that pattern. When the same move appears several times, the lesson can shift from noticing into explanation.",
      tone: "reading",
    },
    {
      type: "workedExample",
      id: "worked-example",
      title: "Worked example",
      prompt:
        "A lunch crowd crosses the square from the transit stop toward a row of shaded benches.",
      steps: [
        {
          title: "Observe the first movement",
          body: "Several people angle toward the tree line instead of crossing the open center of the square.",
        },
        {
          title: "Identify the cue",
          body: "Shade and a clear bench edge create a more comfortable and legible route than the exposed middle.",
        },
        {
          title: "Turn the note into a claim",
          body: "The square is not just busy. It is guiding people toward a cooler, more readable path at the same time each day.",
          outcome:
            "Now you can see how a thin observation becomes a bounded explanation.",
        },
      ],
      result:
        "The point is to turn a thin observation into a claim you can defend.",
      visualRef: {
        visualRef: "public-square-route-diagram",
        alt: "Placeholder diagram showing pedestrian flow favoring the shaded edge of a square",
        caption: "Route and shade diagram",
        credit: "Sprint 4 lesson exemplar",
      },
    },
    {
      type: "summaryGrid",
      id: "takeaways",
      title: "Carry these three moves into your own observation.",
      items: [
        {
          title: "Name the cue",
          takeaway:
            "Start with the environmental signal before you infer motive or intention.",
        },
        {
          title: "Choose one pattern",
          takeaway:
            "A lesson stays readable when it follows one repeated choice instead of every possible detail.",
        },
        {
          title: "Write one bounded claim",
          takeaway:
            "Turn the notes into a sentence you could defend with direct evidence.",
        },
      ],
    },
    {
      type: "reflectionPrompt",
      id: "reflection",
      title: "Reflection",
      prompt:
        "What part of your explanation comes directly from observation, and what part still needs stronger evidence?",
      questions: [
        "Which cue most clearly changed the next move in the square?",
        "What competing explanation would you still want to test?",
      ],
      mode: "write",
      timeEstimate: "4 minutes",
    },
    {
      type: "sourceAnchorGrid",
      id: "sources",
      title: "Method sources",
      summary: "End with method support, not filler.",
      items: [
        {
          title: "Observation checklist",
          description:
            "Short field-observation checklist for cue spotting, pattern selection, and note discipline.",
          href: "https://example.com/observation-checklist",
          type: "Method",
        },
        {
          title: "Public-space case note",
          description:
            "Applied example showing how small spatial signals produce repeatable movement choices.",
          href: "https://example.com/public-space-case",
          type: "Case note",
          note: "Useful after you complete a first pass on your own.",
        },
      ],
    },
    {
      type: "nextStep",
      id: "next-step",
      title: "Keep going",
      summary:
        "Open the concept page if you want the systems language, or jump back to recipes if you want the page pattern.",
      primaryAction: {
        label: "Open the concept page",
        href: "/recipes/feedback-loops",
        kind: "primary",
      },
      secondaryAction: {
        label: "Back to recipe guide",
        href: "/recipes",
        kind: "secondary",
      },
      context: "Lesson pages should still end with one clear next move.",
    },
  ],
};

export const conceptRecipeExemplar = {
  route: "/recipes/feedback-loops",
  progress: "Sprint 4 concept exemplar",
  tocTitle: "Concept page",
  unit: conceptRecipeUnit,
} as const;

export const lessonRecipeExemplar = {
  route: "/recipes/public-space-observation",
  progress: "Sprint 4 lesson exemplar",
  tocTitle: "Lesson page",
  unit: lessonRecipeUnit,
} as const;
