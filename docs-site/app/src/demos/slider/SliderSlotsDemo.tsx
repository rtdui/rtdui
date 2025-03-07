import React from "react";
import { Button, RangeSlider } from "@rtdui/core";

const marks = [
	{ value: 20, label: "20%" },
	{ value: 50, label: "50%" },
	{ value: 80, label: "80%" },
];

const outline = "outline! outline-2! outline-offset-1! outline-red-500!";
export default function Demo() {
	const [slots, setSlots] = React.useState({});
	return (
		<div className="flex flex-col gap-12 py-4">
			<div className="flex flex-wrap gap-4 bg-base-100 rounded-box p-4">
				<Button
					size="sm"
					onClick={() =>
						setSlots({
							root: outline,
						})
					}
				>
					root
				</Button>
				<Button
					size="sm"
					onClick={() =>
						setSlots({
							trackContainer: outline,
						})
					}
				>
					trackContainer
				</Button>
				<Button
					size="sm"
					onClick={() =>
						setSlots({
							track: outline,
						})
					}
				>
					track
				</Button>
				<Button
					size="sm"
					onClick={() =>
						setSlots({
							bar: outline,
						})
					}
				>
					bar
				</Button>
				<Button
					size="sm"
					onClick={() =>
						setSlots({
							mark: outline,
						})
					}
				>
					mark
				</Button>
				<Button
					size="sm"
					onClick={() =>
						setSlots({
							markLabel: outline,
						})
					}
				>
					markLabel
				</Button>
				<Button
					size="sm"
					onClick={() =>
						setSlots({
							thumb: outline,
						})
					}
				>
					thumb
				</Button>
				<Button
					size="sm"
					onClick={() =>
						setSlots({
							label: outline,
						})
					}
				>
					label
				</Button>
			</div>
			<RangeSlider
				id="tours"
				defaultValue={[35, 65]}
				labelAlwaysOn
				marks={marks}
				slots={slots}
			/>
		</div>
	);
}
Demo.displayName = "SliderSlotsDemo";
