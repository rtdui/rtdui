import { forwardRef } from "react";
import { useDatesState } from "../../hooks";
import { CalendarLevel, DatePickerType, PickerBaseProps } from "../../types";
import { shiftTimezone } from "../../utils";
import { Calendar, CalendarBaseProps } from "../Calendar";
import { useDatesContext } from "../DatesProvider";
import { DecadeLevelBaseSettings } from "../DecadeLevel";
import { YearLevelBaseSettings } from "../YearLevel";

type MonthPickerLevel = Exclude<CalendarLevel, "month">;

export interface MonthPickerBaseProps<Type extends DatePickerType = "default">
	extends PickerBaseProps<Type>,
		DecadeLevelBaseSettings,
		YearLevelBaseSettings,
		Omit<CalendarBaseProps, "onNextMonth" | "onPreviousMonth"> {
	/** Max level that user can go up to (decade, year), defaults to decade */
	maxLevel?: MonthPickerLevel;

	/** Initial level displayed to the user (decade, year, month), used for uncontrolled component */
	defaultLevel?: MonthPickerLevel;

	/** Current level displayed to the user (decade, year, month), used for controlled component */
	level?: MonthPickerLevel;

	/** Called when level changes */
	onLevelChange?: (level: MonthPickerLevel) => void;
}

export interface MonthPickerProps<Type extends DatePickerType = "default">
	extends MonthPickerBaseProps<Type>,
		Omit<
			React.ComponentPropsWithoutRef<"div">,
			"onChange" | "value" | "defaultValue"
		> {
	/** Called when month is selected */
	onMonthSelect?: (date: Date) => void;
}

export const MonthPicker = forwardRef<HTMLDivElement, MonthPickerProps>(
	(props, ref) => {
		const {
			type = "default",
			defaultValue,
			value,
			onChange,
			getMonthControlProps,
			allowSingleDateInRange,
			allowDeselect,
			onMouseLeave,
			onMonthSelect,
			__updateDateOnMonthSelect,
			__timezoneApplied,
			onLevelChange,
			...others
		} = props;

		const {
			onDateChange,
			onRootMouseLeave,
			onHoveredDateChange,
			getControlProps,
		} = useDatesState({
			type: type as any,
			level: "month",
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
				minLevel="year"
				__updateDateOnMonthSelect={__updateDateOnMonthSelect ?? false}
				onMouseLeave={onRootMouseLeave}
				onMonthMouseEnter={(_event, date) => onHoveredDateChange(date)}
				onMonthSelect={(date) => {
					onDateChange(date);
					onMonthSelect?.(date);
				}}
				getMonthControlProps={(date) => ({
					...getControlProps(date),
					...getMonthControlProps?.(date),
				})}
				onLevelChange={onLevelChange as any}
				date={shiftTimezone(
					"add",
					others.date,
					ctx.getTimezone(),
					__timezoneApplied,
				)}
			/>
		);
	},
);

MonthPicker.displayName = "@rtdui/dates/MonthPicker";
