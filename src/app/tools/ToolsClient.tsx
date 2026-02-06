"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  X,
  Star,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Bot,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Tool } from "@/lib/tools-data";

const LOGO_API_TOKEN = "pk_Q2U60apXTeeFjOBPbbJUCw";

// Helper to get logo from logo.dev API
function getToolLogo(tool: Tool): string | null {
  // Try website domain for logo.dev
  if (tool.website && tool.website !== "#") {
    try {
      const url = new URL(tool.website);
      const domain = url.hostname;
      return `https://img.logo.dev/${domain}?token=${LOGO_API_TOKEN}`;
    } catch {
      // invalid url
    }
  }

  // Fallback to existing logo field
  if (tool.logo && tool.logo.startsWith("http")) return tool.logo;

  return null;
}


const ALL = "All" as const;
const TOOLS_PER_PAGE = 12;

type SortKey = "name" | "rating" | "views" | "saves";
type PricingFilter = typeof ALL | "Free" | "Freemium" | "Paid";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "views", label: "Most Viewed" },
  { key: "rating", label: "Top Rated" },
  { key: "saves", label: "Most Saved" },
  { key: "name", label: "A–Z" },
];

function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
  if (views > 0) return views.toLocaleString();
  return "";
}

const pricingColors: Record<string, string> = {
  Free: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Freemium: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Paid: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Enterprise: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

function sortTools(list: Tool[], key: SortKey): Tool[] {
  return [...list].sort((a, b) => {
    switch (key) {
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return b.rating - a.rating || b.views - a.views;
      case "views":
        return b.views - a.views;
      case "saves":
        return b.saves - a.saves || b.views - a.views;
      default:
        return 0;
    }
  });
}

/** Generate a compact set of page numbers with ellipses */
function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) pages.push("…");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}

type Props = {
  tools: Tool[];
  categories: string[];
};

