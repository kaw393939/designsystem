import type { Metadata } from "next";
import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { ConceptGrid, SequenceTimeline } from "@/components/educational-primitives";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { RouteContextPanel } from "@/components/route-context-panel";
import { RouteStatusBadge } from "@/components/route-status-badge";
import { SectionHeading } from "@/components/section-heading";
import { SplitLayout } from "@/components/split-layout";
import { TonePanel } from "@/components/tone-panel";
import {
  museumAuditItems,
  portfolioAuditItems,
  proofBlockFields,
  studioReviewCriteria,
  webPresenceSystemSteps,
  workbookChecklist,
  workbookMuseumPrompts,
  workbookPairReviewPrompts,
  workbookPortfolioPrompts,
  workbookPrinciples,
} from "@/lib/web-presence-site-content";

export const metadata: Metadata = {
  title: "Workbook",
};

const sessionWorkflow = [
  {
    label: "Session 1",
    title: "Choose the signal",
    summary:
      "Narrow the archetype, write the portfolio brief, write the museum-site brief, and test both through pair review.",
  },
  {
    label: "Session 2",
    title: "Audit the live pages",
    summary:
      "Apply first-read principles, audit each page against the brief, then turn the gap into a proof block and a three-week spec plan.",
  },
];

export default function WorkbookPage() {
  return (
    <PageShell>
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <RouteStatusBadge status="Wrapper-specific" />
          <p className="mt-4 type-meta text-(--accent-strong)">Legacy continuity route</p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            This old workbook page now points back to the proof and build steps.
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Keep this page for older links or the archived workshop flow. The main path now runs
            through the Proof and Build steps.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/tour/proof" className="action-primary">
              Open the proof step
            </Link>
            <Link href="/tour/build" className="action-secondary">
              Open the build step
            </Link>
          </div>
        </div>
      </EditorialBand>

      <section className="space-y-6">
        <RouteContextPanel
          eyebrow="Continuity policy"
          title="Open this only for older links or comparison."
          tone="reflection"
          sections={[
            {
              label: "Open it when",
              content:
                "You landed on an older /workbook link or need the archived framing while comparing it with the main proof and build steps.",
            },
            {
              label: "Go here now",
              content: (
                <>
                  Go to <Link href="/tour/proof" className="underline hover:no-underline">/tour/proof</Link>{" "}
                  for evidence shaping, then continue to <Link href="/tour/build" className="underline hover:no-underline">/tour/build</Link>{" "}
                  for the concrete build plan.
                </>
              ),
            },
            {
              label: "Why it remains",
              content:
                "The older flat workbook sequence is still here for continuity and comparison, but it is no longer the main path.",
            },
          ]}
        />
      </section>

      <SplitLayout
        ratio="feature"
        primary={
          <SequenceTimeline
            title="Two sessions, one sequence"
            summary="Use these pages to turn a vague idea into decisions you can explain."
            mode="process"
            items={sessionWorkflow}
          />
        }
        secondary={
          <ConceptGrid
            title="Keep this chain in front of the room"
            summary="This is still the logic underneath the workbook."
            items={webPresenceSystemSteps}
            columns={2}
          />
        }
      />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Session 1"
          title="Start by writing what the page needs to say."
          body="Pick the archetype for each product, then turn that into audience, need, promise, imagery, proof style, and a brief you could hand to an AI."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Portfolio signal brief</p>
            <div className="mt-4 space-y-4">
              {workbookPortfolioPrompts.map((item) => (
                <div key={item.title}>
                  <h2 className="type-concept text-(--ink-strong)">{item.title}</h2>
                  <p className="mt-2 type-body text-(--ink-body)">{item.summary}</p>
                  {item.example ? (
                    <p className="mt-2 type-caption text-(--signal)">
                      <strong>Example:</strong> {item.example}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </TonePanel>
          <TonePanel tone="proof" className="p-6">
            <p className="type-meta text-(--accent-strong)">Museum site signal brief</p>
            <div className="mt-4 space-y-4">
              {workbookMuseumPrompts.map((item) => (
                <div key={item.title}>
                  <h2 className="type-concept text-(--ink-strong)">{item.title}</h2>
                  <p className="mt-2 type-body text-(--ink-body)">{item.summary}</p>
                </div>
              ))}
            </div>
          </TonePanel>
        </div>
      </section>

      <CalloutBand label="Pair review" title="Use another person to check whether the brief matches the page." tone="reflection">
        <ul className="space-y-3 pl-5">
          {workbookPairReviewPrompts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CalloutBand>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Session 2"
          title="Check the live page against the brief, not your mood."
          body="This session gives you a way to diagnose the page, pick one high-leverage fix, and write the prompt you would actually send to an AI agent."
        />
        <ContentGrid minCardWidth="18rem">
          {workbookPrinciples.map((item) => (
            <TonePanel key={item.title} tone="synthesis" className="card-shell p-6">
              <h2 className="type-concept text-(--ink-strong)">{item.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{item.summary}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Portfolio audit table</p>
            <ul className="mt-4 space-y-3 pl-5 type-body text-(--ink-body)">
              {portfolioAuditItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 type-caption text-(--signal)">
              <strong>Outcome:</strong> an overall score out of 5, one change that matters most, and the prompt for that change.
            </p>
          </TonePanel>
          <TonePanel tone="proof" className="p-6">
            <p className="type-meta text-(--accent-strong)">Museum site audit table</p>
            <ul className="mt-4 space-y-3 pl-5 type-body text-(--ink-body)">
              {museumAuditItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 type-caption text-(--signal)">
              <strong>Outcome:</strong> a score out of 5, one high-leverage revision, and the spec that would produce it.
            </p>
          </TonePanel>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Proof blocks"
          title="Proof should work like evidence near the claim."
          body="Proof is not a random testimonial section. It is the smallest piece of evidence that makes the promise believable without a giant scroll."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <CalloutBand label="Portfolio proof" title="What the proof block needs" tone="next">
            <ul className="space-y-3 pl-5">
              {proofBlockFields.portfolio.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CalloutBand>
          <CalloutBand label="Museum proof" title="What curatorial proof looks like" tone="next">
            <ul className="space-y-3 pl-5">
              {proofBlockFields.museum.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CalloutBand>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Studio review"
          title="Be ready to explain the page in class."
          body="Studio review is not about taste alone. You should be able to show the live page, the brief, one agent spec, and one mismatch you still need to fix."
        />
        <ContentGrid minCardWidth="18rem">
          <TonePanel tone="reading" className="card-shell p-6">
            <p className="type-meta text-(--accent-strong)">Both products</p>
            <ul className="mt-4 space-y-3 pl-5 type-body text-(--ink-body)">
              {studioReviewCriteria.both.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TonePanel>
          <TonePanel tone="reading" className="card-shell p-6">
            <p className="type-meta text-(--accent-strong)">Portfolio</p>
            <ul className="mt-4 space-y-3 pl-5 type-body text-(--ink-body)">
              {studioReviewCriteria.portfolio.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TonePanel>
          <TonePanel tone="reading" className="card-shell p-6">
            <p className="type-meta text-(--accent-strong)">Museum site</p>
            <ul className="mt-4 space-y-3 pl-5 type-body text-(--ink-body)">
              {studioReviewCriteria.museum.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TonePanel>
        </ContentGrid>
      </section>

      <CalloutBand label="End of Session 2" title="Leave with a checklist you can actually use." tone="warning">
        <ul className="space-y-3 pl-5">
          {workbookChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CalloutBand>
    </PageShell>
  );
}