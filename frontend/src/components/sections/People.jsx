import React, { useEffect, useState } from "react";
import SectionShell from "../SectionShell";
import { fetchPeople } from "../../lib/api";

const FALLBACK = [
  { name: "Operator 01", role: "Founder & CEO", bio: "System architect." },
  { name: "Operator 02", role: "CTO", bio: "Runtime & AI infra." },
  { name: "Operator 03", role: "Head of Studio", bio: "Narrative design." },
  { name: "Operator 04", role: "Head of Platform", bio: "Identity & trust." },
  { name: "Operator 05", role: "Director, Nexus", bio: "Agentic UX." },
  { name: "Operator 06", role: "Design Lead", bio: "Human-system interfaces." },
];

function Avatar({ index }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div
      className="w-full aspect-[4/5] flex items-end p-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, rgba(59,130,246,0.22), transparent 65%), linear-gradient(180deg, #0C0E12 0%, #060708 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 96%, rgba(96,165,250,0.4) 100%), linear-gradient(90deg, transparent 96%, rgba(96,165,250,0.4) 100%)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA]"
      >
        /{num}
      </div>
      <span
        className="relative font-display font-bold text-[#E8EEF5] glow-text"
        style={{ fontSize: "clamp(64px, 11vw, 140px)", lineHeight: 0.8, letterSpacing: "-0.04em" }}
      >
        {num}
      </span>
    </div>
  );
}

export default function People({ onClose }) {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetchPeople()
      .then((d) => setPeople(d?.length ? d : FALLBACK))
      .catch(() => setPeople(FALLBACK));
  }, []);

  return (
    <SectionShell
      code="PPL / 03"
      eyebrow="People"
      title={
        <>
          The<br />
          <span className="text-[#60A5FA] glow-text">operators.</span>
        </>
      }
      tagline="A small cell building the infrastructure behind the ecosystem."
      onClose={onClose}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {people.map((p, i) => (
          <div
            key={p.id || i}
            data-testid={`person-card-${i}`}
            className="group"
          >
            <Avatar index={i} />
            <div className="pt-5 border-t border-[#1E293B] group-hover:border-[#60A5FA] transition-colors">
              <div className="flex items-baseline justify-between mb-2">
                <div
                  className="font-display text-lg md:text-xl font-semibold text-[#E8EEF5]"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {p.name}
                </div>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#60A5FA]">
                {p.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
