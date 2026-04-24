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

    // --- Icosahedron (wireframe + solid) ---------------------------------
    const icoGeo = new THREE.IcosahedronGeometry(2.3, 1);
    const icoEdges = new THREE.EdgesGeometry(icoGeo);
    const icoLineMat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const icoWire = new THREE.LineSegments(icoEdges, icoLineMat);

    const icoSolidMat = new THREE.MeshBasicMaterial({
      color: 0x0b1220,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const icoSolid = new THREE.Mesh(icoGeo, icoSolidMat);

    const halo = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.55, 1)),
      new THREE.LineBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      })
    );

    const icoGroup = new THREE.Group();
    icoGroup.add(icoSolid);
    icoGroup.add(icoWire);
    icoGroup.add(halo);

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
      icoGroup,
      icoWire,
      icoSolid,
      halo,
      flare,
      flareMat,
    };
  }, []);

  useEffect(() => {
    scene.add(built.streaks);
    scene.add(built.icoGroup);
    scene.add(built.flare);
    builtRef.current = built;
    return () => {
      scene.remove(built.streaks);
      scene.remove(built.icoGroup);
      scene.remove(built.flare);
    };
  }, [scene, built]);

  useFrame((_, delta) => {
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

    // Icosahedron assembly: from 0% scale to 1 between 0.28 and 0.65 progress
    const t1 = Math.min(1, Math.max(0, (p - 0.28) / 0.37));
    const scale = t1 * t1 * (3 - 2 * t1); // smoothstep
    b.icoGroup.scale.setScalar(scale * 1.0);

    // icosahedron rotates steadily
    b.icoGroup.rotation.y += delta * 1.2 * (1 - p * 0.6);
    b.icoGroup.rotation.x += delta * 0.5 * (1 - p * 0.6);

    // Wireframe fades in during assembly, halo fades after
    b.icoWire.material.opacity = Math.min(1, t1 * 1.2) * 0.9;
    b.icoSolid.material.opacity = Math.min(1, t1 * 1.2) * 0.55;
    b.halo.material.opacity = Math.min(1, Math.max(0, (p - 0.5) / 0.3)) * 0.25;

    // flare bright at start, fades out as ico materialises
    const flareAmt = Math.max(0, 1 - p * 2.2);
    b.flareMat.opacity = flareAmt;
    b.flareMat.size = 0.4 + flareAmt * 2.2;

    // Fade everything near the end
    const endFade = Math.max(0, Math.min(1, (p - 0.88) / 0.12));
    if (endFade > 0) {
      b.icoWire.material.opacity *= 1 - endFade;
      b.icoSolid.material.opacity *= 1 - endFade;
      b.halo.material.opacity *= 1 - endFade;
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

      {/* Center text reveals */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="text-center pointer-events-none select-none">
          <div
            className="flex items-center justify-center gap-6 md:gap-10 transition-all duration-1000 ease-out"
            style={{
              opacity: stage === 0 ? 1 : 0.12,
              transform: stage === 0 ? "scale(1)" : "scale(0.95)",
              filter: stage === 0 ? "none" : "blur(4px)",
            }}
          >
            <Logo
              size={220}
              glow
              className="hidden md:inline-block text-[#E8EEF5] opacity-95"
            />
            <Logo
              size={120}
              glow
              className="md:hidden inline-block text-[#E8EEF5] opacity-95"
            />
            <div
              className="font-display font-bold tracking-tighter leading-[0.85]"
              style={{
                fontSize: "clamp(70px, 13vw, 220px)",
                letterSpacing: "-0.04em",
              }}
            >
              O<span className="text-[#60A5FA] glow-text">P</span>Y
              <span className="text-[#60A5FA] glow-text">O</span>
            </div>
          </div>
          <div
            className="font-mono uppercase tracking-[0.5em] text-[#60A5FA] mt-5 transition-opacity duration-700"
            style={{
              fontSize: "clamp(11px, 1.1vw, 16px)",
              opacity: stage === 0 ? 1 : 0.12,
            }}
          >
            studio
          </div>
          <div
            className="font-display font-semibold tracking-tight leading-tight transition-all duration-700 ease-out mt-10"
            style={{
              fontSize: "clamp(22px, 3.2vw, 52px)",
              opacity: stage >= 1 && stage < 2 ? 1 : 0,
              transform: stage >= 1 ? "translateY(0)" : "translateY(20px)",
              letterSpacing: "-0.02em",
            }}
          >
            Four systems.{" "}
            <span className="text-[#60A5FA] glow-text">One ecosystem.</span>
          </div>
          <div
            className="font-mono uppercase tracking-[0.4em] text-[#60A5FA] transition-all duration-500 mt-10"
            style={{
              fontSize: "clamp(10px, 1vw, 14px)",
              opacity: stage === 2 ? 1 : 0,
              transform: stage === 2 ? "translateY(0)" : "translateY(10px)",
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
