import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { SectionHeading } from "@/components/section-heading";
import { TonePanel } from "@/components/tone-panel";

export const metadata: Metadata = {
  title: "Portfolio as proof system",
};

export default function PortfolioAsProofPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Lesson 3 · Module 5
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Portfolio as proof system
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            The portfolio itself is a proof artifact — it demonstrates the
            skills it claims. When identity and evidence work together, every
            section earns the next scroll.
          </p>
        </div>
      </EditorialBand>

      {/* ── Orientation ── */}
      <TonePanel tone="emphasis" className="p-6">
        <p className="type-body text-(--ink-body)">
          This lesson moves from theory to examples. You will see how
          identity, proof, and presentation work together in student
          exemplars — and where common failures undermine even strong work.
        </p>
      </TonePanel>

      {/* ── The portfolio as proof ── */}
      <section>
        <SectionHeading
          eyebrow="Principle"
          title="The portfolio proves itself"
          body="A design portfolio that cannot demonstrate design judgment has already failed."
        />

        <div className="mt-6 space-y-4">
          <p className="type-body text-(--ink-body)">
            The portfolio is not just a container for proof — it is proof. The
            layout choices, the typographic hierarchy, the image treatment, the
            pacing — all of it is a live demonstration of the skills the
            student claims. A portfolio that claims &ldquo;attention to
            detail&rdquo; but has orphaned headings and inconsistent spacing
            contradicts itself on every screen.
          </p>
          <TonePanel tone="reflection" className="p-6">
            <p className="type-body text-(--ink-body)">
              &ldquo;Does every section of the portfolio earn the next
              scroll?&rdquo; — If the answer is no, the page is losing trust
              before the visitor reaches the proof that matters.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Annotated exemplars ── */}
      <section>
        <SectionHeading
          eyebrow="Examples"
          title="Student exemplar walk-throughs"
          body="How identity + proof + presentation work together in practice."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Jules Morrow — Portfolio
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Creator archetype. The first screen shows a single project hero
              with a bold claim and a process link. Identity and proof arrive
              together: the visual direction says &ldquo;original craft,&rdquo;
              and the case study link proves it immediately.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Nia Okafor — Portfolio
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Sage archetype. Dense, information-rich grid with citations and
              methodology notes visible in the first fold. The layout itself
              signals depth — the visitor trusts the work before reading a full
              case study because the presentation demonstrates rigor.
            </p>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Noor Valdez — Portfolio
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              Hero archetype. Clean, confident layout with metrics front and
              center. Each project card leads with an outcome number, not a
              description. The identity system is competence under pressure —
              and every design decision reinforces it.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Common failures ── */}
      <section>
        <SectionHeading
          eyebrow="Avoid"
          title="Common failures"
          body="Beautiful portfolios that prove nothing, and evidence-heavy portfolios with no identity."
        />

        <div className="mt-6 space-y-4">
          <TonePanel tone="warning" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              All surface, no substance
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              A visually polished portfolio with gorgeous layouts but no case
              studies, no metrics, no process documentation. The visitor thinks:
              &ldquo;This looks great — but can they actually do the work?&rdquo;
            </p>
          </TonePanel>

          <TonePanel tone="warning" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              All evidence, no identity
            </p>
            <p className="mt-2 type-body text-(--ink-body)">
              A portfolio packed with proof but no coherent visual direction.
              The case studies are strong, the metrics are real — but the page
              itself feels generic. There is no identity system holding it
              together, so the visitor cannot form a lasting impression.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Full walk-through link ── */}
      <TonePanel tone="reading" className="p-6">
        <p className="type-body text-(--ink-body)">
          See annotated portfolio examples in{" "}
          <a
            href="/experiences/identity-portfolio"
            className="underline text-(--accent-strong) hover:text-(--accent-hover)"
          >
            the identity portfolio experience
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
          Review your portfolio with fresh eyes: does every section earn the
          next scroll? Identify the one section where identity and proof are
          weakest.
        </p>
        <a
          href="/modules/identity-and-proof/practice"
          className="action-primary mt-4 inline-block"
        >
          Continue to Practice →
        </a>
      </TonePanel>
    </>
  );
}
