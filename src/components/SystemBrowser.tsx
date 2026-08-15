// SystemBrowser.tsx — SOHAN // SYSTEM 5.0
// Keyboard-navigable project browser, inspired by the reference site's
// immersive keyboard project experience — reimagined as an original
// engineering "SYSTEM ROUTE / DEPLOYMENT PIPELINE" in the coder theme.
//
//  ← / →  navigate systems
//  ENTER  step out into the full dissection
//  CLICK a node to jump to that system
//
// Autoplays unless the user is interacting or reduced motion is set.
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Project } from "../data/projects";

interface SystemBrowserProps {
  systems: Project[];
  onStepOut: (id: string) => void;
  /** Disable global keyboard nav while the dissection modal is open. */
  interactive?: boolean;
}

const ROUTE_HINTS = ["← → navigate", "ENTER step out"];

const SystemBrowser: React.FC<SystemBrowserProps> = ({ systems, onStepOut, interactive = true }) => {
  const shouldReduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const active = systems[idx];
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((dir: 1 | -1) => {
    setIdx(prev => (prev + dir + systems.length) % systems.length);
  }, [systems.length]);

  // Keyboard navigation (disabled while the dissection modal is open)
  useEffect(() => {
    if (!interactive) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName?.toLowerCase();
      const isTyping =
        tag === "input" || tag === "textarea" || tag === "select" ||
        (t?.isContentEditable ?? false);
      if (isTyping) return;
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      else if (e.key === "Enter") { e.preventDefault(); onStepOut(active.id); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onStepOut, active, interactive]);

  // Autoplay — paused while the user hovers or reduced motion
  useEffect(() => {
    if (!playing || hovered || shouldReduce) return;
    const t = setTimeout(() => go(1), 3400);
    return () => clearTimeout(t);
  }, [playing, hovered, shouldReduce, go, idx]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const startPlaying = useCallback(() => setPlaying(true), []);
  const stopPlaying = useCallback(() => setPlaying(false), []);

  return (
    <div
      className="border border-border/25 bg-deep/40"
      onMouseEnter={() => { setHovered(true); stopPlaying(); }}
      onMouseLeave={() => { setHovered(false); startPlaying(); }}
    >
      {/* Browser header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <span className={`w-1 h-1 rounded-full ${playing ? "bg-signal animate-pulse-red" : "bg-dim/50"}`}
            aria-hidden="true" />
          <span className="font-mono text-[0.5rem] text-signal tracking-widest uppercase">
            System Route
          </span>
        </div>
        <div className="flex items-center gap-2" aria-hidden="true">
          {ROUTE_HINTS.map(h => (
            <span key={h} className="font-mono text-[0.45rem] text-border/60 tracking-widest uppercase">
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Focus panel */}
      <div className="px-4 md:px-6 py-6 md:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: shouldReduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduce ? 0 : -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
              <span className="font-mono text-[0.55rem] text-signal tracking-widest">
                SYS {String(idx + 1).padStart(2, "0")} / {String(systems.length).padStart(2, "0")}
              </span>
              <span className="w-px h-3 bg-border/40" aria-hidden="true" />
              <span className="font-mono text-[0.5rem] text-dim/60 tracking-widest uppercase">
                {active.type}
              </span>
              <span className="w-px h-3 bg-border/40" aria-hidden="true" />
              <span className={`font-mono text-[0.5rem] tracking-widest uppercase
                                ${active.status === "deployed" ? "text-signal" : "text-dim/60"}`}>
                {active.status === "deployed" ? "● DEPLOYED" :
                 active.status === "in-progress" ? "● BUILDING" : "● ARCHIVED"}
              </span>
            </div>

            <h3 className="font-sans font-black text-display-md text-fog tracking-tighter leading-none mb-3">
              {active.name}
            </h3>
            <p className="font-sans text-fog/55 font-light leading-relaxed text-base max-w-2xl">
              {active.tagline}
            </p>

            {/* Metric chips — truthful derived data */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.45rem] text-dim/50 tracking-widest uppercase">Tech</span>
                <span className="font-mono text-[0.6rem] text-fog/70">{active.tech.length}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.45rem] text-dim/50 tracking-widest uppercase">Tier</span>
                <span className="font-mono text-[0.6rem] text-fog/70 uppercase">{active.tier}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.45rem] text-dim/50 tracking-widest uppercase">Live</span>
                <span className="font-mono text-[0.6rem] text-fog/70 uppercase">{active.live ? "YES" : "N/A"}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Route track */}
      <div className="px-4 md:px-6 pb-4" role="tablist" aria-label="Project systems">
        <div className="flex items-center">
          <div className="flex-1 h-px bg-border/30 relative" aria-hidden="true">
            <div
              className="absolute top-0 left-0 h-px bg-signal transition-all duration-500"
              style={{ width: `${((idx + 0.5) / systems.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          {systems.map((s, i) => {
            const isActive = i === idx;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={isActive}
                aria-label={`${s.name}`}
                onClick={() => { setIdx(i); setPlaying(false); }}
                className={`flex flex-col items-center gap-1 group focus-visible:outline-signal
                            ${isActive ? "" : "opacity-50 hover:opacity-90"} transition-opacity duration-150`}
              >
                <span className={`w-2 h-2 rounded-full transition-all duration-300
                                  ${isActive ? "bg-signal scale-125" : "bg-border group-hover:bg-dim"}`}
                  aria-hidden="true" />
                <span className={`font-mono text-[0.4rem] tracking-widest hidden sm:block
                                  ${isActive ? "text-signal" : "text-border/50"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 md:px-6 py-4 border-t border-border/20 flex items-center justify-between">
        <button
          onClick={() => go(-1)}
          aria-label="Previous system"
          className="btn-ghost px-3 py-1.5 font-mono text-[0.5rem]"
          data-cursor="button"
        >
          ← Prev
        </button>

        <button
          onClick={() => onStepOut(active.id)}
          aria-label={`Step out into ${active.name} dissection`}
          className="btn-signal px-4 py-1.5 font-mono text-[0.55rem] uppercase inline-flex items-center gap-2 group"
          data-cursor="project"
        >
          <span>Step out</span>
          <span className="group-hover:translate-x-0.5 transition-transform duration-150" aria-hidden="true">→</span>
        </button>

        <button
          onClick={() => go(1)}
          aria-label="Next system"
          className="btn-ghost px-3 py-1.5 font-mono text-[0.5rem]"
          data-cursor="button"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default SystemBrowser;
