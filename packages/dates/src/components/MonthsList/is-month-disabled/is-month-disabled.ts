import { isAfter, isBefore } from "../../../utils";

export function isMonthDisabled(
  month: Date,
  minDate: Date | null | undefined,
  maxDate: Date | null | undefined
) {
  if (!minDate && !maxDate) {
    return false;
  }

  if (minDate && isBefore(month, minDate, "month")) {
    return true;
  }

  if (maxDate && isAfter(month, maxDate, "month")) {
    return true;
  }

  return false;
}
