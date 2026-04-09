import type { PanelTone } from "@/lib/theme-tokens";

export type SiteRouteStatus =
  | "Entry"
  | "Required in tour"
  | "Recommended support"
  | "Optional reference"
  | "Instructor only"
  | "Wrapper-specific";

export type SitePrimaryNavItem = {
  id: string;
  href: string;
  label: string;
  matchHrefs?: readonly string[];
};

export type SiteEntryIntent = {
  id: string;
  title: string;
  summary: string;
  href: string;
  actionLabel: string;
  tone: PanelTone;
  status: SiteRouteStatus;
};

export type SiteRouteFamilyCard = {
  id: string;
  title: string;
  summary: string;
  job: string;
  href: string;
  actionLabel: string;
  tone: PanelTone;
  status: SiteRouteStatus;
};

export type GuidedTourStepId =
  | "signal"
  | "archetype"
  | "style"
  | "proof"
  | "build"
  | "publish";

export type TourRecordFieldId =
  | "audience"
  | "need"
  | "signal"
  | "visual-direction"
  | "proof-plan"
  | "build-brief"
  | "publish-asset";

export type GuidedTourStep = {
  id: GuidedTourStepId;
  href: string;
  publicLabel: string;
  summary: string;
  prerequisite: string;
  output: string;
  recordFields: readonly TourRecordFieldId[];
  supportHref?: string;
  supportLabel?: string;
};

export type TourRecordEntry = {
  id: TourRecordFieldId;
  label: string;
  value?: string;
  placeholder: string;
  isCurrent?: boolean;
};

export type TourRecordValues = Partial<Record<TourRecordFieldId, string>>;

export type BrowseRoomCard = {
  id: string;
  title: string;
  summary: string;
  href: string;
  actionLabel: string;
  tone: PanelTone;
  status: SiteRouteStatus;
  useWhen: string;
  whatChanges: string;
  guidedStepLabel: string;
  returnHref: string;
  returnLabel: string;
  relatedHref: string;
  relatedLabel: string;
  heroObject: string;
};

export type ExampleSurfaceCategory = "Outcome proof" | "Structural example";

export type ExampleSurfaceCard = {
  id: string;
  title: string;
  summary: string;
  href: string;
  actionLabel: string;
  tone: PanelTone;
  status: SiteRouteStatus;
  category: ExampleSurfaceCategory;
  shows: string;
  feedsBackTo: string;
  returnHref: string;
  returnLabel: string;
};

export const primarySiteTitle = "Web Presence Workshop";

export const primarySiteDescription =
  "A step-by-step guide for building a clear public-facing site, with extra rooms and examples when you need them.";

export const primarySiteEyebrow = "Step-by-step build path + extra help";

export const primarySiteCaption =
  "Figure out your message, choose the look, add proof, and publish without getting lost.";

export const siteRouteStatusMeta: Record<
  SiteRouteStatus,
  { description: string; tone: PanelTone }
> = {
  Entry: {
    description: "The starting point of the site.",
    tone: "emphasis",
  },
  "Required in tour": {
    description: "Part of the main guided path.",
    tone: "next",
  },
  "Recommended support": {
    description: "Useful support linked from the tour.",
    tone: "proof",
  },
  "Optional reference": {
    description: "Extra depth and review material, not required to keep going.",
    tone: "synthesis",
  },
  "Instructor only": {
    description: "Teaching and facilitation tools, not part of the student path.",
    tone: "reflection",
  },
  "Wrapper-specific": {
    description: "Course- or cohort-specific pages added on top of the main tour.",
    tone: "warning",
  },
};

export const primarySiteNavItems: readonly SitePrimaryNavItem[] = [
  {
    id: "start",
    href: "/",
    label: "Start",
  },
  {
    id: "tour",
    href: "/tour",
    label: "Tour",
    matchHrefs: ["/tour", "/playbook", "/workbook", "/deliverables"],
  },
  {
    id: "modules",
    href: "/modules",
    label: "Modules",
    matchHrefs: ["/modules"],
  },
  {
    id: "browse",
    href: "/browse",
    label: "Browse",
    matchHrefs: ["/browse", "/archetypes", "/design-styles", "/persuasion"],
  },
  {
    id: "examples",
    href: "/examples",
    label: "Examples",
    matchHrefs: ["/examples", "/hero-examples"],
  },
  {
    id: "instructor",
    href: "/instructor-guide",
    label: "Instructor",
  },
] as const;

