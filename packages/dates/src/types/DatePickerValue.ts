export type DateValue = Date | null;
export type DatesRangeValue = [DateValue, DateValue];
export type DatePickerType = "default" | "multiple" | "range";

export type DatePickerValue<T extends DatePickerType = "default"> =
  T extends "range"
    ? DatesRangeValue
    : T extends "multiple"
      ? Date[]
      : DateValue;
