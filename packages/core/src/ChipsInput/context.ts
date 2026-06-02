import { createOptionalContext } from "../utils";
import type { ThemeSize } from "../theme.types";

export interface ChipGroupContextValue {
  size: ThemeSize;
  disabled?: boolean;
}

export const [ChipGroupProvider, useChipGroupContext] =
  createOptionalContext<ChipGroupContextValue>();

export interface ChipsInputContextValue {
  fieldRef: React.RefObject<HTMLInputElement | null>;
  size: ThemeSize;
  disabled?: boolean;
  hasError?: boolean;
}

export const [ChipsInputContext, useChipsInputContext] =
  createOptionalContext<ChipsInputContextValue>();
