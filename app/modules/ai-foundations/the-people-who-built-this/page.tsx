import type { Metadata } from "next";
import Image from "next/image";

import { EditorialBand } from "@/components/editorial-band";
import { PersonProfileGrid } from "@/components/person-profile-grid";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import {
  getPeopleByEraCluster,
  institutionProfiles,
} from "@/lib/module-content/ai-foundations";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The people who built this",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
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

function institutionGridItems() {
  return institutionProfiles.map((i) => ({
    name: i.name,
    era: i.era,
    role: i.role,
    summary: i.summary,
    imageSrc: i.imageSrc,
  }));
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function ThePeopleWhoBuiltThisPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="reading" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 3 · Module 2
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            The people who built this
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            AI is not a single invention. It is a relay of ambitions carried by
            specific people, labs, and institutions across 180 years.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          The researchers below are grouped by era. Each portrait links their
          story to the turning points from Lesson 1. You are not expected to
          memorize everyone — just see the pattern: ideas move between people,
          and institutions shape who gets heard.
        </p>
      </TonePanel>

      {/* ── Precursors and founders ── */}
      <section>
        <SectionHeading
          eyebrow="Pre-1960"
          title="Precursors and founders"
          body="The mathematicians, logicians, and engineers who assembled the raw materials before AI had a name."
        />
        <PersonProfileGrid
          people={profileGridPeople("Precursors")}
          className="mt-6"
        />
        <PersonProfileGrid
          people={profileGridPeople("Field formation")}
          className="mt-6"
        />
      </section>

      {/* ── Builders and critics ── */}
      <section>
        <SectionHeading
          eyebrow="1960–2000"
          title="Builders and critics"
          body="The generation that built symbolic AI, expert systems, and the first neural networks — and the critics whose reviews shaped which ideas survived the AI winter."
        />
        <PersonProfileGrid
          people={[
            ...profileGridPeople("Symbolic optimism"),
            ...profileGridPeople("Expert systems"),
            ...profileGridPeople("Statistical revival"),
          ]}
          className="mt-6"
        />

        <TonePanel tone="warning" className="mt-8 p-6">
          <p className="font-semibold type-body text-(--ink-strong)">
            The Lighthill critique and funding collapse
          </p>
          <p className="mt-2 type-body text-(--ink-body)">
            In 1973, James Lighthill told the British government that AI had
            failed. Funding collapsed. Minsky and Papert&apos;s 1969 critique of
            the Perceptron had already redirected research away from neural
            networks. These two moments — one institutional, one intellectual —
            shaped which ideas got resources and which got starved for over a
            decade.
          </p>
        </TonePanel>
      </section>

      {/* ── The learning revolution ── */}
      <section>
        <SectionHeading
          eyebrow="2000–2020"
          title="The learning revolution"
          body="The 'deep learning trinity' who proved that neural networks — the approach the field had abandoned — could outperform everything."
        />
        <PersonProfileGrid
          people={profileGridPeople("Deep learning")}
          className="mt-6"
        />
      </section>

      {/* ── The public AI era ── */}
      <section>
        <SectionHeading
          eyebrow="2020–present"
          title="The public AI era"
          body="Researchers, executives, and advocates shaping how AI reaches the world — and arguing about who gets to decide."
        />
        <PersonProfileGrid
          people={profileGridPeople("Foundation models")}
          className="mt-6"
        />
      </section>

      {/* ── Institutions ── */}
      <section>
        <SectionHeading
          eyebrow="Institutions"
          title="The labs and organizations"
          body="AI was never just individuals. These institutions provided funding, direction, and the culture that shaped what got built."
        />

        <Image
          src="/media/modules/generated/people-institutions-hero.webp"
          alt="Illustration of key AI research institutions through the decades"
          width={960}
          height={480}
          loading="lazy"
          className="mt-6 w-full rounded-(--radius-card)"
        />

        <PersonProfileGrid
          people={institutionGridItems()}
          className="mt-6"
        />
      </section>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          These are the people behind the tools you use. Knowing their work
          helps you understand what the tools can and cannot do — and why
          certain choices were made along the way.
        </p>
        <p className="mt-4 type-body text-(--ink-body)">
          Now put what you have learned into practice: pick a primary source
          paper and write a one-paragraph summary.
        </p>
        <Link
          href="/modules/ai-foundations/practice"
          className="action-primary mt-4 inline-block"
        >
          Continue to Practice →
        </Link>
      </TonePanel>
    </>
  );
}
