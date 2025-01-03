import { forwardRef } from "react";
import { CalendarHeader, type CalendarHeaderSettings } from "../CalendarHeader";
import { useDatesContext } from "../DatesProvider";
import { MonthsList, type MonthsListSettings } from "../MonthsList";
import { endOf, format, isAfter, isBefore, startOf } from "../../utils";

export interface YearLevelBaseSettings extends MonthsListSettings {
	/** date-fns format string label format to display year label or a function that returns year label based on year value
	 * @default "yyyy"
	 */
	yearLabelFormat?: string | ((year: Date) => React.ReactNode);
}

export interface YearLevelSettings
	extends YearLevelBaseSettings,
		CalendarHeaderSettings {}

export interface YearLevelProps
	extends YearLevelSettings,
		React.ComponentPropsWithoutRef<"div"> {
	/** Year that is currently displayed */
	year: Date;

	/** aria-label for change level control */
	levelControlAriaLabel?: string;
}

export const YearLevel = forwardRef<HTMLDivElement, YearLevelProps>(
	(props, ref) => {
		const {
			// MonthsList settings
			year,
			locale,
			minDate,
			maxDate,
			monthsListFormat,
			getMonthControlProps,
			__getControlRef,
			__onControlKeyDown,
			__onControlClick,
			__onControlMouseEnter,
			withCellSpacing,

			// CalendarHeader settings
			__preventFocus,
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
			yearLabelFormat = "yyyy",
			__stopPropagation,
			size,
			...others
		} = props;

		const ctx = useDatesContext();

		const _nextDisabled =
			typeof nextDisabled === "boolean"
				? nextDisabled
				: maxDate
					? !isBefore(endOf(year, "year"), maxDate)
					: false;

		const _previousDisabled =
			typeof previousDisabled === "boolean"
				? previousDisabled
				: minDate
					? !isAfter(startOf(year, "year"), minDate)
					: false;

		return (
			<div
				data-year-level
				// size={size}
				ref={ref}
				{...others}
			>
				<CalendarHeader
					label={
						typeof yearLabelFormat === "function"
							? yearLabelFormat(year)
							: format(year, yearLabelFormat, {
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

				<MonthsList
					year={year}
					locale={locale}
					minDate={minDate}
					maxDate={maxDate}
					monthsListFormat={monthsListFormat}
					getMonthControlProps={getMonthControlProps}
					__getControlRef={__getControlRef}
					__onControlKeyDown={__onControlKeyDown}
					__onControlClick={__onControlClick}
					__onControlMouseEnter={__onControlMouseEnter}
					__preventFocus={__preventFocus}
					__stopPropagation={__stopPropagation}
					withCellSpacing={withCellSpacing}
				/>
			</div>
		);
	},
);

YearLevel.displayName = "@rtdui/dates/YearLevel";
