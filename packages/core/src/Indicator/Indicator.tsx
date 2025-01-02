import { forwardRef } from "react";
import clsx from "clsx";

export interface IndicatorProps {
	animation?: boolean;
	badgeText?: string;
	/**
	 * @default secondary
	 */
	badgeColor?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error";
	className?: string;
	children?: React.ReactNode;
}
export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
	(props, ref) => {
		const {
			animation,
			badgeText,
			badgeColor = "secondary",
			className,
			children,
		} = props;
		return (
			<div className={clsx("indicator", className)}>
				<span
					className={clsx("indicator-item", "badge badge-xs", {
						"badge-primary": badgeColor === "primary",
						"badge-secondary": badgeColor === "secondary",
						"badge-accent": badgeColor === "accent",
						"badge-info": badgeColor === "info",
						"badge-success": badgeColor === "success",
						"badge-warning": badgeColor === "warning",
						"badge-error": badgeColor === "error",
					})}
				>
					{animation && (
						<span
							className={clsx(
								"animate-ping absolute inline-flex h-full w-full rounded-full badge-xs",
								{
									"badge-primary": badgeColor === "primary",
									"badge-secondary": badgeColor === "secondary",
									"badge-accent": badgeColor === "accent",
									"badge-info": badgeColor === "info",
									"badge-success": badgeColor === "success",
									"badge-warning": badgeColor === "warning",
									"badge-error": badgeColor === "error",
								},
							)}
						/>
					)}
					{badgeText}
				</span>
				{children}
			</div>
		);
	},
);

Indicator.displayName = "@rtdui/Indicator";
