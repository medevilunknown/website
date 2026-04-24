import React, { useEffect, useRef, useState } from "react";
import "@/App.css";
import NeuralBackground from "@/components/NeuralBackground";
import HomeCenterPiece from "@/components/HomeCenterPiece";
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

function HUD() {
  const [ts, setTs] = useState(() =>
    new Date().toISOString().replace("T", " ").slice(0, 19)
  );
  useEffect(() => {
    const t = setInterval(
      () => setTs(new Date().toISOString().replace("T", " ").slice(0, 19)),
      1000
    );
    return () => clearInterval(t);
  }, []);
  return (
    <>
      <div className="fixed top-5 md:top-8 left-5 md:left-10 z-30 font-display text-sm md:text-base font-semibold tracking-widest text-[#E8EEF5] select-none">
        OPYO
      </div>
      <div className="fixed top-5 md:top-8 right-5 md:right-10 z-30 font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#8B9BB4] select-none">
        {ts}
      </div>
      <div className="fixed bottom-5 md:bottom-8 left-5 md:left-10 z-30 font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#8B9BB4] select-none">
        four systems · one ecosystem
      </div>
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
          <HomeCenterPiece />
          <HUD />
          <RadialMenu mouse={mouse} onSelect={(k) => setActive(k)} />
          <SoundToggle />
          {ActiveSection && <ActiveSection onClose={() => setActive(null)} />}
        </>
      )}
    </div>
  );
}

export default App;
