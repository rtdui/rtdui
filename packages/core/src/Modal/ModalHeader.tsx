import { forwardRef } from "react";
import clsx from "clsx";
import { useModalContext } from "./context";

export interface ModalHeaderProps
	extends React.ComponentPropsWithoutRef<"header"> {}

export const ModalHeader = forwardRef<HTMLElement, ModalHeaderProps>(
	({ className, ...others }, ref) => {
		const ctx = useModalContext();
		return (
			<header
				ref={ref}
				className={clsx(
					"modal-header",
					"flex justify-between items-center min-h-14 p-[var(--modal-padding,theme-spacing-md)]",
					"sticky top-0 z-1000",
					"bg-base-100",
					className,
				)}
				{...others}
			/>
		);
	},
);

ModalHeader.displayName = "@rtdui/core/ModalHeader";
