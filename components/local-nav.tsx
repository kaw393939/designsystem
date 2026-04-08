"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId) ?? items[0] ?? null,
    [activeId, items],
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

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <div className={className}>
      <section className="lg:hidden">
        <div className="panel-shell panel-reading p-5">
          {progress ? (
            <p className="type-meta text-(--signal)">{progress}</p>
          ) : null}
          <div className="mt-2 flex items-start justify-between gap-4">
            <div>
              <h2 className="type-concept text-(--ink-strong)">{title}</h2>
              {activeItem ? (
                <p className="mt-2 type-caption text-(--ink-body)">
                  Currently on {activeItem.label}
                </p>
              ) : null}
            </div>
            <button type="button" onClick={() => setIsOpen(true)} className="action-secondary">
              Open page map
            </button>
          </div>
        </div>
      </section>

      <nav
        aria-label={title}
        className={`panel-shell panel-reading hidden p-5 lg:block lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto ${sticky ? "lg:sticky lg:top-28" : ""}`.trim()}
      >
        {progress ? (
          <p className="type-meta text-(--signal)">{progress}</p>
        ) : null}
        <h2 className="mt-2 type-concept text-(--ink-strong)">{title}</h2>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className={`rounded-(--radius-card) border bg-[rgba(255,255,255,0.62)] px-4 py-3 transition ${
                item.id === activeId
                  ? "border-(--accent-strong) bg-[rgba(255,255,255,0.9)] shadow-[0_12px_28px_rgba(44,52,43,0.08)]"
                  : "border-(--border-neutral)"
              }`.trim()}
            >
              <a
                href={`#${item.id}`}
                aria-current={item.id === activeId ? "location" : undefined}
                onClick={() => setActiveId(item.id)}
                className={`flex items-center gap-2 type-caption font-semibold underline-offset-4 transition hover:text-(--accent-strong) hover:underline ${
                  item.id === activeId
                    ? "text-(--accent-strong)"
                    : "text-(--ink-strong)"
                }`.trim()}
              >
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 rounded-full ${
                    item.id === activeId
                      ? "bg-(--accent-strong)"
                      : "bg-[rgba(79,104,84,0.22)]"
                  }`.trim()}
                />
                {item.label}
              </a>
              {item.description ? (
                <p className="mt-1 type-annotation text-(--ink-body)">
                  {item.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>

      {isOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close page map"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-[rgba(19,30,23,0.56)]"
          />
          <nav
            aria-label={title}
            className="absolute inset-x-3 bottom-3 top-16 overflow-y-auto rounded-[1.75rem] border border-(--border-neutral) bg-(--surface-reading) p-5 shadow-[0_24px_80px_rgba(18,30,23,0.24)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                {progress ? (
                  <p className="type-meta text-(--signal)">{progress}</p>
                ) : null}
                <h2 className="mt-2 type-concept text-(--ink-strong)">{title}</h2>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="action-secondary">
                Close
              </button>
            </div>
            <ul className="mt-5 space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className={`rounded-(--radius-card) border bg-[rgba(255,255,255,0.62)] px-4 py-3 transition ${
                    item.id === activeId
                      ? "border-(--accent-strong) bg-[rgba(255,255,255,0.9)] shadow-[0_12px_28px_rgba(44,52,43,0.08)]"
                      : "border-(--border-neutral)"
                  }`.trim()}
                >
                  <a
                    href={`#${item.id}`}
                    aria-current={item.id === activeId ? "location" : undefined}
                    onClick={() => {
                      setActiveId(item.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-2 type-caption font-semibold underline-offset-4 transition hover:text-(--accent-strong) hover:underline ${
                      item.id === activeId
                        ? "text-(--accent-strong)"
                        : "text-(--ink-strong)"
                    }`.trim()}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-2.5 w-2.5 rounded-full ${
                        item.id === activeId
                          ? "bg-(--accent-strong)"
                          : "bg-[rgba(79,104,84,0.22)]"
                      }`.trim()}
                    />
                    {item.label}
                  </a>
                  {item.description ? (
                    <p className="mt-1 type-annotation text-(--ink-body)">
                      {item.description}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
