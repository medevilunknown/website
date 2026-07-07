import React from "react";
import OppyMark from "@/components/OppyMark";

/**
 * OPYO Brand Book — a living implementation of "OPYO Brand Guidelines.dc.html".
 *
 * The source was authored as a fixed 8.5×11in print deck; here it's rebuilt as
 * a responsive web page. Each brand-book page becomes a "sheet" in a scrolling
 * column. Palette, type system (Pirata One / Permanent Marker / Kalam) and copy
 * are faithful to the guidelines; the octopus mark is rendered from the shared
 * SVG asset, tinted per the one-solid-colour rule.
 */

/* ---- palette (from §07 Color) ---- */
const C = {
  abyss: "#0E1016",
  panel: "#161A26",
  panel2: "#12141d",
  blue: "#2A3BBC", // Opyo Blue — primary
  signal: "#5B78FF", // Signal Blue — links / live UI
  bone: "#EDE4CE", // print / light
  boneCard: "#F5EEDC",
  crown: "#C89B3C", // wins & rank — earned
  blood: "#A8433F", // live & alerts — sparingly
  teal: "#4E7C7A",
  purple: "#8A5A9A",
  light: "#ECEAF2",
  muted: "#B9BECB",
  muted2: "#9AA0B4",
  blueMuted: "#7A84C4",
  ink: "#141118",
  inkBody: "#3a3226",
  inkBody2: "#4a4436",
  inkMuted: "#6b6455",
};

const dotDark =
  "radial-gradient(rgba(122,138,196,0.06) 1.2px, transparent 1.3px)";
const dotLight =
  "radial-gradient(rgba(28,22,12,0.05) 1.3px, transparent 1.4px)";

/* Shared decorative dot layer */
const DotGrid = ({ light, size = light ? "18px 18px" : "22px 22px" }) => (
  <div
    aria-hidden
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: light ? dotLight : dotDark,
      backgroundSize: size,
      pointerEvents: "none",
    }}
  />
);

/* Footer line at the bottom of every sheet */
const Foot = ({ n, dark }) => (
  <div
    style={{
      position: "relative",
      marginTop: "auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 16,
    }}
  >
    <span className="lbl" style={{ fontSize: 13, color: C.crown }}>
      {dark ? "OPYO / BRAND BOOK" : "OPYO / BRAND BOOK"}
    </span>
    <span className="goth" style={{ fontSize: 24, color: dark ? C.signal : C.blue }}>
      {n}
    </span>
  </div>
);

/* Sheet wrapper — a single "page" of the book */
const Sheet = ({ light, children, style = {} }) => (
  <section
    className="bb-sheet"
    style={{
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      background: light ? C.bone : C.abyss,
      color: light ? C.ink : C.light,
      ...style,
    }}
  >
    <DotGrid light={light} />
    {children}
  </section>
);

const Eyebrow = ({ children, color }) => (
  <div className="lbl" style={{ position: "relative", fontSize: 15, color }}>
    {children}
  </div>
);

