import { forwardRef } from "react";
import clsx from "clsx";

export interface ComboboxHeaderProps
	extends React.ComponentPropsWithoutRef<"div"> {}

export const ComboboxHeader = forwardRef<HTMLDivElement, ComboboxHeaderProps>(
	(props, ref) => {
		const { className, ...others } = props;

		return <div ref={ref} className={clsx("header", className)} {...others} />;
	},
);

ComboboxHeader.displayName = "@rtdui/core/ComboboxHeader";
