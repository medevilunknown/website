import React, { useState } from "react";
import SectionShell from "../SectionShell";
import { EcosystemArt } from "../HeroArt";
import { LINKS } from "../../lib/links";
import { BRAND, CTALink } from "../BrandBits";
import { playHover, playClick } from "../../hooks/useSound";
import { ArrowRight } from "lucide-react";

const PILLARS = [
  { route: "opyo", n: "01", name: "OPYO", kicker: "Social", accent: BRAND.signal, desc: "The social layer — one verified Gamer ID, campus communities, and ranked history for every player." },
  { route: "strem0", n: "02", name: "Strem0", kicker: "Streaming", accent: BRAND.crown, desc: "The streaming engine — overlays, alerts, and multistream, so any player can go live in a click." },
  { route: "games", n: "03", name: "Games", kicker: "Publishing", accent: BRAND.blood, desc: "The publishing label — backing student studios from campus prototype to full launch." },
];

const LOOP = ["Play", "Stream", "Compete", "Publish"];

function Pillar({ p, onSelect }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      data-testid={`vision-pillar-${p.route}`}
      onMouseEnter={() => {
        setHover(true);
        playHover();
      }}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        playClick();
        onSelect?.(p.route);
      }}
      className="text-left group"
      style={{
        background: BRAND.panel,
        border: `2.5px solid ${hover ? p.accent : "rgba(122,138,196,0.18)"}`,
        padding: 26,
        transition: "border-color 250ms, transform 250ms",
        transform: hover ? "translateY(-4px)" : "none",
      }}
    >
      <div className="flex items-baseline justify-between">
        <span className="font-display" style={{ fontSize: 30, color: p.accent }}>{p.n}</span>
        <span className="lbl" style={{ fontSize: 13, color: BRAND.blueMuted }}>{p.kicker}</span>
      </div>
      <div className="font-display" style={{ fontSize: 48, lineHeight: 1, marginTop: 12, color: BRAND.light }}>
        {p.name}
      </div>
      <p style={{ margin: "12px 0 0", fontSize: 15.5, lineHeight: 1.55, color: BRAND.muted2 }}>{p.desc}</p>
      <div className="lbl mt-5 inline-flex items-center gap-2" style={{ fontSize: 14, color: hover ? p.accent : BRAND.blueMuted }}>
        Enter <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
}

export default function Vision({ onSelect }) {
  return (
    <SectionShell
      code="V / 01"
      eyebrow="Vision"
      title={
        <>
          We build the<br />
          <span className="text-[#5B78FF] glow-text">gaming ecosystem.</span>
        </>
      }
      tagline="OPYO STUDIO is building one connected home for play, streaming, and publishing — where a student in a dorm room and a pro on stage share the same identity, the same tools, and the same stage."
      accent={BRAND.signal}
      hero={<EcosystemArt />}
    >
      {/* Manifesto */}
      <div className="max-w-4xl mb-16 md:mb-24">
        <div className="lbl mb-5" style={{ fontSize: 15, color: BRAND.crown }}>The thesis</div>
        <p className="font-display" style={{ fontSize: "clamp(26px,4vw,44px)", lineHeight: 1.12, color: BRAND.light }}>
          Gaming is fragmented across a dozen apps that don't talk to each other. We're stitching them into one
          ecosystem — <span style={{ color: BRAND.signal }}>play</span>, <span style={{ color: BRAND.crown }}>stream</span>,
          and <span style={{ color: BRAND.blood }}>publish</span> — under a single verified identity.
        </p>
      </div>

      {/* Three pillars → product pages */}
      <div className="lbl mb-6" style={{ fontSize: 16, color: BRAND.signal }}>Three products. One ecosystem.</div>
      <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-16 md:mb-24">
        {PILLARS.map((p) => (
          <Pillar key={p.route} p={p} onSelect={onSelect} />
        ))}
      </div>

      {/* Ecosystem loop */}
      <div className="lbl mb-6" style={{ fontSize: 16, color: BRAND.crown }}>The loop</div>
      <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-16 md:mb-24">
        {LOOP.map((step, i) => (
          <React.Fragment key={step}>
            <span
              className="font-display"
              style={{ fontSize: "clamp(22px,3vw,34px)", color: BRAND.light, border: "2px solid rgba(122,138,196,0.25)", padding: "10px 22px" }}
            >
              {step}
            </span>
            {i < LOOP.length - 1 && <ArrowRight size={22} style={{ color: BRAND.blueMuted }} />}
          </React.Fragment>
        ))}
        <span className="lbl" style={{ fontSize: 14, color: BRAND.blueMuted, marginLeft: 6 }}>…and the crowns compound.</span>
      </div>

      {/* Closing statement */}
      <div style={{ background: BRAND.blue, border: `2.5px solid ${BRAND.light}`, padding: "28px 30px" }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <p className="lbl" style={{ margin: 0, fontSize: "clamp(20px,3vw,30px)", lineHeight: 1.25, color: "#fff", maxWidth: "42rem" }}>
          We're not a gaming platform. We're the ecosystem a generation of players will grow up inside.
        </p>
        <CTALink href={LINKS.opyo} accent={BRAND.crown}>Enter opyo.in</CTALink>
      </div>
    </SectionShell>
  );
}
