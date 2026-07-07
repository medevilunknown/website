import React from "react";
import SectionShell from "../SectionShell";
import OppyMark from "../OppyMark";
import Reveal from "../Reveal";
import { SocialGraphArt } from "../HeroArt";
import { LINKS } from "../../lib/links";
import { BRAND, BackToProducts, BrandCard, CTALink } from "../BrandBits";

const FEATURES = [
  ["Verified Gamer ID", "One passport across every title — ranked history that travels with you."],
  ["Campus communities", "Every university a self-run node. Peer-driven, viral, local pride."],
  ["Squads & clubs", "Roll with your crew. Campus-vs-campus, always-on group play."],
  ["Crown economy", "Earn crowns through legit play; pool them to your campus rank."],
];

const TIERS = [
  ["T0", "Guest", "Social login · spectate", "#6B7186"],
  ["T1", "Player", "Uni email · tournaments & crowns", BRAND.signal],
  ["T2", "Verified Player", "Student ID + face match · seeding", BRAND.crown],
  ["T3", "Business ID", "Full KYC · payouts & contracts", BRAND.blood],
];

/** The Gamer ID — the brand's hero surface. */
function GamerIDCard() {
  return (
    <div
      style={{
        background: BRAND.abyss,
        border: `2.5px solid ${BRAND.blue}`,
        padding: 22,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-40%",
          right: "-30%",
          width: "70%",
          height: "120%",
          background: "radial-gradient(circle,rgba(62,91,255,0.3),transparent 62%)",
        }}
      />
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="lbl" style={{ fontSize: 12, color: BRAND.blueMuted }}>GAMER ID</div>
          <div className="font-display" style={{ fontSize: 34, lineHeight: 1, marginTop: 2, color: BRAND.light }}>@nightcrawler</div>
        </div>
        <OppyMark color={BRAND.light} width={44} />
      </div>
      <div style={{ position: "relative", display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        <span className="lbl" style={{ fontSize: 12, padding: "4px 10px", background: BRAND.crown, color: BRAND.ink }}>T2 · VERIFIED</span>
        <span className="lbl" style={{ fontSize: 12, padding: "4px 10px", border: "1.5px solid rgba(122,138,196,0.5)", color: "#C7D0FF" }}>DIAMOND II</span>
      </div>
      <div style={{ position: "relative", display: "flex", gap: 20, marginTop: 18, flexWrap: "wrap" }}>
        <div><div className="font-display" style={{ fontSize: 30, color: BRAND.crown }}>12,480</div><div className="lbl" style={{ fontSize: 11, color: BRAND.blueMuted }}>CROWNS</div></div>
        <div><div className="font-display" style={{ fontSize: 30, color: BRAND.signal }}>47</div><div className="lbl" style={{ fontSize: 11, color: BRAND.blueMuted }}>WIN STREAK</div></div>
        <div><div className="font-display" style={{ fontSize: 30, color: BRAND.light }}>#3</div><div className="lbl" style={{ fontSize: 11, color: BRAND.blueMuted }}>CAMPUS RANK</div></div>
      </div>
    </div>
  );
}

export default function OPYO({ onSelect }) {
  return (
    <SectionShell
      code="OPYO · SOCIAL"
      eyebrow="01 / OPYO"
      title={
        <>
          The social<br />
          <span className="text-[#5B78FF] glow-text">layer for gamers.</span>
        </>
      }
      tagline="One verified profile for play, competition, and reputation — a feed built for players, not platforms. The Steam of ranked history crossed with the LinkedIn of gaming careers."
      accent={BRAND.signal}
      hero={<SocialGraphArt />}
    >
      <BackToProducts onSelect={onSelect} />

      <div className="flex flex-wrap items-center gap-4 mb-14 md:mb-20">
        <CTALink href={LINKS.opyo} accent={BRAND.signal}>Launch OPYO · opyo.in</CTALink>
        <span className="lbl text-[#7A84C4] text-sm">live now · free for students</span>
      </div>

      {/* Hero: Gamer ID card + verified pitch */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start mb-16 md:mb-24">
        <GamerIDCard />
        <BrandCard accent={BRAND.crown} rotate={0.4} style={{ padding: 24 }}>
          <div className="lbl" style={{ fontSize: 18, color: BRAND.crown }}>Verified reputation</div>
          <p style={{ margin: "10px 0 16px", fontSize: 17, lineHeight: 1.55, color: BRAND.light }}>
            We're not just a gaming platform — we're the verified reputation layer for a generation of players. Every match, every clutch, every crown: on the record.
          </p>
          <CTALink href={LINKS.opyo} accent={BRAND.crown} variant="ghost">Claim your Gamer ID</CTALink>
        </BrandCard>
      </div>

      {/* Feature grid */}
      <div className="lbl mb-6" style={{ fontSize: 16, color: BRAND.signal }}>What you get</div>
      <div className="grid md:grid-cols-2 gap-4 md:gap-5 mb-16 md:mb-24">
        {FEATURES.map(([t, d], i) => (
          <div
            key={t}
            style={{ background: BRAND.panel2, border: "1.5px solid rgba(122,138,196,0.14)", padding: "20px 22px" }}
          >
            <div className="font-display" style={{ fontSize: 28, color: BRAND.signal }}>
              0{i + 1}
            </div>
            <div className="lbl" style={{ fontSize: 17, marginTop: 4, color: BRAND.light }}>{t}</div>
            <p style={{ margin: "6px 0 0", fontSize: 15, lineHeight: 1.5, color: BRAND.muted2 }}>{d}</p>
          </div>
        ))}
      </div>

      {/* Tier ladder */}
      <div className="lbl mb-6" style={{ fontSize: 16, color: BRAND.crown }}>Tier architecture</div>
      <div className="flex flex-col gap-3">
        {TIERS.map(([t, name, desc, border]) => (
          <div
            key={t}
            style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", background: BRAND.panel, borderLeft: `4px solid ${border}` }}
          >
            <span className="font-display" style={{ fontSize: 26, width: 46, color: border }}>{t}</span>
            <div style={{ flex: 1 }}>
              <div className="lbl" style={{ fontSize: 16, color: BRAND.light }}>{name}</div>
              <div style={{ fontSize: 14, color: BRAND.muted2 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
