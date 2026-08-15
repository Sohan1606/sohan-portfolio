// Stack.tsx — SOHAN // INSOMNIAC STACK
// Reference-like hover playground: skills become a kinetic field instead of a table.
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SystemLabel from "../components/SystemLabel";
import { makeReveal, makeStagger, makeFadeItem, VP, VP_CLOSE } from "../lib/motion";

interface Skill {
  name: string;
  family: string;
  detail: string;
  used: string;
  status: "Built with" | "Building toward" | "Exploring";
}

const SKILLS: Skill[] = [
  { name: "TypeScript", family: "Application", detail: "Primary language across 5+ repos.", used: "LastKey, FairLoop, HH Goa, QMeet", status: "Built with" },
  { name: "React", family: "Frontend", detail: "Interactive UI, portals, dashboards and portfolio systems.", used: "LastKey, Cloud Complaint, this portfolio", status: "Built with" },
  { name: "Next.js", family: "Frontend", detail: "App-router style product surfaces and hackathon interfaces.", used: "FairLoop, HH Goa", status: "Built with" },
  { name: "Node.js", family: "Backend", detail: "REST APIs, middleware, auth and platform logic.", used: "LastKey, Cloud Complaint", status: "Built with" },
  { name: "Express", family: "Backend", detail: "Server routing, security middleware and API boundaries.", used: "LastKey, Sentra, Cloud Complaint", status: "Built with" },
  { name: "FastAPI", family: "AI Backend", detail: "Python API layer for agentic workflows.", used: "FairLoop backend", status: "Built with" },
  { name: "MongoDB", family: "Database", detail: "Document storage for MERN-style products.", used: "LastKey, Sentra", status: "Built with" },
  { name: "PostgreSQL", family: "Database", detail: "Relational data with Prisma and managed cloud deploys.", used: "Cloud Complaint System", status: "Built with" },
  { name: "Docker", family: "Infrastructure", detail: "Reproducible local environments with Docker Compose.", used: "Cloud Complaint System", status: "Built with" },
  { name: "Vercel", family: "Deployment", detail: "Frontend deployment and production previews.", used: "Multiple shipped projects", status: "Built with" },
  { name: "Render", family: "Deployment", detail: "Backend/cloud service hosting for split-platform architecture.", used: "Cloud Complaint backend", status: "Built with" },
  { name: "WebCrypto", family: "Security", detail: "AES-256-GCM, PBKDF2 and RSA-OAEP client-side crypto.", used: "LastKey Digital Legacy", status: "Built with" },
  { name: "JWT / RBAC", family: "Security", detail: "Session and role boundaries for production-style systems.", used: "LastKey, Sentra, Cloud Complaint", status: "Built with" },
  { name: "LangGraph", family: "AI Agents", detail: "Multi-agent orchestration with stateful graph workflows.", used: "FairLoop", status: "Built with" },
  { name: "Cloud", family: "Direction", detail: "Infrastructure, managed services and deployment architecture.", used: "Current focus", status: "Building toward" },
  { name: "DevSecOps", family: "Direction", detail: "Security embedded inside the delivery pipeline.", used: "Current focus", status: "Building toward" },
];

const LAYERS = [
  { title: "Application", items: ["React", "Next.js", "TypeScript", "REST APIs"] },
  { title: "Data", items: ["MongoDB", "PostgreSQL", "Prisma", "SQLite"] },
  { title: "Infrastructure", items: ["Docker", "Vercel", "Render", "Linux"] },
  { title: "Security", items: ["WebCrypto", "JWT", "RBAC", "Helmet"] },
];

