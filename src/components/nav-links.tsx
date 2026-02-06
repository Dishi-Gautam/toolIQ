"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Explore" },
  { href: "/collections", label: "Collections" },
];

export default function NavLinks() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="hidden items-center gap-0.5 md:flex">
      {navLinks.map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative rounded-full px-4 py-1.5 text-sm transition-all duration-300 ${
              active
                ? "text-white"
                : "text-white/50 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {link.label}

            {/* Smooth animated underline for active link */}
            {active && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-0.5 left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-sky-400"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
