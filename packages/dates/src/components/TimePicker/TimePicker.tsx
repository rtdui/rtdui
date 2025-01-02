import { useRef } from "react";
import clsx from "clsx";
import { useUncontrolled } from "@rtdui/hooks";
import { Wheel } from "./Wheel";

export interface TimerPickerBaseProps {
	loop?: boolean;
	defaultValue?: string;
	value?: string;
	onChange?: (val: string) => void;
	withSeconds?: boolean;
	disabled?: boolean;
}
export interface TimerPickerProps
	extends TimerPickerBaseProps,
		Omit<
			React.ComponentPropsWithoutRef<"div">,
			"defaultValue" | "value" | "onChange"
		> {}

export const TimePicker = (props: TimerPickerProps) => {
	const {
		loop = true,
		defaultValue,
		value,
		onChange,
		withSeconds,
		disabled,
	} = props;
	const [_value, setValue] = useUncontrolled({
		value,
		defaultValue,
		finalValue: withSeconds ? "00:00:00" : "00:00",
		onChange,
	});

	const _val = _value.split(":");
	const hour = useRef(_val[0]);
	const minute = useRef(_val[1] ?? "00");
	const second = useRef(_val[2] ?? "00");

	return (
		<div className={clsx("flex justify-center items-center h-60 select-none")}>
			<div className={clsx("wheel-hour", "w-[70px] h-[180px]")}>
				<Wheel
					initIdx={0}
					length={24}
					width={23}
					loop={loop}
					perspective="right"
					disabled={disabled}
					onChangeEnd={(rel) => {
						hour.current = rel.toString().padStart(2, "0");
						setValue(
							`${hour.current}:${minute.current}${withSeconds ? `:${second.current}` : ""}`,
						);
					}}
				/>
			</div>
			<div className={clsx("wheel-minute", "w-[70px] h-[180px]")}>
				<Wheel
					initIdx={0}
					length={60}
					width={23}
					loop={loop}
					perspective="left"
					disabled={disabled}
					onChangeEnd={(rel) => {
						minute.current = rel.toString().padStart(2, "0");
						setValue(
							`${hour.current}:${minute.current}${withSeconds ? `:${second.current}` : ""}`,
						);
					}}
				/>
			</div>
			{withSeconds && (
				<div className={clsx("wheel-minute", "w-[70px] h-[180px]")}>
					<Wheel
						initIdx={0}
						length={60}
						width={23}
						loop={loop}
						perspective="left"
						disabled={disabled}
						onChangeEnd={(rel) => {
							second.current = rel.toString().padStart(2, "0");
							setValue(`${hour.current}:${minute.current}:${second.current}`);
						}}
					/>
				</div>
			)}
		</div>
	);
};
