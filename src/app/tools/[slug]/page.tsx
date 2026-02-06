import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Star, Eye, Heart, Globe, ChevronRight } from "lucide-react";
import { getToolsData } from "@/lib/tools-data";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/scroll-reveal";
import ToolCard from "@/components/tool-card";
import {
  BreadcrumbJsonLd,
  SoftwareAppJsonLd,
  FAQJsonLd,
} from "@/components/json-ld";

/* ---------- Static generation ---------- */

export const dynamicParams = false;

export async function generateStaticParams() {
  const { tools } = await getToolsData();
  return tools.map((tool) => ({ slug: tool.slug }));
}

/* ---------- SEO metadata ---------- */

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { tools } = await getToolsData();
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return { title: "Tool not found" };

  return {
    title: `${tool.name} — AI Tool Review & Details`,
    description: `${tool.description} — Explore ${tool.name} pricing, features, rating, and alternatives in the ${tool.category} category.`,
    keywords: [tool.name, tool.category, "AI tool", `${tool.category} AI`],
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: `${tool.name} — Tooliq`,
      description: tool.description,
      url: `/tools/${tool.slug}`,
      type: "article",
    },
  };
}

/* ---------- Helpers ---------- */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const pricingColor: Record<string, string> = {
  Free: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Freemium: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Paid: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Enterprise: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  if (num > 0) return num.toLocaleString();
  return "\u2014";
}

/* ---------- Page ---------- */

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const { tools } = await getToolsData();
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) notFound();

  const related = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  const websiteHost = (() => {
    try {
      return new URL(tool.website).hostname.replace("www.", "");
    } catch {
      return "\u2014";
    }
  })();

  const toolFaq = [
    {
      question: `What is ${tool.name}?`,
      answer: `${tool.name} is an AI-powered tool in the ${tool.category} category. ${tool.description}`,
    },
    {
      question: `Is ${tool.name} free to use?`,
      answer:
        tool.pricing === "Free"
          ? `Yes, ${tool.name} is completely free to use with no hidden costs.`
          : tool.pricing === "Freemium"
          ? `${tool.name} offers a free tier with optional paid upgrades for advanced features.`
          : `${tool.name} is a paid tool. ${tool.pricingLabel && tool.pricingLabel !== "Free" ? `Pricing: ${tool.pricingLabel}.` : "Visit their website for current pricing."}`,
    },
    {
      question: `What category does ${tool.name} belong to?`,
      answer: `${tool.name} is categorized under ${tool.category}. You can explore more ${tool.category} tools on Tooliq.`,
    },
  ];

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl">
        {/* JSON-LD Structured Data */}
        <BreadcrumbJsonLd
          items={[
            { name: "Home", href: "/" },
            { name: "Tools", href: "/tools" },
            { name: tool.name, href: `/tools/${tool.slug}` },
          ]}
        />
        <SoftwareAppJsonLd
          name={tool.name}
          description={tool.description}
          url={tool.website !== "#" ? tool.website : `https://tooliq.dev/tools/${tool.slug}`}
          category={tool.category}
          rating={tool.rating}
          pricing={tool.pricing}
        />
        <FAQJsonLd questions={toolFaq} />

        {/* Breadcrumb nav */}
        <FadeUp>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/40">
              <li>
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
              </li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li>
                <Link href="/tools" className="transition-colors hover:text-white">Tools</Link>
              </li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li>
                <Link href={`/category/${slugify(tool.category)}`} className="transition-colors hover:text-white">{tool.category}</Link>
              </li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li className="text-white/70">{tool.name}</li>
            </ol>
          </nav>
        </FadeUp>

        {/* Hero Card */}
        <FadeUp delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02]">
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-cyan-500/10 blur-[80px]" />

            <div className="relative flex flex-col gap-5 p-5 sm:gap-6 sm:p-8 md:flex-row md:items-start md:justify-between md:p-10">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/[0.05] ring-1 ring-white/[0.1]">
                  {tool.logo?.startsWith("http") ? (
                    <Image
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-xl object-contain"
                      sizes="56px"
                      unoptimized
                    />
                  ) : (
                    <span className="text-4xl">🤖</span>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                    {tool.name}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span className="text-sm text-white/40">
                      {tool.category}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-0.5 text-xs font-medium ${
                        pricingColor[tool.pricing] ?? ""
                      }`}
                    >
                      {tool.pricing}
                    </span>
                    {tool.version && (
                      <span className="text-xs text-white/25">
                        v{tool.version}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {tool.website !== "#" && (
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-white/90 hover:gap-3 hover:shadow-[0_0_40px_8px_rgba(56,189,248,0.12)]"
                >
                  Visit Website
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </div>

            <div className="border-t border-white/[0.04] px-5 py-5 sm:px-8 sm:py-6 md:px-10">
              <p className="max-w-3xl text-base leading-relaxed text-white/50">
                {tool.description}
              </p>
            </div>

            {tool.pricingLabel &&
              tool.pricingLabel !== "Free" &&
              !tool.pricingLabel.includes("Trending") && (
                <div className="border-t border-white/[0.04] px-5 py-4 sm:px-8 md:px-10">
                  <p className="text-sm text-white/30">
                    <span className="text-white/50">Pricing:</span>{" "}
                    {tool.pricingLabel}
                  </p>
                </div>
              )}
          </div>
        </FadeUp>

        {/* Stats Grid */}
        <FadeUp delay={0.2}>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Eye, label: "Views", value: formatNumber(tool.views), color: "text-blue-400" },
              { icon: Heart, label: "Saves", value: formatNumber(tool.saves), color: "text-rose-400" },
              { icon: Star, label: "Rating", value: tool.rating > 0 ? `${tool.rating.toFixed(1)} / 5` : "\u2014", color: "text-amber-400" },
              { icon: Globe, label: "Website", value: websiteHost, color: "text-emerald-400" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                    <span className="text-xs font-medium uppercase tracking-wider text-white/30">
                      {stat.label}
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeUp>

        {/* Related Tools */}
        {related.length > 0 && (
          <div className="mt-16">
            <FadeUp>
              <h2 className="text-xl font-bold text-white">
                More in{" "}
                <span className="text-cyan-400">{tool.category}</span>
              </h2>
            </FadeUp>

            <StaggerContainer
              className="mt-6 grid gap-4 sm:grid-cols-3"
              stagger={0.08}
            >
              {related.map((t) => (
                <StaggerItem key={t.slug}>
                  <ToolCard tool={t} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-16 border-t border-white/[0.06] pt-12">
          <FadeUp>
            <h2 className="text-xl font-bold text-white">
              Frequently Asked Questions about{" "}
              <span className="text-cyan-400">{tool.name}</span>
            </h2>
          </FadeUp>
          <div className="mt-6 space-y-3">
            {toolFaq.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <details className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-white/[0.1] open:border-cyan-500/20 open:bg-cyan-500/[0.02]">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-sm font-medium text-white/80 transition-colors group-open:text-white [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronRight className="h-4 w-4 shrink-0 text-white/30 transition-transform group-open:rotate-90 group-open:text-cyan-400" />
                  </summary>
                  <div className="px-6 pb-5 text-sm leading-relaxed text-white/40">
                    {faq.answer}
                  </div>
                </details>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