export default function ToolsClient({ tools, categories }: Props) {
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [activePricing, setActivePricing] = useState<PricingFilter>(ALL);
  const [sortKey, setSortKey] = useState<SortKey>("views");
  const [showCategories, setShowCategories] = useState(false);
  const [page, setPage] = useState(1);

  /* sync ?category from URL on mount */
  useEffect(() => {
    const param = searchParams.get("category");
    if (param && categories.includes(param)) {
      setActiveCategory(param);
      setShowCategories(true);
    }
  }, [searchParams, categories]);

  /* filtered + sorted full list */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = tools.filter((tool) => {
      if (activeCategory !== ALL && tool.category !== activeCategory)
        return false;
      if (activePricing !== ALL && tool.pricing !== activePricing) return false;
      if (!q) return true;
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q)
      );
    });
    return sortTools(filtered, sortKey);
  }, [query, activeCategory, activePricing, sortKey, tools]);

  /* pagination math */
  const totalPages = Math.max(1, Math.ceil(results.length / TOOLS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginatedTools = results.slice(
    (safePage - 1) * TOOLS_PER_PAGE,
    safePage * TOOLS_PER_PAGE
  );

  /* reset to page 1 whenever filters change */
  useEffect(() => {
    setPage(1);
  }, [query, activeCategory, activePricing, sortKey]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goToPage = useCallback(
    (p: number) => {
      setPage(p);
      scrollToTop();
    },
    [scrollToTop]
  );

  const hasFilters =
    query !== "" || activeCategory !== ALL || activePricing !== ALL;

  function resetFilters() {
    setQuery("");
    setActiveCategory(ALL);
    setActivePricing(ALL);
    setPage(1);
  }

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-400">
            Explore
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            AI Tools
          </h1>
          <p className="mt-3 text-base text-white/40 sm:text-lg">
            {tools.length} tools across {categories.length} categories. Search,
            filter, and find the right one.
          </p>
        </div>

        {/* ── Search bar ── */}
        <div className="relative mb-6">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools by name, description, or category…"
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-3.5 pl-11 pr-10 text-sm text-white placeholder:text-white/25 transition-all focus:border-cyan-500/40 focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-white/30 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* ── Filter bar ── */}
        <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Sort pills */}
          <div className="flex items-center gap-0.5 overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.02] p-1 scrollbar-none">
            {sortOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSortKey(opt.key)}
                className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition-all ${sortKey === opt.key
                  ? "bg-white text-black shadow-sm"
                  : "text-white/40 hover:text-white/70"
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Pricing pills */}
          <div className="flex items-center gap-0.5 overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.02] p-1 scrollbar-none">
            {([ALL, "Free", "Freemium", "Paid"] as PricingFilter[]).map(
              (p) => (
                <button
                  key={p}
                  onClick={() => setActivePricing(p)}
                  className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition-all ${activePricing === p
                    ? "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/30"
                    : "text-white/40 hover:text-white/70"
                    }`}
                >
                  {p}
                </button>
              )
            )}
          </div>

          {/* Category toggle */}
          <button
            onClick={() => setShowCategories(!showCategories)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-medium transition-all ${showCategories || activeCategory !== ALL
              ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
              : "border-white/[0.08] bg-white/[0.02] text-white/40 hover:text-white/70"
              }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Categories
            {activeCategory !== ALL && (
              <span className="ml-0.5 rounded-full bg-cyan-500/20 px-1.5 text-[10px]">
                1
              </span>
            )}
          </button>

          {hasFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-white/30 transition-colors hover:text-white"
            >
              Clear all
            </button>
          )}
        </div>

        {/* ── Category pills ── */}
        <AnimatePresence>
          {showCategories && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mb-6 overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-4">
                <button
                  onClick={() => setActiveCategory(ALL)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${activeCategory === ALL
                    ? "border border-white bg-white/[0.08] text-white"
                    : "border border-white/[0.08] text-white/35 hover:border-white/20 hover:text-white/60"
                    }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${activeCategory === cat
                      ? "border border-cyan-400/40 bg-cyan-500/10 text-cyan-300"
                      : "border border-white/[0.08] text-white/35 hover:border-white/20 hover:text-white/60"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Results count ── */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-white/30">
            Showing{" "}
            <span className="font-semibold text-white/60">
              {results.length}
            </span>{" "}
            {results.length === 1 ? "tool" : "tools"}
            {totalPages > 1 && (
              <span className="text-white/20">
                {" "}
                · Page {safePage} of {totalPages}
              </span>
            )}
          </p>
        </div>

        {/* ── Tool Grid ── */}
        {paginatedTools.length > 0 ? (
          <motion.div
            key={safePage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {paginatedTools.map((tool, i) => (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(i * 0.04, 0.4),
                }}
              >
                <Link href={`/tools/${tool.slug}`} className="group block">
                  <div className="glow-card h-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 sm:rounded-2xl sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-white/[0.08] overflow-hidden">
                          {(() => {
                            const logoSrc = getToolLogo(tool);
                            return logoSrc ? (
                              <img
                                src={logoSrc}
                                alt={tool.name}
                                className="h-7 w-7 rounded-lg object-contain"
                                loading="lazy"
                              />
                            ) : (
                              <Bot className="h-5 w-5 text-cyan-400/70" />
                            );
                          })()}
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-white transition-colors group-hover:text-cyan-300">
                            {tool.name}
                          </h3>
                          <p className="text-xs text-white/30">
                            {tool.category}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${pricingColors[tool.pricing] ??
                          "bg-white/5 text-white/50 border-white/10"
                          }`}
                      >
                        {tool.pricing}
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/40">
                      {tool.description}
                    </p>

                    <div className="mt-4 flex items-center gap-3 text-xs text-white/20">
                      {tool.rating > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-white/40">
                            {tool.rating.toFixed(1)}
                          </span>
                        </span>
                      )}
                      {tool.views > 0 && (
                        <span>{formatViews(tool.views)} views</span>
                      )}
                      {tool.saves > 0 && <span>♡ {tool.saves}</span>}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] px-6 py-20 text-center">
            <p className="text-lg font-semibold text-white">No tools found</p>
            <p className="mt-2 text-sm text-white/40">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 rounded-full border border-white/[0.12] px-6 py-2 text-sm text-white/60 transition-all hover:bg-white/[0.04] hover:text-white"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-10 flex items-center justify-center gap-1.5"
          >
            {/* Prev */}
            <button
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage <= 1}
              aria-label="Previous page"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/40 transition-all hover:border-white/[0.15] hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Page numbers */}
            {getPageNumbers(safePage, totalPages).map((p, idx) =>
              p === "…" ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="flex h-10 w-6 items-center justify-center text-xs text-white/20"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  aria-current={p === safePage ? "page" : undefined}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium transition-all ${p === safePage
                    ? "border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_12px_-3px_rgba(56,189,248,0.2)]"
                    : "border border-white/[0.08] bg-white/[0.02] text-white/40 hover:border-white/[0.15] hover:text-white"
                    }`}
                >
                  {p}
                </button>
              )
            )}

            {/* Next */}
            <button
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage >= totalPages}
              aria-label="Next page"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/40 transition-all hover:border-white/[0.15] hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
