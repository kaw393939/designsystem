import Image from "next/image";
import Link from "next/link";
import type { ElementType, ReactNode } from "react";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { MediaBlock } from "@/components/media-block";
import { ProseBlock } from "@/components/prose-block";
import { SplitLayout } from "@/components/split-layout";
import { TonePanel } from "@/components/tone-panel";
import type {
  ActionLinkSpec,
  ComparisonColumnSpec,
  ComparisonRowSpec,
  EducationalUnitSpec,
  GlossaryTermSpec,
  GridItemSpec,
  MetadataItemSpec,
  ReadingMapClusterSpec,
  SourceItemSpec,
  SummaryItemSpec,
  UnitBlockSpec,
  VisualReferenceSpec,
  WorkedExampleStepSpec,
} from "@/lib/educational-contracts";
import { isInternalHref } from "@/lib/educational-contracts";
import type { PanelTone } from "@/lib/theme-tokens";

type TextStackProps = {
  content: string;
  className?: string;
};

function TextStack({ content, className = "" }: TextStackProps) {
  const paragraphs = content
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className={`space-y-4 ${className}`.trim()}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

type ActionLinksProps = {
  actions: readonly ActionLinkSpec[];
  className?: string;
};

function ActionLinks({ actions, className = "" }: ActionLinksProps) {
  if (!actions.length) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`.trim()}>
      {actions.map((action) => {
        const actionClass =
          action.kind === "primary" ? "action-primary" : "action-secondary";

        if (isInternalHref(action.href)) {
          return (
            <Link
              key={`${action.label}-${action.href}`}
              href={action.href}
              prefetch={false}
              className={actionClass}
            >
              {action.label}
            </Link>
          );
        }

        return (
          <a
            key={`${action.label}-${action.href}`}
            href={action.href}
            className={actionClass}
            target="_blank"
            rel="noreferrer"
          >
            {action.label}
          </a>
        );
      })}
    </div>
  );
}

type MetadataListProps = {
  items: readonly MetadataItemSpec[];
  className?: string;
};

function MetadataList({ items, className = "" }: MetadataListProps) {
  if (!items.length) {
    return null;
  }

  return (
    <dl className={`grid gap-4 sm:grid-cols-2 ${className}`.trim()}>
      {items.map((item) => (
        <div
          key={`${item.label}-${item.value}`}
          className="rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.56)] px-4 py-3"
        >
          <dt className="type-meta text-(--accent-strong)">
            {item.label}
          </dt>
          <dd className="mt-2 type-caption text-(--ink-body)">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

type VisualPlaceholderProps = {
  visual: VisualReferenceSpec;
  className?: string;
};

function VisualPlaceholder({ visual, className = "" }: VisualPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={visual.alt ?? visual.caption ?? visual.visualRef}
      className={`flex aspect-16/10 items-end rounded-(--radius-card) bg-[linear-gradient(135deg,rgba(125,152,117,0.32),rgba(239,229,215,0.86),rgba(228,234,242,0.92))] p-4 ${className}`.trim()}
    >
      <span className="type-caption rounded-full bg-[rgba(255,255,255,0.76)] px-3 py-1 text-(--ink-body)">
        {visual.caption ?? visual.visualRef}
      </span>
    </div>
  );
}

async function ResolvedVisualMedia({
  visual,
  className = "",
}: VisualPlaceholderProps) {
  const { resolveVisualReferenceToRenderable } = await import(
    "@/lib/site-visual-resolver"
  );
  const resolvedVisual = resolveVisualReferenceToRenderable(visual.visualRef);

  if (
    !resolvedVisual?.primaryAsset?.dataUri ||
    !resolvedVisual.primaryAsset.mediaType.startsWith("image/")
  ) {
    return <VisualPlaceholder visual={visual} className={className} />;
  }

  return (
    <div
      className={`overflow-hidden rounded-(--radius-card) bg-[linear-gradient(135deg,rgba(125,152,117,0.18),rgba(255,255,255,0.92),rgba(228,234,242,0.88))] p-3 ${className}`.trim()}
    >
      <Image
        src={resolvedVisual.primaryAsset.dataUri}
        alt={
          resolvedVisual.alt ??
          visual.alt ??
          resolvedVisual.caption ??
          visual.caption ??
          visual.visualRef
        }
        width={960}
        height={600}
        unoptimized
        className="aspect-16/10 h-full w-full rounded-[calc(var(--radius-card)-0.35rem)] bg-[rgba(255,255,255,0.84)] object-contain"
      />
    </div>
  );
}

type HeadingLevel = 1 | 2 | 3;

function renderHeading(
  level: HeadingLevel,
  className: string,
  children: ReactNode,
) {
  const Element = `h${level}` as ElementType;
  return <Element className={className}>{children}</Element>;
}

type LessonHeroProps = {
  eyebrow?: string;
  title: string;
  dek: string;
  metadata?: readonly MetadataItemSpec[];
  progress?: string;
  actions?: readonly ActionLinkSpec[];
  visual?: ReactNode;
  headingLevel?: HeadingLevel;
  className?: string;
};

export function LessonHero({
  eyebrow,
  title,
  dek,
  metadata = [],
  progress,
  actions = [],
  visual,
  headingLevel = 1,
  className = "",
}: LessonHeroProps) {
  const body = (
    <div className="space-y-5">
      {eyebrow ? (
        <p className="type-meta text-(--accent-strong)">{eyebrow}</p>
      ) : null}
      {renderHeading(
        headingLevel,
        "type-hero measure-hero text-balance text-(--ink-strong)",
        title,
      )}
      <ProseBlock lead>
        <p>{dek}</p>
      </ProseBlock>
      {progress ? (
        <p className="type-meta text-(--signal)">{progress}</p>
      ) : null}
      <MetadataList items={metadata} />
      <ActionLinks actions={actions} />
    </div>
  );

  return (
    <EditorialBand tone="emphasis" paddingScale="hero" className={className}>
      {visual ? (
        <SplitLayout ratio="feature" primary={body} secondary={visual} />
      ) : (
        body
      )}
    </EditorialBand>
  );
}

type SectionBlockProps = {
  id: string;
  eyebrow?: string;
  title: string;
  summary?: string;
  children: ReactNode;
  tone?: PanelTone;
  className?: string;
};

export function SectionBlock({
  id,
  eyebrow,
  title,
  summary,
  children,
  tone = "reading",
  className = "",
}: SectionBlockProps) {
  return (
    <section id={id} className={`scroll-mt-32 space-y-6 ${className}`.trim()}>
      <TonePanel tone={tone} className="p-6 lg:p-8">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-8">
          <div className="space-y-3">
            {eyebrow ? (
              <p className="type-meta text-(--accent-strong)">{eyebrow}</p>
            ) : null}
            <h2 className="type-section text-balance text-(--ink-strong)">
              {title}
            </h2>
            {summary ? (
              <p className="type-body text-(--ink-body)">{summary}</p>
            ) : null}
          </div>
          <div className="border-t border-(--border-neutral) pt-5 type-body text-(--ink-body) lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {children}
          </div>
        </div>
      </TonePanel>
    </section>
  );
}

type WhyItMattersProps = {
  title?: string;
  summary: string;
  stakes: string;
  audience?: string;
  links?: readonly ActionLinkSpec[];
  className?: string;
};

export function WhyItMatters({
  title = "Why this matters",
  summary,
  stakes,
  audience,
  links = [],
  className = "",
}: WhyItMattersProps) {
  return (
    <CalloutBand
      label="Why it matters"
      title={title}
      tone="emphasis"
      className={className}
    >
      <div className="space-y-4">
        <p>{summary}</p>
        <p>{stakes}</p>
        {audience ? (
          <p className="type-caption text-(--ink-muted)">{audience}</p>
        ) : null}
        <ActionLinks actions={links} />
      </div>
    </CalloutBand>
  );
}

function SectionIntro({
  eyebrow,
  title,
  summary,
}: {
  eyebrow: string;
  title?: string;
  summary?: string;
}) {
  if (!title && !summary) {
    return null;
  }

  return (
    <div className="space-y-3">
      <p className="type-meta text-(--accent-strong)">{eyebrow}</p>
      {title ? (
        <h2 className="type-section text-balance text-(--ink-strong)">
          {title}
        </h2>
      ) : null}
      {summary ? (
        <p className="type-body measure-reading text-(--ink-body)">
          {summary}
        </p>
      ) : null}
    </div>
  );
}

type ConceptGridProps = {
  title?: string;
  summary?: string;
  items: readonly GridItemSpec[];
  columns?: number;
  className?: string;
};

export function ConceptGrid({
  title,
  summary,
  items,
  columns = 3,
  className = "",
}: ConceptGridProps) {
  const minCardWidth = columns >= 3 ? "16.75rem" : "18rem";

  return (
    <section className={`space-y-6 ${className}`.trim()}>
      <SectionIntro eyebrow="Quick map" title={title} summary={summary} />
      <ContentGrid minCardWidth={minCardWidth}>
        {items.map((item) => (
          <TonePanel
            key={item.title}
            tone="reading"
            className="card-shell p-5 lg:p-6"
          >
            {item.tag ? (
              <p className="type-meta text-(--accent-strong)">
                {item.tag}
              </p>
            ) : null}
            <h3 className="mt-3 type-concept text-(--ink-strong)">
              {item.title}
            </h3>
            <p className="mt-3 type-body text-(--ink-body)">
              {item.summary}
            </p>
            {item.href ? (
              <div className="mt-5">
                <ActionLinks
                  actions={[
                    { label: "Open", href: item.href, kind: "secondary" },
                  ]}
                />
              </div>
            ) : null}
          </TonePanel>
        ))}
      </ContentGrid>
    </section>
  );
}

type SummaryGridProps = {
  title?: string;
  items: readonly SummaryItemSpec[];
  className?: string;
};

export function SummaryGrid({
  title,
  items,
  className = "",
}: SummaryGridProps) {
  return (
    <section className={`space-y-6 ${className}`.trim()}>
      <SectionIntro eyebrow="Keep this" title={title} />
      <ContentGrid minCardWidth="18rem">
        {items.map((item) => (
          <TonePanel
            key={item.title}
            tone="synthesis"
            className="card-shell p-5 lg:p-6"
          >
            <h3 className="type-concept text-(--ink-strong)">
              {item.title}
            </h3>
            <p className="mt-3 type-body text-(--ink-body)">
              {item.takeaway}
            </p>
            {item.action ? (
              <ActionLinks actions={[item.action]} className="mt-5" />
            ) : null}
          </TonePanel>
        ))}
      </ContentGrid>
    </section>
  );
}

type ComparisonGridProps = {
  title?: string;
  legend?: string;
  caption?: string;
  columns: readonly ComparisonColumnSpec[];
  rows: readonly ComparisonRowSpec[];
  className?: string;
};

export function ComparisonGrid({
  title,
  legend,
  caption,
  columns,
  rows,
  className = "",
}: ComparisonGridProps) {
  return (
    <section className={`space-y-6 ${className}`.trim()}>
      <SectionIntro eyebrow="Comparison" title={title} summary={legend} />
      <TonePanel tone="synthesis" className="overflow-x-auto p-4 lg:p-6">
        <table className="min-w-full border-separate border-spacing-0 text-left">
          {caption ? (
            <caption className="mb-4 text-left type-caption text-(--ink-muted)">
              {caption}
            </caption>
          ) : null}
          <thead>
            <tr>
              <th className="border-b border-(--border-neutral) px-4 py-3 type-meta text-(--accent-strong)">
                Focus
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="border-b border-(--border-neutral) px-4 py-3 type-meta text-(--accent-strong)"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th
                  scope="row"
                  className="border-b border-(--border-neutral) px-4 py-4 align-top type-concept text-(--ink-strong)"
                >
                  {row.label}
                </th>
                {columns.map((column, index) => (
                  <td
                    key={`${row.label}-${column.key}`}
                    className="border-b border-(--border-neutral) px-4 py-4 type-body text-(--ink-body)"
                  >
                    {row.cells[index] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </TonePanel>
    </section>
  );
}

type SequenceTimelineProps = {
  title?: string;
  summary?: string;
  mode: "timeline" | "process";
  items: readonly {
    label: string;
    title: string;
    summary: string;
    href?: string;
  }[];
  className?: string;
};

export function SequenceTimeline({
  title,
  summary,
  mode,
  items,
  className = "",
}: SequenceTimelineProps) {
  return (
    <section className={`space-y-6 ${className}`.trim()}>
      <SectionIntro
        eyebrow={mode === "timeline" ? "How it shifts" : "Do this in order"}
        title={title}
        summary={summary}
      />
      <ol className="space-y-4">
        {items.map((item) => (
          <li key={`${item.label}-${item.title}`} className="relative pl-6">
            <span
              className="absolute left-0 top-4 h-full w-px bg-(--border-strong)"
              aria-hidden="true"
            />
            <TonePanel
              tone={mode === "timeline" ? "proof" : "next"}
              className="card-shell p-5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="type-meta text-(--accent-strong)">
                  {item.label}
                </span>
                <h3 className="type-concept text-(--ink-strong)">
                  {item.title}
                </h3>
              </div>
              <p className="mt-3 type-body text-(--ink-body)">
                {item.summary}
              </p>
              {item.href ? (
                <ActionLinks
                  actions={[
                    { label: "Open", href: item.href, kind: "secondary" },
                  ]}
                  className="mt-5"
                />
              ) : null}
            </TonePanel>
          </li>
        ))}
      </ol>
    </section>
  );
}

type WorkedExampleProps = {
  title?: string;
  prompt: string;
  steps: readonly WorkedExampleStepSpec[];
  result?: string;
  reflection?: string;
  media?: ReactNode;
  className?: string;
};

export function WorkedExample({
  title = "Worked example",
  prompt,
  steps,
  result,
  reflection,
  media,
  className = "",
}: WorkedExampleProps) {
  const primary = (
    <TonePanel tone="proof" className="p-6">
      <p className="type-meta text-(--accent-strong)">Worked example</p>
      <h2 className="mt-3 type-section text-balance text-(--ink-strong)">
        {title}
      </h2>
      <p className="mt-4 type-body text-(--ink-body)">{prompt}</p>
      <ol className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <li
            key={`${step.title}-${index}`}
            className="rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.5)] px-4 py-4"
          >
            <p className="type-meta text-(--accent-strong)">
              Step {index + 1}
            </p>
            <h3 className="mt-2 type-concept text-(--ink-strong)">
              {step.title}
            </h3>
            <p className="mt-3 type-body text-(--ink-body)">{step.body}</p>
            {step.outcome ? (
              <p className="mt-3 type-caption text-(--ink-muted)">
                {step.outcome}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </TonePanel>
  );

  const secondaryContent = media ? (
    media
  ) : result || reflection ? (
    <TonePanel tone="reflection" className="p-6">
      {result ? (
        <>
          <p className="type-meta text-(--accent-strong)">Result</p>
          <p className="mt-3 type-body text-(--ink-body)">{result}</p>
        </>
      ) : null}
      {reflection ? (
        <>
          <p
            className={`type-meta text-(--accent-strong) ${result ? "mt-6" : ""}`.trim()}
          >
            Reflection
          </p>
          <p className="mt-3 type-body text-(--ink-body)">{reflection}</p>
        </>
      ) : null}
    </TonePanel>
  ) : undefined;

  return (
    <SplitLayout
      ratio="feature"
      primary={primary}
      secondary={secondaryContent}
      className={className}
    />
  );
}

type EditorialAsideProps = {
  title?: string;
  children: ReactNode;
  tone?: PanelTone;
  icon?: ReactNode;
  className?: string;
};

export function EditorialAside({
  title,
  children,
  tone = "reflection",
  icon,
  className = "",
}: EditorialAsideProps) {
  return (
    <div className={className}>
      <TonePanel tone={tone} className="p-6">
        <div className="flex items-start gap-4">
          {icon ? (
            <div className="type-meta text-(--accent-strong)">{icon}</div>
          ) : null}
          <div className="min-w-0">
            {title ? (
              <h2 className="type-concept text-(--ink-strong)">{title}</h2>
            ) : null}
            <div
              className={`type-body text-(--ink-body) ${title ? "mt-3" : ""}`.trim()}
            >
              {children}
            </div>
          </div>
        </div>
      </TonePanel>
    </div>
  );
}

type PullInsightProps = {
  quote: string;
  attribution?: string;
  context?: string;
  className?: string;
};

export function PullInsight({
  quote,
  attribution,
  context,
  className = "",
}: PullInsightProps) {
  return (
    <TonePanel tone="synthesis" className={`p-6 lg:p-8 ${className}`.trim()}>
      <blockquote className="space-y-4">
        <p className="type-section text-balance text-(--ink-strong)">
          “{quote}”
        </p>
        {attribution ? (
          <footer className="type-meta text-(--accent-strong)">
            {attribution}
          </footer>
        ) : null}
        {context ? (
          <p className="type-caption text-(--ink-body)">{context}</p>
        ) : null}
      </blockquote>
    </TonePanel>
  );
}

type VisualBreakProps = {
  title?: string;
  body?: string;
  visual?: ReactNode;
  tone?: PanelTone;
  className?: string;
};

export function VisualBreak({
  title,
  body,
  visual,
  tone = "synthesis",
  className = "",
}: VisualBreakProps) {
  const content = (
    <div className="space-y-4">
      {title ? (
        <h2 className="type-section text-balance text-(--ink-strong)">
          {title}
        </h2>
      ) : null}
      {body ? (
        <p className="type-body measure-reading text-(--ink-body)">
          {body}
        </p>
      ) : null}
    </div>
  );

  return (
    <EditorialBand tone={tone} paddingScale="hero" className={className}>
      {visual ? (
        <SplitLayout ratio="feature" primary={content} secondary={visual} />
      ) : (
        content
      )}
    </EditorialBand>
  );
}

type ReflectionPromptProps = {
  title?: string;
  prompt: string;
  questions?: readonly string[];
  mode?: "write" | "discuss" | "practice";
  timeEstimate?: string;
  className?: string;
};

export function ReflectionPrompt({
  title = "Reflection",
  prompt,
  questions = [],
  mode = "write",
  timeEstimate,
  className = "",
}: ReflectionPromptProps) {
  return (
    <CalloutBand
      label={mode}
      title={title}
      tone="reflection"
      className={className}
    >
      <div className="space-y-4">
        <p>{prompt}</p>
        {questions.length ? (
          <ul className="space-y-2 pl-5">
            {questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        ) : null}
        {timeEstimate ? (
          <p className="type-caption text-(--ink-muted)">
            Suggested time: {timeEstimate}
          </p>
        ) : null}
      </div>
    </CalloutBand>
  );
}

type NextStepBlockProps = {
  title: string;
  summary?: string;
  primaryAction: ActionLinkSpec;
  secondaryAction?: ActionLinkSpec;
  context?: string;
  className?: string;
};

export function NextStepBlock({
  title,
  summary,
  primaryAction,
  secondaryAction,
  context,
  className = "",
}: NextStepBlockProps) {
  const actions = secondaryAction
    ? [primaryAction, secondaryAction]
    : [primaryAction];

  return (
    <CalloutBand
      label="Next step"
      title={title}
      tone="next"
      className={className}
    >
      <div className="space-y-4">
        {summary ? <p>{summary}</p> : null}
        {context ? (
          <p className="type-caption text-(--ink-muted)">{context}</p>
        ) : null}
        <ActionLinks actions={actions} />
      </div>
    </CalloutBand>
  );
}

type SourceAnchorGridProps = {
  title?: string;
  summary?: string;
  items: readonly SourceItemSpec[];
  className?: string;
};

export function SourceAnchorGrid({
  title,
  summary,
  items,
  className = "",
}: SourceAnchorGridProps) {
  return (
    <section className={`space-y-6 ${className}`.trim()}>
      <SectionIntro eyebrow="Sources" title={title} summary={summary} />
      <ContentGrid minCardWidth="17rem">
        {items.map((item) => (
          <TonePanel
            key={`${item.title}-${item.href}`}
            tone="proof"
            className="card-shell p-6"
          >
            <p className="type-meta text-(--accent-strong)">{item.type}</p>
            <h3 className="mt-3 type-concept text-(--ink-strong)">
              {item.title}
            </h3>
            <p className="mt-3 type-body text-(--ink-body)">
              {item.description}
            </p>
            {item.note ? (
              <p className="mt-3 type-caption text-(--ink-muted)">
                {item.note}
              </p>
            ) : null}
            <ActionLinks
              actions={[
                { label: "Open source", href: item.href, kind: "secondary" },
              ]}
              className="mt-5"
            />
          </TonePanel>
        ))}
      </ContentGrid>
    </section>
  );
}

type ReadingMapGridProps = {
  title?: string;
  progression?: string;
  clusters: readonly ReadingMapClusterSpec[];
  className?: string;
};

export function ReadingMapGrid({
  title,
  progression,
  clusters,
  className = "",
}: ReadingMapGridProps) {
  return (
    <section className={`space-y-6 ${className}`.trim()}>
      <SectionIntro eyebrow="Open this next" title={title} summary={progression} />
      <ContentGrid minCardWidth="19rem">
        {clusters.map((cluster) => (
          <TonePanel
            key={cluster.title}
            tone="reading"
            className="card-shell p-5 lg:p-6"
          >
            <h3 className="type-concept text-(--ink-strong)">
              {cluster.title}
            </h3>
            <p className="mt-3 type-body text-(--ink-body)">
              {cluster.summary}
            </p>
            <ul className="mt-4 space-y-3">
              {cluster.links.map((link) => (
                <li
                  key={`${cluster.title}-${link.label}`}
                  className="rounded-(--radius-card) border border-(--border-neutral) bg-[rgba(255,255,255,0.5)] px-4 py-3"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {link.type ? (
                      <span className="type-meta text-(--accent-strong)">
                        {link.type}
                      </span>
                    ) : null}
                    {isInternalHref(link.href) ? (
                      <Link
                        href={link.href}
                        prefetch={false}
                        className="type-caption font-semibold text-(--ink-strong) underline-offset-4 hover:underline"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="type-caption font-semibold text-(--ink-strong) underline-offset-4 hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label}
                      </a>
                    )}
                  </div>
                  {link.note ? (
                    <p className="mt-2 type-annotation text-(--ink-body)">
                      {link.note}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </TonePanel>
        ))}
      </ContentGrid>
    </section>
  );
}

type GlossaryBlockProps = {
  title?: string;
  terms: readonly GlossaryTermSpec[];
  layout?: "list" | "grid";
  className?: string;
};

export function GlossaryBlock({
  title,
  terms,
  layout = "list",
  className = "",
}: GlossaryBlockProps) {
  return (
    <section className={`space-y-6 ${className}`.trim()}>
      <SectionIntro eyebrow="Glossary" title={title} />
      {layout === "grid" ? (
        <ContentGrid minCardWidth="15rem">
          {terms.map((term) => (
            <TonePanel
              key={term.term}
              tone="reading"
              className="card-shell p-5"
            >
                <h3 className="type-concept text-(--ink-strong)">
                {term.term}
              </h3>
                <p className="mt-3 type-body text-(--ink-body)">
                {term.definition}
              </p>
              {term.note ? (
                  <p className="mt-3 type-caption text-(--ink-muted)">
                  {term.note}
                </p>
              ) : null}
            </TonePanel>
          ))}
        </ContentGrid>
      ) : (
        <TonePanel tone="reading" className="p-6">
          <dl className="space-y-5">
            {terms.map((term) => (
              <div key={term.term}>
                <dt className="type-concept text-(--ink-strong)">
                  {term.term}
                </dt>
                <dd className="mt-2 type-body text-(--ink-body)">
                  {term.definition}
                </dd>
                {term.note ? (
                  <p className="mt-2 type-caption text-(--ink-muted)">
                    {term.note}
                  </p>
                ) : null}
              </div>
            ))}
          </dl>
        </TonePanel>
      )}
    </section>
  );
}

function buildVisualMedia(visual: VisualReferenceSpec) {
  return <ResolvedVisualMedia visual={visual} />;
}

type UnitRendererProps = {
  unit: EducationalUnitSpec;
  headingLevel?: HeadingLevel;
  className?: string;
};

export function UnitRenderer({
  unit,
  headingLevel = 1,
  className = "",
}: UnitRendererProps) {
  return (
    <div className={`space-y-8 ${className}`.trim()}>
      {unit.blocks.map((block, index) =>
        renderUnitBlock(block, headingLevel, index),
      )}
    </div>
  );
}

function renderUnitBlock(
  block: UnitBlockSpec,
  headingLevel: HeadingLevel,
  index: number,
) {
  const key = block.id ?? `${block.type}-${index}`;

  switch (block.type) {
    case "hero":
      return (
        <LessonHero
          key={key}
          eyebrow={block.eyebrow}
          title={block.title}
          dek={block.dek}
          metadata={block.metadata}
          progress={block.progress}
          actions={block.actions}
          visual={
            block.visualRef ? buildVisualMedia(block.visualRef) : undefined
          }
          headingLevel={headingLevel}
        />
      );
    case "whyItMatters":
      return (
        <WhyItMatters
          key={key}
          title={block.title}
          summary={block.summary}
          stakes={block.stakes}
          audience={block.audience}
          links={block.links}
        />
      );
    case "section":
      return (
        <SectionBlock
          key={key}
          id={block.id}
          eyebrow={block.eyebrow}
          title={block.title}
          summary={block.summary}
          tone={block.tone}
        >
          <TextStack content={block.body} />
        </SectionBlock>
      );
    case "conceptGrid":
      return (
        <ConceptGrid
          key={key}
          title={block.title}
          summary={block.summary}
          items={block.items}
          columns={block.columns}
        />
      );
    case "summaryGrid":
      return <SummaryGrid key={key} title={block.title} items={block.items} />;
    case "comparisonGrid":
      return (
        <ComparisonGrid
          key={key}
          title={block.title}
          legend={block.legend}
          caption={block.caption}
          columns={block.columns}
          rows={block.rows}
        />
      );
    case "sequenceTimeline":
      return (
        <SequenceTimeline
          key={key}
          title={block.title}
          summary={block.summary}
          mode={block.mode}
          items={block.items}
        />
      );
    case "workedExample":
      return (
        <WorkedExample
          key={key}
          title={block.title}
          prompt={block.prompt}
          steps={block.steps}
          result={block.result}
          reflection={block.reflection}
          media={
            block.visualRef ? (
              <MediaBlock
                alignment="split"
                tone="proof"
                media={buildVisualMedia(block.visualRef)}
                caption={block.visualRef.caption}
                credit={block.visualRef.credit}
                annotation={
                  block.reflection ? (
                    <p>{block.reflection}</p>
                  ) : (
                    <p>
                      The renderer can derive media placement from a visual
                      reference without storing React nodes.
                    </p>
                  )
                }
              />
            ) : undefined
          }
        />
      );
    case "editorialAside":
      return (
        <EditorialAside
          key={key}
          title={block.title}
          tone={block.tone}
          icon={block.icon}
        >
          <TextStack content={block.body} />
        </EditorialAside>
      );
    case "pullInsight":
      return (
        <PullInsight
          key={key}
          quote={block.quote}
          attribution={block.attribution}
          context={block.context}
        />
      );
    case "visualBreak":
      return (
        <VisualBreak
          key={key}
          title={block.title}
          body={block.body}
          tone={block.tone}
          visual={
            block.visualRef ? buildVisualMedia(block.visualRef) : undefined
          }
        />
      );
    case "reflectionPrompt":
      return (
        <ReflectionPrompt
          key={key}
          title={block.title}
          prompt={block.prompt}
          questions={block.questions}
          mode={block.mode}
          timeEstimate={block.timeEstimate}
        />
      );
    case "nextStep":
      return (
        <NextStepBlock
          key={key}
          title={block.title}
          summary={block.summary}
          primaryAction={block.primaryAction}
          secondaryAction={block.secondaryAction}
          context={block.context}
        />
      );
    case "sourceAnchorGrid":
      return (
        <SourceAnchorGrid
          key={key}
          title={block.title}
          summary={block.summary}
          items={block.items}
        />
      );
    case "glossary":
      return (
        <GlossaryBlock
          key={key}
          title={block.title}
          terms={block.terms}
          layout={block.layout}
        />
      );
    case "readingMapGrid":
      return (
        <ReadingMapGrid
          key={key}
          title={block.title}
          progression={block.progression}
          clusters={block.clusters}
        />
      );
  }
}
