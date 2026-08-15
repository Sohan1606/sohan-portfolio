// Magnetic.tsx — SOHAN // SYSTEM 5.0
// Light magnetic pull for primary CTAs.
// transform-only, disabled on touch + reduced motion.
import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.25,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const [style, setStyle] = useState<CSSProperties>({});

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || shouldReduce) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    setStyle({
      transform: `translate3d(${dx * strength}px, ${dy * strength}px, 0)`,
      transition: "transform 0.15s ease-out",
    });
  };

  const reset = () =>
    setStyle({
      transform: "translate3d(0,0,0)",
      transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
    });

  if (shouldReduce) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ willChange: "transform", ...style }}
    >
      {children}
    </div>
  );
};

export default Magnetic;
