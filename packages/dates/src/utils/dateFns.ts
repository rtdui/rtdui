import {
	format as formatFn,
	type FormatOptions,
	parse,
	type ParseOptions,
	isBefore as isBeforeFn,
	isAfter as isAfterFn,
	isWithinInterval,
	isSameDay,
	isSameMonth,
	isSameYear,
	addYears,
	addMonths,
	addDays,
	subYears,
	subMonths,
	subDays,
	endOfYear,
	endOfMonth,
	endOfDay,
	startOfYear,
	startOfMonth,
	startOfDay,
	isSameWeek,
	endOfWeek,
	startOfWeek,
	type DateValues,
	set as setFn,
} from "date-fns";
import type { DayOfWeek } from "../types";

export function format(
	date: Date,
	formatStr: string,
	formatOptions?: FormatOptions,
) {
	return formatFn(date, formatStr, formatOptions);
}

export function parseDate(
	val: string,
	format: string,
	parseOptions?: ParseOptions,
) {
	return parse(val, format, new Date(), parseOptions);
}

export function isBefore(
	date: Date | null,
	dateToCompare?: Date | null,
	level?: Level,
) {
	if (!date || !dateToCompare) {
		return true;
	}
	switch (level) {
		case "year": {
			const year = startOf(date, "year");
			const yearToCompare = startOf(dateToCompare, "year");
			return isBeforeFn(year, yearToCompare);
		}
		case "month": {
			const month = startOf(date, "month");
			const monthToCompare = startOf(dateToCompare, "month");
			return isBeforeFn(month, monthToCompare);
		}
		case "day": {
			const day = startOf(date, "day");
			const dayToCompare = startOf(dateToCompare, "day");
			return isBeforeFn(day, dayToCompare);
		}
		default:
			return isBeforeFn(date, dateToCompare);
	}
}

export function isAfter(
	date: Date | null,
	dateToCompare?: Date | null,
	level?: Level,
) {
	if (!date || !dateToCompare) {
		return true;
	}
	switch (level) {
		case "year": {
			const year = startOf(date, "year");
			const yearToCompare = startOf(dateToCompare, "year");
			return isAfterFn(year, yearToCompare);
		}
		case "month": {
			const month = startOf(date, "month");
			const monthToCompare = startOf(dateToCompare, "month");
			return isAfterFn(month, monthToCompare);
		}
		case "day": {
			const day = startOf(date, "day");
			const dayToCompare = startOf(dateToCompare, "day");
			return isAfterFn(day, dayToCompare);
		}
		default:
			return isAfterFn(date, dateToCompare);
	}
}

export function isInRange(date: Date, range: [Date, Date]) {
	const _range = [...range].sort((a, b) => a.getTime() - b.getTime());
	return isWithinInterval(date, {
		start: _range[0],
		end: _range[1],
	});
}

type Level = "year" | "month" | "day" | "week";

/** whether two dates are the same by level  */
export function isSame(left: Date | null, right: Date | null, level: Level) {
	if (!left || !right) {
		return false;
	}

	switch (level) {
		case "year":
			return isSameYear(left, right);
		case "month":
			return isSameMonth(left, right);
		case "day":
			return isSameDay(left, right);
		case "week":
			return isSameWeek(left, right);
		default:
			return false;
	}
}

export function add(data: Date, val: number, level: Level) {
	switch (level) {
		case "year":
			return addYears(data, val);
		case "month":
			return addMonths(data, val);
		case "day":
			return addDays(data, val);
		default:
			return data;
	}
}

export function sub(data: Date, val: number, level: Level) {
	switch (level) {
		case "year":
			return subYears(data, val);
		case "month":
			return subMonths(data, val);
		case "day":
			return subDays(data, val);
		default:
			return data;
	}
}

export function endOf(data: Date, level: Level, firstDayOfWeek: DayOfWeek = 1) {
	switch (level) {
		case "year":
			return endOfYear(data);
		case "month":
			return endOfMonth(data);
		case "day":
			return endOfDay(data);
		case "week":
			return endOfWeek(data, { weekStartsOn: firstDayOfWeek });
		default:
			return data;
	}
}

export function startOf(
	data: Date,
	level: Level,
	firstDayOfWeek: DayOfWeek = 1,
) {
	switch (level) {
		case "year":
			return startOfYear(data);
		case "month":
			return startOfMonth(data);
		case "day":
			return startOfDay(data);
		case "week":
			return startOfWeek(data, { weekStartsOn: firstDayOfWeek });
		default:
			return data;
	}
}

interface GetMonthDaysInput {
	month: Date;
	firstDayOfWeek: DayOfWeek | undefined;
	/** 每月一致性的显示6周的日历 */
	consistentWeeks: boolean | undefined;
}
export function getMonthDays({
	month,
	firstDayOfWeek = 1,
	consistentWeeks,
}: GetMonthDaysInput) {
	const startOfMonth = startOf(month, "month");
	const endOfMonth = endOf(month, "month");

	const startOfWeek = startOf(startOfMonth, "week", firstDayOfWeek);
	const endOfWeek = endOf(endOfMonth, "week", firstDayOfWeek);

	const weeks: Date[][] = [];
	const date = new Date(startOfWeek);

	while (date <= endOfWeek) {
		const days: Date[] = [];

		for (let i = 0; i < 7; i += 1) {
			days.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}

		weeks.push(days);
	}

	// 确保月视图显示6周的日历
	if (consistentWeeks && weeks.length < 6) {
		const lastWeek = weeks[weeks.length - 1];
		const lastDay = lastWeek[lastWeek.length - 1];
		const nextDay = new Date(lastDay);
		nextDay.setDate(nextDay.getDate() + 1);

		while (weeks.length < 6) {
			const days: Date[] = [];

			for (let i = 0; i < 7; i += 1) {
				days.push(new Date(nextDay));
				nextDay.setDate(nextDay.getDate() + 1);
			}

			weeks.push(days);
		}
	}

	return weeks;
}

export function set(date: Date, values: DateValues) {
	return setFn(date, values);
}
