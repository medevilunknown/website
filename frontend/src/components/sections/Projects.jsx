import React, { useEffect, useState } from "react";
import SectionShell from "../SectionShell";
import { fetchProjects } from "../../lib/api";
import { playHover } from "../../hooks/useSound";

const CORE_CODES = ["OPYO.NEXUS", "OPYO.ENGINE", "PRZMO", "OPYO.STUDIOS"];

const FALLBACK = [
  { code: "OPYO.NEXUS", name: "OPYO Nexus", tagline: "AI workstation.", description: "", category: "WORKSTATION", status: "BETA" },
  { code: "OPYO.ENGINE", name: "OPYO Engine", tagline: "AI streaming infrastructure.", description: "", category: "INFRASTRUCTURE", status: "IN_DEV" },
  { code: "PRZMO", name: "PRZMO", tagline: "Identity & network.", description: "", category: "PLATFORM", status: "IN_DEV" },
  { code: "OPYO.STUDIOS", name: "OPYO Studios", tagline: "Games & publishing.", description: "", category: "STUDIO", status: "LIVE" },
];

function StatusPill({ status }) {
  const isLive = status === "LIVE" || status === "BETA";
  return (
    <span
      className={`px-2 py-0.5 border font-mono text-[10px] uppercase tracking-[0.25em] ${
        isLive ? "border-[#60A5FA] text-[#60A5FA]" : "border-[#1E293B] text-[#8B9BB4]"
      }`}
    >
      {status}
    </span>
  );
}

function Corners() {
  return (
    <>
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#60A5FA]" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#60A5FA]" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#60A5FA]" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#60A5FA]" />
    </>
  );
}

