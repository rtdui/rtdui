import { cloneElement, forwardRef, isValidElement } from "react";
import { useMergedRef } from "@rtdui/hooks";
import { useComboboxContext } from "../context";
import { useComboboxTargetProps } from "../ComboboxTarget/use-combobox-target-props";

export interface ComboboxEventsTargetProps {
	/** Target element */
	children: React.ReactNode;

	/** Key of the prop that should be used to access element ref */
	refProp?: string;

	/** Determines whether component should respond to keyboard events, `true` by default */
	withKeyboardNavigation?: boolean;

	/** Determines whether the target should have `aria-` attributes, `true` by default */
	withAriaAttributes?: boolean;

	/** Determines whether the target should have `aria-expanded` attribute, `false` by default */
	withExpandedAttribute?: boolean;

	/** Determines which events should be handled by the target element.
	 * `button` target type handles `Space` and `Enter` keys to toggle dropdown opened state.
	 * `input` by default.
	 * */
	targetType?: "button" | "input";

	/** Input autocomplete attribute */
	autoComplete?: string;
}

export const ComboboxEventsTarget = forwardRef<
	HTMLElement,
	ComboboxEventsTargetProps
>((props, ref) => {
	const {
		children,
		refProp = "ref",
		withKeyboardNavigation = true,
		withAriaAttributes = true,
		withExpandedAttribute = false,
		targetType = "input",
		autoComplete = "off",
		...others
	} = props;

	if (!isValidElement(children)) {
		throw new Error(
			"Combobox.EventsTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported",
		);
	}

	const ctx = useComboboxContext();
	const targetProps = useComboboxTargetProps({
		targetType,
		withAriaAttributes,
		withKeyboardNavigation,
		withExpandedAttribute,
		onKeyDown: children.props.onKeyDown,
		autoComplete,
	});

	return cloneElement(children, {
		...targetProps,
		...others,
		[refProp!]: useMergedRef(ref, ctx.store.targetRef, (children as any)?.ref),
	});
});

ComboboxEventsTarget.displayName = "@rtdui/core/ComboboxEventsTarget";
