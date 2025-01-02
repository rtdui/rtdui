import { forwardRef } from "react";
import { useDisclosure, useUncontrolled } from "@rtdui/hooks";
import { DateInputSharedProps, PickerInputBase } from "../PickerInputBase";
import { TimePicker, type TimerPickerBaseProps } from "../TimePicker";
import { ThemeSize } from "@rtdui/core";

export interface TimePickerInputProps
	extends DateInputSharedProps,
		TimerPickerBaseProps {
	size?: ThemeSize;
}

export const TimePickerInput = forwardRef<
	HTMLInputElement,
	TimePickerInputProps
>((props, ref) => {
	const {
		variant,
		value,
		defaultValue,
		onChange,
		dropdownType = "popover",
		withSeconds,
		...others
	} = props;

	const [dropdownOpened, dropdownHandlers] = useDisclosure(false);

	const [_value, setValue] = useUncontrolled({
		value,
		defaultValue,
		finalValue: "",
		onChange,
	});
	const onClear = () => setValue("");
	const shouldClear = _value !== null;

	const formattedValue = _value ? _value : withSeconds ? "--:--:--" : "--:--";

	return (
		<PickerInputBase
			formattedValue={formattedValue}
			dropdownOpened={dropdownOpened}
			dropdownHandlers={dropdownHandlers}
			ref={ref}
			onClear={onClear}
			shouldClear={shouldClear}
			value={_value as any}
			dropdownType={dropdownType}
			{...others}
			popoverProps={{
				closeOnEscape: false,
				closeOnClickOutside: false,
			}}
			type="default"
			variant={variant}
		>
			<TimePicker
				value={_value}
				onChange={setValue}
				withSeconds={withSeconds}
			/>
			<div className="flex justify-end">
				<button
					type="button"
					className="btn btn-sm"
					onClick={dropdownHandlers.close}
				>
					OK
				</button>
			</div>
		</PickerInputBase>
	);
});

TimePickerInput.displayName = "@rtdui/dates/TimePickerInput";
