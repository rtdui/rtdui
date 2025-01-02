import { forwardRef } from "react";
import clsx from "clsx";

export interface RadialProgressProps
	extends React.ComponentPropsWithoutRef<"progress"> {
	/**
	 * 任意合法的CSS长度单位
	 */
	size?: string;
	/**
	 * 任意合法的CSS长度单位
	 */
	thickness?: string;
	color?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error";
	/**
	 * 0-100内的任意值
	 */
	value: number;
	className?: string;
	children?: React.ReactNode;
}

export const RadialProgress = forwardRef<HTMLDivElement, RadialProgressProps>(
	(props, ref) => {
		const { size, thickness, color, value, className, children } = props;

		return (
			<div
				ref={ref}
				className={clsx(
					"radial-progress",
					{
						"text-black": color === undefined,
						"text-primary": color === "primary",
						"text-secondary": color === "secondary",
						"text-accent": color === "accent",
						"text-info": color === "info",
						"text-success": color === "success",
						"text-warning": color === "warning",
						"text-error": color === "error",
					},
					className,
				)}
				style={
					{
						"--value": value,
						"--size": size,
						"--thickness": thickness,
					} as any
				}
			>
				{children || `${value}%`}
			</div>
		);
	},
);

RadialProgress.displayName = "@rtdui/RadialProgress";
