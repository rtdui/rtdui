import React from "react";
import { RadioGroup, Radio } from "@rtdui/core";

export default function Demo() {
	const [radioGroupValue, setRadioGroupValue] = React.useState<string | number>(
		1,
	);
	return (
		<RadioGroup
			color="primary"
			name="controlledRadioGroup"
			value={radioGroupValue}
			onChange={setRadioGroupValue}
			label="这是RadioGroup标签"
			helperText="(这是RadioGroup的帮助文本)"
		>
			<Radio value={1} label="Radio标签1" />
			<Radio value={2} label="Radio标签2" />
			<Radio value={3} label="Radio标签3" />
			<Radio value={4} label="Radio标签4" />
		</RadioGroup>
	);
}
Demo.displayName = "RadioGroupDemo";
