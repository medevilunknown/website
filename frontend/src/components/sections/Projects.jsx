import React, { useEffect, useState } from "react";
import SectionShell from "../SectionShell";
import { fetchProjects } from "../../lib/api";
import { playHover } from "../../hooks/useSound";

const FALLBACK = [
  { code: "OPYO.NEXUS", name: "Nexus", tagline: "The AI OS for gaming.", description: "", category: "OS", status: "BETA" },
  { code: "OPYO.STUDIO", name: "Studio", tagline: "Publishing label for worlds worth living in.", description: "", category: "STUDIO", status: "LIVE" },
  { code: "OPYO.PLATFORM", name: "Platform", tagline: "Your identity across every game.", description: "", category: "PLATFORM", status: "IN_DEV" },
];

export default function Projects({ onClose }) {
  const [projects, setProjects] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetchProjects()
      .then((d) => setProjects(d?.length ? d : FALLBACK))
      .catch(() => setProjects(FALLBACK));
  }, []);

  return (
    <SectionShell
      code="OPYO.PROJECTS"
      title={
        <>
          Worlds,<br />
          tools, <span className="text-[#60A5FA] glow-text">signals.</span>
        </>
      }
      tagline="A living catalog of what OPYO is shipping, researching, and inventing. Hover any node to trace it deeper."
      onClose={onClose}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B9BB4] mb-4 flex items-center gap-3">
        <span className="text-[#60A5FA]">const</span>
        <span>manifest</span>
        <span className="text-[#60A5FA]">=</span>
        <span>[{projects.length}]</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {projects.map((p, i) => {
          const isHover = hovered === p.code;
          return (
            <div
              key={p.code}
              data-testid={`project-card-${p.code}`}
              onMouseEnter={() => {
                setHovered(p.code);
                playHover();
              }}
              onMouseLeave={() => setHovered(null)}
              className={`relative glass p-6 md:p-8 cursor-pointer transition-all duration-300 overflow-hidden ${
                isHover ? "glow-border -translate-y-1" : ""
              }`}
              style={{ minHeight: 280 }}
            >
              <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
              {/* corner marks */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#60A5FA]" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#60A5FA]" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#60A5FA]" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#60A5FA]" />

              <div className="relative flex flex-col h-full">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B9BB4] mb-6">
                  <span>{String(i + 1).padStart(3, "0")}</span>
                  <span
                    className={`px-2 py-0.5 border ${
                      p.status === "LIVE"
                        ? "border-[#60A5FA] text-[#60A5FA]"
                        : "border-[#1E293B]"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <div className="font-mono text-[10px] tracking-[0.25em] text-[#60A5FA] mb-2">
                  {p.code}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2">
                  {p.name}
                </h3>
                <p className="text-[#8B9BB4] leading-relaxed text-sm flex-1">
                  {p.tagline}
                </p>

                <div
                  className={`mt-6 text-sm text-[#E8EEF5] leading-relaxed overflow-hidden transition-all duration-500 ${
                    isHover ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {p.description}
                </div>

                <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B9BB4]">
                  <span>{p.category}</span>
                  <span className="text-[#60A5FA]">
                    {isHover ? "— tracing" : "— inspect"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
