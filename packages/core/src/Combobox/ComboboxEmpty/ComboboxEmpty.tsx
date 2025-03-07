import type React from "react";
import { forwardRef } from "react";
import clsx from "clsx";

export type ComboboxEmptyStylesNames = "empty";

export interface ComboboxEmptyProps
	extends React.ComponentPropsWithoutRef<"div"> {}

export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(
	(props, ref) => {
		const { className, ...others } = props;
		return (
			<div
				ref={ref}
				className={clsx(
					"combobox-option-empty",
					"flex justify-center items-center text-gray-500",
					"p-(--combobox-option-padding)",
					className,
				)}
				{...others}
			/>
		);
	},
);

ComboboxEmpty.displayName = "@rtdui/core/ComboboxEmpty";
