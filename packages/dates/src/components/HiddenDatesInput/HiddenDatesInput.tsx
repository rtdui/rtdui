import type { DatePickerType, DatesRangeValue, DateValue } from "../../types";

export type HiddenDatesInputValue = DatesRangeValue | DateValue | DateValue[];

export interface HiddenDatesInputProps {
  value: HiddenDatesInputValue;
  type: DatePickerType;
  name: string | undefined;
  form: string | undefined;
}

function formatValue(value: HiddenDatesInputValue, type: DatePickerType) {
  if (type === "range" && Array.isArray(value)) {
    const [startDate, endDate] = value;
    if (!startDate) {
      return "";
    }

    if (!endDate) {
      return `${startDate.toISOString()} –`;
    }

    return `${startDate.toISOString()} – ${endDate.toISOString()}`;
  }

  if (type === "multiple" && Array.isArray(value)) {
    return value
      .map((date) => date?.toISOString())
      .filter(Boolean)
      .join(", ");
  }

  if (!Array.isArray(value) && value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === "string") {
    return value;
  }

  return "";
}

export function HiddenDatesInput(props: HiddenDatesInputProps) {
  const { value, type, name, form } = props;
  return (
    <input
      type="hidden"
      value={formatValue(value, type)}
      name={name}
      form={form}
    />
  );
}
