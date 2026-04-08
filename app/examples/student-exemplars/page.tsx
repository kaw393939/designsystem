import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CalloutBand } from "@/components/callout-band";
import { ContentGrid } from "@/components/content-grid";
import { ObjectLabel } from "@/components/object-label";
import { RouteVisualPanel } from "@/components/route-visual-panel";
import { SectionHeading } from "@/components/section-heading";
import { StudentPortfolioPreviewCard } from "@/components/student-portfolio-preview-card";
import { SupportRouteShell } from "@/components/support-route-shell";
import { TonePanel } from "@/components/tone-panel";
import { routeVisualPlans } from "@/lib/route-imagery";
import { withBasePath } from "@/lib/site-config";
import { studentPortfolioPreviews } from "@/lib/student-portfolio-examples";
import { exampleSurfaceCards } from "@/lib/site-navigation";
import {
  strongWorkItems,
  webPresenceProducts,
} from "@/lib/web-presence-site-content";

const example = exampleSurfaceCards.find((card) => card.id === "examples-student-exemplars");

const decisionTrail = [
  {
    title: "Signal brief",
    summary: "One audience, one tension, one first-read promise that the rest of the page can actually support.",
  },
  {
    title: "Build brief",
    summary: "A page skeleton and proof plan specific enough that another person or agent could execute it without guesswork.",
  },
  {
    title: "Publish asset",
    summary: "A public-facing opener or shareable asset that still sounds like the same page after it leaves the site.",
  },
] as const;

const exemplarBoards = {
  "Portfolio site": {
    imagePath: "/archetype-atlas/examples/portfolio-exemplar-board.png",
    imageAlt:
      "Portfolio exemplar board showing a polished homepage, proof evidence, project cards, and recruiter-facing clarity.",
  },
  "Museum site": {
    imagePath: "/archetype-atlas/examples/museum-exemplar-board.png",
    imageAlt:
      "Museum-site exemplar board showing a curated subject homepage, exhibit navigation, archive imagery, and editorial hierarchy.",
  },
} as const;

export const metadata: Metadata = {
  title: "Examples Student Exemplars",
};

export default function ExamplesStudentExemplarsPage() {
  if (!example) {
    throw new Error("Missing examples-student-exemplars metadata.");
  }

  return (
    <SupportRouteShell
      eyebrow="Examples · Student exemplars"
      title="Look at finished examples to see how the choices connect."
      summary="This page shows the full chain: message, vibe, look, proof, build, then publish."
      status={example.status}
      tone="next"
      useWhen="You want to see what a full before-to-finished result looks like after the whole process holds together."
      whatChanges="How you write the build brief, what you count as a strong finished example, and whether the public-facing version still sounds like the page."
      feedsLabel="The build and publish steps"
      returnHref={example.returnHref}
      returnLabel={example.returnLabel}
      relatedHref="/tour/publish"
      relatedLabel="Continue to publish"
      actions={[
        { href: example.returnHref, label: example.returnLabel },
        { href: "/tour/publish", label: "Continue to publish", kind: "secondary" },
      ]}
      heroVisual={<RouteVisualPanel plan={routeVisualPlans.studentExemplars} />}
    >
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Live pages"
          title="Open the full portfolio pages, not just exemplar boards."
          body="These are real student portfolio examples with their own visual systems. Use them when you need to feel how the message, proof, and design language hold together on a live page."
        />
        <ContentGrid minCardWidth="20rem">
          {studentPortfolioPreviews.map((portfolio) => (
            <StudentPortfolioPreviewCard key={portfolio.slug} portfolio={portfolio} />
          ))}
        </ContentGrid>
        <div className="flex flex-wrap gap-3">
          <Link href="/examples" className="action-secondary inline-flex">
            Back to examples family
          </Link>
          <Link href="/tour/build" className="action-secondary inline-flex">
            Return to build step
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Finished examples"
          title="These examples should show finished work and the thinking that got it there."
          body="Read the two cards together. They are not just polished endings. They show that the same process can lead to a portfolio site and a museum site without falling apart."
        />
        <ObjectLabel
          title="End-to-end exemplar spread"
          objectType="Interpreted synthesis"
          provenance="Assembled from the workshop product requirements, review criteria, and guided build-to-publish steps."
          whyHere="It keeps the page focused on outcomes with visible decision thinking rather than unannotated inspiration."
          proves="Finished work is only useful as proof when you can still see the message, proof, build, and publish decisions that shaped it."
          evidenceTier="Interpreted synthesis"
        />
        <ContentGrid minCardWidth="20rem">
          {webPresenceProducts.map((product) => (
            <TonePanel key={product.title} tone="proof" className="overflow-hidden p-0">
              <Image
                src={withBasePath(exemplarBoards[product.title as keyof typeof exemplarBoards].imagePath)}
                alt={exemplarBoards[product.title as keyof typeof exemplarBoards].imageAlt}
                width={1200}
                height={900}
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <p className="type-meta text-(--accent-strong)">{product.audience}</p>
                <h2 className="mt-3 type-concept text-(--ink-strong)">{product.title}</h2>
                <p className="mt-3 type-body text-(--ink-body)">{product.summary}</p>
                <p className="mt-5 type-meta text-(--accent-strong)">Must do</p>
                <ul className="mt-3 space-y-2 pl-5 type-caption text-(--ink-body)">
                  {product.mustDo.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Decision thinking"
          title="Make the thinking visible enough that someone else could repeat it."
          body="These show whether the finished work is backed by a real brief, real proof logic, and a public-facing version that still matches."
        />
        <ContentGrid minCardWidth="16rem">
          {decisionTrail.map((item) => (
            <TonePanel key={item.title} tone="reading" className="p-6">
              <h2 className="type-concept text-(--ink-strong)">{item.title}</h2>
              <p className="mt-3 type-body text-(--ink-body)">{item.summary}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Strong work signals"
          title="Use a short checklist instead of vague inspiration talk."
          body="A useful example should make the strengths obvious enough that you can compare your own page against them."
        />
        <ContentGrid minCardWidth="16rem">
          {strongWorkItems.map((item) => (
            <TonePanel key={item} tone="synthesis" className="p-5">
              <p className="type-body text-(--ink-body)">{item}</p>
            </TonePanel>
          ))}
        </ContentGrid>
      </section>

      <CalloutBand
        label="What this changes"
        title="Go back to build with a clearer brief, then check whether the public-facing version still matches the page."
        tone="next"
      >
        <p>
          Go back to build with a tighter brief, a clearer standard for proof, and a better check
          on whether the public-facing version still matches the page.
        </p>
      </CalloutBand>
    </SupportRouteShell>
  );
}