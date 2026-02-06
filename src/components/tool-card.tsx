import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import type { Tool } from "@/lib/tools-data";

const LOGO_API_TOKEN = "pk_Q2U60apXTeeFjOBPbbJUCw";
const logoDev = (domain: string) =>
  `https://img.logo.dev/${domain}?token=${LOGO_API_TOKEN}&size=80&format=png`;
const DEFAULT_LOGO_DOMAIN = "logo.dev";

const pricingColors: Record<string, string> = {
  Free: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Freemium: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Paid: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Enterprise: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

const NAME_TO_DOMAIN: Record<string, string> = {
  chatgpt: "openai.com",
  openai: "openai.com",
  claude: "claude.ai",
  anthropic: "claude.ai",
  gemini: "gemini.google.com",
  "google gemini": "gemini.google.com",
  github: "github.com",
  copilot: "copilot.microsoft.com",
  "github copilot": "copilot.microsoft.com",
  midjourney: "midjourney.com",
  perplexity: "perplexity.ai",
  deepseek: "deepseek.com",
  firefly: "adobe.com",
  "adobe firefly": "adobe.com",
  huggingface: "huggingface.co",
  "hugging face": "huggingface.co",
};

function getLogoDevDomain(tool: Tool): string {
  // Prefer the tool's website domain when available.
  if (tool.website && tool.website !== "#") {
    try {
      const url = new URL(tool.website);
      const host = url.hostname.replace(/^www\./, "");
      if (host) return host;
    } catch {
      // ignore
    }
  }

  // Fallback: map well-known tool names to domains.
  const byName = NAME_TO_DOMAIN[tool.name.toLowerCase()];
  return byName ?? DEFAULT_LOGO_DOMAIN;
}

function getToolIcon(tool: Tool): string {
  const domain = getLogoDevDomain(tool);
  return logoDev(domain);
}

function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
  if (views > 0) return views.toLocaleString();
  return "";
}

export default function ToolCard({ tool }: { tool: Tool }) {
  const viewsLabel = formatViews(tool.views);
  const iconSrc = getToolIcon(tool);

  return (
    <Link href={`/tools/${tool.slug}`} className="group block">
      <div className="glow-card h-full rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 transition-all duration-300">
        {/* Header: Logo + Name + Pricing */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-white/[0.1]">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.92] ring-1 ring-black/10">
                <Image
                  src={iconSrc}
                  alt={tool.name}
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-md object-contain"
                  style={{ filter: "brightness(1.05) contrast(1.05)" }}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  sizes="28px"
                />
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white transition-colors group-hover:text-cyan-300">
                {tool.name}
              </h3>
              <p className="text-xs text-white/35">{tool.category}</p>
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
        <p className="mt-3.5 line-clamp-2 text-[13px] leading-relaxed text-white/45">
          {tool.description}
        </p>

        {/* Footer: Rating + Views + Saves */}
        <div className="mt-4 flex items-center gap-3 border-t border-white/[0.06] pt-3.5 text-xs text-white/30">
          {tool.rating > 0 && (
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-white/50">{tool.rating.toFixed(1)}</span>
            </span>
          )}
          {viewsLabel && <span>{viewsLabel} views</span>}
          {tool.saves > 0 && (
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {tool.saves}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
