# OPYO Studio — Product Requirements

## Problem Statement
A high-end, immersive 3D website for **OPYO Studio** — a futuristic gaming ecosystem company. Inspired by bitkraft.vc interaction style but not copied. Must feel like entering a living AI-powered gaming ecosystem rather than a normal website.

## User Personas
- **Visitor / player** — arriving from social, exploring the ecosystem cinematically.
- **Creator / streamer** — assessing OPYO Nexus as a tool.
- **Developer / investor** — scanning for depth, seriousness, clarity.
- **Candidate** — wants to join the team via Careers form.

## Architecture
- **Frontend**: React 19 (CRA + craco), Three.js / @react-three/fiber, GSAP, Framer Motion, Lenis, Tailwind, shadcn/ui, lucide-react
- **Backend**: FastAPI + Motor (MongoDB)
- **3D background**: Imperative THREE.js neural-network constellation (scene built with `useThree`, objects added via `scene.add` — avoids visual-edits JSX prop injection on R3F primitives)
- **Routing**: Single-page with section overlays (no react-router needed)

## Design System (locked)
- Strict palette: **blue / black / white** only (no purple/violet)
- Fonts: **Chakra Petch** (display) + **IBM Plex Sans** (body) + **JetBrains Mono** (code/HUD)
- Visual language: glassmorphism, hairline borders, scanlines, corner brackets, code-as-content pseudo-code blocks
- Motion: parallax cursor, GSAP-less transitions (Tailwind), breathing rings, particle constellation reacting to cursor

## Implemented (v0.1.0 — 2026-04-24)
- Terminal-style boot loader (ASCII logo, log stream, percentage, SKIP button)
- Neural-network constellation 3D background (650 particles, dynamic edges, mouse repulsion)
- Radial circular navigation menu (OPYO core + 6 orbital items: Vision, Projects, People, Nexus, About, Careers)
- HUD overlays (UTC clock, cursor coords, corner frames)
- WebAudio-generated UI sounds (hover/click/boot) + sound mute toggle
- Six full section pages:
  - Vision — thesis cards + ecosystem trio
  - Projects — 6 holographic cards (fetched from backend, hover reveals description)
  - People — 6 operator cards (fetched from backend, initials avatars)
  - Nexus — multi-panel AI-OS dashboard (metrics, agent feed, stream preview, waveform, overlay director, coach bars)
  - About — mission/approach/stance + vertical timeline
  - Careers — pseudo-code intro + **functional application form** with validation, save to MongoDB, success state
- Backend routes: `/api/` (health), `/api/health`, `/api/projects`, `/api/people`, `/api/careers/apply`, `/api/careers/applications`
- Seed data auto-loaded on startup for projects + people
- `data-testid` attributes on all interactive elements

## Backlog
- **P0**: None — all MVP scope shipped.
- **P1**: Replace placeholder content (projects, people) with real OPYO data when user provides it.
- **P1**: Admin/CMS for editing projects/people/careers (optional future phase).
- **P2**: Email notification on career submission (SendGrid/Resend).
- **P2**: Scroll-based 3D storytelling inside Nexus section (spaceship idea from prompt).
- **P2**: Replace initials avatars with real photos when provided.
- **P2**: Fine-tune sound palette, add ambient drone.

## Next Action Items
- Collect real content + headshots from user
- Decide whether to add auth-protected admin CMS
- Optional: integrate email service for careers form
