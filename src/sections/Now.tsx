// Now.tsx — SOHAN // SYSTEM 2.2
// /now — current system state. Truthful only.
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import StatusDot from "../components/StatusDot";
import { makeReveal, makeStagger, makeFadeItem, VP, VP_CLOSE } from "../lib/motion";

const NOW_FOCUS = [
  {
    area: "Cloud Engineering",
    detail: "Cloud infrastructure, managed services, deployment architecture.",
    status: "ACTIVE",
  },
  {
    area: "DevOps",
    detail: "CI/CD pipelines, automation, observability, system reliability.",
    status: "ACTIVE",
  },
  {
    area: "DevSecOps",
    detail: "Security embedded into delivery pipelines from the start.",
    status: "ACTIVE",
  },
];

const NOW_EXPLORING = [
  "Container orchestration",
  "Infrastructure as Code",
  "Secure deployment patterns",
  "System monitoring",
  "Multi-cloud architecture",
];

const Now: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const reveal   = makeReveal(shouldReduce);
  const stagger  = makeStagger(0.05, 0.08);
  const fadeItem = makeFadeItem(shouldReduce);

  return (
    <section
      id="now"
      aria-label="Now — current focus"
      className="relative bg-base border-t border-border/30"
    >
      <div
        className="absolute top-0 bottom-0 left-6 md:left-12 lg:left-16 xl:left-20
                   w-px bg-border/20"
        aria-hidden="true"
      />

      <div className="editorial py-section">

        {/* Label */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.55rem] text-signal tracking-widest">/</span>
            <span className="font-mono text-[0.55rem] text-dim tracking-widest uppercase">now</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="mt-10 md:mt-14"
        >
          <h2 className="font-sans font-black text-display-xl text-fog tracking-tighter leading-none">
            Current<br />system state.
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* LEFT — current focus */}
          <div className="lg:col-span-6">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={VP_CLOSE}
            >
              <div className="flex items-center gap-3 mb-6">
                <StatusDot />
                <span className="font-mono text-[0.55rem] text-signal tracking-widest uppercase">
                  Current Focus
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={VP_CLOSE}
            >
              {NOW_FOCUS.map((item) => (
                <motion.div
                  key={item.area}
                  variants={fadeItem}
                  className="flex items-start gap-4 py-4 border-b border-border/20 last:border-b-0"
                >
                  <div className="flex flex-col gap-0.5 pt-0.5 shrink-0">
                    <span className="font-mono text-[0.45rem] text-signal tracking-widest uppercase">
                      {item.status}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-sans font-semibold text-fog/90 text-sm md:text-base tracking-tight">
                      {item.area}
                    </span>
                    <span className="font-sans text-fog/50 font-light text-sm leading-relaxed">
                      {item.detail}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="hidden lg:block lg:col-span-1" />

          {/* RIGHT — exploring + mode */}
          <div className="lg:col-span-5">

            {/* Exploring */}
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={VP_CLOSE}
              className="mb-8"
            >
              <span className="font-mono text-[0.55rem] text-dim tracking-widest uppercase block mb-5">
                Currently Exploring
              </span>
              <div className="flex flex-col gap-2">
                {NOW_EXPLORING.map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-1 h-px bg-border/40 shrink-0" aria-hidden="true" />
                    <span className="font-mono text-[0.65rem] text-fog/60 tracking-wide">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mode */}
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={VP_CLOSE}
              className="border-t border-border/25 pt-6"
            >
              <span className="font-mono text-[0.55rem] text-dim tracking-widest uppercase block mb-4">
                Mode
              </span>
              <div className="flex flex-wrap gap-3">
                {["Build", "Learn", "Experiment"].map((mode, i) => (
                  <span
                    key={mode}
                    className={`font-sans font-semibold text-sm tracking-tight
                                ${i === 0 ? "text-fog" : i === 1 ? "text-fog/70" : "text-fog/40"}`}
                  >
                    {mode}
                    {i < 2 && (
                      <span className="text-border/50 mx-1" aria-hidden="true">·</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Phase indicator */}
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={VP_CLOSE}
              className="mt-6 pt-6 border-t border-border/25"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[0.5rem] text-dim/50 tracking-widest uppercase">
                  Current Phase
                </span>
                <span className="font-mono text-[0.5rem] text-signal tracking-widest">
                  06 / CLOUD · DEVOPS · DEVSECOPS
                </span>
              </div>
              <div className="flex gap-1.5" aria-hidden="true">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div
                    key={n}
                    className={`h-0.5 flex-1 ${n === 6 ? "bg-signal" : "bg-fog/30"}`}
                  />
                ))}
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Now;
