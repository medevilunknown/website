import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Draggable wireframe icosahedron — the interactive hub centerpiece.
 * Imperative-only (no R3F JSX primitives) to avoid visual-edits prop injection.
 */
function CenterPiece() {
  const meshRef = useRef(null);
  const sceneRef = useRef(null);
  const rotRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const dragRef = useRef({ active: false, lx: 0, ly: 0 });
  const autoSpinRef = useRef(0.004);

  useFrame(({ scene }) => {
    if (!meshRef.current) {
      // Build the icosahedron wireframe
      const geo = new THREE.IcosahedronGeometry(2.2, 1);
      const edges = new THREE.EdgesGeometry(geo);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.8,
      });
      const wire = new THREE.LineSegments(edges, lineMat);

      // Inner filled icosahedron with low opacity
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x0b1220,
        transparent: true,
        opacity: 0.55,
      });
      const solid = new THREE.Mesh(geo, innerMat);

      // Halo — larger translucent icosahedron
      const haloGeo = new THREE.IcosahedronGeometry(2.45, 1);
      const haloEdges = new THREE.EdgesGeometry(haloGeo);
      const haloMat = new THREE.LineBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.18,
      });
      const halo = new THREE.LineSegments(haloEdges, haloMat);

      const group = new THREE.Group();
      group.add(solid);
      group.add(wire);
      group.add(halo);
      scene.add(group);
      meshRef.current = { group, wire, solid, halo };
      sceneRef.current = scene;
    }

    const r = rotRef.current;
    if (!dragRef.current.active) {
      r.y += autoSpinRef.current;
      r.x += autoSpinRef.current * 0.35;
      r.vx *= 0.94;
      r.vy *= 0.94;
      r.x += r.vx;
      r.y += r.vy;
    }
    const { group, halo } = meshRef.current;
    group.rotation.x = r.x;
    group.rotation.y = r.y;
    halo.rotation.x = r.x * 1.08;
    halo.rotation.y = r.y * 1.08;
  });

  // Expose drag handlers to parent via closure on window
  useEffect(() => {
    const onDown = (e) => {
      dragRef.current.active = true;
      const p = e.touches ? e.touches[0] : e;
      dragRef.current.lx = p.clientX;
      dragRef.current.ly = p.clientY;
    };
    const onMove = (e) => {
      if (!dragRef.current.active) return;
      const p = e.touches ? e.touches[0] : e;
      const dx = p.clientX - dragRef.current.lx;
      const dy = p.clientY - dragRef.current.ly;
      rotRef.current.y += dx * 0.008;
      rotRef.current.x += dy * 0.008;
      rotRef.current.vy = dx * 0.002;
      rotRef.current.vx = dy * 0.002;
      dragRef.current.lx = p.clientX;
      dragRef.current.ly = p.clientY;
    };
    const onUp = () => {
      dragRef.current.active = false;
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (meshRef.current && sceneRef.current) {
        sceneRef.current.remove(meshRef.current.group);
      }
    };
  }, []);

  return null;
}

export default function HomeCenterPiece() {
  return (
    <div
      className="fixed inset-0 pointer-events-none flex items-center justify-center"
      style={{ zIndex: 5 }}
      data-testid="home-centerpiece"
    >
      <div style={{ width: "min(60vw, 600px)", height: "min(60vw, 600px)" }}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <CenterPiece />
        </Canvas>
      </div>
    </div>
  );
}
