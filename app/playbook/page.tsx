import type { Metadata } from "next";
import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { RouteContextPanel } from "@/components/route-context-panel";
import { RouteStatusBadge } from "@/components/route-status-badge";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import { selectionSteps } from "@/lib/archetype-atlas-content";

export const metadata: Metadata = {
  title: "Choose",
};

const fontRules = [
  "Let the headline font carry the archetype. Let the body font carry readability.",
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
  "Everyman and Caregiver proof lives in believable human outcomes and practical evidence.",
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
          <RouteStatusBadge status="Wrapper-specific" />
          <p className="mt-4 type-meta text-(--accent-strong)">Legacy continuity route</p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            This old playbook page now points back to the real tour steps.
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Keep this page for older links or to compare the old flat flow. The main path now runs
            through the Signal, Archetype, and Style steps.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/tour/signal" className="action-primary">
              Open the signal step
            </Link>
            <Link href="/tour/archetype" className="action-secondary">
              Open the archetype step
            </Link>
            <Link href="/tour/style" className="action-secondary">
              Open the style step
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
                "You landed on an older /playbook link or need the archived prompts while comparing them with the main tour.",
            },
            {
              label: "Go here now",
              content: (
                <>
                  Start at <Link href="/tour/signal" className="underline hover:no-underline">/tour/signal</Link>,
                  then move through <Link href="/tour/archetype" className="underline hover:no-underline">/tour/archetype</Link>{" "}
                  and <Link href="/tour/style" className="underline hover:no-underline">/tour/style</Link>.
                </>
              ),
            },
            {
              label: "Why it remains",
              content:
                "The older flat playbook framing is still here for continuity and comparison, but it is no longer the main student path.",
            },
          ]}
        />
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Sequence"
          title="Use five steps so the choice is real."
          body="Start with the visitor, the tension, and the job of the page."
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
          title="The same archetype feels different on a person than on a company."
          body="A Hero portfolio reads like one person who performs under pressure. A Hero company reads like a team or institution that does the same. Same signal, different scale."
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
          title="Once you pick the archetype, make the rest of the page match."
          body="Weak brand pages usually mix signals. They pick one archetype, then use type, proof, or call-to-action language from another."
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

      <CalloutBand label="Reminder" title="Pick the visual style second, not first." tone="warning">
        <p>
          Swiss, brutalist, punk, and editorial styles are delivery choices. They change how the archetype lands, but they do not replace the archetype decision. Pick the signal first. Then decide how much clarity or friction the page needs.
        </p>
      </CalloutBand>
    </PageShell>
  );
}