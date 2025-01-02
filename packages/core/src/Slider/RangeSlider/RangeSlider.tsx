import { forwardRef, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useMove, useUncontrolled } from "@rtdui/hooks";
import { getColor, getRadius, getSize } from "../../utils";
import { Track } from "../Track/Track";
import { Thumb } from "../Thumb/Thumb";
import { getPosition } from "../utils/get-position";
import { getChangeValue } from "../utils/get-change-value";
import { getPrecision } from "../utils/get-precision";
import { getFloatingValue } from "../utils/get-floating-value";
import { getClientPosition } from "../utils/get-client-position";
import { type TransitionProps } from "../../Transition";

export type RangeSliderValue = [number, number];

export interface RangeSliderProps
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
	value?: RangeSliderValue;

	/** Uncontrolled default value */
	defaultValue?: RangeSliderValue;

	/** Called when value changes */
	onChange?: (value: RangeSliderValue) => void;

	/** Called when user stops dragging slider or changes value with arrows */
	onChangeEnd?: (value: RangeSliderValue) => void;

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

	/** Minimal range interval
	 * @default 10
	 */
	minRange?: number;

	/** Maximum range interval
	 * @default Infinity
	 */
	maxRange?: number;

	/** First thumb aria-label */
	thumbFromLabel?: string;

	/** Second thumb aria-label */
	thumbToLabel?: string;

	/** Props passed down to the hidden input */
	hiddenInputProps?: React.ComponentPropsWithoutRef<"input">;
	/** 样式槽,可自定义内部组件的样式 */
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