export const siteEntryIntents: readonly SiteEntryIntent[] = [
  {
    id: "first-time-student",
    title: "Start my site",
    summary:
      "Use the guided path if you are starting from scratch or stuck on what to do next.",
    href: "/tour/signal",
    actionLabel: "Start my site",
    tone: "emphasis",
    status: "Entry",
  },
  {
    id: "returning-builder",
    title: "Jump back in",
    summary:
      "Go straight to the build step if you already know the process and just want to keep moving.",
    href: "/tour/build",
    actionLabel: "Jump back in",
    tone: "next",
    status: "Required in tour",
  },
  {
    id: "reference-browser",
    title: "Browse extra help",
    summary:
      "Open the rooms when you want comparisons, examples, or extra explanation without leaving the main path for good.",
    href: "/browse",
    actionLabel: "Browse extra help",
    tone: "synthesis",
    status: "Optional reference",
  },
  {
    id: "course-modules",
    title: "Follow the full course",
    summary:
      "Work through the semester path from framework to professional practice, with AI foundations, prompting, and proof along the way.",
    href: "/modules",
    actionLabel: "Open course modules",
    tone: "next",
    status: "Required in tour",
  },
  {
    id: "instructor",
    title: "Teach this in class",
    summary:
      "Use the teacher version if you are leading students through the same process and need prompts, pacing, and watch-fors.",
    href: "/instructor-guide",
    actionLabel: "Teach this in class",
    tone: "reflection",
    status: "Instructor only",
  },
] as const;

export const siteRouteFamilies: readonly SiteRouteFamilyCard[] = [
  {
    id: "start",
    title: "Start",
    summary:
      "The homepage helps you figure out whether you should start fresh, jump back in, browse, or teach.",
    job: "Point you to the right path fast.",
    href: "/",
    actionLabel: "Open start",
    tone: "emphasis",
    status: "Entry",
  },
  {
    id: "tour",
    title: "Tour",
    summary:
      "The guided path walks you from who the page is for to something you can actually publish.",
    job: "Walk you through the main build steps.",
    href: "/tour",
    actionLabel: "Open the tour",
    tone: "next",
    status: "Required in tour",
  },
  {
    id: "browse",
    title: "Browse",
    summary:
      "The rooms give you extra examples, comparisons, and deeper breakdowns without replacing the main path.",
    job: "Give you optional depth and a clear way back.",
    href: "/browse",
    actionLabel: "Open browse",
    tone: "synthesis",
    status: "Optional reference",
  },
  {
    id: "examples",
    title: "Examples",
    summary:
      "Examples show what good proof and finished pages actually look like instead of acting like random inspiration.",
    job: "Show real outcomes and point back to the step they help.",
    href: "/examples",
    actionLabel: "Open examples",
    tone: "proof",
    status: "Recommended support",
  },
  {
    id: "instructor",
    title: "Instructor",
    summary:
      "The instructor layer keeps the teacher notes separate from the student path.",
    job: "Support teaching without cluttering the student flow.",
    href: "/instructor-guide",
    actionLabel: "Open instructor guide",
    tone: "reflection",
    status: "Instructor only",
  },
] as const;

