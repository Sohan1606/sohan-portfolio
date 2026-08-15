# SOHAN // REDLINE SYSTEM

Cinematic developer portfolio for **Sohan Khachane** — a 4th-year Computer Engineering student focused on **Cloud Engineering, DevOps, DevSecOps and Software Engineering**.

> SOHAN // REDLINE SYSTEM — late-night coder terminal energy.
> Black screen. White type. Red signals. Real projects. Real systems.

## Stack

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (design system)
- **Framer Motion** (animation / motion architecture)

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
npm run lint     # eslint
npm run preview  # preview the production build
```

## Structure

```
src/
  components/   # Navigation, SystemBoot, SystemBrowser, ProjectModal, ...
  sections/     # Hero, DevLab, Identity, OpenRepo, Manifesto, Work,
                # Lab, Stack, Journey, Now, Contact
  hooks/        # useActiveSection, useEasterEggs, useScrollLock, ...
  data/         # verified project + stack data (source of truth)
  lib/          # shared motion variants
  index.css     # global styles + design tokens
```

## Experience map

The site is built as a scroll-led story, paced after cinematic portfolio
references but written entirely in Sohan's coder language:

1. **Boot** — skippable compile ritual (`I turn late-night bugs into shipped systems.`)
2. **Hero** — huge lowercase `sohan`, `Code by day, more code by midnight.`,
   cursor-reactive red glow, 09:00 → 00:00 timeline, verified snapshot strip
3. **Dev Lab** — brand strip (vscode / github / vercel / docker / original code / sohan / Dev Lab)
4. **Tech marquee** — verified stack names only
5. **Origin** — `things that shipped`, truthful archive stats, philosophy, builds hustled at
6. **Open Repo** — unfiltered commit-history cards (ORIGIN / SECURITY / CLOUD / NOW)
7. **Manifesto** — four operating rules
8. **Best Work** — engineering archive + RED LINE // DEPLOYMENT ROUTE terminal browser (keyboard navigable, Enter dissects)
9. **Lab** — experiments and prototypes
10. **insomniacStack** — hover playground with real usage signals
11. **Path + Now** — build sequence, engineering evolution, current system state
12. **Contact** — no forms; copy handles, ghost `SK`, `Action Req. → Close Case` ending ritual

## Conventions

- **No fabricated claims.** All project, stack and personal data is verified
  from actual GitHub repositories. Nothing is invented to look stronger.
- **Reduced-motion aware.** Boot sequence, cursor and large animations respect
  `prefers-reduced-motion`.
- **Accessible.** Semantic HTML, keyboard navigation, visible focus states,
  `aria` labels, skip-to-content link.
- **Security-minded.** No secrets in the frontend. All `target="_blank"` links
  use `rel="noopener noreferrer"`. Easter-egg terminal is a safe client-side
  simulation — no `eval`, no `Function()`, no unsafe HTML.

## Deployment

Canonical production URL:

```
https://sohan-portfolio-six.vercel.app/
```

Pushes to `main` trigger the Vercel deployment automatically.
