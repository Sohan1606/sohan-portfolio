// TerminalEgg.tsx — SOHAN // SYSTEM
// Hidden terminal interface. Easter egg — not required for navigation.
// Safe client-side command simulation. No eval. No dangerouslySetInnerHTML.
// No filesystem access. No real shell execution.
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { bestWork, labProjects } from "../data/projects";

// ── COMMAND OUTPUT TYPES ──────────────────────────────────────────
type OutputLine =
  | { type: "input";  text: string }
  | { type: "output"; lines: string[] }
  | { type: "error";  text: string }
  | { type: "blank" };

// ── COMMAND REGISTRY ─────────────────────────────────────────────
const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "Available commands:",
    "",
    "  about      Engineering identity",
    "  stack      Technical areas",
    "  work       Selected projects",
    "  lab        Experiments",
    "  journey    Development phases",
    "  contact    How to reach me",
    "  status     System status",
    "  whoami     Who is behind this",
    "  clear      Clear terminal",
    "  exit       Close terminal",
    "",
    "Tip: \u2191 recalls previous command.",
  ],
  about: () => [
    "SOHAN KHACHANE",
    "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
    "4th Year \u00B7 B.E. Computer Engineering",
    "",
    "Focus:",
    "  Cloud Engineering",
    "  DevOps",
    "  DevSecOps",
    "  Software Engineering",
    "",
    "Building systems, learning infrastructure.",
  ],
  stack: () => [
    "TECHNICAL AREAS",
    "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
    "",
    "BUILT WITH",
    "  TypeScript \u00B7 JavaScript \u00B7 Python",
    "  React \u00B7 Next.js \u00B7 Node.js \u00B7 FastAPI",
    "  MongoDB \u00B7 PostgreSQL \u00B7 Prisma",
    "  Docker \u00B7 Vercel \u00B7 Render",
    "  LangGraph \u00B7 LangChain \u00B7 Groq",
    "  WebCrypto API \u00B7 JWT \u00B7 Tailwind CSS",
    "",
    "BUILDING TOWARD",
    "  Cloud Engineering",
    "  DevOps \u00B7 DevSecOps",
    "  Infrastructure as Code",
    "  Container Orchestration",
  ],
  work: () => {
    const lines: string[] = [
      "SELECTED SYSTEMS",
      "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
      "",
    ];
    bestWork.forEach((p, i) => {
      lines.push(`  ${String(i + 1).padStart(2, "0")}  ${p.name}`);
      lines.push(`       ${p.type}`);
      if (p.live) lines.push(`       \u2192 ${p.live}`);
      lines.push("");
    });
    return lines;
  },
  lab: () => {
    const lines: string[] = [
      "LAB / EXPERIMENTS",
      "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
      "",
    ];
    labProjects.forEach((p, i) => {
      lines.push(`  ${String(i + 1).padStart(2, "0")}  ${p.name}`);
      lines.push(`       ${p.type}`);
      lines.push("");
    });
    return lines;
  },
  journey: () => [
    "ENGINEERING PHASES",
    "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
    "",
    "  01  Foundation    Computer Engineering",
    "  02  Software      Full-stack development",
    "  03  Security      Encryption & auth",
    "  04  AI + Agents   Multi-agent systems",
    "  05  Cloud         Deployment & infra",
    "  06  Now  \u25CF        Cloud / DevOps / DevSecOps",
  ],
  contact: () => [
    "CONTACT",
    "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
    "",
    "  GitHub",
    "  github.com/Sohan1606",
    "",
    "  LinkedIn",
    "  linkedin.com/in/sohan-khachane-4a214b275",
    "",
    "Email available on request.",
  ],
  status: () => [
    "SYSTEM STATUS",
    "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
    "",
    "  SYSTEM ........ ONLINE",
    "  BUILD  ........ STABLE",
    "  MODE   ........ ENGINEERING",
    "  FOCUS  ........ CLOUD / DEVOPS / DEVSECOPS",
    "  PHASE  ........ 06 / NOW",
    "",
    "sohan-khachane / v5.0 / 2026\u2013",
  ],
  whoami: () => [
    "",
    "You found the engineer behind the interface.",
    "",
    "Sohan Khachane \u2014 4th year Computer Engineering.",
    "Builds real systems. Deployed, secured, iterated.",
    "",
    "Currently: Cloud, DevOps, DevSecOps.",
    "The terminal was not an accident.",
  ],
  clear: () => [],
  exit:  () => [],
};

const INITIAL_OUTPUT: OutputLine[] = [
  {
    type: "output",
    lines: [
      "SOHAN // SYSTEM",
      "terminal session initialized",
      "",
      "type \"help\" to see available commands.",
    ],
  },
  { type: "blank" },
];

interface TerminalEggProps {
  isOpen: boolean;
  onClose: () => void;
}

