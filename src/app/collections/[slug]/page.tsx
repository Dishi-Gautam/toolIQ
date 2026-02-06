import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import {
  getToolsData,
  getCollections,
  getCollectionBySlug,
} from "@/lib/tools-data";
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

/* ---------- Static generation ---------- */

export const dynamicParams = false;

export async function generateStaticParams() {
  return getCollections().map((c) => ({ slug: c.slug }));
}

/* ---------- SEO metadata ---------- */

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Collection not found" };

  return {
    title: collection.seoTitle,
    description: collection.seoDescription,
    alternates: { canonical: `/collections/${slug}` },
    openGraph: {
      title: collection.seoTitle,
      description: collection.seoDescription,
      url: `/collections/${slug}`,
    },
  };
}

/* ---------- Page ---------- */

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const { tools } = await getToolsData();
  const collectionTools = collection.getTools(tools);
  const otherCollections = getCollections()
    .filter((c) => c.slug !== slug)
    .slice(0, 4);

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* JSON-LD */}
        <BreadcrumbJsonLd
          items={[
            { name: "Home", href: "/" },
            { name: "Collections", href: "/collections" },
            { name: collection.title, href: `/collections/${slug}` },
          ]}
        />
        <CollectionPageJsonLd
          name={collection.title}
          description={collection.description}
          url={`/collections/${slug}`}
          items={collectionTools.map((t) => ({ name: t.name, url: `/tools/${t.slug}` }))}
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
                <Link href="/collections" className="transition-colors hover:text-white">Collections</Link>
              </li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li className="text-white/70">{collection.title}</li>
            </ol>
          </nav>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mb-10">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-400">
              Collection
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {collection.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/40">
              {collection.description}
            </p>
            <p className="mt-2 text-sm text-white/25">
              {collectionTools.length}{" "}
              {collectionTools.length === 1 ? "tool" : "tools"} in this
              collection
            </p>
          </div>
        </FadeUp>

        {collectionTools.length > 0 ? (
          <StaggerContainer
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
          >
            {collectionTools.map((tool) => (
              <StaggerItem key={tool.slug}>
                <ToolCard tool={tool} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] px-6 py-20 text-center">
            <p className="text-lg font-semibold text-white">
              No tools in this collection yet
            </p>
          </div>
        )}

        {/* Other collections */}
        <div className="mt-20 border-t border-white/[0.06] pt-12">
          <FadeUp>
            <h2 className="text-xl font-bold text-white">More Collections</h2>
          </FadeUp>

          <StaggerContainer
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.06}
          >
            {otherCollections.map((c) => (
              <StaggerItem key={c.slug}>
                <Link
                  href={`/collections/${c.slug}`}
                  className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all hover:border-cyan-500/20 hover:bg-cyan-500/[0.03]"
                >
                  <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-cyan-300">
                    {c.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-cyan-400">
                    Explore
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
}
