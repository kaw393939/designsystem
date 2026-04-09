import type { Metadata } from "next";
import Image from "next/image";

import { EditorialBand } from "@/components/editorial-band";
import { PersonProfileGrid } from "@/components/person-profile-grid";
import { SectionHeading } from "@/components/section-heading";
import { TimelineSection } from "@/components/timeline-section";
import { TonePanel } from "@/components/tone-panel";
import {
  eras,
  getPeopleByEraCluster,
} from "@/lib/module-content/ai-foundations";

export const metadata: Metadata = {
  title: "Where AI came from",
};

/* ------------------------------------------------------------------ */
/*  People helpers — map data to PersonProfileGrid shape              */
/* ------------------------------------------------------------------ */

function profileGridPeople(cluster: string) {
  return getPeopleByEraCluster(cluster).map((p) => ({
    name: p.name,
    era: p.era,
    role: p.role,
    summary: p.summary,
    imageSrc: p.portraitSrc,
  }));
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function WhereAiCameFromPage() {
  const era1 = eras[0]; // Precursors
  const era2 = eras[1]; // Field formation
  const era3 = eras[2]; // Symbolic optimism
  const era4 = eras[3]; // Expert systems and first winter
  const era5 = eras[4]; // Statistical revival
  const era6 = eras[5]; // Deep learning breakthroughs
  const era7 = eras[6]; // Foundation models go public

  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="reading" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 1 · Module 2
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Where AI came from
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Seven eras of artificial intelligence as one flowing story — key
            turning points, the people who made them, and a timeline you can
            walk through.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          Here is the story in seven waves. Each one happened because the last
          one hit a wall. You do not need to memorize dates — just follow the
          pattern: ambition → breakthrough → limit → new idea.
        </p>
      </TonePanel>

      {/* ── Eras 1–2: Logic and the naming of AI ─────────────── */}
      <section aria-labelledby="eras-1-2">
        <SectionHeading
          eyebrow={`${era1.title} · ${era1.period}`}
          title="Logic becomes computation"
          body={era1.thesis}
          headingLevel={2}
        />

        <Image
          src="/media/modules/generated/era-1-precursors.webp"
          alt="Illustration of mechanical computation origins — gears, engine components, and mathematical notation"
          width={960}
          height={480}
          priority
          className="mt-6 w-full rounded-(--radius-card)"
        />

        <TimelineSection items={era1.milestones} className="mt-8" />

        <PersonProfileGrid
          people={profileGridPeople("Precursors")}
          className="mt-8"
        />

        <SectionHeading
          eyebrow={`${era2.title} · ${era2.period}`}
          title="Computation meets ambition"
          body={era2.thesis}
          headingLevel={2}
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Image
            src="/media/modules/generated/dartmouth-proposal.webp"
            alt="Illustration of the 1956 Dartmouth Summer Research Project where AI was named"
            width={480}
            height={320}
            loading="lazy"
            className="w-full rounded-(--radius-card)"
          />
          <Image
            src="/media/modules/generated/shannon-theseus-maze.webp"
            alt="Shannon's Theseus maze-solving automaton with electromagnetic relays"
            width={480}
            height={320}
            loading="lazy"
            className="w-full rounded-(--radius-card)"
          />
        </div>

        <TimelineSection items={era2.milestones} className="mt-8" />

        <PersonProfileGrid
          people={profileGridPeople("Field formation")}
          className="mt-8"
        />

        <TonePanel tone="reading" className="mt-8 p-6">
          <p className="font-semibold type-body text-(--ink-strong)">
            Key teaching point
          </p>
          <p className="mt-2 type-body text-(--ink-body)">
            Logic becomes computation, computation becomes a field. Everything
            that follows depends on Shannon giving us information theory and
            Turing giving us the concept of a universal machine.
          </p>
        </TonePanel>
      </section>

      {/* ── Eras 3–4: Symbolic AI and the first winter ───────── */}
      <section aria-labelledby="eras-3-4">
        <SectionHeading
          eyebrow={`${era3.title} · ${era3.period}`}
          title="If intelligence is symbol manipulation"
          body={era3.thesis}
          headingLevel={2}
        />

        <Image
          src="/media/modules/generated/era-3-symbolic-programs.webp"
          alt="Illustration of early symbolic AI — logic trees on a chalkboard and 1960s mainframe terminal"
          width={960}
          height={480}
          loading="lazy"
          className="mt-6 w-full rounded-(--radius-card)"
        />

        <TimelineSection items={era3.milestones} className="mt-8" />

        <PersonProfileGrid
          people={profileGridPeople("Symbolic optimism")}
          className="mt-8"
        />

        <SectionHeading
          eyebrow={`${era4.title} · ${era4.period}`}
          title="Smart programs without learning hit a wall"
          body={era4.thesis}
          headingLevel={2}
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Image
            src="/media/modules/generated/era-4-expert-systems.webp"
            alt="Illustration of expert systems and the first AI winter — decision trees fading into shadow"
            width={480}
            height={320}
            loading="lazy"
            className="w-full rounded-(--radius-card)"
          />
          <Image
            src="/media/modules/generated/lighthill-report.webp"
            alt="The 1973 Lighthill Report that triggered the first AI winter"
            width={480}
            height={320}
            loading="lazy"
            className="w-full rounded-(--radius-card)"
          />
        </div>

        <TimelineSection items={era4.milestones} className="mt-8" />

        <PersonProfileGrid
          people={profileGridPeople("Expert systems")}
          className="mt-8"
        />

        <TonePanel tone="warning" className="mt-8 p-6">
          <p className="font-semibold type-body text-(--ink-strong)">
            Key teaching point
          </p>
          <p className="mt-2 type-body text-(--ink-body)">
            Smart programs without learning hit a wall. Expert systems made
            money, then failed to adapt. The Lighthill Report declared the field
            had failed, and funding dried up. This is what people mean when they
            say &ldquo;AI winter.&rdquo;
          </p>
        </TonePanel>
      </section>

      {/* ── Eras 5–6: Learning from data and deep learning ──── */}
      <section aria-labelledby="eras-5-6">
        <SectionHeading
          eyebrow={`${era5.title} · ${era5.period}`}
          title="Let the machine learn"
          body={era5.thesis}
          headingLevel={2}
        />

        <Image
          src="/media/modules/generated/backpropagation-paper.webp"
          alt="The 1986 backpropagation paper — neural network diagrams with forward and backward arrows"
          width={960}
          height={480}
          loading="lazy"
          className="mt-6 w-full rounded-(--radius-card)"
        />

        <TimelineSection items={era5.milestones} className="mt-8" />

        <PersonProfileGrid
          people={profileGridPeople("Statistical revival")}
          className="mt-8"
        />

        <SectionHeading
          eyebrow={`${era6.title} · ${era6.period}`}
          title="Depth plus data plus GPUs beat everything"
          body={era6.thesis}
          headingLevel={2}
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Image
            src="/media/modules/generated/imagenet-moment.webp"
            alt="The 2012 ImageNet/AlexNet breakthrough in image recognition"
            width={480}
            height={320}
            loading="lazy"
            className="w-full rounded-(--radius-card)"
          />
          <Image
            src="/media/modules/generated/transformer-paper.webp"
            alt="The 2017 Transformer architecture from Attention Is All You Need"
            width={480}
            height={320}
            loading="lazy"
            className="w-full rounded-(--radius-card)"
          />
        </div>

        <TimelineSection items={era6.milestones} className="mt-8" />

        <PersonProfileGrid
          people={profileGridPeople("Deep learning")}
          className="mt-8"
        />

        <TonePanel tone="reading" className="mt-8 p-6">
          <p className="font-semibold type-body text-(--ink-strong)">
            Key teaching point
          </p>
          <p className="mt-2 type-body text-(--ink-body)">
            Instead of writing rules, let the machine learn patterns from data.
            Backpropagation gave neural networks a training algorithm.
            ImageNet proved that deep networks could outperform all handcrafted
            alternatives. The Transformer made it parallelizable.
          </p>
        </TonePanel>
      </section>

      {/* ── Era 7: Foundation models go public ────────────────── */}
      <section aria-labelledby="era-7">
        <SectionHeading
          eyebrow={`${era7.title} · ${era7.period}`}
          title="AI becomes something everyone uses"
          body={era7.thesis}
          headingLevel={2}
        />

        <Image
          src="/media/modules/generated/era-7-foundation-models.webp"
          alt="Foundation models — token embeddings radiating outward with human silhouettes at chat interfaces"
          width={960}
          height={480}
          loading="lazy"
          className="mt-6 w-full rounded-(--radius-card)"
        />

        <TimelineSection items={era7.milestones} className="mt-8" />

        <PersonProfileGrid
          people={profileGridPeople("Foundation models")}
          className="mt-8"
        />

        <Image
          src="/media/modules/generated/openai-public-ai.webp"
          alt="Illustration of a modern AI research office representing the public AI deployment era"
          width={960}
          height={480}
          loading="lazy"
          className="mt-6 w-full rounded-(--radius-card)"
        />

        <TonePanel tone="next" className="mt-8 p-6">
          <p className="font-semibold type-body text-(--ink-strong)">
            Key teaching point
          </p>
          <p className="mt-2 type-body text-(--ink-body)">
            AI becomes something everyone uses, not just researchers. That
            changes the tools, the risks, and who gets to decide. Every prompt
            you write sits at the end of this 180-year story.
          </p>
        </TonePanel>
      </section>

      {/* ── Closing ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          Now you know the story. Next, see how these models actually learn —
          what happens inside the machine when you type a prompt.
        </p>
        <a
          href="/modules/ai-foundations/how-models-learn"
          className="action-primary mt-4 inline-block"
        >
          Continue to Lesson 2 →
        </a>
      </TonePanel>
    </>
  );
}
