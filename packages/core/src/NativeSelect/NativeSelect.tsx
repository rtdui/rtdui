import { forwardRef } from "react";
import clsx from "clsx";
import { InputBase, type InputBaseOwnProps } from "../InputBase";
import {
	ComboboxChevron,
	type ComboboxData,
	getParsedComboboxData,
} from "../Combobox";
import { NativeSelectOption } from "./NativeSelectOption";

export interface SelectNativeProps
	extends InputBaseOwnProps,
		Omit<React.ComponentPropsWithoutRef<"select">, "size"> {
	data?: ComboboxData;
}

export const NativeSelect = forwardRef<HTMLSelectElement, SelectNativeProps>(
	(props, ref) => {
		const { size, rightSection, error, data, children, ...others } = props;

		const options = getParsedComboboxData(data).map((item, index) => (
			<NativeSelectOption key={index} data={item} />
		));

		return (
			<InputBase
				as="select"
				ref={ref}
				{...others}
				size={size as any}
				pointer
				error={error}
				rightSection={
					rightSection || <ComboboxChevron size={size} error={error} />
				}
			>
				{children || options}
			</InputBase>
		);
	},
);

NativeSelect.displayName = "@rtdui/NativeSelect";
