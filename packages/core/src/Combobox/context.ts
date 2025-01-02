import { CSSProperties } from "react";
import { ThemeBaseSize, ThemeSize } from "../theme.types";
import { createSafeContext } from "../utils";
import type { ComboboxOptionProps } from "./ComboboxOption/ComboboxOption";
import type { ComboboxStore } from "./use-combobox/use-combobox";

export interface ComboboxContextValue {
	store: ComboboxStore;
	onOptionSubmit?: (value: string, optionProps: ComboboxOptionProps) => void;
	size: ThemeSize;
	dropdownPadding: CSSProperties["padding"];
	optionPadding: ThemeBaseSize;
	resetSelectionOnOptionHover: boolean | undefined;
	readOnly: boolean | undefined;
}

export const [ComboboxProvider, useComboboxContext] =
	createSafeContext<ComboboxContextValue>(
		"Combobox context was not found in tree",
	);
