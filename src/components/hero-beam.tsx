"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect } from "react";

function OrbitRing({ ringNum }: { ringNum: 1 | 2 }) {
  const config = RING_CONFIG[ringNum];
  const tools = ORBITAL_TOOLS.filter((tool) => tool.ring === ringNum);

  return (
    <>
      {tools.map((tool, index) => (
        <OrbitingLogo
          key={tool.name}
          icon={tool.icon}
          name={tool.name}
          angle={tool.angle}
          radius={config.radius}
          duration={config.duration}
          direction={config.direction}
        />
      ))}
    </>
  );
}

function OrbitingLogo({
  icon,
  name,
  angle,
  radius,
  duration,
  direction,
}: {
  icon: string;
  name: string;
  angle: number;
  radius: number;
  duration: number;
  direction: number;
}) {
  const rotation = useMotionValue(angle);

  useEffect(() => {
    const controls = animate(rotation, angle + direction, {
      duration,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [angle, direction, duration, rotation]);

  // Position = center of 500×500 box + orbit offset − half the tile size
  const left = useTransform(
    rotation,
    (deg) => CENTER + Math.cos((deg * Math.PI) / 180) * radius - HALF
  );
  const top = useTransform(
    rotation,
    (deg) => CENTER + Math.sin((deg * Math.PI) / 180) * radius - HALF
  );

  return (
    <motion.div
      className="absolute"
      style={{
        width: LOGO_SIZE,
        height: LOGO_SIZE,
        left,
        top,
      }}
    >
      <div
        className="flex h-full w-full items-center justify-center rounded-xl border border-cyan-400/20 bg-gradient-to-b from-[#0c1525] to-[#060b14] shadow-lg backdrop-blur-sm"
        title={name}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.92] ring-1 ring-black/10">
          <img
            src={icon}
            alt={name}
            className="h-7 w-7 object-contain"
            style={{ filter: "brightness(1.05) contrast(1.05)" }}
            draggable={false}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </motion.div>
  );
}

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const CENTER = 250;
const LOGO_SIZE = 56;
const HALF = LOGO_SIZE / 2;

const LOGO_API_TOKEN = "pk_Q2U60apXTeeFjOBPbbJUCw";
const logo = (domain: string) =>
  `https://img.logo.dev/${domain}?token=${LOGO_API_TOKEN}&size=80&format=png`;

// AI Tools for orbital system — 8 logos on 2 rings
const ORBITAL_TOOLS = [
  // Inner ring — 4 logos (90° spacing)
  { icon: logo("openai.com"), name: "ChatGPT", ring: 1 as const, angle: 0 },
  { icon: logo("claude.ai"), name: "Claude", ring: 1 as const, angle: 90 },
  { icon: logo("gemini.google.com"), name: "Gemini", ring: 1 as const, angle: 180 },
  { icon: logo("github.com"), name: "GitHub", ring: 1 as const, angle: 270 },

  // Outer ring — 4 logos (90° spacing, 45° offset from inner)
  { icon: logo("midjourney.com"), name: "Midjourney", ring: 2 as const, angle: 45 },
  { icon: logo("deepseek.com"), name: "DeepSeek", ring: 2 as const, angle: 135 },
  { icon: logo("perplexity.ai"), name: "Perplexity", ring: 2 as const, angle: 225 },
  { icon: logo("copilot.microsoft.com"), name: "Copilot", ring: 2 as const, angle: 315 },
];

const RING_CONFIG = {
  1: { radius: 120, duration: 70, direction: 360 },
  2: { radius: 195, duration: 100, direction: -360 },
};

export default function HeroBeam({
  toolCount,
}: {
  toolCount: number;
  categoryCount: number;
  collectionCount: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Light beam cone */}
      <motion.div
        className="light-beam"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: smoothEase }}
      />
      <motion.div
        className="light-beam-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.3, ease: smoothEase }}
      />

      {/* Orbital system container — centered in right half */}
      <div className="absolute inset-0 flex items-center justify-center lg:left-[45%] lg:right-0">
        <motion.div
          className="relative"
          style={{ width: 500, height: 500 }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: smoothEase }}
        >
          {/* Ambient radial glow */}
          <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.07)_0%,rgba(139,92,246,0.03)_40%,transparent_70%)] blur-3xl" />

          {/* ── Orbit ring guides ── */}
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: `${CENTER - RING_CONFIG[1].radius}px`,
              border: "1px solid rgba(56, 189, 248, 0.15)",
              boxShadow:
                "0 0 18px -4px rgba(56, 189, 248, 0.08), inset 0 0 18px -4px rgba(56, 189, 248, 0.05)",
            }}
            animate={{ opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: `${CENTER - RING_CONFIG[2].radius}px`,
              border: "1px solid rgba(56, 189, 248, 0.10)",
              boxShadow:
                "0 0 22px -4px rgba(56, 189, 248, 0.06), inset 0 0 22px -4px rgba(56, 189, 248, 0.04)",
            }}
            animate={{ opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ── Center ToolIQ logo (from /public/logo.svg) ── */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="pointer-events-auto z-20 flex items-center justify-center rounded-[20px] border border-cyan-400/20 bg-gradient-to-b from-[#0c1525] to-[#060b14] shadow-[0_0_50px_-8px_rgba(56,189,248,0.35),0_0_0_1px_rgba(56,189,248,0.1)] backdrop-blur-xl"
              style={{ width: 80, height: 80 }}
              animate={{
                y: [0, -4, 0],
                boxShadow: [
                  "0 0 50px -8px rgba(56,189,248,0.35), 0 0 0 1px rgba(56,189,248,0.1)",
                  "0 0 60px -8px rgba(56,189,248,0.45), 0 0 0 1px rgba(56,189,248,0.18)",
                  "0 0 50px -8px rgba(56,189,248,0.35), 0 0 0 1px rgba(56,189,248,0.1)",
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            >
              {/* Use the actual ToolIQ logo from public/logo.svg */}
              <img
                src="/logo.svg"
                alt="ToolIQ"
                className="h-10 w-10 object-contain"
                draggable={false}
              />
            </motion.div>
          </div>

          {/* ── Orbiting logos ── */}
          <OrbitRing ringNum={1} />
          <OrbitRing ringNum={2} />

          {/* Soft center glow */}
          <div className="pointer-events-none absolute inset-[40%] rounded-full bg-gradient-to-br from-cyan-500/[0.07] to-purple-500/[0.03] blur-2xl" />
        </motion.div>
      </div>

      {/* Cross markers */}
      <motion.div
        className="cross-marker"
        style={{ top: "25%", left: "10%" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ delay: 0.6, duration: 1, ease: smoothEase }}
      />
      <motion.div
        className="cross-marker"
        style={{ top: "60%", left: "25%" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ delay: 0.8, duration: 1, ease: smoothEase }}
      />
      <motion.div
        className="cross-marker"
        style={{ top: "80%", left: "8%" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ delay: 1, duration: 1, ease: smoothEase }}
      />
    </div>
  );
}
