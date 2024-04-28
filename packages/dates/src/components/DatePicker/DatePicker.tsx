import { forwardRef } from "react";
import { useDatesState } from "../../hooks";
import { CalendarLevel, DatePickerType, PickerBaseProps } from "../../types";
import { shiftTimezone } from "../../utils";
import { Calendar, CalendarBaseProps, CalendarSettings } from "../Calendar";
import { useDatesContext } from "../DatesProvider";
import { DecadeLevelBaseSettings } from "../DecadeLevel";
import { MonthLevelBaseSettings } from "../MonthLevel";
import { YearLevelBaseSettings } from "../YearLevel";

export interface DatePickerBaseProps<Type extends DatePickerType = "default">
  extends PickerBaseProps<Type>,
    DecadeLevelBaseSettings,
    YearLevelBaseSettings,
    MonthLevelBaseSettings,
    CalendarBaseProps,
    CalendarSettings {
  /** Max level that user can go up to (decade, year, month)
   * @default decade
   */
  maxLevel?: CalendarLevel;

  /** Initial level displayed to the user (decade, year, month), used for uncontrolled component */
  defaultLevel?: CalendarLevel;

  /** Current level displayed to the user (decade, year, month), used for controlled component */
  level?: CalendarLevel;

  /** Called when level changes */
  onLevelChange?: (level: CalendarLevel) => void;
}

export interface DatePickerProps<Type extends DatePickerType = "default">
  extends DatePickerBaseProps<Type>,
    Omit<
      React.ComponentPropsWithoutRef<"div">,
      "onChange" | "value" | "defaultValue"
    > {}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (props, ref) => {
    const {
      type = "default",
      defaultValue,
      value,
      onChange,
      defaultLevel = "month",
      getDayProps,
      allowSingleDateInRange,
      allowDeselect,
      onMouseLeave,
      numberOfColumns = 1,
      hideOutsideDates,
      __onDayMouseEnter,
      __onDayClick,
      __timezoneApplied,
      ...others
    } = props;

    const {
      onDateChange,
      onRootMouseLeave,
      onHoveredDateChange,
      getControlProps,
    } = useDatesState({
      type: type as any,
      level: "day",
      allowDeselect,
      allowSingleDateInRange,
      value,
      defaultValue,
      onChange: onChange as any,
      onMouseLeave,
      applyTimezone: !__timezoneApplied,
    });

    const ctx = useDatesContext();

    return (
      <Calendar
        ref={ref}
        defaultLevel={defaultLevel}
        minLevel="month"
        onMouseLeave={onRootMouseLeave}
        numberOfColumns={numberOfColumns}
        hideOutsideDates={hideOutsideDates ?? numberOfColumns !== 1}
        __onDayMouseEnter={(_event, date) => {
          onHoveredDateChange(date);
          __onDayMouseEnter?.(_event, date);
        }}
        __onDayClick={(_event, date) => {
          onDateChange(date);
          __onDayClick?.(_event, date);
        }}
        getDayProps={(date) => ({
          ...getControlProps(date),
          ...getDayProps?.(date),
        })}
        {...others}
        date={shiftTimezone(
          "add",
          others.date,
          ctx.getTimezone(),
          __timezoneApplied
        )}
        __timezoneApplied
      />
    );
  }
);

DatePicker.displayName = "@rtdui/dates/DatePicker";
