import React from "react";

/**
 * OPPY — the octopus mark ("the Deep One").
 *
 * The brand book calls for the mark in one solid colour at a time
 * (Opyo Blue, bone, or ink — no gradients). We reuse the existing
 * octopus SVG and tint it via a CSS mask so any brand colour works
 * from a single asset. viewBox of the source is 612×408 (ratio 1.5).
 */
export default function OppyMark({
  color = "#ECEAF2",
  width = 120,
  className = "",
  style = {},
}) {
  return (
    <span
      role="img"
      aria-label="OPPY octopus mark"
      className={`inline-block shrink-0 ${className}`}
      style={{
        width,
        aspectRatio: "612 / 408",
        backgroundColor: color,
        WebkitMask: "url(/brand/opyo-mark-clean.svg) center/contain no-repeat",
        mask: "url(/brand/opyo-mark-clean.svg) center/contain no-repeat",
        ...style,
      }}
    />
  );
}
