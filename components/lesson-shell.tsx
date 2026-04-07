import type { ReactNode } from "react";

import { LocalNav, type LocalNavItem } from "@/components/local-nav";

type LessonShellProps = {
  children: ReactNode;
  localNav?: readonly LocalNavItem[];
  progress?: string;
  tocTitle?: string;
  className?: string;
};

export function LessonShell({
  children,
  localNav,
  progress,
  tocTitle = "Lesson navigation",
  className = "",
}: LessonShellProps) {
  return (
    <div
      className={`grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem] ${className}`.trim()}
    >
      <div className="flex min-w-0 flex-col gap-8">
        {progress && !localNav?.length ? (
          <div className="rounded-[var(--radius-card)] border border-[var(--border-next)] bg-[var(--surface-next)] px-4 py-3">
            <p className="type-meta text-[var(--signal)]">Progress</p>
            <p className="mt-1 type-caption text-[var(--ink-body)]">
              {progress}
            </p>
          </div>
        ) : null}
        {children}
      </div>
      {localNav?.length ? (
        <aside>
          <LocalNav items={localNav} title={tocTitle} progress={progress} />
        </aside>
      ) : null}
    </div>
  );
}
