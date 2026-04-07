import type { ReactNode } from "react";

type SplitLayoutProps = {
  primary: ReactNode;
  secondary?: ReactNode;
  ratio?: "balanced" | "feature" | "supporting";
  stackAt?: "md" | "lg" | "xl";
  className?: string;
};

const ratioClasses = {
  md: {
    balanced: "md:grid-cols-2",
    feature: "md:grid-cols-[1.2fr_0.8fr]",
    supporting: "md:grid-cols-[0.8fr_1.2fr]",
  },
  lg: {
    balanced: "lg:grid-cols-2",
    feature: "lg:grid-cols-[1.2fr_0.8fr]",
    supporting: "lg:grid-cols-[0.8fr_1.2fr]",
  },
  xl: {
    balanced: "xl:grid-cols-2",
    feature: "xl:grid-cols-[1.2fr_0.8fr]",
    supporting: "xl:grid-cols-[0.8fr_1.2fr]",
  },
} as const;

export function SplitLayout({
  primary,
  secondary,
  ratio = "balanced",
  stackAt = "lg",
  className = "",
}: SplitLayoutProps) {
  if (!secondary) {
    return <div className={className}>{primary}</div>;
  }

  return (
    <div
      className={`grid gap-6 ${ratioClasses[stackAt][ratio]} ${className}`.trim()}
    >
      <div className="min-w-0">{primary}</div>
      <div className="min-w-0">{secondary}</div>
    </div>
  );
}
