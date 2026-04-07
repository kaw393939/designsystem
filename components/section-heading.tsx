type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body: string;
  headingLevel?: 1 | 2 | 3;
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  headingLevel = 2,
}: SectionHeadingProps) {
  const HeadingTag = `h${headingLevel}` as const;

  return (
    <div className="measure-reading">
      <p className="type-meta text-[var(--accent-strong)]">{eyebrow}</p>
      <HeadingTag className="type-section mt-3 text-balance text-[var(--ink-strong)]">
        {title}
      </HeadingTag>
      <p className="type-body mt-4 text-[var(--ink-body)]">{body}</p>
    </div>
  );
}
