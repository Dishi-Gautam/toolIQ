import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore AI Tools — Search, Filter & Compare",
  description:
    "Browse 80+ curated AI tools across 50+ categories. Search by name, filter by pricing and category, sort by rating or popularity.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Explore AI Tools — Tooliq",
    description: "Search, filter, and compare 80+ curated AI tools.",
    url: "/tools",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
