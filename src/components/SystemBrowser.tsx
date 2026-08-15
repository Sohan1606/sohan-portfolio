// SystemBrowser.tsx — SOHAN // REDLINE ROUTE
// Immersive keyboard project browser inspired by the reference site's
// transport-system best-work section, rebuilt as an original coder terminal.
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Project } from "../data/projects";

interface SystemBrowserProps {
  systems: Project[];
  onStepOut: (id: string) => void;
  interactive?: boolean;
}

interface LineMeta {
  station: string;
  route: string;
  next: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
}

const LINE_META: Record<string, LineMeta> = {
  lastkey: {
    station: "LASTKEY",
    route: "Zero-Knowledge",
    next: "FAIRLOOP",
    bullets: [
      "Client-side AES-256-GCM keeps plaintext away from the server.",
      "Owner and beneficiary portals split trust boundaries by design.",
      "Guardian Protocol routes legacy access only after inactivity triggers.",
    ],
    metrics: [
      { label: "Crypto", value: "AES" },
      { label: "Portals", value: "2" },
      { label: "Live", value: "YES" },
    ],
  },
  fairloop: {
    station: "FAIRLOOP",
    route: "Agentic AI",
    next: "CLOUD COMPLAINT",
    bullets: [
      "Five-agent adversarial pipeline audits performance reviews for bias.",
      "Manager claims are challenged against evidence before approval.",
      "SHA-256 audit certificates create a traceable compliance artifact.",
    ],
    metrics: [
      { label: "Agents", value: "5" },
      { label: "Stack", value: "AI" },
      { label: "Live", value: "YES" },
    ],
  },
  "cloud-complaint": {
    station: "CLOUD",
    route: "Cloud Native",
    next: "SENTRA",
    bullets: [
      "Frontend and backend are deployed separately across Vercel and Render.",
      "PostgreSQL with Prisma keeps complaint data relational and type-safe.",
      "Docker Compose provides reproducible local infrastructure.",
    ],
    metrics: [
      { label: "DB", value: "PG" },
      { label: "Cloud", value: "2" },
      { label: "Live", value: "YES" },
    ],
  },
  sentra: {
    station: "SENTRA",
    route: "Incident Ops",
    next: "QMEET",
    bullets: [
      "MERN incident reporting system for educational institutions.",
      "Role-based access separates student, staff and admin workflows.",
      "Anonymous reporting and status tracking keep cases structured.",
    ],
    metrics: [
      { label: "Roles", value: "3" },
      { label: "Auth", value: "JWT" },
      { label: "Mode", value: "OPS" },
    ],
  },
  qmeet: {
    station: "QMEET",
    route: "Meeting AI",
    next: "TERMINUS",
    bullets: [
      "Hackathon build exploring autonomous meeting intelligence.",
      "Six-agent plan for turning meeting information into actions.",
      "Currently a building signal inside the engineering archive.",
    ],
    metrics: [
      { label: "Agents", value: "6" },
      { label: "State", value: "BUILD" },
      { label: "Repo", value: "YES" },
    ],
  },
};

const fallbackMeta = (project: Project, next: Project): LineMeta => ({
  station: project.name.toUpperCase().split(" ")[0],
  route: project.type,
  next: next.name.toUpperCase().split(" ")[0],
  bullets: [project.tagline, project.problem, project.approach].filter(Boolean).slice(0, 3),
  metrics: [
    { label: "Tech", value: String(project.tech.length) },
    { label: "Tier", value: project.tier.toUpperCase() },
    { label: "Live", value: project.live ? "YES" : "N/A" },
  ],
});

