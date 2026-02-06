import { cache } from "react";
import { readFile } from "node:fs/promises";
import path from "node:path";

/* ── Types ── */

export type Tool = {
  name: string;
  slug: string;
  category: string;
  description: string;
  pricing: "Free" | "Freemium" | "Paid" | "Enterprise";
  pricingLabel: string;
  tags: string[];
  website: string;
  logo: string;
  version: string;
  views: number;
  saves: number;
  rating: number;
};

export type Collection = {
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  getTools: (tools: Tool[]) => Tool[];
};

/* ── Paths ── */

const TAAFT_CSV_PATH = path.join(process.cwd(), "data.csv");

/* ── Helpers ── */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseNumber(value?: string): number {
  if (!value) return 0;
  return parseInt(value.replace(/,/g, ""), 10) || 0;
}

function parseRating(value?: string): number {
  if (!value) return 0;
  return parseFloat(value) || 0;
}

function normalizePricing(value?: string): Tool["pricing"] {
  if (!value) return "Freemium";
  const lower = value.toLowerCase();
  if (lower.includes("100% free")) return "Free";
  if (lower.includes("no pricing")) return "Free";
  if (lower.includes("trending")) return "Freemium";
  if (lower.includes("free")) return "Freemium";
  if (lower.includes("from") || lower.includes("$")) return "Paid";
  return "Freemium";
}

function normalizeUrl(value?: string): string {
  if (!value || value === "#") return "#";
  try {
    const url = new URL(value);
    return url.origin + url.pathname;
  } catch {
    try {
      return new URL(`https://${value}`).toString();
    } catch {
      return "#";
    }
  }
}

/* ── CSV parser ── */

function parseDelimited(content: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const next = content[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i++;
        continue;
      }
      inQuotes = !inQuotes;
      continue;
    }

    if (!inQuotes && char === delimiter) {
      row.push(field);
      field = "";
      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") i++;
      row.push(field);
      field = "";
      if (row.length > 1 || row[0]) rows.push(row);
      row = [];
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.length > 1 || row[0]) rows.push(row);
  }

  return rows;
}

function rowsToObjects(rows: string[][]): Record<string, string>[] {
  if (rows.length === 0) return [];
  const [header, ...data] = rows;
  return data.map((row) => {
    const obj: Record<string, string> = {};
    header.forEach((key, index) => {
      obj[key] = row[index] ?? "";
    });
    return obj;
  });
}

/* ── Load tools from CSV ── */

async function loadToolsFromCSV(): Promise<Tool[]> {
  const content = await readFile(TAAFT_CSV_PATH, "utf8");
  const rows = parseDelimited(content, ",");
  const entries = rowsToObjects(rows);

  return entries
    .map((entry) => {
      const name = entry["ai_link"]?.trim();
      if (!name) return null;

      const category = entry["task_label"]?.trim() || "Other";
      const description =
        entry["short_desc"]?.trim() || "AI-powered tool for modern workflows.";
      const website =
        entry["external_ai_link href"]?.trim() ||
        entry["visit_ai_website_link href"]?.trim() ||
        entry["ai_link href"]?.trim() ||
        "#";
      const logo = entry["taaft_icon src"]?.trim() || "";
      const pricingRaw = entry["ai_launch_date"]?.trim() || "";
      const version = entry["current_version"]?.trim() || "";
      const views =
        parseNumber(entry["stats_views"]) ||
        parseNumber(entry["views_count_count"]);
      const saves = parseNumber(entry["saves"]);
      const rating = parseRating(entry["average_rating"]);

      return {
        name,
        slug: slugify(name),
        category,
        description,
        pricing: normalizePricing(pricingRaw),
        pricingLabel: pricingRaw || "Free",
        tags: [category],
        website: normalizeUrl(website),
        logo,
        version,
        views,
        saves,
        rating,
      } satisfies Tool;
    })
    .filter((t): t is Tool => t !== null);
}

/* ── Collections (Permutation Pages) ── */

const categoryMatch =
  (categories: string[]) =>
  (tool: Tool): boolean =>
    categories.some(
      (c) =>
        tool.category.toLowerCase().includes(c.toLowerCase()) ||
        c.toLowerCase().includes(tool.category.toLowerCase())
    );

