"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import {
  countFilledTourBriefFields,
  loadTourBriefDraft,
} from "@/lib/tour-brief-storage";

type JourneyKind =
  | "start"
  | "tour"
  | "browse"
  | "examples"
  | "support"
  | "instructor"
  | "other";

export type JourneyEntry = {
  path: string;
  title: string;
  kind: JourneyKind;
  visitedAt: number;
};

type PersistedJourneyState = {
  recentPages: JourneyEntry[];
  lastTourPage: JourneyEntry | null;
  lastSupportPage: JourneyEntry | null;
  briefCount: number;
};

type SiteJourneyContextValue = {
  currentPage: JourneyEntry | null;
  previousPage: JourneyEntry | null;
  recentPages: JourneyEntry[];
  lastTourPage: JourneyEntry | null;
  lastSupportPage: JourneyEntry | null;
  briefCount: number;
  setBriefCount: (count: number) => void;
  hasHydrated: boolean;
  isResumeBandDismissed: boolean;
  dismissResumeBand: () => void;
  restoreResumeBand: () => void;
};

const JOURNEY_STORAGE_KEY = "web-presence-workshop.journey.v1";
const RESUME_DISMISSED_KEY = "web-presence-workshop.resume-dismissed";

const SiteJourneyContext = createContext<SiteJourneyContextValue | null>(null);

function normalizePathname(pathname: string) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "") || "/";
}

function normalizePageTitle(rawTitle: string) {
  const normalizedTitle = rawTitle
    .replace(/\s*\|\s*Web Presence Workshop$/, "")
    .trim();

  return normalizedTitle || "Current page";
}

function getJourneyKind(pathname: string): JourneyKind {
  if (pathname === "/") {
    return "start";
  }

  if (pathname === "/tour" || pathname.startsWith("/tour/")) {
    return "tour";
  }

  if (
    pathname === "/browse" ||
    pathname.startsWith("/browse/") ||
    pathname === "/archetypes" ||
    pathname.startsWith("/archetypes/") ||
    pathname === "/design-styles" ||
    pathname === "/persuasion"
  ) {
    return "browse";
  }

  if (
    pathname === "/examples" ||
    pathname.startsWith("/examples/") ||
    pathname === "/hero-examples"
  ) {
    return "examples";
  }

  if (pathname === "/instructor-guide") {
    return "instructor";
  }

  if (
    [
      "/recipes",
      "/layouts",
      "/tokens",
      "/process",
      "/status",
      "/primitives",
      "/playbook",
      "/workbook",
      "/deliverables",
    ].some((route) => pathname === route || pathname.startsWith(`${route}/`))
  ) {
    return "support";
  }

  return "other";
}

function loadPersistedJourneyState(): PersistedJourneyState {
  if (typeof window === "undefined") {
    return {
      recentPages: [],
      lastTourPage: null,
      lastSupportPage: null,
      briefCount: 0,
    };
  }

  try {
    const rawState = window.localStorage.getItem(JOURNEY_STORAGE_KEY);

    if (!rawState) {
      return {
        recentPages: [],
        lastTourPage: null,
        lastSupportPage: null,
        briefCount: 0,
      };
    }

    const parsedState = JSON.parse(rawState) as Partial<PersistedJourneyState>;

    return {
      recentPages: Array.isArray(parsedState.recentPages)
        ? parsedState.recentPages.filter(
            (entry): entry is JourneyEntry =>
              Boolean(entry) &&
              typeof entry.path === "string" &&
              typeof entry.title === "string" &&
              typeof entry.kind === "string" &&
              typeof entry.visitedAt === "number",
          )
        : [],
      lastTourPage:
        parsedState.lastTourPage && typeof parsedState.lastTourPage.path === "string"
          ? parsedState.lastTourPage
          : null,
      lastSupportPage:
        parsedState.lastSupportPage && typeof parsedState.lastSupportPage.path === "string"
          ? parsedState.lastSupportPage
          : null,
      briefCount:
        typeof parsedState.briefCount === "number" ? parsedState.briefCount : 0,
    };
  } catch {
    return {
      recentPages: [],
      lastTourPage: null,
      lastSupportPage: null,
      briefCount: 0,
    };
  }
}

