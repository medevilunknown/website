import React, { useEffect, useState } from "react";

const ASCII = [
  "    ______   ______   __  __   ______  ",
  "   /\\  __ \\ /\\  == \\ /\\ \\_\\ \\ /\\  __ \\ ",
  "   \\ \\ \\/\\ \\\\ \\  _-/ \\ \\____ \\\\ \\ \\/\\ \\",
  "    \\ \\_____\\\\ \\_\\    \\/\\_____\\\\ \\_____\\",
  "     \\/_____/ \\/_/     \\/_____/ \\/_____/",
];

const LINES = [
  "> OPYO.OS v0.1.0 — init sequence",
  "> verifying signature ................ ok",
  "> mounting /ecosystem .................. ok",
  "> compiling shaders ....... ok",
  "> warming neural mesh ......... ok",
  "> var pagesToLoad = ['vision','projects','people','nexus','about','careers']",
  "> function entry() { system.online = true; }",
];

export default function BootLoader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [visibleLines, setVisibleLines] = useState([]);
  const [asciiRevealed, setAsciiRevealed] = useState(0);

  useEffect(() => {
    let mounted = true;
    // Reveal ascii rows quickly
    ASCII.forEach((_, i) =>
      setTimeout(() => mounted && setAsciiRevealed((n) => n + 1), 120 * i)
    );
    // Stream log lines
    LINES.forEach((ln, i) =>
      setTimeout(() => mounted && setVisibleLines((v) => [...v, ln]), 550 + i * 260)
    );
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 7 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(tick);
        setTimeout(() => onDone?.(), 420);
      }
      setPct(Math.floor(p));
    }, 120);
    return () => clearInterval(tick);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-[#060708] text-[#E8EEF5]"
      data-testid="boot-loader"
    >
      {/* top bar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-4 hairline-b font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#8B9BB4]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] pulse-dot" />
          <span>opyo.system/bootstrap</span>
        </div>
        <button
          data-testid="boot-skip-button"
          onClick={() => onDone?.()}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#8B9BB4] hover:text-[#60A5FA] transition-colors"
        >
          [ skip intro ]
        </button>
      </div>

      {/* body */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-10 py-10 relative">
        {/* ascii logo */}
        <div className="flex items-center">
          <pre className="font-mono text-[10px] sm:text-xs md:text-sm leading-[1.15] text-[#60A5FA] glow-text">
            {ASCII.slice(0, asciiRevealed).join("\n")}
          </pre>
        </div>

        {/* log */}
        <div className="flex flex-col justify-end">
          <div className="font-mono text-[11px] md:text-sm space-y-1 text-[#8B9BB4]">
            {visibleLines.map((l, i) => (
              <div key={i} className={i === visibleLines.length - 1 ? "text-[#E8EEF5]" : ""}>
                {l}
              </div>
            ))}
            <div className="text-[#60A5FA] cursor-blink">&nbsp;</div>
          </div>
        </div>
      </div>

      {/* progress */}
      <div className="px-6 md:px-10 pb-6 md:pb-10">
        <div className="flex items-end justify-between mb-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#8B9BB4]">
          <span>loading ecosystem</span>
          <span className="text-[#E8EEF5]" data-testid="boot-percentage">
            {String(pct).padStart(2, "0")}%
          </span>
        </div>
        <div className="relative h-[2px] w-full bg-[#12161D] overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-[#3B82F6]"
            style={{ width: `${pct}%`, boxShadow: "0 0 12px #60A5FA" }}
          />
        </div>
        <div className="mt-4 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#8B9BB4]">
          <span className="cursor-blink">drag &amp; hold to enter synthetic reality</span>
        </div>
      </div>
    </div>
  );
}
