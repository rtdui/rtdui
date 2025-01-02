import React from "react";
import { Slider } from "@rtdui/core";

export default function Demo() {
	const [value, setValue] = React.useState(35);
	const [endValue, setEndValue] = React.useState(35);
	return (
		<div className="flex flex-col gap-6 py-8">
			<Slider value={value} onChange={setValue} onChangeEnd={setEndValue} />
			<output>
				onChange value: <b>{value}</b>
			</output>
			<output>
				onChangeEnd value: <b>{endValue}</b>
			</output>
		</div>
	);
}
Demo.displayName = "SliderOnChangeEndDemo";
