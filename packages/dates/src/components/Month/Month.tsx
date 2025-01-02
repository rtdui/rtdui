import { forwardRef } from "react";
import clsx from "clsx";
import { ThemeSize } from "@rtdui/core";
import { ControlKeydownPayload, DayOfWeek, Locale } from "../../types";
import { useDatesContext } from "../DatesProvider";
import { Day, DayProps } from "../Day";
import { WeekdaysRow } from "../WeekdaysRow";
import { getDateInTabOrder } from "./get-date-in-tab-order/get-date-in-tab-order";
import { format, getMonthDays, isSame, isAfter, isBefore } from "../../utils";

export interface MonthSettings {
	/** Determines whether propagation for Escape key should be stopped */
	__stopPropagation?: boolean;

	/** Prevents focus shift when buttons are clicked */
	__preventFocus?: boolean;

	/** Called when day is clicked with click event and date */
	__onDayClick?: (
		event: React.MouseEvent<HTMLButtonElement>,
		date: Date,
	) => void;

	/** Called when mouse enters day */
	__onDayMouseEnter?: (
		event: React.MouseEvent<HTMLButtonElement>,
		date: Date,
	) => void;

	/** Called when any keydown event is registered on day, used for arrows navigation */
	__onDayKeyDown?: (
		event: React.KeyboardEvent<HTMLButtonElement>,
		payload: ControlKeydownPayload,
	) => void;

	/** Assigns ref of every day based on its position in the table, used for arrows navigation */
	__getDayRef?: (
		rowIndex: number,
		cellIndex: number,
		node: HTMLButtonElement,
	) => void;

	/** date-fns locale, defaults to value defined in DatesProvider */
	locale?: Locale;

	/** number 0-6, 0 – Sunday, 6 – Saturday
	 * @default 1 (Monday)
	 */
	firstDayOfWeek?: DayOfWeek;

	/** date-fns format for weekdays names, defaults to "dd" */
	weekdayFormat?: string | ((date: Date) => React.ReactNode);

	/** Indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday, defaults to value defined in DatesProvider */
	weekendDays?: DayOfWeek[];

	/** Adds props to Day component based on date */
	getDayProps?: (
		date: Date,
	) => Omit<Partial<DayProps>, "classNames" | "styles" | "vars">;

	/** Callback function to determine whether the day should be disabled */
	excludeDate?: (date: Date) => boolean;

	/** Minimum possible date */
	minDate?: Date;

	/** Maximum possible date */
	maxDate?: Date;

	/** Controls day value rendering */
	renderDay?: (date: Date) => React.ReactNode;

	/** Determines whether outside dates should be hidden, defaults to false */
	hideOutsideDates?: boolean;

	/** Determines whether weekdays row should be hidden, defaults to false */
	hideWeekdays?: boolean;

	/** Assigns aria-label to days based on date */
	getDayAriaLabel?: (date: Date) => string;

	/** Controls size */
	size?: ThemeSize;

	/** Determines whether controls should be separated by spacing, true by default */
	withCellSpacing?: boolean;
}

export interface MonthProps
	extends MonthSettings,
		React.ComponentPropsWithoutRef<"table"> {
	/** Month to display */
	month: Date;

	/** Determines whether days should be static, static days can be used to display month if it is not expected that user will interact with the component in any way  */
	static?: boolean;
}

export const Month = forwardRef<HTMLTableElement, MonthProps>((props, ref) => {
	const {
		className,
		style,
		locale,
		firstDayOfWeek,
		weekdayFormat,
		month,
		weekendDays,
		getDayProps,
		excludeDate,
		minDate,
		maxDate,
		renderDay,
		hideOutsideDates,
		hideWeekdays,
		getDayAriaLabel,
		static: isStatic,
		__getDayRef,
		__onDayKeyDown,
		__onDayClick,
		__onDayMouseEnter,
		__preventFocus,
		__stopPropagation,
		withCellSpacing = true,
		size,
		...others
	} = props;

	const ctx = useDatesContext();
	const dates = getMonthDays({
		month,
		firstDayOfWeek: ctx.getFirstDayOfWeek(firstDayOfWeek),
		consistentWeeks: ctx.consistentWeeks,
	});

	const dateInTabOrder = getDateInTabOrder(
		dates,
		minDate,
		maxDate,
		getDayProps,
		excludeDate,
		hideOutsideDates,
		month,
	);

	const rows = dates.map((row, rowIndex) => {
		const cells = row.map((date, cellIndex) => {
			const outside = !isSame(date, month, "month");
			const ariaLabel =
				getDayAriaLabel?.(date) ||
				format(date, "d MMMM yyyy", { locale: locale || ctx.getLocale() });
			const dayProps = getDayProps?.(date);
			const isDateInTabOrder = isSame(date, dateInTabOrder, "day");

			return (
				<td
					key={date.toString()}
					className={clsx("monthCell", {
						"pointer-events-none": isStatic,
					})}
					data-with-spacing={withCellSpacing || undefined}
				>
					<Day
						data-rtdui-stop-propagation={__stopPropagation || undefined}
						renderDay={renderDay}
						date={date}
						// size={size}
						weekend={ctx
							.getWeekendDays(weekendDays)
							.includes(date.getDay() as DayOfWeek)}
						outside={outside}
						hidden={hideOutsideDates ? outside : false}
						aria-label={ariaLabel}
						static={isStatic}
						disabled={
							excludeDate?.(date) ||
							!isBefore(date, maxDate) ||
							!isAfter(date, minDate)
						}
						ref={(node) => __getDayRef?.(rowIndex, cellIndex, node!)}
						{...dayProps}
						onKeyDown={(event) => {
							dayProps?.onKeyDown?.(event);
							__onDayKeyDown?.(event, { rowIndex, cellIndex, date });
						}}
						onMouseEnter={(event) => {
							dayProps?.onMouseEnter?.(event);
							__onDayMouseEnter?.(event, date);
						}}
						onClick={(event) => {
							dayProps?.onClick?.(event);

							__onDayClick?.(event, date);
						}}
						onMouseDown={(event) => {
							dayProps?.onMouseDown?.(event);
							__preventFocus && event.preventDefault();
						}}
						tabIndex={__preventFocus || !isDateInTabOrder ? -1 : 0}
					/>
				</td>
			);
		});

		return (
			<tr key={rowIndex} className={clsx("monthTRow")}>
				{cells}
			</tr>
		);
	});

	return (
		<table
			className={clsx("month", className)}
			// size={size}
			ref={ref}
			{...others}
		>
			{!hideWeekdays && (
				<thead className={clsx("monthThead")}>
					<WeekdaysRow
						locale={locale}
						firstDayOfWeek={firstDayOfWeek}
						weekdayFormat={weekdayFormat}
						size={size}
					/>
				</thead>
			)}
			<tbody className={clsx("monthTbody")}>{rows}</tbody>
		</table>
	);
});

Month.displayName = "@rtdui/dates/Month";
