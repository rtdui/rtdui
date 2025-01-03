import { forwardRef } from "react";
import clsx from "clsx";
import { Popover, type PopoverDropdownProps } from "../../Popover";
import { useComboboxContext } from "../context";
import { getSize } from "../../utils";

export interface ComboboxDropdownProps extends PopoverDropdownProps {
	/** Determines whether the dropdown should be hidden, for example, when there are no options to display */
	hidden?: boolean;
}

export const ComboboxDropdown = forwardRef<
	HTMLDivElement,
	ComboboxDropdownProps
>((props, ref) => {
	const { className, style, hidden, ...others } = props;
	const ctx = useComboboxContext();

	return (
		<Popover.Dropdown
			{...others}
			ref={ref}
			role="presentation"
			data-hidden={hidden || undefined}
			className={clsx(
				{
					"[&]:hidden": hidden,
				},
				className,
			)}
			style={
				{
					...style,
					padding: ctx.dropdownPadding,
					"--combobox-option-padding-xs": "4px 8px",
					"--combobox-option-padding-sm": "6px 10px",
					"--combobox-option-padding-md": "8px 12px",
					"--combobox-option-padding-lg": "10px 16px",
					"--combobox-option-padding-xl": "14px 20px",
					"--combobox-option-padding": getSize(
						ctx.optionPadding,
						"combobox-option-padding",
					),
				} as any
			}
		/>
	);
});

ComboboxDropdown.displayName = "@rtdui/core/ComboboxDropdown";
