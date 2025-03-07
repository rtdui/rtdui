import { forwardRef, Children, cloneElement, useMemo } from "react";
import clsx from "clsx";
import { AvatarGroupProvider } from "./AvatarGroup.context";
import type { ThemeBaseSize } from "../theme.types";

export interface AvatarGroupProps {
	max?: number;
	size?: ThemeBaseSize;
	className?: string;
	/** avatars */
	children?: React.ReactNode;
}
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
	(props, ref) => {
		const { max = 4, size = "md", className, children } = props;
		const leftCount = Children.count(children) - max;

		const contextValue = useMemo(
			() => ({
				size,
			}),
			[size],
		);
		return (
			<div
				ref={ref}
				className={clsx(
					"avatar-group",
					{
						"-space-x-4": size === "xs",
						"-space-x-6": size === "sm",
						"-space-x-7": size === "md",
						"-space-x-9": size === "lg",
						"-space-x-11": size === "xl",
					},
					className,
				)}
			>
				<AvatarGroupProvider value={contextValue}>
					{Children.toArray(children).slice(0, max)}
					{leftCount > 0 &&
						cloneElement(Children.toArray(children)[0] as React.ReactElement, {
							placeholder: `+${leftCount}`,
							src: undefined,
						})}
				</AvatarGroupProvider>
			</div>
		);
	},
);

AvatarGroup.displayName = "@rtdui/AvatarGroup";
