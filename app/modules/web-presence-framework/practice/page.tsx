import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { TonePanel } from "@/components/tone-panel";
import {
  museumAuditItems,
  portfolioAuditItems,
} from "@/lib/web-presence-site-content";

export const metadata: Metadata = {
  title: "Practice",
};

export default function WebPresencePracticePage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="reading" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Practice · Module 1
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Audit a live site
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Apply the framework by auditing a real site — your own or a
            provided example — using the portfolio and museum checklists.
          </p>
        </div>
      </EditorialBand>

      {/* ── Task ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Your task</h2>
        <ol className="mt-4 list-decimal pl-6 space-y-3 type-body text-(--ink-body)">
          <li>
            Choose a live site to audit. Use your own portfolio or museum site
            if you have one, or pick any professional portfolio or curated
            content site.
          </li>
          <li>
            Open the site and spend five seconds looking at the first screen.
            Write down what you believe the site promises and who it is for.
          </li>
          <li>
            Run through both checklists below. For each item, score how well
            the site handles it (strong / adequate / weak / missing).
          </li>
          <li>
            Identify the archetype the site appears to use. Does the visual
            direction match?
          </li>
          <li>
            Write a one-paragraph audit summary: what works, what does not, and
            what one change would improve the first read most.
          </li>
        </ol>
      </section>

      {/* ── Portfolio checklist ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">
          Portfolio audit checklist
        </h2>
        <div className="mt-4 space-y-3">
          {portfolioAuditItems.map((item, index) => (
            <TonePanel key={item} tone="reading" className="p-5">
              <p className="type-body text-(--ink-body)">
                <span className="font-semibold text-(--ink-strong)">
                  {index + 1}.
                </span>{" "}
                {item}
              </p>
            </TonePanel>
          ))}
        </div>
      </section>

      {/* ── Museum checklist ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">
          Museum audit checklist
        </h2>
        <div className="mt-4 space-y-3">
          {museumAuditItems.map((item, index) => (
            <TonePanel key={item} tone="reading" className="p-5">
              <p className="type-body text-(--ink-body)">
                <span className="font-semibold text-(--ink-strong)">
                  {index + 1}.
                </span>{" "}
                {item}
              </p>
            </TonePanel>
          ))}
        </div>
      </section>

      {/* ── Tips ── */}
      <TonePanel tone="reflection" className="p-6">
        <p className="font-semibold type-body text-(--ink-strong)">Tips</p>
        <ul className="mt-3 list-disc pl-6 space-y-2 type-body text-(--ink-body)">
          <li>
            The five-second test is the most important part. If you cannot name
            the audience and promise in five seconds, the site has a signal
            problem.
          </li>
          <li>
            Be honest in scoring. &ldquo;Adequate&rdquo; is fine — most sites
            land there. The goal is to see where the gaps are.
          </li>
          <li>
            Focus your summary on the single highest-impact change. If you
            could fix one thing, what would move the needle most?
          </li>
        </ul>
      </TonePanel>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          Bring your audit notes to class. You will exchange them with a
          classmate in the checkpoint.
        </p>
        <a
          href="/modules/web-presence-framework/checkpoint"
          className="action-primary mt-4 inline-block"
        >
          Continue to Checkpoint →
        </a>
      </TonePanel>
    </>
  );
}
