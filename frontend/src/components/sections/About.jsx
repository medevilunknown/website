import React from "react";
import SectionShell from "../SectionShell";
import Reveal from "../Reveal";
import { OrbitArt } from "../HeroArt";

const TIMELINE = [
  { y: "2025", t: "Campus", d: "First campus tournaments prove the model: play is identity, not just entertainment." },
  { y: "2026", t: "OPYO", d: "The social platform launches — verified Gamer ID, communities, and ranked history." },
  { y: "2026", t: "Strem0", d: "The streaming engine ships: overlays, alerts, and multistream for every creator." },
  { y: "soon", t: "Games", d: "The publishing label opens — funding student studios from campus to launch." },
];

export default function About({ onClose }) {
  return (
    <SectionShell
      code="A / 04"
      eyebrow="About"
      title={
        <>
          Built for players,<br />
          <span className="text-[#60A5FA] glow-text">not platforms.</span>
        </>
      }
      tagline="An independent studio building the identity backbone of collegiate esports in India — the Steam of ranked history crossed with the LinkedIn of gaming careers."
      onClose={onClose}
      accent="#5B78FF"
      hero={<OrbitArt />}
    >
      <div className="grid md:grid-cols-3 gap-10 md:gap-14 mb-24">
        {[
          { k: "Mission", v: "Unify gamers, creators, and competitions into one platform for play, streaming, and reputation — starting on campus." },
          { k: "Approach", v: "Campus-native by default. One verified identity. Premium craft at every seam." },
          { k: "Stance", v: "We hype the player, not ourselves. Wellness first. Systems that last." },
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
            <Reveal key={e.t} index={i}>
              <div className="border-t border-[#1E293B] py-7 md:py-8 grid grid-cols-12 gap-6 items-baseline">
                <div className="col-span-2 md:col-span-1 lbl text-sm text-[#C89B3C]">
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
                <div className="col-span-12 md:col-span-7 text-[#B9BECB] text-base md:text-lg leading-relaxed">
                  {e.d}
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-[#1E293B]" />
        </div>
      </div>
    </SectionShell>
  );
}
