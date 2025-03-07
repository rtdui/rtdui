import { forwardRef } from "react";
import clsx from "clsx";

export interface ThumbProps extends React.ComponentPropsWithoutRef<"div"> {
	variant?: string;
	position: { x: number; y: number };
}

export const Thumb = forwardRef<HTMLDivElement, ThumbProps>((props, ref) => {
	const { position, style, ...others } = props;
	return (
		<div
			ref={ref}
			className={clsx(
				"thumb",
				"absolute left-[calc(var(--thumb-x-offset)-var(--cp-thumb-size)/2)] top-[calc(var(--thumb-y-offset)-var(--cp-thumb-size)/2)]",
				"overflow-hidden w-(--cp-thumb-size) h-(--cp-thumb-size) border-2 border-white rounded-full shadow-[0_0_1px_rgba(0, 0, 0, 0.6)]",
			)}
			style={
				{
					...style,
					"--thumb-y-offset": `${position.y * 100}%`,
					"--thumb-x-offset": `${position.x * 100}%`,
				} as any
			}
			{...others}
		/>
	);
});

Thumb.displayName = "@rtdui/core/ColorPickerThumb";
