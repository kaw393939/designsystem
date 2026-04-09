import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { TonePanel } from "@/components/tone-panel";
import { studioReviewCriteria } from "@/lib/web-presence-site-content";

export const metadata: Metadata = {
  title: "Checkpoint",
};

export default function WebPresenceCheckpointPage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="reading" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Checkpoint · Module 1
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Peer review: site audit
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Exchange your audit notes with a classmate. Review each
            other&apos;s analysis using the questions below.
          </p>
        </div>
      </EditorialBand>

      {/* ── Peer exchange ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Peer exchange</h2>
        <ol className="mt-4 list-decimal pl-6 space-y-3 type-body text-(--ink-body)">
          <li>
            Swap audit notes with a partner. Read their notes before looking
            at the site they audited.
          </li>
          <li>
            Now open the site. Spend five seconds on the first screen. Can you
            identify the audience from the first screen alone?
          </li>
          <li>
            Compare your five-second impression with your partner&apos;s
            audit. Where do you agree? Where do you see something different?
          </li>
        </ol>
      </section>

      {/* ── Review questions ── */}
      <TonePanel tone="reflection" className="p-6">
        <p className="font-semibold type-body text-(--ink-strong)">
          Review questions
        </p>
        <ol className="mt-3 list-decimal pl-6 space-y-3 type-body text-(--ink-body)">
          <li>
            Can you identify the site&apos;s audience from the first screen?
          </li>
          <li>
            Does the visual direction match the stated archetype?
          </li>
          <li>
            Where is the proof? Is it visible before the visitor needs to
            scroll or click?
          </li>
          <li>
            What is the one change your partner identified? Do you agree it is
            the highest-impact fix?
          </li>
        </ol>
      </TonePanel>

      {/* ── Studio criteria ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">
          Studio review criteria
        </h2>

        <div className="mt-4 space-y-4">
          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Both products
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 type-body text-(--ink-body)">
              {studioReviewCriteria.both.map((criterion) => (
                <li key={criterion}>{criterion}</li>
              ))}
            </ul>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Portfolio-specific
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 type-body text-(--ink-body)">
              {studioReviewCriteria.portfolio.map((criterion) => (
                <li key={criterion}>{criterion}</li>
              ))}
            </ul>
          </TonePanel>

          <TonePanel tone="reading" className="p-6">
            <p className="font-semibold type-body text-(--ink-strong)">
              Museum-specific
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 type-body text-(--ink-body)">
              {studioReviewCriteria.museum.map((criterion) => (
                <li key={criterion}>{criterion}</li>
              ))}
            </ul>
          </TonePanel>
        </div>
      </section>

      {/* ── Self-assessment ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Self-assessment</h2>
        <ol className="mt-4 list-decimal pl-6 space-y-4 type-body text-(--ink-body)">
          <li>
            <strong className="text-(--ink-strong)">
              I can name a specific audience and their need.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              Not a demographic — a person with a reason to visit.
            </p>
          </li>
          <li>
            <strong className="text-(--ink-strong)">
              I can identify an archetype from visual cues alone.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              Five seconds on a screen tells you the vibe if you know what to
              look for.
            </p>
          </li>
          <li>
            <strong className="text-(--ink-strong)">
              I can spot when visual direction fights the vibe.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              Mismatches between archetype and layout, color, or type register
              as discomfort even when the visitor cannot name the problem.
            </p>
          </li>
          <li>
            <strong className="text-(--ink-strong)">
              I can evaluate proof placement on a live page.
            </strong>
            <p className="type-caption text-(--ink-body) mt-1">
              You know where evidence belongs and whether the page delivers it
              early enough.
            </p>
          </li>
        </ol>
      </section>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          Module 1 complete. You now have the framework: Signal → Archetype →
          Style → Proof → Build → Publish. Next up: Module 2 on AI
          foundations — where the tools came from, how they learn, and who
          built them.
        </p>
        <a
          href="/modules/ai-foundations"
          className="action-primary mt-4 inline-block"
        >
          Continue to Module 2 →
        </a>
      </TonePanel>
    </>
  );
}
