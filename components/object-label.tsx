import { EvidenceTierBadge, type EvidenceTier } from "@/components/evidence-tier-badge";
import { TonePanel } from "@/components/tone-panel";

type ObjectLabelProps = {
  title: string;
  objectType: string;
  provenance: string;
  whyHere: string;
  proves: string;
  evidenceTier: EvidenceTier;
  className?: string;
};

export function ObjectLabel({
  title,
  objectType,
  provenance,
  whyHere,
  proves,
  evidenceTier,
  className = "",
}: ObjectLabelProps) {
  return (
    <TonePanel tone="neutral" className={`p-5 ${className}`.trim()}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="type-meta text-(--accent-strong)">Object label</p>
          <h2 className="mt-2 type-concept text-(--ink-strong)">{title}</h2>
        </div>
        <EvidenceTierBadge tier={evidenceTier} />
      </div>
      <dl className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <dt className="type-meta text-(--accent-strong)">Object type</dt>
          <dd className="mt-1 type-caption text-(--ink-body)">{objectType}</dd>
        </div>
        <div>
          <dt className="type-meta text-(--accent-strong)">Provenance</dt>
          <dd className="mt-1 type-caption text-(--ink-body)">{provenance}</dd>
        </div>
        <div>
          <dt className="type-meta text-(--accent-strong)">Why this object is here</dt>
          <dd className="mt-1 type-caption text-(--ink-body)">{whyHere}</dd>
        </div>
        <div>
          <dt className="type-meta text-(--accent-strong)">What it proves or changes</dt>
          <dd className="mt-1 type-caption text-(--ink-body)">{proves}</dd>
        </div>
      </dl>
    </TonePanel>
  );
}