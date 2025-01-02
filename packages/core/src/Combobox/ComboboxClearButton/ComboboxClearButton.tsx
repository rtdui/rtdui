import { forwardRef } from "react";
import clsx from "clsx";
import { ButtonProps } from "../../Button";
import { ThemeSize } from "../../theme.types";
import { CloseButton } from "../../CloseButton";

export interface ComboboxClearButtonProps extends Omit<ButtonProps, "size"> {
	onClear: () => void;
	size?: ThemeSize;
}

export const ComboboxClearButton = forwardRef<
	HTMLButtonElement,
	ComboboxClearButtonProps
>((props, ref) => {
	const {
		size = "sm",
		onMouseDown,
		onClick,
		onClear,
		className,
		style,
		...others
	} = props;
	return (
		<CloseButton
			ref={ref}
			size="xs"
			{...others}
			tabIndex={-1}
			aria-hidden
			onMouseDown={(event) => {
				event.preventDefault();
				onMouseDown?.(event);
			}}
			onClick={(event) => {
				onClear();
				onClick?.(event);
			}}
		/>
	);
});

ComboboxClearButton.displayName = "@rtdui/core/ComboboxClearButton";
