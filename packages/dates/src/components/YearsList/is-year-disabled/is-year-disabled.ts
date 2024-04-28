import { isAfter, isBefore } from "../../../utils";

export function isYearDisabled(
  year: Date,
  minDate: Date | null | undefined,
  maxDate: Date | null | undefined
) {
  if (!minDate && !maxDate) {
    return false;
  }

  if (minDate && isBefore(year, minDate, "year")) {
    return true;
  }

  if (maxDate && isAfter(year, maxDate, "year")) {
    return true;
  }

  return false;
}
