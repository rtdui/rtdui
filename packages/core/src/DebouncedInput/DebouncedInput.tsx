import { forwardRef, useEffect, useState, memo } from "react";
import { useDidUpdate } from "@rtdui/hooks";
import { TextInput } from "../TextInput/TextInput";
import type { TextInputProps } from "../TextInput/TextInput";

// A debounced input react component

export interface DebouncedInputProps extends Omit<TextInputProps, "onChange"> {
	onChange: (value: string) => void;
	/**
	 * 延迟的毫秒数
	 * @default 500
	 */
	wait?: number;
}

/** ref属性会转发至内部的input元素 */
const DebouncedInput_ = forwardRef<HTMLInputElement, DebouncedInputProps>(
	(props, ref) => {
		const { defaultValue, value, onChange, wait = 500, ...other } = props;
		const [innerValue, setInnerValue] = useState(value ?? defaultValue ?? "");

		// 受控属性改变,同步内部状态
		useDidUpdate(() => {
			setInnerValue(value ?? "");
		}, [value]);

		// 延迟执行onChange属性
		useEffect(() => {
			const timeout = setTimeout(() => {
				onChange(innerValue as string);
			}, wait);

			return () => clearTimeout(timeout);
		}, [innerValue]);

		return (
			<TextInput
				ref={ref}
				{...other}
				value={innerValue}
				onChange={(e) => setInnerValue(e.target.value)}
			/>
		);
	},
);
DebouncedInput_.displayName = "@rtdui/DebouncedInput";

export const DebouncedInput = memo(DebouncedInput_);
