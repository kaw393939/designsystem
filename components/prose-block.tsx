import type { ElementType, ReactNode } from "react";

type ProseBlockProps = {
  children: ReactNode;
  as?: ElementType;
  measure?: "reading" | "wide";
  lead?: boolean;
  className?: string;
};

export function ProseBlock({
  children,
  as: Element = "div",
  measure = "reading",
  lead = false,
  className = "",
}: ProseBlockProps) {
  const measureClass = measure === "wide" ? "measure-wide" : "measure-reading";
  const leadClass = lead ? "text-[1.08rem]" : "";

  return (
    <Element
      className={`${measureClass} space-y-4 type-body text-[var(--ink-body)] ${leadClass} ${className}`.trim()}
    >
      {children}
    </Element>
  );
}
