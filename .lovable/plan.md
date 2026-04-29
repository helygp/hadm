# HAD Method Portal — Build Plan

A premium, institutional, dark-first portal that ports the uploaded Claude reference faithfully into a clean React + TypeScript + Tailwind + shadcn/ui codebase, then extends it with the artifact library, AI-tool guides, and the `.md` instruction generator as first-class experiences.

---

## 1. Visual System (locked from the reference)

- **Palette (dark, default)**: `--bg #0B0D10`, `--surface #14181E`, `--surface-2 #1A1F26`, accent cyan `#00E5FF`, deep blue `#2D5BFF`, ice-blue human accent `#A8C5FF`, ink `#E8ECF1`.
- **Palette (light)**: graphite-on-paper variant from the reference (`#F2F4F7` bg, `#0085A1` cyan, `#1E40C8` blue).
- **Typography**: Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (mono labels, eyebrow tags, file names).
- **Geometry**: sharp corners (`--radius 0px`, `--radius-lg 2px`), 1px hairline borders `rgba(255,255,255,.07)`, generous container `max-w 1320px` with `clamp(20px,4vw,56px)` padding.
- **Motion**: subtle only — fade/slide-in on scroll, orbital pulse on the governance core, hover lifts on cards, smooth scroll for anchor nav.
- All tokens declared as HSL CSS variables in `index.css` and wired through `tailwind.config.ts` so every component is themeable.

## 2. Information Architecture

**Single scrollable landing** with sticky nav anchoring to sections, **plus dedicated routes** for the deeper experiences:

- `/` — Landing (Hero, Why HAD, Definition + 4 Principles, Operating Loop, Artifact Library preview, Toolkits preview, Use Cases, Community, Suggest Use Case, Contribute, FAQ, Footer)
- `/artifacts` — Full filterable Artifact Library
- `/toolkits` — All AI Tool Configuration Guides + per-tool detail modal
- `/toolkits/:toolId` — Deep page for one tool (setup steps + downloadable files)
- `/generator` — Tool-specific `.md` Instruction Generator workspace
- `/community` — Founding community application
- `/cases/submit` — Suggest a Use Case
- `/contribute` — Contribute to the Method
- `*` — NotFound (existing)

Sticky top nav: Method · Loop · Artifacts · Toolkits · Community · Cases · FAQ · **Download Starter Kit** (primary). Mobile: slide-in sheet.

## 3. Sections & Components

### Hero
- Eyebrow mono label "HAD · Human-Governed Agentic Delivery"
- Display headline "Human-Governed Agentic Delivery"
- Sub + slogan "Humans govern. Agents conceive. AI delivers. Value validates."
- Three CTAs: Download Starter Kit (primary cyan), Configure Your AI Tool (secondary), Join the Community (ghost)
- **Hero visual**: animated SVG **Orbital Governance Core** — central human-governance node (ice-blue) with 6–8 orbiting agent nodes connected by value-flow lines, gentle pulse and rotation. Ported from `orbital.jsx` in the reference.

### Why HAD
Two-column comparison: Traditional Agile vs HAD Method, mono labels, hairline dividers, ice-blue check marks on HAD side.

### What is HAD + 4 Principle cards
Subtle gradient cards (Human Governance, Agentic Conception, AI-Powered Delivery, Value Validation) with custom abstract icons (no robots).

### HAD Operating Loop
Circular 7-step loop (Govern → Discover → Conceive → Design → Deliver → Validate → Evolve) on desktop; vertical timeline on mobile. Each step expands to show description.

### Artifact Library (preview on landing, full at `/artifacts`)
- Filter chips by category (Manifesto, Canvas, Prompt, Agent, Checklist, Template, Toolkit, Software Builder Guide, Governance) + search input
- Card grid with title, category eyebrow, description, format pills (PDF/Markdown/ZIP/DOC/Miro/FigJam)
- Buttons: **Preview** (modal with rendered Markdown), **Download** (triggers .md/.zip blob), **Copy Markdown**
- Seeded with all 8 artifacts from the brief; markdown bodies live in `src/content/artifacts/*.md`

### AI Tool Configuration Guides (`/toolkits`)
Card grid for Claude, OpenAI, Gemini, Lovable, Cursor, Copilot, Windsurf, Replit, n8n. Each card: tool logo glyph, description, "Recommended setup" steps, list of downloadable `.md` files with copy/download/preview buttons, "Open guide" linking to `/toolkits/:toolId`.

