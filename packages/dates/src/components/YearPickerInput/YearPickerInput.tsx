import { forwardRef } from "react";
import { useDatesInput } from "../../hooks";
import { DatePickerType } from "../../types";
import { getDefaultClampedDate, shiftTimezone } from "../../utils";
import { pickCalendarProps } from "../Calendar";
import { useDatesContext } from "../DatesProvider";
import { DateInputSharedProps, PickerInputBase } from "../PickerInputBase";
import { YearPicker, YearPickerBaseProps } from "../YearPicker";

export interface YearPickerInputProps<Type extends DatePickerType = "default">
  extends DateInputSharedProps,
    YearPickerBaseProps<Type> {
  /** date-fns format to display input value
   * @default "yyyy"
   */
  valueFormat?: string;
}

export const YearPickerInput = forwardRef<
  HTMLInputElement,
  YearPickerInputProps
>((props, ref) => {
  const {
    type = "default",
    value,
    defaultValue,
    onChange,
    valueFormat = "yyyy",
    labelSeparator,
    locale,
    closeOnChange = true,
    size,
    variant,
    dropdownType = "popover",
    sortDates = true,
    minDate,
    maxDate,
    valueFormatter,
    ...rest
  } = props;

  const { calendarProps, others } = pickCalendarProps(rest);
  const ctx = useDatesContext();

  const {
    _value,
    setValue,
    formattedValue,
    dropdownHandlers,
    dropdownOpened,
    onClear,
    shouldClear,
  } = useDatesInput({
    type: type as any,
    value,
    defaultValue,
    onChange: onChange as any,
    locale,
    format: valueFormat,
    labelSeparator,
    closeOnChange,
    sortDates,
    valueFormatter,
  });

  return (
    <PickerInputBase
      formattedValue={formattedValue}
      dropdownOpened={dropdownOpened}
      dropdownHandlers={dropdownHandlers}
      ref={ref}
      onClear={onClear}
      shouldClear={shouldClear}
      value={_value}
      size={size!}
      variant={variant}
      dropdownType={dropdownType}
      {...others}
      type={type as any}
    >
      <YearPicker
        {...calendarProps}
        size={size}
        // variant={variant}
        type={type}
        value={_value}
        defaultDate={
          Array.isArray(_value)
            ? _value[0] ||
              getDefaultClampedDate({
                maxDate,
                minDate,
                timezone: ctx.getTimezone(),
              })
            : _value ||
              getDefaultClampedDate({
                maxDate,
                minDate,
                timezone: ctx.getTimezone(),
              })
        }
        onChange={setValue}
        locale={locale}
        __stopPropagation={dropdownType === "popover"}
        minDate={minDate}
        maxDate={maxDate}
        date={shiftTimezone("add", calendarProps.date, ctx.getTimezone())}
        __timezoneApplied
      />
    </PickerInputBase>
  );
});

YearPickerInput.displayName = "@rtdui/dates/YearPickerInput";
