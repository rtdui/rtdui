import { forwardRef } from "react";
import { ColorSlider, type ColorSliderProps } from "../ColorSlider/ColorSlider";
import { round } from "../../utils";

export interface AlphaSliderProps
	extends Omit<ColorSliderProps, "maxValue" | "overlays" | "round"> {
	color: string;
}

export const AlphaSlider = forwardRef<HTMLDivElement, AlphaSliderProps>(
	(props, ref) => {
		const { value, onChange, onChangeEnd, color, ...others } = props;

		return (
			<ColorSlider
				{...others}
				ref={ref}
				value={value}
				onChange={(val) => onChange?.(round(val, 2))}
				onChangeEnd={(val) => onChangeEnd?.(round(val, 2))}
				maxValue={1}
				round={false}
				data-alpha
				overlays={[
					{
						backgroundImage:
							"linear-gradient(45deg, var(--slider-checkers) 25%, transparent 25%), linear-gradient(-45deg, var(--slider-checkers) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--slider-checkers) 75%), linear-gradient(-45deg, white 75%, var(--slider-checkers) 75%)",
						backgroundSize: "8px 8px",
						backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0",
					},
					{
						backgroundImage: `linear-gradient(90deg, transparent, ${color})`,
					},
					{
						boxShadow:
							"rgba(0, 0, 0, .1) 0 0 0 1px inset, rgb(0, 0, 0, .15) 0 0 4px inset",
					},
				]}
			/>
		);
	},
);

AlphaSlider.displayName = "@rtdui/core/AlphaSlider";
