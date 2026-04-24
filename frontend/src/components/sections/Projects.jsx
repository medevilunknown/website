import React, { useEffect, useState } from "react";
import SectionShell from "../SectionShell";
import { fetchProjects } from "../../lib/api";
import { playHover } from "../../hooks/useSound";
import { ArrowUpRight } from "lucide-react";

const CORE_CODES = ["OPYO.NEXUS", "OPYO.ENGINE", "PRZMO", "OPYO.STUDIOS"];

const FALLBACK = [
  { code: "OPYO.NEXUS", name: "OPYO Nexus", tagline: "AI workstation.", description: "", category: "WORKSTATION", status: "BETA" },
  { code: "OPYO.ENGINE", name: "OPYO Engine", tagline: "AI streaming infrastructure.", description: "", category: "INFRASTRUCTURE", status: "IN_DEV" },
  { code: "PRZMO", name: "PRZMO", tagline: "Identity & network.", description: "", category: "PLATFORM", status: "IN_DEV" },
  { code: "OPYO.STUDIOS", name: "OPYO Studios", tagline: "Games & publishing.", description: "", category: "STUDIO", status: "LIVE" },
];

function Row({ project, index, flagship, hovered, setHovered }) {
  const isHover = hovered === project.code;
  return (
    <div
      data-testid={`project-card-${project.code}`}
      onMouseEnter={() => {
        setHovered(project.code);
        playHover();
      }}
      onMouseLeave={() => setHovered(null)}
      className="border-t border-[#1E293B] group cursor-pointer transition-colors duration-300 hover:border-[#60A5FA] relative"
    >
      <div className="py-8 md:py-10 grid grid-cols-12 gap-4 md:gap-8 items-center">
        <div className="col-span-2 md:col-span-1 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#8B9BB4]">
          /{String(index).padStart(2, "0")}
        </div>
        <div className="col-span-10 md:col-span-5 flex items-center gap-3">
          <span
            className={`font-display font-semibold tracking-tighter transition-colors duration-300 ${
              flagship
                ? "text-3xl md:text-5xl lg:text-6xl"
                : "text-2xl md:text-4xl lg:text-5xl"
            } ${isHover ? "text-[#60A5FA] glow-text" : "text-[#E8EEF5]"}`}
            style={{ letterSpacing: "-0.02em" }}
          >
            {project.name}
          </span>
          {flagship && (
            <span className="hidden md:inline-block font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] border border-[#60A5FA] px-2 py-1">
              flagship
            </span>
          )}
        </div>
        <div className="hidden md:block col-span-4 text-[#8B9BB4] text-sm md:text-base">
          {project.tagline}
        </div>
        <div className="col-span-12 md:col-span-2 flex items-center justify-end gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#8B9BB4]">
          <span className={isHover ? "text-[#60A5FA]" : ""}>{project.status}</span>
          <ArrowUpRight
            size={16}
            className={`transition-all duration-300 ${
              isHover ? "text-[#60A5FA] -translate-y-1 translate-x-1" : ""
            }`}
          />
        </div>
      </div>
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

  const core = CORE_CODES.map((c) =>
    projects.find((p) => p.code === c)
  ).filter(Boolean);
  const experiments = projects.filter((p) => !CORE_CODES.includes(p.code));

  return (
    <SectionShell
      code="P / 02"
      eyebrow="Projects"
      title={
        <>
          Four systems.<br />
          <span className="text-[#60A5FA] glow-text">One ecosystem.</span>
        </>
      }
      tagline="Infrastructure · Platform · Tools · Content. A living catalog of what OPYO is shipping, researching, and inventing."
      onClose={onClose}
    >
      <div className="mb-20">
        <div className="flex items-end justify-between mb-6">
          <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#60A5FA]">
            Core / 01–04
          </div>
          <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#8B9BB4]">
            {core.length} systems
          </div>
        </div>
        <div>
          {core.map((p, i) => (
            <Row
              key={p.code}
              project={p}
              index={i + 1}
              flagship={p.code === "OPYO.NEXUS"}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
          <div className="border-t border-[#1E293B]" />
        </div>
      </div>

      {experiments.length > 0 && (
        <div>
          <div className="flex items-end justify-between mb-6">
            <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#60A5FA]">
              Labs / experiments
            </div>
            <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#8B9BB4]">
              {experiments.length} concepts
            </div>
          </div>
          <div>
            {experiments.map((p, i) => (
              <Row
                key={p.code}
                project={p}
                index={i + 5}
                flagship={false}
                hovered={hovered}
                setHovered={setHovered}
              />
            ))}
            <div className="border-t border-[#1E293B]" />
          </div>
        </div>
      )}
    </SectionShell>
  );
}
