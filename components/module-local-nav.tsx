"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { TonePanel } from "@/components/tone-panel";
import type { ModuleDefinition } from "@/lib/module-content/types";

type ModuleLocalNavProps = {
  module: ModuleDefinition;
  className?: string;
};

export function ModuleLocalNav({ module, className = "" }: ModuleLocalNavProps) {
  const pathname = usePathname();
  const basePath = `/modules/${module.slug}`;

  const items = [
    { href: basePath, label: "Overview" },
    ...module.lessons.map((lesson, index) => ({
      href: `${basePath}/${lesson.slug}`,
      label: `${index + 1}. ${lesson.title}`,
    })),
    ...(module.hasPractice
      ? [{ href: `${basePath}/practice`, label: "Practice" }]
      : []),
    ...(module.hasCheckpoint
      ? [{ href: `${basePath}/checkpoint`, label: "Checkpoint" }]
      : []),
  ];

  function isCurrent(href: string) {
    const normalizedPathname = pathname?.replace(/\/+$/, "") || "";
    const normalizedHref = href.replace(/\/+$/, "");
    return normalizedPathname === normalizedHref;
  }

  return (
    <TonePanel tone={module.tone} className={`p-4 ${className}`.trim()}>
      <nav aria-label={`${module.title} navigation`}>
        <p className="type-meta text-(--accent-strong)">
          Module {module.number}
        </p>
        <p className="mt-1 font-semibold type-caption text-(--ink-strong)">
          {module.title}
        </p>
        <ul className="mt-4 space-y-1">
          {items.map((item) => {
            const current = isCurrent(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`block rounded-md px-3 py-2 type-caption transition-colors ${
                    current
                      ? "bg-[rgba(255,255,255,0.6)] font-semibold text-(--ink-strong)"
                      : "text-(--ink-body) hover:bg-[rgba(255,255,255,0.3)]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </TonePanel>
  );
}
