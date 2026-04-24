import React, { useEffect, useState } from "react";
import SectionShell from "../SectionShell";

function Chat() {
  const SEQ = [
    { who: "you", text: "scaffold a websocket broadcast pipeline" },
    { who: "nexus", text: "routing via Claude Sonnet 4.5 — drafting…" },
    { who: "nexus", text: "opened src/pipeline.ts" },
    { who: "you", text: "run it" },
    { who: "nexus", text: "connecting sandbox… ready" },
  ];
  const [n, setN] = useState(2);
  useEffect(() => {
    const t = setInterval(() => setN((v) => Math.min(SEQ.length, v + 1)), 1700);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="space-y-2.5 font-mono text-xs">
      {SEQ.slice(0, n).map((m, i) => (
        <div key={i} className="flex gap-3">
          <span
            className={`shrink-0 uppercase tracking-[0.25em] ${
              m.who === "nexus" ? "text-[#60A5FA]" : "text-[#8B9BB4]"
            }`}
          >
            {m.who}
          </span>
          <span className="text-[#1E293B]">›</span>
          <span className={m.who === "nexus" ? "text-[#E8EEF5]" : "text-[#8B9BB4]"}>
            {m.text}
          </span>
        </div>
      ))}
      <div className="text-[#60A5FA] cursor-blink pl-14">&nbsp;</div>
    </div>
  );
}

function Editor() {
  const L = [
    [1, <><span className="text-[#60A5FA]">import</span> {"{"} broadcast {"}"} <span className="text-[#60A5FA]">from</span> <span className="text-[#E8EEF5]">{'"@opyo/engine"'}</span>;</>],
    [2, ""],
    [3, <><span className="text-[#60A5FA]">export async function</span> <span className="text-[#E8EEF5]">pipeline</span>() {"{"}</>],
    [4, <>&nbsp;&nbsp;<span className="text-[#60A5FA]">const</span> stream = <span className="text-[#60A5FA]">await</span> broadcast({"{"}</>],
    [5, <>&nbsp;&nbsp;&nbsp;&nbsp;codec: <span className="text-[#E8EEF5]">{'"av1"'}</span>, latency: <span className="text-[#E8EEF5]">{'"ultra"'}</span>,</>],
    [6, <>&nbsp;&nbsp;&nbsp;&nbsp;ai: {"{"} mod: <span className="text-[#60A5FA]">true</span>, partner: <span className="text-[#60A5FA]">true</span> {"}"},</>],
    [7, <>&nbsp;&nbsp;{"}"});</>],
    [8, <>&nbsp;&nbsp;<span className="text-[#60A5FA]">return</span> stream.mount();</>],
    [9, "}"],
  ];
  return (
    <div className="font-mono text-xs leading-[1.8]">
      {L.map(([n, t]) => (
        <div key={n} className="flex">
          <span className="w-7 shrink-0 text-[#1E293B] text-right pr-3 select-none">
            {n}
          </span>
          <span className="text-[#E8EEF5] whitespace-pre">{t}</span>
        </div>
      ))}
    </div>
  );
}

function Terminal() {
  const [lines, setLines] = useState([
    "nexus@opyo:~$ pnpm dev",
    "▲ engine booting",
    "  transcode   ok",
    "  ai.mod      ok",
    "  ai.partner  ok",
  ]);
  useEffect(() => {
    const extras = [
      "▲ ws://edge.opyo.io ready",
      "  42.1k concurrent viewers",
      "nexus@opyo:~$",
    ];
    let i = 0;
    const t = setInterval(() => {
      if (i >= extras.length) return clearInterval(t);
      setLines((p) => [...p, extras[i++]]);
    }, 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="font-mono text-xs leading-[1.7] space-y-0.5">
      {lines.map((l, i) => (
        <div
          key={i}
          className={
            l.startsWith("nexus@")
              ? "text-[#60A5FA]"
              : l.startsWith("▲")
              ? "text-[#E8EEF5]"
              : "text-[#8B9BB4]"
          }
        >
          {l}
        </div>
      ))}
      <div className="text-[#60A5FA] cursor-blink">&nbsp;</div>
    </div>
  );
}

const FEATURES = [
  "Context-aware chat",
  "Integrated IDE",
  "Terminal",
  "Voice control",
  "Plugin surface",
  "Multi-model routing",
];

export default function Nexus({ onClose }) {
  return (
    <SectionShell
      code="N / 04"
      eyebrow="Nexus · Flagship"
      title={
        <>
          The AI<br />
          <span className="text-[#60A5FA] glow-text">workstation.</span>
        </>
      }
      tagline="Chat, code, streaming, automation — unified into one sovereign environment. Route any task to GPT, Claude, or a local model."
      onClose={onClose}
    >
      {/* Feature list */}
      <div className="border-t border-[#1E293B] mb-20">
        {FEATURES.map((f, i) => (
          <div
            key={f}
            data-testid={`nexus-feature-${i}`}
            className="border-b border-[#1E293B] py-5 md:py-6 flex items-baseline gap-6 md:gap-10 group hover:border-[#60A5FA] transition-colors"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B9BB4] w-10 shrink-0">
              /{String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="font-display font-semibold text-2xl md:text-4xl text-[#E8EEF5] group-hover:text-[#60A5FA] transition-colors"
              style={{ letterSpacing: "-0.02em" }}
            >
              {f}
            </span>
          </div>
        ))}
      </div>

      {/* Three live panels — a lot fewer, a lot calmer */}
      <div className="grid lg:grid-cols-12 gap-px bg-[#1E293B]">
        <div className="lg:col-span-4 bg-[#060708] p-6 md:p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-5">
            chat
          </div>
          <Chat />
        </div>
        <div className="lg:col-span-8 bg-[#060708] p-6 md:p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-5 flex justify-between">
            <span>pipeline.ts</span>
            <span className="text-[#8B9BB4]">ts · eslint ok</span>
          </div>
          <Editor />
        </div>
        <div className="lg:col-span-12 bg-[#060708] p-6 md:p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-5 flex justify-between">
            <span>terminal</span>
            <span className="text-[#8B9BB4]">pty · xterm</span>
          </div>
          <Terminal />
        </div>
      </div>
    </SectionShell>
  );
}
