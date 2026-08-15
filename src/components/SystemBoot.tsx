// SystemBoot.tsx — SOHAN // REDLINE SYSTEM
// Opening ritual inspired by the reference site's cinematic intro,
// reauthored as a coder-first compile sequence.
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const BOOT_KEY = "sk-redline-booted-v1";

const INTRO_WORDS = [
  "I",
  "turn",
  "late-night",
  "bugs",
  "into",
  "shipped",
  "systems.",
];

const BOOT_LINES = [
  "hydrating portfolio shell",
  "mounting verified projects",
  "arming redline cursor",
  "routing work through terminal",
  "opening connection channel",
];

interface SystemBootProps { onComplete: () => void; }

const SystemBoot: React.FC<SystemBootProps> = ({ onComplete }) => {
  const shouldReduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const completed = useRef(false);

  const finish = () => {
    if (completed.current) return;
    completed.current = true;
    try { sessionStorage.setItem(BOOT_KEY, "1"); } catch { /* ignore */ }
    setDone(true);
    onComplete();
  };

  useEffect(() => {
    let instant = shouldReduce;
    try { instant = instant || sessionStorage.getItem(BOOT_KEY) === "1"; } catch { /* ignore */ }
    if (instant) {
      finish();
      return;
    }

    const wordTimer = window.setInterval(() => {
      setWordCount((prev) => Math.min(prev + 1, INTRO_WORDS.length));
    }, 145);

    const progressTimer = window.setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 4, 100);
        if (next >= 100) {
          window.clearInterval(progressTimer);
          window.clearInterval(wordTimer);
          window.setTimeout(finish, 420);
        }
        return next;
      });
    }, 62);

    return () => {
      window.clearInterval(wordTimer);
      window.clearInterval(progressTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeOut" } }}
          className="fixed inset-0 z-[200] overflow-hidden bg-void text-fog"
          role="status"
          aria-label="Sohan portfolio loading"
          aria-live="polite"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(220,38,38,0.18),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(127,29,29,0.18),transparent_34%)]" aria-hidden="true" />
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:44px_44px]" aria-hidden="true" />
          <div className="absolute left-6 md:left-12 lg:left-16 top-0 bottom-0 w-px bg-signal/35" aria-hidden="true" />

          <div className="relative min-h-screen editorial flex flex-col justify-between py-8 md:py-12">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-signal animate-pulse-red" aria-hidden="true" />
                <span className="font-mono text-[0.58rem] tracking-[0.24em] uppercase text-signal">
                  SOHAN // REDLINE BOOT
                </span>
              </div>
              <span className="font-mono text-2xl md:text-4xl font-black tracking-tighter text-fog">
                {String(progress).padStart(2, "0")}%
              </span>
            </div>

            <div className="max-w-5xl py-16">
              <p className="font-mono text-[0.55rem] tracking-[0.24em] uppercase text-dim/70 mb-6">
                compiling the midnight build
              </p>
              <h1 className="font-sans font-black uppercase tracking-tighter leading-[0.86] text-[clamp(3.4rem,11vw,12rem)] text-fog">
                {INTRO_WORDS.map((word, index) => (
                  <motion.span
                    key={word + index}
                    initial={{ opacity: 0, y: 36, rotate: index % 2 ? 1.5 : -1.5 }}
                    animate={{
                      opacity: index < wordCount ? 1 : 0.05,
                      y: index < wordCount ? 0 : 36,
                      rotate: index < wordCount ? 0 : index % 2 ? 1.5 : -1.5,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={[
                      "inline-block mr-[0.18em]",
                      word === "bugs" || word === "systems." ? "text-signal" : "text-fog",
                    ].join(" ")}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-5">
                <div className="h-px bg-border/40 mb-4 overflow-hidden" aria-hidden="true">
                  <motion.div className="h-px bg-signal" animate={{ width: `${progress}%` }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {BOOT_LINES.map((line, index) => {
                    const active = progress >= (index + 1) * 18;
                    return (
                      <div key={line} className="flex items-center gap-2 font-mono text-[0.48rem] tracking-widest uppercase">
                        <span className={active ? "text-signal" : "text-border/60"}>{active ? "OK" : ".."}</span>
                        <span className={active ? "text-fog/55" : "text-dim/35"}>{line}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="lg:col-span-3 lg:col-start-10 flex lg:justify-end">
                <button
                  onClick={finish}
                  className="font-mono text-[0.55rem] tracking-[0.22em] uppercase text-dim hover:text-signal transition-colors focus-visible:outline-signal"
                >
                  Skip Animation →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SystemBoot;
