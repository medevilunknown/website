import React, { useMemo, useState } from "react";
import { playHover, playClick } from "../hooks/useSound";

const ITEMS = [
  { key: "vision", label: "Vision" },
  { key: "projects", label: "Projects" },
  { key: "people", label: "People" },
  { key: "nexus", label: "Nexus" },
  { key: "about", label: "About" },
  { key: "careers", label: "Careers" },
];

export default function RadialMenu({ onSelect, mouse }) {
  const [hovered, setHovered] = useState(null);

  const radius = useMemo(() => {
    if (typeof window === "undefined") return 280;
    const w = window.innerWidth;
    if (w < 640) return 145;
    if (w < 1024) return 210;
    return 290;
  }, []);

  const parX = (mouse?.x || 0) * 14;
  const parY = (mouse?.y || 0) * 14;

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
      data-testid="radial-menu"
    >
      {/* Center label: only visible on mobile where 3D piece is small */}
      <div
        className="absolute pointer-events-none font-display text-xs md:text-sm uppercase tracking-[0.5em] text-[#60A5FA] opacity-70 select-none"
        style={{
          transform: `translate(${parX * 0.4}px, ${parY * 0.4 + radius + 40}px)`,
          transition: "transform 300ms ease-out",
        }}
      >
        drag to rotate
      </div>

      {ITEMS.map((it, i) => {
        const angle = (i / ITEMS.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
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
              transition: "transform 350ms cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <div className="flex flex-col items-center">
              <span
                className={`w-1.5 h-1.5 rounded-full mb-3 transition-all ${
                  isHover
                    ? "bg-[#60A5FA] scale-150"
                    : "bg-[#8B9BB4] group-hover:bg-[#60A5FA]"
                }`}
                style={{ boxShadow: isHover ? "0 0 12px #60A5FA" : "none" }}
              />
              <span
                className={`font-display uppercase tracking-[0.25em] text-xs md:text-sm transition-colors ${
                  isHover ? "text-[#60A5FA] glow-text" : "text-[#E8EEF5]"
                }`}
              >
                {it.label}
              </span>
              <span
                className={`mt-1 h-px bg-[#60A5FA] transition-all duration-300 ${
                  isHover ? "w-8 opacity-100" : "w-0 opacity-0"
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
