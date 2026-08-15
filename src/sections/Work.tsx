// Work.tsx — SOHAN // SYSTEM 5.0
// Engineering archive. Click any system to dissect it in full screen.
// Verified project data only. No fabricated claims.
import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SystemLabel from "../components/SystemLabel";
import ProjectModal from "../components/ProjectModal";
import SystemBrowser from "../components/SystemBrowser";
import SplitText from "../components/SplitText";
import CountUp from "../components/CountUp";
import { makeReveal, makeStagger, makeFadeItem, VP, VP_CLOSE } from "../lib/motion";
import { bestWork, selected, type Project } from "../data/projects";

// ── STATUS BADGE ──────────────────────────────────────────────────
const StatusBadge: React.FC<{ status: Project["status"] }> = ({ status }) => {
  const map = {
    deployed:      { label: "DEPLOYED", active: true  },
    "in-progress": { label: "BUILDING", active: false },
    archived:      { label: "ARCHIVED", active: false },
  } as const;
  const { label, active } = map[status];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-1 h-1 rounded-full shrink-0 ${active ? "bg-signal" : "bg-dim/50"}`}
        aria-hidden="true" />
      <span className={`font-mono text-[0.5rem] tracking-widest uppercase
                        ${active ? "text-signal" : "text-dim/60"}`}>
        {label}
      </span>
    </span>
  );
};

// ── STATS STRIP — truthful aggregates from the verified archive ─────
const ARCHIVE_STATS = [
  { key: "deployed", to: 6, pad: 2, suffix: "",       label: "Systems deployed" },
  { key: "repos",    to: 12, pad: 2, suffix: "+",     label: "Repositories" },
  { key: "areas",    to: 5, pad: 2, suffix: "",       label: "Engineering areas" },
  { key: "rule",     to: 1, pad: 2, suffix: "",       label: "Rule · build real" },
];

// ── PROJECT ROW ───────────────────────────────────────────────────
const ProjectRow: React.FC<{ project: Project; index: string; onOpen: (id: string) => void }> = ({
  project, index, onOpen,
}) => {
  const [hovered, setHovered] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <div className="border-b border-border/20 last:border-b-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <button
        onClick={() => onOpen(project.id)}
        className="w-full text-left focus-visible:outline-signal"
        aria-haspopup="dialog"
        aria-label={`Open ${project.name} case study`}
      >
        <div className="flex items-start gap-4 md:gap-6 py-5 md:py-6 cursor-pointer">
          <span className={`font-mono text-[0.5rem] tracking-widest w-6 shrink-0 pt-0.5
                            transition-colors duration-200
                            ${hovered ? "text-signal" : "text-dim/40"}`}>
            {index}
          </span>

          <div className="flex-1 min-w-0">
            <h3 className={`font-sans font-bold text-lg md:text-2xl tracking-tight
                            leading-tight transition-colors duration-200 mb-1.5
                            ${hovered ? "text-fog" : "text-fog/70"}`}>
              {project.name}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
              <span className="font-mono text-[0.5rem] text-dim/50 tracking-widest uppercase">
                {project.type}
              </span>
              <span className="w-px h-3 bg-border/25 hidden sm:block" aria-hidden="true" />
              <StatusBadge status={project.status} />
            </div>
            <p className={`font-sans text-sm font-light leading-relaxed max-w-prose
                           transition-colors duration-200
                           ${hovered ? "text-fog/60" : "text-fog/35"}`}>
              {project.tagline}
            </p>
          </div>

          {/* Dissect hint */}
          <div className="flex flex-col items-end gap-1 shrink-0 pt-0.5">
            <span className={`font-mono text-[0.5rem] tracking-widest uppercase
                              transition-colors duration-200
                              ${hovered ? "text-signal" : "text-dim/50"}`}>
              {shouldReduce ? "→" : "→ Dissect"}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};

// ── ENGINEERING SIGNAL ────────────────────────────────────────────
const EngineeringSignal: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const reveal = makeReveal(shouldReduce);
  return (
    <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
      className="mt-20 md:mt-24 pt-10 border-t border-border/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-2 pt-1">
          <span className="font-mono text-[0.5rem] text-dim/40 tracking-widest uppercase">
            Engineering Signal
          </span>
        </div>
        <div className="lg:col-span-7">
          <p className="font-sans text-fog/30 font-light leading-relaxed
                        text-base md:text-lg italic">
            "Good architecture survives contact with reality."
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {["Authentication", "Data", "Deployment", "Security", "Observability"].map(p => (
          <span key={p}
            className="font-mono text-[0.5rem] text-dim/35 tracking-widest uppercase">
            {p}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────
const Work: React.FC = () => {
  const shouldReduce   = useReducedMotion();
  const reveal         = makeReveal(shouldReduce);
  const stagger        = makeStagger(0.05, 0.1);
  const fadeItem       = makeFadeItem(shouldReduce);

  const gallery = useMemo(() => [...bestWork, ...selected], []);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIndex = activeId ? gallery.findIndex(p => p.id === activeId) : -1;

  const open = useCallback((id: string) => setActiveId(id), []);
  const close = useCallback(() => setActiveId(null), []);
  const navigate = useCallback((dir: 1 | -1) => {
    setActiveId(prev => {
      if (!prev) return prev;
      const idx = gallery.findIndex(p => p.id === prev);
      const next = (idx + dir + gallery.length) % gallery.length;
      return gallery[next].id;
    });
  }, [gallery]);

  return (
    <section id="work" aria-label="Best Work"
      className="relative bg-base border-t border-border/30">
      <div className="section-rule" aria-hidden="true" />

      <div className="editorial py-section">

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}>
          <SystemLabel number="04" label="Best Work" />
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="font-mono text-[0.55rem] text-signal tracking-[0.22em] uppercase mb-4">
              Section 03 / Alpha
            </p>
            <SplitText
              text="Best Work"
              className="font-sans font-black text-display-xl text-fog tracking-tighter leading-none"
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-end gap-4">
            <span className="accent-line block" />
            <p className="font-sans text-fog/58 font-light leading-relaxed text-base md:text-lg">
              Worth a look. But if you're short on time, go straight to the
              deployment line and step out into LastKey — Sohan's strongest
              security-heavy build.
            </p>
            <button onClick={() => open("lastkey")}
              aria-label="Open LastKey Digital Legacy case study"
              className="self-start font-mono text-[0.55rem] text-signal tracking-widest uppercase
                         hover:underline underline-offset-4 focus-visible:outline-signal
                         text-left">
              → jump straight to strongest
            </button>
          </div>
        </motion.div>

        {/* Stats strip — count-up transitions */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP_CLOSE}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 border border-border/20 divide-x divide-border/20">
          {ARCHIVE_STATS.map(s => (
            <div key={s.key} className="p-5 md:p-6">
              <span className="font-sans font-black text-display-md text-fog block leading-none">
                <CountUp to={s.to} pad={s.pad} ariaLabel={String(s.to).padStart(s.pad, "0")} />
                {s.suffix}
              </span>
              <span className="font-mono text-[0.5rem] text-dim/50 tracking-widest uppercase block mt-2">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* SYSTEM ROUTE — keyboard-navigable browser */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP_CLOSE}
          className="mt-12 md:mt-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[0.55rem] text-signal tracking-widest uppercase">
              // Deployment Line
            </span>
            <span className="flex-1 h-px bg-border/20" aria-hidden="true" />
            <span className="font-mono text-[0.5rem] text-dim/30 tracking-widest hidden sm:block">
arrow keys browse · enter dissects
            </span>
          </div>
          <SystemBrowser systems={gallery} onStepOut={open} interactive={!activeId} />
        </motion.div>

        {/* Gallery — full archive list */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-14 md:mt-20">
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-[0.55rem] text-dim/50 tracking-widest uppercase">
              Engineering Archive
            </span>
            <span className="flex-1 h-px bg-border/20" aria-hidden="true" />
            <span className="font-mono text-[0.5rem] text-dim/30 tracking-widest">
              {gallery.length} systems · click to dissect
            </span>
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP_CLOSE}>
          {gallery.map((project, i) => (
            <motion.div key={project.id} variants={fadeItem}>
              <ProjectRow
                project={project}
                index={String(i + 1).padStart(2, "0")}
                onOpen={open}
              />
            </motion.div>
          ))}
        </motion.div>

        <EngineeringSignal />
      </div>

      {/* Full-screen dissection */}
      <AnimatePresence>
        {activeId && (
          <ProjectModal
            key={activeId}
            project={gallery[activeIndex]}
            onClose={close}
            onNavigate={navigate}
            indexLabel={String(activeIndex + 1).padStart(2, "0")}
            count={gallery.length}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;
