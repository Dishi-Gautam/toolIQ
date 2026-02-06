import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  Zap,
  Eye,
  Layers,
  ChevronRight,
} from "lucide-react";
import { getToolsData, getCollections } from "@/lib/tools-data";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/scroll-reveal";
import ToolCard from "@/components/tool-card";
import HeroBeam from "@/components/hero-beam";
import CategoryShowcase from "@/components/category-showcase";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/json-ld";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const metadata: Metadata = {
  title: "Tooliq — Discover the Best AI Tools in 2026",
  description:
    "Explore a curated catalog of 80+ AI tools across 50+ categories. Search, filter, compare, and find the perfect AI tool for your workflow.",
  alternates: { canonical: "/" },
};

const HOME_FAQ = [
  {
    question: "What is Tooliq?",
    answer:
      "Tooliq is a curated directory of AI tools spanning 50+ categories. We aggregate data from trusted sources, including community ratings, pricing, and usage stats, to help you discover the perfect AI tool for any workflow.",
  },
  {
    question: "How are AI tools listed and ranked on Tooliq?",
    answer:
      "Tools are ranked using a combination of community ratings, total views, saves, and editorial curation. We source data from leading AI aggregators and verify every listing for accuracy.",
  },
  {
    question: "Is Tooliq free to use?",
    answer:
      "Yes, Tooliq is completely free to browse. You can search, filter, compare, and explore every tool listing at no cost.",
  },
  {
    question: "How often is the tool directory updated?",
    answer:
      "Our database is regularly updated with new tools, pricing changes, and rating adjustments to ensure you always see the latest information.",
  },
  {
    question: "Can I submit my AI tool to Tooliq?",
    answer:
      "We are building a submission portal. In the meantime, tools are sourced from community-driven aggregators and curated manually by our team.",
  },
];

