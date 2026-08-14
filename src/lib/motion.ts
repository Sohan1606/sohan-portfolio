// src/lib/motion.ts
// Shared, correctly-typed Framer Motion variants.
// Uses string easing names — compatible with framer-motion v11 / motion-dom.
import type { Variants } from "framer-motion";

// Cubic bezier approximated as closest named easing
// [0.25, 0.1, 0.25, 1] ≈ "easeOut"
// Use these factory functions so reduced-motion can zero out y offsets.

export function makeReveal(reduced: boolean | null): Variants {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
}

export function makeStagger(delay = 0.05, stagger = 0.08): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

export function makeFadeItem(reduced: boolean | null): Variants {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };
}

export function makeRowItem(reduced: boolean | null): Variants {
  return {
    hidden: { opacity: 0, x: reduced ? 0 : -10 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
}

export function makeLine(reduced: boolean | null): Variants {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };
}

export function makeSubtle(): Variants {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
}

export const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

// Standard viewport config
export const VP = { once: true, margin: "-80px" } as const;
export const VP_CLOSE = { once: true, margin: "-60px" } as const;
export const VP_NEAR = { once: true, margin: "-40px" } as const;
