// Journey.tsx — SOHAN // SYSTEM 2.0
// Evolution trace. Not a resume timeline.
// The story of arriving at Cloud / DevOps / DevSecOps through building.
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SystemLabel from "../components/SystemLabel";
import { makeReveal, makeStagger, makeFadeItem, VP, VP_CLOSE } from "../lib/motion";

const PIPELINE = [
  { step: "01", label: "Idea",         description: "Identify a real problem. Resist building before understanding it."               },
  { step: "02", label: "Research",     description: "Study the domain, existing approaches, constraints and failure modes."           },
  { step: "03", label: "Architecture", description: "Design system boundaries before writing code. These decisions cost most to undo." },
  { step: "04", label: "Prototype",    description: "Build the smallest thing that tests the riskiest assumption."                    },
  { step: "05", label: "Build",        description: "Implement with the real stack. No placeholder logic in the critical path."       },
  { step: "06", label: "Test",         description: "Break it deliberately. Edge cases, auth boundaries, data integrity."             },
  { step: "07", label: "Secure",       description: "Review authentication, encryption, access control and data handling."           },
  { step: "08", label: "Deploy",       description: "Ship to a real environment. Localhost is not a deployment."                     },
  { step: "09", label: "Iterate",      description: "The system is never finished — only at different stages of being improved."     },
];

const PHASES = [
  {
    number: "01", label: "Foundation",     area: "Computer Engineering",
    description: "Started with fundamentals — data structures, algorithms, systems programming and the discipline of thinking in code before writing it.",
    signals: ["C / C++", "Data Structures", "Algorithms", "Systems Thinking"],
    current: false,
  },
  {
    number: "02", label: "Software",       area: "Full-Stack Development",
    description: "Built full-stack applications end to end. Learned that shipping something real teaches more than reading about it.",
    signals: ["JavaScript", "React", "Node.js", "MongoDB", "PostgreSQL", "REST APIs"],
    current: false,
  },
  {
    number: "03", label: "Security",       area: "Encryption & Auth Architecture",
    description: "Designed a zero-knowledge encryption platform. Implemented AES-256-GCM, PBKDF2 and RSA-OAEP client-side via WebCrypto API. Security is an architecture decision, not a feature.",
    signals: ["WebCrypto API", "AES-256-GCM", "PBKDF2", "RSA-OAEP", "JWT", "RBAC"],
    current: false,
  },
  {
    number: "04", label: "AI + Agents",    area: "Multi-Agent Systems",
    description: "Built multi-agent AI systems through hackathon work — a 5-agent adversarial pipeline for bias detection. Learned agent orchestration and LLM integration.",
    signals: ["LangGraph", "LangChain", "Groq / Llama", "FastAPI", "Python"],
    current: false,
  },
  {
    number: "05", label: "Cloud",          area: "Deployment & Infrastructure",
    description: "Moved systems beyond localhost — split-platform deployments, Docker Compose environments, PostgreSQL on managed cloud databases.",
    signals: ["Vercel", "Render", "Docker", "Docker Compose", "PostgreSQL"],
    current: false,
  },
  {
    number: "06", label: "Now",            area: "Cloud / DevOps / DevSecOps",
    description: "Building toward Cloud Engineering, DevOps and DevSecOps. The goal: understand how systems are built, secured and operated at scale.",
    signals: ["Cloud Engineering", "DevOps", "DevSecOps", "Infrastructure as Code"],
    current: true,
  },
];

interface PipelineStepProps { step: string; label: string; description: string; isLast: boolean; }

const PipelineStep: React.FC<PipelineStepProps> = ({ step, label, description, isLast }) => (
  <div className="flex gap-4 md:gap-5">
    <div className="flex flex-col items-center shrink-0">
      <div className="flex items-center justify-center w-6 h-6 border border-border/40 bg-base shrink-0">
        <span className="font-mono text-[0.45rem] text-signal tracking-widest">{step}</span>
      </div>
      {!isLast && <div className="w-px flex-1 bg-border/20 mt-1 min-h-[2rem]" aria-hidden="true" />}
    </div>
    <div className={`flex flex-col gap-1 ${isLast ? "pb-0" : "pb-5 md:pb-7"}`}>
      <span className="font-sans font-semibold text-fog/80 text-sm tracking-tight">{label}</span>
      <p className="font-sans text-fog/40 font-light text-sm leading-relaxed max-w-[28ch]">{description}</p>
    </div>
  </div>
);

