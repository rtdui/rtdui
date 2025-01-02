import { forwardRef, useState } from "react";
import clsx from "clsx";
import { useId, useMergedRef, useMounted, useUncontrolled } from "@rtdui/hooks";
import { FloatingIndicator } from "../FloatingIndicator";

import { getColor, getRadius, getSize } from "../utils";

export interface FloatingSelectItem {
	value: string;
	label: React.ReactNode;
	disabled?: boolean;
}

export interface FloatingSelectProps
	extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> {
	/** Data based on which controls are rendered */
	data: (string | FloatingSelectItem)[];

	/** Controlled component value */
	value?: string;

	/** Uncontrolled component default value */
	defaultValue?: string;

	/** Called when value changes */
	onChange?: (value: string) => void;

	/** Determines whether the component is disabled */
	disabled?: boolean;

	/** Name of the radio group, by default random name is generated */
	name?: string;

	/** Determines whether the component should take 100% width of its parent, `false` by default */
	fullWidth?: boolean;

	/** Key of `theme.colors` or any valid CSS color, changes color of indicator, by default color is based on current color scheme */
	color?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error"
		| "neutral"
		| string;

	/** Controls `font-size`, `padding` and `height` properties
	 * @default "sm"
	 */
	size?: "xs" | "sm" | "md" | "lg" | "xl";

	/** Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem
	 * @default "sm"
	 */
	radius?: "xs" | "sm" | "md" | "lg" | "circle";

	/** Indicator `transition-duration` in ms, set `0` to turn off transitions
	 * @default 200
	 */
	transitionDuration?: number;

	/** Determines in which orientation component id displayed
	 * @default "horizontal"
	 */
	orientation?: "vertical" | "horizontal";

	/** Determines whether the value can be changed */
	readOnly?: boolean;

	/** Determines whether there should be borders between items
	 * @default true
	 */
	withItemsSeparator?: boolean;

	slots?: {
		indicator?: string;
	};
}

export const FloatingSelect = forwardRef<HTMLDivElement, FloatingSelectProps>(
	(props, ref) => {
		const {
			className,
			style,
			data,
			value,
			defaultValue,
			onChange,
			size = "sm",
			name,
			disabled,
			readOnly,
			fullWidth = false,
			orientation = "horizontal",
			radius = "sm",
			color,
			transitionDuration = 200,
			withItemsSeparator = true,
			slots,
			...others
		} = props;

		const _data = data.map((item) =>
			typeof item === "string" ? { label: item, value: item } : item,
		);

		const initialized = useMounted();
		const [parent, setParent] = useState<HTMLElement | null>(null);
		const [refs, setRefs] = useState<Record<string, HTMLElement | null>>({});
		const setElementRef = (element: HTMLElement | null, val: string) => {
			refs[val] = element;
			setRefs(refs);
		};

		const [_value, handleValueChange] = useUncontrolled({
			value,
			defaultValue,
			finalValue: Array.isArray(data)
				? (_data.find((item) => !item.disabled)?.value ??
					(data[0] as any)?.value ??
					null)
				: null,
			onChange,
		});

		const uuid = useId(name);

		const controls = _data.map((item) => {
			const actived = _value === item.value;
			return (
				<div
					key={item.value}
					className={clsx(
						"control",
						"relative flex-1 z-[2]",
						"[--separator-color:oklch(var(--b3))] first-of-type:[--separator-color:transparent]",
						{
							"cursor-default": readOnly,
							"cursor-not-allowed text-gray-400 dark:text-gray-600": disabled,
							"text-gray-500 dark:text-gray-500": !disabled && !actived,
							"text-gray-700 dark:text-gray-300": !disabled && actived,
							"text-gray-700 [&&]:dark:text-gray-400": disabled && actived,
							"before:absolute before:bg-[--separator-color] before:transition-[background-color] before:duration-[--sc-transition-duration]":
								withItemsSeparator,
							"[--separator-color:transparent] [&+.control]:[--separator-color:transparent]":
								withItemsSeparator && actived,
							"before:inset-y-0 before:left-0 before:w-px":
								withItemsSeparator && orientation === "horizontal",
							"before:inset-x-0 before:top-0 before:h-px":
								withItemsSeparator && orientation === "vertical",
						},
					)}
				>
					<input
						className={clsx("absolute w-0 h-0 overflow-hidden opacity-0")}
						disabled={disabled || item.disabled}
						type="radio"
						name={uuid}
						value={item.value}
						id={`${uuid}-${item.value}`}
						checked={_value === item.value}
						onChange={() => !readOnly && handleValueChange(item.value)}
					/>

					<label
						className={clsx(
							"block text-center text-nowrap overflow-hidden text-ellipsis select-none rounded-[--sc-radius] p-[--sc-padding] font-bold transition-all duration-[--sc-transition-duration]",
							{
								"text-[--sc-label-color]": actived && color !== undefined,
								"[&]:text-gray-400 [&]:dark:text-gray-400": actived && disabled,
								"[&&]:text-gray-300 [&&]:dark:text-gray-300":
									actived && disabled && color !== undefined,
								"cursor-default": readOnly,
								"cursor-not-allowed": disabled,
								"cursor-pointer": !readOnly && !disabled,
							},
						)}
						style={
							{
								"--sc-label-color": color !== undefined ? "white" : undefined,
							} as any
						}
						htmlFor={`${uuid}-${item.value}`}
						ref={(node) => setElementRef(node, item.value)}
					>
						<span className="relative z-[2]">{item.label}</span>
					</label>
				</div>
			);
		});

		const mergedRef = useMergedRef(ref, (node) => setParent(node));

		if (data.length === 0) {
			return null;
		}

		return (
			<div
				ref={mergedRef}
				{...others}
				className={clsx(
					"floating-select",
					"relative bg-base-200 overflow-hidden p-1 rounded-[--sc-radius] text-[length:--sc-font-size]",
					{
						"inline-flex w-auto": !fullWidth,
						flex: fullWidth,
						"flex flex-col w-max": orientation === "vertical",
						"w-auto": orientation === "vertical" && fullWidth,
					},
					className,
				)}
				style={
					{
						...style,
						"--sc-font-size-xs": "0.75rem",
						"--sc-font-size-sm": "0.875rem",
						"--sc-font-size-md": "1rem",
						"--sc-font-size-lg": "1.125rem",
						"--sc-font-size-xl": "1.25rem",
						"--sc-font-size": getSize(size, "sc-font-size"),
						"--sc-padding-xs": "3px 6px",
						"--sc-padding-sm": "5px 10px",
						"--sc-padding-md": "7px 14px",
						"--sc-padding-lg": "9px 16px",
						"--sc-padding-xl": "12px 20px",
						"--sc-padding": getSize(size, "sc-padding"),
						"--sc-transition-duration":
							transitionDuration === undefined
								? undefined
								: `${transitionDuration}ms`,
						"--sc-radius": radius === undefined ? undefined : getRadius(radius),
						"--sc-color": color === undefined ? undefined : getColor(color),
					} as any
				}
				role="radiogroup"
			>
				{typeof _value === "string" && (
					<FloatingIndicator
						as="span"
						target={refs[_value]}
						parent={parent}
						transitionDuration="var(--sc-transition-duration)"
						className={clsx(
							"z-[1] bg-white dark:bg-gray-600 rounded-[--sc-radius] shadow",
							{
								"[&]:bg-[--sc-color]": color,
							},
							slots?.indicator,
						)}
					/>
				)}

				{controls}
			</div>
		);
	},
);

FloatingSelect.displayName = "@rtdui/core/FloatingSelect";
