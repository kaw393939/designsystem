import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Identity signals",
};

export default function IdentitySignalsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 1 · Module 5
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Identity signals
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            How audience, archetype, and visual direction create a coherent
            identity — and what breaks it.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          Module 1 introduced each piece of the framework separately. This
          lesson treats them as parts of a single system. When the pieces
          align, the site has an identity. When they contradict, the visitor
          feels the dissonance even if they cannot name it.
        </p>
      </TonePanel>

      {/* ── Identity as a system ── */}
      <section>
        <SectionHeading
          eyebrow="Principle"
          title="Identity as a system"
          body="Not a collection of choices — a system where every choice reinforces every other."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            Audience defines need. Need shapes archetype. Archetype constrains
            visual direction. Visual direction informs proof placement. Each
            layer depends on the one before it. Change the audience and every
            downstream decision should shift to match.
          </p>
          <p className="type-body text-(--ink-body)">
            A coherent identity is not a brand guidelines document. It is the
            feeling a visitor gets when the headline, the layout, the proof,
            and the CTA all belong to the same world. That feeling is trust.
          </p>
        </div>
      </section>

      {/* ── What breaks coherence ── */}
      <section>
        <SectionHeading
          eyebrow="Diagnosis"
          title="What breaks coherence"
          body="Mismatched signals, conflicting tones, and borrowed identities."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="warning" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Mismatched signals
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              A Sage headline on a Rebel layout. A formal tone with playful
              typography. When two layers send contradicting messages, the
              visitor processes both — and trusts neither.
            </p>
          </TonePanel>

          <TonePanel tone="warning" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Conflicting tones
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Copy that says &ldquo;we take this seriously&rdquo; while the
              visual direction screams casual. The visitor picks up on the tone
              conflict before reading the second paragraph.
            </p>
          </TonePanel>

          <TonePanel tone="warning" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Borrowed identities
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Copying another site&apos;s visual identity without sharing its
              audience or promise. The result feels hollow — all surface, no
              substance. The visitor senses they are looking at a costume, not
              a character.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Mapping your own signals ── */}
      <section>
        <SectionHeading
          eyebrow="Exercise"
          title="Mapping your signals"
          body="Walk through your own site and check each layer for alignment."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="reading" className="p-6">
            <p className="type-body text-(--ink-body)">
              Open your site. For each of these, write one sentence:
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-2 type-body text-(--ink-body)">
              <li>Who is the audience? (Name a person, not a group.)</li>
              <li>What archetype is the site projecting?</li>
              <li>Does the visual direction match that archetype?</li>
              <li>Does the proof support the promise?</li>
              <li>Where do the signals contradict each other?</li>
            </ol>
          </TonePanel>
        </div>
      </section>

      {/* ── Full walk-through link ── */}
      <TonePanel tone="reading" className="p-6">
        <p className="type-body text-(--ink-body)">
          Explore the full identity portfolio system in{" "}
          <Link
            href="/experiences/identity-portfolio"
            className="underline text-(--accent-strong) hover:text-(--accent-hover)"
          >
            the identity portfolio experience
          </Link>
          .
        </p>
      </TonePanel>

      {/* ── Classroom frame ── */}
      <TonePanel tone="next" className="p-6">
        <p className="font-semibold type-body text-(--ink-strong)">
          Before next class
        </p>
        <p className="mt-2 type-body text-(--ink-body)">
          Map your own site&apos;s identity signals. Where do they align?
          Where do they contradict? Bring your notes to class.
        </p>
        <Link
          href="/modules/identity-and-proof/building-proof"
          className="action-primary mt-4 inline-block"
        >
          Continue to Lesson 2 →
        </Link>
      </TonePanel>
    </>
  );
}
