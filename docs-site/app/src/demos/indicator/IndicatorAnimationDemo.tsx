import { Indicator } from "@rtdui/core";

export default function Demo() {
	return (
		<Indicator animation>
			<div className="w-20 h-20 bg-base-200 rounded-lg flex justify-center items-center">
				Content
			</div>
		</Indicator>
	);
}
Demo.displayName = "IndicatorAnimationDemo";
