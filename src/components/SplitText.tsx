// SplitText.tsx — SOHAN // SYSTEM 5.0
// Word-by-word reveal for editorial headlines.
// Reduced-motion collapses to a single fade-in (no translation).
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Classes applied to each word span. */
  wordClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  ariaLabel?: string;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  wordClassName = "",
  as: Tag = "h2",
  ariaLabel,
}) => {
  const shouldReduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={ariaLabel ?? text}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className={`inline-block ${wordClassName}`}
          aria-hidden="true"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 18, filter: "blur(4px)" }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
              duration: 0.55,
              ease: "easeOut",
              delay: shouldReduce ? 0 : i * 0.055,
            },
          }}
          viewport={{ once: true, margin: "-60px" }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
};

export default SplitText;
