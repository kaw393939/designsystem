import Image from "next/image";

type PersonProfileCardProps = {
  name: string;
  era: string;
  role: string;
  summary: string;
  imageSrc?: string;
  url?: string;
};

export function PersonProfileCard({
  name,
  era,
  role,
  summary,
  imageSrc,
  url,
}: PersonProfileCardProps) {
  const content = (
    <article className="flex flex-col items-center text-center">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={`${name}, ${role}`}
          width={96}
          height={96}
          className="size-24 rounded-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex size-24 items-center justify-center rounded-full bg-[var(--accent-strong)]/10 text-2xl font-semibold text-(--accent-strong)"
        >
          {name.charAt(0)}
        </div>
      )}
      <h3 className="mt-3 font-semibold type-body text-(--ink-strong)">
        {name}
      </h3>
      <p className="type-meta text-(--accent-strong)">{era}</p>
      <p className="mt-1 type-caption text-(--ink-body)">{role}</p>
      <p className="mt-2 type-caption text-(--ink-body)">{summary}</p>
    </article>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-(--radius-card) p-4 transition-colors hover:bg-[rgba(255,255,255,0.4)]"
      >
        {content}
      </a>
    );
  }

  return <div className="p-4">{content}</div>;
}
