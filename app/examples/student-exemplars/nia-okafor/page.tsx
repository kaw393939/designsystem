import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { withBasePath } from "@/lib/site-config";
import { niaOkaforPortfolio } from "@/lib/student-portfolio-examples";

export const metadata: Metadata = {
  title: "Nia Okafor Portfolio Example",
};

const posterDisplay = {
  fontFamily:
    '"DM Sans", "Helvetica Neue", "Arial Black", sans-serif',
};

const monoCaption = {
  fontFamily: '"IBM Plex Mono", "SFMono-Regular", "Menlo", monospace',
};

export default function NiaOkaforPortfolioPage() {
  const portfolio = niaOkaforPortfolio;

  return (
    <main className="min-h-screen bg-[#0d1b2a] text-[#f5efe6]">
      <div className="bg-[radial-gradient(circle_at_top_left,rgba(212,168,71,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(186,120,67,0.14),transparent_30%),linear-gradient(180deg,#111f30_0%,#0d1b2a_100%)]">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 md:px-10 lg:px-12">
          <div
            className="flex flex-wrap items-center justify-between gap-3 text-[0.72rem] uppercase tracking-[0.24em] text-[#c9a84e]"
            style={monoCaption}
          >
            <Link
              href="/examples/student-exemplars"
              className="rounded-full border border-[#2a3d54] bg-[rgba(13,27,42,0.72)] px-4 py-2 transition hover:border-[#d4a847] hover:text-[#f5efe6]"
            >
              Back to student exemplars
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <span>{portfolio.location}</span>
              <span className="h-1 w-1 rounded-full bg-[#d4a847]" />
              <span>{portfolio.availability}</span>
            </div>
          </div>

          <section className="mt-10 grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
            <div className="max-w-2xl">
              <p
                className="text-[0.78rem] uppercase tracking-[0.28em] text-[#d4a847]"
                style={monoCaption}
              >
                {portfolio.role}
              </p>
              <h1
                className="mt-4 text-5xl font-extrabold uppercase leading-[0.88] text-[#f5efe6] sm:text-6xl xl:text-7xl"
                style={posterDisplay}
              >
                {portfolio.headline}
              </h1>
              <p
                className="mt-6 max-w-xl text-lg leading-8 text-[#b8b0a2]"
                style={monoCaption}
              >
                {portfolio.intro}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span
                  className="rounded-full border border-[#2e4260] bg-[rgba(13,27,42,0.88)] px-4 py-2 text-sm text-[#e0c97a]"
                  style={monoCaption}
                >
                  {portfolio.audience}
                </span>
                <span
                  className="rounded-full border border-[#4a3a20] bg-[rgba(30,24,14,0.9)] px-4 py-2 text-sm text-[#d4a847]"
                  style={monoCaption}
                >
                  {portfolio.signal}
                </span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3" style={monoCaption}>
                <a
                  href="#campaigns"
                  className="inline-flex rounded-full bg-[#d4a847] px-5 py-3 text-sm font-semibold text-[#0d1b2a] transition hover:bg-[#c49a3a]"
                >
                  View campaigns
                </a>
                <a
                  href={portfolio.email}
                  className="inline-flex rounded-full border border-[#3a5068] px-5 py-3 text-sm font-semibold text-[#f0e8da] transition hover:border-[#d4a847] hover:text-white"
                >
                  Email Nia
                </a>
              </div>
            </div>

            <div className="rounded-4xl border border-[#253548] bg-[rgba(13,27,42,0.85)] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.4)]">
              <Image
                src={withBasePath(portfolio.imagePath)}
                alt={portfolio.imageAlt}
                width={1200}
                height={900}
                priority
                className="w-full rounded-[1.4rem] border border-[#1e3044] object-cover"
              />
            </div>
          </section>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 md:px-10 lg:px-12">
        <section className="grid gap-4 lg:grid-cols-3">
          {portfolio.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[1.6rem] border border-[#253548] bg-[linear-gradient(180deg,rgba(17,31,48,0.94),rgba(13,27,42,0.98))] p-5 shadow-[0_20px_56px_rgba(0,0,0,0.32)]"
            >
              <p
                className="text-[2.6rem] font-extrabold leading-none text-[#d4a847] sm:text-[3rem]"
                style={posterDisplay}
              >
                {metric.value}
              </p>
              <p
                className="mt-3 text-sm leading-6 text-[#a9a196]"
                style={monoCaption}
              >
                {metric.label}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[0.62fr_0.38fr] lg:items-start">
          <div className="rounded-4xl border border-[#253a50] bg-[rgba(13,27,42,0.95)] p-7 shadow-[0_24px_64px_rgba(0,0,0,0.32)]">
            <p
              className="text-[0.76rem] uppercase tracking-[0.24em] text-[#d4a847]"
              style={monoCaption}
            >
              How I work
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {portfolio.principles.map((principle) => (
                <div
                  key={principle.title}
                  className="rounded-[1.4rem] border border-[#1e3044] bg-[rgba(17,31,48,0.9)] p-5"
                >
                  <h2
                    className="text-2xl font-extrabold uppercase text-[#f5efe6]"
                    style={posterDisplay}
                  >
                    {principle.title}
                  </h2>
                  <p
                    className="mt-3 text-sm leading-6 text-[#a9a196]"
                    style={monoCaption}
                  >
                    {principle.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-4xl border border-[#3d4f38] bg-[linear-gradient(180deg,#1a2a18,#14210f)] p-7 text-[#f5efe6] shadow-[0_24px_64px_rgba(0,0,0,0.32)]">
            <p
              className="text-[0.76rem] uppercase tracking-[0.24em] text-[#d4a847]"
              style={monoCaption}
            >
              Faculty note
            </p>
            <p
              className="mt-5 text-3xl font-extrabold uppercase leading-tight text-[#f5efe6]"
              style={posterDisplay}
            >
              &ldquo;{portfolio.quote.quote}&rdquo;
            </p>
            <p
              className="mt-6 text-sm uppercase tracking-[0.22em] text-[#d4a847]"
              style={monoCaption}
            >
              {portfolio.quote.attribution}
            </p>
            <p
              className="mt-2 text-sm leading-6 text-[#b8b0a2]"
              style={monoCaption}
            >
              {portfolio.quote.role}
            </p>
          </aside>
        </section>

        <section id="campaigns" className="mt-16 space-y-8">
          <div className="max-w-3xl">
            <p
              className="text-[0.76rem] uppercase tracking-[0.24em] text-[#d4a847]"
              style={monoCaption}
            >
              Selected campaigns
            </p>
            <h2
              className="mt-4 text-4xl font-extrabold uppercase text-[#f5efe6] sm:text-5xl"
              style={posterDisplay}
            >
              Two projects where the poster, the page, and the social card all had to earn trust from the same stranger.
            </h2>
          </div>

          <div className="space-y-8">
            {portfolio.projects.map((project, index) => (
              <article
                key={project.title}
                className="rounded-4xl border border-[#253a50] bg-[rgba(13,27,42,0.94)] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.35)] sm:p-7"
              >
                <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <Image
                      src={withBasePath(project.imagePath)}
                      alt={project.imageAlt}
                      width={1200}
                      height={900}
                      className="w-full rounded-[1.4rem] border border-[#1e3044] object-cover"
                    />
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <p
                      className="text-[0.76rem] uppercase tracking-[0.22em] text-[#d4a847]"
                      style={monoCaption}
                    >
                      {project.label}
                    </p>
                    <h3
                      className="mt-3 text-3xl font-extrabold uppercase text-[#f5efe6] sm:text-4xl"
                      style={posterDisplay}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="mt-4 text-base leading-7 text-[#b3ab9e]"
                      style={monoCaption}
                    >
                      {project.summary}
                    </p>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div className="rounded-[1.3rem] border border-[#2a3d54] bg-[rgba(17,31,48,0.92)] p-5">
                        <p
                          className="text-[0.74rem] uppercase tracking-[0.22em] text-[#d4a847]"
                          style={monoCaption}
                        >
                          Outcome
                        </p>
                        <p
                          className="mt-3 text-sm leading-6 text-[#c4bdb0]"
                          style={monoCaption}
                        >
                          {project.outcome}
                        </p>
                      </div>
                      <div className="rounded-[1.3rem] border border-[#2a3d54] bg-[rgba(17,31,48,0.92)] p-5">
                        <p
                          className="text-[0.74rem] uppercase tracking-[0.22em] text-[#c49a3a]"
                          style={monoCaption}
                        >
                          Proof system
                        </p>
                        <p
                          className="mt-3 text-sm leading-6 text-[#c4bdb0]"
                          style={monoCaption}
                        >
                          {project.proof}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-4xl border border-[#3a4e2e] bg-[linear-gradient(135deg,rgba(17,31,48,0.96),rgba(13,27,42,1))] px-6 py-8 sm:px-8">
          <p
            className="text-[0.76rem] uppercase tracking-[0.22em] text-[#d4a847]"
            style={monoCaption}
          >
            Looking for
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.7fr_0.3fr] lg:items-end">
            <div>
              <h2
                className="text-4xl font-extrabold uppercase text-[#f5efe6] sm:text-5xl"
                style={posterDisplay}
              >
                Agencies and civic teams that need someone who can carry a campaign from brief to bus shelter without losing the trust signal.
              </h2>
              <p
                className="mt-4 max-w-2xl text-base leading-7 text-[#b3ab9e]"
                style={monoCaption}
              >
                I care most about health communication, transit equity, and public-service campaigns where the first impression has to work for people who have no reason to look twice.
              </p>
            </div>
            <div
              className="flex flex-wrap gap-3 lg:justify-end"
              style={monoCaption}
            >
              <a
                href={portfolio.email}
                className="inline-flex rounded-full bg-[#d4a847] px-5 py-3 text-sm font-semibold text-[#0d1b2a] transition hover:bg-[#c49a3a]"
              >
                Email Nia
              </a>
              <Link
                href="/examples/student-exemplars"
                className="inline-flex rounded-full border border-[#3a5068] px-5 py-3 text-sm font-semibold text-[#f0e8da] transition hover:border-[#d4a847]"
              >
                More example pages
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
