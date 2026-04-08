import type { Metadata } from "next";
import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { TonePanel } from "@/components/tone-panel";
import {
  archetypeProfiles,
  familyOverviews,
} from "@/lib/archetype-atlas-content";
import { withBasePath } from "@/lib/site-config";

const familyMoodboard: Record<string, string> = {
  paradise: "/archetype-atlas/walkthroughs/paradise-moodboard.png",
  thumbprint: "/archetype-atlas/walkthroughs/thumbprint-moodboard.png",
  island: "/archetype-atlas/walkthroughs/island-moodboard.png",
  structure: "/archetype-atlas/walkthroughs/structure-moodboard.png",
};

function takeSentences(text: string, count = 2) {
  return studentText(text.split(/(?<=[.!?])\s+/).filter(Boolean).slice(0, count).join(" "));
}

function stripParentheticals(text: string) {
  return text.replace(/\s*\([^)]*\)/g, "").trim();
}

function studentText(text: string) {
  return text.replace(/\bCTAs\b/g, "buttons").replace(/\bCTA\b/g, "button");
}

/* ── static params for export ── */

export function generateStaticParams() {
  return archetypeProfiles.map((p) => ({ slug: p.slug }));
}

/* ── metadata ── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = archetypeProfiles.find((p) => p.slug === slug);
  if (!profile) return { title: "Archetype not found" };
  return {
    title: `${profile.name} — Archetype Guide`,
    description: profile.corePromise,
  };
}

/* ── page ── */

