import { addMilliseconds } from "date-fns";
import { getTimezoneOffset } from "date-fns-tz";
import { DatesRangeValue, DateValue } from "../types";

type TimeShiftDirection = "add" | "remove";

const updateTimezone = (
  date?: DateValue,
  timezone?: string,
  direction?: TimeShiftDirection
): DateValue => {
  if (!date) {
    return null;
  }
  if (!timezone) {
    return date;
  }
  // 时区偏移, 毫秒单位, 第二个日期参数用于确定夏令时.
  let offset = getTimezoneOffset(timezone, date);
  if (direction === "remove") {
    offset *= -1;
  }
  return addMilliseconds(date, offset);
};

export function shiftTimezone<
  T extends DateValue | Date[] | DatesRangeValue | undefined,
>(
  direction: TimeShiftDirection,
  date: T,
  timezone?: string,
  disabled?: boolean
): T {
  if (disabled || !date) {
    return date;
  }
  if (Array.isArray(date)) {
    return date.map((d) => updateTimezone(d, timezone, direction)) as T;
  }
  return updateTimezone(date, timezone, direction) as T;
}
