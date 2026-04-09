import type { Metadata } from "next";
import Image from "next/image";

import { EditorialBand } from "@/components/editorial-band";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";
import {
  modelComparisonRows,
  specificityLadder,
} from "@/lib/module-content/visual-ai";

export const metadata: Metadata = {
  title: "How image models see",
};

export default function HowImageModelsSeePage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="synthesis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 1 · Module 4
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            How image models see
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            In Module 2, you learned how language models turn words into
            coordinates. Image models do something similar — but with pixels.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          This lesson connects what you already know about embeddings to the
          visual domain. By the end, you will understand why specific prompts
          produce better images — and why abstract descriptions like
          &ldquo;professional&rdquo; produce generic results.
        </p>
      </TonePanel>

      {/* ── From text embeddings to image embeddings ── */}
      <section>
        <SectionHeading
          eyebrow="Connection"
          title="From text embeddings to image embeddings"
          body="The same principle, applied to a different kind of data."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            In{" "}
            <a
              href="/modules/ai-foundations/how-models-learn"
              className="underline text-(--accent-strong)"
            >
              Module 2 Lesson 2
            </a>
            , you learned that language models turn words into vectors —
            coordinates in a learned space where similar meanings cluster
            together. Image models do the same thing with visual data.
          </p>
          <p className="type-body text-(--ink-body)">
            An image model learns a <strong>visual latent space</strong>: a
            coordinate system where similar images sit near each other and
            different images sit far apart. A photograph of a sunset and a
            painting of a sunset occupy nearby regions — not because they share
            pixels, but because they share learned visual features.
          </p>

          <Image
            src="/media/modules/generated/latent-space-landscape-v1.webp"
            alt="Topographic landscape visualization of a latent space with contour lines"
            width={800}
            height={400}
            className="mt-4 w-full rounded-(--radius-card)"
          />
          <p className="type-caption text-(--ink-body) italic">
            The latent space visualized as a landscape: nearby hills represent
            similar concepts, distant peaks represent unrelated ones.
          </p>
        </div>
      </section>

      {/* ── What "style" means to a model ── */}
      <section>
        <SectionHeading
          eyebrow="Concept"
          title="What &ldquo;style&rdquo; means to a model"
          body="Designers think about style as a coherent visual identity. Models encounter style as statistical patterns."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            When you say &ldquo;editorial illustration style,&rdquo; the model
            does not understand editorial intent. It finds the region of its
            training data where images tagged with similar words cluster — and
            generates something that matches those statistical patterns: texture
            frequencies, color distributions, and stroke characteristics.
          </p>
          <p className="type-body text-(--ink-body)">
            This is why &ldquo;in the style of&rdquo; prompts work — and why
            they produce <em>approximations</em>, not copies. The model does not
            know what an editorial illustration <em>is</em>. It knows what the
            visual distribution of editorial illustrations looks like in its
            training data.
          </p>
        </div>
      </section>

      {/* ── What "composition" means in vector space ── */}
      <section>
        <SectionHeading
          eyebrow="Concept"
          title="What &ldquo;composition&rdquo; means in vector space"
          body="Spatial relationships are encoded as relative positions in the image tensor."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            When you write &ldquo;subject on the left, negative space on the
            right,&rdquo; you are asking the model to generate an image where
            spatial relationships match a specific pattern. But the model&apos;s
            spatial reasoning is approximate — it knows that portraits tend to
            be centered and landscapes tend to be wide, but it cannot reliably
            follow complex layout instructions.
          </p>

          <TonePanel tone="warning" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Why detailed spatial prompts often get ignored
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              The model builds images from learned distributions, not from
              blueprints. It processes your spatial instructions as soft
              preferences, not hard constraints. If you need precise
              composition, iterate — do not rely on a single generation.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Designer vs. model comparison ── */}
      <section>
        <SectionHeading
          eyebrow="Comparison"
          title="What you mean vs. what the model processes"
          body="Five concepts designers use every day — and what they actually mean to an image model."
        />

        <div className="mt-6">
          {/* Desktop: table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full border-collapse type-body">
              <thead>
                <tr className="border-b border-(--border-strong)">
                  <th className="p-3 text-left font-semibold text-(--ink-strong)">
                    Designer concept
                  </th>
                  <th className="p-3 text-left font-semibold text-(--ink-strong)">
                    What the model sees
                  </th>
                </tr>
              </thead>
              <tbody>
                {modelComparisonRows.map((row) => (
                  <tr
                    key={row.designerConcept}
                    className="border-b border-(--border-strong)/40"
                  >
                    <td className="p-3 font-medium text-(--ink-strong)">
                      {row.designerConcept}
                    </td>
                    <td className="p-3 text-(--ink-body)">
                      {row.whatModelSees}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked cards */}
          <div className="space-y-4 lg:hidden">
            {modelComparisonRows.map((row) => (
              <div
                key={row.designerConcept}
                className="rounded-(--radius-card) border border-(--border-strong) p-4"
              >
                <p className="font-semibold type-meta text-(--accent-strong)">
                  {row.designerConcept}
                </p>
                <p className="mt-2 type-caption text-(--ink-body)">
                  {row.whatModelSees}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why specificity wins ── */}
      <section>
        <SectionHeading
          eyebrow="Technique"
          title="Why specificity wins"
          body="Concrete details give the model better coordinates. Abstract descriptions map to the statistical average of training data — which is generic."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            Watch what happens when you increase specificity on the same prompt.
            Each version narrows the model&apos;s search space.
          </p>

          {specificityLadder.map((level, index) => (
            <TonePanel
              key={level.level}
              tone={index === 2 ? "next" : index === 1 ? "reading" : "warning"}
              className="p-6"
            >
              <p className="font-semibold type-body text-(--ink-strong)">
                {level.label}
              </p>
              <p className="mt-2 type-body text-(--ink-body) italic">
                &ldquo;{level.prompt}&rdquo;
              </p>
              <p className="mt-2 type-caption text-(--ink-body)">
                {level.annotation}
              </p>
            </TonePanel>
          ))}
        </div>
      </section>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          The model does not see what you see. It works from patterns in its
          training data. Your job is to describe what you want in terms close
          enough to those patterns. Next: how to write prompts that work.
        </p>
        <a
          href="/modules/visual-ai/prompting-for-images"
          className="action-primary mt-4 inline-block"
        >
          Continue to Lesson 2 →
        </a>
      </TonePanel>
    </>
  );
}
