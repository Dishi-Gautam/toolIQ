import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getCollections, getToolsData } from "@/lib/tools-data";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/scroll-reveal";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Tool Collections — Curated Lists for Every Use Case",
  description:
    "Browse curated collections of AI tools. Best free tools, top rated, coding, video, marketing, and more — hand-picked and ranked.",
  alternates: { canonical: "/collections" },
};

export default async function CollectionsPage() {
  const collections = getCollections();
  const { tools } = await getToolsData();

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <BreadcrumbJsonLd
          items={[
            { name: "Home", href: "/" },
            { name: "Collections", href: "/collections" },
          ]}
        />

        {/* Breadcrumb nav */}
        <FadeUp>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/40">
              <li>
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
              </li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li className="text-white/70">Collections</li>
            </ol>
          </nav>
        </FadeUp>

        <FadeUp>
          <div className="mb-12">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-400">
              Curated Lists
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Collections
            </h1>
            <p className="mt-3 max-w-2xl text-base text-white/40 sm:text-lg">
              Hand-picked tool lists for every use case. Like &ldquo;Best Crime
              Movies&rdquo; but for AI tools.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
        >
          {collections.map((collection) => {
            const count = collection.getTools(tools).length;
            return (
              <StaggerItem key={collection.slug}>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-cyan-500/20 hover:bg-cyan-500/[0.03]"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-white transition-colors group-hover:text-cyan-300">
                      {collection.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/40">
                      {collection.description}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-white/30">
                      {count} {count === 1 ? "tool" : "tools"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 transition-all group-hover:gap-2">
                      Explore
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  );
}
