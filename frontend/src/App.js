import React, { useEffect, useRef, useState } from "react";
import "@/App.css";
import NeuralBackground from "@/components/NeuralBackground";
import HomeCenterPiece from "@/components/HomeCenterPiece";
import IntroAnimation from "@/components/IntroAnimation";
import RadialMenu from "@/components/RadialMenu";
import PageNavigator from "@/components/PageNavigator";
import Logo from "@/components/Logo";
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
      <div
        className="fixed top-5 md:top-8 left-5 md:left-10 z-30 flex items-center gap-4 select-none"
        data-testid="hud-brand"
      >
        <Logo size={56} glow className="text-[#E8EEF5]" />
        <div className="flex flex-col leading-none">
          <span className="font-display text-lg md:text-xl font-bold tracking-[0.22em] text-[#E8EEF5]">
            OPYO
          </span>
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[#60A5FA] mt-1.5">
            studio
          </span>
        </div>
      </div>
      <div className="fixed top-5 md:top-8 right-5 md:right-10 z-30 font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#8B9BB4] select-none">
        {ts}
      </div>
      <div className="fixed bottom-5 md:bottom-8 left-5 md:left-10 z-30 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.28em] text-[#8B9BB4] select-none max-w-[160px] md:max-w-none">
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
  const [muted, setMuted] = useState(false);
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
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setActive((a) => {
          const order = ["vision", "projects", "people", "nexus", "about", "careers"];
          if (a == null) return order[0];
          return order[(order.indexOf(a) + 1) % order.length];
        });
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setActive((a) => {
          const order = ["vision", "projects", "people", "nexus", "about", "careers"];
          if (a == null) return order[order.length - 1];
          return order[(order.indexOf(a) - 1 + order.length) % order.length];
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      if (typeof window !== "undefined") window.__OPYO_MUTE__ = next;
      return next;
    });
  };

  const ActiveSection = active ? SECTIONS[active] : null;

  return (
    <div className="App">
      <SoundRegistrar />
      {!booted && <IntroAnimation onDone={() => setBooted(true)} />}
      {booted && (
        <>
          <NeuralBackground />
          {!active && <HomeCenterPiece />}
          <HUD />
          {!active && <RadialMenu mouse={mouse} onSelect={(k) => setActive(k)} />}
          {ActiveSection && <ActiveSection />}
          <PageNavigator
            active={active}
            onSelect={setActive}
            muted={muted}
            onToggleMute={toggleMute}
          />
        </>
      )}
    </div>
  );
}

export default App;
