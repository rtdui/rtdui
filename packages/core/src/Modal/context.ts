import { createSafeContext } from "../utils";
import type { TransitionProps } from "../Transition";

interface ModalContextValue {
	titleMounted: boolean;
	bodyMounted: boolean;
	setTitleMounted: (value: boolean) => void;
	setBodyMounted: (value: boolean) => void;
	getTitleId: () => string;
	getBodyId: () => string;
	transitionProps?: Partial<TransitionProps>;
	zIndex?: string | number;

	opened: boolean;
	onClose: () => void;

	closeOnEscape?: boolean;
	trapFocus?: boolean;
	closeOnClickOutside?: boolean;

	fullScreen?: boolean;
	yOffset?: string | number;
}

export const [ModalProvider, useModalContext] =
	createSafeContext<ModalContextValue>(
		"ModalBase component was not found in tree",
	);
