import Link from "next/link";

import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import {
  PortfolioComparisonVisual,
  StudentPortraitBadge,
  StudioSceneVisual,
} from "@/components/human-signal-visuals";
import { PagePreviewCard } from "@/components/page-preview-card";
import { PageShell } from "@/components/page-shell";
import { RouteContextPanel } from "@/components/route-context-panel";
import { RouteStatusBadge } from "@/components/route-status-badge";
import { SectionHeading } from "@/components/section-heading";
import { SplitLayout } from "@/components/split-layout";
import { StudentFastPath } from "@/components/student-fast-path";
import { TonePanel } from "@/components/tone-panel";
import {
  colorRoles,
  layoutRoles,
  pageTypeExamples,
  typographyRoles,
} from "@/lib/theme-tokens";

const tokenWitnesses = [
  {
    name: "Mika",
    label: "Needs a page that feels calm before it feels clever",
    palette: "sage" as const,
  },
  {
    name: "Dev",
    label: "Needs proof and navigation to feel related, not stitched together",
    palette: "sky" as const,
  },
  {
    name: "Sam",
    label: "Needs a system that can scale without losing personality",
    palette: "amber" as const,
  },
];

const tokenFastPathSteps = [
  {
    title: "Spot the mood jobs",
    summary:
      "Read the color roles first so you can tell proof, reflection, warning, and next steps apart without guessing.",
  },
  {
    title: "Check the reading hierarchy",
    summary:
      "Use the type and layout roles to see why one section scans cleanly while another feels flat or noisy.",
  },
  {
    title: "Open a real page",
    summary:
      "Jump into one preview route and see whether the token system is actually helping the page feel clear on first read.",
  },
] as const;

