"use client";

import Link from "next/link";
import { startTransition, useState } from "react";

import { ArchetypeMoodBoardVisual } from "@/components/human-signal-visuals";
import { TonePanel } from "@/components/tone-panel";

type ExplorerPalette = "sage" | "sky" | "amber" | "rose";

type ExplorerPerson = {
  name: string;
  label: string;
};

export type IdentitySignalExplorerItem = {
  id: string;
  title: string;
  summary: string;
  cluster?: string;
  need: string;
  coreFear?: string;
  persuasion: string;
  palette: ExplorerPalette;
  routeHref: string;
  routeLabel: string;
  visualMoves: readonly string[];
  imageCues?: readonly string[];
  imageTips?: readonly string[];
  vocabulary: readonly string[];
  phrases?: readonly string[];
  proofMoves: readonly string[];
  people?: readonly ExplorerPerson[];
  references?: readonly ExplorerPerson[];
  shadow?: string;
  quote?: string;
};

type IdentitySignalExplorerProps = {
  items: readonly IdentitySignalExplorerItem[];
};

function ChipList({ items }: { items: readonly string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-(--border-neutral) bg-[rgba(255,255,255,0.72)] px-3 py-1 type-annotation text-(--ink-body)"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ReferenceCards({ items }: { items: readonly ExplorerPerson[] }) {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={`${item.name}-${item.label}`}
          className="rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.82)] p-4"
        >
          <p className="type-concept text-(--ink-strong)">{item.name}</p>
          <p className="mt-2 type-caption text-(--ink-body)">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

function getPreviewClasses(palette: ExplorerPalette) {
  if (palette === "sky") {
    return "bg-[linear-gradient(160deg,rgba(237,244,251,1),rgba(219,230,243,0.88))]";
  }

  if (palette === "amber") {
    return "bg-[linear-gradient(160deg,rgba(248,241,228,1),rgba(239,224,192,0.9))]";
  }

  if (palette === "rose") {
    return "bg-[linear-gradient(160deg,rgba(247,236,234,1),rgba(234,217,213,0.9))]";
  }

  return "bg-[linear-gradient(160deg,rgba(237,243,235,1),rgba(219,229,215,0.9))]";
}

export function IdentitySignalExplorer({
  items,
}: IdentitySignalExplorerProps) {
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");
  const activeItem = items.find((item) => item.id === selectedId) ?? items[0];

  if (!activeItem) {
    return null;
  }

  const activeCluster = activeItem.cluster ?? "Archetype";
  const activeImageCues = activeItem.imageCues ?? activeItem.visualMoves;
  const activeImageTips =
    activeItem.imageTips ??
    [
      "Choose images that reinforce the same story as the headline.",
      "Keep the visual direction coherent across hero, proof, and CTA.",
      "Avoid imagery that performs a different archetype than the copy.",
    ];
  const activePhrases = activeItem.phrases ?? activeItem.vocabulary;
  const activeReferences = activeItem.references ?? activeItem.people ?? [];
  const activeCoreFear =
    activeItem.coreFear ??
    "Name the fear or failure mode that would make this signal ring false.";
  const activeShadow =
    activeItem.shadow ??
    "Write down the trap so the signal stays grounded in truth instead of costume.";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const isActive = item.id === activeItem.id;

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => {
                startTransition(() => {
                  setSelectedId(item.id);
                });
              }}
              className={`rounded-(--radius-card) border p-4 text-left transition ${
                isActive
                  ? "border-(--accent-strong) bg-[rgba(255,255,255,0.94)] text-(--ink-strong) shadow-(--shadow-card)"
                  : "border-(--border-strong) bg-[rgba(255,255,255,0.72)] text-(--ink-body) hover:border-(--accent) hover:text-(--ink-strong)"
              }`.trim()}
            >
              <div
                className={`rounded-(--radius-card) border border-[rgba(34,50,67,0.08)] p-4 ${getPreviewClasses(item.palette)}`}
              >
                <p className="type-meta text-(--accent-strong)">
                  {item.cluster ?? "Archetype atlas"}
                </p>
                <p className="mt-3 type-concept text-(--ink-strong)">{item.title}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(item.imageCues ?? item.visualMoves).slice(0, 2).map((cue) => (
                    <span
                      key={`${item.id}-${cue}`}
                      className="rounded-full border border-[rgba(34,50,67,0.08)] bg-[rgba(255,255,255,0.78)] px-3 py-1 type-annotation text-(--ink-body)"
                    >
                      {cue}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-3 type-caption text-(--ink-body)">{item.need}</p>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <TonePanel tone="proof" className="p-5">
          <p className="type-meta text-(--accent-strong)">{activeCluster}</p>
          <ArchetypeMoodBoardVisual
            ariaLabel={`${activeItem.title} mood board showing likely image direction for the archetype`}
            title={activeItem.title}
            cues={activeImageCues}
            palette={activeItem.palette}
            className="mt-4"
          />
          {activeItem.quote ? (
            <div className="mt-5 rounded-(--radius-card) border border-(--border-proof) bg-[rgba(255,255,255,0.82)] p-4">
              <p className="type-meta text-(--accent-strong)">Book line</p>
              <p className="mt-3 type-body text-(--ink-strong)">“{activeItem.quote}”</p>
            </div>
          ) : null}
          {activeReferences.length ? <ReferenceCards items={activeReferences} /> : null}
        </TonePanel>

        <TonePanel tone="reading" className="p-6">
          <p className="type-meta text-(--accent-strong)">Archetype atlas</p>
          <h3 className="mt-3 type-section text-balance text-(--ink-strong)">
            {activeItem.title} as a public signal
          </h3>
          <p className="mt-4 type-body text-(--ink-body)">
            {activeItem.summary}
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <p className="type-meta text-(--accent-strong)">Core desire</p>
              <p className="mt-3 type-body text-(--ink-body)">{activeItem.need}</p>
            </div>
            <div>
              <p className="type-meta text-(--accent-strong)">Core fear</p>
              <p className="mt-3 type-body text-(--ink-body)">{activeCoreFear}</p>
            </div>
            <div>
              <p className="type-meta text-(--accent-strong)">Proof emphasis</p>
              <p className="mt-3 type-body text-(--ink-body)">{activeItem.persuasion}</p>
            </div>
            <div>
              <p className="type-meta text-(--accent-strong)">Shadow to watch</p>
              <p className="mt-3 type-body text-(--ink-body)">
                {activeShadow}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <p className="type-meta text-(--accent-strong)">Visual moves</p>
              <ChipList items={activeItem.visualMoves} />
            </div>
            <div>
              <p className="type-meta text-(--accent-strong)">Image cues</p>
              <ChipList items={activeImageCues} />
            </div>
            <div>
              <p className="type-meta text-(--accent-strong)">Proof to show</p>
              <ChipList items={activeItem.proofMoves} />
            </div>
            <div>
              <p className="type-meta text-(--accent-strong)">Word bank</p>
              <ChipList items={activeItem.vocabulary} />
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <p className="type-meta text-(--accent-strong)">Starter lines</p>
              <ul className="mt-3 space-y-2 pl-5 type-body text-(--ink-body)">
                {activePhrases.map((phrase) => (
                  <li key={`${activeItem.id}-${phrase}`}>{phrase}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="type-meta text-(--accent-strong)">Image selection tips</p>
              <ul className="mt-3 space-y-2 pl-5 type-body text-(--ink-body)">
                {activeImageTips.map((tip) => (
                  <li key={`${activeItem.id}-${tip}`}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/experiences/identity-portfolio/signal/"
              prefetch={false}
              className="action-primary"
            >
              Apply in Module 1
            </Link>
            <Link href={activeItem.routeHref} prefetch={false} className="action-secondary">
              {activeItem.routeLabel}
            </Link>
          </div>
        </TonePanel>
      </div>
    </div>
  );
}