import type { Metadata } from "next";
import Image from "next/image";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { GuidedStepShell } from "@/components/guided-step-shell";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import {
  archetypeProfiles,
} from "@/lib/archetype-atlas-content";
import {
  buildTourRecordEntries,
  getGuidedTourStep,
  guidedTourRecordExamples,
} from "@/lib/site-navigation";
import { withBasePath } from "@/lib/site-config";
import { archetypeFamilies } from "@/lib/web-presence-site-content";
import Link from "next/link";

const step = getGuidedTourStep("archetype");

const rubricDimensions = [
  {
    title: "Audience fit",
    summary: "Does this vibe match what the audience needs to feel first?",
  },
  {
    title: "Proof fit",
    summary: "Do you have real artifacts that can naturally support this vibe?",
  },
  {
    title: "Tone fit",
    summary: "Can the headline, rhythm, and vocabulary honestly carry this vibe?",
  },
  {
    title: "Real promise",
    summary: "Does this fit what the page is really promising beyond surface style?",
  },
  {
    title: "Misuse risk",
    summary: "What is most likely to feel false, shallow, or overperformed here?",
  },
  {
    title: "Outside-the-page fit",
    summary: "Will the same vibe still make sense in posts, follow-up, and public talk?",
  },
];

const candidateNames = new Set(["Sage", "Hero", "Caregiver"]);
const candidateArchetypes = archetypeFamilies
  .flatMap((family) => family.archetypes)
  .filter((archetype) => candidateNames.has(archetype.title));

const candidateArchetypeCards = candidateArchetypes.map((archetype) => ({
  ...archetype,
  imagePath:
    archetypeProfiles.find((profile) => profile.name === archetype.title)?.imagePath ??
    "/archetype-atlas/archetypes/sage.png",
}));

export const metadata: Metadata = {
  title: step.publicLabel,
};

export default function TourArchetypePage() {
  return (
    <GuidedStepShell
      eyebrow="Vibe step"
      title="Pick the vibe people should get first, then make sure your page can actually support it."
      summary="This is a fit check, not a personality quiz. Compare a few likely options and leave with one choice, one reason, and one warning sign."
      status="Required in tour"
      prerequisite={step.prerequisite}
      output={step.output}
      currentStepId="archetype"
      recordEntries={buildTourRecordEntries(guidedTourRecordExamples.archetype, step.recordFields)}
      heroVisual={
        <TonePanel tone="synthesis" className="p-4">
          <p className="type-meta text-(--accent-strong)">First-read compare board</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {candidateArchetypeCards.map((archetype) => (
              <div
                key={archetype.title}
                className="overflow-hidden rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.7)]"
              >
                <Image
                  src={withBasePath(archetype.imagePath)}
                  alt={`${archetype.title} archetype portrait`}
                  width={720}
                  height={720}
                  className="aspect-[3/4] w-full object-cover"
                />
                <div className="p-3">
                  <p className="type-annotation font-semibold text-(--ink-strong)">{archetype.title}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 type-caption text-(--ink-body)">
            Read these as first-impression directions. The right choice is the one your audience,
            proof, and headline can actually support.
          </p>
        </TonePanel>
      }
      actions={[
        {
          href: "/tour/style",
          label: "Next: choose the look",
        },
        {
          href: "/browse/archetypes",
          label: "Compare vibe options",
          kind: "secondary",
        },
      ]}
      misconception={
        <p>
          Do not choose the option that sounds coolest. Choose the one your audience, proof, and
          actual page can support without faking it.
        </p>
      }
      formativeCheck={
        <p>
          Show someone the first screen for five seconds. If they do not describe the same vibe
          you wanted, the choice is not locked yet.
        </p>
      }
    >
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Rubric"
          title="Score the fit before you lock it in."
          body="Use these six checks to keep the choice tied to the page, not your taste."
        />
        <ContentGrid minCardWidth="16rem">
          {rubricDimensions.map((dimension) => (
            <TonePanel key={dimension.title} tone="reading" className="p-6">
              <h2 className="type-concept text-(--ink-strong)">{dimension.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{dimension.summary}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Compare likely candidates"
          title="Compare a few likely options before you go deeper."
          body="These three show up a lot because they solve different first-impression problems. Compare them directly before you go wider."
        />
        <ContentGrid minCardWidth="18rem">
          {candidateArchetypeCards.map((archetype) => (
            <TonePanel key={archetype.title} tone="proof" className="overflow-hidden p-0">
              <Image
                src={withBasePath(archetype.imagePath)}
                alt={`${archetype.title} archetype portrait`}
                width={720}
                height={720}
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
              <h2 className="type-concept text-(--ink-strong)">{archetype.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{archetype.promise}</p>
              <p className="mt-4 type-caption text-(--ink-body)">
                <strong>Gift:</strong> {archetype.gift}
              </p>
              <p className="mt-2 type-caption text-(--ink-body)">
                <strong>Trap:</strong> {archetype.trap}
              </p>
              <p className="mt-2 type-caption text-(--signal)">
                <strong>Best fit:</strong> {archetype.fits}
              </p>
              </div>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <CalloutBand
        label="Leave with this"
        title="Leave with one choice, one reason, and one risk."
        tone="next"
      >
        <p>
          Name the vibe, say why it fits, note what could break it, and move on to the visual
          direction.
        </p>
      </CalloutBand>

      <TonePanel tone="synthesis" className="p-6">
        <p className="type-meta text-(--accent-strong)">Go deeper</p>
        <p className="mt-2 type-body text-(--ink-body)">
          Module 1: Web Presence Framework unpacks archetype selection,
          congruence, and common traps across four lessons.
        </p>
        <Link
          href="/modules/web-presence-framework"
          className="action-secondary mt-4 inline-block"
        >
          Open Module 1 →
        </Link>
      </TonePanel>
    </GuidedStepShell>
  );
}