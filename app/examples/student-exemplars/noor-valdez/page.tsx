import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { withBasePath } from "@/lib/site-config";
import { noorValdezPortfolio } from "@/lib/student-portfolio-examples";

export const metadata: Metadata = {
  title: "Noor Valdez Portfolio Example",
};

const serifDisplay = {
  fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
};

const sansEditorial = {
  fontFamily: '"Avenir Next", "Gill Sans", "Trebuchet MS", sans-serif',
};

export default function NoorValdezPortfolioPage() {
  const portfolio = noorValdezPortfolio;

  return (
    <main className="min-h-screen bg-[#f6efe5] text-[#2f241c]">
      <div className="bg-[radial-gradient(circle_at_top_left,rgba(194,126,97,0.28),transparent_28%),radial-gradient(circle_at_top_right,rgba(96,125,106,0.18),transparent_30%),linear-gradient(180deg,#f7f1e8_0%,#efe2d2_100%)]">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 md:px-10 lg:px-12">
          <div
            className="flex flex-wrap items-center justify-between gap-3 text-[0.72rem] uppercase tracking-[0.24em] text-[#6f5748]"
            style={sansEditorial}
          >
            <Link
              href="/examples/student-exemplars"
              className="rounded-full border border-[#b59077] bg-[rgba(255,252,247,0.72)] px-4 py-2 transition hover:bg-white"
            >
              Back to student exemplars
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <span>{portfolio.location}</span>
              <span className="h-1 w-1 rounded-full bg-[#b59077]" />
              <span>{portfolio.availability}</span>
            </div>
          </div>

          <section className="mt-8 grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-[0.78rem] uppercase tracking-[0.28em] text-[#a15e49]" style={sansEditorial}>
                {portfolio.role}
              </p>
              <h1
                className="mt-5 text-5xl leading-[0.94] text-[#241913] sm:text-6xl xl:text-7xl"
                style={serifDisplay}
              >
                {portfolio.headline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#4f4033]" style={sansEditorial}>
                {portfolio.intro}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-[#c9a790] bg-[rgba(255,248,242,0.86)] px-4 py-2 text-sm text-[#6e5242]" style={sansEditorial}>
                  {portfolio.audience}
                </span>
                <span className="rounded-full border border-[#d4b8a7] bg-[#fffaf3] px-4 py-2 text-sm text-[#6e5242]" style={sansEditorial}>
                  {portfolio.signal}
                </span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3" style={sansEditorial}>
                <a
                  href="#work"
                  className="inline-flex rounded-full bg-[#924f3c] px-5 py-3 text-sm font-semibold text-[#fff8f1] transition hover:bg-[#7f4130]"
                >
                  View selected work
                </a>
                <a
                  href={portfolio.email}
                  className="inline-flex rounded-full border border-[#8e6a57] px-5 py-3 text-sm font-semibold text-[#523d31] transition hover:bg-[rgba(255,255,255,0.74)]"
                >
                  Email Noor
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#d5bba8] bg-[rgba(255,251,246,0.82)] p-4 shadow-[0_24px_80px_rgba(110,73,47,0.12)]">
              <Image
                src={withBasePath(portfolio.imagePath)}
                alt={portfolio.imageAlt}
                width={1200}
                height={900}
                priority
                className="w-full rounded-[1.5rem] border border-[#ead9ca] object-cover"
              />
            </div>
          </section>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 md:px-10 lg:px-12">
        <section className="grid gap-5 lg:grid-cols-3">
          {portfolio.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[1.75rem] border border-[#ddc4b1] bg-[rgba(255,251,247,0.88)] px-5 py-5 shadow-[0_16px_48px_rgba(110,73,47,0.08)]"
            >
              <p className="text-3xl text-[#8f4d3b] sm:text-4xl" style={serifDisplay}>
                {metric.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#5c4839]" style={sansEditorial}>
                {metric.label}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[0.66fr_0.34fr] lg:items-start">
          <div className="rounded-[2rem] border border-[#d7bca8] bg-[rgba(255,249,242,0.88)] p-7 shadow-[0_20px_60px_rgba(110,73,47,0.08)]">
            <p className="text-[0.78rem] uppercase tracking-[0.24em] text-[#9a624e]" style={sansEditorial}>
              How I work
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {portfolio.principles.map((principle) => (
                <div key={principle.title} className="rounded-[1.5rem] bg-[#fffaf4] p-5">
                  <h2 className="text-2xl text-[#34261d]" style={serifDisplay}>
                    {principle.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#5d4839]" style={sansEditorial}>
                    {principle.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#cfae98] bg-[#a55d49] p-7 text-[#fff7ef] shadow-[0_20px_60px_rgba(110,73,47,0.14)]">
            <p className="text-[0.78rem] uppercase tracking-[0.24em] text-[#f3d6c5]" style={sansEditorial}>
              What teachers noticed
            </p>
            <p className="mt-5 text-3xl leading-tight" style={serifDisplay}>
              “{portfolio.quote.quote}”
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.22em] text-[#f4dacb]" style={sansEditorial}>
              {portfolio.quote.attribution}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#fff1e7]" style={sansEditorial}>
              {portfolio.quote.role}
            </p>
          </aside>
        </section>

        <section id="work" className="mt-16 space-y-8">
          <div className="max-w-3xl">
            <p className="text-[0.78rem] uppercase tracking-[0.24em] text-[#9a624e]" style={sansEditorial}>
              Selected work
            </p>
            <h2 className="mt-4 text-4xl text-[#241913] sm:text-5xl" style={serifDisplay}>
              Two projects where the page, the poster, and the invitation all had to sound like the same person.
            </h2>
          </div>

          <div className="space-y-8">
            {portfolio.projects.map((project, index) => (
              <article
                key={project.title}
                className="rounded-[2rem] border border-[#dbc3b2] bg-[rgba(255,252,248,0.9)] p-5 shadow-[0_20px_60px_rgba(110,73,47,0.08)] sm:p-7"
              >
                <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <Image
                      src={withBasePath(project.imagePath)}
                      alt={project.imageAlt}
                      width={1200}
                      height={900}
                      className="w-full rounded-[1.5rem] border border-[#ead7ca] object-cover"
                    />
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <p className="text-[0.78rem] uppercase tracking-[0.22em] text-[#9b634f]" style={sansEditorial}>
                      {project.label}
                    </p>
                    <h3 className="mt-3 text-3xl text-[#2c2018] sm:text-4xl" style={serifDisplay}>
                      {project.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-[#544234]" style={sansEditorial}>
                      {project.summary}
                    </p>
                    <div className="mt-5 space-y-4 rounded-[1.5rem] bg-[#fff7ef] p-5">
                      <div>
                        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#a16550]" style={sansEditorial}>
                          Outcome
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[#4d3a2d]" style={sansEditorial}>
                          {project.outcome}
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#a16550]" style={sansEditorial}>
                          Proof system
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[#4d3a2d]" style={sansEditorial}>
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

        <section className="mt-16 rounded-[2rem] border border-[#d2b39f] bg-[linear-gradient(135deg,#fff7ef,#f1dfcd)] px-6 py-8 sm:px-8">
          <p className="text-[0.78rem] uppercase tracking-[0.22em] text-[#9b634f]" style={sansEditorial}>
            Looking for
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.7fr_0.3fr] lg:items-end">
            <div>
              <h2 className="text-4xl text-[#241913] sm:text-5xl" style={serifDisplay}>
                Museum, archive, and editorial internships where the public-facing invitation matters as much as the research.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#554235]" style={sansEditorial}>
                I like projects where the first screen has to earn curiosity quickly, then hold up when someone reads deeper. If that sounds useful, I would love to send process notes and full critique decks.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end" style={sansEditorial}>
              <a
                href={portfolio.email}
                className="inline-flex rounded-full bg-[#8f4d3b] px-5 py-3 text-sm font-semibold text-[#fff7ef] transition hover:bg-[#7c3f30]"
              >
                Email Noor
              </a>
              <Link
                href="/examples/student-exemplars"
                className="inline-flex rounded-full border border-[#8e6a57] px-5 py-3 text-sm font-semibold text-[#523d31] transition hover:bg-[rgba(255,255,255,0.7)]"
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