import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";

export const metadata: Metadata = {
  title: "Pick the vibe",
};

export default function PickTheVibePage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 2 · Module 1
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Pick the vibe
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Your archetype is the personality your site projects. Choose it
            based on what your audience needs to feel, not what you personally
            like.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          This lesson summarizes the Archetype step. You will learn the 12
          archetypes as a decision tool, choose one that fits your audience,
          and test it for congruence with your promise.
        </p>
      </TonePanel>

      {/* ── The 12 archetypes ── */}
      <section>
        <SectionHeading
          eyebrow="Framework"
          title="The 12 archetypes as a decision tool"
          body="Each archetype is a different contract with the visitor about what kind of experience this will be."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            The archetypes are not personality types for you — they are
            personality types for your site. A Sage site promises depth and
            expertise. A Creator site promises originality and craft. A Hero
            site promises competence under pressure. Each one shapes layout,
            tone, proof strategy, and visual direction.
          </p>
          <p className="type-body text-(--ink-body)">
            You do not need to memorize all twelve. You need to pick one
            primary archetype and understand why it fits your audience better
            than the alternatives.
          </p>
          <TonePanel tone="reading" className="p-6">
            <p className="type-body text-(--ink-body)">
              Browse all twelve archetypes with examples and visual cues in{" "}
              <a
                href="/browse/archetypes"
                className="underline text-(--accent-strong) hover:text-(--accent-hover)"
              >
                the archetype room
              </a>
              .
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Choosing your primary ── */}
      <section>
        <SectionHeading
          eyebrow="Decision"
          title="How to choose"
          body="Match the archetype to the audience, not to yourself."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Start with the audience
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Go back to Lesson 1. Who is the person? What do they need to
              believe? Now ask: what kind of site would make that person trust
              the page fastest? That is your archetype.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Test for congruence
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              The congruence test: does the vibe match the promise? If your
              promise is &ldquo;I build reliable systems under pressure&rdquo;
              but your site feels like an Explorer (adventurous, wandering),
              there is a mismatch. The visitor will sense it even if they
              cannot name it.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Common mistakes ── */}
      <section>
        <SectionHeading
          eyebrow="Avoid"
          title="Common mistakes"
          body="Choosing based on personal taste instead of audience fit."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="warning" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              &ldquo;I like the Rebel look&rdquo;
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Your preference is not the decision criterion. If your audience
              is a conservative hiring manager at a financial institution, a
              Rebel vibe will cost you the job before they read a word.
            </p>
          </TonePanel>

          <TonePanel tone="warning" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Trying to be two archetypes at once
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              A secondary archetype can add texture, but two competing primary
              archetypes create visual and tonal confusion. Pick one. Commit.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Full walk-through link ── */}
      <TonePanel tone="reading" className="p-6">
        <p className="type-body text-(--ink-body)">
          For the full walk-through, see{" "}
          <a
            href="/tour/archetype"
            className="underline text-(--accent-strong) hover:text-(--accent-hover)"
          >
            the Archetype tour
          </a>
          . To compare vibe options side by side, visit{" "}
          <a
            href="/browse/archetypes"
            className="underline text-(--accent-strong) hover:text-(--accent-hover)"
          >
            the archetype room
          </a>
          .
        </p>
      </TonePanel>

      {/* ── Classroom frame ── */}
      <TonePanel tone="next" className="p-6">
        <p className="font-semibold type-body text-(--ink-strong)">
          Before next class
        </p>
        <p className="mt-2 type-body text-(--ink-body)">
          Name your primary archetype and write one sentence on why it fits
          your audience. Be ready to defend the choice.
        </p>
        <a
          href="/modules/web-presence-framework/choose-the-look"
          className="action-primary mt-4 inline-block"
        >
          Continue to Lesson 3 →
        </a>
      </TonePanel>
    </>
  );
}
