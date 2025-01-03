import { forwardRef } from "react";
import clsx from "clsx";
import {
	Box,
	type BoxProps,
	type PolymorphicComponentProps,
} from "../Polymorphic";

// Component-specific props should be specified separately
export type LinkOwnProps = {
	color?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error"
		| "neutral";
	/** 尺寸大小 */
	size?: "xs" | "sm" | "md" | "lg";
};

// Merge own props with others inherited from the underlying element type
export type LinkProps<E extends React.ElementType> = PolymorphicComponentProps<
	E,
	LinkOwnProps
>;

// An HTML tag or a different React component can be rendered by default
const defaultElement = "a";

/** 多态组件, ref会转发给实际的组件 */
export const Link: <E extends React.ElementType = typeof defaultElement>(
	props: LinkProps<E>,
) => React.ReactNode = forwardRef(
	<E extends React.ElementType = typeof defaultElement>(
		props: LinkProps<E>,
		ref: typeof props.ref,
	) => {
		const { color, size, className, children, ...other } = props;
		const boxProps = other as BoxProps<E>;
		return (
			<Box
				as={defaultElement}
				ref={ref}
				className={clsx(
					"btn btn-link normal-case",
					{
						"btn-primary": color === "primary",
						"btn-secondary": color === "secondary",
						"btn-accent": color === "accent",
						"btn-info": color === "info",
						"btn-success": color === "success",
						"btn-warning": color === "warning",
						"btn-error": color === "error",
						"btn-neutral": color === "neutral",
						"btn-xs": size === "xs",
						"btn-sm": size === "sm",
						"btn-md": size === "md",
						"btn-lg": size === "lg",
					},
					className,
				)}
				{...boxProps}
			>
				{children}
			</Box>
		);
	},
);

(Link as React.FC).displayName = "@rtdui/Link";