export default function TokensPage() {
  return (
    <PageShell>
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
          <div className="measure-wide">
            <RouteStatusBadge status="Recommended support" />
            <p className="mt-4 type-meta text-(--accent-strong)">Support route · Tokens</p>
            <h1 className="type-hero measure-hero mt-4 text-(--ink-strong)">
              Use the token guide when the page idea is clear but the vibe still feels off.
            </h1>
            <p className="type-body measure-reading mt-6 text-(--ink-body)">
              Use this page to figure out why the design still feels off after the main idea is
              clear. Fix tone, hierarchy, and page states here.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/tour/style" className="action-primary">
                Return to the style step
              </Link>
              <Link href="/layouts" className="action-secondary">
                Open layout guide
              </Link>
            </div>
          </div>
          <RouteContextPanel
            tone="reading"
            eyebrow="Primary use"
            title="Keep token work attached to a real page problem."
            sections={[
              {
                label: "Open this when",
                content:
                  "The page direction is already chosen, but the design still feels flat, noisy, inconsistent, or just wrong.",
              },
              {
                label: "This helps with",
                content:
                  "Tone roles, hierarchy, layout rhythm, and the difference between proof, warning, reflection, and next-step states.",
              },
              {
                label: "Best next move",
                content:
                  "Adjust the token choice, then go back to style or build and see whether the page now feels more coherent on first look.",
              },
            ]}
          />
        </div>
      </EditorialBand>

      <StudentFastPath
        label="Quick support path"
        title="Need to name why the site feels off?"
        summary="Start with color roles, then check hierarchy, then open a real page preview so the token logic stops feeling abstract."
        steps={tokenFastPathSteps}
        primaryAction={{
          label: "Open lesson example",
          href: "/examples/lesson",
        }}
        secondaryAction={{
          label: "Review layout guide",
          href: "/layouts",
          kind: "secondary",
        }}
      />

      <SplitLayout
        ratio="feature"
        primary={
          <TonePanel tone="reading" className="p-6">
            <StudioSceneVisual
              ariaLabel="Person reviewing a page whose tone, proof, and next steps are reinforced by consistent tokens"
              badges={["Tone", "Proof", "Flow"]}
              palette="sky"
            />
          </TonePanel>
        }
        secondary={
          <TonePanel tone="proof" className="p-6">
            <p className="type-meta text-(--accent-strong)">
              What the token layer protects
            </p>
            <h2 className="mt-3 type-concept text-(--ink-strong)">
              People feel inconsistency before they can explain it.
            </h2>
            <p className="mt-3 type-body text-(--ink-body)">
              You will notice when a reflection section looks exactly like a proof section, or when
              a next-steps box blends into regular text. Tokens keep those jobs visually separate.
            </p>
            <div className="mt-6 space-y-4">
              {tokenWitnesses.map((witness) => (
                <StudentPortraitBadge
                  key={witness.name}
                  name={witness.name}
                  label={witness.label}
                  palette={witness.palette}
                />
              ))}
            </div>
          </TonePanel>
        }
      />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Color Roles"
          title="Each state has a job, not just a color."
          body="Reading, proof, reflection, synthesis, warning, and next-step surfaces are intentionally separated so a page can feel paced and trustworthy instead of visually flat."
        />
        <ContentGrid minCardWidth="16rem">
          {colorRoles.map((role) => (
            <TonePanel
              key={role.name}
              tone={role.tone}
              className="card-shell p-6"
            >
              <p className="type-meta text-(--accent-strong)">
                {role.token}
              </p>
              <h2 className="mt-3 type-concept text-(--ink-strong)">
                {role.name}
              </h2>
              <p className="mt-3 type-body text-(--ink-body)">
                {role.guidance}
              </p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <SplitLayout
        ratio="feature"
        primary={
          <TonePanel tone="reading" className="p-8">
            <SectionHeading
              eyebrow="Typography Roles"
              title="Hierarchy should be obvious, not hidden."
              body="Each text role is named for what it does so the same system can style lessons, module pages, and reading maps without making them all feel the same."
            />
            <div className="mt-8 space-y-4">
              {typographyRoles.map((role) => (
                <div
                  key={role.name}
                  className="rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.6)] px-4 py-4"
                >
                  <p className="type-meta text-(--accent-strong)">
                    {role.token}
                  </p>
                  <h3 className="mt-2 type-concept text-(--ink-strong)">
                    {role.name}
                  </h3>
                  <p className="mt-2 type-caption text-(--ink-body)">
                    {role.sample}
                  </p>
                </div>
              ))}
            </div>
          </TonePanel>
        }
        secondary={
          <TonePanel tone="proof" className="p-8">
            <PortfolioComparisonVisual
              ariaLabel="Comparison showing how semantic layout tokens create a clearer first read"
              beforeLabel="Ad hoc styling"
              afterLabel="Meaningful rhythm"
            />
            <div className="mt-8 space-y-4">
              {layoutRoles.map((role) => (
                <div
                  key={role.name}
                  className="rounded-(--radius-card) border border-(--border-proof) bg-[rgba(255,255,255,0.58)] px-4 py-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="type-concept text-(--ink-strong)">
                      {role.name}
                    </p>
                    <p className="type-meta text-(--accent-strong)">
                      {role.value}
                    </p>
                  </div>
                  <p className="mt-2 type-caption text-(--ink-body)">
                    {role.guidance}
                  </p>
                </div>
              ))}
            </div>
          </TonePanel>
        }
      />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Page-Type Examples"
          title="The same token layer can style different learning jobs."
          body="These previews are small on purpose, but they should still suggest real page behavior: where attention lands first, what tone the page carries, and how the next move becomes obvious."
        />
        <ContentGrid minCardWidth="18rem">
          {pageTypeExamples.map((page) => (
            <PagePreviewCard
              key={page.title}
              title={page.title}
              purpose={page.purpose}
              sections={page.sections}
              tone={page.tone}
              href={page.href}
            />
          ))}
        </ContentGrid>
      </section>
    </PageShell>
  );
}
