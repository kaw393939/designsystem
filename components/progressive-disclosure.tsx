import type { ReactNode } from "react";

type ProgressiveDisclosureProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function ProgressiveDisclosure({
  title,
  children,
  defaultOpen = false,
}: ProgressiveDisclosureProps) {
  return (
    <details className="group" open={defaultOpen || undefined}>
      <summary className="flex cursor-pointer list-none items-center gap-2 type-meta text-(--accent-strong) [&::-webkit-details-marker]:hidden">
        <span
          className="inline-block transition group-open:rotate-90"
          aria-hidden="true"
        >
          ›
        </span>
        {title}
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}
