// StatusDot — animated red indicator
import React from "react";

interface StatusDotProps {
  label?: string;
  className?: string;
}

const StatusDot: React.FC<StatusDotProps> = ({ label, className = "" }) => (
  <span className={`inline-flex items-center gap-2 ${className}`}>
    <span className="status-dot" aria-hidden="true" />
    {label && (
      <span className="font-mono text-[0.6rem] text-signal tracking-widest uppercase">
        {label}
      </span>
    )}
  </span>
);

export default StatusDot;
