import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { ChevronRight } from "lucide-react";
import MobileNav from "@/components/mobile-nav";
import NavLinks from "@/components/nav-links";
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
          <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
            <nav className="relative flex h-12 w-full max-w-2xl items-center justify-between rounded-full border border-white/[0.08] bg-[#060b14]/60 px-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-2xl backdrop-saturate-[1.8] transition-all duration-500 sm:h-14 sm:px-2">
              {/* Inner glow highlights */}
              <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
              <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/[0.06] to-transparent" />

              {/* Logo */}
              <Link
                href="/"
                className="group flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200 hover:bg-white/[0.04] sm:px-3.5"
              >
                <img
                  src="/logo.svg"
                  alt="Tooliq"
                  className="h-6 w-6 sm:h-7 sm:w-7"
                />
                <span className="hidden bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-xs font-extrabold uppercase tracking-[0.15em] text-transparent sm:inline sm:text-sm">
                  Tooliq
                </span>
              </Link>

              {/* Nav links — desktop (client component for active state) */}
              <NavLinks />

              {/* Right side: CTA + mobile menu */}
              <div className="flex items-center gap-2">
                {/* Gradient-bordered CTA button */}
                <Link
                  href="/tools"
                  className="nav-cta-gradient group hidden sm:inline-flex"
                >
                  {/* Inner fill */}
                  <span className="relative z-10 flex items-center gap-1.5 rounded-full bg-[#0a1020] px-4 py-1.5 text-sm font-medium text-white/80 transition-colors duration-200 group-hover:text-white sm:px-5 sm:py-2">
                    Get Started
                    <ChevronRight className="h-3 w-3 text-cyan-400 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>

                {/* Mobile hamburger */}
                <MobileNav />
              </div>
            </nav>
          </header>

          {/* Spacer for fixed navbar */}
          <div className="h-16 sm:h-20" />

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
