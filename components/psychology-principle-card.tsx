import { TonePanel } from "@/components/tone-panel";
import type { PanelTone } from "@/lib/theme-tokens";

type PsychologyPrincipleCardProps = {
  title: string;
  description: string;
  application: string;
  tone?: PanelTone;
};

export function PsychologyPrincipleCard({
  title,
  description,
  application,
  tone = "reading",
}: PsychologyPrincipleCardProps) {
  return (
    <TonePanel tone={tone} className="p-6">
      <h3 className="type-concept text-(--ink-strong)">{title}</h3>
      <p className="mt-2 type-body text-(--ink-body)">{description}</p>
      <p className="mt-3 type-caption text-(--signal)">
        <strong>Use this when:</strong> {application}
      </p>
    </TonePanel>
  );
}
