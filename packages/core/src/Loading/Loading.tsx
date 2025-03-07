import { forwardRef } from "react";
import clsx from "clsx";
import type { ThemeBaseSize } from "../theme.types";

export interface LoadingProps extends React.ComponentPropsWithoutRef<"span"> {
	color?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error"
		| "neutral";
	size?: ThemeBaseSize;
	/** loading variant
	 * @default spinner
	 */
	variant?: "spinner" | "dots" | "ring-3" | "ball" | "bars" | "infinity";
	className?: string;
	style?: React.CSSProperties;
}
export const Loading = forwardRef<HTMLSpanElement, LoadingProps>(
	(props, ref) => {
		const { size, color, variant = "spinner", className, ...other } = props;

		return (
			<span
				ref={ref}
				className={clsx(
					"loading ",
					{
						"text-primary": color === "primary",
						"text-secondary": color === "secondary",
						"text-accent": color === "accent",
						"text-info": color === "info",
						"text-success": color === "success",
						"text-warning": color === "warning",
						"text-error": color === "error",
						"text-neutral": color === "neutral",
						"loading-xs": size === "xs",
						"loading-sm": size === "sm",
						"loading-md": size === "md",
						"loading-lg": size === "lg",
						"loading-xl": size === "xl",
						"loading-spinner": variant === "spinner",
						"loading-dots": variant === "dots",
						"loading-ring": variant === "ring-3",
						"loading-ball": variant === "ball",
						"loading-bars": variant === "bars",
						"loading-infinity": variant === "infinity",
					},
					className,
				)}
				{...other}
			/>
		);
	},
);

Loading.displayName = "@rtdui/Loading";
