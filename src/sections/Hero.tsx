// Hero.tsx — SOHAN // SYSTEM 3.0
// Cinematic engineering entrance. Asymmetric. Confident.
// Typography is the architecture. Red is the signal.
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import StatusDot from "../components/StatusDot";
import Magnetic from "../components/Magnetic";
import { makeSubtle, makeLine, containerVariants } from "../lib/motion";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// System status metadata — only truthful values
const SYS_META = [
  { key: "status",   label: "SYS.STATUS", value: "ONLINE"                  },
  { key: "focus",    label: "FOCUS",       value: "CLOUD / DEVOPS / SEC"    },
  { key: "mode",     label: "MODE",        value: "BUILDING"                },
  { key: "state",    label: "STATE",       value: "AVAILABLE"               },
];

// Conceptual architecture layers — animated signal
const LAYERS = [
  { id: "user",  label: "USER",           sub: "browser · client"      },
  { id: "app",   label: "APPLICATION",    sub: "react · typescript"    },
  { id: "api",   label: "API",            sub: "node.js · fastapi"     },
  { id: "data",  label: "DATA",           sub: "mongo · postgres"      },
  { id: "infra", label: "INFRASTRUCTURE", sub: "docker · vercel"       },
  { id: "sec",   label: "SECURITY",       sub: "auth · encryption"     },
];

