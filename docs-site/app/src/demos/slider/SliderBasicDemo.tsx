import { Slider, RangeSlider } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex flex-col gap-10 py-8">
			<Slider defaultValue={35} />
			<RangeSlider defaultValue={[35, 65]} />
		</div>
	);
}
Demo.displayName = "SliderBasicDemo";
