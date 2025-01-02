import { forwardRef, useRef } from "react";
import { add, handleControlKeyDown } from "../../utils";
import { LevelsGroup } from "../LevelsGroup";
import { YearLevel, YearLevelSettings } from "../YearLevel";

export interface YearLevelGroupProps
	extends Omit<
			YearLevelSettings,
			"withPrevious" | "withNext" | "__onControlKeyDown" | "__getControlRef"
		>,
		React.ComponentPropsWithoutRef<"div"> {
	/** Number of columns to render next to each other */
	numberOfColumns?: number;

	/** Year that is currently displayed */
	year: Date;

	/** Function that returns level control aria-label based on year date */
	levelControlAriaLabel?: ((year: Date) => string) | string;
}

export const YearLevelGroup = forwardRef<HTMLDivElement, YearLevelGroupProps>(
	(props, ref) => {
		const {
			// YearLevel settings
			year,
			locale,
			minDate,
			maxDate,
			monthsListFormat,
			getMonthControlProps,
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

			// Other settings
			__stopPropagation,
			numberOfColumns = 1,
			levelControlAriaLabel,
			yearLabelFormat,
			size,
			...others
		} = props;

		const controlsRef = useRef<HTMLButtonElement[][][]>([]);

		const years = Array(numberOfColumns)
			.fill(0)
			.map((_, yearIndex) => {
				const currentYear = add(year, yearIndex, "year");

				return (
					<YearLevel
						key={yearIndex}
						size={size}
						monthsListFormat={monthsListFormat}
						year={currentYear}
						withNext={yearIndex === numberOfColumns! - 1}
						withPrevious={yearIndex === 0}
						yearLabelFormat={yearLabelFormat}
						__stopPropagation={__stopPropagation}
						__onControlClick={__onControlClick}
						__onControlMouseEnter={__onControlMouseEnter}
						__onControlKeyDown={(event, payload) =>
							handleControlKeyDown({
								levelIndex: yearIndex,
								rowIndex: payload.rowIndex,
								cellIndex: payload.cellIndex,
								event,
								controlsRef,
							})
						}
						__getControlRef={(rowIndex, cellIndex, node) => {
							if (!Array.isArray(controlsRef.current[yearIndex])) {
								controlsRef.current[yearIndex] = [];
							}

							if (!Array.isArray(controlsRef.current[yearIndex][rowIndex])) {
								controlsRef.current[yearIndex][rowIndex] = [];
							}

							controlsRef.current[yearIndex][rowIndex][cellIndex] = node;
						}}
						levelControlAriaLabel={
							typeof levelControlAriaLabel === "function"
								? levelControlAriaLabel(currentYear)
								: levelControlAriaLabel
						}
						locale={locale}
						minDate={minDate}
						maxDate={maxDate}
						__preventFocus={__preventFocus}
						nextIcon={nextIcon}
						previousIcon={previousIcon}
						nextLabel={nextLabel}
						previousLabel={previousLabel}
						onNext={onNext}
						onPrevious={onPrevious}
						onLevelClick={onLevelClick}
						nextDisabled={nextDisabled}
						previousDisabled={previousDisabled}
						hasNextLevel={hasNextLevel}
						getMonthControlProps={getMonthControlProps}
						withCellSpacing={withCellSpacing}
					/>
				);
			});

		return (
			<LevelsGroup ref={ref} size={size} {...others}>
				{years}
			</LevelsGroup>
		);
	},
);

YearLevelGroup.displayName = "@rtdui/dates/YearLevelGroup";
