import type { ThemeSize } from "../theme.types";
import { createOptionalContext } from "../utils";

export interface ChipGroupContextValue {
  size?: ThemeSize;
  disabled: boolean | undefined;
}

export const [ChipGroupContext, useChipGroupContext] =
  createOptionalContext<ChipGroupContextValue>();
