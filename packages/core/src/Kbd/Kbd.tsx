import { forwardRef } from "react";
import clsx from "clsx";
import type { ThemeBaseSize } from "../theme.types";

export interface KbdProps {
	size?: ThemeBaseSize;
	className?: string;
	children: React.ReactNode;
}
export const Kbd = forwardRef<HTMLElement, KbdProps>((props, ref) => {
	const { size, className, children } = props;

	return (
		<kbd
			ref={ref}
			className={clsx(
				"kbd",
				{
					"kbd-xs": size === "xs",
					"kbd-sm": size === "sm",
					"kbd-md": size === "md",
					"kbd-lg": size === "lg",
					"kbd-xl": size === "xl",
				},
				className,
			)}
		>
			{children}
		</kbd>
	);
});

Kbd.displayName = "@rtdui/Kbd";