export const guidedTourSteps: readonly GuidedTourStep[] = [
  {
    id: "signal",
    href: "/tour/signal",
    publicLabel: "Figure out who it is for",
    summary: "Name the person, the problem, and what they should get right away.",
    prerequisite: "Pick the path that matches where you are right now.",
    output: "A short note about the audience, problem, and promise.",
    recordFields: ["audience", "need"],
    supportHref: "/examples/module",
    supportLabel: "See a quick page opener",
  },
  {
    id: "archetype",
    href: "/tour/archetype",
    publicLabel: "Pick the vibe",
    summary: "Choose the overall vibe people should get first and make sure it fits the audience.",
    prerequisite: "A clear audience and promise.",
    output: "One main vibe with a reason it fits.",
    recordFields: ["signal"],
    supportHref: "/browse/archetypes",
    supportLabel: "Compare vibe options",
  },
  {
    id: "style",
    href: "/tour/style",
    publicLabel: "Choose the look",
    summary: "Pick a visual direction that matches the vibe instead of fighting it.",
    prerequisite: "A chosen vibe and promise.",
    output: "A visual direction, layout notes, and what to avoid.",
    recordFields: ["visual-direction"],
    supportHref: "/browse/design-lineages",
    supportLabel: "Compare design directions",
  },
  {
    id: "proof",
    href: "/tour/proof",
    publicLabel: "Add proof people can trust",
    summary: "Decide what evidence needs to show up near the main claim.",
    prerequisite: "Your message, vibe, and visual direction.",
    output: "A proof plan and a next-step direction.",
    recordFields: ["proof-plan"],
    supportHref: "/browse/attention-trust",
    supportLabel: "Open the trust and proof room",
  },
  {
    id: "build",
    href: "/tour/build",
    publicLabel: "Turn it into a page",
    summary: "Turn the decisions into a page plan, audit notes, and a build brief.",
    prerequisite: "A clear proof plan.",
    output: "Build brief and revision checklist.",
    recordFields: ["build-brief"],
    supportHref: "/examples/student-exemplars",
    supportLabel: "See finished student examples",
  },
  {
    id: "publish",
    href: "/tour/publish",
    publicLabel: "Put it live",
    summary: "Publish the page, see what lands, and decide what to fix next.",
    prerequisite: "A build brief and a working draft.",
    output: "A live link, review plan, and next fix.",
    recordFields: ["publish-asset"],
    supportHref: "/examples",
    supportLabel: "See public proof examples",
  },
] as const;

const tourRecordBlueprint: readonly TourRecordEntry[] = [
  {
    id: "audience",
    label: "Audience",
    placeholder: "Not named yet.",
  },
  {
    id: "need",
    label: "Need",
    placeholder: "Not written yet.",
  },
  {
    id: "signal",
    label: "Signal",
    placeholder: "Not chosen yet.",
  },
  {
    id: "visual-direction",
    label: "Visual direction",
    placeholder: "Not chosen yet.",
  },
  {
    id: "proof-plan",
    label: "Proof plan",
    placeholder: "Not drafted yet.",
  },
  {
    id: "build-brief",
    label: "Build brief",
    placeholder: "Not assembled yet.",
  },
  {
    id: "publish-asset",
    label: "Publish asset",
    placeholder: "Not shipped yet.",
  },
] as const;

export function buildTourRecordEntries(
  values: TourRecordValues = {},
  currentFields: readonly TourRecordFieldId[] = [],
): TourRecordEntry[] {
  const currentFieldSet = new Set(currentFields);

  return tourRecordBlueprint.map((entry) => ({
    ...entry,
    value: values[entry.id],
    isCurrent: currentFieldSet.has(entry.id),
  }));
}

export const initialTourRecord = buildTourRecordEntries();

