import { Radio } from "@rtdui/core";

export default function Demo() {
	return (
		<fieldset className="flex flex-col gap-4 items-start">
			<Radio name="color-demo-radio" defaultChecked label="default" />
			<Radio
				name="color-demo-radio"
				defaultChecked
				color="primary"
				label="primary"
			/>
			<Radio
				name="color-demo-radio"
				defaultChecked
				color="secondary"
				label="secondary"
			/>
			<Radio
				name="color-demo-radio"
				defaultChecked
				color="accent"
				label="accent"
			/>
			<Radio name="color-demo-radio" defaultChecked color="info" label="info" />
			<Radio
				name="color-demo-radio"
				defaultChecked
				color="success"
				label="success"
			/>
			<Radio
				name="color-demo-radio"
				defaultChecked
				color="warning"
				label="warning"
			/>
			<Radio
				name="color-demo-radio"
				defaultChecked
				color="error"
				label="error"
			/>
		</fieldset>
	);
}
Demo.displayName = "RadioColorDemo";
