"use client";

import { motion } from "framer-motion";

type StatCard = {
  value: string;
  label: string;
  top: string;
  right: string;
  rotate: number;
  delay: number;
};

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export default function HeroBeam({
  toolCount,
  categoryCount,
  collectionCount,
}: {
  toolCount: number;
  categoryCount: number;
  collectionCount: number;
}) {
  const stats: StatCard[] = [
    {
      value: `${toolCount}+`,
      label: "Curated AI tools to\ndiscover and compare",
      top: "6%",
      right: "3%",
      rotate: -6,
      delay: 0.5,
    },
    {
      value: `${categoryCount}+`,
      label: "Categories for plug-and-play\ntool discovery",
      top: "36%",
      right: "20%",
      rotate: -3,
      delay: 0.7,
    },
    {
      value: `${collectionCount}`,
      label: "Curated collections for\nevery workflow",
      top: "62%",
      right: "1%",
      rotate: -8,
      delay: 0.9,
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Light beam cone */}
      <motion.div
        className="light-beam"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div
        className="light-beam-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
      />

      {/* Floating stat cards */}
      {stats.map((card, i) => (
        <motion.div
          key={i}
          className="pointer-events-auto absolute hidden lg:block"
          style={{ top: card.top, right: card.right }}
          initial={{ opacity: 0, y: 50, rotate: card.rotate - 5 }}
          animate={{ opacity: 1, y: 0, rotate: card.rotate }}
          transition={{
            duration: 0.9,
            delay: card.delay,
            ease,
          }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 5 + i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="glass-stat-card"
          >
            <p className="text-3xl font-bold text-white">{card.value}</p>
            <p className="mt-1.5 whitespace-pre-line text-xs leading-relaxed text-white/50">
              {card.label}
            </p>
          </motion.div>
        </motion.div>
      ))}

      {/* Cross markers (decorative) */}
      <div className="cross-marker" style={{ top: "25%", left: "10%" }} />
      <div className="cross-marker" style={{ top: "60%", left: "25%" }} />
      <div className="cross-marker" style={{ top: "80%", left: "8%" }} />
      <div className="cross-marker" style={{ top: "45%", left: "42%" }} />
      <div className="cross-marker" style={{ top: "15%", left: "35%" }} />
    </div>
  );
}
