import type { Metadata } from "next";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { GuidedStepShell } from "@/components/guided-step-shell";
import { RouteVisualPanel } from "@/components/route-visual-panel";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import { routeVisualPlans } from "@/lib/route-imagery";
import {
  buildTourRecordEntries,
  getGuidedTourStep,
  guidedTourRecordExamples,
} from "@/lib/site-navigation";
import {
  workbookMuseumPrompts,
  workbookPairReviewPrompts,
  workbookPortfolioPrompts,
} from "@/lib/web-presence-site-content";

const step = getGuidedTourStep("signal");

const portfolioPrompts = workbookPortfolioPrompts.filter((prompt) =>
  ["Audience", "Need", "Promise"].includes(prompt.title),
);

const museumPrompts = workbookMuseumPrompts.filter((prompt) =>
  ["Subject", "Ideal visitor", "First 10 seconds"].includes(prompt.title),
);

export const metadata: Metadata = {
  title: step.publicLabel,
};

export default function TourSignalPage() {
  return (
    <GuidedStepShell
      eyebrow="Signal step"
      title="Figure out who the page is for, what they need, and what they should get right away."
      summary="Start simple. Pick one real person, name the problem they have, and say what your page should make clear fast."
      status="Required in tour"
      prerequisite={step.prerequisite}
      output={step.output}
      currentStepId="signal"
      recordEntries={buildTourRecordEntries(guidedTourRecordExamples.signal, step.recordFields)}
      heroVisual={<RouteVisualPanel plan={routeVisualPlans.signal} />}
      actions={[
        {
          href: "/tour/archetype",
          label: "Next: pick the vibe",
        },
        {
          href: "/examples/module",
          label: "See a quick page opener",
          kind: "secondary",
        },
      ]}
      misconception={
        <p>
          Do not use giant categories like &ldquo;people in tech&rdquo; or &ldquo;museum visitors.&rdquo; That is too
          vague to guide a real first screen.
        </p>
      }
      formativeCheck={
        <p>
          Ask another person who they think the page is for and what problem it solves. If they
          cannot answer both, your brief is still too vague.
        </p>
      }
    >
      <section className="space-y-6">
        <SectionHeading
          eyebrow="One real person"
          title="Start with one person, one problem, and one promise."
          body="Use these prompts to write the smallest brief that can still guide the first screen of the page."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Portfolio prompts</p>
            <div className="mt-4 space-y-4">
              {portfolioPrompts.map((prompt) => (
                <div key={prompt.title}>
                  <h2 className="type-concept text-(--ink-strong)">{prompt.title}</h2>
                  <p className="mt-2 type-body text-(--ink-body)">{prompt.summary}</p>
                  {prompt.example ? (
                    <p className="mt-2 type-caption text-(--signal)">
                      <strong>Example:</strong> {prompt.example}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </TonePanel>
          <TonePanel tone="proof" className="p-6">
            <p className="type-meta text-(--accent-strong)">Museum prompts</p>
            <div className="mt-4 space-y-4">
              {museumPrompts.map((prompt) => (
                <div key={prompt.title}>
                  <h2 className="type-concept text-(--ink-strong)">{prompt.title}</h2>
                  <p className="mt-2 type-body text-(--ink-body)">{prompt.summary}</p>
                </div>
              ))}
            </div>
          </TonePanel>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Read it back"
          title="If someone else reads it and gets it, you are on track."
          body="These prompts are simple on purpose. They help you check whether the brief is specific enough to shape the next step."
        />
        <ContentGrid minCardWidth="17rem">
          {workbookPairReviewPrompts.slice(0, 3).map((prompt) => (
            <TonePanel key={prompt} tone="synthesis" className="p-6">
              <p className="type-body text-(--ink-body)">{prompt}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <CalloutBand
        label="Why this matters"
        title="This step sets the first screen."
        tone="next"
      >
        <p>
          Once the audience, problem, and promise are clear, the headline, proof, visual
          direction, and call to action have something to follow.
        </p>
      </CalloutBand>
    </GuidedStepShell>
  );
}