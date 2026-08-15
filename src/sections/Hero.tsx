// Hero.tsx — SOHAN // REDLINE PORTFOLIO
// A coder-first reimagining of the reference site's theatrical hero:
// huge lowercase name, midnight copy, cursor-driven glow, scroll ritual.
import React, { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import StatusDot from "../components/StatusDot";
import Magnetic from "../components/Magnetic";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const SNAPSHOT = [
  { label: "Started As", value: "Full-Stack Builder" },
  { label: "Became", value: "Security-System Maker" },
  { label: "Currently", value: "Cloud · DevOps · DevSecOps" },
  { label: "B.E. Computer Engineering", value: "4th Year" },
];

const SIGNALS = ["React", "TypeScript", "Cloud", "Security", "DevOps", "AI Agents"];

const Hero: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [cursor, setCursor] = useState({ x: 50, y: 50 });

  const onMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (shouldReduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setCursor({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }, [shouldReduce]);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      onMouseMove={onMouseMove}
      className="relative min-h-screen overflow-hidden bg-void text-fog selection:bg-signal selection:text-white"
    >
      {/* Coder-noir stage */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at ${cursor.x}% ${cursor.y}%, rgba(220,38,38,0.22), transparent 18rem), radial-gradient(circle at 80% 12%, rgba(127,29,29,0.20), transparent 28rem), linear-gradient(180deg, #020202 0%, #090909 48%, #050505 100%)`,
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 opacity-[0.055] bg-[linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.45)_1px,transparent_1px)] bg-[size:52px_52px]" aria-hidden="true" />
      <div className="absolute top-14 left-0 right-0 h-px bg-white/10" aria-hidden="true" />
      <div className="section-rule !bg-signal/25" aria-hidden="true" />

      <div className="relative editorial min-h-screen flex flex-col justify-between pt-24 pb-7">
        {/* Top cue row mirrors the reference's ritual, rewritten for Sohan */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-2 lg:grid-cols-12 gap-y-4 items-start"
        >
          <button
            onClick={() => setExpanded((value) => !value)}
            className="group col-span-1 lg:col-span-2 text-left focus-visible:outline-signal"
            data-cursor="button"
            aria-expanded={expanded}
          >
            <span className="font-mono text-[0.52rem] tracking-[0.22em] uppercase text-dim group-hover:text-signal transition-colors">
              Click to expand
            </span>
            <span className="mt-1 block h-px w-20 bg-border group-hover:bg-signal transition-colors" aria-hidden="true" />
          </button>

          <div className="hidden lg:block lg:col-span-3 lg:col-start-5">
            <p className="font-mono text-[0.52rem] tracking-[0.22em] uppercase text-dim/70">
              Drag your cursor to explore
            </p>
          </div>

          <div className="col-span-1 lg:col-span-2 lg:col-start-11 justify-self-end text-right">
            <p className="font-mono text-[0.52rem] tracking-[0.22em] uppercase text-dim/70">
              Scroll down
            </p>
          </div>
        </motion.div>

        <div className="py-10 md:py-14">
          {/* Name + headline */}
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="flex items-center gap-3 mb-5">
              <StatusDot label="ONLINE" />
              <span className="font-mono text-[0.52rem] tracking-[0.22em] uppercase text-dim">
                Personal developer terminal · v6 redline
              </span>
            </div>

            <h1 className="font-sans font-black lowercase tracking-[-0.095em] leading-[0.74] text-[clamp(5.4rem,20vw,22rem)] text-fog select-none">
              sohan
            </h1>

            <div className="mt-2 md:mt-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
              <div className="lg:col-span-7">
                <p className="font-sans font-black tracking-tighter leading-[0.92] text-[clamp(2.5rem,6.7vw,8.2rem)] text-fog">
                  Code by day,
                  <br />
                  more code
                  <br />
                  by <span className="text-signal">midnight.</span>
                </p>
              </div>

              <div className="lg:col-span-4 lg:col-start-9">
                <motion.div
                  animate={expanded ? { opacity: 1, height: "auto" } : { opacity: 0.72, height: "auto" }}
                  className="border-l border-signal/50 pl-5"
                >
                  <p className="font-sans text-base md:text-lg font-light leading-relaxed text-fog/62 max-w-md">
                    4th-year Computer Engineering student building full-stack,
                    security-heavy and cloud-ready systems with real repos,
                    real deployments and no fake metrics.
                  </p>
                  {expanded && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 font-mono text-[0.55rem] tracking-widest uppercase leading-relaxed text-dim"
                    >
                      Current route: Cloud Engineering → DevOps → DevSecOps.
                      Strongest system: LastKey Digital Legacy.
                    </motion.p>
                  )}
                </motion.div>

                <div className="mt-7 flex items-center justify-between gap-4 border-t border-border/35 pt-5">
                  <span className="font-mono text-[0.65rem] text-dim tracking-widest">09:00</span>
                  <div className="relative h-px flex-1 bg-border/60" aria-hidden="true">
                    <motion.div
                      className="absolute left-0 top-0 h-px bg-signal"
                      animate={shouldReduce ? { width: "72%" } : { width: ["12%", "88%", "72%"] }}
                      transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  <span className="font-mono text-[0.65rem] text-signal tracking-widest">00:00</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom: facts, quote, CTAs */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-y border-border/35"
          >
            {SNAPSHOT.map((item, index) => (
              <div
                key={item.label}
                className={["py-5 md:py-6", index < SNAPSHOT.length - 1 ? "lg:border-r lg:border-border/30" : ""].join(" ")}
              >
                <span className="block font-mono text-[0.48rem] tracking-[0.22em] uppercase text-dim/70 mb-2">
                  {item.label}
                </span>
                <span className="block font-sans font-black tracking-tighter text-xl md:text-2xl text-fog/90 pr-5">
                  {item.value}
                </span>
              </div>
            ))}
          </motion.div>

          <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <blockquote className="lg:col-span-6">
              <p className="font-sans text-[1.05rem] md:text-xl font-light leading-relaxed text-fog/54 italic">
                “If I ever write a book on how I build systems, it starts with a failing test and ends in production.”
              </p>
            </blockquote>

            <div className="lg:col-span-3 flex flex-wrap gap-x-4 gap-y-2">
              {SIGNALS.map((signal) => (
                <span key={signal} className="font-mono text-[0.48rem] uppercase tracking-[0.2em] text-dim hover:text-signal transition-colors">
                  {signal}
                </span>
              ))}
            </div>

            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:justify-end">
              <Magnetic className="inline-flex">
                <button onClick={() => scrollTo("work")} className="btn-signal inline-flex items-center justify-center gap-3" data-cursor="button">
                  Best Work <span aria-hidden="true">→</span>
                </button>
              </Magnetic>
              <button onClick={() => scrollTo("identity")} className="btn-ghost inline-flex items-center justify-center gap-3">
                Go on, scroll down <span aria-hidden="true">↓</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
