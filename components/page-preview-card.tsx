import Link from "next/link";

import type { PanelTone } from "@/lib/theme-tokens";

import { TonePanel } from "@/components/tone-panel";

type PagePreviewCardProps = {
  title: string;
  purpose: string;
  sections: readonly string[];
  tone: PanelTone;
  href?: string;
};

export function PagePreviewCard({
  title,
  purpose,
  sections,
  tone,
  href,
}: PagePreviewCardProps) {
  return (
    <TonePanel tone={tone} className="card-shell p-6">
      <div className="rounded-(--radius-card) border border-(--border-strong) bg-[rgba(255,255,255,0.7)] p-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-strong)]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-strong)]/45" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-strong)]/25" />
        </div>
        <div className="mt-4 space-y-3">
          {sections.slice(0, 3).map((section, index) => (
            <div key={section} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-[rgba(255,255,255,0.86)] shadow-[inset_0_0_0_1px_rgba(34,50,67,0.08)]" />
              <div className="flex-1 space-y-2">
                <div
                  className="h-3 rounded-full bg-[rgba(34,50,67,0.14)]"
                  style={{ width: `${78 - index * 10}%` }}
                />
                <div
                  className="h-2.5 rounded-full bg-[rgba(34,50,67,0.08)]"
                  style={{ width: `${62 - index * 8}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="type-meta text-(--accent-strong)">
        Page Recipe Example
      </p>
      <h3 className="mt-3 type-concept text-(--ink-strong)">{title}</h3>
      <p className="mt-3 type-body text-(--ink-body)">{purpose}</p>
      <ul className="mt-5 space-y-2">
        {sections.map((section) => (
          <li
            key={section}
            className="rounded-(--radius-card) border border-(--border-strong) bg-[rgba(255,255,255,0.56)] px-4 py-3 type-caption text-(--ink-body)"
          >
            {section}
          </li>
        ))}
      </ul>
      {href ? (
        <Link href={href} className="action-secondary mt-5 w-fit">
          Open {title}
        </Link>
      ) : null}
    </TonePanel>
  );
}
