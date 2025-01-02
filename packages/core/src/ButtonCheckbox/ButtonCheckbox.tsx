import { forwardRef, useCallback } from "react";
import clsx from "clsx";
import type { ButtonProps } from "../Button/Button";

export interface ButtonCheckboxProps
	extends Omit<
			React.ComponentPropsWithoutRef<"input">,
			"color" | "onChange" | "size"
		>,
		Pick<
			ButtonProps,
			| "color"
			| "size"
			| "sharp"
			| "ghost"
			| "link"
			| "glass"
			| "fullWidth"
			| "outline"
		> {
	label?: string;
	onChange?: (checked: boolean) => void;
}

/** ref属性会转发至内部的input元素 */
export const ButtonCheckbox = forwardRef<HTMLInputElement, ButtonCheckboxProps>(
	(props, ref) => {
		const {
			label,
			color,
			size,
			sharp,
			ghost,
			link,
			glass,
			fullWidth,
			outline,
			className,
			children,
			onChange,
			...other
		} = props;

		const handleCheckedChange = useCallback(
			(ev: React.ChangeEvent<HTMLInputElement>) => {
				onChange?.(ev.target.checked);
			},
			[onChange],
		);

		return (
			<input
				ref={ref}
				type="checkbox"
				aria-label={label}
				className={clsx(
					"btn",
					{
						"btn-primary": color === "primary",
						"btn-secondary": color === "secondary",
						"btn-accent": color === "accent",
						"btn-info": color === "info",
						"btn-success": color === "success",
						"btn-warning": color === "warning",
						"btn-error": color === "error",
						"btn-neutral": color === "neutral",
						"btn-xs": size === "xs",
						"btn-sm": size === "sm",
						"btn-md": size === "md",
						"btn-lg": size === "lg",
						"btn-square": sharp === "square",
						"btn-circle": sharp === "circle",
						"btn-ghost": ghost === true,
						"btn-link normal-case": link === true,
						glass: glass === true,
						"btn-block": fullWidth === true,
						"btn-outline": outline,
					},
					className,
				)}
				onChange={handleCheckedChange}
			/>
		);
	},
);

ButtonCheckbox.displayName = "@rtdui/ButtonCheckbox";