const Phase: React.FC<{ phase: typeof PHASES[0]; isLast: boolean }> = ({ phase, isLast }) => (
  <div className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6
                   ${!isLast ? "pb-10 md:pb-12 border-b border-border/[0.15] mb-10 md:mb-12" : ""}`}>
    <div className="md:col-span-3">
      <div className="flex items-baseline gap-3">
        <span className={`font-mono text-[0.45rem] tracking-widest
                          ${phase.current ? "text-signal" : "text-dim/30"}`}>
          {phase.number}
        </span>
        <span className={`font-sans font-black text-xl md:text-2xl tracking-tighter leading-none
                          ${phase.current ? "text-fog" : "text-fog/50"}`}>
          {phase.label}
        </span>
      </div>
      <span className={`font-mono text-[0.45rem] tracking-widest uppercase block mt-1.5
                        ${phase.current ? "text-signal/70" : "text-dim/30"}`}>
        {phase.area}
      </span>
      {phase.current && (
        <div className="mt-2.5 inline-flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-signal animate-blink" aria-hidden="true" />
          <span className="font-mono text-[0.45rem] text-signal tracking-widest uppercase">Current</span>
        </div>
      )}
    </div>
    <div className="md:col-span-5 md:col-start-4">
      <p className={`font-sans font-light leading-relaxed text-sm md:text-base
                     ${phase.current ? "text-fog/70" : "text-fog/40"}`}>
        {phase.description}
      </p>
    </div>
    <div className="md:col-span-3 md:col-start-10 flex flex-wrap content-start gap-x-3 gap-y-1.5">
      {phase.signals.map(s => (
        <span key={s} className={`font-mono text-[0.45rem] tracking-wide
                                  ${phase.current ? "text-fog/50" : "text-dim/30"}`}>
          {s}
        </span>
      ))}
    </div>
  </div>
);

const Journey: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const reveal   = makeReveal(shouldReduce);
  const stagger  = makeStagger(0.04, 0.07);
  const fadeItem = makeFadeItem(shouldReduce);

  return (
    <section id="journey" aria-label="Journey and process"
      className="relative bg-base border-t border-border/30">
      <div className="absolute top-0 bottom-0 left-6 md:left-12 lg:left-16 xl:left-20
                      w-px bg-border/20" aria-hidden="true" />

      <div className="editorial py-section">

        {/* HOW I BUILD */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}>
          <SystemLabel number="05" label="Process" />
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-10 md:mt-14">
          <h2 className="font-sans font-black text-display-xl text-fog tracking-tighter leading-none">
            How I build.
          </h2>
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP} className="mt-8">
          <span className="accent-line block mb-4" />
          <p className="font-sans text-fog/50 font-light leading-relaxed text-base md:text-lg max-w-2xl">
            Not a methodology. A sequence of decisions I return to every time I start
            something — because shortcuts in the early steps always show up in the late ones.
          </p>
        </motion.div>

        {/* Pipeline */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-6">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP_CLOSE}
              className="flex flex-col">
              {PIPELINE.slice(0, 5).map((s, i) => (
                <motion.div key={s.step} variants={fadeItem}>
                  <PipelineStep {...s} isLast={i === 4} />
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP_CLOSE}
              className="flex flex-col">
              {PIPELINE.slice(5).map((s, i, arr) => (
                <motion.div key={s.step} variants={fadeItem}>
                  <PipelineStep {...s} isLast={i === arr.length - 1} />
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP_CLOSE}
              className="mt-8 pt-6 border-t border-border/[0.15]">
              <p className="font-sans text-fog/25 font-light text-sm italic">
                "Production changes how you think."
              </p>
            </motion.div>
          </div>
        </div>

        {/* JOURNEY divider */}
        <div className="mt-[clamp(6rem,12vw,14rem)]" aria-hidden="true">
          <div className="w-full h-px bg-border/15" />
        </div>

        {/* JOURNEY */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-14 md:mt-20">
          <SystemLabel number="05" label="Journey" />
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-10 md:mt-14">
          <h2 className="font-sans font-black text-display-xl text-fog tracking-tighter leading-none">
            Where I've been.<br />
            <span className="text-signal">Where I'm going.</span>
          </h2>
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-8 mb-14 md:mb-20">
          <p className="font-sans text-fog/50 font-light leading-relaxed text-base md:text-lg max-w-2xl">
            Six phases from first principles to engineering systems that run in the cloud.
            Each phase built on the last. The next one is already in progress.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP_CLOSE}>
          {PHASES.map((phase, i) => (
            <motion.div key={phase.number} variants={fadeItem}>
              <Phase phase={phase} isLast={i === PHASES.length - 1} />
            </motion.div>
          ))}
        </motion.div>

        {/* Direction */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-2 pt-1">
            <span className="font-mono text-[0.45rem] text-dim/30 tracking-widest uppercase">Direction</span>
          </div>
          <div className="lg:col-span-7">
            <p className="font-sans text-fog/30 font-light leading-relaxed text-base md:text-lg italic">
              "I'm not trying to know every tool. I'm trying to understand every
              layer — so I can build systems that hold under pressure."
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Journey;

