// CustomCursor.tsx — SOHAN // SYSTEM 5.0
// Premium pointer: a tight red dot + a lagging ring.
// States: default / link / button / project / text.
// Auto-disables on touch devices, reduced-motion and forced-colors.
// Performance: rAF-throttled transform updates, never layout.
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type CursorState = "default" | "link" | "button" | "project" | "text";

const DOT_SIZE = 6;
const RING_SIZE = 40;

const CustomCursor: React.FC = () => {
  const shouldReduce = useReducedMotion();

  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const raf     = useRef<number | null>(null);

  // Computed once at mount — stable across renders.
  const [fine] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(forced-colors: active)").matches
    );
  });

  const enabled = fine && !shouldReduce;
  const [state, setState]     = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  const target  = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const shown   = useRef(false);

  // Toggle native cursor suppression on <html>.
  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("has-cursor");
    } else {
      document.documentElement.classList.remove("has-cursor");
    }
    return () => document.documentElement.classList.remove("has-cursor");
  }, [enabled]);

  // Smooth the ring towards the target; lerp keeps it stable and cheap.
  useEffect(() => {
    if (!enabled) return;

    const show = () => { shown.current = true; setVisible(true); };
    const hide = () => { shown.current = false; setVisible(false); };

    const loop = () => {
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!shown.current) show();
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      ) as HTMLElement | null;
      if (!el) { setState("default"); return; }
      const mode = el.dataset.cursor as CursorState | undefined;
      if (mode && ["link", "button", "project", "text"].includes(mode)) {
        setState(mode);
      } else if (
        el.tagName === "TEXTAREA" ||
        el.tagName === "INPUT" ||
        el.tagName === "SELECT"
      ) {
        setState("text");
      } else if (el.tagName === "A" || el.getAttribute("role") === "button") {
        setState("link");
      } else {
        setState("button");
      }
    };

    raf.current = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", hide);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className={`cursor-layer ${visible ? "cursor-layer--on" : ""}`}
      aria-hidden="true"
    >
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: RING_SIZE,
          height: RING_SIZE,
          marginLeft: -RING_SIZE / 2,
          marginTop: -RING_SIZE / 2,
        }}
      >
        <div className={`cursor-ring__inner cursor-state-${state}`} />
      </div>
      <div
        ref={dotRef}
        data-cursor-state={state}
        className="cursor-dot"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          marginLeft: -DOT_SIZE / 2,
          marginTop: -DOT_SIZE / 2,
        }}
      />
    </div>
  );
};

export default CustomCursor;
