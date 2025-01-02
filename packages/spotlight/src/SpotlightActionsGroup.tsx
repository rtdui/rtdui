import { forwardRef } from "react";
import clsx from "clsx";
import { useSpotlightContext } from "./Spotlight.context";

export type SpotlightActionsGroupStylesNames = "actionsGroup";

export interface SpotlightActionsGroupProps
	extends React.ComponentPropsWithoutRef<"div"> {
	/** `Spotlight.Action` components */
	children?: React.ReactNode;

	/** Group label */
	label?: React.ReactNode;
}

const defaultProps: Partial<SpotlightActionsGroupProps> = {};

export const SpotlightActionsGroup = forwardRef<
	HTMLDivElement,
	SpotlightActionsGroupProps
>((props, ref) => {
	const { className, style, label, children, ...others } = props;
	const ctx = useSpotlightContext();

	return (
		<div
			ref={ref}
			className={clsx(
				"before:content-[--spotlight-group-label] before:text-gray-400 before:text-sm",
				className,
			)}
			{...others}
			style={{ ...style, "--spotlight-group-label": `'${label}'` } as any}
		>
			{children}
		</div>
	);
});

SpotlightActionsGroup.displayName = "@rtdui/SpotlightActionsGroup";
