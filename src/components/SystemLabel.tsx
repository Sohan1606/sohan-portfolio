// SystemLabel.tsx — SOHAN // SYSTEM 3.0
import React from "react";

interface SystemLabelProps { number: string; label: string; className?: string; }

const SystemLabel: React.FC<SystemLabelProps> = ({ number, label, className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <span className="font-mono text-[0.55rem] text-signal tracking-widest">{number}</span>
    <span className="w-4 h-px bg-border/40" aria-hidden="true" />
    <span className="font-mono text-[0.55rem] text-muted tracking-widest uppercase">{label}</span>
  </div>
);

export default SystemLabel;
