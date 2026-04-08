import type { ReactNode } from "react";

import { BriefFab } from "@/components/brief-fab";
import { JourneyResumeBand } from "@/components/journey-resume-band";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type PageShellProps = {
  children: ReactNode;
  maxWidthClassName?: string;
  mainClassName?: string;
};

export function PageShell({
  children,
  maxWidthClassName = "max-w-7xl",
  mainClassName = "",
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-(--page-reading) text-(--ink-strong)">
      <a
        href="#main-content"
        className="absolute left-4 top-4 z-50 -translate-y-24 rounded-full bg-(--ink-strong) px-4 py-2 text-sm font-semibold text-white transition focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(160,190,168,0.28),transparent_26%),radial-gradient(circle_at_top_right,rgba(223,194,140,0.22),transparent_24%),linear-gradient(180deg,rgba(247,242,233,0.98),rgba(244,238,228,0.98))]" />
      <div
        className={`mx-auto flex w-full ${maxWidthClassName} flex-col gap-8 px-5 pb-20 pt-8 sm:px-8 md:px-10 lg:px-12`}
      >
        <div className="sticky top-3 z-40">
          <SiteHeader />
        </div>
        <JourneyResumeBand />
        <main
          id="main-content"
          tabIndex={-1}
          className={`flex flex-col gap-12 ${mainClassName}`.trim()}
        >
          {children}
        </main>
        <SiteFooter />
      </div>
      <BriefFab />
    </div>
  );
}
