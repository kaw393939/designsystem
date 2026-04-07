import { SiteHeaderNav } from "@/components/site-header-nav";
import {
  atlasNavItems,
  atlasSiteTitle,
} from "@/lib/archetype-atlas-content";
import Link from "next/link";

export function SiteHeader() {
  const navItems = atlasNavItems.map((item) => ({
    id: item.id,
    href: item.href,
    label: item.label,
  }));

  return (
    <header className="panel-shell panel-reading px-5 py-4 backdrop-blur">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="type-meta text-(--accent-strong)">
            Brand strategy field guide
          </p>
          <Link
            href="/"
            className="mt-1 block type-concept text-(--ink-strong)"
          >
            {atlasSiteTitle}
          </Link>
          <p className="mt-1 type-caption text-(--ink-body)">
            Archetypes, hero sections, design styles, and signal-first web presence
          </p>
        </div>
        <SiteHeaderNav items={navItems} />
      </div>
    </header>
  );
}
