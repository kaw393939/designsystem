import {
  ConceptGrid,
  NextStepBlock,
  ReflectionPrompt,
  SequenceTimeline,
  SummaryGrid,
} from "@/components/educational-primitives";

import {
  assignmentDeliverableItems,
  assignmentLadderItems,
  buildLoopItems,
  outcomeItems,
  signalAuditItems,
} from "../content";
import {
  IdentityRouteShell,
  IdentityRouteUnavailable,
  isIdentityRouteActive,
} from "../route-shell";

const currentHref = "/experiences/identity-portfolio/build/";

export default function IdentityPortfolioBuildPage() {
  if (!isIdentityRouteActive(currentHref)) {
    return <IdentityRouteUnavailable title="Identity build step" />;
  }

  return (
    <IdentityRouteShell
      eyebrow="Step 4"
      title="Build the page stack without losing the signal"
      dek="Use the assignment ladder, the build-review loop, and the audit questions to turn the signal into an actual homepage, proof block, and clear next step."
      currentHref={currentHref}
      actions={[
        {
          label: "Continue to publish",
          href: "/experiences/identity-portfolio/publish/",
          kind: "primary",
        },
        {
          label: "Return to signal",
          href: "/experiences/identity-portfolio/signal/",
          kind: "secondary",
        },
      ]}
    >
      <SequenceTimeline
        title="From brief to live page"
        summary="Follow this sequence when the target is a finished page with a clear next step, not a full theory tour."
        mode="process"
        items={assignmentLadderItems}
      />

      <SummaryGrid
        title="Minimum outputs to leave with"
        items={assignmentDeliverableItems}
      />

      <SequenceTimeline
        title="Build-review loop"
        summary="This loop keeps the workflow from turning the page into polished mush."
        mode="process"
        items={buildLoopItems}
      />

      <ConceptGrid
        title="Use these six questions as a pre-publish checklist"
        summary="Before you ship, check whether the page is clear, proven, actionable, and still aligned with the signal."
        items={signalAuditItems}
        columns={3}
      />

      <SummaryGrid title="What you should leave with" items={outcomeItems} />

      <ReflectionPrompt
        title="Build checkpoint"
        mode="practice"
        prompt="Before you publish, make sure the signal and the next step are surviving contact with the real page."
        questions={[
          "Can a stranger name the signal after a quick scan of the hero and the first proof block?",
          "Is the strongest piece of work visible early enough to earn trust fast?",
          "Does the call to action make sense immediately after the proof?",
          "Did the visual direction and proof choice reinforce the same story?",
          "What part of the current page is still attractive but strategically vague?",
        ]}
        timeEstimate="15 minutes"
      />

      <NextStepBlock
        title="Now put the page into circulation"
        summary="The publish route turns the finished page into a note, a follow-up, and a repeat loop instead of leaving it trapped in one URL."
        context="A page is not done when it looks finished. It is done when it can survive a public read, ask for a next step, and start real conversations."
        primaryAction={{
          label: "Continue to publish",
          href: "/experiences/identity-portfolio/publish/",
          kind: "primary",
        }}
        secondaryAction={{
          label: "Open examples",
          href: "/experiences/identity-portfolio/examples/",
          kind: "secondary",
        }}
      />
    </IdentityRouteShell>
  );
}