type SiteJourneyProviderProps = {
  children: ReactNode;
};

export function SiteJourneyProvider({ children }: SiteJourneyProviderProps) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState<JourneyEntry | null>(null);
  const [previousPage, setPreviousPage] = useState<JourneyEntry | null>(null);
  const [persistedState, setPersistedState] = useState<PersistedJourneyState>({
    recentPages: [],
    lastTourPage: null,
    lastSupportPage: null,
    briefCount: 0,
  });
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isResumeBandDismissed, setIsResumeBandDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const initialState = loadPersistedJourneyState();
    const initialBriefCount = countFilledTourBriefFields(loadTourBriefDraft(window.localStorage));

    setPersistedState({
      ...initialState,
      briefCount: initialBriefCount || initialState.briefCount,
    });
    setIsResumeBandDismissed(window.localStorage.getItem(RESUME_DISMISSED_KEY) === "true");
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated || typeof document === "undefined") {
      return;
    }

    const normalizedPath = normalizePathname(pathname || "/");
    const nextEntry: JourneyEntry = {
      path: normalizedPath,
      title: normalizePageTitle(document.title),
      kind: getJourneyKind(normalizedPath),
      visitedAt: Date.now(),
    };

    setCurrentPage((existingPage) => {
      if (existingPage?.path === nextEntry.path && existingPage.title === nextEntry.title) {
        return existingPage;
      }

      if (existingPage?.path && existingPage.path !== nextEntry.path) {
        setPreviousPage(existingPage);
      }

      return nextEntry;
    });

    setPersistedState((existingState) => {
      const recentPages = [
        nextEntry,
        ...existingState.recentPages.filter((page) => page.path !== nextEntry.path),
      ].slice(0, 8);
      const trackAsSupport = ["browse", "examples", "support"].includes(nextEntry.kind);

      return {
        ...existingState,
        recentPages,
        lastTourPage:
          nextEntry.kind === "tour" && nextEntry.path !== "/tour"
            ? nextEntry
            : existingState.lastTourPage,
        lastSupportPage: trackAsSupport ? nextEntry : existingState.lastSupportPage,
      };
    });
  }, [pathname, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(persistedState));
  }, [persistedState, hasHydrated]);

  const setBriefCount = useCallback((count: number) => {
    setPersistedState((existingState) => {
      if (existingState.briefCount === count) {
        return existingState;
      }

      return {
        ...existingState,
        briefCount: count,
      };
    });
  }, []);

  const dismissResumeBand = useCallback(() => {
    setIsResumeBandDismissed(true);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(RESUME_DISMISSED_KEY, "true");
    }
  }, []);

  const restoreResumeBand = useCallback(() => {
    setIsResumeBandDismissed(false);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(RESUME_DISMISSED_KEY);
    }
  }, []);

  const contextValue = useMemo<SiteJourneyContextValue>(
    () => ({
      currentPage,
      previousPage,
      recentPages: persistedState.recentPages,
      lastTourPage: persistedState.lastTourPage,
      lastSupportPage: persistedState.lastSupportPage,
      briefCount: persistedState.briefCount,
      setBriefCount,
      hasHydrated,
      isResumeBandDismissed,
      dismissResumeBand,
      restoreResumeBand,
    }),
    [currentPage, previousPage, persistedState, setBriefCount, hasHydrated, isResumeBandDismissed, dismissResumeBand, restoreResumeBand],
  );

  return (
    <SiteJourneyContext.Provider value={contextValue}>
      {children}
    </SiteJourneyContext.Provider>
  );
}

export function useSiteJourney() {
  const context = useContext(SiteJourneyContext);

  if (!context) {
    throw new Error("useSiteJourney must be used inside SiteJourneyProvider.");
  }

  return context;
}