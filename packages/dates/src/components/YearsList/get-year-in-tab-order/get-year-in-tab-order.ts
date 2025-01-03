import type { PickerControlProps } from "../../PickerControl";
import { isYearDisabled } from "../is-year-disabled/is-year-disabled";
import { isSame } from "../../../utils";

export function getYearInTabOrder(
	years: Date[][],
	minDate: Date | undefined,
	maxDate: Date | undefined,
	getYearControlProps:
		| ((year: Date) => Partial<PickerControlProps>)
		| undefined,
) {
	const enabledYears = years
		.flat()
		.filter(
			(year) =>
				!isYearDisabled(year, minDate, maxDate) &&
				!getYearControlProps?.(year)?.disabled,
		);

	const selectedYear = enabledYears.find(
		(year) => getYearControlProps?.(year)?.selected,
	);

	if (selectedYear) {
		return selectedYear;
	}

	const currentYear = enabledYears.find((year) =>
		isSame(year, new Date(), "year"),
	);

	if (currentYear) {
		return currentYear;
	}

	return enabledYears[0];
}
