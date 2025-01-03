import { forwardRef, useState } from "react";
import { useUncontrolled } from "@rtdui/hooks";
import { TextArea, type TextAreaProps } from "../TextArea";
import { validateJson } from "./validate-json";

export interface JsonInputProps extends Omit<TextAreaProps, "onChange"> {
	/** Value for controlled component */
	value?: string;

	/** Default value for uncontrolled component */
	defaultValue?: string;

	/** Called when value changes */
	onChange?: (value: string) => void;

	/** Determines whether the value should be formatted on blur
	 * @default true
	 */
	formatOnBlur?: boolean;
}
/** `JsonInput`继承了`TextArea`组件的属性 */
export const JsonInput = forwardRef<HTMLTextAreaElement, JsonInputProps>(
	(props, ref) => {
		const {
			value,
			defaultValue,
			onChange,
			onFocus,
			onBlur,
			readOnly,
			formatOnBlur = true,
			...others
		} = props;

		const [_value, setValue] = useUncontrolled({
			value,
			defaultValue,
			finalValue: "",
			onChange,
		});

		const [valid, setValid] = useState(validateJson(_value));

		const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
			onFocus?.(event);
			setValid(true);
		};

		const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
			typeof onBlur === "function" && onBlur(event);
			const isValid = validateJson(event.currentTarget.value);
			formatOnBlur &&
				!readOnly &&
				isValid &&
				event.currentTarget.value.trim() !== "" &&
				setValue(
					JSON.stringify(JSON.parse(event.currentTarget.value), null, 2),
				);
			setValid(isValid);
		};

		return (
			<TextArea
				value={_value}
				onChange={(e) => setValue(e.currentTarget.value)}
				onFocus={handleFocus}
				onBlur={handleBlur}
				ref={ref}
				readOnly={readOnly}
				{...others}
				autoComplete="off"
				error={!valid}
				data-monospace
			/>
		);
	},
);

JsonInput.displayName = "@rtdui/JsonInput";
