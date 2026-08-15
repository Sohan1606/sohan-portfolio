// CountUp.tsx — SOHAN // SYSTEM 5.0
// Number count-up when scrolled into view.
// Writes to the DOM node directly (no React re-renders).
// Reduced-motion jumps straight to the final value.
import { useEffect, useRef } from "react";
import { animate, useReducedMotion, useInView } from "framer-motion";

interface CountUpProps {
  to: number;
  duration?: number;
  pad?: number;
  suffix?: string;
  className?: string;
  ariaLabel?: string;
}

const CountUp: React.FC<CountUpProps> = ({
  to,
  duration = 1.1,
  pad = 0,
  suffix = "",
  className = "",
  ariaLabel,
}) => {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const started = useRef(false);

  useEffect(() => {
    const render = (v: number) => {
      if (ref.current) {
        ref.current.textContent = String(Math.round(v)).padStart(pad, "0") + suffix;
      }
    };

    if (!inView || started.current) return;
    started.current = true;
    if (shouldReduce) { render(to); return; }
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: render,
    });
    return () => controls.stop();
  }, [inView, to, duration, shouldReduce, pad, suffix]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={ariaLabel ?? String(to).padStart(pad, "0")}
    >
      {String(0).padStart(pad, "0") + suffix}
    </span>
  );
};

export default CountUp;
