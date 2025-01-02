import { forwardRef } from "react";
import clsx from "clsx";
import { useModalContext } from "./context";
import { CloseButton } from "../CloseButton";

export interface ModalCloseButtonProps
	extends React.ComponentPropsWithoutRef<"button"> {}

export const ModalCloseButton = forwardRef<
	HTMLButtonElement,
	ModalCloseButtonProps
>(({ className, onClick, ...others }, ref) => {
	const ctx = useModalContext();
	return (
		<CloseButton
			ref={ref}
			sharp="square"
			{...others}
			onClick={(event) => {
				ctx.onClose();
				onClick?.(event);
			}}
		/>
	);
});

ModalCloseButton.displayName = "@rtdui/core/ModalCloseButton";
