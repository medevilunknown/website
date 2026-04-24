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

function Initials({ name }) {
  const parts = name.split(" ");
  const letters = (parts[0]?.[0] || "O") + (parts[1]?.[0] || "P");
  return (
    <div
      className="w-full aspect-square flex items-center justify-center font-display text-5xl md:text-6xl font-bold text-[#E8EEF5] glow-text relative"
      style={{
        background:
          "radial-gradient(circle at 50% 35%, rgba(59,130,246,0.25), transparent 60%), linear-gradient(180deg, #0C0E12 0%, #060708 100%)",
      }}
    >
      <div className="absolute inset-0 bg-grid opacity-30" />
      <span className="relative">{letters}</span>
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
      code="OPYO.PEOPLE"
      title={
        <>
          The<br />
          <span className="text-[#60A5FA] glow-text">operators.</span>
        </>
      }
      tagline="A small cell of engineers, designers, and directors. Placeholder identities shown — real crew ships soon."
      onClose={onClose}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {people.map((p, i) => (
          <div
            key={p.id || i}
            data-testid={`person-card-${i}`}
            className="glass relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:glow-border group"
          >
            <div className="absolute top-2 left-2 z-10 font-mono text-[10px] uppercase tracking-[0.25em] text-[#60A5FA]">
              /{String(i + 1).padStart(2, "0")}
            </div>
            <Initials name={p.name} />
            <div className="p-4 md:p-5 hairline-t">
              <div className="font-display text-lg md:text-xl font-semibold leading-tight">
                {p.name}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#60A5FA] mt-1">
                {p.role}
              </div>
              <div className="text-xs md:text-sm text-[#8B9BB4] mt-3 leading-relaxed">
                {p.bio}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
