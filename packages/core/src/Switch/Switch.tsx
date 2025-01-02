import { forwardRef, useCallback } from "react";
import clsx from "clsx";
import type { CheckboxProps } from "../Checkbox/Checkbox";

/**
 * Switch与Checkbox组件的属性相同.
 */
export interface SwitchProps extends CheckboxProps {
	/**
	 * 标签居左还是居右
	 * @default left
	 */
	labelPosition?: "left" | "right";
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
	(props, ref) => {
		const {
			required,
			label,
			labelPosition = "left",
			helperText,
			color,
			size,
			onChange,
			className,
			children,
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
			<div className="form-control">
				<div
					className={clsx("flex justify-between items-center gap-3", {
						"flex-row-reverse": labelPosition === "right",
					})}
				>
					{label && <span>{label}</span>}
					<input
						ref={ref}
						type="checkbox"
						className={clsx(
							"toggle",
							{
								"toggle-primary": color === "primary",
								"toggle-secondary": color === "secondary",
								"toggle-accent": color === "accent",
								"toggle-info": color === "info",
								"toggle-success": color === "success",
								"toggle-warning": color === "warning",
								"toggle-error": color === "error",
								"toggle-xs": size === "xs",
								"toggle-sm": size === "sm",
								"toggle-md": size === "md",
								"toggle-lg": size === "lg",
							},
							className,
						)}
						onChange={handleCheckedChange}
						{...other}
					/>
				</div>
				{helperText && (
					<span className="label-text-alt pt-0.5">{helperText}</span>
				)}
			</div>
		);
	},
);

Switch.displayName = "@rtdui/Switch";
