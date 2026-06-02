import { addMinutes } from "date-fns";
import { tzOffset } from "@date-fns/tz";
import type { DatesRangeValue, DateValue } from "../types";

type TimeShiftDirection = "add" | "remove";

/**
 * 转换时区
 * @param date Date
 * @param timezone IANA time zone name 或 UTC offset Text. 如"UTC", "Asia/Shanghai", "+08:00"
 * @param direction
 * @returns
 */
const updateTimezone = (
  date?: DateValue,
  timezone?: string,
  direction?: TimeShiftDirection,
): DateValue => {
  if (!date) {
    return null;
  }
  if (!timezone) {
    return date;
  }
  // UTC偏移量(分钟单位), 第二个日期参数用于检查偏移.
  // 与Date.prototype.getTimezoneOffset不同(UTC相对于时区的偏移量), 此函数返回的值会反映时区偏移量的相同符号(时区相对于UTC的偏移量)。对于"Asia/Shanghai"(UTC+8), tzOffset返回480, 而`Date.prototype.getTimezoneOffset`返回-480。
  let offset = tzOffset(timezone, date);
  if (direction === "remove") {
    offset *= -1;
  }
  return addMinutes(date, offset);
};

export function shiftTimezone<
  T extends DateValue | Date[] | DatesRangeValue | undefined,
>(
  direction: TimeShiftDirection,
  date: T,
  timezone?: string,
  disabled?: boolean,
): T {
  if (disabled || !date) {
    return date;
  }
  if (Array.isArray(date)) {
    return date.map((d) => updateTimezone(d, timezone, direction)) as T;
  }
  return updateTimezone(date, timezone, direction) as T;
}
