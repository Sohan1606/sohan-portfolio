// KonamiNotification.tsx
// Temporary system annotation shown after Konami sequence.
// aria-live polite — does not steal focus.
import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface KonamiNotificationProps {
  visible: boolean;
}

const KonamiNotification: React.FC<KonamiNotificationProps> = ({ visible }) => {
  const shouldReduce = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="konami"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } }}
          exit={{ opacity: 0,    transition: { duration: 0.4,  ease: "easeIn" } }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90]
                     flex items-center gap-3 px-4 py-2.5
                     bg-base border border-border/60
                     pointer-events-none select-none"
          aria-live="polite"
          role="status"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0" aria-hidden="true" />
          <div className="flex flex-col gap-0">
            <span className="font-mono text-[0.55rem] text-signal tracking-widest uppercase">
              Sequence accepted
            </span>
            <span className="font-mono text-[0.5rem] text-dim/60 tracking-widest">
              curiosity detected.
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KonamiNotification;