export default async function ArchetypeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = archetypeProfiles.find((p) => p.slug === slug);
  if (!profile) {
    return (
      <PageShell>
        <EditorialBand tone="warning" paddingScale="hero">
          <h1 className="type-hero text-(--ink-strong)">Archetype not found</h1>
          <p className="mt-4 type-body text-(--ink-body)">
            <Link href="/browse/archetypes" className="underline hover:no-underline">
              Back to the archetypes room
            </Link>
          </p>
        </EditorialBand>
      </PageShell>
    );
  }

  const family = familyOverviews.find((f) => f.id === profile.familyId);
  const familyMoodboardPath = familyMoodboard[profile.familyId];
  const siblings = archetypeProfiles.filter(
    (p) => p.familyId === profile.familyId && p.slug !== profile.slug,
  );

  return (
    <PageShell>
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="archetype-hero-grid">
          <div className="archetype-hero-image">
            <img
              src={withBasePath(profile.imagePath)}
              alt={`${profile.name} archetype poster`}
              className="atlas-image atlas-image--portrait"
            />
          </div>
          <div className="archetype-hero-text">
            <p className="type-meta text-(--accent-strong)">
              <Link href="/browse/archetypes" className="hover:underline">
                Browse archetypes
              </Link>
              {" · "}
              {family?.title ?? profile.familyTitle}
            </p>
            <h1 className="mt-3 type-hero text-(--ink-strong)">
              {profile.name}
            </h1>
            <p className="mt-4 type-body text-(--ink-body) text-lg leading-relaxed">
              {profile.corePromise}
            </p>
            <dl className="archetype-quick-facts mt-6">
              <div>
                <dt>First impression</dt>
                <dd>{profile.firstRead}</dd>
              </div>
              <div>
                <dt>Strength</dt>
                <dd>{profile.gift}</dd>
              </div>
              <div>
                <dt>Risk</dt>
                <dd>{profile.trap}</dd>
              </div>
            </dl>
          </div>
        </div>
      </EditorialBand>

      <CalloutBand
        label="Still choosing?"
        title="Go back to compare archetypes before you stay on a full profile."
        tone="warning"
      >
        <p>
          Use this page when you already have a likely fit. If you are still deciding, go back to <Link href="/browse/archetypes" className="underline hover:no-underline">/browse/archetypes</Link> or <Link href="/tour/archetype" className="underline hover:no-underline">/tour/archetype</Link>.
        </p>
      </CalloutBand>

      <div className="archetype-strip">
        <TonePanel tone="proof" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">
            Pulls on
          </h2>
          <p className="mt-3 type-body text-(--ink-body)">{takeSentences(stripParentheticals(profile.needPull), 1)}</p>
        </TonePanel>
        <TonePanel tone="proof" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">
            Wins trust with
          </h2>
          <p className="mt-3 type-body text-(--ink-body)">
            {takeSentences(profile.persuasionEmphasis, 2)}
          </p>
        </TonePanel>
        <TonePanel tone="reflection" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">Avoids</h2>
          <p className="mt-3 type-body text-(--ink-body)">{profile.coreFear}</p>
        </TonePanel>
        <TonePanel tone="reflection" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">Wants</h2>
          <p className="mt-3 type-body text-(--ink-body)">
            {profile.coreDesire}
          </p>
        </TonePanel>
      </div>

      <EditorialBand tone="reading" paddingScale="regular">
        <div className="measure-wide">
          <h2 className="type-section text-(--ink-strong)">What this archetype feels like</h2>
          <p className="mt-4 type-body text-(--ink-body) leading-relaxed">
            {takeSentences(profile.narrative, 3)}
          </p>
          <p className="mt-4 type-body text-(--ink-body)">
            <strong>When it lands:</strong> {profile.emotionalReward}
          </p>
          <p className="mt-6 type-caption text-(--signal) italic">
            {profile.fiveSecondTest}
          </p>
          <p className="mt-1 type-meta text-(--ink-light)">
            Five-second read
          </p>
        </div>
      </EditorialBand>

      <EditorialBand tone="warning" paddingScale="regular">
        <div className="measure-wide">
          <h2 className="type-section text-(--ink-strong)">
            What breaks the signal fast
          </h2>
          <p className="mt-2 type-meta text-(--ink-body)">
            If these show up, the signal falls apart.
          </p>
          <ul className="archetype-wrong-list mt-4">
            {profile.whatFeelsWrong.map((item) => (
              <li key={item}>{studentText(item)}</li>
            ))}
          </ul>
        </div>
      </EditorialBand>

      <EditorialBand tone="reading" paddingScale="regular">
        <div className="measure-wide">
          <h2 className="type-section text-(--ink-strong)">
            How it shows up on the page
          </h2>
          <p className="mt-4 type-body text-(--ink-body) leading-relaxed">
            {takeSentences(profile.designWalkthrough, 3)}
          </p>
        </div>
      </EditorialBand>

      <EditorialBand tone="neutral" paddingScale="regular">
        <div className="measure-wide">
          <h2 className="type-section text-(--ink-strong)">
            How the look should land
          </h2>
          <p className="mt-4 type-body text-(--ink-body) leading-relaxed">
            {takeSentences(profile.colorAndImagery, 2)}
          </p>
          {familyMoodboardPath && (
            <figure className="mt-6">
              <img
                src={withBasePath(familyMoodboardPath)}
                alt={`${family?.title} family mood board`}
                className="atlas-image"
              />
              <figcaption className="mt-2 type-meta text-(--ink-muted)">
                {family?.title} mood board
              </figcaption>
            </figure>
          )}
        </div>
      </EditorialBand>

      <div className="archetype-strip">
        <TonePanel tone="next" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">Choose it when</h2>
          <p className="mt-3 type-body text-(--ink-body)">
            {studentText(profile.chooseWhen)}
          </p>
        </TonePanel>
        <TonePanel tone="warning" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">Avoid it when</h2>
          <p className="mt-3 type-body text-(--ink-body)">
            {studentText(profile.avoidWhen)}
          </p>
        </TonePanel>
      </div>

      <EditorialBand tone="neutral" paddingScale="regular">
        <div className="measure-wide space-y-6">
          <h2 className="type-section text-(--ink-strong)">Words that help</h2>
          <div>
            <h3 className="type-concept text-(--ink-strong)">Use more</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.vocabularyUse.map((w) => (
                <span key={w} className="atlas-pill atlas-pill--use">
                  {w}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="type-concept text-(--ink-strong)">Use less</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.vocabularyAvoid.map((w) => (
                <span key={w} className="atlas-pill atlas-pill--avoid">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      </EditorialBand>

      <div className="archetype-strip archetype-strip--thirds">
        <TonePanel tone="reading" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">Layout choices</h2>
          <ul className="mt-3 space-y-2 pl-5 type-body text-(--ink-body) list-disc">
            {profile.layoutMoves.map((m) => (
              <li key={m}>{studentText(m)}</li>
            ))}
          </ul>
        </TonePanel>
        <TonePanel tone="proof" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">Proof choices</h2>
          <ul className="mt-3 space-y-2 pl-5 type-body text-(--ink-body) list-disc">
            {profile.proofMoves.map((m) => (
              <li key={m}>{studentText(m)}</li>
            ))}
          </ul>
        </TonePanel>
        <TonePanel tone="next" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">Next-step choices</h2>
          <ul className="mt-3 space-y-2 pl-5 type-body text-(--ink-body) list-disc">
            {profile.ctaMoves.map((m) => (
              <li key={m}>{studentText(m)}</li>
            ))}
          </ul>
        </TonePanel>
      </div>

      <EditorialBand tone="emphasis" paddingScale="regular">
        <div className="measure-wide">
          <h2 className="type-section text-(--ink-strong)">
            What the hero could sound like
          </h2>
          <TonePanel
            tone="reading"
            className="archetype-hero-preview mt-6"
          >
            <p className="type-meta text-(--accent-strong)">
              {profile.name} example
            </p>
            <h3 className="mt-2 type-section text-(--ink-strong)">
              {profile.heroHeadline}
            </h3>
            <p className="mt-4 type-body text-(--ink-body)">
              {studentText(profile.heroDeck)}
            </p>
          </TonePanel>
        </div>
      </EditorialBand>

      <div className="archetype-strip">
        <TonePanel tone="neutral" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">
            Looks that usually fit
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.stylePartners.map((s) => (
              <span key={s} className="atlas-pill atlas-pill--neutral">
                {s}
              </span>
            ))}
          </div>
        </TonePanel>
        <TonePanel tone="neutral" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">
            Brands worth studying
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.exampleBrands.map((b) => (
              <span key={b} className="atlas-pill atlas-pill--neutral">
                {b}
              </span>
            ))}
          </div>
        </TonePanel>
      </div>

      <EditorialBand tone="neutral" paddingScale="regular">
        <div className="measure-wide">
          <h2 className="type-section text-(--ink-strong)">
            Other archetypes in this family
          </h2>
          <div className="archetype-sibling-nav mt-4">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/archetypes/${s.slug}`}
                className="archetype-sibling-card group"
              >
                <img
                  src={withBasePath(s.imagePath)}
                  alt={`${s.name} archetype poster`}
                  className="archetype-sibling-img"
                />
                <div>
                  <p className="type-concept text-(--ink-strong) group-hover:text-(--accent-strong) transition-colors">
                    {s.name}
                  </p>
                  <p className="mt-1 type-body text-(--ink-body) line-clamp-2">
                    {s.corePromise}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-6">
            <Link
              href="/browse/archetypes"
              className="type-meta text-(--accent-strong) hover:underline"
            >
              ← Back to compare archetypes
            </Link>
          </p>
        </div>
      </EditorialBand>
    </PageShell>
  );
}
