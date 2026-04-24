import React from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Home } from "lucide-react";
import { playClick, playHover } from "../hooks/useSound";

/**
 * Bottom page navigator — replaces per-section close buttons.
 * Always visible after boot. Contains:
 *   · prev / next arrows
 *   · 6 dot indicators (click any to jump)
 *   · divider
 *   · home icon (returns to hub)
 *   · sound toggle (moved here from its own corner)
 */
const ORDER = ["vision", "projects", "people", "nexus", "about", "careers"];
const LABELS = {
  vision: "Vision",
  projects: "Projects",
  people: "People",
  nexus: "Nexus",
  about: "About",
  careers: "Careers",
};

export default function PageNavigator({ active, onSelect, muted, onToggleMute }) {
  const idx = active ? ORDER.indexOf(active) : -1;
  const currentLabel = active ? LABELS[active] : "Hub";

  const step = (dir) => {
    let next;
    if (idx === -1) {
      next = dir > 0 ? ORDER[0] : ORDER[ORDER.length - 1];
    } else {
      const n = (idx + dir + ORDER.length) % ORDER.length;
      next = ORDER[n];
    }
    playClick();
    onSelect?.(next);
  };

  const goHub = () => {
    playClick();
    onSelect?.(null);
  };

  return (
    <div
      className="fixed bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
      data-testid="page-navigator"
    >
      <div
        className="flex items-center gap-1 px-2 md:px-3 py-2 rounded-full"
        style={{
          background: "rgba(12,14,18,0.85)",
          backdropFilter: "blur(20px) saturate(150%)",
          WebkitBackdropFilter: "blur(20px) saturate(150%)",
          border: "1px solid rgba(232,238,245,0.1)",
          boxShadow:
            "0 0 0 1px rgba(96,165,250,0.08), 0 20px 40px -12px rgba(0,0,0,0.6), 0 0 24px -8px rgba(96,165,250,0.15)",
        }}
      >
        {/* Prev */}
        <button
          data-testid="nav-prev"
          onMouseEnter={playHover}
          onClick={() => step(-1)}
          className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-[#8B9BB4] hover:text-[#60A5FA] hover:bg-[#60A5FA]/10 transition-colors"
          aria-label="Previous section"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1 px-1 md:px-2">
          {ORDER.map((k) => {
            const on = k === active;
            return (
              <button
                key={k}
                data-testid={`nav-dot-${k}`}
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  onSelect?.(k);
                }}
                className="group relative h-8 flex items-center px-1"
                aria-label={LABELS[k]}
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: on ? 22 : 6,
                    height: 6,
                    background: on ? "#60A5FA" : "#475569",
                    boxShadow: on ? "0 0 10px #60A5FA" : "none",
                  }}
                />
                {/* Tooltip label */}
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[9px] uppercase tracking-[0.28em] text-[#60A5FA]">
                  {LABELS[k]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next */}
        <button
          data-testid="nav-next"
          onMouseEnter={playHover}
          onClick={() => step(1)}
          className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-[#8B9BB4] hover:text-[#60A5FA] hover:bg-[#60A5FA]/10 transition-colors"
          aria-label="Next section"
        >
          <ChevronRight size={16} />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-[#1E293B] mx-1" />

        {/* Current label (hidden on mobile) */}
        <div
          className="hidden md:block px-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#E8EEF5] min-w-[72px] text-center"
          data-testid="nav-current-label"
        >
          {currentLabel}
        </div>

        {/* Home / hub */}
        <button
          data-testid="nav-home"
          onMouseEnter={playHover}
          onClick={goHub}
          className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full transition-colors ${
            active
              ? "text-[#8B9BB4] hover:text-[#60A5FA] hover:bg-[#60A5FA]/10"
              : "text-[#60A5FA] bg-[#60A5FA]/10"
          }`}
          aria-label="Return to hub"
        >
          <Home size={15} />
        </button>

        {/* Sound */}
        <button
          data-testid="nav-sound"
          onMouseEnter={playHover}
          onClick={onToggleMute}
          className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-[#8B9BB4] hover:text-[#60A5FA] hover:bg-[#60A5FA]/10 transition-colors"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>
    </div>
  );
}
