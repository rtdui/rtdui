import { forwardRef } from "react";
import clsx from "clsx";
import { Box, Button, type ThemeSize, getSize } from "@rtdui/core";
import { isSame, shiftTimezone } from "../../utils";
import { useDatesContext } from "../DatesProvider";

export interface DayProps extends React.ComponentPropsWithoutRef<"button"> {
	/** Determines which element should be used as root, `'button'` by default, `'div'` if static prop is set */
	static?: boolean;

	/** Date that should be displayed */
	date: Date;

	/** Determines whether the day should be considered to be a weekend, `false` by default */
	weekend?: boolean;

	/** Determines whether the day is outside of the current month, `false` by default */
	outside?: boolean;

	/** Determines whether the day is selected, `false` by default */
	selected?: boolean;

	/** Determines whether the day should not de displayed, `false` by default */
	hidden?: boolean;

	/** Determines whether the day is selected in range, `false` by default */
	inRange?: boolean;

	/** Determines whether the day is first in range selection, `false` by default */
	firstInRange?: boolean;

	/** Determines whether the day is last in range selection, `false` by default */
	lastInRange?: boolean;

	/** Controls day value rendering */
	renderDay?: (date: Date) => React.ReactNode;
	size?: ThemeSize;
}

export const Day = forwardRef<HTMLButtonElement, DayProps>((props, ref) => {
	const {
		className,
		style,
		date,
		disabled,
		weekend,
		outside,
		selected,
		renderDay,
		inRange,
		firstInRange,
		lastInRange,
		hidden,
		static: isStatic,
		size,
		...others
	} = props;

	const ctx = useDatesContext();

	return (
		<Box<any>
			as={isStatic ? "div" : "button"}
			className={clsx(
				"day",
				"btn btn-square no-animation min-h-0 w-[--dpc-size] h-[--dpc-size] font-normal",
				"[--dpc-size-xs:1.875rem]",
				"[--dpc-size-sm:2.25rem]",
				"[--dpc-size-md:2.625rem]",
				"[--dpc-size-lg:3rem]",
				"[--dpc-size-xl:3.375rem]",
				"[--dpc-size:var(--dpc-size-sm)]",
				{
					hidden: hidden,
					"text-gray-400": outside,
					"btn-primary ": selected && !disabled,
					"btn-ghost": !selected,
					"text-error": !disabled && !outside && weekend,
				},
				className,
			)}
			style={{
				...style,
				"--dpc-size": getSize(size, "dpc-size"),
			}}
			ref={ref}
			disabled={disabled}
			data-today={
				isSame(
					date,
					shiftTimezone("add", new Date(), ctx.getTimezone()),
					"day",
				) || undefined
			}
			data-hidden={hidden || undefined}
			data-disabled={disabled || undefined}
			data-weekend={(!disabled && !outside && weekend) || undefined}
			data-outside={(!disabled && outside) || undefined}
			data-selected={(!disabled && selected) || undefined}
			data-in-range={(inRange && !disabled) || undefined}
			data-first-in-range={(firstInRange && !disabled) || undefined}
			data-last-in-range={(lastInRange && !disabled) || undefined}
			data-static={isStatic || undefined}
			{...others}
		>
			{renderDay?.(date) || date.getDate()}
		</Box>
	);
});

Day.displayName = "@rtdui/dates/Day";
