import { useRef } from "react";
import raf from "./utils/raf";

/**
 * Callback will only execute last one for each raf
 */
export function useRafDebounce(callback: VoidFunction) {
  const executeRef = useRef(false);
  const rafRef = useRef<number>(null);

  return () => {
    if (executeRef.current) {
      return;
    }

    executeRef.current = true;
    callback();

    rafRef.current = raf(() => {
      executeRef.current = false;
    });
  };
}
