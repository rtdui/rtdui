import { forwardRef } from "react";
import clsx from "clsx";
import { useRadioGroupContext } from "../RadioGroup/RadioGroup.context";
import { createChainedFunction } from "../utils";
import type { ThemeBaseSize } from "../theme.types";

function areEqualValues(a: any, b: any) {
	if (typeof b === "object" && b !== null) {
		return a === b;
	}

	// The value could be a number, the DOM will stringify it anyway.
	return String(a) === String(b);
}

export interface RadioProps
	extends Omit<React.ComponentPropsWithoutRef<"input">, "size"> {
	color?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error";
	size?: ThemeBaseSize;
	label?: string;
	helperText?: string;
	slots?: {
		inputWrapper?: string;
		input?: string;
		label?: string;
		helperText?: string;
	};
}

/**
 * ref属性会转发至内部的input元素
 * 如果Radio在RadioGroup内,则自身的name,checked,size和color属性值会被忽略, 优先使用RadioGroup上下文提供的值
 * 自身的onChange事件会保留并优先触发, 以便用户应对特殊情况的特殊处理
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
	const {
		required,
		label,
		helperText,
		color: colorProp,
		size: sizeProp,
		name: nameProp,
		value: valueProp,
		checked: checkedProp,
		onChange: onChangeProp,
		disabled: disabledProp,
		className,
		children,
		slots,
		...other
	} = props;

	const radioGroup = useRadioGroupContext();

	let name = nameProp;
	let checked = checkedProp;
	let onChange = onChangeProp;
	let size = sizeProp;
	let color = colorProp;
	let disabled = disabledProp;

	// 在RadioGroup下时, 忽略自身的name,checked,size和color属性值, 优先使用RadioGroup上下文提供的值, 自身的onChange事件会保留
	if (radioGroup) {
		name = radioGroup.name;
		checked = areEqualValues(radioGroup.value, valueProp);
		onChange = createChainedFunction(onChangeProp, radioGroup?.onChange);
		size = radioGroup.size;
		color = radioGroup.color;
		disabled = radioGroup.disabled;
	}

	return (
		<div className={clsx("form-control", className)}>
			<div className={clsx("flex items-center gap-3", slots?.inputWrapper)}>
				<input
					ref={ref}
					type="radio"
					className={clsx(
						"radio",
						{
							"radio-primary": color === "primary",
							"radio-secondary": color === "secondary",
							"radio-accent": color === "accent",
							"radio-info": color === "info",
							"radio-success": color === "success",
							"radio-warning": color === "warning",
							"radio-error": color === "error",
							"radio-xs": size === "xs",
							"radio-sm": size === "sm",
							"radio-md": size === "md",
							"radio-lg": size === "lg",
							"radio-xl": size === "xl",
						},
						slots?.input,
					)}
					name={name}
					value={valueProp}
					checked={checked}
					onChange={onChange}
					disabled={disabled}
					{...other}
				/>
				{label && (
					<span
						className={clsx(
							{
								"text-gray-400": disabled,
							},
							slots?.label,
						)}
					>
						{label}
					</span>
				)}
			</div>
			{helperText && (
				<span className={clsx("label-text-alt pt-0.5", slots?.helperText)}>
					{helperText}
				</span>
			)}
		</div>
	);
});

Radio.displayName = "@rtdui/Radio";
