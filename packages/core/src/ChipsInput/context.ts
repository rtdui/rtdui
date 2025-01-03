import { createOptionalContext } from "../utils";
import type { ThemeSize } from "../theme.types";

export interface ChipGroupContextValue {
	size: ThemeSize;
	disabled: boolean | undefined;
}

export const [ChipGroupProvider, useChipGroupContext] =
	createOptionalContext<ChipGroupContextValue>();

export interface ChipsInputContextValue {
	fieldRef: React.MutableRefObject<HTMLInputElement | undefined>;
	size: ThemeSize;
	disabled: boolean | undefined;
	hasError: boolean | undefined;
}

export const [ChipsInputProvider, useChipsInputContext] =
	createOptionalContext<ChipsInputContextValue>();
