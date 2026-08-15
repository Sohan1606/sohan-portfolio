// Contact.tsx — SOHAN // SYSTEM 3.0
// Open channel. Confident endpoint. Not a generic form.
import React, { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SystemLabel from "../components/SystemLabel";
import StatusDot from "../components/StatusDot";
import { makeReveal, makeStagger, makeFadeItem, VP, VP_CLOSE } from "../lib/motion";

const OPEN_TO = [
  { label: "Cloud Engineering",          sub: "Infrastructure · platforms · managed services"   },
  { label: "DevOps",                     sub: "CI/CD · automation · observability · reliability" },
  { label: "DevSecOps",                  sub: "Security embedded into delivery pipelines"        },
  { label: "Software Engineering",       sub: "Full-stack · backend · systems engineering"      },
  { label: "Engineering Collaborations", sub: "Real problems. Real systems."                     },
];

const LINKS = [
  {
    id: "github",
    label: "GitHub",
    sub: "github.com/Sohan1606",
    href: "https://github.com/Sohan1606",
    aria: "Open Sohan Khachane GitHub profile",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    sub: "sohan-khachane-4a214b275",
    href: "https://www.linkedin.com/in/sohan-khachane-4a214b275",
    aria: "Open Sohan Khachane LinkedIn profile",
  },
];

interface LinkRowProps { label: string; sub: string; href: string; aria: string; }

const LinkRow: React.FC<LinkRowProps> = ({ label, sub, href, aria }) => {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyHandle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(sub).then(() => {
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    }).catch(() => {});
  };

  return (
    <div className="group relative border-b border-border/20 last:border-b-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={aria}
        className="block focus-visible:outline-signal">
        <div className="flex items-center gap-4 py-5">
          <div className="flex-1 min-w-0">
            <span className={`font-sans font-semibold text-base tracking-tight block mb-1
                              transition-colors duration-150
                              ${hovered ? "text-signal" : "text-fog/80"}`}>
              {label}
            </span>
            <span className="font-mono text-[0.48rem] text-dim/50 tracking-widest">{sub}</span>
          </div>
          <span className={`font-mono text-base shrink-0 transition-all duration-150
                            ${hovered ? "text-signal translate-x-1" : "text-border/50"}`}
            aria-hidden="true">→</span>
        </div>
      </a>
      <button
        onClick={copyHandle}
        aria-label={`Copy ${label} handle`}
        className={`absolute right-16 top-1/2 -translate-y-1/2 font-mono text-[0.45rem]
                     tracking-widest uppercase border px-2 py-1 transition-colors
                     focus-visible:outline-signal
                     ${copied ? "text-signal border-signal/50" : "text-border/60 border-border/30 hover:text-fog hover:border-border/50"}`}
      >
        {copied ? "COPIED ✓" : "COPY"}
      </button>
    </div>
  );
};

