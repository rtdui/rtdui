import type React from "react";
import clsx from "clsx";
import { Marks } from "../Marks/Marks";
import { getDataProps } from "../../utils";

export interface TrackProps {
	filled: number;
	offset?: number;
	marksOffset?: number;
	marks: { value: number; label?: React.ReactNode }[] | undefined;
	min: number;
	max: number;
	value: number;
	children: React.ReactNode;
	disabled: boolean | undefined;
	inverted: boolean | undefined;
	containerProps?: React.PropsWithRef<React.ComponentProps<"div">>;
	slots?: {
		trackContainer?: string;
		track?: string;
		bar?: string;
		mark?: string;
		markLabel?: string;
		thumb?: string;
		label?: string;
	};
}

export function Track(props: TrackProps) {
	const {
		filled,
		children,
		offset,
		disabled,
		marksOffset,
		inverted,
		containerProps,
		slots,
		...others
	} = props;

	return (
		<div
			tabIndex={-1}
			className={clsx("trackContainer", slots?.trackContainer)}
			{...containerProps}
			{...getDataProps({ disabled })}
		>
			<div
				className={clsx("track", slots?.track)}
				{...getDataProps({ disabled, inverted })}
			>
				<div
					className={clsx("bar", slots?.bar)}
					style={
						{
							"--slider-bar-width": `calc(${filled}% + var(--slider-size))`,
							"--slider-bar-offset": `calc(${offset}% - var(--slider-size))`,
						} as any
					}
					{...getDataProps({ disabled, inverted })}
				/>
				{children}
				<Marks
					{...others}
					offset={marksOffset}
					disabled={disabled}
					inverted={inverted}
					slots={slots}
				/>
			</div>
		</div>
	);
}