export const guidedTourRecordExamples: Record<GuidedTourStepId, TourRecordValues> = {
  signal: {
    audience:
      "A founder hiring a second engineer who needs fast evidence of judgment and clarity.",
    need:
      "Needs confidence that the page owner can turn complex work into readable outcomes.",
  },
  archetype: {
    audience:
      "A founder hiring a second engineer who needs fast evidence of judgment and clarity.",
    need:
      "Needs confidence that the page owner can turn complex work into readable outcomes.",
    signal: "Sage-primary with a measured Hero edge.",
  },
  style: {
    audience:
      "A founder hiring a second engineer who needs fast evidence of judgment and clarity.",
    need:
      "Needs confidence that the page owner can turn complex work into readable outcomes.",
    signal: "Sage-primary with a measured Hero edge.",
    "visual-direction": "Swiss grid with warm editorial contrast and one decisive proof cue.",
  },
  proof: {
    audience:
      "A founder hiring a second engineer who needs fast evidence of judgment and clarity.",
    need:
      "Needs confidence that the page owner can turn complex work into readable outcomes.",
    signal: "Sage-primary with a measured Hero edge.",
    "visual-direction": "Swiss grid with warm editorial contrast and one decisive proof cue.",
    "proof-plan": "Show one shipped system, one outcome, and one method note near the promise.",
  },
  build: {
    audience:
      "A founder hiring a second engineer who needs fast evidence of judgment and clarity.",
    need:
      "Needs confidence that the page owner can turn complex work into readable outcomes.",
    signal: "Sage-primary with a measured Hero edge.",
    "visual-direction": "Swiss grid with warm editorial contrast and one decisive proof cue.",
    "proof-plan": "Show one shipped system, one outcome, and one method note near the promise.",
    "build-brief": "Turn the signal and proof plan into a one-page portfolio with visible receipts and one clear CTA.",
  },
  publish: {
    audience:
      "A founder hiring a second engineer who needs fast evidence of judgment and clarity.",
    need:
      "Needs confidence that the page owner can turn complex work into readable outcomes.",
    signal: "Sage-primary with a measured Hero edge.",
    "visual-direction": "Swiss grid with warm editorial contrast and one decisive proof cue.",
    "proof-plan": "Show one shipped system, one outcome, and one method note near the promise.",
    "build-brief": "Turn the signal and proof plan into a one-page portfolio with visible receipts and one clear CTA.",
    "publish-asset": "Live URL, 30-second spoken opener, and one next-test hypothesis.",
  },
};

export function getGuidedTourStep(stepId: GuidedTourStepId): GuidedTourStep {
  const step = guidedTourSteps.find((guidedStep) => guidedStep.id === stepId);

  if (!step) {
    throw new Error(`Unknown guided tour step: ${stepId}`);
  }

  return step;
}

export const browseRoomCards: readonly BrowseRoomCard[] = [
  {
    id: "browse-archetypes",
    title: "Archetypes",
    summary:
      "Compare the main vibe options in one place before you lock anything in.",
    href: "/browse/archetypes",
    actionLabel: "Open the archetypes room",
    tone: "synthesis",
    status: "Recommended support",
    useWhen: "You want to compare a few different vibes before you decide how the page should come across.",
    whatChanges: "Which vibe leads the first impression and what would feel wrong for it.",
    guidedStepLabel: "Choosing the vibe",
    returnHref: "/tour/archetype",
    returnLabel: "Return to the archetype step",
    relatedHref: "/browse/design-lineages",
    relatedLabel: "Next related room: Design lineages",
    heroObject: "Vibe comparison board",
  },
  {
    id: "browse-design-lineages",
    title: "Design lineages",
    summary:
      "Compare visual directions without mistaking this room for the main style step.",
    href: "/browse/design-lineages",
    actionLabel: "Open design lineages",
    tone: "reading",
    status: "Recommended support",
    useWhen: "You know the vibe but need help choosing how clean, loud, or tense the page should feel.",
    whatChanges: "Typography, layout, imagery, and how much visual tension the page can handle.",
    guidedStepLabel: "Choosing the look",
    returnHref: "/tour/style",
    returnLabel: "Return to the style step",
    relatedHref: "/browse/attention-trust",
    relatedLabel: "Next related room: Attention and trust",
    heroObject: "Design direction board",
  },
  {
    id: "browse-attention-trust",
    title: "Attention and trust",
    summary:
      "Look at trust, proof, and persuasion in one room that sends you straight back to the proof step.",
    href: "/browse/attention-trust",
    actionLabel: "Open attention and trust",
    tone: "proof",
    status: "Recommended support",
    useWhen: "You need to figure out why the page is not feeling believable or why the next step is falling flat.",
    whatChanges: "Where proof goes, how the next step sounds, and what evidence needs to show up fast.",
    guidedStepLabel: "Adding proof and tightening the next move",
    returnHref: "/tour/proof",
    returnLabel: "Return to the proof step",
    relatedHref: "/examples/proof-blocks",
    relatedLabel: "Next related example: Proof blocks",
    heroObject: "Trust and proof comparison board",
  },
  {
    id: "browse-sources",
    title: "Sources",
    summary:
      "Follow the research trail without turning the whole room into a lesson.",
    href: "/browse/sources",
    actionLabel: "Open sources",
    tone: "reflection",
    status: "Optional reference",
    useWhen: "You want to check where a claim or idea came from before you reuse it.",
    whatChanges: "Which sources you trust enough to quote, cite, or build from.",
    guidedStepLabel: "Checking where a claim came from",
    returnHref: "/tour/proof",
    returnLabel: "Return to the proof step",
    relatedHref: "/browse/attention-trust",
    relatedLabel: "Next related room: Attention and trust",
    heroObject: "Source trail board",
  },
] as const;

