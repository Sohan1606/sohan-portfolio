// Identity.tsx — SOHAN // SYSTEM 2.0 + Decision Log
// Decision Log uses only verified engineering decisions from actual projects.
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SystemLabel from "../components/SystemLabel";
import { makeReveal, makeStagger, makeFadeItem, VP, VP_CLOSE, VP_NEAR } from "../lib/motion";

const ENGINEERING_PRINCIPLES = [
  { label: "Build",      sub: "Ship something real before theorising further."  },
  { label: "Break",      sub: "Find where the system fails under pressure."     },
  { label: "Understand", sub: "Trace the failure to its actual root cause."     },
  { label: "Iterate",    sub: "The next version is informed by the last."       },
];

// DECISION LOG — verified from actual project implementations
// Sources: LastKey (zero-knowledge enc.), Cloud Complaint (PostgreSQL over MongoDB),
// FairLoop (LangGraph over custom orchestration)
const DECISION_LOG = [
  {
    index: "01",
    decision: "Client-side encryption over server-side",
    context: "LastKey Digital Legacy",
    why: "Server-side encryption means the server can decrypt. For a digital legacy platform storing passwords and legal documents, that is not acceptable. The server must only ever see ciphertext.",
    tradeoff: "Increased client complexity. Key management becomes the user's responsibility. Recovery is harder to implement.",
    lesson: "Security architecture is an identity decision, not a feature. The choice of who holds the key changes what the system fundamentally is.",
  },
  {
    index: "02",
    decision: "PostgreSQL + Prisma over MongoDB for cloud complaint system",
    context: "Cloud Complaint System",
    why: "Complaint data has relational structure — users, complaints, statuses, admin actions. A document store would mean managing joins manually. PostgreSQL with Prisma gives type-safe queries and proper relational integrity.",
    tradeoff: "Schema migrations require more discipline. Less flexible for rapid structure changes.",
    lesson: "Choosing a database based on the actual data model rather than familiarity leads to cleaner architecture.",
  },
  {
    index: "03",
    decision: "LangGraph for multi-agent orchestration over custom pipeline",
    context: "FairLoop — InnovaHack",
    why: "A 5-agent adversarial pipeline needs state management between agents, conditional routing and rollback. Writing that from scratch under hackathon constraints would produce fragile code. LangGraph provides the graph execution primitives needed.",
    tradeoff: "Framework lock-in. Debugging graph state is harder than debugging sequential code.",
    lesson: "The right abstraction layer compresses complexity without hiding it. Understanding what LangGraph does internally makes it a tool, not a black box.",
  },
];

