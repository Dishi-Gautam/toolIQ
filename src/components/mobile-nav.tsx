"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Explore" },
  { href: "/collections", label: "Collections" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /* close on route change */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="relative z-[60] flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-white/60 transition-colors hover:text-white"
        aria-label="Toggle menu"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#060b14]/95 backdrop-blur-xl"
          >
            <div className="flex h-full flex-col px-6 pt-24 pb-8">
              <nav className="flex flex-1 flex-col gap-2">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between rounded-xl px-4 py-4 text-lg font-medium transition-colors ${
                          active
                            ? "bg-white/[0.06] text-white"
                            : "text-white/50 hover:bg-white/[0.03] hover:text-white"
                        }`}
                      >
                        {link.label}
                        <ChevronRight className="h-4 w-4 text-white/20" />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Link
                  href="/tools"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Browse All Tools
                  <span className="flex items-center">
                    <ChevronRight className="-mr-1 h-3.5 w-3.5" />
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
