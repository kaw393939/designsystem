import type { Metadata } from "next";
import Image from "next/image";

import { EditorialBand } from "@/components/editorial-band";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import {
  commonCliches,
  promptAnatomySections,
  promptExamples,
} from "@/lib/module-content/visual-ai";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prompting for images",
};

export default function PromptingForImagesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="synthesis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 2 · Module 4
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Prompting for images
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            This lesson is practical. You will learn a prompt structure, see
            real examples, and understand how to iterate.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          Every prompt gives the model coordinates in its learned space. The
          more specific your coordinates, the closer you get to what you
          actually want. This lesson shows you the structure that works.
        </p>
      </TonePanel>

      {/* ── Prompt anatomy ── */}
      <section>
        <SectionHeading
          eyebrow="Structure"
          title="Prompt anatomy"
          body="Six parts of a well-structured image prompt. You do not need all six every time — but knowing them means you can diagnose why a prompt failed."
        />

        <div className="mt-6 space-y-5">
          {promptAnatomySections.map((section, index) => (
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
                  {section.example}
                </p>
              </div>
            </TonePanel>
          ))}
        </div>
      </section>

      {/* ── Annotated examples ── */}
      <section>
        <SectionHeading
          eyebrow="Examples"
          title="Annotated prompt examples"
          body="Ten generated illustrations from this course, each shown with the prompt that created it and a teaching annotation."
        />

        <div className="mt-6 space-y-8">
          {promptExamples.map((example) => (
            <div
              key={example.id}
              className="rounded-(--radius-card) border border-(--border-strong) bg-[rgba(255,255,255,0.56)] overflow-hidden"
            >
              <Image
                src={example.imageSrc}
                alt={example.imageAlt}
                width={800}
                height={400}
                loading="lazy"
                className="w-full"
              />
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-(--accent-strong)/10 px-2.5 py-0.5 type-caption font-medium text-(--accent-strong)">
                    {example.category}
                  </span>
                  {example.isApproximate && (
                    <span className="rounded-full bg-(--warning)/10 px-2.5 py-0.5 type-caption font-medium text-(--warning)">
                      approximate prompt
                    </span>
                  )}
                </div>
                <div className="rounded-(--radius-card) bg-(--bg-inset) p-4">
                  <p className="type-meta text-(--ink-strong)">Prompt</p>
                  <p className="mt-1 type-caption text-(--ink-body) italic">
                    &ldquo;{example.prompt}&rdquo;
                  </p>
                </div>
                <p className="type-body text-(--ink-body)">
                  <strong className="text-(--ink-strong)">Teaching point:</strong>{" "}
                  {example.annotation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Iteration patterns ── */}
      <section>
        <SectionHeading
          eyebrow="Technique"
          title="Iteration patterns"
          body="The first result is a draft, not a final. Three ways to improve."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Refine
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Same subject, adjust one parameter — style, lighting, or
              composition. Change one thing at a time so you learn what each
              parameter controls.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Vary
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Keep the concept, change the approach entirely. If an editorial
              illustration is not working, try a photographic direction. If
              wide format fails, try square.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Extend
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Use a successful image as a starting point for related images.
              Once you find a style that works, adapt the prompt for adjacent
              content — keeping the same style cues and adjusting only the
              subject.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Common clichés ── */}
      <section>
        <SectionHeading
          eyebrow="Avoid"
          title="Common clichés to avoid"
          body="If the image could belong to any website, it belongs to none."
        />

        <div className="mt-6 space-y-4">
          {commonCliches.map((cliche) => (
            <TonePanel key={cliche.id} tone="warning" className="p-6">
              <p className="font-semibold type-body text-(--ink-strong)">
                {cliche.label}
              </p>
              <p className="mt-2 type-body text-(--ink-body)">
                {cliche.description}
              </p>
            </TonePanel>
          ))}
        </div>
      </section>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          Good prompts are specific, honest about limitations, and tied to the
          page&apos;s actual needs. Next: when to use these images and when not
          to.
        </p>
        <Link
          href="/modules/visual-ai/editorial-judgment"
          className="action-primary mt-4 inline-block"
        >
          Continue to Lesson 3 →
        </Link>
      </TonePanel>
    </>
  );
}
