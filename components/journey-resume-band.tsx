"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useSiteJourney } from "@/components/site-journey-provider";

const familyLandingPaths = new Set([
  "/",
  "/tour",
  "/browse",
  "/examples",
  "/instructor-guide",
]);

function normalizePathname(pathname: string) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "") || "/";
}

export function JourneyResumeBand() {
  const pathname = usePathname();
  const {
    hasHydrated,
    isResumeBandDismissed,
    dismissResumeBand,
    restoreResumeBand,
    lastSupportPage,
    lastTourPage,
    recentPages,
  } = useSiteJourney();
  const currentPath = normalizePathname(pathname || "/");
  const recentLinks = recentPages.filter((page) => page.path !== currentPath).slice(0, 3);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!hasHydrated || !familyLandingPaths.has(currentPath)) {
    return null;
  }

  const showTourResume = lastTourPage && lastTourPage.path !== currentPath;
  const showSupportResume = lastSupportPage && lastSupportPage.path !== currentPath;

  if (!showTourResume && !showSupportResume && !recentLinks.length) {
    return null;
  }

  if (isResumeBandDismissed) {
    return (
      <div data-resume-band className="flex justify-end">
        <button
          type="button"
          onClick={restoreResumeBand}
          className="type-annotation font-semibold text-(--accent-strong) underline-offset-4 hover:underline"
        >
          Show &ldquo;continue where you left off&rdquo;
        </button>
      </div>
    );
  }

  return (
    <section data-resume-band className="panel-shell panel-emphasis px-4 py-3 sm:px-5">
      {showConfirm ? (
        <div className="flex flex-col items-center gap-3 py-2 text-center">
          <p className="type-caption text-(--ink-strong)">
            Hide &ldquo;continue where you left off&rdquo;?
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                dismissResumeBand();
                setShowConfirm(false);
              }}
              className="action-primary"
            >
              Yes, hide it
            </button>
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="action-secondary"
            >
              Keep showing
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          {showTourResume ? (
            <Link href={lastTourPage.path} className="action-primary">
              Resume tour
            </Link>
          ) : null}
          {showSupportResume ? (
            <Link href={lastSupportPage.path} className="action-secondary">
              Reopen last page
            </Link>
          ) : null}

          {recentLinks.length ? (
            <>
              <span className="hidden h-4 w-px bg-(--border-neutral) sm:block" aria-hidden="true" />
              {recentLinks.map((page) => (
                <Link key={`${page.path}-${page.visitedAt}`} href={page.path} className="action-secondary">
                  {page.title}
                </Link>
              ))}
            </>
          ) : null}

          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            aria-label="Dismiss continue where you left off"
            className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-(--border-neutral) bg-[rgba(255,255,255,0.6)] text-(--ink-body) transition hover:bg-[rgba(255,255,255,0.9)] hover:text-(--ink-strong)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}