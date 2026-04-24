import React from "react";

/**
 * OPYO brand logo — renders the octopus mark as a masked element
 * so it inherits currentColor and can be tinted + glowed via CSS.
 *
 * Uses CSS mask-image because the SVG fills are currentColor but
 * <img> elements don't inherit text color. The mask approach treats
 * the SVG alpha channel as a mask on a colored div.
 */
export default function Logo({
  variant = "mark",
  size = 24,
  className = "",
  glow = false,
}) {
  const src =
    variant === "energy"
      ? "/brand/opyo-energy-clean.svg"
      : "/brand/opyo-mark-clean.svg";
  return (
    <span
      className={`inline-block shrink-0 ${className}`}
      aria-label="OPYO"
      style={{
        width: size,
        height: size,
        backgroundColor: "currentColor",
        WebkitMask: `url(${src}) center/contain no-repeat`,
        mask: `url(${src}) center/contain no-repeat`,
        filter: glow ? "drop-shadow(0 0 12px rgba(96,165,250,0.55))" : "none",
      }}
    />
  );
}
