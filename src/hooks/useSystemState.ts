// useSystemState.ts
// Tracks which section is active and maps it to a system mode label.
// Used by Navigation to show a subtle evolving system annotation.
import { useMemo } from "react";

const STATE_MAP: Record<string, string> = {
  hero:     "INITIALIZING",
  identity: "IDENTITY_LOADED",
  stack:    "CAPABILITIES_LOADED",
  work:     "BUILD_ARCHIVE",
  lab:      "EXPERIMENT_MODE",
  journey:  "TRACING_HISTORY",
  now:      "CURRENT_STATE",
  contact:  "CONNECTION_AVAILABLE",
};

export function useSystemState(activeSection: string): string {
  return useMemo(() => STATE_MAP[activeSection] ?? "ONLINE", [activeSection]);
}
