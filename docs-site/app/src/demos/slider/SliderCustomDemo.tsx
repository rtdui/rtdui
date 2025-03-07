import { Slider, RangeSlider } from "@rtdui/core";

const marks = [
	{ value: 20, label: "20%" },
	{ value: 50, label: "50%" },
	{ value: 80, label: "80%" },
];
export default function Demo() {
	return (
		<div className="flex flex-col gap-10 py-8">
			<Slider
				defaultValue={35}
				labelAlwaysOn
				marks={marks}
				slots={{
					track: "before:bg-teal-200!",
					bar: "bg-purple-500!",
					mark: "bg-purple-500!",
					markLabel: "text-yellow-500!",
					thumb: "border-red-500!",
					label: "bg-green-500!",
				}}
			/>
			<RangeSlider
				defaultValue={[35, 65]}
				labelAlwaysOn
				marks={marks}
				slots={{
					track: "before:bg-teal-200!",
					bar: "bg-purple-500!",
					mark: "bg-purple-500!",
					markLabel: "text-yellow-500!",
					thumb: "border-red-500!",
					label: "bg-green-500!",
				}}
			/>
		</div>
	);
}
Demo.displayName = "SliderCustomDemo";
