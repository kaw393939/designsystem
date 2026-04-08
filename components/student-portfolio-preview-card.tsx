import Image from "next/image";
import Link from "next/link";

import { TonePanel } from "@/components/tone-panel";
import { withBasePath } from "@/lib/site-config";
import type { StudentPortfolioPreview } from "@/lib/student-portfolio-examples";

type StudentPortfolioPreviewCardProps = {
  portfolio: StudentPortfolioPreview;
};

export function StudentPortfolioPreviewCard({
  portfolio,
}: StudentPortfolioPreviewCardProps) {
  return (
    <TonePanel tone="proof" className="overflow-hidden p-0">
      <Image
        src={withBasePath(portfolio.imagePath)}
        alt={portfolio.imageAlt}
        width={1200}
        height={900}
        className="h-56 w-full object-cover"
      />
      <div className="p-6">
        <p className="type-meta text-(--accent-strong)">{portfolio.role}</p>
        <h3 className="mt-3 type-concept text-(--ink-strong)">{portfolio.name}</h3>
        <p className="mt-3 type-body text-(--ink-body)">{portfolio.summary}</p>
        <p className="mt-4 type-caption text-(--ink-body)">
          <strong>Audience:</strong> {portfolio.audience}
        </p>
        <p className="mt-2 type-caption text-(--ink-body)">
          <strong>Signal:</strong> {portfolio.signal}
        </p>
        <p className="mt-2 type-caption text-(--ink-body)">
          <strong>Visual system:</strong> {portfolio.styleNote}
        </p>
        <Link href={portfolio.href} className="action-primary mt-5 inline-flex w-fit">
          Open {portfolio.name}
        </Link>
      </div>
    </TonePanel>
  );
}