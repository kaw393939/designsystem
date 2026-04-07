import Link from "next/link";
import type { ReactNode } from "react";

import { CalloutBand } from "@/components/callout-band";
import { EditorialBand } from "@/components/editorial-band";
import { PageShell } from "@/components/page-shell";
import {
  getExperienceHomepageHref,
  getSelectedSiteBuildContext,
} from "@/lib/site-release";

type IdentityRouteAction = {
  label: string;
  href: string;
  kind?: "primary" | "secondary";
};

const corePathLinks = [
  { label: "Start", href: "/experiences/identity-portfolio/" },
  { label: "Signal", href: "/experiences/identity-portfolio/signal/" },
  { label: "Style", href: "/experiences/identity-portfolio/style/" },
  { label: "Proof", href: "/experiences/identity-portfolio/proof/" },
  { label: "Build", href: "/experiences/identity-portfolio/build/" },
  { label: "Publish", href: "/experiences/identity-portfolio/publish/" },
] as const;

export function isIdentityRouteActive(href: string) {
  return getSelectedSiteBuildContext().routes.some((route) => route.href === href);
}
export function IdentityRouteShell({
  eyebrow,
  title,
  dek,
  currentHref,
  actions = [],
  children,
}: {
  eyebrow: string;
  title: string;
  dek: string;
  currentHref: string;
  actions?: IdentityRouteAction[];
  children: ReactNode;
}) {
  return (
    <PageShell maxWidthClassName="max-w-[90rem]">
      <EditorialBand tone="emphasis" paddingScale="hero">
        <p className="type-meta text-(--accent-strong)">Core path</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {corePathLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.href === currentHref ? "page" : undefined}
              className={link.href === currentHref ? "action-primary" : "action-secondary"}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="mt-8 type-meta text-(--accent-strong)">{eyebrow}</p>
        <h1 className="type-hero measure-hero mt-4 text-balance text-(--ink-strong)">
          {title}
        </h1>
        <p className="measure-wide mt-6 type-body text-(--ink-body)">{dek}</p>
        {actions.length ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {actions.map((action) => (
              <Link
                key={`${action.href}:${action.label}`}
                href={action.href}
                className={action.kind === "primary" ? "action-primary" : "action-secondary"}
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </EditorialBand>
      {children}
    </PageShell>
  );
}

export function IdentityRouteUnavailable({ title }: { title: string }) {
  const context = getSelectedSiteBuildContext();
  const homepageHref = getExperienceHomepageHref(context);

  return (
    <PageShell>
      <CalloutBand
        label="Open the live path"
        title={`${title} is parked in the current release, so start from the active identity route instead.`}
        tone="next"
        titleAsPageHeading
      >
        <p>
          This route exists in the redesign, but the selected release is not exposing it as a live page yet.
          Use the active identity homepage or the recipes guide while the split is still in progress.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={homepageHref} className="action-primary">
            Open identity start page
          </Link>
          <Link href="/recipes" className="action-secondary">
            Open recipes guide
          </Link>
        </div>
      </CalloutBand>
    </PageShell>
  );
}