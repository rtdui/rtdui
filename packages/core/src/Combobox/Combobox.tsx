import type React from "react";
import { Popover, type PopoverProps } from "../Popover";
import { ComboboxProvider } from "./context";
import { ComboboxChevron } from "./ComboboxChevron/ComboboxChevron";
import { ComboboxClearButton } from "./ComboboxClearButton/ComboboxClearButton";
import { ComboboxDropdown } from "./ComboboxDropdown/ComboboxDropdown";
import { ComboboxDropdownTarget } from "./ComboboxDropdownTarget/ComboboxDropdownTarget";
import { ComboboxEmpty } from "./ComboboxEmpty/ComboboxEmpty";
import { ComboboxEventsTarget } from "./ComboboxEventsTarget/ComboboxEventsTarget";
import { ComboboxFooter } from "./ComboboxFooter/ComboboxFooter";
import { ComboboxGroup } from "./ComboboxGroup/ComboboxGroup";
import { ComboboxHeader } from "./ComboboxHeader/ComboboxHeader";
import { ComboboxHiddenInput } from "./ComboboxHiddenInput/ComboboxHiddenInput";
import {
	ComboboxOption,
	type ComboboxOptionProps,
} from "./ComboboxOption/ComboboxOption";
import { ComboboxOptions } from "./ComboboxOptions/ComboboxOptions";
import { ComboboxSearch } from "./ComboboxSearch/ComboboxSearch";
import { ComboboxTarget } from "./ComboboxTarget/ComboboxTarget";
import { type ComboboxStore, useCombobox } from "./use-combobox/use-combobox";
import type { ThemeBaseSize, ThemeSize } from "../theme.types";

export type ComboboxStylesNames =
	| "options"
	| "dropdown"
	| "option"
	| "search"
	| "empty"
	| "footer"
	| "header"
	| "group"
	| "groupLabel";

export type ComboboxCSSVariables = {
	options: "--combobox-option-fz" | "--combobox-option-padding";
	dropdown:
		| "--combobox-padding"
		| "--combobox-option-fz"
		| "--combobox-option-padding";
};

export interface ComboboxProps extends PopoverProps {
	/** Combobox content */
	children?: React.ReactNode;

	/** Combobox store, can be used to control combobox state */
	store?: ComboboxStore;

	/** Called when item is selected with `Enter` key or by clicking it */
	onOptionSubmit?: (value: string, optionProps: ComboboxOptionProps) => void;

	/** Controls items `font-size` and `padding`
	 * @default "sm" */
	size?: ThemeSize;

	/** Controls `padding` of the dropdown
	 * @default 4
	 */
	dropdownPadding?: React.CSSProperties["padding"];

	/** Controls `padding` of the Option
	 * @default sm
	 */
	optionPadding?: ThemeBaseSize;

	/** Determines whether selection should be reset when option is hovered
	 * @default false
	 */
	resetSelectionOnOptionHover?: boolean;

	/** Determines whether Combobox value can be changed */
	readOnly?: boolean;
}

export function Combobox(props: ComboboxProps) {
	const {
		children,
		store: controlledStore,
		onOptionSubmit,
		size = "sm",
		dropdownPadding = 4,
		optionPadding = "sm",
		resetSelectionOnOptionHover = true,
		readOnly,
		/*-- popover props --*/
		width = "target",
		keepMounted = false,
		withinPortal = true,
		onClose,
		...others
	} = props;

	const uncontrolledStore = useCombobox();
	const store = controlledStore || uncontrolledStore;

	const onDropdownClose = () => {
		onClose?.();
		store.closeDropdown();
	};

	return (
		<ComboboxProvider
			value={{
				store,
				onOptionSubmit,
				size: size,
				resetSelectionOnOptionHover,
				readOnly,
				dropdownPadding,
				optionPadding,
			}}
		>
			<Popover
				width={width}
				withinPortal={withinPortal}
				keepMounted={keepMounted}
				{...others}
				opened={store.dropdownOpened}
				onClose={onDropdownClose}
			>
				{children}
			</Popover>
		</ComboboxProvider>
	);
}

Combobox.displayName = "@rtdui/core/Combobox";

Combobox.Target = ComboboxTarget;
Combobox.Trigger = ComboboxTarget;
Combobox.Dropdown = ComboboxDropdown;
Combobox.Options = ComboboxOptions;
Combobox.Option = ComboboxOption;
Combobox.Search = ComboboxSearch;
Combobox.Empty = ComboboxEmpty;
Combobox.Chevron = ComboboxChevron;
Combobox.Footer = ComboboxFooter;
Combobox.Header = ComboboxHeader;
Combobox.EventsTarget = ComboboxEventsTarget;
Combobox.DropdownTarget = ComboboxDropdownTarget;
Combobox.Group = ComboboxGroup;
Combobox.ClearButton = ComboboxClearButton;
Combobox.HiddenInput = ComboboxHiddenInput;
