import { forwardRef } from "react";
import { useDatesInput } from "../../hooks";
import type { DatePickerType } from "../../types";
import { getDefaultClampedDate, shiftTimezone } from "../../utils";
import { pickCalendarProps } from "../Calendar";
import { DatePicker, type DatePickerBaseProps } from "../DatePicker";
import { useDatesContext } from "../DatesProvider";
import { type DateInputSharedProps, PickerInputBase } from "../PickerInputBase";

export interface DatePickerInputProps<T extends DatePickerType = "default">
	extends DateInputSharedProps,
		DatePickerBaseProps<T> {
	/** date-fns format to display input value
	 * @default "yyyy-MM-dd"
	 */
	valueFormat?: string;
}

export const DatePickerInput = forwardRef<
	HTMLInputElement,
	DatePickerInputProps
>((props, ref) => {
	const {
		type = "default",
		value,
		defaultValue,
		onChange,
		valueFormat = "yyyy-MM-dd",
		labelSeparator,
		locale,
		closeOnChange = true,
		size,
		variant,
		dropdownType = "popover",
		sortDates = true,
		minDate,
		maxDate,
		defaultDate,
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

	const _defaultDate = Array.isArray(_value)
		? _value[0] || defaultDate
		: _value || defaultDate;
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
			<DatePicker
				{...calendarProps}
				size={size}
				// variant={variant}
				type={type}
				value={_value}
				defaultDate={
					_defaultDate ||
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

DatePickerInput.displayName = "@rtdui/dates/DatePickerInput";
