// Manifesto.tsx — SOHAN // SYSTEM 5.0
// The reference site's manifesto moment — big statement type, one
// operating principle per row. System language. No borrowed slogans.
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SystemLabel from "../components/SystemLabel";
import { makeReveal, makeStagger, makeFadeItem, VP, VP_CLOSE } from "../lib/motion";

interface PrinciplePart {
  text: string;
  signal?: boolean;
}

interface Principle {
  index: string;
  parts: PrinciplePart[];
  note: string;
}

const PRINCIPLES: Principle[] = [
  {
    index: "01",
    parts: [
      { text: "Ship " },
      { text: "real", signal: true },
      { text: " things." },
    ],
    note: "Localhost is not a deployment",
  },
  {
    index: "02",
    parts: [
      { text: "Security is " },
      { text: "architecture", signal: true },
      { text: "." },
    ],
    note: "Designed in — never bolted on",
  },
  {
    index: "03",
    parts: [
      { text: "Every fact " },
      { text: "verified", signal: true },
      { text: "." },
    ],
    note: "Real repos. Real deploys. No invented metrics",
  },
  {
    index: "04",
    parts: [
      { text: "Systems", signal: true },
      { text: " over demos." },
    ],
    note: "Built to hold under pressure",
  },
];

const PrincipleRow: React.FC<{ principle: Principle }> = ({ principle }) => (
  <div className="border-b border-border/15 last:border-b-0 py-6 md:py-8">
    <div className="grid grid-cols-12 gap-4 items-baseline">
      <span className="col-span-2 md:col-span-1 font-mono text-[0.5rem]
                       text-signal/70 tracking-widest">
        {principle.index}
      </span>
      <h3 className="col-span-10 md:col-span-8 font-sans font-black
                     text-display-lg md:text-display-xl text-fog
                     tracking-tighter leading-none">
        {principle.parts.map((part, i) => (
          <span key={i} className={part.signal ? "text-signal" : undefined}>
            {part.text}
          </span>
        ))}
      </h3>
      <p className="hidden md:block md:col-span-3 font-mono text-[0.45rem]
                    text-muted/35 tracking-widest uppercase text-right">
        {principle.note}
      </p>
    </div>
  </div>
);

const Manifesto: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const reveal   = makeReveal(shouldReduce);
  const stagger  = makeStagger(0.05, 0.1);
  const fadeItem = makeFadeItem(shouldReduce);

  return (
    <section id="manifesto" aria-label="Manifesto"
      className="relative bg-base border-t border-border/30">
      <div className="section-rule" aria-hidden="true" />

      <div className="editorial py-section">

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}>
          <SystemLabel number="03" label="Manifesto" />
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="font-mono text-[0.5rem] text-signal tracking-widest uppercase mb-3">
              // OPERATING PRINCIPLES
            </p>
            <h2 className="font-sans font-black text-display-xl text-fog
                           tracking-tighter leading-none">
              Working agreements<br />with myself.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-end gap-3">
            <span className="accent-line" />
            <p className="font-sans text-fog/55 font-light leading-relaxed text-base md:text-lg">
              Four constraints I hold every build against. They cost time early
              and pay it back in production.
            </p>
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show"
          viewport={VP_CLOSE} className="mt-14 md:mt-20 border-t border-border/15">
          {PRINCIPLES.map((principle) => (
            <motion.div key={principle.index} variants={fadeItem}>
              <PrincipleRow principle={principle} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-2 pt-1">
            <span className="font-mono text-[0.45rem] text-muted/35
                             tracking-widest uppercase">// Constraint</span>
          </div>
          <div className="lg:col-span-7">
            <p className="font-sans text-fog/30 font-light leading-relaxed
                          text-base md:text-lg italic">
              "A manifesto is not decoration. It's the set of rules a system
              keeps obeying when nobody is watching."
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Manifesto;
