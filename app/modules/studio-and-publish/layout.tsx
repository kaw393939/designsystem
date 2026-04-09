import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ModuleLocalNav } from "@/components/module-local-nav";
import { PageShell } from "@/components/page-shell";
import { getModule } from "@/lib/module-content";

const MODULE_SLUG = "studio-and-publish";

const moduleData = getModule(MODULE_SLUG)!;

export const metadata: Metadata = {
  title: {
    default: moduleData.title,
    template: `%s | ${moduleData.title}`,
  },
};

export default function StudioAndPublishLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PageShell>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="flex min-w-0 flex-col gap-12">{children}</div>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <ModuleLocalNav module={moduleData} />
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
