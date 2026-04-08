import type { ReactNode } from "react";

import { TonePanel } from "@/components/tone-panel";
import type { PanelTone } from "@/lib/theme-tokens";

type RouteContextSection = {
  label: string;
  content: ReactNode;
};

type RouteContextPanelProps = {
  eyebrow?: string;
  title?: string;
  sections: readonly RouteContextSection[];
  tone?: PanelTone;
  className?: string;
};

export function RouteContextPanel({
  eyebrow,
  title,
  sections,
  tone = "reading",
  className = "",
}: RouteContextPanelProps) {
  return (
    <TonePanel tone={tone} className={`p-6 ${className}`.trim()}>
      {eyebrow ? (
        <p className="type-meta text-(--accent-strong)">{eyebrow}</p>
      ) : null}
      {title ? (
        <h2 className="mt-2 type-concept text-(--ink-strong)">{title}</h2>
      ) : null}
      <div className={`${eyebrow || title ? "mt-5 " : ""}space-y-5`.trim()}>
        {sections.map((section) => (
          <div key={section.label}>
            <p className="type-meta text-(--accent-strong)">{section.label}</p>
            <div className="mt-2 type-body text-(--ink-body)">{section.content}</div>
          </div>
        ))}
      </div>
    </TonePanel>
  );
}