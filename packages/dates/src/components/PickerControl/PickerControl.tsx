import { forwardRef } from "react";
import { ThemeSize, getSize } from "@rtdui/core";
import clsx from "clsx";

export interface PickerControlProps
	extends React.ComponentPropsWithoutRef<"button"> {
	/** Control children */
	children?: React.ReactNode;

	/** Determines whether control should be disabled */
	disabled?: boolean;

	/** Determines whether control should have selected styles */
	selected?: boolean;

	/** Determines whether control is selected in range */
	inRange?: boolean;

	/** Determines whether control is first in range selection */
	firstInRange?: boolean;

	/** Determines whether control is last in range selection */
	lastInRange?: boolean;

	/** Component size */
	size?: ThemeSize;
}

export const PickerControl = forwardRef<HTMLButtonElement, PickerControlProps>(
	(props, ref) => {
		const {
			className,
			style,
			firstInRange,
			lastInRange,
			inRange,
			selected,
			disabled,
			size,
			...others
		} = props;

		return (
			<button
				className={clsx(
					"pickerControl",
					"btn no-animation font-normal min-h-0 h-[--dpc-size]",
					"[--dpc-size-xs:1.875rem]",
					"[--dpc-size-sm:2.25rem]",
					"[--dpc-size-md:2.625rem]",
					"[--dpc-size-lg:3rem]",
					"[--dpc-size-xl:3.375rem]",
					"[--dpc-size:var(--dpc-size-sm)]",
					{
						"btn-primary ": selected && !disabled,
						"btn-ghost": !selected,
					},
					className,
				)}
				style={{ ...style, "--dpc-size:": getSize(size, "dpc-size") } as any}
				ref={ref}
				data-picker-control
				data-selected={(selected && !disabled) || undefined}
				data-disabled={disabled || undefined}
				data-in-range={(inRange && !disabled && !selected) || undefined}
				data-first-in-range={(firstInRange && !disabled) || undefined}
				data-last-in-range={(lastInRange && !disabled) || undefined}
				disabled={disabled}
				{...others}
			/>
		);
	},
);

PickerControl.displayName = "@rtdui/dates/PickerControl";
