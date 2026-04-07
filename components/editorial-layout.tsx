import type { ReactNode } from "react";

type EditorialLayoutProps = {
  children: ReactNode;
};

export function EditorialLayout({ children }: EditorialLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--page-reading)] text-[var(--ink-strong)]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(160,190,168,0.28),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(223,194,140,0.22),_transparent_24%),linear-gradient(180deg,_rgba(247,242,233,0.98),_rgba(244,238,228,0.98))]" />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 pb-20 pt-8 sm:px-8 lg:px-12">
        {children}
      </main>
    </div>
  );
}
