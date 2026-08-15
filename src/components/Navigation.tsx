// Navigation.tsx — SOHAN // SYSTEM 3.0
// Instrument panel. Minimal. Precise. System-language.
import React, { useState, useEffect, useRef } from "react";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollLock } from "../hooks/useScrollLock";
import { useSystemState } from "../hooks/useSystemState";

const SECTION_IDS = [
  "hero","identity","openrepo","manifesto","work","lab","stack","journey","now","contact",
];

const NAV_ITEMS = [
  { id: "identity",  label: "Origin",     short: "01" },
  { id: "openrepo",  label: "Git Log",    short: "02" },
  { id: "manifesto", label: "Rules",      short: "03" },
  { id: "work",      label: "Best Work",  short: "04" },
  { id: "lab",       label: "Archive",    short: "05" },
  { id: "stack",     label: "Stack",      short: "06" },
  { id: "journey",   label: "Path",       short: "07" },
  { id: "now",       label: "Now",        short: "08" },
  { id: "contact",   label: "Connect",    short: "09" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const Navigation: React.FC = () => {
  const active      = useActiveSection(SECTION_IDS);
  const systemState = useSystemState(active);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoNote, setLogoNote] = useState(false);

  useScrollLock(menuOpen);

  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = () => {
    scrollTo("hero");
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 500);
    if (clickCount.current >= 3) {
      clickCount.current = 0;
      if (logoTimer.current) clearTimeout(logoTimer.current);
      setLogoNote(true);
      logoTimer.current = setTimeout(() => setLogoNote(false), 2000);
    }
  };

  useEffect(() => () => {
    if (clickTimer.current) clearTimeout(clickTimer.current);
    if (logoTimer.current)  clearTimeout(logoTimer.current);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <>
      <header role="banner"
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-base/95 backdrop-blur-md border-b border-border/30"
            : "bg-transparent",
        ].join(" ")}>

        <div className="editorial h-14 flex items-center justify-between gap-4">

          {/* LOGOTYPE */}
          <div className="relative shrink-0">
            <button onClick={handleLogoClick} aria-label="Go to top"
              className="group flex items-center gap-2 focus-visible:outline-signal">
              <span className="font-sans font-black text-[0.85rem] tracking-[-0.05em]
                               text-fog group-hover:text-signal transition-colors duration-150">
                SK
              </span>
              <span className="font-mono text-[0.48rem] text-dim/60 tracking-widest
                               group-hover:text-signal transition-colors duration-150
                               hidden sm:block">
                // SYSTEM
              </span>
            </button>

            {logoNote && (
              <div className="absolute top-full left-0 mt-2 whitespace-nowrap
                             bg-surface border border-border/40 px-3 py-2
                             pointer-events-none select-none z-10"
                aria-live="polite" role="status">
                <span className="font-mono text-[0.48rem] text-signal tracking-widest uppercase block">
                  System
                </span>
                <span className="font-mono text-[0.42rem] text-dim/60 tracking-widest block">
                  identity confirmed.
                </span>
              </div>
            )}
          </div>

          {/* System state — desktop center */}
          <div className="hidden lg:flex items-center gap-2" aria-hidden="true">
            <span className="w-[3px] h-[3px] rounded-full bg-signal animate-pulse-red" />
            <span className="font-mono text-[0.5rem] text-muted/60 tracking-widest uppercase">
              {systemState}
            </span>
          </div>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-5 xl:gap-7">
            {NAV_ITEMS.map(({ id, label, short }) => {
              const isActive = active === id;
              return (
                <button key={id} onClick={() => scrollTo(id)}
                  aria-current={isActive ? ("page" as const) : undefined}
                  className={[
                    "group flex items-center gap-1 font-mono text-[0.55rem]",
                    "tracking-widest uppercase transition-colors duration-150",
                    "focus-visible:outline-signal",
                    isActive ? "text-signal" : "text-dim hover:text-fog",
                  ].join(" ")}>
                  <span className={isActive ? "text-signal" : "text-border/50 group-hover:text-dim"}>
                    {short}
                  </span>
                  <span>{label}</span>
                  {isActive && (
                    <span className="w-[3px] h-[3px] rounded-full bg-signal" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Connect CTA */}
          <a href="#contact" onClick={e => { e.preventDefault(); scrollTo("contact"); }}
            className="hidden lg:inline-flex items-center gap-1.5 font-mono text-[0.52rem]
                       tracking-widest uppercase text-dim/70 border border-border/40
                       px-3 py-1.5 hover:border-signal hover:text-signal
                       transition-all duration-150 focus-visible:outline-signal shrink-0">
            Connect
          </a>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(v => !v)}
            aria-expanded={menuOpen} aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            className="lg:hidden flex flex-col gap-[5px] p-2 focus-visible:outline-signal shrink-0">
            <span className={["block w-5 h-[1.5px] bg-fog transition-all duration-200 origin-center",
              menuOpen ? "rotate-45 translate-y-[6.5px]" : ""].join(" ")} />
            <span className={["block w-5 h-[1.5px] bg-fog transition-all duration-200",
              menuOpen ? "opacity-0" : ""].join(" ")} />
            <span className={["block w-5 h-[1.5px] bg-fog transition-all duration-200 origin-center",
              menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""].join(" ")} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu"
        className={[
          "fixed inset-0 z-40 bg-base flex flex-col justify-center",
          "transition-all duration-250",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}>

        <nav className="editorial flex flex-col gap-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-[3px] h-[3px] rounded-full bg-signal" aria-hidden="true" />
            <span className="annotation">Navigation</span>
          </div>

          {NAV_ITEMS.map(({ id, label, short }, i) => {
            const isActive = active === id;
            return (
              <button key={id}
                onClick={() => { scrollTo(id); setMenuOpen(false); }}
                className={[
                  "text-left flex items-baseline gap-4 transition-colors duration-150",
                  "focus-visible:outline-signal",
                  isActive ? "text-fog" : "text-dim hover:text-fog",
                ].join(" ")}
                style={{ animationDelay: `${i * 35}ms` }}>
                <span className="font-mono text-[0.5rem] text-signal tracking-widest w-6">
                  {short}
                </span>
                <span className="font-sans font-black text-display-lg
                                 tracking-tighter leading-none">
                  {label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-signal mb-0.5" aria-hidden="true" />
                )}
              </button>
            );
          })}

          <div className="mt-6 pt-5 border-t border-border/25 flex items-center gap-5">
            <a href="https://github.com/Sohan1606" target="_blank" rel="noopener noreferrer"
              className="font-mono text-[0.55rem] text-dim hover:text-fog tracking-widest
                         uppercase transition-colors focus-visible:outline-signal">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/sohan-khachane-4a214b275"
              target="_blank" rel="noopener noreferrer"
              className="font-mono text-[0.55rem] text-dim hover:text-fog tracking-widest
                         uppercase transition-colors focus-visible:outline-signal">
              LinkedIn
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
