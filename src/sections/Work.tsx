// Work.tsx — SOHAN // SYSTEM 2.1
// Build archive. Engineering artifacts, not project cards.
// Verified project data only. No fabricated claims.
import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SystemLabel from "../components/SystemLabel";
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

// ── HERO PROJECT ──────────────────────────────────────────────────
// LastKey — given full editorial case study treatment.
const HeroProject: React.FC<{ project: Project }> = ({ project }) => {
  const shouldReduce = useReducedMotion();
  const reveal = makeReveal(shouldReduce);

  return (
    <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
      className="mt-16 md:mt-20">
      <div className="w-full h-px bg-border/30 mb-10 md:mb-14" aria-hidden="true" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

        {/* LEFT — identity */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[0.5rem] text-signal tracking-widest">01</span>
            <span className="w-4 h-px bg-border/30" aria-hidden="true" />
            <span className="font-mono text-[0.5rem] text-dim/50 tracking-widest uppercase">
              {project.type}
            </span>
          </div>

          <h3 className="font-sans font-black text-display-md text-fog
                         tracking-tighter leading-none mb-4">
            {project.name}
          </h3>

          <p className="font-sans text-fog/60 font-light leading-relaxed
                        text-base md:text-lg mb-6">
            {project.tagline}
          </p>

          <div className="mb-8">
            <StatusBadge status={project.status} />
          </div>

          {/* Links — group on the anchor so group-hover works correctly */}
          <div className="flex items-center gap-4 flex-wrap">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                aria-label={`Open ${project.name} live deployment`}
                data-cursor="project"
                className="group inline-flex items-center gap-2 font-mono text-[0.55rem]
                           tracking-widest uppercase text-fog/60 hover:text-signal
                           transition-colors duration-200 focus-visible:outline-signal">
                <span className="group-hover:translate-x-0.5 transition-transform duration-200"
                  aria-hidden="true">→</span>
                <span>Live System</span>
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                aria-label={`Open ${project.name} source repository`}
                data-cursor="project"
                className="group inline-flex items-center gap-2 font-mono text-[0.55rem]
                           tracking-widest uppercase text-dim hover:text-fog
                           transition-colors duration-200 focus-visible:outline-signal">
                <span className="group-hover:translate-x-0.5 transition-transform duration-200"
                  aria-hidden="true">→</span>
                <span>Source</span>
              </a>
            )}
          </div>
        </div>

        {/* RIGHT — engineering detail */}
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-7">

          {[
            { label: "The Problem",  content: project.problem,  signal: true  },
            { label: "The Approach", content: project.approach, signal: true  },
            { label: "Security",     content: project.security, signal: false },
          ].filter(b => b.content).map(block => (
            <div key={block.label}>
              <span className={`font-mono text-[0.5rem] tracking-widest uppercase block mb-2
                                ${block.signal ? "text-signal/70" : "text-dim/50"}`}>
                {block.label}
              </span>
              <p className="font-sans text-fog/60 font-light leading-relaxed
                            text-[0.9rem] md:text-base">
                {block.content}
              </p>
            </div>
          ))}

          {project.engineeringNotes && project.engineeringNotes.length > 0 && (
            <div>
              <span className="font-mono text-[0.5rem] text-signal/70 tracking-widest
                               uppercase block mb-3">
                Engineering Decisions
              </span>
              <ul className="flex flex-col gap-2" role="list">
                {project.engineeringNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-signal mt-[0.4rem] shrink-0"
                      aria-hidden="true" />
                    <span className="font-sans text-fog/50 font-light leading-relaxed text-[0.85rem]">
                      {note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <span className="font-mono text-[0.5rem] text-dim/50 tracking-widest
                             uppercase block mb-3">
              Stack
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {project.tech.map(t => (
                <span key={t} className="font-mono text-[0.5rem] text-dim/50 tracking-wide">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-border/30 mt-12 md:mt-16" aria-hidden="true" />
    </motion.div>
  );
};

// ── SELECTED PROJECT ROW ──────────────────────────────────────────
// Click to expand inline case study. Arrow direction indicates state.
const SelectedRow: React.FC<{ project: Project; displayIndex: string }> = ({
  project, displayIndex,
}) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <div className="border-b border-border/20 last:border-b-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left focus-visible:outline-signal"
        aria-expanded={open}
        aria-label={`${open ? "Collapse" : "Expand"} ${project.name} details`}
      >
        <div className="flex items-start gap-4 md:gap-6 py-5 md:py-6 cursor-pointer">

          <span className={`font-mono text-[0.5rem] tracking-widest w-6 shrink-0 pt-0.5
                            transition-colors duration-200
                            ${hovered || open ? "text-signal" : "text-dim/40"}`}>
            {displayIndex}
          </span>

          <div className="flex-1 min-w-0">
            <h3 className={`font-sans font-bold text-lg md:text-xl tracking-tight
                            leading-tight transition-colors duration-200 mb-1.5
                            ${hovered || open ? "text-fog" : "text-fog/70"}`}>
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
                           ${open ? "text-fog/55" : "text-fog/35"}`}>
              {project.tagline}
            </p>
          </div>

          {/* Desktop links */}
          <div className="hidden sm:flex flex-col items-end gap-2 shrink-0 pt-0.5">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                aria-label={`Open ${project.name} live deployment`}
                onClick={e => e.stopPropagation()}
                className="font-mono text-[0.5rem] tracking-widest uppercase text-dim/50
                           hover:text-signal transition-colors duration-200
                           focus-visible:outline-signal">
                → Live
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                aria-label={`Open ${project.name} source repository`}
                onClick={e => e.stopPropagation()}
                className="font-mono text-[0.5rem] tracking-widest uppercase text-dim/40
                           hover:text-fog transition-colors duration-200
                           focus-visible:outline-signal">
                → Source
              </a>
            )}
          </div>

          {/* Expand indicator — Tailwind handles rotation, no inline style needed */}
          <span
            className={`hidden lg:block font-mono text-sm shrink-0 pt-0.5 self-start
                        transition-all duration-200
                        ${open
                          ? "text-signal rotate-90 translate-x-0.5"
                          : hovered
                          ? "text-dim translate-x-0.5"
                          : "text-border/40"}`}
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </button>

      {/* Inline case study */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto", opacity: 1,
              transition: {
                height:  { duration: shouldReduce ? 0 : 0.28, ease: "easeOut" },
                opacity: { duration: shouldReduce ? 0 : 0.18 },
              },
            }}
            exit={{
              height: 0, opacity: 0,
              transition: {
                height:  { duration: shouldReduce ? 0 : 0.22, ease: "easeIn" },
                opacity: { duration: shouldReduce ? 0 : 0.12 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="font-mono text-[0.5rem] text-signal/60 tracking-widest
                                 uppercase block mb-2">
                  Problem
                </span>
                <p className="font-sans text-fog/50 font-light text-sm leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div>
                <span className="font-mono text-[0.5rem] text-dim/50 tracking-widest
                                 uppercase block mb-2">
                  Stack
                </span>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {project.tech.slice(0, 8).map(t => (
                    <span key={t} className="font-mono text-[0.5rem] text-dim/40 tracking-wide">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mobile links inside expanded area */}
              <div className="sm:hidden flex gap-4">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer"
                    aria-label={`Open ${project.name} live deployment`}
                    className="font-mono text-[0.55rem] tracking-widest uppercase text-dim/50
                               hover:text-signal transition-colors focus-visible:outline-signal">
                    → Live
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    aria-label={`Open ${project.name} source repository`}
                    className="font-mono text-[0.55rem] tracking-widest uppercase text-dim/40
                               hover:text-fog transition-colors focus-visible:outline-signal">
                    → Source
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
  const heroProject    = bestWork[0];
  const remaining      = [...bestWork.slice(1), ...selected];

  return (
    <section id="work" aria-label="Best Work"
      className="relative bg-base border-t border-border/30">
      <div className="section-rule" aria-hidden="true" />

      <div className="editorial py-section">

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}>
          <SystemLabel number="03" label="Best Work" />
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-10 md:mt-14">
          <h2 className="font-sans font-black text-display-xl text-fog
                         tracking-tighter leading-none">
            Built.<br />Shipped.<br className="sm:hidden" />{" "}
            <span className="sm:inline">Proven.</span>
          </h2>
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6">
            <span className="accent-line block mb-4" />
            <p className="font-sans text-fog/50 font-light leading-relaxed text-base md:text-lg">
              Selected systems built around real problems — from secure digital legacy
              infrastructure to adversarial AI and cloud-native deployment.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[0.5rem] text-dim/40 tracking-widest uppercase">
                Jump to strongest
              </span>
              <a href="#lastkey-anchor"
                onClick={e => {
                  e.preventDefault();
                  document.getElementById("lastkey-anchor")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                aria-label="Jump to LastKey Digital Legacy project"
                className="font-mono text-[0.55rem] text-signal tracking-widest uppercase
                           hover:underline underline-offset-4 focus-visible:outline-signal">
                → LastKey Digital Legacy
              </a>
            </div>
          </div>
        </motion.div>

        <div id="lastkey-anchor">
          <HeroProject project={heroProject} />
        </div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-14 md:mt-20">
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-[0.55rem] text-dim/50 tracking-widest uppercase">
              Selected Systems
            </span>
            <span className="flex-1 h-px bg-border/20" aria-hidden="true" />
            <span className="font-mono text-[0.5rem] text-dim/30 tracking-widest">
              {remaining.length} systems · click to expand
            </span>
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP_CLOSE}>
          {remaining.map((project, i) => (
            <motion.div key={project.id} variants={fadeItem}>
              <SelectedRow
                project={project}
                displayIndex={String(i + 2).padStart(2, "0")}
              />
            </motion.div>
          ))}
        </motion.div>

        <EngineeringSignal />
      </div>
    </section>
  );
};

export default Work;


