// SystemBoot.tsx — SOHAN // SYSTEM 2.2
// Opening ritual. Fast. Skippable. Session-cached. Unmount-safe.
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const BOOT_LINES = [
  { key: "init", label: "INITIALIZING",             status: "OK" },
  { key: "core", label: "LOADING CORE",             status: "OK" },
  { key: "work", label: "MOUNTING PROJECTS",        status: "OK" },
  { key: "stack",label: "LOADING STACK",            status: "OK" },
  { key: "conn", label: "ESTABLISHING CONNECTION",  status: "OK" },
];

const DOTS = "...........";

interface SystemBootProps { onComplete: () => void; }

const SystemBoot: React.FC<SystemBootProps> = ({ onComplete }) => {
  const shouldReduce = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(0);
  const [showReady, setShowReady]       = useState(false);
  const [done, setDone]                 = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    if (shouldReduce) { onComplete(); return; }
    if (sessionStorage.getItem("sk-booted")) { onComplete(); return; }

    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      if (!mounted.current) { clearInterval(interval); return; }

      setVisibleCount(prev => {
        const next = prev + 1;
        if (next >= BOOT_LINES.length) {
          clearInterval(interval);
          t1 = setTimeout(() => {
            if (!mounted.current) return;
            setShowReady(true);
            t2 = setTimeout(() => {
              if (!mounted.current) return;
              setDone(true);
              sessionStorage.setItem("sk-booted", "1");
              t3 = setTimeout(() => {
                if (!mounted.current) return;
                onComplete();
              }, 250);
            }, 300);
          }, 120);
        }
        return next;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [shouldReduce, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="fixed inset-0 z-[200] bg-base flex flex-col justify-center
                     px-8 sm:px-16"
          role="status"
          aria-label="System initializing"
          aria-live="polite"
        >
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-8">
              <span className="w-1 h-1 rounded-full bg-signal" aria-hidden="true" />
              <span className="font-mono text-[0.55rem] text-signal tracking-widest uppercase">
                SOHAN // SYSTEM · v5.0
              </span>
            </div>

            <div className="flex flex-col gap-1.5 mb-4 font-mono text-[0.55rem] tracking-widest">
              {BOOT_LINES.slice(0, visibleCount).map((line) => (
                <motion.div
                  key={line.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.08 }}
                  className="flex items-center"
                >
                  <span className="text-dim/50 inline-block w-16">{line.label}</span>
                  <span className="text-border/40">{DOTS}</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.06 }}
                    className="text-signal ml-1"
                  >
                    {line.status}
                  </motion.span>
                </motion.div>
              ))}
            </div>

            {visibleCount < BOOT_LINES.length && (
              <span
                className="inline-block w-1.5 h-[0.7rem] bg-signal animate-blink"
                aria-hidden="true"
              />
            )}

            {showReady && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="font-mono text-[0.65rem] text-signal tracking-widest mt-2"
              >
                SYSTEM READY
              </motion.p>
            )}
          </div>

          <button
            onClick={() => {
              if (!mounted.current) return;
              setDone(true);
              sessionStorage.setItem("sk-booted", "1");
              onComplete();
            }}
            className="absolute bottom-8 right-8 font-mono text-[0.45rem] text-dim/25
                       hover:text-dim/60 tracking-widest uppercase
                       focus-visible:outline-signal"
            aria-label="Skip initialization sequence"
          >
            Skip →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SystemBoot;
