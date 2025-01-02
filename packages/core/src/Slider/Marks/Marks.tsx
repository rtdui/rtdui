import React from "react";
import clsx from "clsx";
import { getPosition } from "../utils/get-position";
import { isMarkFilled } from "./is-mark-filled";
import { getDataProps } from "../../utils";

export interface MarksProps {
	marks: { value: number; label?: React.ReactNode }[] | undefined;
	min: number;
	max: number;
	value: number;
	offset: number | undefined;
	disabled: boolean | undefined;
	inverted: boolean | undefined;
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

export function Marks(props: MarksProps) {
	const { marks, min, max, disabled, value, offset, inverted, slots } = props;

	if (!marks) {
		return null;
	}

	const items = marks.map((mark, index) => (
		<div
			className={clsx("markWrapper")}
			style={
				{
					"--mark-offset": `${getPosition({ value: mark.value, min, max })}%`,
				} as any
			}
			key={index}
		>
			<div
				className={clsx("mark", slots?.mark)}
				{...getDataProps({
					filled: isMarkFilled({ mark, value, offset, inverted }),
					disabled,
				})}
			/>
			{mark.label && (
				<div className={clsx("markLabel", slots?.markLabel)}>{mark.label}</div>
			)}
		</div>
	));

	return <div>{items}</div>;
}
