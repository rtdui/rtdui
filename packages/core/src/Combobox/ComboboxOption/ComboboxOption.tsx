import { forwardRef, useId } from "react";
import clsx from "clsx";
import { useComboboxContext } from "../context";

export interface ComboboxOptionProps
	extends React.ComponentPropsWithoutRef<"div"> {
	/** Option value */
	value: string;

	/** Determines whether the option is selected */
	active?: boolean;

	/** Determines whether the option can be selected */
	disabled?: boolean;

	/** Determines whether item is selected, useful for virtualized comboboxes */
	selected?: boolean;
}

export const ComboboxOption = forwardRef<HTMLDivElement, ComboboxOptionProps>(
	(props, ref) => {
		const {
			className,
			style,
			onClick,
			id,
			active,
			onMouseDown,
			onMouseOver,
			disabled,
			selected,
			...others
		} = props;

		const ctx = useComboboxContext();
		const uuid = useId();
		const _id = id || uuid;

		return (
			<div
				className={clsx(
					"combobox-option",
					"p-(--combobox-option-padding) rounded-sm hover:bg-base-200 data-[combobox-selected=true]:bg-base-200",
					"cursor-pointer",
					{
						"[&]:bg-base-300": active,
						"[&]:cursor-not-allowed opacity-35": disabled,
					},
					className,
				)}
				{...others}
				ref={ref}
				id={_id}
				data-combobox-option
				data-combobox-active={active}
				data-combobox-disabled={disabled}
				data-combobox-selected={selected}
				role="option"
				aria-selected={selected}
				onClick={(event) => {
					if (!disabled) {
						ctx.onOptionSubmit?.(props.value, props);
						onClick?.(event);
					} else {
						event.preventDefault();
					}
				}}
				onMouseDown={(event) => {
					event.preventDefault();
					onMouseDown?.(event);
				}}
				onMouseOver={(event) => {
					if (ctx.resetSelectionOnOptionHover) {
						ctx.store.resetSelectedOption();
					}
					onMouseOver?.(event);
				}}
			/>
		);
	},
);

ComboboxOption.displayName = "@rtdui/core/ComboboxOption";
