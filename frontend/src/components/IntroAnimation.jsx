import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Logo from "./Logo";

/**
 * Cinematic intro sequence:
 *  0.0–2.0s  warp-speed starfield streaks (camera pushing forward)
 *  1.6–3.5s  warp decelerates, wireframe icosahedron materialises from the center
 *  2.2–…     text reveals: OPYO → Four systems. One ecosystem. → [enter]
 *  5.0s      hand-off to hub
 *
 *  Uses imperative THREE objects only (no R3F JSX primitives) to bypass the
 *  visual-edits babel plugin prop injection.
 */

const DURATION = 5200; // ms

function IntroScene({ progressRef }) {
  const { scene, camera } = useThree();
  const builtRef = useRef(null);

  const built = useMemo(() => {
    // --- Warp streaks (LineSegments) -------------------------------------
    const COUNT = 260;
    const starts = new Float32Array(COUNT * 3);
    const ends = new Float32Array(COUNT * 3);
    const basePos = new Float32Array(COUNT * 3); // store "current z" head
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const r = 0.6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r;
      const z = -Math.random() * 120;
      starts[i * 3] = x;
      starts[i * 3 + 1] = y;
      starts[i * 3 + 2] = z;
      ends[i * 3] = x;
      ends[i * 3 + 1] = y;
      ends[i * 3 + 2] = z;
      basePos[i * 3 + 2] = z;
      speeds[i] = 0.9 + Math.random() * 0.9;
    }
    const segPos = new Float32Array(COUNT * 6);
    const segGeo = new THREE.BufferGeometry();
    segGeo.setAttribute("position", new THREE.BufferAttribute(segPos, 3));
    const segMat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    const streaks = new THREE.LineSegments(segGeo, segMat);

    // --- Orbital ring (replaces the icosahedron — pulses behind the logo) ---
    const ringGeo = new THREE.RingGeometry(2.0, 2.08, 128);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ringA = new THREE.Mesh(ringGeo, ringMat);
    const ringBMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ringB = new THREE.Mesh(
      new THREE.RingGeometry(2.5, 2.55, 128),
      ringBMat
    );
    ringB.rotation.x = 0.4;
    ringB.rotation.y = 0.2;

    const ringGroup = new THREE.Group();
    ringGroup.add(ringA);
    ringGroup.add(ringB);

    // central flare point
    const flareGeo = new THREE.BufferGeometry();
    flareGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3)
    );
    const flareMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.8,
      transparent: true,
      opacity: 1,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const flare = new THREE.Points(flareGeo, flareMat);

    return {
      streaks,
      segPos,
      starts,
      ends,
      basePos,
      speeds,
      COUNT,
      ringGroup,
      ringMat,
      ringBMat,
      flare,
      flareMat,
    };
  }, []);

  useEffect(() => {
    scene.add(built.streaks);
    scene.add(built.ringGroup);
    scene.add(built.flare);
    builtRef.current = built;
    return () => {
      scene.remove(built.streaks);
      scene.remove(built.ringGroup);
      scene.remove(built.flare);
    };
  }, [scene, built]);

  useFrame((state, delta) => {
    const b = builtRef.current;
    if (!b) return;
    const p = progressRef.current; // 0 → 1

    // Warp speed fades after 40% (decelerating)
    const warpIntensity = Math.max(0, 1 - p * 2.2);
    const warpSpeed = 0.35 + warpIntensity * 1.5;

    // Move streak heads forward along z; tail is behind by speed*streakLen
    const streakLen = 3 + warpIntensity * 9;
    for (let i = 0; i < b.COUNT; i++) {
      b.basePos[i * 3 + 2] += b.speeds[i] * warpSpeed;
      if (b.basePos[i * 3 + 2] > 6) {
        b.basePos[i * 3 + 2] = -120;
      }
      const z = b.basePos[i * 3 + 2];
      const x = b.starts[i * 3];
      const y = b.starts[i * 3 + 1];
      // segment from (x,y,z-streakLen) → (x,y,z)
      b.segPos[i * 6] = x;
      b.segPos[i * 6 + 1] = y;
      b.segPos[i * 6 + 2] = z - streakLen;
      b.segPos[i * 6 + 3] = x;
      b.segPos[i * 6 + 4] = y;
      b.segPos[i * 6 + 5] = z;
    }
    b.streaks.geometry.attributes.position.needsUpdate = true;
    b.streaks.material.opacity = 0.1 + warpIntensity * 0.9;

    // Camera gentle zoom
    const camZ = 12 - p * 2.5;
    camera.position.z = camZ;

    // Ring halo assembly: fades in 0.28 → 0.65, pulses, rotates
    const t1 = Math.min(1, Math.max(0, (p - 0.28) / 0.37));
    const scale = t1 * t1 * (3 - 2 * t1); // smoothstep
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.05;
    b.ringGroup.scale.setScalar(scale * pulse);

    b.ringGroup.rotation.z += delta * 0.25;
    b.ringGroup.children[1].rotation.z -= delta * 0.18;

    b.ringMat.opacity = Math.min(1, t1 * 1.4) * 0.55;
    b.ringBMat.opacity =
      Math.min(1, Math.max(0, (p - 0.45) / 0.3)) * 0.35;

    // flare bright at start, fades out as ring materialises
    const flareAmt = Math.max(0, 1 - p * 2.2);
    b.flareMat.opacity = flareAmt;
    b.flareMat.size = 0.4 + flareAmt * 2.2;

    // Fade everything near the end
    const endFade = Math.max(0, Math.min(1, (p - 0.88) / 0.12));
    if (endFade > 0) {
      b.ringMat.opacity *= 1 - endFade;
      b.ringBMat.opacity *= 1 - endFade;
      b.streaks.material.opacity *= 1 - endFade;
      b.flareMat.opacity *= 1 - endFade;
    }
  });

  return null;
}

