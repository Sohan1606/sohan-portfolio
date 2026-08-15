// Identity.tsx — SOHAN // REDLINE ORIGIN
// Reference-style storytelling, rewritten around Sohan's verified coder data.
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SystemLabel from "../components/SystemLabel";
import CountUp from "../components/CountUp";
import { makeReveal, makeStagger, makeFadeItem, VP, VP_CLOSE } from "../lib/motion";
import { projects } from "../data/projects";

const HUSTLE_LOG = [
  "Built LastKey as a zero-knowledge digital legacy platform where the server only stores ciphertext.",
  "Built FairLoop as a 5-agent adversarial AI auditor for biased performance reviews at InnovaHack.",
  "Shipped Cloud Complaint System across Vercel, Render, PostgreSQL and Docker Compose.",
  "Kept learning through lab builds: HH Goa PFP Generator, AI Product Generator and Financial Mirror AI.",
];

const PRINCIPLES = [
  { label: "Build", note: "Ship the smallest real version before polishing the imaginary one." },
  { label: "Secure", note: "Treat authentication, encryption and access control as architecture." },
  { label: "Deploy", note: "Localhost is rehearsal. Production is the test." },
  { label: "Iterate", note: "Every bug is system information if you trace it properly." },
];

const Identity: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const reveal = makeReveal(shouldReduce);
  const stagger = makeStagger(0.06, 0.08);
  const fadeItem = makeFadeItem(shouldReduce);

  const deployedCount = projects.filter((project) => project.status === "deployed").length;
  const uniqueTech = new Set(projects.flatMap((project) => project.tech)).size;

  const stats = [
    { label: "Systems in archive", value: projects.length, suffix: "" },
    { label: "Deployed builds", value: deployedCount, suffix: "" },
    { label: "Verified tech signals", value: uniqueTech, suffix: "+" },
  ];

  return (
    <section id="identity" aria-label="Origin story" className="relative overflow-hidden bg-base border-t border-border/25">
      <div className="section-rule" aria-hidden="true" />
      <div className="absolute right-[-12vw] top-20 h-[28rem] w-[28rem] rounded-full bg-signal/[0.055] blur-3xl" aria-hidden="true" />

      <div className="editorial py-section">
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}>
          <SystemLabel number="01" label="Origin" />
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP} className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <p className="font-mono text-[0.55rem] tracking-[0.22em] uppercase text-signal mb-4">
              02 -- one deploy led to the next
            </p>
            <h2 className="font-sans font-black uppercase tracking-[-0.08em] leading-[0.78] text-[clamp(3.5rem,10vw,12rem)] text-fog">
              things<br />that<br />shipped
            </h2>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end gap-5">
            <span className="accent-line" />
            <p className="font-sans text-xl md:text-2xl tracking-tighter leading-tight text-fog/75">
              Computer Engineering student by day. Systems debugger by midnight.
            </p>
            <p className="font-sans text-fog/48 font-light leading-relaxed">
              I don't want a portfolio that just lists links. I want it to feel like opening a
              working terminal: intense, cinematic, scroll-led and built around real engineering.
            </p>
          </div>
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP_CLOSE} className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <p className="font-mono text-[0.52rem] tracking-[0.22em] uppercase text-dim mb-5">
              IN THE ARCHIVE
            </p>
            <div className="grid grid-cols-3 border border-border/25 divide-x divide-border/25">
              {stats.map((stat) => (
                <div key={stat.label} className="p-4 md:p-6 min-h-32 flex flex-col justify-between bg-surface/25">
                  <span className="font-sans font-black text-4xl md:text-6xl tracking-tighter text-fog leading-none">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="font-mono text-[0.42rem] tracking-[0.18em] uppercase text-dim leading-relaxed">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="font-mono text-[0.52rem] tracking-[0.22em] uppercase text-signal mb-4">
              CORE PHILOSOPHY
            </p>
            <h3 className="font-sans font-black text-[clamp(2rem,4.7vw,5.6rem)] tracking-tighter leading-[0.9] text-fog mb-6">
              Systems with a purpose.
            </h3>
            <p className="font-sans text-fog/62 font-light leading-relaxed text-base md:text-lg max-w-2xl">
              I obsess over how a product looks, but I care even more about what survives behind it:
              authentication, encryption, database boundaries, deployment, observability and failure modes.
              Beautiful UI matters most when the engineering underneath can hold pressure.
            </p>
          </div>
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP} className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <p className="font-mono text-[0.52rem] tracking-[0.22em] uppercase text-signal mb-5">
              // BUILDS I'VE HUSTLED AT
            </p>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP_CLOSE} className="border-y border-border/20">
              {HUSTLE_LOG.map((line, index) => (
                <motion.div key={line} variants={fadeItem} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5 border-b border-border/15 last:border-b-0">
                  <span className="font-mono text-[0.52rem] text-signal tracking-widest">{String(index + 1).padStart(2, "0")}</span>
                  <p className="font-sans text-fog/60 font-light leading-relaxed">{line}</p>
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-5 inline-flex items-center gap-2 border border-signal/40 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" aria-hidden="true" />
              <span className="font-mono text-[0.52rem] tracking-[0.22em] uppercase text-signal">verified</span>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="font-mono text-[0.52rem] tracking-[0.22em] uppercase text-dim mb-4">
              01 -- origin / the beginning
            </p>
            <div className="relative border border-border/25 bg-deep/70 p-6 md:p-8 overflow-hidden">
              <div className="absolute right-4 top-4 font-mono text-[0.45rem] tracking-[0.18em] uppercase text-signal/60" aria-hidden="true">
                build.log
              </div>
              <h3 className="font-sans font-black uppercase text-[clamp(2rem,5.2vw,6rem)] tracking-[-0.07em] leading-[0.86] text-fog mb-8">
                I started<br />making things<br />because code<br />made ideas feel<br />real.
              </h3>
              <p className="font-sans text-fog/55 font-light leading-relaxed max-w-xl">
                It started as full-stack web apps. Then security became impossible to ignore.
                Then cloud deployment made every shortcut visible. Now the direction is clear:
                build systems that are useful, secure and deployed for the real world.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {PRINCIPLES.map((principle) => (
                  <div key={principle.label} className="border border-border/20 bg-base/50 p-4 hover:border-signal/45 transition-colors">
                    <span className="font-sans font-black tracking-tighter text-2xl text-fog block">{principle.label}</span>
                    <span className="mt-2 block font-mono text-[0.45rem] leading-relaxed tracking-wide text-dim">{principle.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Identity;
