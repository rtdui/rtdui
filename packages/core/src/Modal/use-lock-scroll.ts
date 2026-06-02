import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@rtdui/hooks";

interface UseScrollLock {
  opened: boolean;
  transitionDuration: number;
}

export function useLockScroll({ opened, transitionDuration }: UseScrollLock) {
  const [shouldLockScroll, setShouldLockScroll] = useState(opened);
  const timeoutIdRef = useRef<number>(undefined);
  const reduceMotion = useReducedMotion();
  const _transitionDuration = reduceMotion ? 0 : transitionDuration;

  useEffect(() => {
    if (opened) {
      setShouldLockScroll(true);
      window.clearTimeout(timeoutIdRef.current);
    } else if (_transitionDuration === 0) {
      setShouldLockScroll(false);
    } else {
      timeoutIdRef.current = window.setTimeout(
        () => setShouldLockScroll(false),
        _transitionDuration,
      );
    }

    return () => window.clearTimeout(timeoutIdRef.current);
  }, [opened, _transitionDuration]);

  return shouldLockScroll;
}
