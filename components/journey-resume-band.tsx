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
    briefCount,
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

  if (!showTourResume && !showSupportResume && !recentLinks.length && !briefCount) {
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
    <section data-resume-band className="panel-shell panel-emphasis px-5 py-4 sm:px-6">
      {showConfirm ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <p className="type-caption text-(--ink-strong)">
            Hide &ldquo;continue where you left off&rdquo;?
          </p>
          <p className="type-annotation text-(--ink-body)">
            You can bring it back any time from the same spot.
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
        <>
          <div className="flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <p className="type-meta text-(--accent-strong)">Continue where you left off</p>
                  <h2 className="mt-2 type-concept text-(--ink-strong)">
                    Keep moving without rebuilding the map in your head.
                  </h2>
                  <p className="mt-2 type-caption text-(--ink-body)">
                    {briefCount
                      ? `${briefCount} brief field${briefCount === 1 ? "" : "s"} saved in this browser.`
                      : "Your recent pages stay visible here so you can jump back into the site quickly."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {showTourResume ? (
                    <Link href={lastTourPage.path} className="action-primary">
                      Resume {lastTourPage.title}
                    </Link>
                  ) : null}
                  {showSupportResume ? (
                    <Link href={lastSupportPage.path} className="action-secondary">
                      Reopen {lastSupportPage.title}
                    </Link>
                  ) : null}
                </div>
              </div>

              {recentLinks.length ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  {recentLinks.map((page) => (
                    <Link key={`${page.path}-${page.visitedAt}`} href={page.path} className="action-secondary">
                      {page.title}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              aria-label="Dismiss continue where you left off"
              className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--border-neutral) bg-[rgba(255,255,255,0.6)] text-(--ink-body) transition hover:bg-[rgba(255,255,255,0.9)] hover:text-(--ink-strong)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </>
      )}
    </section>
  );
}