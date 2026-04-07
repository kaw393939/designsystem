import type { Metadata } from "next";
import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { SplitLayout } from "@/components/split-layout";
import { TonePanel } from "@/components/tone-panel";
import {
  archetypePersuasionMap,
  persuasionMethods,
} from "@/lib/persuasion-content";

export const metadata: Metadata = {
  title: "Persuasion Methods — Cialdini × Archetypes",
  description:
    "How to combine Robert Cialdini's six principles of persuasion with brand archetypes to build hero sections and CTAs that actually convert.",
};

export default function PersuasionPage() {
  return (
    <PageShell>
      {/* ── Hero ─────────────────────────────────────── */}
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Cialdini × Archetypes
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Six principles of persuasion. Twelve archetypes. One system to
            connect them.
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Robert Cialdini identified six psychological triggers that drive
            human compliance: reciprocity, commitment, social proof, authority,
            liking, and scarcity. Each archetype naturally leans on one or two
            of these. Understanding the overlap means you can design hero
            sections and CTAs that feel authentic to the archetype{" "}
            <em>and</em> psychologically effective — instead of just guessing
            which button color converts best.
          </p>
        </div>
      </EditorialBand>

      {/* ── Quick orientation ────────────────────────── */}
      <section className="space-y-6">
        <SectionHeading
          eyebrow="How this works"
          title="Pick the method. See which archetypes own it. Then build the hero."
          body="Each principle below includes a definition, the psychology behind it, the archetypes that use it best, a fully worked hero-section example, and implementation notes you can take straight into code."
        />
      </section>

      {/* ── Six methods — deep dives ─────────────────── */}
      {persuasionMethods.map((method, idx) => (
        <section
          key={method.slug}
          id={method.slug}
          className="scroll-mt-28 space-y-8"
        >
          {/* Section header with image */}
          <SectionHeading
            eyebrow={`Principle ${idx + 1} of 6`}
            title={method.name}
            body={method.tagline}
          />

          <SplitLayout
            ratio="feature"
            primary={
              <TonePanel tone="reading" className="card-shell overflow-hidden p-0">
                <img
                  src={method.imagePath}
                  alt={`${method.name} principle illustration`}
                  className="atlas-card-image w-full"
                />
                <div className="p-6 space-y-4">
                  <h3 className="type-concept text-(--ink-strong)">
                    What is {method.name}?
                  </h3>
                  <p className="type-body text-(--ink-body)">
                    {method.definition}
                  </p>
                </div>
              </TonePanel>
            }
            secondary={
              <div className="space-y-6">
                <TonePanel tone="proof" className="p-6 space-y-4">
                  <h3 className="type-concept text-(--ink-strong)">
                    Why it works
                  </h3>
                  <p className="type-body text-(--ink-body)">
                    {method.whyItWorks}
                  </p>
                </TonePanel>

                <TonePanel tone="reflection" className="p-6 space-y-4">
                  <h3 className="type-concept text-(--ink-strong)">
                    Strongest archetypes
                  </h3>
                  <div className="space-y-3">
                    {method.strongArchetypes.map((arch) => (
                      <div
                        key={arch.slug}
                        className="rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.6)] px-4 py-3"
                      >
                        <Link
                          href={`/archetypes/${arch.slug}`}
                          className="type-meta text-(--accent-strong) hover:underline"
                        >
                          {arch.name}
                        </Link>
                        <p className="mt-1 type-caption text-(--ink-body)">
                          {arch.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </TonePanel>
              </div>
            }
          />

          {/* Hero example showcase */}
          <TonePanel tone="synthesis" className="card-shell p-6 space-y-6">
            <div className="flex items-center gap-3">
              <p className="type-meta text-(--accent-strong)">
                Live hero example — {method.heroExample.archetype} archetype
              </p>
            </div>

            {/* Simulated hero section */}
            <div className="rounded-(--radius-card) border-2 border-(--border-proof) bg-(--surface-proof) p-8 space-y-4">
              <p className="type-meta text-(--accent-strong) uppercase tracking-widest">
                {method.heroExample.archetype}
              </p>
              <h2 className="type-hero text-(--ink-strong) text-balance">
                {method.heroExample.headline}
              </h2>
              <p className="type-body text-(--ink-body) measure-reading">
                {method.heroExample.deck}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <span className="inline-flex items-center rounded-full bg-(--accent-strong) px-6 py-3 type-meta text-white font-semibold shadow-md">
                  {method.heroExample.ctaLabel}
                </span>
                <span className="type-caption text-(--ink-body)">
                  {method.heroExample.ctaSubtext}
                </span>
              </div>
            </div>

            <p className="type-caption text-(--ink-body) italic">
              Visual direction: {method.heroExample.visualDirection}
            </p>
          </TonePanel>

          {/* Implementation notes */}
          <SplitLayout
            ratio="balanced"
            primary={
              <TonePanel tone="next" className="p-6 space-y-4">
                <h3 className="type-concept text-(--ink-strong)">
                  Implementation notes
                </h3>
                <ul className="space-y-2 pl-5 type-body text-(--ink-body) list-disc">
                  {method.implementationNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </TonePanel>
            }
            secondary={
              <TonePanel tone="warning" className="p-6 space-y-4">
                <h3 className="type-concept text-(--ink-strong)">
                  Common mistake
                </h3>
                <p className="type-body text-(--ink-body)">
                  {method.commonMistake}
                </p>
              </TonePanel>
            }
          />
        </section>
      ))}

      {/* ── Archetype × Method mapping table ────────── */}
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Quick reference"
          title="Every archetype, mapped to its primary and secondary persuasion method."
          body="Use this table when you know the archetype and need to decide which persuasion lever to pull first."
        />

        <TonePanel tone="reading" className="card-shell overflow-x-auto p-0">
          <table className="w-full type-body text-(--ink-body)">
            <thead>
              <tr className="border-b border-(--border-neutral) bg-(--surface-proof)">
                <th className="px-4 py-3 text-left type-meta text-(--ink-strong)">
                  Archetype
                </th>
                <th className="px-4 py-3 text-left type-meta text-(--ink-strong)">
                  Primary
                </th>
                <th className="px-4 py-3 text-left type-meta text-(--ink-strong)">
                  Secondary
                </th>
                <th className="px-4 py-3 text-left type-meta text-(--ink-strong)">
                  Why
                </th>
              </tr>
            </thead>
            <tbody>
              {archetypePersuasionMap.map((row) => (
                <tr
                  key={row.slug}
                  className="border-b border-(--border-neutral) last:border-0"
                >
                  <td className="px-4 py-3 font-semibold">
                    <Link
                      href={`/archetypes/${row.slug}`}
                      className="text-(--accent-strong) hover:underline"
                    >
                      {row.archetype}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{row.primaryMethod}</td>
                  <td className="px-4 py-3">{row.secondaryMethod}</td>
                  <td className="px-4 py-3 type-caption">{row.reasoning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TonePanel>
      </section>

      {/* ── Closing guidance ──────────────────────────── */}
      <CalloutBand
        label="Use this responsibly"
        title="Persuasion is a design tool, not a manipulation tool."
        tone="warning"
      >
        <p>
          Every principle on this page can be used ethically or exploitatively.
          The difference is whether the visitor benefits from saying yes. If
          your CTA leads to genuine value, persuasion is service. If it leads
          to regret, it is manipulation. Cialdini himself has written
          extensively about this distinction — the goal is to direct attention,
          not to deceive.
        </p>
      </CalloutBand>

      <EditorialBand tone="reflection" paddingScale="reading">
        <div className="measure-wide space-y-4">
          <h2 className="type-section text-(--ink-strong)">
            Where to go from here
          </h2>
          <p className="type-body text-(--ink-body)">
            Now that you know which persuasion methods pair with which
            archetypes, go build something. Start with the{" "}
            <Link
              href="/hero-examples"
              className="text-(--accent-strong) underline hover:no-underline"
            >
              Hero Examples
            </Link>{" "}
            page to see live coded hero sections, or jump to the{" "}
            <Link
              href="/archetypes"
              className="text-(--accent-strong) underline hover:no-underline"
            >
              Archetypes
            </Link>{" "}
            section to deep-dive into a specific archetype and see how its
            persuasion emphasis plays out across fonts, layout, proof, and
            CTAs.
          </p>
        </div>
      </EditorialBand>
    </PageShell>
  );
}