### `.md` Instruction Generator (`/generator`)
Two-pane workspace:
- **Left — Form**: Tool select, Usage type select, Autonomy level (segmented control 0–5, default 2, with description), Project context fields (initiative, problem, users, value, risks, data sensitivity, approvals, environment, tools).
- **Right — Live preview**: rendered Markdown updating as the user types, with a mono code view tab.
- Action bar: **Copy Markdown**, **Download .md**, **Save to Starter Kit** (adds to a localStorage-backed kit), **Reset**.
- Generation is fully client-side: a `buildInstruction(input)` pure function assembles the template, conditionally injecting "Software Builder Rules" or "Governance Review Rules" based on usage type.

### Community Application
Form (Name, Email, LinkedIn, Role, Company, Country, Area of interest, Contribution type select). Validation via `react-hook-form` + zod. Submit → success card with confetti-free, institutional confirmation. Data shape ready for Supabase insert later.

### Suggest a Use Case
Form (Title, Industry, Problem, How AI agents could help, Governance concerns, Expected value). Same submit pattern.

### Contribute
6 contribution-type cards each opening a focused mini-form or mailto fallback.

### Use Cases
8 cards (Enterprise Digital Transformation, ServiceNow Delivery, Startup MVPs, Internal Tools, AI Products, Shared Services/CSC, HR & Recruitment, Public Sector). Each: icon, title, "How HAD applies" body.

### FAQ
Accordion with the 7 supplied Q&As.

### Footer
HAD wordmark, slogan, nav columns (Method, Artifacts, Community, Resources), small print, theme toggle, "Built under HAD Method" mono badge.

## 4. Theme Toggle + Tweaks Panel

- **Theme toggle** in the header: Dark (default) / Light. Persists in `localStorage`. Applied via `data-theme` on `<html>`.
- **Tweaks panel**: floating bottom-right drawer (matches `tweaks-panel.jsx` from the reference) exposing live sliders for accent hue, contrast, density, radius, motion intensity, and a reset. Writes to CSS vars on `:root`. Hidden behind a small gear button so it doesn't disturb visitors.

## 5. Data Layer (mock now, Supabase-ready)

All content lives in typed modules under `src/data/`:

```text
src/data/
  artifacts.ts        # Artifact[]
  toolkits.ts         # Toolkit[] with files: { name, body }
  operatingLoop.ts    # LoopStep[]
  principles.ts       # Principle[]
  useCases.ts         # UseCase[]
  faqs.ts             # Faq[]
  autonomyLevels.ts   # AutonomyLevel[]
  instructionTemplates.ts # base + per-tool overrides + per-usage blocks
src/content/
  artifacts/*.md      # full markdown bodies for each artifact
src/lib/
  generator.ts        # buildInstruction(input) -> string
  download.ts         # downloadText(name, body, mime)
  clipboard.ts        # copyToClipboard(text)
  starterKit.ts       # localStorage-backed saved files
```

A thin `repositories/` layer wraps reads (`listArtifacts`, `getToolkit`, `submitCommunityApplication`) so swapping mock for Supabase later is a one-file change per entity.

## 6. Tech Notes

- React 18 + Vite + TS, Tailwind v3, shadcn/ui (Dialog, Sheet, Accordion, Tabs, Select, Toast, Input, Textarea, Label, Form), `react-router-dom`, `react-hook-form` + `zod`, `react-markdown` + `remark-gfm` for previews, `lucide-react` for icons.
- Custom SVG orbital component (no Three.js, keeps bundle light).
- All forms produce typed payloads matching planned Supabase tables (`community_applications`, `use_case_submissions`, `contributions`).
- Accessibility: focus rings on cyan, semantic landmarks, prefers-reduced-motion respected.
- Responsive: mobile-first, tested at 375 / 768 / 1280 / 1440.

## 7. Build Order

1. Design tokens (`index.css` + `tailwind.config.ts`) + fonts + base layout shell
2. Sticky Nav, Footer, Theme toggle, Tweaks panel
3. Hero + Orbital SVG
4. Why HAD, Definition + Principles, Operating Loop
5. Artifact data + Library section + `/artifacts` page + Preview modal + download/copy utilities
6. Toolkits data + Toolkits section + `/toolkits` + `/toolkits/:toolId`
7. Generator workspace `/generator` (form, template engine, live preview, actions, Save to Starter Kit)
8. Use Cases, Community form, Suggest Use Case, Contribute, FAQ
9. Responsive pass + motion polish + a11y pass

## 8. Out of Scope (v1)

- Auth, payments, real backend persistence (forms stored in local state, structured for Supabase later).
- Real file hosting for PDFs/ZIPs — downloads serve generated `.md` and a client-zipped Starter Kit (`jszip`) bundling the user's saved files.
- Admin UI (data is editable via the typed `src/data/*.ts` modules).
