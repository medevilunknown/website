import React from "react";
import { Instagram, Youtube, MessageCircle } from "lucide-react";
import { playHover, playClick } from "../hooks/useSound";

/**
 * Social redirects for OPYO STUDIO. External links open in a new tab.
 */
export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/opyo_studio", Icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/@opyo_studio", Icon: Youtube },
  { label: "Discord", href: "https://discord.gg/pAuVGRgJ8f", Icon: MessageCircle },
];

export default function Socials({ size = 18, className = "" }) {
  return (
    <div className={`flex items-center gap-1 ${className}`} data-testid="socials">
      {SOCIALS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`social-${label.toLowerCase()}`}
          aria-label={label}
          onMouseEnter={playHover}
          onClick={playClick}
          className="w-9 h-9 flex items-center justify-center rounded-full text-[#9AA0B4] hover:text-[#5B78FF] hover:bg-[#5B78FF]/10 transition-colors"
        >
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}
