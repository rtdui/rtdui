import { forwardRef, useEffect } from "react";
import clsx from "clsx";
import { useId } from "@rtdui/hooks";
import { useComboboxContext } from "../context";

export interface ComboboxOptionsProps
	extends React.ComponentPropsWithoutRef<"div"> {
	/** Id of the element that should label the options list */
	labelledBy?: string;
}

export const ComboboxOptions = forwardRef<HTMLDivElement, ComboboxOptionsProps>(
	(props, ref) => {
		const { className, style, id, onMouseDown, labelledBy, ...others } = props;
		const ctx = useComboboxContext();
		const _id = useId(id);

		useEffect(() => {
			ctx.store.setListId(_id);
		}, [_id]);

		return (
			<div
				ref={ref}
				className={clsx("combobox-options", "text-sm", className)}
				{...others}
				id={_id}
				role="listbox"
				aria-labelledby={labelledBy}
				onMouseDown={(event) => {
					event.preventDefault();
					onMouseDown?.(event);
				}}
			/>
		);
	},
);

ComboboxOptions.displayName = "@rtdui/core/ComboboxOptions";
