import { isAfter, isBefore } from "../../../utils";

interface IsDateValid {
	date: Date;
	maxDate: Date | null | undefined;
	minDate: Date | null | undefined;
}

export function isDateValid({ date, maxDate, minDate }: IsDateValid) {
	if (date == null) {
		return false;
	}

	if (Number.isNaN(date.getTime())) {
		return false;
	}

	if (maxDate && isAfter(date, maxDate, "day")) {
		return false;
	}

	if (minDate && isBefore(date, minDate, "day")) {
		return false;
	}

	return true;
}
