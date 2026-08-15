// ScrollProgress.tsx — SOHAN // SYSTEM 5.0
// Thin red readout of scroll depth pinned to the top of the viewport.
// Uses transform: scaleX only — GPU friendly, no layout thrash.
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left
                 bg-signal/80 z-[60]"
    />
  );
};

export default ScrollProgress;
