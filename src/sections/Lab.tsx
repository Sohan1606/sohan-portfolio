// Lab.tsx — SOHAN // SYSTEM 2.0
// Experimental notebook. Distinct visual language from Work.
// These are not shipped systems. They are things being figured out.
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SystemLabel from "../components/SystemLabel";
import { makeReveal, makeStagger, makeFadeItem, VP, VP_CLOSE } from "../lib/motion";
import { labProjects, type Project } from "../data/projects";

const LabStatus: React.FC<{ status: Project["status"]; tier: Project["tier"] }> = ({ status, tier }) => {
  const label =
    tier === "lab" && status === "deployed"    ? "EXPERIMENT"  :
    tier === "lab" && status === "in-progress" ? "EXPLORING"   :
    tier === "lab" && status === "archived"    ? "PAUSED"      :
    status === "deployed"                      ? "DEPLOYED"    :
    status === "in-progress"                   ? "BUILDING"    : "ARCHIVED";

  const active = label === "DEPLOYED" || label === "BUILDING";

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-1 h-1 rounded-full shrink-0 ${active ? "bg-signal" : "bg-dim/30"}`} aria-hidden="true" />
      <span className={`font-mono text-[0.45rem] tracking-widest uppercase ${active ? "text-signal" : "text-dim/40"}`}>
        {label}
      </span>
    </span>
  );
};

const LabRow: React.FC<{ project: Project; index: string }> = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="border-b border-border/[0.15] last:border-b-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="flex items-start gap-4 md:gap-6 py-6 md:py-7 cursor-default">

        {/* Experiment number */}
        <span className={`font-mono text-[0.45rem] tracking-widest w-5 shrink-0 pt-1
                          transition-colors duration-200 ${hovered ? "text-signal" : "text-dim/25"}`}>
          {index}
        </span>

        <div className="flex-1 min-w-0">
          {/* Experiment label */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[0.45rem] text-dim/30 tracking-widest uppercase">
              EXPERIMENT_{index}
            </span>
          </div>

          <h3 className={`font-sans font-semibold text-base md:text-lg tracking-tight
                          transition-colors duration-200 mb-2
                          ${hovered ? "text-fog/80" : "text-fog/55"}`}>
            {project.name}
          </h3>

          <div className="mb-2.5">
            <LabStatus status={project.status} tier={project.tier} />
          </div>

          <p className="font-sans text-fog/30 font-light text-sm leading-relaxed max-w-prose mb-3">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-x-2.5 gap-y-1">
            {project.tech.slice(0, 5).map(t => (
              <span key={t} className="font-mono text-[0.45rem] text-dim/30 tracking-wide">{t}</span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col items-end gap-2 shrink-0 pt-0.5">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              aria-label={`Open ${project.name} live demo`}
              className="font-mono text-[0.45rem] tracking-widest uppercase text-dim/35
                         hover:text-signal transition-colors duration-200 focus-visible:outline-signal">
              → Live
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              aria-label={`Open ${project.name} source`}
              className="font-mono text-[0.45rem] tracking-widest uppercase text-dim/25
                         hover:text-fog transition-colors duration-200 focus-visible:outline-signal">
              → Source
            </a>
          )}
        </div>

        <span className={`hidden md:block font-mono text-sm shrink-0 pt-0.5 self-start
                          transition-all duration-200
                          ${hovered ? "text-dim/50 translate-x-0.5" : "text-border/25"}`}
          aria-hidden="true">→</span>
      </div>
    </div>
  );
};

const Lab: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const reveal   = makeReveal(shouldReduce);
  const stagger  = makeStagger(0.05, 0.1);
  const fadeItem = makeFadeItem(shouldReduce);

  return (
    <section id="lab" aria-label="Lab" className="relative bg-base border-t border-border/30">
      <div className="absolute top-0 bottom-0 left-6 md:left-12 lg:left-16 xl:left-20
                      w-px bg-border/20" aria-hidden="true" />

      <div className="editorial py-section">

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}>
          <SystemLabel number="04" label="Lab" />
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-10 md:mt-14">
          <h2 className="font-sans font-black text-display-xl text-fog/70
                         tracking-tighter leading-none">
            Still building.<br />Still testing.
          </h2>
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6">
            <span className="block w-8 h-px bg-dim/25 mb-4" aria-hidden="true" />
            <p className="font-sans text-fog/40 font-light leading-relaxed text-base md:text-lg">
              Not everything I build is finished enough to call a product.
              The Lab is where I test ideas, architectures and tools
              before they earn a place in the main work.
            </p>
            <p className="font-mono text-[0.45rem] text-dim/30 tracking-widest mt-4 italic">
              "Failures are system information."
            </p>
          </div>
          <div className="lg:col-span-3 lg:col-start-10 flex flex-col justify-end gap-1 pb-1">
            <span className="font-mono text-[0.45rem] text-dim/25 tracking-widest uppercase">Format</span>
            <span className="font-mono text-[0.5rem] text-dim/35 tracking-widest">
              Experiments · Prototypes · Tools
            </span>
          </div>
        </motion.div>

        {/* Index header */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-14 md:mt-20">
          <div className="flex items-center gap-4 pb-4 border-b border-border/[0.15]">
            <span className="font-mono text-[0.45rem] text-dim/25 tracking-widest uppercase w-5 shrink-0">#</span>
            <span className="font-mono text-[0.45rem] text-dim/25 tracking-widest uppercase flex-1">
              Experiment
            </span>
            <span className="hidden md:block font-mono text-[0.45rem] text-dim/25 tracking-widest uppercase">
              Status
            </span>
            <span className="w-8 shrink-0 hidden md:block" aria-hidden="true" />
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP_CLOSE}>
          {labProjects.map((project, i) => (
            <motion.div key={project.id} variants={fadeItem}>
              <LabRow project={project} index={String(i + 1).padStart(2, "0")} />
            </motion.div>
          ))}
        </motion.div>

        {/* The point */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-14 md:mt-20 pt-8 border-t border-border/[0.15]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-2 pt-1 flex flex-col gap-1">
              <span className="font-mono text-[0.45rem] text-dim/30 tracking-widest uppercase">
                The Point of the Lab
              </span>
              <span className="font-mono text-[0.45rem] text-signal/40 tracking-widest">——</span>
            </div>
            <div className="lg:col-span-7">
              <p className="font-sans text-fog/30 font-light leading-relaxed text-base md:text-lg italic">
                "The Lab is where unfinished ideas are allowed to stay unfinished
                long enough to become useful."
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Lab;

