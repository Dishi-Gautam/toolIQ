"use client";

import { useState, useMemo } from "react";
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

const LOGO_API_TOKEN = "pk_Q2U60apXTeeFjOBPbbJUCw";

type CategoryTab = {
  id: string;
  label: string;
  icon: React.ElementType;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  collectionSlug: string;
  tools: string[]; // Domains for the logos
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
    tools: ["github.com", "cursor.sh", "openai.com", "replit.com", "vercel.com", "stackoverflow.com", "gitlab.com", "docker.com"],
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
    tools: ["runwayml.com", "heygen.com", "synthesia.io", "descript.com", "pika.art", "elevenlabs.io", "veed.io", "invideo.io"],
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
    tools: ["midjourney.com", "adobe.com", "stability.ai", "canva.com", "leonardo.ai", "clipdrop.co", "artbreeder.com", "playgroundai.com"],
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
    tools: ["jasper.ai", "copy.ai", "hubspot.com", "surferseo.com", "buffer.com", "hootsuite.com", "mailchimp.com", "writer.com"],
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
    tools: ["notion.so", "slack.com", "zapier.com", "linear.app", "raycast.com", "obsidian.md", "todoist.com", "zoom.us"],
  },
];

// Consistent node size for clean look
const NODE_PX = 56; // all tiles same size
const HALF_PX = NODE_PX / 2;

// Node positions (% of container)
const NODES = [
  { x: 20, y: 25 }, // 0: Top left
  { x: 22, y: 65 }, // 1: Bot left
  { x: 50, y: 45 }, // 2: Center
  { x: 62, y: 18 }, // 3: Top right mid
  { x: 80, y: 35 }, // 4: Far right top
  { x: 78, y: 70 }, // 5: Far right bot
  { x: 50, y: 80 }, // 6: Bot center
  { x: 42, y: 12 }, // 7: Top center
];

// Complex mesh of connections
const CONNECTIONS = [
  [0, 2], [0, 7], [0, 1],
  [1, 2], [1, 6],
  [2, 3], [2, 4], [2, 5], [2, 6], [2, 7],
  [3, 4], [3, 7],
  [4, 5],
  [5, 6],
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
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all sm:px-5 sm:py-3 ${isActive
                  ? "border-cyan-500/25 bg-cyan-500/[0.08] text-white shadow-[0_0_24px_-4px_rgba(56,189,248,0.12)]"
                  : "border-white/[0.07] bg-white/[0.02] text-white/40 hover:border-white/[0.15] hover:text-white/70"
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
          className="mt-8 overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-white/[0.01] sm:mt-10"
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

            {/* Right: Network Connections Visual */}
            <div className="relative hidden min-h-[450px] w-full overflow-hidden bg-white/[0.02] lg:block">
              {/* Complex Background glows */}
              <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/[0.05] via-transparent to-transparent" />
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-500/[0.08] blur-[100px]" />
              <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-purple-500/[0.05] blur-[80px]" />

              <div className="relative h-full w-full">
                {/* SVG Connections Layer */}
                <svg className="absolute inset-0 h-full w-full pointer-events-none">
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(56, 189, 248, 0.05)" />
                      <stop offset="50%" stopColor="rgba(56, 189, 248, 0.3)" />
                      <stop offset="100%" stopColor="rgba(56, 189, 248, 0.05)" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Render connections */}
                  {CONNECTIONS.map(([startIdx, endIdx], i) => {
                    const start = NODES[startIdx];
                    const end = NODES[endIdx];
                    // Randomize duration slightly for organic feel
                    const duration = 2 + (i % 3);

                    return (
                      <g key={`${startIdx}-${endIdx}`}>
                        {/* Static subtle connection */}
                        <line
                          x1={`${start.x}%`}
                          y1={`${start.y}%`}
                          x2={`${end.x}%`}
                          y2={`${end.y}%`}
                          stroke="rgba(255,255,255,0.03)"
                          strokeWidth="1"
                        />

                        {/* Pulse effect on line */}
                        <motion.line
                          x1={`${start.x}%`}
                          y1={`${start.y}%`}
                          x2={`${end.x}%`}
                          y2={`${end.y}%`}
                          stroke="url(#lineGrad)"
                          strokeWidth="1"
                          initial={{ strokeDasharray: "10 100", strokeDashoffset: 100 }}
                          animate={{ strokeDashoffset: -100 }}
                          transition={{
                            duration: duration * 1.5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.2
                          }}
                        />

                        {/* Animated Data Packet */}
                        <motion.circle
                          r="1.5"
                          fill="#22d3ee"
                          filter="url(#glow)"
                          initial={{ opacity: 0 }}
                          animate={{
                            cx: [`${start.x}%`, `${end.x}%`],
                            cy: [`${start.y}%`, `${end.y}%`],
                            opacity: [0, 1, 1, 0]
                          }}
                          transition={{
                            duration: duration,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut",
                            repeatDelay: Math.random()
                          }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Nodes (Logos) — centered on network points */}
                {NODES.map((pos, i) => {
                  if (i >= tab.tools.length) return null;
                  const domain = tab.tools[i];
                  const floatY = 4 + (i % 3) * 2;
                  const floatDur = 4 + (i % 4);

                  return (
                    <motion.div
                      key={domain}
                      className="absolute z-10"
                      style={{
                        width: NODE_PX,
                        height: NODE_PX,
                        left: `calc(${pos.x}% - ${HALF_PX}px)`,
                        top: `calc(${pos.y}% - ${HALF_PX}px)`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        y: [0, -floatY, 0],
                      }}
                      transition={{
                        scale: { type: "spring", damping: 12, delay: i * 0.05 },
                        opacity: { duration: 0.5, delay: i * 0.05 },
                        y: { duration: floatDur, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
                      }}
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-xl border border-white/[0.1] bg-[#0A0F1C]/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.3)]">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.92] ring-1 ring-black/10">
                          <img
                            src={`https://img.logo.dev/${domain}?token=${LOGO_API_TOKEN}&size=80&format=png`}
                            alt={domain}
                            className="h-7 w-7 object-contain"
                            draggable={false}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
