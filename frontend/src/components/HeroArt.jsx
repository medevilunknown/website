import React from "react";
import { motion } from "framer-motion";
import OppyMark from "./OppyMark";
import { BRAND } from "./BrandBits";

/**
 * Animated vector hero art — one distinct, motion-driven SVG per page. No raster
 * images; everything is drawn and animated so pages feel alive and on-brand.
 */
function Shell({ accent, label, children }) {
  return (
    <motion.div
      className="relative w-full overflow-hidden"
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
      style={{
        border: `2.5px solid ${accent}`,
        aspectRatio: "4 / 3",
        background: "radial-gradient(120% 120% at 50% 12%, #171a24, #0E1016)",
      }}
    >
      <div className="absolute inset-0 brand-dots opacity-60" aria-hidden />
      {children}
      {label && (
        <div className="lbl absolute bottom-3 left-4 text-[13px]" style={{ color: accent, textShadow: "0 2px 8px #000" }}>
          {label}
        </div>
      )}
    </motion.div>
  );
}

const pulse = (delay = 0) => ({
  animate: { opacity: [0.25, 1, 0.25] },
  transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay },
});

/* OPYO — social graph: nodes light up and connect around a central mark. */
export function SocialGraphArt() {
  const nodes = [
    [70, 70], [175, 45], [320, 68], [355, 165], [300, 250],
    [180, 262], [70, 245], [40, 150],
  ];
  const c = [200, 155];
  return (
    <Shell accent={BRAND.signal} label="the social graph">
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
        {nodes.map(([x, y], i) => (
          <motion.line key={`l${i}`} x1={c[0]} y1={c[1]} x2={x} y2={y} stroke={BRAND.signal} strokeWidth="1.2" {...pulse(i * 0.22)} />
        ))}
        {nodes.map(([x, y], i) => (
          <motion.circle key={`n${i}`} cx={x} cy={y} r={i % 3 === 0 ? 7 : 5} fill={i % 4 === 0 ? BRAND.crown : BRAND.signal} {...pulse(i * 0.3 + 0.4)} />
        ))}
        <circle cx={c[0]} cy={c[1]} r="30" fill="none" stroke={BRAND.signal} strokeWidth="1.4" opacity="0.5" />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <OppyMark color={BRAND.light} width={54} />
      </div>
    </Shell>
  );
}

/* Vision — ecosystem: three product satellites orbit the studio core. */
export function EcosystemArt() {
  const sats = [
    { a: -90, label: "OPYO", color: BRAND.signal },
    { a: 30, label: "STREM0", color: BRAND.crown },
    { a: 150, label: "GAMES", color: BRAND.blood },
  ];
  const R = 92;
  const c = [200, 150];
  return (
    <Shell accent={BRAND.signal} label="one ecosystem">
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
        <circle cx={c[0]} cy={c[1]} r={R} fill="none" stroke="rgba(122,138,196,0.25)" strokeWidth="1" />
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 150px" }}>
          {sats.map((s, i) => {
            const x = c[0] + R * Math.cos((s.a * Math.PI) / 180);
            const y = c[1] + R * Math.sin((s.a * Math.PI) / 180);
            return (
              <g key={i}>
                <line x1={c[0]} y1={c[1]} x2={x} y2={y} stroke={s.color} strokeWidth="1.2" opacity="0.6" />
                <motion.circle cx={x} cy={y} r="12" fill={s.color} {...pulse(i * 0.5)} />
              </g>
            );
          })}
        </motion.g>
        <circle cx={c[0]} cy={c[1]} r="22" fill={BRAND.blue} stroke={BRAND.light} strokeWidth="1.5" />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <OppyMark color={BRAND.light} width={30} />
      </div>
    </Shell>
  );
}

/* Games — an arcade controller with blinking buttons + a roaming d-pad glow. */
export function ArcadeArt() {
  return (
    <Shell accent={BRAND.blood} label="press start">
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
        <rect x="90" y="115" width="220" height="90" rx="45" fill="none" stroke={BRAND.blood} strokeWidth="2.4" />
        {/* d-pad */}
        <rect x="128" y="150" width="14" height="42" rx="3" fill={BRAND.light} opacity="0.85" />
        <rect x="114" y="164" width="42" height="14" rx="3" fill={BRAND.light} opacity="0.85" />
        {/* buttons */}
        {[[262, 150, BRAND.signal, 0], [292, 168, BRAND.crown, 0.4], [262, 186, BRAND.blood, 0.8], [232, 168, BRAND.light, 1.2]].map(([x, y, col, d], i) => (
          <motion.circle key={i} cx={x} cy={y} r="9" fill={col} animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: d }} style={{ transformOrigin: `${x}px ${y}px` }} />
        ))}
      </svg>
      {/* pixel invader marching */}
      <motion.div className="absolute top-7" animate={{ x: [40, 300, 40] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <svg width="34" height="26" viewBox="0 0 11 8" style={{ imageRendering: "pixelated" }}>
          {"00100000100 00010001000 00111111100 01101110110 11111111111 10111111101 10100000101 00011011000".split(" ").map((row, r) =>
            row.split("").map((v, cix) => v === "1" ? <rect key={`${r}-${cix}`} x={cix} y={r} width="1" height="1" fill={BRAND.signal} /> : null)
          )}
        </svg>
      </motion.div>
    </Shell>
  );
}

/* About — the studio core: concentric orbits with a traveling node. */
export function OrbitArt() {
  const c = [200, 150];
  return (
    <Shell accent={BRAND.signal} label="the studio">
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
        {[50, 82, 114].map((r, i) => (
          <circle key={i} cx={c[0]} cy={c[1]} r={r} fill="none" stroke="rgba(122,138,196,0.22)" strokeWidth="1" />
        ))}
        {[50, 82, 114].map((r, i) => (
          <motion.g key={`g${i}`} animate={{ rotate: 360 }} transition={{ duration: 14 + i * 10, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 150px" }}>
            <circle cx={c[0] + r} cy={c[1]} r={i === 1 ? 7 : 5} fill={i === 1 ? BRAND.crown : BRAND.signal} />
          </motion.g>
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <OppyMark color={BRAND.light} width={40} />
      </div>
    </Shell>
  );
}

/* Careers — a terminal with a blinking cursor and typing lines. */
export function TerminalArt() {
  const lines = [
    ["> whoami", BRAND.signal, 200],
    ["opyo-studio · gaming ecosystem", BRAND.muted2, 320],
    ["> open roles", BRAND.signal, 150],
    ["engineering · design · community", BRAND.muted2, 300],
    ["> apply --now", BRAND.crown, 180],
  ];
  return (
    <Shell accent={BRAND.crown} label="join the crew">
      <div className="absolute inset-6 flex flex-col gap-3 justify-center font-mono text-[13px]">
        {lines.map(([t, col, w], i) => (
          <motion.div key={i} className="flex items-center" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.5, duration: 0.4 }}>
            <span style={{ color: col, whiteSpace: "nowrap" }}>{t}</span>
            {i === lines.length - 1 && (
              <motion.span className="ml-1 inline-block" style={{ width: 8, height: 16, background: BRAND.crown }} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
            )}
          </motion.div>
        ))}
      </div>
    </Shell>
  );
}
