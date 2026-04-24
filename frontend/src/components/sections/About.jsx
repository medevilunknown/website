import React from "react";
import SectionShell from "../SectionShell";

const TIMELINE = [
  { y: "2024", t: "Signal", d: "First proof that gameplay is data, not just entertainment." },
  { y: "2025", t: "Nexus", d: "The AI workstation — chat, IDE, terminal, voice, multi-model." },
  { y: "2026", t: "Engine + Studios", d: "Streaming runtime ships. Publishing label opens." },
  { y: "soon", t: "PRZMO", d: "Identity, tournaments, marketplace, community." },
];

export default function About({ onClose }) {
  return (
    <SectionShell
      code="A / 05"
      eyebrow="About"
      title={
        <>
          Quiet label,<br />
          <span className="text-[#60A5FA] glow-text">loud ambition.</span>
        </>
      }
      tagline="An independent studio building the infrastructure behind the next generation of worlds."
      onClose={onClose}
    >
      <div className="grid md:grid-cols-3 gap-10 md:gap-14 mb-24">
        {[
          { k: "Mission", v: "Give every creator, player, and developer an operating system worthy of their imagination." },
          { k: "Approach", v: "AI-native by default. Infrastructure-first. Premium craft at every seam." },
          { k: "Stance", v: "We ship slowly and with taste. Tools that disappear. Systems that last." },
        ].map((x) => (
          <div key={x.k} className="border-t border-[#1E293B] pt-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-5">
              {x.k}
            </div>
            <div
              className="font-display text-2xl md:text-3xl text-[#E8EEF5] leading-[1.15]"
              style={{ letterSpacing: "-0.015em" }}
            >
              {x.v}
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-8">
          Timeline
        </div>
        <div>
          {TIMELINE.map((e, i) => (
            <div
              key={i}
              className="border-t border-[#1E293B] py-7 md:py-8 grid grid-cols-12 gap-6 items-baseline"
            >
              <div className="col-span-2 md:col-span-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA]">
                {e.y}
              </div>
              <div className="col-span-10 md:col-span-4">
                <div
                  className="font-display font-semibold text-2xl md:text-4xl text-[#E8EEF5]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {e.t}
                </div>
              </div>
              <div className="col-span-12 md:col-span-7 text-[#8B9BB4] text-base md:text-lg leading-relaxed">
                {e.d}
              </div>
            </div>
          ))}
          <div className="border-t border-[#1E293B]" />
        </div>
      </div>
    </SectionShell>
  );
}
