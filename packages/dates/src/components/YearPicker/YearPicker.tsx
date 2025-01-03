import { forwardRef } from "react";
import { useDatesState } from "../../hooks";
import type { DatePickerType, PickerBaseProps } from "../../types";
import { shiftTimezone } from "../../utils";
import { Calendar, type CalendarBaseProps } from "../Calendar";
import { useDatesContext } from "../DatesProvider";
import type { DecadeLevelBaseSettings } from "../DecadeLevel";

export interface YearPickerBaseProps<Type extends DatePickerType = "default">
	extends PickerBaseProps<Type>,
		DecadeLevelBaseSettings,
		Omit<
			CalendarBaseProps,
			"onNextYear" | "onPreviousYear" | "onNextMonth" | "onPreviousMonth"
		> {}

export interface YearPickerProps<Type extends DatePickerType = "default">
	extends YearPickerBaseProps<Type>,
		Omit<
			React.ComponentPropsWithoutRef<"div">,
			"onChange" | "value" | "defaultValue"
		> {
	/** Called when year is selected */
	onYearSelect?: (date: Date) => void;
}

export const YearPicker = forwardRef<HTMLDivElement, YearPickerProps>(
	(props, ref) => {
		const {
			type = "default",
			defaultValue,
			value,
			onChange,
			getYearControlProps,
			allowSingleDateInRange,
			allowDeselect,
			onMouseLeave,
			onYearSelect,
			__updateDateOnYearSelect,
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
			level: "year",
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
				{...others}
				minLevel="decade"
				__updateDateOnYearSelect={__updateDateOnYearSelect ?? false}
				onMouseLeave={onRootMouseLeave}
				onYearMouseEnter={(_event, date) => onHoveredDateChange(date)}
				onYearSelect={(date) => {
					onDateChange(date);
					onYearSelect?.(date);
				}}
				getYearControlProps={(date) => ({
					...getControlProps(date),
					...getYearControlProps?.(date),
				})}
				date={shiftTimezone(
					"add",
					others.date,
					ctx.getTimezone(),
					__timezoneApplied,
				)}
				__timezoneApplied
			/>
		);
	},
);

YearPicker.displayName = "@rtdui/dates/YearPicker";
