import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getToolsData } from "@/lib/tools-data";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/scroll-reveal";
import ToolCard from "@/components/tool-card";
import {
  BreadcrumbJsonLd,
  CollectionPageJsonLd,
} from "@/components/json-ld";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ---------- Static generation ---------- */

export const dynamicParams = false;

export async function generateStaticParams() {
  const { categories } = await getToolsData();
  return categories.map((cat) => ({ category: slugify(cat) }));
}

/* ---------- SEO metadata ---------- */

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const { tools, categories } = await getToolsData();
  const catMap = new Map(categories.map((c) => [slugify(c), c]));
  const name = catMap.get(slug);
  if (!name) return { title: "Category not found" };

  const count = tools.filter((t) => t.category === name).length;

  return {
    title: `Best ${name} AI Tools \u2014 ${count} Tools Compared`,
    description: `Browse ${count} AI tools for ${name}. Compare features, pricing, ratings, and find the perfect ${name.toLowerCase()} tool for your workflow.`,
    alternates: { canonical: `/category/${slug}` },
    openGraph: {
      title: `${name} AI Tools \u2014 Tooliq`,
      description: `${count} curated AI tools for ${name.toLowerCase()}.`,
    },
  };
}

/* ---------- Page ---------- */

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const { tools, categories } = await getToolsData();
  const catMap = new Map(categories.map((c) => [slugify(c), c]));
  const name = catMap.get(slug);
  if (!name) notFound();

  const categoryTools = tools
    .filter((t) => t.category === name)
    .sort((a, b) => b.views - a.views);

  const otherCategories = categories.filter((c) => c !== name).slice(0, 12);

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* JSON-LD */}
        <BreadcrumbJsonLd
          items={[
            { name: "Home", href: "/" },
            { name: "Tools", href: "/tools" },
            { name: name, href: `/category/${slug}` },
          ]}
        />
        <CollectionPageJsonLd
          name={`${name} AI Tools`}
          description={`Browse ${categoryTools.length} AI tools for ${name}. Compare features, pricing, ratings, and find the perfect ${name.toLowerCase()} tool.`}
          url={`/category/${slug}`}
          items={categoryTools.map((t) => ({ name: t.name, url: `/tools/${t.slug}` }))}
        />

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
              <li className="text-white/70">{name}</li>
            </ol>
          </nav>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mb-10">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-400">
              Category
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {name}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/40">
              Explore {categoryTools.length} curated {name.toLowerCase()} AI{" "}
              {categoryTools.length === 1 ? "tool" : "tools"}, sorted by
              popularity. Compare features, pricing, and community ratings to
              find the right fit for your workflow.
            </p>
          </div>
        </FadeUp>

        {categoryTools.length > 0 ? (
          <StaggerContainer
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
          >
            {categoryTools.map((tool) => (
              <StaggerItem key={tool.slug}>
                <ToolCard tool={tool} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] px-6 py-20 text-center">
            <p className="text-lg font-semibold text-white">
              No tools in this category yet
            </p>
          </div>
        )}

        {/* Other categories */}
        <div className="mt-20 border-t border-white/[0.06] pt-12">
          <FadeUp>
            <h2 className="text-xl font-bold text-white">Other Categories</h2>
          </FadeUp>

          <StaggerContainer
            className="mt-6 flex flex-wrap gap-2"
            stagger={0.03}
          >
            {otherCategories.map((cat) => (
              <StaggerItem key={cat}>
                <Link
                  href={`/category/${slugify(cat)}`}
                  className="rounded-full border border-white/[0.08] px-4 py-2 text-sm text-white/40 transition-all hover:border-cyan-500/20 hover:bg-cyan-500/[0.04] hover:text-white"
                >
                  {cat}
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
}
