"use client";

import { useEffect, useState } from "react";

import { TourRecordPanel } from "@/components/tour-record-panel";
import { useSiteJourney } from "@/components/site-journey-provider";
import { initialTourRecord } from "@/lib/site-navigation";

export function BriefFab() {
  const { briefCount, hasHydrated } = useSiteJourney();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!hasHydrated) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        data-brief-fab
        onClick={() => setIsOpen(true)}
        aria-label={briefCount ? `My brief — ${briefCount} saved` : "My brief"}
        className="fixed bottom-6 right-6 z-40 flex h-14 items-center gap-2 rounded-full border border-(--border-neutral) bg-(--surface-reading) px-5 shadow-[0_8px_32px_rgba(18,30,23,0.18)] transition hover:shadow-[0_12px_48px_rgba(18,30,23,0.24)] active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-(--accent-strong)"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <span className="text-sm font-semibold text-(--ink-strong)">My brief</span>
        {briefCount ? (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-(--accent-strong) px-1.5 text-xs font-bold text-white">
            {briefCount}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close brief"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-[rgba(19,30,23,0.56)]"
          />
          <div className="absolute bottom-0 right-0 top-0 w-full max-w-lg overflow-y-auto border-l border-(--border-neutral) bg-(--surface-reading) shadow-[0_0_80px_rgba(18,30,23,0.24)]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-(--border-neutral) bg-(--surface-reading) px-5 py-4">
              <div>
                <p className="type-meta text-(--accent-strong)">Your site brief</p>
                <p className="mt-1 type-caption text-(--ink-body)">
                  Notes travel with you across every page.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="action-secondary px-4 py-2"
              >
                Close
              </button>
            </div>
            <div className="p-5">
              <TourRecordPanel entries={initialTourRecord} compact />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
