"use client";

import { useEffect, useMemo, useState } from "react";

import { useSiteJourney } from "@/components/site-journey-provider";
import { TonePanel } from "@/components/tone-panel";
import type { TourRecordEntry } from "@/lib/site-navigation";
import {
  countFilledTourBriefFields,
  loadTourBriefDraft,
  TOUR_BRIEF_STORAGE_KEY,
  type TourRecordDraft,
} from "@/lib/tour-brief-storage";

const worksheetPrompts: Record<TourRecordEntry["id"], string> = {
  audience: "Who exactly are you trying to reach?",
  need: "What problem or pressure are they showing up with?",
  signal: "What vibe or first impression should they get from the page?",
  "visual-direction": "What should the page look and feel like?",
  "proof-plan": "What proof needs to show up near the main claim?",
  "build-brief": "What should someone actually build or change on the page?",
  "publish-asset": "What live link, opener, or follow-up asset proves the page works in public?",
};

type TourRecordPanelProps = {
  entries: readonly TourRecordEntry[];
  title?: string;
  summary?: string;
  className?: string;
  compact?: boolean;
};

function EntryEditor({
  entry,
  isCurrent,
  savedValue,
  onChange,
}: {
  entry: TourRecordEntry;
  isCurrent: boolean;
  savedValue: string;
  onChange: (value: string) => void;
}) {
  const hasValue = Boolean(savedValue.trim().length);
  const fieldId = `tour-record-${entry.id}`;

  return (
    <div
      className={`rounded-(--radius-card) border px-4 py-3 ${
        isCurrent
          ? "border-(--accent-strong) bg-[rgba(255,255,255,0.92)]"
          : "border-(--border-neutral) bg-[rgba(255,255,255,0.66)]"
      }`.trim()}
    >
      <label htmlFor={fieldId} className="type-meta text-(--accent-strong)">
        {entry.label}
      </label>
      {isCurrent ? (
        <p className="mt-2 type-annotation font-semibold text-(--accent-strong)">
          Working on this now
        </p>
      ) : null}
      <p className="mt-2 type-annotation text-(--ink-body)">
        {worksheetPrompts[entry.id]}
      </p>
      {!hasValue && entry.value ? (
        <p className="mt-2 type-annotation text-(--accent-strong)">
          Example: {entry.value}
        </p>
      ) : null}
      <textarea
        id={fieldId}
        rows={isCurrent ? 4 : 3}
        className="mt-3 min-h-22 w-full resize-y rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.94)] px-3 py-3 type-body text-(--ink-strong) outline-none transition-shadow focus:border-(--accent-strong) focus:shadow-[0_0_0_3px_rgba(79,104,84,0.12)]"
        value={savedValue}
        onChange={(event) => onChange(event.target.value)}
        placeholder={entry.value ?? entry.placeholder}
      />
    </div>
  );
}

