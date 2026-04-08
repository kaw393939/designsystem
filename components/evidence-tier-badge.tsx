export type EvidenceTier =
  | "Verified evidence"
  | "Interpreted synthesis"
  | "Concept model"
  | "Generated illustration";

const tierClasses: Record<EvidenceTier, string> = {
  "Verified evidence":
    "border-[rgba(76,109,68,0.24)] bg-[rgba(230,239,227,0.92)] text-(--ink-strong)",
  "Interpreted synthesis":
    "border-[rgba(87,104,130,0.22)] bg-[rgba(228,234,242,0.9)] text-(--ink-strong)",
  "Concept model":
    "border-[rgba(79,104,84,0.24)] bg-[rgba(237,243,235,0.88)] text-(--ink-strong)",
  "Generated illustration":
    "border-[rgba(150,96,54,0.24)] bg-[rgba(245,226,215,0.92)] text-(--signal)",
};

type EvidenceTierBadgeProps = {
  tier: EvidenceTier;
  className?: string;
};

export function EvidenceTierBadge({
  tier,
  className = "",
}: EvidenceTierBadgeProps) {
  return (
    <span
      className={`inline-flex w-fit rounded-full border px-3 py-1 type-meta ${tierClasses[tier]} ${className}`.trim()}
    >
      {tier}
    </span>
  );
}