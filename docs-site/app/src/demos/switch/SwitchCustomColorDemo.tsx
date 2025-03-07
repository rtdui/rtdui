import { Switch } from "@rtdui/core";

export default function Demo() {
	return (
		<div className="flex flex-col gap-4 items-center">
			<Switch className="checked:border-purple-500 checked:text-purple-500" />
		</div>
	);
}
Demo.displayName = "SwitchCustomColorDemo";
