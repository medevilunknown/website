import React, { useEffect, useState } from "react";

const LINES = [
  "OPYO.OS v0.2.0",
  "mounting /ecosystem",
  "warming neural mesh",
  "ready",
];

export default function BootLoader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [line, setLine] = useState(0);

  useEffect(() => {
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 6 + 3;
      if (p >= 100) {
        p = 100;
        clearInterval(tick);
        setTimeout(() => onDone?.(), 380);
      }
      setPct(Math.floor(p));
    }, 110);
    return () => clearInterval(tick);
  }, [onDone]);

  useEffect(() => {
    const t = setInterval(
      () => setLine((n) => (n + 1 >= LINES.length ? n : n + 1)),
      700
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#060708] text-[#E8EEF5] flex flex-col"
      data-testid="boot-loader"
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-5 font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#8B9BB4]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] pulse-dot" />
          <span className="text-[#E8EEF5]">OPYO</span>
        </div>
        <button
          data-testid="boot-skip-button"
          onClick={() => onDone?.()}
          className="hover:text-[#60A5FA] transition-colors"
        >
          skip
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-3xl">
          <div className="font-display text-[15vw] leading-[0.9] font-bold tracking-tighter select-none">
            O<span className="text-[#60A5FA] glow-text">P</span>Y
            <span className="text-[#60A5FA] glow-text">O</span>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 pb-8 md:pb-10">
        <div className="flex items-end justify-between mb-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#8B9BB4]">
          <span className="text-[#E8EEF5]">{LINES[line]}</span>
          <span className="text-[#E8EEF5]" data-testid="boot-percentage">
            {String(pct).padStart(3, "0")}
          </span>
        </div>
        <div className="relative h-px w-full bg-[#12161D] overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-[#60A5FA]"
            style={{ width: `${pct}%`, boxShadow: "0 0 10px #60A5FA" }}
          />
        </div>
      </div>
    </div>
  );
}
