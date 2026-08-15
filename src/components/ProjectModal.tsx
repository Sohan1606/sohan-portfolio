// ProjectModal.tsx — SOHAN // SYSTEM 5.0
// Full-screen engineering dissection of a single project.
// Click anywhere to close · Escape closes · Arrow keys navigate.
// Focus restored on close. Scroll locked while open.
import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import type { Project } from "../data/projects";
import { useScrollLock } from "../hooks/useScrollLock";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onNavigate: (dir: 1 | -1) => void;
  indexLabel: string;
  count: number;
}

const statusColor: Record<Project["status"], string> = {
  deployed:      "text-signal",
  "in-progress": "text-dim/70",
  archived:      "text-dim/50",
};

// Case metrics — every value traceable to the verified project data.
const CASE_METRICS: Record<string, { label: string; value: string }[]> = {
  lastkey: [
    { label: "Portals", value: "2" },
    { label: "Crypto", value: "AES-256-GCM" },
    { label: "KDF", value: "PBKDF2" },
    { label: "State", value: "LIVE" },
  ],
  fairloop: [
    { label: "Agents", value: "5" },
    { label: "Audit", value: "SHA-256" },
    { label: "Graph", value: "LangGraph" },
    { label: "State", value: "LIVE" },
  ],
  "cloud-complaint": [
    { label: "Deploys", value: "2" },
    { label: "DB", value: "PostgreSQL" },
    { label: "Infra", value: "Docker Compose" },
    { label: "State", value: "LIVE" },
  ],
  sentra: [
    { label: "Roles", value: "3" },
    { label: "Auth", value: "JWT" },
    { label: "Stack", value: "MERN" },
    { label: "State", value: "LIVE" },
  ],
  qmeet: [
    { label: "Agents", value: "6" },
    { label: "State", value: "BUILDING" },
    { label: "Repo", value: "YES" },
    { label: "Stack", value: "TypeScript" },
  ],
  "hh-goa": [
    { label: "Task", value: "HH Goa 2026" },
    { label: "Stack", value: "Next.js" },
    { label: "Host", value: "Vercel" },
    { label: "State", value: "LIVE" },
  ],
  "ai-product-gen": [
    { label: "Stack", value: "TypeScript" },
    { label: "Host", value: "Vercel" },
    { label: "State", value: "LIVE" },
  ],
  "financial-mirror": [
    { label: "Input", value: "CSV" },
    { label: "Stack", value: "Node.js" },
    { label: "State", value: "BUILDING" },
  ],
};

const Section: React.FC<{ label: string; signal?: boolean; children: React.ReactNode }> = ({
  label, signal, children,
}) => (
  <div>
    <div className="flex items-center gap-3 mb-3">
      <span className={`w-1 h-1 rounded-full shrink-0 ${signal ? "bg-signal" : "bg-border/60"}`}
        aria-hidden="true" />
      <span className={`font-mono text-[0.5rem] tracking-widest uppercase
                        ${signal ? "text-signal" : "text-dim/60"}`}>{label}</span>
    </div>
    <div className="pl-4">{children}</div>
  </div>
);

