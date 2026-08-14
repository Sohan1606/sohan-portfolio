// useScrollLock.ts
// Shared scroll lock with reference counting.
// Prevents Navigation closing from unlocking body while Terminal is still open.
import { useEffect } from "react";

// Reference counter — two systems can independently lock without conflict.
let lockCount = 0;

function applyLock() {
  if (typeof document === "undefined") return;
  if (lockCount === 0) {
    document.body.style.overflow = "hidden";
  }
  lockCount++;
}

function releaseLock() {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = "";
  }
}

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (locked) {
      applyLock();
      return () => releaseLock();
    }
    return undefined;
  }, [locked]);
}
