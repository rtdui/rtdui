import type { TransitionProps } from "../Transition";
import { useModalContext } from "./context";

const DEFAULT_TRANSITION: Partial<TransitionProps> = {
	duration: 200,
	timingFunction: "ease",
	transition: "fade",
};

export function useModalTransition(
	transitionOverride?: TransitionProps,
): Partial<TransitionProps> {
	const ctx = useModalContext();
	return {
		...DEFAULT_TRANSITION,
		...ctx.transitionProps,
		...transitionOverride,
	};
}
