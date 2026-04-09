import type { Metadata } from "next";

import { EditorialBand } from "@/components/editorial-band";
import { TonePanel } from "@/components/tone-panel";

export const metadata: Metadata = {
  title: "Practice",
};

export default function IdentityProofPracticePage() {
  return (
    <>
      {/* ── Hero ── */}
      <EditorialBand tone="reading" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Practice · Module 5
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Redesign your proof section
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Apply the evidence tier framework to your own site. Map every
            claim to its supporting evidence, find the gaps, and redesign the
            proof section.
          </p>
        </div>
      </EditorialBand>

      {/* ── Task ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">Your task</h2>
        <ol className="mt-4 list-decimal pl-6 space-y-3 type-body text-(--ink-body)">
          <li>
            Open your own portfolio or museum site. List every claim the page
            makes — explicit or implied. Include the headline promise, the
            archetype signal, and any skill or quality statements.
          </li>
          <li>
            For each claim, name the evidence that supports it. Use the
            taxonomy from Lesson 2: case study, metric, testimonial, process
            documentation, or credential.
          </li>
          <li>
            Identify the gaps: claims without proof, and proof without claims.
            Orphaned evidence that does not connect to a promise is clutter —
            remove it or connect it.
          </li>
          <li>
            Apply the evidence tier framework: rank your proof from strongest
            (live project link, published case study) to weakest (description
            only, credential mention). Move your strongest evidence closest
            to the corresponding claim.
          </li>
          <li>
            Redesign the proof section of one page. Sketch the layout or write
            a brief describing the new placement, the evidence type for each
            slot, and why each piece belongs where you put it.
          </li>
        </ol>
      </section>

      {/* ── Claim-evidence map ── */}
      <section>
        <h2 className="type-section text-(--ink-strong)">
          Claim-evidence mapping template
        </h2>
        <div className="mt-4 space-y-3">
          <TonePanel tone="reading" className="p-5">
            <p className="type-body text-(--ink-body)">
              <span className="font-semibold text-(--ink-strong)">1.</span>{" "}
              What does the headline promise? → What evidence appears within
              one scroll?
            </p>
          </TonePanel>
          <TonePanel tone="reading" className="p-5">
            <p className="type-body text-(--ink-body)">
              <span className="font-semibold text-(--ink-strong)">2.</span>{" "}
              What archetype does the visual direction signal? → What proof
              supports that archetype?
            </p>
          </TonePanel>
          <TonePanel tone="reading" className="p-5">
            <p className="type-body text-(--ink-body)">
              <span className="font-semibold text-(--ink-strong)">3.</span>{" "}
              What skills or qualities are mentioned? → Where is the case
              study, metric, or testimonial for each?
            </p>
          </TonePanel>
          <TonePanel tone="reading" className="p-5">
            <p className="type-body text-(--ink-body)">
              <span className="font-semibold text-(--ink-strong)">4.</span>{" "}
              What proof exists that is not connected to any claim? → Remove
              or reframe.
            </p>
          </TonePanel>
        </div>
      </section>

      {/* ── Tips ── */}
      <TonePanel tone="reflection" className="p-6">
        <p className="font-semibold type-body text-(--ink-strong)">Tips</p>
        <ul className="mt-3 list-disc pl-6 space-y-2 type-body text-(--ink-body)">
          <li>
            Start with the first screen. If the first fold has no evidence,
            the rest of the page has to work harder than it should.
          </li>
          <li>
            One strong case study beats five weak credential mentions. Depth
            outperforms breadth in proof.
          </li>
          <li>
            If a claim has no supporting evidence, you have two options:
            remove the claim or create the evidence. Do not leave the gap.
          </li>
        </ul>
      </TonePanel>

      {/* ── Closing ── */}
      <TonePanel tone="next" className="p-6">
        <p className="type-body text-(--ink-body)">
          Bring your claim-evidence map and redesigned proof layout to class.
          You will exchange them with a classmate in the checkpoint.
        </p>
        <a
          href="/modules/identity-and-proof/checkpoint"
          className="action-primary mt-4 inline-block"
        >
          Continue to Checkpoint →
        </a>
      </TonePanel>
    </>
  );
}
