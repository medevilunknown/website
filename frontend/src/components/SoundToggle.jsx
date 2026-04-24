import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { playClick } from "../hooks/useSound";

export default function SoundToggle() {
  const [muted, setMuted] = useState(false);
  const toggle = () => {
    const next = !muted;
    setMuted(next);
    if (typeof window !== "undefined") window.__OPYO_MUTE__ = next;
    if (!next) playClick();
  };
  return (
    <button
      onClick={toggle}
      data-testid="sound-toggle"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-10 h-10 flex items-center justify-center glass hairline hover:border-[#60A5FA] hover:text-[#60A5FA] transition-colors group"
      title={muted ? "Enable sound" : "Mute sound"}
    >
      {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
  );
}