export const COLLECTIONS: Collection[] = [
  {
    slug: "best-free-ai-tools",
    title: "Best Free AI Tools",
    description:
      "Discover the best completely free AI tools. No credit card required, no hidden fees — just powerful AI at your fingertips.",
    seoTitle: "Best Free AI Tools in 2026 — Curated & Ranked",
    seoDescription:
      "Explore our curated list of the best free AI tools in 2026. From image generation to coding assistants, find powerful AI tools that cost nothing.",
    getTools: (tools) =>
      tools.filter((t) => t.pricing === "Free").sort((a, b) => b.views - a.views),
  },
  {
    slug: "top-rated-ai-tools",
    title: "Top Rated AI Tools",
    description:
      "The highest-rated AI tools as voted by the community. These tools consistently deliver exceptional results.",
    seoTitle: "Top Rated AI Tools in 2026 — Community Favorites",
    seoDescription:
      "Browse the top-rated AI tools based on community ratings. Find the most loved AI tools for every workflow.",
    getTools: (tools) =>
      tools
        .filter((t) => t.rating >= 4.0)
        .sort((a, b) => b.rating - a.rating || b.views - a.views),
  },
  {
    slug: "most-popular-ai-tools",
    title: "Most Popular AI Tools",
    description:
      "The most viewed and widely-used AI tools right now. See what everyone is talking about in the AI space.",
    seoTitle: "Most Popular AI Tools in 2026 — Trending Now",
    seoDescription:
      "Discover the most popular AI tools with millions of views. From CodeRabbit to Notis, see what is trending in AI.",
    getTools: (tools) =>
      [...tools].sort((a, b) => b.views - a.views).slice(0, 20),
  },
  {
    slug: "best-ai-coding-tools",
    title: "Best AI Coding Tools",
    description:
      "Level up your development workflow with the best AI coding tools. From code review to vibe coding, ship faster with AI.",
    seoTitle: "Best AI Coding Tools in 2026 — For Developers",
    seoDescription:
      "Find the best AI coding tools for developers in 2026. Code review, vibe coding, and intelligent assistants to 10x your productivity.",
    getTools: (tools) =>
      tools
        .filter(
          categoryMatch([
            "Coding",
            "Vibe coding",
            "Vibe Coding",
            "Code reviews",
            "Code permissions",
          ])
        )
        .sort((a, b) => b.views - a.views),
  },
  {
    slug: "best-ai-video-tools",
    title: "Best AI Video Tools",
    description:
      "Create stunning videos with AI. From text-to-video to lip sync and video extension, transform your video workflow.",
    seoTitle: "Best AI Video Tools in 2026 — Create & Edit Videos with AI",
    seoDescription:
      "Explore the best AI video tools for creation, editing, and enhancement. Faceless videos, lip sync, video ads, and more.",
    getTools: (tools) =>
      tools
        .filter(
          categoryMatch([
            "Videos",
            "Video ads",
            "Product videos",
            "Video extension",
            "Faceless videos",
            "Short videos",
            "Image to Video",
            "Image to video",
            "Animated videos",
            "Lip sync videos",
            "UGC videos",
            "Educational videos",
          ])
        )
        .sort((a, b) => b.views - a.views),
  },
  {
    slug: "best-ai-image-generators",
    title: "Best AI Image Generators",
    description:
      "Generate stunning visuals with AI. From photorealistic images to artistic illustrations, bring your ideas to life.",
    seoTitle: "Best AI Image Generators in 2026 — Create Stunning Visuals",
    seoDescription:
      "Discover the best AI image generators for creating art, product photos, and visual content. Compare features and pricing.",
    getTools: (tools) =>
      tools
        .filter(
          categoryMatch([
            "Images",
            "Sketch to image",
            "Fashion images",
            "Product images",
            "Vision boards",
          ])
        )
        .sort((a, b) => b.views - a.views),
  },
  {
    slug: "best-ai-tools-for-marketing",
    title: "Best AI Tools for Marketing",
    description:
      "Supercharge your marketing with AI. Social media, SEO, content creation, lead generation, and ad creative tools.",
    seoTitle: "Best AI Marketing Tools in 2026 — Grow Faster with AI",
    seoDescription:
      "Find the best AI marketing tools for social media, SEO, lead generation, and ad creation. Scale your marketing with AI.",
    getTools: (tools) =>
      tools
        .filter(
          categoryMatch([
            "Social media planning",
            "SEO",
            "Lead generation",
            "LinkedIn",
            "Ads",
            "Social Media Management",
            "AI visibility",
            "Topical maps",
            "E-commerce content",
          ])
        )
        .sort((a, b) => b.views - a.views),
  },
  {
    slug: "best-ai-tools-for-business",
    title: "Best AI Tools for Business",
    description:
      "Transform your business operations with AI. Sales outreach, project management, and team collaboration tools.",
    seoTitle: "Best AI Business Tools in 2026 — Automate & Scale",
    seoDescription:
      "Discover the best AI tools for business operations, sales, project management, and team collaboration.",
    getTools: (tools) =>
      tools
        .filter(
          categoryMatch([
            "Sales",
            "Business operations",
            "Project management",
            "Team collaboration",
            "Task automation",
            "Productivity",
          ])
        )
        .sort((a, b) => b.views - a.views),
  },
  {
    slug: "best-ai-tools-for-creators",
    title: "Best AI Tools for Creators",
    description:
      "Unleash your creativity with AI. Image generation, video creation, music production, and content tools for modern creators.",
    seoTitle: "Best AI Tools for Creators in 2026 — Create Anything",
    seoDescription:
      "Explore the best AI tools for content creators. Video, music, images, stories — powerful creation tools at your fingertips.",
    getTools: (tools) =>
      tools
        .filter(
          categoryMatch([
            "Images",
            "Videos",
            "Music",
            "Text to speech",
            "Storybooks",
            "Children's stories",
            "Novels",
            "Presentations",
            "Web design",
          ])
        )
        .sort((a, b) => b.views - a.views),
  },
  {
    slug: "best-ai-productivity-tools",
    title: "Best AI Productivity Tools",
    description:
      "Get more done with AI. Personal assistants, meeting transcription, knowledge management, and workflow automation.",
    seoTitle: "Best AI Productivity Tools in 2026 — Work Smarter",
    seoDescription:
      "Find the best AI productivity tools for task management, transcription, personal assistance, and workflow optimization.",
    getTools: (tools) =>
      tools
        .filter(
          categoryMatch([
            "Productivity",
            "Personal assistant",
            "Transcription",
            "Knowledge bases",
            "Workflows",
            "Personal development",
            "Goals",
            "Decision making",
          ])
        )
        .sort((a, b) => b.views - a.views),
  },
];

/* ── Exports ── */

export const getToolsData = cache(async () => {
  try {
    const tools = await loadToolsFromCSV();
    const categories = Array.from(
      new Set(tools.map((t) => t.category))
    ).sort();
    const pricingOptions = Array.from(
      new Set(tools.map((t) => t.pricing))
    ).sort();
    return { tools, categories, pricingOptions };
  } catch (error) {
    console.error("Failed to load tools data:", error);
    return { tools: [], categories: [], pricingOptions: [] };
  }
});

export function getCollections(): Collection[] {
  return COLLECTIONS;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
