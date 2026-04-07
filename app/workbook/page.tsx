import type { Metadata } from "next";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { ConceptGrid, SequenceTimeline } from "@/components/educational-primitives";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
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
          <p className="type-meta text-(--accent-strong)">Workbook</p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Your working doc for both finals — fill it in, sharpen it, ship from it.
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            The workbook walks you through one clear sequence: figure out the need your site answers, choose an archetype, translate that into real page decisions, audit what you have, and write specs sharp enough that an AI agent can actually build what you mean.
          </p>
        </div>
      </EditorialBand>

      <SplitLayout
        ratio="feature"
        primary={
          <SequenceTimeline
            title="How the workbook is meant to be used"
            summary="The pages are not independent handouts. They are a sequence that turns vague taste into decisions you can actually defend."
            mode="process"
            items={sessionWorkflow}
          />
        }
        secondary={
          <ConceptGrid
            title="The chain to keep in front of the room"
            summary="The whole workshop still hangs on the same sequence from the workbook."
            items={webPresenceSystemSteps}
            columns={2}
          />
        }
      />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Session 1"
          title="Start by putting your signal into words."
          body="First, choose an archetype for each product, then translate that choice into audience, need, promise, imagery, proof style, and a brief clear enough to hand to an AI agent."
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

      <CalloutBand label="Pair review" title="Use another student to test whether the brief predicts the page." tone="reflection">
        <ul className="space-y-3 pl-5">
          {workbookPairReviewPrompts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CalloutBand>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Session 2"
          title="Audit your live pages against the brief, not against taste."
          body="The second session gives you a diagnostic lens — then you name one high-leverage fix and write the prompt you would actually send to an AI agent."
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
          title="Treat proof as a receipt that lives near the claim."
          body="The workbook is explicit that proof is not a generic testimonial section. It is the compact evidence that makes the promise believable without a long scroll."
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
          title="The workbook also defines what you need to defend in class."
          body="Studio review is not a beauty contest. You should be able to show the live page, the brief, one agent spec, and one mismatch you still need to solve."
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

      <CalloutBand label="End of Session 2" title="The workbook leaves students with a concrete checklist." tone="warning">
        <ul className="space-y-3 pl-5">
          {workbookChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CalloutBand>
    </PageShell>
  );
}