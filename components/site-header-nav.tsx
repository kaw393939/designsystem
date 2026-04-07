"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SiteHeaderNavItem = {
  id: string;
  href: string;
  label: string;
  matchHrefs?: string[];
};

type SiteHeaderNavProps = {
  items: readonly SiteHeaderNavItem[];
  contextualItems?: readonly SiteHeaderNavItem[];
};

function normalizePath(pathname: string) {
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\/+|\/+$/g, "") || "";
  const normalizedBasePath = basePath ? `/${basePath}` : "";
  let normalizedPath = pathname || "/";

  if (normalizedBasePath) {
    if (normalizedPath === normalizedBasePath) {
      normalizedPath = "/";
    } else if (normalizedPath.startsWith(`${normalizedBasePath}/`)) {
      normalizedPath = normalizedPath.slice(normalizedBasePath.length) || "/";
    }
  }

  if (normalizedPath !== "/") {
    normalizedPath = normalizedPath.replace(/\/+$/, "");
  }

  return normalizedPath || "/";
}

export function SiteHeaderNav({
  items,
  contextualItems = [],
}: SiteHeaderNavProps) {
  const pathname = usePathname();
  const currentPath = normalizePath(pathname || "/");
  const primaryItemIds = new Set(items.map((item) => item.id));

  const matchesCurrentPath = (item: SiteHeaderNavItem) => {
    const matchPaths = item.matchHrefs?.length ? item.matchHrefs : [item.href];

    return matchPaths.some((matchHref) => {
      const itemPath = normalizePath(matchHref);

      return (
        currentPath === itemPath ||
        (itemPath !== "/" && currentPath.startsWith(`${itemPath}/`))
      );
    });
  };

  const hasPrimaryCurrentItem = items.some(matchesCurrentPath);
  const contextualItem = hasPrimaryCurrentItem
    ? null
    : contextualItems.find(
        (item) => primaryItemIds.has(item.id) === false && matchesCurrentPath(item),
      ) ?? null;
  const visibleItems = contextualItem ? [...items, contextualItem] : [...items];

  return (
    <nav aria-label="Primary" className="flex flex-wrap gap-2">
      {visibleItems.map((item) => {
        const isCurrent = matchesCurrentPath(item);

        return (
          <Link
            key={item.id}
            href={item.href}
            aria-current={isCurrent ? "page" : undefined}
            className={`action-secondary px-4 py-2 text-(--ink-body) hover:border-(--accent) hover:text-(--ink-strong) ${
              isCurrent
                ? "border-(--accent-strong) bg-[rgba(255,255,255,0.92)] text-(--ink-strong) shadow-[0_12px_32px_rgba(44,52,43,0.08)]"
                : ""
            }`.trim()}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}