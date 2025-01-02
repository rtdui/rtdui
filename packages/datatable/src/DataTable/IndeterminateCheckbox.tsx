import React from "react";
import clsx from "clsx";

export interface IndeterminateCheckboxProps
	extends React.HTMLProps<HTMLInputElement> {
	indeterminate?: boolean;
}
export function IndeterminateCheckbox(props: IndeterminateCheckboxProps) {
	const { indeterminate, className = "", ...other } = props;

	const ref = React.useRef<HTMLInputElement>(null!);

	React.useEffect(() => {
		if (typeof indeterminate === "boolean") {
			ref.current.indeterminate = !other.checked && indeterminate;
		}
	}, [other.checked, indeterminate]);

	return (
		<input
			type="checkbox"
			ref={ref}
			className={clsx("checkbox checkbox-xs rounded", className)}
			onClick={(ev: React.MouseEvent) => ev.stopPropagation()}
			{...other}
		/>
	);
}
