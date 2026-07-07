import React, { useState } from "react";
import SectionShell from "../SectionShell";
import { playHover, playClick } from "../../hooks/useSound";
import { ArrowUpRight } from "lucide-react";

/**
 * Products — the OPYO ecosystem, laid out in a BITKRAFT-style editorial stack:
 * big type, thin dividers, small-caps meta, a thesis line per product and its
 * feature set. Three products: OPYO (social), Strem0 (streaming), Games.
 */
const PRODUCTS = [
  {
    code: "OPYO",
    route: "opyo",
    name: "OPYO",
    kicker: "Social platform",
    status: "LIVE",
    flagship: true,
    tagline: "The social layer for gamers.",
    body:
      "One verified Gamer ID that follows you across every title — ranked history, campus pride, and a feed built for players, not platforms. The reputation network for a generation of gamers.",
    features: [
      "Verified Gamer ID",
      "Campus communities",
      "Ranked history",
      "Squads & clubs",
      "Tournaments",
      "Crown economy",
    ],
  },
  {
    code: "STREM0",
    route: "strem0",
    name: "Strem0",
    kicker: "Streaming engine",
    status: "BETA",
    flagship: false,
    tagline: "Your entire streaming studio.",
    body:
      "Everything a creator gets from Streamlabs — and then some — built into OPYO. Go live from desktop, cloud, or mobile with pro overlays, alerts, and multistream to every platform at once.",
    features: [
      "Overlays & scenes",
      "Alerts & widgets",
      "Multistream everywhere",
      "Chat box & moderation",
      "Tips, donations & merch",
      "Stream analytics",
      "Cloud + desktop + mobile",
      "Themes & templates",
    ],
  },
  {
    code: "GAMES",
    route: "games",
    name: "Games",
    kicker: "Publishing",
    status: "SOON",
    flagship: false,
    tagline: "Made by players, published by OPYO.",
    body:
      "Our next chapter: a publishing label backing student studios from campus to launch. Incubation, funding, and distribution for the games our community is already dreaming up.",
    features: ["Student studios", "Incubation", "Funding", "Distribution"],
  },
];

function ProductBlock({ product, index, onSelect }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      data-testid={`product-block-${product.code}`}
      onMouseEnter={() => {
        setHover(true);
        playHover();
      }}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        playClick();
        onSelect?.(product.route);
      }}
      className="group block w-full text-left border-t border-[#1E293B] transition-colors duration-300 hover:border-[#60A5FA] py-10 md:py-16"
    >
      <div className="grid grid-cols-12 gap-6 md:gap-10">
        {/* Left meta rail */}
        <div className="col-span-12 md:col-span-3 flex md:flex-col items-baseline md:items-start justify-between gap-3">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#8B9BB4]">
            /{String(index).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA]">
            {product.kicker}
          </span>
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.28em] ${
              product.status === "LIVE" ? "text-[#60A5FA]" : "text-[#8B9BB4]"
            }`}
          >
            {product.status}
          </span>
        </div>

        {/* Main column */}
        <div className="col-span-12 md:col-span-9">
          <div className="flex items-center gap-4 flex-wrap">
            <span
              className={`font-display font-semibold tracking-tighter transition-colors duration-300 ${
                product.flagship
                  ? "text-5xl md:text-7xl lg:text-8xl"
                  : "text-4xl md:text-6xl lg:text-7xl"
              } ${hover ? "text-[#60A5FA] glow-text" : "text-[#E8EEF5]"}`}
              style={{ letterSpacing: "-0.03em" }}
            >
              {product.name}
            </span>
            {product.flagship && (
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] border border-[#60A5FA] px-2 py-1">
                flagship
              </span>
            )}
            <ArrowUpRight
              size={28}
              className={`transition-all duration-300 ${
                hover
                  ? "text-[#60A5FA] -translate-y-1 translate-x-1"
                  : "text-[#8B9BB4]"
              }`}
            />
          </div>

          <div
            className="mt-5 font-display text-2xl md:text-3xl text-[#E8EEF5] leading-[1.15]"
            style={{ letterSpacing: "-0.015em" }}
          >
            {product.tagline}
          </div>

          <p className="mt-4 max-w-2xl text-[#8B9BB4] text-base md:text-lg leading-relaxed">
            {product.body}
          </p>

          <div className="mt-8 flex flex-wrap gap-x-3 gap-y-3">
            {product.features.map((f) => (
              <span
                key={f}
                className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#8B9BB4] border border-[#1E293B] px-3 py-2 transition-colors group-hover:border-[#60A5FA]/40"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Projects({ onClose, onSelect }) {
  return (
    <SectionShell
      code="P / 02"
      eyebrow="Products"
      title={
        <>
          One ecosystem.<br />
          <span className="text-[#60A5FA] glow-text">Every gamer.</span>
        </>
      }
      tagline="OPYO connects play, streaming, and publishing into a single identity. The social network, the streaming engine, and the games label — built for collegiate esports."
      onClose={onClose}
    >
      <div>
        {PRODUCTS.map((p, i) => (
          <ProductBlock key={p.code} product={p} index={i + 1} onSelect={onSelect} />
        ))}
        <div className="border-t border-[#1E293B]" />
      </div>
    </SectionShell>
  );
}
