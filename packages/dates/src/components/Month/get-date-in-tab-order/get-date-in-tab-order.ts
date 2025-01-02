import { DayProps } from "../../Day/Day";
import { isAfter, isBefore, isSame } from "../../../utils";

export function getDateInTabOrder(
	dates: Date[][],
	minDate: Date | undefined,
	maxDate: Date | undefined,
	getDateControlProps: ((date: Date) => Partial<DayProps>) | undefined,
	excludeDate: ((date: Date) => boolean) | undefined,
	hideOutsideDates: boolean | undefined,
	month: Date,
) {
	const enabledDates = dates
		.flat()
		.filter(
			(date) =>
				isBefore(date, maxDate) &&
				isAfter(date, minDate) &&
				!excludeDate?.(date) &&
				!getDateControlProps?.(date)?.disabled &&
				(!hideOutsideDates || isSame(date, month, "month")),
		);

	const selectedDate = enabledDates.find(
		(date) => getDateControlProps?.(date)?.selected,
	);

	if (selectedDate) {
		return selectedDate;
	}

	const currentDate = enabledDates.find((date) =>
		isSame(date, new Date(), "day"),
	);

	if (currentDate) {
		return currentDate;
	}

	return enabledDates[0];
}