const Stack: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const reveal = makeReveal(shouldReduce);
  const stagger = makeStagger(0.035, 0.08);
  const fadeItem = makeFadeItem(shouldReduce);
  const [active, setActive] = useState<Skill>(SKILLS[0]);

  return (
    <section id="stack" aria-label="Technical stack" className="relative overflow-hidden bg-base border-t border-border/30">
      <div className="section-rule" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.12),transparent_60%)]" aria-hidden="true" />

      <div className="editorial py-section relative">
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}>
          <SystemLabel number="05" label="Stack" />
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP} className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-sans font-black tracking-[-0.075em] leading-[0.78] text-[clamp(3.8rem,11vw,13rem)] text-fog">
              insomniac<br />Stack
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <span className="accent-line block mb-5" />
            <p className="font-sans text-fog/60 font-light leading-relaxed text-base md:text-lg">
              Hover around to see the magic: every technology shows where it has actually appeared in Sohan's builds.
            </p>
            <p className="mt-4 font-mono text-[0.5rem] tracking-[0.22em] uppercase text-dim">
              no fake badges · real repos only
            </p>
          </div>
        </motion.div>

        {/* Kinetic skill wall */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP_CLOSE} className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {SKILLS.map((skill, index) => {
              const isActive = active.name === skill.name;
              return (
                <motion.button
                  key={skill.name}
                  variants={fadeItem}
                  onMouseEnter={() => setActive(skill)}
                  onFocus={() => setActive(skill)}
                  whileHover={shouldReduce ? undefined : { y: -6, rotate: index % 2 ? 0.6 : -0.6 }}
                  className={[
                    "group min-h-32 md:min-h-40 border p-4 text-left transition-colors focus-visible:outline-signal",
                    isActive ? "border-signal bg-signal text-white" : "border-border/25 bg-surface/35 hover:border-signal/60 hover:bg-deep",
                  ].join(" ")}
                  data-cursor="button"
                >
                  <span className={isActive ? "font-mono text-[0.42rem] tracking-[0.18em] uppercase text-white/70" : "font-mono text-[0.42rem] tracking-[0.18em] uppercase text-dim group-hover:text-signal"}>
                    {String(index + 1).padStart(2, "0")} / {skill.family}
                  </span>
                  <span className={isActive ? "mt-5 block font-sans font-black text-3xl md:text-4xl tracking-tighter leading-none text-white" : "mt-5 block font-sans font-black text-3xl md:text-4xl tracking-tighter leading-none text-fog/80 group-hover:text-fog"}>
                    {skill.name}
                  </span>
                  <span className={isActive ? "mt-4 block font-mono text-[0.45rem] tracking-[0.16em] uppercase text-white/70" : "mt-4 block font-mono text-[0.45rem] tracking-[0.16em] uppercase text-dim/50"}>
                    {skill.status}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          <motion.aside variants={reveal} initial="hidden" whileInView="show" viewport={VP_CLOSE} className="lg:col-span-4 lg:sticky lg:top-24 self-start border border-border/30 bg-deep/80 p-5 md:p-6 min-h-[26rem] flex flex-col justify-between">
            <div>
              <p className="font-mono text-[0.52rem] tracking-[0.22em] uppercase text-signal mb-6">
                active signal
              </p>
              <h3 className="font-sans font-black tracking-tighter leading-none text-[clamp(2.6rem,5vw,5.6rem)] text-fog mb-4">
                {active.name}
              </h3>
              <p className="font-sans text-fog/58 font-light leading-relaxed text-base md:text-lg">
                {active.detail}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-border/25">
              <span className="block font-mono text-[0.45rem] tracking-[0.2em] uppercase text-dim mb-2">where used</span>
              <span className="block font-mono text-[0.58rem] tracking-wide text-signal leading-relaxed">↳ {active.used}</span>
            </div>
          </motion.aside>
        </div>

        {/* Layer cards */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP} className="mt-20 md:mt-24">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[0.52rem] tracking-[0.22em] uppercase text-dim">system layers</span>
            <span className="h-px flex-1 bg-border/25" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border/25">
            {LAYERS.map((layer, index) => (
              <div key={layer.title} className={[
                "p-5 md:p-6 min-h-56 bg-base/50",
                index < LAYERS.length - 1 ? "border-b md:border-r border-border/25" : "",
              ].join(" ")}
              >
                <span className="font-sans font-black text-3xl tracking-tighter text-fog block mb-5">{layer.title}</span>
                <ul className="space-y-2" role="list">
                  {layer.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 font-mono text-[0.55rem] tracking-wide text-fog/46">
                      <span className="h-1 w-1 rounded-full bg-signal" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stack;
