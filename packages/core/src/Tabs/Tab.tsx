import React, { forwardRef } from "react";
import clsx from "clsx";
import { useTabsContext } from "./context";
import { getColor, getRadius } from "../utils";

export interface TabProps extends React.ComponentPropsWithoutRef<"button"> {
	/** Value of associated panel */
	value: string;

	/** Tab label */
	children?: React.ReactNode;

	/** Content displayed on the right side of the label, for example, icon */
	rightSection?: React.ReactNode;

	/** Content displayed on the left side of the label, for example, icon */
	leftSection?: React.ReactNode;

	/** controls control color based on `variant` */
	color?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error"
		| "neutral";
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
	const {
		className,
		children,
		rightSection,
		leftSection,
		value,
		onClick,
		onKeyDown,
		disabled,
		color,
		style,
		...others
	} = props;

	const ctx = useTabsContext();
	const active = value === ctx.value;
	const activateTab = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		ctx.onChange(
			ctx.allowTabDeactivation ? (value === ctx.value ? null : value) : value,
		);
		onClick?.(event);
	};

	return (
		<button
			ref={ref}
			id={ctx.getTabId(value)}
			{...others}
			disabled={disabled}
			data-active={active}
			data-disabled={disabled}
			role="tab"
			aria-selected={active}
			tabIndex={active || ctx.value === null ? 0 : -1}
			aria-controls={ctx.getPanelId(value)}
			onClick={activateTab}
			className={clsx(
				"h-9 px-3 rounded-[--tabs-radius] bg-clip-padding",
				"relative",
				"group-[[data-grow=true]]:flex-1",
				{
					"hover:bg-base-200": !active,
					"text-gray-400 hover:!bg-base-100": !active && disabled,

					"rounded-b-none border-b-2 hover:border-b-300":
						ctx.variant === "default" &&
						ctx.orientation === "horizontal" &&
						!ctx.inverted,
					"rounded-t-none border-t-2 hover:border-t-300":
						ctx.variant === "default" &&
						ctx.orientation === "horizontal" &&
						ctx.inverted,

					"before:absolute before:inset-x-0 before:-bottom-0.5 before:border-b-2 before:border-[--tabs-color]":
						active &&
						ctx.variant === "default" &&
						ctx.orientation === "horizontal" &&
						!ctx.inverted,
					"before:absolute before:inset-x-0 before:-top-0.5 before:border-t-2 before:border-[--tabs-color]":
						active &&
						ctx.variant === "default" &&
						ctx.orientation === "horizontal" &&
						ctx.inverted,

					"rounded-r-none border-r-2 hover:border-r-300":
						ctx.variant === "default" &&
						ctx.orientation === "vertical" &&
						ctx.placement === "left",
					"rounded-l-none border-l-2 hover:border-l-300":
						ctx.variant === "default" &&
						ctx.orientation === "vertical" &&
						ctx.placement === "right",

					"before:absolute before:inset-y-0 before:-right-0.5 before:border-r-2 before:border-[--tabs-color]":
						active &&
						ctx.variant === "default" &&
						ctx.orientation === "vertical" &&
						ctx.placement === "left",
					"before:absolute before:inset-y-0 before:-left-0.5 before:border-l-2 before:border-[--tabs-color]":
						active &&
						ctx.variant === "default" &&
						ctx.orientation === "vertical" &&
						ctx.placement === "right",

					"rounded-b-none border border-transparent":
						ctx.variant === "outline" &&
						ctx.orientation === "horizontal" &&
						!ctx.inverted,
					"rounded-t-none border border-transparent":
						ctx.variant === "outline" &&
						ctx.orientation === "horizontal" &&
						ctx.inverted,

					"!border-base-300 !border-b-base-100":
						active &&
						ctx.variant === "outline" &&
						ctx.orientation === "horizontal" &&
						!ctx.inverted,

					"!border-base-300 !border-t-base-100":
						active &&
						ctx.variant === "outline" &&
						ctx.orientation === "horizontal" &&
						ctx.inverted,

					"rounded-r-none border border-transparent":
						ctx.variant === "outline" &&
						ctx.orientation === "vertical" &&
						ctx.placement === "left",

					"!border-base-300 !border-r-base-100":
						active &&
						ctx.variant === "outline" &&
						ctx.orientation === "vertical" &&
						ctx.placement === "left",

					"rounded-l-none border border-transparent":
						ctx.variant === "outline" &&
						ctx.orientation === "vertical" &&
						ctx.placement === "right",

					"!border-base-300 !border-l-base-100":
						active &&
						ctx.variant === "outline" &&
						ctx.orientation === "vertical" &&
						ctx.placement === "right",

					"bg-[--tabs-color] text-white hover:bg-[--tabs-color]":
						active && ctx.variant === "pills",
				},
				className,
			)}
			style={
				{
					...style,
					"--tabs-color": getColor(color),
				} as any
			}
			// onKeyDown={createScopedKeydownHandler({
			//   siblingSelector: '[role="tab"]',
			//   parentSelector: '[role="tablist"]',
			//   activateOnFocus: ctx.activateTabWithKeyboard,
			//   loop: ctx.loop,
			//   orientation: ctx.orientation || "horizontal",
			//   dir,
			//   onKeyDown,
			// })}
		>
			{leftSection && <span data-position="left">{leftSection}</span>}
			{children && <span>{children}</span>}
			{rightSection && <span data-position="right">{rightSection}</span>}
		</button>
	);
});

Tab.displayName = "@rtdui/core/Tab";
