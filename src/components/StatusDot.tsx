// StatusDot.tsx — SOHAN // SYSTEM 3.0
import React from "react";

interface StatusDotProps { label?: string; className?: string; }

const StatusDot: React.FC<StatusDotProps> = ({ label, className = "" }) => (
  <span className={`inline-flex items-center gap-1.5 ${className}`}>
    <span className="status-dot" aria-hidden="true" />
    {label && (
      <span className="font-mono text-[0.5rem] text-signal tracking-widest uppercase">
        {label}
      </span>
    )}
  </span>
);

export default StatusDot;
