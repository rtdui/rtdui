import { useEffect, useState } from "react";
import { DatePickerType, PickerBaseProps } from "../../types";
import { useUncontrolledDates } from "../use-uncontrolled-dates/use-uncontrolled-dates";
import { isSame, isBefore, isInRange } from "../../utils";

interface UseDatesRangeInput<Type extends DatePickerType = "default">
  extends PickerBaseProps<Type> {
  level: "year" | "month" | "day";
  type: Type;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  applyTimezone?: boolean;
}

export function useDatesState<Type extends DatePickerType = "default">({
  type,
  level,
  value,
  defaultValue,
  onChange,
  allowSingleDateInRange,
  allowDeselect,
  onMouseLeave,
  applyTimezone = true,
}: UseDatesRangeInput<Type>) {
  const [_value, setValue] = useUncontrolledDates({
    type,
    value,
    defaultValue,
    onChange,
    applyTimezone,
  });

  const [pickedDate, setPickedDate] = useState<Date | null>(
    type === "range" ? (_value[0] && !_value[1] ? _value[0] : null) : null
  );
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const onDateChange = (date: Date) => {
    if (type === "range") {
      if (pickedDate instanceof Date && !_value[1]) {
        if (isSame(date, pickedDate, level) && !allowSingleDateInRange) {
          setPickedDate(null);
          setHoveredDate(null);
          setValue([null, null]);
          return;
        }

        const result: [Date, Date] = [date, pickedDate];
        result.sort((a, b) => a.getTime() - b.getTime());
        setValue(result);
        setHoveredDate(null);
        setPickedDate(null);
        return;
      }

      if (
        _value[0] &&
        !_value[1] &&
        isSame(date, _value[0], level) &&
        !allowSingleDateInRange
      ) {
        setPickedDate(null);
        setHoveredDate(null);
        setValue([null, null]);
        return;
      }

      setValue([date, null]);
      setHoveredDate(null);
      setPickedDate(date);
      return;
    }

    if (type === "multiple") {
      if (_value.some((selected: Date) => isSame(selected, date, level))) {
        setValue(
          _value.filter((selected: Date) => !isSame(selected, date, level))
        );
      } else {
        setValue([..._value, date]);
      }

      return;
    }

    if (_value && allowDeselect && isSame(date, _value, level)) {
      setValue(null);
    } else {
      setValue(date);
    }
  };

  const isDateInRange = (date: Date) => {
    if (pickedDate instanceof Date && hoveredDate instanceof Date) {
      return isInRange(date, [hoveredDate, pickedDate]);
    }

    if (_value[0] instanceof Date && _value[1] instanceof Date) {
      return isInRange(date, _value);
    }

    return false;
  };

  const onRootMouseLeave =
    type === "range"
      ? (event: React.MouseEvent<HTMLDivElement>) => {
          onMouseLeave?.(event);
          setHoveredDate(null);
        }
      : onMouseLeave;

  const isFirstInRange = (date: Date) => {
    if (!(_value[0] instanceof Date)) {
      return false;
    }

    if (isSame(date, _value[0], level)) {
      return !(hoveredDate && isBefore(hoveredDate, _value[0]));
    }

    return false;
  };

  const isLastInRange = (date: Date) => {
    if (_value[1] instanceof Date) {
      return isSame(date, _value[1], level);
    }

    if (!(_value[0] instanceof Date) || !hoveredDate) {
      return false;
    }

    return isBefore(hoveredDate, _value[0]) && isSame(date, _value[0], level);
  };

  const getControlProps = (date: Date) => {
    if (type === "range") {
      return {
        selected: _value.some(
          (selection: Date) => selection && isSame(selection, date, level)
        ),
        inRange: isDateInRange(date),
        firstInRange: isFirstInRange(date),
        lastInRange: isLastInRange(date),
        "data-autofocus":
          (!!_value[0] && isSame(_value[0], date, level)) || undefined,
      };
    }

    if (type === "multiple") {
      return {
        selected: _value.some(
          (selection: Date) => selection && isSame(selection, date, level)
        ),
        "data-autofocus":
          (!!_value[0] && isSame(_value[0], date, level)) || undefined,
      };
    }

    const selected = isSame(_value, date, level);
    return { selected, "data-autofocus": selected || undefined };
  };

  const onHoveredDateChange =
    type === "range" && pickedDate ? setHoveredDate : () => {};

  useEffect(() => {
    if (type === "range" && !_value[0] && !_value[1]) {
      setPickedDate(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return {
    onDateChange,
    onRootMouseLeave,
    onHoveredDateChange,
    getControlProps,
    _value,
    setValue,
  };
}
