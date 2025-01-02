import { Swap } from "@rtdui/core";

export default function Demo() {
	return (
		<Swap transitionEffect="flip" className="text-9xl">
			<div>😈</div>
			<div>😇</div>
		</Swap>
	);
}
Demo.displayName = "SwapFlipDemo";
