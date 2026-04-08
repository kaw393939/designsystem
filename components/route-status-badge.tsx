import type { SiteRouteStatus } from "@/lib/site-navigation";

const statusClasses: Record<SiteRouteStatus, string> = {
  Entry:
    "border-[rgba(79,104,84,0.24)] bg-[rgba(237,243,235,0.88)] text-[var(--accent-strong)]",
  "Required in tour":
    "border-[rgba(76,109,68,0.24)] bg-[rgba(230,239,227,0.92)] text-[var(--ink-strong)]",
  "Recommended support":
    "border-[rgba(83,111,92,0.24)] bg-[rgba(223,233,225,0.9)] text-[var(--ink-strong)]",
  "Optional reference":
    "border-[rgba(87,104,130,0.22)] bg-[rgba(228,234,242,0.9)] text-[var(--ink-strong)]",
  "Instructor only":
    "border-[rgba(128,96,60,0.2)] bg-[rgba(239,229,215,0.92)] text-[var(--signal)]",
  "Wrapper-specific":
    "border-[rgba(150,96,54,0.24)] bg-[rgba(245,226,215,0.92)] text-[var(--signal)]",
};

type RouteStatusBadgeProps = {
  status: SiteRouteStatus;
  className?: string;
};

export function RouteStatusBadge({
  status,
  className = "",
}: RouteStatusBadgeProps) {
  return (
    <span
      className={`inline-flex w-fit rounded-full border px-3 py-1 type-meta ${statusClasses[status]} ${className}`.trim()}
    >
      {status}
    </span>
  );
}