import { forwardRef } from "react";
import clsx from "clsx";

export interface DividerProps extends React.ComponentPropsWithoutRef<"div"> {
	/** divider direction
	 * @default "vertical"
	 */
	direction?: "horizontal" | "vertical";
	color?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error"
		| "neutral";
	label?: React.ReactNode;
	/** label position
	 * @default center
	 */
	labelPostion?: "start" | "center" | "end";
}

/** ref属性会转发至内部的根div元素 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
	(props, ref) => {
		const {
			direction,
			label,
			labelPostion,
			color,
			className,
			children,
			...others
		} = props;

		return (
			<div
				ref={ref}
				className={clsx(
					"divider",
					{
						"divider-horizontal": direction === "horizontal",

						"divider-start": labelPostion === "start",
						"divider-end": labelPostion === "end",

						"divider-primary": color === "primary",
						"divider-secondary": color === "secondary",
						"divider-accent": color === "accent",
						"divider-info": color === "info",
						"divider-success": color === "success",
						"divider-warning": color === "warning",
						"divider-error": color === "error",
						"divider-neutral": color === "neutral",
					},
					className,
				)}
				{...others}
			>
				{label ?? children}
			</div>
		);
	},
);

Divider.displayName = "@rtdui/Divider";
