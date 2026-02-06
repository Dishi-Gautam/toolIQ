import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { ChevronRight } from "lucide-react";
import MobileNav from "@/components/mobile-nav";
import { WebsiteJsonLd, OrganizationJsonLd } from "@/components/json-ld";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const SITE_URL = "https://tooliq.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tooliq — Discover the Best AI Tools",
    template: "%s | Tooliq",
  },
  description:
    "Discover, compare, and shortlist the best AI tools across 50+ categories. A curated directory powered by real data from the AI ecosystem.",
  keywords: [
    "AI tools",
    "AI directory",
    "artificial intelligence",
    "machine learning tools",
    "AI software",
    "best AI tools 2026",
  ],
  authors: [{ name: "Tooliq" }],
  creator: "Tooliq",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Tooliq",
    title: "Tooliq — Discover the Best AI Tools",
    description: "Curated directory of AI tools across 50+ categories.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tooliq — Discover the Best AI Tools",
    description: "Curated directory of AI tools across 50+ categories.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Explore" },
  { href: "/collections", label: "Collections" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://media.theresanaiforthat.com" />
        <link
          rel="dns-prefetch"
          href="https://media.theresanaiforthat.com"
        />
        <meta name="theme-color" content="#060b14" />
        <WebsiteJsonLd />
        <OrganizationJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <div className="noise relative flex min-h-screen flex-col">
          {/* ── Navigation ── */}
          <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#060b14]/80 backdrop-blur-xl">
            <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6">
              <div className="flex items-center gap-6 sm:gap-10">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-2.5">
                  <img
                    src="/logo.svg"
                    alt="Tooliq"
                    className="h-7 w-7"
                  />
                  <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-sm font-extrabold uppercase tracking-[0.15em] text-transparent sm:text-base">
                    Tooliq
                  </span>
                </Link>

                {/* Nav links — desktop */}
                <div className="hidden items-center gap-1 md:flex">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-lg px-3.5 py-2 text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/tools"
                  className="group hidden items-center gap-1.5 rounded-lg border border-white/[0.15] px-4 py-2 text-sm font-medium text-white/70 transition-all hover:border-cyan-400/30 hover:text-white sm:inline-flex"
                >
                  Get Started
                  <span className="flex items-center text-cyan-400">
                    <ChevronRight className="-mr-0.5 h-3 w-3" />
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </Link>

                {/* Mobile hamburger */}
                <MobileNav />
              </div>
            </nav>
          </header>

          {/* ── Page Content ── */}
          <main className="flex-1">{children}</main>

          {/* ── Footer ── */}
          <footer className="border-t border-white/[0.06] bg-[#060b14]">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
              <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 md:grid-cols-4">
                {/* Brand */}
                <div className="md:col-span-1">
                  <Link href="/" className="flex items-center gap-2.5">
                    <img
                      src="/logo.svg"
                      alt="Tooliq"
                      className="h-7 w-7"
                    />
                    <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-sm font-extrabold uppercase tracking-[0.15em] text-transparent">
                      Tooliq
                    </span>
                  </Link>
                  <p className="mt-4 text-sm leading-relaxed text-white/40">
                    A curated catalog of the best AI tools, sourced from the
                    community and organized for discovery.
                  </p>
                </div>

                {/* Navigation */}
                <div>
                  <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                    Navigation
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/50 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Collections */}
                <div>
                  <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                    Collections
                  </h4>
                  <ul className="mt-4 space-y-3">
                    <li>
                      <Link
                        href="/collections/best-free-ai-tools"
                        className="text-sm text-white/50 transition-colors hover:text-white"
                      >
                        Best Free AI Tools
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/collections/top-rated-ai-tools"
                        className="text-sm text-white/50 transition-colors hover:text-white"
                      >
                        Top Rated
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/collections/most-popular-ai-tools"
                        className="text-sm text-white/50 transition-colors hover:text-white"
                      >
                        Most Popular
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/collections/best-ai-coding-tools"
                        className="text-sm text-white/50 transition-colors hover:text-white"
                      >
                        AI Coding Tools
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Data Source */}
                <div>
                  <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                    Data Source
                  </h4>
                  <ul className="mt-4 space-y-3">
                    <li>
                      <a
                        href="https://theresanaiforthat.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-white/50 transition-colors hover:text-white"
                      >
                        There&apos;s an AI for That
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.producthunt.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-white/50 transition-colors hover:text-white"
                      >
                        Product Hunt
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:mt-16 sm:pt-8 md:flex-row">
                <p className="text-xs text-white/30">
                  &copy; {new Date().getFullYear()} Tooliq. Built with
                  Next.js.
                </p>
                <p className="text-xs text-white/30">
                  Data sourced from public AI tool directories.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
