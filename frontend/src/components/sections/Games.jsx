import React from "react";
import SectionShell from "../SectionShell";
import OppyMark from "../OppyMark";
import Reveal from "../Reveal";
import { ArcadeArt } from "../HeroArt";
import { LINKS } from "../../lib/links";
import { BRAND, BackToProducts, BrandCard, CTALink } from "../BrandBits";

const PIPELINE = [
  ["01", "Student studios", "Campus teams with a prototype and something to prove."],
  ["02", "Incubation", "Mentorship, tooling, and playtesting inside the OPYO network."],
  ["03", "Funding", "We back the promising ones — from demo to vertical slice."],
  ["04", "Distribution", "Launch to a built-in audience of collegiate players."],
];

export default function Games({ onSelect }) {
  return (
    <SectionShell
      code="GAMES · PUBLISHING"
      eyebrow="03 / GAMES"
      title={
        <>
          Made by players,<br />
          <span className="text-[#5B78FF] glow-text">published by OPYO.</span>
        </>
      }
      tagline="Our next chapter: a publishing label backing student studios from campus to launch. Incubation, funding, and distribution for the games our community is already dreaming up."
      accent={BRAND.blood}
      hero={<ArcadeArt />}
    >
      <BackToProducts onSelect={onSelect} />

      {/* Status banner */}
      <BrandCard accent={BRAND.crown} rotate={-0.4} className="mb-16 md:mb-24" style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <OppyMark color={BRAND.light} width={48} style={{ flex: "none" }} />
        <div style={{ flex: 1, minWidth: 220 }}>
          <div className="lbl" style={{ fontSize: 14, color: BRAND.crown }}>Coming soon</div>
          <p className="lbl" style={{ margin: "6px 0 0", fontSize: 20, lineHeight: 1.3, color: BRAND.light }}>
            The label is opening. If your campus crew is building something, we want to see it.
          </p>
        </div>
      </BrandCard>

      {/* Pipeline */}
      <div className="lbl mb-6" style={{ fontSize: 16, color: BRAND.signal }}>Campus to launch</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-16 md:mb-24">
        {PIPELINE.map(([n, t, d], i) => (
          <Reveal key={n} index={i}>
            <div style={{ background: BRAND.panel, border: "1.5px solid rgba(122,138,196,0.16)", padding: 20, minHeight: 190 }}>
              <div className="font-display" style={{ fontSize: 40, color: BRAND.blood }}>{n}</div>
              <div className="lbl" style={{ fontSize: 17, marginTop: 8, color: BRAND.light }}>{t}</div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.5, color: BRAND.muted2 }}>{d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Pitch CTA */}
      <div style={{ background: BRAND.blue, border: `2.5px solid ${BRAND.light}`, padding: "28px 30px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <div className="font-display" style={{ fontSize: 34, color: "#fff", lineHeight: 1 }}>
          Building a game on campus?
        </div>
        <CTALink href={LINKS.contact} accent={BRAND.crown} external={false}>Pitch your game</CTALink>
      </div>
    </SectionShell>
  );
}
