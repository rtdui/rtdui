import { forwardRef } from "react";
import type { ArrowPosition, FloatingPosition } from "../../Popover.types";
import { getArrowPositionStyles } from "./get-arrow-position-styles";
import { useDirection } from "@rtdui/hooks";
import clsx from "clsx";

interface FloatingArrowProps extends React.ComponentPropsWithoutRef<"div"> {
	position: FloatingPosition;
	arrowSize: number;
	arrowOffset: number;
	arrowRadius: number;
	arrowPosition: ArrowPosition;
	arrowX: number | undefined;
	arrowY: number | undefined;
	visible: boolean | undefined;
}

export const FloatingArrow = forwardRef<HTMLDivElement, FloatingArrowProps>(
	(props, ref) => {
		const {
			position,
			arrowSize,
			arrowOffset,
			arrowRadius,
			arrowPosition,
			visible,
			arrowX,
			arrowY,
			className,
			style,
			...others
		} = props;
		const dir = useDirection();
		if (!visible) {
			return null;
		}

		return (
			<div
				{...others}
				ref={ref}
				className={clsx("floating-arrow", className)}
				style={{
					...style,
					...getArrowPositionStyles({
						position,
						arrowSize,
						arrowOffset,
						arrowRadius,
						arrowPosition,
						dir,
						arrowX,
						arrowY,
					}),
				}}
			/>
		);
	},
);

FloatingArrow.displayName = "@rtdui/core/FloatingArrow";
