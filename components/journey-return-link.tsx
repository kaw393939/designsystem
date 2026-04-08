"use client";

import Link from "next/link";

import { useSiteJourney } from "@/components/site-journey-provider";

type JourneyReturnLinkProps = {
  fallbackHref: string;
  fallbackLabel: string;
  className: string;
};

export function JourneyReturnLink({
  fallbackHref,
  fallbackLabel,
  className,
}: JourneyReturnLinkProps) {
  const { currentPage, hasHydrated, lastTourPage, previousPage } = useSiteJourney();

  const bestMatch = hasHydrated
    ? previousPage && previousPage.path !== currentPage?.path
      ? previousPage
      : lastTourPage && lastTourPage.path !== currentPage?.path
        ? lastTourPage
        : null
    : null;

  const href = bestMatch?.path ?? fallbackHref;
  const label = bestMatch ? `Back to ${bestMatch.title}` : fallbackLabel;

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}