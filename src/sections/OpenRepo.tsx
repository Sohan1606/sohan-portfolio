// OpenRepo.tsx — SOHAN // OPEN REPO
// The reference site's "open book" chapter, rewritten as an unfiltered
// git log — four code-snapshot cards tracing how Sohan figured things out.
// Every statement maps to the verified project data. No invented metrics.
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SystemLabel from "../components/SystemLabel";
import SplitText from "../components/SplitText";
import { makeReveal, makeStagger, makeFadeItem, VP, VP_CLOSE } from "../lib/motion";

interface DiffLine {
  kind: "+" | "-" | " ";
  text: string;
}

interface Commit {
  rev: string;
  branch: string;
  file: string;
  tag: string;
  statement: { text: string; signal?: boolean }[];
  diff: DiffLine[];
  note: string;
  rotate: string;
  target: string;
  aria: string;
}

const COMMITS: Commit[] = [
  {
    rev: "REV.01",
    branch: "origin/main",
    file: "ORIGIN.md",
    tag: "ORIGIN",
    statement: [
      { text: "Started making " },
      { text: "coded things", signal: true },
      { text: " because ideas felt too slow inside the head." },
    ],
    diff: [
      { kind: "-", text: "ideas stayed inside the head" },
      { kind: "+", text: "full-stack apps — deployed, real, reachable" },
      { kind: " ", text: "first lesson: shipping teaches faster than reading" },
    ],
    note: "It began as full-stack web apps. The first deploys felt like proof of thinking.",
    rotate: "lg:-rotate-[1.4deg]",
    target: "identity",
    aria: "Open the origin chapter — how building started",
  },
  {
    rev: "REV.02",
    branch: "origin/security",
    file: "SECURITY.md",
    tag: "SECURITY",
    statement: [
      { text: "LastKey taught me " },
      { text: "security is not a feature", signal: true },
      { text: " — it shapes the whole system." },
    ],
    diff: [
      { kind: "-", text: "plaintext on the server" },
      { kind: "+", text: "ciphertext only · AES-256-GCM · PBKDF2 · RSA-OAEP" },
      { kind: " ", text: "zero-knowledge means trusting the math, not the host" },
    ],
    note: "Client-side encryption via WebCrypto. The server stores what it cannot read.",
    rotate: "lg:rotate-[1.2deg]",
    target: "work",
    aria: "Open the security chapter — LastKey digital legacy",
  },
  {
    rev: "REV.03",
    branch: "origin/cloud",
    file: "CLOUD.md",
    tag: "CLOUD",
    statement: [
      { text: "Localhost stopped being enough." },
    ],
    diff: [
      { kind: "-", text: "it works on my machine" },
      { kind: "+", text: "split deploys · Render + Vercel · PostgreSQL · Docker Compose" },
      { kind: " ", text: "production is the first honest environment" },
    ],
    note: "Cloud-native builds across platforms — real databases, real hosts, real failure modes.",
    rotate: "lg:-rotate-[1.1deg]",
    target: "work",
    aria: "Open the cloud chapter — Cloud Complaint System",
  },
  {
    rev: "REV.04",
    branch: "origin/now",
    file: "NOW.md",
    tag: "NOW",
    statement: [
      { text: "Cloud / DevOps / DevSecOps", signal: true },
      { text: ". Building toward systems that hold under pressure." },
    ],
    diff: [
      { kind: "-", text: "hoping the deploy works" },
      { kind: "+", text: "observability · IaC · secure pipelines · orchestration" },
      { kind: " ", text: "currently: 4th year, B.E. Computer Engineering" },
    ],
    note: "The direction is locked: build systems that are useful, secure and deployed for the real world.",
    rotate: "lg:rotate-[1.3deg]",
    target: "now",
    aria: "Open the now chapter — current system state",
  },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const CommitCard: React.FC<{ commit: Commit; index: number }> = ({ commit, index }) => (
  <div className="relative">
    <button
      onClick={() => scrollTo(commit.target)}
      aria-label={commit.aria}
      className={[
        "group relative block w-full text-left border border-border/30 bg-deep/80",
        "transition-all duration-300 focus-visible:outline-signal",
        "hover:border-signal/60 motion-safe:hover:-translate-y-1.5",
        "hover:shadow-[0_18px_60px_-18px_rgba(220,38,38,0.28)]",
        commit.rotate,
        "motion-safe:hover:rotate-0",
      ].join(" ")}
      data-cursor="project"
    >
      {/* terminal header */}
      <div className="flex items-center justify-between gap-3 border-b border-border/25 bg-base/80 px-4 md:px-5 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
          <span className="h-2 w-2 rounded-full bg-border/60" aria-hidden="true" />
          <span className="h-2 w-2 rounded-full bg-border/60" aria-hidden="true" />
          <span className="ml-2 font-mono text-[0.45rem] tracking-[0.18em] uppercase text-dim">
            {commit.file}
          </span>
        </div>
        <span className="font-mono text-[0.45rem] tracking-[0.18em] uppercase text-signal">
          {commit.rev}
        </span>
      </div>

      {/* body */}
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-5">
          <span className="font-sans font-black tracking-[-0.02em] text-sm md:text-base text-signal">
            {commit.tag}
          </span>
          <span className="h-3 w-px bg-border/50" aria-hidden="true" />
          <span className="font-mono text-[0.45rem] tracking-[0.16em] uppercase text-dim/60">
            {commit.branch}
          </span>
        </div>

        <h3 className="font-sans font-black uppercase tracking-[-0.04em] leading-[0.9]
                       text-[clamp(1.3rem,2.3vw,2.15rem)] text-fog mb-6">
          {commit.statement.map((part, i) => (
            <span key={i} className={part.signal ? "text-signal" : undefined}>{part.text}</span>
          ))}
        </h3>

        {/* diff snapshot */}
        <div className="border border-border/20 bg-void/80 p-4 font-mono text-[0.55rem] leading-relaxed overflow-hidden">
          {commit.diff.map((line, i) => (
            <div key={i} className="flex gap-3 whitespace-nowrap">
              <span className={line.kind === "+" ? "text-signal" : line.kind === "-" ? "text-dim/70" : "text-border/60"}
                aria-hidden="true">
                {line.kind}
              </span>
              <span className={line.kind === "+" ? "text-signal/85" : line.kind === "-" ? "text-dim/55 line-through decoration-border/40" : "text-fog/35"}>
                {line.text}
              </span>
            </div>
          ))}
          <div className="mt-3 flex items-center gap-2" aria-hidden="true">
            <span className="h-3 w-px bg-border/40" />
            <span className="text-border/50">committed {commit.rev} — {commit.file}</span>
          </div>
        </div>

        <p className="mt-4 font-sans text-fog/48 font-light text-sm leading-relaxed">
          {commit.note}
        </p>
      </div>

      {/* corner arrow */}
      <span className="absolute top-3 right-3 font-mono text-[0.5rem] tracking-widest uppercase
                       text-dim/50 group-hover:text-signal transition-colors" aria-hidden="true">
        {String(index + 1).padStart(2, "0")} →
      </span>
    </button>
  </div>
);

const OpenRepo: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const reveal = makeReveal(shouldReduce);
  const stagger = makeStagger(0.08, 0.12);
  const fadeItem = makeFadeItem(shouldReduce);

  return (
    <section id="openrepo" aria-label="Open repo — commit history"
      className="relative bg-base border-t border-border/25 overflow-hidden">
      <div className="section-rule" aria-hidden="true" />
      <div className="absolute left-[-14vw] top-40 h-[30rem] w-[30rem] rounded-full bg-signal/[0.05] blur-3xl"
        aria-hidden="true" />

      <div className="editorial py-section">
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}>
          <SystemLabel number="02" label="Open Repo" />
        </motion.div>

        {/* header */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[0.55rem] tracking-[0.24em] uppercase text-signal mb-5
                          flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-signal animate-blink" aria-hidden="true" />
              Keep scrolling
            </p>
            <SplitText
              text="I'm an open repo."
              className="font-sans font-black uppercase tracking-[-0.08em] leading-[0.78]
                         text-[clamp(3.2rem,9.5vw,11rem)] text-fog"
            />
            <p className="mt-8 font-sans text-fog/55 font-light leading-relaxed text-base md:text-lg max-w-2xl">
              Here is the unfiltered commit history of how I figured things out.
              No polished rewrite. No cherry-picked branches. Just the commits
              that changed how I build.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <span className="accent-line block mb-5" />
            <p className="font-mono text-[0.52rem] tracking-[0.18em] uppercase text-dim leading-loose">
              I intentionally make edge-cases look handled.
            </p>
            <p className="mt-4 font-mono text-[0.48rem] tracking-[0.18em] uppercase text-dim/60 leading-loose">
              git log --oneline --decorate<br />
              <span className="text-signal">04 commits · 4 chapters · 1 direction</span>
            </p>

            {/* first-deploy polaroid — the reference's memory photo, redrawn as code */}
            <div className="mt-10 max-w-[250px]">
              <div className="inline-block -rotate-3 transition-transform duration-300
                              hover:rotate-0 hover:scale-[1.02]">
                <div className="bg-[#EDEDED] p-3 pb-4 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.9)]">
                  <div className="bg-void border border-border/60 p-3 font-mono text-[0.5rem] leading-relaxed">
                    <p className="text-signal">$ git commit -m "first ship"</p>
                    <p className="text-fog/55">[main 000001] first ship</p>
                    <p className="text-fog/55">  3 files changed, 217 insertions(+)</p>
                    <p className="text-signal/80">→ deployed to production ✓</p>
                  </div>
                  <p className="mt-2.5 text-center font-mono text-[0.42rem] tracking-[0.2em] uppercase text-[#1a1a1a]/70">
                    sohan — early phase
                  </p>
                </div>
              </div>
              <p className="mt-4 font-mono text-[0.45rem] tracking-[0.16em] uppercase text-dim/50 leading-loose">
                how it all started. first green build. SHIP IT.
              </p>
            </div>
          </div>
        </motion.div>

        {/* spine + cards */}
        <div className="relative mt-16 md:mt-24">
          {/* vertical spine */}
          <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-border/20 hidden md:block"
            aria-hidden="true" />
          <div className="absolute left-2 md:left-1/2 top-0 h-2 w-2 -translate-x-[3.5px] rounded-full bg-signal"
            aria-hidden="true" />
          <div className="absolute left-2 md:left-1/2 bottom-0 h-2 w-2 -translate-x-[3.5px] rounded-full bg-signal/40"
            aria-hidden="true" />

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={VP_CLOSE}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            {COMMITS.map((commit, index) => (
              <motion.div key={commit.rev} variants={fadeItem}>
                <CommitCard commit={commit} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* closing note */}
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={VP}
          className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-2 pt-1">
            <span className="font-mono text-[0.45rem] text-muted/35 tracking-widest uppercase">
              git status
            </span>
          </div>
          <div className="lg:col-span-7">
            <p className="font-mono text-[0.55rem] text-fog/30 leading-loose">
              on branch origin/now — building toward Cloud Engineering, DevOps and DevSecOps.
              <br />
              <span className="text-signal/70">working tree clean · no fake metrics committed</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenRepo;
