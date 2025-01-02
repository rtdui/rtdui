import { forwardRef } from "react";
import clsx from "clsx";

export interface ComboboxFooterProps
	extends React.ComponentPropsWithoutRef<"div"> {}

export const ComboboxFooter = forwardRef<HTMLDivElement, ComboboxFooterProps>(
	(props, ref) => {
		const { className, ...others } = props;

		return <div ref={ref} className={clsx("footer", className)} {...others} />;
	},
);

ComboboxFooter.displayName = "@rtdui/core/ComboboxFooter";
