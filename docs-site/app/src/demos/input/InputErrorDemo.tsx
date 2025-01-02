import { Input } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex flex-col items-center gap-4">
			<Input className="w-56" placeholder="error为true布尔值" error />
			<Input className="w-56" placeholder="error为字符串" error="error" />
			<Input
				className="w-56"
				placeholder="error为React元素"
				error={<span className="text-red-700">Error</span>}
			/>
		</div>
	);
}

Demo.displayName = "InputErrorDemo";
