# SOHAN // SYSTEM 5.0

Personal developer operating system — portfolio for **Sohan Khachane**,
a 4th-year Computer Engineering student focused on **Cloud Engineering,
DevOps, DevSecOps and Software Engineering**.

> SOHAN // SYSTEM 5.0 — a personal developer operating system.
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
  components/   # Navigation, SystemBoot, TerminalEgg, CustomCursor, ...
  sections/     # Hero, Identity, Stack, Work, Lab, Journey, Now, Contact
  hooks/        # useActiveSection, useEasterEggs, useScrollLock, ...
  data/         # verified project + stack data (source of truth)
  lib/          # shared motion variants
  index.css     # global styles + design tokens
```

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
