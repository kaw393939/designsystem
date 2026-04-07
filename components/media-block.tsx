import type { ReactNode } from "react";

import { CalloutBand } from "@/components/callout-band";
import { SplitLayout } from "@/components/split-layout";
import { TonePanel } from "@/components/tone-panel";
import type { PanelTone } from "@/lib/theme-tokens";

type MediaBlockProps = {
  media: ReactNode;
  caption?: string;
  credit?: string;
  annotation?: ReactNode;
  alignment?: "inset" | "wide" | "split";
  tone?: PanelTone;
  className?: string;
};

export function MediaBlock({
  media,
  caption,
  credit,
  annotation,
  alignment = "inset",
  tone = "neutral",
  className = "",
}: MediaBlockProps) {
  const figure = (
    <figure className="space-y-4">
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-neutral)] bg-[rgba(255,255,255,0.5)] p-4">
        {media}
      </div>
      {caption || credit ? (
        <figcaption className="type-caption text-[var(--ink-body)]">
          {caption ? <span>{caption}</span> : null}
          {caption && credit ? (
            <span className="mx-2 text-[var(--ink-muted)]">/</span>
          ) : null}
          {credit ? (
            <span className="text-[var(--ink-muted)]">{credit}</span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );

  if (alignment === "split" && annotation) {
    return (
      <SplitLayout
        ratio="feature"
        primary={
          <TonePanel tone={tone} className="p-6">
            {figure}
          </TonePanel>
        }
        secondary={
          <CalloutBand
            label="Annotation"
            title="Why this visual placement matters"
            tone="reflection"
          >
            {annotation}
          </CalloutBand>
        }
        className={className}
      />
    );
  }

  const widthClass = alignment === "wide" ? "measure-wide" : "measure-reading";

  return (
    <TonePanel tone={tone} className={`p-6 ${className}`.trim()}>
      <div className={widthClass}>
        {figure}
        {annotation ? (
          <div className="mt-4 type-caption text-[var(--ink-body)]">
            {annotation}
          </div>
        ) : null}
      </div>
    </TonePanel>
  );
}
