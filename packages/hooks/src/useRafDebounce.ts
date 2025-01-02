import { useRef, useCallback } from "react";
import raf from "./utils/raf";

/**
 * Callback will only execute last one for each raf
 */
export function useRafDebounce(callback: VoidFunction) {
	const executeRef = useRef(false);
	const rafRef = useRef<number>();

	const wrapperCallback = useCallback(() => callback(), []);

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