const Identity: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const reveal   = makeReveal(shouldReduce);
  const stagger  = makeStagger();
  const fadeItem = makeFadeItem(shouldReduce);

  return (
    <section id="identity" aria-label="Identity"
      className="relative bg-base border-t border-border/30">
      <div className="absolute top-0 bottom-0 left-6 md:left-12 lg:left-16 xl:left-20
                      w-px bg-border/20" aria-hidden="true" />

      <div className="editorial py-section">

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}>
          <SystemLabel number="01" label="Identity" />
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-10 md:mt-14">
          <h2 className="font-sans font-black text-display-xl text-fog
                         tracking-tighter leading-none">
            An engineer<br />in progress.
          </h2>
        </motion.div>

        {/* Two-column */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* LEFT — voice */}
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP_CLOSE}
            className="lg:col-span-5">
            <span className="accent-line mb-6 block" />
            <p className="font-sans text-fog/85 font-light leading-relaxed text-[1.05rem] md:text-lg">
              I'm a 4th-year Computer Engineering student who would rather ship a working
              system than debate its architecture indefinitely. The projects on this site
              have real authentication, real encryption, and real deployments.
            </p>
            <p className="font-sans text-fog/60 font-light leading-relaxed text-[1.05rem] md:text-lg mt-5">
              I started with full-stack development. Moved into security architecture when I built
              a zero-knowledge encryption platform. Explored multi-agent AI through hackathon work.
              Now I'm building toward Cloud, DevOps and DevSecOps — the layer of engineering that
              makes everything else actually run.
            </p>
            <p className="font-sans text-fog/30 font-light leading-relaxed text-[1.05rem] md:text-lg mt-5 italic">
              "The system is never finished. Only at a different stage of being improved."
            </p>
          </motion.div>

          <div className="hidden lg:block lg:col-span-1" />

          {/* RIGHT — structure */}
          <div className="lg:col-span-6">
            {[
              {
                header: "Building",  color: "text-signal",
                items: [
                  { label: "Full-stack web applications",           dim: false },
                  { label: "Secure, deployed systems",             dim: false },
                  { label: "Production-grade engineering projects", dim: false },
                ],
              },
              {
                header: "Focusing on", color: "text-signal",
                items: [
                  { label: "Cloud Engineering",    dim: false },
                  { label: "DevOps",               dim: false },
                  { label: "DevSecOps",            dim: false },
                  { label: "Software Engineering", dim: false },
                ],
              },
              {
                header: "Exploring", color: "text-dim",
                items: [
                  { label: "AI-driven systems",              dim: true },
                  { label: "Multi-agent architectures",      dim: true },
                  { label: "Infrastructure & system design", dim: true },
                ],
              },
            ].map(group => (
              <motion.div key={group.header}
                variants={stagger} initial="hidden" whileInView="show"
                viewport={VP_CLOSE} className="mb-10 md:mb-12">
                <motion.div variants={fadeItem} className="flex items-center gap-3 mb-4">
                  <span className={`font-mono text-[0.55rem] tracking-widest uppercase font-medium ${group.color}`}>
                    {group.header}
                  </span>
                  <span className="flex-1 h-px bg-border/30" aria-hidden="true" />
                </motion.div>
                <div className="flex flex-col gap-2.5 pl-0 md:pl-4">
                  {group.items.map(item => (
                    <motion.div key={item.label} variants={fadeItem}
                      className="flex items-start gap-3">
                      <span className={`w-1 h-1 rounded-full mt-2 shrink-0
                                        ${item.dim ? "bg-dim/50" : "bg-signal"}`} aria-hidden="true" />
                      <span className={`font-sans text-[0.95rem] md:text-base font-light leading-relaxed
                                        ${item.dim ? "text-fog/50" : "text-fog/80"}`}>
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Metadata */}
            <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP_CLOSE}
              className="border-t border-border/30 pt-6">
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {[
                  { label: "Discipline",  value: "Computer Engineering"   },
                  { label: "Year",        value: "4th Year"                },
                  { label: "Direction",   value: "Cloud / DevOps / DevSecOps" },
                  { label: "Mode",        value: "Building"                },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="font-mono text-[0.45rem] text-dim/45 tracking-widest uppercase">{label}</span>
                    <span className="font-mono text-[0.6rem] text-fog/70 tracking-wide">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ENGINEERING PRINCIPLES */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-20 md:mt-24 pt-12 border-t border-border/20">
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-[0.45rem] text-dim/40 tracking-widest uppercase">
              Engineering Principles
            </span>
            <span className="w-8 h-px bg-border/25" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-border/20">
            {ENGINEERING_PRINCIPLES.map((p, i) => (
              <motion.div key={p.label}
                variants={fadeItem} initial="hidden" whileInView="show" viewport={VP_NEAR}
                transition={{ delay: i * 0.07 }}
                className={`flex flex-col gap-2 p-5 md:p-6
                  ${i < 3 ? "border-b border-border/20 sm:border-b-0 sm:border-r border-border/20" : ""}
                  ${i === 1 ? "sm:border-b sm:border-border/20 lg:border-b-0" : ""}
                  ${i === 2 ? "sm:border-b-0" : ""}`}>
                <span className="font-mono text-[0.5rem] text-signal tracking-widest uppercase">{p.label}</span>
                <p className="font-sans text-fog/45 font-light text-sm leading-relaxed">{p.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* DECISION LOG */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-20 md:mt-24 pt-12 border-t border-border/20">

          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-[0.45rem] text-dim/40 tracking-widest uppercase">
              Decision Log
            </span>
            <span className="w-8 h-px bg-border/25" aria-hidden="true" />
            <span className="font-mono text-[0.4rem] text-dim/25 tracking-widest">
              engineering decisions from actual projects
            </span>
          </div>

          <p className="font-sans text-fog/35 font-light text-sm leading-relaxed mb-10 mt-3 max-w-xl">
            Engineering is about decisions as much as technologies.
            These are real choices made during actual builds — not hypotheticals.
          </p>

          <div className="flex flex-col gap-0">
            {DECISION_LOG.map((entry, i) => (
              <motion.div key={entry.index}
                variants={fadeItem} initial="hidden" whileInView="show" viewport={VP_CLOSE}
                transition={{ delay: i * 0.08 }}
                className="border-b border-border/[0.15] last:border-b-0 py-8 md:py-10
                           grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">

                {/* Left */}
                <div className="md:col-span-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[0.45rem] text-signal tracking-widest">[{entry.index}]</span>
                    <span className="font-mono text-[0.4rem] text-dim/35 tracking-widest uppercase">
                      {entry.context}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-fog/85 text-base md:text-lg tracking-tight leading-snug">
                    {entry.decision}
                  </h3>
                </div>

                {/* Right */}
                <div className="md:col-span-7 md:col-start-6 flex flex-col gap-5">
                  <div>
                    <span className="font-mono text-[0.45rem] text-signal/60 tracking-widest uppercase block mb-2">
                      Why
                    </span>
                    <p className="font-sans text-fog/55 font-light text-sm leading-relaxed">{entry.why}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[0.45rem] text-dim/40 tracking-widest uppercase block mb-2">
                      Tradeoff
                    </span>
                    <p className="font-sans text-fog/40 font-light text-sm leading-relaxed">{entry.tradeoff}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[0.45rem] text-signal/50 tracking-widest uppercase block mb-2">
                      Lesson
                    </span>
                    <p className="font-sans text-fog/50 font-light text-sm leading-relaxed italic">{entry.lesson}</p>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Identity;

