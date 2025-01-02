import { forwardRef } from "react";
import clsx from "clsx";

export type ComboboxGroupStylesNames = "group" | "groupLabel";

export interface ComboboxGroupProps
	extends React.ComponentPropsWithoutRef<"div"> {
	/** Group label */
	label?: React.ReactNode;
}

export const ComboboxGroup = forwardRef<HTMLDivElement, ComboboxGroupProps>(
	(props, ref) => {
		const { className, style, children, label, ...others } = props;

		return (
			<div ref={ref} className={clsx("option-group", className)} {...others}>
				{label && (
					<div
						className={clsx(
							"groupLabel",
							"flex items-center gap-1 font-medium text-xs text-gray-500",
							"after:flex-1 after:h-px after:bg-base-300",
							className,
						)}
					>
						{label}
					</div>
				)}
				{children}
			</div>
		);
	},
);

ComboboxGroup.displayName = "@rtdui/core/ComboboxGroup";
