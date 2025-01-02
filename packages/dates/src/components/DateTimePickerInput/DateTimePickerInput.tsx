import { forwardRef, useRef, useState } from "react";
import { useDidUpdate, useDisclosure, useMergedRef } from "@rtdui/hooks";
import { useUncontrolledDates } from "../../hooks";
import { DateValue } from "../../types";
import { assignTime, format, shiftTimezone } from "../../utils";
import {
	CalendarBaseProps,
	CalendarSettings,
	pickCalendarProps,
} from "../Calendar";
import { DatePicker } from "../DatePicker";
import { useDatesContext } from "../DatesProvider";
import { DateInputSharedProps, PickerInputBase } from "../PickerInputBase";
import { TimeInput, TimeInputProps } from "../TimeInput";
import { Button, ButtonProps } from "@rtdui/core";
import clsx from "clsx";
import { IconCheck } from "@tabler/icons-react";

export interface DateTimePickerProps
	extends Omit<
			DateInputSharedProps,
			"classNames" | "styles" | "closeOnChange" | "size"
		>,
		Omit<CalendarBaseProps, "defaultDate">,
		Omit<CalendarSettings, "onYearMouseEnter" | "onMonthMouseEnter"> {
	/** date-fns format to display input value, "DD/MM/YYYY HH:mm" by default  */
	valueFormat?: string;

	/** Controlled component value */
	value?: DateValue;

	/** Default value for uncontrolled component */
	defaultValue?: DateValue;

	/** Called when value changes */
	onChange?: (value: DateValue) => void;

	/** TimeInput component props */
	timeInputProps?: TimeInputProps & {
		ref?: React.ComponentPropsWithRef<"input">["ref"];
	};

	/** Props passed down to the submit button */
	submitButtonProps?: ButtonProps;

	/** Determines whether seconds input should be rendered */
	withSeconds?: boolean;
}

export const DateTimePickerInput = forwardRef<
	HTMLInputElement,
	DateTimePickerProps
>((props, ref) => {
	const {
		value,
		defaultValue,
		onChange,
		valueFormat,
		locale,
		timeInputProps,
		submitButtonProps,
		withSeconds,
		level,
		defaultLevel,
		size,
		variant,
		dropdownType = "popover",
		minDate,
		maxDate,
		...rest
	} = props;

	const _valueFormat =
		valueFormat || (withSeconds ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd HH:mm");

	const timeInputRef = useRef<HTMLInputElement>();
	const timeInputRefMerged = useMergedRef(timeInputRef, timeInputProps?.ref);

	const {
		calendarProps: { allowSingleDateInRange, ...calendarProps },
		others,
	} = pickCalendarProps(rest);

	const ctx = useDatesContext();
	const [_value, setValue] = useUncontrolledDates({
		type: "default",
		value,
		defaultValue,
		onChange,
	});

	const formatTime = (dateValue: Date) =>
		dateValue ? format(dateValue, withSeconds ? "HH:mm:ss" : "HH:mm") : "";

	const [timeValue, setTimeValue] = useState(formatTime(_value!));
	const [currentLevel, setCurrentLevel] = useState(
		level || defaultLevel || "month",
	);

	const [dropdownOpened, dropdownHandlers] = useDisclosure(false);
	const formattedValue = _value
		? format(_value, _valueFormat, { locale: ctx.getLocale() })
		: "";

	const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		timeInputProps?.onChange?.(event);
		const val = event.currentTarget.value;
		setTimeValue(val);

		if (val) {
			const [hours, minutes, seconds] = val.split(":").map(Number);
			const timeDate = shiftTimezone("add", new Date(), ctx.getTimezone());
			timeDate.setHours(hours);
			timeDate.setMinutes(minutes);
			timeDate.setSeconds(seconds || 0);
			setValue(
				assignTime(
					timeDate,
					_value || shiftTimezone("add", new Date(), ctx.getTimezone()),
				),
			);
		}
	};

	const handleDateChange = (date: DateValue) => {
		if (date) {
			setValue(assignTime(_value, date));
		}
		timeInputRef.current?.focus();
	};

	const handleTimeInputKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>,
	) => {
		timeInputProps?.onKeyDown?.(event);

		if (event.key === "Enter") {
			event.preventDefault();
			dropdownHandlers.close();
		}
	};

	useDidUpdate(() => {
		if (!dropdownOpened) {
			setTimeValue(formatTime(_value!));
		}
	}, [_value, dropdownOpened]);

	useDidUpdate(() => {
		if (dropdownOpened) {
			setCurrentLevel("month");
		}
	}, [dropdownOpened]);

	const minTime = minDate ? format(minDate, "HH:mm:ss") : null;
	const maxTime = maxDate ? format(maxDate, "HH:mm:ss") : null;

	const __stopPropagation = dropdownType === "popover";

	return (
		<PickerInputBase
			formattedValue={formattedValue}
			dropdownOpened={dropdownOpened}
			dropdownHandlers={dropdownHandlers}
			ref={ref}
			onClear={() => setValue(null)}
			shouldClear={!!_value}
			value={_value}
			size={size!}
			variant={variant}
			dropdownType={dropdownType}
			{...others}
			type="default"
		>
			<DatePicker
				{...calendarProps}
				maxDate={maxDate}
				minDate={minDate}
				size={size}
				// variant={variant}
				type="default"
				value={_value}
				defaultDate={_value!}
				onChange={handleDateChange}
				locale={locale}
				__stopPropagation={__stopPropagation}
				level={level}
				defaultLevel={defaultLevel}
				onLevelChange={(_level) => {
					setCurrentLevel(_level);
					calendarProps.onLevelChange?.(_level);
				}}
				__timezoneApplied
			/>

			{currentLevel === "month" && (
				<div className={clsx("timeWrapper", "flex items-center gap-4")}>
					<TimeInput
						value={timeValue}
						withSeconds={withSeconds}
						ref={timeInputRefMerged}
						{...timeInputProps}
						className={clsx("timeInput", "flex-1")}
						onChange={handleTimeChange}
						onKeyDown={handleTimeInputKeyDown}
						minTime={
							_value &&
							minDate &&
							_value.toDateString() === minDate.toDateString()
								? minTime != null
									? minTime
									: undefined
								: undefined
						}
						maxTime={
							_value &&
							maxDate &&
							_value.toDateString() === maxDate.toDateString()
								? maxTime != null
									? maxTime
									: undefined
								: undefined
						}
						size={size}
						data-rtdui-stop-propagation={__stopPropagation || undefined}
					/>

					<Button
						sharp="square"
						size="sm"
						className={clsx("submitButton")}
						data-rtdui-stop-propagation={__stopPropagation || undefined}
						{...submitButtonProps}
						onClick={(event) => {
							submitButtonProps?.onClick?.(event);
							dropdownHandlers.close();
						}}
					>
						<IconCheck size="18" />
					</Button>
				</div>
			)}
		</PickerInputBase>
	);
});

DateTimePickerInput.displayName = "@rtdui/dates/DateTimePickerInput";
