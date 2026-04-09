import Link from "next/link";

type DiagnosticQuestionCardProps = {
  question: string;
  hint: string;
  href: string;
  linkLabel: string;
};

export function DiagnosticQuestionCard({
  question,
  hint,
  href,
  linkLabel,
}: DiagnosticQuestionCardProps) {
  return (
    <div className="rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.72)] p-4">
      <p className="type-caption font-semibold text-(--ink-strong)">{question}</p>
      <p className="mt-1 type-annotation text-(--ink-body)">{hint}</p>
      <Link
        href={href}
        className="mt-3 inline-flex type-annotation font-semibold text-(--accent-strong) underline-offset-4 hover:underline"
      >
        {linkLabel}
      </Link>
    </div>
  );
}