const ProjectModal: React.FC<ProjectModalProps> = ({
  project, onClose, onNavigate, indexLabel, count,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useScrollLock(true);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    triggerRef.current = document.activeElement as HTMLElement;
    const t = setTimeout(() => closeBtnRef.current?.focus(), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); handleClose(); }
      if (e.key === "ArrowLeft") onNavigate(-1);
      if (e.key === "ArrowRight") onNavigate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose, onNavigate]);

  useEffect(() => {
    return () => {
      if (triggerRef.current && typeof triggerRef.current.focus === "function") {
        triggerRef.current.focus();
        triggerRef.current = null;
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[120] bg-void/85 backdrop-blur-md overflow-y-auto"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} — case study`}
    >
      <div className="min-h-full flex flex-col justify-center py-16 md:py-20">
        <div
          ref={panelRef}
          onClick={(e) => e.stopPropagation()}
          className="editorial relative"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8 border-b border-border/30 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.5rem] text-signal tracking-widest uppercase">
                SYS.ARTIFACT / {indexLabel}
              </span>
              <span className="w-px h-3 bg-border/40 hidden sm:block" aria-hidden="true" />
              <span className="hidden sm:block font-mono text-[0.48rem] text-dim/50 tracking-widest uppercase">
                {count} systems in archive
              </span>
              <span className="w-px h-3 bg-border/40 hidden sm:block" aria-hidden="true" />
              <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[0.48rem] text-signal/80 tracking-widest uppercase">
                <span className="h-1 w-1 rounded-full bg-signal" aria-hidden="true" />
                verified
              </span>
            </div>
            <button
              ref={closeBtnRef}
              onClick={handleClose}
              aria-label="Close case study"
              className="group flex items-center gap-2 font-mono text-[0.55rem] text-dim
                         hover:text-signal tracking-widest uppercase transition-colors
                         px-2 py-1 focus-visible:outline-signal"
            >
              <span>Close</span>
              <span className="text-base leading-none group-hover:rotate-90 transition-transform duration-150" aria-hidden="true">×</span>
            </button>
          </div>

          {/* Identity */}
          <div className="flex flex-col gap-2 mb-8">
            <span className={`font-mono text-[0.55rem] tracking-widest uppercase ${statusColor[project.status]}`}>
              {project.status === "deployed" ? "● DEPLOYED" :
               project.status === "in-progress" ? "● BUILDING" : "● ARCHIVED"}
              <span className="text-dim/40 ml-3 normal-case">{project.type}</span>
            </span>
            <h2 className="font-sans font-black text-display-lg text-fog tracking-tighter leading-none">
              {project.name}
            </h2>
            <p className="font-sans text-fog/55 font-light leading-relaxed text-base md:text-lg max-w-2xl">
              {project.tagline}
            </p>
          </div>

          {/* Case metrics — reference-style verified stat strip */}
          {CASE_METRICS[project.id] && (
            <div className="mb-10 grid grid-cols-2 md:grid-cols-4 border border-border/25 divide-x divide-border/25">
              {CASE_METRICS[project.id].map((metric) => (
                <div key={metric.label} className="p-4 md:p-5 bg-deep/60">
                  <span className="block font-mono text-[0.45rem] tracking-[0.18em] uppercase text-dim mb-2">
                    {metric.label}
                  </span>
                  <span className="block font-sans font-black text-lg md:text-xl tracking-tighter text-fog">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            {project.problem && (
              <div className="md:col-span-1">
                <Section label="The Problem" signal>
                  <p className="font-sans text-fog/60 font-light text-sm md:text-[0.9rem] leading-relaxed">{project.problem}</p>
                </Section>
              </div>
            )}
            {project.approach && (
              <div className="md:col-span-1">
                <Section label="The Approach" signal>
                  <p className="font-sans text-fog/60 font-light text-sm md:text-[0.9rem] leading-relaxed">{project.approach}</p>
                </Section>
              </div>
            )}
            {project.architecture && (
              <div className="md:col-span-2">
                <Section label="Architecture">
                  <p className="font-sans text-fog/50 font-light text-sm leading-relaxed">{project.architecture}</p>
                </Section>
              </div>
            )}
            {project.engineeringNotes && project.engineeringNotes.length > 0 && (
              <div className="md:col-span-2">
                <Section label="Engineering Decisions" signal>
                  <ul className="flex flex-col gap-2.5" role="list">
                    {project.engineeringNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-mono text-[0.5rem] text-signal mt-0.5 shrink-0">0{i + 1}</span>
                        <span className="font-sans text-fog/55 font-light text-sm leading-relaxed">{note}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              </div>
            )}
            {project.security && (
              <div className="md:col-span-1">
                <Section label="Security">
                  <p className="font-sans text-fog/50 font-light text-sm leading-relaxed">{project.security}</p>
                </Section>
              </div>
            )}
            {project.deployment && (
              <div className="md:col-span-1">
                <Section label="Deployment">
                  <p className="font-sans text-fog/50 font-light text-sm leading-relaxed">{project.deployment}</p>
                </Section>
              </div>
            )}
          </div>

          {/* Stack */}
          <div className="mt-8 pt-6 border-t border-border/20">
            <Section label="Stack">
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {project.tech.map(t => (
                  <span key={t} className="font-mono text-[0.55rem] text-dim/50 tracking-wide">{t}</span>
                ))}
              </div>
            </Section>
          </div>

          {/* Links */}
          <div className="mt-8 flex items-center gap-4 flex-wrap pt-2">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                aria-label={`Open ${project.name} live deployment`}
                className="btn-signal inline-flex items-center gap-3 group"
                data-cursor="project">
                <span>Live System</span>
                <span className="font-mono transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                aria-label={`Open ${project.name} source repository`}
                className="btn-ghost inline-flex items-center gap-3 group"
                data-cursor="project">
                <span>Source</span>
                <span className="font-mono transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
            )}
          </div>

          {/* Nav footer */}
          <div className="mt-10 pt-4 border-t border-border/15 flex items-center justify-between">
            <button onClick={() => onNavigate(-1)}
              aria-label="Previous project"
              className="font-mono text-[0.5rem] text-dim hover:text-signal tracking-widest uppercase
                         transition-colors focus-visible:outline-signal">
              ← Previous
            </button>
            <span className="font-mono text-[0.45rem] text-border/60 tracking-widest uppercase" aria-hidden="true">
              [ click anywhere to close ]
            </span>
            <button onClick={() => onNavigate(1)}
              aria-label="Next project"
              className="font-mono text-[0.5rem] text-dim hover:text-signal tracking-widest uppercase
                         transition-colors focus-visible:outline-signal">
              Next →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectModal;
