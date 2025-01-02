import { add, startOf } from "../../../utils";

export function getMonthsData(year: Date) {
	const startOfYear = startOf(year, "year");

	const results: Date[][] = [[], [], [], []];
	let currentMonthIndex = 0;

	for (let i = 0; i < 4; i += 1) {
		for (let j = 0; j < 3; j += 1) {
			results[i].push(add(startOfYear, currentMonthIndex, "month"));
			currentMonthIndex += 1;
		}
	}

	return results;
}
