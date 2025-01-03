import { forwardRef } from "react";
import { InputBase, type InputBaseOwnProps } from "../InputBase";
import type { ThemeSize } from "../theme.types";

export interface TextInputProps
	extends InputBaseOwnProps,
		Omit<React.ComponentPropsWithoutRef<"input">, "size"> {
	size?: ThemeSize;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	(props, ref) => {
		//@ts-expect-error size type incompatible
		return <InputBase as="input" ref={ref} {...props} />;
	},
);

TextInput.displayName = "@rtdui/TextInput";
