import { add, startOf, format as _format } from "../../../utils";
import type { DayOfWeek, Locale } from "../../../types";

interface GetWeekdaysNamesInput {
  locale?: Locale;
  format?: string | ((date: Date) => React.ReactNode);
  firstDayOfWeek?: DayOfWeek;
}

export function getWeekdayNames({
  locale,
  format = "E",
  firstDayOfWeek = 1,
}: GetWeekdaysNamesInput) {
  const baseDate = startOf(new Date(), "week", firstDayOfWeek);
  const labels: Array<string | React.ReactNode> = [];

  for (let i = 0; i < 7; i += 1) {
    if (typeof format === "string") {
      labels.push(
        _format(add(baseDate, i, "day"), format, {
          locale,
        })
      );
    } else {
      labels.push(format(add(baseDate, i, "day")));
    }
  }

  return labels;
}
