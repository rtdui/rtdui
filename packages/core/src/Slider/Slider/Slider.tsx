import { forwardRef, useCallback, useRef, useState } from "react";
import clsx from "clsx";
import { clamp, useMergedRef, useMove, useUncontrolled } from "@rtdui/hooks";
import { Track } from "../Track/Track";
import { Thumb } from "../Thumb/Thumb";
import { getPosition } from "../utils/get-position";
import { getChangeValue } from "../utils/get-change-value";
import { getFloatingValue } from "../utils/get-floating-value";
import { getPrecision } from "../utils/get-precision";
import { getColor, getRadius, getSize } from "../../utils";
import { type TransitionProps } from "../../Transition";

export interface SliderProps
	extends Omit<
		React.ComponentPropsWithoutRef<"div">,
		"onChange" | "value" | "defaultValue"
	> {
	/** Key of Preset or any valid CSS color, controls color of track and thumb
	 * @default 'primary'
	 */
	color?:
		| "neutral"
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error"
		| React.CSSProperties["color"];

	/** Key of Preset or any valid CSS value to set border-radius
	 * @default 'xl'
	 */
	radius?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

	/** Controls size of the track
	 * @default 'md'
	 */
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | string | number;

	/** Minimal possible value
	 * @default 0
	 */
	min?: number;

	/** Maximum possible value
	 * @default 100
	 */
	max?: number;

	/** Number by which value will be incremented/decremented with thumb drag and arrows
	 * @default 1
	 */
	step?: number;

	/** Number of significant digits after the decimal point */
	precision?: number;

	/** Controlled value */
	value?: number;

	/** Uncontrolled default value */
	defaultValue?: number;

	/** Called when value changes */
	onChange?: (value: number) => void;

	/** Called when user stops dragging slider or changes value with arrows */
	onChangeEnd?: (value: number) => void;

	/** Hidden input name, use with uncontrolled component */
	name?: string;

	/** Marks displayed on the track */
	marks?: { value: number; label?: React.ReactNode }[];

	/** Function to generate label or any react node to render instead, set to null to disable label
	 * @default (v) => v
	 */
	label?: React.ReactNode | ((value: number) => React.ReactNode);

	/** Props passed down to the Transition component,
	 * @default {transition: 'fade', duration: 150 }
	 */
	labelTransitionProps?: Pick<
		TransitionProps,
		"transition" | "duration" | "timingFunction"
	>;

	/** Determines whether the label should be visible when the slider is not being dragged or hovered
	 * @default false
	 */
	labelAlwaysOn?: boolean;

	/** Thumb aria-label */
	thumbLabel?: string;

	/** Determines whether thumb label should be displayed when the slider is hovered,
	 * @default true
	 */
	showLabelOnHover?: boolean;

	/** Content rendered inside thumb */
	thumbChildren?: React.ReactNode;

	/** Disables slider */
	disabled?: boolean;

	/** Thumb width and height
	 * @default size*2
	 */
	thumbSize?: number | string;

	/** A transformation function to change the scale of the slider
	 * @default (v) => v
	 */
	scale?: (value: number) => number;

	/** Determines whether track values representation should be inverted
	 * @default false
	 */
	inverted?: boolean;

	/** Props passed down to the hidden input */
	hiddenInputProps?: React.ComponentPropsWithoutRef<"input">;
	/** 样式槽, 可自定义内部组件的样式 */
	slots?: {
		root?: string;
		trackContainer?: string;
		track?: string;
		bar?: string;
		mark?: string;
		markLabel?: string;
		thumb?: string;
		label?: string;
	};
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
	const {
		value,
		onChange,
		onChangeEnd,
		size = "md",
		min = 0,
		max = 100,
		step = 1,
		precision: _precision,
		defaultValue,
		name,
		marks = [],
		label = (v) => v,
		labelTransitionProps = { transition: "fade", duration: 0 },
		labelAlwaysOn = false,
		thumbLabel,
		showLabelOnHover = true,
		thumbChildren,
		disabled,
		scale = (v) => v,
		inverted,
		className,
		style,
		hiddenInputProps,
		color = "primary",
		radius = "9999rem",
		thumbSize,
		slots,
		...others
	} = props;

	const [hovered, setHovered] = useState(false);
	const [_value, setValue] = useUncontrolled({
		value: typeof value === "number" ? clamp(value, min!, max!) : value,
		defaultValue:
			typeof defaultValue === "number"
				? clamp(defaultValue, min!, max!)
				: defaultValue,
		finalValue: clamp(0, min!, max!),
		onChange,
	});

	const valueRef = useRef(_value);
	const thumb = useRef<HTMLDivElement>();
	const position = getPosition({ value: _value, min: min!, max: max! });
	const scaledValue = scale!(_value);
	const _label = typeof label === "function" ? label(scaledValue) : label;
	const precision = _precision ?? getPrecision(step!);

	const handleChange = useCallback(
		({ x }: { x: number }) => {
			if (!disabled) {
				const nextValue = getChangeValue({
					value: x,
					min: min!,
					max: max!,
					step: step!,
					precision,
				});
				setValue(nextValue);
				valueRef.current = nextValue;
			}
		},
		[disabled, min, max, step, precision, setValue],
	);

	const { ref: container, active } = useMove(handleChange, {
		onScrubEnd: () => onChangeEnd?.(valueRef.current),
	});

	const handleTrackKeydownCapture = (
		event: React.KeyboardEvent<HTMLDivElement>,
	) => {
		if (!disabled) {
			switch (event.key) {
				case "ArrowUp":
				case "ArrowRight": {
					event.preventDefault();
					thumb.current?.focus();
					const nextValue = getFloatingValue(
						Math.min(Math.max(_value + step!, min!), max!),
						precision,
					);
					onChangeEnd?.(nextValue);
					setValue(nextValue);
					break;
				}
				case "ArrowDown":
				case "ArrowLeft": {
					event.preventDefault();
					thumb.current?.focus();
					const nextValue = getFloatingValue(
						Math.min(Math.max(_value - step!, min!), max!),
						precision,
					);
					onChangeEnd?.(nextValue);
					setValue(nextValue);
					break;
				}

				case "Home": {
					event.preventDefault();
					thumb.current?.focus();
					onChangeEnd?.(min!);
					setValue(min!);
					break;
				}

				case "End": {
					event.preventDefault();
					thumb.current?.focus();
					onChangeEnd?.(max!);
					setValue(max!);
					break;
				}

				default: {
					break;
				}
			}
		}
	};

	return (
		<div
			{...others}
			ref={ref}
			tabIndex={-1}
			className={clsx("slider", slots?.root, className)}
			style={
				{
					"--slider-size": getSize(size, "slider-size"),
					"--slider-color": getColor(color),
					"--slider-radius": getRadius(radius),
					"--slider-thumb-size": getSize(thumbSize, "slider-size"),
				} as any
			}
		>
			<Track
				inverted={inverted}
				offset={0}
				filled={position}
				marks={marks}
				min={min!}
				max={max!}
				value={scaledValue}
				disabled={disabled}
				containerProps={{
					ref: container as any,
					onMouseEnter: showLabelOnHover ? () => setHovered(true) : undefined,
					onMouseLeave: showLabelOnHover ? () => setHovered(false) : undefined,
					onTouchStartCapture: () => container.current?.focus(),
					onMouseDownCapture: () => container.current?.focus(),
					onKeyDownCapture: handleTrackKeydownCapture,
				}}
				slots={slots}
			>
				<Thumb
					max={max!}
					min={min!}
					value={scaledValue}
					position={position}
					dragging={active}
					label={_label}
					ref={thumb as any}
					labelTransitionProps={labelTransitionProps}
					labelAlwaysOn={labelAlwaysOn}
					thumbLabel={thumbLabel}
					showLabelOnHover={showLabelOnHover}
					isHovered={hovered}
					disabled={disabled}
					slots={slots}
				>
					{thumbChildren}
				</Thumb>
			</Track>

			<input
				type="hidden"
				name={name}
				value={scaledValue}
				{...hiddenInputProps}
			/>
		</div>
	);
});

Slider.displayName = "@rtdui/Slider";
