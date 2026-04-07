"use client";

import { useEffect, useState, type ReactNode } from "react";

export type LocalNavItem = {
  id: string;
  label: string;
  description?: string;
  current?: boolean;
};

type LocalNavProps = {
  items: readonly LocalNavItem[];
  title?: string;
  progress?: ReactNode;
  sticky?: boolean;
  className?: string;
};

export function LocalNav({
  items,
  title = "On this page",
  progress,
  sticky = true,
  className = "",
}: LocalNavProps) {
  const [activeId, setActiveId] = useState(
    items.find((item) => item.current)?.id ?? items[0]?.id ?? "",
  );

  useEffect(() => {
    const sectionElements = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    let animationFrame = 0;
    let mountFrame = 0;

    const updateActiveSection = () => {
      animationFrame = 0;

      const currentHash = window.location.hash.replace(/^#/, "");

      if (currentHash && items.some((item) => item.id === currentHash)) {
        setActiveId((currentId) =>
          currentId === currentHash ? currentId : currentHash,
        );
        return;
      }

      if (!sectionElements.length) {
        const fallbackId =
          items.find((item) => item.current)?.id ?? items[0]?.id ?? "";

        if (fallbackId) {
          setActiveId((currentId) =>
            currentId === fallbackId ? currentId : fallbackId,
          );
        }
        return;
      }

      const anchorOffset = 168;
      const activeSection =
        sectionElements
          .filter((section) => section.getBoundingClientRect().top - anchorOffset <= 0)
          .at(-1) ?? sectionElements[0];

      if (activeSection) {
        setActiveId((currentId) =>
          currentId === activeSection.id ? currentId : activeSection.id,
        );
      }
    };

    const requestActiveSectionUpdate = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    mountFrame = window.requestAnimationFrame(updateActiveSection);
    window.addEventListener("scroll", requestActiveSectionUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestActiveSectionUpdate);
    window.addEventListener("hashchange", requestActiveSectionUpdate);

    return () => {
      if (mountFrame) {
        window.cancelAnimationFrame(mountFrame);
      }
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener("scroll", requestActiveSectionUpdate);
      window.removeEventListener("resize", requestActiveSectionUpdate);
      window.removeEventListener("hashchange", requestActiveSectionUpdate);
    };
  }, [items]);

  return (
    <nav
      aria-label={title}
      className={`panel-shell panel-reading max-h-[calc(100vh-2rem)] overflow-y-auto p-5 ${sticky ? "lg:sticky lg:top-28" : ""} ${className}`.trim()}
    >
      {progress ? (
        <p className="type-meta text-[var(--signal)]">{progress}</p>
      ) : null}
      <h2 className="mt-2 type-concept text-[var(--ink-strong)]">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className={`rounded-[var(--radius-card)] border bg-[rgba(255,255,255,0.62)] px-4 py-3 transition ${
              item.id === activeId
                ? "border-[var(--accent-strong)] bg-[rgba(255,255,255,0.9)] shadow-[0_12px_28px_rgba(44,52,43,0.08)]"
                : "border-[var(--border-neutral)]"
            }`.trim()}
          >
            <a
              href={`#${item.id}`}
              aria-current={item.id === activeId ? "location" : undefined}
              onClick={() => setActiveId(item.id)}
              className={`flex items-center gap-2 type-caption font-semibold underline-offset-4 transition hover:text-[var(--accent-strong)] hover:underline ${
                item.id === activeId
                  ? "text-[var(--accent-strong)]"
                  : "text-[var(--ink-strong)]"
              }`.trim()}
            >
              <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 rounded-full ${
                  item.id === activeId
                    ? "bg-[var(--accent-strong)]"
                    : "bg-[rgba(79,104,84,0.22)]"
                }`.trim()}
              />
              {item.label}
            </a>
            {item.description ? (
              <p className="mt-1 type-annotation text-[var(--ink-body)]">
                {item.description}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
