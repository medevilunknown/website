import React from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";

/**
 * Section page shell — a scrollable overlay page. Navigation chrome lives in the
 * persistent top nav bar. Each page can theme itself: `accent` tints the ambient
 * glow + pulse dot, `hero` renders a visual beside the title (2-col hero), and
 * `bgImage` washes a faint image into the top-right. Content animates in.
 */
const ease = [0.2, 0.8, 0.2, 1];

function hexA(hex, a) {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

export default function SectionShell({
  code,
  eyebrow,
  title,
  tagline,
  children,
  accent = "#5B78FF",
  hero,
  bgImage,
}) {
  return (
    <div
      className="fixed inset-0 z-30 bg-[#0E1016]/97 backdrop-blur-xl flex flex-col"
      data-testid={`section-${code?.toLowerCase?.().replace(/\W+/g, "-")}`}
    >
      <div className="absolute inset-0 brand-dots pointer-events-none" aria-hidden />
      {/* Accent glow — colour identity per page */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[36rem] h-[36rem] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${hexA(accent, 0.2)}, transparent 60%)` }}
      />
      {bgImage && (
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[55%] h-[75%] pointer-events-none"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.08,
            WebkitMaskImage: "linear-gradient(to left, black, transparent 85%)",
            maskImage: "linear-gradient(to left, black, transparent 85%)",
          }}
        />
      )}
      <div className="relative flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10 pt-28 md:pt-36 pb-24 md:pb-40">
          <div
            className={`mb-16 md:mb-24 grid gap-10 lg:gap-14 items-center ${
              hero ? "lg:grid-cols-12" : "lg:grid-cols-1"
            }`}
          >
            <motion.div
              className={hero ? "lg:col-span-7" : "max-w-4xl"}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: accent }} />
                {eyebrow && (
                  <span className="lbl text-sm md:text-base tracking-[0.06em] text-[#C89B3C]">
                    {eyebrow}
                  </span>
                )}
                {code && (
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#7A84C4]">
                    · {code}
                  </span>
                )}
              </div>
              <h1
                className="font-display font-bold tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.95]"
                data-testid="section-title"
              >
                {title}
              </h1>
              {tagline && (
                <p className="mt-8 max-w-2xl text-[#B9BECB] text-base md:text-lg leading-relaxed">
                  {tagline}
                </p>
              )}
            </motion.div>

            {hero && <div className="lg:col-span-5">{hero}</div>}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.12 }}
          >
            {children}
          </motion.div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
