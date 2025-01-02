import { ThemeSize } from "../theme.types";
import { createOptionalContext } from "../utils";

export interface ChipGroupContextValue {
	size?: ThemeSize;
	disabled: boolean | undefined;
}

export const [ChipGroupProvider, useChipGroupContext] =
	createOptionalContext<ChipGroupContextValue>();
