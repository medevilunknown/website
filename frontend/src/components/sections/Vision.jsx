import React from "react";
import SectionShell from "../SectionShell";

export default function Vision({ onClose }) {
  return (
    <SectionShell
      code="OPYO.VISION"
      title={
        <>
          We build<br />
          <span className="text-[#60A5FA] glow-text">ecosystems.</span>
        </>
      }
      tagline="The operating system for games, creators, and players. Four systems. One ecosystem. OPYO is the connective tissue between the next billion players and the infrastructure that holds their worlds together."
      onClose={onClose}
    >
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="glass p-8 md:p-10 relative scanlines overflow-hidden">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-4">
            thesis / 01
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3">
            Platforms are not products.
          </h3>
          <p className="text-[#8B9BB4] leading-relaxed">
            Gaming is entering a post-title era. Identity, tools, and audiences
            travel across worlds. We build for the seams — the invisible layer
            that binds creation, play, and community.
          </p>
        </div>

        <div className="glass p-8 md:p-10 relative scanlines overflow-hidden">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-4">
            thesis / 02
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3">
            AI as ambient infrastructure.
          </h3>
          <p className="text-[#8B9BB4] leading-relaxed">
            Agents are not features. They are the new runtime — assisting
            streamers, shaping quests, balancing arenas. OPYO treats AI as the
            utility layer of gaming.
          </p>
        </div>

        <div className="md:col-span-2 glass p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
          <div className="relative">
            <div className="flex items-end justify-between mb-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA]">
                the ecosystem /&gt;
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8EEF5] hidden md:block">
                four systems · one ecosystem
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {[
                {
                  n: "01",
                  t: "Nexus",
                  s: "tools",
                  d: "AI workstation — chat, code, terminal, voice, multi-model routing.",
                },
                {
                  n: "02",
                  t: "Engine",
                  s: "infra",
                  d: "AI streaming infrastructure — broadcast, moderation, smart highlights.",
                },
                {
                  n: "03",
                  t: "PRZMO",
                  s: "platform",
                  d: "Identity, tournaments, marketplace, and community network.",
                },
                {
                  n: "04",
                  t: "Studios",
                  s: "content",
                  d: "Original IPs and selective indie publishing.",
                },
              ].map((x) => (
                <div key={x.n} className="hairline p-6 bg-[#0C0E12]/50">
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-[10px] text-[#8B9BB4]">/{x.n}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#60A5FA]">
                      {x.s}
                    </div>
                  </div>
                  <div className="font-display text-xl md:text-2xl font-semibold mt-2">
                    {x.t}
                  </div>
                  <div className="text-sm text-[#8B9BB4] mt-2 leading-relaxed">
                    {x.d}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
