import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { SplitLayout } from "@/components/split-layout";
import { TonePanel } from "@/components/tone-panel";
import {
  archetypePersuasionMap,
  persuasionMethods,
} from "@/lib/persuasion-content";
import { withBasePath } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Persuasion and Trust",
  description:
    "How different persuasion moves fit different archetypes, proof choices, and next-step styles.",
};

function studentText(text: string) {
  return text.replace(/\bCTAs\b/g, "buttons").replace(/\bCTA\b/g, "button");
}

function takeSentences(text: string, count = 2) {
  return studentText(text.split(/(?<=[.!?])\s+/).filter(Boolean).slice(0, count).join(" "));
}

export default function PersuasionPage() {
  return (
    <PageShell>
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Cialdini × Archetypes
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Six persuasion moves. Twelve archetypes. One way to make a page
            feel believable.
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            These six moves explain why people trust, click, or hold back. Use them to match the
            proof and the next step to the kind of promise the page is making.
          </p>
        </div>
      </EditorialBand>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="How this works"
          title="Pick a persuasion move, see which archetypes fit it, then try it on the hero."
          body="Each section shows the move, who it fits, a sample first screen, and the easiest way to break it."
        />
      </section>

      <CalloutBand
        label="Shorter version"
        title="Need the shorter version?"
        tone="warning"
      >
        <p>
          Open <Link href="/browse/attention-trust" className="underline hover:no-underline">/browse/attention-trust</Link> if you just need a fast proof-and-next-step comparison. Stay here if you want the longer reference with all six moves.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/browse/attention-trust" className="action-primary">
            Open the browse room
          </Link>
          <Link href="/tour/proof" className="action-secondary">
            Return to the proof step
          </Link>
        </div>
      </CalloutBand>

      {persuasionMethods.map((method, idx) => (
        <section
          key={method.slug}
          id={method.slug}
          className="scroll-mt-28 space-y-8"
        >
          <SectionHeading
            eyebrow={`Move ${idx + 1} of 6`}
            title={method.name}
            body={method.tagline}
          />

          <SplitLayout
            ratio="feature"
            primary={
              <TonePanel tone="reading" className="card-shell overflow-hidden p-0">
                <Image
                  src={withBasePath(method.imagePath)}
                  alt={`${method.name} principle illustration`}
                  width={1200}
                  height={900}
                  className="atlas-card-image w-full"
                />
                <div className="p-6 space-y-4">
                  <h3 className="type-concept text-(--ink-strong)">
                    In plain language
                  </h3>
                  <p className="type-body text-(--ink-body)">
                    {takeSentences(method.definition, 2)}
                  </p>
                </div>
              </TonePanel>
            }
            secondary={
              <div className="space-y-6">
                <TonePanel tone="proof" className="p-6 space-y-4">
                  <h3 className="type-concept text-(--ink-strong)">
                    Works best when
                  </h3>
                  <p className="type-body text-(--ink-body)">
                    {takeSentences(method.whyItWorks, 2)}
                  </p>
                </TonePanel>

                <TonePanel tone="reflection" className="p-6 space-y-4">
                  <h3 className="type-concept text-(--ink-strong)">
                    Usually fits these archetypes
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
                          {takeSentences(arch.reason, 1)}
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
                Sample first screen — {method.heroExample.archetype}
              </p>
            </div>

            <div className="rounded-(--radius-card) border-2 border-(--border-proof) bg-(--surface-proof) p-8 space-y-4">
              <p className="type-meta text-(--accent-strong) uppercase tracking-widest">
                {method.heroExample.archetype}
              </p>
              <h2 className="type-hero text-(--ink-strong) text-balance">
                {method.heroExample.headline}
              </h2>
              <p className="type-body text-(--ink-body) measure-reading">
                {studentText(method.heroExample.deck)}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <span className="inline-flex items-center rounded-full bg-(--accent-strong) px-6 py-3 type-meta text-white font-semibold shadow-md">
                  {studentText(method.heroExample.ctaLabel)}
                </span>
                <span className="type-caption text-(--ink-body)">
                  {studentText(method.heroExample.ctaSubtext)}
                </span>
              </div>
            </div>
          </TonePanel>

          <SplitLayout
            ratio="balanced"
            primary={
              <TonePanel tone="next" className="p-6 space-y-4">
                <h3 className="type-concept text-(--ink-strong)">
                  Put it on the page
                </h3>
                <ul className="space-y-2 pl-5 type-body text-(--ink-body) list-disc">
                  {method.implementationNotes.slice(0, 3).map((note) => (
                    <li key={note}>{studentText(note)}</li>
                  ))}
                </ul>
              </TonePanel>
            }
            secondary={
              <TonePanel tone="warning" className="p-6 space-y-4">
                <h3 className="type-concept text-(--ink-strong)">
                  What breaks it
                </h3>
                <p className="type-body text-(--ink-body)">
                  {takeSentences(method.commonMistake, 1)}
                </p>
              </TonePanel>
            }
          />
        </section>
      ))}

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Quick reference"
          title="Which persuasion moves usually fit each archetype best."
          body="Use this when you already know the archetype and need a fast first move."
        />

        <TonePanel tone="reading" className="card-shell overflow-x-auto p-0">
          <table className="w-full type-body text-(--ink-body)">
            <thead>
              <tr className="border-b border-(--border-neutral) bg-(--surface-proof)">
                <th className="px-4 py-3 text-left type-meta text-(--ink-strong)">
                  Archetype
                </th>
                <th className="px-4 py-3 text-left type-meta text-(--ink-strong)">
                  Start with
                </th>
                <th className="px-4 py-3 text-left type-meta text-(--ink-strong)">
                  Backup
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
                  <td className="px-4 py-3 type-caption">{takeSentences(row.reasoning, 1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TonePanel>
      </section>

      {/* ── Closing guidance ──────────────────────────── */}
      <CalloutBand
        label="Use this responsibly"
        title="Persuasion is a design tool, not a trick."
        tone="warning"
      >
        <p>
          The test is simple: does the visitor benefit from saying yes? If the next step leads to
          real value, persuasion is helping. If it leads to regret, it is manipulation.
        </p>
      </CalloutBand>

      <EditorialBand tone="reflection" paddingScale="regular">
        <div className="measure-wide space-y-4">
          <h2 className="type-section text-(--ink-strong)">
            What to open next
          </h2>
          <p className="type-body text-(--ink-body)">
            Start with the{" "}
            <Link
                href="/examples/proof-blocks"
              className="text-(--accent-strong) underline hover:no-underline"
            >
                proof-block examples
            </Link>{" "}
              to see how stronger evidence changes the page, or jump to the{" "}
            <Link
                href="/browse/archetypes"
              className="text-(--accent-strong) underline hover:no-underline"
            >
                archetypes room
            </Link>{" "}
            to compare a specific archetype and see how the trust move shows up across proof,
            layout, and the next step.
          </p>
        </div>
      </EditorialBand>
    </PageShell>
  );
}
