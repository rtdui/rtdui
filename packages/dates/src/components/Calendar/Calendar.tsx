import { forwardRef } from "react";
import { useUncontrolled } from "@rtdui/hooks";
import { useUncontrolledDates } from "../../hooks";
import { CalendarLevel } from "../../types";
import { add, shiftTimezone, sub } from "../../utils";
import { useDatesContext } from "../DatesProvider";
import { DecadeLevelSettings } from "../DecadeLevel";
import { DecadeLevelGroup } from "../DecadeLevelGroup";
import { MonthLevelSettings } from "../MonthLevel";
import { MonthLevelGroup } from "../MonthLevelGroup";
import { YearLevelSettings } from "../YearLevel";
import { YearLevelGroup } from "../YearLevelGroup";
import { clampLevel } from "./clamp-level/clamp-level";

export interface CalendarAriaLabels {
	monthLevelControl?: string;
	yearLevelControl?: string;

	nextMonth?: string;
	previousMonth?: string;

	nextYear?: string;
	previousYear?: string;

	nextDecade?: string;
	previousDecade?: string;
}

type OmittedSettings =
	| "onNext"
	| "onPrevious"
	| "onLevelClick"
	| "withNext"
	| "withPrevious"
	| "nextDisabled"
	| "previousDisabled";

export interface CalendarSettings
	extends Omit<DecadeLevelSettings, OmittedSettings>,
		Omit<YearLevelSettings, OmittedSettings>,
		Omit<MonthLevelSettings, OmittedSettings> {
	/** Initial level displayed to the user (decade, year, month), used for uncontrolled component */
	defaultLevel?: CalendarLevel;

	/** Current level displayed to the user (decade, year, month), used for controlled component */
	level?: CalendarLevel;

	/** Called when level changes */
	onLevelChange?: (level: CalendarLevel) => void;

	/** Called when user clicks year on decade level */
	onYearSelect?: (date: Date) => void;

	/** Called when user clicks month on year level */
	onMonthSelect?: (date: Date) => void;

	/** Called when mouse enters year control */
	onYearMouseEnter?: (
		event: React.MouseEvent<HTMLButtonElement>,
		date: Date,
	) => void;

	/** Called when mouse enters month control */
	onMonthMouseEnter?: (
		event: React.MouseEvent<HTMLButtonElement>,
		date: Date,
	) => void;
}

export interface CalendarBaseProps {
	/** Internal Variable to check if timezones were applied by parent component */
	__timezoneApplied?: boolean;

	/** Prevents focus shift when buttons are clicked */
	__preventFocus?: boolean;

	/** Determines whether date should be updated when year control is clicked */
	__updateDateOnYearSelect?: boolean;

	/** Determines whether date should be updated when month control is clicked */
	__updateDateOnMonthSelect?: boolean;

	/** Initial date that is displayed, used for uncontrolled component */
	defaultDate?: Date;

	/** Date that is displayed, used for controlled component */
	date?: Date;

	/** Called when date changes */
	onDateChange?: (date: Date) => void;

	/** Number of columns to render next to each other */
	numberOfColumns?: number;

	/** Number of columns to scroll when user clicks next/prev buttons, defaults to numberOfColumns */
	columnsToScroll?: number;

	/** aria-label attributes for controls on different levels */
	ariaLabels?: CalendarAriaLabels;

	/** Called when next decade button is clicked */
	onNextDecade?: (date: Date) => void;

	/** Called when previous decade button is clicked */
	onPreviousDecade?: (date: Date) => void;

	/** Called when next year button is clicked */
	onNextYear?: (date: Date) => void;

	/** Called when previous year button is clicked */
	onPreviousYear?: (date: Date) => void;

	/** Called when next month button is clicked */
	onNextMonth?: (date: Date) => void;

	/** Called when previous month button is clicked */
	onPreviousMonth?: (date: Date) => void;
}

