import React, { useMemo, useState } from "react";
import {
  Eye,
  LayoutGrid,
  Users,
  Cpu,
  Info,
  Briefcase,
} from "lucide-react";
import { playHover, playClick } from "../hooks/useSound";

const ITEMS = [
  { key: "vision", label: "Vision", Icon: Eye, code: "00" },
  { key: "projects", label: "Projects", Icon: LayoutGrid, code: "01" },
  { key: "people", label: "People", Icon: Users, code: "02" },
  { key: "nexus", label: "Nexus", Icon: Cpu, code: "03" },
  { key: "about", label: "About", Icon: Info, code: "04" },
  { key: "careers", label: "Careers", Icon: Briefcase, code: "05" },
];

export default function RadialMenu({ onSelect, mouse }) {
  const [hovered, setHovered] = useState(null);

  // Responsive radius — stays inside viewport
  const radius = useMemo(() => {
    if (typeof window === "undefined") return 240;
    const w = window.innerWidth;
    if (w < 640) return 130;
    if (w < 1024) return 190;
    return 250;
  }, []);

  const parX = (mouse?.x || 0) * 16;
  const parY = (mouse?.y || 0) * 16;

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
      data-testid="radial-menu"
    >
      {/* Breathing rings */}
      <div
        className="absolute pointer-events-none"
        style={{
          transform: `translate(${parX}px, ${parY}px)`,
          transition: "transform 200ms ease-out",
        }}
      >
        <div
          className="rounded-full border border-[#1E293B]"
          style={{ width: radius * 2 + 80, height: radius * 2 + 80 }}
        />
        <div
          className="absolute inset-0 m-auto rounded-full border border-[#1E293B] animate-spin"
          style={{
            width: radius * 2,
            height: radius * 2,
            top: 40,
            left: 40,
            animationDuration: "40s",
            borderStyle: "dashed",
            opacity: 0.55,
          }}
        />
      </div>

      {/* Center core */}
      <div
        className="absolute flex flex-col items-center justify-center pointer-events-auto"
        style={{
          transform: `translate(${parX * 0.5}px, ${parY * 0.5}px)`,
          transition: "transform 250ms ease-out",
        }}
      >
        <div className="relative">
          <div
            className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full glass flex items-center justify-center relative overflow-hidden glow-border"
            data-testid="radial-menu-core"
          >
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="relative font-display text-3xl md:text-4xl font-bold tracking-tight glow-text">
              OPYO
            </div>
            <div className="absolute bottom-3 left-0 right-0 text-center font-mono text-[9px] uppercase tracking-[0.35em] text-[#60A5FA]">
              core
            </div>
          </div>
          <div className="absolute -top-2 -left-2 w-3 h-3 border-t border-l border-[#60A5FA]" />
          <div className="absolute -top-2 -right-2 w-3 h-3 border-t border-r border-[#60A5FA]" />
          <div className="absolute -bottom-2 -left-2 w-3 h-3 border-b border-l border-[#60A5FA]" />
          <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b border-r border-[#60A5FA]" />
        </div>

        {/* Hint */}
        <div className="mt-8 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#8B9BB4]">
          {hovered ? (
            <span className="text-[#60A5FA]">
              &gt; entering /{hovered}
              <span className="cursor-blink" />
            </span>
          ) : (
            <span>
              select a node
              <span className="cursor-blink" />
            </span>
          )}
        </div>
      </div>

      {/* Orbital items */}
      {ITEMS.map((it, i) => {
        const angle = (i / ITEMS.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const { Icon } = it;
        const isHover = hovered === it.key;
        return (
          <button
            key={it.key}
            data-testid={`radial-menu-item-${it.key}`}
            onMouseEnter={() => {
              setHovered(it.key);
              playHover();
            }}
            onMouseLeave={() => setHovered(null)}
            onClick={() => {
              playClick();
              onSelect?.(it.key);
            }}
            className="absolute pointer-events-auto group"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${x + parX * 0.8}px), calc(-50% + ${
                y + parY * 0.8
              }px))`,
              transition: "transform 300ms cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <div
              className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                isHover ? "scale-110" : "scale-100"
              }`}
            >
              <div
                className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center glass relative ${
                  isHover ? "glow-border" : ""
                }`}
                style={{
                  clipPath:
                    "polygon(14% 0, 86% 0, 100% 14%, 100% 86%, 86% 100%, 14% 100%, 0 86%, 0 14%)",
                }}
              >
                <Icon
                  size={22}
                  className={`transition-colors duration-300 ${
                    isHover ? "text-[#60A5FA]" : "text-[#E8EEF5]"
                  }`}
                />
              </div>
              <div className="flex flex-col items-center leading-tight">
                <span
                  className={`font-display uppercase tracking-[0.18em] text-[11px] md:text-xs transition-colors ${
                    isHover ? "text-[#60A5FA] glow-text" : "text-[#E8EEF5]"
                  }`}
                >
                  {it.label}
                </span>
                <span className="font-mono text-[9px] text-[#8B9BB4] mt-0.5">
                  /{it.code}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
