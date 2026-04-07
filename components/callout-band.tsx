import type { ReactNode } from "react";

import { TonePanel } from "@/components/tone-panel";
import type { PanelTone } from "@/lib/theme-tokens";

type CalloutBandProps = {
  label: string;
  title: string;
  children: ReactNode;
  tone?: PanelTone;
  icon?: ReactNode;
  className?: string;
  titleAsPageHeading?: boolean;
};

export function CalloutBand({
  label,
  title,
  children,
  tone = "proof",
  icon,
  className = "",
  titleAsPageHeading = false,
}: CalloutBandProps) {
  return (
    <TonePanel tone={tone} className={`p-6 ${className}`.trim()}>
      <div className="flex items-start gap-4">
        {icon ? (
          <div className="pt-1 text-(--accent-strong)">{icon}</div>
        ) : null}
        <div className="min-w-0">
          <p className="type-meta text-(--accent-strong)">{label}</p>
          {titleAsPageHeading ? (
            <h1 className="mt-2 type-concept text-(--ink-strong)">
              {title}
            </h1>
          ) : (
            <h2 className="mt-2 type-concept text-(--ink-strong)">
              {title}
            </h2>
          )}
          <div className="mt-3 type-body text-(--ink-body)">
            {children}
          </div>
        </div>
      </div>
    </TonePanel>
  );
}
