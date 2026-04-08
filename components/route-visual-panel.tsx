import Image from "next/image";

import { TonePanel } from "@/components/tone-panel";
import { withBasePath } from "@/lib/site-config";
import type { RouteVisualPlan } from "@/lib/route-imagery";

type RouteVisualPanelProps = {
  plan: RouteVisualPlan;
  className?: string;
  imageClassName?: string;
};

export function RouteVisualPanel({
  plan,
  className = "",
  imageClassName = "h-64",
}: RouteVisualPanelProps) {
  return (
    <TonePanel tone={plan.tone} className={`overflow-hidden p-0 ${className}`.trim()}>
      <div className="relative">
        <Image
          src={withBasePath(plan.imagePath)}
          alt={plan.imageAlt}
          width={1024}
          height={1024}
          className={`w-full object-cover ${imageClassName}`.trim()}
        />
        <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(17,24,21,0.04),rgba(17,24,21,0.78))] p-5">
          <p className="type-meta text-[rgba(255,250,243,0.82)]">{plan.eyebrow}</p>
          <h2 className="mt-2 type-concept text-white">{plan.title}</h2>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          {plan.cues.map((cue) => (
            <span
              key={cue}
              className="rounded-full border border-(--border-neutral) bg-[rgba(255,255,255,0.72)] px-3 py-1 type-annotation font-semibold text-(--ink-strong)"
            >
              {cue}
            </span>
          ))}
        </div>
        <p className="type-caption text-(--ink-body)">{plan.caption}</p>
      </div>
    </TonePanel>
  );
}