import React from "react";
import clsx from "clsx";

export interface TabsSimplePanelProps {
	label: string;
	value?: number;
	index?: number;
	variant?: string;
	keepMounted?: boolean;
	disabled?: boolean;
	className?: string;
	children?: React.ReactNode;
}

export function TabsSimplePanel(props: TabsSimplePanelProps) {
	const {
		label,
		value,
		index,
		variant,
		keepMounted = false,
		className,
		children,
		...other
	} = props;

	return keepMounted || value === index ? (
		<div
			role="tabpanel"
			className={clsx(
				"p-4",
				{
					"border border-base-300 ": variant === "lifted",
				},
				{
					"rounded-t-2xl rounded-b-2xl": variant === "lifted" && index !== 0,
				},
				{
					"rounded-tr-2xl rounded-b-2xl": variant === "lifted" && index === 0,
				},
				// value !== index ? "hidden" : "block",
				className,
			)}
			{...other}
		>
			{children}
		</div>
	) : null;
}
