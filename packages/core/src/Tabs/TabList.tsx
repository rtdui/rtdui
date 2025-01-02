import { forwardRef } from "react";
import clsx from "clsx";
import { useTabsContext } from "./context";

export interface TabListProps extends React.ComponentPropsWithoutRef<"div"> {
	/** `Tabs.Tab` components */
	children: React.ReactNode;

	/** Determines whether tabs should take all available space, `false` by default */
	grow?: boolean;

	/** Tabs alignment
	 * @default 'start'
	 */
	justify?: "start" | "center" | "end";
}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
	(props, ref) => {
		const { children, className, grow, justify = "start", ...others } = props;

		const ctx = useTabsContext();

		return (
			<div
				ref={ref}
				role="tablist"
				data-grow={grow}
				aria-orientation={ctx.orientation}
				className={clsx(
					"flex flex-wrap items-center relative group",
					{
						"flex-col": ctx.orientation === "vertical",
						"justify-start": justify === "start",
						"justify-center": justify === "center",
						"justify-end": justify === "end",

						"before:absolute before:inset-x-0 before:bottom-0 before:border-b-2 before:border-base-300":
							ctx.variant === "default" &&
							ctx.orientation === "horizontal" &&
							!ctx.inverted,
						"before:absolute before:inset-x-0 before:top-0 before:border-t-2 before:border-base-300":
							ctx.variant === "default" &&
							ctx.orientation === "horizontal" &&
							ctx.inverted,

						"before:absolute before:inset-x-0 before:bottom-0 before:border-b before:border-base-300":
							ctx.variant === "outline" &&
							ctx.orientation === "horizontal" &&
							!ctx.inverted,
						"before:absolute before:inset-x-0 before:top-0 before:border-t before:border-base-300":
							ctx.variant === "outline" &&
							ctx.orientation === "horizontal" &&
							ctx.inverted,

						"before:absolute before:inset-y-0 before:right-0 before:border-r-2 before:border-base-300":
							ctx.variant === "default" &&
							ctx.orientation === "vertical" &&
							ctx.placement === "left",
						"before:absolute before:inset-y-0 before:left-0 before:border-l-2 before:border-base-300":
							ctx.variant === "default" &&
							ctx.orientation === "vertical" &&
							ctx.placement === "right",

						"before:absolute before:inset-y-0 before:right-0 before:border-r before:border-base-300":
							ctx.variant === "outline" &&
							ctx.orientation === "vertical" &&
							ctx.placement === "left",
						"before:absolute before:inset-y-0 before:left-0 before:border-l before:border-base-300":
							ctx.variant === "outline" &&
							ctx.orientation === "vertical" &&
							ctx.placement === "right",
					},
					className,
				)}
				{...others}
			>
				{children}
			</div>
		);
	},
);

TabList.displayName = "@rtdui/core/TabList";
