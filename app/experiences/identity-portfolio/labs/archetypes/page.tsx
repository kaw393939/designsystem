import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { GlossaryBlock, NextStepBlock } from "@/components/educational-primitives";
import { SplitLayout } from "@/components/split-layout";
import { TonePanel } from "@/components/tone-panel";
import { IdentitySignalExplorer } from "@/components/identity-signal-explorer";

import {
  archetypeAtlasExplorerItems,
  archetypeClusterItems,
  archetypeDecisionItems,
  archetypeDoctrineItems,
  archetypeStoryItems,
} from "../../archetype-atlas-content";
import {
  signalGuardrails,
  signalVocabularyTerms,
} from "../../content";
import {
  IdentityRouteShell,
  IdentityRouteUnavailable,
  isIdentityRouteActive,
} from "../../route-shell";

const currentHref = "/experiences/identity-portfolio/labs/archetypes/";

export default function IdentityPortfolioArchetypesLabPage() {
  if (!isIdentityRouteActive(currentHref)) {
    return <IdentityRouteUnavailable title="Identity archetypes lab" />;
  }

  return (
    <IdentityRouteShell
      eyebrow="Optional lab"
      title="Choose one archetype that can govern the whole first read"
      dek="This atlas uses The Hero and the Outlaw to help you choose one dominant archetype, compare its cluster, collect image and phrase cues, and carry the same signal into proof and action."
      currentHref={currentHref}
      actions={[
        {
          label: "Apply in signal",
          href: "/experiences/identity-portfolio/signal/",
          kind: "primary",
        },
        {
          label: "Open style",
          href: "/experiences/identity-portfolio/style/",
          kind: "secondary",
        },
      ]}
    >
      <SplitLayout
        ratio="feature"
        primary={
          <TonePanel tone="reading" className="p-6">
            <p className="type-meta text-(--accent-strong)">Brand doctrine</p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">
              Choose one dominant myth and let the whole page support it.
            </h2>
            <p className="mt-3 type-body text-(--ink-body)">
              Mark and Pearson treat archetypes as recurring human meanings, not surface moods. The point of the lab is to choose the public promise that should organize the first read, then keep imagery, proof, and tone inside the same lane.
            </p>
            <p className="mt-4 type-caption text-(--signal)">
              <strong>Book line:</strong> The meaning of a brand is its most precious and irreplaceable asset.
            </p>
          </TonePanel>
        }
        secondary={
          <TonePanel tone="proof" className="p-6">
            <p className="type-meta text-(--accent-strong)">Decision rule</p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">
              Start with the family before you choose the individual archetype.
            </h2>
            <p className="mt-3 type-body text-(--ink-body)">
              The four cluster families help you decide whether the page is promising relief, transformation, belonging, or structure. That narrows the field before you start comparing Hero against Outlaw or Sage against Creator.
            </p>
          </TonePanel>
        }
      />

      <section className="space-y-6">
        <div className="space-y-3">
          <p className="type-meta text-(--accent-strong)">What the book argues</p>
          <h2 className="type-section text-balance text-(--ink-strong)">
            Four principles for using archetypes without turning them into costume.
          </h2>
        </div>
        <ContentGrid minCardWidth="17rem">
          {archetypeDoctrineItems.map((item) => (
            <TonePanel key={item.title} tone="reading" className="card-shell p-6">
              <h3 className="type-concept text-(--ink-strong)">{item.title}</h3>
              <p className="mt-3 type-body text-(--ink-body)">{item.summary}</p>
              <p className="mt-4 type-caption text-(--signal)">“{item.quote}”</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <p className="type-meta text-(--accent-strong)">Cluster families</p>
          <h2 className="type-section text-balance text-(--ink-strong)">
            Choose the motivation family first, then the exact archetype.
          </h2>
          <p className="measure-reading type-body text-(--ink-body)">
            These four families make the choice smaller and more strategic. Once you know which kind of promise the page is making, the visual and verbal cues become much easier to keep coherent.
          </p>
        </div>
        <ContentGrid minCardWidth="18rem">
          {archetypeClusterItems.map((item) => (
            <TonePanel key={item.title} tone="proof" className="card-shell p-6">
              <p className="type-meta text-(--accent-strong)">{item.members.join(" / ")}</p>
              <h3 className="mt-3 type-concept text-(--ink-strong)">{item.title}</h3>
              <p className="mt-3 type-body text-(--ink-body)">{item.summary}</p>
              <p className="mt-4 type-caption text-(--signal)">
                <strong>Choose this when:</strong> {item.decision}
              </p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <IdentitySignalExplorer items={archetypeAtlasExplorerItems} />

      <section className="space-y-6">
        <div className="space-y-3">
          <p className="type-meta text-(--accent-strong)">Story wall</p>
          <h2 className="type-section text-balance text-(--ink-strong)">
            Public figures and brands become easier to read once the archetype is clear.
          </h2>
          <p className="measure-reading type-body text-(--ink-body)">
            These examples come from the book and from the cases it uses to show how the public reads meaning in real time. Use them to sharpen the promise, not to copy someone else's surface style.
          </p>
        </div>
        <ContentGrid minCardWidth="18rem">
          {archetypeStoryItems.map((item) => (
            <TonePanel key={item.title} tone="synthesis" className="card-shell p-6">
              <p className="type-meta text-(--accent-strong)">{item.archetype}</p>
              <h3 className="mt-3 type-concept text-(--ink-strong)">{item.title}</h3>
              <p className="mt-3 type-body text-(--ink-body)">{item.summary}</p>
              <p className="mt-4 type-caption text-(--signal)">
                <strong>Portfolio lesson:</strong> {item.lesson}
              </p>
              {item.quote ? (
                <p className="mt-3 type-caption text-(--ink-body)">“{item.quote}”</p>
              ) : null}
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <p className="type-meta text-(--accent-strong)">Quick chooser</p>
          <h2 className="type-section text-balance text-(--ink-strong)">
            Match the portfolio problem to the archetype family.
          </h2>
        </div>
        <ContentGrid minCardWidth="18rem">
          {archetypeDecisionItems.map((item) => (
            <TonePanel key={item.title} tone="reading" className="card-shell p-6">
              <h3 className="type-concept text-(--ink-strong)">{item.title}</h3>
              <p className="mt-3 type-body text-(--ink-body)">{item.summary}</p>
              <p className="mt-4 type-caption text-(--signal)">
                <strong>Archetypes:</strong> {item.members}
              </p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <GlossaryBlock
        title="Language for critique and revision"
        layout="grid"
        terms={signalVocabularyTerms}
      />

      <CalloutBand label="Guardrails" title="Treat the archetype as a governing promise, not a costume." tone="warning">
        <ul className="space-y-3 pl-5">
          {signalGuardrails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CalloutBand>

      <NextStepBlock
        title="Return to signal with one dominant archetype in hand"
        summary="Use the signal route to write the need-signal promise, then move into style so the same archetype becomes visible in hierarchy, imagery, and contrast."
        context="The atlas is for comparison. The core path is where the choice becomes a live page decision."
        primaryAction={{
          label: "Apply in signal",
          href: "/experiences/identity-portfolio/signal/",
          kind: "primary",
        }}
        secondaryAction={{
          label: "Open style",
          href: "/experiences/identity-portfolio/style/",
          kind: "secondary",
        }}
      />
    </IdentityRouteShell>
  );
}