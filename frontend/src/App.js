import React, { useEffect, useRef, useState } from "react";
import "@/App.css";
import NeuralBackground from "@/components/NeuralBackground";
import BootLoader from "@/components/BootLoader";
import RadialMenu from "@/components/RadialMenu";
import SoundToggle from "@/components/SoundToggle";
import Vision from "@/components/sections/Vision";
import Projects from "@/components/sections/Projects";
import People from "@/components/sections/People";
import Nexus from "@/components/sections/Nexus";
import About from "@/components/sections/About";
import Careers from "@/components/sections/Careers";
import { SoundRegistrar } from "@/hooks/useSound";

function HUD({ mouse }) {
  const now = new Date();
  const ts = now.toISOString().replace("T", " ").slice(0, 19);
  return (
    <>
      {/* Top-left */}
      <div className="fixed top-5 left-5 z-30 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#8B9BB4] select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] pulse-dot" />
          <span className="text-[#E8EEF5]">OPYO</span>
          <span className="text-[#1E293B]">//</span>
          <span>studio</span>
        </div>
        <div className="mt-1 text-[#1E293B]">v0.1.0 • core:online</div>
      </div>
      {/* Top-right */}
      <div className="fixed top-5 right-5 z-30 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#8B9BB4] text-right select-none">
        <div>{ts} utc</div>
        <div className="text-[#1E293B] mt-1">
          cursor: {(mouse?.x * 100 | 0)}, {(mouse?.y * 100 | 0)}
        </div>
      </div>
      {/* Bottom-left */}
      <div className="fixed bottom-5 left-5 z-30 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#8B9BB4] select-none">
        <div className="cursor-blink">drag &amp; hold to explore</div>
      </div>
      {/* Corner frames */}
      <div className="pointer-events-none fixed inset-4 z-10 hairline" />
      <div className="pointer-events-none fixed top-4 left-4 w-4 h-4 border-t border-l border-[#60A5FA] z-10" />
      <div className="pointer-events-none fixed top-4 right-4 w-4 h-4 border-t border-r border-[#60A5FA] z-10" />
      <div className="pointer-events-none fixed bottom-4 left-4 w-4 h-4 border-b border-l border-[#60A5FA] z-10" />
      <div className="pointer-events-none fixed bottom-4 right-4 w-4 h-4 border-b border-r border-[#60A5FA] z-10" />
    </>
  );
}

const SECTIONS = {
  vision: Vision,
  projects: Projects,
  people: People,
  nexus: Nexus,
  about: About,
  careers: Careers,
};

function App() {
  const [booted, setBooted] = useState(false);
  const [active, setActive] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // Normalized mouse (-0.5 to 0.5)
  useEffect(() => {
    const onMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setMouse({
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5,
        });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Esc closes section
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ActiveSection = active ? SECTIONS[active] : null;

  return (
    <div className="App">
      <SoundRegistrar />
      {!booted && <BootLoader onDone={() => setBooted(true)} />}
      {booted && (
        <>
          <NeuralBackground />
          <HUD mouse={mouse} />
          <RadialMenu mouse={mouse} onSelect={(k) => setActive(k)} />
          <SoundToggle />
          {ActiveSection && <ActiveSection onClose={() => setActive(null)} />}
        </>
      )}
    </div>
  );
}

export default App;
