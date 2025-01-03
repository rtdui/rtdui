import { forwardRef } from "react";
import clsx from "clsx";
import {
	Box,
	type BoxProps,
	type PolymorphicComponentProps,
} from "../Polymorphic";
import { getRadius, getSpacing } from "../utils";
import type { ThemeSize, ThemeRadius } from "../theme.types";

// Component-specific props should be specified separately
export type PaperOwnProps = {
	elevation?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
	radius?: ThemeRadius;
	padding?: ThemeSize;
};

// Merge own props with others inherited from the underlying element type
export type PaperProps<E extends React.ElementType> = PolymorphicComponentProps<
	E,
	PaperOwnProps
>;

// An HTML tag or a different React component can be rendered by default
const defaultElement = "div";

/** 多态组件, ref会转发给实际的组件 */
export const Paper: <E extends React.ElementType = typeof defaultElement>(
	props: PaperProps<E>,
) => React.ReactNode = forwardRef(
	<E extends React.ElementType = typeof defaultElement>(
		props: PaperProps<E>,
		ref: typeof props.ref,
	) => {
		const {
			color,
			size,
			elevation,
			radius = "md",
			padding = "md",
			className,
			style,
			children,
			...other
		} = props;
		const boxProps = other as BoxProps<E>;
		return (
			<Box
				as={defaultElement}
				ref={ref}
				className={clsx(
					"bg-base-100 rounded-[--paper-rounded] p-[--paper-spacing]",
					{
						"shadow-sm": elevation === "xs",
						shadow: elevation === "sm",
						"shadow-md": elevation === "md",
						"shadow-lg": elevation === "lg",
						"shadow-xl": elevation === "xl",
						"shadow-2xl": elevation === "2xl",
					},
					className,
				)}
				style={
					{
						...style,
						"--paper-rounded": getRadius(radius),
						"--paper-spacing": getSpacing(padding),
					} as any
				}
				{...boxProps}
			>
				{children}
			</Box>
		);
	},
);

(Paper as React.FC).displayName = "@rtdui/core/Paper";
