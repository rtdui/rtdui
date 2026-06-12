import type { DayOfWeek, Locale } from "../../types";
import { useDateContext } from "./DatesProvider";

export function useDatesContext() {
  const ctx = useDateContext()!;
  const getLocale = (input?: Locale) => input || ctx.locale;

  const getTimezone = (input?: string) => input || ctx.timezone || undefined;

  const getFirstDayOfWeek = (input?: DayOfWeek) =>
    typeof input === "number" ? input : ctx.firstDayOfWeek;

  const getWeekendDays = (input?: DayOfWeek[]) =>
    Array.isArray(input) ? input : ctx.weekendDays;

  const getLabelSeparator = (input?: string) =>
    typeof input === "string" ? input : ctx.labelSeparator;

  return {
    ...ctx,
    getLocale,
    getTimezone,
    getFirstDayOfWeek,
    getWeekendDays,
    getLabelSeparator,
  };
}
