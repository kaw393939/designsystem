import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { TonePanel } from "@/components/tone-panel";
import { readingList } from "@/lib/module-content/ai-foundations";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Practice",
};

export default function PracticePage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="reading" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Practice · Module 2
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Practice: Summarize a primary source
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Pick one paper from the reading list below. Read the abstract and
            introduction. Then write a one-paragraph summary of what it changed.
          </p>
        </div>
      </EditorialBand>

      {/* ── Task ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Your task</h2>

        <ol className="mt-4 list-decimal space-y-3 pl-6 type-body text-(--ink-body)">
          <li>
            Choose one paper from the reading list. Pick something that connects
            to a concept from Lessons 1–3 that surprised you.
          </li>
          <li>
            Read the abstract and introduction. You do not need to understand
            every equation — focus on the <em>claims</em> the authors make.
          </li>
          <li>
            Write a one-paragraph summary using the template below.
          </li>
          <li>
            Bring your summary to class or post it to the course discussion.
          </li>
        </ol>
      </section>

      {/* ── Template ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-meta text-(--accent-strong)">Summary template</p>
        <p className="mt-3 type-body text-(--ink-body) italic">
          &ldquo;This paper [title] by [author(s)] in [year] argued that
          [thesis]. It changed the field because [impact]. The most interesting
          claim is [claim].&rdquo;
        </p>
        <p className="mt-3 type-caption text-(--ink-body)">
          Replace the bracketed sections with your own words. Aim for 3–5
          sentences total.
        </p>
      </TonePanel>

      {/* ── Reading list ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Reading list</h2>
        <p className="mt-2 type-body text-(--ink-body)">
          These ten papers changed the field. Each one connects to a turning
          point from the timeline in Lesson 1.
        </p>

        <ol className="mt-6 space-y-6">
          {readingList.map((entry, index) => (
            <li
              key={entry.id}
              className="rounded-(--radius-card) border border-(--border-strong) bg-[rgba(255,255,255,0.56)] p-5"
            >
              <p className="type-meta text-(--accent-strong)">
                {index + 1}. {entry.year}
              </p>
              <p className="mt-1 font-semibold type-body text-(--ink-strong)">
                {entry.title}
              </p>
              <p className="mt-1 type-caption text-(--ink-body)">
                {entry.authors}
              </p>
              <p className="mt-2 type-body text-(--ink-body)">
                {entry.summary}
              </p>
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block type-caption text-(--accent-strong) underline"
              >
                {entry.urlLabel} ↗
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Tips ── */}
      <TonePanel tone="reflection" className="p-6">
        <p className="font-semibold type-body text-(--ink-strong)">
          Tips for reading primary sources
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 type-body text-(--ink-body)">
          <li>
            Start with the abstract. If it does not make sense, read the
            introduction next — not the methods section.
          </li>
          <li>
            Look for the sentence that starts &ldquo;We show that…&rdquo; or
            &ldquo;Our main contribution is…&rdquo; — that is the thesis.
          </li>
          <li>
            Skip equations on your first pass. Come back to them only if the
            argument depends on understanding a specific formula.
          </li>
          <li>
            If you get stuck, search for a blog post or video that explains the
            paper. Then return to the original.
          </li>
        </ul>
      </TonePanel>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          After you have written your summary, check your understanding with the
          module checkpoint.
        </p>
        <Link
          href="/modules/ai-foundations/checkpoint"
          className="action-primary mt-4 inline-block"
        >
          Continue to Checkpoint →
        </Link>
      </TonePanel>
    </>
  );
}