const Contact: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const reveal   = makeReveal(shouldReduce);
  const stagger  = makeStagger(0.05, 0.08);
  const fadeItem = makeFadeItem(shouldReduce);

  return (
    <section id="contact" aria-label="Contact"
      className="relative bg-base border-t border-border/25">
      <div className="section-rule" aria-hidden="true" />

      {/* Subtle red tint in contact section background */}
      <div className="absolute inset-0 bg-ember/[0.02] pointer-events-none" aria-hidden="true" />

      <div className="editorial py-section relative">

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}>
          <SystemLabel number="08" label="Contact" />
        </motion.div>

        {/* System open channel */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-10 md:mt-14">
          <p className="font-mono text-[0.55rem] text-signal tracking-widest uppercase mb-3">
            // OPEN CHANNEL
          </p>
          <h2 className="font-sans font-black text-display-xl text-fog
                         tracking-tighter leading-none">
            If you're building<br />something difficult,<br />
            <span className="text-fog/50">let's talk.</span>
          </h2>
        </motion.div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* LEFT */}
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP_CLOSE}
            className="lg:col-span-5">
            <span className="accent-line block mb-6" />
            <p className="font-sans text-fog/65 font-light leading-relaxed text-base md:text-lg mb-8">
              I'm a 4th-year Computer Engineering student open to internships,
              collaborations and engineering conversations — particularly around
              Cloud, DevOps, DevSecOps and software engineering.
            </p>

            <span className="font-mono text-[0.5rem] text-dim/60 tracking-widest uppercase block mb-4">
              Open to
            </span>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP_CLOSE}>
              {OPEN_TO.map(item => (
                <motion.div key={item.label} variants={fadeItem}
                  className="flex items-start gap-3 py-2.5 border-b border-border/[0.15]
                             last:border-b-0">
                  <span className="w-[3px] h-[3px] rounded-full bg-signal mt-1.5 shrink-0"
                    aria-hidden="true" />
                  <div className="flex flex-col gap-0.5">
                    <span className="font-sans text-fog/80 text-sm font-medium">{item.label}</span>
                    <span className="font-mono text-[0.48rem] text-dim/50 tracking-wide">{item.sub}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="hidden lg:block lg:col-span-1" />

          {/* RIGHT */}
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP_CLOSE}
            className="lg:col-span-6">
            <span className="font-mono text-[0.5rem] text-dim/60 tracking-widest uppercase block mb-4">
              // Initiate connection
            </span>
            <div className="mb-8">
              {LINKS.map(l => <LinkRow key={l.id} {...l} />)}
            </div>

            {/* Email */}
            <div className="border border-border/20 bg-surface/50 p-4 mb-8">
              <span className="font-mono text-[0.48rem] text-dim/60 tracking-widest uppercase block mb-2">
                Email
              </span>
              <span className="font-mono text-[0.6rem] text-dim/40 tracking-wide">
                Available on request — reach out via GitHub or LinkedIn
              </span>
            </div>

            {/* Availability */}
            <div className="flex items-start gap-4 pt-5 border-t border-border/20">
              <StatusDot />
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.5rem] text-signal tracking-widest uppercase">
                  Currently available
                </span>
                <span className="font-mono text-[0.45rem] text-dim/50 tracking-wide">
                  Open to internship and collaboration opportunities
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CLOSING */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-[clamp(6rem,12vw,14rem)]">
          <div className="w-full h-px bg-border/15" aria-hidden="true" />
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-14 md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 flex flex-col gap-5">
              {/* Ghost monogram */}
              <p className="font-sans font-black text-fog/[0.06] select-none
                            text-[clamp(3rem,8vw,9rem)] tracking-tighter leading-none"
                aria-hidden="true">SK</p>
              <div>
                <span className="font-sans font-black text-fog/90 text-xl md:text-2xl
                                 tracking-tight block">Sohan Khachane</span>
                <span className="font-mono text-[0.5rem] text-dim/60 tracking-widest
                                 uppercase block mt-1">
                  Computer Engineering · Cloud · DevOps · DevSecOps
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <StatusDot />
                  <span className="font-mono text-[0.5rem] text-signal tracking-widest uppercase">
                    System online
                  </span>
                </div>
                <span className="font-mono text-[0.45rem] text-dim/35 tracking-widest">
                  sohan-khachane / v5.0 / 2026
                </span>
              </div>
              <div className="flex items-center gap-5">
                <a href="https://github.com/Sohan1606" target="_blank" rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="font-mono text-[0.5rem] text-dim hover:text-fog tracking-widest
                             uppercase transition-colors focus-visible:outline-signal">
                  GitHub
                </a>
                <span className="w-px h-3 bg-border/25" aria-hidden="true" />
                <a href="https://www.linkedin.com/in/sohan-khachane-4a214b275"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="font-mono text-[0.5rem] text-dim hover:text-fog tracking-widest
                             uppercase transition-colors focus-visible:outline-signal">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer — terminal shutdown state */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-14 border-t border-border/15 pt-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
            {/* System banner */}
            <div className="md:col-span-5 flex flex-col gap-1">
              <span className="font-sans font-black text-fog text-xl tracking-tight">
                SOHAN // SYSTEM
              </span>
              <span className="font-mono text-[0.5rem] text-signal tracking-widest uppercase">
                Status · ONLINE
              </span>
              <span className="font-mono text-[0.45rem] text-dim/45 tracking-widest mt-1">
                © {new Date().getFullYear()} Sohan Khachane
              </span>
            </div>

            {/* Built with */}
            <div className="md:col-span-4">
              <span className="annotation text-border/60 block mb-3">BUILT WITH</span>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"].map(t => (
                  <span key={t} className="font-mono text-[0.5rem] text-dim/50 tracking-wide">{t}</span>
                ))}
              </div>
            </div>

            {/* Version + links */}
            <div className="md:col-span-3 flex flex-col items-start md:items-end gap-2">
              <span className="annotation text-border/60">VERSION</span>
              <span className="font-mono text-[0.55rem] text-fog/70 tracking-widest">
                SYSTEM 5.0
              </span>
              <div className="flex items-center gap-4 mt-1">
                <a href="https://github.com/Sohan1606" target="_blank" rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="font-mono text-[0.5rem] text-dim hover:text-signal tracking-widest
                             uppercase transition-colors focus-visible:outline-signal">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/sohan-khachane-4a214b275"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="font-mono text-[0.5rem] text-dim hover:text-signal tracking-widest
                             uppercase transition-colors focus-visible:outline-signal">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;

