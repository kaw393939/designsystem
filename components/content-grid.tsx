import type { ReactNode } from "react";

type ContentGridProps = {
  children: ReactNode;
  minCardWidth?: string;
  className?: string;
};

export function ContentGrid({
  children,
  minCardWidth = "16rem",
  className = "",
}: ContentGridProps) {
  return (
    <div
      className={`grid gap-5 lg:gap-6 ${className}`.trim()}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}, 1fr))`,
      }}
    >
      {children}
    </div>
  );
}