const SystemDiagram: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (shouldReduce) return;
    const t = setInterval(() => setActive(p => (p + 1) % LAYERS.length), 900);
    return () => clearInterval(t);
  }, [shouldReduce]);

  return (
    <div
      className="border border-border/25 bg-deep/60 p-5"
      aria-label="System architecture model — conceptual"
      role="img"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-signal animate-pulse-red" aria-hidden="true" />
          <span className="font-mono text-[0.42rem] text-signal tracking-widest uppercase">
            SYS.MODEL
          </span>
        </div>
        <span className="annotation">CONCEPTUAL</span>
      </div>

      <div className="flex flex-col" aria-hidden="true">
        {LAYERS.map((layer, i) => {
          const isActive = active === i;
          const isPast   = shouldReduce ? false : active > i;
          return (
            <div key={layer.id}>
              <div className={`flex items-center gap-3 py-1.5 transition-all duration-300
                              ${isActive ? "opacity-100" : isPast ? "opacity-30" : "opacity-18"}`}>
                <div className={`w-[3px] h-[3px] rounded-full shrink-0 transition-all duration-300
                                 ${isActive ? "bg-signal scale-150" : "bg-border"}`} />
                <span className={`font-mono text-[0.48rem] tracking-widest leading-none
                                  ${isActive ? "text-fog" : "text-muted/50"}`}>
                  {layer.label}
                </span>
                <span className={`font-mono text-[0.38rem] tracking-wide ml-auto
                                  ${isActive ? "text-dim/80" : "text-dim/20"}`}>
                  {layer.sub}
                </span>
                {isActive && !shouldReduce && (
                  <AnimatePresence>
                    <motion.span key="sig"
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-[0.38rem] text-signal tracking-widest">
                      ●
                    </motion.span>
                  </AnimatePresence>
                )}
              </div>
              {i < LAYERS.length - 1 && (
                <div className="ml-[0.4375rem] py-[1px]">
                  <div className={`w-px h-3 transition-colors duration-500
                                   ${active > i ? "bg-signal/20" : "bg-border/15"}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mt-5 pt-3 border-t border-border/20">
        <span className="w-[3px] h-[3px] rounded-full bg-signal" aria-hidden="true" />
        <span className="annotation">OPERATIONAL</span>
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [cursorVis, setCursorVis] = useState(false);

  const line   = makeLine(shouldReduce);
  const subtle = makeSubtle();

  const onMove  = useCallback((e: MouseEvent) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    setCoords({ x: Math.round(e.clientX - r.left), y: Math.round(e.clientY - r.top) });
  }, []);
  const onEnter = useCallback(() => setCursorVis(true),  []);
  const onLeave = useCallback(() => setCursorVis(false), []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || shouldReduce || window.matchMedia("(hover: none)").matches) return;
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [shouldReduce, onMove, onEnter, onLeave]);

  return (
    <section ref={heroRef} id="hero" aria-label="Introduction"
      className="relative min-h-screen flex flex-col justify-between bg-base overflow-hidden">

      {/* Structural elements */}
      <div className="absolute top-14 left-0 right-0 h-px bg-border/25" aria-hidden="true" />
      <div className="section-rule" aria-hidden="true" />
      {/* Subtle red-tinted background strip — top right corner */}
      <div className="absolute top-0 right-0 w-[30%] h-[40%] bg-ember/[0.015] pointer-events-none"
        aria-hidden="true" />

      {/* System annotation — top right */}
      <div className="absolute top-[5.5rem] right-6 md:right-12 lg:right-16 xl:right-20
                      flex flex-col items-end gap-1 select-none" aria-hidden="true">
        <span className="annotation">SK // SYS · v5.0</span>
        <span className="annotation text-border/50">BUILD 2026</span>
      </div>

      {/* MAIN */}
      <motion.div
        className="editorial flex-1 flex flex-col justify-center pt-24 pb-8 lg:pt-28"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Status row */}
        <motion.div variants={subtle} className="flex items-center gap-3 mb-8 md:mb-10">
          <StatusDot label="ONLINE" />
          <span className="w-px h-3 bg-border/40" aria-hidden="true" />
          <span className="font-mono text-[0.48rem] text-muted tracking-widest uppercase">
            Personal Operating Environment
          </span>
          <span className="hidden sm:block w-px h-3 bg-border/40" aria-hidden="true" />
          <span className="hidden sm:block font-mono text-[0.42rem] text-dim tracking-widest">
            4th Yr · B.E. Computer Engineering
          </span>
        </motion.div>

        {/* Two-column: name+statement left / diagram right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* LEFT */}
          <div className="lg:col-span-7 flex flex-col">

            {/* NAME — dramatically large */}
            <div className="overflow-hidden -mb-2">
              <motion.h1 variants={line}
                className="font-sans font-black leading-none tracking-tighter text-fog
                           text-[clamp(3.5rem,10vw,12rem)] select-none">
                SOHAN
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.div variants={line}>
                <span className="font-sans font-black leading-none tracking-tighter
                                 text-fog/90 block
                                 text-[clamp(3.5rem,10vw,12rem)] select-none"
                  aria-label="Khachane">
                  KHACHANE
                </span>
              </motion.div>
            </div>

            {/* Divider with small label */}
            <motion.div variants={subtle} className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-border/40" aria-hidden="true" />
              <span className="annotation">ENGINEER</span>
              <div className="w-8 h-px bg-border/40" aria-hidden="true" />
            </motion.div>

            {/* Positioning statement */}
            <motion.div variants={subtle} className="flex flex-col gap-3 mb-8">
              <p className="font-sans font-light leading-snug text-fog/90
                            text-[clamp(1.05rem,2vw,1.6rem)] tracking-tight max-w-[26ch]">
                Engineering systems<br />
                that survive contact<br />
                <span className="text-fog/45">with reality.</span>
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                {["Cloud", "DevOps", "DevSecOps", "Software"].map(tag => (
                  <span key={tag}
                    className="font-mono text-[0.48rem] text-muted tracking-widest uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={subtle} className="flex flex-col sm:flex-row gap-3 mb-8">
              <Magnetic className="self-start">
                <button onClick={() => scrollTo("work")}
                  className="btn-signal inline-flex items-center gap-3 group"
                  aria-label="Jump to best work"
                  data-cursor="button">
                  <span>View Best Work</span>
                  <span className="font-mono transition-transform duration-150
                                   group-hover:translate-x-1" aria-hidden="true">→</span>
                </button>
              </Magnetic>
              <button onClick={() => scrollTo("identity")}
                className="btn-ghost inline-flex items-center gap-3 group"
                aria-label="Explore portfolio">
                <span>Explore System</span>
                <span className="font-mono transition-transform duration-150
                                 group-hover:translate-x-1" aria-hidden="true">↓</span>
              </button>
            </motion.div>

            {/* System metadata — horizontal strip, not cards */}
            <motion.div variants={subtle}
              className="grid grid-cols-2 sm:grid-cols-4 gap-0
                         border-t border-border/25 pt-6"
              aria-label="Current system state">
              {SYS_META.map((m, i) => (
                <div key={m.key}
                  className={`flex flex-col gap-1 pr-4
                              ${i < SYS_META.length - 1 ? "border-r border-border/20 mr-4" : ""}`}>
                  <span className="annotation text-border/70">{m.label}</span>
                  <span className="font-mono text-[0.55rem] text-fog/70 tracking-wide">
                    {m.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — diagram + recruiter shortcut */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-4">
            <motion.div variants={subtle}>
              <SystemDiagram />
            </motion.div>

            <div className="flex flex-col gap-0.5 pl-1">
              <span className="annotation text-border/60">Short on time?</span>
              <a href="#lastkey-anchor"
                onClick={e => {
                  e.preventDefault();
                  document.getElementById("lastkey-anchor")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-mono text-[0.5rem] text-signal tracking-widest uppercase
                           hover:underline underline-offset-4 focus-visible:outline-signal">
                → LastKey Digital Legacy
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* BOTTOM STRIP */}
      <motion.div variants={subtle} initial="hidden" animate="show"
        className="editorial pb-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-5">
          <a href="https://github.com/Sohan1606" target="_blank" rel="noopener noreferrer"
            className="font-mono text-[0.48rem] text-dim hover:text-fog tracking-widest uppercase
                       transition-colors duration-150 focus-visible:outline-signal">
            GitHub
          </a>
          <span className="w-px h-3 bg-border/30" aria-hidden="true" />
          <a href="https://www.linkedin.com/in/sohan-khachane-4a214b275"
            target="_blank" rel="noopener noreferrer"
            className="font-mono text-[0.48rem] text-dim hover:text-fog tracking-widest uppercase
                       transition-colors duration-150 focus-visible:outline-signal">
            LinkedIn
          </a>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline-flex items-center gap-2 annotation text-border/50">
            CTRL + SHIFT + K · terminal
          </span>
          <div className="flex items-center gap-2" aria-hidden="true">
            <motion.div
              animate={shouldReduce ? {} : { y: [0, 5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-5 bg-signal/60" />
            <span className="annotation text-border/60">SCROLL</span>
          </div>
        </div>
      </motion.div>

      {/* Cursor coordinates */}
      {cursorVis && !shouldReduce && (
        <div className="absolute bottom-6 right-6 md:right-12 lg:right-16 xl:right-20
                        font-mono text-[0.42rem] text-signal/30 tracking-widest
                        pointer-events-none select-none" aria-hidden="true">
          X: {String(coords.x).padStart(4,"0")} Y: {String(coords.y).padStart(4,"0")}
        </div>
      )}
    </section>
  );
};

export default Hero;