export function TourRecordPanel({
  entries,
  title = "What you have so far",
  summary = "Type in these boxes as you go. Your notes stay in this browser while you move through the tour.",
  className = "",
  compact = false,
}: TourRecordPanelProps) {
  const { setBriefCount } = useSiteJourney();
  const [draft, setDraft] = useState<TourRecordDraft>({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [showSavedFields, setShowSavedFields] = useState(false);
  const [showLaterFields, setShowLaterFields] = useState(false);

  useEffect(() => {
    const storedDraft = loadTourBriefDraft(typeof window === "undefined" ? null : window.localStorage);

    // Hydrating from localStorage — legitimate external-system sync
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft(storedDraft);
    setBriefCount(countFilledTourBriefFields(storedDraft));
    setHasLoaded(true);
  }, [setBriefCount]);

  useEffect(() => {
    if (!hasLoaded || typeof window === "undefined") {
      return;
    }

    const trimmedDraft = Object.fromEntries(
      Object.entries(draft).filter(([, value]) => value.trim().length > 0),
    );
    const filledCount = countFilledTourBriefFields(trimmedDraft);

    setBriefCount(filledCount);

    if (!Object.keys(trimmedDraft).length) {
      window.localStorage.removeItem(TOUR_BRIEF_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(TOUR_BRIEF_STORAGE_KEY, JSON.stringify(trimmedDraft));
  }, [draft, hasLoaded, setBriefCount]);

  const hasAnyNotes = useMemo(
    () => Object.values(draft).some((value) => value.trim().length > 0),
    [draft],
  );

  const currentEntries = useMemo(
    () => entries.filter((entry) => entry.isCurrent),
    [entries],
  );

  const savedEntries = useMemo(
    () =>
      entries.filter(
        (entry) => !entry.isCurrent && Boolean(draft[entry.id]?.trim().length),
      ),
    [draft, entries],
  );

  const futureEntries = useMemo(
    () =>
      entries.filter(
        (entry) => !entry.isCurrent && !draft[entry.id]?.trim().length,
      ),
    [draft, entries],
  );

  const updateEntry = (entryId: TourRecordEntry["id"], value: string) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [entryId]: value,
    }));
  };

  const clearNotes = () => {
    setDraft({});
    setCopyState("idle");
    setShowSavedFields(false);
    setShowLaterFields(false);
    setBriefCount(0);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(TOUR_BRIEF_STORAGE_KEY);
    }
  };

  const copyNotes = async () => {
    if (!hasAnyNotes || typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    const noteText = entries
      .map((entry) => {
        const value = draft[entry.id]?.trim();

        return value ? `${entry.label}:\n${value}` : null;
      })
      .filter((entry): entry is string => Boolean(entry))
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(noteText);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("error");
    }
  };

  return (
    <TonePanel tone="reading" className={`p-5 ${className}`.trim()}>
      <p className="type-meta text-(--accent-strong)">Your site brief</p>
      <h2 className="mt-2 type-concept text-(--ink-strong)">{title}</h2>
      <p className="mt-2 type-caption text-(--ink-body)">{summary}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          className="action-secondary inline-flex disabled:cursor-not-allowed disabled:opacity-60"
          onClick={copyNotes}
          disabled={!hasAnyNotes}
        >
          Copy my notes
        </button>
        <button
          type="button"
          className="action-secondary inline-flex"
          onClick={clearNotes}
        >
          Clear my notes
        </button>
      </div>
      {copyState === "copied" ? (
        <p className="mt-3 type-annotation font-semibold text-(--accent-strong)">
          Notes copied.
        </p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-3 type-annotation font-semibold text-(--signal)">
          Could not copy the notes from this browser.
        </p>
      ) : null}
      {compact ? (
        <div className="mt-5 space-y-5">
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="type-meta text-(--accent-strong)">Current step</h3>
              {currentEntries.length ? (
                <p className="type-annotation text-(--ink-body)">
                  {currentEntries.length} field{currentEntries.length === 1 ? "" : "s"}
                </p>
              ) : null}
            </div>
            {currentEntries.map((entry) => (
              <EntryEditor
                key={entry.id}
                entry={entry}
                isCurrent
                savedValue={draft[entry.id] ?? ""}
                onChange={(value) => updateEntry(entry.id, value)}
              />
            ))}
          </section>

          {savedEntries.length ? (
            <section className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="type-meta text-(--accent-strong)">Earlier decisions</h3>
                  <p className="mt-1 type-annotation text-(--ink-body)">
                    Keep them visible without forcing every saved field open at once.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSavedFields((current) => !current)}
                  className="action-secondary px-4 py-2"
                >
                  {showSavedFields ? "Hide edits" : "Edit saved fields"}
                </button>
              </div>

              {showSavedFields ? (
                <div className="space-y-3">
                  {savedEntries.map((entry) => (
                    <EntryEditor
                      key={entry.id}
                      entry={entry}
                      isCurrent={false}
                      savedValue={draft[entry.id] ?? ""}
                      onChange={(value) => updateEntry(entry.id, value)}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {savedEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.66)] px-4 py-3"
                    >
                      <p className="type-meta text-(--accent-strong)">{entry.label}</p>
                      <p className="mt-2 type-annotation text-(--ink-body)">
                        {draft[entry.id]}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ) : null}

          {futureEntries.length ? (
            <section className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="type-meta text-(--accent-strong)">Later in the tour</h3>
                  <p className="mt-1 type-annotation text-(--ink-body)">
                    Keep the future fields tucked away unless you want to write ahead.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLaterFields((current) => !current)}
                  className="action-secondary px-4 py-2"
                >
                  {showLaterFields ? "Hide later fields" : `Show ${futureEntries.length} later field${futureEntries.length === 1 ? "" : "s"}`}
                </button>
              </div>

              {showLaterFields ? (
                <div className="space-y-3">
                  {futureEntries.map((entry) => (
                    <EntryEditor
                      key={entry.id}
                      entry={entry}
                      isCurrent={false}
                      savedValue={draft[entry.id] ?? ""}
                      onChange={(value) => updateEntry(entry.id, value)}
                    />
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}
        </div>
      ) : (
        <ul className="mt-5 space-y-3">
          {entries.map((entry) => (
            <li key={entry.id}>
              <EntryEditor
                entry={entry}
                isCurrent={Boolean(entry.isCurrent)}
                savedValue={draft[entry.id] ?? ""}
                onChange={(value) => updateEntry(entry.id, value)}
              />
            </li>
          ))}
        </ul>
      )}
    </TonePanel>
  );
}