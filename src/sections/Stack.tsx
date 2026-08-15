// Stack.tsx — SOHAN // SYSTEM 2.0 + hover usage tooltips
// Technology hover reveals where/how it was used in actual projects.
import React, { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import SystemLabel from "../components/SystemLabel";
import { makeReveal, makeStagger, makeFadeItem, VP, VP_CLOSE, VP_NEAR } from "../lib/motion";

const rowVariant: Variants = {
  hidden: { opacity: 0, x: -10 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// All technologies with verified "where used" context
const BUILT_WITH = [
  { index: "01", name: "TypeScript",            category: "Application",       note: "Primary language — 5+ repos",        where: "LastKey, FairLoop, HH Goa, QMeet"        },
  { index: "02", name: "React",                 category: "Frontend",          note: "React 18 / React 19",                where: "LastKey client, cloud-complaint frontend" },
  { index: "03", name: "Node.js + Express",     category: "Backend",           note: "REST APIs, middleware, auth",         where: "LastKey server, cloud-complaint backend"  },
  { index: "04", name: "Python + FastAPI",       category: "Backend / Systems", note: "Multi-agent AI backends",            where: "FairLoop backend, agent orchestration"   },
  { index: "05", name: "MongoDB",               category: "Database",          note: "MERN stack projects",                where: "LastKey, Sentra incident dashboard"       },
  { index: "06", name: "PostgreSQL",            category: "Database",          note: "Prisma ORM, cloud deployments",      where: "Cloud complaint system"                  },
  { index: "07", name: "Docker",                category: "Infrastructure",    note: "Docker Compose local environments",  where: "Cloud complaint system local dev"         },
  { index: "08", name: "Vercel + Render",       category: "Deployment",        note: "Multi-platform cloud deployments",   where: "All deployed projects"                   },
  { index: "09", name: "LangGraph + LangChain", category: "AI / Agents",       note: "5-agent adversarial pipeline",       where: "FairLoop bias detection pipeline"        },
  { index: "10", name: "WebCrypto API",         category: "Security",          note: "AES-256-GCM, PBKDF2, RSA-OAEP",     where: "LastKey client-side encryption"          },
  { index: "11", name: "JWT + bcryptjs",        category: "Auth / Security",   note: "Multiple production systems",        where: "LastKey, Sentra, cloud-complaint"        },
  { index: "12", name: "Tailwind CSS",          category: "Frontend",          note: "Component styling, responsive UI",   where: "All frontend projects"                   },
];

const BUILDING_TOWARD = [
  { index: "01", name: "Cloud Engineering",       note: "AWS, GCP, Azure infrastructure patterns"    },
  { index: "02", name: "DevOps",                  note: "CI/CD pipelines, automation, monitoring"    },
  { index: "03", name: "DevSecOps",               note: "Security embedded into delivery pipelines"  },
  { index: "04", name: "Infrastructure as Code",  note: "Terraform, configuration management"        },
  { index: "05", name: "Container Orchestration", note: "Kubernetes, scaling, cluster management"    },
];

const SYSTEM_LAYERS = [
  { label: "Application",    items: ["TypeScript / JS", "React / Next.js",   "REST APIs",       "Node.js / FastAPI"] },
  { label: "Infrastructure", items: ["Docker / Compose", "Vercel / Render",  "Cloud Platforms", "Linux Systems"    ] },
  { label: "Delivery",       items: ["Git",              "CI/CD (learning)", "Automation",      "Monitoring"       ] },
  { label: "Security",       items: ["Client-side Enc.", "Auth Systems",     "RBAC",            "DevSecOps →"      ] },
];

const ARCH_NODES = [
  { layer: "USER",            sub: "Browser / Client",         active: false },
  { layer: "APPLICATION",     sub: "React / Next.js / TS",     active: true  },
  { layer: "API / SERVICES",  sub: "Node.js / FastAPI",        active: false },
  { layer: "DATA",            sub: "MongoDB / PostgreSQL",     active: false },
  { layer: "INFRASTRUCTURE",  sub: "Docker / Vercel / Render", active: true  },
  { layer: "DELIVERY + SEC.", sub: "DevOps / DevSecOps →",     active: false },
];

interface TechRowProps {
  index: string; name: string; category: string; note: string; where: string; type: "built" | "toward";
}

const TechRow: React.FC<TechRowProps> = ({ index, name, category, note, where, type }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div variants={rowVariant} className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div tabIndex={0}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={type === "built" ? `${name} — used in ${where}` : `${name} — ${note}`}
        className="flex items-center gap-4 md:gap-6 py-3.5 border-b border-border/20 cursor-default">
        <span className={`font-mono text-[0.5rem] tracking-widest w-5 shrink-0 transition-colors duration-200
                          ${hovered ? "text-signal" : "text-dim/40"}`}>{index}</span>
        <span className={`font-sans font-semibold text-sm md:text-base tracking-tight min-w-0 flex-1
                          transition-colors duration-200
                          ${hovered ? "text-fog" : "text-fog/80"}`}>{name}</span>

        {/* "Where used" — appears on hover, replaces category */}
        <div className="hidden sm:block w-52 shrink-0 overflow-hidden">
          {hovered ? (
            <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="font-mono text-[0.45rem] text-signal/70 tracking-wide block">
              ↳ {where}
            </motion.span>
          ) : (
            <span className="font-mono text-[0.5rem] text-dim/40 tracking-widest uppercase">
              {category}
            </span>
          )}
        </div>

        <span className={`hidden md:block font-mono text-[0.45rem] tracking-widest uppercase shrink-0
                          transition-colors duration-200
                          ${type === "built"
                            ? hovered ? "text-signal" : "text-signal/50"
                            : "text-muted/40"}`}>
          {type === "built" ? "Built with" : "Building toward"}
        </span>
        <span className="hidden xl:block font-mono text-[0.45rem] text-dim/30 tracking-wide
                         text-right w-44 shrink-0">{note}</span>
        <span className={`font-mono text-[0.6rem] shrink-0 transition-all duration-150
                          ${hovered ? "text-signal opacity-100 translate-x-0.5" : "text-border/50 opacity-0"}`}
          aria-hidden="true">→</span>
      </div>
    </motion.div>
  );
};

interface TowardRowProps {
  index: string; name: string; note: string;
}

// "Building toward" rows — the reference site's skills hover, mapped onto
// the learning direction list: hover (or keyboard focus) swaps the note
// into view and raises the signal, same as the "Built with" rows.
const TowardRow: React.FC<TowardRowProps> = ({ index, name, note }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div variants={rowVariant} className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div tabIndex={0}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={`${name} — ${note}`}
        className="flex items-center gap-4 md:gap-6 py-3.5 border-b border-border/[0.12] cursor-default">
        <span className={`font-mono text-[0.5rem] tracking-widest w-5 shrink-0 transition-colors duration-200
                          ${hovered ? "text-signal" : "text-dim/25"}`}>{index}</span>
        <span className={`font-sans font-semibold text-sm md:text-base tracking-tight min-w-0 flex-1
                          transition-colors duration-200
                          ${hovered ? "text-fog" : "text-fog/35"}`}>{name}</span>

        {/* Note — appears on hover / focus */}
        <div className="hidden sm:block w-52 shrink-0 overflow-hidden">
          {hovered ? (
            <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="font-mono text-[0.45rem] text-signal/70 tracking-wide block">
              ↳ {note}
            </motion.span>
          ) : (
            <span className="font-mono text-[0.5rem] text-dim/30 tracking-widest uppercase">
              Direction
            </span>
          )}
        </div>

        <span className={`hidden md:block font-mono text-[0.45rem] tracking-widest uppercase shrink-0
                          transition-colors duration-200
                          ${hovered ? "text-signal" : "text-muted/40"}`}>
          Building toward
        </span>
        <span className={`font-mono text-[0.6rem] shrink-0 transition-all duration-150
                          ${hovered ? "text-signal opacity-100 translate-x-0.5" : "text-border/50 opacity-0"}`}
          aria-hidden="true">→</span>
      </div>
    </motion.div>
  );
};

const Stack: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const reveal   = makeReveal(shouldReduce);
  const stagger  = makeStagger();
  const fadeItem = makeFadeItem(shouldReduce);

  return (
    <section id="stack" aria-label="Technical Stack"
      className="relative bg-base border-t border-border/30">
      <div className="absolute top-0 bottom-0 left-6 md:left-12 lg:left-16 xl:left-20
                      w-px bg-border/20" aria-hidden="true" />

      <div className="editorial py-section">

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}>
          <SystemLabel number="03" label="Stack" />
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 className="font-sans font-black text-display-xl text-fog
                           tracking-tighter leading-none">
              The system<br />behind the work.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-end gap-3">
            <span className="accent-line" />
            <p className="font-sans text-fog/55 font-light leading-relaxed text-base md:text-lg">
              I work across application, infrastructure and security layers.
              Cloud, DevOps and DevSecOps are the engineering direction I'm building toward.
            </p>
            <p className="font-mono text-[0.45rem] text-dim/35 tracking-widest italic">
              "Curiosity is part of the stack."
            </p>
            <p className="font-mono text-[0.45rem] text-dim/30 tracking-widest mt-1">
              Hover or focus any technology to see where it was used →
            </p>
          </div>
        </motion.div>

        {/* TABLE HEADERS */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-14 md:mt-20">
          <div className="flex items-center gap-4 mb-2 pb-3 border-b border-border/30">
            <span className="font-mono text-[0.45rem] text-dim/30 tracking-widest w-5 shrink-0 hidden sm:block">#</span>
            <span className="font-mono text-[0.45rem] text-dim/30 tracking-widest flex-1">Technology</span>
            <span className="hidden sm:block font-mono text-[0.45rem] text-dim/30 tracking-widest w-52 shrink-0">
              Layer / Where used
            </span>
            <span className="hidden md:block font-mono text-[0.45rem] text-dim/30 tracking-widest shrink-0">Status</span>
            <span className="hidden xl:block font-mono text-[0.45rem] text-dim/30 tracking-widest text-right w-44 shrink-0">Context</span>
            <span className="w-4 shrink-0 hidden sm:block" aria-hidden="true" />
          </div>
        </motion.div>

        {/* BUILT WITH */}
        <div className="mt-2">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
            className="flex items-center gap-3 py-4">
            <span className="font-mono text-[0.5rem] text-signal tracking-widest uppercase">Built with</span>
            <span className="flex-1 h-px bg-border/18" aria-hidden="true" />
            <span className="font-mono text-[0.45rem] text-dim/35 tracking-widest">{BUILT_WITH.length} technologies</span>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP_CLOSE}>
            {BUILT_WITH.map(t => <TechRow key={t.index} {...t} type="built" />)}
          </motion.div>
        </div>

        {/* BUILDING TOWARD */}
        <div className="mt-10 md:mt-14">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
            className="flex items-center gap-3 py-4">
            <span className="font-mono text-[0.5rem] text-dim/50 tracking-widest uppercase">Building toward</span>
            <span className="flex-1 h-px bg-border/18" aria-hidden="true" />
            <span className="font-mono text-[0.45rem] text-dim/30 tracking-widest">current direction</span>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP_CLOSE}>
            {BUILDING_TOWARD.map(t => <TowardRow key={t.index} {...t} />)}
          </motion.div>
        </div>

        {/* SYSTEM LAYERS */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-20 md:mt-24 pt-12 border-t border-border/20">
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-[0.45rem] text-dim/40 tracking-widest uppercase">System Layers</span>
            <span className="w-8 h-px bg-border/25" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-border/20">
            {SYSTEM_LAYERS.map((layer, i) => (
              <motion.div key={layer.label} variants={fadeItem} initial="hidden"
                whileInView="show" viewport={VP_NEAR} transition={{ delay: i * 0.08 }}
                className={`p-5 flex flex-col gap-3.5
                  ${i < 3 ? "border-b border-border/20 lg:border-b-0 lg:border-r border-border/20" : ""}
                  ${i === 1 ? "sm:border-b sm:border-border/20 lg:border-b-0" : ""}`}>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-signal shrink-0" aria-hidden="true" />
                  <span className="font-mono text-[0.5rem] text-signal tracking-widest uppercase">{layer.label}</span>
                </div>
                <ul className="flex flex-col gap-1.5" role="list">
                  {layer.items.map(item => (
                    <li key={item} className="font-mono text-[0.55rem] text-fog/40 tracking-wide">{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ARCH FLOW — desktop */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-20 md:mt-24 hidden lg:block" aria-hidden="true">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[0.45rem] text-dim/35 tracking-widest uppercase">Architecture Flow</span>
            <span className="w-8 h-px bg-border/20" />
          </div>
          <div className="flex items-stretch border border-border/20 overflow-hidden">
            {ARCH_NODES.map(node => (
              <div key={node.layer}
                className={`flex-1 flex flex-col items-center border-r border-border/20 last:border-r-0
                            ${node.active ? "bg-surface" : "bg-base"}`}>
                <div className="w-full flex flex-col items-center justify-center gap-1 py-4 px-2">
                  <span className={`font-mono text-[0.45rem] tracking-widest text-center font-medium
                                    ${node.active ? "text-signal" : "text-fog/40"}`}>{node.layer}</span>
                  <span className="font-mono text-[0.4rem] text-dim/30 tracking-wide text-center">{node.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ARCH FLOW — mobile */}
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP_CLOSE}
          className="mt-12 lg:hidden" aria-hidden="true">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[0.45rem] text-dim/35 tracking-widest uppercase">Architecture Flow</span>
            <span className="w-8 h-px bg-border/20" />
          </div>
          <div className="flex flex-col items-start pl-4 border-l border-border/20">
            {ARCH_NODES.map(node => (
              <motion.div key={node.layer} variants={fadeItem} className="flex items-center gap-3 py-1.5">
                <span className={`w-1 h-1 rounded-full shrink-0 ${node.active ? "bg-signal" : "bg-border/40"}`} />
                <span className="font-mono text-[0.5rem] text-fog/40 tracking-widest uppercase">{node.layer}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SYSTEM NOTE */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-20 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-2 pt-1">
            <span className="font-mono text-[0.45rem] text-dim/30 tracking-widest uppercase">System Note</span>
          </div>
          <div className="lg:col-span-7">
            <p className="font-sans text-fog/30 font-light leading-relaxed text-base md:text-lg italic">
              "I don't think of a stack as a list of tools. I think about the boundary
              between application, infrastructure, delivery and security — and choose
              the technology that makes the system reliable."
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Stack;


