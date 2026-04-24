import React, { useEffect, useState } from "react";
import SectionShell from "../SectionShell";
import { Cpu, Activity, Radio, MessageSquare, Gauge, Sparkles } from "lucide-react";

function AgentLog() {
  const MSGS = [
    { who: "nexus.agent", text: "chat moderation: 12 flagged → 0 escalations" },
    { who: "coach.signal", text: "macro suggestion ready — reposition mid" },
    { who: "overlay.fx", text: "goal detected → triggering cinematic 024" },
    { who: "nexus.agent", text: "scene switched: gameplay → bcr" },
    { who: "viewer.mesh", text: "raid inbound from /opyo.platform/cloud9" },
    { who: "coach.signal", text: "apm +18% vs last session window" },
  ];
  const [n, setN] = useState(3);
  useEffect(() => {
    const t = setInterval(() => setN((v) => Math.min(MSGS.length, v + 1)), 1400);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="font-mono text-[11px] md:text-xs space-y-2">
      {MSGS.slice(0, n).map((m, i) => (
        <div key={i} className="flex gap-3 text-[#8B9BB4]">
          <span className="text-[#60A5FA] shrink-0">{m.who}</span>
          <span className="text-[#1E293B]">›</span>
          <span>{m.text}</span>
        </div>
      ))}
      <div className="text-[#60A5FA] cursor-blink">&nbsp;</div>
    </div>
  );
}

function Waveform() {
  const bars = Array.from({ length: 40 });
  return (
    <div className="flex items-end gap-[3px] h-16">
      {bars.map((_, i) => (
        <div
          key={i}
          className="flex-1 bg-[#3B82F6]"
          style={{
            height: `${20 + Math.abs(Math.sin(i * 0.6)) * 80}%`,
            opacity: 0.3 + (i % 5) * 0.15,
            animation: `pulse-dot ${1 + (i % 7) * 0.15}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Metric({ label, value, unit, hint }) {
  return (
    <div className="hairline p-4 md:p-5 bg-[#0C0E12]/50">
      <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8B9BB4]">
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-display text-3xl md:text-4xl font-bold text-[#E8EEF5]">
          {value}
        </span>
        <span className="font-mono text-xs text-[#60A5FA]">{unit}</span>
      </div>
      <div className="font-mono text-[10px] text-[#8B9BB4] mt-1">{hint}</div>
    </div>
  );
}

export default function Nexus({ onClose }) {
  return (
    <SectionShell
      code="OPYO.NEXUS"
      title={
        <>
          The AI<br />
          <span className="text-[#60A5FA] glow-text">operating system.</span>
        </>
      }
      tagline="A live control surface for creators, streamers, and developers. Nexus is the daemon that turns gameplay into signal, and signal into action."
      onClose={onClose}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
        {/* System status */}
        <div className="lg:col-span-4 glass p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-[#60A5FA]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8EEF5]">
                system
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#60A5FA] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] pulse-dot" /> online
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Metric label="agents" value="07" unit="/active" hint="moderation · coach · fx" />
            <Metric label="latency" value="12" unit="ms" hint="edge → device" />
            <Metric label="viewers" value="42.1k" unit="peak" hint="last 24h" />
            <Metric label="uptime" value="99.98" unit="%" hint="30-day rolling" />
          </div>
        </div>

        {/* Agent feed */}
        <div className="lg:col-span-5 glass p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-[#60A5FA]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8EEF5]">
                agent.feed
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#8B9BB4]">~/live</span>
          </div>
          <AgentLog />
        </div>

        {/* Stream */}
        <div className="lg:col-span-3 glass p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Radio size={16} className="text-[#60A5FA]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8EEF5]">
                stream
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#60A5FA]">◉ rec</span>
          </div>
          <div className="aspect-video bg-[#060708] hairline relative overflow-hidden mb-4">
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-display text-xl font-bold text-[#60A5FA] glow-text">
                  PREVIEW
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B9BB4] mt-1">
                  scene 024 · cinematic
                </div>
              </div>
            </div>
            <div className="sweep absolute inset-0" />
          </div>
          <Waveform />
        </div>

        {/* Overlay + controls */}
        <div className="lg:col-span-7 glass p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#60A5FA]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8EEF5]">
                overlay.director
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["cinematic/024", "alert/raid", "moderation/strict", "chat/thanks", "cut/brb", "caption/auto", "clip/auto", "poll/launch"].map((t, i) => (
              <button
                key={t}
                data-testid={`nexus-action-${i}`}
                className="hairline px-3 py-4 bg-[#0C0E12]/50 text-left hover:border-[#60A5FA] hover:text-[#60A5FA] transition-colors group"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B9BB4] group-hover:text-[#60A5FA]">
                  /{String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-display text-sm mt-1">{t}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Coach */}
        <div className="lg:col-span-5 glass p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Gauge size={16} className="text-[#60A5FA]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8EEF5]">
                coach.signal
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#8B9BB4]">on-device</span>
          </div>
          <div className="space-y-4">
            {[
              { k: "reflex", v: 88 },
              { k: "positioning", v: 74 },
              { k: "macro decisions", v: 62 },
              { k: "tilt resistance", v: 91 },
            ].map((r) => (
              <div key={r.k}>
                <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B9BB4] mb-1">
                  <span>{r.k}</span>
                  <span className="text-[#E8EEF5]">{r.v}</span>
                </div>
                <div className="h-[2px] bg-[#12161D] relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-[#3B82F6]"
                    style={{ width: `${r.v}%`, boxShadow: "0 0 8px #60A5FA" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pseudo-code footer */}
      <div className="mt-8 font-mono text-[11px] md:text-xs text-[#8B9BB4] hairline p-5 bg-[#0C0E12]/40">
        <div><span className="text-[#60A5FA]">function</span> entry() {"{"}</div>
        <div className="pl-4">nexus.attach(stream, chat, overlay);</div>
        <div className="pl-4">nexus.agents.spawn(['coach','mod','director']);</div>
        <div className="pl-4"><span className="text-[#60A5FA]">return</span> system.online;</div>
        <div>{"}"}</div>
      </div>
    </SectionShell>
  );
}
