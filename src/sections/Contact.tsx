// Contact.tsx — SOHAN // SYSTEM 2.0
// System connection available. Not "let's connect." A deliberate endpoint.
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SystemLabel from "../components/SystemLabel";
import StatusDot from "../components/StatusDot";
import { makeReveal, makeStagger, makeFadeItem, VP, VP_CLOSE } from "../lib/motion";

const OPEN_TO = [
  { label: "Cloud Engineering",          sub: "Infrastructure, platforms, managed services"   },
  { label: "DevOps",                     sub: "CI/CD, automation, observability, reliability" },
  { label: "DevSecOps",                  sub: "Security embedded into delivery"               },
  { label: "Software Engineering",       sub: "Full-stack, backend, systems"                 },
  { label: "Engineering Collaborations", sub: "Real problems. Real systems."                  },
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
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={aria}
      className="group block border-b border-border/25 last:border-b-0 focus-visible:outline-signal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="flex items-center gap-6 py-5 md:py-6">
        <div className="flex-1 min-w-0">
          <span className={`font-sans font-semibold text-base md:text-lg tracking-tight block mb-1
                            transition-colors duration-200 ${hovered ? "text-signal" : "text-fog/80"}`}>
            {label}
          </span>
          <span className="font-mono text-[0.5rem] text-dim/50 tracking-widest">{sub}</span>
        </div>
        <span className={`font-mono text-base shrink-0 transition-all duration-200
                          ${hovered ? "text-signal translate-x-1" : "text-border/60"}`}
          aria-hidden="true">→</span>
      </div>
    </a>
  );
};

const Contact: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const reveal   = makeReveal(shouldReduce);
  const stagger  = makeStagger(0.05, 0.08);
  const fadeItem = makeFadeItem(shouldReduce);

  return (
    <section id="contact" aria-label="Contact"
      className="relative bg-base border-t border-border/30">
      <div className="absolute top-0 bottom-0 left-6 md:left-12 lg:left-16 xl:left-20
                      w-px bg-border/20" aria-hidden="true" />

      <div className="editorial py-section">

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}>
          <SystemLabel number="07" label="Contact" />
        </motion.div>

        {/* Headline — system connection language */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-10 md:mt-14">
          <p className="font-mono text-[0.55rem] text-signal tracking-widest uppercase mb-4">
            System Connection Available
          </p>
          <h2 className="font-sans font-black text-display-xl text-fog
                         tracking-tighter leading-none">
            Let's build<br />something.
          </h2>
        </motion.div>

        {/* Content */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* LEFT */}
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP_CLOSE}
            className="lg:col-span-5">
            <span className="accent-line block mb-6" />
            <p className="font-sans text-fog/70 font-light leading-relaxed text-base md:text-lg mb-8">
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
                  className="flex items-start gap-3 py-2.5 border-b border-border/15 last:border-b-0">
                  <span className="w-1 h-1 rounded-full bg-signal mt-1.5 shrink-0" aria-hidden="true" />
                  <div className="flex flex-col gap-0.5">
                    <span className="font-sans text-fog/80 text-sm font-medium">{item.label}</span>
                    <span className="font-mono text-[0.5rem] text-dim/50 tracking-wide">{item.sub}</span>
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
              Initiate Connection
            </span>
            <div className="mb-8">
              {LINKS.map(link => (
                <LinkRow key={link.id} label={link.label} sub={link.sub}
                  href={link.href} aria={link.aria} />
              ))}
            </div>

            {/* Email placeholder */}
            <div className="border border-border/25 p-4 mb-8">
              <span className="font-mono text-[0.5rem] text-dim/60 tracking-widest uppercase block mb-2">
                Email
              </span>
              <span className="font-mono text-[0.6rem] text-dim/40 tracking-wide">
                Available on request — reach out via GitHub or LinkedIn
              </span>
            </div>

            {/* Status */}
            <div className="flex items-start gap-4 pt-6 border-t border-border/20">
              <StatusDot />
              <div className="flex flex-col gap-1">
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

        {/* CLOSING — system returning to idle */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-[clamp(6rem,12vw,14rem)]">
          <div className="w-full h-px bg-border/15" aria-hidden="true" />
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-16 md:mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <p className="font-sans font-black text-fog/[0.07]
                            text-[clamp(3rem,8vw,9rem)] tracking-tighter leading-none select-none"
                aria-hidden="true">SK</p>
              <div>
                <span className="font-sans font-black text-fog/90 text-xl md:text-2xl
                                 tracking-tight block">
                  Sohan Khachane
                </span>
                <span className="font-mono text-[0.55rem] text-dim/60 tracking-widest uppercase block mt-1">
                  Computer Engineering · Cloud · DevOps · DevSecOps
                </span>
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <StatusDot />
                  <span className="font-mono text-[0.5rem] text-signal tracking-widest uppercase">
                    System online
                  </span>
                </div>
                <span className="font-mono text-[0.45rem] text-dim/40 tracking-widest">
                  sohan-khachane / v2.0 / 2025–
                </span>
              </div>
              <div className="flex items-center gap-6">
                <a href="https://github.com/Sohan1606" target="_blank" rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="font-mono text-[0.5rem] text-dim hover:text-fog tracking-widest
                             uppercase transition-colors duration-200 focus-visible:outline-signal">
                  GitHub
                </a>
                <span className="w-px h-3 bg-border/30" aria-hidden="true" />
                <a href="https://www.linkedin.com/in/sohan-khachane-4a214b275"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="font-mono text-[0.5rem] text-dim hover:text-fog tracking-widest
                             uppercase transition-colors duration-200 focus-visible:outline-signal">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-16 md:mt-20 pb-8 flex items-center justify-between gap-4 flex-wrap
                     border-t border-border/10 pt-6">
          <span className="font-mono text-[0.45rem] text-dim/25 tracking-widest">
            SOHAN // SYSTEM · Built with React · TypeScript · Vite
          </span>
          <span className="font-mono text-[0.45rem] text-dim/25 tracking-widest">
            Designed & engineered by Sohan Khachane
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;

