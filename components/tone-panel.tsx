import type { ReactNode } from "react";

import type { PanelTone } from "@/lib/theme-tokens";

const toneClasses: Record<PanelTone, string> = {
  neutral: "panel-neutral",
  reading: "panel-reading",
  emphasis: "panel-emphasis",
  proof: "panel-proof",
  reflection: "panel-reflection",
  synthesis: "panel-synthesis",
  warning: "panel-warning",
  next: "panel-next",
};

type TonePanelProps = {
  children: ReactNode;
  tone?: PanelTone;
  className?: string;
};

export function TonePanel({
  children,
  tone = "neutral",
  className = "",
}: TonePanelProps) {
  return (
    <div className={`panel-shell ${toneClasses[tone]} ${className}`.trim()}>
      {children}
    </div>
  );
}
