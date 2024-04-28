import { PickerControlProps } from "../../PickerControl";
import { isMonthDisabled } from "../is-month-disabled/is-month-disabled";
import { isSame } from "../../../utils";

export function getMonthInTabOrder(
  months: Date[][],
  minDate: Date | undefined,
  maxDate: Date | undefined,
  getMonthControlProps:
    | ((month: Date) => Partial<PickerControlProps>)
    | undefined
) {
  const enabledMonths = months
    .flat()
    .filter(
      (month) =>
        !isMonthDisabled(month, minDate, maxDate) &&
        !getMonthControlProps?.(month)?.disabled
    );

  const selectedMonth = enabledMonths.find(
    (month) => getMonthControlProps?.(month)?.selected
  );

  if (selectedMonth) {
    return selectedMonth;
  }

  const currentMonth = enabledMonths.find((month) =>
    isSame(month, new Date(), "month")
  );

  if (currentMonth) {
    return currentMonth;
  }

  return enabledMonths[0];
}
