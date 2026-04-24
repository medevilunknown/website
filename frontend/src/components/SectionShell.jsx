import React from "react";
import { X } from "lucide-react";
import { playClick } from "../hooks/useSound";

/**
 * Minimal section overlay — much cleaner than before.
 * - Whisper-thin top bar
 * - Big hero area with generous whitespace
 * - Scrollable content below
 */
export default function SectionShell({ code, eyebrow, title, tagline, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-30 bg-[#060708]/95 backdrop-blur-xl flex flex-col"
      data-testid={`section-${code?.toLowerCase?.().replace(/\W+/g, "-")}`}
    >
      <div className="flex items-center justify-between px-5 md:px-10 py-5 font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#8B9BB4]">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] pulse-dot" />
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
          <span className="hidden md:inline">close</span>
          <X size={14} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10 pt-12 md:pt-20 pb-20 md:pb-32">
          <div className="mb-16 md:mb-24 max-w-4xl">
            {eyebrow && (
              <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#60A5FA] mb-6">
                {eyebrow}
              </div>
            )}
            <h1
              className="font-display font-bold tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.95]"
              data-testid="section-title"
            >
              {title}
            </h1>
            {tagline && (
              <p className="mt-8 max-w-2xl text-[#8B9BB4] text-base md:text-lg leading-relaxed">
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