export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
	(props, ref) => {
		const {
			value,
			onChange,
			onChangeEnd,
			size = "md",
			min = 0,
			max = 100,
			minRange = 10,
			maxRange,
			step = 1,
			precision: _precision,
			defaultValue,
			name,
			marks,
			label = (v) => v,
			labelTransitionProps = { transition: "fade", duration: 0 },
			labelAlwaysOn = false,
			thumbFromLabel,
			thumbToLabel,
			showLabelOnHover = true,
			thumbChildren,
			disabled = false,
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

		const [focused, setFocused] = useState(-1);
		const [hovered, setHovered] = useState(false);
		const [_value, setValue] = useUncontrolled<RangeSliderValue>({
			value,
			defaultValue,
			finalValue: [min!, max!],
			onChange,
		});
		const valueRef = useRef(_value);
		const thumbs = useRef<HTMLDivElement[]>([]);
		const thumbIndex = useRef<number | undefined>(undefined);
		const positions = [
			getPosition({ value: _value[0], min: min!, max: max! }),
			getPosition({ value: _value[1], min: min!, max: max! }),
		];

		const precision = _precision ?? getPrecision(step!);

		const _setValue = (val: RangeSliderValue) => {
			setValue(val);
			valueRef.current = val;
		};

		useEffect(() => {
			if (Array.isArray(value)) {
				valueRef.current = value;
			}
		}, [value]);

		const setRangedValue = (
			val: number,
			index: number,
			triggerChangeEnd: boolean,
		) => {
			const clone: RangeSliderValue = [...valueRef.current];
			clone[index] = val;

			if (index === 0) {
				if (val > clone[1] - (minRange! - 0.000000001)) {
					clone[1] = Math.min(val + minRange!, max!);
				}

				if (val > (max! - (minRange! - 0.000000001) || min!)) {
					clone[index] = valueRef.current[index];
				}

				if (clone[1] - val > maxRange!) {
					clone[1] = val + maxRange!;
				}
			}

			if (index === 1) {
				if (val < clone[0] + minRange!) {
					clone[0] = Math.max(val - minRange!, min!);
				}

				if (val < clone[0] + minRange!) {
					clone[index] = valueRef.current[index];
				}

				if (val - clone[0] > maxRange!) {
					clone[0] = val - maxRange!;
				}
			}

			clone[0] = getFloatingValue(clone[0], precision);
			clone[1] = getFloatingValue(clone[1], precision);

			_setValue(clone);

			if (triggerChangeEnd) {
				onChangeEnd?.(valueRef.current);
			}
		};

		const handleChange = (val: number) => {
			if (!disabled) {
				const nextValue = getChangeValue({
					value: val,
					min: min!,
					max: max!,
					step: step!,
					precision,
				});
				setRangedValue(nextValue, thumbIndex.current!, false);
			}
		};

		const { ref: container, active } = useMove(({ x }) => handleChange(x), {
			onScrubEnd: () => onChangeEnd?.(valueRef.current),
		});

		function handleThumbMouseDown(index: number) {
			thumbIndex.current = index;
		}

		const handleTrackMouseDownCapture = (
			event:
				| React.MouseEvent<HTMLDivElement>
				| React.TouchEvent<HTMLDivElement>,
		) => {
			container.current!.focus();
			const rect = container.current!.getBoundingClientRect();
			const changePosition = getClientPosition(event.nativeEvent);
			const changeValue = getChangeValue({
				value: changePosition - rect.left,
				max: max!,
				min: min!,
				step: step!,
				containerWidth: rect.width,
			});

			const nearestHandle =
				Math.abs(_value[0] - changeValue) > Math.abs(_value[1] - changeValue)
					? 1
					: 0;

			thumbIndex.current = nearestHandle;
		};

		const getFocusedThumbIndex = () => {
			if (focused !== 1 && focused !== 0) {
				setFocused(0);
				return 0;
			}

			return focused;
		};

		const handleTrackKeydownCapture = (
			event: React.KeyboardEvent<HTMLDivElement>,
		) => {
			if (!disabled) {
				switch (event.key) {
					case "ArrowUp":
					case "ArrowRight": {
						event.preventDefault();
						const focusedIndex = getFocusedThumbIndex();
						thumbs.current[focusedIndex].focus();
						setRangedValue(
							getFloatingValue(
								Math.min(
									Math.max(valueRef.current[focusedIndex] + step!, min!),
									max!,
								),
								precision,
							),
							focusedIndex,
							true,
						);
						break;
					}
					case "ArrowDown":
					case "ArrowLeft": {
						event.preventDefault();
						const focusedIndex = getFocusedThumbIndex();
						thumbs.current[focusedIndex].focus();
						setRangedValue(
							getFloatingValue(
								Math.min(
									Math.max(valueRef.current[focusedIndex] - step!, min!),
									max!,
								),
								precision,
							),
							focusedIndex,
							true,
						);
						break;
					}
					case "Home": {
						event.preventDefault();
						break;
					}

					case "End": {
						event.preventDefault();
						break;
					}
					default: {
						break;
					}
				}
			}
		};

		const sharedThumbProps = {
			max: max!,
			min: min!,
			size,
			labelTransitionProps,
			labelAlwaysOn,
			onBlur: () => setFocused(-1),
		};

		const hasArrayThumbChildren = Array.isArray(thumbChildren);

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
					offset={positions[0]}
					marksOffset={_value[0]}
					filled={positions[1] - positions[0]}
					marks={marks}
					inverted={inverted}
					min={min!}
					max={max!}
					value={_value[1]}
					disabled={disabled}
					containerProps={{
						ref: container as any,
						onMouseEnter: showLabelOnHover ? () => setHovered(true) : undefined,
						onMouseLeave: showLabelOnHover
							? () => setHovered(false)
							: undefined,
						onTouchStartCapture: handleTrackMouseDownCapture,
						onTouchEndCapture: () => {
							thumbIndex.current = -1;
						},
						onMouseDownCapture: handleTrackMouseDownCapture,
						onMouseUpCapture: () => {
							thumbIndex.current = -1;
						},
						onKeyDownCapture: handleTrackKeydownCapture,
					}}
					slots={slots}
				>
					<Thumb
						{...sharedThumbProps}
						value={scale!(_value[0])}
						position={positions[0]}
						dragging={active}
						label={
							typeof label === "function"
								? label(getFloatingValue(scale!(_value[0]), precision))
								: label
						}
						ref={(node) => {
							thumbs.current[0] = node!;
						}}
						thumbLabel={thumbFromLabel}
						onMouseDown={() => handleThumbMouseDown(0)}
						onFocus={() => setFocused(0)}
						showLabelOnHover={showLabelOnHover}
						isHovered={hovered}
						disabled={disabled}
						slots={slots}
					>
						{hasArrayThumbChildren ? thumbChildren[0] : thumbChildren}
					</Thumb>

					<Thumb
						{...sharedThumbProps}
						thumbLabel={thumbToLabel}
						value={scale!(_value[1])}
						position={positions[1]}
						dragging={active}
						label={
							typeof label === "function"
								? label(getFloatingValue(scale!(_value[1]), precision))
								: label
						}
						ref={(node) => {
							thumbs.current[1] = node!;
						}}
						onMouseDown={() => handleThumbMouseDown(1)}
						onFocus={() => setFocused(1)}
						showLabelOnHover={showLabelOnHover}
						isHovered={hovered}
						disabled={disabled}
						slots={slots}
					>
						{hasArrayThumbChildren ? thumbChildren[1] : thumbChildren}
					</Thumb>
				</Track>

				<input
					type="hidden"
					name={`${name}_from`}
					value={_value[0]}
					{...hiddenInputProps}
				/>
				<input
					type="hidden"
					name={`${name}_to`}
					value={_value[1]}
					{...hiddenInputProps}
				/>
			</div>
		);
	},
);

RangeSlider.displayName = "@rtdui/RangeSlider";
