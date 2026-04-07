import type { Metadata } from "next";
import Link from "next/link";

import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import { TonePanel } from "@/components/tone-panel";
import {
  archetypeProfiles,
  familyOverviews,
} from "@/lib/archetype-atlas-content";

const familyMoodboard: Record<string, string> = {
  paradise: "/archetype-atlas/walkthroughs/paradise-moodboard.png",
  thumbprint: "/archetype-atlas/walkthroughs/thumbprint-moodboard.png",
  island: "/archetype-atlas/walkthroughs/island-moodboard.png",
  structure: "/archetype-atlas/walkthroughs/structure-moodboard.png",
};

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
    title: `${profile.name} — Archetype Atlas`,
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
            <Link href="/archetypes" className="underline">
              Back to all archetypes
            </Link>
          </p>
        </EditorialBand>
      </PageShell>
    );
  }

  const family = familyOverviews.find((f) => f.id === profile.familyId);
  const siblings = archetypeProfiles.filter(
    (p) => p.familyId === profile.familyId && p.slug !== profile.slug,
  );

  return (
    <PageShell>
      {/* ── hero ── */}
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="archetype-hero-grid">
          <div className="archetype-hero-image">
            <img
              src={profile.imagePath}
              alt={`${profile.name} archetype poster`}
              className="atlas-image atlas-image--portrait"
            />
          </div>
          <div className="archetype-hero-text">
            <p className="type-meta text-(--accent-strong)">
              <Link href="/archetypes" className="hover:underline">
                Archetypes
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
                <dt>First read</dt>
                <dd>{profile.firstRead}</dd>
              </div>
              <div>
                <dt>Gift</dt>
                <dd>{profile.gift}</dd>
              </div>
              <div>
                <dt>Trap</dt>
                <dd>{profile.trap}</dd>
              </div>
            </dl>
          </div>
        </div>
      </EditorialBand>

      {/* ── Maslow + persuasion strip ── */}
      <div className="archetype-strip">
        <TonePanel tone="proof" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">
            Maslow need-pull
          </h2>
          <p className="mt-3 type-body text-(--ink-body)">{profile.needPull}</p>
        </TonePanel>
        <TonePanel tone="proof" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">
            Persuasion emphasis
          </h2>
          <p className="mt-3 type-body text-(--ink-body)">
            {profile.persuasionEmphasis}
          </p>
        </TonePanel>
        <TonePanel tone="reflection" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">Core fear</h2>
          <p className="mt-3 type-body text-(--ink-body)">{profile.coreFear}</p>
        </TonePanel>
        <TonePanel tone="reflection" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">Core desire</h2>
          <p className="mt-3 type-body text-(--ink-body)">
            {profile.coreDesire}
          </p>
        </TonePanel>
      </div>

      {/* ── narrative ── */}
      <EditorialBand tone="reading" paddingScale="regular">
        <div className="measure-wide">
          <h2 className="type-section text-(--ink-strong)">The narrative</h2>
          <p className="mt-4 type-body text-(--ink-body) leading-relaxed">
            {profile.narrative}
          </p>
          <p className="mt-6 type-caption text-(--signal) italic">
            {profile.fiveSecondTest}
          </p>
          <p className="mt-1 type-meta text-(--ink-light)">
            — what the visitor should say after five seconds
          </p>
        </div>
      </EditorialBand>

      {/* ── emotional reward ── */}
      <EditorialBand tone="emphasis" paddingScale="regular">
        <div className="measure-wide">
          <h2 className="type-section text-(--ink-strong)">
            Emotional reward
          </h2>
          <p className="mt-4 type-body text-(--ink-body)">
            {profile.emotionalReward}
          </p>
        </div>
      </EditorialBand>

      {/* ── what feels wrong ── */}
      <EditorialBand tone="warning" paddingScale="regular">
        <div className="measure-wide">
          <h2 className="type-section text-(--ink-strong)">
            What feels obviously wrong
          </h2>
          <p className="mt-2 type-meta text-(--ink-body)">
            If any of these appear on a {profile.name} page, the signal is
            broken.
          </p>
          <ul className="archetype-wrong-list mt-4">
            {profile.whatFeelsWrong.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </EditorialBand>

      {/* ── design walkthrough ── */}
      <EditorialBand tone="reading" paddingScale="regular">
        <div className="measure-wide">
          <h2 className="type-section text-(--ink-strong)">
            Design walkthrough
          </h2>
          <p className="mt-4 type-body text-(--ink-body) leading-relaxed">
            {profile.designWalkthrough}
          </p>
        </div>
      </EditorialBand>

      {/* ── color & imagery ── */}
      <EditorialBand tone="neutral" paddingScale="regular">
        <div className="measure-wide">
          <h2 className="type-section text-(--ink-strong)">
            Color and imagery
          </h2>
          <p className="mt-4 type-body text-(--ink-body) leading-relaxed">
            {profile.colorAndImagery}
          </p>
          {familyMoodboard[profile.familyId] && (
            <figure className="mt-6">
              <img
                src={familyMoodboard[profile.familyId]}
                alt={`${family?.title} family mood board`}
                className="atlas-image"
              />
              <figcaption className="mt-2 type-meta text-(--ink-muted)">
                {family?.title} — material and texture mood board
              </figcaption>
            </figure>
          )}
        </div>
      </EditorialBand>

      {/* ── when to choose / avoid ── */}
      <div className="archetype-strip">
        <TonePanel tone="next" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">Choose it when</h2>
          <p className="mt-3 type-body text-(--ink-body)">
            {profile.chooseWhen}
          </p>
        </TonePanel>
        <TonePanel tone="warning" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">Avoid it when</h2>
          <p className="mt-3 type-body text-(--ink-body)">
            {profile.avoidWhen}
          </p>
        </TonePanel>
      </div>

      {/* ── brand application (personal / business) ── */}
      <div className="archetype-strip">
        <TonePanel tone="reading" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">
            Personal brand use
          </h2>
          <p className="mt-3 type-body text-(--ink-body)">
            {profile.personalBrandUse}
          </p>
        </TonePanel>
        <TonePanel tone="reading" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">
            Business brand use
          </h2>
          <p className="mt-3 type-body text-(--ink-body)">
            {profile.businessBrandUse}
          </p>
        </TonePanel>
      </div>

      {/* ── context shifts ── */}
      <EditorialBand tone="reflection" paddingScale="regular">
        <div className="measure-wide">
          <h2 className="type-section text-(--ink-strong)">Context shifts</h2>
          <p className="mt-4 type-body text-(--ink-body) leading-relaxed">
            {profile.contextShifts}
          </p>
        </div>
      </EditorialBand>

      {/* ── vocabulary ── */}
      <EditorialBand tone="neutral" paddingScale="regular">
        <div className="measure-wide space-y-6">
          <h2 className="type-section text-(--ink-strong)">Vocabulary</h2>
          <div>
            <h3 className="type-concept text-(--ink-strong)">Use</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.vocabularyUse.map((w) => (
                <span key={w} className="atlas-pill atlas-pill--use">
                  {w}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="type-concept text-(--ink-strong)">Avoid</h3>
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

      {/* ── typography direction ── */}
      <EditorialBand tone="reading" paddingScale="regular">
        <div className="measure-wide">
          <h2 className="type-section text-(--ink-strong)">Font direction</h2>
          <dl className="archetype-font-grid mt-4">
            <div>
              <dt>Display</dt>
              <dd>{profile.fontDirection.display}</dd>
            </div>
            <div>
              <dt>Body</dt>
              <dd>{profile.fontDirection.body}</dd>
            </div>
            <div>
              <dt>Accent</dt>
              <dd>{profile.fontDirection.accent}</dd>
            </div>
          </dl>
        </div>
      </EditorialBand>

      {/* ── layout / proof / CTA moves ── */}
      <div className="archetype-strip archetype-strip--thirds">
        <TonePanel tone="reading" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">Layout moves</h2>
          <ul className="mt-3 space-y-2 pl-5 type-body text-(--ink-body) list-disc">
            {profile.layoutMoves.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </TonePanel>
        <TonePanel tone="proof" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">Proof moves</h2>
          <ul className="mt-3 space-y-2 pl-5 type-body text-(--ink-body) list-disc">
            {profile.proofMoves.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </TonePanel>
        <TonePanel tone="next" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">CTA moves</h2>
          <ul className="mt-3 space-y-2 pl-5 type-body text-(--ink-body) list-disc">
            {profile.ctaMoves.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </TonePanel>
      </div>

      {/* ── example hero preview ── */}
      <EditorialBand tone="emphasis" paddingScale="regular">
        <div className="measure-wide">
          <h2 className="type-section text-(--ink-strong)">
            Example hero preview
          </h2>
          <TonePanel
            tone="reading"
            className="archetype-hero-preview mt-6"
          >
            <p className="type-meta text-(--accent-strong)">
              {profile.name} hero
            </p>
            <h3 className="mt-2 type-section text-(--ink-strong)">
              {profile.heroHeadline}
            </h3>
            <p className="mt-4 type-body text-(--ink-body)">
              {profile.heroDeck}
            </p>
          </TonePanel>
        </div>
      </EditorialBand>

      {/* ── style partners + example brands ── */}
      <div className="archetype-strip">
        <TonePanel tone="neutral" className="archetype-strip-card">
          <h2 className="type-concept text-(--ink-strong)">
            Best style partners
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
            Useful example brands
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

      {/* ── family contrast ── */}
      <EditorialBand tone="reflection" paddingScale="regular">
        <div className="measure-wide">
          <h2 className="type-section text-(--ink-strong)">
            Family contrast — {family?.title}
          </h2>
          <p className="mt-4 type-body text-(--ink-body) leading-relaxed">
            {profile.familyContrast}
          </p>
        </div>
      </EditorialBand>

      {/* ── sibling nav ── */}
      <EditorialBand tone="neutral" paddingScale="regular">
        <div className="measure-wide">
          <h2 className="type-section text-(--ink-strong)">
            More from {family?.archetypesLabel}
          </h2>
          <div className="archetype-sibling-nav mt-4">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/archetypes/${s.slug}`}
                className="archetype-sibling-card group"
              >
                <img
                  src={s.imagePath}
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
              href="/archetypes"
              className="type-meta text-(--accent-strong) hover:underline"
            >
              ← All archetypes
            </Link>
          </p>
        </div>
      </EditorialBand>
    </PageShell>
  );
}
