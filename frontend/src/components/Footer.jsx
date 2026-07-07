import React from "react";
import Socials from "./Socials";
import OppyMark from "./OppyMark";

/**
 * Page footer — closes every page with the studio identity, social redirects,
 * and legal/contact links (BITKRAFT-style footer rail).
 */
export default function Footer() {
  return (
    <footer
      className="mt-24 md:mt-36 pt-10 border-t border-[#1E293B]"
      data-testid="page-footer"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <div>
          <div className="flex items-center gap-3">
            <OppyMark color="#ECEAF2" width={40} />
            <div className="font-display text-2xl md:text-3xl tracking-[0.1em] text-[#ECEAF2]">
              OPYO STUDIO
            </div>
          </div>
          <p className="lbl text-[#7C9CFF] text-sm mt-4">
            the gaming ecosystem — play as one.
          </p>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7A84C4] mt-6">
            © 2026 OPYO STUDIO PVT LTD · Odisha, India
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-5">
          <Socials />
          <div className="flex flex-wrap gap-5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#7A84C4]">
            <a
              href="mailto:rohitkumargond129@gmail.com"
              className="hover:text-[#5B78FF] transition-colors"
            >
              Contact
            </a>
            <span className="hover:text-[#5B78FF] transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-[#5B78FF] transition-colors cursor-pointer">Legal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
