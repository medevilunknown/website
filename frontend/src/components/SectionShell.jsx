import React from "react";
import { X } from "lucide-react";
import { playClick } from "../hooks/useSound";

/**
 * Full-screen holographic overlay wrapper for a section.
 * - Top bar with code path + close button
 * - Scrollable content area
 * - Scanlines + grid + glass
 */
export default function SectionShell({ code, title, tagline, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-30 bg-[#060708]/92 backdrop-blur-md flex flex-col"
      data-testid={`section-${code?.toLowerCase?.().replace(/\W+/g, "-")}`}
    >
      {/* top bar */}
      <div className="flex items-center justify-between px-4 md:px-10 py-4 hairline-b font-mono text-[10px] md:text-xs uppercase tracking-[0.22em] text-[#8B9BB4]">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] pulse-dot" />
          <span className="hidden sm:inline">opyo.ecosystem</span>
          <span className="text-[#1E293B]">//</span>
          <span className="text-[#E8EEF5]">{code}</span>
        </div>
        <button
          onClick={() => {
            playClick();
            onClose?.();
          }}
          data-testid="section-close-button"
          className="flex items-center gap-2 hover:text-[#60A5FA] transition-colors group"
        >
          <span className="hidden md:inline">[ close ]</span>
          <X size={14} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full px-5 md:px-10 py-10 md:py-16">
          {/* section header */}
          <div className="mb-10 md:mb-16">
            <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#60A5FA] mb-4">
              &gt; render({code})
            </div>
            <h1
              className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05]"
              data-testid="section-title"
            >
              {title}
            </h1>
            {tagline && (
              <p className="mt-5 max-w-3xl text-[#8B9BB4] text-base md:text-lg leading-relaxed">
                {tagline}
              </p>
            )}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
