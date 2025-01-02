import { forwardRef } from "react";
import clsx from "clsx";
import { ColorSwatch } from "../../ColorSwatch";

export interface SwatchesProps extends React.ComponentPropsWithoutRef<"div"> {
	size?: string | number;
	data: string[];
	swatchesPerRow?: number;
	focusable?: boolean;
	onChangeEnd?: (color: string) => void;
	setValue: (value: string) => void;
}

export const Swatches = forwardRef<HTMLDivElement, SwatchesProps>(
	(props, ref) => {
		const {
			style,
			className,
			datatype,
			setValue,
			onChangeEnd,
			size,
			focusable,
			data,
			swatchesPerRow = 7,
			...others
		} = props;

		const colors = data.map((color, index) => (
			<ColorSwatch
				as="button"
				type="button"
				color={color}
				key={index}
				radius="sm"
				onClick={() => {
					setValue(color);
					onChangeEnd?.(color);
				}}
				aria-label={color}
				tabIndex={focusable ? 0 : -1}
				data-swatch
				className="m-0.5 flex-[0_0_calc(var(--cp-swatche-size)-4px)] pb-[calc(var(--cp-swatche-size)-4px)]"
			/>
		));

		return (
			<div
				ref={ref}
				className={clsx(
					"swatches",
					"flex flex-wrap items-center -mx-0.5",
					className,
				)}
				style={
					{
						"--cp-swatche-size": `${100 / swatchesPerRow}%`,
					} as any
				}
				{...others}
			>
				{colors}
			</div>
		);
	},
);

Swatches.displayName = "@rtdui/core/Swatches";