export const exampleSurfaceCards: readonly ExampleSurfaceCard[] = [
  {
    id: "examples-proof-blocks",
    title: "Proof blocks",
    summary:
      "Study before-and-after proof sections to see how evidence and CTA changes affect trust.",
    href: "/examples/proof-blocks",
    actionLabel: "Open proof anatomy",
    tone: "proof",
    status: "Recommended support",
    category: "Outcome proof",
    shows: "How proof placement and clearer evidence make a claim feel more believable.",
    feedsBackTo: "Proof sections, CTA copy, and evidence placement.",
    returnHref: "/tour/proof",
    returnLabel: "Return to the proof step",
  },
  {
    id: "examples-student-exemplars",
    title: "Student exemplars",
    summary:
      "Look at full student outcomes with the decisions still visible, not just the polished final look.",
    href: "/examples/student-exemplars",
    actionLabel: "Open student exemplars",
    tone: "next",
    status: "Recommended support",
    category: "Outcome proof",
    shows: "How message, vibe, look, proof, build, and publish choices hold together in a finished page.",
    feedsBackTo: "Build and publish decisions.",
    returnHref: "/tour/build",
    returnLabel: "Return to the build step",
  },
  {
    id: "examples-lesson",
    title: "Lesson recipe example",
    summary:
      "Use the lesson example when you want to see a longer page stay readable and still guide the visitor clearly.",
    href: "/examples/lesson",
    actionLabel: "Open lesson example",
    tone: "synthesis",
    status: "Recommended support",
    category: "Structural example",
    shows: "How a longer page can keep clear sections, good pacing, and a visible next move.",
    feedsBackTo: "Build and structure decisions.",
    returnHref: "/examples",
    returnLabel: "Return to examples",
  },
  {
    id: "examples-module",
    title: "Module overview example",
    summary:
      "Use the module example when you need a page opener that makes sense fast.",
    href: "/examples/module",
    actionLabel: "Open module example",
    tone: "next",
    status: "Recommended support",
    category: "Structural example",
    shows: "How a page can orient someone quickly without dumping everything on them at once.",
    feedsBackTo: "Start-page and route-family framing.",
    returnHref: "/examples",
    returnLabel: "Return to examples",
  },
  {
    id: "examples-reading-map",
    title: "Reading-map example",
    summary:
      "Use the reading-map example when the page needs to guide someone through sources or related pages in a clear order.",
    href: "/examples/reading-map",
    actionLabel: "Open reading map",
    tone: "reading",
    status: "Recommended support",
    category: "Structural example",
    shows: "How to give someone a clear way in instead of a pile of links.",
    feedsBackTo: "Browse-room curation and next-step clarity.",
    returnHref: "/examples",
    returnLabel: "Return to examples",
  },
] as const;

export const outcomeProofExampleCards = exampleSurfaceCards.filter(
  (card) => card.category === "Outcome proof",
);

export const structuralExampleCards = exampleSurfaceCards.filter(
  (card) => card.category === "Structural example",
);