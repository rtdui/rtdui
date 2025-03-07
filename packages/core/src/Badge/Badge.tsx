import { forwardRef, isValidElement, cloneElement } from "react";
import clsx from "clsx";
import {
	Box,
	type BoxProps,
	type PolymorphicComponentProps,
} from "../Polymorphic";
import type { ThemeBaseSize } from "../theme.types";

// Component-specific props should be specified separately
export type BadgeOwnProps = {
	/** theme color */
	color?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error"
		| "neutral";
	/** 尺寸大小
	 *  @default "md"
	 */
	size?: ThemeBaseSize;
	/** style variant
	 * @default "default"
	 */
	variant?: "default" | "ghost" | "outline" | "dash" | "soft";
	icon?: React.ReactNode;
};

// Merge own props with others inherited from the underlying element type
export type BadgeProps<E extends React.ElementType> = PolymorphicComponentProps<
	E,
	BadgeOwnProps
>;

// An HTML tag or a different React component can be rendered by default
const defaultElement = "span";

/** 多态组件, ref会转发给实际的组件 */
export const Badge: <E extends React.ElementType = typeof defaultElement>(
	props: BadgeProps<E>,
) => React.ReactNode = forwardRef(
	<E extends React.ElementType = typeof defaultElement>(
		props: BadgeProps<E>,
		ref: typeof props.ref,
	) => {
		const {
			color,
			size = "md",
			icon,
			variant = "default",
			className,
			children,
			...other
		} = props;

		const boxProps = other as BoxProps<E>;

		return (
			<Box
				as={defaultElement}
				ref={ref}
				className={clsx(
					"badge",
					{
						"badge-primary": color === "primary",
						"badge-secondary": color === "secondary",
						"badge-accent": color === "accent",
						"badge-info": color === "info",
						"badge-success": color === "success",
						"badge-warning": color === "warning",
						"badge-error": color === "error",
						"badge-neutral": color === "neutral",
						"badge-xs": size === "xs",
						"badge-sm": size === "sm",
						// "badge-md": size === "md", //默认
						"badge-lg": size === "lg",
						"badge-xl": size === "xl",
						"badge-ghost": variant === "ghost",
						"badge-outline": variant === "outline",
						"badge-dash": variant === "dash",
						"badge-soft": variant === "soft",
					},
					className,
				)}
				{...boxProps}
			>
				{icon &&
					isValidElement(icon) &&
					cloneElement<any>(icon, {
						size:
							size === "xs" ? 12 : size === "sm" ? 14 : size === "md" ? 16 : 18,
					})}
				{children}
			</Box>
		);
	},
);
