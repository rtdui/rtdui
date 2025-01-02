import { forwardRef, useEffect, useId } from "react";
import clsx from "clsx";
import { useSpotlightContext } from "./Spotlight.context";
import { spotlightActions } from "./spotlight.store";

export type SpotlightActionsListStylesNames =
	| "actionsList"
	| "actionsListInner";

export interface SpotlightActionsListProps
	extends React.ComponentPropsWithoutRef<"div"> {}

const defaultProps: Partial<SpotlightActionsListProps> = {};

export const SpotlightActionsList = forwardRef<
	HTMLDivElement,
	SpotlightActionsListProps
>((props, ref) => {
	const { className, style, id, children, ...others } = props;
	const ctx = useSpotlightContext();
	const generatedId = `rtdui-${useId().replace(/:/g, "")}`;
	const listId = id || generatedId;

	useEffect(() => {
		spotlightActions.setListId(listId, ctx.store);
		return () => spotlightActions.setListId("", ctx.store);
	}, [listId]);

	return (
		<div
			ref={ref}
			id={listId}
			{...others}
			className={clsx("max-h-96 overflow-y-auto", className)}
		>
			{children}
		</div>
	);
});

SpotlightActionsList.displayName = "@rtdui/SpotlightActionsList";