export default function BrandBook() {
  return (
    <div className="bb">
      <style>{scopedCss}</style>

      {/* rough-edge filters for hand-inked strokes */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <filter id="bb-rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="4.5" />
          </filter>
          <filter id="bb-rough2">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="4" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
          </filter>
        </defs>
      </svg>

      <div className="bb-stack">
        {/* ============ 01 · COVER ============ */}
        <Sheet style={{ minHeight: "100vh" }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "-22%",
              right: "-22%",
              width: "80%",
              height: "80%",
              background:
                "radial-gradient(circle,rgba(62,91,255,0.30),transparent 62%)",
            }}
          />
          <div style={{ position: "absolute", top: "16%", right: "12%", fontSize: 34, color: C.crown, transform: "rotate(14deg)", opacity: 0.85 }}>◆</div>
          <div style={{ position: "absolute", bottom: "26%", left: "9%", fontSize: 24, color: C.teal, transform: "rotate(-10deg)", opacity: 0.8 }}>✳</div>
          <svg viewBox="0 0 140 140" aria-hidden style={{ position: "absolute", bottom: "9%", right: "9%", width: 150, height: 150, opacity: 0.5, transform: "rotate(-8deg)" }}>
            <circle cx="70" cy="70" r="56" fill="none" stroke={C.crown} strokeWidth="2.4" style={{ filter: "url(#bb-rough)" }} />
            <path d="M70 14 L70 126 M14 70 L126 70 M30 30 L110 110 M110 30 L30 110" stroke={C.crown} strokeWidth="1.5" style={{ filter: "url(#bb-rough2)" }} />
          </svg>

          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span className="lbl" style={{ fontSize: 15, color: C.crown }}>OPYO STUDIO</span>
            <span className="lbl" style={{ fontSize: 15, color: C.teal }}>BRAND BOOK · V1</span>
          </div>

          <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20, padding: "40px 0" }}>
            <div style={{ position: "relative", width: "max-content" }}>
              <OppyMark color={C.light} width={148} style={{ transform: "rotate(-5deg)" }} />
              <div className="lbl" style={{ position: "absolute", top: -4, right: -52, fontSize: 15, color: C.purple, transform: "rotate(9deg)" }}>it stirs...</div>
            </div>
            <div className="goth bb-hero" style={{ lineHeight: 0.8, color: C.light }}>OPYO</div>
            <div style={{ maxWidth: "40rem", display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="goth bb-lead" style={{ lineHeight: 1.0, color: C.signal }}>The identity backbone of collegiate esports.</div>
              <p style={{ margin: 0, fontSize: 19, lineHeight: 1.5, color: C.muted2, maxWidth: "34rem" }}>
                One verified Gamer ID for every student player — ranked history, campus pride, and a pathway from the dorm room to the pro circuit.
              </p>
            </div>
          </div>

          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", gap: 7 }}>
              {[C.blue, "#3E5BFF", C.crown, C.blood, "#EAE3D2"].map((c) => (
                <span key={c} style={{ width: 44, height: 44, borderRadius: 9, background: c }} />
              ))}
            </div>
            <span className="lbl" style={{ fontSize: 14, color: C.blueMuted }}>EST. 2026 · INDIA</span>
          </div>
        </Sheet>

        {/* ============ 02 · CONTENTS ============ */}
        <Sheet light>
          <div style={{ position: "absolute", top: "7%", right: "9%", fontSize: 30, color: C.blood, transform: "rotate(12deg)" }}>◆</div>
          <Eyebrow color={C.blood}>◆ INDEX</Eyebrow>
          <h1 className="goth bb-h1" style={{ margin: "6px 0 0", color: C.blue }}>Contents</h1>
          <p style={{ position: "relative", margin: "14px 0 0", maxWidth: "32rem", fontSize: 18, color: C.inkBody2 }}>
            One honest source of truth for how OPYO looks, sounds, and behaves — so the beast reads the same on a campus poster, a stream overlay, and a Gamer ID card.
          </p>
          <div style={{ position: "relative", marginTop: 26, display: "flex", flexDirection: "column" }}>
            {[
              ["01", "Brand story", "mission & vision"],
              ["02", "The mark", "anatomy · clear space"],
              ["03", "Meet OPPY", "the mascot"],
              ["04", "Lockups & misuse", "do & don't"],
              ["05", "Color", "palette & ratios"],
              ["06", "Typography", "Pirata · Marker · Kalam"],
              ["07", "Grid, icons & art", "layout system"],
              ["08", "Gamer ID & apps", "product in the wild"],
              ["09", "Voice & tone", "how we speak"],
            ].map(([n, t, s]) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 18, padding: "12px 0", borderBottom: "2.5px dashed rgba(20,17,24,0.3)" }}>
                <span className="goth" style={{ fontSize: 28, color: C.blood, width: 46 }}>{n}</span>
                <span className="lbl bb-toc-title" style={{ flex: 1, fontSize: 22 }}>{t}</span>
                <span style={{ fontSize: 16, color: C.inkMuted }}>{s}</span>
              </div>
            ))}
          </div>
          <Foot n="02" />
        </Sheet>

        {/* ============ 03 · BRAND STORY ============ */}
        <Sheet>
          <div style={{ position: "absolute", top: "11%", right: "9%", fontSize: 26, color: C.crown, transform: "rotate(-12deg)", opacity: 0.8 }}>◆</div>
          <Eyebrow color={C.crown}>01 / STORY</Eyebrow>
          <h1 className="goth bb-h1" style={{ margin: "6px 0 0", maxWidth: "12em" }}>One identity for every gamer.</h1>
          <p style={{ position: "relative", margin: "18px 0 0", maxWidth: "36rem", fontSize: 18, lineHeight: 1.6, color: C.muted }}>
            OPYO is the identity backbone of collegiate esports in India — the infrastructure layer connecting campus gaming communities, distribution partners, and a new generation of student players. We replace fragmented tools with one verified profile for play, competition, streaming, and reputation. Think the Steam of ranked history crossed with the LinkedIn of gaming careers.
          </p>
          <div className="bb-2col" style={{ position: "relative", display: "flex", gap: 16, marginTop: 30 }}>
            <div style={{ flex: 1, padding: 22, background: C.panel, border: `2.5px solid ${C.blue}`, transform: "rotate(-0.5deg)" }}>
              <div className="lbl" style={{ fontSize: 20, color: C.signal }}>Mission</div>
              <p style={{ margin: "8px 0 0", fontSize: 16, lineHeight: 1.55, color: "#DBDEE8" }}>Unify gamers, creators, and competitions into one seamless platform that simplifies play, connection, streaming, and monetisation — starting on campus.</p>
            </div>
            <div style={{ flex: 1, padding: 22, background: C.panel, border: `2.5px solid ${C.crown}`, transform: "rotate(0.5deg)" }}>
              <div className="lbl" style={{ fontSize: 20, color: C.crown }}>Vision</div>
              <p style={{ margin: "8px 0 0", fontSize: 16, lineHeight: 1.55, color: "#DBDEE8" }}>To be the Steam + LinkedIn of Indian collegiate esports — every student gamer with a verified identity, a ranked history, and a pathway to opportunity.</p>
            </div>
          </div>
          <div className="bb-3col" style={{ position: "relative", marginTop: 20, display: "flex", gap: 16 }}>
            {[
              ["01", "Campus franchise", "Every university a self-run node. Peer-driven, viral growth."],
              ["02", "Gamer ID", "A tiered, verifiable player passport that travels across games."],
              ["03", "Crown economy", "Earn crowns through legit play; pool them to your campus rank."],
            ].map(([n, t, d]) => (
              <div key={n} style={{ flex: 1, padding: "18px 20px", background: C.panel2, border: "1.5px solid rgba(255,255,255,0.09)" }}>
                <div className="goth" style={{ fontSize: 30, color: C.signal }}>{n}</div>
                <div className="lbl" style={{ fontSize: 16, marginTop: 4 }}>{t}</div>
                <p style={{ margin: "6px 0 0", fontSize: 14, color: C.muted2, lineHeight: 1.45 }}>{d}</p>
              </div>
            ))}
          </div>
          <div style={{ position: "relative", marginTop: 20, padding: "20px 24px", background: C.blue, border: `2.5px solid ${C.light}`, display: "flex", alignItems: "center", gap: 20, transform: "rotate(-0.4deg)" }}>
            <OppyMark color={C.light} width={52} style={{ flex: "none" }} />
            <p className="lbl" style={{ margin: 0, fontSize: 18, lineHeight: 1.35, color: "#fff" }}>We're not just a gaming platform — we're the verified reputation layer for a generation of players.</p>
          </div>
          <Foot n="03" dark />
        </Sheet>

        {/* ============ 04 · THE MARK ============ */}
        <Sheet light>
          <Eyebrow color={C.blood}>02 / THE MARK</Eyebrow>
          <h1 className="goth bb-h1" style={{ margin: "6px 0 0", color: C.blue }}>The Deep One</h1>
          <p style={{ position: "relative", margin: "14px 0 0", maxWidth: "36rem", fontSize: 17, lineHeight: 1.6, color: C.inkBody }}>
            Many arms, one mind. The octopus is a deliberate metaphor: OPYO reaches across every fragmented tool a gamer uses and pulls them into a single, connected identity. Ancient, confident, a little menacing — unmistakably ours.
          </p>
          <div className="bb-2col" style={{ position: "relative", display: "flex", gap: 20, marginTop: 26 }}>
            <div style={{ flex: 1.15, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: C.boneCard, border: `2.5px solid ${C.ink}`, position: "relative", transform: "rotate(-0.5deg)", minHeight: 300, padding: 24 }}>
              <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(42,59,188,0.09) 1px,transparent 1px),linear-gradient(90deg,rgba(42,59,188,0.09) 1px,transparent 1px)", backgroundSize: "26px 26px" }} />
              <OppyMark color={C.blue} width={215} style={{ position: "relative" }} />
              <div className="lbl" style={{ position: "absolute", bottom: 12, left: 14, fontSize: 13, color: C.blood }}>built on a 26px grid</div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ padding: 18, background: C.boneCard, border: `2.5px solid ${C.ink}`, transform: "rotate(0.5deg)" }}>
                <div className="lbl" style={{ fontSize: 17, color: C.blue }}>Clear space</div>
                <p style={{ margin: "6px 0 12px", fontSize: 14, lineHeight: 1.5, color: C.inkBody }}>Keep breathing room equal to one tentacle (½ the mark height) on every side.</p>
                <div style={{ position: "relative", height: 112, border: `2px dashed ${C.blood}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ position: "absolute", inset: 16, border: "2px dashed rgba(42,59,188,0.4)" }} />
                  <OppyMark color={C.blue} width={105} style={{ height: 70, width: "auto" }} />
                </div>
              </div>
              <div style={{ padding: 18, background: C.boneCard, border: `2.5px solid ${C.ink}`, transform: "rotate(-0.4deg)" }}>
                <div className="lbl" style={{ fontSize: 17, color: C.blue }}>Minimum size</div>
                <p style={{ margin: "6px 0 12px", fontSize: 14, lineHeight: 1.5, color: C.inkBody }}>Never shrink the beast past this — the arms blur and it loses its bite.</p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 26 }}>
                  <div style={{ textAlign: "center" }}>
                    <OppyMark color={C.blue} width={78} style={{ height: 52, width: "auto" }} />
                    <div className="lbl" style={{ marginTop: 6, fontSize: 12, color: C.inkMuted }}>24px screen</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <OppyMark color={C.blue} width={45} style={{ height: 30, width: "auto" }} />
                    <div className="lbl" style={{ marginTop: 6, fontSize: 12, color: C.inkMuted }}>10mm print</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Foot n="04" />
        </Sheet>

        {/* ============ 05 · MEET OPPY ============ */}
        <Sheet>
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(85% 65% at 28% 42%,rgba(42,59,188,0.24),transparent 62%)" }} />
          <Eyebrow color={C.crown}>03 / MASCOT</Eyebrow>
          <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 16, marginTop: 6, flexWrap: "wrap" }}>
            <h1 className="goth bb-h1" style={{ margin: 0, lineHeight: 0.85 }}>Meet OPPY</h1>
            <span className="lbl" style={{ fontSize: 17, color: C.teal, paddingBottom: 8 }}>the Deep One</span>
          </div>
          <p style={{ position: "relative", margin: "16px 0 0", maxWidth: "36rem", fontSize: 17, lineHeight: 1.6, color: C.muted }}>
            OPPY is our guardian of the deep — an ancient, all-seeing creature reborn as a gaming icon. Where old legends saw dread, we see a hype-beast: loyal to players, ruthless in competition, always online. OPPY brings personality to the moments the wordmark can't.
          </p>
          <div className="bb-2col" style={{ position: "relative", display: "flex", gap: 18, marginTop: 26 }}>
            <div style={{ flex: 1.1, background: `radial-gradient(120% 100% at 50% 35%,#1a2168,${C.abyss})`, border: `2.5px solid ${C.blue}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", minHeight: 280, padding: 24 }}>
              <OppyMark color={C.light} width={225} />
              <div className="lbl" style={{ position: "absolute", bottom: 12, left: 14, fontSize: 13, color: C.blueMuted }}>primary form — the emblem</div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ flex: 1, padding: 20, background: C.panel, border: "2.5px solid rgba(122,138,196,0.25)" }}>
                <div className="lbl" style={{ fontSize: 17, color: C.signal }}>Personality</div>
                <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Confident", "Mischievous", "Loyal", "Competitive", "Always online"].map((p) => (
                    <span key={p} style={{ fontSize: 14, padding: "5px 13px", border: "2px solid rgba(122,138,196,0.4)", borderRadius: 100 }}>{p}</span>
                  ))}
                </div>
                <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.5, color: C.muted2 }}>Hypes wins, roasts losses, never breaks character. Menacing silhouette, friendly heart.</p>
              </div>
              <div style={{ padding: 20, background: C.blue, border: `2.5px solid ${C.light}` }}>
                <div className="lbl" style={{ fontSize: 17, color: C.crown }}>One rule</div>
                <p style={{ margin: "6px 0 0", fontSize: 15, lineHeight: 1.45, color: "#fff" }}>Keep OPPY one solid color — Opyo Blue, bone, or ink. No gradients, no realistic rendering. The silhouette is the star.</p>
              </div>
            </div>
          </div>
          <div style={{ position: "relative", marginTop: 18 }}>
            <div className="lbl" style={{ fontSize: 14, color: C.blueMuted, marginBottom: 10 }}>EXPRESSION SET — to illustrate</div>
            <div className="bb-4col" style={{ display: "flex", gap: 12 }}>
              {["HYPE", "RAGE", "CHILL", "CLUTCH"].map((e) => (
                <div key={e} style={{ flex: 1, minHeight: 96, background: C.panel, border: "2px solid rgba(122,138,196,0.22)", display: "flex", alignItems: "flex-end", padding: 9 }}>
                  <span className="lbl" style={{ fontSize: 13, color: C.blueMuted }}>{e}</span>
                </div>
              ))}
            </div>
          </div>
          <Foot n="05" dark />
        </Sheet>

        {/* ============ 06 · LOCKUPS & MISUSE ============ */}
        <Sheet light>
          <Eyebrow color={C.blood}>04 / LOCKUPS &amp; MISUSE</Eyebrow>
          <h1 className="goth bb-h1" style={{ margin: "6px 0 0", color: C.blue }}>Lockups</h1>
          <div className="bb-grid2" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 20 }}>
            <div style={{ background: C.abyss, border: `2.5px solid ${C.ink}`, padding: 26, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 12, minHeight: 180 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <OppyMark color={C.light} width={69} style={{ height: 46, width: "auto" }} />
                <span className="goth" style={{ fontSize: 40, color: C.light }}>OPYO</span>
              </div>
              <span className="lbl" style={{ fontSize: 12, color: C.blueMuted }}>horizontal · reversed</span>
            </div>
            <div style={{ background: C.boneCard, border: `2.5px solid ${C.ink}`, padding: 26, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 12, minHeight: 180 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <OppyMark color={C.blue} width={69} style={{ height: 46, width: "auto" }} />
                <span className="goth" style={{ fontSize: 40, color: C.blue }}>OPYO</span>
              </div>
              <span className="lbl" style={{ fontSize: 12, color: C.blood }}>horizontal · primary</span>
            </div>
            <div style={{ background: C.blue, border: `2.5px solid ${C.ink}`, padding: 22, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10, minHeight: 180 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <OppyMark color={C.light} width={66} style={{ height: 44, width: "auto" }} />
                <span className="goth" style={{ fontSize: 30, color: "#fff" }}>OPYO</span>
              </div>
              <span className="lbl" style={{ fontSize: 12, color: "#C7D0FF" }}>stacked · on blue</span>
            </div>
            <div style={{ background: C.boneCard, border: `2.5px solid ${C.ink}`, padding: 22, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10, minHeight: 180 }}>
              <OppyMark color={C.ink} width={84} style={{ height: 56, width: "auto" }} />
              <span className="lbl" style={{ fontSize: 12, color: C.inkMuted }}>emblem only · avatars</span>
            </div>
          </div>
          <div className="lbl" style={{ position: "relative", fontSize: 18, color: C.blood, marginTop: 22 }}>Never do this</div>
          <div className="bb-grid3" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 10 }}>
            {[
              { label: "Don't stretch", mark: <OppyMark color={C.blue} width={84} style={{ height: 56, width: "auto", transform: "scaleX(1.7)" }} /> },
              { label: "Don't recolor", mark: <OppyMark color="#3FA84F" width={84} style={{ height: 56, width: "auto" }} /> },
              { label: "Don't rotate", mark: <OppyMark color={C.blue} width={84} style={{ height: 56, width: "auto", transform: "rotate(22deg)" }} /> },
              { label: "Don't fade out", mark: <OppyMark color={C.blue} width={84} style={{ height: 56, width: "auto", opacity: 0.35 }} /> },
              { label: "Don't clutter the bg", bg: "repeating-linear-gradient(45deg,#d8cfb4,#d8cfb4 9px,#c7bd9f 9px,#c7bd9f 18px)", mark: <OppyMark color={C.blue} width={84} style={{ height: 56, width: "auto" }} /> },
              { label: "Don't re-space", mark: <span className="goth" style={{ fontSize: 26, letterSpacing: "0.3em", color: C.blue }}>OPYO</span> },
            ].map((d) => (
              <div key={d.label} style={{ background: d.bg || C.boneCard, border: `2.5px solid ${C.ink}`, display: "flex", flexDirection: "column", minHeight: 130 }}>
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, overflow: "hidden" }}>{d.mark}</div>
                <div style={{ padding: "9px 12px", borderTop: `2px solid ${C.ink}`, background: C.boneCard, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 13, height: 13, borderRadius: "50%", background: C.blood, flex: "none" }} />
                  <span style={{ fontSize: 13 }}>{d.label}</span>
                </div>
              </div>
            ))}
          </div>
          <Foot n="06" />
        </Sheet>

        {/* ============ 07 · COLOR ============ */}
        <Sheet>
          <Eyebrow color={C.crown}>05 / COLOR</Eyebrow>
          <h1 className="goth bb-h1" style={{ margin: "6px 0 0" }}>From the deep</h1>
          <p style={{ position: "relative", margin: "14px 0 0", maxWidth: "36rem", fontSize: 17, lineHeight: 1.6, color: C.muted }}>
            Dark-mode first, like the platforms we live on. Abyss carries every screen; Opyo Blue leads; Crown gold is earned, never decorative. No loud neon — the glow comes from depth, not saturation.
          </p>
          <div className="bb-grid2" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 24 }}>
            {[
              ["Opyo Blue", "primary", C.blue, "#2A3BBC · 42 59 188"],
              ["Signal Blue", "links · live UI", C.signal, "#5B78FF · 91 120 255"],
              ["Abyss", "dark base", C.abyss, "#0E1016 · 14 16 22"],
              ["Bone", "print · light", C.bone, "#EDE4CE · 237 228 206"],
            ].map(([name, role, hex, rgb]) => (
              <div key={name} style={{ border: "2.5px solid rgba(122,138,196,0.3)" }}>
                <div style={{ height: 96, background: hex, borderBottom: name === "Abyss" ? "1px solid rgba(122,138,196,0.2)" : "none" }} />
                <div style={{ padding: "12px 15px", background: C.panel }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span className="lbl" style={{ fontSize: 16 }}>{name}</span>
                    <span style={{ fontSize: 12, color: C.blueMuted }}>{role}</span>
                  </div>
                  <div style={{ marginTop: 4, fontSize: 13, color: C.muted2 }}>{rgb}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bb-2col" style={{ position: "relative", marginTop: 14, display: "flex", gap: 14 }}>
            <div style={{ flex: 1, display: "flex", border: "2.5px solid rgba(122,138,196,0.3)" }}>
              <div style={{ width: 76, background: C.crown, flex: "none" }} />
              <div style={{ flex: 1, padding: "11px 15px", background: C.panel }}>
                <span className="lbl" style={{ fontSize: 15 }}>Crown</span>
                <div style={{ marginTop: 3, fontSize: 12.5, color: C.muted2 }}>#C89B3C · wins &amp; rank — earned only</div>
              </div>
            </div>
            <div style={{ flex: 1, display: "flex", border: "2.5px solid rgba(122,138,196,0.3)" }}>
              <div style={{ width: 76, background: C.blood, flex: "none" }} />
              <div style={{ flex: 1, padding: "11px 15px", background: C.panel }}>
                <span className="lbl" style={{ fontSize: 15 }}>Blood</span>
                <div style={{ marginTop: 3, fontSize: 12.5, color: C.muted2 }}>#A8433F · live &amp; alerts, sparingly</div>
              </div>
            </div>
          </div>
          <div style={{ position: "relative", marginTop: 16 }}>
            <div className="lbl" style={{ fontSize: 14, color: C.blueMuted, marginBottom: 8 }}>USAGE RATIO</div>
            <div style={{ display: "flex", height: 26, fontSize: 11, overflow: "hidden", border: "1px solid rgba(122,138,196,0.25)" }}>
              <div style={{ flex: 60, background: C.abyss, color: C.light, display: "flex", alignItems: "center", paddingLeft: 10 }}>60 Abyss</div>
              <div style={{ flex: 25, background: C.blue, color: "#fff", display: "flex", alignItems: "center", paddingLeft: 10 }}>25 Blue</div>
              <div style={{ flex: 10, background: C.bone, color: C.ink, display: "flex", alignItems: "center", paddingLeft: 10 }}>10 Bone</div>
              <div style={{ flex: 5, background: C.crown, color: C.ink, display: "flex", alignItems: "center", paddingLeft: 8 }}>5</div>
            </div>
          </div>
          <Foot n="07" dark />
        </Sheet>

        {/* ============ 08 · TYPOGRAPHY ============ */}
        <Sheet light>
          <Eyebrow color={C.blood}>06 / TYPOGRAPHY</Eyebrow>
          <h1 className="goth bb-h1" style={{ margin: "6px 0 0", color: C.blue }}>Type system</h1>
          <div className="bb-3col" style={{ position: "relative", display: "flex", gap: 14, marginTop: 24 }}>
            <div style={{ flex: 1.3, padding: 24, background: C.abyss, color: C.light, border: `2.5px solid ${C.ink}` }}>
              <div className="lbl" style={{ fontSize: 14, color: C.blueMuted }}>DISPLAY</div>
              <div className="goth" style={{ fontSize: 88, lineHeight: 0.9, marginTop: 8 }}>Aa</div>
              <div className="goth" style={{ fontSize: 26, marginTop: 6 }}>Pirata One</div>
              <p style={{ margin: "10px 0 0", fontSize: 13.5, color: C.muted2, lineHeight: 1.45 }}>Headlines &amp; the wordmark. Gothic, ancient, loud. One weight.</p>
            </div>
            <div style={{ flex: 1, padding: 24, background: C.boneCard, border: `2.5px solid ${C.ink}` }}>
              <div className="lbl" style={{ fontSize: 14, color: C.blood }}>MARKER</div>
              <div className="lbl" style={{ fontSize: 60, lineHeight: 0.9, marginTop: 8 }}>Aa</div>
              <div className="lbl" style={{ fontSize: 22, marginTop: 8 }}>Permanent Marker</div>
              <p style={{ margin: "10px 0 0", fontSize: 13.5, color: C.inkBody2, lineHeight: 1.45 }}>Labels, tags, callouts, hand notes.</p>
            </div>
            <div style={{ flex: 1, padding: 24, background: C.blue, color: "#fff", border: `2.5px solid ${C.ink}` }}>
              <div className="lbl" style={{ fontSize: 14, color: C.crown }}>BODY</div>
              <div style={{ fontFamily: "'Kalam',cursive", fontSize: 64, lineHeight: 0.9, marginTop: 8 }}>Aa</div>
              <div style={{ fontFamily: "'Kalam',cursive", fontWeight: 700, fontSize: 22, marginTop: 8 }}>Kalam</div>
              <p style={{ margin: "10px 0 0", fontSize: 13.5, color: "#C7D0FF", lineHeight: 1.45 }}>Running text. 300 / 400 / 700.</p>
            </div>
          </div>
          <div style={{ position: "relative", marginTop: 22, borderTop: `2.5px solid ${C.ink}` }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, padding: "13px 0", borderBottom: "2px dashed rgba(20,17,24,0.25)", flexWrap: "wrap" }}>
              <span className="lbl" style={{ fontSize: 12, color: C.inkMuted, width: 90 }}>Display</span>
              <span className="goth" style={{ fontSize: 40, color: C.blue }}>One profile. Every game.</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, padding: "13px 0", borderBottom: "2px dashed rgba(20,17,24,0.25)", flexWrap: "wrap" }}>
              <span className="lbl" style={{ fontSize: 12, color: C.inkMuted, width: 90 }}>Label</span>
              <span className="lbl" style={{ fontSize: 24 }}>Built for players, not platforms</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, padding: "13px 0", flexWrap: "wrap" }}>
              <span className="lbl" style={{ fontSize: 12, color: C.inkMuted, width: 90 }}>Body</span>
              <span style={{ fontSize: 17, lineHeight: 1.5, maxWidth: "32rem", color: C.inkBody }}>Compete, stream, and build a ranked history from a single verified Gamer ID that follows you across every game.</span>
            </div>
          </div>
          <Foot n="08" />
        </Sheet>

        {/* ============ 09 · GRID, ICONS & ART ============ */}
        <Sheet>
          <Eyebrow color={C.crown}>07 / GRID, ICONS &amp; ART</Eyebrow>
          <h1 className="goth bb-h1" style={{ margin: "6px 0 0" }}>Layout system</h1>
          <div className="bb-2col" style={{ position: "relative", display: "flex", gap: 16, marginTop: 22 }}>
            <div style={{ flex: 1 }}>
              <div className="lbl" style={{ fontSize: 14, color: C.blueMuted, marginBottom: 8 }}>12-COLUMN GRID</div>
              <div style={{ height: 180, background: C.panel, border: "2.5px solid rgba(122,138,196,0.28)", padding: 14, display: "flex", gap: 5 }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{ flex: 1, background: "rgba(91,120,255,0.2)" }} />
                ))}
              </div>
              <p style={{ margin: "10px 0 0", fontSize: 13.5, lineHeight: 1.5, color: C.muted2 }}>12 columns, 24px gutters, generous margins. Everything snaps to an 8px baseline.</p>
            </div>
            <div style={{ flex: 1 }}>
              <div className="lbl" style={{ fontSize: 14, color: C.blueMuted, marginBottom: 8 }}>ICONS — INKED LINE</div>
              <div style={{ height: 180, background: C.panel, border: "2.5px solid rgba(122,138,196,0.28)", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", placeItems: "center", padding: 12 }}>
                {[
                  <><circle cx="20" cy="20" r="14" /><circle cx="20" cy="20" r="4" /></>,
                  <path d="M20 6 L24 16 L34 16 L26 23 L29 33 L20 27 L11 33 L14 23 L6 16 L16 16 Z" />,
                  <path d="M8 28 L14 14 L20 24 L26 10 L32 28 Z" />,
                  <><rect x="7" y="11" width="26" height="18" rx="3" /><path d="M13 20 h5 M28 17 v6 M25 20 h6" /></>,
                  <path d="M20 8 C13 8 9 13 9 19 c0 8 11 13 11 13 s11-5 11-13 c0-6-4-11-11-11 Z" />,
                  <><path d="M8 30 V20 l12-10 12 10 v10 Z" /><path d="M16 30 v-7 h8 v7" /></>,
                  <><circle cx="20" cy="14" r="6" /><path d="M9 32 c0-7 5-11 11-11 s11 4 11 11" /></>,
                  <><path d="M10 12 h20 l-2 16 a6 6 0 0 1-16 0 Z" /><path d="M16 12 v-3 h8 v3" /></>,
                ].map((paths, i) => (
                  <svg key={i} width="40" height="40" viewBox="0 0 40 40" fill="none" stroke={C.signal} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "url(#bb-rough2)" }}>{paths}</svg>
                ))}
              </div>
              <p style={{ margin: "10px 0 0", fontSize: 13.5, lineHeight: 1.5, color: C.muted2 }}>Single 2.4px stroke, rounded joins, roughened edges. One weight, no fills — hand-inked to match the type.</p>
            </div>
          </div>
          <div style={{ position: "relative", marginTop: 20 }}>
            <div className="lbl" style={{ fontSize: 14, color: C.blueMuted, marginBottom: 8 }}>ART DIRECTION — drop real imagery here</div>
            <div className="bb-2col" style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 2, minHeight: 160, background: "repeating-linear-gradient(135deg,#161A26,#161A26 10px,#1c2233 10px,#1c2233 20px)", border: "2.5px solid rgba(122,138,196,0.28)", display: "flex", alignItems: "flex-end", padding: 13 }}>
                <span className="lbl" style={{ fontSize: 13, color: C.blueMuted }}>Campus watch party — screen-lit, high contrast, real crowds</span>
              </div>
              <div style={{ flex: 1, minHeight: 160, background: "repeating-linear-gradient(135deg,#161A26,#161A26 10px,#1c2233 10px,#1c2233 20px)", border: "2.5px solid rgba(122,138,196,0.28)", display: "flex", alignItems: "flex-end", padding: 13 }}>
                <span className="lbl" style={{ fontSize: 13, color: C.blueMuted }}>Player portrait</span>
              </div>
            </div>
            <p style={{ margin: "10px 0 0", maxWidth: "38rem", fontSize: 13.5, lineHeight: 1.5, color: C.muted2 }}>Energetic and human: students mid-clutch, lit by monitors and RGB. Deep shadows, a blue cast, grain. Never sterile stock.</p>
          </div>
          <Foot n="09" dark />
        </Sheet>

        {/* ============ 10 · GAMER ID & APPS ============ */}
        <Sheet light>
          <Eyebrow color={C.blood}>08 / GAMER ID &amp; APPS</Eyebrow>
          <h1 className="goth bb-h1" style={{ margin: "6px 0 0", color: C.blue }}>In the wild</h1>
          <p style={{ position: "relative", margin: "12px 0 0", maxWidth: "36rem", fontSize: 16, lineHeight: 1.55, color: C.inkBody }}>
            The Gamer ID is the brand's hero surface — a verifiable gaming passport. Four tiers, one look: dark card, blue frame, crown gold for rank.
          </p>
          <div className="bb-2col" style={{ position: "relative", display: "flex", gap: 16, marginTop: 20 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ background: C.abyss, border: `2.5px solid ${C.blue}`, padding: 20, color: C.light, position: "relative", overflow: "hidden" }}>
                <div aria-hidden style={{ position: "absolute", top: "-1in", right: "-1in", width: "3in", height: "3in", background: "radial-gradient(circle,rgba(62,91,255,0.3),transparent 62%)" }} />
                <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div className="lbl" style={{ fontSize: 12, color: C.blueMuted }}>GAMER ID</div>
                    <div className="goth" style={{ fontSize: 30, lineHeight: 1, marginTop: 2 }}>@nightcrawler</div>
                  </div>
                  <OppyMark color={C.light} width={42} />
                </div>
                <div style={{ position: "relative", display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                  <span className="lbl" style={{ fontSize: 12, padding: "4px 10px", background: C.crown, color: C.ink }}>T2 · VERIFIED</span>
                  <span className="lbl" style={{ fontSize: 12, padding: "4px 10px", border: "1.5px solid rgba(122,138,196,0.5)", color: "#C7D0FF" }}>DIAMOND II</span>
                </div>
                <div style={{ position: "relative", display: "flex", gap: 18, marginTop: 16, flexWrap: "wrap" }}>
                  <div><div className="goth" style={{ fontSize: 28, color: C.crown }}>12,480</div><div className="lbl" style={{ fontSize: 11, color: C.blueMuted }}>CROWNS</div></div>
                  <div><div className="goth" style={{ fontSize: 28, color: C.signal }}>47</div><div className="lbl" style={{ fontSize: 11, color: C.blueMuted }}>WIN STREAK</div></div>
                  <div><div className="goth" style={{ fontSize: 28, color: C.light }}>#3</div><div className="lbl" style={{ fontSize: 11, color: C.blueMuted }}>CAMPUS RANK</div></div>
                </div>
              </div>
              <div style={{ background: C.abyss, border: "2px solid rgba(122,138,196,0.3)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, color: C.light, flexWrap: "wrap" }}>
                <span className="lbl" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#fff", background: C.blood, padding: "4px 9px" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />LIVE
                </span>
                <OppyMark color={C.light} width={22} />
                <span style={{ fontSize: 14, fontWeight: 700 }}>Valorant — Grand Final</span>
                <span className="lbl" style={{ marginLeft: "auto", fontSize: 12, color: C.blueMuted }}>18.2K</span>
              </div>
              <div style={{ width: 96, height: 96, borderRadius: 22, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <OppyMark color={C.light} width={58} />
              </div>
            </div>
            <div style={{ flex: 1, background: C.abyss, border: `2.5px solid ${C.ink}`, padding: 18, color: C.light }}>
              <div className="lbl" style={{ fontSize: 15, color: C.crown }}>Tier architecture</div>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 9 }}>
                {[
                  ["T0", "Guest", "Social login · spectate", "#6B7186", "#9AA0B4"],
                  ["T1", "Player", "Uni email · tournaments & crowns", C.signal, C.signal],
                  ["T2", "Verified Player", "Student ID + face match · seeding", C.crown, C.crown],
                  ["T3", "Business ID", "Full KYC · payouts & contracts", C.blood, C.blood],
                ].map(([t, name, desc, border, tColor]) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 13px", background: C.panel, borderLeft: `4px solid ${border}` }}>
                    <span className="goth" style={{ fontSize: 22, width: 38, color: tColor }}>{t}</span>
                    <div style={{ flex: 1 }}>
                      <div className="lbl" style={{ fontSize: 15 }}>{name}</div>
                      <div style={{ fontSize: 12.5, color: C.muted2 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, padding: 13, background: C.blue, display: "flex", alignItems: "center", gap: 12 }}>
                <OppyMark color={C.light} width={34} style={{ flex: "none" }} />
                <p className="lbl" style={{ margin: 0, fontSize: 14, lineHeight: 1.3, color: "#fff" }}>Steam's history. LinkedIn's trust. One passport.</p>
              </div>
            </div>
          </div>
          <Foot n="10" />
        </Sheet>

        {/* ============ 11 · VOICE & TONE ============ */}
        <Sheet>
          <Eyebrow color={C.crown}>09 / VOICE &amp; TONE</Eyebrow>
          <h1 className="goth bb-h1" style={{ margin: "6px 0 0" }}>Sounds like OPYO</h1>
          <p style={{ position: "relative", margin: "14px 0 0", maxWidth: "38rem", fontSize: 17, lineHeight: 1.55, color: C.muted }}>
            <span className="lbl" style={{ color: "#fff" }}>Confident, direct, player-first.</span> Short lines. Gamer-native, never forced. We hype the player, not ourselves.
          </p>
          <div className="bb-2col" style={{ position: "relative", display: "flex", gap: 16, marginTop: 24 }}>
            <div style={{ flex: 1, padding: 20, background: C.panel, border: `2.5px solid ${C.blue}` }}>
              <div className="lbl" style={{ fontSize: 16, color: C.signal }}>We say</div>
              <ul style={{ margin: "10px 0 0", paddingLeft: 18, fontSize: 15.5, lineHeight: 1.7, color: "#DBDEE8" }}>
                <li>"One profile. Every game."</li>
                <li>"Bring your whole squad."</li>
                <li>"Clutch it. We're watching."</li>
              </ul>
            </div>
            <div style={{ flex: 1, padding: 20, background: C.panel, border: `2.5px solid ${C.blood}` }}>
              <div className="lbl" style={{ fontSize: 16, color: C.blood }}>We don't</div>
              <ul style={{ margin: "10px 0 0", paddingLeft: 18, fontSize: 15.5, lineHeight: 1.7, color: C.muted2 }}>
                <li>"Leverage synergistic solutions."</li>
                <li>"Please consider registering."</li>
                <li>Corporate, timid, or cringe.</li>
              </ul>
            </div>
          </div>
          <div className="bb-3col" style={{ position: "relative", marginTop: 20, display: "flex", gap: 14 }}>
            {[
              ["Tone dial", "Loud in marketing, calm in the product, precise in the Gamer ID. Never all three at once."],
              ["Wellness first", "We never guilt-trip play. Healthy gaming is baked into how we speak to students."],
              ["Campus-native", "Local pride, real slang, campus-vs-campus. Speak like a Club Lead, not a brand."],
            ].map(([t, d]) => (
              <div key={t} style={{ flex: 1, padding: "16px 18px", background: C.panel2, border: "1.5px solid rgba(122,138,196,0.18)" }}>
                <div className="lbl" style={{ fontSize: 14, color: C.crown }}>{t}</div>
                <p style={{ margin: "6px 0 0", fontSize: 14, color: C.muted2, lineHeight: 1.45 }}>{d}</p>
              </div>
            ))}
          </div>
          <Foot n="11" dark />
        </Sheet>

        {/* ============ 12 · BACK ============ */}
        <Sheet style={{ minHeight: "90vh" }}>
          <div aria-hidden style={{ position: "absolute", bottom: "-22%", left: "-20%", width: "80%", height: "80%", background: "radial-gradient(circle,rgba(62,91,255,0.28),transparent 62%)" }} />
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span className="lbl" style={{ fontSize: 14, color: C.crown }}>BRAND BOOK</span>
            <span className="lbl" style={{ fontSize: 14, color: C.teal }}>END</span>
          </div>
          <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24, padding: "40px 0" }}>
            <OppyMark color={C.light} width={118} style={{ transform: "rotate(-5deg)" }} />
            <div className="goth bb-back" style={{ lineHeight: 0.88 }}>Play as one.</div>
            <p style={{ maxWidth: "32rem", fontSize: 17, lineHeight: 1.55, color: C.muted2 }}>Questions on brand usage, assets, or partnerships? Reach the studio.</p>
          </div>
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid rgba(122,138,196,0.25)", paddingTop: 18, flexWrap: "wrap", gap: 16 }}>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: C.muted }}>
              <div className="lbl" style={{ fontSize: 15, color: "#fff", marginBottom: 4 }}>OPYO STUDIO PRIVATE LIMITED</div>
              <div>Nabrangpur, Odisha, India</div>
              <div>rohitkumargond129@gmail.com</div>
            </div>
            <div className="lbl" style={{ fontSize: 12, color: C.blueMuted }}>© 2026 · V1</div>
          </div>
        </Sheet>
      </div>
    </div>
  );
}

/* Scoped styles: fonts + responsive collapse. Namespaced under .bb so the
   rest of the dark app is untouched. */
const scopedCss = `
.bb{background:#08090d;min-height:100vh;font-family:'Kalam',cursive;color:#ECEAF2;-webkit-font-smoothing:antialiased}
.bb .goth{font-family:'Pirata One',system-ui,cursive;letter-spacing:0.01em}
.bb .lbl{font-family:'Permanent Marker',cursive;letter-spacing:0.02em}
.bb .bb-stack{max-width:940px;margin:0 auto;display:flex;flex-direction:column;gap:20px;padding:20px}
.bb .bb-sheet{padding:clamp(24px,5vw,64px)}
.bb .bb-hero{font-size:clamp(90px,18vw,170px)}
.bb .bb-back{font-size:clamp(56px,12vw,96px)}
.bb .bb-lead{font-size:clamp(26px,4.4vw,40px)}
.bb .bb-h1{font-size:clamp(46px,8vw,78px);line-height:0.9}
@media (max-width:720px){
  .bb .bb-2col,.bb .bb-3col,.bb .bb-4col{flex-direction:column}
  .bb .bb-grid2,.bb .bb-grid3{grid-template-columns:1fr!important}
  .bb .bb-toc-title{font-size:18px!important}
}
`;
