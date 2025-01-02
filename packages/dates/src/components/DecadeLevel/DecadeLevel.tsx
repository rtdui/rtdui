import { forwardRef } from "react";
import { CalendarHeader, CalendarHeaderSettings } from "../CalendarHeader";
import { useDatesContext } from "../DatesProvider";
import { YearsList, YearsListSettings } from "../YearsList";
import { getDecadeRange } from "./get-decade-range/get-decade-range";
import { endOf, format, isAfter, isBefore, startOf } from "../../utils";

export interface DecadeLevelBaseSettings extends YearsListSettings {
	/** date-fns format string label format to display decade label or a function that returns decade label based on date value
	 * @default "yyyy"
	 */
	decadeLabelFormat?:
		| string
		| ((startOfDecade: Date, endOfDecade: Date) => React.ReactNode);
}

export interface DecadeLevelSettings
	extends DecadeLevelBaseSettings,
		Omit<CalendarHeaderSettings, "onLevelClick" | "hasNextLevel"> {}

export interface DecadeLevelProps
	extends DecadeLevelSettings,
		React.ComponentPropsWithoutRef<"div"> {
	/** Decade that is currently displayed */
	decade: Date;

	/** aria-label for change level control */
	levelControlAriaLabel?: string;
}

export const DecadeLevel = forwardRef<HTMLDivElement, DecadeLevelProps>(
	(props, ref) => {
		const {
			// YearsList settings
			decade,
			locale,
			minDate,
			maxDate,
			yearsListFormat,
			getYearControlProps,
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
			nextDisabled,
			previousDisabled,
			levelControlAriaLabel,
			withNext,
			withPrevious,

			// Other props
			decadeLabelFormat = "yyyy",
			__stopPropagation,
			size,
			...others
		} = props;

		const ctx = useDatesContext();
		const [startOfDecade, endOfDecade] = getDecadeRange(decade);

		const _nextDisabled =
			typeof nextDisabled === "boolean"
				? nextDisabled
				: maxDate
					? !isBefore(endOf(endOfDecade, "year"), maxDate)
					: false;

		const _previousDisabled =
			typeof previousDisabled === "boolean"
				? previousDisabled
				: minDate
					? !isAfter(startOf(startOfDecade, "year"), minDate)
					: false;

		const formatDecade = (date: Date, formatStr: string) =>
			format(date, formatStr, { locale: ctx.getLocale() });

		return (
			<div
				data-decade-level
				// size={size}
				ref={ref}
				{...others}
			>
				<CalendarHeader
					label={
						typeof decadeLabelFormat === "function"
							? decadeLabelFormat(startOfDecade, endOfDecade)
							: `${formatDecade(startOfDecade, decadeLabelFormat!)} - ${formatDecade(
									endOfDecade,
									decadeLabelFormat!,
								)}`
					}
					__preventFocus={__preventFocus}
					__stopPropagation={__stopPropagation}
					nextIcon={nextIcon}
					previousIcon={previousIcon}
					nextLabel={nextLabel}
					previousLabel={previousLabel}
					onNext={onNext}
					onPrevious={onPrevious}
					nextDisabled={_nextDisabled}
					previousDisabled={_previousDisabled}
					hasNextLevel={false}
					levelControlAriaLabel={levelControlAriaLabel}
					withNext={withNext}
					withPrevious={withPrevious}
				/>

				<YearsList
					decade={decade}
					locale={locale}
					minDate={minDate}
					maxDate={maxDate}
					yearsListFormat={yearsListFormat}
					getYearControlProps={getYearControlProps}
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

DecadeLevel.displayName = "@rtdui/dates/DecadeLevel";
