import { format as formatFn } from "date-fns";
import type { DatePickerType, DatePickerValue, Locale } from "../types";

interface DateFormatterInput {
	type: DatePickerType;
	date: DatePickerValue<DatePickerType>;
	locale?: Locale;
	format: string;
	labelSeparator: string;
}

export type DateFormatter = (input: DateFormatterInput) => string;

export function defaultDateFormatter({
	type,
	date,
	locale,
	format,
	labelSeparator,
}: DateFormatterInput) {
	const formatDate = (value: Date) => formatFn(value, format, { locale });

	if (type === "default") {
		return date === null ? "" : formatDate(date as Date);
	}

	if (type === "multiple") {
		return (date as Date[]).map(formatDate).join(", ");
	}

	if (type === "range" && Array.isArray(date)) {
		if (date[0] && date[1]) {
			return `${formatDate(date[0])} ${labelSeparator} ${formatDate(date[1])}`;
		}

		if (date[0]) {
			return `${formatDate(date[0])} ${labelSeparator} `;
		}

		return "";
	}

	return "";
}

interface GetFormattedDateInput extends DateFormatterInput {
	formatter?: DateFormatter;
}

export function getFormattedDate({
	formatter,
	...others
}: GetFormattedDateInput) {
	return (formatter || defaultDateFormatter)(others);
}
