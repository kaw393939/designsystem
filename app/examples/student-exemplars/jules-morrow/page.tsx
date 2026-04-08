import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { withBasePath } from "@/lib/site-config";
import { julesMorrowPortfolio } from "@/lib/student-portfolio-examples";

export const metadata: Metadata = {
  title: "Jules Morrow Portfolio Example",
};

const displayCondensed = {
  fontFamily:
    '"Avenir Next Condensed", "Franklin Gothic Medium", "Arial Narrow", sans-serif',
};

const monoUi = {
  fontFamily: '"SFMono-Regular", "Menlo", "Consolas", monospace',
};

export default function JulesMorrowPortfolioPage() {
  const portfolio = julesMorrowPortfolio;

  return (
    <main className="min-h-screen bg-[#071116] text-[#ecfff9]">
      <div className="bg-[radial-gradient(circle_at_top_right,rgba(95,255,196,0.12),transparent_26%),radial-gradient(circle_at_top_left,rgba(76,188,255,0.18),transparent_28%),linear-gradient(180deg,#0a151c_0%,#071116_100%)]">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 md:px-10 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[0.72rem] uppercase tracking-[0.24em] text-[#8fd9c7]" style={monoUi}>
            <Link
              href="/examples/student-exemplars"
              className="rounded-full border border-[#214b54] bg-[rgba(5,19,25,0.68)] px-4 py-2 transition hover:border-[#5efec2] hover:text-[#d9fff3]"
            >
              Back to student exemplars
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <span>{portfolio.location}</span>
              <span className="h-1 w-1 rounded-full bg-[#5efec2]" />
              <span>{portfolio.availability}</span>
            </div>
          </div>

          <section className="mt-10 grid gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-[0.78rem] uppercase tracking-[0.24em] text-[#71e6ff]" style={monoUi}>
                {portfolio.role}
              </p>
              <h1
                className="mt-4 text-5xl uppercase leading-[0.9] text-[#f2fff8] sm:text-6xl xl:text-7xl"
                style={displayCondensed}
              >
                {portfolio.headline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#b4d7d0]" style={monoUi}>
                {portfolio.intro}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-[#19404a] bg-[rgba(10,29,36,0.88)] px-4 py-2 text-sm text-[#b5efe1]" style={monoUi}>
                  {portfolio.audience}
                </span>
                <span className="rounded-full border border-[#305d43] bg-[rgba(18,36,31,0.9)] px-4 py-2 text-sm text-[#d9ff74]" style={monoUi}>
                  {portfolio.signal}
                </span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3" style={monoUi}>
                <a
                  href="#systems"
                  className="inline-flex rounded-full bg-[#d9ff74] px-5 py-3 text-sm font-semibold text-[#071116] transition hover:bg-[#c6ee5b]"
                >
                  View systems work
                </a>
                <a
                  href={portfolio.email}
                  className="inline-flex rounded-full border border-[#285561] px-5 py-3 text-sm font-semibold text-[#d7fffb] transition hover:border-[#71e6ff] hover:text-white"
                >
                  Email Jules
                </a>
              </div>
            </div>

            <div className="rounded-4xl border border-[#173842] bg-[rgba(7,20,26,0.85)] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
              <Image
                src={withBasePath(portfolio.imagePath)}
                alt={portfolio.imageAlt}
                width={1200}
                height={900}
                priority
                className="w-full rounded-[1.4rem] border border-[#163743] object-cover"
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
              className="rounded-[1.6rem] border border-[#173741] bg-[linear-gradient(180deg,rgba(10,25,32,0.92),rgba(7,16,22,0.98))] p-5 shadow-[0_20px_56px_rgba(0,0,0,0.28)]"
            >
              <p className="text-[2.6rem] leading-none text-[#d9ff74] sm:text-[3rem]" style={displayCondensed}>
                {metric.value}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#abd1ca]" style={monoUi}>
                {metric.label}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[0.62fr_0.38fr] lg:items-start">
          <div className="rounded-4xl border border-[#183a45] bg-[rgba(7,19,25,0.95)] p-7 shadow-[0_24px_64px_rgba(0,0,0,0.28)]">
            <p className="text-[0.76rem] uppercase tracking-[0.24em] text-[#71e6ff]" style={monoUi}>
              Operating model
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {portfolio.principles.map((principle) => (
                <div key={principle.title} className="rounded-[1.4rem] border border-[#15333c] bg-[rgba(10,24,31,0.9)] p-5">
                  <h2 className="text-2xl uppercase text-[#f1fff8]" style={displayCondensed}>
                    {principle.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#aad0c8]" style={monoUi}>
                    {principle.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-4xl border border-[#24505b] bg-[linear-gradient(180deg,#0f2228,#0b171c)] p-7 text-[#effff7] shadow-[0_24px_64px_rgba(0,0,0,0.28)]">
            <p className="text-[0.76rem] uppercase tracking-[0.24em] text-[#71e6ff]" style={monoUi}>
              Faculty note
            </p>
            <p className="mt-5 text-3xl uppercase leading-tight text-[#effff7]" style={displayCondensed}>
              “{portfolio.quote.quote}”
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.22em] text-[#d9ff74]" style={monoUi}>
              {portfolio.quote.attribution}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#abd1ca]" style={monoUi}>
              {portfolio.quote.role}
            </p>
          </aside>
        </section>

        <section id="systems" className="mt-16 space-y-8">
          <div className="max-w-3xl">
            <p className="text-[0.76rem] uppercase tracking-[0.24em] text-[#71e6ff]" style={monoUi}>
              Selected systems
            </p>
            <h2 className="mt-4 text-4xl uppercase text-[#f0fff8] sm:text-5xl" style={displayCondensed}>
              Two projects where the real work was making the interface survive states, handoff, and real student pressure.
            </h2>
          </div>

          <div className="space-y-8">
            {portfolio.projects.map((project, index) => (
              <article
                key={project.title}
                className="rounded-4xl border border-[#173945] bg-[rgba(7,19,25,0.94)] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.3)] sm:p-7"
              >
                <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <Image
                      src={withBasePath(project.imagePath)}
                      alt={project.imageAlt}
                      width={1200}
                      height={900}
                      className="w-full rounded-[1.4rem] border border-[#163844] object-cover"
                    />
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <p className="text-[0.76rem] uppercase tracking-[0.22em] text-[#71e6ff]" style={monoUi}>
                      {project.label}
                    </p>
                    <h3 className="mt-3 text-3xl uppercase text-[#f1fff8] sm:text-4xl" style={displayCondensed}>
                      {project.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-[#b1d5ce]" style={monoUi}>
                      {project.summary}
                    </p>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div className="rounded-[1.3rem] border border-[#1e4752] bg-[rgba(10,24,31,0.92)] p-5">
                        <p className="text-[0.74rem] uppercase tracking-[0.22em] text-[#d9ff74]" style={monoUi}>
                          Outcome
                        </p>
                        <p className="mt-3 text-sm leading-6 text-[#c4e5df]" style={monoUi}>
                          {project.outcome}
                        </p>
                      </div>
                      <div className="rounded-[1.3rem] border border-[#1b4250] bg-[rgba(10,24,31,0.92)] p-5">
                        <p className="text-[0.74rem] uppercase tracking-[0.22em] text-[#71e6ff]" style={monoUi}>
                          Proof system
                        </p>
                        <p className="mt-3 text-sm leading-6 text-[#c4e5df]" style={monoUi}>
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

        <section className="mt-16 rounded-4xl border border-[#285160] bg-[linear-gradient(135deg,rgba(9,28,35,0.96),rgba(7,17,22,1))] px-6 py-8 sm:px-8">
          <p className="text-[0.76rem] uppercase tracking-[0.22em] text-[#71e6ff]" style={monoUi}>
            Looking for
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.7fr_0.3fr] lg:items-end">
            <div>
              <h2 className="text-4xl uppercase text-[#effff8] sm:text-5xl" style={displayCondensed}>
                Product teams that need someone who can move from rough prototype to shippable component logic without losing clarity.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#b1d5ce]" style={monoUi}>
                I am especially interested in campus tools, healthcare-adjacent systems, and student-facing products where clarity is not a polish pass. It is the product.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end" style={monoUi}>
              <a
                href={portfolio.email}
                className="inline-flex rounded-full bg-[#d9ff74] px-5 py-3 text-sm font-semibold text-[#071116] transition hover:bg-[#c6ee5b]"
              >
                Email Jules
              </a>
              <Link
                href="/examples/student-exemplars"
                className="inline-flex rounded-full border border-[#325a65] px-5 py-3 text-sm font-semibold text-[#d7fffb] transition hover:border-[#71e6ff]"
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