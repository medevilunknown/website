import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Pure-imperative R3F scene — no JSX primitives inside Canvas.
 * The visual-edits babel plugin injects debug attributes on JSX elements,
 * which R3F rejects on Three.js objects. By adding Three objects directly
 * to the scene via useEffect + useThree, we bypass JSX reconciliation.
 */
function Scene({ count = 650, radius = 14 }) {
  const { scene, mouse } = useThree();
  const stateRef = useRef(null);

  // Build Three objects once
  const built = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      velocities[i * 3] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.04,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    const points = new THREE.Points(pGeom, pMat);

    const MAX_EDGES = 1400;
    const edgeBuffer = new Float32Array(MAX_EDGES * 6);
    const edgeGeom = new THREE.BufferGeometry();
    edgeGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(edgeBuffer, 3)
    );
    edgeGeom.setDrawRange(0, 0);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(edgeGeom, lineMat);

    const group = new THREE.Group();
    group.add(points);
    group.add(lines);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(5, 5, 5);

    return {
      group,
      points,
      lines,
      positions,
      velocities,
      edgeBuffer,
      edgeGeom,
      MAX_EDGES,
      ambient,
      dir,
    };
  }, [count, radius]);

  useEffect(() => {
    scene.add(built.group);
    scene.add(built.ambient);
    scene.add(built.dir);
    stateRef.current = built;
    return () => {
      scene.remove(built.group);
      scene.remove(built.ambient);
      scene.remove(built.dir);
      built.points.geometry.dispose();
      built.points.material.dispose();
      built.edgeGeom.dispose();
      built.lines.material.dispose();
    };
  }, [scene, built]);

  useFrame((state, delta) => {
    const s = stateRef.current;
    if (!s) return;
    const t = state.clock.elapsedTime;
    const mx = mouse.x * 6;
    const my = mouse.y * 6;
    const { positions, velocities, edgeBuffer, MAX_EDGES } = s;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      positions[ix] += velocities[ix] + Math.sin(t * 0.4 + i) * 0.0008;
      positions[ix + 1] += velocities[ix + 1] + Math.cos(t * 0.35 + i) * 0.0008;
      positions[ix + 2] += velocities[ix + 2];

      const dx = positions[ix] - mx;
      const dy = positions[ix + 1] - my;
      const d2 = dx * dx + dy * dy;
      if (d2 < 9) {
        const f = (1 - d2 / 9) * 0.04;
        positions[ix] += dx * f;
        positions[ix + 1] += dy * f;
      }
      const r2 =
        positions[ix] ** 2 +
        positions[ix + 1] ** 2 +
        positions[ix + 2] ** 2;
      if (r2 > radius * radius) {
        positions[ix] *= 0.985;
        positions[ix + 1] *= 0.985;
        positions[ix + 2] *= 0.985;
      }
    }
    s.points.geometry.attributes.position.needsUpdate = true;

    // edges
    let ePtr = 0;
    const step = 3;
    const maxDist2 = 2.2 * 2.2;
    for (let i = 0; i < count; i += step) {
      if (ePtr >= MAX_EDGES) break;
      for (let j = i + step; j < count; j += step) {
        const ax = positions[i * 3];
        const ay = positions[i * 3 + 1];
        const az = positions[i * 3 + 2];
        const bx = positions[j * 3];
        const by = positions[j * 3 + 1];
        const bz = positions[j * 3 + 2];
        const d2 =
          (ax - bx) * (ax - bx) +
          (ay - by) * (ay - by) +
          (az - bz) * (az - bz);
        if (d2 < maxDist2) {
          const base = ePtr * 6;
          edgeBuffer[base] = ax;
          edgeBuffer[base + 1] = ay;
          edgeBuffer[base + 2] = az;
          edgeBuffer[base + 3] = bx;
          edgeBuffer[base + 4] = by;
          edgeBuffer[base + 5] = bz;
          ePtr++;
          if (ePtr >= MAX_EDGES) break;
        }
      }
    }
    s.edgeGeom.attributes.position.needsUpdate = true;
    s.edgeGeom.setDrawRange(0, ePtr * 2);

    s.group.rotation.y += delta * 0.03;
    s.group.rotation.x = mouse.y * 0.12;
  });

  return null;
}

export default function NeuralBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      data-testid="neural-background"
    >
      <Canvas
        camera={{ position: [0, 0, 18], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene count={650} radius={14} />
      </Canvas>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(6,7,8,0.75) 100%)",
        }}
      />
    </div>
  );
}
