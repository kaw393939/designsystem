import Image from "next/image";

import { ProgressiveDisclosure } from "@/components/progressive-disclosure";
import { TonePanel } from "@/components/tone-panel";
import type { ArchetypeProfile } from "@/lib/archetype-atlas-content";
import { withBasePath } from "@/lib/site-config";

type ArchetypeDetailCardProps = {
  archetype: ArchetypeProfile;
};

export function ArchetypeDetailCard({ archetype }: ArchetypeDetailCardProps) {
  return (
    <TonePanel tone="proof" className="overflow-hidden p-0">
      <Image
        src={withBasePath(archetype.imagePath)}
        alt={`${archetype.name} archetype portrait`}
        width={720}
        height={720}
        className="h-56 w-full object-cover"
      />
      <div className="space-y-4 p-6">
        <div>
          <p className="type-meta text-(--accent-strong)">{archetype.familyTitle}</p>
          <h2 className="mt-2 type-concept text-(--ink-strong)">{archetype.name}</h2>
          <p className="mt-2 type-body text-(--ink-body)">{archetype.corePromise}</p>
          <p className="mt-3 type-caption text-(--signal)">
            <strong>Five-second read:</strong> {archetype.fiveSecondTest}
          </p>
        </div>

        <ProgressiveDisclosure title="Psychology profile">
          <div className="space-y-3">
            <p className="type-caption text-(--ink-body)">
              <strong>Core desire:</strong> {archetype.coreDesire}
            </p>
            <p className="type-caption text-(--ink-body)">
              <strong>Core fear:</strong> {archetype.coreFear}
            </p>
            <p className="type-caption text-(--ink-body)">
              <strong>Need-pull:</strong> {archetype.needPull}
            </p>
            <p className="type-caption text-(--ink-body)">
              <strong>Emotional reward:</strong> {archetype.emotionalReward}
            </p>
            <p className="type-caption text-(--ink-body)">
              <strong>Gift:</strong> {archetype.gift}
            </p>
            <p className="type-caption text-(--ink-body)">
              <strong>Trap:</strong> {archetype.trap}
            </p>
            <p className="type-caption text-(--ink-body)">
              <strong>Persuasion emphasis:</strong> {archetype.persuasionEmphasis}
            </p>
          </div>
        </ProgressiveDisclosure>

        <ProgressiveDisclosure title="Brand examples">
          <div className="space-y-2">
            {archetype.exampleBrands.length > 0 ? (
              <ul className="space-y-1 pl-5 type-caption text-(--ink-body)">
                {archetype.exampleBrands.map((brand) => (
                  <li key={brand}>{brand}</li>
                ))}
              </ul>
            ) : (
              <p className="type-caption text-(--ink-body)">No brand examples catalogued yet.</p>
            )}
            <p className="type-caption text-(--ink-body)">
              <strong>Personal brand use:</strong> {archetype.personalBrandUse}
            </p>
            <p className="type-caption text-(--ink-body)">
              <strong>Business brand use:</strong> {archetype.businessBrandUse}
            </p>
          </div>
        </ProgressiveDisclosure>

        <ProgressiveDisclosure title="Visual identity guidance">
          <div className="space-y-3">
            <div>
              <p className="type-annotation font-semibold text-(--ink-strong)">Typography</p>
              <p className="mt-1 type-caption text-(--ink-body)">
                Display: {archetype.fontDirection.display}
              </p>
              <p className="type-caption text-(--ink-body)">
                Body: {archetype.fontDirection.body}
              </p>
              <p className="type-caption text-(--ink-body)">
                Accent: {archetype.fontDirection.accent}
              </p>
            </div>
            <div>
              <p className="type-annotation font-semibold text-(--ink-strong)">Color & imagery</p>
              <p className="mt-1 type-caption text-(--ink-body)">{archetype.colorAndImagery}</p>
            </div>
            <div>
              <p className="type-annotation font-semibold text-(--ink-strong)">Layout moves</p>
              <ul className="mt-1 space-y-1 pl-5 type-caption text-(--ink-body)">
                {archetype.layoutMoves.map((move) => (
                  <li key={move}>{move}</li>
                ))}
              </ul>
            </div>
            {archetype.whatFeelsWrong.length > 0 && (
              <div>
                <p className="type-annotation font-semibold text-(--signal)">What feels wrong</p>
                <ul className="mt-1 space-y-1 pl-5 type-caption text-(--ink-body)">
                  {archetype.whatFeelsWrong.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ProgressiveDisclosure>
      </div>
    </TonePanel>
  );
}
