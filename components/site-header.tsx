"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { SiteHeaderNav } from "@/components/site-header-nav";
import { useSiteJourney } from "@/components/site-journey-provider";
import {
  guidedTourSteps,
  primarySiteCaption,
  primarySiteEyebrow,
  primarySiteNavItems,
  primarySiteTitle,
} from "@/lib/site-navigation";

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

export function SiteHeader() {
  const pathname = usePathname();
  const { briefCount, currentPage, hasHydrated, lastSupportPage, lastTourPage } = useSiteJourney();
  const [isCompact, setIsCompact] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = normalizePathname(pathname || currentPage?.path || "/");
  const isTourPage = currentPath === "/tour" || currentPath.startsWith("/tour/");
  const hasResumeBand = familyLandingPaths.has(currentPath);
  const navItems = primarySiteNavItems.map((item) => ({
    id: item.id,
    href: item.href,
    label: item.label,
    matchHrefs: item.matchHrefs ? [...item.matchHrefs] : undefined,
  }));

  const resumeAction = useMemo(() => {
    if (!hasHydrated || isTourPage || hasResumeBand) {
      return null;
    }

    if (lastTourPage && lastTourPage.path !== currentPath) {
      return {
        href: lastTourPage.path,
        label: `Resume ${lastTourPage.title}`,
      };
    }

    if (lastSupportPage && lastSupportPage.path !== currentPath) {
      return {
        href: lastSupportPage.path,
        label: `Reopen ${lastSupportPage.title}`,
      };
    }

    return null;
  }, [currentPath, hasHydrated, hasResumeBand, isTourPage, lastSupportPage, lastTourPage]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateHeaderState = () => {
      setIsCompact(window.scrollY > 48);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen || typeof document === "undefined") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`panel-shell panel-reading backdrop-blur transition-all ${
          isCompact ? "px-4 py-3" : "px-5 py-4"
        }`.trim()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p
              className={`type-meta text-(--accent-strong) transition-all ${
                isCompact ? "max-h-0 overflow-hidden opacity-0" : "max-h-10 opacity-100"
              }`.trim()}
            >
              {primarySiteEyebrow}
            </p>
            <Link href="/" className="mt-1 block type-concept text-(--ink-strong)">
              {primarySiteTitle}
            </Link>
            <p
              className={`type-caption text-(--ink-body) transition-all ${
                isCompact
                  ? "mt-0 max-h-0 overflow-hidden opacity-0"
                  : "mt-1 max-h-24 opacity-100"
              }`.trim()}
            >
              {primarySiteCaption}
            </p>

            {resumeAction ? (
              <Link href={resumeAction.href} className="action-primary mt-4 inline-flex md:hidden">
                {resumeAction.label}
              </Link>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {resumeAction ? (
              <Link href={resumeAction.href} className="action-primary hidden lg:inline-flex">
                {resumeAction.label}
              </Link>
            ) : null}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="action-secondary"
              aria-label="Open site navigation"
            >
              Menu
            </button>
          </div>
        </div>

        <div className={`mt-4 hidden items-start justify-between gap-4 md:flex ${isCompact ? "mt-3" : ""}`.trim()}>
          <SiteHeaderNav items={navItems} className="flex flex-wrap gap-2" />
          {briefCount ? (
            <p className="pt-2 type-annotation text-right text-(--ink-body)">
              {briefCount} saved brief field{briefCount === 1 ? "" : "s"}
            </p>
          ) : null}
        </div>
      </header>

      {isMenuOpen ? (
        <div className="fixed inset-0" style={{ zIndex: 70 }}>
          <button
            type="button"
            aria-label="Close site navigation"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-[rgba(19,30,23,0.56)]"
          />
          <div className="absolute inset-x-3 top-4 max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[1.75rem] border border-(--border-neutral) bg-(--surface-reading) p-5 shadow-[0_24px_80px_rgba(18,30,23,0.24)] md:inset-x-auto md:right-4 md:w-104">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="type-meta text-(--accent-strong)">{primarySiteEyebrow}</p>
                <h2 className="mt-2 type-concept text-(--ink-strong)">{primarySiteTitle}</h2>
                <p className="mt-2 type-caption text-(--ink-body)">{primarySiteCaption}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="action-secondary px-4 py-2"
              >
                Close
              </button>
            </div>

            {resumeAction ? (
              <Link href={resumeAction.href} onClick={() => setIsMenuOpen(false)} className="action-primary mt-5 inline-flex">
                {resumeAction.label}
              </Link>
            ) : null}

            <div className="mt-5">
              <SiteHeaderNav
                items={navItems}
                className="flex flex-col gap-2"
                linkClassName="w-full justify-start"
              />
            </div>

            <div className="mt-6 border-t border-(--border-neutral) pt-5">
              <p className="type-meta text-(--accent-strong)">Your 6-step path</p>
              <ol className="mt-3 space-y-2">
                {guidedTourSteps.map((step, index) => {
                  const isCurrent = currentPath === step.href.replace(/\/+$/, "");

                  return (
                    <li key={step.id}>
                      <Link
                        href={step.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-start gap-3 rounded-(--radius-card) border px-3 py-3 transition hover:bg-[rgba(255,255,255,0.8)] ${
                          isCurrent
                            ? "border-(--accent-strong) bg-[rgba(255,255,255,0.92)]"
                            : "border-(--border-neutral) bg-[rgba(255,255,255,0.5)]"
                        }`.trim()}
                      >
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                            isCurrent
                              ? "border-(--accent-strong) bg-[rgba(79,104,84,0.12)] text-(--accent-strong)"
                              : "border-(--border-neutral) text-(--ink-body)"
                          }`.trim()}
                        >
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <p className={`type-caption font-semibold ${isCurrent ? "text-(--accent-strong)" : "text-(--ink-strong)"}`}>
                            {step.publicLabel}
                          </p>
                          <p className="mt-0.5 type-annotation text-(--ink-body)">{step.summary}</p>
                          {isCurrent ? (
                            <p className="mt-1 type-annotation font-semibold text-(--accent-strong)">You&apos;re here</p>
                          ) : null}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>

            {briefCount ? (
              <p className="mt-5 type-annotation text-(--ink-body)">
                {briefCount} saved brief field{briefCount === 1 ? "" : "s"}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
