import { useCallback, useEffect, useRef } from "react";

/**
 * Web Audio API-based UI sounds — zero file assets.
 * Honors a global mute flag via window.__OPYO_MUTE__ (toggled from SoundToggle).
 */
export default function useSound() {
  const ctxRef = useRef(null);

  const ensureCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) ctxRef.current = new AC();
      } catch (e) {
        return null;
      }
    }
    // Resume if suspended (browsers require user gesture)
    if (ctxRef.current?.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const blip = useCallback(
    ({ freq = 800, type = "sine", dur = 0.05, vol = 0.04, slideTo = null } = {}) => {
      if (typeof window !== "undefined" && window.__OPYO_MUTE__) return;
      const ctx = ensureCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, now + dur);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(vol, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + dur + 0.02);
    },
    [ensureCtx]
  );

  const hover = useCallback(() => blip({ freq: 1180, type: "sine", dur: 0.04, vol: 0.025 }), [blip]);
  const click = useCallback(
    () => blip({ freq: 260, type: "triangle", dur: 0.12, vol: 0.05, slideTo: 110 }),
    [blip]
  );
  const boot = useCallback(() => {
    blip({ freq: 440, type: "sine", dur: 0.06, vol: 0.04 });
    setTimeout(() => blip({ freq: 880, type: "sine", dur: 0.08, vol: 0.04 }), 90);
  }, [blip]);

  return { hover, click, boot };
}

/** Module-level helpers usable from event handlers without react context. */
let _mod = null;
export function _setModule(x) {
  _mod = x;
}
export function playHover() {
  _mod?.hover();
}
export function playClick() {
  _mod?.click();
}

/** Invisible component that registers global helpers. */
export function SoundRegistrar() {
  const s = useSound();
  useEffect(() => {
    _setModule(s);
  }, [s]);
  return null;
}
