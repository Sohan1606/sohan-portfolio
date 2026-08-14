// Hero.tsx — SOHAN // SYSTEM 2.1
// Identity as environment. System state integrated into composition.
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import StatusDot from "../components/StatusDot";
import { makeSubtle, makeLine, containerVariants } from "../lib/motion";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// System snapshot — conceptual architecture, animated signal
const SNAPSHOT_LAYERS = [
  { id: "user",  label: "USER",           sub: "browser / client"    },
  { id: "app",   label: "APPLICATION",    sub: "react / typescript"  },
  { id: "api",   label: "API",            sub: "node.js / fastapi"   },
  { id: "data",  label: "DATA",           sub: "mongodb / postgresql"},
  { id: "infra", label: "INFRASTRUCTURE", sub: "docker / vercel"     },
  { id: "sec",   label: "SECURITY",       sub: "auth / encryption"   },
];

const SystemSnapshot: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    if (shouldReduce) return;
    const t = setInterval(() => setActiveLayer(p => (p + 1) % SNAPSHOT_LAYERS.length), 850);
    return () => clearInterval(t);
  }, [shouldReduce]);

  return (
    <div
      className="border border-border/20 p-4 md:p-5"
      aria-label="System architecture model — conceptual"
      role="img"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-signal" aria-hidden="true" />
          <span className="font-mono text-[0.42rem] text-signal tracking-widest uppercase">
            System Model
          </span>
        </div>
        <span className="font-mono text-[0.38rem] text-dim/25 tracking-widest uppercase">
          Conceptual
        </span>
      </div>

      <div className="flex flex-col" aria-hidden="true">
        {SNAPSHOT_LAYERS.map((layer, i) => {
          const isActive = activeLayer === i;
          const isPast   = shouldReduce ? false : activeLayer > i;
          return (
            <div key={layer.id}>
              <div className={`flex items-center gap-2.5 py-1.5 transition-all duration-300
                              ${isActive ? "opacity-100" : isPast ? "opacity-35" : "opacity-20"}`}>
                <div className={`w-1 h-1 rounded-full shrink-0 transition-all duration-300
                                 ${isActive ? "bg-signal" : "bg-border/60"}`} />
                <span className={`font-mono text-[0.48rem] tracking-widest
                                  transition-colors duration-300
                                  ${isActive ? "text-fog" : "text-dim/50"}`}>
                  {layer.label}
                </span>
                <span className={`font-mono text-[0.38rem] tracking-wide ml-auto
                                  transition-colors duration-300
                                  ${isActive ? "text-dim/50" : "text-dim/20"}`}>
                  {layer.sub}
                </span>
                {isActive && !shouldReduce && (
                  <AnimatePresence>
                    <motion.span key="sig"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="font-mono text-[0.38rem] text-signal/60 tracking-widest">
                      ●
                    </motion.span>
                  </AnimatePresence>
                )}
              </div>
              {i < SNAPSHOT_LAYERS.length - 1 && (
                <div className="pl-[0.4375rem] py-[1px]">
                  <div className={`w-px h-2.5 transition-colors duration-500
                                   ${activeLayer > i ? "bg-signal/25" : "bg-border/15"}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/15">
        <span className="w-1 h-1 rounded-full bg-signal" aria-hidden="true" />
        <span className="font-mono text-[0.38rem] text-dim/35 tracking-widest uppercase">
          Operational
        </span>
      </div>
    </div>
  );
};

// Integrated system state — horizontal metadata strip, not cards
const SystemStateMeta: React.FC = () => (
  <div
    className="flex flex-wrap gap-x-8 gap-y-3 pt-6 mt-6 border-t border-border/20"
    aria-label="Current system state"
  >
    {[
      { label: "Identity", value: "Sohan Khachane",            state: "ONLINE"  },
      { label: "Focus",    value: "Cloud / DevOps / DevSecOps", state: "ACTIVE"  },
      { label: "Phase",    value: "06 / Now",                   state: "CURRENT" },
      { label: "Mode",     value: "Build · Learn · Experiment", state: "RUNNING" },
    ].map(({ label, value, state }) => (
      <div key={label} className="flex flex-col gap-0.5 min-w-0">
        <span className="font-mono text-[0.4rem] text-dim/35 tracking-widest uppercase">
          {label}
        </span>
        <span className="font-mono text-[0.55rem] text-fog/65 tracking-wide">
          {value}
        </span>
        <span className={`font-mono text-[0.38rem] tracking-widest uppercase
                          ${state === "ACTIVE" || state === "ONLINE" ? "text-signal/70" : "text-dim/30"}`}>
          {state}
        </span>
      </div>
    ))}
  </div>
);

const Hero: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  const line   = makeLine(shouldReduce);
  const subtle = makeSubtle();

  const onMove  = useCallback((e: MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({ x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top) });
  }, []);
  const onEnter = useCallback(() => setCursorVisible(true),  []);
  const onLeave = useCallback(() => setCursorVisible(false), []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || shouldReduce) return;
    if (window.matchMedia("(hover: none)").matches) return;
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseenter", onEnter);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseenter", onEnter);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, [shouldReduce, onMove, onEnter, onLeave]);

  return (
    <section ref={heroRef} id="hero" aria-label="Introduction"
      className="relative min-h-screen flex flex-col justify-between bg-base overflow-hidden">

      {/* Structural lines */}
      <div className="absolute top-14 left-0 right-0 h-px bg-border/30" aria-hidden="true" />
      <div className="section-rule" aria-hidden="true" />

      {/* Top-right annotation */}
      <div className="absolute top-[5.5rem] right-6 md:right-12 lg:right-16 xl:right-20
                      font-mono text-[0.42rem] text-border/40 tracking-widest select-none"
        aria-hidden="true">
        SK // SYS · v2.1
      </div>

      {/* MAIN */}
      <motion.div
        className="editorial flex-1 flex flex-col justify-center pt-28 pb-10 lg:pt-32"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Status row */}
        <motion.div variants={subtle} className="flex items-center gap-3 mb-10 md:mb-12">
          <StatusDot label="ONLINE" />
          <span className="w-px h-3 bg-border/30" aria-hidden="true" />
          <span className="font-mono text-[0.48rem] text-dim/50 tracking-widest uppercase">
            Personal Operating Environment
          </span>
          <span className="hidden sm:block w-px h-3 bg-border/30" aria-hidden="true" />
          <span className="hidden sm:block font-mono text-[0.42rem] text-dim/35 tracking-widest">
            4th Year · B.E. Computer Engineering
          </span>
        </motion.div>

        {/* Two-column: name left, snapshot right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* LEFT — name, statement, CTAs, meta */}
          <div className="lg:col-span-7 flex flex-col">

            {/* NAME */}
            <div className="overflow-hidden">
              <motion.h1 variants={line}
                className="font-sans font-black leading-none tracking-tighter text-fog
                           text-[clamp(3rem,9vw,10.5rem)] select-none">
                SOHAN
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-5">
              <motion.div variants={line}>
                <h1 className="font-sans font-black leading-none tracking-tighter text-fog
                               text-[clamp(3rem,9vw,10.5rem)] select-none"
                  aria-label="Khachane">
                  KHACHANE
                </h1>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div variants={subtle} className="h-px bg-border/35 w-full mb-5" aria-hidden="true" />

            {/* Statement */}
            <motion.div variants={subtle} className="flex flex-col gap-2.5 mb-7">
              <p className="font-sans text-fog font-light leading-snug
                            text-[clamp(1rem,1.9vw,1.55rem)] max-w-[22ch] tracking-tight">
                I build systems.<br />
                I break them.<br />
                <span className="text-fog/45">Then I build them better.</span>
              </p>
              <p className="font-mono text-[0.45rem] text-dim/40 tracking-widest uppercase mt-1">
                Cloud · DevOps · DevSecOps · Software Engineering
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={subtle}
              className="flex flex-col sm:flex-row sm:items-center gap-3 mb-0">
              <button onClick={() => scrollTo("work")}
                className="btn-signal inline-flex items-center gap-3 group"
                aria-label="Jump to best work">
                <span>View Best Work</span>
                <span className="font-mono text-[0.7rem] transition-transform duration-200
                                 group-hover:translate-x-1" aria-hidden="true">→</span>
              </button>
              <button onClick={() => scrollTo("identity")}
                className="btn-ghost inline-flex items-center gap-3 group text-sm"
                aria-label="Explore portfolio">
                <span>Explore System</span>
                <span className="font-mono text-[0.7rem] transition-transform duration-200
                                 group-hover:translate-x-1" aria-hidden="true">↓</span>
              </button>
            </motion.div>

            {/* Integrated system state — horizontal, not cards */}
            <motion.div variants={subtle}>
              <SystemStateMeta />
            </motion.div>
          </div>

          {/* RIGHT — system snapshot */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-4">
            <motion.div variants={subtle}>
              <SystemSnapshot />
            </motion.div>

            {/* Recruiter shortcut */}
            <div className="flex flex-col gap-0.5 pl-1">
              <span className="font-mono text-[0.4rem] text-dim/30 tracking-widest uppercase">
                Short on time?
              </span>
              <a href="#lastkey-anchor"
                onClick={e => { e.preventDefault();
                  document.getElementById("lastkey-anchor")?.scrollIntoView({ behavior: "smooth" }); }}
                className="font-mono text-[0.48rem] text-signal tracking-widest uppercase
                           hover:underline underline-offset-4 focus-visible:outline-signal">
                → LastKey Digital Legacy
              </a>
            </div>
          </div>
        </div>

      </motion.div>

      {/* BOTTOM STRIP */}
      <motion.div variants={subtle} initial="hidden" animate="show"
        className="editorial pb-8 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-6">
          <a href="https://github.com/Sohan1606" target="_blank" rel="noopener noreferrer"
            className="font-mono text-[0.48rem] text-dim hover:text-fog tracking-widest uppercase
                       transition-colors duration-200 focus-visible:outline-signal">
            GitHub
          </a>
          <span className="w-px h-3 bg-border/30" aria-hidden="true" />
          <a href="https://www.linkedin.com/in/sohan-khachane-4a214b275"
            target="_blank" rel="noopener noreferrer"
            className="font-mono text-[0.48rem] text-dim hover:text-fog tracking-widest uppercase
                       transition-colors duration-200 focus-visible:outline-signal">
            LinkedIn
          </a>
        </div>
        <div className="flex items-center gap-2" aria-hidden="true">
          <motion.div
            animate={shouldReduce ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-5 bg-border/35" />
          <span className="font-mono text-[0.42rem] text-dim/40 tracking-widest uppercase">
            Scroll
          </span>
        </div>
      </motion.div>

      {/* Cursor coordinates */}
      {cursorVisible && !shouldReduce && (
        <div className="absolute bottom-8 right-6 md:right-12 lg:right-16 xl:right-20
                        font-mono text-[0.42rem] text-signal/35 tracking-widest
                        pointer-events-none select-none" aria-hidden="true">
          X: {String(coords.x).padStart(4,"0")} Y: {String(coords.y).padStart(4,"0")}
        </div>
      )}
    </section>
  );
};

export default Hero;