/* Flagship Nexus card — spans full width, multi-panel preview strip */
function NexusFlagship({ project, hovered, setHovered }) {
  const isHover = hovered === project.code;
  return (
    <div
      data-testid={`project-card-${project.code}`}
      onMouseEnter={() => {
        setHovered(project.code);
        playHover();
      }}
      onMouseLeave={() => setHovered(null)}
      className={`relative glass p-8 md:p-10 cursor-pointer transition-all duration-300 overflow-hidden ${
        isHover ? "glow-border -translate-y-1" : ""
      }`}
    >
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <Corners />
      <div className="relative grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA]">
              flagship · 01 · {project.code}
            </span>
            <StatusPill status={project.status} />
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-semibold mb-4 leading-[1.05]">
            {project.name}
            <span className="text-[#60A5FA] glow-text">.</span>
          </h3>
          <p className="text-[#E8EEF5] text-base md:text-lg leading-relaxed mb-4">
            {project.tagline}
          </p>
          <p className="text-[#8B9BB4] leading-relaxed max-w-xl">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["chat", "ide", "terminal", "voice", "plugins", "multi-model"].map((t) => (
              <span
                key={t}
                className="hairline px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B9BB4]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Mini multi-panel preview */}
        <div className="lg:col-span-6">
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-3 hairline p-3 bg-[#060708]/60 h-28">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#60A5FA] mb-2">chat</div>
              <div className="font-mono text-[10px] text-[#8B9BB4] space-y-1">
                <div>you › route via claude</div>
                <div className="text-[#E8EEF5]">nexus › drafting…</div>
                <div className="text-[#60A5FA] cursor-blink">&nbsp;</div>
              </div>
            </div>
            <div className="col-span-3 hairline p-3 bg-[#060708]/60 h-28">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#60A5FA] mb-2">ide</div>
              <div className="font-mono text-[10px] space-y-0.5">
                <div><span className="text-[#60A5FA]">const</span> s = broadcast(</div>
                <div className="pl-2 text-[#E8EEF5]">{'"av1"'}, {'"ultra"'}</div>
                <div>);</div>
              </div>
            </div>
            <div className="col-span-4 hairline p-3 bg-[#060708]/60 h-24">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#60A5FA] mb-2">terminal</div>
              <div className="font-mono text-[10px] text-[#8B9BB4] space-y-0.5">
                <div className="text-[#60A5FA]">nexus@opyo:~$ pnpm dev</div>
                <div>▲ engine booting…</div>
                <div>▲ ws://edge ready</div>
              </div>
            </div>
            <div className="col-span-2 hairline p-3 bg-[#060708]/60 h-24">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#60A5FA] mb-2">voice</div>
              <div className="flex items-end gap-[2px] h-10">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[#3B82F6]"
                    style={{
                      height: `${30 + Math.abs(Math.sin(i * 0.8)) * 70}%`,
                      opacity: 0.4 + (i % 3) * 0.2,
                      animation: `pulse-dot ${1 + (i % 4) * 0.15}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B9BB4]">
            <span>the control layer of the opyo ecosystem</span>
            <span className="text-[#60A5FA]">— open nexus →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoreCard({ project, index, hovered, setHovered }) {
  const isHover = hovered === project.code;
  return (
    <div
      data-testid={`project-card-${project.code}`}
      onMouseEnter={() => {
        setHovered(project.code);
        playHover();
      }}
      onMouseLeave={() => setHovered(null)}
      className={`relative glass p-6 md:p-7 cursor-pointer transition-all duration-300 overflow-hidden ${
        isHover ? "glow-border -translate-y-1" : ""
      }`}
      style={{ minHeight: 260 }}
    >
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <Corners />
      <div className="relative flex flex-col h-full">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B9BB4] mb-5">
          <span>0{index}</span>
          <StatusPill status={project.status} />
        </div>
        <div className="font-mono text-[10px] tracking-[0.25em] text-[#60A5FA] mb-2">
          {project.code}
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2">
          {project.name}
        </h3>
        <p className="text-[#8B9BB4] leading-relaxed text-sm">{project.tagline}</p>

        <div
          className={`mt-4 text-sm text-[#E8EEF5] leading-relaxed overflow-hidden transition-all duration-500 ${
            isHover ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {project.description}
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B9BB4]">
          <span>{project.category}</span>
          <span className="text-[#60A5FA]">{isHover ? "— tracing" : "— inspect"}</span>
        </div>
      </div>
    </div>
  );
}

function ExperimentRow({ project, index }) {
  return (
    <div
      data-testid={`project-card-${project.code}`}
      className="hairline bg-[#0C0E12]/40 p-5 flex items-start justify-between gap-4 hover:border-[#60A5FA] hover:bg-[#0C0E12]/70 transition-colors group"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B9BB4] mb-2">
          <span>lab/0{index}</span>
          <span className="text-[#1E293B]">//</span>
          <span className="text-[#60A5FA]">{project.code}</span>
        </div>
        <h4 className="font-display text-lg md:text-xl font-semibold">{project.name}</h4>
        <p className="text-[#8B9BB4] text-sm mt-1">{project.tagline}</p>
      </div>
      <StatusPill status={project.status} />
    </div>
  );
}

export default function Projects({ onClose }) {
  const [projects, setProjects] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetchProjects()
      .then((d) => setProjects(d?.length ? d : FALLBACK))
      .catch(() => setProjects(FALLBACK));
  }, []);

  const core = projects.filter((p) => CORE_CODES.includes(p.code));
  const ordered = CORE_CODES.map((c) => core.find((p) => p.code === c)).filter(Boolean);
  const nexus = ordered.find((p) => p.code === "OPYO.NEXUS");
  const otherCore = ordered.filter((p) => p.code !== "OPYO.NEXUS");
  const experiments = projects.filter((p) => !CORE_CODES.includes(p.code));

  return (
    <SectionShell
      code="OPYO.PROJECTS"
      title={
        <>
          Four systems.<br />
          <span className="text-[#60A5FA] glow-text">One ecosystem.</span>
        </>
      }
      tagline="A living catalog of what OPYO is shipping, researching, and inventing. Hover any node to trace it deeper."
      onClose={onClose}
    >
      {/* CORE SYSTEMS */}
      <div className="mb-10 md:mb-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-2">
              // core systems /&gt;
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">
              Infrastructure · Platform · Tools · Content
            </h2>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B9BB4] hidden md:block">
            const core = [{ordered.length}]
          </div>
        </div>

        {nexus && (
          <div className="mb-6">
            <NexusFlagship project={nexus} hovered={hovered} setHovered={setHovered} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {otherCore.map((p, i) => (
            <CoreCard
              key={p.code}
              project={p}
              index={i + 2}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </div>
      </div>

      {/* EXPERIMENTS */}
      {experiments.length > 0 && (
        <div>
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-2">
                // experiments /&gt;
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold">
                Research spikes from OPYO Labs.
              </h2>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B9BB4] hidden md:block">
              labs = [{experiments.length}]
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {experiments.map((p, i) => (
              <ExperimentRow key={p.code} project={p} index={i + 1} />
            ))}
          </div>
        </div>
      )}
    </SectionShell>
  );
}