const SystemBrowser: React.FC<SystemBrowserProps> = ({ systems, onStepOut, interactive = true }) => {
  const shouldReduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const active = systems[idx];
  const next = systems[(idx + 1) % systems.length];

  const activeMeta = useMemo(() => LINE_META[active.id] ?? fallbackMeta(active, next), [active, next]);
  const stationLabels = useMemo(() => systems.map((system) => LINE_META[system.id]?.station ?? system.name.toUpperCase().split(" ")[0]), [systems]);

  const go = useCallback((dir: 1 | -1) => {
    setIdx((prev) => (prev + dir + systems.length) % systems.length);
  }, [systems.length]);

  useEffect(() => {
    if (!interactive) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select" || target?.isContentEditable) return;
      if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
      if (event.key === "Enter") { event.preventDefault(); onStepOut(active.id); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active.id, go, interactive, onStepOut]);

  useEffect(() => {
    if (shouldReduce || !interactive) return;
    const timer = window.setInterval(() => go(1), 5600);
    return () => window.clearInterval(timer);
  }, [go, interactive, shouldReduce]);

  return (
    <div className="relative overflow-hidden border border-border/30 bg-[#050505] shadow-[0_0_80px_rgba(220,38,38,0.08)]">
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,.5)_1px,transparent_1px)] bg-[size:34px_34px]" aria-hidden="true" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-signal" aria-hidden="true" />

      {/* Station board */}
      <div className="relative border-b border-border/25 p-4 md:p-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6">
          {stationLabels.map((station, index) => {
            const activeStation = index === idx;
            return (
              <button
                key={`${station}-${index}`}
                onClick={() => setIdx(index)}
                className="group text-left focus-visible:outline-signal"
                aria-label={`Go to ${station}`}
              >
                <span className={[
                  "block font-sans font-black uppercase leading-none tracking-[-0.055em] text-[clamp(1.45rem,3.4vw,3.7rem)] transition-colors",
                  activeStation ? "text-signal" : "text-fog/24 group-hover:text-fog/70",
                ].join(" ")}
                >
                  {station}
                </span>
                <span className={[
                  "mt-2 block h-px transition-colors",
                  activeStation ? "bg-signal" : "bg-border/40 group-hover:bg-fog/30",
                ].join(" ")} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Welcome sign */}
      <div className="relative px-4 md:px-6 pt-7 md:pt-9">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[0.52rem] tracking-[0.22em] uppercase text-dim mb-3">
              Section 03 / Terminal
            </p>
            <h3 className="font-sans font-black tracking-tighter leading-[0.88] text-[clamp(2.6rem,7vw,8rem)] text-fog">
              Welcome to<br />Deployment Line
            </h3>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="border border-signal/35 bg-signal text-white px-5 py-4 inline-flex flex-col">
              <span className="font-mono text-[0.46rem] tracking-[0.2em] uppercase text-white/75">instruction manual</span>
              <span className="font-sans font-black text-2xl tracking-tighter leading-none">ENTER TERMINAL</span>
            </div>
            <p className="mt-4 font-mono text-[0.48rem] tracking-[0.18em] uppercase text-dim leading-relaxed">
              Arrow keys browse systems. Red button opens the full dissection.
            </p>
          </div>
        </div>
      </div>

      {/* Terminal card */}
      <div className="relative p-4 md:p-6 mt-6 md:mt-8">
        <div className="border border-border/35 bg-base/90">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/25 px-4 md:px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-signal animate-pulse-red" aria-hidden="true" />
              <span className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-signal">
                Terminal
              </span>
            </div>
            <span className="font-mono text-[0.48rem] tracking-[0.18em] uppercase text-dim">
              next system: {activeMeta.next}
            </span>
          </div>

          <div className="overflow-hidden border-b border-border/20 bg-signal/10 px-4 md:px-5 py-2" aria-hidden="true">
            <motion.div
              animate={shouldReduce ? { x: 0 } : { x: ["0%", "-45%"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="whitespace-nowrap font-mono text-[0.48rem] tracking-[0.22em] uppercase text-signal"
            >
              WELCOME TO SOHAN TERMINAL • NEXT STATION: {activeMeta.station} • MIND THE DEPLOYMENT GAP • WELCOME TO SOHAN TERMINAL • NEXT STATION: {activeMeta.station} •
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-8 p-5 md:p-8 min-h-[28rem] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: shouldReduce ? 0 : 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduce ? 0 : -18 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                    <span className="font-mono text-[0.55rem] tracking-[0.18em] uppercase text-signal">
                      {activeMeta.route}
                    </span>
                    <span className="h-3 w-px bg-border/50" aria-hidden="true" />
                    <span className="font-mono text-[0.5rem] tracking-[0.18em] uppercase text-dim">
                      SYS {String(idx + 1).padStart(2, "0")} / {String(systems.length).padStart(2, "0")}
                    </span>
                    <span className="h-3 w-px bg-border/50" aria-hidden="true" />
                    <span className={active.status === "deployed" ? "font-mono text-[0.5rem] tracking-[0.18em] uppercase text-signal" : "font-mono text-[0.5rem] tracking-[0.18em] uppercase text-dim"}>
                      {active.status === "deployed" ? "System_Active" : "System_Building"}
                    </span>
                  </div>

                  <h4 className="font-sans font-black tracking-tighter leading-[0.86] text-[clamp(2.8rem,7vw,7.8rem)] text-fog mb-5">
                    {active.name}
                  </h4>
                  <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-fog/62 max-w-3xl">
                    {active.tagline}
                  </p>

                  <ul className="mt-8 space-y-3" role="list">
                    {activeMeta.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 font-sans text-fog/58 font-light leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-signal shrink-0" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => go(-1)}
                  className="btn-ghost !px-4 !py-2 font-mono !text-[0.52rem] uppercase"
                  data-cursor="button"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => onStepOut(active.id)}
                  className="btn-signal !px-5 !py-2 font-mono !text-[0.52rem] uppercase"
                  data-cursor="project"
                >
                  Step out for dissection →
                </button>
                <button
                  onClick={() => go(1)}
                  className="btn-ghost !px-4 !py-2 font-mono !text-[0.52rem] uppercase"
                  data-cursor="button"
                >
                  Next →
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-border/25 p-5 md:p-8 bg-deep/70 flex flex-col justify-between">
              <div>
                <p className="font-mono text-[0.52rem] tracking-[0.22em] uppercase text-dim mb-5">
                  Route Metrics
                </p>
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
                  {activeMeta.metrics.map((metric) => (
                    <div key={metric.label} className="border border-border/25 bg-base/60 p-4">
                      <span className="block font-mono text-[0.45rem] tracking-[0.18em] uppercase text-dim mb-2">
                        {metric.label}
                      </span>
                      <span className="block font-sans font-black text-3xl tracking-tighter text-fog">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-2 mb-3">
                  {systems.map((system, index) => (
                    <button
                      key={system.id}
                      onClick={() => setIdx(index)}
                      aria-label={`Jump to ${system.name}`}
                      className={index === idx ? "h-2 flex-1 bg-signal" : "h-2 flex-1 bg-border hover:bg-fog/35 transition-colors"}
                    />
                  ))}
                </div>
                <p className="font-mono text-[0.48rem] tracking-[0.18em] uppercase text-dim leading-relaxed">
                  RED LINE // ENGINEERING ROUTE<br />built in React /// powered by caffeine
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemBrowser;