export interface CalendarProps
	extends CalendarSettings,
		CalendarBaseProps,
		React.ComponentPropsWithoutRef<"div"> {
	/** Max level that user can go up to (decade, year, month), defaults to decade */
	maxLevel?: CalendarLevel;

	/** Min level that user can go down to (decade, year, month), defaults to month */
	minLevel?: CalendarLevel;

	/** Determines whether days should be static, static days can be used to display month if it is not expected that user will interact with the component in any way  */
	static?: boolean;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
	(props, ref) => {
		const {
			maxLevel = "decade",
			minLevel = "month",
			defaultLevel,
			level,
			onLevelChange,
			date,
			defaultDate,
			onDateChange,
			numberOfColumns,
			columnsToScroll,
			ariaLabels,
			onYearSelect,
			onMonthSelect,
			onYearMouseEnter,
			onMonthMouseEnter,
			__updateDateOnYearSelect = true,
			__updateDateOnMonthSelect = true,

			// MonthLevelGroup props
			firstDayOfWeek,
			weekdayFormat,
			weekendDays,
			getDayProps,
			excludeDate,
			renderDay,
			hideOutsideDates,
			hideWeekdays,
			getDayAriaLabel,
			monthLabelFormat,
			nextIcon,
			previousIcon,
			__onDayClick,
			__onDayMouseEnter,
			withCellSpacing,

			// YearLevelGroup props
			monthsListFormat,
			getMonthControlProps,
			yearLabelFormat,

			// DecadeLevelGroup props
			yearsListFormat,
			getYearControlProps,
			decadeLabelFormat,

			// Other props
			minDate,
			maxDate,
			locale,
			size,
			__preventFocus,
			__stopPropagation,
			onNextDecade,
			onPreviousDecade,
			onNextYear,
			onPreviousYear,
			onNextMonth,
			onPreviousMonth,
			static: isStatic,
			__timezoneApplied,
			...others
		} = props;

		const [_level, setLevel] = useUncontrolled({
			value: level ? clampLevel(level, minLevel, maxLevel) : undefined,
			defaultValue: defaultLevel
				? clampLevel(defaultLevel, minLevel, maxLevel)
				: undefined,
			finalValue: clampLevel(undefined, minLevel, maxLevel),
			onChange: onLevelChange,
		});

		const [_date, setDate] = useUncontrolledDates({
			type: "default",
			value: date,
			defaultValue: defaultDate,
			onChange: onDateChange as any,
			applyTimezone: !__timezoneApplied,
		});

		const ctx = useDatesContext();

		const _columnsToScroll = columnsToScroll || numberOfColumns || 1;
		const currentDate =
			_date || shiftTimezone("add", new Date(), ctx.getTimezone());

		const handleNextMonth = () => {
			const nextDate = add(currentDate, _columnsToScroll, "month");
			onNextMonth?.(nextDate);
			setDate(nextDate);
		};

		const handlePreviousMonth = () => {
			const nextDate = sub(currentDate, _columnsToScroll, "month");
			onPreviousMonth?.(nextDate);
			setDate(nextDate);
		};

		const handleNextYear = () => {
			const nextDate = add(currentDate, _columnsToScroll, "year");
			onNextYear?.(nextDate);
			setDate(nextDate);
		};

		const handlePreviousYear = () => {
			const nextDate = sub(currentDate, _columnsToScroll, "year");
			onPreviousYear?.(nextDate);
			setDate(nextDate);
		};

		const handleNextDecade = () => {
			const nextDate = add(currentDate, 10 * _columnsToScroll, "year");
			onNextDecade?.(nextDate);
			setDate(nextDate);
		};

		const handlePreviousDecade = () => {
			const nextDate = sub(currentDate, 10 * _columnsToScroll, "year");
			onPreviousDecade?.(nextDate);
			setDate(nextDate);
		};

		return (
			<div
				ref={ref}
				// size={size}
				data-calendar
				{...others}
			>
				{_level === "month" && (
					<MonthLevelGroup
						month={currentDate}
						minDate={minDate}
						maxDate={maxDate}
						firstDayOfWeek={firstDayOfWeek}
						weekdayFormat={weekdayFormat}
						weekendDays={weekendDays}
						getDayProps={getDayProps}
						excludeDate={excludeDate}
						renderDay={renderDay}
						hideOutsideDates={hideOutsideDates}
						hideWeekdays={hideWeekdays}
						getDayAriaLabel={getDayAriaLabel}
						onNext={handleNextMonth}
						onPrevious={handlePreviousMonth}
						hasNextLevel={maxLevel !== "month"}
						onLevelClick={() => setLevel("year")}
						numberOfColumns={numberOfColumns}
						locale={locale}
						levelControlAriaLabel={ariaLabels?.monthLevelControl}
						nextLabel={ariaLabels?.nextMonth}
						nextIcon={nextIcon}
						previousLabel={ariaLabels?.previousMonth}
						previousIcon={previousIcon}
						monthLabelFormat={monthLabelFormat}
						__onDayClick={__onDayClick}
						__onDayMouseEnter={__onDayMouseEnter}
						__preventFocus={__preventFocus}
						__stopPropagation={__stopPropagation}
						static={isStatic}
						withCellSpacing={withCellSpacing}
					/>
				)}

				{_level === "year" && (
					<YearLevelGroup
						year={currentDate}
						numberOfColumns={numberOfColumns}
						minDate={minDate}
						maxDate={maxDate}
						monthsListFormat={monthsListFormat}
						getMonthControlProps={getMonthControlProps}
						locale={locale}
						onNext={handleNextYear}
						onPrevious={handlePreviousYear}
						hasNextLevel={maxLevel !== "month" && maxLevel !== "year"}
						onLevelClick={() => setLevel("decade")}
						levelControlAriaLabel={ariaLabels?.yearLevelControl}
						nextLabel={ariaLabels?.nextYear}
						nextIcon={nextIcon}
						previousLabel={ariaLabels?.previousYear}
						previousIcon={previousIcon}
						yearLabelFormat={yearLabelFormat}
						__onControlMouseEnter={onMonthMouseEnter}
						__onControlClick={(_event, payload) => {
							__updateDateOnMonthSelect && setDate(payload);
							setLevel(clampLevel("month", minLevel, maxLevel));
							onMonthSelect?.(payload);
						}}
						__preventFocus={__preventFocus}
						__stopPropagation={__stopPropagation}
						withCellSpacing={withCellSpacing}
					/>
				)}

				{_level === "decade" && (
					<DecadeLevelGroup
						decade={currentDate}
						minDate={minDate}
						maxDate={maxDate}
						yearsListFormat={yearsListFormat}
						getYearControlProps={getYearControlProps}
						locale={locale}
						onNext={handleNextDecade}
						onPrevious={handlePreviousDecade}
						numberOfColumns={numberOfColumns}
						nextLabel={ariaLabels?.nextDecade}
						nextIcon={nextIcon}
						previousLabel={ariaLabels?.previousDecade}
						previousIcon={previousIcon}
						decadeLabelFormat={decadeLabelFormat}
						__onControlMouseEnter={onYearMouseEnter}
						__onControlClick={(_event, payload) => {
							__updateDateOnYearSelect && setDate(payload);
							setLevel(clampLevel("year", minLevel, maxLevel));
							onYearSelect?.(payload);
						}}
						__preventFocus={__preventFocus}
						__stopPropagation={__stopPropagation}
						withCellSpacing={withCellSpacing}
					/>
				)}
			</div>
		);
	},
);

Calendar.displayName = "@rtdui/dates/Calendar";
