// Contact.tsx — SOHAN // CONTACT ME
// No generic form. Reference-style closing CTA, rewritten for Sohan's channels.
import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import StatusDot from "../components/StatusDot";
import SystemLabel from "../components/SystemLabel";
import { makeReveal, makeStagger, makeFadeItem, VP, VP_CLOSE } from "../lib/motion";

const LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sohan-khachane-4a214b275",
    sub: "sohan-khachane-4a214b275",
  },
  {
    label: "GitHub",
    href: "https://github.com/Sohan1606",
    sub: "github.com/Sohan1606",
  },
  {
    label: "Live Portfolio",
    href: "https://sohan-portfolio-six.vercel.app/",
    sub: "sohan-portfolio-six.vercel.app",
  },
];

const OPEN_TO = [
  "Cloud Engineering Internships",
  "DevOps / DevSecOps Collaborations",
  "Full-stack Engineering Work",
  "Security-minded Product Builds",
];

const Contact: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const reveal = makeReveal(shouldReduce);
  const stagger = makeStagger(0.06, 0.08);
  const fadeItem = makeFadeItem(shouldReduce);
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = (value: string) => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(value);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), 1400);
    }).catch(() => {});
  };

  return (
    <section id="contact" aria-label="Contact" className="relative overflow-hidden bg-void border-t border-border/30">
      <div className="section-rule !bg-signal/25" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(220,38,38,0.16),transparent_28rem)]" aria-hidden="true" />

      <div className="editorial py-section relative">
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}>
          <SystemLabel number="08" label="Contact" />
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP} className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-sans font-black tracking-[-0.085em] leading-[0.78] text-[clamp(4rem,12vw,14rem)] text-fog">
              contact<br /><span className="text-signal">Me</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <span className="accent-line block mb-5" />
            <p className="font-sans text-xl md:text-2xl tracking-tighter leading-tight text-fog/80">
              Ready to build something difficult? Message before overthinking it.
            </p>
            <p className="mt-4 font-mono text-[0.5rem] tracking-[0.18em] uppercase text-dim leading-relaxed">
              opens a real profile — no forms, no friction
            </p>
          </div>
        </motion.div>

        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP_CLOSE} className="lg:col-span-7 border-y border-border/25">
            {LINKS.map((link) => (
              <motion.div key={link.href} variants={fadeItem} className="group grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center py-6 border-b border-border/18 last:border-b-0">
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="focus-visible:outline-signal" data-cursor="link">
                  <span className="block font-sans font-black text-3xl md:text-5xl tracking-tighter text-fog/75 group-hover:text-signal transition-colors">
                    → {link.label}
                  </span>
                  <span className="mt-1 block font-mono text-[0.5rem] tracking-[0.18em] uppercase text-dim">
                    {link.sub}
                  </span>
                </a>
                <button
                  onClick={() => copy(link.sub)}
                  className="justify-self-start md:justify-self-end border border-border/35 px-3 py-2 font-mono text-[0.48rem] tracking-[0.18em] uppercase text-dim hover:text-signal hover:border-signal/50 transition-colors focus-visible:outline-signal"
                >
                  {copied === link.sub ? "copied ✓" : "copy"}
                </button>
              </motion.div>
            ))}
          </motion.div>

          <motion.aside variants={reveal} initial="hidden" whileInView="show" viewport={VP_CLOSE} className="lg:col-span-4 lg:col-start-9 border border-border/30 bg-deep/80 p-5 md:p-6 self-start">
            <div className="flex items-center gap-3 mb-6">
              <StatusDot />
              <span className="font-mono text-[0.52rem] tracking-[0.22em] uppercase text-signal">currently available</span>
            </div>
            <p className="font-sans text-fog/58 font-light leading-relaxed mb-6">
              Open to internships, collaborations and engineering conversations around Cloud, DevOps, DevSecOps and software systems.
            </p>
            <div className="space-y-3">
              {OPEN_TO.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-signal" aria-hidden="true" />
                  <span className="font-mono text-[0.52rem] tracking-wide text-fog/58">{item}</span>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.footer variants={reveal} initial="hidden" whileInView="show" viewport={VP} className="mt-20 md:mt-28 pt-8 border-t border-border/25 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <p className="font-sans font-black text-[clamp(4rem,11vw,13rem)] tracking-[-0.08em] leading-none text-fog/[0.07] select-none" aria-hidden="true">
              SK
            </p>
            <p className="font-sans font-black text-2xl tracking-tighter text-fog">Sohan Khachane</p>
            <p className="mt-1 font-mono text-[0.5rem] tracking-[0.2em] uppercase text-dim">Computer Engineering · Cloud · DevOps · DevSecOps</p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="border border-signal/35 bg-signal/10 p-4">
              <span className="block font-mono text-[0.48rem] tracking-[0.22em] uppercase text-signal mb-2">Action Req.</span>
              <span className="block font-sans font-black text-2xl tracking-tighter text-fog">Close Case</span>
              <span className="block mt-1 font-mono text-[0.45rem] tracking-[0.18em] uppercase text-dim">portfolio system online · © 2026</span>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
};

export default Contact;
