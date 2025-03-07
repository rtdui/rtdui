import { forwardRef } from "react";
import { clamp, useUncontrolled } from "@rtdui/hooks";
import {
	NumericFormat,
	type NumberFormatValues,
	type OnValueChange,
} from "react-number-format";
import { TextInput, type TextInputProps } from "../TextInput";

function isValidNumber(value: number | string | undefined): value is number {
	return (
		(typeof value === "number" || !Number.isNaN(Number(value))) &&
		!Number.isNaN(value)
	);
}

function isInRange(
	value: number | undefined,
	min: number | undefined,
	max: number | undefined,
) {
	if (value === undefined) {
		return true;
	}

	const minValid = min === undefined || value >= min;
	const maxValid = max === undefined || value <= max;

	return minValid && maxValid;
}

interface GetDecrementedValueInput {
	value: number;
	min: number | undefined;
	step: number | undefined;
	allowNegative: boolean | undefined;
}

function getDecrementedValue({
	value,
	min,
	step = 1,
	allowNegative,
}: GetDecrementedValueInput) {
	const nextValue = value - step;

	if (min !== undefined && nextValue < min) {
		return min;
	}

	if (!allowNegative && nextValue < 0 && min === undefined) {
		return value;
	}

	if (min !== undefined && min >= 0 && nextValue <= min) {
		return nextValue;
	}

	return nextValue;
}

export interface NumberInputProps
	extends Omit<TextInputProps, "size" | "type" | "color" | "onChange"> {
	/** Controlled component value */
	value?: number | string;

	/** Uncontrolled component default value */
	defaultValue?: number | string;
	onChange?: (value: number | string) => void;

	/** Called when value changes with `react-number-format` payload */
	onValueChange?: OnValueChange;

	/** Minimum possible value */
	min?: number;

	/** Maximum possible value */
	max?: number;

	/** Number by which value will be incremented/decremented with up/down controls and keyboard arrows
	 * @default 1
	 */
	step?: number;

	/** Controls how value is clamped
	 * `strict` – user is not allowed to enter values that are not in `[min, max]` range,
	 * `blur-sm` – user is allowed to enter any values, but the value is clamped when the input loses focus (default behavior),
	 * `none` – lifts all restrictions, `[min, max]` range is applied only for controls and up/down keys
	 * @default "blur-sm"
	 */
	clampBehavior?: "strict" | "blur-sm" | "none";

	/** Prefix added before the input value */
	prefix?: string;

	/** Suffix added after the input value */
	suffix?: string;

	/** Determines whether negative values are allowed
	 * @default true
	 */
	allowNegative?: boolean;

	/** Determines whether decimal values are allowed
	 * @default true
	 */
	allowDecimal?: boolean;

	/** Limits the number of digits that can be entered after the decimal point */
	decimalScale?: number;

	/** Defines the thousand grouping style. */
	thousandsGroupStyle?: "thousand" | "lakh" | "wan";

	/** A function to validate the input value. If this function returns `false`, the `onChange` will not be called and the input value will not change. */
	isAllowed?: (values: NumberFormatValues) => boolean;
}
/** NumberInput继承了TextInput的所有属性 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
	(props, ref) => {
		const {
			value,
			defaultValue,
			onChange,
			onValueChange,
			min,
			max,
			step = 1,
			clampBehavior = "blur-sm",
			allowNegative = true,
			allowDecimal = true,
			decimalScale,
			thousandsGroupStyle,
			isAllowed,
			readOnly,
			onKeyDown,
			onBlur,
			...other
		} = props;
		const [_value, setValue] = useUncontrolled({
			value,
			defaultValue,
			onChange,
		});
		const increment = () => {
			if (typeof _value !== "number" || Number.isNaN(_value)) {
				setValue(clamp(0, min, max));
			} else if (max !== undefined) {
				setValue(_value + step <= max ? _value + step : max);
			} else {
				setValue(_value + step);
			}
		};

		const decrement = () => {
			if (typeof _value !== "number" || Number.isNaN(_value)) {
				setValue(clamp(0, min, max));
			} else {
				setValue(
					getDecrementedValue({ value: _value, min, step, allowNegative }),
				);
			}
		};

		const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
			onKeyDown?.(event);

			if (readOnly) {
				return;
			}

			if (event.key === "ArrowUp") {
				event.preventDefault();
				increment();
			}

			if (event.key === "ArrowDown") {
				event.preventDefault();
				decrement();
			}
		};

		const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
			onBlur?.(event);
			if (clampBehavior === "blur-sm" && typeof _value === "number") {
				const clampedValue = clamp(_value, min, max);
				if (clampedValue !== _value) {
					setValue(clamp(_value, min, max));
				}
			}
		};

		const handleValueChange: OnValueChange = (payload, event) => {
			if (event.source === "event") {
				setValue(
					isValidNumber(payload.floatValue)
						? payload.floatValue
						: payload.value,
				);
			}
			onValueChange?.(payload, event);
		};

		const inputMode =
			allowNegative === false && allowDecimal === false
				? "numeric"
				: allowNegative === false && allowDecimal === true
					? "decimal"
					: "text";

		return (
			<NumericFormat
				getInputRef={ref}
				customInput={TextInput}
				value={_value}
				onValueChange={handleValueChange}
				allowNegative={allowNegative}
				decimalScale={allowDecimal ? decimalScale : 0}
				thousandsGroupStyle={thousandsGroupStyle}
				thousandSeparator={thousandsGroupStyle ? "," : undefined}
				readOnly={readOnly}
				onKeyDown={handleKeyDown}
				onBlur={handleBlur}
				isAllowed={(val) => {
					if (clampBehavior === "strict") {
						if (isAllowed) {
							return isAllowed(val) && isInRange(val.floatValue, min, max);
						}

						return isInRange(val.floatValue, min, max);
					}

					return isAllowed ? isAllowed(val) : true;
				}}
				inputMode={inputMode}
				{...other}
			/>
		);
	},
);

NumberInput.displayName = "@rtdui/NumberInput";
