type TimelineItem = {
  year: string;
  title: string;
  summary: string;
};

type TimelineSectionProps = {
  items: readonly TimelineItem[];
  className?: string;
};

export function TimelineSection({
  items,
  className = "",
}: TimelineSectionProps) {
  return (
    <ol
      aria-label="Timeline"
      className={`relative space-y-8 border-l-2 border-[var(--border-reading)] pl-8 ${className}`.trim()}
    >
      {items.map((item) => (
        <li key={`${item.year}-${item.title}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[calc(2rem+5px)] top-1.5 size-2.5 rounded-full bg-[var(--accent-strong)]"
          />
          <p className="type-meta text-(--accent-strong)">{item.year}</p>
          <p className="mt-1 font-semibold type-body text-(--ink-strong)">
            {item.title}
          </p>
          <p className="mt-1 type-caption text-(--ink-body)">{item.summary}</p>
        </li>
      ))}
    </ol>
  );
}
