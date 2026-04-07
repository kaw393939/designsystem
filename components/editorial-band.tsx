import type { ReactNode } from "react";

import { TonePanel } from "@/components/tone-panel";
import type { PanelTone } from "@/lib/theme-tokens";

type EditorialBandProps = {
  children: ReactNode;
  tone?: PanelTone;
  bleed?: boolean;
  paddingScale?: "compact" | "regular" | "hero";
  className?: string;
};

const paddingClasses = {
  compact: "p-6",
  regular: "p-8",
  hero: "p-8 lg:p-12",
};

export function EditorialBand({
  children,
  tone = "neutral",
  bleed = false,
  paddingScale = "regular",
  className = "",
}: EditorialBandProps) {
  const bleedClass = bleed ? "-mx-2 sm:-mx-4 lg:-mx-6" : "";

  return (
    <TonePanel
      tone={tone}
      className={`${paddingClasses[paddingScale]} ${bleedClass} ${className}`.trim()}
    >
      {children}
    </TonePanel>
  );
}
