import { forwardRef, useRef } from "react";
import { add, handleControlKeyDown } from "../../utils";
import { DecadeLevel, DecadeLevelSettings } from "../DecadeLevel";
import { LevelsGroup } from "../LevelsGroup";

export interface DecadeLevelGroupProps
	extends Omit<
			DecadeLevelSettings,
			"withPrevious" | "withNext" | "__onControlKeyDown" | "__getControlRef"
		>,
		React.ComponentPropsWithoutRef<"div"> {
	/** Number of columns to render next to each other */
	numberOfColumns?: number;

	/** Decade that is currently displayed */
	decade: Date;

	/** Function that returns level control aria-label based on year date */
	levelControlAriaLabel?: ((decade: Date) => string) | string;
}

export const DecadeLevelGroup = forwardRef<
	HTMLDivElement,
	DecadeLevelGroupProps
>((props, ref) => {
	const {
		// DecadeLevel settings
		decade,
		locale,
		minDate,
		maxDate,
		yearsListFormat,
		getYearControlProps,
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

		// Other settings
		__stopPropagation,
		numberOfColumns = 1,
		levelControlAriaLabel,
		decadeLabelFormat,
		size,
		...others
	} = props;

	const controlsRef = useRef<HTMLButtonElement[][][]>([]);

	const decades = Array(numberOfColumns)
		.fill(0)
		.map((_, decadeIndex) => {
			const currentDecade = add(decade, decadeIndex * 10, "year");
			return (
				<DecadeLevel
					key={decadeIndex}
					size={size}
					yearsListFormat={yearsListFormat}
					decade={currentDecade}
					withNext={decadeIndex === numberOfColumns! - 1}
					withPrevious={decadeIndex === 0}
					decadeLabelFormat={decadeLabelFormat}
					__onControlClick={__onControlClick}
					__onControlMouseEnter={__onControlMouseEnter}
					__onControlKeyDown={(event, payload) =>
						handleControlKeyDown({
							levelIndex: decadeIndex,
							rowIndex: payload.rowIndex,
							cellIndex: payload.cellIndex,
							event,
							controlsRef,
						})
					}
					__getControlRef={(rowIndex, cellIndex, node) => {
						if (!Array.isArray(controlsRef.current[decadeIndex])) {
							controlsRef.current[decadeIndex] = [];
						}

						if (!Array.isArray(controlsRef.current[decadeIndex][rowIndex])) {
							controlsRef.current[decadeIndex][rowIndex] = [];
						}

						controlsRef.current[decadeIndex][rowIndex][cellIndex] = node;
					}}
					levelControlAriaLabel={
						typeof levelControlAriaLabel === "function"
							? levelControlAriaLabel(currentDecade)
							: levelControlAriaLabel
					}
					locale={locale}
					minDate={minDate}
					maxDate={maxDate}
					__preventFocus={__preventFocus}
					__stopPropagation={__stopPropagation}
					nextIcon={nextIcon}
					previousIcon={previousIcon}
					nextLabel={nextLabel}
					previousLabel={previousLabel}
					onNext={onNext}
					onPrevious={onPrevious}
					nextDisabled={nextDisabled}
					previousDisabled={previousDisabled}
					getYearControlProps={getYearControlProps}
					withCellSpacing={withCellSpacing}
				/>
			);
		});

	return (
		<LevelsGroup ref={ref} size={size} {...others}>
			{decades}
		</LevelsGroup>
	);
});

DecadeLevelGroup.displayName = "@rtdui/dates/DecadeLevelGroup";
