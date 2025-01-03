import { useState, useEffect, useRef, forwardRef } from "react";
import clsx from "clsx";
import { useMergedRef } from "@rtdui/hooks";
import type { KeenSliderOptions, TrackDetails } from "keen-slider";
import { useKeenSlider } from "./useKeenSlider";

export interface WheelProps
	extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> {
	initIdx?: number;
	label?: string;
	/** wheels number */
	length: number;
	loop?: boolean;
	perspective?: "left" | "right" | "center";
	/** custom render value function */
	getValue?: (relative: number, absolute: number) => string;
	onChange?: (rel: number) => void;
	onChangeEnd?: (rel: number) => void;
	width: number;
	disabled?: boolean;
	slots?: {
		top?: string;
		inner?: string;
		bottom?: string;
	};
}
export const Wheel = forwardRef<HTMLDivElement, WheelProps>((props, ref) => {
	const {
		perspective = "center",
		length,
		loop,
		initIdx = 0,
		getValue,
		label,
		width,
		onChange,
		onChangeEnd,
		disabled,
		className,
		slots,
	} = props;
	const wheelSize = 20;
	const slideDegree = 360 / wheelSize;
	const slidesPerView = loop ? 9 : 1;
	const [sliderState, setSliderState] = useState<TrackDetails | null>(null);
	const size = useRef(0);
	const options = useRef<KeenSliderOptions>({
		slides: {
			number: length,
			origin: loop ? "center" : "auto",
			perView: slidesPerView,
		},
		vertical: true,
		initial: initIdx,
		loop,
		disabled,
		dragSpeed: (val) => {
			const height = size.current;
			return (
				val *
				(height /
					((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) /
					slidesPerView)
			);
		},
		created: (s) => {
			size.current = s.size;
		},
		updated: (s) => {
			size.current = s.size;
		},
		detailsChanged: (s) => {
			setSliderState(s.track.details);
		},
		slideChanged: (s) => {
			onChange?.(s.track.details.rel);
		},
		animationEnded: (s) => {
			onChangeEnd?.(s.track.details.rel);
		},
		rubberband: !loop,
		mode: "free-snap",
	});

	const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(options.current);

	const [radius, setRadius] = useState(0);

	useEffect(() => {
		if (slider.current) setRadius(slider.current.size / 2);
	}, [slider]);

	function slideValues() {
		if (!sliderState) return [];
		const offset = loop ? 1 / 2 - 1 / slidesPerView / 2 : 0;

		const values = [];
		for (let i = 0; i < length; i++) {
			const distance = sliderState
				? (sliderState.slides[i].distance - offset) * slidesPerView
				: 0;
			const rotate =
				Math.abs(distance) > wheelSize / 2
					? 180
					: distance * (360 / wheelSize) * -1;
			const style = {
				transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
			};
			const value = getValue
				? getValue(i, sliderState.abs + Math.round(distance))
				: i;
			values.push({ style, value });
		}
		return values;
	}

	const _ref = useMergedRef(ref, sliderRef);

	return (
		<div
			ref={_ref}
			className={clsx(
				`wheel keen-slider wheel--perspective-${perspective}`,
				"w-full h-full",
				"bg-base-100 text-base-content overflow-hidden",
				{
					"rounded-s-md": perspective === "right",
					"rounded-e-md": perspective === "left",
				},
				className,
			)}
		>
			<div
				className={clsx(
					"wheel__shadow-top",
					"relative left-0 w-full h-[calc(42%+2px)] z-10",
					// "-mt-0.5 border-b-[rgba(255,255,255,0.3)] border-b-[length:0.5px] [background:linear-gradient(to_bottom,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.5)_100%)]",
					"[background:linear-gradient(to_bottom,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.6)_100%)]",
					"dark:[background:linear-gradient(to_bottom,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.6)_100%)]",
					slots?.top,
				)}
				style={{
					transform: `translateZ(${radius}px)`,
				}}
			/>
			<div
				className={clsx(
					"wheel__inner",
					"flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d] w-full h-[16%]",
					"bg-base-300",
					{
						"[perspective-origin:calc(50%+100px)_50%]": perspective === "right",
						"[perspective-origin:calc(50%-100px)_50%]": perspective === "left",
					},
					slots?.inner,
				)}
			>
				<div
					className={clsx("wheel__slides", "relative w-full h-full")}
					style={{ width: `${width}px` }}
				>
					{slideValues().map(({ style, value }, idx) => (
						<div
							className={clsx(
								"wheel__slide",
								"absolute w-full h-full flex items-center justify-end [backface-visibility:hidden] text-xl",
							)}
							style={style}
							key={idx}
						>
							<span>{value}</span>
						</div>
					))}
				</div>
				{label && (
					<div
						className={clsx(
							"wheel__label",
							"font-medium text-[15px] leading-none mt-px ml-[5px]",
						)}
						style={{
							transform: `translateZ(${radius}px)`,
						}}
					>
						{label}
					</div>
				)}
			</div>
			<div
				className={clsx(
					"wheel__shadow-bottom",
					"relative left-0 w-full h-[calc(42%+2px)] z-10",
					// "mt-0.5 border-t-[rgba(255,255,255,0.3)] border-t-[length:0.5px] [background:linear-gradient(to_bottom,var(--b1)_0%,rgba(0,0,0,0.9)_100%)]",
					"[background:linear-gradient(to_bottom,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.95)_100%)]",
					"dark:[background:linear-gradient(to_bottom,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.95)_100%)]",
					slots?.bottom,
				)}
				style={{
					transform: `translateZ(${radius}px)`,
				}}
			/>
		</div>
	);
});

Wheel.displayName = "@rtdui/dates/Wheel";
