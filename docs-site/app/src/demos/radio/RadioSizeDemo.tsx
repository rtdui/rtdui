import { Radio } from "@rtdui/core";

export default function Demo() {
	return (
		<fieldset className="flex flex-col gap-4 items-start">
			<Radio name="size-demo-radio" size="xs" label="xs" />
			<Radio name="size-demo-radio" size="sm" label="sm" />
			<Radio name="size-demo-radio" size="md" label="md" />
			<Radio name="size-demo-radio" size="lg" label="lg" />
		</fieldset>
	);
}
Demo.displayName = "RadioSizeDemo";
