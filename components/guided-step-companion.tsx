"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { TonePanel } from "@/components/tone-panel";
import { TourRecordPanel } from "@/components/tour-record-panel";
import { useSiteJourney } from "@/components/site-journey-provider";
import {
  guidedTourSteps,
  type GuidedTourStepId,
  type TourRecordEntry,
} from "@/lib/site-navigation";

type GuidedStepCompanionMode = "mobile" | "desktop";
type GuidedStepCompanionTab = "brief" | "path";

type GuidedStepCompanionProps = {
  mode: GuidedStepCompanionMode;
  currentStepId?: GuidedTourStepId;
  recordEntries: readonly TourRecordEntry[];
  showBriefTab?: boolean;
};

function GuidedTourPathList({ currentStepId }: { currentStepId?: GuidedTourStepId }) {
  return (
    <div>
      <p className="type-meta text-(--accent-strong)">Your path</p>
      <h2 className="mt-2 type-concept text-(--ink-strong)">6-step plan</h2>
      <ol className="mt-5 space-y-3">
        {guidedTourSteps.map((step, index) => {
          const isCurrent = step.id === currentStepId;

          return (
            <li
              key={step.id}
              className={`rounded-(--radius-card) border px-4 py-4 ${
                isCurrent
                  ? "border-(--accent-strong) bg-[rgba(255,255,255,0.92)]"
                  : "border-(--border-neutral) bg-[rgba(255,255,255,0.66)]"
              }`.trim()}
            >
              <div className="flex gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                    isCurrent
                      ? "border-(--accent-strong) bg-[rgba(79,104,84,0.12)] text-(--accent-strong)"
                      : "border-(--border-neutral) text-(--ink-body)"
                  }`.trim()}
                >
                  {index + 1}
                </span>
                <div>
                  {isCurrent ? (
                    <p className="type-caption font-semibold text-(--ink-strong)">
                      {step.publicLabel}
                    </p>
                  ) : (
                    <Link
                      href={step.href}
                      className="type-caption font-semibold text-(--ink-strong) underline-offset-4 hover:underline"
                    >
                      {step.publicLabel}
                    </Link>
                  )}
                  <p className="mt-1 type-annotation text-(--ink-body)">
                    {step.summary}
                  </p>
                  {isCurrent ? (
                    <p className="mt-2 type-annotation font-semibold text-(--accent-strong)">
                      You&apos;re here
                    </p>
                  ) : null}
                  {step.supportHref ? (
                    <Link
                      href={step.supportHref}
                      className="mt-2 inline-flex type-annotation font-semibold text-(--accent-strong) underline-offset-4 hover:underline"
                    >
                      {step.supportLabel ?? "Open optional depth"}
                    </Link>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function TabButton({
  isActive,
  label,
  onClick,
}: {
  isActive: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        isActive
          ? "bg-(--ink-strong) text-white"
          : "border border-(--border-neutral) bg-[rgba(255,255,255,0.72)] text-(--ink-strong)"
      }`.trim()}
    >
      {label}
    </button>
  );
}

function GuidedStepCompanionSheet({
  activeTab,
  currentStepId,
  onClose,
  onTabChange,
  recordEntries,
  showBriefTab = true,
}: {
  activeTab: GuidedStepCompanionTab;
  currentStepId?: GuidedTourStepId;
  onClose: () => void;
  onTabChange: (tab: GuidedStepCompanionTab) => void;
  recordEntries: readonly TourRecordEntry[];
  showBriefTab?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      <button
        type="button"
        aria-label="Close helper panel"
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(19,30,23,0.56)]"
      />
      <div className="absolute inset-x-3 bottom-3 top-16 overflow-hidden rounded-[1.75rem] border border-(--border-neutral) bg-(--surface-reading) shadow-[0_24px_80px_rgba(18,30,23,0.24)]">
        <div className="flex items-center justify-between border-b border-(--border-neutral) px-5 py-4">
          <div>
            <p className="type-meta text-(--accent-strong)">Your tour progress</p>
            <h2 className="mt-2 type-concept text-(--ink-strong)">Keep your place</h2>
          </div>
          <button type="button" onClick={onClose} className="action-secondary px-4 py-2">
            Close
          </button>
        </div>
        <div className="border-b border-(--border-neutral) px-5 py-4">
          <div className="flex flex-wrap gap-2">
            {showBriefTab ? (
              <TabButton
                isActive={activeTab === "brief"}
                label="My brief"
                onClick={() => onTabChange("brief")}
              />
            ) : null}
            <TabButton
              isActive={activeTab === "path"}
              label="6-step path"
              onClick={() => onTabChange("path")}
            />
          </div>
        </div>
        <div className="h-[calc(100%-8.5rem)] overflow-y-auto px-5 py-5">
          {activeTab === "brief" ? (
            <TourRecordPanel entries={recordEntries} compact />
          ) : (
            <GuidedTourPathList currentStepId={currentStepId} />
          )}
        </div>
      </div>
    </div>
  );
}

export function GuidedStepCompanion({
  mode,
  currentStepId,
  recordEntries,
  showBriefTab = true,
}: GuidedStepCompanionProps) {
  const { briefCount } = useSiteJourney();
  const [activeTab, setActiveTab] = useState<GuidedStepCompanionTab>(showBriefTab ? "brief" : "path");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const currentStep = useMemo(
    () => guidedTourSteps.find((step) => step.id === currentStepId) ?? null,
    [currentStepId],
  );

  useEffect(() => {
    if (!isSheetOpen || typeof document === "undefined") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSheetOpen]);

  if (mode === "mobile") {
    return (
      <>
        <TonePanel tone="reading" className="p-5">
          <p className="type-meta text-(--accent-strong)">
            {currentStep ? currentStep.publicLabel : "Tour helper"}
          </p>
          <h2 className="mt-2 type-concept text-(--ink-strong)">
            Keep your place without juggling extra navigation.
          </h2>
          <p className="mt-2 type-caption text-(--ink-body)">
            {showBriefTab && briefCount
              ? `${briefCount} saved brief field${briefCount === 1 ? "" : "s"} travel with you. Open one helper to review your notes or the 6-step path.`
              : "Open the helper to check where you are in the 6-step path."}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSheetOpen(true)}
              className="action-primary"
            >
              {showBriefTab ? "See your brief & progress" : "See all 6 steps"}
            </button>
            <p className="type-annotation text-(--ink-body)">{showBriefTab ? "Inside: My brief and 6-step path." : "See the 6-step path."}</p>
          </div>
        </TonePanel>

        {isSheetOpen ? (
          <GuidedStepCompanionSheet
            activeTab={showBriefTab ? activeTab : "path"}
            currentStepId={currentStepId}
            onClose={() => setIsSheetOpen(false)}
            onTabChange={setActiveTab}
            recordEntries={recordEntries}
            showBriefTab={showBriefTab}
          />
        ) : null}
      </>
    );
  }

  if (!showBriefTab) {
    return (
      <TonePanel tone="reading" className="p-5">
        <GuidedTourPathList currentStepId={currentStepId} />
      </TonePanel>
    );
  }

  return (
    <TonePanel tone="reading" className="p-5">
      <div className="flex flex-wrap gap-2">
        <TabButton
          isActive={activeTab === "brief"}
          label={briefCount ? `My brief (${briefCount})` : "My brief"}
          onClick={() => setActiveTab("brief")}
        />
        <TabButton
          isActive={activeTab === "path"}
          label="6-step path"
          onClick={() => setActiveTab("path")}
        />
      </div>
      <div className="mt-5">
        {activeTab === "brief" ? (
          <TourRecordPanel entries={recordEntries} compact />
        ) : (
          <GuidedTourPathList currentStepId={currentStepId} />
        )}
      </div>
    </TonePanel>
  );
}