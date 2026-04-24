import React from "react";
import SectionShell from "../SectionShell";

const PILLARS = [
  { n: "01", t: "Nexus", s: "Tools" },
  { n: "02", t: "Engine", s: "Infrastructure" },
  { n: "03", t: "PRZMO", s: "Platform" },
  { n: "04", t: "Studios", s: "Content" },
];

export default function Vision({ onClose }) {
  return (
    <SectionShell
      code="V / 01"
      eyebrow="Vision"
      title={
        <>
          We build<br />
          <span className="text-[#60A5FA] glow-text">ecosystems.</span>
        </>
      }
      tagline="The operating system for games, creators, and players. Four systems. One ecosystem."
      onClose={onClose}
    >
      <div className="grid md:grid-cols-4 gap-8 md:gap-10 pt-4">
        {PILLARS.map((p, i) => (
          <div key={p.n} className="border-t border-[#1E293B] pt-6 group">
            <div className="flex items-baseline justify-between mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA]">
                /{p.n}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B9BB4]">
                {p.s}
              </span>
            </div>
            <div
              className="font-display text-4xl md:text-5xl font-semibold text-[#E8EEF5] group-hover:text-[#60A5FA] transition-colors duration-300"
              style={{ letterSpacing: "-0.02em" }}
            >
              {p.t}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
