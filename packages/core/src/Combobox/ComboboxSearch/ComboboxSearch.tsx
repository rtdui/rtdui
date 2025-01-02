import { forwardRef } from "react";
import clsx from "clsx";
import { useMergedRef } from "@rtdui/hooks";
import { TextInput, TextInputProps } from "../../TextInput";
import { useComboboxContext } from "../context";
import { useComboboxTargetProps } from "../ComboboxTarget/use-combobox-target-props";

export interface ComboboxSearchProps extends TextInputProps {
	/** Determines whether the search input should have `aria-` attribute, `true` by default */
	withAriaAttributes?: boolean;

	/** Determines whether the search input should handle keyboard navigation, `true` by default */
	withKeyboardNavigation?: boolean;
}

export const ComboboxSearch = forwardRef<HTMLInputElement, ComboboxSearchProps>(
	(props, ref) => {
		const {
			withAriaAttributes = true,
			onKeyDown,
			withKeyboardNavigation = true,
			className,
			...others
		} = props;

		const ctx = useComboboxContext();

		const targetProps: any = useComboboxTargetProps({
			targetType: "input",
			withAriaAttributes,
			withKeyboardNavigation,
			withExpandedAttribute: false,
			onKeyDown,
			autoComplete: "off",
		});

		return (
			<TextInput
				ref={useMergedRef(ref, ctx.store.searchRef)}
				className={clsx("search", className)}
				{...targetProps}
				{...others}
			/>
		);
	},
);

ComboboxSearch.displayName = "@rtdui/core/ComboboxSearch";
