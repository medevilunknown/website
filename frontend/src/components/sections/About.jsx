import React from "react";
import SectionShell from "../SectionShell";

const TIMELINE = [
  { y: "2024", t: "Signal", d: "A small team begins prototyping a coach-as-daemon. First proof that gameplay is data, not just entertainment." },
  { y: "2025", t: "Nexus", d: "The AI workstation takes shape — chat, IDE, terminal, voice, and multi-model routing in one sovereign environment." },
  { y: "2026", t: "Engine + Studios", d: "OPYO Engine ships the streaming runtime. OPYO Studios opens as a publishing label — worlds worth living in, engineered with AI-native tools." },
  { y: "soon", t: "PRZMO", d: "Identity, tournaments, marketplace, and community — a portable gamer graph built for the next decade of play." },
];

export default function About({ onClose }) {
  return (
    <SectionShell
      code="OPYO.ABOUT"
      title={
        <>
          Quiet label,<br />
          <span className="text-[#60A5FA] glow-text">loud ambition.</span>
        </>
      }
      tagline="OPYO is an independent gaming ecosystem studio building the infrastructure behind the next generation of worlds."
      onClose={onClose}
    >
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { k: "mission", v: "Give every creator, player, and developer an operating system worthy of their imagination." },
          { k: "approach", v: "AI-native by default. Infrastructure-first. Premium craft at every seam." },
          { k: "stance", v: "We ship slowly and with taste. We prefer tools that disappear, and systems that last." },
        ].map((x) => (
          <div key={x.k} className="glass p-8 relative">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-3">
              {x.k}
            </div>
            <div className="text-[#E8EEF5] text-base md:text-lg leading-relaxed">
              {x.v}
            </div>
          </div>
        ))}
      </div>

      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-6">
        timeline /&gt;
      </div>

      <div className="relative pl-6 md:pl-10">
        <div className="absolute left-0 md:left-2 top-0 bottom-0 w-px bg-[#1E293B]" />
        {TIMELINE.map((e, i) => (
          <div key={i} className="relative mb-10 md:mb-12 last:mb-0">
            <div
              className="absolute -left-[29px] md:-left-[33px] top-1.5 w-3 h-3 bg-[#060708] border border-[#60A5FA]"
              style={{ boxShadow: "0 0 12px #60A5FA" }}
            />
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-2">
              {e.y}
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2">
              {e.t}
            </h3>
            <p className="text-[#8B9BB4] leading-relaxed max-w-2xl">{e.d}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
