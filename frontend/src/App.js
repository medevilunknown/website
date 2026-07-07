import React, { useEffect, useRef, useState } from "react";
import "@/App.css";
import NeuralBackground from "@/components/NeuralBackground";
import HomeCenterPiece from "@/components/HomeCenterPiece";
import IntroAnimation from "@/components/IntroAnimation";
import Logo from "@/components/Logo";
import Vision from "@/components/sections/Vision";
import Projects from "@/components/sections/Projects";
import People from "@/components/sections/People";
import About from "@/components/sections/About";
import Careers from "@/components/sections/Careers";
import Explore from "@/components/sections/Explore";
import OPYO from "@/components/sections/OPYO";
import Strem0 from "@/components/sections/Strem0";
import Games from "@/components/sections/Games";
import OrbitalNav from "@/components/OrbitalNav";
import Socials from "@/components/Socials";
import { SoundRegistrar, playHover, playClick } from "@/hooks/useSound";
import { Compass, Volume2, VolumeX } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Top navigation bar — BITKRAFT-style format: brand on the left, a single
 * navigation control on the right. That control is the "Explore" button, which
 * opens the Explore hub; every other page is reached from there. The brand
 * returns to the home hub.
 */
function TopNav({ active, onHome, onExplore, muted, onToggleMute }) {
  const onExplorePage = active === "explore";
  const glass = {
    backdropFilter: "blur(12px) saturate(140%)",
    WebkitBackdropFilter: "blur(12px) saturate(140%)",
  };
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 md:px-10 py-4 md:py-6 pointer-events-none"
      data-testid="top-nav"
      style={{
        background:
          "linear-gradient(180deg, rgba(14,16,22,0.94) 0%, rgba(14,16,22,0.75) 55%, rgba(14,16,22,0) 100%)",
      }}
    >
      {/* Brand → home hub */}
      <button
        type="button"
        data-testid="nav-brand"
        onMouseEnter={playHover}
        onClick={() => {
          playClick();
          onHome();
        }}
        className="pointer-events-auto flex items-center gap-3 md:gap-4 select-none group"
      >
        <Logo size={44} glow className="text-[#E8EEF5]" />
        <div className="flex flex-col leading-none text-left">
          <span className="font-display text-base md:text-xl tracking-[0.14em] text-[#ECEAF2] group-hover:text-[#5B78FF] transition-colors">
            OPYO STUDIO
          </span>
          <span className="lbl text-[10px] md:text-xs tracking-[0.06em] text-[#7C9CFF] mt-1.5">
            gaming ecosystem
          </span>
        </div>
      </button>

      {/* Nav — on the hub the orbital menu handles navigation, so show social
          redirects there; on a page, show the Explore control back to the menu. */}
      <div className="pointer-events-auto flex items-center gap-2 md:gap-3">
        {active === null ? (
          <Socials className="hidden sm:flex mr-1" />
        ) : (
          <button
            type="button"
            data-testid="nav-explore"
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              if (onExplorePage) onHome();
              else onExplore();
            }}
            className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-full border transition-colors ${
              onExplorePage
                ? "border-[#5B78FF] text-[#5B78FF] bg-[#5B78FF]/10"
                : "border-[#1E293B] text-[#ECEAF2] hover:border-[#5B78FF] hover:text-[#5B78FF]"
            }`}
            style={glass}
          >
            <Compass size={16} />
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em]">
              {onExplorePage ? "Close" : "Explore"}
            </span>
          </button>
        )}
        <button
          type="button"
          data-testid="nav-sound"
          onMouseEnter={playHover}
          onClick={onToggleMute}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-[#1E293B] text-[#9AA0B4] hover:border-[#5B78FF] hover:text-[#5B78FF] transition-colors"
          aria-label={muted ? "Unmute" : "Mute"}
          style={glass}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>
    </header>
  );
}

/** The label at the heart of the ecosystem sphere. */
function HubCore() {
  return (
    <div
      className="fixed inset-0 z-[15] flex items-center justify-center pointer-events-none px-6"
      data-testid="hub-core"
    >
      <div className="flex flex-col items-center text-center">
        <div className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[0.06em] text-[#ECEAF2]">
          OPYO STUDIO
        </div>
        <div
          className="lbl core-pulse text-[#7C9CFF] text-sm md:text-base mt-3"
          style={{ textShadow: "0 0 22px rgba(91,120,255,0.55)" }}
        >
          the gaming ecosystem
        </div>
        <div className="lbl text-[#7A84C4] text-[11px] mt-4 opacity-60">
          pick a node to enter
        </div>
      </div>
    </div>
  );
}

const SECTIONS = {
  explore: Explore,
  vision: Vision,
  projects: Projects,
  opyo: OPYO,
  strem0: Strem0,
  games: Games,
  people: People,
  about: About,
  careers: Careers,
};

function App() {
  const [booted, setBooted] = useState(false);
  const [active, setActive] = useState(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "e" && !active) setActive("explore");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

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
          {!active && <HubCore />}
          {!active && <OrbitalNav onSelect={setActive} />}
          <TopNav
            active={active}
            onHome={() => setActive(null)}
            onExplore={() => setActive("explore")}
            muted={muted}
            onToggleMute={toggleMute}
          />
          <AnimatePresence mode="wait">
            {ActiveSection && (
              <motion.div
                key={active}
                className="fixed inset-0 z-30"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <ActiveSection onSelect={setActive} />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default App;