const TerminalEgg: React.FC<TerminalEggProps> = ({ isOpen, onClose }) => {
  const shouldReduce = useReducedMotion();

  const [input,      setInput]   = useState("");
  const [output,     setOutput]  = useState<OutputLine[]>(INITIAL_OUTPUT);
  const [history,    setHistory] = useState<string[]>([]);
  const [historyIdx, setHistIdx] = useState(-1);

  const inputRef      = useRef<HTMLInputElement>(null);
  const outputRef     = useRef<HTMLDivElement>(null);
  const panelRef      = useRef<HTMLDivElement>(null);
  const triggerRef    = useRef<HTMLElement | null>(null);

  // Remember what triggered the terminal for focus restore
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    } else {
      // Restore focus to trigger element on close
      if (triggerRef.current && typeof triggerRef.current.focus === "function") {
        triggerRef.current.focus();
        triggerRef.current = null;
      }
    }
  }, [isOpen]);

  // Scroll output to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Escape closes
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Outside click closes
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const executeCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setHistory(prev => [cmd, ...prev.slice(0, 49)]);
    setHistIdx(-1);

    const inputLine: OutputLine = { type: "input", text: `> ${raw.trim()}` };

    if (cmd === "clear") {
      setOutput(INITIAL_OUTPUT);
      return;
    }
    if (cmd === "exit") {
      setOutput(prev => [...prev, inputLine, { type: "blank" }]);
      setTimeout(onClose, 300);
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      setOutput(prev => [
        ...prev,
        inputLine,
        { type: "output", lines: handler() },
        { type: "blank" },
      ]);
    } else {
      setOutput(prev => [
        ...prev,
        inputLine,
        { type: "error", text: `command not found: ${cmd}` },
        { type: "blank" },
      ]);
    }
  }, [onClose]);

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
      return;
    }
    if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setOutput(INITIAL_OUTPUT);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : (history[next] ?? ""));
      return;
    }
  };

  const panelVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : -12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" as const },
    },
    exit: {
      opacity: 0,
      y: shouldReduce ? 0 : -8,
      transition: { duration: 0.15, ease: "easeIn" as const },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="terminal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] bg-void/80 backdrop-blur-[2px]
                     flex items-center justify-center p-2 sm:p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            key="terminal-panel"
            ref={panelRef}
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Sohan system terminal"
            className="w-full max-w-[760px] max-h-[80vh] flex flex-col
                       bg-base border border-border/60
                       shadow-[0_0_0_1px_rgba(220,38,38,0.08)]"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3
                            border-b border-border/40 shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.6rem] text-signal tracking-widest">
                  SOHAN // TERMINAL
                </span>
                <span className="w-px h-3 bg-border/40" aria-hidden="true" />
                <span className="font-mono text-[0.5rem] text-dim/50 tracking-widest uppercase">
                  Local session
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close terminal"
                className="font-mono text-[0.6rem] text-dim hover:text-signal
                           transition-colors duration-150 px-1
                           focus-visible:outline-signal"
              >
                ×
              </button>
            </div>

            {/* Output — word-wrap applied so long lines don't overflow on 320px */}
            <div
              ref={outputRef}
              className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4
                         font-mono text-[0.65rem] leading-relaxed tracking-wide min-h-0"
              aria-live="polite"
              aria-label="Terminal output"
            >
              {output.map((line, i) => {
                if (line.type === "blank") {
                  return <div key={i} className="h-2" />;
                }
                if (line.type === "input") {
                  return (
                    <div key={i} className="text-signal/80 mt-1 break-words">
                      {line.text}
                    </div>
                  );
                }
                if (line.type === "error") {
                  return (
                    <div key={i} className="text-signal/60 mt-0.5 break-words">
                      {line.text}
                    </div>
                  );
                }
                if (line.type === "output") {
                  return (
                    <div key={i} className="mt-1">
                      {line.lines.map((l, j) => (
                        <div
                          key={j}
                          className={[
                            "break-words",
                            l.startsWith("\u2500") || l === ""
                              ? "text-border/60"
                              : l.startsWith("  ")
                              ? "text-fog/60"
                              : "text-fog/80",
                          ].join(" ")}
                        >
                          {l || "\u00A0"}
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* Input row */}
            <div className="flex items-center gap-2 px-4 py-3
                            border-t border-border/30 shrink-0">
              <span className="font-mono text-[0.65rem] text-signal shrink-0" aria-hidden="true">
                &gt;
              </span>
              <label htmlFor="terminal-input" className="sr-only">
                Terminal command input
              </label>
              <input
                id="terminal-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                className="flex-1 bg-transparent font-mono text-[0.65rem] text-fog/90
                           tracking-wide outline-none caret-signal
                           placeholder:text-dim/30"
                placeholder="type a command..."
                aria-label="Terminal command input"
              />
            </div>

            {/* Hint */}
            <div className="px-4 py-1.5 border-t border-border/20 shrink-0">
              <span className="font-mono text-[0.45rem] text-dim/30 tracking-widest">
                ESC to close \u00B7 \u2191 recalls history \u00B7 Ctrl+L clears
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalEgg;