export default function IntroAnimation({ onDone }) {
  const [pct, setPct] = useState(0);
  const [stage, setStage] = useState(0); // 0: opyo · 1: tagline · 2: enter
  const [leaving, setLeaving] = useState(false);
  const progressRef = useRef(0);
  const startRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    let raf;
    const loop = (t) => {
      if (startRef.current == null) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = Math.min(1, elapsed / DURATION);
      progressRef.current = p;
      setPct(Math.floor(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(loop);
      } else if (!doneRef.current) {
        doneRef.current = true;
        setLeaving(true);
        setTimeout(() => onDone?.(), 500);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  // Stage transitions: tagline at 38%, [enter] at 75%
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), DURATION * 0.38);
    const t2 = setTimeout(() => setStage(2), DURATION * 0.75);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const skip = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    setTimeout(() => onDone?.(), 380);
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#060708] text-[#E8EEF5] flex flex-col transition-opacity duration-500"
      style={{ opacity: leaving ? 0 : 1 }}
      data-testid="intro-animation"
    >
      {/* Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <IntroScene progressRef={progressRef} />
        </Canvas>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(6,7,8,0.8) 100%)",
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 md:px-10 py-5 font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#8B9BB4]">
        <div className="flex items-center gap-3">
          <Logo size={36} glow className="text-[#E8EEF5]" />
          <span className="text-[#E8EEF5] text-sm md:text-base font-display font-bold tracking-[0.22em]">
            OPYO STUDIO
          </span>
          <span className="text-[#1E293B]">//</span>
          <span>sequence / intro</span>
        </div>
        <button
          data-testid="boot-skip-button"
          onClick={skip}
          className="hover:text-[#60A5FA] transition-colors"
        >
          skip
        </button>
      </div>

      {/* Center reveals */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="text-center pointer-events-none select-none flex flex-col items-center">
          {/* Logo — visible stage 0 & 1, dims/shrinks stage 2 */}
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: stage < 2 ? 1 : 0.2,
              transform: stage < 2 ? "scale(1)" : "scale(0.85)",
              filter: stage < 2 ? "none" : "blur(2px)",
            }}
          >
            <Logo
              size={280}
              glow
              className="hidden md:inline-block text-[#E8EEF5]"
            />
            <Logo
              size={160}
              glow
              className="md:hidden inline-block text-[#E8EEF5]"
            />
          </div>

          {/* OPYO STUDIO wordmark — visible stage 0, fades stage 1+ */}
          <div
            className="font-display font-bold tracking-[0.2em] mt-8 md:mt-10 transition-all duration-700"
            style={{
              fontSize: "clamp(32px, 5vw, 72px)",
              letterSpacing: "0.15em",
              opacity: stage === 0 ? 1 : 0,
              transform: stage === 0 ? "translateY(0)" : "translateY(-10px)",
              height: stage === 0 ? "auto" : 0,
            }}
          >
            OPYO <span className="text-[#60A5FA] glow-text">STUDIO</span>
          </div>

          {/* Tagline — visible stage 1 only */}
          <div
            className="font-display font-semibold tracking-tight leading-tight mt-8 md:mt-10 transition-all duration-700 ease-out"
            style={{
              fontSize: "clamp(22px, 3.2vw, 52px)",
              opacity: stage === 1 ? 1 : 0,
              transform: stage === 1 ? "translateY(0)" : "translateY(20px)",
              letterSpacing: "-0.02em",
              position: stage === 1 ? "relative" : "absolute",
              pointerEvents: "none",
            }}
          >
            Four systems.{" "}
            <span className="text-[#60A5FA] glow-text">One ecosystem.</span>
          </div>

          {/* Entering cursor — stage 2 */}
          <div
            className="font-mono uppercase tracking-[0.4em] text-[#60A5FA] mt-8 md:mt-10 transition-all duration-500"
            style={{
              fontSize: "clamp(10px, 1vw, 14px)",
              opacity: stage === 2 ? 1 : 0,
            }}
          >
            <span className="cursor-blink">entering ecosystem</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="relative z-10 px-5 md:px-10 pb-8 md:pb-10">
        <div className="flex items-end justify-between mb-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#8B9BB4]">
          <span>
            {stage === 0 ? "warping" : stage === 1 ? "materializing" : "ready"}
          </span>
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
