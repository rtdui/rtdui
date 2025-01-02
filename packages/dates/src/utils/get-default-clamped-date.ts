import { clamp, isAfter, isBefore } from "date-fns";
import { shiftTimezone } from "./shift-timezone";

interface GetDefaultClampedDate {
	minDate: Date | undefined;
	maxDate: Date | undefined;
	timezone?: string;
}

export function getDefaultClampedDate({
	minDate,
	maxDate,
	timezone,
}: GetDefaultClampedDate) {
	const today = shiftTimezone("add", new Date(), timezone);

	if (!minDate && !maxDate) {
		return today;
	}

	if (minDate && maxDate) {
		return clamp(today, { start: minDate, end: maxDate });
	}

	if (minDate && isBefore(today, minDate)) {
		return minDate;
	}

	if (maxDate && isAfter(today, maxDate)) {
		return maxDate;
	}

	return today;
}
