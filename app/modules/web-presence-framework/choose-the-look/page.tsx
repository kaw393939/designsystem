import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";

export const metadata: Metadata = {
  title: "Choose the look",
};

export default function ChooseTheLookPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 3 · Module 1
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Choose the look
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Visual direction follows archetype, not the other way around.
            Layout, color, and typography are signals — they tell the visitor
            what kind of site this is before they read a word.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          This lesson summarizes the Style step. You will learn how visual
          choices serve the archetype and how to avoid fighting the vibe with
          the wrong direction.
        </p>
      </TonePanel>

      {/* ── Visual direction follows archetype ── */}
      <section>
        <SectionHeading
          eyebrow="Principle"
          title="Visual direction follows archetype"
          body="The archetype decides the mood. The mood decides the visuals."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            If you chose a Sage archetype, the visual direction should feel
            calm, authoritative, and well-organized. If you chose a Creator
            archetype, the direction should feel expressive, original, and
            craft-forward. The archetype is not just a label — it is a design
            constraint that narrows every choice you make.
          </p>
          <p className="type-body text-(--ink-body)">
            This is liberating, not limiting. When you know the archetype, you
            do not have to decide between a hundred possible palettes. You
            decide between the few palettes that match the vibe.
          </p>
        </div>
      </section>

      {/* ── Layout, color, typography as signals ── */}
      <section>
        <SectionHeading
          eyebrow="The three signals"
          title="Layout, color, and typography"
          body="Each one communicates before the visitor reads."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Layout
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Dense grids suggest depth and richness (museum, Sage). Wide open
              layouts with generous whitespace suggest confidence and simplicity
              (portfolio, Innocent). The grid is the first thing the eye
              processes — before color, before type.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Color
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Warm, muted palettes suggest approachability. Cool, high-contrast
              palettes suggest precision. Monochromatic palettes with one accent
              suggest restraint and editorial control. The palette is a mood
              lever.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Typography
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Serif headings with sans-serif body suggest credibility and
              tradition. Monospace or geometric sans suggest technical precision.
              Rounded or humanist faces suggest warmth. Type is tone, audible at
              a glance.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── What to avoid ── */}
      <section>
        <SectionHeading
          eyebrow="Avoid"
          title="Fighting the vibe"
          body="When the visual direction contradicts the archetype, the visitor feels it."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="warning" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Sage archetype with a neon palette
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Sage promises depth and authority. Neon signals urgency and
              rebellion. The mismatch tells the visitor: this site does not know
              what it is.
            </p>
          </TonePanel>

          <TonePanel tone="warning" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Hero archetype with a delicate, airy layout
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Hero promises competence under pressure. A light, airy layout
              suggests ease and calm — the opposite signal. The visitor
              expects confidence and gets gentleness.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Full walk-through link ── */}
      <TonePanel tone="reading" className="p-6">
        <p className="type-body text-(--ink-body)">
          For the full walk-through, see{" "}
          <a
            href="/tour/style"
            className="underline text-(--accent-strong) hover:text-(--accent-hover)"
          >
            the Style tour
          </a>
          . To compare design directions side by side, visit{" "}
          <a
            href="/browse/design-lineages"
            className="underline text-(--accent-strong) hover:text-(--accent-hover)"
          >
            the design lineages room
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
          Bring a mood board or three reference sites that match your chosen
          direction. Be ready to explain how each reference connects to your
          archetype.
        </p>
        <a
          href="/modules/web-presence-framework/proof-and-publish"
          className="action-primary mt-4 inline-block"
        >
          Continue to Lesson 4 →
        </a>
      </TonePanel>
    </>
  );
}
