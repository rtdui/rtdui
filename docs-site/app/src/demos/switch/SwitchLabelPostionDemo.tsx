import { Switch } from "@rtdui/core";

export default function Demo() {
	return (
		<Switch
			required
			label="这是标签"
			labelPosition="right"
			helperText="(这是帮助文本)"
		/>
	);
}
Demo.displayName = "SwitchLabelPostionDemo";
