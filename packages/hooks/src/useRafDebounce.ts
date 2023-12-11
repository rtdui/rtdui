import React from "react";
import raf from "./utils/raf";

/**
 * Callback will only execute last one for each raf
 */
export function useRafDebounce(callback: VoidFunction) {
  const executeRef = React.useRef(false);
  const rafRef = React.useRef<number>();

  const wrapperCallback = React.useCallback(
    () => callback(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return () => {
    if (executeRef.current) {
      return;
    }

    executeRef.current = true;
    wrapperCallback();

    rafRef.current = raf(() => {
      executeRef.current = false;
    });
  };
}
