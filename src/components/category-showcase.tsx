"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Video,
  Image as ImageIcon,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";

type CategoryTab = {
  id: string;
  label: string;
  icon: React.ElementType;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  collectionSlug: string;
};

const TABS: CategoryTab[] = [
  {
    id: "coding",
    label: "Coding",
    icon: Code2,
    title: "Seamless Code Review & AI-Assisted Development",
    description:
      "Ship code faster with AI-powered code review, vibe coding, and intelligent pair programming. From syntax fixes to architectural suggestions — let AI handle the repetitive parts so you can focus on what matters.",
    stats: [
      { value: "10+", label: "Coding tools for instant productivity" },
      { value: "85%", label: "Faster code reviews with AI assistance" },
    ],
    collectionSlug: "best-ai-coding-tools",
  },
  {
    id: "video",
    label: "Video",
    icon: Video,
    title: "AI Video Creation & Editing at Scale",
    description:
      "Create stunning videos from text prompts, automate lip sync, generate faceless content, and edit at 10x speed. Transform your video workflow with tools that handle everything from ideation to post-production.",
    stats: [
      { value: "15+", label: "Video tools across every workflow" },
      { value: "10x", label: "Faster content production pipeline" },
    ],
    collectionSlug: "best-ai-video-tools",
  },
  {
    id: "images",
    label: "Images",
    icon: ImageIcon,
    title: "Generate & Edit Stunning Visuals with AI",
    description:
      "From photorealistic product shots to artistic illustrations, AI image generators turn your ideas into visuals in seconds. Sketch-to-image, background removal, style transfer — all in your creative toolkit.",
    stats: [
      { value: "12+", label: "Image generation & editing tools" },
      { value: "90%", label: "Less time on manual design work" },
    ],
    collectionSlug: "best-ai-image-generators",
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: TrendingUp,
    title: "Supercharge Every Marketing Channel with AI",
    description:
      "SEO optimization, social media scheduling, ad creative generation, lead scoring — AI marketing tools automate the growth engine so you can scale without scaling headcount.",
    stats: [
      { value: "10+", label: "Marketing & growth tools" },
      { value: "3x", label: "More output per marketing dollar" },
    ],
    collectionSlug: "best-ai-tools-for-marketing",
  },
  {
    id: "productivity",
    label: "Productivity",
    icon: Sparkles,
    title: "Work Smarter with AI-Powered Workflows",
    description:
      "Personal assistants, meeting transcription, knowledge management, and task automation. AI productivity tools eliminate busywork and help you focus on high-impact decisions.",
    stats: [
      { value: "8+", label: "Productivity & workflow tools" },
      { value: "5h+", label: "Saved per week on average" },
    ],
    collectionSlug: "best-ai-productivity-tools",
  },
];

export default function CategoryShowcase() {
  const [active, setActive] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];
  const Icon = tab.icon;

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {TABS.map((t) => {
          const TabIcon = t.icon;
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all sm:px-5 sm:py-3 ${
                isActive
                  ? "border-cyan-500/30 bg-cyan-500/10 text-white shadow-[0_0_20px_-4px_rgba(56,189,248,0.15)]"
                  : "border-white/[0.08] bg-white/[0.02] text-white/40 hover:border-white/[0.15] hover:text-white/70"
              }`}
            >
              <TabIcon className={`h-4 w-4 ${isActive ? "text-cyan-400" : ""}`} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-10 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] sm:mt-12"
        >
          <div className="grid lg:grid-cols-2">
            {/* Left: Text */}
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <span className="mb-4 inline-flex w-fit rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                {tab.label}
              </span>
              <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
                {tab.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/40 sm:text-base">
                {tab.description}
              </p>

              {/* Stats row */}
              <div className="mt-6 flex gap-6 sm:mt-8 sm:gap-10">
                {tab.stats.map((s, i) => (
                  <div key={i}>
                    <p className="text-2xl font-bold text-white sm:text-3xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/40 sm:text-sm">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href={`/collections/${tab.collectionSlug}`}
                className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-cyan-400 transition-all hover:gap-2.5"
              >
                Explore {tab.label} tools
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Right: Decorative visual */}
            <div className="relative hidden min-h-[320px] overflow-hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/[0.03] to-cyan-500/[0.08]" />
              <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-[80px]" />
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-white/[0.08] bg-white/[0.04] shadow-2xl backdrop-blur-sm">
                  <Icon className="h-12 w-12 text-cyan-400/60" />
                </div>
              </div>
              {/* Decorative lines */}
              <svg
                className="absolute inset-0 h-full w-full opacity-20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0"
                  y1="50%"
                  x2="60%"
                  y2="50%"
                  stroke="rgba(56,189,248,0.3)"
                  strokeWidth="1"
                  strokeDasharray="6 6"
                />
                <circle
                  cx="60%"
                  cy="50%"
                  r="4"
                  fill="rgba(56,189,248,0.5)"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
