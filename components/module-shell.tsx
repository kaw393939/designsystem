import type { ReactNode } from "react";
import Link from "next/link";

import { EditorialBand } from "@/components/editorial-band";
import { TonePanel } from "@/components/tone-panel";
import { getModuleByNumber } from "@/lib/module-content";
import type { ModuleDefinition } from "@/lib/module-content/types";
import { guidedTourSteps } from "@/lib/site-navigation";

type ModuleShellProps = {
  module: ModuleDefinition;
  children?: ReactNode;
};

export function ModuleShell({ module, children }: ModuleShellProps) {
  const moduleHref = `/modules/${module.slug}`;
  const nextModule = getModuleByNumber(module.number + 1);

  const matchedTourSteps = module.tourSteps
    ? guidedTourSteps.filter((s) => module.tourSteps!.includes(s.id))
    : [];

  return (
    <>
      <nav aria-label="Breadcrumb" className="type-caption text-(--ink-body)">
        <Link href="/modules" className="underline underline-offset-4 hover:text-(--accent-strong)">
          Modules
        </Link>
        <span className="mx-1.5" aria-hidden="true">›</span>
        <span className="text-(--ink-strong)">{module.title}</span>
      </nav>

      <EditorialBand tone={module.tone} paddingScale="hero" className="overflow-hidden">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">
            Module {module.number} · {module.weekRange}
          </p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            {module.title}
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">{module.summary}</p>
          <TonePanel tone="reading" className="mt-8 p-6">
            <p className="type-meta text-(--accent-strong)">Leave with</p>
            <p className="mt-2 type-body text-(--ink-body)">{module.leaveWith}</p>
          </TonePanel>
          {matchedTourSteps.length > 0 && (
            <TonePanel tone="synthesis" className="mt-4 p-6">
              <p className="type-meta text-(--accent-strong)">
                Where this fits in the tour
              </p>
              <p className="mt-2 type-body text-(--ink-body)">
                This module deepens{" "}
                {matchedTourSteps.map((s, i) => (
                  <span key={s.id}>
                    {i > 0 && (i === matchedTourSteps.length - 1 ? " and " : ", ")}
                    <Link
                      href={s.href}
                      className="underline text-(--accent-strong) hover:text-(--accent-hover)"
                    >
                      {s.publicLabel}
                    </Link>
                  </span>
                ))}
                .
              </p>
            </TonePanel>
          )}
        </div>
      </EditorialBand>

      <div className="space-y-6">
        <h2 className="type-concept text-(--ink-strong)">Lessons</h2>
        <ol className="space-y-4">
          {module.lessons.map((lesson, index) => (
            <li key={lesson.id}>
              <Link
                href={`${moduleHref}/${lesson.slug}`}
                className="block rounded-(--radius-card) border border-(--border-strong) bg-[rgba(255,255,255,0.56)] p-5 transition-colors hover:bg-[rgba(255,255,255,0.8)]"
              >
                <p className="type-meta text-(--accent-strong)">
                  Lesson {index + 1}
                </p>
                <p className="mt-1 font-semibold type-body text-(--ink-strong)">
                  {lesson.title}
                </p>
                <p className="mt-1 type-caption text-(--ink-body)">
                  {lesson.summary}
                </p>
              </Link>
            </li>
          ))}
        </ol>

        {(module.hasPractice || module.hasCheckpoint) && (
          <div className="flex flex-wrap gap-3 pt-2">
            {module.hasPractice && (
              <Link href={`${moduleHref}/practice`} className="action-primary">
                Practice
              </Link>
            )}
            {module.hasCheckpoint && (
              <Link href={`${moduleHref}/checkpoint`} className="action-secondary">
                Checkpoint
              </Link>
            )}
          </div>
        )}
      </div>

      {children ? <div className="space-y-8">{children}</div> : null}

      <nav aria-label="Module navigation">
        <div className="flex justify-between">
          <Link href="/modules" className="action-secondary">
            ← All modules
          </Link>
          {nextModule ? (
            <Link
              href={`/modules/${nextModule.slug}`}
              className="action-primary"
            >
              Module {nextModule.number}: {nextModule.title} →
            </Link>
          ) : (
            <Link href="/modules" className="action-secondary">
              All modules →
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
