import React, { useEffect, useRef, useState } from "react";

/**
 * Opening video — plays /brand/opyo-intro.mp4 full-bleed, muted autoplay,
 * then hands off to the main hub via onDone.
 *
 * Keeps the brand header + skip control and a thin progress bar that tracks
 * video.currentTime so the boot feel persists.
 */
export default function IntroAnimation({ onDone }) {
  const videoRef = useRef(null);
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    setTimeout(() => onDone?.(), 420);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onTime = () => {
      if (v.duration > 0) {
        setPct(Math.min(100, Math.floor((v.currentTime / v.duration) * 100)));
      }
    };
    const onEnded = () => finish();

    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnded);

    const playPromise = v.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // autoplay was blocked — fall through on skip
      });
    }

    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#060708] text-[#E8EEF5] flex flex-col transition-opacity duration-500"
      style={{ opacity: leaving ? 0 : 1 }}
      data-testid="intro-animation"
    >
      {/* Video — full-bleed, centered, object-cover */}
      <video
        ref={videoRef}
        src="/brand/opyo-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        data-testid="intro-video"
      />

      {/* Vignette to blend with OS */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(6,7,8,0.55) 100%)",
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 md:px-10 py-5 font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#E8EEF5]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] pulse-dot" />
          <span className="tracking-[0.22em]">OPYO STUDIO</span>
          <span className="text-[#1E293B]">//</span>
          <span className="text-[#8B9BB4]">sequence / intro</span>
        </div>
        <button
          data-testid="boot-skip-button"
          onClick={finish}
          className="text-[#8B9BB4] hover:text-[#60A5FA] transition-colors"
        >
          skip
        </button>
      </div>

      {/* Spacer fills the middle — video is behind */}
      <div className="relative z-10 flex-1 pointer-events-none" />

      {/* Progress */}
      <div className="relative z-10 px-5 md:px-10 pb-8 md:pb-10">
        <div className="flex items-end justify-between mb-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#8B9BB4]">
          <span className="text-[#E8EEF5]">entering ecosystem</span>
          <span className="text-[#E8EEF5]" data-testid="boot-percentage">
            {String(pct).padStart(3, "0")}
          </span>
        </div>
        <div className="relative h-px w-full bg-[#12161D] overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-[#60A5FA]"
            style={{ width: `${pct}%`, boxShadow: "0 0 12px #60A5FA" }}
          />
        </div>
      </div>
    </div>
  );
}