export default async function Home() {
  const { tools, categories } = await getToolsData();
  const collections = getCollections();

  const featured = [...tools].sort((a, b) => b.views - a.views).slice(0, 6);

  const topRated = tools
    .filter((t) => t.rating >= 4.0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <>
      {/* Structured data */}
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }]} />
      <FAQJsonLd
        questions={HOME_FAQ}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:min-h-[85vh] lg:pb-20 lg:pt-16">
        {/* Dot grid background */}
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-60" />
        {/* Matrix grid overlay */}
        <div className="matrix-overlay" />

        {/* Purple / cyan ambient glow (bottom-left, like Marketeam) */}
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,rgba(56,189,248,0.06)_40%,transparent_70%)] blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-1/4 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.06)_0%,transparent_60%)] blur-3xl" />

        {/* Light beam + orbiting tool icons */}
        <HeroBeam
          toolCount={tools.length}
          categoryCount={categories.length}
          collectionCount={collections.length}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex min-h-[60vh] items-center lg:min-h-[70vh]">
            <div className="relative z-10 max-w-2xl">
              {/* Monospace badge */}
              <FadeUp>
                <div className="mb-6 inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 animate-float-slow">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                    Curated AI Tools Platform
                  </span>
                </div>
              </FadeUp>

              {/* Clean headline matching reference */}
              <FadeUp delay={0.1}>
                <h1 className="text-balance text-[2.5rem] font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
                  <span className="text-white">
                    Discover AI tools
                    <br />
                    with{" "}
                  </span>
                  <span className="gradient-text animate-pulse-glow">
                    Intelligence
                  </span>
                </h1>
              </FadeUp>

              {/* Subtitle */}
              <FadeUp delay={0.2}>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/35 sm:text-base md:text-[17px]">
                  Our curated directory empowers developers to easily discover,
                  compare, and choose AI tools — ensuring the perfect fit for every workflow.
                </p>
              </FadeUp>

              {/* CTA buttons */}
              <FadeUp delay={0.3}>
                <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-6">
                  <Link
                    href="/tools"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-white/[0.12] bg-white/[0.04] px-6 py-3 text-[15px] font-medium text-white/90 transition-all duration-500 hover:border-cyan-400/25 hover:bg-white/[0.06] hover:text-white hover:shadow-[0_0_25px_-5px_rgba(56,189,248,0.2)] hover:scale-[1.02]"
                  >
                    {/* Shimmer effect on hover */}
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    <span className="relative">Explore Tools</span>
                    <span className="relative flex items-center text-cyan-400">
                      <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                  <Link
                    href="/collections"
                    className="group relative text-[15px] text-white/35 transition-all duration-300 hover:text-white/70"
                  >
                    <span className="relative">Browse collections</span>
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-cyan-400/60 to-transparent transition-all duration-300 group-hover:w-full" />
                  </Link>
                </div>
              </FadeUp>

              {/* Mobile stats — visible below lg */}
              <FadeUp delay={0.5}>
                <div className="mt-8 grid grid-cols-3 gap-3 lg:hidden">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-3 text-center">
                    <p className="text-lg font-bold text-white sm:text-xl">{tools.length}+</p>
                    <p className="mt-0.5 text-[10px] text-white/40 sm:text-xs">AI Tools</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-3 text-center">
                    <p className="text-lg font-bold text-white sm:text-xl">{categories.length}+</p>
                    <p className="mt-0.5 text-[10px] text-white/40 sm:text-xs">Categories</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-3 text-center">
                    <p className="text-lg font-bold text-white sm:text-xl">{collections.length}</p>
                    <p className="mt-0.5 text-[10px] text-white/40 sm:text-xs">Collections</p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trusted By / AI Brands strip — infinite carousel ── */}
      <section className="border-t border-white/[0.06] py-5 sm:py-8 overflow-hidden">
        <div className="relative">
          {/* Left fade mask */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#060b14] to-transparent" />
          {/* Right fade mask */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#060b14] to-transparent" />

          <div className="flex animate-marquee">
            {/* Two copies for seamless infinite scroll */}
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-12 sm:gap-16 md:gap-20 px-6">
                {[
                  { name: "ChatGPT", domain: "openai.com" },
                  { name: "Claude", domain: "claude.ai" },
                  { name: "Gemini", domain: "gemini.google.com" },
                  { name: "Midjourney", domain: "midjourney.com" },
                  { name: "Copilot", domain: "github.com" },
                  { name: "Perplexity", domain: "perplexity.ai" },
                  { name: "Cursor", domain: "cursor.sh" },
                  { name: "DALL·E", domain: "openai.com" },
                  { name: "Runway", domain: "runwayml.com" },
                  { name: "Notion AI", domain: "notion.so" },
                ].map((brand) => (
                  <div
                    key={brand.name}
                    className="group flex shrink-0 items-center gap-2.5 text-white/30 transition-all duration-500 hover:text-white/80"
                  >
                    <img
                      src={`https://img.logo.dev/${brand.domain}?token=pk_Q2U60apXTeeFjOBPbbJUCw`}
                      alt={brand.name}
                      className="h-5 w-5 rounded opacity-50 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.3)] sm:h-6 sm:w-6"
                    />
                    <span className="whitespace-nowrap text-xs font-semibold tracking-wider sm:text-sm">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Tools ── */}
      <section className="border-t border-white/[0.06] px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-400">
                  Featured
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                  Most Popular Tools
                </h2>
              </div>
              <Link
                href="/collections/most-popular-ai-tools"
                className="hidden items-center gap-1 text-sm text-white/40 transition-colors hover:text-white sm:inline-flex"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeUp>

          <StaggerContainer
            className="mt-5 grid gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
          >
            {featured.map((tool) => (
              <StaggerItem key={tool.slug}>
                <ToolCard tool={tool} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="border-t border-white/[0.06] px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-400">
                Categories
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                Browse by Category
              </h2>
              <p className="mt-3 text-base text-white/40">
                Dive into the workflow that matters most to you.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer
            className="mt-6 grid gap-2 grid-cols-2 sm:mt-8 sm:gap-3 md:grid-cols-3 xl:grid-cols-4"
            stagger={0.04}
          >
            {categories.slice(0, 16).map((cat) => {
              const count = tools.filter((t) => t.category === cat).length;
              return (
                <StaggerItem key={cat}>
                  <Link
                    href={`/category/${slugify(cat)}`}
                    className="group flex items-center justify-between rounded-xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-white/[0.01] px-5 py-4 transition-all duration-300 hover:border-cyan-500/20 hover:bg-cyan-500/[0.05] hover:shadow-[0_0_20px_-6px_rgba(56,189,248,0.1)]"
                  >
                    <span className="text-sm font-medium text-white/70 transition-colors group-hover:text-white">
                      {cat}
                    </span>
                    <span className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-xs text-white/30 transition-colors group-hover:bg-cyan-500/10 group-hover:text-cyan-300">
                      {count}
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {categories.length > 16 && (
            <FadeUp>
              <div className="mt-8 text-center">
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white"
                >
                  View all {categories.length} categories
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-t border-white/[0.06] px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-400">
                How It Works
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                Find Your Perfect AI Tool
              </h2>
            </div>
          </FadeUp>

          <StaggerContainer
            className="mt-6 grid gap-3 grid-cols-1 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.1}
          >
            {[
              {
                icon: Search,
                title: "Discover",
                desc: "Search across every tool by name, category, or description — instantly.",
              },
              {
                icon: Layers,
                title: "Filter",
                desc: "Narrow by category, pricing, and rating to find exactly what fits.",
              },
              {
                icon: Eye,
                title: "Explore",
                desc: "Dive into detailed profiles with stats, ratings, and direct links.",
              },
              {
                icon: Zap,
                title: "Launch",
                desc: "Visit the tool's website and start building with AI today.",
              },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.title}>
                  <div className="group/card relative rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 transition-all duration-300 hover:border-cyan-500/15 hover:shadow-[0_4px_24px_-6px_rgba(56,189,248,0.08)]">
                    {/* Top accent line */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 transition-opacity group-hover/card:opacity-100" />
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/10 bg-cyan-500/[0.08]">
                      <Icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/40">
                      {step.desc}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Top Rated ── */}
      {topRated.length > 0 && (
        <section className="border-t border-white/[0.06] px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <FadeUp>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-amber-400">
                    Community Favorites
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                    Top Rated Tools
                  </h2>
                </div>
                <Link
                  href="/collections/top-rated-ai-tools"
                  className="hidden items-center gap-1 text-sm text-white/40 transition-colors hover:text-white sm:inline-flex"
                >
                  View all
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </FadeUp>

            <StaggerContainer
              className="mt-5 grid gap-3 grid-cols-1 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4"
              stagger={0.08}
            >
              {topRated.map((tool) => (
                <StaggerItem key={tool.slug}>
                  <ToolCard tool={tool} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ── Collections Preview ── */}
      <section className="border-t border-white/[0.06] px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-400">
                Curated For You
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                Collections
              </h2>
              <p className="mt-3 text-base text-white/40">
                Hand-picked tool lists for every use case.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer
            className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
          >
            {collections.slice(0, 6).map((collection) => (
              <StaggerItem key={collection.slug}>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 transition-all duration-300 hover:border-cyan-500/20 hover:bg-cyan-500/[0.04] hover:shadow-[0_4px_24px_-6px_rgba(56,189,248,0.08)]"
                >
                  <h3 className="text-base font-semibold text-white transition-colors group-hover:text-cyan-300">
                    {collection.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/40">
                    {collection.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-cyan-400 transition-all group-hover:gap-2">
                    View collection
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Category Showcase (DataBahn-style tabs) ── */}
      <section className="border-t border-white/[0.06] px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-400">
                Use Case
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                AI Tools by Use Case
              </h2>
              <p className="mt-3 text-base text-white/40">
                Explore curated tool stacks for the workflows that matter most.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <CategoryShowcase />
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative border-t border-white/[0.06] px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <div className="matrix-overlay" />
        <div className="relative mx-auto max-w-3xl">
          <FadeUp>
            <div className="mb-8 text-center">
              <span className="inline-block rounded-full border border-cyan-500/20 bg-cyan-500/[0.08] px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                FAQs
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                <span className="gradient-text">Have Questions?</span>
                <br />
                <span className="text-white">Here&apos;s what we hear often</span>
              </h2>
            </div>
          </FadeUp>

          <div className="space-y-3">
            {HOME_FAQ.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <details className="group rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] transition-all hover:border-white/[0.12] open:border-cyan-500/20 open:bg-cyan-500/[0.03]">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-sm font-medium text-white/80 transition-colors group-open:text-white [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white/40 transition-all group-open:border-cyan-500/30 group-open:bg-cyan-500/10 group-open:text-cyan-400">
                      <svg className="h-3.5 w-3.5 transition-transform group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-sm leading-relaxed text-white/40">
                    {faq.answer}
                  </div>
                </details>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-white/[0.06] px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.06] blur-[100px]" />
          <FadeUp>
            <h2 className="relative text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Ready to find your
              <br />
              <span className="gradient-text">perfect AI tool?</span>
            </h2>
            <p className="relative mt-4 text-base text-white/40 sm:text-lg">
              Stop searching. Start building.
            </p>
            <div className="relative mt-8">
              <Link
                href="/tools"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/[0.15] px-8 py-3.5 text-sm font-medium text-white/80 transition-all hover:border-cyan-400/30 hover:bg-cyan-400/[0.04] hover:text-white"
              >
                Browse All Tools
                <span className="flex items-center text-cyan-400">
                  <ChevronRight className="-mr-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
