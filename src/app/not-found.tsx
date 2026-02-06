import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.04] blur-[120px]" />

      <p className="relative font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-400">
        404 — Page Not Found
      </p>
      <h1 className="relative mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
        Oops, nothing here
      </h1>
      <p className="relative mt-4 max-w-md text-base text-white/40">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>

      <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-white/[0.15] px-6 py-3 text-sm font-medium text-white/70 transition-all hover:border-cyan-400/30 hover:text-white"
        >
          <Home className="h-4 w-4" />
          Go Home
        </Link>
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-white/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse Tools
        </Link>
      </div>
    </div>
  );
}
