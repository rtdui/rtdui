import { forwardRef } from "react";
import clsx from "clsx";
import { ChipGroup } from "./ChipGroup/ChipGroup";
import { CloseButton } from "../CloseButton";

export interface ChipProps
	extends Omit<React.ComponentPropsWithoutRef<"div">, "size"> {
	color?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error"
		| "neutral";
	/** 尺寸
	 * @default "normal"
	 */
	size?: "small" | "normal";
	startIcon?: React.ReactNode;
	deleteIcon?: React.ReactNode;
	label?: React.ReactNode;
	onDelete?: (e?: any) => void;
	disabled?: boolean;
	slots?: {
		label?: string;
		deleteBtn?: string;
	};
}

/** ref属性会转发至内部的button元素 */
export const Chip_ = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
	const {
		label,
		color,
		size = "normal",
		className,
		startIcon,
		onClick,
		onDelete,
		deleteIcon,
		disabled,
		slots,
		children,
		...other
	} = props;

	return (
		<div
			ref={ref}
			className={clsx(
				"chip",
				"flex flex-nowrap items-center gap-1 px-2 rounded-box bg-base-200 leading-none w-fit whitespace-nowrap",
				size === "small" ? "py-px text-xs" : " py-0.5 text-sm",
				onDelete ? "[&]:pr-1" : "[&]:pr-3",
				{
					"bg-primary text-primary-content": color === "primary",
					"bg-secondary text-secondary-content": color === "secondary",
					"bg-accent text-accent-content": color === "accent",
					"bg-info text-info-content": color === "info",
					"bg-success text-success-content": color === "success",
					"bg-warning text-warning-content": color === "warning",
					"bg-error text-error-content": color === "error",
					"bg-neutral text-neutral-content": color === "neutral",
					"cursor-pointer": onClick,
				},
				className,
			)}
			onClick={!disabled ? onClick : undefined}
			{...other}
		>
			{startIcon}
			<span className={clsx("chip-label", slots?.label)}>{label}</span>
			{onDelete && (
				<CloseButton
					onClick={
						!disabled
							? (e) => {
									e.stopPropagation();
									onDelete();
								}
							: undefined
					}
					iconProps={{
						size: size === "normal" ? 16 : 12,
						stroke: size === "normal" ? 2 : 2.5,
					}}
					className={clsx({
						"w-[18px] h-[18px] min-h-[18px]": size === "normal",
						"w-4 h-4 min-h-4": size === "small",
					})}
				/>
			)}
		</div>
	);
});

Chip_.displayName = "@rtdui/Chip";

export const Chip = Object.assign(Chip_, { Group: ChipGroup });
