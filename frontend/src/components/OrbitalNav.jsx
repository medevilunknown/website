import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Eye, LayoutGrid, Users, Info, Briefcase } from "lucide-react";
import { playHover, playClick } from "../hooks/useSound";

/**
 * Orbital navigation — the pages orbit the ecosystem sphere as nodes. Click a
 * node to enter that page. Slowly-rotating dashed rings + mouse parallax make
 * the hub feel alive; this is the primary way to navigate from home.
 */
const NODES = [
  { key: "vision", label: "Vision", Icon: Eye },
  { key: "projects", label: "Products", Icon: LayoutGrid },
  { key: "people", label: "People", Icon: Users },
  { key: "about", label: "About", Icon: Info },
  { key: "careers", label: "Careers", Icon: Briefcase },
];

export default function OrbitalNav({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  const [radius, setRadius] = useState(340);
  const [par, setPar] = useState({ x: 0, y: 0 });
  const raf = useRef();

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Ring sits clearly outside the (smaller) sphere; bounded by viewport.
      const base = w < 640 ? 150 : w < 1024 ? 280 : 380;
      setRadius(Math.min(base, h / 2 - 96));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setPar({
          x: (e.clientX / window.innerWidth - 0.5) * 24,
          y: (e.clientY / window.innerHeight - 0.5) * 24,
        });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const ringBox = radius * 2 + 90;

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
      data-testid="orbital-nav"
    >
      {/* Static radar depth rings */}
      <div
        className="absolute"
        style={{
          width: ringBox,
          height: ringBox,
          transform: `translate(${par.x * 0.3}px, ${par.y * 0.3}px)`,
        }}
        aria-hidden
      >
        <svg className="absolute inset-0" width="100%" height="100%" viewBox={`0 0 ${ringBox} ${ringBox}`}>
          {[radius + 34, radius, radius - 70, radius - 130].map((r, i) => (
            <circle
              key={i}
              cx="50%"
              cy="50%"
              r={Math.max(r, 8)}
              fill="none"
              stroke="rgba(122,138,196,0.10)"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      {/* Rotating dashed orbit rings */}
      <div
        className="absolute"
        style={{
          width: ringBox,
          height: ringBox,
          transform: `translate(${par.x * 0.4}px, ${par.y * 0.4}px)`,
        }}
        aria-hidden
      >
        <svg className="absolute inset-0 orbit-ring" width="100%" height="100%" viewBox={`0 0 ${ringBox} ${ringBox}`}>
          <circle cx="50%" cy="50%" r={radius} fill="none" stroke="rgba(91,120,255,0.22)" strokeWidth="1" strokeDasharray="2 11" />
        </svg>
        <svg className="absolute inset-0 orbit-ring-rev" width="100%" height="100%" viewBox={`0 0 ${ringBox} ${ringBox}`}>
          <circle cx="50%" cy="50%" r={radius - 42} fill="none" stroke="rgba(200,155,60,0.16)" strokeWidth="1" strokeDasharray="1 15" />
        </svg>
      </div>

      {NODES.map((n, i) => {
        const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isHover = hovered === n.key;
        const { Icon } = n;
        return (
          // Outer div owns POSITIONING (so framer-motion's transform on the
          // button — scale/opacity — never clobbers the orbit placement).
          <div
            key={n.key}
            className="absolute"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: `translate(-50%, -50%) translate(${par.x}px, ${par.y}px)`,
              transition: "transform 220ms cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <motion.button
              type="button"
              data-testid={`orbit-node-${n.key}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.09, duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
              onMouseEnter={() => {
                setHovered(n.key);
                playHover();
              }}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                playClick();
                onSelect?.(n.key);
              }}
              className="pointer-events-auto"
            >
              <div className="flex flex-col items-center gap-3">
              <span
                className="flex items-center justify-center rounded-full transition-all duration-300"
                style={{
                  width: isHover ? 68 : 58,
                  height: isHover ? 68 : 58,
                  border: `1.5px solid ${isHover ? "#5B78FF" : "rgba(122,138,196,0.5)"}`,
                  background: isHover ? "rgba(91,120,255,0.16)" : "rgba(14,16,22,0.9)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  color: isHover ? "#5B78FF" : "#ECEAF2",
                  boxShadow: isHover
                    ? "0 0 30px rgba(91,120,255,0.6)"
                    : "0 6px 20px rgba(0,0,0,0.5)",
                }}
              >
                <Icon size={22} strokeWidth={1.6} />
              </span>
              <span
                className={`lbl text-[15px] transition-colors ${
                  isHover ? "text-[#5B78FF]" : "text-[#ECEAF2]"
                }`}
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
              >
                {n.label}
              </span>
              </div>
            </motion.button>
          </div>
        );
      })}
    </div>
  );
}
