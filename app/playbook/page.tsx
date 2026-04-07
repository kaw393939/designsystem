import type { Metadata } from "next";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import { selectionSteps } from "@/lib/archetype-atlas-content";

export const metadata: Metadata = {
  title: "Choose",
};

const fontRules = [
  "Let the display face carry the archetype. Let the body face carry readability.",
  "Use one expressive type decision at a time. If the display is loud, keep the body neutral.",
  "A monospace accent works best as metadata, proof labels, or technical flavor, not as your whole voice.",
  "If the font choice makes the proof harder to read, the font is serving taste over strategy.",
];

const vocabularyRules = [
  "Hero language should sound active and threshold-based.",
  "Sage language should sound measured, evidence-first, and exact.",
  "Outlaw language should challenge a default or expose a category lie.",
  "Caregiver language should reduce fear without becoming sentimental.",
  "Creator language should describe making, judgment, and craft rather than generic creativity.",
];

const proofRules = [
  "Hero proof is score, milestones, and endurance under pressure.",
  "Sage proof is method, citations, diagrams, and evidence visible near the claim.",
  "Outlaw proof is the teardown, the before/after critique, or the exposed default.",
  "Magician proof is transformation shown as a change in state.",
  "Everyman and Caregiver proof lives in believable human outcomes and practical receipts.",
];

const brandDifferences = [
  {
    title: "Personal brand",
    summary:
      "The archetype governs how your professional self is read. It shapes the promise, proof, and room tone around one person or practice.",
  },
  {
    title: "Business brand",
    summary:
      "The archetype governs what the company promises culturally and emotionally, then has to survive across product, service, support, and operations.",
  },
  {
    title: "Shared rule",
    summary:
      "In both cases, the archetype is only credible when the proof and the operating behavior support the image the page is projecting.",
  },
];

export default function PlaybookPage() {
  return (
    <PageShell>
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">Selection playbook</p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Pick the archetype through audience, promise, and proof pressure, not through taste alone.
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            This page turns the archetype decision into a repeatable process. Use it for a personal brand, a business brand, or any online presence that needs a legible first read.
          </p>
        </div>
      </EditorialBand>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Sequence"
          title="Five steps keep the choice honest."
          body="If you start with the archetype name, you will usually choose the flattering label. If you start with the visitor's tension and the page's job, the choice gets sharper fast."
        />
        <ContentGrid minCardWidth="17rem">
          {selectionSteps.map((step) => (
            <TonePanel key={step.title} tone="proof" className="card-shell p-6">
              <h2 className="type-concept text-(--ink-strong)">{step.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{step.summary}</p>
              <p className="mt-4 type-caption text-(--signal)">
                <strong>Ask:</strong> {step.prompt}
              </p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Personal vs business"
          title="The same archetype behaves differently depending on the object of the brand."
          body="A Hero portfolio reads as a person who performs under pressure. A Hero company reads as a team or institution that delivers under pressure. The same structure, different scale."
        />
        <ContentGrid minCardWidth="18rem">
          {brandDifferences.map((item) => (
            <TonePanel key={item.title} tone="reading" className="card-shell p-6">
              <h2 className="type-concept text-(--ink-strong)">{item.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{item.summary}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Design translation"
          title="After the archetype is chosen, force it through type, vocabulary, proof, and CTA language."
          body="This is where most weak brand work fails. The page chooses one archetype, then uses typography, proof, or call-to-action language from a different one."
        />
        <ContentGrid minCardWidth="17rem">
          <CalloutBand label="Fonts" title="Type should carry the tone without blocking the read." tone="reading">
            <ul className="space-y-2 pl-5">
              {fontRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </CalloutBand>
          <CalloutBand label="Vocabulary" title="Word choice exposes mixed signals immediately." tone="reading">
            <ul className="space-y-2 pl-5">
              {vocabularyRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </CalloutBand>
          <CalloutBand label="Proof" title="Every archetype has a native evidence form." tone="reading">
            <ul className="space-y-2 pl-5">
              {proofRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </CalloutBand>
        </ContentGrid>
      </section>

      <CalloutBand label="Reminder" title="Pick the style lens second, not first." tone="warning">
        <p>
          Swiss, brutalist, punk, and editorial modes are delivery systems. They change how the archetype lands, but they do not replace the archetype decision. Choose the signal first. Then choose how much clarity or controlled friction the page needs.
        </p>
      </CalloutBand>
    </PageShell>
  );
}