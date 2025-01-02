import { forwardRef, useCallback } from "react";
import clsx from "clsx";

export interface CheckboxProps
	extends Omit<React.ComponentPropsWithoutRef<"input">, "onChange" | "size"> {
	color?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error";
	size?: "xs" | "sm" | "md" | "lg";
	label?: string;
	helperText?: string;
	onChange?: (checked: boolean) => void;
	slots?: {
		input?: string;
		label?: string;
		helperText?: string;
	};
}

/** ref属性会转发至内部的input元素 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	(props, ref) => {
		const {
			required,
			label,
			helperText,
			color,
			size,
			onChange,
			className,
			children,
			slots,
			...other
		} = props;

		const handleCheckedChange = useCallback(
			(ev: React.ChangeEvent<HTMLInputElement>) => {
				if (onChange) {
					onChange(ev.target.checked);
				}
			},
			[onChange],
		);

		return (
			<div className={clsx("form-control", className)}>
				<div className="flex items-center gap-3">
					<input
						ref={ref}
						type="checkbox"
						className={clsx(
							"checkbox",
							{
								"checkbox-primary": color === "primary",
								"checkbox-secondary": color === "secondary",
								"checkbox-accent": color === "accent",
								"checkbox-info": color === "info",
								"checkbox-success": color === "success",
								"checkbox-warning": color === "warning",
								"checkbox-error": color === "error",
								"checkbox-xs": size === "xs",
								"checkbox-sm": size === "sm",
								"checkbox-md": size === "md",
								"checkbox-lg": size === "lg",
							},
							slots?.input,
						)}
						onChange={handleCheckedChange}
						{...other}
					/>
					{label && <span className={clsx(slots?.label)}>{label}</span>}
				</div>
				{helperText && (
					<span className="label-text-alt pt-0.5">{helperText}</span>
				)}
			</div>
		);
	},
);

Checkbox.displayName = "@rtdui/Checkbox";
