import { forwardRef } from "react";
import { Overlay, OverlayProps } from "../Overlay";
import { Transition, type TransitionProps } from "../Transition";
import { useModalContext } from "./context";
import { useModalTransition } from "./use-modal-transition";
import { mergeRefs } from "@rtdui/hooks";

export interface ModalOverlayProps
	extends Omit<OverlayProps, "styles" | "classNames" | "variant" | "vars">,
		Omit<React.ComponentPropsWithoutRef<"div">, "color"> {
	/** Props passed down to the `Transition` component */
	transitionProps?: TransitionProps;
}

export const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>(
	(props, ref) => {
		const { onClick, transitionProps, style, ...others } = props;
		const ctx = useModalContext();
		const transition = useModalTransition(transitionProps);

		return (
			<Transition
				in={ctx.opened}
				appear={true}
				transition="fade"
				{...transition}
			>
				{(_ref, _styles) => (
					<Overlay
						ref={mergeRefs(ref, _ref)}
						fixed
						style={{ ...style, ..._styles }}
						zIndex={ctx.zIndex}
						onClick={(event) => {
							onClick?.(event);
							ctx.closeOnClickOutside && ctx.onClose();
						}}
						{...others}
					/>
				)}
			</Transition>
		);
	},
);

ModalOverlay.displayName = "@rtdui/core/ModalOverlay";
