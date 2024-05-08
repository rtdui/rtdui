import { forwardRef, useEffect, useState } from "react";
import clsx from "clsx";
import {
  type InputBaseOwnProps,
  Input,
  Popover,
  PopoverProps,
  useInputProps,
  CloseButton,
} from "@rtdui/core";
import { useDidUpdate } from "@rtdui/hooks";
import { useUncontrolledDates } from "../../hooks";
import { CalendarLevel, DateValue } from "../../types";
import { assignTime, format, isSame, parseDate } from "../../utils";
import { Calendar, CalendarBaseProps, pickCalendarProps } from "../Calendar";
import { useDatesContext } from "../DatesProvider";
import { DecadeLevelSettings } from "../DecadeLevel";
import { HiddenDatesInput } from "../HiddenDatesInput";
import { MonthLevelSettings } from "../MonthLevel";
import { YearLevelSettings } from "../YearLevel";
import { dateStringParser } from "./date-string-parser/date-string-parser";
import { isDateValid } from "./is-date-valid/is-date-valid";

export interface DateInputProps
  extends Omit<InputBaseOwnProps, "size">,
    CalendarBaseProps,
    DecadeLevelSettings,
    YearLevelSettings,
    MonthLevelSettings,
    Omit<
      React.ComponentPropsWithoutRef<"input">,
      "size" | "value" | "defaultValue" | "onChange"
    > {
  /** Parses user input to convert it to Date object */
  dateParser?: (value: string) => Date | null;

  /** Value for controlled component */
  value?: DateValue;

  /** Default value for uncontrolled component */
  defaultValue?: DateValue;

  /** Called when value changes */
  onChange?: (value: DateValue) => void;

  /** Props added to Popover component */
  popoverProps?: Partial<Omit<PopoverProps, "children">>;

  /** Determines whether input value can be cleared, adds clear button to right section, false by default */
  clearable?: boolean;

  /** Props added to clear button */
  clearButtonProps?: React.ComponentPropsWithoutRef<"button">;

  /** date-fns format to display input value
   * @default "yyyy-MM-dd"
   */
  valueFormat?: string;

  /** Determines whether input value should be reverted to last known valid value on blur, true by default */
  fixOnBlur?: boolean;

  /** Determines whether value can be deselected when the user clicks on the selected date in the calendar (only when clearable prop is set), defaults to true if clearable prop is set, false otherwise */
  allowDeselect?: boolean;

  /** Determines whether time (hours, minutes, seconds and milliseconds) should be preserved when new date is picked, true by default */
  preserveTime?: boolean;

  /** Max level that user can go up to (decade, year, month), defaults to decade */
  maxLevel?: CalendarLevel;

  /** Initial level displayed to the user (decade, year, month), used for uncontrolled component */
  defaultLevel?: CalendarLevel;

  /** Current level displayed to the user (decade, year, month), used for controlled component */
  level?: CalendarLevel;

  /** Called when level changes */
  onLevelChange?: (level: CalendarLevel) => void;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (_props, ref) => {
    const props = useInputProps(_props);
    const {
      inputProps,
      wrapperProps,
      value,
      defaultValue,
      onChange,
      clearable,
      clearButtonProps,
      popoverProps,
      getDayProps,
      locale,
      valueFormat = "yyyy-MM-dd",
      dateParser,
      minDate,
      maxDate,
      fixOnBlur = true,
      onFocus,
      onBlur,
      onClick,
      readOnly,
      name,
      form,
      rightSection,
      allowDeselect,
      preserveTime = true,
      date,
      defaultDate,
      onDateChange,
      ...rest
    } = props;

    const [dropdownOpened, setDropdownOpened] = useState(false);
    const { calendarProps, others } = pickCalendarProps(rest);
    delete calendarProps.allowDeselect;
    delete calendarProps.allowSingleDateInRange;
    const ctx = useDatesContext();
    const defaultDateParser = (val: string) => {
      const parsedDate = parseDate(val, valueFormat, {
        locale: ctx.getLocale(),
      });
      return Number.isNaN(parsedDate.getTime())
        ? dateStringParser(val, ctx.getTimezone())
        : parsedDate;
    };

    const _dateParser = dateParser || defaultDateParser;
    const _allowDeselect =
      allowDeselect !== undefined ? allowDeselect : clearable;

    const formatValue = (val: Date) =>
      val ? format(val, valueFormat, { locale: ctx.getLocale() }) : "";

    const [_value, setValue, controlled] = useUncontrolledDates({
      type: "default",
      value,
      defaultValue,
      onChange,
    });

    const [_date, setDate] = useUncontrolledDates({
      type: "default",
      value: date,
      defaultValue: defaultValue || defaultDate,
      onChange: onDateChange as any,
    });

    useEffect(() => {
      if (controlled) {
        setDate(value!);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controlled, value]);

    const [inputValue, setInputValue] = useState(formatValue(_value!));

    useEffect(() => {
      setInputValue(formatValue(_value!));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctx.getLocale()]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.currentTarget.value;
      setInputValue(val);
      setDropdownOpened(true);

      if (val.trim() === "" && clearable) {
        setValue(null);
      } else {
        const dateValue = _dateParser(val);
        if (isDateValid({ date: dateValue!, minDate, maxDate })) {
          setValue(dateValue);
          setDate(dateValue);
        }
      }
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);
      setDropdownOpened(false);
      fixOnBlur && setInputValue(formatValue(_value!));
    };

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(event);
      setDropdownOpened(true);
    };

    const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
      onClick?.(event);
      setDropdownOpened(true);
    };

    const _getDayProps = (day: Date) => ({
      ...getDayProps?.(day),
      selected: isSame(_value!, day, "day"),
      onClick: () => {
        const valueWithTime = preserveTime ? assignTime(_value!, day) : day;
        const val =
          clearable && _allowDeselect
            ? isSame(_value!, day, "day")
              ? null
              : valueWithTime
            : valueWithTime;
        setValue(val);
        !controlled && setInputValue(formatValue(val!));
        setDropdownOpened(false);
      },
    });

    const _rightSection =
      rightSection ||
      (clearable && _value && !readOnly ? (
        <CloseButton
          size="xs"
          onMouseDown={(event) => event.preventDefault()}
          tabIndex={-1}
          onClick={() => {
            setValue(null);
            !controlled && setInputValue("");
            setDropdownOpened(false);
          }}
          {...clearButtonProps}
        />
      ) : null);

    useDidUpdate(() => {
      value !== undefined &&
        !dropdownOpened &&
        setInputValue(formatValue(value!));
    }, [value]);

    return (
      <>
        <Input.Wrapper {...wrapperProps}>
          <Popover
            opened={dropdownOpened}
            trapFocus={false}
            position="bottom-start"
            disabled={readOnly}
            withRoles={false}
            {...popoverProps}
          >
            <Popover.Target>
              <Input
                data-dates-input
                data-read-only={readOnly || undefined}
                autoComplete="off"
                ref={ref}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onClick={handleInputClick}
                readOnly={readOnly}
                rightSection={_rightSection}
                rightSectionPointerEvents={
                  clearable ? "auto" : inputProps.rightSectionPointerEvents
                }
                {...inputProps}
                {...others}
              />
            </Popover.Target>
            <Popover.Dropdown
              onMouseDown={(event) => event.preventDefault()}
              data-dates-dropdown
              className={clsx("px-4 py-3")}
            >
              <Calendar
                __timezoneApplied
                {...calendarProps}
                __preventFocus
                minDate={minDate}
                maxDate={maxDate}
                locale={locale}
                getDayProps={_getDayProps}
                size={inputProps.size as any}
                date={_date!}
                onDateChange={setDate}
              />
            </Popover.Dropdown>
          </Popover>
        </Input.Wrapper>
        <HiddenDatesInput
          name={name}
          form={form}
          value={_value}
          type="default"
        />
      </>
    );
  }
);

DateInput.displayName = "@rtdui/dates/DateInput";
