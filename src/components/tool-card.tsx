import Link from "next/link";
import { Star } from "lucide-react";
import type { Tool } from "@/lib/tools-data";

const pricingColors: Record<string, string> = {
  Free: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Freemium: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Paid: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Enterprise: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
  if (views > 0) return views.toLocaleString();
  return "";
}

export default function ToolCard({ tool }: { tool: Tool }) {
  const viewsLabel = formatViews(tool.views);

  return (
    <Link href={`/tools/${tool.slug}`} className="group block">
      <div className="glow-card h-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 sm:rounded-2xl sm:p-5">
        {/* Header: Logo + Name + Pricing */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-white/[0.08]">
              {tool.logo && tool.logo.startsWith("http") ? (
                <img
                  src={tool.logo}
                  alt=""
                  className="h-7 w-7 rounded-lg object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="text-lg">🤖</span>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white transition-colors group-hover:text-cyan-300">
                {tool.name}
              </h3>
              <p className="text-xs text-white/40">{tool.category}</p>
            </div>
          </div>
          <span
            className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${
              pricingColors[tool.pricing] ??
              "bg-white/5 text-white/50 border-white/10"
            }`}
          >
            {tool.pricing}
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/50">
          {tool.description}
        </p>

        {/* Footer: Rating + Views + Saves */}
        <div className="mt-4 flex items-center gap-3 text-xs text-white/30">
          {tool.rating > 0 && (
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-white/50">{tool.rating.toFixed(1)}</span>
            </span>
          )}
          {viewsLabel && <span>{viewsLabel} views</span>}
          {tool.saves > 0 && <span>♡ {tool.saves}</span>}
        </div>
      </div>
    </Link>
  );
}
