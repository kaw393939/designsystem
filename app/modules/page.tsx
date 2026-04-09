import { ContentGrid } from "@/components/content-grid";
import { EditorialBand } from "@/components/editorial-band";
import { ModuleIndexCard } from "@/components/module-index-card";
import { PageShell } from "@/components/page-shell";
import { allModules } from "@/lib/module-content";

export default function ModulesIndexPage() {
  return (
    <PageShell>
      <EditorialBand tone="emphasis" paddingScale="hero">
        <div className="measure-wide">
          <p className="type-meta text-(--accent-strong)">Course spine</p>
          <h1 className="type-hero mt-4 text-balance text-(--ink-strong)">
            Modules
          </h1>
          <p className="mt-6 type-body text-(--ink-body)">
            Six modules, sixteen weeks. Each module is a self-contained teaching
            unit with lessons, a practice exercise, and a checkpoint. Start with
            the framework, then build deeper skills one module at a time.
          </p>
        </div>
      </EditorialBand>

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <ContentGrid minCardWidth="20rem">
          {allModules.map((module) => (
            <ModuleIndexCard key={module.id} module={module} />
          ))}
        </ContentGrid>
      </div>
    </PageShell>
  );
}
