import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import {
  briefRubric,
  briefSections,
} from "@/lib/module-content/agentic-workflow";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Writing briefs AI can follow",
};

export default function WritingBriefsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="next" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 2 · Module 3
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Writing briefs AI can follow
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            A brief is not a wish. It is an instruction set with enough detail
            that the result can be checked.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          This lesson breaks a brief into five sections. Each section has a
          definition and a concrete example drawn from web-presence work — the
          same kind of task you will use in the practice exercise.
        </p>
      </TonePanel>

      {/* ── Brief anatomy ── */}
      <section>
        <SectionHeading
          eyebrow="Anatomy"
          title="The five sections of a brief"
          body="Every effective brief has these five parts. Skip one, and you give the model room to guess."
        />

        <div className="mt-6 space-y-5">
          {briefSections.map((section, index) => (
            <TonePanel key={section.id} tone="reading" className="p-6">
              <p className="type-meta text-(--accent-strong)">
                {index + 1}. {section.title}
              </p>
              <p className="mt-2 type-body text-(--ink-body)">
                {section.definition}
              </p>
              <div className="mt-3 rounded-(--radius-card) border border-(--border-strong) bg-[rgba(255,255,255,0.4)] p-4">
                <p className="type-meta text-(--ink-strong)">Example</p>
                <p className="mt-1 type-caption text-(--ink-body) italic">
                  &ldquo;{section.example}&rdquo;
                </p>
              </div>
            </TonePanel>
          ))}
        </div>
      </section>

      {/* ── Good brief vs. bad brief ── */}
      <section>
        <SectionHeading
          eyebrow="Comparison"
          title="Good brief vs. bad brief"
          body="The same task — rewriting an About page hero section — with two different levels of instruction."
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <TonePanel tone="warning" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Bad brief
            </p>
            <p className="mt-3 type-body text-(--ink-body) italic">
              &ldquo;Make my About page better.&rdquo;
            </p>
            <p className="mt-3 type-caption text-(--ink-body)">
              No role, no scope, no constraints, no criteria. The model will
              guess what &ldquo;better&rdquo; means — and its guess will
              probably not match yours.
            </p>
          </TonePanel>

          <TonePanel tone="next" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Good brief
            </p>
            <p className="mt-3 type-body text-(--ink-body) italic">
              &ldquo;Rewrite the first paragraph of my About page to lead with
              the audience need (hiring managers evaluating senior engineers).
              Keep the tone direct and confident. Do not add claims I cannot
              prove. The paragraph should be 3–4 sentences.&rdquo;
            </p>
            <p className="mt-3 type-caption text-(--ink-body)">
              Names the audience, constrains scope to one paragraph, sets tone,
              adds a proof constraint, and specifies length.
            </p>
          </TonePanel>
        </div>

        <TonePanel tone="reading" className="mt-6 p-6">
          <p className="font-semibold type-body text-(--ink-strong)">
            What makes the good version work
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 type-body text-(--ink-body)">
            <li>
              <strong>Names the audience</strong> — hiring managers, not
              &ldquo;visitors&rdquo;
            </li>
            <li>
              <strong>Constrains scope</strong> — first paragraph only, not the
              whole page
            </li>
            <li>
              <strong>Defines tone</strong> — direct and confident, not
              &ldquo;better&rdquo;
            </li>
            <li>
              <strong>Adds a constraint about proof</strong> — &ldquo;do not add
              claims I cannot prove&rdquo;
            </li>
            <li>
              <strong>Sets format</strong> — 3–4 sentences
            </li>
          </ul>
        </TonePanel>
      </section>

      {/* ── The build brief is already an AI brief ── */}
      <section>
        <SectionHeading
          eyebrow="Connection"
          title="Your build brief is already an AI brief"
          body="If you followed the tour, you already have a brief. Let's see if it is specific enough."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            The Build step in the tour asks you to write a brief &ldquo;clear
            enough for a classmate or AI tool to follow.&rdquo; That same
            document works for both audiences — as long as it passes the rubric
            below.
          </p>

          <p className="type-body text-(--ink-body)">
            Pull up your build brief and check it against each question. If you
            answer &ldquo;no&rdquo; to any item, that is the section to revise
            before handing it to an AI tool.
          </p>
        </div>
      </section>

      {/* ── Brief quality rubric ── */}
      <section>
        <SectionHeading
          eyebrow="Checklist"
          title="Brief quality rubric"
          body="Six questions to assess whether your brief is specific enough for an AI tool to follow."
        />

        <ol className="mt-6 space-y-4">
          {briefRubric.map((item, index) => (
            <li
              key={item.id}
              className="flex gap-4 rounded-(--radius-card) border border-(--border-strong) bg-[rgba(255,255,255,0.56)] p-5"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-strong)]/10 text-sm font-semibold text-(--accent-strong)">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold type-body text-(--ink-strong)">
                  {item.question}
                </p>
                <p className="mt-1 type-caption text-(--ink-body)">
                  {item.tip}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          A well-written brief does double duty: a classmate can follow it, and
          an AI tool can follow it. Next: the honest limits — when AI helps
          and when it does not.
        </p>
        <Link
          href="/modules/agentic-workflow/honest-limits"
          className="action-primary mt-4 inline-block"
        >
          Continue to Lesson 3 →
        </Link>
      </TonePanel>
    </>
  );
}
