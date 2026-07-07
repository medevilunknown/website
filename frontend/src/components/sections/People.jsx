import React from "react";
import SectionShell from "../SectionShell";
import Reveal from "../Reveal";

/**
 * People — the crew. Rendered from local data (no backend dependency), so the
 * page is always resilient and matches the other static sections.
 */
const PEOPLE = [
  { name: "Operator 01", role: "Founder & CEO", bio: "Platform architect." },
  { name: "Operator 02", role: "CTO", bio: "Streaming & infra." },
  { name: "Operator 03", role: "Head of Community", bio: "Campus network." },
  { name: "Operator 04", role: "Head of Platform", bio: "Identity & trust." },
  { name: "Operator 05", role: "Head of Strem0", bio: "Creator tooling." },
  { name: "Operator 06", role: "Design Lead", bio: "Player-first interfaces." },
];

function Avatar({ index }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div
      className="w-full aspect-[4/5] flex items-end p-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, rgba(91,120,255,0.22), transparent 65%), linear-gradient(180deg, #12141d 0%, #0E1016 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 96%, rgba(91,120,255,0.4) 100%), linear-gradient(90deg, transparent 96%, rgba(91,120,255,0.4) 100%)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="lbl absolute top-5 left-5 text-sm text-[#C89B3C]">/{num}</div>
      <span
        className="relative font-display text-[#ECEAF2] glow-text"
        style={{ fontSize: "clamp(64px, 11vw, 140px)", lineHeight: 0.8, letterSpacing: "-0.04em" }}
      >
        {num}
      </span>
    </div>
  );
}

export default function People() {
  return (
    <SectionShell
      code="PPL / 03"
      eyebrow="People"
      title={
        <>
          The<br />
          <span className="text-[#5B78FF] glow-text">operators.</span>
        </>
      }
      tagline="A small crew building the identity backbone of collegiate esports."
      accent="#4E7C7A"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {PEOPLE.map((p, i) => (
          <Reveal key={p.name} index={i % 3} className="group cursor-pointer">
            <div
              data-testid={`person-card-${i}`}
              className="transition-transform duration-300 group-hover:-translate-y-1.5"
            >
              <Avatar index={i} />
              <div className="pt-5 border-t border-[#1E293B] group-hover:border-[#5B78FF] transition-colors">
                <div
                  className="font-display text-xl md:text-2xl text-[#E8EEF5] group-hover:text-[#5B78FF] transition-colors mb-2"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {p.name}
                </div>
                <div className="lbl text-sm text-[#C89B3C]">{p.role}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
