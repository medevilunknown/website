import React from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { playHover, playClick } from "../hooks/useSound";

/**
 * Shared brand-book primitives for the product pages — palette, hand-inked
 * cards, feature tags, and the "back to Products" control. Keeps the OPYO /
 * Strem0 / Games pages consistent with "OPYO Brand Guidelines".
 */
export const BRAND = {
  abyss: "#0E1016",
  panel: "#161A26",
  panel2: "#12141d",
  blue: "#2A3BBC",
  signal: "#5B78FF",
  bone: "#EDE4CE",
  boneCard: "#F5EEDC",
  crown: "#C89B3C",
  blood: "#A8433F",
  teal: "#4E7C7A",
  light: "#ECEAF2",
  muted: "#B9BECB",
  muted2: "#9AA0B4",
  blueMuted: "#7A84C4",
  ink: "#141118",
};

/** Small "← Products" link that sits above the page content. */
export function BackToProducts({ onSelect }) {
  return (
    <button
      type="button"
      data-testid="back-to-products"
      onMouseEnter={playHover}
      onClick={() => {
        playClick();
        onSelect?.("projects");
      }}
      className="lbl inline-flex items-center gap-2 text-sm text-[#7A84C4] hover:text-[#5B78FF] transition-colors mb-8"
    >
      <ArrowLeft size={16} />
      Products
    </button>
  );
}

/** Hand-inked card with a colored border and a slight rotation. */
export function BrandCard({
  accent = BRAND.blue,
  rotate = 0,
  className = "",
  style = {},
  children,
}) {
  return (
    <div
      className={className}
      style={{
        background: BRAND.panel,
        border: `2.5px solid ${accent}`,
        padding: 22,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Primary call-to-action link. Solid = filled accent; ghost = outlined. */
export function CTALink({ href, children, accent = BRAND.signal, variant = "solid", external = true }) {
  const solid = variant === "solid";
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-testid="cta-link"
      onMouseEnter={playHover}
      onClick={playClick}
      className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] px-6 py-3.5 rounded-full transition-all"
      style={
        solid
          ? { background: accent, color: "#0E1016" }
          : { border: `1.5px solid ${accent}`, color: accent }
      }
    >
      <span>{children}</span>
      <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </a>
  );
}

/** Bordered marker tag used for feature lists. */
export function FeatureTag({ children }) {
  return (
    <span
      className="lbl"
      style={{
        fontSize: 13,
        color: BRAND.muted2,
        border: "1.5px solid rgba(122,138,196,0.3)",
        padding: "6px 13px",
        borderRadius: 100,
      }}
    >
      {children}
    </span>
  );
}
