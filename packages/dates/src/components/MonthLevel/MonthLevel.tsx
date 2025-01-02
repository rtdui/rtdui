import { forwardRef } from "react";
import { CalendarHeader, CalendarHeaderSettings } from "../CalendarHeader";
import { useDatesContext } from "../DatesProvider";
import { Month, MonthSettings } from "../Month";
import { endOf, format, isAfter, isBefore, startOf } from "../../utils";

export interface MonthLevelBaseSettings extends MonthSettings {
	/** date-fns format string label format to display month label or a function that returns month label based on month value
	 * @default "MMMM yyyy"
	 */
	monthLabelFormat?: string | ((month: Date) => React.ReactNode);
}

export interface MonthLevelSettings
	extends MonthLevelBaseSettings,
		CalendarHeaderSettings {}

export interface MonthLevelProps
	extends MonthLevelSettings,
		React.ComponentPropsWithoutRef<"div"> {
	/** Month that is currently displayed */
	month: Date;

	/** aria-label for change level control */
	levelControlAriaLabel?: string;

	/** Determines whether days should be static, static days can be used to display month if it is not expected that user will interact with the component in any way  */
	static?: boolean;
}

export const MonthLevel = forwardRef<HTMLDivElement, MonthLevelProps>(
	(props, ref) => {
		const {
			// Month settings
			month,
			locale,
			firstDayOfWeek,
			weekdayFormat,
			weekendDays,
			getDayProps,
			excludeDate,
			minDate,
			maxDate,
			renderDay,
			hideOutsideDates,
			hideWeekdays,
			getDayAriaLabel,
			__getDayRef,
			__onDayKeyDown,
			__onDayClick,
			__onDayMouseEnter,
			withCellSpacing,

			// CalendarHeader settings
			__preventFocus,
			__stopPropagation,
			nextIcon,
			previousIcon,
			nextLabel,
			previousLabel,
			onNext,
			onPrevious,
			onLevelClick,
			nextDisabled,
			previousDisabled,
			hasNextLevel,
			levelControlAriaLabel,
			withNext,
			withPrevious,

			// Other props
			monthLabelFormat = "MMMM yyyy",
			size,
			static: isStatic,
			...others
		} = props;

		const ctx = useDatesContext();

		const _nextDisabled =
			typeof nextDisabled === "boolean"
				? nextDisabled
				: maxDate
					? !isBefore(endOf(month, "month"), maxDate)
					: false;

		const _previousDisabled =
			typeof previousDisabled === "boolean"
				? previousDisabled
				: minDate
					? !isAfter(startOf(month, "month"), minDate)
					: false;

		return (
			<div
				data-month-level
				// size={size}
				ref={ref}
				{...others}
			>
				<CalendarHeader
					label={
						typeof monthLabelFormat === "function"
							? monthLabelFormat(month)
							: format(month, monthLabelFormat, {
									locale: locale || ctx.getLocale(),
								})
					}
					__preventFocus={__preventFocus}
					__stopPropagation={__stopPropagation}
					nextIcon={nextIcon}
					previousIcon={previousIcon}
					nextLabel={nextLabel}
					previousLabel={previousLabel}
					onNext={onNext}
					onPrevious={onPrevious}
					onLevelClick={onLevelClick}
					nextDisabled={_nextDisabled}
					previousDisabled={_previousDisabled}
					hasNextLevel={hasNextLevel}
					levelControlAriaLabel={levelControlAriaLabel}
					withNext={withNext}
					withPrevious={withPrevious}
				/>

				<Month
					month={month}
					locale={locale}
					firstDayOfWeek={firstDayOfWeek}
					weekdayFormat={weekdayFormat}
					weekendDays={weekendDays}
					getDayProps={getDayProps}
					excludeDate={excludeDate}
					minDate={minDate}
					maxDate={maxDate}
					renderDay={renderDay}
					hideOutsideDates={hideOutsideDates}
					hideWeekdays={hideWeekdays}
					getDayAriaLabel={getDayAriaLabel}
					__getDayRef={__getDayRef}
					__onDayKeyDown={__onDayKeyDown}
					__onDayClick={__onDayClick}
					__onDayMouseEnter={__onDayMouseEnter}
					__preventFocus={__preventFocus}
					__stopPropagation={__stopPropagation}
					static={isStatic}
					withCellSpacing={withCellSpacing}
				/>
			</div>
		);
	},
);
MonthLevel.displayName = "@rtdui/dates/MonthLevel";
