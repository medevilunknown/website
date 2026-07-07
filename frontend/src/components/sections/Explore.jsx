import React from "react";
import SectionShell from "../SectionShell";
import { playHover } from "../../hooks/useSound";
import { ArrowUpRight } from "lucide-react";

/**
 * Explore — the single navigation hub. The only entry point from the home
 * screen: one "Explore" button opens this page, and every other page is
 * reached from here as a big editorial list.
 */
const DESTINATIONS = [
  { key: "vision", n: "01", label: "Vision", desc: "The identity backbone of collegiate esports." },
  { key: "projects", n: "02", label: "Products", desc: "OPYO, Strem0, and the games label." },
  { key: "people", n: "03", label: "People", desc: "The crew building the beast." },
  { key: "about", n: "04", label: "About", desc: "The studio, the story, the stance." },
  { key: "careers", n: "05", label: "Careers", desc: "Build it with us." },
];

export default function Explore({ onSelect }) {
  return (
    <SectionShell
      code="E / 00"
      eyebrow="Explore"
      title={
        <>
          Where to,<br />
          <span className="text-[#60A5FA] glow-text">player?</span>
        </>
      }
      tagline="One signal for everything OPYO — play, streaming, and the people behind it. Pick a destination."
    >
      <div>
        {DESTINATIONS.map((d) => (
          <button
            key={d.key}
            data-testid={`explore-item-${d.key}`}
            onMouseEnter={playHover}
            onClick={() => onSelect?.(d.key)}
            className="w-full text-left group border-t border-[#1E293B] hover:border-[#60A5FA] transition-colors py-8 md:py-10 grid grid-cols-12 gap-4 md:gap-8 items-center"
          >
            <div className="col-span-2 md:col-span-1 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#8B9BB4]">
              /{d.n}
            </div>
            <div className="col-span-10 md:col-span-5">
              <span
                className="font-display font-semibold tracking-tighter text-4xl md:text-6xl lg:text-7xl text-[#E8EEF5] group-hover:text-[#60A5FA] group-hover:glow-text transition-colors duration-300"
                style={{ letterSpacing: "-0.03em" }}
              >
                {d.label}
              </span>
            </div>
            <div className="hidden md:block col-span-5 text-[#8B9BB4] text-sm md:text-base">
              {d.desc}
            </div>
            <div className="col-span-12 md:col-span-1 flex justify-start md:justify-end">
              <ArrowUpRight
                size={24}
                className="text-[#8B9BB4] group-hover:text-[#60A5FA] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300"
              />
            </div>
          </button>
        ))}
        <div className="border-t border-[#1E293B]" />
      </div>
    </SectionShell>
  );
}
