import React from "react";
import { motion } from "framer-motion";
import SectionShell from "../SectionShell";
import OppyMark from "../OppyMark";
import Reveal from "../Reveal";
import { LINKS } from "../../lib/links";
import { BRAND, BackToProducts, CTALink } from "../BrandBits";

/** Animated equalizer — a streaming-native hero visual. */
function EqualizerHero() {
  const bars = Array.from({ length: 28 });
  return (
    <motion.div
      className="relative w-full overflow-hidden"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: 0.12 }}
      style={{ border: `2.5px solid ${BRAND.crown}`, aspectRatio: "4 / 3", background: "radial-gradient(120% 120% at 50% 20%, #1b1c22, #0E1016)" }}
    >
      <div className="absolute top-3 left-4 lbl text-[13px]" style={{ color: BRAND.crown }}>live · on air</div>
      <div className="absolute left-3 top-3 flex items-center gap-2">
        <span className="lbl text-[12px] text-white px-2 py-1" style={{ background: BRAND.blood, opacity: 0 }}>x</span>
      </div>
      <div className="absolute inset-0 flex items-end justify-center gap-[3px] px-6 pb-8">
        {bars.map((_, i) => (
          <motion.span
            key={i}
            style={{ width: 6, background: i % 5 === 0 ? BRAND.crown : BRAND.signal, borderRadius: 2 }}
            animate={{ height: [8, 20 + ((i * 37) % 90), 8] }}
            transition={{ duration: 0.9 + ((i * 13) % 70) / 100, repeat: Infinity, ease: "easeInOut", delay: (i % 7) * 0.08 }}
          />
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 55%, #0E1016 100%)" }} />
    </motion.div>
  );
}

const FEATURES = [
  ["Overlays & scenes", "Drag-and-drop stream design with brand-ready themes."],
  ["Alerts & widgets", "Follower, sub, tip, and raid alerts — fully custom."],
  ["Multistream", "Go live to every platform at once from one dashboard."],
  ["Chat & moderation", "Unified chat box, auto-mod, and commands."],
  ["Tips, donations & merch", "Monetise from minute one — payouts built in."],
  ["Stream analytics", "Retention, peak viewers, and growth in real time."],
  ["Cloud + desktop + mobile", "Stream from anywhere; the studio follows you."],
  ["Themes & templates", "Curated looks that match the OPYO art direction."],
];

const PLATFORMS = ["Twitch", "YouTube", "Kick", "TikTok", "Facebook", "OPYO"];

export default function Strem0({ onSelect }) {
  return (
    <SectionShell
      code="STREM0 · STREAMING"
      eyebrow="02 / STREM0"
      title={
        <>
          Your entire<br />
          <span className="text-[#5B78FF] glow-text">streaming studio.</span>
        </>
      }
      tagline="Everything a creator gets from Streamlabs — and then some — built into OPYO. Overlays, alerts, and multistream, straight from the platform your community already lives on."
      accent={BRAND.crown}
      hero={<EqualizerHero />}
    >
      <BackToProducts onSelect={onSelect} />

      <div className="flex flex-wrap items-center gap-4 mb-14 md:mb-20">
        <CTALink href={LINKS.strem0} accent={BRAND.crown}>Go live · opyo.in</CTALink>
        <span className="lbl text-[#7A84C4] text-sm">beta · built into OPYO</span>
      </div>

      {/* Go-live mock bar */}
      <div
        className="mb-16 md:mb-24"
        style={{ background: BRAND.abyss, border: "2px solid rgba(122,138,196,0.3)", padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}
      >
        <span className="lbl" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#fff", background: BRAND.blood, padding: "5px 11px" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />LIVE
        </span>
        <OppyMark color={BRAND.light} width={24} />
        <span style={{ fontSize: 16, color: BRAND.light }}>Valorant — Campus Grand Final</span>
        <span className="lbl" style={{ marginLeft: "auto", fontSize: 14, color: BRAND.blueMuted }}>18.2K watching</span>
      </div>

      {/* Feature grid */}
      <div className="lbl mb-6" style={{ fontSize: 16, color: BRAND.signal }}>Everything Streamlabs has — and more</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-16 md:mb-24">
        {FEATURES.map(([t, d], i) => (
          <Reveal key={t} index={i % 4}>
            <div style={{ background: BRAND.panel, border: "1.5px solid rgba(122,138,196,0.16)", padding: 18, minHeight: 150 }}>
              <div className="font-display" style={{ fontSize: 24, color: BRAND.crown }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="lbl" style={{ fontSize: 16, marginTop: 6, color: BRAND.light }}>{t}</div>
              <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.45, color: BRAND.muted2 }}>{d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Multistream targets */}
      <div className="lbl mb-6" style={{ fontSize: 16, color: BRAND.crown }}>One click. Every platform.</div>
      <div className="flex flex-wrap gap-3">
        {PLATFORMS.map((p) => (
          <span
            key={p}
            className="font-display"
            style={{ fontSize: 26, color: p === "OPYO" ? BRAND.signal : BRAND.light, border: `2px solid ${p === "OPYO" ? BRAND.signal : "rgba(122,138,196,0.25)"}`, padding: "8px 18px" }}
          >
            {p}
          </span>
        ))}
      </div>
    </SectionShell>
  );
}
