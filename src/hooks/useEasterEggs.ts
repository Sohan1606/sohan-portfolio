// useEasterEggs.ts
// Global easter egg handlers. All timers cleaned up on unmount.
import { useEffect, useState, useCallback, useRef } from "react";

const KONAMI: string[] = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
];

let consoleMessagePrinted = false;

function printConsoleMessage() {
  if (consoleMessagePrinted) return;
  consoleMessagePrinted = true;
  if (typeof window === "undefined") return;

  const s = (color: string, extra = "") =>
    `color:${color};font-family:monospace;font-size:11px;${extra}`;

  console.log("%cSOHAN // SYSTEM", s("#DC2626","font-size:14px;font-weight:bold;"));
  console.log(
    "%cIf you are reading this, you are probably the kind of person who checks the console.",
    s("#888888"),
  );
  console.log("%cBuilt with React + TypeScript + Vite.", s("#555555"));
  console.log("%cgithub.com/Sohan1606", s("#DC2626"));
}

export function useEasterEggs() {
  const [terminalOpen,   setTerminalOpen]   = useState(false);
  const [konamiVisible,  setKonamiVisible]  = useState(false);

  const konamiProgress  = useRef<string[]>([]);
  const konamiTimer     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const konamiHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // One-time console message
  useEffect(() => {
    printConsoleMessage();
  }, []);

  const openTerminal  = useCallback(() => setTerminalOpen(true),  []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // ── TERMINAL SHORTCUT ──
      const target = e.target as HTMLElement;
      const tag    = target.tagName.toLowerCase();
      const isTyping =
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        target.isContentEditable;

      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === "/" || e.key === "K" || e.key === "k") &&
        !isTyping
      ) {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
        return;
      }

      // ── KONAMI SEQUENCE ──
      const ARROW_KEYS = ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"];
      if (!ARROW_KEYS.includes(e.key)) {
        if (konamiProgress.current.length > 0) {
          konamiProgress.current = [];
        }
        return;
      }

      konamiProgress.current = [...konamiProgress.current, e.key];

      // Reset after 3s inactivity
      if (konamiTimer.current) clearTimeout(konamiTimer.current);
      konamiTimer.current = setTimeout(() => {
        konamiProgress.current = [];
      }, 3000);

      const progress = konamiProgress.current;
      if (progress.length >= KONAMI.length) {
        const tail = progress.slice(-KONAMI.length);
        if (tail.every((k, i) => k === KONAMI[i])) {
          konamiProgress.current = [];
          if (konamiTimer.current) clearTimeout(konamiTimer.current);
          if (konamiHideTimer.current) clearTimeout(konamiHideTimer.current);
          setKonamiVisible(true);
          konamiHideTimer.current = setTimeout(() => setKonamiVisible(false), 2800);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      if (konamiTimer.current)     clearTimeout(konamiTimer.current);
      if (konamiHideTimer.current) clearTimeout(konamiHideTimer.current);
    };
  }, []);

  return { terminalOpen, openTerminal, closeTerminal, konamiVisible };
}
