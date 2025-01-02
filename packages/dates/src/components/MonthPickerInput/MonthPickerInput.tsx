import { forwardRef } from "react";
import { useDatesInput } from "../../hooks";
import { DatePickerType } from "../../types";
import { getDefaultClampedDate, shiftTimezone } from "../../utils";
import { pickCalendarProps } from "../Calendar";
import { useDatesContext } from "../DatesProvider";
import { MonthPicker, MonthPickerBaseProps } from "../MonthPicker";
import { DateInputSharedProps, PickerInputBase } from "../PickerInputBase";

export interface MonthPickerInputProps<Type extends DatePickerType = "default">
	extends DateInputSharedProps,
		MonthPickerBaseProps<Type> {
	/** date-fns format to display input value
	 * @default "MMM yyyy"
	 */
	valueFormat?: string;
}

export const MonthPickerInput = forwardRef<
	HTMLInputElement,
	MonthPickerInputProps
>((props, ref) => {
	const {
		type = "default",
		value,
		defaultValue,
		onChange,
		valueFormat = "MMM yyyy",
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

	const ctx = useDatesContext();

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
			<MonthPicker
				{...calendarProps}
				date={shiftTimezone("add", calendarProps.date, ctx.getTimezone())}
				size={size}
				// variant={variant}
				type={type}
				value={_value}
				defaultDate={
					Array.isArray(_value)
						? _value[0] || getDefaultClampedDate({ maxDate, minDate })
						: _value || getDefaultClampedDate({ maxDate, minDate })
				}
				onChange={setValue}
				locale={locale}
				__stopPropagation={dropdownType === "popover"}
				minDate={minDate}
				maxDate={maxDate}
				__timezoneApplied
			/>
		</PickerInputBase>
	);
});

MonthPickerInput.displayName = "@rtdui/dates/MonthPickerInput";
