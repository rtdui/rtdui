import type React from "react";
import { forwardRef } from "react";
import clsx from "clsx";
import { InputBase, type InputBaseOwnProps } from "@rtdui/core";

export interface TimeInputProps
	extends InputBaseOwnProps,
		Omit<React.ComponentPropsWithoutRef<"input">, "size"> {
	/** Determines whether seconds input should be rendered */
	withSeconds?: boolean;

	/** Minimum possible string time, if withSeconds is true, time should be in format HH:mm:ss, otherwise HH:mm */
	minTime?: string;

	/** Maximum possible string time, if withSeconds is true, time should be in format HH:mm:ss, otherwise HH:mm */
	maxTime?: string;
}

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
	(props, ref) => {
		const { withSeconds, minTime, maxTime, value, onChange, size, ...others } =
			props;

		/**
		 * Check if time is within limits or not
		 * If the given value is within limits, return 0
		 * If the given value is greater than the maxTime, return 1
		 * If the given value is less than the minTime, return -1
		 */
		const checkIfTimeLimitExceeded = (val: string) => {
			if (minTime !== undefined || maxTime !== undefined) {
				const [hours, minutes, seconds] = val.split(":").map(Number);

				if (minTime) {
					const [minHours, minMinutes, minSeconds] = minTime
						.split(":")
						.map(Number);

					if (
						hours < minHours ||
						(hours === minHours && minutes < minMinutes) ||
						(withSeconds &&
							hours === minHours &&
							minutes === minMinutes &&
							seconds < minSeconds)
					) {
						return -1;
					}
				}

				if (maxTime) {
					const [maxHours, maxMinutes, maxSeconds] = maxTime
						.split(":")
						.map(Number);

					if (
						hours > maxHours ||
						(hours === maxHours && minutes > maxMinutes) ||
						(withSeconds &&
							hours === maxHours &&
							minutes === maxMinutes &&
							seconds > maxSeconds)
					) {
						return 1;
					}
				}
			}

			return 0;
		};

		const onTimeBlur = (event: React.FocusEvent<HTMLInputElement>) => {
			props.onBlur?.(event);
			if (minTime !== undefined || maxTime !== undefined) {
				const val = event.currentTarget.value;

				if (val) {
					const check = checkIfTimeLimitExceeded(val);
					if (check === 1) {
						event.currentTarget.value = maxTime!;
						props.onChange?.(event);
					} else if (check === -1) {
						event.currentTarget.value = minTime!;
						props.onChange?.(event);
					}
				}
			}
		};

		return (
			<InputBase
				ref={ref}
				type="time"
				value={value}
				{...others}
				step={withSeconds ? 1 : 60}
				onChange={onChange}
				onBlur={onTimeBlur}
				size={size as any}
			/>
		);
	},
);

TimeInput.displayName = "@rtdui/dates/TimeInput";
