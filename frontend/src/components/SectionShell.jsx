import React from "react";

/**
 * Minimal section overlay — whisper-thin top bar, generous hero, scrollable below.
 * Close button removed — navigation now lives in the persistent PageNavigator pill.
 */
export default function SectionShell({ code, eyebrow, title, tagline, children }) {
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
        <div className="hidden md:block text-[#8B9BB4]">
          navigate via the pill below
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10 pt-12 md:pt-20 pb-24 md:pb-40">
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
