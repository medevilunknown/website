import React, { useEffect, useState } from "react";
import SectionShell from "../SectionShell";
import {
  MessageSquare,
  Terminal as TerminalIcon,
  Code2,
  Mic,
  Sparkles,
  Cpu,
} from "lucide-react";

/* ---------------- Chat ---------------- */
function ChatPanel() {
  const SEQ = [
    { who: "you", text: "scaffold a websocket broadcast pipeline for opyo.engine" },
    { who: "nexus", text: "routing via Claude Sonnet 4.5 — drafting architecture…" },
    { who: "nexus", text: "added src/broadcast/pipeline.ts • opened in IDE" },
    { who: "you", text: "run it" },
    { who: "nexus", text: "spawning tmux · connecting to sandbox…" },
  ];
  const [n, setN] = useState(2);
  useEffect(() => {
    const t = setInterval(() => setN((v) => Math.min(SEQ.length, v + 1)), 1600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="space-y-3 font-mono text-[11px] md:text-xs">
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
      <div className="text-[#60A5FA] cursor-blink">&nbsp;</div>
    </div>
  );
}

/* ---------------- Code editor ---------------- */
function CodeEditor() {
  const LINES = [
    { n: 1, t: <><span className="text-[#60A5FA]">import</span> {"{"} broadcast {"}"} <span className="text-[#60A5FA]">from</span> <span className="text-[#E8EEF5]">"@opyo/engine"</span>;</> },
    { n: 2, t: "" },
    { n: 3, t: <><span className="text-[#60A5FA]">export async function</span> <span className="text-[#E8EEF5]">pipeline</span>() {"{"}</> },
    { n: 4, t: <>&nbsp;&nbsp;<span className="text-[#8B9BB4]">// route input → transcode → mux → edge</span></> },
    { n: 5, t: <>&nbsp;&nbsp;<span className="text-[#60A5FA]">const</span> stream = <span className="text-[#60A5FA]">await</span> broadcast.connect({"{"}</> },
    { n: 6, t: <>&nbsp;&nbsp;&nbsp;&nbsp;codec: <span className="text-[#E8EEF5]">"av1"</span>,</> },
    { n: 7, t: <>&nbsp;&nbsp;&nbsp;&nbsp;latency: <span className="text-[#E8EEF5]">"ultra"</span>,</> },
    { n: 8, t: <>&nbsp;&nbsp;&nbsp;&nbsp;ai: {"{"} mod: <span className="text-[#60A5FA]">true</span>, partner: <span className="text-[#60A5FA]">true</span> {"}"},</> },
    { n: 9, t: <>&nbsp;&nbsp;{"}"});</> },
    { n: 10, t: <>&nbsp;&nbsp;<span className="text-[#60A5FA]">return</span> stream.mount();</> },
    { n: 11, t: "}" },
  ];
  return (
    <div className="font-mono text-[11px] md:text-xs leading-[1.7] bg-[#060708]/60 hairline overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 hairline-b text-[#8B9BB4] uppercase tracking-[0.25em] text-[10px]">
        <span>pipeline.ts</span>
        <span className="text-[#60A5FA]">● unsaved</span>
      </div>
      <div className="p-3">
        {LINES.map((l) => (
          <div key={l.n} className="flex">
            <span className="w-6 shrink-0 text-[#1E293B] text-right pr-3 select-none">{l.n}</span>
            <span className="text-[#E8EEF5] whitespace-pre">{l.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Terminal ---------------- */
function TerminalPanel() {
  const [lines, setLines] = useState([
    "nexus@opyo:~$ pnpm dev",
    "▲ opyo.engine booting…",
    "  • transcode  ok",
    "  • ai.mod     ok",
    "  • ai.partner ok",
    "▲ ws://edge.opyo.io:443 ready",
  ]);
  useEffect(() => {
    const extras = [
      "  • 42.1k concurrent viewers",
      "  • highlight queued: 0:23 clutch",
      "nexus@opyo:~$",
    ];
    let i = 0;
    const t = setInterval(() => {
      if (i >= extras.length) return clearInterval(t);
      setLines((prev) => [...prev, extras[i++]]);
    }, 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="font-mono text-[11px] md:text-xs leading-[1.6] bg-[#060708]/70 hairline overflow-hidden h-full">
      <div className="flex items-center justify-between px-3 py-2 hairline-b text-[#8B9BB4] uppercase tracking-[0.25em] text-[10px]">
        <span>zsh · /opyo/workspace</span>
        <span className="flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E293B]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E293B]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] pulse-dot" />
        </span>
      </div>
      <div className="p-3 space-y-0.5">
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
    </div>
  );
}

/* ---------------- Voice ---------------- */
function VoicePanel() {
  const bars = Array.from({ length: 24 });
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Mic size={14} className="text-[#60A5FA]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8EEF5]">
          voice.input
        </span>
        <span className="ml-auto font-mono text-[10px] text-[#60A5FA]">listening</span>
      </div>
      <div className="flex items-center gap-[3px] h-10">
        {bars.map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-[#3B82F6]"
            style={{
              height: `${25 + Math.abs(Math.sin(i * 0.7 + 1)) * 75}%`,
              opacity: 0.35 + (i % 4) * 0.2,
              animation: `pulse-dot ${0.9 + (i % 5) * 0.15}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
      <div className="mt-4 font-mono text-[11px] text-[#8B9BB4]">
        <span className="text-[#60A5FA]">"</span>nexus, route the rest of the run to
        claude and draft the patch notes
        <span className="text-[#60A5FA]">"</span>
      </div>
    </div>
  );
}

/* ---------------- Model router ---------------- */
function ModelRouter() {
  const models = [
    { id: "gpt-5.2", load: 46, active: false },
    { id: "claude-sonnet-4.5", load: 82, active: true },
    { id: "gemini-3-pro", load: 19, active: false },
    { id: "local/qwen-32b", load: 33, active: false },
  ];
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Cpu size={14} className="text-[#60A5FA]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8EEF5]">
          model.router
        </span>
      </div>
      <div className="space-y-3">
        {models.map((m) => (
          <div key={m.id}>
            <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#8B9BB4] mb-1">
              <span className={m.active ? "text-[#60A5FA]" : ""}>
                {m.active ? "◉" : "○"} {m.id}
              </span>
              <span className={m.active ? "text-[#E8EEF5]" : ""}>{m.load}%</span>
            </div>
            <div className="h-[2px] bg-[#12161D] relative overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 ${
                  m.active ? "bg-[#3B82F6]" : "bg-[#1E293B]"
                }`}
                style={{
                  width: `${m.load}%`,
                  boxShadow: m.active ? "0 0 8px #60A5FA" : "none",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Tools ---------------- */
function ToolsPanel() {
  const tools = [
    "workspace/open",
    "ide/edit",
    "term/exec",
    "git/commit",
    "ffmpeg/clip",
    "obs/scene",
    "asset/gen",
    "http/fetch",
  ];
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={14} className="text-[#60A5FA]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8EEF5]">
          tools / plugins
        </span>
        <span className="ml-auto font-mono text-[10px] text-[#8B9BB4]">8 installed</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {tools.map((t, i) => (
          <button
            key={t}
            data-testid={`nexus-tool-${i}`}
            className="hairline px-3 py-2.5 bg-[#0C0E12]/50 text-left hover:border-[#60A5FA] hover:text-[#60A5FA] transition-colors"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8B9BB4] group-hover:text-[#60A5FA]">
              /{String(i + 1).padStart(2, "0")}
            </div>
            <div className="font-display text-xs mt-0.5">{t}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Section ---------------- */
export default function Nexus({ onClose }) {
  return (
    <SectionShell
      code="OPYO.NEXUS"
      title={
        <>
          The AI<br />
          <span className="text-[#60A5FA] glow-text">workstation.</span>
        </>
      }
      tagline="A sovereign AI workstation for creators, developers, and streamers — unifying chat, code, streaming, and automation into one intelligent environment."
      onClose={onClose}
    >
      {/* top ribbon */}
      <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B9BB4]">
        {[
          "context-aware chat",
          "integrated ide",
          "terminal",
          "voice control",
          "plugin surface",
          "multi-model routing",
        ].map((t, i) => (
          <div
            key={t}
            className="hairline px-3 py-1.5 bg-[#0C0E12]/50 flex items-center gap-2"
          >
            <span className="text-[#60A5FA]">/{String(i + 1).padStart(2, "0")}</span>
            <span>{t}</span>
          </div>
        ))}
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
        {/* Chat */}
        <div className="lg:col-span-4 glass p-6 relative overflow-hidden" data-testid="nexus-panel-chat">
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare size={14} className="text-[#60A5FA]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8EEF5]">
              chat · context-aware
            </span>
            <span className="ml-auto font-mono text-[10px] text-[#60A5FA]">claude-sonnet-4.5</span>
          </div>
          <ChatPanel />
        </div>

        {/* IDE */}
        <div className="lg:col-span-8 glass p-6 relative overflow-hidden" data-testid="nexus-panel-ide">
          <div className="flex items-center gap-2 mb-5">
            <Code2 size={14} className="text-[#60A5FA]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8EEF5]">
              integrated ide
            </span>
            <span className="ml-auto font-mono text-[10px] text-[#8B9BB4]">ts · eslint ok</span>
          </div>
          <CodeEditor />
        </div>

        {/* Terminal */}
        <div className="lg:col-span-7 glass p-6 relative overflow-hidden" data-testid="nexus-panel-terminal">
          <div className="flex items-center gap-2 mb-5">
            <TerminalIcon size={14} className="text-[#60A5FA]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8EEF5]">
              terminal
            </span>
            <span className="ml-auto font-mono text-[10px] text-[#8B9BB4]">pty · xterm</span>
          </div>
          <TerminalPanel />
        </div>

        {/* Router */}
        <div className="lg:col-span-5 glass p-6 relative overflow-hidden" data-testid="nexus-panel-router">
          <ModelRouter />
        </div>

        {/* Voice */}
        <div className="lg:col-span-5 glass p-6 relative overflow-hidden" data-testid="nexus-panel-voice">
          <VoicePanel />
        </div>

        {/* Tools */}
        <div className="lg:col-span-7 glass p-6 relative overflow-hidden" data-testid="nexus-panel-tools">
          <ToolsPanel />
        </div>
      </div>

      {/* Footer code-as-content */}
      <div className="mt-8 font-mono text-[11px] md:text-xs text-[#8B9BB4] hairline p-5 bg-[#0C0E12]/40">
        <div>
          <span className="text-[#60A5FA]">function</span> nexus(you) {"{"}
        </div>
        <div className="pl-4">attach(chat, ide, term, voice);</div>
        <div className="pl-4">route(you.intent, best.model);</div>
        <div className="pl-4">
          <span className="text-[#60A5FA]">return</span> you.control;
        </div>
        <div>{"}"}</div>
      </div>
    </SectionShell>
  );
}
