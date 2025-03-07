import { createOptionalContext } from "../utils";
import type { ThemeBaseSize } from "../theme.types";

export interface RadioGroupContextValue {
	name: string | undefined;
	value: any;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	/**
	 *
	 * @default sm
	 */
	size?: ThemeBaseSize;
	color?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error";
	disabled?: boolean;
}

export const [RadioGroupProvider, useRadioGroupContext] =
	createOptionalContext<RadioGroupContextValue>();
